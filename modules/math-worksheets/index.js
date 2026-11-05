import katex from './vendor/katex/katex.mjs';
import { worksheetData } from './data.js';
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
  const sections = [...new Set(items.map(item => item.section))];
  const title = titles[sourceFile] || 'Pracovní list';
  const host = document.createElement('section');
  host.lang = 'cs';
  host.className = 'worksheet-host';
  const root = host.attachShadow({mode:'open'});
  container.replaceChildren(host);
  const instanceId = ++instance;
  const sourceURL = new URL(`./assets/${sourceFile}`, import.meta.url).href;
  root.innerHTML = `<link rel="stylesheet" href="${new URL('./vendor/katex/katex.min.css', import.meta.url).href}"><link rel="stylesheet" href="${new URL('./styles.css', import.meta.url).href}">
    <header class="worksheet-heading"><div><p class="eyebrow">PRACOVNÍ LIST · ${items.length} PŘÍKLADŮ</p><h2>${esc(title)}</h2><p>Vyber příklad. Otevře se ve větším okně, kde šipkami postupně odkryješ jeho řešení.</p></div><a class="pdf-link" href="${esc(sourceURL)}" target="_blank" rel="noopener">Původní pracovní list · PDF ↗</a></header>
    <div class="worksheet-filters"><label for="worksheet-search">Najít příklad<input id="worksheet-search" type="search" placeholder="Např. GF1-12, B2 nebo substituce" autocomplete="off"></label><label for="worksheet-section">Část pracovního listu<select id="worksheet-section"><option value="">Všechny části (${items.length})</option>${sections.map(section => `<option value="${esc(section)}">${esc(section)}</option>`).join('')}</select></label></div>
    <p id="worksheet-count" class="count" role="status"></p><div id="worksheet-list"></div>
    <dialog id="worksheet-dialog" aria-labelledby="worksheet-dialog-title"><div class="dialog-shell"><header class="dialog-header"><div><p class="eyebrow" id="worksheet-dialog-meta"></p><h2 id="worksheet-dialog-title">Příklad</h2></div><button id="worksheet-close" class="close-button" type="button" aria-label="Zavřít příklad">×</button></header><div class="dialog-scroll"><div id="worksheet-prompt" class="large-math math-scroll" tabindex="0" aria-label="Zadání příkladu"></div><div id="worksheet-step" class="step-content" aria-live="polite" aria-atomic="true"></div><div id="worksheet-graph-area"></div></div><footer class="dialog-footer"><button id="worksheet-previous" type="button" aria-label="Předchozí krok"><span aria-hidden="true">←</span><span>Předchozí krok</span></button><div><p id="worksheet-counter" class="step-counter"></p><p class="keyboard-note">Klávesy ← a → · Esc zavře okno</p></div><button id="worksheet-next" class="primary" type="button" aria-label="Další krok"><span>Další krok</span><span aria-hidden="true">→</span></button></footer></div></dialog>`;
  const $ = selector => root.querySelector(selector);
  const dialog = $('#worksheet-dialog');
  let active = null;
  let index = 0;
  let opener = null;
  let disposed = false;
  let previousOverflow = null;

  function renderList() {
    const query = normalize($('#worksheet-search').value.trim());
    const section = $('#worksheet-section').value;
    const visible = items.filter(item => (!section || item.section === section) && (!query || normalize(`${item.id} ${item.source_label} ${item.section} ${item.prompt_latex} ${(item.steps || []).map(step => `${step.title} ${step.explanation}`).join(' ')}`).includes(query)));
    $('#worksheet-count').textContent = `${visible.length} z ${items.length} příkladů · ${sourceFile === 'Gonio_fce_opakovani.pdf' ? 'A/B/C označuje sloupec pracovního listu' : 'označení odpovídá původnímu listu'}`;
    $('#worksheet-list').innerHTML = visible.length ? sections.map(name => {
      const group = visible.filter(item => item.section === name);
      if (!group.length) return '';
      return `<section class="exercise-section"><h3>${esc(name)}</h3><div class="exercise-grid">${group.map(item => `<button type="button" class="exercise-button" data-exercise-id="${esc(item.id)}" aria-haspopup="dialog" aria-label="Otevřít příklad ${esc(item.source_label)}, ${esc(item.section)}"><span class="exercise-label">${esc(item.source_label)}<span class="exercise-id">${esc(item.id)}</span></span><span class="exercise-prompt math-scroll">${math(item.prompt_latex)}</span><span class="open-hint">Rozkliknout a řešit <span aria-hidden="true">↗</span></span></button>`).join('')}</div></section>`;
    }).join('') : '<div class="empty"><h3>Takový příklad tu není.</h3><p>Zkus jiné označení nebo vyber všechny části.</p></div>';
    root.querySelectorAll('button[data-exercise-id]').forEach(button => button.addEventListener('click', () => openExercise(button.dataset.exerciseId, button)));
  }

  function openExercise(id, button) {
    active = items.find(item => item.id === id);
    if (!active || disposed) return;
    index = 0;
    opener = button;
    $('#worksheet-dialog-meta').textContent = `${active.section} · ${active.id}`;
    $('#worksheet-dialog-title').textContent = `Příklad ${active.source_label}`;
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
  $('#worksheet-search').addEventListener('input',renderList);
  $('#worksheet-section').addEventListener('change',renderList);
  $('#worksheet-close').addEventListener('click',() => dialog.close());
  $('#worksheet-previous').addEventListener('click',() => move(-1));
  $('#worksheet-next').addEventListener('click',() => move(1));
  dialog.addEventListener('close',closed);
  dialog.addEventListener('keydown',keydown);
  dialog.addEventListener('click',event => { if(event.target === dialog) { const box=dialog.getBoundingClientRect(); if(event.clientX<box.left || event.clientX>box.right || event.clientY<box.top || event.clientY>box.bottom) dialog.close(); } });
  renderList();
  return () => { disposed=true; if(dialog.open)dialog.close(); closed(); host.remove(); };
}
