const {test}=require('node:test');
const assert=require('node:assert/strict');

test('portable progress export excludes push credentials and restore never overwrites device subscription',async()=>{
 const {buildBackup,exportProgress,parseBackup,restoreBackup}=await import('../src/backup.js');
 const {PUSH_STORAGE_KEY}=await import('../src/push-settings.js');
 const secret={schema:1,id:'12345678-1234-1234-1234-123456789abc',managementToken:'private-management-secret',endpoint:'https://push.example/private-device'};
 const values=new Map([[PUSH_STORAGE_KEY,JSON.stringify(secret)],['study:notifications:preferences:v1',JSON.stringify({enabled:true,subjects:['law']})]]);
 const before=[...values];const storage={getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value),removeItem:key=>values.delete(key)};
 const portable=buildBackup(storage);assert.deepEqual(portable.data,{});
 let downloaded;
 const previous={document:global.document,timeout:global.setTimeout,create:URL.createObjectURL,revoke:URL.revokeObjectURL};
 try{
  global.document={createElement:()=>({click(){},remove(){}}),body:{append(){}}};
  global.setTimeout=fn=>{fn();return 0;};URL.createObjectURL=blob=>{downloaded=blob;return 'blob:local-progress';};URL.revokeObjectURL=()=>{};
  exportProgress(storage);
 }finally{global.document=previous.document;global.setTimeout=previous.timeout;URL.createObjectURL=previous.create;URL.revokeObjectURL=previous.revoke;}
 const exported=await downloaded.text();
 assert.ok(!exported.includes(secret.managementToken));assert.ok(!exported.includes(secret.endpoint));assert.ok(!exported.includes(PUSH_STORAGE_KEY));
 restoreBackup(parseBackup(exported),storage);assert.deepEqual([...values],before);
 assert.throws(()=>parseBackup(JSON.stringify({...portable,data:{[PUSH_STORAGE_KEY]:secret}})));
});
