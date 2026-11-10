import {mountStereometry,normalizeStereometryOptions} from './stereometry.js';
import {mountPixels,normalizePixelsOptions,validatePixelSources} from './pixels.js';
/** Source-backed, local-only teaching controls. No HTML injection or network access. */
const INDEX_MIN = 0.1;
const INDEX_MAX = 5;
const MAX_ANGLE = 89.9;
const DEG = Math.PI / 180;
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const fail = message => { throw new TypeError(message); };
const finite = (value, min, max, name) => {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max) fail(name);
  return value;
};

/** Angles are measured from the normal. This model predicts directions, not intensities. */
export function evaluateRefraction({n1, n2, incidence} = {}) {
  finite(n1, INDEX_MIN, INDEX_MAX, 'Index n₁ musí být číslo od 0,1 do 5.');
  finite(n2, INDEX_MIN, INDEX_MAX, 'Index n₂ musí být číslo od 0,1 do 5.');
  finite(incidence, 0, MAX_ANGLE, 'Úhel dopadu musí být od 0° do 89,9°.');
  const snellArgument = n1 / n2 * Math.sin(incidence * DEG);
  const criticalAngle = n1 > n2 ? Math.asin(n2 / n1) / DEG : null;
  // A tiny tolerance covers floating-point roundoff exactly at the critical angle.
  const totalInternalReflection = n1 > n2 && snellArgument > 1 + 1e-12;
  const refractedAngle = totalInternalReflection ? null : Math.asin(Math.min(1, Math.max(-1, snellArgument))) / DEG;
  return {n1, n2, incidence, snellArgument, refractedAngle, criticalAngle, totalInternalReflection};
}

/** The returned check bit is appended to the supplied data bits. */
export function evaluateParity(bits, parity = 'even') {
  if (typeof bits !== 'string' || !/^[01]{1,64}$/.test(bits)) fail('Zadej 1 až 64 bitů, pouze znaky 0 a 1.');
  if (parity !== 'even' && parity !== 'odd') fail('Parita musí být even nebo odd.');
  const ones = [...bits].reduce((count, bit) => count + Number(bit), 0);
  const parityBit = parity === 'even' ? ones % 2 : 1 - ones % 2;
  return {bits, parity, ones, parityBit, encoded: bits + parityBit, totalOnes: ones + parityBit};
}

export function validateInteraction(descriptor) {
  if (!record(descriptor) || !['refraction', 'parity', 'stereometry', 'pixels'].includes(descriptor.kind)) fail('Neznámá interaktivní ukázka.');
  if (typeof descriptor.title !== 'string' || !descriptor.title.trim() || descriptor.title.length > 200 || /[<>\u0000]/.test(descriptor.title)) fail('Neplatný název interaktivní ukázky.');
  if (descriptor.defaults !== undefined && !record(descriptor.defaults)) fail('Neplatné výchozí hodnoty.');
  if (descriptor.kind === 'stereometry') return {...descriptor, defaults: normalizeStereometryOptions(descriptor.defaults)};
  if (descriptor.kind === 'pixels') {validatePixelSources(descriptor.source_refs);return {...descriptor, defaults: normalizePixelsOptions(descriptor.defaults)};}
  const defaults = descriptor.defaults || {};
  const allowed = descriptor.kind === 'refraction' ? ['n1', 'n2', 'incidence'] : ['bits', 'parity'];
  if (Object.keys(defaults).some(key => !allowed.includes(key))) fail('Neznámá výchozí hodnota.');
  const normalized = descriptor.kind === 'refraction'
    ? {n1: 1, n2: 1.5, incidence: 40, ...defaults}
    : {bits: '10110010', parity: 'even', ...defaults};
  if (descriptor.kind === 'refraction') evaluateRefraction(normalized);
  else evaluateParity(normalized.bits, normalized.parity);
  return {...descriptor, defaults: normalized};
}

const formatted = value => Number(value.toFixed(4)).toLocaleString('cs-CZ', {maximumFractionDigits: 4});
let widgetCount = 0;

export function mountInteraction(container, descriptor) {
  const config = validateInteraction(descriptor);
  if (config.kind === 'stereometry') return mountStereometry(container,config.defaults);
  if (config.kind === 'pixels') return mountPixels(container,config.defaults);
  if (!container?.ownerDocument || typeof container.append !== 'function') fail('Chybí místo pro interaktivní ukázku.');
  const doc = container.ownerDocument;
  const root = doc.createElement('div');
  root.className = 'interaction-widget';
  root.setAttribute('role', 'group');
  root.setAttribute('aria-label', config.title);
  container.append(root);
  const listeners = [];
  const on = (target, event, handler) => {target.addEventListener(event, handler); listeners.push(() => target.removeEventListener(event, handler));};
  const el = (tag, text, className) => {
    const node = doc.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const id = `course-interaction-${++widgetCount}`;
  const status = el('output');
  status.setAttribute('aria-live', 'polite');
  status.setAttribute('aria-atomic', 'true');
  status.style.display = 'block';

  if (config.kind === 'refraction') {
    const state = {...config.defaults};
    const fields = {};
    const controls = el('div');
    const svg = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 480 360');
    svg.setAttribute('role', 'img');
    const svgNode = (tag, attrs, text) => {
      const node = doc.createElementNS('http://www.w3.org/2000/svg', tag);
      for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, String(value));
      if (text !== undefined) node.textContent = text;
      return node;
    };
    const ray = (x1, y1, x2, y2, color) => {
      const line = svgNode('line', {x1, y1, x2, y2, stroke: color, 'stroke-width': 4});
      const angle = Math.atan2(y2-y1, x2-x1), ax=x1+(x2-x1)*0.7, ay=y1+(y2-y1)*0.7;
      const arrow = svgNode('polygon', {points: `${ax},${ay} ${ax-13*Math.cos(angle-.45)},${ay-13*Math.sin(angle-.45)} ${ax-13*Math.cos(angle+.45)},${ay-13*Math.sin(angle+.45)}`, fill: color});
      svg.append(line, arrow);
    };
    const draw = result => {
      svg.replaceChildren();
      svg.append(svgNode('rect', {x: 0, y: 0, width: 480, height: 180, fill: '#f0f5fb'}),
        svgNode('rect', {x: 0, y: 180, width: 480, height: 180, fill: '#edf5eb'}),
        svgNode('line', {x1: 0, y1: 180, x2: 480, y2: 180, stroke: '#58705c', 'stroke-width': 2}),
        svgNode('line', {x1: 240, y1: 30, x2: 240, y2: 330, stroke: '#7c877e', 'stroke-dasharray': '6 5'}),
        svgNode('text', {x: 12, y: 25, fill: '#263c50', 'font-size': 16}, `n₁ = ${formatted(result.n1)}`),
        svgNode('text', {x: 12, y: 343, fill: '#304b36', 'font-size': 16}, `n₂ = ${formatted(result.n2)}`),
        svgNode('text', {x: 250, y: 44, fill: '#56635a', 'font-size': 13}, 'kolmice'));
      const incidence = result.incidence * DEG;
      ray(240-145*Math.sin(incidence), 180-145*Math.cos(incidence), 240, 180, '#386ca0');
      svg.append(svgNode('text', {x: 90, y: 65, fill: '#285683', 'font-size': 15}, `α = ${formatted(result.incidence)}°`));
      if (result.totalInternalReflection) {
        ray(240, 180, 240+145*Math.sin(incidence), 180-145*Math.cos(incidence), '#a76b24');
        svg.append(svgNode('text', {x: 270, y: 155, fill: '#85521c', 'font-size': 14}, 'úplný odraz'));
        svg.setAttribute('aria-label', `Úplný odraz při úhlu dopadu ${formatted(result.incidence)} stupňů. Lomený paprsek nevzniká.`);
      } else {
        const beta = result.refractedAngle * DEG;
        ray(240, 180, 240+145*Math.sin(beta), 180+145*Math.cos(beta), '#477b4b');
        svg.append(svgNode('text', {x: 275, y: 300, fill: '#315e35', 'font-size': 15}, `β = ${formatted(result.refractedAngle)}°`));
        svg.setAttribute('aria-label', `Úhel dopadu ${formatted(result.incidence)} stupňů a úhel lomu ${formatted(result.refractedAngle)} stupňů, měřené od kolmice.`);
      }
    };
    const update = () => {
      try {
        const values = {};
        for (const name of ['n1', 'n2', 'incidence']) {
          const raw = fields[name].number.value.trim();
          if (!raw) fail('Vyplň všechny tři číselné hodnoty.');
          values[name] = Number(raw);
        }
        const result = evaluateRefraction(values);
        Object.assign(state, values);
        for (const name of Object.keys(fields)) fields[name].range.value = String(values[name]);
        const formula = `sin β = (n₁/n₂) · sin α = ${formatted(result.snellArgument)}.`;
        status.textContent = result.totalInternalReflection
          ? `${formula} Hodnota je větší než 1. Nastává úplný odraz; reálný úhel lomu neexistuje. Mezní úhel αₘ = ${formatted(result.criticalAngle)}°.`
          : `${formula} Úhel lomu β = ${formatted(result.refractedAngle)}°.${result.criticalAngle === null ? ' Pro tento směr přechodu nenastává úplný odraz.' : ` Mezní úhel αₘ = ${formatted(result.criticalAngle)}°.`}`;
        status.className = '';
        svg.style.display = '';
        draw(result);
      } catch (error) {
        status.textContent = error.message;
        status.className = 'warning';
        svg.style.display = 'none';
      }
    };
    for (const [name, label, min, max, step] of [
      ['n1', 'Index prvního prostředí n₁', INDEX_MIN, INDEX_MAX, .01],
      ['n2', 'Index druhého prostředí n₂', INDEX_MIN, INDEX_MAX, .01],
      ['incidence', 'Úhel dopadu α od kolmice (°)', 0, MAX_ANGLE, .1]
    ]) {
      const group = el('div');
      const labelEl = el('label', label);
      const number = el('input'), range = el('input');
      number.type = 'number'; number.id = `${id}-${name}`; number.min = String(min); number.max = String(max); number.step = String(step); number.value = String(state[name]);
      number.inputMode = 'decimal'; labelEl.htmlFor = number.id;
      range.type = 'range'; range.min = String(min); range.max = String(max); range.step = String(step); range.value = String(state[name]);
      range.setAttribute('aria-label', `${label}, posuvník`);
      fields[name] = {number, range};
      on(number, 'input', update);
      on(range, 'input', () => {number.value = range.value; update();});
      group.append(labelEl, number, range); controls.append(group);
    }
    root.append(el('p', 'Měň indexy a úhel dopadu. Všechny úhly se měří od kolmice k rozhraní.'), controls, status, svg,
      el('p', 'Rozsah této pomůcky: indexy 0,1–5 a dopad 0–89,9°. Jednoduchý izotropní model ukazuje směry paprsků; nepočítá intenzity ani Fresnelovy koeficienty. Chybějící kresba částečně odraženého paprsku neznamená, že odraz obecně nevzniká.', 'muted'));
    update();
  } else {
    const inputLabel = el('label', 'Datové bity (1–64 znaků 0 nebo 1)');
    const input = el('input'); input.type = 'text'; input.id = `${id}-bits`; input.value = config.defaults.bits; input.maxLength = 64; input.inputMode = 'numeric'; input.autocomplete = 'off'; input.spellcheck = false; input.pattern = '[01]{1,64}'; inputLabel.htmlFor = input.id;
    const parityLabel = el('label', 'Požadovaná parita celé zprávy');
    const selector = el('select'); selector.id = `${id}-parity`; parityLabel.htmlFor = selector.id;
    for (const [value, label] of [['even', 'Sudá parita'], ['odd', 'Lichá parita']]) {const option = el('option', label); option.value = value; selector.append(option);}
    selector.value = config.defaults.parity;
    const bitButtons = el('div'); bitButtons.setAttribute('role', 'group'); bitButtons.setAttribute('aria-label', 'Překlop jednotlivé datové bity'); bitButtons.style.display = 'flex'; bitButtons.style.flexWrap = 'wrap'; bitButtons.style.gap = '4px';
    const encoded = el('pre'); encoded.setAttribute('aria-label', 'Datové bity s připojeným paritním bitem');
    const update = () => {
      bitButtons.replaceChildren();
      try {
        const result = evaluateParity(input.value, selector.value);
        for (let i = 0; i < result.bits.length; i++) {
          const button = el('button', result.bits[i]); button.type = 'button'; button.dataset.bitIndex = String(i);
          button.setAttribute('aria-label', `Datový bit ${i+1}: ${result.bits[i]}. Překlopit.`); button.setAttribute('aria-pressed', result.bits[i] === '1' ? 'true' : 'false');
          button.style.padding = '6px 10px'; bitButtons.append(button);
        }
        const target = result.parity === 'even' ? 'sudý' : 'lichý';
        const form = (count,one) => count===1?one:count>=2&&count<=4?'jedničky':'jedniček';
        status.textContent = `Data obsahují ${result.ones} ${form(result.ones,'jedničku')}. Připojíme paritní bit ${result.parityBit}; celá zpráva pak obsahuje ${result.totalOnes} ${form(result.totalOnes,'jedničku')}, tedy ${target} počet.`;
        status.className = ''; encoded.textContent = `${result.bits} | ${result.parityBit}\nCelá zpráva: ${result.encoded}`;
      } catch (error) {status.textContent = error.message; status.className = 'warning'; encoded.textContent = '';}
    };
    on(input, 'input', update); on(selector, 'change', update);
    on(bitButtons, 'click', event => {
      const button = typeof event.target?.closest === 'function' ? event.target.closest('button[data-bit-index]') : null;
      if (!button || !bitButtons.contains(button)) return;
      const index = Number(button.dataset.bitIndex);
      if (!Number.isInteger(index) || index < 0 || index >= input.value.length || !/^[01]{1,64}$/.test(input.value)) return;
      const bits = [...input.value]; bits[index] = bits[index] === '1' ? '0' : '1'; input.value = bits.join(''); update();
    });
    root.append(el('p', 'Napiš vlastní posloupnost nebo překlop bity tlačítky. Oddělovač | pouze zvýrazňuje připojený kontrolní bit a není součástí zprávy.'), inputLabel, input, parityLabel, selector, bitButtons, status, encoded,
      el('p', 'Pomůcka vždy znovu počítá paritní bit pro aktuální data. Jeden paritní bit může odhalit jednobitovou změnu přenesené zprávy, ale neurčí její polohu a některé vícenásobné chyby neodhalí.', 'muted'));
    update();
  }
  return () => {for (const remove of listeners.splice(0)) remove(); root.remove();};
}
