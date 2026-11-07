const test = require('node:test');
const assert = require('node:assert/strict');
const mod = import('../interactions.js');
const close = (a,b,tolerance=1e-9) => assert.ok(Math.abs(a-b)<tolerance, `${a} ≉ ${b}`);

test('Snell refraction gives source-consistent angles and equal-index propagation', async () => {
  const {evaluateRefraction} = await mod;
  const result = evaluateRefraction({n1:1,n2:1.5,incidence:45});
  close(result.refractedAngle,28.1255057020557);
  close(result.n1*Math.sin(result.incidence*Math.PI/180),result.n2*Math.sin(result.refractedAngle*Math.PI/180));
  assert.equal(result.totalInternalReflection,false); assert.equal(result.criticalAngle,null);
  close(evaluateRefraction({n1:1.33,n2:1.33,incidence:62.4}).refractedAngle,62.4);
  close(evaluateRefraction({n1:1.5,n2:1,incidence:0}).refractedAngle,0);
});
test('total internal reflection returns no fake transmitted angle; critical boundary stays real', async () => {
  const {evaluateRefraction} = await mod;
  const tir=evaluateRefraction({n1:1.5,n2:1,incidence:50});
  assert.equal(tir.totalInternalReflection,true); assert.equal(tir.refractedAngle,null); close(tir.criticalAngle,41.810314895778596);
  const at=evaluateRefraction({n1:1.5,n2:1,incidence:tir.criticalAngle});
  assert.equal(at.totalInternalReflection,false); close(at.refractedAngle,90,1e-6);
  assert.equal(evaluateRefraction({n1:1.5,n2:1,incidence:tir.criticalAngle+0.001}).totalInternalReflection,true);
  assert.ok(evaluateRefraction({n1:1,n2:1.5,incidence:89.9}).refractedAngle<90);
});
test('invalid, empty, nonfinite and out-of-range physical inputs are rejected', async () => {
  const {evaluateRefraction} = await mod;
  for(const patch of [{n1:0},{n2:-1},{n1:NaN},{n2:Infinity},{n1:'1'},{n1:6},{incidence:-1},{incidence:90},{incidence:NaN},{incidence:Infinity},{incidence:'45'}])
    assert.throws(()=>evaluateRefraction({n1:1,n2:1.5,incidence:45,...patch}),TypeError);
  assert.throws(()=>evaluateRefraction(),TypeError);
});
test('source parity example 10110010 contains four ones; both parity conventions work', async () => {
  const {evaluateParity} = await mod;
  assert.deepEqual(evaluateParity('10110010','even'),{bits:'10110010',parity:'even',ones:4,parityBit:0,encoded:'101100100',totalOnes:4});
  assert.deepEqual(evaluateParity('10110010','odd'),{bits:'10110010',parity:'odd',ones:4,parityBit:1,encoded:'101100101',totalOnes:5});
  assert.equal(evaluateParity('111','even').parityBit,1); assert.equal(evaluateParity('111','odd').parityBit,0);
  assert.equal(evaluateParity('0','even').encoded,'00'); assert.equal(evaluateParity('0','odd').encoded,'01');
});
test('parity supports 64 bits, rejects malformed messages and detects single-bit corruption', async () => {
  const {evaluateParity} = await mod;
  const maximum=evaluateParity('1'.repeat(64),'even'); assert.equal(maximum.ones,64); assert.equal(maximum.encoded.length,65);
  for(const value of ['', '2', '10 1', '010\n', '1'.repeat(65), '０１', 101, null]) assert.throws(()=>evaluateParity(value),TypeError);
  assert.throws(()=>evaluateParity('1','other'),TypeError);
  const encoded=evaluateParity('10110010').encoded;
  for(let i=0;i<encoded.length;i++) {
    const flipped=encoded.slice(0,i)+(encoded[i]==='1'?'0':'1')+encoded.slice(i+1);
    assert.equal([...flipped].filter(x=>x==='1').length%2,1);
  }
});
test('interaction descriptor accepts partial validated defaults without mutating input', async () => {
  const {validateInteraction} = await mod;
  const descriptor={kind:'refraction',title:'Lom světla',defaults:{incidence:50},source_refs:[{id:'source'}]};
  const validated=validateInteraction(descriptor);
  assert.deepEqual(validated.defaults,{n1:1,n2:1.5,incidence:50}); assert.deepEqual(descriptor.defaults,{incidence:50});
  assert.deepEqual(validateInteraction({kind:'parity',title:'Parita'}).defaults,{bits:'10110010',parity:'even'});
  for(const bad of [{kind:'code',title:'X'}, {kind:'parity',title:'<script>x</script>'}, {kind:'parity',title:'X',defaults:[]}, {kind:'parity',title:'X',defaults:{arbitrary:'payload'}}, {kind:'parity',title:'X',defaults:{bits:'2'}}, {kind:'refraction',title:'X',defaults:{incidence:90}}]) assert.throws(()=>validateInteraction(bad),TypeError);
});
