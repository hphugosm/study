import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {units as trustedUnits,events as trustedManualEvents} from '../src/data.js';
import {moodleCalendarEvents,mergeCalendarEvents} from '../src/moodle-calendar.js';

const trustedAssociations=JSON.parse(readFileSync(new URL('../src/calendar-associations.json',import.meta.url),'utf8'));
const HASH=/^[a-f0-9]{64}$/;
const TYPES=new Set(['test','homework']);
const seconds=value=>Number.isSafeInteger(value)&&value>0&&value<=253402214399;
const active=row=>row&&row.available!==false&&row.policy_excluded!==true;
const quizTitle=title=>typeof title==='string'&&/(?<![\p{L}\p{N}])quiz(?:zes)?(?=$|[^\p{L}\p{N}]|[0-9]|reminders?\b)/iu.test(title);
const day=timestamp=>{
 const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Prague',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(timestamp*1000));
 return ['year','month','day'].map(kind=>parts.find(part=>part.type===kind).value).join('-');
};
/** Inspect candidate JSON with trusted application code; never import or execute candidate paths. */
export function checkCalendarSync(feed,{units=trustedUnits,manualEvents=trustedManualEvents,associations=trustedAssociations}={}){
 const issues=[];const issue=(code,id)=>issues.push(id&&HASH.test(id)?{code,id}:{code});
 const counts={assignments:0,quizRows:0,deadlines:0,importedEvents:0,effectiveEvents:0,linkedPreparations:0};
 if(!feed||feed.schema!==1||!Array.isArray(feed.entries)||!Array.isArray(units)||!Array.isArray(manualEvents))return {ok:false,issues:[{code:'invalid_calendar_feed'}],counts};
 const configuredIds=associations?.manual_event_ids;
 if(associations?.schema!==1||!Array.isArray(configuredIds)||!Array.isArray(associations.associations)||configuredIds.length!==manualEvents.length||new Set(configuredIds).size!==configuredIds.length||manualEvents.some(event=>!configuredIds.includes((event.manualFallback||event).id)))issue('manual_event_configuration_mismatch');
 const actualLinks=manualEvents.map(event=>event.manualFallback||event).filter(event=>event.sourceAssignmentId).map(event=>{
  const targets=units.filter(unit=>unit.id===(event.sourceAssignmentUnitId||event.unitId));
  return targets.length===1?{id:event.id,assignment_id:event.sourceAssignmentId,subject:targets[0].subjectId,topic:targets[0].topicId}:null;
 });
 const configuredLinks=associations?.associations;
 if(!Array.isArray(configuredLinks)||configuredLinks.length!==actualLinks.length||actualLinks.some(link=>!link||configuredLinks.filter(item=>item&&Object.keys(item).sort().join(',')==='assignment_id,id,subject,topic'&&Object.keys(link).every(key=>item[key]===link[key])).length!==1))issue('manual_association_configuration_mismatch');
 const rows=feed.entries.filter(row=>active(row)&&['assignment','event'].includes(row.kind));
 const seen=new Set();
 for(const row of rows){
  if(typeof row.id!=='string'||!HASH.test(row.id)||typeof row.version!=='string'||!HASH.test(row.version)||typeof row.title!=='string'||!row.title.trim()||row.title.length>500||/[<>\u0000-\u001f]/.test(row.title)){issue('invalid_calendar_row',row.id);continue;}
  const key=row.kind+':'+row.id;if(seen.has(key))issue('duplicate_source_identity',row.id);seen.add(key);
  if(row.kind==='assignment'){counts.assignments++;if(!TYPES.has(row.calendar_type))issue('assignment_category_missing',row.id);if(row.due!==undefined&&row.due!==null&&row.due!==0&&!seconds(row.due))issue('invalid_assignment_due',row.id);}
  // A reminder is still a Quiz when that word appears in its approved title.
  if(quizTitle(row.title)){counts.quizRows++;if(row.calendar_type!=='test')issue('quiz_must_be_test',row.id);}
  const relevant=row.kind==='assignment'?seconds(row.due):seconds(row.starts)&&['deadline','scheduled'].includes(row.calendar_role);
  if(relevant&&units.filter(unit=>unit.subjectId===row.subject&&unit.topicId===row.topic).length!==1)issue('calendar_topic_not_unique',row.id);
 }
 let imported,effective;
 try{imported=moodleCalendarEvents(feed,{units});effective=mergeCalendarEvents(manualEvents,imported);}catch{issue('calendar_normalization_failed');return {ok:false,issues,counts};}
 counts.importedEvents=imported.length;counts.effectiveEvents=effective.length;
 const assignments=rows.filter(row=>row.kind==='assignment');
 for(const row of assignments.filter(row=>seconds(row.due))){
  counts.deadlines++;const event=imported.find(event=>event.id==='moodle-deadline-'+row.id);
  if(!event){issue('assignment_deadline_missing',row.id);continue;}
  if(event.starts!==row.due||event.due!==row.due||event.date!==day(row.due)||event.allDay!==false||event.sourceVersion!==row.version)issue('assignment_deadline_precision_changed',row.id);
  if(event.type!==row.calendar_type)issue('assignment_category_changed',row.id);
 }
 for(const row of rows.filter(row=>row.kind==='event'&&seconds(row.starts)&&TYPES.has(row.calendar_type)&&['deadline','scheduled'].includes(row.calendar_role))){
  const parent=assignments.find(parent=>parent.id===row.related_assignment&&parent.subject===row.subject&&parent.topic===row.topic&&seconds(parent.due)&&parent.due===row.starts);
  if(parent){if(row.calendar_type!==parent.calendar_type)issue('linked_calendar_category_conflict',row.id);if(imported.some(event=>event.id==='moodle-event-'+row.id))issue('linked_deadline_duplicate',row.id);continue;}
  const event=imported.find(event=>event.id==='moodle-event-'+row.id);
  if(!event){issue('scheduled_event_missing',row.id);continue;}
  if(event.starts!==row.starts||event.date!==day(row.starts)||event.duration!==(row.duration??0)||event.allDay!==false||event.type!==row.calendar_type)issue('scheduled_event_precision_changed',row.id);
 }
 const identities=new Set(),routes=new Map();
 for(const event of effective){
  if(identities.has(event.id))issue('duplicate_effective_event_id');identities.add(event.id);
  for(const route of [event.id,...(event.aliasIds||[])]){if(routes.has(route)&&routes.get(route)!==event.id)issue('ambiguous_event_alias');else routes.set(route,event.id);}
  if(event.origin!=='moodle')continue;
  if(!seconds(event.starts)||event.date!==day(event.starts)||event.allDay!==false)issue('effective_event_precision_changed');
 }
 const deadlineInstants=new Map();
 for(const event of effective.filter(event=>event.origin==='moodle'&&event.sourceAssignmentId&&event.isDeadline===true)){
  const key=event.sourceAssignmentId+':'+(event.assignmentUnitId||event.unitId);
  const instants=deadlineInstants.get(key)||new Set();instants.add(event.starts);deadlineInstants.set(key,instants);
  if(instants.size===2)issue('conflicting_assignment_deadlines',event.sourceAssignmentId);
 }
 const assignmentInstants=new Set();
 for(const event of effective.filter(event=>event.origin==='moodle'&&event.sourceAssignmentId&&event.isDeadline===true)){
  const key=event.sourceAssignmentId+':'+(event.assignmentUnitId||event.unitId)+':'+event.starts;
  if(assignmentInstants.has(key))issue('duplicate_assignment_instant',event.sourceAssignmentId);assignmentInstants.add(key);
 }
 for(const previous of manualEvents){
  const manual=previous.manualFallback||previous;if(!manual.sourceAssignmentId)continue;
  const matching=imported.filter(event=>event.sourceAssignmentId===manual.sourceAssignmentId&&event.isDeadline===true&&event.unitId===(manual.sourceAssignmentUnitId||manual.unitId));
  if(matching.length!==1)continue;
  counts.linkedPreparations++;const source=matching[0],canonical=effective.filter(event=>event.id===manual.id);
  if(canonical.length!==1||canonical[0].sourceAssignmentId!==manual.sourceAssignmentId||canonical[0].starts!==source.starts||canonical[0].type!==source.type||canonical[0].unitId!==manual.unitId||canonical[0].assignmentUnitId!==source.unitId||!canonical[0].aliasIds?.includes(source.id)||effective.some(event=>event.id===source.id))issue('linked_preparation_not_canonical',manual.sourceAssignmentId);
 }
 return {ok:issues.length===0,issues,counts};
}
function cli(args){
 let file=new URL('../modules/moodle-sync/feed.json',import.meta.url);
 if(args.length){if(args.length!==2||args[0]!=='--feed'||!args[1])throw new Error('invalid_arguments');file=args[1];}
 const bytes=readFileSync(file==='-'?0:file);if(bytes.length>8_000_000)throw new Error('candidate_feed_too_large');
 const result=checkCalendarSync(JSON.parse(bytes.toString('utf8')));
 // Fixed codes and aggregate counts only: candidate titles/bodies are never logged.
 process.stdout.write(JSON.stringify(result)+'\n');if(!result.ok)process.exitCode=1;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){try{cli(process.argv.slice(2));}catch{process.stderr.write('calendar_sync_guard_input_error\n');process.exitCode=1;}}
