import {mountInteraction,validateInteraction} from './interactions.js';
/** Static, source-backed course reader. No generated HTML or runtime AI. */
const base = new URL('./',import.meta.url);
const slug = /^[a-z][a-z0-9-]{0,79}$/;
const hash = /^[a-f0-9]{64}$/;
const textOK = value => typeof value==='string' && value.trim() && value.length<=20000 && !/<\/?[a-z][^>]*>|<!--[\s\S]*?-->|\u0000/i.test(value);
const assert = (condition,message) => {if(!condition)throw new Error(message);};
export function safeAsset(value,origin=base) {
  assert(typeof value==='string' && !/[\\\s?#]/.test(value) && !value.split('/').includes('..'),'unsafe_asset');
  if(/^https:\/\/github\.com\/hphugosm\/study\/releases\/download\/studylo-learning-v1\/[a-f0-9]{64}\.(?:webp|png|jpg)$/.test(value))return value;
  const url=new URL(value,origin),allowed=new URL('./assets/',origin);
  assert(url.origin===allowed.origin && url.pathname.startsWith(allowed.pathname) && /\.(?:png|jpg|jpeg|webp)$/i.test(url.pathname) && !url.username&&!url.password,'unsafe_asset');
  return url.href;
}
export function gradeQuestion(question,index) {
  assert(Number.isInteger(index)&&index>=0&&index<question.options.length,'invalid_answer');
  return {correct:index===question.answer,answer:question.answer,explanation:question.explanation};
}
export async function loadContent(unit,{fetcher=globalThis.fetch,signal}={}) {
  const location=unit.content_url||unit.contentUrl;
  assert(typeof location==='string'&&!location.includes('..')&&!/[\\?#]/.test(location),'missing_content_url');
  const appRoot=new URL('../../',base),url=new URL(location,appRoot),prefix=new URL('./content/',base);
  assert(url.origin===appRoot.origin&&url.pathname.startsWith(prefix.pathname)&&url.pathname.endsWith('.json')&&!url.username&&!url.password,'unsafe_content_url');
  const response=await fetcher(url,{credentials:'omit',signal});if(!response.ok)throw new Error('content_unavailable');
  const data=validateContent(await response.json());
  if(unit.subject||unit.subjectId)assert(data.subject===(unit.subject||unit.subjectId),'subject_mismatch');
  if(unit.topic||unit.topicId)assert(data.topic===(unit.topic||unit.topicId),'topic_mismatch');
  return data;
}
export function sourceURL(value) {
  assert(typeof value==='string','unsafe_source');
  if(value.startsWith('https://'))return value;
  assert(!/^[a-z][a-z0-9+.-]*:|^\/\//i.test(value) && /^(?:\/?modules\/|\.?\/assets\/|assets\/)/.test(value) && !value.split('/').includes('..') && !/[?#\\]/.test(value),'unsafe_source');
  return new URL(value.replace(/^\/(?=modules\/)/,''),value.replace(/^\//,'').startsWith('modules/')?new URL('../../',base):base).href;
}
export function extractionPageText(page) {
  assert(Number.isInteger(page.number)&&page.number>0&&typeof page.text==='string','invalid_extraction');
  const ocr=typeof page.ocr_text==='string'?page.ocr_text:typeof page.ocr?.text==='string'?page.ocr.text:'';
  const names={page:'Strana',slide:'Snímek',paragraph:'Odstavec',block:'Blok',table:'Tabulka',sheet:'List',image:'Obrázek'};
  const generic=!page.label||page.label===`${page.kind} ${page.number}`;
  return {label:generic?`${names[page.kind]||'Část'} ${page.number}${page.locator?` · ${page.locator}`:''}`:page.label,text:page.text,ocr};
}
export function validateContent(data) {
  assert(data?.schema===1 && typeof data.subject==='string' && typeof data.topic==='string' && slug.test(data.subject) && slug.test(data.topic) && textOK(data.title),'invalid_content');
  assert(['cs','en'].includes(data.language),'invalid_language');
  assert(Array.isArray(data.sources) && data.sources.length>0,'missing_sources');
  const sources=new Map();
  for(const source of data.sources){
    assert(typeof source.id==='string' && source.id.length<=120 && hash.test(source.sha256) && textOK(source.title) && !sources.has(source.id),'invalid_source');
    const url=new URL(sourceURL(source.url),base);
    assert((url.protocol===base.protocol && url.origin===base.origin && !url.username&&!url.password && !source.url.includes('..') && !/^[a-z][a-z0-9+.-]*:|^\/\//i.test(source.url) && /\.(?:pdf|pptx|ppt|docx|doc|odt|odp|xlsx|txt|jpg|png|wmv)$/.test(url.pathname) && !/[?#\\]/.test(source.url)) ||
      new RegExp(`^https://github\\.com/hphugosm/study/releases/download/studylo-materials-v1/${source.sha256}\\.(pdf|pptx|ppt|docx|doc|odt|odp|xlsx|txt|jpg|png|wmv)$`).test(source.url),'unsafe_source');
    if(source.extraction_url!==undefined){const extracted=new URL(source.extraction_url,base);assert(extracted.protocol===base.protocol&&extracted.origin===base.origin&&!extracted.username&&!extracted.password&&!source.extraction_url.includes('..')&&extracted.pathname===new URL(`./extracted/${source.sha256}.json`,base).pathname&&!extracted.search&&!extracted.hash,'unsafe_extraction_url');}
    if(source.archive_url!==undefined)assert(new RegExp(`^https://github\\.com/hphugosm/study/releases/download/studylo-learning-v1/${source.sha256}\\.zip$`).test(source.archive_url),'unsafe_archive_url');
    sources.set(source.id,source);
  }
  const refs=item=>{
    assert(Array.isArray(item.source_refs)&&item.source_refs.length>0,'missing_source_refs');
    for(const ref of item.source_refs)assert(sources.get(ref.id)?.sha256===ref.sha256 && (ref.page===undefined || Number.isSafeInteger(ref.page)&&ref.page>0) && (ref.locator===undefined || textOK(ref.locator)),'invalid_source_ref');
  };
  const ids=new Set();
  const identify=item=>{assert(typeof item.id==='string'&&slug.test(item.id)&&!ids.has(item.id),'invalid_item_id');ids.add(item.id);};
  assert(Array.isArray(data.lessons),'invalid_lessons');
  for(const lesson of data.lessons){
    identify(lesson);assert(textOK(lesson.title),'invalid_lesson');refs(lesson);
    for(const block of lesson.blocks||[]){assert(['paragraph','callout','list'].includes(block.type),'invalid_block');if(block.type==='list')assert(Array.isArray(block.items)&&block.items.length>0&&block.items.every(textOK),'invalid_list');else assert(textOK(block.text),'invalid_block');if(block.type==='callout'&&block.tone!==undefined)assert(['key','tip','warning'].includes(block.tone),'invalid_tone');refs(block);}
    for(const image of lesson.images||[]){safeAsset(image.src);assert(textOK(image.alt)&&(!image.caption||textOK(image.caption)),'invalid_image');refs(image);}
    for(const step of lesson.steps||[]){assert(textOK(step.title)&&textOK(step.text),'invalid_step');refs(step);}
    if(lesson.comparison){const comparison=lesson.comparison;assert(Array.isArray(comparison.columns)&&comparison.columns.length>=2&&comparison.columns.every(textOK),'invalid_comparison');for(const row of comparison.rows||[])assert(textOK(row.label)&&row.values?.length===comparison.columns.length&&row.values.every(textOK),'invalid_comparison');}
    if(lesson.interactive!==undefined){assert(lesson.interactive&&['refraction','parity'].includes(lesson.interactive.kind)&&textOK(lesson.interactive.title),'invalid_interaction');refs(lesson.interactive);validateInteraction(lesson.interactive);}
    for(const event of lesson.timeline||[]){assert(textOK(event.label)&&textOK(event.text),'invalid_timeline');refs(event);}
  }
  for(const card of data.flashcards||[]){identify(card);assert(textOK(card.front)&&textOK(card.back),'invalid_flashcard');refs(card);}
  for(const question of data.questions||[]){identify(question);assert(textOK(question.prompt)&&Array.isArray(question.options)&&question.options.length>=2&&question.options.every(textOK)&&Number.isInteger(question.answer)&&question.answer>=0&&question.answer<question.options.length&&textOK(question.explanation),'invalid_question');refs(question);}
  return data;
}
const keyFor=unit=>`study:course-notes:${unit.subject||unit.subjectId}:${unit.topic||unit.topicId}:v1`;
export function getProgress(unit={}) {
  const empty={readLessons:[],knownCards:[],attempts:[]};
  try{const stored=JSON.parse(globalThis.localStorage.getItem(keyFor(unit))||'{}');for(const key of Object.keys(empty))if(Array.isArray(stored[key]))empty[key]=stored[key];}catch{}
  return empty;
}
export async function mount(container,{unit={},mode='learn',onProgress}={}) {
  const abort=new AbortController();
  const interactionCleanups=[];
  const clearInteractions=()=>{for(const cleanup of interactionCleanups.splice(0))cleanup();};
  const host=document.createElement('div');container.append(host);
  const root=host.attachShadow({mode:'open'});
  const sheet=document.createElement('link');sheet.rel='stylesheet';sheet.href=new URL('./styles.css',base).href;root.append(sheet);
  const shell=document.createElement('section');shell.className='course-notes';root.append(shell);
  const el=(tag,value,className)=>{const item=document.createElement(tag);if(value!==undefined)item.textContent=value;if(className)item.className=className;return item;};
  const button=(label,action)=>{const item=el('button',label);item.type='button';item.onclick=action;return item;};
  shell.append(el('p','Načítám ověřené podklady…','muted'));
  let data;
  try{
    data=await loadContent(unit,{signal:abort.signal});
  }catch(error){if(error.name!=='AbortError')shell.replaceChildren(el('h2','Podklady se nepodařilo načíst'),el('p','Vrať se k seznamu témat a zkus to znovu.'));return()=>{abort.abort();host.remove();};}
  shell.lang=data.language;
  const scope={subject:data.subject,topic:data.topic},progress=getProgress(scope);
  const save=()=>{try{localStorage.setItem(keyFor(scope),JSON.stringify(progress));}catch{}onProgress?.(progress);};
  const sourceMap=new Map(data.sources.map((source,index)=>[source.id,{...source,number:index+1}]));
  const references=item=>{
    const row=el('p',undefined,'references');
    for(const ref of item.source_refs||[]){const source=sourceMap.get(ref.id),page=ref.page?`${/\.pptx?(?:$|[?#])/i.test(source.url)?'snímek':'str.'} ${ref.page}`:'';const description=[source.title,page,ref.locator].filter(Boolean).join(' · ');const link=el('a',`[${source.number}${page?` · ${page}`:''}]`);link.title=description;link.setAttribute('aria-label',description);link.href=sourceURL(source.url);link.target='_blank';link.rel='noopener noreferrer';row.append(link);}
    return row;
  };
  const counted=(n,one,few,many)=>`${n} ${n===1?one:n>=2&&n<=4?few:many}`;
  shell.replaceChildren(el('p','VÝPISKY A SOUVISLOSTI','eyebrow'),el('p',[counted(data.lessons.length,'lekce','lekce','lekcí'),counted(data.flashcards?.length||0,'kartička','kartičky','kartiček'),counted(data.questions?.length||0,'otázka','otázky','otázek')].join(' · '),'module-counts'));
  const nav=el('nav');nav.setAttribute('aria-label','Režim studia');const panel=el('div');shell.append(nav,panel);
  let active=['practice','cards'].includes(mode)?'practice':mode==='materials'?'sources':'study';
  const tabs=new Map();
  const markRead=lesson=>{if(!progress.readLessons.includes(lesson.id)){progress.readLessons.push(lesson.id);save();}render();};
  function gallery(image){
    const figure=el('figure'),img=el('img');img.src=safeAsset(image.src);img.alt=image.alt;img.referrerPolicy='no-referrer';img.loading='lazy';if(Number.isInteger(image.width)&&image.width>0)img.width=image.width;if(Number.isInteger(image.height)&&image.height>0)img.height=image.height;
    const zoom=button('Zvětšit obrázek',()=>{const dialog=el('dialog');const full=img.cloneNode();full.loading='eager';const close=button('Zavřít',()=>dialog.close());dialog.append(close,full,el('p',image.caption||image.alt),references(image));shell.append(dialog);dialog.addEventListener('close',()=>{dialog.remove();zoom.focus();},{once:true});dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});dialog.showModal();});
    figure.append(img,zoom);if(image.caption)figure.append(el('figcaption',image.caption));figure.append(references(image));return figure;
  }
  function renderStudy(){
    if(!data.lessons.length)panel.append(el('p','Pro toto téma jsou zatím připravené původní zdroje.'));
    for(const lesson of data.lessons){
      const card=el('article',undefined,'lesson');card.append(el('h2',lesson.title));
      for(const block of lesson.blocks||[]){const node=el(block.type==='list'?'ul':block.type==='callout'?'aside':'p',block.type==='list'?undefined:block.text,block.type);if(block.type==='list')for(const item of block.items)node.append(el('li',item));if(block.tone)node.classList.add(block.tone);card.append(node,references(block));}
      for(const image of lesson.images||[])card.append(gallery(image));
      if(lesson.steps?.length){let index=0;const box=el('section',undefined,'steps'),title=el('h3'),body=el('p'),refs=el('div'),position=el('p',undefined,'muted');const previous=button('Předchozí',()=>{index--;draw();}),next=button('Další krok',()=>{index++;draw();});function draw(){const step=lesson.steps[index];title.textContent=step.title;body.textContent=step.text;refs.replaceChildren(references(step));position.textContent=`Krok ${index+1} z ${lesson.steps.length}`;previous.disabled=index===0;next.disabled=index===lesson.steps.length-1;}box.append(position,title,body,refs,previous,next);draw();card.append(box);}
      if(lesson.comparison){const comparison=lesson.comparison,box=el('section',undefined,'comparison'),label=el('label','Porovnat pohled: '),select=el('select'),rows=el('div');for(const [i,title]of comparison.columns.entries()){const option=el('option',title);option.value=i;select.append(option);}label.append(select);const draw=()=>{rows.replaceChildren();for(const row of comparison.rows){rows.append(el('h4',row.label),el('p',row.values[Number(select.value)]));}};select.onchange=draw;box.append(label,rows);draw();card.append(box);}
      if(lesson.timeline?.length){const list=el('ol',undefined,'timeline');for(const event of lesson.timeline){const item=el('li'),details=el('details');details.append(el('summary',event.label),el('p',event.text),references(event));item.append(details);list.append(item);}card.append(list);}
      if(lesson.interactive){const inspector=el('section',undefined,'interactive-inspector');inspector.append(el('h3',lesson.interactive.title));const widget=el('div');inspector.append(widget,references(lesson.interactive));card.append(inspector);const cleanup=mountInteraction(widget,lesson.interactive);if(typeof cleanup==='function')interactionCleanups.push(cleanup);}
      card.append(references(lesson),button(progress.readLessons.includes(lesson.id)?'✓ Přečteno':'Označit jako přečtené',()=>markRead(lesson)));panel.append(card);
    }
  }
  function renderPractice(){
    const status=el('p',`Známé kartičky: ${progress.knownCards.length} · odpovědi: ${progress.attempts.length}`,'muted');panel.append(status);
    for(const card of data.flashcards||[]){const box=el('article',undefined,'lesson'),answer=el('div');answer.hidden=true;answer.append(el('p',card.back),references(card));const reveal=button('Otočit kartičku',()=>{answer.hidden=!answer.hidden;reveal.setAttribute('aria-expanded',String(!answer.hidden));});reveal.setAttribute('aria-expanded','false');box.append(el('h3',card.front),reveal,answer,button(progress.knownCards.includes(card.id)?'✓ Umím':'Tohle umím',()=>{if(!progress.knownCards.includes(card.id))progress.knownCards.push(card.id);save();render();}));panel.append(box);}
    for(const question of data.questions||[]){const box=el('fieldset',undefined,'lesson'),feedback=el('div');feedback.setAttribute('aria-live','polite');box.append(el('legend',question.prompt));const choices=[];for(const [i,option]of question.options.entries()){const choice=button(option,()=>{for(const item of choices)item.disabled=true;const {correct}=gradeQuestion(question,i);choice.classList.add(correct?'correct':'incorrect');feedback.replaceChildren(el('strong',correct?'Správně.':`Správná odpověď: ${question.options[question.answer]}`),el('p',question.explanation),references(question));progress.attempts.push({id:question.id,correct});progress.attempts=progress.attempts.slice(-500);save();status.textContent=`Známé kartičky: ${progress.knownCards.length} · odpovědi: ${progress.attempts.length}`;});choices.push(choice);box.append(choice);}box.append(feedback);panel.append(box);}
    if(!(data.flashcards?.length||data.questions?.length))panel.append(el('p','Toto téma používá otevřené úlohy nebo přehled podkladů. Najdeš je v části Studium.'));
  }
  function render(){
    clearInteractions();
    for(const [id,tab]of tabs){tab.setAttribute('aria-pressed',String(active===id));}
    panel.replaceChildren();if(active==='study')renderStudy();else if(active==='practice')renderPractice();else{for(const source of data.sources){const card=el('article',undefined,'lesson'),link=el('a',`[${sourceMap.get(source.id).number}] ${source.title}`);link.href=sourceURL(source.url);link.target='_blank';link.rel='noopener noreferrer';const version=el('details');version.append(el('summary','Verze podkladu'),el('p',`SHA-256: ${source.sha256}`,'fingerprint'));card.append(link,version);if(source.archive_url){const archive=el('a','Stáhnout text a obrázky (ZIP)');archive.href=source.archive_url;card.append(archive);}if(source.extraction_url){const content=el('div');const show=button('Zobrazit úplný text po stranách',async()=>{show.disabled=true;try{const response=await fetch(new URL(source.extraction_url,base),{credentials:'omit',signal:abort.signal});if(!response.ok)throw new Error();const extracted=await response.json();assert(Array.isArray(extracted.units),'invalid_extraction');for(const page of extracted.units){const view=extractionPageText(page),details=el('details');details.append(el('summary',view.label));if(view.text.trim())details.append(el('pre',view.text));if(view.ocr.trim()){details.append(el('aside','Automatický přepis obrázku; ověř podle původní strany/snímku','callout warning'),el('pre',view.ocr));}if(!view.text.trim()&&!view.ocr.trim())details.append(el('p','Tato strana obsahuje obrazový podklad bez dostupného textového přepisu. Otevři původní zdroj.','muted'));content.append(details);}show.remove();}catch{show.textContent='Text není dostupný. Zkusit znovu';show.disabled=false;}});card.append(show,content);}panel.append(card);}panel.append(el('p','Výpisky odkazují na konkrétní verze původních podkladů.','muted'));}
  }
  for(const [id,label]of [['study','Studium'],['practice','Procvičování'],['sources','Zdroje']]){const tab=button(label,()=>{active=id;render();});tabs.set(id,tab);nav.append(tab);}render();
  return()=>{clearInteractions();abort.abort();host.remove();};
}
