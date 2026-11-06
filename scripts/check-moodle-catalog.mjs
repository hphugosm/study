import { readFile, lstat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
import { validateCatalog, validateTopic, validateSources, validateDerived } from '../modules/moodle-sync/catalog.js';
import { subjects, units } from '../src/data.js';
const root=fileURLToPath(new URL('../',import.meta.url));
const moduleRoot=path.join(root,'modules/moodle-sync');
const dataRoot=path.join(moduleRoot,'data');
const readJSON=async file=>JSON.parse(await readFile(file,'utf8'));
const catalog=validateCatalog(await readJSON(path.join(dataRoot,'catalog.json')));
let topicCount=0,sourceCount=0,derivedCount=0;
for(const subject of catalog.subjects){
 const existing=subjects.find(item=>item.id===subject.id);
 if(existing)assert.equal(subject.study_title||subject.title,existing.name,'Existing public subject title differs');
 for(const ref of subject.topics){
  const topic=validateTopic(await readJSON(path.join(dataRoot,ref.index)));
  assert.equal(topic.subject_id,subject.id);assert.equal(topic.topic_id,ref.id);assert.equal(topic.title,ref.title);
  for(const field of ['origin','course_variant','section_order','available','listed_current'])assert.equal(topic[field],ref[field],'Topic outline metadata differs');
  const dir=path.dirname(path.join(dataRoot,ref.index));
  const sources=validateSources(await readJSON(path.join(dir,topic.sources_index)));
  const derived=validateDerived(await readJSON(path.join(dir,topic.derived_index)),sources);
  for(const index of [sources,derived]){assert.equal(index.subject_id,subject.id);assert.equal(index.topic_id,ref.id);}
  for(const entry of [...sources.sources,...derived.artifacts]){
   // Release URLs are format/digest-bound references. Upload bytes are verified separately, never downloaded in check/build.
   if(entry.url!==undefined)continue;
   const file=path.join(moduleRoot,entry.path);
   const stat=await lstat(file);assert.ok(stat.isFile()&&!stat.isSymbolicLink(),'Catalog asset must be a regular file');
   const bytes=await readFile(file);
   assert.equal(createHash('sha256').update(bytes).digest('hex'),entry.sha256,'Catalog asset fingerprint differs');
   if(entry.size!==undefined)assert.equal(bytes.length,entry.size,'Catalog asset size differs');
  }
  topicCount++;sourceCount+=sources.sources.length;derivedCount+=derived.artifacts.length;
 }
}
for(const subject of subjects)assert.ok(catalog.subjects.some(item=>item.id===subject.id),'Existing public subject missing from source catalog');
for(const unit of units)assert.ok(catalog.subjects.find(item=>item.id===unit.subjectId)?.topics.some(item=>item.id===unit.id),'Existing public topic missing from source catalog');
console.log(`Moodle source catalog: ${catalog.subjects.length} subjects, ${topicCount} topics, ${sourceCount} approved sources, ${derivedCount} reviewed derived outputs.`);
