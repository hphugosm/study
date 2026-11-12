/** Deterministic bridge from reviewed public topics/sources to the existing Study registry. */
import {readFile,writeFile,lstat} from 'node:fs/promises';
import {fileURLToPath,pathToFileURL} from 'node:url';
import path from 'node:path';
import {validateCatalog,validateSources,MOODLE_SUBJECTS} from '../modules/moodle-sync/catalog.js';
import {validateExternalResources} from '../modules/moodle-sync/external.js';
import {validateContent} from '../modules/course-notes/index.js';
const root=fileURLToPath(new URL('../',import.meta.url));
const palettes=[['#657f8a','#edf3f5','earth'],['#4d7659','#edf3ec','leaf'],['#7d8c64','#f0f3e9','flask'],['#9c7386','#f7eff4','book'],['#6d83a3','#eff3f9','physics'],['#678c89','#edf5f3','monitor'],['#6976a1','#eff0f8','scale'],['#ac8350','#f7f1e7','function'],['#9a806d','#f6f0eb','users'],['#8c789c','#f3eff7','book'],['#758b67','#eff4eb','earth']];
const descriptions={
 'area-studies':'Regiony USA, mapy, společnost a historické souvislosti.',
 biology:'Lidské tělo, živočichové, genetika a ekologie v souvislostech.',
 chemistry:'Biochemie od aminokyselin přes bílkoviny až po metabolismus.',
 'american-literature':'Literární směry, příběhy a poezie amerických autorů.',
 physics:'Světlo, lom a vlnové jevy: od pozorování k vysvětlení.',
 informatics:'Kódování, komprese, digitální média a principy algoritmů.',
 law:'Právní systémy, soudy a občanské svobody na konkrétních případech.',
 mathematics:'Prostorová geometrie, goniometrie a řešení úloh.',
 sociology:'Sociologické pohledy, společenské instituce a jejich vztahy.',
 'social-sciences':'Práva, občanské vztahy a orientace ve společnosti.',
 geography:'Afrika, Latinská Amerika a asijské regiony na mapách i v souvislostech.',
};
export async function generateCourseCatalog(directory=root,{write=true}={}){
 const dataRoot=path.join(directory,'modules/moodle-sync/data');
 const catalog=validateCatalog(JSON.parse(await readFile(path.join(dataRoot,'catalog.json'),'utf8')));
 const courseSubjects=MOODLE_SUBJECTS.map((subject,i)=>({id:subject.id,name:subject.title,color:palettes[i][0],tint:palettes[i][1],icon:palettes[i][2],description:descriptions[subject.id]}));
 const courseUnits=[];
 for(const subject of catalog.subjects){if(!MOODLE_SUBJECTS.some(item=>item.id===subject.id))continue;
  for(const topic of subject.topics){if(topic.origin!=='moodle'||topic.listed_current!==true)continue;
   const sourceIndex=validateSources(JSON.parse(await readFile(path.join(dataRoot,path.dirname(topic.index),'sources/index.json'),'utf8')));
   const sources=sourceIndex.sources.filter(source=>source.review_status==='approved');
   let external=[];const externalPath=path.join(dataRoot,path.dirname(topic.index),'external/index.json');
   try{const stat=await lstat(externalPath);if(!stat.isFile()||stat.isSymbolicLink()||stat.size>65536)throw new Error('unsafe_external_index');external=validateExternalResources(JSON.parse(await readFile(externalPath,'utf8')),{subjectId:subject.id,topicId:topic.id}).resources;}catch(error){if(error.code!=='ENOENT')throw error;}
   const contentPath=`modules/course-notes/content/${subject.id}/${topic.id}.json`;
   let content;
   try{content=validateContent(JSON.parse(await readFile(path.join(directory,contentPath),'utf8')));if(content.subject!==subject.id||content.topic!==topic.id||content.title!==topic.title)throw new Error('content_topic_mismatch');if(content.sources.length!==sources.length)throw new Error('content_topic_sources_incomplete');for(const source of content.sources)if(!sources.some(original=>original.id===source.id&&original.sha256===source.sha256&&(original.url||`modules/moodle-sync/${original.path}`)===source.url))throw new Error('content_source_not_in_topic');}catch(error){if(error.code!=='ENOENT')throw error;}
   const unit={id:`moodle-${subject.id}-${topic.id.replace(/^section-/,'')}`,subjectId:subject.id,topicId:topic.id,origin:'moodle',course_variant:topic.course_variant,section_order:topic.section_order,available:topic.available,listed_current:true,title:topic.title,label:topic.course_variant,sourceCount:sources.length,lessonCount:content?.lessons.length||0,questionCount:content?.questions?.length||0,description:topic.available===false?'Téma nyní není zpřístupněné.':content?.intro||(sources.length?'Původní schválené podklady jsou dostupné. Výpisky vznikají po redakční kontrole.':'Téma je v kurzu; zveřejněné podklady ani výpisky zatím nejsou k dispozici.'),materials:sources.map(source=>({title:source.title,description:'Původní schválený zdroj',url:source.url||`modules/moodle-sync/${source.path}`,sourceId:source.id,sha256:source.sha256}))};
   if(external.length){unit.externalResources=external;if(!sources.length&&!content&&topic.available!==false)unit.description='Externí přednáška je dostupná. Výpisky zatím nejsou připravené.';}
   if(content?.lessons.length&&topic.available!==false){unit.content_url=contentPath;unit.module='course-notes';}
   const normalized=topic.title.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
   if(subject.id==='biology'&&normalized.includes('kosterni'))unit.legacyUnitIds=['skeleton'];
   if(subject.id==='law'&&/^unit 2\.[1-4]\b/i.test(topic.title))unit.legacyUnitIds=['law-unit-2'];
   if(subject.id==='mathematics'&&normalized.includes('goniometr'))unit.legacyUnitIds=['trig-functions','trig-equations'];
   courseUnits.push(unit);
  }
 }
 const result={courseSubjects,courseUnits};
 if(write)await writeFile(path.join(directory,'src/course-catalog.js'),'/** Generated from reviewed public catalog. Run scripts/generate-course-catalog.mjs. */\nexport const courseSubjects = '+JSON.stringify(courseSubjects,null,2)+';\nexport const courseUnits = '+JSON.stringify(courseUnits,null,2)+';\n');
 return result;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){const result=await generateCourseCatalog();console.log(`Generated ${result.courseSubjects.length} subjects / ${result.courseUnits.length} actual topics; ${result.courseUnits.filter(unit=>unit.module).length} authored study modules.`);}
