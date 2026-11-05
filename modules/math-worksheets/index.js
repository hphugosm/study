import katex from './vendor/katex/katex.mjs';
import { worksheetData } from './data.js';
import { worksheetLayout } from './layout.js';
import { mountWorksheetGestures } from './gestures.js';
import { graphPoles, graphSegments, transformedValue } from '../math-trig/math.js';

const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const titles = {
  'Gonio_fce_opakovani.pdf': 'Goniometrické funkce — opakování',
  'Opakovani_gonio__ne_rovnice.pdf': 'Goniometrické rovnice a nerovnice — opakování',
};
const number = value => Number(value.toFixed(3)).toLocaleString('cs-CZ', {maximumFractionDigits:3});
let instance = 0;

function math(latex, displayMode = false) {
  try {
    return katex.renderToString(String(latex ?? ''), {displayMode, throwOnError:true, strict:'error', trust:false, output:'htmlAndMathml', maxExpand:1000});
  } catch {
    return `<span class="math-error">${esc(latex)}</span>`;
  }
}

/** Shared worksheet view. Each exercise opens its own accessible step-by-step dialog. */
export function mountWorksheets(container, {sourceFile} = {}) {
  const items = worksheetData.exercises.filter(item => item.source_file === sourceFile);
  const pages = worksheetLayout.pages.filter(page => page.source_file === sourceFile);
  const positions = new Map(worksheetLayout.exercises.map(position => [position.id,position]));
  const sections = pages.flatMap(page => (page.sections || []).map(section => ({...section,page})));
  const sectionFor = item => sections.find(section => section.key === item.section);
  const plainMath = value => {
    let text = String(value ?? '');
    const slash = String.fromCharCode(92);
    for (const command of ['left','right','qquad','quad','circ',',','!']) text = text.split(slash+command).join('');
    text = text.split(slash+'pi').join('π').split(slash).join('').replace(/[{}]/g,' ');
    return text.split(' ').filter(Boolean).join(' ').trim();
  };
  const searchKey = value => normalize(plainMath(value)).replace(/[^a-z0-9π]/g,'');
  const title = titles[sourceFile] || 'Pracovní list';
  const host = document.createElement('section');
  host.lang = 'cs';
  host.className = 'worksheet-host';
  host.style.visibility = 'hidden';
  const root = host.attachShadow({mode:'open'});
  container.replaceChildren(host);
  const instanceId = ++instance;
  const sourceURL = new URL(`./assets/${sourceFile}`, import.meta.url).href;
  root.innerHTML = `<link rel="stylesheet" href="${new URL('./vendor/katex/katex.min.css', import.meta.url).href}"><link rel="stylesheet" data-reader-style href="${new URL('./styles.css', import.meta.url).href}">
    <header class="worksheet-heading"><div><h2>${esc(title)}</h2><p>Klikni na příklad přímo v pracovním listu. Větší okno nabídne řešení po jednotlivých krocích.</p></div><a class="pdf-link" href="${esc(sourceURL)}" target="_blank" rel="noopener">Otevřít původní PDF ↗</a></header>
    <div class="worksheet-filters"><label for="worksheet-search">Najít v pracovním listu<input id="worksheet-search" type="search" placeholder="Např. sin 105° nebo příklad 37" autocomplete="off"></label><label for="worksheet-section">Přejít na zadání<select id="worksheet-section"><option value="">Všechna zadání</option>${sections.map(section => `<option value="${esc(section.key)}">${esc(section.title)}</option>`).join('')}</select></label></div>
    <div class="reader-toolbar"><p id="worksheet-count" class="count" role="status"></p><div class="zoom-controls" role="group" aria-label="Velikost pracovního listu"><button id="worksheet-zoom-out" type="button" aria-label="Zmenšit pracovní list">−</button><output id="worksheet-zoom-value" aria-label="Zvětšení listu">100 %</output><button id="worksheet-zoom-in" type="button" aria-label="Zvětšit pracovní list">+</button><button id="worksheet-fit" type="button" aria-pressed="false">Přizpůsobit šířce</button></div></div>
    <div id="worksheet-viewport" class="worksheet-viewport" data-fit="false" tabindex="0" aria-label="Pracovní list v původním rozložení. Při zvětšení lze posouvat do stran."><div id="worksheet-list" class="worksheet-pages"></div></div><p class="reader-help">Dvěma prsty zvětši detail, jedním prstem list posuň. Klepnutím na příklad otevřeš jeho řešení.</p>
    <dialog id="worksheet-dialog" aria-labelledby="worksheet-dialog-title"><div class="dialog-shell"><header class="dialog-header"><div><p class="eyebrow" id="worksheet-dialog-meta"></p><h2 id="worksheet-dialog-title">Příklad</h2></div><button id="worksheet-close" class="close-button" type="button" aria-label="Zavřít příklad">×</button></header><div class="dialog-scroll"><div id="worksheet-prompt" class="large-math math-scroll" tabindex="0" aria-label="Zadání příkladu"></div><div id="worksheet-step" class="step-content" aria-live="polite" aria-atomic="true"></div><div id="worksheet-graph-area"></div></div><footer class="dialog-footer"><button id="worksheet-previous" type="button" aria-label="Předchozí krok"><span aria-hidden="true">←</span><span>Předchozí krok</span></button><div><p id="worksheet-counter" class="step-counter"></p><p class="keyboard-note">Klávesy ← a → · Esc zavře okno</p></div><button id="worksheet-next" class="primary" type="button" aria-label="Další krok"><span>Další krok</span><span aria-hidden="true">→</span></button></footer></div></dialog>`;
  const $ = selector => root.querySelector(selector);
  const dialog = $('#worksheet-dialog');
  let active = null;
  let index = 0;
  let opener = null;
  let disposed = false;
  let previousOverflow = null;
  let zoom = 1;
  let fit = false;
  const viewport = $('#worksheet-viewport');
  let gestures = null;
  let layoutSize = {width:0,height:0};
  let readerSnapshot = null;
  let resizedDuringDialog = false;
  let restoreFrame = 0;
  let initialFrame = 0;
  let layoutReady = false;
  viewport.dataset.ready = 'false';
  const availableWidth = () => Math.max(1,viewport.clientWidth-32);
  const baseWidth = () => Math.max(720,availableWidth());
  const minimumZoom = () => availableWidth()/baseWidth();
  const centerPoint = () => {const box=viewport.getBoundingClientRect();return {x:box.left+viewport.clientLeft+viewport.clientWidth/2,y:box.top+viewport.clientTop+viewport.clientHeight/2};};

  function renderPages() {
    $('#worksheet-list').innerHTML = pages.map(page => {
      const pageItems = items.filter(item => positions.get(item.id)?.page_index === page.page_index);
      const imageURL = new URL(page.image, import.meta.url).href;
      return `<figure class="worksheet-sheet"><figcaption>Strana ${page.page_index+1}</figcaption><div class="worksheet-page" data-source-page="${page.page_index+1}" style="aspect-ratio:${page.width}/${page.height}"><img class="worksheet-page-image" src="${esc(imageURL)}" alt="${esc(page.title || title)} — původní strana ${page.page_index+1}" width="${page.width}" height="${page.height}" draggable="false"><div class="worksheet-hotspots">${(page.sections || []).map((section,sectionIndex) => {
        const headingId = `worksheet-section-${instanceId}-${page.page_index}-${sectionIndex}`;
        return `<section class="worksheet-source-section" data-section="${esc(section.key)}" aria-labelledby="${headingId}"><h3 class="worksheet-section-heading visually-hidden" id="${headingId}">${esc(section.title)}</h3>${pageItems.filter(item => item.section === section.key).map(item => {
          const position = positions.get(item.id);
          const [left,top,right,bottom] = position.bbox;
          return `<button type="button" class="exercise-button" data-exercise-id="${esc(item.id)}" data-section-key="${esc(section.key)}" data-highlight="false" aria-haspopup="dialog" aria-label="${esc(section.title)} — ${esc(item.source_label)}: ${esc(position.source_text || plainMath(item.prompt_latex))}" style="left:${100*left/page.width}%;top:${100*top/page.height}%;width:${100*(right-left)/page.width}%;height:${100*(bottom-top)/page.height}%"><span class="visually-hidden">${esc(position.source_text || `${item.source_label} ${plainMath(item.prompt_latex)}`)}</span></button>`;
        }).join('')}</section>`;
      }).join('')}</div></div></figure>`;
    }).join('');
    root.querySelectorAll('button[data-exercise-id]').forEach(button => button.addEventListener('click', () => openExercise(button.dataset.exerciseId, button)));
    applyDimensions();
    updateHighlights();
  }

  function updateHighlights() {
    const query = searchKey($('#worksheet-search').value.trim());
    const sectionKey = $('#worksheet-section').value;
    const filtering = Boolean(query || sectionKey);
    let matches = 0;
    for (const item of items) {
      const section = sectionFor(item);
      const haystack = searchKey(`${item.id} příklad ${item.source_label} ${section?.title || item.section} ${positions.get(item.id)?.source_text || ''} ${item.prompt_latex}`);
      const match = (!sectionKey || item.section === sectionKey) && (!query || haystack.includes(query));
      if (match) matches++;
      const button = root.querySelector(`button[data-exercise-id="${item.id}"]`);
      if (button) {
        button.dataset.highlight = String(filtering && match);
        button.classList.toggle('is-highlighted',filtering && match);
      }
    }
    $('#worksheet-count').textContent = filtering ? `Nalezeno ${matches} z ${items.length} příkladů` : `${items.length} příkladů · kliknutím otevřeš řešení`;
  }

  function captureAnchor(point = centerPoint()) {
    const paper = [...root.querySelectorAll('.worksheet-page')].map(node => ({node,box:node.getBoundingClientRect()})).sort((a,b) => Math.max(a.box.top-point.y,point.y-a.box.bottom,0)-Math.max(b.box.top-point.y,point.y-b.box.bottom,0))[0];
    return paper ? {node:paper.node,x:(point.x-paper.box.left)/paper.box.width,y:(point.y-paper.box.top)/paper.box.height} : null;
  }
  function restoreAnchor(anchor,point = centerPoint()) {
    if(!anchor?.node.isConnected)return;
    const box=anchor.node.getBoundingClientRect();
    viewport.scrollLeft+=box.left+anchor.x*box.width-point.x;
    viewport.scrollTop+=box.top+anchor.y*box.height-point.y;
  }
  function applyDimensions() {
    zoom=Math.max(minimumZoom(),Math.min(4,zoom));
    const width=baseWidth()*zoom;
    root.querySelectorAll('.worksheet-sheet').forEach(sheet => sheet.style.width=`${width}px`);
    fit=Math.abs(width-availableWidth())<1;
    viewport.dataset.fit=String(fit);
    viewport.dataset.scale=zoom.toFixed(4);
    viewport.dataset.zoom=String(Math.round(zoom*100));
    viewport.dataset.pageWidth=width.toFixed(2);
    $('#worksheet-fit').setAttribute('aria-pressed',String(fit));
    $('#worksheet-fit').textContent=fit?'Čitelná velikost':'Přizpůsobit šířce';
    $('#worksheet-zoom-value').textContent=`${Math.round(zoom*100)} %`;
    $('#worksheet-zoom-out').disabled=zoom<=minimumZoom()+.0001;
    $('#worksheet-zoom-in').disabled=zoom>=4;
    layoutSize={width:viewport.clientWidth,height:viewport.clientHeight};
  }
  function zoomAt(next,from=centerPoint(),to=null) {
    const anchor=captureAnchor(from);
    zoom=next;
    applyDimensions();
    restoreAnchor(anchor,to || centerPoint());
  }
  function resized() {
    if(disposed || !layoutReady || !root.querySelector('.worksheet-page'))return;
    if(Math.abs(layoutSize.width-viewport.clientWidth)<1 && Math.abs(layoutSize.height-viewport.clientHeight)<1)return;
    gestures?.cancelMotion();
    const box=viewport.getBoundingClientRect();
    const oldCenter={x:box.left+viewport.clientLeft+(layoutSize.width || viewport.clientWidth)/2,y:box.top+viewport.clientTop+(layoutSize.height || viewport.clientHeight)/2};
    const anchor=captureAnchor(oldCenter);
    if(fit)zoom=minimumZoom();
    applyDimensions();
    restoreAnchor(anchor,centerPoint());
    if(dialog.open && readerSnapshot){readerSnapshot={left:viewport.scrollLeft,top:viewport.scrollTop,zoom};resizedDuringDialog=true;}
  }
  function tapped({x,y,target}) {
    if(disposed || dialog.open)return;
    let button=target?.closest?.('button[data-exercise-id]');
    if(!button || !viewport.contains(button)) {
      const candidates=[...root.querySelectorAll('button[data-exercise-id]')].map(node => {const box=node.getBoundingClientRect();return {node,distance:Math.hypot(Math.max(box.left-x,x-box.right,0),Math.max(box.top-y,y-box.bottom,0))};}).filter(item=>item.distance<=10).sort((a,b)=>a.distance-b.distance);
      // Do not guess between neighbouring printed exercises at a shared gap.
      if(candidates[0] && (!candidates[1] || candidates[1].distance-candidates[0].distance>=3))button=candidates[0].node;
    }
    if(button)openExercise(button.dataset.exerciseId,button);
  }

  function jumpToSection() {
    gestures?.cancelMotion();
    updateHighlights();
    const selected = sections.find(section => section.key === $('#worksheet-section').value);
    if (!selected) return;
    const page = root.querySelector(`.worksheet-page[data-source-page="${selected.page.page_index+1}"]`);
    if (!page) return;
    const pageRect = page.getBoundingClientRect();
    const viewRect = viewport.getBoundingClientRect();
    const [left,top] = selected.bbox;
    viewport.scrollTo({left:Math.max(0,viewport.scrollLeft+pageRect.left-viewRect.left+left/selected.page.width*pageRect.width-16),top:Math.max(0,viewport.scrollTop+pageRect.top-viewRect.top+top/selected.page.height*pageRect.height-16),behavior:'smooth'});
  }

  function openExercise(id, button) {
    active = items.find(item => item.id === id);
    if (!active || disposed) return;
    gestures?.cancelMotion();
    if(restoreFrame){cancelAnimationFrame(restoreFrame);restoreFrame=0;}
    readerSnapshot={left:viewport.scrollLeft,top:viewport.scrollTop,zoom};
    resizedDuringDialog=false;
    index = 0;
    opener = button;
    $('#worksheet-dialog-meta').textContent = sectionFor(active)?.title || active.section;
    $('#worksheet-dialog-title').textContent = `Příklad ${active.source_label}${/^[a-z]$/.test(active.source_label)?')':''}`;
    $('#worksheet-prompt').innerHTML = math(active.prompt_latex, true);
    renderStep();
    previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    dialog.showModal();
    $('#worksheet-close').focus({preventScroll:true});
  }

  function renderStep() {
    if (!active) return;
    const steps = active.steps || [];
    const finalIndex = steps.length + 1;
    const panel = $('#worksheet-step');
    panel.dataset.stepIndex = String(index);
    panel.dataset.exerciseId = active.id;
    const graphArea = $('#worksheet-graph-area');
    graphArea.replaceChildren();
    if (index === 0) {
      panel.innerHTML = '<p class="eyebrow">ZADÁNÍ</p><h3>Nejdřív to zkus samostatně.</h3><p>Až budeš připravený, stiskni šipku doprava. Řešení se odkryje po jednotlivých krocích.</p>';
    } else if (index === finalIndex) {
      panel.innerHTML = `<p class="eyebrow">ÚPLNÉ ŘEŠENÍ</p><h3>Výsledek</h3><div class="answer math-scroll" tabindex="0" aria-label="Výsledek příkladu">${math(active.answer_latex, true)}</div>${active.correction_note?`<p class="correction-note">${esc(active.correction_note)}</p>`:''}<p class="solution-note">${active.id.startsWith('GR1-') ? 'Přesná hodnota bez zaokrouhlení.' : active.id.startsWith('GF') ? 'Zkontroluj periodu a příslušné vlastnosti funkce.' : 'U periodických řešení prochází k všechna celá čísla. Dodrž také definiční podmínky uvedené v postupu.'}</p>`;
      if (active.visualization?.type === 'function_graph') renderGraph(active.visualization);
    } else {
      const step = steps[index - 1];
      panel.innerHTML = `<p class="eyebrow">KROK ${index} Z ${steps.length}</p><h3>${esc(step.title)}</h3><p>${esc(step.explanation)}</p>${step.latex ? `<div class="step-formula math-scroll" tabindex="0" aria-label="Výpočet v tomto kroku">${math(step.latex, true)}</div>` : ''}`;
    }
    $('#worksheet-counter').textContent = `${index + 1} / ${finalIndex + 1} · ${index === 0 ? 'Zadání' : index === finalIndex ? 'Výsledek' : `Krok ${index}`}`;
    $('#worksheet-previous').disabled = index === 0;
    $('#worksheet-next').disabled = index === finalIndex;
    const scroll = root.querySelector('.dialog-scroll');
    if (scroll) scroll.scrollTop = 0;
  }

  function renderGraph(visualization) {
    const {function:fn, a,b,phase_radians:phase,d,period} = visualization;
    if (![a,b,phase,d,period].every(Number.isFinite) || b === 0 || period <= 0) return;
    const c = -phase/b;
    const min = c - period * .25;
    const max = c + period * 1.25;
    const amplitude = Math.max(1, Math.abs(a));
    const yMin = d - amplitude * (['tan','cot'].includes(fn) ? 4 : 1.5);
    const yMax = d + amplitude * (['tan','cot'].includes(fn) ? 4 : 1.5);
    const plot = {left:48,right:676,top:22,bottom:255};
    const sx = x => plot.left + (x-min)/(max-min)*(plot.right-plot.left);
    const sy = y => plot.bottom - (y-yMin)/(yMax-yMin)*(plot.bottom-plot.top);
    const clipId = `worksheet-clip-${instanceId}`;
    const line = points => points.map(([x,y],i) => `${i?'L':'M'}${sx(x).toFixed(2)},${sy(y).toFixed(2)}`).join('');
    const curves = graphSegments(fn,a,b,c,d,min,max,900).map(points => `<path class="graph-curve" d="${line(points)}"/>`).join('');
    const poles = graphPoles(fn,b,c,min,max).map(x => `<line class="asymptote" x1="${sx(x)}" y1="${plot.top}" x2="${sx(x)}" y2="${plot.bottom}"/>`).join('');
    const points = (visualization.points || []).filter(point => Number.isFinite(point.x) && Number.isFinite(point.y) && point.x>=min && point.x<=max && point.y>=yMin && point.y<=yMax).map(point => `<circle class="key-point" cx="${sx(point.x)}" cy="${sy(point.y)}" r="4"/>`).join('');
    const ticks = [0,.25,.5,.75,1].map(part => { const x=c+part*period; return `<line class="grid-line" x1="${sx(x)}" x2="${sx(x)}" y1="${plot.top}" y2="${plot.bottom}"/><text x="${sx(x)}" y="280" text-anchor="middle">${number(x)}</text>`; }).join('');
    $('#worksheet-graph-area').innerHTML = `<section class="graph-panel"><h3>Vyzkoušej si výsledný graf</h3><p class="graph-note">Osa x je v radiánech. Tečky označují klíčové body; přerušované čáry jsou asymptoty.</p><svg id="worksheet-graph" viewBox="0 0 710 300" role="img" aria-label="Graf funkce ze zadání, s přerušením v nedefinovaných bodech"><defs><clipPath id="${clipId}"><rect x="${plot.left}" y="${plot.top}" width="${plot.right-plot.left}" height="${plot.bottom-plot.top}"/></clipPath></defs>${ticks}<line class="axis" x1="${plot.left}" x2="${plot.right}" y1="${sy(Math.max(yMin,Math.min(yMax,0)))}" y2="${sy(Math.max(yMin,Math.min(yMax,0)))}"/><text x="17" y="${plot.top+4}">${number(yMax)}</text><text x="17" y="${plot.bottom}">${number(yMin)}</text><text x="686" y="280">x</text><g clip-path="url(#${clipId})">${poles}${curves}${points}<circle id="worksheet-graph-point" r="6" class="sample-point"/></g></svg><label class="graph-control" for="worksheet-graph-slider">Bod na grafu<input id="worksheet-graph-slider" type="range" min="0" max="1000" step="1" value="500"></label><p id="worksheet-graph-readout" class="graph-readout" role="status"></p></section>`;
    function updatePoint() {
      const x = min+(max-min)*Number($('#worksheet-graph-slider').value)/1000;
      const y = transformedValue(fn,x,a,b,c,d);
      const point = $('#worksheet-graph-point');
      const inView = y !== null && Number.isFinite(y) && y>=yMin && y<=yMax;
      point.style.display = inView ? '' : 'none';
      if (inView) { point.setAttribute('cx',sx(x)); point.setAttribute('cy',sy(y)); }
      $('#worksheet-graph-readout').textContent = `x ≈ ${number(x)} rad · ${y === null ? 'Funkce zde není definovaná.' : `y ≈ ${number(y)}${inView?'':' (mimo výřez grafu)'}`}`;
    }
    $('#worksheet-graph-slider').addEventListener('input', updatePoint);
    updatePoint();
  }

  function move(direction) {
    if (!active || !dialog.open) return;
    const next = Math.max(0, Math.min(active.steps.length+1, index+direction));
    if (next === index) return;
    index = next;
    renderStep();
  }
  function closed() {
    if (previousOverflow !== null) document.documentElement.style.overflow = previousOverflow;
    previousOverflow = null;
    if (!disposed && opener?.isConnected) opener.focus({preventScroll:true});
    const restore=()=>{
      if(disposed || !readerSnapshot)return;
      viewport.scrollLeft=readerSnapshot.left;viewport.scrollTop=readerSnapshot.top;
      if(resizedDuringDialog && opener?.isConnected){
        const margin=6;
        const header=document.querySelector('.site-header')?.getBoundingClientRect();
        const nav=document.querySelector('.main-nav');
        const navBox=nav?.getBoundingClientRect();
        const bottomNav=nav && getComputedStyle(nav).position==='fixed'?Math.max(0,innerHeight-navBox.top):0;
        const toolbarHeight=root.querySelector('.reader-toolbar').getBoundingClientRect().height;
        const safeTop=Math.max(0,header?.bottom || 0)+toolbarHeight+margin;
        const safeBottom=Math.max(safeTop+40,innerHeight-bottomNav-margin);
        const before=viewport.getBoundingClientRect();
        const wantedTop=Math.max(safeTop,Math.min(before.top,safeBottom-before.height));
        const outerDelta=before.top-wantedTop;
        if(Math.abs(outerDelta)>1)window.scrollBy({top:outerDelta,left:0,behavior:'instant'});
        const box=opener.getBoundingClientRect(),frame=viewport.getBoundingClientRect();
        const left=frame.left+viewport.clientLeft+margin,top=Math.max(frame.top+viewport.clientTop+margin,safeTop);
        const right=left+viewport.clientWidth-2*margin,bottom=Math.min(frame.top+viewport.clientTop+viewport.clientHeight-margin,safeBottom);
        const nearest=(start,end,min,max)=>{
          if(start>=min && end<=max)return 0;
          if(start<min && end>max)return 0;
          if(end-start<=max-min)return start<min?start-min:end-max;
          return start>min?start-min:end-max;
        };
        viewport.scrollLeft+=nearest(box.left,box.right,left,right);
        viewport.scrollTop+=nearest(box.top,box.bottom,top,bottom);
      }
    };
    restore();
    if(!disposed){if(restoreFrame)cancelAnimationFrame(restoreFrame);restoreFrame=requestAnimationFrame(()=>{restoreFrame=0;restore();resizedDuringDialog=false;});}
  }
  const keydown = event => {
    if (!dialog.open || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.target.closest?.('input,select,textarea,[contenteditable="true"]')) return;
    const formula = event.target.closest?.('.math-scroll');
    if (formula && formula.scrollWidth > formula.clientWidth + 1) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    }
  };
  $('#worksheet-search').addEventListener('input',updateHighlights);
  $('#worksheet-search').addEventListener('keydown',event => { if(event.key==='Enter')root.querySelector('button[data-highlight="true"]')?.scrollIntoView({block:'nearest',inline:'nearest',behavior:'smooth'}); });
  $('#worksheet-section').addEventListener('change',jumpToSection);
  $('#worksheet-zoom-in').addEventListener('click',() => {gestures?.cancelMotion();zoomAt(Math.min(4,zoom*1.25));});
  $('#worksheet-zoom-out').addEventListener('click',() => {gestures?.cancelMotion();zoomAt(Math.max(minimumZoom(),zoom/1.25));});
  $('#worksheet-fit').addEventListener('click',() => {gestures?.cancelMotion();zoomAt(fit?1:minimumZoom());});
  const resizeObserver = new ResizeObserver(resized);
  resizeObserver.observe(viewport);
  $('#worksheet-close').addEventListener('click',() => dialog.close());
  $('#worksheet-previous').addEventListener('click',() => move(-1));
  $('#worksheet-next').addEventListener('click',() => move(1));
  dialog.addEventListener('close',closed);
  dialog.addEventListener('keydown',keydown);
  dialog.addEventListener('click',event => { if(event.target === dialog) { const box=dialog.getBoundingClientRect(); if(event.clientX<box.left || event.clientX>box.right || event.clientY<box.top || event.clientY>box.bottom) dialog.close(); } });
  renderPages();
  gestures=mountWorksheetGestures(viewport,{onTransform:({factor,from,to})=>zoomAt(zoom*factor,from,to),onTap:tapped});
  const readerStyle=root.querySelector('link[data-reader-style]');
  function initialLayout() {
    if(disposed || layoutReady || initialFrame)return;
    // Never anchor the initial unstyled full-height stack when the stylesheet bounds the reader.
    applyDimensions();
    initialFrame=requestAnimationFrame(()=>{
      initialFrame=0;
      if(disposed)return;
      applyDimensions();
      viewport.scrollLeft=0;viewport.scrollTop=0;
      layoutReady=true;viewport.dataset.ready='true';host.style.visibility='';
    });
  }
  function styleFailed() {
    if(disposed)return;
    host.style.visibility='';viewport.dataset.ready='error';
    $('#worksheet-count').textContent='Pracovní list se nepodařilo připravit. Obnov stránku nebo otevři původní PDF.';
  }
  readerStyle.addEventListener('load',initialLayout,{once:true});
  readerStyle.addEventListener('error',styleFailed,{once:true});
  if(readerStyle.sheet)initialLayout();
  return () => { disposed=true; resizedDuringDialog=false; resizeObserver.disconnect(); gestures.dispose();readerStyle.removeEventListener('load',initialLayout);readerStyle.removeEventListener('error',styleFailed);if(initialFrame)cancelAnimationFrame(initialFrame);if(restoreFrame)cancelAnimationFrame(restoreFrame); if(dialog.open)dialog.close(); closed(); host.remove(); };
}
