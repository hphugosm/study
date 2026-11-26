const test=require('node:test');
const assert=require('node:assert/strict');
const api=()=>import('../geography-climate.js');
class Element extends EventTarget {
  constructor(tag,doc){super();this.tagName=tag;this.ownerDocument=doc;this.children=[];this.attributes={};this.style={};this.textContent='';}
  append(...nodes){for(const node of nodes){node.parent=this;this.children.push(node);}}
  setAttribute(key,value){this.attributes[key]=value;}
  replaceChildren(...nodes){this.children=[];this.append(...nodes);}
  remove(){if(this.parent)this.parent.children=this.parent.children.filter(node=>node!==this);}
}
const document=()=>{const doc={createElement:tag=>new Element(tag,doc),createElementNS:(_,tag)=>new Element(tag,doc)};return doc;};
const text=node=>[node.textContent,...node.children.map(text)].join(' ');
test('climate defaults are strict and accept only three source environments',async()=>{
  const {normalizeClimateOptions:n}=await api();assert.deepEqual(n(),{region:'coast'});
  for(const region of ['coast','interior','mountains'])assert.deepEqual(n({region}),{region});
  for(const value of [null,[],{region:'__proto__'},{region:['coast']},{rainfall:100}])assert.throws(()=>n(value),TypeError);
});
test('native buttons switch explanation and accessible diagram; unmount removes listeners',async()=>{
  const {mountClimate}=await api(),doc=document(),host=doc.createElement('main');const cleanup=mountClimate(host);
  const root=host.children[0],controls=root.children[1],svg=root.children[2],status=root.children[3];
  assert.equal(controls.attributes.role,'group');assert.equal(status.attributes['aria-live'],'polite');
  assert.equal(svg.attributes.role,'img');assert.equal(svg.attributes.viewBox,'0 0 300 160');
  assert.equal(controls.children.length,3);assert.equal(controls.children[0].attributes['aria-pressed'],'true');
  assert.match(text(status),/vlhké zimy/);const coastPath=svg.children[0].attributes.d;
  controls.children[1].dispatchEvent(new Event('click'));
  assert.match(text(status),/minimum srážek/);assert.match(text(status),/nedostatek vody/);
  assert.equal(controls.children[0].attributes['aria-pressed'],'false');assert.equal(controls.children[1].attributes['aria-pressed'],'true');
  assert.equal(controls.children[1].style.boxShadow,'inset 0 0 0 2px currentColor');assert.equal(controls.children[0].style.boxShadow,'');
  assert.notEqual(svg.children[0].attributes.d,coastPath);
  controls.children[2].dispatchEvent(new Event('click'));
  assert.match(text(status),/horské lesy/);assert.match(text(status),/neurčuje sezónní/);
  assert.match(svg.attributes['aria-label'],/Není to mapa/);assert.match(text(root),/předpověď/);
  const final=text(status);cleanup();cleanup();assert.equal(host.children.length,0);
  controls.children[0].dispatchEvent(new Event('click'));assert.equal(text(status),final);
});
test('interaction registry dispatches and validates climate without changing other kinds',async()=>{
  const {validateInteraction,mountInteraction}=await import('../interactions.js');
  const config=validateInteraction({kind:'geography-climate',title:'Podnebí',defaults:{region:'mountains'}});
  assert.deepEqual(config.defaults,{region:'mountains'});
  assert.throws(()=>validateInteraction({...config,defaults:{region:'rainforest'}}),TypeError);
  const doc=document(),host=doc.createElement('main'),cleanup=mountInteraction(host,config);assert.match(text(host),/horské lesy/);cleanup();assert.equal(host.children.length,0);
});
