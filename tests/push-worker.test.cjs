const test=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const source=fs.readFileSync(require('node:path').join(__dirname,'../sw.js'),'utf8');
function worker(){
 const handlers={},shown=[],opened=[],navigated=[];
 const client={url:'https://studilo.xyz/#/subjects',navigate:async url=>navigated.push(url),focus:async()=>{},postMessage:()=>{}};
 const self={registration:{scope:'https://studilo.xyz/',showNotification:async(...args)=>shown.push(args)},location:{origin:'https://studilo.xyz'},addEventListener:(name,fn)=>handlers[name]=fn,clients:{matchAll:async()=>[client],openWindow:async url=>opened.push(url)}};
 vm.runInNewContext(source,{self,URL,URLSearchParams,Uint8Array,setTimeout,clearTimeout,Response,crypto:globalThis.crypto});
 async function emit(name,extra){let promise;handlers[name]({...extra,waitUntil:p=>promise=p});await promise;}
 return {handlers,shown,opened,navigated,emit};
}
const payload={schema:1,id:'a'.repeat(64),title:'Studilo: blíží se termín',body:'Quiz 2',expiresAt:Date.now()+3600000,url:'#/units/law-unit-2?tab=tasks&assignment='+'b'.repeat(64)};
test('push accepts canonical assignment links and uses one stable notification tag',async()=>{
 const w=worker();for(let i=0;i<2;i++)await w.emit('push',{data:{json:()=>payload}});
 assert.equal(w.shown.length,2);assert.equal(w.shown[0][1].tag,w.shown[1][1].tag);assert.equal(w.shown[0][1].renotify,false);
 let closed=false;await w.emit('notificationclick',{notification:{data:w.shown[0][1].data,close:()=>closed=true}});
 assert.equal(closed,true);assert.deepEqual(w.navigated,['https://studilo.xyz/'+payload.url]);assert.deepEqual(w.opened,[]);
});
test('malformed push content and cross-origin or injected destinations never display or open',async()=>{
 const w=worker();
 for(const patch of [{url:'https://evil.example/#/units/law-unit-2'},{url:'#/units/law-unit-2?redirect=https://evil.example'},{url:'#/units/law-unit-2?tab=tasks&tab=tools'},{body:'<script>bad</script>'},{id:'not-an-id'},{schema:2}])await w.emit('push',{data:{json:()=>({...payload,...patch})}});
 await w.emit('push',{data:{json:()=>{throw Error();}}});
 await w.emit('notificationclick',{notification:{data:{hash:'https://evil.example/'},close:()=>{}}});
 assert.equal(w.shown.length,0);assert.equal(w.navigated.length,0);assert.equal(w.opened.length,0);
});
test('live notification snapshots bypass the immutable offline snapshot',()=>{
 const w=worker();let intercepted=false;
 w.handlers.fetch({request:{method:'GET',url:'https://studilo.xyz/notifications.json?v=anything'},respondWith:()=>intercepted=true});
 assert.equal(intercepted,false);
});
test('delayed offline delivery cannot display or open an expired reminder',async()=>{
 const w=worker();
 for(const expiresAt of [undefined,0,Date.now()-1,NaN,'tomorrow'])await w.emit('push',{data:{json:()=>({...payload,expiresAt})}});
 await w.emit('notificationclick',{notification:{data:{hash:payload.url,expiresAt:Date.now()-1},close:()=>{}}});
 assert.equal(w.shown.length,0);assert.equal(w.navigated.length,0);assert.equal(w.opened.length,0);
});
