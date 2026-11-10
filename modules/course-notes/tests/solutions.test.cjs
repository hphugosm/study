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
