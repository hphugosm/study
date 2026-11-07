const test=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const path=require('node:path');
const read=name=>JSON.parse(readFileSync(path.join(__dirname,'../modules/course-notes/content',name),'utf8'));

test('phase-shift question has exactly one mathematically correct offered transformation',()=>{
 const data=read('mathematics/section-9b3237cc2327dfc9a3353506fef752b3.json');
 const question=data.questions.find(item=>['horizontal','quiz-horizontal'].includes(item.id));
 const shifts={'doleva o π/2':-Math.PI/2,'doleva o π':-Math.PI,'doprava o π/4':Math.PI/4,'doprava o π/2':Math.PI/2};
 const samples=[-1.83,-0.73,0.18,0.67,1.13,2.29];
 const correct=question.options.map((option,index)=>({index,shift:shifts[option]})).filter(({shift})=>{
  assert.equal(typeof shift,'number','Unexpected shift option must receive an explicit mathematical check');
  return samples.every(x=>Math.abs(Math.cos(2*(x-shift))-Math.cos(2*x+Math.PI))<1e-12);
 }).map(item=>item.index);
 assert.deepEqual(correct,[question.answer],'Periodic equivalence must not create two correct answers');
});

test('interpretation questions cite the actual poem as well as its worksheet',()=>{
 const data=read('american-literature/section-a9d166e490df453c42d14ac8c07c087c.json');
 const poem='a928e619e0913b18e21e3733bef3b52487bcec99af7393969e69c15c3126cf95';
 assert.ok(data.questions.find(item=>item.id==='parenthesis').source_refs.some(ref=>ref.sha256===poem));
 assert.ok(data.lessons.find(item=>item.id==='america-voices').blocks[2].source_refs.some(ref=>ref.sha256===poem));
});
