import { topics, cases, lessons, sources } from './data/lessons.js';
import { questions } from './data/questions.js';
import { vocabulary } from './data/vocabulary.js';
import { renderFlashcards, renderQuiz } from './practice.js';


export async function mount(container, options = {}) {
  const host = globalThis.document.createElement('section');
  host.className = 'law-module';
  host.lang = 'en';
  const root = host.attachShadow({mode: 'open'});
  container.replaceChildren(host);
  const css = ['original.css', 'practice.css', 'integration.css'].map(name => `<link rel="stylesheet" href="${new URL(name, import.meta.url).href}">`).join('');
  root.innerHTML = `${css}<div class="law-app"><a href="#main" class="skip-link">Skip to content</a><nav id="primary-nav" aria-label="Law study tools">
  <a href="#overview" data-route="overview">Progress</a><a href="#learn" data-route="learn">Study notes</a><a href="#flashcards" data-route="flashcards">Flashcards</a><a href="#practice" data-route="practice">Practice tests</a><a href="#vocabulary" data-route="vocabulary">Vocabulary</a><a href="#resources" data-route="resources">PDF & sources</a></nav>
  <button id="menu-toggle" hidden aria-expanded="false"></button><span id="current-page" hidden></span><main id="main" tabindex="-1"></main><div id="toast" class="toast" role="status" aria-live="polite"></div></div>`;
  // Resolve all retained material links relative to this module, including GitHub Pages subpaths.
  const rewriteAssets = () => root.querySelectorAll('[href^="assets/"]').forEach(a => a.href = new URL(a.getAttribute('href'), import.meta.url).href);
  const observer = new MutationObserver(rewriteAssets);
  observer.observe(root, {subtree: true, childList: true});
  const document = root;
  const location = {hash: '#' + (options.route || options.mode || 'learn')};
  const bus = new EventTarget();
  const window = {addEventListener: (...args) => bus.addEventListener(...args), dispatchEvent: (...args) => bus.dispatchEvent(...args), scrollTo: () => {}};
const main = document.querySelector('#main');
const KEY = 'study:law:progress:v1';
const empty = { knownCards: [], mistakes: [], attempts: [], readLessons: [] };
let progress;
let persistence = true;
try {
  const current = localStorage.getItem(KEY);
  const legacy = current ? null : localStorage.getItem('casebook-us-law-progress-v1');
  progress = { ...empty, ...JSON.parse(current || legacy || '{}') };
  if (!current && legacy) {
    try { localStorage.setItem(KEY, JSON.stringify(progress)); }
    catch { persistence = false; }
  }
}
catch { progress = { ...empty }; persistence = false; }
for (const key of Object.keys(empty)) if (!Array.isArray(progress[key])) progress[key] = [];
let cleanup = () => {};
let toastTimer;
const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));
const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const names = { overview:'Overview', learn:'Study notes', flashcards:'Flashcards', practice:'Practice tests', vocabulary:'Vocabulary', resources:'PDF & sources' };
const paths = {
  home:'M3 10.5 12 3l9 7.5M5 9v12h5v-7h4v7h5V9',
  book:'M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1Zm0 0v15',
  cards:'M7 4h14v16H7zM3 8v15h14M10 8h8M10 12h6',
  check:'M9 5H4v16h16V5h-5M9 3h6v4H9zM8 13l3 3 5-6',
  language:'M3 5h12M9 3v2M6 5c0 6 5 10 8 11M13 5c0 5-4 10-9 12M13 21l4-10 4 10M15 17h4',
  download:'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
  arrow:'M5 12h14m-5-5 5 5-5 5',
  target:'M20 12a8 8 0 1 1-8-8M16 12a4 4 0 1 1-4-4M12 12l8-8m-4 0h4v4',
  search:'m21 21-5-5M18 10.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0',
};
function icon(name) { return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name] || paths.book}"/></svg>`; }
document.querySelectorAll('[data-icon]').forEach(el => el.innerHTML = icon(el.dataset.icon));

function saveProgress(patch) {
  progress = { ...progress, ...patch };
  try { localStorage.setItem(KEY, JSON.stringify(progress)); }
  catch { persistence = false; }
  window.dispatchEvent(new CustomEvent('progresschange', { detail: progress })); options.onProgress?.(progress); container.dispatchEvent(new CustomEvent('study:progress', { detail: { subject: 'law', progress }, bubbles: true }));
}
function toast(message) {
  const el = document.querySelector('#toast');
  el.textContent = message; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}
function badge(provenance) {
  if (provenance === 'added') return '<span class="badge badge-added">Added</span>';
  if (provenance === 'corrected') return '<span class="badge badge-corrected">Correction</span>';
  return '';
}
function sourceLine(item) { return `<div class="source-line">${badge(item.provenance)}<span>${esc(item.source || '')}</span></div>`; }
function heading(eyebrow,title,description) {
  return `<div class="page-heading"><span class="eyebrow">${eyebrow}</span><h1 class="page-title">${title}</h1><p class="page-intro">${description}</p></div>`;
}
function getRoute() {
  const [path, query] = location.hash.slice(1).split('?');
  const [page, topic] = (path || 'overview').split('/');
  return { page:names[page] ? page : 'overview', topic, params:new URLSearchParams(query || '') };
}
function navigate(route) {
  const hash = route.startsWith('#') ? route : `#${route}`;
  location.hash = hash; render(); main.focus({preventScroll: true});
}
function routeTitle(item) { return item.id === 'gobitis' ? 'Gobitis (Gobitas)' : item.short.replace(/ · \d{4}/, ''); }
const topicDetails = {
  plessy:['01','1896','Separate but equal','Race, segregation & equal protection'],
  gobitis:['02','1940','National unity & conscience','Religious liberty & school authority'],
  barnette:['03','1943','Freedom not to speak','Compelled speech & a changed precedent'],
  brown:['04','1954','Separate is unequal','Public education & equal protection'],
  courts:['05','STRUCTURE','The two court systems','Federal courts, state courts & jurisdiction'],
  appeals:['06','PROCEDURE','From trial to review','Parties, outcomes & certiorari'],
  vocabulary:['07','EN + CZ','Words that make it click','English definitions, Czech translations'],
};
function renderOverview() {
  const known = new Set(progress.knownCards).size;
  const attempted = progress.attempts.reduce((n,a)=>n+(Number(a.total)||0),0);
  const correct = progress.attempts.reduce((n,a)=>n+(Number(a.score)||0),0);
  const accuracy = attempted ? `${Math.round(100*correct/attempted)}%` : '—';
  const cardCount = vocabulary.length + questions.filter(q=>q.type!=='order').length;
  const read = topics.filter(t=>progress.readLessons.includes(t.id)).length;
  main.innerHTML = `${progress.mistakes.length ? `<div class="hero-review"><span>${progress.mistakes.length} question${progress.mistakes.length===1?' needs':'s need'} another look.</span><a href="#practice?review=1">Review mistakes →</a></div>`:''}
  <section class="hero" aria-labelledby="hero-title"><div class="hero-copy"><span class="eyebrow">A LITTLE PRACTICE. A STRONGER UNDERSTANDING.</span><h1 id="hero-title">Learn the cases.<br>Make the connections.</h1><p>From landmark decisions to the language of the courts. Your whole quiz, broken into clear notes and practice that explains the why.</p><div class="hero-buttons"><a class="btn btn-primary" href="#practice">Start practicing <span aria-hidden="true">↗</span></a><a class="btn btn-secondary" href="#learn">Explore the notes</a></div></div><div class="hero-visual" aria-hidden="true"><div class="case-stack"><div class="stack-row"><div><b>Plessy</b><br><small>Separate but equal</small></div><span class="stack-year">1896</span></div><div class="stack-row"><div><b>Gobitis</b><br><small>National unity & conscience</small></div><span class="stack-year">1940</span></div><div class="stack-row"><div><b>Barnette</b><br><small>The freedom not to speak</small></div><span class="stack-year">1943</span></div><div class="stack-row"><div><b>Brown</b><br><small>Separate is unequal</small></div><span class="stack-year">1954</span></div></div><span class="visual-caption">FOUR DECISIONS. TWO CHANGING PRECEDENTS.</span></div></section>
  <div class="stats-row"><div class="stat-box"><span class="stat-icon">${icon('cards')}</span><div><div class="stat-value">${known}<span style="font-size:11px;color:#a0aa98;font-weight:400"> / ${cardCount}</span></div><div class="stat-label">CARDS YOU KNOW</div></div></div><div class="stat-box"><span class="stat-icon">${icon('check')}</span><div><div class="stat-value">${progress.attempts.length}</div><div class="stat-label">PRACTICE SESSIONS</div></div></div><div class="stat-box"><span class="stat-icon">${icon('target')}</span><div><div class="stat-value">${accuracy}</div><div class="stat-label">PRACTICE ACCURACY</div></div></div></div>
  <section><div class="section-heading"><div><h2>Your quiz, covered.</h2><p>Seven topics. Start wherever you need a little clarity.</p></div><a href="#flashcards" class="text-link">Switch to flashcards ↗</a></div><div class="topic-grid">${topics.map(t=>{
    const d=topicDetails[t.id]; const count=t.id==='vocabulary'?`${vocabulary.length} bilingual terms`:`${questions.filter(q=>q.topic===t.id).length} practice questions`;
    return `<a class="topic-card ${t.id==='vocabulary'?'wide-topic':''}" style="--topic:${esc(t.color)};--tint:${esc(t.color)}10" href="#${t.id==='vocabulary'?'vocabulary':`learn/${t.id}`}"><div class="topic-top"><span class="topic-symbol">${t.id==='vocabulary'?'Aa':d[1]==='1896'?'§':d[1]==='1940'?'⚑':d[1]==='1943'?'“':d[1]==='1954'?'=':t.id==='courts'?'III':'↗'}</span><span class="topic-number">${d[0]}</span></div><div><h3>${esc(routeTitle(t))}${['plessy','gobitis','barnette','brown'].includes(t.id)?` <span style="font-size:11px;color:#a2aaa0;font-family:var(--sans)">${d[1]}</span>`:''}</h3><p>${d[3]}</p></div><div class="topic-card-footer"><span>${count}${progress.readLessons.includes(t.id)?' · Read':''}</span><span aria-hidden="true">↗</span></div></a>`;
  }).join('')}</div></section>
  <div class="bottom-split"><section class="mini-panel"><h3>A little progress goes a long way.</h3><p>${read?`You've explored ${read} of the seven topics. Keep building the connections.`:'Read a topic, test yourself, then return to the ideas you missed.'}</p><div class="progress-track" aria-label="Topics read"><span style="width:${read/7*100}%"></span></div><span style="font-size:9px;color:#8a9782">${read} OF 7 TOPICS EXPLORED</span>${progress.attempts.length?`<div style="margin-top:13px">${progress.attempts.slice(-2).reverse().map(a=>`<div class="recent-attempt"><span>${esc(a.mode || 'Practice')} · ${new Date(a.date).toLocaleDateString('en-GB',{day:'numeric',month:'short'})}</span><b>${a.score}/${a.total}</b></div>`).join('')}</div>`:''}</section><section class="mini-panel pdf-panel"><div class="pdf-art" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div><div><span class="eyebrow" style="font-size:8px;margin-bottom:7px">TAKE IT WITH YOU</span><h3>The complete study guide.</h3><p>Eight color-coded pages. All cases, courts, appeals and vocabulary, with sources clearly marked.</p><a class="text-link" href="assets/US_Law_Expanded_English_Study_Notes.pdf" download>Download English PDF <span>↗</span></a></div></section></div>`;
}
function courtMap() {
  return `<div class="court-map"><div class="court-column"><h3>Federal courts</h3><div class="court-node">U.S. Supreme Court<small>9 justices · selective review</small></div><div class="court-arrow" aria-hidden="true">↑</div><div class="court-node">U.S. Court of Appeals<small>usually 3 judges</small></div><div class="court-arrow" aria-hidden="true">↑</div><div class="court-node">U.S. District Court<small>trial level</small></div></div><div class="court-column"><h3>State courts</h3><div class="court-node">Court of last resort<small>often state supreme court</small></div><div class="court-arrow" aria-hidden="true">↑</div><div class="court-node">Intermediate appellate court<small>structure varies by state</small></div><div class="court-arrow" aria-hidden="true">↑</div><div class="court-node">State trial court<small>local courts usually fit here</small></div></div></div>`;
}
function renderLearn(topic) {
  const id = topics.some(t=>t.id===topic && t.id!=='vocabulary') ? topic : 'plessy';
  const item = cases.find(c=>c.id===id) || lessons.find(l=>l.id===id);
  const t = topics.find(t=>t.id===id);
  main.innerHTML = `${heading('GET THE WHOLE PICTURE','The study notes.','Read the story, understand the reasoning, then test the connection.')}
  <div class="lesson-tabs" aria-label="Choose study topic">${topics.filter(t=>t.id!=='vocabulary').map(t=>`<a class="pill ${t.id===id?'active':''}" href="#learn/${t.id}" ${t.id===id?'aria-current="true"':''}>${esc(t.short)}</a>`).join('')}</div>
  <div class="lesson-main"><article><div class="case-heading" style="--case-color:${esc(t.color)}"><span class="eyebrow">${item.year?'LANDMARK DECISION':'THE LEGAL SYSTEM'}</span><h2>${esc(item.title)}${item.year?` <span style="color:#909a8c">(${item.year})</span>`:''}</h2>${item.year?`<div class="case-meta"><span>Vote: ${esc(item.vote)}${['plessy','brown'].includes(id)?' · added/verified':''}</span><span>${esc(item.author)}</span></div>`:''}<p>${esc(item.tagline || item.intro)}</p>${item.provenance==='added'?`<div class="source-line">${badge('added')}<span>Researched explanation beyond the supplied files</span></div>`:''}</div>
  ${id==='courts'?courtMap():''}
  ${item.sections.map(s=>`<section class="lesson-section"><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p>${sourceLine(s)}</section>`).join('')}
  ${item.takeaway?`<div class="takeaway"><span class="eyebrow">THE ONE-LINE TAKEAWAY</span><p>${esc(item.takeaway)}</p></div>`:''}
  <button class="btn ${progress.readLessons.includes(id)?'btn-secondary':'btn-primary'}" id="mark-read">${progress.readLessons.includes(id)?'✓ Topic explored':'Mark this topic as explored'}</button></article>
  <aside class="lesson-aside"><section class="aside-panel"><h3>Make it stick.</h3><p>Close the notes for a moment. Try recalling the rule in your own words.</p><a class="btn btn-primary" href="#flashcards?topic=${id}">Practice these flashcards ↗</a><a class="btn btn-secondary" href="#practice?topic=${id}">Test this topic</a></section><section class="aside-panel"><h3>Know where it comes from.</h3><p><span class="badge badge-added">Added</span> means a fact goes beyond the eight supplied files.<br><span class="badge badge-corrected">Correction</span> fixes a source error or oversimplification.</p><a class="text-link" href="#resources">View all sources ↗</a></section></aside></div>`;
  document.querySelector('#mark-read').addEventListener('click',()=>{
    if (!progress.readLessons.includes(id)) saveProgress({readLessons:[...progress.readLessons,id]});
    const btn = document.querySelector('#mark-read'); btn.textContent='✓ Topic explored'; btn.className='btn btn-secondary'; toast('Topic explored. Ready to try it from memory?');
  });
}
function renderVocabulary() {
  main.innerHTML = `${heading('THE WORDS BEHIND THE ARGUMENTS','Vocabulary, understood.','A clear English definition, a Czech translation and a sentence showing each term in context.')}
  <div class="vocab-toolbar"><div class="search-field">${icon('search')}<label class="sr-only" for="vocab-search">Search in English or Czech</label><input id="vocab-search" type="search" placeholder="Find a word in English or Czech…" autocomplete="off"></div><label class="sr-only" for="vocab-category">Vocabulary category</label><select id="vocab-category"><option value="all">All categories</option><option value="courts">Courts</option><option value="appeals">Appeals</option><option value="rights">Rights & freedoms</option><option value="law">Sources & principles</option></select><a class="btn btn-secondary" href="#flashcards?topic=vocabulary">Practice as cards ↗</a></div><p class="vocab-count" id="vocab-count"></p><div class="vocab-grid" id="vocab-results"></div>`;
  function update() {
    const query=normalize(document.querySelector('#vocab-search').value.trim());
    const category=document.querySelector('#vocab-category').value;
    const items=vocabulary.filter(v=>(category==='all'||v.category===category)&&normalize(`${v.term} ${v.definition} ${v.translation}`).includes(query));
    document.querySelector('#vocab-count').textContent=`${items.length} of ${vocabulary.length} terms`;
    document.querySelector('#vocab-results').innerHTML=items.length?items.map(v=>`<article class="vocab-card"><h3>${esc(v.term)}</h3><p class="vocab-en"><span class="lang-label">EN</span>${esc(v.definition)}</p><p class="vocab-cs" lang="cs"><span class="lang-label">CZ</span>${esc(v.translation)}</p><p class="vocab-example">“${esc(v.example)}”</p>${sourceLine(v)}</article>`).join(''):'<div class="no-results">No matching terms. Try another word or category.</div>';
  }
  document.querySelector('#vocab-search').addEventListener('input',update);
  document.querySelector('#vocab-category').addEventListener('change',update); update();
  if (!progress.readLessons.includes('vocabulary')) saveProgress({readLessons:[...progress.readLessons,'vocabulary']});
}
function renderResources() {
  const supplied=sources.filter(s=>s.kind==='supplied');
  const external=sources.filter(s=>s.kind!=='supplied');
  main.innerHTML=`${heading('KEEP THE NOTES. CHECK THE SOURCES.','Your study shelf.','Download the notes for printing, or follow a source to check the details behind an explanation.')}
  <div class="resource-grid"><section class="download-card"><div class="pdf-art" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><div><span class="eyebrow">THE EXPANDED ENGLISH EDITION</span><h3>U.S. Law<br>Study Notes</h3><p>Eight color-coded pages with case briefs, constitutional reasoning, court structure, appeals and vocabulary.</p><a class="btn btn-primary" href="assets/US_Law_Expanded_English_Study_Notes.pdf" download>Download English PDF ↓</a><small>8 pages · PDF · sources & corrections included</small></div></section><section class="download-card"><div><span class="eyebrow">A QUICK CZECH REFERENCE</span><h3>Stručné<br>české poznámky</h3><p lang="cs">Čtyřstránkový barevný přehled případů, soudů, odvolání a anglicko-českého slovníčku.</p><a class="btn btn-secondary" href="assets/Pravo_USA_barevne_poznamky.pdf" download>Download Czech PDF ↓</a><small>4 pages · PDF · original compact edition</small></div></section></div>
  <section class="source-register"><h2>Clear about what came from where.</h2><p>This study space is based on eight supplied teaching files. Their original files are not republished here. Case summaries, translations and practice questions are written for this guide. The official case name is <strong>Gobitis</strong>; <strong>Gobitas</strong> is the family's surname.</p><div class="comparison"><div><h4><span class="badge badge-added">Added</span> Researched context</h4><p>The files do not explain Barnette. Its brief and many answers about Gobitis are added from external sources, as are selected clarifications of legal terms.</p></div><div><h4><span class="badge badge-corrected">Correction</span> Accuracy first</h4><p>Plessy's arrest was in 1892, and the vote was 7–1. Brown rejected separate but equal in public education in 1954. A remand is not an automatic restart of the entire case.</p></div></div><details class="source-details" open><summary>The eight supplied materials</summary><div class="source-list">${supplied.map(s=>`<div class="source-item"><b>${esc(s.id)}</b>${esc(s.title)}</div>`).join('')}</div></details><details class="source-details"><summary>External verification & reading</summary><div class="source-list">${external.map(s=>`<div class="source-item"><b>${esc(s.id)}</b>${s.url?`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a>`:esc(s.title)}</div>`).join('')}</div></details><div class="source-note">A question in a blank worksheet is not itself evidence for the answer. Unmarked study explanations synthesize the supplied files; Added and Correction labels identify the extra factual work. The historical trademark example in S5 is used for vocabulary, with its outdated legal premise corrected.</div></section>`;
}
function render() {
  cleanup(); cleanup=()=>{};
  const { page,topic,params }=getRoute();
  // The shared shell owns the browser title.
  document.querySelector('#current-page').textContent=names[page];
  document.querySelectorAll('[data-route]').forEach(a=>{
    if(a.dataset.route===page)a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
  });
  document.querySelector('#primary-nav').classList.remove('open');
  document.querySelector('#menu-toggle').setAttribute('aria-expanded','false');
  if(page==='overview')renderOverview();
  else if(page==='learn')renderLearn(topic);
  else if(page==='vocabulary')renderVocabulary();
  else if(page==='resources')renderResources();
  else {
    const isCards=page==='flashcards';
    main.innerHTML='<div id="practice-mount"></div>';
    const ctx={readProgress:()=>progress,saveProgress,onNavigate:navigate,initialTopic:params.get('topic')||'all',initialMode:params.get('mode')||'mixed',reviewOnly:params.get('review')==='1'};
    const result=(isCards?renderFlashcards:renderQuiz)(document.querySelector('#practice-mount'),ctx);
    if(typeof result==='function')cleanup=result;
  }
  if(!persistence)toast('Progress is available for this visit, but your browser could not save it.');
  window.scrollTo({top:0,behavior:'instant'});
}
document.querySelector('#menu-toggle').addEventListener('click',()=>{
  const open=document.querySelector('#primary-nav').classList.toggle('open');
  document.querySelector('#menu-toggle').setAttribute('aria-expanded',String(open));
});
document.querySelector('.skip-link').addEventListener('click',event=>{event.preventDefault();main.focus();main.scrollIntoView();});

window.addEventListener('progresschange',()=>{ if(getRoute().page==='overview')renderOverview(); });
render();

const onInternalLink = event => {
  const anchor = event.target.closest('a[href^="#"]');
  if (!anchor || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  if (anchor.getAttribute('href') === '#main') { main.focus(); return; }
  navigate(anchor.getAttribute('href'));
};
root.addEventListener('click', onInternalLink);
return () => {
  cleanup();
  observer.disconnect();
  clearTimeout(toastTimer);
  root.removeEventListener('click', onInternalLink);
  container.replaceChildren();
};
}

export function getProgress() {
  const empty = { knownCards: [], mistakes: [], attempts: [], readLessons: [] };
  try {
    const stored = JSON.parse(localStorage.getItem('study:law:progress:v1') || localStorage.getItem('casebook-us-law-progress-v1') || '{}');
    for (const key of Object.keys(empty)) if (Array.isArray(stored?.[key])) empty[key] = stored[key];
  } catch { /* Invalid stored data must never prevent access to study materials. */ }
  return empty;
}
