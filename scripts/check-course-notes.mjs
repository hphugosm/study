/** Source identity and complete extraction coverage are verified without network downloads. */
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {validateContent} from '../modules/course-notes/index.js';
import {courseUnits} from '../src/course-catalog.js';
import {validateSources} from '../modules/moodle-sync/catalog.js';
const root=fileURLToPath(new URL('../',import.meta.url));
export async function checkCourseNotes(directory=root,{units=courseUnits,log=true}={}){
const root=directory;
const folder=path.join(root,'modules/course-notes');
const read=async name=>JSON.parse(await readFile(path.join(folder,name),'utf8'));
const manifest=await read('learning-assets.json');
assert.equal(manifest.schema,1);assert.equal(manifest.release,'studylo-learning-v1');
const feed=JSON.parse(await readFile(path.join(root,'modules/moodle-sync/feed.json'),'utf8')).entries.filter(entry=>entry.kind==='file');
// Reviewed manual copies keep their own IDs and hashes. They never replace or
// relabel a held Moodle original, and must belong to this exact topic index.
const sourceRecords=[...feed];
const original=new Map(feed.map(entry=>[entry.id,entry]));
for(const unit of units){
 const indexPath=`modules/moodle-sync/data/subjects/${unit.subjectId}/topics/${unit.topicId}/sources/index.json`;
 const index=validateSources(JSON.parse(await readFile(path.join(root,indexPath),'utf8')));
 assert.equal(index.subject_id,unit.subjectId);assert.equal(index.topic_id,unit.topicId);
 for(const source of index.sources.filter(item=>item.source_kind==='manual')){
  const entry={...source,subject:unit.subjectId,topic:unit.topicId,url:source.url||`modules/moodle-sync/${source.path}`};
  const previous=original.get(source.id);
  assert.ok(!previous||(previous.sha256===source.sha256&&previous.url===entry.url),'Conflicting manual source identity');
  original.set(source.id,entry);sourceRecords.push(entry);
 }
}
const hashes=new Set(sourceRecords.map(entry=>entry.sha256));
const expected=new Set(sourceRecords.map(entry=>entry.subject+'/'+entry.topic));
const assets=new Map(manifest.assets.map(asset=>[asset.name,asset]));
assert.equal(assets.size,manifest.assets.length,'Duplicate learning asset');
assert.ok(assets.size<=1000);assert.ok(manifest.assets.reduce((sum,asset)=>sum+asset.size,0)<=500000000);
for(const asset of assets.values()){
 assert.match(asset.sha256,/^[a-f0-9]{64}$/);assert.ok(Number.isSafeInteger(asset.size)&&asset.size>0);
 if(asset.kind==='solution'){
  const keys=['kind','format','name','sha256','size','source_sha256s',...(asset.format==='png'?['width','height']:[])];
  assert.deepEqual(new Set(Object.keys(asset)),new Set(keys),'Unexpected solution asset metadata');
  assert.ok(['xlsx','png'].includes(asset.format),'Invalid solution format');assert.equal(asset.name,asset.sha256+'.'+asset.format,'Noncanonical solution asset name');
  assert.ok(asset.size<=25000000,'Oversize solution asset');
  assert.ok(Array.isArray(asset.source_sha256s)&&asset.source_sha256s.length>0&&asset.source_sha256s.every(hash=>hashes.has(hash)),'Unapproved solution source');
  assert.equal(new Set(asset.source_sha256s).size,asset.source_sha256s.length,'Duplicate solution provenance');
  if(asset.format==='png')for(const dimension of [asset.width,asset.height])assert.ok(Number.isSafeInteger(dimension)&&dimension>=1&&dimension<=4096,'Invalid solution dimensions');
 }else if(asset.kind==='figure'){assert.equal(asset.name,asset.sha256+'.webp');assert.ok(asset.source_sha256s.length&&asset.source_sha256s.every(hash=>hashes.has(hash)));}
 else{assert.equal(asset.kind,'extraction');assert.ok(hashes.has(asset.source_sha256));assert.equal(asset.name,asset.source_sha256+'.zip');}
}
const extractedHashes=new Set(manifest.assets.filter(asset=>asset.kind==='extraction').map(asset=>asset.source_sha256));
const textHashes=new Set(manifest.source_texts.map(text=>text.source_sha256));
assert.equal(textHashes.size,manifest.source_texts.length,'Duplicate full text source');
assert.equal(extractedHashes.size,manifest.assets.filter(asset=>asset.kind==='extraction').length,'Duplicate extraction source');
assert.deepEqual(textHashes,extractedHashes,'Full text set differs from published extraction archives');
assert.equal(manifest.extraction?.privacy_scope,'approved_public_sources_only');
if(manifest.extraction.prepared_unique_sources!==undefined)assert.equal(manifest.extraction.prepared_unique_sources,extractedHashes.size);
for(const asset of assets.values())if(['figure','solution'].includes(asset.kind))assert.ok(asset.source_sha256s.every(hash=>extractedHashes.has(hash)),'Teaching figure or solution requires complete source extraction');
const extraction=new Map();
for(const text of manifest.source_texts){
 assert.equal(text.path,`extracted/${text.source_sha256}.json`);
 const bytes=await readFile(path.join(folder,text.path));
 assert.equal(createHash('sha256').update(bytes).digest('hex'),text.sha256);assert.equal(bytes.length,text.size);
 const data=JSON.parse(bytes);assert.equal(data.sha256,text.source_sha256);assert.equal(data.units.length,text.units);
 assert.ok(data.units.every(unit=>Number.isSafeInteger(unit.number)&&unit.number>0&&typeof unit.text==='string'));
 extraction.set(text.source_sha256,data);
}
const found=new Set(),pending=new Set();let lessons=0,questions=0,cards=0,figures=0,solutions=0;const usedSolutions=new Set();
function checkRefs(value,ids){
 if(Array.isArray(value)){for(const item of value)checkRefs(item,ids);return;}
 if(!value||typeof value!=='object')return;
 for(const ref of value.source_refs||[]){assert.ok(ids.has(ref.id));assert.equal(original.get(ref.id).sha256,ref.sha256);if(ref.page!==undefined)assert.ok(ref.page<=extraction.get(ref.sha256).units.length,'Reference exceeds actual source length');}
 for(const[key,child]of Object.entries(value))if(key!=='source_refs')checkRefs(child,ids);
}
for(const unit of units){
 const key=unit.subjectId+'/'+unit.topicId;
 if(!expected.has(key)){assert.ok(!unit.module,'Source-empty topic must not advertise invented notes');continue;}
 const ids=new Set(sourceRecords.filter(entry=>entry.subject===unit.subjectId&&entry.topic===unit.topicId).map(entry=>entry.id));
 const file=`content/${key}.json`;
 let content;
 try{content=validateContent(await read(file));}catch(error){
  if(error.code!=='ENOENT')throw error;
  assert.ok(!unit.module&&!unit.content_url,'Pending source-only topic must not advertise reviewed notes');
  assert.equal(unit.lessonCount,0);assert.equal(unit.questionCount,0);assert.equal(unit.sourceCount,ids.size);
  pending.add(key);continue;
 }
 assert.equal(content.subject,unit.subjectId);assert.equal(content.topic,unit.topicId);assert.equal(content.title,unit.title);
 assert.deepEqual(new Set(content.sources.map(source=>source.id)),ids,'A source was omitted or imported from another topic');
 for(const source of content.sources){const entry=original.get(source.id);assert.equal(source.sha256,entry.sha256);assert.equal(source.url,entry.url);assert.ok(extractedHashes.has(source.sha256),'Reviewed notes require complete source extraction');assert.equal(source.extraction_url,`./extracted/${source.sha256}.json`);assert.equal(source.archive_url,`https://github.com/hphugosm/study/releases/download/studylo-learning-v1/${source.sha256}.zip`);}
 checkRefs(content,ids);
 for(const lesson of content.lessons)for(const image of lesson.images||[]){
  const asset=assets.get(image.src.split('/').at(-1));assert.equal(asset?.kind,'figure');
  assert.ok(image.source_refs.some(ref=>asset.source_sha256s.includes(ref.sha256)),'Teaching image source differs');figures++;
 }
 for(const lesson of content.lessons)for(const solution of lesson.solutions||[]){
  const asset=assets.get(solution.sha256+'.'+solution.format);assert.equal(asset?.kind,'solution','Solution is missing reviewed manifest asset');
  assert.equal(solution.url,`https://github.com/hphugosm/study/releases/download/studylo-learning-v1/${asset.name}`,'Noncanonical solution URL');
  assert.equal(solution.sha256,asset.sha256);assert.equal(solution.size,asset.size);assert.equal(solution.format,asset.format);
  assert.deepEqual(new Set(solution.source_refs.map(ref=>ref.sha256)),new Set(asset.source_sha256s),'Solution provenance differs');
  if(solution.format==='png'){assert.equal(solution.width,asset.width);assert.equal(solution.height,asset.height);}
  usedSolutions.add(asset.name);solutions++;
 }
 assert.equal(unit.lessonCount,content.lessons.length);assert.equal(unit.questionCount,content.questions.length);
 assert.equal(unit.sourceCount,ids.size);if(content.lessons.length&&unit.available!==false)assert.equal(unit.module,'course-notes');
 found.add(key);lessons+=content.lessons.length;questions+=content.questions.length;cards+=content.flashcards.length;
}
assert.deepEqual(new Set([...found,...pending]),expected,'Approved source-bearing topic is missing from the catalog');
assert.equal(manifest.counts.topics,found.size,'Prepared topic count differs from reviewed content');
assert.deepEqual(usedSolutions,new Set(manifest.assets.filter(asset=>asset.kind==='solution').map(asset=>asset.name)),'Orphan solution asset');
assert.equal(manifest.counts.solutions??0,solutions,'Solution count differs from reviewed content');
const result={topics:found.size,lessons,cards,questions,figures,solutions,extractedFiles:extractedHashes.size,approvedFiles:hashes.size,pendingTopics:pending.size,pendingFiles:hashes.size-extractedHashes.size};
if(log)console.log(`Course notes: ${found.size} source-backed topics, ${lessons} lessons, ${cards} cards, ${questions} questions, ${figures} sourced figures; full extraction for ${extractedHashes.size}/${hashes.size} approved files; ${pending.size} source-only topics await reviewed notes.`);
return result;
}
await checkCourseNotes();
