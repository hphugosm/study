const test=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>JSON.parse(readFileSync(path.join(root,p),'utf8'));
const digest='a'.repeat(64), other='b'.repeat(64);
const source={id:digest,title:'Schválený zdroj',path:`data/subjects/mathematics/topics/trig-functions/sources/${digest}.pdf`,sha256:digest,size:100,source_kind:'moodle',review_status:'approved'};
const index=sources=>({schema:1,subject_id:'mathematics',topic_id:'trig-functions',sources});
const validators=()=>import('../modules/moodle-sync/catalog.js');

test('source scaffold includes public subject/topics and only reviewed local original sources',async()=>{
 const {validateCatalog,validateTopic,validateSources,validateDerived}=await validators();
 const catalog=validateCatalog(read('modules/moodle-sync/data/catalog.json'));
 const {subjects,units}=await import('../src/data.js');
 for(const subject of subjects)assert.ok(catalog.subjects.some(item=>item.id===subject.id&&item.title===subject.name));
 for(const unit of units)assert.ok(catalog.subjects.find(item=>item.id===unit.subjectId).topics.some(item=>item.id===unit.id&&item.title===unit.title));
 for(const subject of catalog.subjects)for(const ref of subject.topics){
  const topic=validateTopic(read('modules/moodle-sync/data/'+ref.index));
  assert.equal(topic.subject_id,subject.id);assert.equal(topic.topic_id,ref.id);
  const dir=path.posix.dirname(ref.index);
  const sources=validateSources(read(`modules/moodle-sync/data/${dir}/${topic.sources_index}`));
  const derived=validateDerived(read(`modules/moodle-sync/data/${dir}/${topic.derived_index}`),sources);
  assert.ok(sources.sources.every(source=>source.source_kind==='manual'&&source.review_status==='approved'));assert.deepEqual(derived.artifacts,[]);
 }
});
test('source catalog refuses unreviewed entries, private metadata and cross-topic or traversal paths',async()=>{
 const {validateSources}=await validators();
 assert.equal(validateSources(index([source])).sources.length,1);
 for(const change of [{review_status:'pending'},{course_id:123},{path:'../../private.pdf'},{path:source.path.replace('mathematics','biology')},{sha256:other},{title:'token=private'},{title:'student@example.com'},{source_kind:'external'}]){
  assert.throws(()=>validateSources(index([{...source,...change}])));
 }
 assert.equal(validateSources(index([{...source,source_kind:'manual'}])).sources.length,1);
 assert.throws(()=>validateSources(index([source,source])));
});
test('derived outputs reference exact current approved sources instead of silently changing provenance',async()=>{
 const {validateDerived}=await validators();
 const artifact={id:'summary',title:'Schválený výtah',kind:'extract',path:'data/subjects/mathematics/topics/trig-functions/derived/summary/notes.md',sha256:other,source_refs:[{id:digest,sha256:digest}],review_status:'approved'};
 const derived=artifacts=>({schema:1,subject_id:'mathematics',topic_id:'trig-functions',artifacts});
 assert.equal(validateDerived(derived([artifact]),index([source])).artifacts.length,1);
 for(const change of [{source_refs:[{id:digest,sha256:other}]},{source_refs:[]},{source_refs:[{id:other,sha256:digest}]},{review_status:'draft'},{path:'data/subjects/mathematics/topics/trig-functions/sources/notes.md'}]){
  assert.throws(()=>validateDerived(derived([{...artifact,...change}]),index([source])));
 }
});

test('seeded source bytes match six explicit existing public originals and preserve their legacy paths',async()=>{
 const {createHash}=require('node:crypto');
 const {PUBLIC_SOURCE_PLAN,publicSourceId}=await import('../scripts/seed-public-sources.mjs');
 assert.equal(PUBLIC_SOURCE_PLAN.length,6);
 let references=0;
 for(const plan of PUBLIC_SOURCE_PLAN){
  assert.ok(!/prehled|Expanded|barevne_poznamky/i.test(plan.original),'Derived notes must not become raw sources');
  const bytes=readFileSync(path.join(root,plan.original));
  const hash=createHash('sha256').update(bytes).digest('hex');
  for(const topic of plan.topics){
   const sources=read(`modules/moodle-sync/data/subjects/${plan.subject}/topics/${topic}/sources/index.json`);
   const entry=sources.sources.find(source=>source.id===publicSourceId(plan.original));
   assert.ok(entry);assert.equal(entry.sha256,hash);assert.equal(entry.size,bytes.length);
   assert.ok(bytes.equals(readFileSync(path.join(root,'modules/moodle-sync',entry.path))));
   references++;
  }
 }
 assert.equal(references,11);
});
