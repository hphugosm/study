import {cards} from './content.js';

const KEY='study:history:baroque:progress:v1';
export function getProgress(){
  let known=[];
  try{const saved=JSON.parse(localStorage.getItem(KEY)||'{}');if(Array.isArray(saved.knownCards))known=saved.knownCards;}catch{/* Cards remain usable without storage. */}
  return {knownCards:cards.filter(card=>known.includes(card.id)).map(card=>card.id),total:cards.length};
}
const el=(tag,text,className)=>{const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(className)node.className=className;return node;};

export async function mount(container){
  const host=el('section');host.lang='cs';const root=host.attachShadow({mode:'open'});container.replaceChildren(host);
  const css=el('link');css.rel='stylesheet';css.href=new URL('./styles.css',import.meta.url).href;
  const shell=el('div',undefined,'cards');root.append(css,shell);
  let index=0,flipped=false,progress=getProgress(),persisted=true;
  function move(amount){index=(index+amount+cards.length)%cards.length;flipped=false;render(amount<0?'previous-card':'next-card');}
  function render(focusId){
    const card=cards[index],known=progress.knownCards.includes(card.id);
    shell.replaceChildren();
    shell.append(el('p','BAROKO · KARTIČKY','eyebrow'),el('p',`${index+1} / ${cards.length} · Znáš ${progress.knownCards.length} / ${cards.length}`,'counter'));
    const face=el('div',undefined,'card');face.setAttribute('aria-label',flipped?'Odpověď':'Otázka');
    face.append(el('p',flipped?'ODPOVĚĎ':'OTÁZKA','side'));
    if(flipped){
      const list=el('ul',undefined,'answer');
      for(const line of card.answer)list.append(el('li',line));
      face.append(list);
      const source=el('a',`Podklad: atlas, ${card.endPage?`strany ${card.page}–${card.endPage}`:`strana ${card.page}`}`,'source');
      source.href=new URL(`../../assets/history/baroko-studijni-atlas.pdf#page=${card.page}`,import.meta.url).href;source.target='_blank';source.rel='noopener';face.append(source);
    }else face.append(el('h2',card.question,'question'));
    const flip=el('button','↻','flip');flip.id='flip-card';flip.type='button';flip.setAttribute('aria-label',flipped?'Zobrazit otázku':'Otočit kartičku a zobrazit odpověď');flip.setAttribute('aria-pressed',String(flipped));
    flip.onclick=()=>{flipped=!flipped;render('flip-card');};face.append(flip);shell.append(face);
    const nav=el('div',undefined,'navigation');
    for(const [id,label,symbol,action] of [
      ['previous-card','Předchozí kartička','←',()=>move(-1)],
      ['know-card',known?'Kartičku už znáš':'Označit jako známou','✓',()=>{
        if(!flipped||known)return;
        progress.knownCards.push(card.id);
        try{localStorage.setItem(KEY,JSON.stringify({knownCards:progress.knownCards}));}catch{persisted=false;}
        render('next-card');
      }],
      ['next-card','Další kartička','→',()=>move(1)],
    ]){
      const button=el('button',symbol);button.type='button';button.id=id;button.setAttribute('aria-label',label);button.onclick=action;
      if(id==='know-card'){button.disabled=!flipped||known;button.setAttribute('aria-pressed',String(known));}
      nav.append(button);
    }
    shell.append(nav,el('p','Nejdřív si odpověz. Otoč ↻, znalost označ ✓.','hint'));
    if(!persisted)shell.append(el('p','Ukládání není dostupné. Kartičky můžeš dál procházet.','hint'));
    if(focusId)root.getElementById(focusId)?.focus({preventScroll:true});
  }
  function onKey(event){
    const target=event.composedPath()[0];
    if(event.defaultPrevented||event.altKey||event.ctrlKey||event.metaKey||target instanceof HTMLAnchorElement||(!event.composedPath().includes(host)&&target!==keyboardTarget))return;
    if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();move(event.key==='ArrowLeft'?-1:1);}
    else if(event.code==='Space'&&target.tagName!=='BUTTON'){event.preventDefault();flipped=!flipped;render('flip-card');}
  }
  // The app focuses main on navigation; listen there while this module is mounted.
  const keyboardTarget=container.closest('main')||host;
  keyboardTarget.addEventListener('keydown',onKey);
  render();
  return ()=>{keyboardTarget.removeEventListener('keydown',onKey);container.replaceChildren();};
}
