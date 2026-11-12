const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const os=require('node:os');
const {spawnSync}=require('node:child_process');

test('build serves topic sources and derived payloads without eager offline downloads',async()=>{
 const temp=await fs.mkdtemp(path.join(os.tmpdir(),'study-moodle-build-'));
 try{
  for(const folder of ['scripts','src','assets','modules'])await fs.mkdir(path.join(temp,folder),{recursive:true});
  // Copy the real generator and its runtime graph; use a small valid public dataset,
  // rather than stubbing/skipping the production notification build hook.
  const runtimeFiles=['scripts/build.mjs','scripts/generate-notifications.mjs','scripts/check-calendar-sync.mjs',
   'src/subject-layout.js','src/moodle-calendar.js','src/assignments.js',
   'modules/moodle-sync/catalog.js','modules/moodle-sync/external.js',
   'modules/course-notes/index.js','modules/course-notes/interactions.js','modules/course-notes/stereometry.js',
   'modules/course-notes/pixels.js','modules/course-notes/pixel-data.js','modules/course-notes/stereometry.css','modules/course-notes/pixels.css'];
  for(const file of runtimeFiles){await fs.mkdir(path.dirname(path.join(temp,file)),{recursive:true});await fs.copyFile(path.join(__dirname,'..',file),path.join(temp,file));}
  await fs.writeFile(path.join(temp,'package.json'),JSON.stringify({type:'module'}));
  const topic='section-'+'1'.repeat(32),unit={id:'moodle-mathematics-'+'1'.repeat(32),subjectId:'mathematics',topicId:topic,origin:'moodle',available:true,listed_current:true,title:'Fixture topic',materials:[]};
  await fs.writeFile(path.join(temp,'src/data.js'),'export const units='+JSON.stringify([unit])+'; export const events=[];');
  await fs.writeFile(path.join(temp,'src/assignment-content.js'),'export const reviewedAssignmentContent=[];');
  await fs.writeFile(path.join(temp,'src/calendar-associations.json'),JSON.stringify({schema:1,manual_event_ids:[],associations:[]}));
  await fs.mkdir(path.join(temp,'modules/moodle-sync'),{recursive:true});
  await fs.writeFile(path.join(temp,'modules/moodle-sync/feed.json'),JSON.stringify({schema:1,entries:[{id:'c'.repeat(64),version:'d'.repeat(64),kind:'assignment',title:'Fixture homework',subject:'mathematics',topic,due:1795073400,calendar_type:'homework'}]}));
  for(const file of ['index.html','styles.css','themes.css','settings.css','manifest.webmanifest','.nojekyll','sw.js'])await fs.writeFile(path.join(temp,file),file==='sw.js'?'const version="__STUDY_BUILD_VERSION__";':'');
  const base=`modules/moodle-sync/data/subjects/mathematics/topics/${topic}/`;
  const source=base+'sources/'+ 'a'.repeat(64)+'.pdf';
  const derived=base+'derived/summary/notes.md';
  const flat='modules/moodle-sync/files/'+ 'b'.repeat(64)+'.pdf';
  const metadata=[base+'sources/index.json',base+'derived/index.json','modules/moodle-sync/data/catalog.json'];
  for(const file of [...metadata,source,derived,flat]){
   await fs.mkdir(path.dirname(path.join(temp,file)),{recursive:true});
   await fs.writeFile(path.join(temp,file),file.endsWith('.json')?JSON.stringify(file.endsWith('sources/index.json')?{schema:1,subject_id:'mathematics',topic_id:topic,sources:[]}:file.endsWith('derived/index.json')?{schema:1,subject_id:'mathematics',topic_id:topic,artifacts:[]}:{schema:1,subjects:[]}):'synthetic payload');
  }
  const build=spawnSync(process.execPath,['scripts/build.mjs'],{cwd:temp,encoding:'utf8'});
  assert.equal(build.status,0,build.stderr);
  const manifest=JSON.parse(await fs.readFile(path.join(temp,'dist/offline-manifest.json'),'utf8'));
  const notifications=JSON.parse(await fs.readFile(path.join(temp,'dist/notifications.json'),'utf8'));
  assert.equal(notifications.schema,1);assert.match(notifications.revision,/^[a-f0-9]{64}$/);assert.equal(notifications.items.length,1);
  assert.equal(notifications.items[0].category,'deadline');assert.equal(notifications.items[0].due,1795073400);
  assert.equal(notifications.items[0].unitId,unit.id);
  const cached=new Set(manifest.assets.map(asset=>asset.url));
  for(const file of [source,derived,flat]){
   await fs.access(path.join(temp,'dist',file));
   assert.equal(cached.has(file),false,`Large optional payload was eagerly cached: ${file}`);
  }
  assert.ok(cached.has('notifications.json'),'Generated public notifications missing from verified offline snapshot');
  for(const file of metadata)assert.ok(cached.has(file),`Small catalog index missing offline: ${file}`);
 }finally{await fs.rm(temp,{recursive:true,force:true});}
});
