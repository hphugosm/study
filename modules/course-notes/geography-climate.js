/** Qualitative comparison of the three source regions, never a climate model. */
const REGIONS = Object.freeze({
  coast: {label:'Středomořské pobřeží', season:'Horká suchá léta; mírné vlhké zimy.', water:'Srážky se soustřeďují do zimy. Suché léto neznamená sucho po celý rok.', plants:'K tomuto prostředí patří středomořská macchie.', shape:'M0 125 Q40 110 85 125 T170 125 L170 160 L0 160 Z', color:'#8eb2bd'},
  interior: {label:'Suché vnitrozemí', season:'Horká léta, chladnější zimy; minimum srážek.', water:'Rozhodující je nedostatek vody. Nezaměňuj jej se sezónním letním suchem na pobřeží.', plants:'V přehledu se objevují pouště, polopouště a stepi.', shape:'M0 135 Q65 90 125 130 T300 125 L300 160 L0 160 Z', color:'#c4ac7c'},
  mountains: {label:'Hory', season:'Vyšší polohy se liší od nížin.', water:'Zdroj tu neurčuje sezónní rozdělení srážek. Ze schématu nelze vyčíst jejich množství ani stranu hor, kde prší.', plants:'Pro vyšší polohy Zagrosu a Elborzu přehled uvádí horské lesy.', shape:'M0 145 L95 40 L155 105 L220 20 L300 145 L300 160 L0 160 Z', color:'#a5b795'}
});
export function normalizeClimateOptions(options = {}) {
  if (!options || typeof options !== 'object' || Array.isArray(options) || Object.keys(options).some(key => key !== 'region')) throw new TypeError('Neplatné nastavení podnebí.');
  const region = options.region ?? 'coast';
  if (typeof region !== 'string' || !Object.hasOwn(REGIONS, region)) throw new TypeError('Neznámá oblast podnebí.');
  return {region};
}
export function mountClimate(container, options = {}) {
  let {region} = normalizeClimateOptions(options);
  if (!container?.ownerDocument || typeof container.append !== 'function') throw new TypeError('Chybí místo pro pomůcku.');
  const doc = container.ownerDocument, listeners = [];
  const el = (tag, text) => {const node=doc.createElement(tag);if(text!==undefined)node.textContent=text;return node;};
  const root = el('section');root.className='interaction-widget geography-climate';root.setAttribute('aria-label','Porovnání podnebí a vegetace');
  const controls=el('div');controls.setAttribute('role','group');controls.setAttribute('aria-label','Vyber prostředí');
  controls.style.display='flex';controls.style.flexWrap='wrap';controls.style.gap='8px';
  const status=el('div');status.setAttribute('aria-live','polite');status.setAttribute('aria-atomic','true');
  const svg=doc.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 300 160');svg.setAttribute('role','img');svg.style.width='100%';svg.style.maxWidth='420px';
  const path=doc.createElementNS('http://www.w3.org/2000/svg','path');svg.append(path);
  const buttons = new Map();
  const update = () => {
    const data=REGIONS[region];
    for(const [key,button] of buttons) {
      const selected=key===region;button.setAttribute('aria-pressed',String(selected));
      button.style.fontWeight=selected?'800':'';
      button.style.boxShadow=selected?'inset 0 0 0 2px currentColor':'';
    }
    status.replaceChildren(el('h3',data.label),el('p',data.season),el('p',data.water),el('p',data.plants));
    path.setAttribute('d',data.shape);path.setAttribute('fill',data.color);
    svg.setAttribute('aria-label',`Symbolické schéma: ${data.label}. Není to mapa ani měřítkový profil.`);
  };
  for(const [key,data] of Object.entries(REGIONS)) {
    const button=el('button',data.label);button.type='button';button.style.minHeight='44px';button.style.maxWidth='100%';button.style.whiteSpace='normal';button.style.overflowWrap='anywhere';
    const handler=()=>{region=key;update();};button.addEventListener('click',handler);listeners.push(()=>button.removeEventListener('click',handler));
    buttons.set(key,button);controls.append(button);
  }
  root.append(el('p','Vyber prostředí a porovnej průběh roku, vodu a vegetaci.'),controls,svg,status,el('p','Vlastní symbolické schéma: není to skutečná mapa, předpověď počasí ani výpočet teplot či srážek. Barva a výška kresby nevyjadřují naměřené hodnoty.'));
  container.append(root);update();
  return ()=>{for(const remove of listeners.splice(0))remove();root.remove();};
}
