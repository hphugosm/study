const {test}=require('node:test');
const assert=require('node:assert/strict');
const moduleURL=require('node:url').pathToFileURL(require('node:path').resolve(__dirname,'../stereometry.js'));
const api=()=>import(moduleURL);
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} ≠ ${b}`);
test('seven source shapes: total surface includes every base and correct perpendicular height',async()=>{
 const {evaluateSolid:e}=await api();
 for(const [shape,d,V,S,s]of [
 ['cube',{a:2},8,24],['cuboid',{a:2,b:3,c:4},24,52],['cylinder',{r:3,v:4},36*Math.PI,42*Math.PI],
 ['cone',{r:3,v:4},12*Math.PI,24*Math.PI,5],['sphere',{r:3},36*Math.PI,36*Math.PI],
 ['pyramid',{a:6,v:4},48,96,5],['frustum',{r1:5,r2:2,v:4},52*Math.PI,64*Math.PI,5]]){
 const result=e(shape,d);near(result.volume,V);near(result.surface,S);if(s)near(result.slant,s);
 }
});
test('uniform scaling preserves degree2 surfaces and degree3 volumes for every shape',async()=>{
 const {evaluateSolid:e}=await api();for(const [shape,d]of Object.entries({cube:{a:2},cuboid:{a:2,b:3,c:4},cylinder:{r:2,v:3},cone:{r:2,v:3},sphere:{r:2},pyramid:{a:2,v:3},frustum:{r1:2,r2:1,v:3}})){
 const original=e(shape,d),scaled=e(shape,Object.fromEntries(Object.entries(d).map(([k,n])=>[k,n*2])));near(scaled.surface,original.surface*4);near(scaled.volume,original.volume*8);
 }
});
test('frustum equal radii is cylinder, inverted radii preserve quantities, slant never confused with height',async()=>{
 const {evaluateSolid:e}=await api();let f=e('frustum',{r1:3,r2:3,v:4}),c=e('cylinder',{r:3,v:4});near(f.surface,c.surface);near(f.volume,c.volume);near(f.slant,4);
 const a=e('frustum',{r1:5,r2:2,v:4}),b=e('frustum',{r1:2,r2:5,v:4});near(a.volume,b.volume);near(a.surface,b.surface);
 near(e('cone',{r:3,v:4}).slant,5);near(e('pyramid',{a:6,v:4}).slant,5);
});
test('rejects malformed, nonfinite, degenerate and unknown inputs without coercion',async()=>{
 const {evaluateSolid:e}=await api();for(const n of [NaN,Infinity,-Infinity,0,-1,101,'3',null,undefined])assert.throws(()=>e('cube',{a:n}));
 for(const d of [{},{a:2,b:3},[],null,Object.create({a:2})])assert.throws(()=>e('cube',d));
 assert.throws(()=>e('__proto__',{a:2}));near(e('cube',{a:.001}).volume,1e-9);near(e('cube',{a:100}).surface,60000);
});
test('default options are strict, defensively copied, and within actual slider range',async()=>{
 const {normalizeStereometryOptions:n}=await api();assert.deepEqual(n(),{shape:'cone',mode:'surface',dimensions:{r:4,v:7}});
 for(const value of [null,[],{arbitrary:true},{shape:'unknown'},{mode:'lateral'},{shape:'cube',dimensions:{a:0.1}},{shape:'cone',dimensions:{r:2,v:11}},{shape:'sphere',dimensions:{r:3,v:4}}])assert.throws(()=>n(value));
 const d={a:2};const normalized=n({shape:'cube',mode:'volume',dimensions:d});d.a=8;assert.equal(normalized.dimensions.a,2);
 assert.equal(n({shape:'cube',dimensions:{a:.5}}).dimensions.a,.5);assert.equal(n({shape:'cube',dimensions:{a:10}}).dimensions.a,10);
});
test('doubling height alone does not quadruple cone surface',async()=>{const {evaluateSolid:e}=await api();const a=e('cone',{r:3,v:4}),b=e('cone',{r:3,v:8});near(b.volume,2*a.volume);assert.notEqual(b.surface,4*a.surface);});
test('shape identifiers are actual strings, never coercible arrays or objects',async()=>{const {evaluateSolid:e,normalizeStereometryOptions:n}=await api();for(const shape of [['cube'],new String('cube'),{toString:()=> 'cube'}]){assert.throws(()=>e(shape,{a:2}));assert.throws(()=>n({shape}));}});
test('unrolled cone and frustum nets preserve arc lengths and finite geometry',async()=>{
 const {evaluateNet:n}=await api();const cone=n('cone',{r:4,v:7});near(cone.angle*cone.outerRadius,8*Math.PI);near(cone.angle,2*Math.PI*4/Math.hypot(4,7));
 const wide=n('cone',{r:10,v:.5});assert.ok(wide.angle>Math.PI);assert.ok(wide.angle<2*Math.PI);
 const f=n('frustum',{r1:5,r2:2,v:4}),inverted=n('frustum',{r1:2,r2:5,v:4});near(f.angle*f.outerRadius,10*Math.PI);near(f.angle*f.innerRadius,4*Math.PI);near(f.outerRadius-f.innerRadius,5);assert.deepEqual(f,inverted);
 for(const radii of [[3,3],[3,3+1e-8]]){const equal=n('frustum',{r1:radii[0],r2:radii[1],v:4});assert.equal(equal.kind,'rectangle');}
 for(const net of [cone,wide,f,n('frustum',{r1:3,r2:3.00001,v:10})])for(const p of net.points)for(const x of p)assert.ok(Number.isFinite(x)&&x>=0&&x<=1+1e-12);
});
