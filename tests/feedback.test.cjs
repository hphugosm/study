const test=require('node:test');
const assert=require('node:assert/strict');
const load=()=>import('../src/feedback.js');
const id='f47ac10b-58cc-4372-a567-0e02b2c3d479';
const draft={category:'content',message:'Vzorec ve druhém příkladu potřebuje kontrolu.',requestId:id,turnstileToken:'verified-token'};

test('feedback is disabled unless an explicit safe API and public sitekey are configured',async()=>{
 const {feedbackConfig}=await load();
 for(const config of [undefined,{}, {apiBase:'https://api.example'}, {apiBase:'https://user:secret@api.example',sitekey:'key'}, {apiBase:'https://api.example?token=secret',sitekey:'key'}, {apiBase:'javascript:alert(1)',sitekey:'key'},{apiBase:'http://api.example',sitekey:'key'}])assert.equal(feedbackConfig(config,'https://studilo.xyz'),null);
 assert.deepEqual(feedbackConfig({apiBase:'https://api.example/',turnstileSiteKey:'public-key'},'https://studilo.xyz'),{apiBase:'https://api.example',sitekey:'public-key'});
 assert.equal(feedbackConfig({apiBase:'http://localhost:8787',sitekey:'key'},'https://studilo.xyz'),null);
 assert.deepEqual(feedbackConfig({apiBase:'http://localhost:8787',sitekey:'key'},'http://localhost:4173'),{apiBase:'http://localhost:8787',sitekey:'key'});
});
test('draft limits and categories reject contacts, links, markup and obvious credentials',async()=>{
 const {feedbackDraftError}=await load();
 assert.equal(feedbackDraftError('idea','abc'),'');assert.equal(feedbackDraftError('other','a'.repeat(2000)),'');
 for(const [category,message] of [['unknown','hello'],['bug',' a '],['bug','a'.repeat(2001)],['bug','kontakt@example.cz'],['bug','Viz https://school.example'],['bug','<img src=x>'],['bug','heslo=secret'],['bug','token:abc'],['bug','text\u0000abc']])assert.ok(feedbackDraftError(category,message));
});
test('payload strips unknown fields and includes only an exact catalog subject-topic pair',async()=>{
 const {feedbackPayload,feedbackContext}=await load();
 const {courseUnits}=await import('../src/course-catalog.js');const unit=courseUnits.find(x=>x.topicId);
 const context={subject:unit.subjectId,topic:unit.topicId,email:'private@example.cz',url:'https://private.example'};
 const payload=feedbackPayload({...draft,message:'  Zkontrolujte prosím tento vzorec.  ',context,email:'private@example.cz',attachment:'hidden'});
 assert.deepEqual(Object.keys(payload).sort(),['category','message','requestId','subject','topic','turnstileToken'].sort());assert.equal(payload.message,'Zkontrolujte prosím tento vzorec.');
 assert.deepEqual(feedbackContext({subject:'invented',topic:unit.topicId}),{});assert.deepEqual(feedbackContext({subject:unit.subjectId,topic:'invented'}),{});assert.deepEqual(feedbackContext({subject:unit.subjectId}),{});
 assert.deepEqual(feedbackContext({subjectId:unit.subjectId,topicId:unit.topicId}),{subject:unit.subjectId,topic:unit.topicId});
 assert.throws(()=>feedbackPayload({...draft,requestId:'not-a-uuid'}));assert.throws(()=>feedbackPayload({...draft,turnstileToken:''}));
});
test('accepted means exactly HTTP202, with anonymous transport and no response body disclosure',async()=>{
 const {feedbackPayload,sendFeedback}=await load();const payload=feedbackPayload(draft);const calls=[];
 const fetcher=async(url,options)=>{calls.push({url,options});return {status:202};};
 assert.deepEqual(await sendFeedback({apiBase:'https://api.example'},payload,{fetcher}),{accepted:true});
 assert.equal(calls[0].url,'https://api.example/api/feedback');assert.equal(calls[0].options.credentials,'omit');assert.equal(calls[0].options.referrerPolicy,'no-referrer');assert.equal(calls[0].options.redirect,'error');assert.deepEqual(JSON.parse(calls[0].options.body),payload);assert.deepEqual(calls[0].options.headers,{'Content-Type':'application/json'});
 for(const status of [200,400,403,409,429,503])assert.deepEqual(await sendFeedback({apiBase:'https://api.example'},payload,{fetcher:async()=>({status})}),{accepted:false,status});
});
test('ambiguous network retries can reuse the exact body and request ID without implicit retries',async()=>{
 const {sendFeedback,feedbackPayload}=await load();const bodies=[];const payload=feedbackPayload(draft);let count=0;const fetcher=async(_,opts)=>{bodies.push(opts.body);if(++count===1)throw Error('offline');return {status:202};};
 await assert.rejects(sendFeedback({apiBase:'https://api.example'},payload,{fetcher}));assert.equal(count,1);
 assert.deepEqual(await sendFeedback({apiBase:'https://api.example'},payload,{fetcher}),{accepted:true});assert.equal(bodies[0],bodies[1]);assert.equal(JSON.parse(bodies[1]).requestId,id);
});

// Small DOM harness exercises lifecycle and requests without loading third parties.
function domHarness(fetcher){
 class Node{
  constructor(tag){this.tagName=tag;this.children=[];this.handlers={};this.attributes={};this.value='';this.ownerDocument=doc;}
  append(...nodes){this.children.push(...nodes);for(const n of nodes)n.parent=this;if(this.tagName==='select'&&!this.value)this.value=nodes[0]?.value||'';}
  setAttribute(k,v){this.attributes[k]=v;}
  addEventListener(type,fn){this.handlers[type]=fn;}
  attachShadow(){return this.shadowRoot=new Node('shadow');}
  showModal(){this.open=true;}
  close(){this.open=false;this.handlers.close?.();}
  remove(){if(this.parent)this.parent.children=this.parent.children.filter(x=>x!==this);}
  focus(){doc.activeElement=this;}
 }
 const doc={activeElement:{focus(){doc.restored=true;}},createElement:tag=>new Node(tag)};
 doc.body=new Node('body');doc.head=new Node('head');const widget={};
 doc.defaultView={fetch:fetcher,setTimeout,clearTimeout,crypto:require('node:crypto').webcrypto,turnstile:{render(node,options){widget.options=options;return 1;},remove(){widget.removed=true;},reset(){widget.reset=true;}}};
 const walk=(node,predicate)=>predicate(node)?node:[...node.children,...(node.shadowRoot?[node.shadowRoot]:[])].map(n=>walk(n,predicate)).find(Boolean);
 return {doc,widget,find:predicate=>walk(doc.body,predicate)};
}
test('opening an unconfigured dialog makes no request and closing restores focus',async()=>{
 const {openFeedbackDialog}=await load();let requests=0;const env=domHarness(async()=>{requests++;});const saved=global.document;global.document=env.doc;
 try{const close=openFeedbackDialog();assert.equal(requests,0);assert.equal(env.doc.head.children.length,0);assert.equal(env.find(n=>n.tagName==='textarea').disabled,true);close();assert.equal(env.doc.body.children.length,0);assert.equal(env.doc.restored,true);}finally{global.document=saved;}
});
test('disabled backend never renders CAPTCHA or posts, and configured flow accepts only after verification',async()=>{
 const {openFeedbackDialog}=await load();const savedDoc=global.document,savedLocation=global.location;global.location={origin:'https://studilo.xyz'};
 try{
  let calls=[];let env=domHarness(async(url,options)=>{calls.push({url,options});return {ok:true,json:async()=>({feedback:false})};});global.document=env.doc;
  let close=openFeedbackDialog({config:{apiBase:'https://api.example',sitekey:'public'}});await new Promise(resolve=>setImmediate(resolve));assert.equal(calls.length,1);assert.equal(env.widget.options,undefined);assert.equal(env.doc.head.children.length,0);close();
  calls=[];env=domHarness(async(url,options)=>{calls.push({url,options});return url.endsWith('/api/status')?{ok:true,json:async()=>({feedback:true})}:{status:202};});global.document=env.doc;
  close=openFeedbackDialog({config:{apiBase:'https://api.example',sitekey:'public'}});await new Promise(resolve=>setImmediate(resolve));
  const form=env.find(n=>n.tagName==='form'),textarea=env.find(n=>n.tagName==='textarea'),submit=env.find(n=>n.type==='submit');textarea.value='Prosím o kontrolu příkladu.';textarea.handlers.input();assert.equal(submit.disabled,true);assert.equal(env.widget.options.action,'feedback');
  env.widget.options.callback('verified-token');assert.equal(submit.disabled,false);await form.handlers.submit({preventDefault(){}});assert.equal(calls.length,2);assert.equal(calls[1].options.method,'POST');assert.equal(submit.textContent,'Přijato');assert.equal(submit.disabled,true);assert.match(env.find(n=>n.className==='feedback-status').textContent,/nepotvrzuje/);close();assert.equal(env.widget.removed,true);
 }finally{global.document=savedDoc;global.location=savedLocation;}
});
test('rate-limited attempts refresh proof while preserving the semantic request identity',async()=>{
 const {openFeedbackDialog}=await load();const savedDoc=global.document,savedLocation=global.location;global.location={origin:'https://studilo.xyz'};const bodies=[];
 const env=domHarness(async(url,options)=>{if(url.endsWith('/api/status'))return {ok:true,json:async()=>({feedback:true})};bodies.push(JSON.parse(options.body));return {status:bodies.length===1?429:202};});global.document=env.doc;
 try{const close=openFeedbackDialog({config:{apiBase:'https://api.example',sitekey:'public'}});await new Promise(resolve=>setImmediate(resolve));const form=env.find(n=>n.tagName==='form'),textarea=env.find(n=>n.tagName==='textarea'),submit=env.find(n=>n.type==='submit');textarea.value='Prosím zkontrolujte tento příklad.';textarea.handlers.input();env.widget.options.callback('first-proof');await form.handlers.submit({preventDefault(){}});assert.equal(env.widget.reset,true);assert.equal(submit.disabled,true);env.widget.options.callback('fresh-proof');await form.handlers.submit({preventDefault(){}});assert.equal(bodies.length,2);assert.equal(bodies[0].requestId,bodies[1].requestId);assert.equal(bodies[0].message,bodies[1].message);assert.equal(bodies[1].turnstileToken,'fresh-proof');close();}finally{global.document=savedDoc;global.location=savedLocation;}
});
