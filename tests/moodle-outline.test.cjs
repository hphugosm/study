const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const os=require('node:os');
const root=path.resolve(__dirname,'..');
const topicId=letter=>'section-'+letter.repeat(32);
const outline=(topics,variant='JU3AB')=>({schema:1,subjects:[{id:'mathematics',title:'Matematika',courses:[{variant,topics}]}]});
const item=(id,title,order,available=true)=>({id:topicId(id),title,order,available});
async function fixture(){
 const temp=await fs.mkdtemp(path.join(os.tmpdir(),'study-public-outline-'));
 const {MOODLE_SUBJECTS}=await import('../modules/moodle-sync/catalog.js');
 const catalog={schema:1,moodle_subject_ids:MOODLE_SUBJECTS.map(subject=>subject.id),subjects:MOODLE_SUBJECTS.map(subject=>({...subject,topics:[]}))};
 const dir=path.join(temp,'modules/moodle-sync/data');await fs.mkdir(dir,{recursive:true});
 await fs.writeFile(path.join(dir,'catalog.json'),JSON.stringify(catalog));
 return {root:temp,dir,catalog};
}
async function read(file){return JSON.parse(await fs.readFile(file,'utf8'));}

test('catalog explicitly scopes eleven current subjects without fabricating topics for new subjects',async()=>{
 const {MOODLE_SUBJECTS,validateCatalog}=await import('../modules/moodle-sync/catalog.js');
 const catalog=validateCatalog(await read(path.join(root,'modules/moodle-sync/data/catalog.json')));
 assert.equal(catalog.moodle_subject_ids.length,11);assert.ok(!catalog.moodle_subject_ids.includes('physical-education'));
 assert.equal(catalog.subjects.length,13);assert.ok(catalog.subjects.some(subject=>subject.id==='history'));assert.ok(catalog.subjects.some(subject=>subject.id==='literature'));
 for(const id of ['area-studies','chemistry','american-literature','physics','informatics','sociology','social-sciences','geography']){
  assert.ok(catalog.subjects.find(subject=>subject.id===id).topics.every(topic=>topic.origin==='moodle'&&/^section-[a-f0-9]{32}$/.test(topic.id)),'No guessed legacy topic may populate a newly scaffolded subject');
 }
 const duplicate={...catalog,moodle_subject_ids:[...catalog.moodle_subject_ids.slice(0,-1),catalog.moodle_subject_ids[0]]};assert.throws(()=>validateCatalog(duplicate));
 assert.ok(MOODLE_SUBJECTS.every(subject=>catalog.subjects.find(item=>item.id===subject.id).title===subject.title));
});
test('reviewed actual topic order is stable, unchanged import is idempotent, and sources survive',async()=>{
 const {importReviewedOutline}=await import('../scripts/import-moodle-outline.mjs');
 const fixtureData=await fixture();
 try{
  const manifest=outline([item('a','Skutečně zkontrolované téma A',0),item('b','Skutečně zkontrolované téma B',4,false)]);
  await importReviewedOutline(manifest,{root:fixtureData.root});
  const catalogPath=path.join(fixtureData.dir,'catalog.json');const before=await fs.readFile(catalogPath);
  const sourceFile=path.join(fixtureData.dir,`subjects/mathematics/topics/${topicId('a')}/sources/index.json`);
  const source=await read(sourceFile);const sha='c'.repeat(64);
  source.sources.push({id:sha,title:'Existující schválený podklad',path:`data/subjects/mathematics/topics/${topicId('a')}/sources/${sha}.pdf`,sha256:sha,size:123,source_kind:'manual',review_status:'approved'});
  await fs.writeFile(sourceFile,JSON.stringify(source));const original=await fs.readFile(sourceFile);
  await importReviewedOutline(manifest,{root:fixtureData.root});
  assert.ok(before.equals(await fs.readFile(catalogPath)));assert.ok(original.equals(await fs.readFile(sourceFile)));
  const subject=(await read(catalogPath)).subjects.find(subject=>subject.id==='mathematics');
  assert.deepEqual(subject.topics.map(topic=>topic.section_order),[0,4]);assert.equal(subject.topics[1].available,false);
  await importReviewedOutline(outline([item('b','Skutečně zkontrolované téma B',1)]),{root:fixtureData.root});
  const updated=(await read(catalogPath)).subjects.find(subject=>subject.id==='mathematics');
  assert.equal(updated.topics[0].id,topicId('b'));assert.equal(updated.topics[1].listed_current,false);
  assert.ok(original.equals(await fs.readFile(sourceFile)));
  await importReviewedOutline(outline([]),{root:fixtureData.root});
  const missing=(await read(catalogPath)).subjects.find(subject=>subject.id==='mathematics').topics;
  assert.equal(missing.length,2);assert.ok(missing.every(topic=>topic.listed_current===false));
  assert.ok(original.equals(await fs.readFile(sourceFile)));
 }finally{await fs.rm(fixtureData.root,{recursive:true,force:true});}
});
test('two geography course variants retain their own topic identities and Moodle order',async()=>{
 const {importReviewedOutline}=await import('../scripts/import-moodle-outline.mjs');const fixtureData=await fixture();
 try{
  await importReviewedOutline({schema:1,subjects:[{id:'geography',title:'Zeměpis',courses:[{variant:'JU3',topics:[item('a','První veřejně zkontrolované téma',0)]},{variant:'JU3ABCDE',topics:[item('b','Druhé veřejně zkontrolované téma',0)]}]}]},{root:fixtureData.root});
  const topics=(await read(path.join(fixtureData.dir,'catalog.json'))).subjects.find(subject=>subject.id==='geography').topics;
  assert.deepEqual(topics.map(topic=>topic.course_variant),['JU3','JU3ABCDE']);assert.notEqual(topics[0].id,topics[1].id);
 }finally{await fs.rm(fixtureData.root,{recursive:true,force:true});}
});
test('importer rejects private identifiers, URLs, unknown subjects and malformed or reordered metadata',async()=>{
 const {validatePublicOutline}=await import('../scripts/import-moodle-outline.mjs');
 const examples=[
  {schema:1,subjects:[{id:'physical-education',title:'TV',courses:[]}]},
  outline([{...item('a','Téma',0),id:'section-29931'}]),
  outline([{...item('a','Téma',0),course_id:1016}]),
  outline([item('a','https://ais.gymnazium-amazon.cz/private',0)]),
  outline([item('a','student@example.com',0)]),
  outline([item('a','Téma',4),item('b','Další téma',2)]),
  outline([item('a','Téma',0),item('a','Duplicita',1)]),
 ];
 for(const example of examples)assert.throws(()=>validatePublicOutline(example));
});

test('mistaken malformed private input is rejected without echoing its contents',async()=>{
 const {spawnSync}=require('node:child_process');
 const temp=await fs.mkdtemp(path.join(os.tmpdir(),'study-outline-redaction-'));
 try{
  const file=path.join(temp,'invalid.json');await fs.writeFile(file,'{"token":"DO_NOT_LOG_PRIVATE_VALUE"');
  const result=spawnSync(process.execPath,[path.join(root,'scripts/import-moodle-outline.mjs'),'--approved-manifest',file],{encoding:'utf8'});
  assert.equal(result.status,2);assert.ok(!result.stderr.includes('DO_NOT_LOG_PRIVATE_VALUE'));
  assert.match(result.stderr,/public_outline_import_failed_check_reviewed_manifest/);
 }finally{await fs.rm(temp,{recursive:true,force:true});}
});

test('readable topic lists preserve manual text and separate ordered variants from legacy material',async()=>{
 const {importReviewedOutline,mergeOutlineReadme}=await import('../scripts/import-moodle-outline.mjs');
 const fixtureData=await fixture();
 try{
  const readme=path.join(fixtureData.dir,'subjects/mathematics/README.md');
  await fs.mkdir(path.dirname(readme),{recursive:true});await fs.writeFile(readme,'# Matematika\n\nRučně ověřená poznámka musí zůstat.\n');
  await importReviewedOutline(outline([item('a','První zkontrolované téma',0),item('b','Druhé zkontrolované téma',4,false)]),{root:fixtureData.root});
  const content=await fs.readFile(readme,'utf8');
  assert.match(content,/Ručně ověřená poznámka musí zůstat/);assert.match(content,/Varianta JU3AB/);
  assert.ok(content.indexOf('První zkontrolované téma')<content.indexOf('Druhé zkontrolované téma'));
  assert.match(content,/\*\*4\.\*\*/);assert.match(content,/v Moodlu zatím nedostupné/);
  assert.match(content,/topics\/section-[a-f0-9]{32}\/README\.md/);
  const overview=await fs.readFile(path.join(fixtureData.dir,'README.md'),'utf8');
  assert.match(overview,/\*\*2 skutečných témat Moodlu\*\*/);assert.match(overview,/\*\*11 předmětech\*\*/);
  assert.equal(mergeOutlineReadme(mergeOutlineReadme('# Test\nManual text','first'),'second').match(/moodle-outline:start/g).length,1);
  assert.throws(()=>mergeOutlineReadme('<!-- moodle-outline:start -->without end','new'));
 }finally{await fs.rm(fixtureData.root,{recursive:true,force:true});}
});
