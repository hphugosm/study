const test = require('node:test');
const assert = require('node:assert/strict');
const math = import('../modules/math-trig/math.js');
const near=(actual,expected,tolerance=1e-10)=>assert.ok(Math.abs(actual-expected)<=tolerance,`${actual} ≉ ${expected}`);
test('circle conversions, exact zero denominators and special-angle signs',async()=>{
 const {degreesToRadians,radiansToDegrees,trigValue}=await math;
 near(degreesToRadians(60),Math.PI/3);near(radiansToDegrees(3*Math.PI/2),270);
 assert.equal(trigValue('tan',Math.PI/2),null);assert.equal(trigValue('cot',0),null);
 near(trigValue('cos',7*Math.PI/6),-Math.sqrt(3)/2);
 near(trigValue('tan',-Math.PI/4),-1);
});
test('transformed sample does not join any tangent/cotangent pole, including negative b',async()=>{
 const {graphSegments,graphPoles}=await math;
 for(const fn of ['tan','cot'])for(const b of [-2,-.5,1,3]){
  const poles=graphPoles(fn,b,Math.PI/4),segments=graphSegments(fn,2,b,Math.PI/4,-1);
  for(const segment of segments)for(let i=1;i<segment.length;i++)for(const p of poles)assert.ok(!(segment[i-1][0]<p&&segment[i][0]>p),'A segment crossed a pole');
 }
});
test('zero parameters retain the expression domain and handle undefined cot zero',async()=>{
 const {transformedValue,graphSegments}=await math;
 assert.equal(transformedValue('tan',Math.PI/2,0,1,0,3),null);
 assert.equal(transformedValue('cot',1,0,0,0,3),null);
 assert.equal(graphSegments('cot',1,0,0,0).length,0);
 assert.equal(transformedValue('cos',4,2,0,9,-3),-1);
 assert.equal(transformedValue('sin',4,2,0,9,-3),-3);
});
test('presentation triangle c=sqrt43, sine-law and angle-sum checks',async()=>{
 const {solveTriangle,degreesToRadians}=await math;const t=solveTriangle(6,7,60);
 near(t.c,Math.sqrt(43));near(t.alpha+t.beta+t.gamma,180);
 near(t.a/Math.sin(degreesToRadians(t.alpha)),t.b/Math.sin(degreesToRadians(t.beta)));
 near(t.a/Math.sin(degreesToRadians(t.alpha)),t.c/Math.sin(degreesToRadians(t.gamma)));
 for(const args of [[0,7,60],[6,-7,60],[6,7,0],[6,7,180],[NaN,7,60]])assert.throws(()=>solveTriangle(...args));
});
test('scaled triangle calculation never emits NaN for finite extreme equal sides',async()=>{
 const {solveTriangle}=await math;
 for(const side of [1e-200,1e200]){const t=solveTriangle(side,side,60);assert.ok(Number.isFinite(t.c)&&t.c>0);near(t.c/side,1);near(t.alpha,60);near(t.beta,60);}
});
