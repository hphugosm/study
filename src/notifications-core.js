/** Device-local notification ledger. No permissions, network, or user identifiers. */
const CATEGORIES=['material','solution','deadline','test','notes','external'];
const MAX_ITEMS=2000,MAX_NOTICES=100;
const integer=n=>Number.isSafeInteger(n)&&n>=0;
const text=(v,max)=>typeof v==='string'&&v.trim().length>0&&v.length<=max&&!/[<>\u0000-\u001f]/.test(v);
const key=v=>text(v,200)&&/^[a-zA-Z0-9:_-]+$/.test(v);
const safeURL=v=>typeof v==='string'&&v.length<=1000&&/^#\/(?:units|events)\/[a-zA-Z0-9_-]+(?:\?[^\s<>]*)?$/.test(v);
export function normalizeSnapshot(snapshot){
 if(snapshot?.schema!==1||snapshot.revision!==undefined&&!/^[a-f0-9]{64}$/.test(snapshot.revision)||!Array.isArray(snapshot.items)||snapshot.items.length>MAX_ITEMS)throw new Error('invalid_notification_snapshot');
 const ids=new Set();const items=snapshot.items.map(item=>{
  if(!key(item?.id)||ids.has(item.id)||!key(item.version)||!key(item.subject)||!CATEGORIES.includes(item.category)||!text(item.title,500)||!safeURL(item.url)||item.due!==undefined&&(!integer(item.due)||item.due===0))throw new Error('invalid_notification_item');
  if(['deadline','test'].includes(item.category)&&item.due===undefined)throw new Error('notification_due_missing');
  ids.add(item.id);return {id:item.id,version:item.version,subject:item.subject,category:item.category,title:item.title,url:item.url,...(item.due!==undefined?{due:item.due}:{})};
 });return {schema:1,...(snapshot.revision?{revision:snapshot.revision}:{}),items};
}
export function normalizePreferences(prefs={}){
 const subjects=prefs.subjects??[],categories=prefs.categories??CATEGORIES;
 if(!Array.isArray(subjects)||subjects.some(s=>!key(s))||!Array.isArray(categories)||categories.some(c=>!CATEGORIES.includes(c)))throw new Error('invalid_notification_preferences');
 const reminder_seconds=prefs.reminder_seconds??86400;if(!integer(reminder_seconds)||reminder_seconds>604800)throw new Error('invalid_notification_preferences');
 return {enabled:prefs.enabled===true,subjects:[...new Set(subjects)],categories:[...new Set(categories)],reminder_seconds};
}
const empty=()=>({schema:1,baseline:false,seen:{},reminded:{},notifications:[]});
export function restoreLedger(serialized){
 if(serialized===null||serialized===undefined||serialized==='')return {status:'missing',state:empty()};
 try{const value=typeof serialized==='string'?JSON.parse(serialized):structuredClone(serialized);
  if(value?.schema!==1||typeof value.baseline!=='boolean'||!value.seen||typeof value.seen!=='object'||Array.isArray(value.seen)||!value.reminded||typeof value.reminded!=='object'||Array.isArray(value.reminded)||!Array.isArray(value.notifications)||value.notifications.length>MAX_NOTICES||Object.keys(value.seen).length>MAX_ITEMS||Object.keys(value.reminded).length>MAX_ITEMS)throw Error();
  for(const [id,item]of Object.entries(value.seen))if(!key(id)||!key(item?.version)||item.due!==undefined&&!integer(item.due))throw Error();
  for(const [id,due]of Object.entries(value.reminded))if(!key(id)||!integer(due))throw Error();
  for(const notice of value.notifications)if(!key(notice?.id)||!key(notice.itemId)||!key(notice.version)||!key(notice.subject)||!CATEGORIES.includes(notice.category)||!text(notice.title,500)||!safeURL(notice.url)||!integer(notice.created_at)||typeof notice.read!=='boolean'||!['new','updated','deadline_changed','reminder'].includes(notice.reason)||notice.due!==undefined&&!integer(notice.due))throw Error();
  if(new Set(value.notifications.map(n=>n.id)).size!==value.notifications.length)throw Error();
  return {status:'ok',state:{schema:1,baseline:value.baseline,seen:value.seen,reminded:value.reminded,notifications:value.notifications}};
 }catch{return {status:'reset_required',state:empty()};}
}
export function reconcileNotifications(snapshot,ledger,prefs={},now){
 const source=normalizeSnapshot(snapshot),options=normalizePreferences(prefs);if(!integer(now))throw new Error('invalid_notification_time');
 const restored=restoreLedger(ledger),state=restored.state;
 const seen=Object.fromEntries(source.items.map(item=>[item.id,{version:item.version,...(item.due!==undefined?{due:item.due}:{})}]));
 if(!options.enabled)return {status:restored.status,state:{...state,seen},unread:state.notifications.filter(n=>!n.read).length};
 if(!state.baseline)return {status:restored.status==='reset_required'?'reset_required':'baselined',state:{...empty(),baseline:true,seen},unread:0};
 const selected=item=>options.subjects.includes(item.subject)&&options.categories.includes(item.category);
 const current=new Map(source.items.map(item=>[item.id,item]));
 let notices=state.notifications.filter(n=>selected(n)&&current.has(n.itemId)&&!(n.reason==='reminder'&&current.get(n.itemId).due!==n.due));
 const reminded=Object.fromEntries(Object.entries(state.reminded).filter(([id,due])=>current.get(id)?.due===due));
 const add=(item,reason)=>{
  const id=[item.id,item.version,reason,item.due??0].join(':');
  if(!notices.some(n=>n.id===id))notices.push({...item,id,itemId:item.id,reason,created_at:now,read:false});
 };
 for(const item of source.items){
  if(!selected(item))continue;
  const previous=state.seen[item.id],timed=item.due!==undefined;
  if(timed&&item.due<=now)continue;
  if(!previous){add(item,'new');if(timed&&item.due-now<=options.reminder_seconds)reminded[item.id]=item.due;continue;}
  if(timed&&previous.due!==item.due){
   notices=notices.filter(n=>n.itemId!==item.id);add(item,'deadline_changed');
  }else if(previous.version!==item.version&&!timed)add(item,'updated');
  if(timed&&item.due-now<=options.reminder_seconds&&reminded[item.id]!==item.due){
   // A changed-deadline notice already conveys the upcoming instant.
   if(previous.due===item.due)add(item,'reminder');reminded[item.id]=item.due;
  }
 }
 notices=notices.sort((a,b)=>b.created_at-a.created_at||a.id.localeCompare(b.id)).slice(0,MAX_NOTICES);
 return {status:restored.status,state:{schema:1,baseline:true,seen,reminded,notifications:notices},unread:notices.filter(n=>!n.read).length};
}
export function markNotificationRead(ledger,id){const restored=restoreLedger(ledger);return {...restored.state,notifications:restored.state.notifications.map(n=>id===undefined||n.id===id?{...n,read:true}:n)};}
