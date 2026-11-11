import {reviewedAssignmentContent} from './assignment-content.js';
import {supplementsForUnit} from './subject-layout.js';
const appRoot=new URL('../',import.meta.url);
const MOODLE='https://ais.gymnazium-amazon.cz/';
const HEX_UNIT='moodle-informatics-588cd5ee5179c25883c65e0170e6009f';
const HEX_REFS=new Map([
 ['3b9b13387e5a0285846b0d34f66bd6c081f38ac8d1a8957423277e27d7451fca','bb79139007924ded95ed1e8425dc897bae0b4022dcb2cebab88ba6f6691e742d'],
 ['6df3b47e7dc794966856992a82f83c36d116ffcda3017175fde22caf9ce55447','4abf2b12a2e51ec495d3dce96bb50a831cdfba0e0f34d0f4db5a080c888b507d']
]);
// User-confirmed task wording, independently reviewed for this public example.
const HEX_PROMPT='Vaším úkolem je rekonstruovat obrázek, který je zakódován v připravené matici o rozměrech 50 × 50 pixelů. Každá buňka matice představuje jeden pixel a obsahuje hexadecimální kód barvy (HEX), například #FF5733. Na základě tohoto kódu nastavte odpovídající barvu pozadí každé buňky tak, aby postupně vznikl původní obrázek.';
const HEX_STEPS=['Otevřete soubor.','Zjistěte barvu z kódu.','Vybarvěte pozadí.','Pokračujte pro celou matici.'];
const hash=/^[a-f0-9]{64}$/;
function text(value,max=20000){if(typeof value!=='string'||!value.trim()||value.length>max||/<\/?[a-z][^>]*>|\u0000/i.test(value))throw new Error('invalid_public_assignment_text');return value.trim();}
export function assignmentUnits(unit,units=[]){
 const known=new Map(units.map(item=>[item.id,item]));known.set(unit.id,unit);const visited=new Set(),result=[];
 function visit(current){if(!current||visited.has(current.id))return;visited.add(current.id);result.push(current);for(const id of current.relatedUnitIds||[])visit(known.get(id));for(const child of supplementsForUnit(current.id,[...known.values()]))visit(child);}
 visit(unit);return result;
}
function solutionURL(solution){
 if(!solution||!['pdf','docx','xlsx','pptx','txt','png','jpg'].includes(solution.format)||typeof solution.sha256!=='string'||!hash.test(solution.sha256)||solution.url!==`https://github.com/hphugosm/study/releases/download/studylo-learning-v1/${solution.sha256}.${solution.format}`||!Number.isSafeInteger(solution.size)||solution.size<1||solution.size>25000000||typeof solution.id!=='string'||!/^([a-z][a-z0-9-]{0,79})$/.test(solution.id))throw new Error('invalid_assignment_solution');
 text(solution.title,500);if((solution.format==='png'||solution.format==='jpg'&&(solution.width!==undefined||solution.height!==undefined))&&[solution.width,solution.height].some(n=>!Number.isSafeInteger(n)||n<1||n>4096))throw new Error('invalid_assignment_solution');return solution.url;
}
function hexContent(data){
 if(data?.schema!==1||data.subject!=='informatics'||data.topic!=='section-588cd5ee5179c25883c65e0170e6009f'||!Array.isArray(data.sources)||!Array.isArray(data.lessons))throw new Error('assignment_topic_mismatch');
 for(const [id,sha]of HEX_REFS){const sources=data.sources.filter(source=>source.id===id);if(sources.length!==1||sources[0].sha256!==sha||sources[0].url!==`https://github.com/hphugosm/study/releases/download/studylo-materials-v1/${sha}.xlsx`)throw new Error('assignment_source_provenance_missing');}return data;
}
async function loadHexContent(unit,fetcher,signal){
 const location=unit.content_url||unit.contentUrl;if(typeof location!=='string'||location!==`modules/course-notes/content/informatics/section-588cd5ee5179c25883c65e0170e6009f.json`)throw new Error('unsafe_assignment_content_url');const response=await fetcher(new URL(location,appRoot),{credentials:'omit',signal});if(!response.ok)throw new Error('assignment_content_unavailable');return hexContent(await response.json());
}
function normalizeRefs(refs,allowed){
 if(!Array.isArray(refs)||!refs.length)throw new Error('assignment_review_provenance_missing');
 return refs.map(ref=>{if(!ref||Object.keys(ref).some(key=>!['id','sha256','page','locator'].includes(key))||typeof ref.id!=='string'||!hash.test(ref.id)||typeof ref.sha256!=='string'||!hash.test(ref.sha256)||!allowed.has(ref.id+':'+ref.sha256)||ref.page!==undefined&&(!Number.isSafeInteger(ref.page)||ref.page<1))throw new Error('assignment_review_provenance_mismatch');const value={id:ref.id,sha256:ref.sha256};if(ref.page!==undefined)value.page=ref.page;if(ref.locator!==undefined)value.locator=text(ref.locator,500);return value;});
}
function reviewedDetails(entry,records,unit){
 const matching=records.filter(record=>record.assignmentId===entry.id&&record.version===entry.version&&record.subject===entry.subject&&record.topic===entry.topic);
 if(!matching.length)return null;if(matching.length!==1||typeof entry.version!=='string'||!hash.test(entry.version))throw new Error('invalid_assignment_review_version');
 const record=matching[0];if(record.reviewed!==true)throw new Error('assignment_content_not_reviewed');dateDeadline(record.reviewed_on);const allowed=new Set((unit.materials||[]).filter(material=>typeof material.sourceId==='string'&&hash.test(material.sourceId)&&typeof material.sha256==='string'&&hash.test(material.sha256)&&new RegExp(`^https://github\\.com/hphugosm/study/releases/download/(studylo-materials-v1|studylo-biology-v1)/${material.sha256}\\.(pdf|pptx|ppt|docx|doc|odt|odp|xlsx|txt|jpg|png|wmv)$`).test(material.url)).map(material=>material.sourceId+':'+material.sha256));
 const suppliedRefs=record.source_refs??[];if(!Array.isArray(suppliedRefs))throw new Error('assignment_review_provenance_missing');const source_refs=suppliedRefs.length?normalizeRefs(suppliedRefs,allowed):[],subset=new Set(source_refs.map(ref=>ref.id+':'+ref.sha256));const steps=record.steps??[],solutions=record.solutions??[];let solution=null;
 if(record.solution!==undefined){const value=record.solution;if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).some(key=>!['paragraphs','steps'].includes(key)))throw new Error('invalid_assignment_text_solution');const paragraphs=value.paragraphs??[],walkthrough=value.steps??[];if(!Array.isArray(paragraphs)||!Array.isArray(walkthrough)||paragraphs.length+walkthrough.length<1||paragraphs.length+walkthrough.length>100)throw new Error('invalid_assignment_text_solution');solution={paragraphs:paragraphs.map(part=>text(part)),steps:walkthrough.map(part=>text(part))};}
 if(!Array.isArray(steps)||!Array.isArray(solutions)||solutions.length>12)throw new Error('invalid_assignment_review');
 return {prompt:text(record.prompt),steps:steps.map(step=>text(step)),source_refs,solution,solutions:solutions.map(solution=>{solutionURL(solution);const refs=normalizeRefs(solution.source_refs,subset);return {id:solution.id,title:text(solution.title,500),format:solution.format,url:solution.url,sha256:solution.sha256,size:solution.size,...(['png','jpg'].includes(solution.format)&&solution.width!==undefined?{width:solution.width,height:solution.height}:{}),source_refs:refs};})};
}
function deadline(due){if(due===undefined||due===null||due===0)return null;if(!Number.isSafeInteger(due)||due<0||due>253402300799)throw new Error('invalid_assignment_deadline');return {kind:'instant',timestamp:due};}
function dateDeadline(date){if(typeof date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(date)||new Date(date+'T12:00:00Z').toISOString().slice(0,10)!==date)throw new Error('invalid_assignment_date');return {kind:'date',date};}
export function formatAssignmentDeadline(value){
 if(!value)return 'Termín není zveřejněný';
 if(value.kind==='date'){const d=dateDeadline(value.date);return new Intl.DateTimeFormat('cs-CZ',{timeZone:'UTC',day:'numeric',month:'long',year:'numeric'}).format(new Date(d.date+'T12:00:00Z'))+' · čas není uveden';}
 if(value.kind!=='instant')throw new Error('invalid_assignment_deadline');const d=deadline(value.timestamp);if(!d)throw new Error('invalid_assignment_deadline');return new Intl.DateTimeFormat('cs-CZ',{timeZone:'Europe/Prague',day:'numeric',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(d.timestamp*1000))+' · Praha';
}
/** Only approved assignment rows, explicit homework events and the reviewed HEX task. */
export function assignmentsForUnit(unit,{units=[],events=[],feed=[],contents=[],details=reviewedAssignmentContent,now=Date.now()/1000}={}){
 const related=assignmentUnits(unit,units),ids=new Set(related.map(item=>item.id)),pairs=new Set(related.filter(item=>item.subjectId&&item.topicId).map(item=>item.subjectId+'/'+item.topicId)),result=new Map();
 const entries=Array.isArray(feed)?feed:feed?.schema===1&&Array.isArray(feed.entries)?feed.entries:null;if(!entries)throw new Error('invalid_public_assignment_feed');
 for(const entry of entries){if(entry.kind!=='assignment'||entry.available===false||entry.policy_excluded===true||!pairs.has(entry.subject+'/'+entry.topic))continue;if(typeof entry.id!=='string'||!hash.test(entry.id))throw new Error('invalid_public_assignment_id');const id='moodle-'+entry.id;const target=related.find(item=>item.subjectId===entry.subject&&item.topicId===entry.topic);const reviewed=reviewedDetails(entry,details,target);result.set(id,{id,title:text(entry.title,500),prompt:entry.prompt===undefined||entry.prompt===''?null:text(entry.prompt),steps:[],deadline:deadline(entry.due),moodleURL:MOODLE,solutions:[],source_refs:[],origin:'moodle',unitId:target?.id,...(reviewed||{})});}
 for(const event of events){if(event.origin==='moodle'||event.type!=='homework'||!ids.has(event.unitId))continue;const id='calendar-'+text(event.id,120);result.set(id,{id,title:text(event.title,500),prompt:event.prompt===undefined||event.prompt===''?null:text(event.prompt),steps:[],deadline:event.due!==undefined?deadline(event.due):event.date?dateDeadline(event.date):null,moodleURL:MOODLE,solutions:[],source_refs:[],origin:'calendar',unitId:event.unitId});}
 if(ids.has(HEX_UNIT))for(const content of contents){if(content.unitId!==HEX_UNIT)continue;const data=hexContent(content.data);if(data.subject!=='informatics'||data.topic!=='section-588cd5ee5179c25883c65e0170e6009f')throw new Error('assignment_topic_mismatch');const lesson=data.lessons.find(item=>item.id==='hexove-matice');if(!lesson)continue;
  text(lesson.title,500);if(!Array.isArray(lesson.source_refs))throw new Error('assignment_source_provenance_missing');const source_refs=lesson.source_refs.filter(ref=>HEX_REFS.get(ref.id)===ref.sha256).map(ref=>({...ref}));if(new Set(source_refs.map(ref=>ref.id)).size!==2)throw new Error('assignment_source_provenance_missing');const solutions=lesson.solutions||[];if(solutions.length!==4||solutions.filter(s=>s.format==='xlsx').length!==2||solutions.filter(s=>s.format==='png').length!==2||new Set(solutions.map(s=>s.id)).size!==4||solutions.some(s=>!Array.isArray(s.source_refs)||!s.source_refs.length||s.source_refs.some(ref=>HEX_REFS.get(ref.id)!==ref.sha256)))throw new Error('assignment_solution_provenance_missing');
  result.set('reviewed-hex-matrix',{id:'reviewed-hex-matrix',title:lesson.title,prompt:HEX_PROMPT,steps:[...HEX_STEPS],deadline:null,moodleURL:MOODLE,solutions:solutions.map(s=>({...s,url:solutionURL(s),source_refs:s.source_refs.map(ref=>({...ref}))})),source_refs,origin:'reviewed-example',unitId:HEX_UNIT});
 }
 const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Prague',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(now*1000));
 const stamp=d=>!d?Infinity:d.kind==='instant'?d.timestamp:Date.parse(d.date+'T12:00:00Z')/1000;
 const rank=d=>!d?1:(d.kind==='instant'?d.timestamp<now:d.date<today)?2:0;
 return [...result.values()].sort((a,b)=>rank(a.deadline)-rank(b.deadline)||(rank(a.deadline)===2?stamp(b.deadline)-stamp(a.deadline):stamp(a.deadline)-stamp(b.deadline))||a.title.localeCompare(b.title,'cs'));
}
function el(tag,value,cls){const n=document.createElement(tag);if(value!==undefined)n.textContent=value;if(cls)n.className=cls;return n;}
export async function mountAssignments(host,{unit,units=[],events=[],assignmentId,signal,fetcher=globalThis.fetch}={}){
 const section=el('section',undefined,'assignments-panel');section.setAttribute('aria-label','Úkoly k tématu');host.append(section);const controller=new AbortController();let disposed=false;
 const cleanup=()=>{disposed=true;controller.abort();signal?.removeEventListener('abort',cleanup);section.remove();};if(signal?.aborted){cleanup();return cleanup;}signal?.addEventListener('abort',cleanup,{once:true});
 async function render(){if(disposed)return;section.replaceChildren(el('p','Načítám zveřejněné úkoly…','tasks-loading'));
  try{const response=await fetcher(new URL('modules/moodle-sync/feed.json',appRoot),{credentials:'omit',signal:controller.signal});if(disposed)return;if(!response.ok)throw new Error('assignment_feed_unavailable');const feed=await response.json();if(disposed)return;if(feed.schema!==1||!Array.isArray(feed.entries))throw new Error('invalid_public_assignment_feed');
   const related=assignmentUnits(unit,units).filter(item=>item.id===HEX_UNIT&&(item.content_url||item.contentUrl));const contents=await Promise.all(related.map(async item=>({unitId:item.id,data:await loadHexContent(item,fetcher,controller.signal)})));if(disposed)return;
   const tasks=assignmentsForUnit(unit,{units,events,feed,contents});if(typeof assignmentId==='string'&&hash.test(assignmentId))tasks.sort((a,b)=>(b.id==='moodle-'+assignmentId)-(a.id==='moodle-'+assignmentId));section.replaceChildren(el('h2','Úkoly'),el('p','Zadání, termíny a hotová studijní řešení k tomuto tématu.','tasks-intro'));
   if(!tasks.length)section.append(el('p','Pro toto téma zatím nejsou zveřejněné žádné úkoly.','tasks-empty'));
   for(const task of tasks){const card=el('article',undefined,'task-card');card.dataset.assignmentId=task.id;if(task.id==='moodle-'+assignmentId){card.classList.add('is-target');card.dataset.selectedAssignment='true';}card.append(el('h3',task.title));const date=el('p',undefined,'task-deadline');date.append(el('span','Termín: '));if(task.deadline){const time=el('time',formatAssignmentDeadline(task.deadline));time.dateTime=task.deadline.kind==='date'?task.deadline.date:new Date(task.deadline.timestamp*1000).toISOString();date.append(time);}else date.textContent='Termín není zveřejněný';card.append(date);
    const details=el('details',undefined,'task-summary');details.append(el('summary','Zadání a postup'));details.append(el('p',task.prompt||'Úplné zadání zatím není zveřejněné. Ověř ho v Moodlu.'));if(task.steps.length){const steps=el('ol');for(const step of task.steps)steps.append(el('li',step));details.append(steps);}const moodle=el('a','Otevřít školní Moodle','task-source');moodle.href=task.moodleURL;moodle.target='_blank';moodle.rel='noopener noreferrer';details.append(moodle);card.append(details);
    if(task.solutions.length){const files=el('section',undefined,'task-files');files.setAttribute('aria-label','Hotové řešení ke stažení');files.append(el('h4','Hotové řešení'));for(const solution of task.solutions){const link=el('a',`${solution.title} · ${solution.format.toUpperCase()}`,'task-download');link.href=solution.url;link.target='_blank';link.rel='noopener noreferrer';link.download=solution.id+'.'+solution.format;files.append(link);}card.append(files);}if(task.solution){const solution=el('details',undefined,'task-text-solution');solution.append(el('summary','Vypracované řešení'));for(const paragraph of task.solution.paragraphs)solution.append(el('p',paragraph));if(task.solution.steps.length){const steps=el('ol');for(const step of task.solution.steps)steps.append(el('li',step));solution.append(steps);}card.append(solution);}else if(!task.solutions.length)card.append(el('p','Hotové řešení zatím není zveřejněné.','task-solution-missing'));section.append(card);
   }
  }catch(error){if(disposed||controller.signal.aborted)return;const retry=el('button','Zkusit znovu');retry.type='button';retry.addEventListener('click',render);section.replaceChildren(el('p','Úkoly se nepodařilo načíst. Zkus to znovu.','tasks-error'),retry);}
 }
 await render();return cleanup;
}
