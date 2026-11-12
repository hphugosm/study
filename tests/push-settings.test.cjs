const {test}=require('node:test');
const assert=require('node:assert/strict');
const api=import('../src/push-settings.js');
const vapid=Buffer.from([4,...Array(64).fill(1)]).toString('base64url');
const config={apiBase:'https://push.example/',turnstileSiteKey:'public-site-key'};
const prefs={enabled:true,subjects:['law'],categories:['test','solution']};
const id='12345678-1234-1234-1234-123456789abc',token='m'.repeat(43);
globalThis.PushManager=class {};
function fixture(options={}){
 const values=new Map(),calls=[],events=[];let sub=options.existing||null,offline=false;
 const storage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)};
 const created={endpoint:'https://fcm.googleapis.com/test-device',toJSON(){return {endpoint:this.endpoint,keys:{p256dh:vapid,auth:'private-key'}};},async unsubscribe(){events.push('unsubscribe');sub=null;return true;}};
 const notification={permission:'default',async requestPermission(){events.push('permission');return 'granted';}};
 const navigator={userActivation:{isActive:true},serviceWorker:{ready:Promise.resolve({pushManager:{async getSubscription(){return sub;},async subscribe(){events.push('subscribe');sub=created;return created;}}})}};
 const fetcher=async(url,init)=>{calls.push({url,...init});if(offline)throw Error('offline');if(url.endsWith('/api/status'))return {ok:true,text:async()=>JSON.stringify({push:true,vapidPublicKey:vapid})};events.push(init.method);return {ok:true,status:init.method==='POST'?201:200,text:async()=>JSON.stringify(init.method==='POST'?{ok:true,id,managementToken:token}:{ok:true})};};
 return {values,calls,events,storage,notification,navigator,created,setOffline:v=>offline=v,setSub:v=>sub=v,args:{config,preferences:()=>prefs,storage,fetcher,navigator,notification,secure:true,challenge:async options=>{events.push(options.action);return 'challenge-token';}}};
}
test('strict HTTPS configuration and VAPID validation reject redirects/credentials/malformed keys',async()=>{
 const {normalizePushConfig,applicationServerKey}=await api;
 for(const apiBase of ['http://push.example/','https://user:password@push.example/','https://push.example/?token=bad','https://push.example/#x','https://push.example/api'])assert.equal(normalizePushConfig({...config,apiBase}),null);
 assert.equal(normalizePushConfig(config).apiBase,'https://push.example');assert.equal(applicationServerKey(vapid).length,65);
 for(const value of ['',Buffer.alloc(65).toString('base64url'),'secret'])assert.throws(()=>applicationServerKey(value));
});
test('status loading never prompts, loads challenge, or subscribes; unavailable config makes no network calls',async()=>{
 const {createPushSettingsClient}=await api;const f=fixture();const client=createPushSettingsClient(f.args);await client.loadStatus();assert.deepEqual(f.events,[]);assert.equal(f.calls.length,1);
 const disabled=createPushSettingsClient({...f.args,config:{}});assert.equal(await disabled.loadStatus(),null);assert.equal(f.calls.length,1);
 await assert.rejects(client.enable(),{code:'gesture'});assert.deepEqual(f.events,[]);
});
test('explicit enable keeps endpoint/credentials out of URLs and uses only selected preferences',async()=>{
 const {createPushSettingsClient,PUSH_STORAGE_KEY}=await api;const f=fixture();const client=createPushSettingsClient(f.args);const pending=client.enable({userGesture:true});assert.equal(f.events[0],'permission');await pending;
 assert.deepEqual(f.events,['permission','push_subscribe','subscribe','POST']);const post=f.calls.find(c=>c.method==='POST');const body=JSON.parse(post.body);assert.deepEqual(body.preferences,{subjects:['law'],categories:['solution','test']});assert.equal(post.credentials,'omit');assert.equal(post.redirect,'error');assert.equal(body.turnstileToken,'challenge-token');
 assert.ok(f.calls.every(c=>!c.url.includes(token)&&!c.url.includes('test-device')));assert.equal(JSON.parse(f.values.get(PUSH_STORAGE_KEY)).managementToken,token);assert.deepEqual(client.state,{active:true,pendingDelete:false});
});
test('no selected subject or denied permission creates no subscription',async()=>{
 const {createPushSettingsClient}=await api;const f=fixture();const client=createPushSettingsClient({...f.args,preferences:{enabled:true,subjects:[],categories:['test']}});await assert.rejects(client.enable({userGesture:true}),{code:'preferences'});assert.deepEqual(f.events,[]);
 f.notification.permission='denied';await assert.rejects(createPushSettingsClient(f.args).enable({userGesture:true}),{code:'permission'});assert.deepEqual(f.events,[]);
});
test('all registered notification subjects, including literature and history, are valid push choices',async()=>{
 const {subjects}=await import('../src/data.js');const {pushPreferences}=await api;
 const registered=subjects.map(subject=>subject.id);assert.ok(registered.includes('literature'));assert.ok(registered.includes('history'));
 assert.deepEqual(pushPreferences({...prefs,subjects:registered}).subjects,registered.slice().sort());
 assert.deepEqual(pushPreferences({...prefs,subjects:['law','literature','history']}).subjects,['history','law','literature']);
});
test('an existing unrelated browser subscription is never taken over or removed',async()=>{
 const {createPushSettingsClient}=await api;let removed=false;const f=fixture({existing:{endpoint:'https://fcm.googleapis.com/unrelated',unsubscribe(){removed=true;}}});await assert.rejects(createPushSettingsClient(f.args).enable({userGesture:true}),{code:'unowned'});assert.equal(removed,false);assert.ok(!f.events.includes('POST'));
});
test('update authenticates with local management token; failed updates preserve recovery credentials',async()=>{
 const {createPushSettingsClient,PUSH_STORAGE_KEY}=await api;const f=fixture();const client=createPushSettingsClient(f.args);await client.enable({userGesture:true});await client.update();const patch=f.calls.find(c=>c.method==='PATCH');assert.equal(patch.headers.Authorization,'Bearer '+token);assert.deepEqual(JSON.parse(patch.body),{id,preferences:{subjects:['law'],categories:['solution','test']}});assert.equal(f.events.filter(x=>x==='push_subscribe').length,1);
 const saved=f.values.get(PUSH_STORAGE_KEY);f.setOffline(true);await assert.rejects(client.update(),{code:'network'});assert.equal(f.values.get(PUSH_STORAGE_KEY),saved);
});
test('offline deletion retains pending retry and never unsubscribes before server confirmation',async()=>{
 const {createPushSettingsClient,PUSH_STORAGE_KEY}=await api;const f=fixture();const client=createPushSettingsClient(f.args);await client.enable({userGesture:true});f.setOffline(true);await assert.rejects(client.disable(),{code:'network'});assert.equal(client.state.pendingDelete,true);assert.equal(f.events.includes('unsubscribe'),false);assert.ok(f.values.has(PUSH_STORAGE_KEY));
 f.setOffline(false);await client.disable();assert.ok(f.events.indexOf('DELETE')<f.events.indexOf('unsubscribe'));assert.equal(f.values.has(PUSH_STORAGE_KEY),false);assert.equal(client.state,null);
});
test('retry after browser unsubscribe failure does not repeat confirmed server delete',async()=>{
 const {createPushSettingsClient}=await api;const f=fixture();const client=createPushSettingsClient(f.args);await client.enable({userGesture:true});const original=f.created.unsubscribe;f.created.unsubscribe=async()=>false;await assert.rejects(client.disable(),{code:'unsubscribe'});f.created.unsubscribe=original;await client.disable();assert.equal(f.calls.filter(c=>c.method==='DELETE').length,1);
});
test('deleting stored owned registration leaves a replacement browser subscription alone',async()=>{
 const {createPushSettingsClient}=await api;const f=fixture();const client=createPushSettingsClient(f.args);await client.enable({userGesture:true});let removed=false;f.setSub({endpoint:'https://fcm.googleapis.com/replacement',unsubscribe(){removed=true;}});await client.disable();assert.equal(removed,false);assert.equal(client.state,null);
});
test('malformed or different-server local state cannot trigger management or browser deletion',async()=>{
 const {createPushSettingsClient,PUSH_STORAGE_KEY}=await api;const f=fixture();f.values.set(PUSH_STORAGE_KEY,JSON.stringify({schema:1,managementToken:token,apiBase:'https://other.example'}));const client=createPushSettingsClient(f.args);assert.equal(client.invalidState,true);await assert.rejects(client.disable(),{code:'local_state'});assert.deepEqual(f.calls,[]);assert.deepEqual(f.events,[]);
});
test('failed subscription registration rolls back only the newly created browser subscription',async()=>{
 const {createPushSettingsClient}=await api;const f=fixture();const client=createPushSettingsClient({...f.args,fetcher:async(url,init)=>init.method==='POST'?{ok:false,status:503}:f.args.fetcher(url,init)});await assert.rejects(client.enable({userGesture:true}),{code:'unavailable'});assert.ok(f.events.includes('unsubscribe'));assert.equal(client.state,null);
});
test('preference changes stay local until explicit update; empty/off selection deletes server and browser',async()=>{
 const {createPushSettingsClient}=await api;
 for(const next of [{...prefs,enabled:false},{...prefs,subjects:[]},{...prefs,categories:[]}]){
  const f=fixture();let current=prefs;const client=createPushSettingsClient({...f.args,preferences:()=>current});await client.enable({userGesture:true});assert.equal(client.dirty,false);current=next;assert.equal(client.dirty,true);assert.equal(f.calls.some(c=>c.method==='DELETE'),false);await client.update();assert.equal(client.state,null);assert.ok(f.events.includes('DELETE'));assert.ok(f.events.includes('unsubscribe'));
 }
});
test('storage quota failure after registration retains credentials in memory for explicit safe removal',async()=>{
 const {createPushSettingsClient}=await api;const f=fixture();let writes=0;
 const storage={...f.storage,setItem(k,v){if(++writes>1)throw Error('quota');f.storage.setItem(k,v);}};
 const client=createPushSettingsClient({...f.args,storage});await assert.rejects(client.enable({userGesture:true}),{code:'storage'});assert.ok(client.state);await client.disable();assert.equal(client.state,null);assert.ok(f.events.indexOf('DELETE')<f.events.indexOf('unsubscribe'));
});
