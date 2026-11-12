import {normalizePreferences,restoreLedger,reconcileNotifications,markNotificationRead} from './notifications-core.js';
const PREFS='study:notifications:preferences:v1',LEDGER='study:notifications:ledger:v1';
const LABELS={material:'Materiály',solution:'Hotová řešení',deadline:'Termíny úkolů',test:'Testy',notes:'Výpisky',external:'Výuková videa'};
/** Device-local inbox. It never requests system notification permission. */
export function initNotificationCenter({subjects=[],onChange=()=>{},onPreferencesChange=()=>{},fetcher=globalThis.fetch,storage,now=()=>Date.now()/1000,eventTarget=globalThis.window,document:doc=globalThis.document}={}){
 let store=storage;try{store??=globalThis.localStorage;}catch{}
 let prefs=normalizePreferences(),ledger=null,host,status='idle',snapshot,disposed=false,inflight,lastRefresh=-Infinity,controller,storageError=false;
 try{const saved=store?.getItem(PREFS);if(saved)prefs=normalizePreferences(JSON.parse(saved));ledger=restoreLedger(store?.getItem(LEDGER)).state;}catch{storageError=true;ledger=restoreLedger(null).state;}
 function save(){try{if(!store)throw Error();store.setItem(PREFS,JSON.stringify(prefs));store.setItem(LEDGER,JSON.stringify(ledger));storageError=false;}catch{storageError=true;}}
 const unread=()=>prefs.enabled?(ledger?.notifications.filter(n=>!n.read&&prefs.subjects.includes(n.subject)&&prefs.categories.includes(n.category)).length||0):0;
 function notify(){if(disposed)return;onChange(unread());render();}
 function apply(){if(!snapshot)return;const result=reconcileNotifications(snapshot,ledger,prefs,Math.floor(now()));ledger=result.state;save();}
 function refresh(){
  if(disposed)return Promise.resolve();if(inflight)return inflight;
  lastRefresh=now();status='loading';notify();controller=new AbortController();const timer=setTimeout(()=>controller.abort(),5000);
  inflight=(async()=>{try{
   const response=await fetcher(new URL('../notifications.json',import.meta.url),{cache:'no-store',credentials:'omit',signal:controller.signal});
   if(!response.ok)throw Error();const length=response.headers?.get('content-length');if(length&&Number(length)>2000000)throw Error();
   const body=await response.text();if(body.length>2000000)throw Error();const candidate=JSON.parse(body);
   // Validation/reconciliation completes before replacing the current inbox.
   const result=reconcileNotifications(candidate,ledger,prefs,Math.floor(now()));if(disposed)return;snapshot=candidate;ledger=result.state;save();status='ready';
  }catch{if(!disposed)status='error';}finally{clearTimeout(timer);inflight=null;if(!disposed)notify();}})();return inflight;
 }
 function automatic(){if(!disposed&&doc?.visibilityState!=='hidden'&&now()-lastRefresh>=180)void refresh();}
 const listeners=[[eventTarget,'focus'],[eventTarget,'online'],[doc,'visibilitychange']];for(const[target,type]of listeners)target?.addEventListener(type,automatic);
 const interval=setInterval(automatic,180000);interval.unref?.();
 function el(tag,value,cls){const node=doc.createElement(tag);if(value!==undefined)node.textContent=value;if(cls)node.className=cls;return node;}
 function checkbox(parent,label,checked,change){const wrap=el('label',undefined,'notification-choice'),input=el('input');input.type='checkbox';input.dataset.notificationControl=label;input.checked=checked;input.addEventListener('change',()=>change(input.checked));wrap.append(input,el('span',label));parent.append(wrap);}
 function preferencesChanged(){apply();save();onPreferencesChange(getPreferences());notify();if(prefs.enabled&&!snapshot)void refresh();}
 function render(){if(!host||disposed)return;const expanded=host.querySelector?.('.notification-settings')?.open===true;const focused=host.contains?.(doc.activeElement)?doc.activeElement?.dataset?.notificationControl:null;host.replaceChildren();const section=el('section',undefined,'notification-center');section.append(el('h1','Novinky'));
  section.append(el('p','Nové podklady, řešení a termíny z vybraných předmětů. Upozornění uvidíš po otevření Studila.'));
  const settings=el('details',undefined,'notification-settings');settings.open=expanded;settings.append(el('summary','Nastavit předměty a upozornění'));
  checkbox(settings,'Zapnout novinky v tomto zařízení',prefs.enabled,value=>{prefs={...prefs,enabled:value};preferencesChanged();});
  const subjectGroup=el('fieldset');subjectGroup.append(el('legend','Předměty'));for(const subject of subjects)checkbox(subjectGroup,subject.name,prefs.subjects.includes(subject.id),value=>{prefs={...prefs,subjects:value?[...new Set([...prefs.subjects,subject.id])]:prefs.subjects.filter(id=>id!==subject.id)};preferencesChanged();});settings.append(subjectGroup);
  const categoryGroup=el('fieldset');categoryGroup.append(el('legend','Co sledovat'));for(const[id,label]of Object.entries(LABELS))checkbox(categoryGroup,label,prefs.categories.includes(id),value=>{prefs={...prefs,categories:value?[...new Set([...prefs.categories,id])]:prefs.categories.filter(category=>category!==id)};preferencesChanged();});settings.append(categoryGroup);section.append(settings);
  if(storageError)section.append(el('p','Nastavení se nepodařilo uložit. Novinky fungují do zavření této stránky.','notifications-storage-error'));
  if(status==='loading'){const message=el('p','Načítám novinky…','notifications-loading');message.setAttribute('role','status');section.append(message);}
  if(status==='error'){const error=el('p','Novinky se nepodařilo načíst. Poslední uložený přehled zůstává dostupný.','notifications-error');error.setAttribute('role','status');section.append(error);const retry=el('button','Zkusit znovu');retry.type='button';retry.addEventListener('click',()=>void refresh());section.append(retry);}
  if(!prefs.enabled)section.append(el('p','Novinky jsou vypnuté. Zapni je v nastavení výše.','notifications-off'));
  else{const notices=(ledger?.notifications||[]).filter(n=>prefs.subjects.includes(n.subject)&&prefs.categories.includes(n.category));
   if(!notices.length)section.append(el('p','Zatím žádné nové položky. Starší obsah zůstává v předmětech a kalendáři.','notifications-empty'));
   else{const readAll=el('button','Označit vše jako přečtené');readAll.type='button';readAll.dataset.notificationControl='read-all';readAll.addEventListener('click',()=>{ledger=markNotificationRead(ledger);save();notify();});section.append(readAll);
    const list=el('ul',undefined,'notifications-list');for(const notice of notices){const li=el('li',undefined,notice.read?'notification-read':'notification-unread'),link=el('a',notice.title);link.href=notice.url;link.addEventListener('click',()=>{ledger=markNotificationRead(ledger,notice.id);save();notify();});li.append(el('span',LABELS[notice.category]),link);if(notice.due){const time=el('time',new Intl.DateTimeFormat('cs-CZ',{timeZone:'Europe/Prague',dateStyle:'medium',timeStyle:'short'}).format(new Date(notice.due*1000)));time.dateTime=new Date(notice.due*1000).toISOString();li.append(time);}list.append(li);}section.append(list);}
  }host.append(section);if(focused){const controls=host.querySelectorAll?.('[data-notification-control]')||[];[...controls].find(node=>node.dataset.notificationControl===focused)?.focus({preventScroll:true});}
 }
 function getPreferences(){return {...prefs,subjects:[...prefs.subjects],categories:[...prefs.categories]};}
 return {getPreferences,mount(container){host=container;render();if(status==='idle')void refresh();return()=>{if(host===container)host=null;};},refresh,getUnread:unread,dispose(){disposed=true;controller?.abort();clearInterval(interval);for(const[target,type]of listeners)target?.removeEventListener(type,automatic);host=null;}};
}
