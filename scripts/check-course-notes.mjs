/** Source identity and complete extraction coverage are verified without network downloads. */
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {validateContent} from '../modules/course-notes/index.js';
import {courseUnits} from '../src/course-catalog.js';
const root=fileURLToPath(new URL('../',import.meta.url));
const folder=path.join(root,'modules/course-notes');
const read=async name=>JSON.parse(await readFile(path.join(folder,name),'utf8'));
const manifest=await read('learning-assets.json');
assert.equal(manifest.schema,1);assert.equal(manifest.release,'studylo-learning-v1');
const feed=JSON.parse(await readFile(path.join(root,'modules/moodle-sync/feed.json'),'utf8')).entries;
const original=new Map(feed.map(entry=>[entry.id,entry]));
const hashes=new Set(feed.map(entry=>entry.sha256));
const expected=new Set(feed.map(entry=>entry.subject+'/'+entry.topic));
const assets=new Map(manifest.assets.map(asset=>[asset.name,asset]));
assert.equal(assets.size,manifest.assets.length,'Duplicate learning asset');
assert.ok(assets.size<=1000);assert.ok(manifest.assets.reduce((sum,asset)=>sum+asset.size,0)<=500000000);
for(const asset of assets.values()){
 assert.match(asset.sha256,/^[a-f0-9]{64}$/);assert.ok(Number.isSafeInteger(asset.size)&&asset.size>0);
 if(asset.kind==='figure'){assert.equal(asset.name,asset.sha256+'.webp');assert.ok(asset.source_sha256s.length&&asset.source_sha256s.every(hash=>hashes.has(hash)));}
 else{assert.equal(asset.kind,'extraction');assert.ok(hashes.has(asset.source_sha256));assert.equal(asset.name,asset.source_sha256+'.zip');}
}
assert.deepEqual(new Set(manifest.assets.filter(asset=>asset.kind==='extraction').map(asset=>asset.source_sha256)),hashes,'Extraction archive set differs from approved files');
assert.deepEqual(new Set(manifest.source_texts.map(text=>text.source_sha256)),hashes,'Full text set differs from approved files');
const extraction=new Map();
for(const text of manifest.source_texts){
 assert.equal(text.path,`extracted/${text.source_sha256}.json`);
 const bytes=await readFile(path.join(folder,text.path));
 assert.equal(createHash('sha256').update(bytes).digest('hex'),text.sha256);assert.equal(bytes.length,text.size);
 const data=JSON.parse(bytes);assert.equal(data.sha256,text.source_sha256);assert.equal(data.units.length,text.units);
 assert.ok(data.units.every(unit=>Number.isSafeInteger(unit.number)&&unit.number>0&&typeof unit.text==='string'));
 extraction.set(text.source_sha256,data);
}
const found=new Set();let lessons=0,questions=0,cards=0,figures=0;
function checkRefs(value,ids){
 if(Array.isArray(value)){for(const item of value)checkRefs(item,ids);return;}
 if(!value||typeof value!=='object')return;
 for(const ref of value.source_refs||[]){assert.ok(ids.has(ref.id));assert.equal(original.get(ref.id).sha256,ref.sha256);if(ref.page!==undefined)assert.ok(ref.page<=extraction.get(ref.sha256).units.length,'Reference exceeds actual source length');}
 for(const[key,child]of Object.entries(value))if(key!=='source_refs')checkRefs(child,ids);
}
for(const unit of courseUnits){
 const key=unit.subjectId+'/'+unit.topicId;
 if(!expected.has(key)){assert.ok(!unit.module,'Source-empty topic must not advertise invented notes');continue;}
 const file=`content/${key}.json`,content=validateContent(await read(file));
 assert.equal(content.subject,unit.subjectId);assert.equal(content.topic,unit.topicId);assert.equal(content.title,unit.title);
 const ids=new Set(feed.filter(entry=>entry.subject===content.subject&&entry.topic===content.topic).map(entry=>entry.id));
 assert.deepEqual(new Set(content.sources.map(source=>source.id)),ids,'A source was omitted or imported from another topic');
 for(const source of content.sources){const entry=original.get(source.id);assert.equal(source.sha256,entry.sha256);assert.equal(source.url,entry.url);assert.equal(source.extraction_url,`./extracted/${source.sha256}.json`);assert.equal(source.archive_url,`https://github.com/hphugosm/study/releases/download/studylo-learning-v1/${source.sha256}.zip`);}
 checkRefs(content,ids);
 for(const lesson of content.lessons)for(const image of lesson.images||[]){
  const asset=assets.get(image.src.split('/').at(-1));assert.equal(asset?.kind,'figure');
  assert.ok(image.source_refs.some(ref=>asset.source_sha256s.includes(ref.sha256)),'Teaching image source differs');figures++;
 }
 assert.equal(unit.lessonCount,content.lessons.length);assert.equal(unit.questionCount,content.questions.length);
 assert.equal(unit.sourceCount,ids.size);if(content.lessons.length&&unit.available!==false)assert.equal(unit.module,'course-notes');
 found.add(key);lessons+=content.lessons.length;questions+=content.questions.length;cards+=content.flashcards.length;
}
assert.deepEqual(found,expected,'Missing reviewed source-bearing topics');
console.log(`Course notes: ${found.size} source-backed topics, ${lessons} lessons, ${cards} cards, ${questions} questions, ${figures} sourced figures; full extraction for ${hashes.size} files.`);
