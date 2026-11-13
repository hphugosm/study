const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const load=()=>import('../index.js');
const content=async()=>JSON.parse(await fs.readFile(path.join(__dirname,'../content/informatics/section-588cd5ee5179c25883c65e0170e6009f.json'),'utf8'));
const lesson=data=>data.lessons.find(item=>item.id==='hexove-matice');

test('worked pixel solutions retain both exact source matrices without replacing original sources',async()=>{
 const {validateContent,safeSolutionURL}=await load(),data=await content(),solutions=lesson(data).solutions;
 assert.equal(validateContent(data),data);assert.equal(solutions.length,4);assert.equal(data.sources.length,7);
 const expected=new Set(['bb79139007924ded95ed1e8425dc897bae0b4022dcb2cebab88ba6f6691e742d','4abf2b12a2e51ec495d3dce96bb50a831cdfba0e0f34d0f4db5a080c888b507d']);
 for(const source of expected){const pair=solutions.filter(item=>item.source_refs.some(ref=>ref.sha256===source));assert.deepEqual(pair.map(item=>item.format).sort(),['png','xlsx']);for(const item of pair){assert.equal(safeSolutionURL(item),`https://github.com/hphugosm/study/releases/download/studylo-learning-v1/${item.sha256}.${item.format}`);assert.ok(item.size>0);}}
});

test('solution downloads reject redirected URLs, unsupported files, missing evidence and invalid metadata',async()=>{
 const {validateContent}=await load(),base=await content();
 for(const mutate of [
  item=>item.url+='?token=hidden',item=>item.url=item.url.replace('hphugosm/study','other/study'),
  item=>item.url=item.url.replace('/studylo-learning-v1/','/other/'),item=>item.url='javascript:alert(1)',
  item=>item.sha256=[item.sha256],item=>item.format='xlsm',item=>item.size=0,item=>item.size=25000001,
  item=>item.title='<script>',item=>item.source_refs=[],item=>item.source_refs[0].sha256='0'.repeat(64),
 ]){const data=structuredClone(base);mutate(lesson(data).solutions[0]);assert.throws(()=>validateContent(data));}
 for(const dimensions of [{width:0},{height:NaN},{width:4097},{height:'50'}]){const data=structuredClone(base);Object.assign(lesson(data).solutions.find(item=>item.format==='png'),dimensions);assert.throws(()=>validateContent(data));}
 const duplicate=structuredClone(base);lesson(duplicate).solutions[0].id=lesson(duplicate).id;assert.throws(()=>validateContent(duplicate));
});

test('DOCX solutions use the same exact hash URL, evidence and size constraints',async()=>{
 const {validateContent,safeSolutionURL}=await load(),base=await content();
 const value=structuredClone(lesson(base).solutions[0]);Object.assign(value,{id:'worked-document',format:'docx',title:'Vysvětlené řešení pracovního listu',sha256:'a'.repeat(64)});value.url=`https://github.com/hphugosm/study/releases/download/studylo-learning-v1/${value.sha256}.docx`;
 lesson(base).solutions=[value];assert.equal(validateContent(base),base);assert.equal(safeSolutionURL(value),value.url);
 for(const change of [v=>v.url=v.url.replace('.docx','.xlsx'),v=>v.sha256='b'.repeat(64),v=>v.url=v.url.replace('github.com','example.com'),v=>v.format='docm',v=>v.size=25000001,v=>v.source_refs=[]]){const invalid=structuredClone(base);change(lesson(invalid).solutions[0]);assert.throws(()=>validateContent(invalid));}
});

test('reader renders DOCX as a download only and retains PNG lazy preview and XLSX downloads',async()=>{
 const {mount}=await load(),data=await content(),sourceLesson=lesson(data);
 const docx={...structuredClone(sourceLesson.solutions[0]),id:'worked-document',format:'docx',title:'Dokument řešení',sha256:'a'.repeat(64)};docx.url=`https://github.com/hphugosm/study/releases/download/studylo-learning-v1/${docx.sha256}.docx`;
 data.lessons=[{id:'solution-render-check',title:'Ověření řešení',source_refs:sourceLesson.source_refs,solutions:[docx,...['png','xlsx'].map(format=>sourceLesson.solutions.find(item=>item.format===format))]}];data.flashcards=[];data.questions=[];
 class Element extends EventTarget{constructor(tag){super();this.tagName=tag;this.children=[];this.dataset={};this.attributes={};this.classList={add(){}};}append(...items){for(const item of items){this.children.push(item);item.parent=this;}}replaceChildren(...items){this.children=[];this.append(...items);}attachShadow(){this.shadowRoot=new Element('shadow');return this.shadowRoot;}setAttribute(k,v){this.attributes[k]=String(v);}hasAttribute(k){return this.attributes[k]!==undefined;}contains(node){return this===node||this.children.some(child=>child.contains(node));}remove(){if(this.parent)this.parent.children=this.parent.children.filter(child=>child!==this);}}
 const walk=node=>[node,...node.children.flatMap(walk),...(node.shadowRoot?walk(node.shadowRoot):[])];
 const previous={document:global.document,fetch:global.fetch,storage:Object.getOwnPropertyDescriptor(global,'localStorage')};const calls=[];let dispose;
 try{
  global.document={createElement:tag=>new Element(tag)};Object.defineProperty(global,'localStorage',{configurable:true,value:{getItem:()=>null}});
  global.fetch=async url=>{calls.push(String(url));return {ok:true,json:async()=>data};};
  const container=new Element('div');dispose=await mount(container,{unit:{content_url:'modules/course-notes/content/informatics/section-588cd5ee5179c25883c65e0170e6009f.json'}});
  const disclosure=walk(container).find(n=>n.className==='lesson lesson-disclosure');assert.ok(disclosure);disclosure.open=true;disclosure.dispatchEvent(new Event('toggle'));
  const nodes=walk(container),boxes=nodes.filter(n=>n.className==='solution-file');assert.equal(boxes.length,3);assert.ok(nodes.some(n=>n.tagName==='h3'&&n.textContent==='Hotové studijní řešení'));
  const docNodes=walk(boxes[0]);assert.ok(docNodes.some(n=>n.tagName==='a'&&n.href===docx.url&&n.download==='worked-document.docx'));assert.ok(!docNodes.some(n=>['img','iframe','object','embed','details'].includes(n.tagName)));
  const pngNodes=walk(boxes[1]),preview=pngNodes.find(n=>n.tagName==='img');assert.ok(preview);assert.equal(preview.src,undefined);const details=pngNodes.find(n=>n.tagName==='details');details.open=true;details.dispatchEvent(new Event('toggle'));assert.ok(preview.src.endsWith('.png'));
  assert.ok(walk(boxes[2]).some(n=>n.tagName==='a'&&n.href.endsWith('.xlsx')));assert.ok(!walk(boxes[2]).some(n=>['img','iframe','object','embed'].includes(n.tagName)));assert.equal(calls.length,1);assert.ok(calls[0].endsWith('.json'));
 }finally{dispose?.();global.document=previous.document;global.fetch=previous.fetch;if(previous.storage)Object.defineProperty(global,'localStorage',previous.storage);else delete global.localStorage;}
});
