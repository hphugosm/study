const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const os=require('node:os');
const crypto=require('node:crypto');
const {spawnSync}=require('node:child_process');
const repo=path.resolve(__dirname,'..');
const prefix='https://github.com/hphugosm/study/releases/download/';
const digest=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
async function put(file,value){await fs.mkdir(path.dirname(file),{recursive:true});await fs.writeFile(file,JSON.stringify(value,null,2)+'\n');}
async function fixture(){
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'study-pending-notes-'));
 const oldTopic='section-'+'1'.repeat(32),newTopic='section-'+'2'.repeat(32);
 const source=(label,sha,topic)=>({id:digest(label),kind:'file',sha256:sha,subject:'physics',topic,title:label,url:prefix+'studylo-materials-v1/'+sha+'.pdf',size:100});
 const old=source('Reviewed optics','a'.repeat(64),oldTopic),pending=source('New approved worksheet','b'.repeat(64),newTopic);
 const topic=(id,title,order)=>({id,title,index:`subjects/physics/topics/${id}/index.json`,origin:'moodle',course_variant:'JU3',section_order:order,available:true,listed_current:true});
 const catalog={schema:1,subjects:[{id:'physics',title:'Fyzika',topics:[topic(oldTopic,'První optická kapitola',0),topic(newTopic,'Nové podklady',1)]}]};
 const topicDirectory=id=>path.join(root,'modules/moodle-sync/data/subjects/physics/topics',id);
 const sourceIndex=(id,entries)=>({schema:1,subject_id:'physics',topic_id:id,sources:entries.map(({id,title,sha256,url,size})=>({id,title,sha256,url,size,source_kind:'moodle',review_status:'approved'}))});
 const content=entry=>({schema:1,subject:'physics',topic:entry.topic,title:entry.topic===oldTopic?'První optická kapitola':'Nové podklady',language:'cs',intro:'Ověřený výklad.',sources:[{id:entry.id,title:entry.title,sha256:entry.sha256,url:entry.url,extraction_url:`./extracted/${entry.sha256}.json`,archive_url:prefix+'studylo-learning-v1/'+entry.sha256+'.zip'}],lessons:[{id:'lesson-one',title:'Paprsek',source_refs:[{id:entry.id,sha256:entry.sha256,page:1}],blocks:[{type:'paragraph',text:'Úhly měříme od kolmice.',source_refs:[{id:entry.id,sha256:entry.sha256,page:1}]}]}],flashcards:[],questions:[]});
 const contentFile=id=>path.join(root,'modules/course-notes/content/physics',id+'.json');
 const feed={schema:1,entries:[old,pending,{id:digest('Assignment metadata'),kind:'assignment',subject:'physics',topic:newTopic,title:'Procvičení bez přílohy'}]};
 await put(path.join(root,'modules/moodle-sync/feed.json'),feed);
 await put(path.join(root,'modules/moodle-sync/data/catalog.json'),catalog);
 await put(path.join(topicDirectory(oldTopic),'sources/index.json'),sourceIndex(oldTopic,[old]));
 await put(path.join(topicDirectory(newTopic),'sources/index.json'),sourceIndex(newTopic,[pending]));
 await put(path.join(topicDirectory(oldTopic),'derived/index.json'),{schema:1,subject_id:'physics',topic_id:oldTopic,artifacts:[]});
 await put(contentFile(oldTopic),content(old));
 const extraction={sha256:old.sha256,units:[{kind:'page',number:1,text:'Úhly měříme od kolmice.'}]};
 const bytes=Buffer.from(JSON.stringify(extraction,null,2)+'\n');
 await fs.mkdir(path.join(root,'modules/course-notes/extracted'),{recursive:true});
 await fs.writeFile(path.join(root,'modules/course-notes/extracted',old.sha256+'.json'),bytes);
 const bundle=Buffer.from('Immutable fixture extraction archive');
 const manifest={schema:1,release:'studylo-learning-v1',assets:[{name:old.sha256+'.zip',sha256:digest(bundle),size:bundle.length,kind:'extraction',source_sha256:old.sha256}],source_texts:[{source_sha256:old.sha256,path:'extracted/'+old.sha256+'.json',sha256:digest(bytes),size:bytes.length,units:1}],counts:{topics:1},extraction:{approved_unique_sources:1,approved_entries:1,privacy_scope:'approved_public_sources_only',ocr:'fallible_transcription'}};
 const manifestFile=path.join(root,'modules/course-notes/learning-assets.json');await put(manifestFile,manifest);
 const prepared=path.join(root,'prepared'),extractions=path.join(root,'raw-extractions');
 await fs.mkdir(path.join(prepared,'bundles'),{recursive:true});await fs.writeFile(path.join(prepared,'bundles',old.sha256+'.zip'),bundle);
 await put(path.join(prepared,'text',old.sha256+'.json'),extraction);
 await put(path.join(prepared,'manifest.json'),{approved_source_set_verified:true,held_sources_included:0,sources:[{source_sha256:old.sha256,name:old.sha256+'.zip',sha256:digest(bundle),bytes:bundle.length}]});
 await put(path.join(prepared,'imagemap.json'),{});
 await put(path.join(extractions,'sources',old.sha256,'source.json'),extraction);
 return {root,old,pending,oldTopic,newTopic,feed,manifest,manifestFile,topicDirectory,sourceIndex,content,contentFile,prepared,extractions,cleanup:()=>fs.rm(root,{recursive:true,force:true})};
}
async function api(){return {...await import('../scripts/generate-course-catalog.mjs'),...await import('../scripts/check-course-notes.mjs')};}
const prepare=f=>spawnSync('python3',['-c',`import importlib.util,pathlib,sys
spec=importlib.util.spec_from_file_location('prepare_course_notes',sys.argv[1]);module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
module.ROOT=pathlib.Path(sys.argv[2]);module.ENGINE=module.ROOT/'modules/course-notes'
sys.argv=['prepare','--prepared',sys.argv[3],'--extractions',sys.argv[4]]
module.main()`,path.join(repo,'scripts/prepare-course-notes.py'),f.root,f.prepared,f.extractions],{encoding:'utf8',env:{...process.env,PYTHONDONTWRITEBYTECODE:'1'}});

test('new approved source-only topic does not block deployment or invent reviewed notes',async()=>{
 const f=await fixture();try{
  const {generateCourseCatalog,checkCourseNotes}=await api();
  const {courseUnits}=await generateCourseCatalog(f.root,{write:false});
  const pending=courseUnits.find(unit=>unit.topicId===f.newTopic);
  assert.equal(pending.sourceCount,1);assert.equal(pending.module,undefined);assert.equal(pending.content_url,undefined);assert.equal(pending.lessonCount,0);assert.match(pending.description,/redakční kontrole/);
  const result=await checkCourseNotes(f.root,{units:courseUnits,log:false});
  assert.deepEqual({topics:result.topics,approvedFiles:result.approvedFiles,extractedFiles:result.extractedFiles,pendingTopics:result.pendingTopics,pendingFiles:result.pendingFiles},{topics:1,approvedFiles:2,extractedFiles:1,pendingTopics:1,pendingFiles:1});
 }finally{await f.cleanup();}
});

test('additional file in an authored topic and a changed source version still fail closed',async()=>{
 const f=await fixture();try{
  const {generateCourseCatalog,checkCourseNotes}=await api();
  const {courseUnits}=await generateCourseCatalog(f.root,{write:false});
  const extra={...f.pending,id:digest('extra current source'),sha256:'c'.repeat(64),topic:f.oldTopic,url:prefix+'studylo-materials-v1/'+'c'.repeat(64)+'.pdf'};
  f.feed.entries.push(extra);await put(path.join(f.root,'modules/moodle-sync/feed.json'),f.feed);
  await put(path.join(f.topicDirectory(f.oldTopic),'sources/index.json'),f.sourceIndex(f.oldTopic,[f.old,extra]));
  await assert.rejects(generateCourseCatalog(f.root,{write:false}),/content_topic_sources_incomplete/);
  await assert.rejects(checkCourseNotes(f.root,{units:courseUnits,log:false}),/source was omitted/);
  const changed={...f.old,sha256:'d'.repeat(64),url:prefix+'studylo-materials-v1/'+'d'.repeat(64)+'.pdf'};
  await put(path.join(f.root,'modules/moodle-sync/feed.json'),{schema:1,entries:[changed,f.pending]});
  await put(path.join(f.topicDirectory(f.oldTopic),'sources/index.json'),f.sourceIndex(f.oldTopic,[changed]));
  await assert.rejects(generateCourseCatalog(f.root,{write:false}),/content_source_not_in_topic/);
  await assert.rejects(checkCourseNotes(f.root,{units:courseUnits,log:false}));
 }finally{await f.cleanup();}
});

test('pending mode never allows unapproved archives, missing full text or false module advertising',async()=>{
 const f=await fixture();try{
  const {generateCourseCatalog,checkCourseNotes}=await api();const {courseUnits}=await generateCourseCatalog(f.root,{write:false});
  const falseUnits=courseUnits.map(unit=>unit.topicId===f.newTopic?{...unit,module:'course-notes',content_url:'unreviewed.json'}:unit);
  await assert.rejects(checkCourseNotes(f.root,{units:falseUnits,log:false}),/must not advertise/);
  await put(f.manifestFile,{...f.manifest,source_texts:[]});
  await assert.rejects(checkCourseNotes(f.root,{units:courseUnits,log:false}),/Full text set differs/);
  const unapproved={name:'e'.repeat(64)+'.zip',sha256:'f'.repeat(64),size:10,kind:'extraction',source_sha256:'e'.repeat(64)};
  await put(f.manifestFile,{...f.manifest,assets:[...f.manifest.assets,unapproved]});
  await assert.rejects(checkCourseNotes(f.root,{units:courseUnits,log:false}));
 }finally{await f.cleanup();}
});

test('preparation stages new source-only topics but requires full exact extraction for authored content',async()=>{
 const f=await fixture();try{
  const result=prepare(f);assert.equal(result.status,0,result.stderr);
  const manifest=JSON.parse(await fs.readFile(f.manifestFile,'utf8'));
  assert.equal(manifest.counts.topics,1);assert.equal(manifest.extraction.prepared_unique_sources,1);assert.equal(manifest.extraction.pending_unique_sources,1);assert.equal(manifest.extraction.pending_topics,1);
  const {generateCourseCatalog,checkCourseNotes}=await api();const {courseUnits}=await generateCourseCatalog(f.root,{write:false});
  assert.equal((await checkCourseNotes(f.root,{units:courseUnits,log:false})).pendingTopics,1);
  await put(f.contentFile(f.newTopic),f.content(f.pending));
  const missing=prepare(f);assert.notEqual(missing.status,0);assert.match(missing.stderr,/require complete source extraction/);
  await fs.rm(f.contentFile(f.newTopic));
  const inventedTopic='section-'+'3'.repeat(32);await put(f.contentFile(inventedTopic),{...f.content(f.pending),topic:inventedTopic});
  const invented=prepare(f);assert.notEqual(invented.status,0);assert.match(invented.stderr,/must belong to an approved/);
 }finally{await f.cleanup();}
});
