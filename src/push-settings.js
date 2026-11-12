import {normalizePreferences} from './notifications-core.js';

export const PUSH_STORAGE_KEY='study:push:subscription:v1';
const PREFS='study:notifications:preferences:v1';
const SUBJECTS=['area-studies','biology','chemistry','american-literature','physics','informatics','law','mathematics','sociology','social-sciences','geography','literature','history'];
const error=code=>Object.assign(new Error(code),{code});

export function normalizePushConfig(config){
 try{const u=new URL(config?.apiBase);if(u.protocol!=='https:'||u.username||u.password||u.search||u.hash||u.pathname!=='/'||!config?.turnstileSiteKey||!/^[a-zA-Z0-9_-]{3,200}$/.test(config.turnstileSiteKey))return null;return {apiBase:u.origin,turnstileSiteKey:config.turnstileSiteKey};}catch{return null;}
}
export function pushPreferences(value){
 const p=normalizePreferences(value);
 if(!p.enabled||!p.subjects.length||!p.categories.length||p.subjects.some(s=>!SUBJECTS.includes(s)))throw error('preferences');
 return {subjects:p.subjects.slice().sort(),categories:p.categories.slice().sort()};
}
export function applicationServerKey(value){
 if(typeof value!=='string'||!/^[A-Za-z0-9_-]{87}={0,2}$/.test(value))throw error('unavailable');
 const raw=globalThis.atob(value.replace(/-/g,'+').replace(/_/g,'/'));
 if(raw.length!==65||raw.charCodeAt(0)!==4)throw error('unavailable');
 return Uint8Array.from(raw,c=>c.charCodeAt(0));
}
export function restorePushState(raw,apiBase){
 if(raw===null||raw===undefined)return null;
 try{const s=JSON.parse(raw);const u=new URL(s.endpoint);
  if(s.schema!==1||s.apiBase!==apiBase||!/^[-a-f0-9]{36}$/.test(s.id)||!/^[A-Za-z0-9_-]{43}$/.test(s.managementToken)||u.protocol!=='https:'||u.username||u.password||u.hash||typeof s.pendingDelete!=='boolean'||typeof s.backendDeleted!=='boolean')throw Error();
  applicationServerKey(s.vapidPublicKey);return s;
 }catch{throw error('local_state');}
}

/** No automatic permission requests, subscriptions, challenge loading or unsubscribe. */
export function createPushSettingsClient({config,preferences,storage,fetcher=globalThis.fetch,navigator:nav=globalThis.navigator,notification=globalThis.Notification,challenge,secure=globalThis.isSecureContext}={}){
 const settings=normalizePushConfig(config);let store=storage;try{store??=globalThis.localStorage;}catch{}
 let state=null,invalid=false,status=null,busy=false;
 if(settings)try{state=restorePushState(store?.getItem(PUSH_STORAGE_KEY),settings.apiBase);}catch{invalid=true;}
 const support=()=>secure===true&&!!nav?.serviceWorker&&typeof globalThis.PushManager!=='undefined'&&!!notification;
 const getPreferences=()=>pushPreferences(typeof preferences==='function'?preferences():preferences??JSON.parse(store?.getItem(PREFS)||'{}'));
 function write(value){state=value;try{if(!store)throw Error();store.setItem(PUSH_STORAGE_KEY,JSON.stringify(value));}catch{throw error('storage');}}
 function writable(){try{if(!store)throw Error();const k=PUSH_STORAGE_KEY+':check';store.setItem(k,'1');store.removeItem(k);}catch{throw error('storage');}}
 async function request(path,{method='GET',body,token}={}){
  if(!settings)throw error('unavailable');
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),10000);
  try{const response=await fetcher(settings.apiBase+path,{method,credentials:'omit',cache:'no-store',redirect:'error',referrerPolicy:'no-referrer',signal:controller.signal,headers:{...(body?{'Content-Type':'application/json'}:{}),...(token?{Authorization:'Bearer '+token}:{})},...(body?{body:JSON.stringify(body)}:{})});
   if(!response.ok)throw error(response.status===503?'unavailable':response.status===409?'conflict':'network');
   const text=await response.text();if(text.length>8192)throw error('network');return JSON.parse(text);
  }catch(e){throw e.code?e:error('network');}finally{clearTimeout(timer);}
 }
 async function exclusive(fn){if(busy)throw error('busy');busy=true;try{return await fn();}finally{busy=false;}}
 async function currentSubscription(){let timer;try{const reg=await Promise.race([nav.serviceWorker.ready,new Promise((_,reject)=>{timer=setTimeout(()=>reject(error('unavailable')),5000);})]);return {reg,sub:await reg.pushManager.getSubscription()};}finally{clearTimeout(timer);}}
 async function loadStatus(){if(!settings){status=null;return null;}const result=await request('/api/status');if(result.push!==true){status=null;return null;}applicationServerKey(result.vapidPublicKey);status=result;return {push:true,vapidPublicKey:result.vapidPublicKey};}
 async function enable({userGesture=false}={}){
  if(!userGesture||nav?.userActivation?.isActive===false)throw error('gesture');if(busy)throw error('busy');
  if(!settings||!support())throw error('unavailable');if(invalid)throw error('local_state');if(state)throw error(state.pendingDelete?'pending_delete':'already_enabled');
  const prefs=getPreferences();writable();
  // Call synchronously from the click, before any network/challenge await (also for iOS).
  const permission=notification.permission==='default'?notification.requestPermission():Promise.resolve(notification.permission);
  return exclusive(async()=>{
   if(await permission!=='granted')throw error('permission');
   const available=await loadStatus();if(!available)throw error('unavailable');
   const {reg,sub:existing}=await currentSubscription();if(existing)throw error('unowned');
   const turnstileToken=await challenge?.({siteKey:settings.turnstileSiteKey,action:'push_subscribe'});if(!turnstileToken)throw error('challenge');
   const sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:applicationServerKey(available.vapidPublicKey)});
   let registered=false;
   try{const result=await request('/api/push/subscriptions',{method:'POST',body:{subscription:sub.toJSON(),preferences:prefs,turnstileToken}});
    if(result.ok!==true||!/^[-a-f0-9]{36}$/.test(result.id)||!/^[A-Za-z0-9_-]{43}$/.test(result.managementToken))throw error('network');
    registered=true;write({schema:1,apiBase:settings.apiBase,id:result.id,managementToken:result.managementToken,endpoint:sub.endpoint,vapidPublicKey:available.vapidPublicKey,preferences:prefs,pendingDelete:false,backendDeleted:false});return true;
   }catch(e){if(!registered)await sub.unsubscribe().catch(()=>{});throw e;}
  });
 }
 async function update(){
  let prefs;try{prefs=getPreferences();}catch(e){if(e.code==='preferences')return disable();throw e;}
  return exclusive(async()=>{if(invalid)throw error('local_state');if(!state||state.pendingDelete)throw error('pending_delete');const {sub}=await currentSubscription();if(!sub||sub.endpoint!==state.endpoint)throw error('unowned');const result=await request('/api/push/subscriptions',{method:'PATCH',body:{id:state.id,preferences:prefs},token:state.managementToken});if(result.ok!==true)throw error('network');write({...state,preferences:prefs});return true;});
 }
 async function disable(){return exclusive(async()=>{
  if(invalid)throw error('local_state');if(!state)return true;
  // A quota error must not prevent an explicitly requested removal. Credentials
  // remain in memory; the previously stored record can still retry idempotently.
  try{write({...state,pendingDelete:true});}catch(e){if(e.code!=='storage')throw e;}
  if(!state.backendDeleted){const result=await request('/api/push/subscriptions',{method:'DELETE',body:{id:state.id},token:state.managementToken});if(result.ok!==true)throw error('network');try{write({...state,backendDeleted:true});}catch(e){if(e.code!=='storage')throw e;}}
  const {sub}=await currentSubscription();
  // Another feature may own a replacement subscription. Never unsubscribe it.
  if(sub&&sub.endpoint===state.endpoint&&await sub.unsubscribe()!==true)throw error('unsubscribe');
  try{store.removeItem(PUSH_STORAGE_KEY);state=null;}catch{throw error('storage');}return true;
 });}
 return {loadStatus,enable,update,disable,supported:support,configured:!!settings,get state(){return state?{active:!state.pendingDelete,pendingDelete:state.pendingDelete}:null;},get dirty(){if(!state)return false;try{return JSON.stringify(getPreferences())!==JSON.stringify(state.preferences);}catch{return true;}},get invalidState(){return invalid;}};
}

let turnstileScript;
function loadTurnstile(doc){
 if(globalThis.turnstile)return Promise.resolve(globalThis.turnstile);
 if(!turnstileScript)turnstileScript=new Promise((resolve,reject)=>{const script=doc.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;script.onload=()=>globalThis.turnstile?resolve(globalThis.turnstile):reject(error('challenge'));script.onerror=()=>reject(error('challenge'));doc.head.append(script);}).catch(e=>{turnstileScript=undefined;throw e;});
 return turnstileScript;
}
const MESSAGES={preferences:'Nejprve v Novinkách zapni upozornění a vyber alespoň jeden předmět a druh novinek.',permission:'Povolení upozornění nebylo uděleno. Změnit je můžeš v nastavení prohlížeče.',unavailable:'Systémová upozornění zatím nejsou dostupná. Chybí podpora zařízení nebo připravený server.',unowned:'Prohlížeč má jiné odběrné nastavení. Automaticky je nerušíme; obnov původní nastavení tohoto zařízení.',local_state:'Místní údaje odběru jsou poškozené nebo patří jinému serveru. Doručování můžeš zablokovat v nastavení tohoto webu v prohlížeči. Odstranění odběru ze serveru řeš s provozovatelem; jiný odběr automaticky nerušíme.',storage:'Nastavení nelze bezpečně uložit do tohoto prohlížeče. Zkontroluj dostupné místní úložiště.',challenge:'Ověření se nepodařilo. Zkus je prosím znovu.',network:'Server nepotvrdil změnu. Při vypínání zůstávají údaje pro opakování; zkus to znovu po připojení.',unsubscribe:'Server již odběr odstranil, ale prohlížeč nepotvrdil vypnutí. Zkus vypnutí znovu.',conflict:'Tento odběr již existuje. Použij původní nastavení v tomto prohlížeči.',gesture:'Zapnutí potvrď přímo tlačítkem v nastavení.',pending_delete:'Nejprve dokonči vypnutí předchozího odběru.',already_enabled:'Toto zařízení už má odběr zapnutý.',busy:'Předchozí změna se ještě dokončuje.'};

export function mountPushSettings(container,{config,preferences}={}){
 const doc=container.ownerDocument;let disposed=false,widget,challengeReject;
 const el=(tag,text)=>{const n=doc.createElement(tag);if(text)n.textContent=text;return n;};
 const section=el('section');section.className='push-settings';section.append(el('h2','Systémová upozornění na tomto zařízení'));
 section.append(el('p','Volitelně tě upozorníme i při zavřeném Studilu. Odběr používá předměty a druhy novinek vybrané v Novinkách; po změně výběru jej zde aktualizuj. Doručení ani přesný čas nelze zaručit.'));
 section.append(el('p','Vypnutí novinek ve webu samo systémový odběr nevypne. Ten vypni tlačítkem níže nebo výslovně použij aktuální prázdný výběr.'));
 section.append(el('p','Na iPhonu a iPadu otevři Studilo z plochy: v Safari zvol Sdílet → Přidat na plochu. Podpora závisí na systému a prohlížeči.'));
 const status=el('p','Zjišťuji dostupnost…');status.setAttribute('role','status');status.setAttribute('aria-live','polite');
 const challengeHost=el('div'),buttons=el('div'),enable=el('button','Zapnout systémová upozornění'),update=el('button','Použít aktuální výběr novinek'),disable=el('button','Vypnout systémová upozornění'),retry=el('button','Ověřit dostupnost znovu');
 for(const b of [enable,update,disable,retry]){b.type='button';b.style.minHeight='44px';buttons.append(b);}
 section.append(status,buttons,challengeHost);container.replaceChildren(section);
 async function challenge({siteKey,action}){const api=await loadTurnstile(doc);if(disposed)throw error('challenge');return new Promise((resolve,reject)=>{challengeReject=reject;widget=api.render(challengeHost,{sitekey:siteKey,action,callback:token=>{challengeReject=null;resolve(token);},'error-callback':()=>reject(error('challenge')),'expired-callback':()=>reject(error('challenge'))});});}
 const client=createPushSettingsClient({config,preferences,challenge});let working=false,available=false;
 function controls(){const state=client.state;enable.hidden=!!state;update.hidden=!state||state.pendingDelete;disable.hidden=!state;disable.textContent=state?.pendingDelete?'Dokončit vypnutí':'Vypnout systémová upozornění';enable.disabled=working||!available||!client.supported()||client.invalidState;update.disabled=working||!available;disable.disabled=working;retry.disabled=working;update.textContent=client.dirty?'Použít změněný výběr novinek':'Použít aktuální výběr novinek';}
 function show(message){if(!disposed){status.textContent=message;controls();}}
 async function action(fn,message){if(working)return;working=true;controls();try{await fn();show(message);}catch(e){show(MESSAGES[e.code]||MESSAGES.network);}finally{working=false;if(widget!==undefined){globalThis.turnstile?.remove(widget);widget=undefined;}controls();}}
 enable.addEventListener('click',()=>void action(()=>client.enable({userGesture:true}),'Systémový odběr je uložený. Doručení závisí také na zařízení a dostupnosti služby.'));
 update.addEventListener('click',()=>void action(async()=>{await client.update();},'Aktuální výběr byl použit; prázdný nebo vypnutý výběr systémový odběr vypne.'));
 disable.addEventListener('click',()=>void action(()=>client.disable(),'Odběr byl odstraněn ze serveru i tohoto prohlížeče. Již odeslané upozornění může ještě dorazit.'));
 async function refreshStatus(){try{const value=await client.loadStatus();available=!!value;show(client.invalidState?MESSAGES.local_state:client.state?.pendingDelete?'Vypnutí čeká na dokončení. Zkus je zopakovat.':!available?MESSAGES.unavailable:!client.supported()?MESSAGES.unavailable:client.state?'Odběr je uložený na tomto zařízení. Po změně výběru použij aktualizaci výše.':'Upozornění zapneš pouze svým potvrzením.');}catch{available=false;show(MESSAGES.network);}}
 retry.addEventListener('click',()=>void refreshStatus());controls();void refreshStatus();
 const cleanup=()=>{disposed=true;challengeReject?.(error('challenge'));if(widget!==undefined)globalThis.turnstile?.remove(widget);container.replaceChildren();};
 cleanup.refresh=()=>{if(!disposed){controls();if(client.state&&client.dirty)show('Výběr novinek se změnil. Systémový odběr se změní až potvrzením tlačítka.');}};return cleanup;
}
