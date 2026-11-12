const {test}=require('node:test');const assert=require('node:assert/strict');
const api=import('../src/notifications-core.js');
const item=(id='a',extra={})=>({id:id.repeat(64),version:'b'.repeat(64),subject:'law',category:'material',title:'Class material',url:'#/units/law-unit-2',...extra});
const snapshot=items=>({schema:1,revision:'f'.repeat(64),items});
const prefs={enabled:true,subjects:['law'],categories:['material','solution','deadline','test','notes','external'],reminder_seconds:100};
async function run(items,state=null,now=1000,options=prefs){return (await api).reconcileNotifications(snapshot(items),state,options,now);}
test('first enable and corrupt storage baseline without historical flood',async()=>{
 for(const state of [null,'not json',JSON.stringify({schema:8})]){const result=await run([item(),item('c',{category:'test',due:1100})],state);assert.equal(result.unread,0);assert.equal(result.state.baseline,true);}
 assert.equal((await api).restoreLedger('not json').status,'reset_required');
});
test('new material, source update, study solution and repeated sync are idempotent',async()=>{
 const base=await run([]);const first=await run([item(),item('c',{category:'solution'})],base.state);assert.equal(first.unread,2);
 const repeat=await run([item(),item('c',{category:'solution'})],first.state);assert.deepEqual(repeat.state,first.state);
 const changed=await run([item('a',{version:'d'.repeat(64)}),item('c',{category:'solution'})],repeat.state);assert.equal(changed.unread,3);
 const read=(await api).markNotificationRead(changed.state);assert.ok(read.notifications.every(n=>n.read));assert.equal(changed.state.notifications[0].read,false);
});
test('canonical source identity rejects alias duplicates rather than double-notifying',async()=>{
 const {normalizeSnapshot}=await api;assert.throws(()=>normalizeSnapshot(snapshot([item(),{...item(),url:'#/events/law-test'}])));
});
test('changed deadline replaces obsolete reminder without affecting unrelated event',async()=>{
 const timed=item('a',{category:'test',due:1090});let result=await run([timed]);result=await run([timed],result.state);assert.equal(result.state.notifications[0].reason,'reminder');
 result=await run([{...timed,version:'e'.repeat(64),due:1200}],result.state);assert.equal(result.state.notifications.length,1);assert.equal(result.state.notifications[0].reason,'deadline_changed');assert.equal(result.state.notifications[0].due,1200);
 result=await run([{...timed,version:'e'.repeat(64),due:1200}],result.state);assert.equal(result.state.notifications.length,1);
});
test('past tasks never generate reminders, precise UTC instant remains unchanged',async()=>{
 let result=await run([]);result=await run([item('a',{category:'test',due:999}),item('c',{category:'deadline',due:1001})],result.state);assert.equal(result.state.notifications.length,1);assert.equal(result.state.notifications[0].due,1001);result=await run([item('c',{category:'deadline',due:1001})],result.state,1000);assert.equal(result.state.notifications.length,1);
 result=await run([item('c',{category:'deadline',due:1001})],result.state,1002);assert.equal(result.state.notifications.filter(n=>n.reason==='reminder').length,0);
});
test('subject/category opt-outs and disabled observation do not flood on reenable',async()=>{
 let result=await run([]);result=await run([item()],result.state,1000,{...prefs,subjects:[]});result=await run([item()],result.state);assert.equal(result.unread,0);
 result=await run([item(),item('c')],result.state,1001,{...prefs,enabled:false});result=await run([item(),item('c')],result.state);assert.equal(result.unread,0);
});
test('invalid external routes, duplicate identity, unsafe title and invalid time rejected',async()=>{
 const {normalizeSnapshot}=await api;
 for(const rows of [[item(),item()],[item('a',{url:'https://evil.invalid'})],[item('a',{title:'<script>'})],[item('a',{category:'test',due:0})]])assert.throws(()=>normalizeSnapshot(snapshot(rows)));
 await assert.rejects(run([],null,-1));
});
test('ledger remains bounded and rejects corrupted notice state',async()=>{
 let state=(await run([])).state;
 for(let batch=0;batch<2;batch++){const items=Array.from({length:150},(_,i)=>item((i+1).toString(16).padStart(64,'0'),{id:(i+1).toString(16).padStart(64,'0'),version:(batch+1).toString(16).repeat(64)}));state=(await run(items,state,1000+batch)).state;}
 assert.equal(state.notifications.length,100);assert.equal((await api).restoreLedger({...state,notifications:[{bad:true}]}).status,'reset_required');
});
