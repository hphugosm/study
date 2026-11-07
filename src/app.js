import {subjects,units,events,getSubject,getUnit,eventContext,eventTypes,moduleLoaders} from './data.js';
import {calendarDays,pragueToday,parseDate} from './calendar.js';
import {icon} from './icons.js';
import {createNavigation,routeInfo} from './navigation.js';
import {initPreferences} from './preferences.js';
import {mountSettings} from './settings.js';
import {initPwa,notifyPwaRoute} from './pwa.js';

const main = document.querySelector('main');
const today = pragueToday();
const upcomingEvents = () => events.filter(event=>event.date>=today).sort((a,b)=>a.date.localeCompare(b.date));
let cursor = parseDate(today);
let selectedDay = upcomingEvents()[0]?.date || today;
let cleanupModule = null;
let routeVersion = 0;
let activeTab = 'tools';
const monthFormat = new Intl.DateTimeFormat('cs-CZ',{month:'long',year:'numeric'});
const fullDate = key => new Intl.DateTimeFormat('cs-CZ',{day:'numeric',month:'long',year:'numeric'}).format(parseDate(key));
const dayName = key => new Intl.DateTimeFormat('cs-CZ',{weekday:'long'}).format(parseDate(key));
const esc = text => String(text).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const counted = (count,one,few,many) => `${count} ${count===1?one:count>=2&&count<=4?few:many}`;
const subjectStyle = s => `--subject:${s.color};--tint:${s.tint}`;
const schoolEventStyle = {name:'Školní akce',color:'#527c8a',tint:'#edf4f6',icon:'calendar'};
const eventSubject = event => eventContext(event).subject || schoolEventStyle;
const dateParts = key => ({day:parseDate(key).getDate(),month:new Intl.DateTimeFormat('cs-CZ',{month:'short'}).format(parseDate(key))});

document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));

function eventCard(event,compact=false) {
  const {unit} = eventContext(event);
  const subject = eventSubject(event);
  const subtitle = [compact?null:unit?.title,event.allDay?'Celý den':null].filter(Boolean).join(' · ');
  const date = dateParts(event.date);
  return `<a class="event-card ${compact?'compact':''}" href="#/events/${event.id}" style="${subjectStyle(subject)}">
    ${compact?'':`<div class="event-date"><strong>${date.day}</strong><span>${date.month}</span></div>`}
    <div class="event-card-body"><div class="event-meta"><span class="subject-dot"></span>${subject.name}<span class="event-type ${event.type}">${eventTypes[event.type]}</span></div><h3>${esc(event.title)}</h3>${subtitle?`<p>${esc(subtitle)}</p>`:''}</div>${icon('arrow','event-arrow')}</a>`;
}

function renderCalendar() {
  const year = cursor.getFullYear(), month = cursor.getMonth();
  const monthKey = `${year}-${String(month+1).padStart(2,'0')}`;
  const monthEvents = events.filter(e=>e.date.startsWith(monthKey));
  const selectedEvents = events.filter(e=>e.date===selectedDay);
  const upcoming = upcomingEvents();
  main.innerHTML = `<section class="page-intro"><div><p class="eyebrow">TVŮJ STUDIJNÍ PŘEHLED</p><h1>Všechno má svůj čas<span class="muted-period">.</span></h1><p>Termíny na očích. Učení na jednom místě.</p></div><div class="today-label">${icon('calendar')}<span>Dnes je ${fullDate(today)}</span></div></section>
    <section class="calendar-layout" aria-label="Školní kalendář">
      <div class="calendar-panel"><div class="calendar-toolbar"><div><h2 id="month-heading">${monthFormat.format(cursor)}</h2><span class="month-count">${monthEvents.length} ${monthEvents.length===1?'událost':monthEvents.length>=2&&monthEvents.length<=4?'události':'událostí'}</span></div><div class="calendar-controls"><button class="today-button" data-action="today" aria-label="Dnes">Dnes</button><div class="month-arrows"><button class="icon-button" data-action="previous" aria-label="Předchozí měsíc">${icon('left')}</button><button class="icon-button" data-action="next" aria-label="Další měsíc">${icon('right')}</button></div></div></div>
      <div class="weekdays" aria-hidden="true">${['Po','Út','St','Čt','Pá','So','Ne'].map(d=>`<span>${d}</span>`).join('')}</div>
      <div class="calendar-grid" aria-labelledby="month-heading">${calendarDays(year,month).map((d,index)=>{
        const dayEvents = events.filter(e=>e.date===d.key);
        return `<button class="calendar-day ${d.inMonth?'':'outside'} ${d.key===today?'is-today':''} ${d.key===selectedDay?'selected':''} ${index%7>=5?'weekend':''}" data-date="${d.key}" aria-pressed="${d.key===selectedDay}" aria-label="${fullDate(d.key)}${dayEvents.length?`, ${dayEvents.map(e=>`${eventSubject(e).name}: ${e.title}${e.allDay?" (celý den)":""}`).join(', ')}`:', bez událostí'}"><span class="day-number">${d.day}</span><span class="day-events">${dayEvents.map(event=>{const s=eventSubject(event);return `<span class="calendar-chip ${event.type}" style="${subjectStyle(s)}"><span class="chip-dot"></span><span>${s.name}</span><span class="chip-title">${esc(event.type==='homework'?'Rozbor Lakomce':event.id==='biology-test'?'Kosterní soustava':event.title)}</span></span>`;}).join('')}</span><span class="mobile-event-dots" aria-hidden="true">${dayEvents.map(e=>`<i class="${e.type}" style="--subject:${eventSubject(e).color}"></i>`).join('')}</span></button>`;
      }).join('')}</div><div class="calendar-legend"><span><i class="test"></i>Test / písemná práce</span><span><i class="homework"></i>Domácí úkol</span><span><i class="excursion"></i>Exkurze</span></div></div>
      <aside class="day-panel" aria-live="polite"><p class="eyebrow">VYBRANÝ DEN</p><h2>${new Intl.DateTimeFormat('cs-CZ',{day:'numeric',month:'long'}).format(parseDate(selectedDay))}</h2><p class="day-subtitle">${dayName(selectedDay)} <span>·</span> ${selectedEvents.length?`${selectedEvents.length} ${selectedEvents.length===1?'událost':'události'}`:'volný den'}</p><div class="selected-events">${selectedEvents.length?selectedEvents.map(e=>eventCard(e,true)).join(''):`<div class="quiet-empty">${icon('spark')}<h3>Prostor pro vlastní tempo.</h3><p>Na tento den nemáš žádný termín. Můžeš se vrátit k tomu, co chceš procvičit.</p><a class="text-link" href="#/practice">Vybrat procvičování ${icon('arrow')}</a></div>`}</div><div class="day-footnote">${icon('check')}<span>Klikni na událost a zobraz její podrobnosti.</span></div></aside>
    </section>
    <section class="upcoming-section"><div class="section-heading"><h2>Nejbližší termíny</h2><span>${upcoming.length} ${upcoming.length===1?"nadcházející událost":upcoming.length>=2&&upcoming.length<=4?"nadcházející události":"nadcházejících událostí"}</span></div><div class="upcoming-grid">${upcoming.length?upcoming.map(e=>eventCard(e)).join(''):'<p class="empty-copy">Všechny zadané termíny už proběhly. Najdeš je v listopadu 2026.</p>'}</div></section>
    <section class="subject-section"><div class="section-heading"><h2>Tvoje předměty</h2><a class="text-link" href="#/subjects">Zobrazit všechny ${icon('arrow')}</a></div><div class="subject-strip">${subjects.map(s=>`<a class="subject-shortcut" href="#/subjects/${s.id}" style="${subjectStyle(s)}"><span class="subject-icon">${icon(s.icon)}</span><span>${s.name}</span>${icon('arrow')}</a>`).join('')}</div></section>`;
  main.querySelectorAll('[data-date]').forEach(button=>button.addEventListener('click',()=>{
    selectedDay=button.dataset.date;
    renderCalendar();
    main.querySelector(`[data-date="${selectedDay}"]`)?.focus({preventScroll:true});
    if(matchMedia('(max-width: 900px)').matches)main.querySelector('.day-panel')?.scrollIntoView({block:'nearest',behavior:'instant'});
  }));
  main.querySelector('[data-action="today"]').onclick=()=>{cursor=parseDate(pragueToday());selectedDay=pragueToday();renderCalendar();};
  for(const [action,amount] of [['previous',-1],['next',1]]) main.querySelector(`[data-action="${action}"]`).onclick=()=>{
    cursor=new Date(year,month+amount,1,12);selectedDay=`${cursor.getFullYear()}-${String(cursor.getMonth()+1).padStart(2,'0')}-01`;renderCalendar();main.querySelector(`[data-action="${action}"]`).focus({preventScroll:true});
  };
}

function subjectCard(subject) {
  const subjectUnits=units.filter(u=>u.subjectId===subject.id&&u.kind!=='collection');
  const count=events.filter(e=>getUnit(e.unitId)?.subjectId===subject.id).length;
  return `<a class="subject-card" href="#/subjects/${subject.id}" style="${subjectStyle(subject)}"><span class="subject-icon">${icon(subject.icon)}</span><div class="subject-card-top"><span>${counted(subjectUnits.length,'téma','témata','témat')}</span>${icon('arrow')}</div><h2>${subject.name}</h2><p>${subject.description}</p><div class="subject-card-foot"><span class="subject-dot"></span>${subjectUnits.some(u=>u.module)?'Materiály a procvičování':subjectUnits.some(u=>u.materials.length)?'Původní podklady':'Materiály zatím nepřidány'}<span>${counted(count,'termín','termíny','termínů')}</span></div></a>`;
}
function renderSubjects() {
  main.innerHTML=`<section class="page-intro"><div><p class="eyebrow">TVŮJ STUDIJNÍ PROSTOR</p><h1>Každý předmět má své místo.</h1><p>Od prvních poznámek až po poslední opakování.</p></div></section><div class="subjects-grid">${subjects.map(subjectCard).join('')}</div><div class="subtle-note">${icon('layers')}<div><h3>Prostor pro další témata</h3><p>Každý předmět může obsahovat více jednotek, materiálů i termínů.</p></div></div>`;
}

function renderSubject(subject) {
  const subjectUnits=units.filter(unit=>unit.subjectId===subject.id&&unit.kind!=='collection');
  const subjectEvents=events.filter(event=>getUnit(event.unitId)?.subjectId===subject.id);
  const groups=new Map();
  for(const unit of subjectUnits.filter(unit=>unit.origin==='moodle')){const key=unit.course_variant||'JU3';if(!groups.has(key))groups.set(key,[]);groups.get(key).push(unit);}
  const legacy=subjectUnits.filter(unit=>unit.origin!=='moodle');if(legacy.length)groups.set('Původní studijní nástroje',legacy);
  const card=unit=>`<a class="unit-card course-topic-card" data-topic-search="${esc(unit.title.toLocaleLowerCase('cs-CZ'))}" href="#/units/${unit.id}" style="${subjectStyle(subject)}"><div><p class="eyebrow">${esc(unit.label||'STUDIJNÍ TÉMA')}</p><h2>${esc(unit.title)}</h2><p>${esc(unit.description)}</p>${unit.origin==='moodle'?`<p class="topic-availability">${unit.available===false?'Nyní nepřístupné':`${unit.sourceCount} zdrojů · ${unit.lessonCount} lekcí${unit.questionCount?` · ${unit.questionCount} otázek`:''}`}</p>`:''}<span class="text-link">Otevřít téma ${icon('arrow')}</span></div><span class="unit-card-icon">${icon(unit.module?'book':'file')}</span></a>`;
  main.innerHTML=`<section class="subject-overview" style="${subjectStyle(subject)}"><div class="subject-overview-heading"><span class="subject-icon">${icon(subject.icon)}</span><p class="eyebrow">TVŮJ PŘEDMĚT</p></div><h1>${esc(subject.name)}</h1><p>${esc(subject.description)}</p></section>
    <section aria-label="Studijní témata"><div class="section-heading"><h2>Témata a příprava</h2><span>${counted(subjectUnits.length,'téma','témata','témat')}</span></div><label class="topic-search-label" for="topic-search">Najít téma</label><input class="topic-search" id="topic-search" type="search" placeholder="Název tématu" autocomplete="off"><p id="topic-search-status" class="topic-availability" aria-live="polite"></p>${[...groups].map(([name,items])=>`<section class="course-topic-group"><h3>${esc(name)}</h3><div class="unit-list">${items.map(card).join('')}</div></section>`).join('')}</section>
    ${subjectEvents.length?`<section class="upcoming-section"><div class="section-heading"><h2>Termíny předmětu</h2></div><div class="upcoming-grid">${subjectEvents.map(event=>eventCard(event)).join('')}</div></section>`:''}`;
  const search=main.querySelector('#topic-search');search.oninput=()=>{let count=0;const query=search.value.trim().toLocaleLowerCase('cs-CZ');for(const card of main.querySelectorAll('[data-topic-search]')){card.hidden=!card.dataset.topicSearch.includes(query);if(!card.hidden)count++;}for(const group of main.querySelectorAll('.course-topic-group'))group.hidden=![...group.querySelectorAll('[data-topic-search]')].some(card=>!card.hidden);main.querySelector('#topic-search-status').textContent=query?`Nalezeno témat: ${count}`:'';};
  document.title=`${subject.name} — study lo`;
}
function renderPractice() {
  const options=[
    {unit:'skeleton',mode:'atlas',icon:'leaf',title:'Atlas lidské kostry',copy:'64 položek, detaily a obrázky.'},
    {unit:'skeleton',mode:'cards',icon:'layers',title:'Poznávačka a kartičky',copy:'Obrázkové i textové opakování.'},
    {unit:'skeleton',mode:'map',icon:'grid',title:'Slepá mapa',copy:'Najdi správnou kost na schématu.'},
    {unit:'law-unit-2',mode:'flashcards',icon:'layers',title:'Law flashcards',copy:'Cases, concepts and legal vocabulary.'},
    {unit:'law-unit-2',mode:'practice',icon:'scale',title:'Law practice',copy:'Mixed questions, feedback and explanations.'},
    {unit:'law-unit-2',mode:'vocabulary',icon:'book',title:'Legal vocabulary',copy:'55 terms with Czech translations.'},
    {unit:'trig-functions',mode:'worksheets',icon:'file',title:'Pracovní list: funkce',copy:'60 příkladů s velkým zadáním a šipkami v řešení.'},
    {unit:'trig-equations',mode:'worksheets',icon:'file',title:'Pracovní list: rovnice a nerovnice',copy:'104 příkladů k rozkliknutí, každý s postupem řešení.'},
    {unit:'trig-functions',mode:'circle',icon:'function',title:'Kružnice a grafy',copy:'Propoj úhel, hodnoty funkcí a proměny grafu.'},
    {unit:'trig-equations',mode:'solver',icon:'function',title:'Rovnice krok za krokem',copy:'Vyzkoušej postup a vyznač řešení nerovnic.'},
    {unit:'trig-functions',mode:'cards',icon:'layers',title:'Matematické kartičky',copy:'Úhly, funkce a trojúhelníkové věty.'},
    {unit:'trig-equations',mode:'quiz',icon:'check',title:'Kvíz ze vzorců a rovnic',copy:'Ověř si výsledek a přečti vysvětlení.'},
  ];
  options.push(...units.filter(unit=>unit.module==='course-notes'&&unit.questionCount>0&&unit.available!==false).map(unit=>({unit:unit.id,mode:'practice',icon:'check',title:unit.title,copy:`${unit.questionCount} otázek s vysvětlením ze schválených podkladů.`})));
  main.innerHTML=`<section class="page-intro"><div><p class="eyebrow">KROK ZA KROKEM</p><h1>Co si dnes procvičíš?</h1><p>Vyber si způsob učení, který ti právě sedí.</p></div></section><div class="practice-grid">${options.map(o=>{const s=getSubject(getUnit(o.unit).subjectId);return `<a class="practice-card" href="#/units/${o.unit}?mode=${o.mode}" style="${subjectStyle(s)}"><div class="practice-card-top"><span class="subject-icon">${icon(o.icon)}</span><span class="subject-pill">${s.name}</span></div><h2>${o.title}</h2><p>${o.copy}</p><span class="text-link">Začít procvičování ${icon('arrow')}</span></a>`;}).join('')}</div>`;
}

async function renderUnit(unit,event,params,version) {
  const s=getSubject(unit.subjectId);
  activeTab=params.get('tab')||'tools';
  const unitEvents=events.filter(e=>e.unitId===unit.id);
  document.title=`${event?event.title:unit.title} — study lo`;
  main.innerHTML=`<div class="breadcrumbs"><a href="#/">Kalendář</a><span>/</span><a href="#/subjects">Předměty</a><span>/</span><a href="#/subjects/${s.id}">${s.name}</a></div><section class="unit-hero" style="${subjectStyle(s)}"><div class="unit-subject"><span class="subject-icon">${icon(s.icon)}</span><span>${s.name}</span></div><p class="eyebrow">${unit.label==='UNIT 2'?'LAW · VÝUKOVÁ JEDNOTKA':unit.label||'STUDIJNÍ JEDNOTKA'}</p>${unit.label==='UNIT 2'?`<h1 class="law-unit-heading">UNIT 2</h1><h2 class="unit-topic">${esc(unit.title)}</h2>`:`<h1>${esc(unit.title)}</h1>`}${unit.module?`<details class="unit-about" ${matchMedia('(min-width: 901px)').matches?'open':''}><summary>O tématu</summary><p class="unit-description">${esc(unit.description)}</p></details>`:`<p class="unit-description">${esc(unit.description)}</p>`}${event?`<div class="event-banner ${event.type}">${icon('calendar')}<strong>${fullDate(event.date)}</strong><span>${eventTypes[event.type]}</span><span class="banner-title">${esc(event.title)}</span></div>`:unitEvents.length?`<div class="unit-event-links">${unitEvents.map(e=>`<a href="#/events/${e.id}">${icon('calendar')}${fullDate(e.date)} <span>· ${esc(e.title)}</span>${icon('arrow')}</a>`).join('')}</div>`:''}</section>
    <div class="unit-tabs" role="tablist" aria-label="Obsah tématu"><button role="tab" aria-label="Podklady a procvičování" data-tab="tools" id="unit-tab-tools" aria-controls="unit-panel">${icon('layers')}<span class="tab-label-long">Podklady a procvičování</span><span class="tab-label-short" aria-hidden="true">Studovat</span></button><button role="tab" aria-label="Materiály" data-tab="materials" id="unit-tab-materials" aria-controls="unit-panel">${icon('file')}<span class="tab-label-long">Materiály</span><span class="tab-label-short" aria-hidden="true">Materiály</span></button><button role="tab" aria-label="Můj postup" data-tab="progress" id="unit-tab-progress" aria-controls="unit-panel">${icon('check')}<span class="tab-label-long">Můj postup</span><span class="tab-label-short" aria-hidden="true">Postup</span></button></div><section class="unit-content" id="unit-panel" role="tabpanel" aria-labelledby="unit-tab-${activeTab}"></section>`;
  for(const b of main.querySelectorAll('[data-tab]')) b.onclick=()=>{
    const path=location.hash.split('?')[0];
    const next=new URLSearchParams(params);next.set('tab',b.dataset.tab);navigation.navigate(`${path}?${next}`);
  };
  main.querySelectorAll('[data-tab]').forEach(b=>{b.setAttribute('aria-selected',b.dataset.tab===activeTab);b.tabIndex=b.dataset.tab===activeTab?0:-1;b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const all=[...main.querySelectorAll('[data-tab]')],index=all.indexOf(b);const target=e.key==='Home'?all[0]:e.key==='End'?all.at(-1):all[(index+(e.key==='ArrowRight'?1:all.length-1))%all.length];target.click();setTimeout(()=>main.querySelector(`[data-tab="${target.dataset.tab}"]`)?.focus(),0);});});
  const related=unit.origin==='moodle'?(unit.legacyUnitIds||[]).map(getUnit).filter(Boolean):units.filter(item=>item.legacyUnitIds?.includes(unit.id));
  if(related.length){const nav=document.createElement('nav');nav.className='related-course-topics';nav.setAttribute('aria-label','Související témata');nav.innerHTML='<span>Související témata:</span>'+related.map(item=>`<a href="#/units/${item.id}">${esc(item.title)}</a>`).join('');main.querySelector('.unit-hero').append(nav);}
  const panel=main.querySelector('#unit-panel');
  if(activeTab==='materials') {
    panel.innerHTML=`<div class="panel-intro"><h2>Materiály po ruce.</h2><p>Původní studijní podklady, připravené ke čtení i stažení.</p></div>${unit.materials.length?`<div class="materials-grid">${unit.materials.map(m=>`<a class="material-card" href="${esc(m.url)}" target="_blank" rel="noopener">${icon('file')}<div><h3>${esc(m.title)}</h3><p>${esc(m.description)}</p></div><span>Otevřít ${icon('arrow')}</span></a>`).join('')}</div>`:emptyMaterials()}`;
    return;
  }
  if(unit.kind==='collection') {
    const related=(unit.relatedUnitIds||[]).map(getUnit).filter(Boolean);
    panel.innerHTML=`<div class="panel-intro"><h2>${activeTab==='progress'?'Tvůj postup v tématech':'Vyber si téma k opakování.'}</h2><p>Stručné poznámky, ovladatelné vizualizace a procvičování ze tří dodaných prezentací.</p></div><div class="unit-list">${related.map(item=>`<a class="unit-card" href="#/units/${item.id}${activeTab==='progress'?'?tab=progress':''}" style="${subjectStyle(s)}"><div><p class="eyebrow">${esc(item.label)}</p><h2>${esc(item.title)}</h2><p>${esc(item.description)}</p><span class="text-link">${activeTab==='progress'?'Zobrazit postup':'Otevřít téma'} ${icon('arrow')}</span></div><span class="unit-card-icon">${icon('function')}</span></a>`).join('')}</div>`;
    return;
  }
  if(!unit.module&&unit.origin==='moodle') {
    const related=(unit.legacyUnitIds||[]).map(getUnit).filter(Boolean);
    panel.innerHTML=`<div class="panel-intro"><h2>${unit.available===false?'Téma nyní není zpřístupněné.':unit.materials.length?'Původní podklady k tématu.':'Podklady zatím nejsou zveřejněné.'}</h2><p>${unit.available===false?'Zobrazuje se skutečná položka školního kurzu. Nové výpisky se zde nevytvářejí bez dostupných podkladů.':unit.materials.length?'Můžeš otevřít schválené původní zdroje. Redakčně ověřené výpisky a procvičování se přidávají samostatně.':'Název i pořadí odpovídají školnímu kurzu. K tomuto tématu zatím nejsou dostupné schválené zdroje ani výpisky.'}</p></div>${unit.materials.length?`<div class="materials-grid">${unit.materials.map(material=>`<a class="material-card" href="${esc(material.url)}" target="_blank" rel="noopener"><div><h3>${esc(material.title)}</h3><p>Původní schválený zdroj</p></div><span>Otevřít ${icon('arrow')}</span></a>`).join('')}</div>`:''}${related.length?`<section class="legacy-tools"><h3>Související interaktivní nástroje</h3>${related.map(item=>`<a class="button" href="#/units/${item.id}">${esc(item.title)} ${icon('arrow')}</a>`).join('')}</section>`:''}`;
    return;
  }
  if(!unit.module) {
    panel.innerHTML=unit.notes?.length?`<div class="generic-notes"><div class="panel-intro"><h2>Podklady a výpisky</h2></div>${unit.notes.map(note=>`<p>${esc(note)}</p>`).join('')}${unit.materials.length?'<p>Další podklady najdeš v záložce Materiály.</p>':''}</div>`:emptyMaterials();
    return;
  }
  panel.innerHTML='<p class="loading-copy">Připravuji tvůj studijní prostor…</p>';
  try {
    const module=await moduleLoaders[unit.module]();
    if(version!==routeVersion)return;
    if(activeTab==='progress') {
      const progress=module.getProgress(unit);
      const isBio=unit.module==='biology';
      const counts=isBio?[[progress.mastered||0,'zvládnutých položek'],[progress.total||64,'položek v atlasu'],[(progress.results||[]).length,'uložených výsledků']]:[[(progress.knownCards||[]).length,'známých kartiček'],[(progress.readLessons||[]).length,'přečtených lekcí'],[(progress.attempts||[]).length,unit.module==='course-notes'?'zodpovězených otázek':'dokončených testů']];
      panel.innerHTML=`<div class="panel-intro"><h2>Každé opakování se počítá.</h2><p>Tvůj postup v tomto tématu se ukládá automaticky v tomto prohlížeči.</p></div><div class="progress-grid">${counts.map(([n,l])=>`<div class="progress-card"><strong>${n}</strong><span>${l}</span></div>`).join('')}</div><a class="button primary" href="${location.hash.split('?')[0]}">Pokračovat v učení ${icon('arrow')}</a><p class="storage-note">Ukládání je oddělené podle předmětu. Původní uložená data zůstávají zachovaná. Na jiném zařízení či jiné doméně se postup automaticky nepřenáší.</p>`;
      return;
    }
    panel.innerHTML=`<div class="module-frame" data-study-module="${unit.module}"></div>`;
    const host=panel.firstElementChild;
    host.style.setProperty('--subject',s.color);host.style.setProperty('--tint',s.tint);
    const cleanup=await module.mount(host,{unit,mode:params.get('mode')||(isBiology(unit)?'atlas':'learn')});
    if(version!==routeVersion)cleanup?.();else cleanupModule=cleanup;
  } catch(error) {
    if(version!==routeVersion)return;
    panel.innerHTML=`<div class="empty-state"><h2>Studijní nástroje se nepodařilo načíst.</h2><p>Zkus stránku obnovit. Tvé uložené výsledky zůstávají v prohlížeči.</p><button class="button" id="retry-module">Zkusit znovu</button></div>`;
    main.querySelector('#retry-module').onclick=()=>route();
    console.error(error);
  }
}
function renderSchoolEvent(event) {
  document.title=`${event.title} — study lo`;
  main.innerHTML=`<div class="breadcrumbs"><a href="#/">Kalendář</a><span>/</span><span>Školní akce</span></div><section class="unit-hero" style="${subjectStyle(schoolEventStyle)}"><div class="unit-subject"><span class="subject-icon">${icon('calendar')}</span><span>Školní akce</span></div><p class="eyebrow">${eventTypes[event.type]}</p><h1>${esc(event.title)}</h1><p class="unit-description">${esc(event.description)}</p><div class="event-banner ${event.type}">${icon('calendar')}<strong>${fullDate(event.date)}</strong>${event.allDay?'<span>Celý den</span>':''}</div></section><a class="text-link" href="#/">Zpět do kalendáře ${icon('arrow')}</a>`;
}
const isBiology = unit => unit.module==='biology';
function emptyMaterials(){return `<div class="empty-state">${icon('book')}<h2>Materiály zatím nebyly přidány.</h2><p>Termín je připravený. Až budou k dispozici skutečné podklady, objeví se na tomto místě.</p><a class="text-link" href="#/">Zpět do kalendáře ${icon('arrow')}</a></div>`;}

async function route({scroll=0,restore=false}={}) {
  const version=++routeVersion;
  cleanupModule?.();cleanupModule=null;
  const [path,search='']=(location.hash.slice(1)||'/').split('?');
  const segments=path.split('/').filter(Boolean);
  const params=new URLSearchParams(search);
  document.title='study lo — Studuj v klidu.';
  const section=segments[0];
  const schoolEvent=section==='events'?events.find(event=>event.id===segments[1]&&!event.unitId):null;
  document.querySelectorAll('[data-nav]').forEach(a=>{const active=section!=='settings'&&a.dataset.nav===(section==='practice'?'practice':section&&!schoolEvent?'subjects':'calendar');a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  if(!section)renderCalendar();
  else if(section==='subjects'&&!segments[1])renderSubjects();
  else if(section==='practice')renderPractice();
  else if(section==='settings') {document.title='Nastavení — study lo';cleanupModule=mountSettings(main);}
  else if(section==='events'||section==='units'||section==='subjects') {
    const event=section==='events'?events.find(e=>e.id===segments[1]):null;
    const subjectUnits=section==='subjects'?units.filter(u=>u.subjectId===segments[1]):[];
    const unit=event?getUnit(event.unitId):section==='units'?getUnit(segments[1]):subjectUnits[0];
    if(section==='subjects'&&getSubject(segments[1]))renderSubject(getSubject(segments[1]));
    else if(unit)await renderUnit(unit,event,params,version);else if(schoolEvent)renderSchoolEvent(schoolEvent);else renderNotFound();
  } else renderNotFound();
  if(version===routeVersion){
    window.scrollTo({top:scroll,behavior:'instant'});
    if(!restore)main.focus({preventScroll:true});
    notifyPwaRoute();
  }
}
function renderNotFound(){main.innerHTML='<div class="empty-state"><h1>Tahle stránka tu zatím není.</h1><a class="button primary" href="#/">Zpět do kalendáře</a></div>';}
document.querySelector('.skip-link').onclick=e=>{e.preventDefault();main.focus();};
const backButton=document.querySelector('#page-back');
const forwardButton=document.querySelector('#page-forward');
const navigation=createNavigation(state=>{
  backButton.disabled=!state.back;forwardButton.disabled=!state.forward;
  backButton.title=state.backLabel?`Zpět: ${state.backLabel}`:'Zpět';
  forwardButton.title=state.forwardLabel?`Vpřed: ${state.forwardLabel}`:'Vpřed';
  document.querySelector('#page-context').textContent=routeInfo(state.hash).label;
  route(state);
});
backButton.onclick=()=>navigation.back();
forwardButton.onclick=()=>navigation.forward();
initPreferences();
navigation.start();
initPwa().catch(error=>console.info('Offline příprava zatím není dostupná.',error));
