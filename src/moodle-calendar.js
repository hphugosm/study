/** Public reviewed Moodle metadata → calendar. Never reads private state or guesses titles. */
const HASH=/^[a-f0-9]{64}$/;
const TYPES=new Set(['test','homework']);
const seconds=value=>Number.isSafeInteger(value)&&value>0&&value<=253402214399;
const duration=value=>Number.isSafeInteger(value)&&value>=0&&value<=31536000;
const safeText=value=>typeof value==='string'&&value.trim()&&value.length<=500&&!/[<>\u0000-\u001f]/.test(value);
export function pragueDate(timestamp){
 if(!seconds(timestamp))throw new TypeError('invalid_public_calendar_timestamp');
 const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Prague',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(timestamp*1000));const part=name=>parts.find(item=>item.type===name)?.value;const date=`${part('year')}-${part('month')}-${part('day')}`;
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date))throw new TypeError('invalid_public_calendar_date');return date;
}
function topicUnit(row,units){const matches=units.filter(unit=>unit.subjectId===row.subject&&unit.topicId===row.topic);return matches.length===1?matches[0]:null;}
function validRow(row){return row&&typeof row==='object'&&!Array.isArray(row)&&typeof row.id==='string'&&HASH.test(row.id)&&typeof row.version==='string'&&HASH.test(row.version)&&safeText(row.title)&&row.available!==false&&row.policy_excluded!==true;}
function common(row,unit,timestamp,type,id){return {id,unitId:unit.id,subjectId:unit.subjectId,date:pragueDate(timestamp),starts:timestamp,duration:0,allDay:false,type,title:row.title.trim(),description:'Termín zveřejněný ve školním Moodlu.',origin:'moodle'};}
export function moodleCalendarEvents(feed,{units=[]}={}){
 const rows=Array.isArray(feed)?feed:feed?.schema===1&&Array.isArray(feed.entries)?feed.entries:null;if(!rows)throw new TypeError('invalid_public_calendar_feed');
 const assignments=new Map(),events=new Map();
 for(const row of rows){if(row?.kind!=='assignment'||!validRow(row))continue;const unit=topicUnit(row,units);if(!unit)continue;assignments.set(row.id,{row,unit});if(!seconds(row.due))continue;const type=row.calendar_type===undefined?'homework':TYPES.has(row.calendar_type)?row.calendar_type:null;if(!type)continue;const event=common(row,unit,row.due,type,'moodle-deadline-'+row.id);event.sourceAssignmentId=row.id;event.sourceVersion=row.version;event.sourceKind='assignment';event.isDeadline=true;event.due=row.due;events.set(event.id,event);}
 for(const row of rows){if(row?.kind!=='event'||!validRow(row)||!seconds(row.starts)||!duration(row.duration??0)||!TYPES.has(row.calendar_type)||!['deadline','scheduled'].includes(row.calendar_role)||row.calendar_type==='test'&&row.calendar_role!=='scheduled')continue;const unit=topicUnit(row,units);if(!unit)continue;const linked=assignments.get(row.related_assignment),sameTopic=linked&&linked.row.subject===row.subject&&linked.row.topic===row.topic;const deadlineEvent=sameTopic&&events.get('moodle-deadline-'+linked.row.id);
  // Two different titles/dates are never enough to establish shared identity.
  if(deadlineEvent&&deadlineEvent.starts===row.starts)continue;
  const event=common(row,unit,row.starts,row.calendar_type,'moodle-event-'+row.id);event.duration=row.duration??0;event.sourceKind='event';event.isDeadline=row.calendar_role==='deadline';if(event.isDeadline)event.due=row.starts;event.sourceEventId=row.id;event.sourceVersion=row.version;if(sameTopic){event.sourceAssignmentId=linked.row.id;event.sourceVersion=linked.row.version;event.sourceEventVersion=row.version;}events.set(event.id,event);
 }
 return [...events.values()].sort((a,b)=>a.starts-b.starts||a.id.localeCompare(b.id));
}
/** Replace a previous imported projection; all independently authored events survive. */
export function mergeCalendarEvents(manual,imported){
 if(!Array.isArray(manual)||!Array.isArray(imported))throw new TypeError('invalid_calendar_events');const result=new Map();for(const event of manual)if(event?.origin!=='moodle')result.set(event.id,event);for(const event of imported){if(event?.origin!=='moodle'||typeof event.id!=='string'||!/^moodle-(deadline|event)-[a-f0-9]{64}$/.test(event.id)||!seconds(event.starts)||event.date!==pragueDate(event.starts)||!TYPES.has(event.type))throw new TypeError('invalid_imported_calendar_event');if(!result.has(event.id))result.set(event.id,event);}
 return [...result.values()];
}
