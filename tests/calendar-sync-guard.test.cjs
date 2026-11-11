const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {spawnSync}=require('node:child_process');
const {resolve}=require('node:path');
const guard=import('../scripts/check-calendar-sync.mjs');
const unit={id:'topic-unit',subjectId:'law',topicId:'section-one'};
const associations={schema:1,manual_event_ids:[],associations:[]};
const row=(id,extra={})=>({id:id.repeat(64),version:'f'.repeat(64),kind:'assignment',subject:'law',topic:'section-one',title:'Ordinary assignment',calendar_type:'homework',due:1795073400,...extra});
const feed=entries=>({schema:1,entries});
const check=async(entries,options={})=>(await guard).checkCalendarSync(feed(entries),{units:[unit],manualEvents:[],associations,...options});
const codes=result=>result.issues.map(issue=>issue.code);

test('current approved feed, trusted manual associations and exact deadline times pass',async()=>{
 const result=(await guard).checkCalendarSync(JSON.parse(readFileSync(resolve(__dirname,'../modules/moodle-sync/feed.json'),'utf8')));
 assert.equal(result.ok,true,JSON.stringify(result.issues));
 assert.ok(result.counts.deadlines>0);assert.equal(result.counts.linkedPreparations,1);
});

test('Quiz boundaries cover reminders and underscores, excluding unrelated words',async()=>{
 for(const title of ['Quiz 2','Reminder: QUIZ_2','Quizzes tomorrow','(quiz)','Quiz2','QuizReminder','QuizReminders']){
  assert.ok(codes(await check([row('a',{title})])).includes('quiz_must_be_test'),title);
  assert.equal((await check([row('a',{title,calendar_type:'test'})])).ok,true,title);
 }
 for(const title of ['Quizlet practice','quizzical reading','prequiz','αquiz','quizα','QuizReminderExtra'])assert.equal((await check([row('a',{title})])).ok,true,title);
});

test('all assignments need explicit reviewed category even without a due date',async()=>{
 const candidate=row('a',{due:null});delete candidate.calendar_type;
 assert.ok(codes(await check([candidate])).includes('assignment_category_missing'));
 assert.equal((await check([row('a',{due:null})])).ok,true);
});

test('duplicate source identities fail while unrelated same-day titles remain separate',async()=>{
 assert.ok(codes(await check([row('a'),row('a')])).includes('duplicate_source_identity'));
 const result=await check([row('a'),row('b'),row('c',{kind:'event',starts:1795073400,duration:600,calendar_role:'scheduled'})]);
 assert.equal(result.ok,true,JSON.stringify(result.issues));assert.equal(result.counts.importedEvents,3);
});

test('explicit same-topic linked deadline collapses and conflicting category fails',async()=>{
 const event=row('b',{kind:'event',starts:1795073400,duration:0,calendar_role:'deadline',related_assignment:'a'.repeat(64)});
 const result=await check([row('a'),event]);assert.equal(result.ok,true);assert.equal(result.counts.importedEvents,1);
 assert.ok(codes(await check([row('a'),{...event,calendar_type:'test'}])).includes('linked_calendar_category_conflict'));
});

test('one scoped assignment cannot publish conflicting deadline instants',async()=>{
 const otherTime=1795159800;
 const event=row('b',{kind:'event',starts:otherTime,duration:0,calendar_role:'deadline',related_assignment:'a'.repeat(64)});
 assert.ok(codes(await check([row('a'),event])).includes('conflicting_assignment_deadlines'));
 assert.equal((await check([row('a'),{...event,related_assignment:'c'.repeat(64)}])).ok,true);
 assert.equal((await check([row('a'),{...event,calendar_role:'scheduled'}])).ok,true);
 assert.equal((await check([row('a'),{...event,calendar_role:'scheduled',starts:1795073400}])).ok,true);
 const orphan={...event,starts:1795073400};
 assert.ok(codes(await check([orphan,{...orphan,id:'c'.repeat(64)}])).includes('duplicate_assignment_instant'));
 assert.equal((await check([orphan,{...orphan,id:'c'.repeat(64),topic:'section-other'}],{units:[unit,{...unit,id:'other-unit',topicId:'section-other'}]})).ok,true);
});

test('manual source association retains preparation and old alias when deadline moves',async()=>{
 const manual={id:'law-test',unitId:'original-tools',date:'2026-11-19',type:'test',title:'Preparation',sourceAssignmentId:'a'.repeat(64),sourceAssignmentUnitId:unit.id};
 const config={schema:1,manual_event_ids:['law-test'],associations:[{id:'law-test',assignment_id:'a'.repeat(64),subject:'law',topic:'section-one'}]};
 for(const due of [1795073400,1795159800]){
  const result=await check([row('a',{title:'Quiz 2',calendar_type:'test',due})],{manualEvents:[manual],associations:config});
  assert.equal(result.ok,true,JSON.stringify(result.issues));assert.equal(result.counts.effectiveEvents,1);assert.equal(result.counts.linkedPreparations,1);
 }
 assert.ok(codes(await check([row('a')],{manualEvents:[manual]})).includes('manual_event_configuration_mismatch'));
 assert.ok(codes(await check([row('a')],{manualEvents:[manual],associations:{...config,associations:[{...config.associations[0],topic:'wrong'}]}})).includes('manual_association_configuration_mismatch'));
});

test('topic ambiguity or missing mapping is refused rather than guessed',async()=>{
 for(const units of [[],[unit,{...unit,id:'another'}]])assert.ok(codes(await check([row('a')],{units})).includes('calendar_topic_not_unique'));
});

test('Prague midnight and daylight-saving instants retain exact timestamps',async()=>{
 for(const iso of ['2026-05-07T22:00:00Z','2026-03-29T00:30:00Z','2026-03-29T01:30:00Z','2026-10-25T00:30:00Z','2026-10-25T01:30:00Z'])assert.equal((await check([row('a',{due:Date.parse(iso)/1000})])).ok,true,iso);
});

test('CLI accepts candidate JSON on stdin and never evaluates or echoes candidate content',()=>{
 const script=resolve(__dirname,'../scripts/check-calendar-sync.mjs');
 const candidate={schema:1,entries:[],untrusted_code:'throw new Error("PRIVATE_SENTINEL")'};
 const good=spawnSync(process.execPath,[script,'--feed','-'],{input:JSON.stringify(candidate),encoding:'utf8'});
 assert.equal(good.status,0,good.stderr);assert.equal(JSON.parse(good.stdout).ok,true);assert.ok(!good.stdout.includes('PRIVATE_SENTINEL'));
 for(const [args,input] of [[['--feed','-'],'PRIVATE_SENTINEL'],[['--unknown','PRIVATE_SENTINEL'],'']]){
  const bad=spawnSync(process.execPath,[script,...args],{input,encoding:'utf8'});assert.equal(bad.status,1);assert.equal(bad.stderr,'calendar_sync_guard_input_error\n');assert.equal(bad.stdout,'');
 }
});
