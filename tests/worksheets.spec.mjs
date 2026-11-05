import { test, expect } from '@playwright/test';
import { worksheetData } from '../modules/math-worksheets/data.js';

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
  await expect(host.locator('#worksheet-search')).toBeVisible();
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

test('worksheet lists preserve source labels and support every section, unique-ID search and no-result feedback', async ({page}) => {
  for (const source of sources) {
    const host=await openWorksheet(page,source);
    await expect(host.locator('button[data-exercise-id]')).toHaveCount(source.count);
    await expect(host.locator('.pdf-link')).toHaveAttribute('href',new RegExp(`${source.file.replaceAll('.','\\.')}$`));
    const items=worksheetData.exercises.filter(item=>item.source_file===source.file);
    for (const section of [...new Set(items.map(item=>item.section))]) {
      await host.locator('#worksheet-section').selectOption(section);
      await expect(host.locator('button[data-exercise-id]')).toHaveCount(items.filter(item=>item.section===section).length);
    }
    await host.locator('#worksheet-section').selectOption('');
    const item=items.at(-1);
    await host.locator('#worksheet-search').fill(item.id);
    await expect(host.locator('button[data-exercise-id]')).toHaveCount(1);
    await expect(host.locator('button[data-exercise-id]')).toHaveAttribute('data-exercise-id',item.id);
    await host.locator('#worksheet-search').fill('zadani-ktere-neexistuje');
    await expect(host.locator('button[data-exercise-id]')).toHaveCount(0);
    await expect(host.locator('.empty')).toContainText('Takový příklad tu není');
    await host.locator('#worksheet-search').fill('');
    await expect(host.locator('button[data-exercise-id]')).toHaveCount(source.count);
    await expect(host.locator('.math-error,.katex-error')).toHaveCount(0);
    await fits(page);
  }
});

const groups = [
  ['all 60 function graphs', sources[0], item=>item.id.startsWith('GF')],
  ['all 57 values, structured equations and inequalities', sources[1], item=>item.id.startsWith('GR')&&!item.id.startsWith('GR7-')],
  ['all 47 random practice equations', sources[1], item=>item.id.startsWith('GR7-')],
];
for(const [label,source,predicate] of groups) {
  test(`${label} open enlarged and expose every exact solution step forwards and backwards`,async({page},testInfo)=>{
    test.skip(testInfo.project.name!=='desktop','Exhaustive 164-example coverage runs once on desktop; mobile covers representative long solutions.');
    test.setTimeout(300_000);
    const host=await openWorksheet(page,source);
    for(const item of worksheetData.exercises.filter(predicate)) {
      await openExercise(host,item);
      const dialog=host.locator('#worksheet-dialog'),step=host.locator('#worksheet-step');
      await expectFormula(host.locator('#worksheet-prompt'),item.prompt_latex);
      await expect(host.locator('#worksheet-previous')).toBeDisabled();
      await expect(step.locator('.answer')).toHaveCount(0);
      for(let index=1;index<=item.steps.length;index++) {
        if(index===1){await host.locator('#worksheet-next').click();await host.locator('#worksheet-close').focus();}
        else await page.keyboard.press('ArrowRight');
        await expect(step).toHaveAttribute('data-step-index',String(index));
        await expect(step.locator('h3')).toHaveText(item.steps[index-1].title);
        await expect(step).toContainText(item.steps[index-1].explanation);
        await expectFormula(step.locator('.step-formula'),item.steps[index-1].latex);
        await expect(step.locator('.answer')).toHaveCount(0);
      }
      await host.locator('#worksheet-next').click();
      await expect(step).toHaveAttribute('data-step-index',String(item.steps.length+1));
      await expectFormula(step.locator('.answer'),item.answer_latex);
      if(item.correction_note)await expect(step).toContainText(item.correction_note);
      await expect(host.locator('#worksheet-next')).toBeDisabled();
      await expect(host.locator('#worksheet-counter')).toContainText(`${item.steps.length+2} / ${item.steps.length+2}`);
      await expect(dialog.locator('.math-error,.katex-error')).toHaveCount(0);
      for(let index=item.steps.length;index>=0;index--) {
        if(index===item.steps.length){await host.locator('#worksheet-previous').click();await host.locator('#worksheet-close').focus();}
        else await page.keyboard.press('ArrowLeft');
        await expect(step).toHaveAttribute('data-step-index',String(index));
        if(index>0)await expectFormula(step.locator('.step-formula'),item.steps[index-1].latex);
      }
      await expect(host.locator('#worksheet-previous')).toBeDisabled();
      await host.locator('#worksheet-close').click();
      await expect(dialog).not.toBeVisible();
    }
  });
}

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
