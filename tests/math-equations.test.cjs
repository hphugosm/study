const {test}=require('node:test');
const assert=require('node:assert/strict');
const data=import('../modules/math-equations/data.js');
test('all supplied equation branches satisfy their original equations across periods',async()=>{
 const {equations,equationResidual}=await data;
 for(const equation of equations){
  assert.ok(equation.steps.length>=3);
  for(const root of equation.roots)for(let k=-12;k<=12;k++)assert.ok(Math.abs(equationResidual(equation.id,root+k*equation.period))<1e-9,`${equation.id}, k=${k}`);
 }
});
test('sin 3x divides the entire argument solution and period, quadratic excludes sin x=3',async()=>{
 const {equations,equationResidual}=await data;
 const triple=equations.find(e=>e.id==='sin-three');
 assert.equal(triple.period,2*Math.PI/3);
 assert.equal(triple.roots[0],Math.PI/18);
 assert.equal(triple.roots[1],5*Math.PI/18);
 assert.ok(Math.abs(equationResidual('sin-three',Math.PI/6))>.4);
 const quadratic=equations.find(e=>e.id==='quadratic');
 assert.deepEqual(quadratic.roots,[7*Math.PI/6,11*Math.PI/6]);
 assert.ok(quadratic.steps.some(s=>s[1].includes('není přípustné')));
});
test('tangent equation retains its domain exclusion and pi-periodic branch',async()=>{
 const {equations,equationResidual}=await data;
 const tangent=equations.find(e=>e.id==='tan-third');
 assert.equal(tangent.period,Math.PI);
 assert.equal(tangent.roots.length,1);
 assert.ok(tangent.steps[0][1].includes('π/2 + kπ'));
 assert.ok(Math.abs(equationResidual(tangent.id,Math.PI/2))>1e10);
});
test('displayed periodic inequality intervals agree with original inequalities over twenty periods',async()=>{
 const {inequalities,inequalityHolds,intervalContains}=await data;
 for(const inequality of inequalities)for(let i=-10000;i<=10000;i++){
  const x=i*Math.PI/500;
  assert.equal(intervalContains(inequality.id,x),inequalityHolds(inequality.id,x),`${inequality.id} x=${x}`);
 }
});
test('strict inequality endpoints are excluded in every tested period',async()=>{
 const {inequalities,inequalityHolds,intervalContains}=await data;
 for(const inequality of inequalities)for(let k=-10;k<=10;k++)for(const endpoint of[inequality.start,inequality.end]){
  const x=endpoint+k*2*Math.PI;
  assert.equal(inequalityHolds(inequality.id,x),false);
  assert.equal(intervalContains(inequality.id,x),false);
 }
});
test('special angle labels are exact and non-finite inputs cannot satisfy inequalities',async()=>{
 const {formatPi,inequalityHolds}=await data;
 assert.equal(formatPi(0),'0');assert.equal(formatPi(-7*Math.PI/6),'−7π/6');assert.equal(formatPi(Math.PI/18),'π/18');
 assert.equal(inequalityHolds('sin-greater',NaN),false);assert.equal(inequalityHolds('sin-greater',Infinity),false);
});
