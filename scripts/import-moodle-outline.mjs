/** Import an explicitly reviewed public projection. Never accepts a raw Moodle API response. */
import {readFile,writeFile,mkdir,rename,lstat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {MOODLE_SUBJECTS,validateCatalog,validateTopic,validateSources,validateDerived} from '../modules/moodle-sync/catalog.js';
const defaultRoot=fileURLToPath(new URL('../',import.meta.url));
const keys=(value,required)=>value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).length===required.length&&required.every(key=>Object.hasOwn(value,key));
const safeText=value=>typeof value==='string'&&value.trim().length>0&&value.length<=500&&!/[<>\u0000-\u001f]|https?:\/\/|[\w.+-]+@[\w.-]+\.[a-z]{2,}|(?:token|sesskey|password|cookie)\s*[=:]/i.test(value);
export function validatePublicOutline(manifest){
 if(!keys(manifest,['schema','subjects'])||manifest.schema!==1||!Array.isArray(manifest.subjects)||manifest.subjects.length>11)throw new Error('invalid_public_outline');
 const subjectIds=new Set();
 for(const subject of manifest.subjects){
  const approved=MOODLE_SUBJECTS.find(item=>item.id===subject.id);
  if(!keys(subject,['id','title','courses'])||!approved||subject.title!==approved.title||subjectIds.has(subject.id)||!Array.isArray(subject.courses))throw new Error('unapproved_outline_subject');
  subjectIds.add(subject.id);
  const topicIds=new Set();
  for(const course of subject.courses){
   if(!keys(course,['variant','topics'])||typeof course.variant!=='string'||!/^JU3[A-Z]*$/.test(course.variant)||!Array.isArray(course.topics))throw new Error('invalid_public_course_projection');
   let previous=-1;
   for(const topic of course.topics){
    if(!keys(topic,['id','title','order','available'])||!/^section-[a-f0-9]{32}$/.test(topic.id)||topicIds.has(topic.id)||!safeText(topic.title)||!Number.isSafeInteger(topic.order)||topic.order<0||topic.order<=previous||typeof topic.available!=='boolean')throw new Error('invalid_public_topic_projection');
    topicIds.add(topic.id);previous=topic.order;
   }
  }
 }
 return manifest;
}
async function readMaybe(file){
 try{const stat=await lstat(file);if(!stat.isFile()||stat.isSymbolicLink())throw new Error('unsafe_public_index_file');return JSON.parse(await readFile(file,'utf8'));}
 catch(error){if(error.code==='ENOENT')return null;throw error;}
}
async function writeJSON(file,value){
 await mkdir(path.dirname(file),{recursive:true});
 const temp=file+'.outline-import';
 await writeFile(temp,JSON.stringify(value,null,2)+'\n',{flag:'wx'});
 await rename(temp,file);
}
const outlineStart='<!-- moodle-outline:start -->';
const outlineEnd='<!-- moodle-outline:end -->';
const markdown=value=>String(value).replace(/[\\`*_[\]<>]/g,'\\$&');
export function mergeOutlineReadme(existing,generated){
 const start=existing.indexOf(outlineStart),end=existing.indexOf(outlineEnd);
 if((start<0)!==(end<0)||start>end||existing.indexOf(outlineStart,start+1)>=0||existing.indexOf(outlineEnd,end+1)>=0)throw new Error('invalid_generated_outline_markers');
 const block=outlineStart+'\n'+generated.trim()+'\n'+outlineEnd;
 if(start>=0)return existing.slice(0,start)+block+existing.slice(end+outlineEnd.length);
 const heading=existing.indexOf('\n');
 return heading>=0?existing.slice(0,heading+1)+'\n'+block+'\n'+existing.slice(heading+1):existing+'\n\n'+block+'\n';
}
async function readMarkdown(file,fallback){
 try{
  const stat=await lstat(file);if(!stat.isFile()||stat.isSymbolicLink()||stat.size>2000000)throw new Error('unsafe_public_readme');
  return await readFile(file,'utf8');
 }catch(error){if(error.code==='ENOENT')return fallback;throw error;}
}
function topicLink(topic){return `[${markdown(topic.title)}](topics/${topic.id}/README.md)`;}
function subjectOutline(subject){
 const current=subject.topics.filter(topic=>topic.origin==='moodle'&&topic.listed_current);
 const stale=subject.topics.filter(topic=>topic.origin==='moodle'&&!topic.listed_current);
 const legacy=subject.topics.filter(topic=>topic.origin!=='moodle');
 const groups=new Map();for(const topic of current){if(!groups.has(topic.course_variant))groups.set(topic.course_variant,[]);groups.get(topic.course_variant).push(topic);}
 const lines=['## Témata z Moodlu',`Aktuálně vypsáno: **${current.length} témat**. Pořadí a názvy odpovídají schválenému přehledu; mezery v původním číslování jsou zachované.`];
 if(!current.length)lines.push('Zkontrolovaný veřejný přehled zatím neobsahuje žádná témata Moodlu pro tento předmět.');
 for(const [variant,topics] of groups){lines.push('',`### Varianta ${variant}`,'');for(const topic of topics)lines.push(`- **${topic.section_order}.** ${topicLink(topic)}${topic.available?'':' — v Moodlu zatím nedostupné'}`);}
 if(stale.length){lines.push('','## Dřívější témata Moodlu — zachována','');for(const topic of stale)lines.push(`- ${topicLink(topic)} — není v posledním schváleném přehledu`);}
 if(legacy.length){lines.push('','## Dosavadní témata Study','Samostatně zachovaná témata původní veřejné aplikace; nejsou vydávána za nově zjištěné sekce Moodlu.','');for(const topic of legacy)lines.push('- '+topicLink(topic));}
 lines.push('','Původní podklady každého tématu jsou v `sources/`, výtahy a další samostatně schválené výstupy v `derived/`. Samotná existence tématu neslouží jako schválení jeho školních souborů.');
 return lines.join('\n');
}
async function planReadableOutline(catalog,dataRoot){
 const planned=new Map();
 const scope=catalog.moodle_subject_ids||[];
 const subjects=scope.map(id=>catalog.subjects.find(subject=>subject.id===id));
 const currentCount=subject=>subject.topics.filter(topic=>topic.origin==='moodle'&&topic.listed_current).length;
 const summary=['## Přehled jedenácti předmětů JU3',`Celkem **${subjects.reduce((sum,subject)=>sum+currentCount(subject),0)} skutečných témat Moodlu** v **${subjects.length} předmětech**. Jednotlivé varianty tříd mají uvnitř předmětu vlastní skupinu; pořadí není přeuspořádané podle abecedy.`,'','| Předmět | Témata Moodlu |','| --- | ---: |'];
 for(const subject of subjects)summary.push(`| [${markdown(subject.title)}](subjects/${subject.id}/README.md) | ${currentCount(subject)} |`);
 const legacy=catalog.subjects.filter(subject=>!scope.includes(subject.id));
 if(legacy.length)summary.push('','### Další zachované veřejné předměty','',...legacy.map(subject=>`- [${markdown(subject.title)}](subjects/${subject.id}/README.md)`));
 summary.push('','Nejdřív použij původní podklady z `sources/index.json` příslušného tématu. Ve složce `derived/` vznikají až samostatně schválené výtahy, poznámky a procvičování.');
 const overviewFile=path.join(dataRoot,'README.md');
 const overview=await readMarkdown(overviewFile,'# Podklady podle předmětů a témat\n\nStrojově čitelný rozcestník je v `catalog.json`; níže je stejná struktura pro pohodlné procházení.\n');
 planned.set(overviewFile,mergeOutlineReadme(overview,summary.join('\n')));
 for(const subject of catalog.subjects){
  const file=path.join(dataRoot,`subjects/${subject.id}/README.md`);
  let existing=await readMarkdown(file,`# ${subject.title}\n`);
  existing=existing.replace('Skutečná témata budou přidána pouze ze zkontrolovaného veřejného přehledu v pořadí Moodlu. Žádná náhradní témata nejsou vytvořena odhadem.','Níže jsou skutečná témata ze zkontrolovaného veřejného přehledu v pořadí Moodlu.');
  planned.set(file,mergeOutlineReadme(existing,subjectOutline(subject)));
 }
 return planned;
}
export async function importReviewedOutline(manifest,{root=defaultRoot}={}){
 validatePublicOutline(manifest);
 const dataRoot=path.join(root,'modules/moodle-sync/data');
 const catalog=validateCatalog(await readMaybe(path.join(dataRoot,'catalog.json')));
 const writes=new Map();const readmes=new Map();
 let imported=0,retained=0;
 for(const subject of manifest.subjects){
  const existing=catalog.subjects.find(item=>item.id===subject.id);
  if(!existing||!catalog.moodle_subject_ids?.includes(subject.id))throw new Error('outline_subject_not_scaffolded');
  const current=[];const seen=new Set();
  for(const course of subject.courses)for(const section of course.topics){
   const ref={id:section.id,title:section.title,index:`subjects/${subject.id}/topics/${section.id}/index.json`,origin:'moodle',course_variant:course.variant,section_order:section.order,available:section.available,listed_current:true};
   const old=existing.topics.find(item=>item.id===ref.id);
   if(old&&old.origin!=='moodle')throw new Error('outline_cannot_replace_legacy_topic');
   current.push(ref);seen.add(ref.id);imported++;
  }
  const stale=existing.topics.filter(topic=>topic.origin==='moodle'&&!seen.has(topic.id)).map(topic=>({...topic,listed_current:false}));
  const legacy=existing.topics.filter(topic=>topic.origin!=='moodle');
  retained+=stale.length+legacy.length;
  existing.topics=[...current,...stale,...legacy];
  for(const ref of [...current,...stale]){
   const file=path.join(dataRoot,ref.index);const directory=path.dirname(file);
   const previous=await readMaybe(file);
   if(previous){validateTopic(previous);if(previous.subject_id!==subject.id||previous.topic_id!==ref.id||previous.origin!=='moodle')throw new Error('outline_topic_identity_conflict');}
   const meta={origin:'moodle',course_variant:ref.course_variant,section_order:ref.section_order,available:ref.available,listed_current:ref.listed_current};
   const topic=validateTopic({schema:1,subject_id:subject.id,topic_id:ref.id,title:ref.title,sources_index:'sources/index.json',derived_index:'derived/index.json',...meta});
   writes.set(file,topic);
   const sourceFile=path.join(directory,'sources/index.json');
   const derivedFile=path.join(directory,'derived/index.json');
   const sourceIndex=await readMaybe(sourceFile);
   const derivedIndex=await readMaybe(derivedFile);
   const identity={schema:1,subject_id:subject.id,topic_id:ref.id};
   const sources=validateSources(sourceIndex||{...identity,sources:[]});
   const derived=validateDerived(derivedIndex||{...identity,artifacts:[]},sources);
   if(sources.subject_id!==subject.id||sources.topic_id!==ref.id||derived.subject_id!==subject.id||derived.topic_id!==ref.id)throw new Error('outline_index_identity_conflict');
   if(!sourceIndex)writes.set(sourceFile,sources);
   if(!derivedIndex)writes.set(derivedFile,derived);
   readmes.set(path.join(directory,'README.md'),`# ${ref.title}\n\nPředmět: ${subject.title}. Varianta: ${ref.course_variant}. Pořadí sekce: ${ref.section_order}. Identita tématu je veřejný neprůhledný otisk.\n\nTéma pochází z výslovně zkontrolovaného veřejného přehledu. Samotný název tématu neschvaluje žádné školní soubory. Původní podklady jsou v \`sources/index.json\`, odvozené výstupy v \`derived/index.json\`.\n`);
   readmes.set(path.join(directory,'sources/README.md'),'# Původní podklady\n\nPouze schválené původní podklady uvedené v index.json. Nové přílohy používají kanonické veřejné URL GitHub Releases; lokální starší originály mohou používat path. Soukromá školní data a přihlašovací údaje sem nepatří.\n');
   readmes.set(path.join(directory,'derived/README.md'),'# Odvozené výstupy\n\nSamostatně schválené výtahy a další výstupy s přesnými odkazy na ID a SHA-256 původních podkladů. Žádné automatické generování.\n');
  }
 }
 validateCatalog(catalog);
 const readable=await planReadableOutline(catalog,dataRoot);
 // Full semantic validation completes before any public file is changed.
 for(const [file,value] of writes)await writeJSON(file,value);
 for(const [file,contents] of readmes){
  await mkdir(path.dirname(file),{recursive:true});
  try{await writeFile(file,contents,{flag:'wx'});}catch(error){if(error.code!=='EEXIST')throw error;}
 }
 for(const [file,contents] of readable){
  await mkdir(path.dirname(file),{recursive:true});
  const temp=file+'.outline-import';await writeFile(temp,contents,{flag:'wx'});await rename(temp,file);
 }
 await writeJSON(path.join(dataRoot,'catalog.json'),catalog);
 return {subjects:manifest.subjects.length,imported_topics:imported,retained_topics:retained};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 try{
  const args=process.argv.slice(2);
  if(args.length!==2||args[0]!=='--approved-manifest')throw new Error('approved_manifest_required');
  const file=path.resolve(args[1]);const stat=await lstat(file);
  if(!stat.isFile()||stat.isSymbolicLink()||stat.size>2000000)throw new Error('unsafe_public_manifest_file');
  const result=await importReviewedOutline(JSON.parse(await readFile(file,'utf8')));
  console.log(JSON.stringify(result));
 }catch{
  // Even a mistakenly supplied malformed capture must not echo input values or paths.
  console.error('{"error":"public_outline_import_failed_check_reviewed_manifest"}');
  process.exitCode=2;
 }
}
