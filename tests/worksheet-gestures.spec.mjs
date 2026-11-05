import {test,expect} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
import {worksheetLayout} from '../modules/math-worksheets/layout.js';
import {worksheetData} from '../modules/math-worksheets/data.js';

test.use({trace:'off'});
test.beforeEach(async({},testInfo)=>{test.skip(!testInfo.project.use.hasTouch,'Gesture scenarios require a touch device.');});
const source='Opakovani_gonio__ne_rovnice.pdf';
async function openReader(page){
  await page.goto('./#/units/trig-equations?mode=worksheets');
  const host=page.locator('[data-study-module="math-equations"]'),viewport=host.locator('#worksheet-viewport');
  await expect(viewport).toBeVisible();
  await expect(viewport).toHaveAttribute('data-ready','true');
  await expect(host.locator('button[data-exercise-id]').first()).toHaveCSS('position','absolute');
  await expect.poll(()=>host.locator('.worksheet-page-image').evaluateAll(images=>images.length>0&&images.every(image=>image.complete&&image.naturalWidth>0))).toBe(true);
  await viewport.scrollIntoViewIfNeeded();
  return{host,viewport};
}
async function state(viewport){return viewport.evaluate(el=>({scale:Number(el.dataset.scale),gesture:el.dataset.gesture,left:el.scrollLeft,top:el.scrollTop,width:el.clientWidth,height:el.clientHeight,scrollWidth:el.scrollWidth,scrollHeight:el.scrollHeight}));}
async function locationAt(viewport,point,pageIndex=null){return viewport.evaluate((el,{point:p,pageIndex})=>{const images=[...el.querySelectorAll('.worksheet-page')].map(page=>({index:Number(page.dataset.sourcePage),box:page.querySelector('img').getBoundingClientRect()}));const item=pageIndex===null?(images.find(item=>p.y>=item.box.top&&p.y<=item.box.bottom)||images.sort((a,b)=>Math.min(Math.abs(p.y-a.box.top),Math.abs(p.y-a.box.bottom))-Math.min(Math.abs(p.y-b.box.top),Math.abs(p.y-b.box.bottom)))[0]):images.find(item=>item.index===pageIndex);return{pageIndex:item.index,x:(p.x-item.box.x)/item.box.width,y:(p.y-item.box.y)/item.box.height,width:item.box.width,height:item.box.height};},{point,pageIndex});}
async function center(viewport){const box=await viewport.boundingBox();return{x:box.x+box.width/2,y:box.y+Math.min(box.height*.4,170)};}
async function centerOfViewport(viewport){const box=await viewport.boundingBox();return{x:box.x+box.width/2,y:box.y+box.height/2};}
async function assertMap(host){
  const values=await host.locator('button[data-exercise-id]').evaluateAll(buttons=>buttons.map(button=>{const r=button.getBoundingClientRect(),p=button.closest('.worksheet-page').querySelector('img').getBoundingClientRect();return{id:button.dataset.exerciseId,x:(r.x-p.x)/p.width,y:(r.y-p.y)/p.height,w:r.width/p.width,h:r.height/p.height};}));
  expect(values).toHaveLength(104);
  for(const item of values){const map=worksheetLayout.exercises.find(record=>record.id===item.id),paper=worksheetLayout.pages.find(record=>record.source_file===source&&record.page_index===map.page_index),[x0,y0,x1,y1]=map.bbox;expect(item.x,item.id).toBeCloseTo(x0/paper.width,3);expect(item.y,item.id).toBeCloseTo(y0/paper.height,3);expect(item.w,item.id).toBeCloseTo((x1-x0)/paper.width,3);expect(item.h,item.id).toBeCloseTo((y1-y0)/paper.height,3);}
}

/** Send browser input events, never application gesture functions. WebKit has no CDP multi-touch transport. */
async function touchDriver(page,browserName){
  if(browserName==='chromium'){
    const session=await page.context().newCDPSession(page);
    const send=(type,points)=>session.send('Input.dispatchTouchEvent',{type,touchPoints:points.map(point=>({...point,radiusX:4,radiusY:4,force:1})),modifiers:0});
    return{start:points=>send('touchStart',points),move:points=>send('touchMove',points),end:()=>send('touchEnd',[]),cancel:()=>send('touchCancel',[]),dispose:()=>session.detach()};
  }
  async function dispatch(type,points){
    await page.evaluate(({type,points})=>{
      const active=window.__worksheetQAPointers||(window.__worksheetQAPointers=new Map());
      function targetAt(x,y){let target=document.elementFromPoint(x,y);for(let depth=0;target?.shadowRoot&&depth<8;depth++){const next=target.shadowRoot.elementFromPoint(x,y);if(!next||next===target)break;target=next;}return target;}
      const list=type==='pointerup'||type==='pointercancel'?(points.length?points.map(point=>active.get(point.id)).filter(Boolean):[...active.values()]):points;
      for(const point of list){
        let saved=active.get(point.id);
        if(type==='pointerdown'){saved={...point,target:targetAt(point.x,point.y)};active.set(point.id,saved);}
        if(!saved)continue;
        const data={...saved,...point};
        saved.target.dispatchEvent(new PointerEvent(type,{pointerId:data.id,pointerType:'touch',isPrimary:data.id===1,clientX:data.x,clientY:data.y,button:0,buttons:type==='pointerup'||type==='pointercancel'?0:1,bubbles:true,composed:true,cancelable:true}));
        if(type==='pointerup'||type==='pointercancel')active.delete(data.id);else active.set(data.id,{...saved,...point});
      }
    },{type,points});
  }
  return{start:points=>dispatch('pointerdown',points),move:points=>dispatch('pointermove',points),end:()=>dispatch('pointerup',[]),endOne:id=>dispatch('pointerup',[{id}]),cancel:()=>dispatch('pointercancel',[]),dispose:async()=>{}};
}
async function pinch(driver,anchor,from=30,to=72){
  await driver.start([{id:1,x:anchor.x-from,y:anchor.y},{id:2,x:anchor.x+from,y:anchor.y}]);
  for(let i=1;i<=8;i++){const d=from+(to-from)*i/8;await driver.move([{id:1,x:anchor.x-d,y:anchor.y},{id:2,x:anchor.x+d,y:anchor.y}]);await new Promise(resolve=>setTimeout(resolve,16));}
  await driver.end();
}
async function pan(driver,anchor,dx,dy){
  await driver.start([{id:1,x:anchor.x,y:anchor.y}]);
  for(let i=1;i<=6;i++){await driver.move([{id:1,x:anchor.x+dx*i/6,y:anchor.y+dy*i/6}]);await new Promise(resolve=>setTimeout(resolve,16));}
  // Holding briefly before lifting represents a deliberate stopped pan rather than a kinetic flick.
  await new Promise(resolve=>setTimeout(resolve,110));
  await driver.end();
}
async function panToTarget(page,driver,viewport,target){
  for(let i=0;i<18;i++){
    const v=await viewport.boundingBox(),b=await target.boundingBox(),point={x:b.x+b.width/2,y:b.y+b.height/2};
    if(point.x>v.x+12&&point.x<v.x+v.width-12&&point.y>v.y+12&&point.y<v.y+v.height-12)return point;
    const desired={x:v.x+v.width*.5,y:v.y+Math.min(v.height*.35,160)};
    const dx=Math.max(-Math.min(v.width*.32,100),Math.min(Math.min(v.width*.32,100),desired.x-point.x));
    const dy=Math.max(-85,Math.min(85,desired.y-point.y));
    await pan(driver,await center(viewport),dx,dy);
    await expect(page.locator('#worksheet-dialog[open]')).toHaveCount(0);
  }
  throw new Error('Touch panning did not bring the printed target into the reader viewport.');
}

test('two-finger pinch preserves the paper anchor and one-finger pan never opens an exercise accidentally',async({page,browserName})=>{
  const{host,viewport}=await openReader(page),driver=await touchDriver(page,browserName),errors=[];page.on('pageerror',error=>errors.push(error.message));
  try{
    await expect.poll(async()=>(await state(viewport)).top).toBe(0);
    await expect.poll(async()=>(await state(viewport)).left).toBe(0);
    const anchor=await center(viewport),before=await state(viewport),paperPoint=await locationAt(viewport,anchor),browserScale=await page.evaluate(()=>visualViewport.scale);
    await pinch(driver,anchor);
    await expect.poll(async()=>(await state(viewport)).scale).toBeGreaterThan(before.scale*1.6);
    await expect(viewport).toHaveAttribute('data-gesture','idle');
    const after=await locationAt(viewport,anchor,paperPoint.pageIndex);
    // WebKit rounds scroll offsets while each of the two pointer moves is delivered separately.
    const anchorTolerance=browserName==='webkit'?12:6;
    expect(Math.abs(after.x-paperPoint.x)*after.width).toBeLessThanOrEqual(anchorTolerance);expect(Math.abs(after.y-paperPoint.y)*after.height).toBeLessThanOrEqual(anchorTolerance);
    expect(await page.evaluate(()=>visualViewport.scale)).toBeCloseTo(browserScale,3);
    await expect(host.locator('#worksheet-dialog')).not.toBeVisible();
    await assertMap(host);
    const panned=await state(viewport);
    await pan(driver,await center(viewport),-75,-55);
    const moved=await state(viewport);
    expect(moved.left).toBeGreaterThan(panned.left+35);expect(moved.top).toBeGreaterThan(panned.top+25);
    await expect(host.locator('#worksheet-dialog')).not.toBeVisible();
    expect(moved.scale).toBeCloseTo(panned.scale,3);
    await assertMap(host);
    expect(errors).toEqual([]);
  }finally{await driver.dispose();}
});

test('touch panning reaches the right printed column and a deliberate tap opens k while closing preserves the view',async({page,browserName})=>{
  test.setTimeout(60_000);
  const{host,viewport}=await openReader(page),driver=await touchDriver(page,browserName);
  try{
    await pinch(driver,await center(viewport),30,55);
    const target=host.locator('button[data-exercise-id="GR1-k"]');
    const point=await panToTarget(page,driver,viewport,target),before=await state(viewport);
    await page.touchscreen.tap(point.x,point.y);
    await expect(host.locator('#worksheet-dialog')).toBeVisible();
    await expect(host.locator('#worksheet-step')).toHaveAttribute('data-exercise-id','GR1-k');
    await expect(host.locator('#worksheet-dialog-title')).toHaveText('Příklad k)');
    const item=worksheetData.exercises.find(item=>item.id==='GR1-k');
    await expect(host.locator('#worksheet-prompt annotation')).toHaveText(item.prompt_latex);
    await host.locator('#worksheet-close').tap();
    const closed=await state(viewport);
    expect(closed.scale).toBeCloseTo(before.scale,3);expect(closed.left).toBeCloseTo(before.left,0);expect(closed.top).toBeCloseTo(before.top,0);
    await expect(target).toBeFocused();
    await assertMap(host);
  }finally{await driver.dispose();}
});

test('zoom buttons retain their center anchor, fit is reversible and every mobile orientation keeps targets on the PDF',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  const{host,viewport}=await openReader(page);
  await host.locator('#worksheet-zoom-in').scrollIntoViewIfNeeded();
  const anchor=await centerOfViewport(viewport),paperPoint=await locationAt(viewport,anchor),before=await state(viewport);
  await host.locator('#worksheet-zoom-in').tap();
  const bigger=await state(viewport),after=await locationAt(viewport,await centerOfViewport(viewport),paperPoint.pageIndex);
  expect(bigger.scale).toBeGreaterThan(before.scale);expect(after.x).toBeCloseTo(paperPoint.x,2);expect(after.y).toBeCloseTo(paperPoint.y,2);
  await host.locator('#worksheet-zoom-out').tap();
  expect((await state(viewport)).scale).toBeCloseTo(before.scale,3);
  await host.locator('#worksheet-fit').tap();
  await expect(viewport).toHaveAttribute('data-fit','true');
  expect((await host.locator('.worksheet-page').first().boundingBox()).width).toBeLessThanOrEqual((await viewport.boundingBox()).width+1);
  for(const size of [{width:320,height:568},{width:390,height:844},{width:844,height:390}]){
    await page.setViewportSize(size);
    await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    await assertMap(host);
    expect((await state(viewport)).scale).toBeGreaterThan(0);
    await expect(host.locator('#worksheet-zoom-in')).toBeEnabled();
  }
  // In wide landscape, readable size already fits; return to portrait to test the distinct fit/readable states.
  await page.setViewportSize({width:390,height:844});
  await expect.poll(async()=>(await state(viewport)).width).toBeLessThan(400);
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  await host.locator('#worksheet-fit').tap();
  await expect(viewport).toHaveAttribute('data-fit','false');
  await assertMap(host);
});

test('custom gestures stay inside the paper frame and cancelled touches do not block a subsequent tap',async({page,browserName})=>{
  const{host,viewport}=await openReader(page),driver=await touchDriver(page,browserName);
  try{
    await expect(viewport).toHaveCSS('touch-action','none');
    const outside=await page.evaluate(()=>{
      const meta=document.querySelector('meta[name="viewport"]').content,action=getComputedStyle(document.body).touchAction;
      const event=new PointerEvent('pointermove',{pointerId:900,pointerType:'touch',clientX:2,clientY:2,bubbles:true,composed:true,cancelable:true});
      document.querySelector('header').dispatchEvent(event);
      return{meta,action,prevented:event.defaultPrevented};
    });
    expect(outside.meta).not.toMatch(/user-scalable\s*=\s*no|maximum-scale\s*=\s*1(?:\D|$)/i);expect(outside.action).not.toBe('none');expect(outside.prevented).toBe(false);
    await driver.start([{id:1,...await center(viewport)}]);await driver.cancel();
    await expect(viewport).toHaveAttribute('data-gesture','idle');
    const first=host.locator('button[data-exercise-id="GR1-a"]');
    const point=await panToTarget(page,driver,viewport,first);
    await page.touchscreen.tap(point.x,point.y);
    await expect(host.locator('#worksheet-step')).toHaveAttribute('data-exercise-id','GR1-a');
    await expect(host.locator('#worksheet-dialog')).toBeVisible();
  }finally{await driver.dispose();}
});

test('rotating with an enlarged exercise open keeps the current paper location after closing',async({page,browserName})=>{
  await page.setViewportSize({width:390,height:844});
  const{host,viewport}=await openReader(page),driver=await touchDriver(page,browserName);
  try{
    await pinch(driver,await center(viewport),30,42);
    const target=host.locator('button[data-exercise-id="GR1-a"]'),point=await panToTarget(page,driver,viewport,target);
    await page.touchscreen.tap(point.x,point.y);await expect(host.locator('#worksheet-dialog')).toBeVisible();
    const previous=await state(viewport);await page.setViewportSize({width:844,height:390});
    await expect.poll(async()=>(await state(viewport)).width).toBeGreaterThan(previous.width);
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    const rotated=await state(viewport);await host.locator('#worksheet-close').tap();
    const closed=await state(viewport);expect(closed.scale).toBeCloseTo(rotated.scale,3);
    await assertMap(host);await expect(target).toBeFocused();
    await expect.poll(()=>target.evaluate(button=>{const b=button.getBoundingClientRect(),v=button.closest('#worksheet-viewport').getBoundingClientRect(),header=document.querySelector('.site-header').getBoundingClientRect();return b.top>=Math.max(v.top,header.bottom)-1&&b.bottom<=Math.min(v.bottom,innerHeight)+1;})).toBe(true);
    await expect.poll(()=>target.evaluate(button=>{const r=button.getBoundingClientRect(),x=r.x+r.width/2,y=r.y+r.height/2;let hit=document.elementFromPoint(x,y);for(let depth=0;hit?.shadowRoot&&depth<8;depth++){const next=hit.shadowRoot.elementFromPoint(x,y);if(!next||next===hit)break;hit=next;}return hit===button||button.contains(hit);})).toBe(true);
  }finally{await driver.dispose();}
});

test('lifting one pinch finger resumes a one-finger pan without a position jump',async({page})=>{
  const{host,viewport}=await openReader(page),driver=await touchDriver(page,'pointer-events');
  try{
    const p=await center(viewport);
    await driver.start([{id:1,x:p.x-30,y:p.y},{id:2,x:p.x+30,y:p.y}]);
    await driver.move([{id:1,x:p.x-45,y:p.y},{id:2,x:p.x+45,y:p.y}]);
    await driver.endOne(2);await expect(viewport).toHaveAttribute('data-gesture','pan');
    const before=await state(viewport);await driver.move([{id:1,x:p.x-55,y:p.y-5}]);
    const after=await state(viewport);
    expect(after.left-before.left).toBeGreaterThanOrEqual(8);expect(after.left-before.left).toBeLessThanOrEqual(12);
    expect(after.top-before.top).toBeGreaterThanOrEqual(3);expect(after.top-before.top).toBeLessThanOrEqual(7);
    expect(after.scale).toBeCloseTo(before.scale,3);await expect(host.locator('#worksheet-dialog')).not.toBeVisible();
    await new Promise(resolve=>setTimeout(resolve,110));await driver.end();await expect(viewport).toHaveAttribute('data-gesture','idle');
  }finally{await driver.dispose();}
});

test('mobile reader proof captures the toolbar, original PDF and a readable enlarged example',async({page},testInfo)=>{
  test.skip(!process.env.STUDY_PROOF_DIR,'User-facing screenshots are generated only on explicit request.');
  await page.setViewportSize({width:390,height:844});
  const{host,viewport}=await openReader(page);
  await host.locator('.reader-toolbar').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
  await page.evaluate(()=>scrollBy(0,-85));
  const directory=process.env.STUDY_PROOF_DIR;await mkdir(directory,{recursive:true});
  const navigation=page.locator('.main-nav');
  if(await navigation.evaluate(el=>getComputedStyle(el).position==='fixed')){
    const frame=await viewport.boundingBox(),nav=await navigation.boundingBox();
    await page.evaluate(delta=>{scrollBy({top:Math.max(0,delta),behavior:'instant'});return new Promise(resolve=>requestAnimationFrame(resolve));},frame.y+frame.height-nav.y+8);
    const reader=await viewport.boundingBox();expect(reader.y+reader.height).toBeLessThanOrEqual((await navigation.boundingBox()).y+1);
  }
  await page.screenshot({path:path.join(directory,'Study_mobilni_list.png')});
  await host.locator('button[data-exercise-id="GR1-a"]').tap();
  await host.locator('#worksheet-next').tap();
  await page.waitForTimeout(350); // Let the native tap highlight fade before creating the user-facing proof.
  await host.locator('#worksheet-dialog').screenshot({path:path.join(directory,'Study_mobilni_priklad.png')});
  await expect(viewport).toHaveCSS('touch-action','none');
});
