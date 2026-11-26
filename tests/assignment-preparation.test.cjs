const test=require('node:test');const assert=require('node:assert/strict');
const H=c=>c.repeat(64);
const row={id:H('a'),kind:'assignment',version:H('b'),subject:'chemistry',topic:'topic',title:'Pokus',due:1795897500};
const source={sourceId:H('c'),sha256:H('d'),url:`https://github.com/hphugosm/study/releases/download/studylo-materials-v1/${H('d')}.docx`};
const unit={id:'unit',subjectId:'chemistry',topicId:'topic',materials:[source]};
const ref={id:H('c'),sha256:H('d'),page:1,locator:'pracovní list, vykreslená strana 1'};
const preparation={assignmentId:row.id,version:row.version,subject:'chemistry',topic:'topic',scope:'attachment-study-preparation',reviewed:true,reviewed_on:'2026-11-16',title:'Studijní příprava',description:'Teorie a protokol; vlastní pozorování doplň.',source_refs:[ref],downloads:[{id:'protocol',title:'Protokol k doplnění',format:'docx',url:`https://github.com/hphugosm/study/releases/download/studylo-learning-v1/${H('e')}.docx`,sha256:H('e'),size:100,source_refs:[ref]}]};
async function tasks(entry=row,record=preparation,target=unit){const {assignmentsForUnit}=await import('../src/assignments.js');return assignmentsForUnit(target,{units:[target],feed:[entry],details:[],preparations:[record],now:0});}
test('attachment preparation leaves the unread full prompt and finished solution absent',async()=>{const [task]=await tasks();assert.equal(task.prompt,null);assert.equal(task.solution,undefined);assert.deepEqual(task.solutions,[]);assert.equal(task.preparation.downloads[0].title,'Protokol k doplnění');assert.match(task.preparation.description,/vlastní pozorování/);});
test('changed assignment version and foreign topic never inherit a previous preparation',async()=>{assert.equal((await tasks({...row,version:H('f')}))[0].preparation,undefined);assert.equal((await tasks(row,{...preparation,topic:'other'}))[0].preparation,undefined);});
test('preparation rejects unreviewed content, full-prompt fields and unapproved source identities',async()=>{for(const changes of [{reviewed:false},{scope:'finished-homework'},{prompt:'Invented prompt'},{source_refs:[{...ref,sha256:H('f')}]}])await assert.rejects(tasks(row,{...preparation,...changes}));});
test('preparation files retain canonical immutable URLs and exact source subsets',async()=>{for(const file of [{...preparation.downloads[0],url:'https://example.com/file.docx'},{...preparation.downloads[0],source_refs:[{id:H('f'),sha256:H('f')}]}])await assert.rejects(tasks(row,{...preparation,downloads:[file]}));});
test('reviewed denaturation prompt requires a real photo without turning preparation into a finished experiment',async()=>{
 const {readFile}=require('node:fs/promises');const {units}=await import('../src/data.js');const {assignmentsForUnit}=await import('../src/assignments.js');
 const feed=JSON.parse(await readFile(new URL('../modules/moodle-sync/feed.json','file://'+__filename)));
 const manifest=JSON.parse(await readFile(new URL('../modules/course-notes/learning-assets.json','file://'+__filename)));
 const topic=units.find(u=>u.id==='moodle-chemistry-7c81652c3859af6be5d57780191a659f');
 const task=assignmentsForUnit(topic,{units,feed}).find(t=>t.preparation);assert.ok(task);
 assert.match(task.prompt,/Pokud zkusíte pokus doma, výsledek vyfoťte/);
 assert.equal(task.solution,null);assert.deepEqual(task.solutions,[]);
 assert.match(task.preparation.description,/fotografii skutečného výsledku/);
 assert.match(task.preparation.description,/pět pozorování, závěr a fotografii doplň/);
 for(const file of task.preparation.downloads){const asset=manifest.assets.find(a=>a.name===file.sha256+'.docx');assert.equal(asset.kind,'solution');assert.equal(asset.size,file.size);assert.ok(file.source_refs.every(r=>asset.source_sha256s.includes(r.sha256)));}
});

test('preparation output never forwards unexpected download metadata',async()=>{const file={...preparation.downloads[0],unexpected:'ignored'};const [task]=await tasks(row,{...preparation,downloads:[file]});assert.equal('unexpected' in task.preparation.downloads[0],false);});

test('partial protocol is marked as preparation in both task and notes downloads',async()=>{const {readFile}=require('node:fs/promises');const {validateContent}=await import('../modules/course-notes/index.js');const content=JSON.parse(await readFile(new URL('../modules/course-notes/content/chemistry/section-7c81652c3859af6be5d57780191a659f.json','file://'+__filename)));const file=content.lessons.flatMap(l=>l.solutions||[]).find(s=>s.sha256==='0121bd65d80461fb15d2b266ae37245fdabe980ade235cf3738fb2ac7b78185c');assert.equal(file.preparation,true);validateContent(content);file.preparation='true';assert.throws(()=>validateContent(content),/invalid_preparation_flag/);});
