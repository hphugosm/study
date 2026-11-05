import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { worksheetData } from '../modules/math-worksheets/data.js';
import { worksheetLayout } from '../modules/math-worksheets/layout.js';

// Full worksheet coverage renders thousands of formula states; retain failure screenshots without duplicating the entire DOM in traces.
test.use({trace:'off'});

const sources = [
  {file:'Gonio_fce_opakovani.pdf',unit:'trig-functions',module:'math-trig',count:60},
  {file:'Opakovani_gonio__ne_rovnice.pdf',unit:'trig-equations',module:'math-equations',count:104},
];
const moduleFor = (page, source) => page.locator(`[data-study-module="${source.module}"]`);
async function openWorksheet(page, source) {
  await page.goto(`./#/units/${source.unit}?mode=worksheets`);
  const host = moduleFor(page, source);
  await expect(host.locator('#worksheet-viewport')).toBeVisible();
  await expect(host.locator('#worksheet-viewport')).toHaveAttribute('data-ready','true');
  // Shadow-root styles and page images can arrive after the host becomes visible.
  await expect(host.locator('button[data-exercise-id]').first()).toHaveCSS('position','absolute');
  await expect.poll(() => host.locator('.worksheet-page-image').evaluateAll(images => images.length>0&&images.every(image => image.complete&&image.naturalWidth>0))).toBe(true);
  return host;
}
async function openExercise(host, item) {
  await host.locator(`button[data-exercise-id="${item.id}"]`).click();
  await expect(host.locator('#worksheet-dialog')).toBeVisible();
  await expect(host.locator('#worksheet-step')).toHaveAttribute('data-exercise-id', item.id);
  await expect(host.locator('#worksheet-step')).toHaveAttribute('data-step-index', '0');
}
async function expectFormula(locator, latex) {
  await expect(locator.locator('annotation[encoding="application/x-tex"]')).toHaveText(latex);
  await expect(locator.locator('.math-error,.katex-error')).toHaveCount(0);
}
async function finish(host, item) {
  for (let index=1; index<=item.steps.length+1; index++) {
    await host.locator('#worksheet-next').click();
    await expect(host.locator('#worksheet-step')).toHaveAttribute('data-step-index', String(index));
  }
}
async function fits(page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth+1)).toBe(true);
}

async function expectMappedTargets(host,source){
  const actual=await host.locator('button[data-exercise-id]').evaluateAll(buttons=>buttons.map(button=>{
    const page=button.closest('.worksheet-page'),r=button.getBoundingClientRect(),p=page.querySelector('img').getBoundingClientRect();
    return{id:button.dataset.exerciseId,pageIndex:Number(page.dataset.sourcePage)-1,x:(r.x-p.x)/p.width,y:(r.y-p.y)/p.height,width:r.width/p.width,height:r.height/p.height};
  }));
  expect(actual).toHaveLength(source.count);
  for(const target of actual){
    const mapping=worksheetLayout.exercises.find(record=>record.id===target.id),paper=worksheetLayout.pages.find(record=>record.source_file===source.file&&record.page_index===mapping.page_index);
    expect(target.pageIndex,target.id).toBe(mapping.page_index);
    const[x0,y0,x1,y1]=mapping.bbox;
    expect(target.x,target.id).toBeCloseTo(x0/paper.width,3);expect(target.y,target.id).toBeCloseTo(y0/paper.height,3);
    expect(target.width,target.id).toBeCloseTo((x1-x0)/paper.width,3);expect(target.height,target.id).toBeCloseTo((y1-y0)/paper.height,3);
  }
}

test('original PDF pages keep their printed headings, letter columns and positions while search highlights and section navigation jumps', async ({page},testInfo) => {
  const proofDirectory=testInfo.project.name==='desktop'?process.env.STUDY_PROOF_DIR:null;
  if(proofDirectory)await page.setViewportSize({width:1440,height:2100});
  for (const source of sources) {
    const host=await openWorksheet(page,source);
    const pages=worksheetLayout.pages.filter(item=>item.source_file===source.file);
    await expect(host.locator('button[data-exercise-id]')).toHaveCount(source.count);
    await expect(host.locator('.worksheet-page')).toHaveCount(pages.length);
    await expectMappedTargets(host,source);
    await expect(host.locator('.pdf-link')).toHaveAttribute('href',new RegExp(`${source.file.replaceAll('.','\\.')}$`));
    for(const record of pages){
      const paper=host.locator(`.worksheet-page[data-source-page="${record.page_index+1}"]`);
      await expect.poll(()=>paper.locator('img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
      for(const section of record.sections){
        await expect(paper.getByRole('heading',{name:section.title,exact:true})).toHaveCount(1);
        const option=host.locator('#worksheet-section option').filter({hasText:section.title});
        await expect(option).toHaveCount(1);
        await expect(option).toHaveAttribute('value',section.key);
      }
    }
    const items=worksheetData.exercises.filter(item=>item.source_file===source.file),item=items.at(-1);
    const target=host.locator(`button[data-exercise-id="${item.id}"]`);
    const position=()=>target.evaluate(button=>{const a=button.getBoundingClientRect(),b=button.closest('.worksheet-page').querySelector('img').getBoundingClientRect();return[(a.x-b.x)/b.width,(a.y-b.y)/b.height,a.width/b.width,a.height/b.height];});
    const before=await position();
    await host.locator('#worksheet-search').fill(item.id);
    await expect(host.locator('button[data-exercise-id][data-highlight="true"]')).toHaveCount(1);
    await expect(target).toHaveAttribute('data-highlight','true');
    await expect(host.locator('button[data-exercise-id]')).toHaveCount(source.count);
    for(const[index,value]of(await position()).entries())expect(value).toBeCloseTo(before[index],6);
    await host.locator('#worksheet-search').fill('zadani-ktere-neexistuje');
    await expect(host.locator('button[data-exercise-id][data-highlight="true"]')).toHaveCount(0);
    await expect(host.locator('#worksheet-count')).toContainText(`0 z ${source.count}`);
    await expect(host.locator('button[data-exercise-id]')).toHaveCount(source.count);
    await host.locator('#worksheet-search').fill('');
    for(const section of [...new Set(items.map(item=>item.section))]){
      await host.locator('#worksheet-section').selectOption(section);
      await expect(host.locator('button[data-exercise-id][data-highlight="true"]')).toHaveCount(items.filter(item=>item.section===section).length);
      await expect(host.locator('button[data-exercise-id]')).toHaveCount(source.count);
    }
    await host.locator('#worksheet-section').selectOption('');
    await expect(host.locator('button[data-exercise-id][data-highlight="true"]')).toHaveCount(0);
    for(const[index,value]of(await position()).entries())expect(value).toBeCloseTo(before[index],6);
    await fits(page);
  }
  const host=await openWorksheet(page,sources[1]);
  await expect(host.getByRole('heading',{name:/^1\. Určete přesnou hodnotu/})).toHaveCount(1);
  const first=host.locator('button[data-exercise-id="GR1-a"]');
  await expect(first).toHaveAttribute('aria-label',/a/);
  const columns=await host.locator('button[data-exercise-id="GR1-a"],button[data-exercise-id="GR1-f"],button[data-exercise-id="GR1-k"]').evaluateAll(buttons=>buttons.map(button=>{const r=button.getBoundingClientRect(),p=button.closest('.worksheet-page').getBoundingClientRect();return{x:r.x-p.x,y:r.y-p.y};}));
  expect(Math.abs(columns[0].y-columns[1].y)).toBeLessThan(2);
  expect(Math.abs(columns[1].y-columns[2].y)).toBeLessThan(2);
  expect(columns[0].x).toBeLessThan(columns[1].x);expect(columns[1].x).toBeLessThan(columns[2].x);
  const item=worksheetData.exercises.find(item=>item.id==='GR1-a');
  if(proofDirectory){await mkdir(proofDirectory,{recursive:true});await host.locator('.worksheet-page[data-source-page="1"]').screenshot({path:path.join(proofDirectory,'Study_rozlozeni_listu.png')});}
  await openExercise(host,item);await expectFormula(host.locator('#worksheet-prompt'),item.prompt_latex);
  if(proofDirectory){await host.locator('#worksheet-next').click();await host.locator('#worksheet-dialog').screenshot({path:path.join(proofDirectory,'Study_priklad_sin105.png')});}
  await expect(host.locator('#worksheet-dialog-meta')).toContainText('1. Určete přesnou hodnotu');
});

test('all 164 original-position exercise hotspots open the matching formula and retain the working step controls',async({page},testInfo)=>{
  test.skip(testInfo.project.name!=='desktop','Every source hotspot is checked once; mobile covers the same map with pan and zoom.');
  test.setTimeout(120_000);
  for(const source of sources){
    const host=await openWorksheet(page,source);
    for(const item of worksheetData.exercises.filter(item=>item.source_file===source.file)){
      const target=host.locator(`button[data-exercise-id="${item.id}"]`);
      await openExercise(host,item);
      await expectFormula(host.locator('#worksheet-prompt'),item.prompt_latex);
      await expect(host.locator('#worksheet-previous')).toBeDisabled();
      await host.locator('#worksheet-next').click();
      await expect(host.locator('#worksheet-step')).toHaveAttribute('data-step-index','1');
      await expectFormula(host.locator('#worksheet-step .step-formula'),item.steps[0].latex);
      await host.locator('#worksheet-previous').click();
      await expect(host.locator('#worksheet-step')).toHaveAttribute('data-step-index','0');
      await host.locator('#worksheet-close').click();
      await expect(target).toBeFocused();
    }
  }
});

test('paper zoom and mobile pan preserve the PDF layout and keep overflow inside the worksheet viewport',async({page},testInfo)=>{
  if(testInfo.project.name==='mobile')await page.setViewportSize({width:320,height:568});
  for(const source of sources){const scoped=await openWorksheet(page,source);await expectMappedTargets(scoped,source);}
  const host=await openWorksheet(page,sources[1]);
  const viewport=host.locator('#worksheet-viewport'),paper=host.locator('.worksheet-page').first();
  await expect(viewport).toHaveAttribute('data-fit',/true|false/);
  const base=(await paper.boundingBox()).width;
  await host.locator('#worksheet-zoom-in').click();
  await expect.poll(async()=>(await paper.boundingBox()).width).toBeGreaterThan(base);
  await host.locator('#worksheet-zoom-out').click();
  await expect.poll(async()=>(await paper.boundingBox()).width).toBeCloseTo(base,0);
  if(testInfo.project.name==='mobile'){
    const geometry=await viewport.evaluate(el=>({width:el.clientWidth,scroll:el.scrollWidth,overflow:getComputedStyle(el).overflowX}));
    expect(geometry.scroll).toBeGreaterThan(geometry.width);expect(['auto','scroll']).toContain(geometry.overflow);
  }
  await host.locator('#worksheet-fit').click();
  await expect(viewport).toHaveAttribute('data-fit','true');
  expect((await paper.boundingBox()).width).toBeLessThanOrEqual((await viewport.boundingBox()).width+1);
  await fits(page);
  const item=worksheetData.exercises.find(item=>item.id==='GR1-a');
  await openExercise(host,item);await expectFormula(host.locator('#worksheet-prompt'),item.prompt_latex);
});

test('worksheet keyboard arrows, Escape and focus restore work and route cleanup removes the active modal',async({page})=>{
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  const source=sources[1],item=worksheetData.exercises.find(item=>item.id==='GR7-47');
  const host=await openWorksheet(page,source);
  await openExercise(host,item);
  await page.keyboard.press('ArrowRight');
  await expect(host.locator('#worksheet-step')).toHaveAttribute('data-step-index','1');
  await page.keyboard.press('ArrowLeft');
  await expect(host.locator('#worksheet-step')).toHaveAttribute('data-step-index','0');
  await page.keyboard.press('Escape');
  await expect(host.locator('#worksheet-dialog')).not.toBeVisible();
  await expect(host.locator(`button[data-exercise-id="${item.id}"]`)).toBeFocused();
  await expect.poll(()=>page.evaluate(()=>document.documentElement.style.overflow)).not.toBe('hidden');
  await openExercise(host,item);
  await page.goto('./#/units/trig-functions?mode=circle');
  await expect(page.locator('#unit-circle')).toBeVisible();
  await expect(page.locator('#worksheet-dialog[open]')).toHaveCount(0);
  await expect.poll(()=>page.evaluate(()=>document.documentElement.style.overflow)).not.toBe('hidden');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#worksheet-step')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('enlarged formulas use loaded KaTeX fonts and long solutions scroll inside the modal at 320 pixels',async({page},testInfo)=>{
  if(testInfo.project.name==='mobile')await page.setViewportSize({width:320,height:568});
  for(const [source,id] of [[sources[0],'GF1-01'],[sources[1],'GR7-47']]) {
    const host=await openWorksheet(page,source),item=worksheetData.exercises.find(item=>item.id===id);
    await openExercise(host,item);
    await finish(host,item);
    await page.evaluate(()=>document.fonts.ready);
    const fonts=await page.evaluate(()=>[...document.fonts].filter(font=>font.status==='loaded').map(font=>font.family));
    expect(fonts.some(family=>family.includes('KaTeX_Main')),'KaTeX_Main font is actually loaded').toBe(true);
    expect(fonts.some(family=>family.includes('KaTeX_Math')),'KaTeX_Math font is actually loaded').toBe(true);
    const dialog=host.locator('#worksheet-dialog');
    const box=await dialog.boundingBox(),viewport=page.viewportSize();
    expect(box.x).toBeGreaterThanOrEqual(0);expect(box.x+box.width).toBeLessThanOrEqual(viewport.width+1);
    expect(box.y).toBeGreaterThanOrEqual(0);expect(box.y+box.height).toBeLessThanOrEqual(viewport.height+1);
    await expect(host.locator('#worksheet-close')).toBeVisible();
    await expect(host.locator('#worksheet-previous')).toBeVisible();
    const overflow=await host.locator('.dialog-scroll').evaluate(el=>({height:el.clientHeight,scroll:el.scrollHeight,overflow:getComputedStyle(el).overflowY}));
    expect(['auto','scroll']).toContain(overflow.overflow);
    if(testInfo.project.name==='mobile')expect(overflow.scroll).toBeGreaterThan(overflow.height);
    await fits(page);
    await host.locator('#worksheet-close').click();
  }
});

test('worksheet graph is interactive and never draws tangent branches across an asymptote',async({page})=>{
  const source=sources[0],item=worksheetData.exercises.find(item=>item.id==='GF2-01');
  const host=await openWorksheet(page,source);
  await openExercise(host,item);await finish(host,item);
  await expect(host.locator('#worksheet-graph')).toBeVisible();
  expect(await host.locator('.asymptote').count()).toBeGreaterThan(0);
  expect(await host.locator('.graph-curve').count()).toBeGreaterThan(1);
  const geometry=await host.locator('#worksheet-graph').evaluate(svg=>({
    poles:[...svg.querySelectorAll('.asymptote')].map(line=>Number(line.getAttribute('x1'))),
    ranges:[...svg.querySelectorAll('.graph-curve')].map(curve=>[...curve.getAttribute('d').matchAll(/[ML](-?[\d.]+),/g)].map(match=>Number(match[1]))).filter(values=>values.length).map(values=>[Math.min(...values),Math.max(...values)])
  }));
  for(const[min,max]of geometry.ranges)for(const pole of geometry.poles)expect(pole>min+.02&&pole<max-.02,'curve segment cannot cross a pole').toBe(false);
  await expect(host.locator('#worksheet-graph-readout')).toContainText(/není definovaná/i);
  await host.locator('#worksheet-graph-slider').focus();await host.locator('#worksheet-graph-slider').press('Home');
  await expect(host.locator('#worksheet-graph-point')).toBeVisible();
  const before=await host.locator('#worksheet-graph-readout').textContent();
  await host.locator('#worksheet-graph-slider').press('ArrowRight');
  await expect.poll(()=>host.locator('#worksheet-graph-readout').textContent()).not.toBe(before);
});

test('calendar-only installation caches unopened worksheets, their local math renderer and both PDFs for offline use',async({page,context})=>{
  test.setTimeout(120_000);
  await page.goto('./');
  await expect.poll(()=>page.evaluate(async()=>{
    const registration=await navigator.serviceWorker.getRegistration();
    const pwa=await import(new URL('src/pwa.js',location.href).href);
    return Boolean(registration?.active&&navigator.serviceWorker.controller&&pwa.getPwaState().offlineReady);
  }),{timeout:60_000}).toBe(true);
  await context.setOffline(true);
  try{
    for(const source of sources){
      await openWorksheet(page,source);await page.reload();
      const host=moduleFor(page,source);
      await expect(host.locator('button[data-exercise-id]')).toHaveCount(source.count);
      for(const image of await host.locator('.worksheet-page img').all())await expect.poll(()=>image.evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
      const item=worksheetData.exercises.find(item=>item.source_file===source.file);
      await openExercise(host,item);await finish(host,item);
      await expectFormula(host.locator('#worksheet-step .answer'),item.answer_latex);
      const result=await page.evaluate(async file=>{
        const response=await fetch(new URL(`modules/math-worksheets/assets/${file}`,location.href));
        const bytes=new Uint8Array(await response.arrayBuffer());
        return{status:response.status,magic:String.fromCharCode(...bytes.slice(0,5))};
      },source.file);
      expect(result).toEqual({status:200,magic:'%PDF-'});
    }
  }finally{await context.setOffline(false);}
});


test('filtering after closing a solution keeps clicks inside the next solution local',async({page})=>{
  const source=sources[1],host=await openWorksheet(page,source);
  const oldItem=worksheetData.exercises.find(item=>item.id==='GR7-47');
  const nextItem=worksheetData.exercises.find(item=>item.id==='GR7-37');
  await openExercise(host,oldItem);
  await host.locator('#worksheet-next').click();
  await host.locator('#worksheet-close').click();
  await host.locator('#worksheet-search').fill(nextItem.id);
  await openExercise(host,nextItem);
  await host.locator('#worksheet-next').click();
  await host.locator('#worksheet-step h3').click();
  await expect(host.locator('#worksheet-step')).toHaveAttribute('data-exercise-id',nextItem.id);
  await expect(host.locator('#worksheet-step')).toHaveAttribute('data-step-index','1');
  await expect(host.locator('#worksheet-dialog-title')).toHaveText('Příklad 37');
});
