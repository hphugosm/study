/** Deterministic public change index. Approved local sources only; no network or clocks. */
import {readFile,writeFile,mkdir,lstat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
import {units as trustedUnits,events as trustedManualEvents} from '../src/data.js';
import {reviewedAssignmentContent} from '../src/assignment-content.js';
import {moodleCalendarEvents,mergeCalendarEvents} from '../src/moodle-calendar.js';
import {assignmentsForUnit} from '../src/assignments.js';
import {canonicalUnitHref} from '../src/subject-layout.js';
import {validateSources} from '../modules/moodle-sync/catalog.js';
import {validateExternalResources} from '../modules/moodle-sync/external.js';
import {validateContent} from '../modules/course-notes/index.js';
import {checkCalendarSync} from './check-calendar-sync.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const HASH=/^[a-f0-9]{64}$/;
const slug=/^[a-z][a-z0-9-]{0,199}$/;
const active=value=>value.available!==false&&value.policy_excluded!==true&&value.listed_current!==false;
const digest=value=>createHash('sha256').update(typeof value==='string'||Buffer.isBuffer(value)?value:JSON.stringify(value)).digest('hex');
const title=value=>{assert.ok(typeof value==='string'&&value.trim()&&value.length<=500&&!/[<>\u0000-\u001f]/.test(value),'Unsafe notification title');return value.trim();};
const topicKey=value=>(value.subjectId||value.subject)+'/'+(value.topicId||value.topic);
const append=(url,params)=>url+(url.includes('?')?'&':'?')+new URLSearchParams(params);
const itemId=(...parts)=>digest(parts);

export function buildNotificationSnapshot({feed,units=trustedUnits,manualEvents=trustedManualEvents,associations,details=reviewedAssignmentContent,sourceIndexes=[],contents=[],externalIndexes=[]}){
 assert.ok(feed?.schema===1&&Array.isArray(feed.entries),'Invalid notification feed');
 assert.ok(Array.isArray(units)&&Array.isArray(manualEvents),'Invalid notification registry');
 const calendarGuard=checkCalendarSync(feed,{units,manualEvents,associations});assert.ok(calendarGuard.ok,'Calendar guard failed before notification generation');
 const available=units.filter(active),byId=new Map(available.map(unit=>[unit.id,unit])),byTopic=new Map();
 for(const unit of available){assert.match(unit.id,slug);if(unit.topicId){const key=topicKey(unit);assert.ok(!byTopic.has(key),'Ambiguous notification topic');byTopic.set(key,unit);}}
 const sources=new Map();
 for(const index of sourceIndexes){validateSources(index);const unit=byTopic.get(index.subject_id+'/'+index.topic_id);if(!unit)continue;for(const source of index.sources){const key=topicKey(unit)+':'+source.id;assert.ok(!sources.has(key),'Duplicate notification source identity');sources.set(key,{unit,source});}}
 const publicRows=new Map(feed.entries.filter(active).map(row=>[row.id,row]));
 const groupedMaterials=new Map();
 for(const {unit,source}of sources.values()){
  if(source.source_kind==='moodle'){const row=publicRows.get(source.id);if(!row)continue;assert.ok(row.kind==='file'&&row.sha256===source.sha256&&topicKey(row)===topicKey(unit),'Stale notification material binding');if(source.url)assert.equal(row.url,source.url,'Mismatched notification material URL');}
  // Manual source records are separately reviewed admission, never inferred from a filename.
  const key=topicKey(unit)+':'+source.sha256;const previous=groupedMaterials.get(key);if(!previous||source.title.localeCompare(previous.source.title,'cs')<0)groupedMaterials.set(key,{unit,source});
 }
 const items=new Map();
 function add(item){assert.match(item.id,HASH);assert.match(item.version,HASH);assert.ok(byId.has(item.unitId),'Notification unit is unavailable');assert.ok(!items.has(item.id),'Duplicate notification identity');assert.ok(typeof item.subject==='string'&&item.subject===byId.get(item.unitId).subjectId,'Wrong notification subject');title(item.title);assert.ok(/^#\/(?:units|events)\/[a-z][a-z0-9-]*(?:\?[^#]*)?$/.test(item.url),'Unsafe notification route');if(item.due!==undefined)assert.ok(Number.isSafeInteger(item.due)&&item.due>0,'Invalid notification due');items.set(item.id,item);}
 for(const {unit,source}of groupedMaterials.values())add({id:itemId('material',unit.subjectId,unit.topicId,source.sha256),version:source.sha256,category:'material',subject:unit.subjectId,unitId:unit.id,title:title(source.title),url:append(canonicalUnitHref(unit,units),{tab:'materials'})});
 const parsedContents=[];
 for(const input of contents){const unit=byId.get(input.unitId);if(!unit)continue;assert.ok(Buffer.isBuffer(input.bytes)||typeof input.bytes==='string','Missing authored content bytes');const data=validateContent(JSON.parse(input.bytes.toString()));assert.equal(data.subject,unit.subjectId);assert.equal(data.topic,unit.topicId);assert.equal(data.title,unit.title);for(const source of data.sources){const admitted=sources.get(topicKey(unit)+':'+source.id)?.source;assert.ok(admitted&&admitted.sha256===source.sha256,'Unapproved authored notification source');}parsedContents.push({unitId:unit.id,data});if(data.lessons.length)add({id:itemId('notes',unit.id),version:digest(input.bytes),category:'notes',subject:unit.subjectId,unitId:unit.id,title:unit.title,url:canonicalUnitHref(unit,units)});}
 // Exact assignment version matching and artifact provenance use the same reviewed task reader.
 for(const unit of available){const tasks=assignmentsForUnit(unit,{units,events:[],feed,contents:parsedContents,details,now:0});for(const task of tasks){if(task.unitId!==unit.id||!(task.solution||task.solutions.length))continue;const publishedVersion=task.origin==='moodle'?publicRows.get(task.id.replace(/^moodle-/,''))?.version:null;add({id:itemId('solution',unit.id,task.id),version:digest({publishedVersion,prompt:task.prompt,steps:task.steps,solution:task.solution||null,solutions:task.solutions,source_refs:task.source_refs}),category:'solution',subject:unit.subjectId,unitId:unit.id,title:task.title,url:append(canonicalUnitHref(unit,units),{tab:'tasks',...(task.origin==='moodle'?{assignment:task.id.replace(/^moodle-/,'')}:{})})});}}
 const scopedFeed={schema:1,entries:feed.entries.filter(row=>active(row)&&byTopic.has(topicKey(row)))};
 const imported=moodleCalendarEvents(scopedFeed,{units:available});const calendar=mergeCalendarEvents(manualEvents,imported);
 for(const event of calendar){if(!['test','homework'].includes(event.type)||!byId.has(event.unitId))continue;const unit=byId.get(event.unitId),due=event.due||event.starts;if(!Number.isSafeInteger(due)||due<=0)continue;add({id:itemId('calendar',event.id),version:digest({date:event.date,starts:event.starts??null,due:event.due??null,type:event.type,title:event.title,assignmentUnitId:event.assignmentUnitId??null}),category:event.type==='test'?'test':'deadline',subject:unit.subjectId,unitId:unit.id,title:title(event.title),url:`#/events/${event.id}`,...(Number.isSafeInteger(due)&&due>0?{due}:{})});}
 const seenExternal=new Set();
 for(const index of externalIndexes){validateExternalResources(index);const unit=byTopic.get(index.subject_id+'/'+index.topic_id);if(!unit)continue;for(const resource of index.resources){const key=topicKey(unit)+':'+resource.id;assert.ok(!seenExternal.has(key),'Duplicate external notification identity');seenExternal.add(key);add({id:itemId('external',unit.subjectId,unit.topicId,resource.id),version:digest({kind:resource.kind,provider:resource.provider,video_id:resource.video_id,url:resource.url,title:resource.title}),category:'external',subject:unit.subjectId,unitId:unit.id,title:resource.title,url:append(canonicalUnitHref(unit,units),{tab:'materials'})});}}
 const ordered=[...items.values()].sort((a,b)=>a.id.localeCompare(b.id));return {schema:1,revision:digest(ordered),items:ordered};
}
async function readRegular(file,{optional=false}={}){try{const stat=await lstat(file);assert.ok(stat.isFile()&&!stat.isSymbolicLink()&&stat.size<=25000000,'Unsafe notification input');return await readFile(file);}catch(error){if(optional&&error.code==='ENOENT')return null;throw error;}}
export async function generateNotifications(directory=root,{output=path.join(directory,'dist/notifications.json'),units=trustedUnits,manualEvents=trustedManualEvents,details=reviewedAssignmentContent}={}){
 const feed=JSON.parse(await readRegular(path.join(directory,'modules/moodle-sync/feed.json'))),associations=JSON.parse(await readRegular(path.join(directory,'src/calendar-associations.json')));const sourceIndexes=[],contents=[],externalIndexes=[];
 await Promise.all(units.filter(unit=>active(unit)&&unit.origin==='moodle'&&unit.topicId).map(async unit=>{const topicDirectory=path.join(directory,'modules/moodle-sync/data/subjects',unit.subjectId,'topics',unit.topicId);const index=JSON.parse(await readRegular(path.join(topicDirectory,'sources/index.json')));assert.equal(index.subject_id,unit.subjectId);assert.equal(index.topic_id,unit.topicId);sourceIndexes.push(index);const external=await readRegular(path.join(topicDirectory,'external/index.json'),{optional:true});if(external){const index=JSON.parse(external);validateExternalResources(index,{subjectId:unit.subjectId,topicId:unit.topicId});externalIndexes.push(index);}if(unit.content_url){assert.equal(unit.content_url,`modules/course-notes/content/${unit.subjectId}/${unit.topicId}.json`);contents.push({unitId:unit.id,bytes:await readRegular(path.join(directory,unit.content_url))});}}));
 const snapshot=buildNotificationSnapshot({feed,units,manualEvents,associations,details,sourceIndexes,contents,externalIndexes});await mkdir(path.dirname(output),{recursive:true});await writeFile(output,JSON.stringify(snapshot)+'\n');return snapshot;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){const snapshot=await generateNotifications();console.log(`Generated public notification snapshot: ${snapshot.items.length} items.`);}
