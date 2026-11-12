import {courseUnits} from './course-catalog.js';

const categories=new Map([['bug','Chyba webu'],['content','Oprava učiva'],['idea','Nápad'],['other','Jiné']]);
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const local=hostname=>['localhost','127.0.0.1','[::1]'].includes(hostname);
export function feedbackConfig(config,origin=globalThis.location?.origin){
  try{
    if(!config?.apiBase)return null;
    const url=new URL(config.apiBase),page=new URL(origin);
    if(url.username||url.password||url.search||url.hash||!(url.protocol==='https:'||url.protocol==='http:'&&local(url.hostname)&&local(page.hostname)))return null;
    const sitekey=config.turnstileSiteKey||config.sitekey;
    if(typeof sitekey!=='string'||!sitekey.trim()||sitekey.length>200)return null;
    return {apiBase:url.origin,sitekey:sitekey.trim()};
  }catch{return null;}
}
export function feedbackContext(context){
  const subject=context?.subject??context?.subjectId,topic=context?.topic??context?.topicId;
  return courseUnits.some(unit=>unit.subjectId===subject&&unit.topicId===topic)?{subject,topic}:{};
}
export function feedbackDraftError(category,message){
  if(!categories.has(category))return 'Vyber druh zprávy.';
  if(typeof message!=='string'||message.trim().length<3||message.trim().length>2000)return 'Napiš zprávu o délce 3 až 2 000 znaků.';
  if(/[<>\u0000-\u0008\u000b\u000c\u000e-\u001f]|https?:\/\/|www\.|[\w.+-]+@[\w.-]+\.[a-z]{2,}|(?:password|heslo|token|secret|sesskey|cookie|authorization)\s*[:=]|github_pat_|gh[pousr]_/i.test(message))return 'Odstraň odkazy, e-mail, značky HTML a přihlašovací údaje. Místo odkazu popiš předmět a téma.';
  return '';
}
export function feedbackPayload({category,message,requestId,turnstileToken,context}){
  const error=feedbackDraftError(category,message);if(error)throw new Error(error);
  if(!uuid.test(requestId)||typeof turnstileToken!=='string'||!turnstileToken||turnstileToken.length>2048)throw new Error('Neplatné ověření zprávy.');
  return {category,message:message.trim(),requestId,turnstileToken,...feedbackContext(context)};
}
export async function sendFeedback(config,payload,{fetcher=globalThis.fetch,signal}={}){
  const response=await fetcher(`${config.apiBase}/api/feedback`,{method:'POST',credentials:'omit',redirect:'error',referrerPolicy:'no-referrer',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal});
  if(response.status===202)return {accepted:true};
  return {accepted:false,status:response.status};
}
let turnstileLoading;
function loadTurnstile(win,doc){
  if(win.turnstile?.render)return Promise.resolve(win.turnstile);
  if(turnstileLoading)return turnstileLoading;
  turnstileLoading=new Promise((resolve,reject)=>{
    const script=doc.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;script.defer=true;
    const timer=win.setTimeout(()=>fail(),15000);
    function fail(){win.clearTimeout(timer);script.remove();turnstileLoading=undefined;reject(new Error('verification_unavailable'));}
    script.onload=()=>{win.clearTimeout(timer);if(win.turnstile?.render)resolve(win.turnstile);else fail();};script.onerror=fail;doc.head.append(script);
  });return turnstileLoading;
}
const css=`:host{color:var(--study-text,#243029);font:16px/1.6 system-ui,sans-serif}*{box-sizing:border-box}dialog{color:inherit;background:var(--study-surface,#fff);width:min(540px,calc(100vw - 24px));max-height:calc(100dvh - 32px);overflow:auto;border:1px solid #b9c3b6;border-radius:18px;padding:24px}dialog::backdrop{background:#101b1466}h2{font-size:24px;line-height:1.3;margin:0 0 12px}p{margin:10px 0}label{display:block;font-weight:600;margin-top:16px}select,textarea,button{font:inherit;color:inherit}select,textarea{display:block;width:100%;border:1px solid #899684;border-radius:8px;background:var(--study-surface,#fff);padding:10px}textarea{min-height:160px;resize:vertical}button{min-height:44px;border:1px solid #899684;border-radius:8px;background:var(--study-surface,#fff);padding:9px 16px;cursor:pointer}button:disabled{opacity:.55;cursor:default}button:focus-visible,textarea:focus-visible,select:focus-visible{outline:3px solid #537a40;outline-offset:3px}.feedback-actions{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:10px;margin-top:18px}.feedback-privacy,.feedback-count{font-size:13px;color:var(--study-muted,#52614e)}.feedback-status{min-height:26px;overflow-wrap:anywhere}.feedback-verification{margin-top:16px;max-width:100%;overflow:hidden}@media(max-width:400px){dialog{padding:18px}.feedback-actions button{flex:1}}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto}}`;

/** Opens only on an explicit user action. Returns a close function. */
export function openFeedbackDialog({config,context}={}){
  const doc=globalThis.document,win=doc.defaultView,previous=doc.activeElement;
  const host=doc.createElement('div');host.className='study-feedback-host';const root=host.attachShadow({mode:'open'});
  const make=(tag,text,className)=>{const node=doc.createElement(tag);if(text!==undefined)node.textContent=text;if(className)node.className=className;return node;};
  const style=make('style',css),dialog=make('dialog');dialog.className='feedback-dialog';dialog.setAttribute('aria-labelledby','feedback-title');
  const title=make('h2','Zpětná vazba');title.id='feedback-title';
  const privacy=make('p','Bez jména a e-mailu. Zpráva se nezveřejní na webu. Provozovatelé služby a ověření mohou vidět tvoji IP adresu. Neposílej hesla, známky ani soukromé školní údaje.','feedback-privacy');privacy.id='feedback-privacy';
  const form=make('form');form.setAttribute('aria-describedby',privacy.id);
  const label=make('label','Druh zprávy');label.htmlFor='feedback-category';const select=make('select');select.id='feedback-category';select.name='category';
  for(const [value,text] of categories){const option=make('option',text);option.value=value;select.append(option);}
  const messageLabel=make('label','Zpráva');messageLabel.htmlFor='feedback-message';const message=make('textarea');message.id='feedback-message';message.name='message';message.required=true;message.minLength=3;message.maxLength=2000;message.autocomplete='off';
  const count=make('p','0 / 2 000 znaků','feedback-count');count.id='feedback-count';message.setAttribute('aria-describedby','feedback-privacy feedback-count');const verification=make('div',undefined,'feedback-verification');
  const status=make('p','','feedback-status');status.setAttribute('role','status');status.setAttribute('aria-live','polite');
  const actions=make('div',undefined,'feedback-actions'),cancel=make('button','Zavřít'),submit=make('button','Odeslat');cancel.type='button';submit.type='submit';submit.disabled=true;actions.append(cancel,submit);
  form.append(label,select,messageLabel,message,count,verification,status,actions);dialog.append(title,privacy,form);root.append(style,dialog);doc.body.append(host);
  let disposed=false,enabled=false,token='',widget,turnstile,pendingPayload,inFlight=false,accepted=false;
  const controller=new AbortController(),settings=feedbackConfig(config);
  const update=()=>{submit.disabled=disposed||!enabled||inFlight||accepted||!token||Boolean(feedbackDraftError(select.value,message.value));count.textContent=`${message.value.length} / 2 000 znaků`;};
  const cleanup=()=>{if(disposed)return;disposed=true;controller.abort();try{if(widget!==undefined)turnstile?.remove?.(widget);}catch{/* Closing must still remove the dialog. */}host.remove();previous?.focus?.({preventScroll:true});};
  cancel.onclick=()=>dialog.close();dialog.addEventListener('close',cleanup);dialog.addEventListener('cancel',()=>{ /* Native Escape closes the modal. */ });
  message.addEventListener('input',()=>{pendingPayload=undefined;const error=feedbackDraftError(select.value,message.value);message.setAttribute('aria-invalid',String(Boolean(error)&&message.value.length>=3));if(enabled&&message.value.length>=3)status.textContent=error||(!token?'Před odesláním dokonči ověření.':'Zpráva je připravená k odeslání.');update();});select.addEventListener('change',()=>{pendingPayload=undefined;update();});
  dialog.showModal();message.focus();
  if(!settings){status.textContent='Zpětná vazba zatím není připojená. Zpráva se nikam neposílá.';select.disabled=true;message.disabled=true;cancel.focus();return ()=>dialog.close();}
  status.textContent='Ověřuji dostupnost formuláře…';
  const timeout=win.setTimeout(()=>controller.abort(),12000);
  win.fetch(`${settings.apiBase}/api/status`,{credentials:'omit',referrerPolicy:'no-referrer',signal:controller.signal}).then(async response=>{
    if(!response.ok)throw new Error('unavailable');const body=await response.json();if(disposed)return;
    if(body.feedback!==true&&body.feedbackEnabled!==true){status.textContent='Příjem zpráv je nyní vypnutý. Zkus to později.';return;}
    win.clearTimeout(timeout);enabled=true;status.textContent='Před odesláním dokonči ověření.';turnstile=await loadTurnstile(win,doc);if(disposed)return;
    widget=turnstile.render(verification,{sitekey:settings.sitekey,action:'feedback',size:'flexible',callback:value=>{token=value;if(pendingPayload)pendingPayload={...pendingPayload,turnstileToken:value};update();},'expired-callback':()=>{token='';status.textContent='Ověření vypršelo. Dokonči ho znovu.';update();},'error-callback':()=>{token='';status.textContent='Ověření se nepodařilo. Zkus jej znovu nebo formulář otevři později.';update();}});update();
  }).catch(()=>{if(!disposed)status.textContent='Formulář se nepodařilo připojit. Zavři ho a zkus to později.';}).finally(()=>win.clearTimeout(timeout));
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(inFlight||!enabled||accepted)return;
    const error=feedbackDraftError(select.value,message.value);if(error){status.textContent=error;message.focus();return;}
    if(!token){status.textContent='Nejprve dokonči ověření.';return;}
    try{pendingPayload??=feedbackPayload({category:select.value,message:message.value,requestId:win.crypto.randomUUID(),turnstileToken:token,context});}catch{status.textContent='Zprávu se nepodařilo připravit. Zkus formulář otevřít znovu.';return;}
    inFlight=true;select.disabled=true;message.disabled=true;status.textContent='Odesílám…';update();
    try{
      const sendController=new AbortController(),sendTimeout=win.setTimeout(()=>sendController.abort(),15000);let result;try{result=await sendFeedback(settings,pendingPayload,{fetcher:win.fetch.bind(win),signal:AbortSignal.any([controller.signal,sendController.signal])});}finally{win.clearTimeout(sendTimeout);}if(disposed)return;
      if(result.accepted){accepted=true;status.textContent='Zpráva byla přijata ke zpracování. To ještě nepotvrzuje její doručení správci.';submit.textContent='Přijato';}
      else{
        const errors={400:'Zpráva neprošla kontrolou. Odstraň osobní údaje, odkazy a přihlašovací údaje.',403:'Ověření nebylo přijato. Dokonči ho znovu.',409:'Toto opakování zprávy nelze přijmout. Zavři formulář a zkontroluj zprávu před dalším pokusem.',429:'Bylo odesláno příliš mnoho zpráv. Počkej a zkus to později.',503:'Příjem zpráv je dočasně nedostupný. Zkus to později.'};
        status.textContent=errors[result.status]||'Odeslání nebylo potvrzeno. Můžeš zopakovat stejný pokus.';
        if([400,403,409].includes(result.status)){pendingPayload=undefined;token='';turnstile?.reset?.(widget);}else if([429,503].includes(result.status)){token='';turnstile?.reset?.(widget);}
      }
    }catch{if(!disposed)status.textContent='Přijetí se nepodařilo ověřit. Opakování odešle stejnou zprávu se stejným identifikátorem.';}
    finally{inFlight=false;if(!disposed){select.disabled=accepted;message.disabled=accepted;update();}}
  });
  return ()=>dialog.close();
}
/** Adds one launcher; callers may move it into their own settings/navigation. */
export function mountFeedback(container,{config,context}={}){
  const button=container.ownerDocument.createElement('button');button.type='button';button.className='feedback-launcher';button.textContent='Napsat zpětnou vazbu';let close;
  button.addEventListener('click',()=>{close?.();close=openFeedbackDialog({config,context});});container.append(button);
  return ()=>{close?.();button.remove();};
}
