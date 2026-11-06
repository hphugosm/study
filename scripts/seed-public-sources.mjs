/** Explicit, deterministic migration of already-public original Study files. No network or AI. */
import {readFile,writeFile,mkdir,lstat,copyFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath,pathToFileURL} from 'node:url';
import path from 'node:path';
import {validateSources} from '../modules/moodle-sync/catalog.js';
const root=fileURLToPath(new URL('../',import.meta.url));
const moduleRoot=path.join(root,'modules/moodle-sync');
export const PUBLIC_SOURCE_PLAN = [
 {subject:'biology',topics:['skeleton'],original:'modules/biology/assets/kosterni-soustava-prezentace.pdf',title:'Kosterní soustava — původní prezentace'},
 {subject:'mathematics',topics:['math-quarter','trig-functions'],original:'modules/math-trig/assets/Trigonometrie.pptx',title:'Trigonometrie — původní prezentace'},
 {subject:'mathematics',topics:['math-quarter','trig-functions'],original:'modules/math-trig/assets/Grafy_sin_cos_tan_cot.pptx',title:'Grafy sin, cos, tan, cot — původní prezentace'},
 {subject:'mathematics',topics:['math-quarter','trig-equations'],original:'modules/math-equations/assets/Goniometricke_rovnice_a_vzorce.pptx',title:'Goniometrické rovnice a vzorce — původní prezentace'},
 {subject:'mathematics',topics:['math-quarter','trig-functions'],original:'modules/math-worksheets/assets/Gonio_fce_opakovani.pdf',title:'Goniometrické funkce — původní pracovní list'},
 {subject:'mathematics',topics:['math-quarter','trig-equations'],original:'modules/math-worksheets/assets/Opakovani_gonio__ne_rovnice.pdf',title:'Goniometrické rovnice a nerovnice — původní pracovní list'},
];
export const publicSourceId = original => createHash('sha256').update(`existing-public-study:${original}`).digest('hex');
export async function seedPublicSources() {
 const catalog=JSON.parse(await readFile(path.join(moduleRoot,'data/catalog.json'),'utf8'));
 let copied=0;
 for(const plan of PUBLIC_SOURCE_PLAN){
  const original=path.join(root,plan.original);
  const stat=await lstat(original);
  if(!stat.isFile()||stat.isSymbolicLink())throw new Error('Original public source must be a regular file');
  const bytes=await readFile(original);
  if(bytes.length>25000000)throw new Error('Original public source exceeds per-file limit');
  const sha256=createHash('sha256').update(bytes).digest('hex');
  const extension=path.extname(plan.original).toLowerCase();
  for(const topic of plan.topics){
   const known=catalog.subjects.find(subject=>subject.id===plan.subject)?.topics.find(item=>item.id===topic);
   if(!known)throw new Error('Seed topic must already exist in public catalog');
   const directory=`data/subjects/${plan.subject}/topics/${topic}/sources/`;
   const target=path.join(moduleRoot,directory+sha256+extension);
   await mkdir(path.dirname(target),{recursive:true});
   let current;
   try{current=await readFile(target);}catch(error){if(error.code!=='ENOENT')throw error;}
   if(current && !current.equals(bytes))throw new Error('Existing content-addressed source differs');
   if(!current)await copyFile(original,target);
   const indexPath=path.join(moduleRoot,directory+'index.json');
   const index=validateSources(JSON.parse(await readFile(indexPath,'utf8')));
   const entry={id:publicSourceId(plan.original),title:plan.title,path:directory+sha256+extension,sha256,size:bytes.length,source_kind:'manual',review_status:'approved'};
   const existing=index.sources.find(source=>source.id===entry.id);
   // Reruns cannot silently approve changed upstream bytes or overwrite another publisher's record.
   if(existing && Object.entries(entry).some(([key,value])=>existing[key]!==value))throw new Error('Public source changed: explicit review required before updating seed');
   if(!existing)index.sources.push(entry);
   index.sources.sort((a,b)=>a.id.localeCompare(b.id));
   validateSources(index);
   await writeFile(indexPath,JSON.stringify(index,null,2)+'\n');
   copied++;
  }
 }
 console.log(`Seeded ${PUBLIC_SOURCE_PLAN.length} already-public original files into ${copied} topic source references. No new Moodle data.`);
}
if(process.argv[1] && import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)await seedPublicSources();
