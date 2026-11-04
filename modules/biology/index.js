import template from './template.js';
import { run } from './runtime.js';

const base = new URL('./', import.meta.url);
const modes = {materials:'notes',practice:'cards',atlas:'atlas',notes:'notes',cards:'cards',map:'map'};

/** Mount the complete biology application in an isolated Shadow DOM. */
export async function mount(container, {mode='atlas', onProgress}={}) {
  const host = globalThis.document.createElement('div');
  host.className = 'biology-module';
  container.append(host);
  const root = host.attachShadow({mode:'open'});
  const sheet = globalThis.document.createElement('link');
  sheet.rel='stylesheet';sheet.href=new URL('style.css',base).href;
  root.append(sheet);
  const wrapper=globalThis.document.createElement('div');
  wrapper.className='biology-app';wrapper.innerHTML=template;
  root.append(wrapper);
  const style=globalThis.document.createElement('style');
  style.textContent=`
    :host{display:block;min-width:0;font-family:Inter,Arial,sans-serif;color:#232628;line-height:1.6;font-size:14px;--bio-accent:#547968}
    .biology-app{background:#fff;border:1px solid #e6e8e5;border-radius:16px;overflow:hidden}
    .site-header{height:auto;min-height:68px;padding:12px 24px;gap:16px;flex-wrap:wrap;background:#fff}
    .site-header nav{display:flex;gap:22px;flex-wrap:wrap;justify-content:flex-start;flex:1}
    .site-header nav>a{padding:8px 0;font-size:12px;letter-spacing:0;text-transform:none;color:#555}
    .site-header nav>a.active{color:#315d49}.site-header .small{font-size:11px;padding:8px 12px}
    main{padding:0 28px 30px;max-width:none}.hero{padding:28px 0}.hero h1{font-size:38px;letter-spacing:-1.5px;color:#202724}.hero em{color:#547968}
    .hero-note{display:none}.hero .intro{font-size:13px;max-width:650px;color:#6a716b}
    .hero.compact h1{font-size:36px}.eyebrow{font-size:9px}.section-head h2,.directory-head h2{font-size:25px;color:#252c28}
    .anatomy-card,.map-board{background:#f7f9f6}.bone-detail,.map-prompt,.flashcard,.notes-topic{background:#fff;border-color:#e2e7e1;box-shadow:none}
    .study-guide h2{font-size:26px;color:#26312a}.study-guide{padding-left:0}
    .primary-button{background:#2e4c3c;color:white}.primary-button:hover{background:#3e6250}
    .body-canvas{min-width:0}.region-tabs{max-width:100%;flex-wrap:wrap}.practice-banner{margin-bottom:0}
    @media(max-width:600px){main{padding:0 14px 22px}.site-header{padding:12px 14px}.site-header nav{order:0;height:auto;gap:13px;width:100%;flex-basis:100%}.site-header nav>a{font-size:11px}.hero h1,.hero.compact h1{font-size:31px}.hero .intro{font-size:12px}.intro br{display:none}.site-header .small{font-size:11px}.section-head h2,.directory-head h2{font-size:22px}.region-tabs button{font-size:10px}.map-score{flex-wrap:wrap}.card-position-tools{gap:6px}.card-position{gap:4px}.card-image-zoom{font-size:9px}}
  `;
  root.append(style);
  root.querySelectorAll('[src],[href]').forEach(el=>{
    for(const attr of ['src','href']) {const value=el.getAttribute(attr);if(value?.startsWith('assets/'))el.setAttribute(attr,new URL(value,base).href);}
  });
  const controller=new AbortController();
  const events=new EventTarget();
  const rafs=new Set();
  let active=true,currentHash='#'+(modes[mode]||'atlas');
  const location={get hash(){return currentHash},set hash(value){currentHash=value.startsWith('#')?value:'#'+value;events.dispatchEvent(new Event('hashchange'));}};
  const localStorage={
    getItem(key){
      try {
        const name='study:biology:'+key;let value=globalThis.localStorage.getItem(name);
        if(value===null&&['kostra-progress-v1','kostra-progress-v2'].includes(key)) {
          value=globalThis.localStorage.getItem(key);
          if(value!==null)globalThis.localStorage.setItem(name,value);
        }
        return value;
      }catch{return null;}
    },
    setItem(key,value){
      try {globalThis.localStorage.setItem('study:biology:'+key,value);}catch{}
      onProgress?.(getProgress());
      host.dispatchEvent(new CustomEvent('study-progress',{bubbles:true,composed:true,detail:{subject:'biology',...getProgress()}}));
    }
  };
  const document={
    querySelector:s=>root.querySelector(s),querySelectorAll:s=>root.querySelectorAll(s),
    createElementNS:(...args)=>globalThis.document.createElementNS(...args),
    addEventListener:(name,fn,options)=>root.addEventListener(name,fn,{...options,signal:controller.signal})
  };
  const window={
    addEventListener(name,fn,options){
      if(name==='hashchange')events.addEventListener(name,fn,{...options,signal:controller.signal});
      else globalThis.addEventListener(name,fn,{...options,signal:controller.signal});
    },
    scrollTo(){host.scrollIntoView({block:'start',behavior:'instant'});}
  };
  root.addEventListener('click',event=>{
    const anchor=event.target.closest?.('a[href^="#"]');
    if(anchor) {event.preventDefault();location.hash=anchor.getAttribute('href');}
  },{signal:controller.signal});
  const ready = new Promise(resolve=>{sheet.onload=resolve;sheet.onerror=resolve;});
  // Styles must be loaded before geometry-based SVG hotspots are measured.
  if(!sheet.sheet)await Promise.race([ready,new Promise(resolve=>setTimeout(resolve,3000))]);
  if(!host.isConnected)return ()=>{};
  run({document,window,location,localStorage,asset:value=>new URL(value,base).href,
    requestAnimationFrame(fn){const id=globalThis.requestAnimationFrame(()=>{rafs.delete(id);if(active)fn();});rafs.add(id);return id;}});
  const cleanup=()=>{active=false;controller.abort();rafs.forEach(id=>globalThis.cancelAnimationFrame(id));host.remove();};
  cleanup.navigate=next=>{location.hash=modes[next]||next;};
  cleanup.root=root;
  return cleanup;
}

export function getProgress() {
  try {
    const known=JSON.parse(globalThis.localStorage.getItem('study:biology:kostra-progress-v2')||'[]');
    const results=JSON.parse(globalThis.localStorage.getItem('study:biology:map-results')||'[]');
    const map=JSON.parse(globalThis.localStorage.getItem('study:biology:map-progress')||'null');
    return {mastered:Array.isArray(known)?known.length:0,total:64,results:Array.isArray(results)?results:[],map};
  }catch{return {mastered:0,total:64,results:[],map:null};}
}
