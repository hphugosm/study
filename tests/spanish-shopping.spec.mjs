import {test,expect} from '@playwright/test';
import {imperativeQuestions,pronounQuestions} from '../modules/spanish-shopping/engine.js';
const route='./#/units/spanish-de-tiendas';
const moduleRoot=page=>page.locator('[data-study-module="spanish-shopping"]');
const go=async(page,mode='overview')=>{await page.goto(route+'?mode='+mode);await expect(moduleRoot(page).locator('h2').first()).toBeVisible();};
const fits=async page=>expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
test.use({serviceWorkers:'block'});

test('existing subjects navigation opens Spanish and all ten independent sections',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('./#/subjects');await page.getByRole('link').filter({has:page.getByRole('heading',{name:'Španělština',exact:true})}).click();
 await page.getByRole('link').filter({has:page.getByRole('heading',{name:'Unidad 2 – De tiendas',exact:true})}).click();
 const root=moduleRoot(page);await expect(root.locator('.hero')).toBeVisible();await expect(root.locator('nav button')).toHaveCount(10);await fits(page);
 for(const mode of ['grammar','vocabulary','cards','imperative','pronouns','numbers','writing','exam','stats']){await root.locator(`nav [data-go="${mode}"]`).click();await expect(root.locator('nav [aria-current="page"]')).toHaveAttribute('data-go',mode);await fits(page);}
 expect(errors).toEqual([]);
 await page.screenshot({path:test.info().outputPath('spanish-stats.png'),fullPage:true});
});

test('grammar builder explains actual clitic order and accents; number converter works',async({page})=>{
 await go(page,'grammar');const r=moduleRoot(page);await expect(r.locator('.grammar-topic[open]')).toHaveCount(0);
 await expect(r.locator('[data-built] .built-result')).toHaveText('cómpralo');
 await r.locator('[data-builder="verb"]').selectOption('poner');await r.locator('[data-builder="pronouns"]').selectOption('te,lo');
 await expect(r.locator('.built-result')).toHaveText('póntelo');await r.locator('[data-builder="negative"]').selectOption('1');await expect(r.locator('.built-result')).toHaveText('no te lo pongas');
 await r.locator('nav [data-go="numbers"]').click();await r.locator('details summary').click();await r.locator('[data-number-converter]').fill('1000000');await expect(r.locator('[data-number-output]')).toHaveText('un millón');await fits(page);
});

test('multi-shop cards flip, grade, support reverse direction and restore progress',async({page})=>{
 await go(page,'cards');const r=moduleRoot(page);await r.locator('[data-shop="flowers"]').check();await r.locator('[data-shop="jewellery"]').check();await r.locator('[data-card-filter="direction"]').selectOption('cs-es');await r.locator('[data-action="begin-cards"]').click();
 await expect(r.locator('.card-toolbar')).toContainText('1 / 20');await expect(r.locator('.back')).toHaveAttribute('aria-hidden','true');await expect(r.locator('.grading')).toBeHidden();
 await r.getByRole('button',{name:'Otočit kartičku',exact:true}).click();await expect(r.locator('.flash-card')).toHaveClass(/is-flipped/);await expect(r.locator('.back')).toHaveAttribute('aria-hidden','false');await r.getByRole('button',{name:'3 · Umím',exact:true}).click();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('study:spanish-shopping:v1')));expect(Object.keys(saved.cards)).toHaveLength(1);expect(Object.values(saved.cards)[0].rating).toBe(2);
 await page.reload();await expect(moduleRoot(page).locator('.card-settings')).toBeVisible();await expect(moduleRoot(page).locator('.card-toolbar')).toContainText('2 / 20');const restored=await page.evaluate(()=>JSON.parse(localStorage.getItem('study:spanish-shopping:v1')));expect(restored.cards).toEqual(saved.cards);await fits(page);
});

test('all eighty unique cards can actually be flipped and rated',async({page},info)=>{
 test.skip(info.project.name!=='desktop','Full80 pass on desktop, multi-shop mobile coverage separate.');test.setTimeout(90000);
 await go(page,'cards');const r=moduleRoot(page);await r.locator('[data-action="begin-cards"]').click();const seen=new Set();
 for(let i=0;i<80;i++){const word=await r.locator('.front h3').textContent();expect(seen.has(word)).toBe(false);seen.add(word);await r.locator('[data-action="flip"]').click();await r.locator('[data-action="grade-0"]').click();}
 await expect(r.getByRole('heading',{name:'Sada dokončena'})).toBeVisible();expect(seen.size).toBe(80);expect(await page.evaluate(()=>Object.keys(JSON.parse(localStorage.getItem('study:spanish-shopping:v1')).cards).length)).toBe(80);
});

test('trainers hide answers before attempt and explain a wrong answer; blocks build a real negative sentence',async({page})=>{
 await go(page,'imperative');const r=moduleRoot(page);await r.locator('[data-trainer-mode]').selectOption('pronouns');
 const prompt=await r.locator('.prompt').textContent(),q=imperativeQuestions('pronouns').find(q=>q.prompt===prompt);expect(q).toBeTruthy();await expect(r.locator('.feedback')).toHaveCount(0);await r.locator('input[name="answer"]').fill('nesprávně');await r.locator('form button').first().click();await expect(r.locator('.feedback')).toContainText(q.answers[0]);
 await r.locator('[data-trainer-mode]').selectOption('blocks');const bp=await r.locator('.prompt').textContent(),bq=imperativeQuestions('blocks').find(q=>q.prompt===bp);for(const token of bq.tokens)await r.getByRole('button',{name:token,exact:true}).click();await r.locator('form button').click();await expect(r.locator('.feedback.correct')).toContainText(bq.answers[0]);await r.locator('nav [data-go="pronouns"]').click();const pp=await r.locator('.prompt').textContent(),pq=pronounQuestions.find(q=>q.prompt===pp);await r.locator('input[name="answer"]').fill(pq.answers[0]);await r.locator('form button').first().click();await expect(r.locator('.feedback.correct')).toBeVisible();await fits(page);
});

test('writing restores draft and unlocks a model only after a real attempt',async({page})=>{
 await go(page,'writing');const r=moduleRoot(page);await r.locator('[data-action="writing-model"]').click();await expect(r.locator('.model')).toHaveCount(0);await r.locator('[data-writing-text]').fill('Me gusta comprar ropa con mis amigos.');await page.reload();await expect(moduleRoot(page).locator('[data-writing-text]')).toHaveValue('Me gusta comprar ropa con mis amigos.');await moduleRoot(page).locator('[data-action="writing-model"]').click();await expect(moduleRoot(page).locator('.model')).toContainText('Normalmente llevo');await fits(page);
});

test('timed exam persists answer and deadline, hides solutions until submission and generates a new variant',async({page})=>{
 await go(page,'exam');const r=moduleRoot(page);await r.locator('[data-action="begin-exam"]').click();await expect(r.locator('[data-clock]')).toBeVisible();await expect(r.locator('.exam-results,.feedback')).toHaveCount(0);await r.locator('[data-exam-answer]').fill('mi respuesta');
 const first=await page.evaluate(()=>JSON.parse(localStorage.getItem('study:spanish-shopping:v1')).exam);await page.reload();await expect(moduleRoot(page).locator('[data-exam-answer]')).toHaveValue('mi respuesta');const restored=await page.evaluate(()=>JSON.parse(localStorage.getItem('study:spanish-shopping:v1')).exam);expect(restored.deadline).toBe(first.deadline);
 await moduleRoot(page).locator('[data-action="finish-exam"]').click();await expect(moduleRoot(page).locator('.exam-results')).toContainText('0 / 20 správně');await expect(moduleRoot(page).locator('.result-items details')).toHaveCount(20);await moduleRoot(page).locator('.result-items summary').first().click();await expect(moduleRoot(page).locator('.result-items details[open]')).toContainText('Správně:');await fits(page);
 await moduleRoot(page).locator('[data-action="begin-exam"]').click();const next=await page.evaluate(()=>JSON.parse(localStorage.getItem('study:spanish-shopping:v1')).exam);expect(next.questions.map(q=>q.id)).not.toEqual(first.questions.map(q=>q.id));
});

test('expired exam submits after reload and corrupt storage cannot break the module',async({page})=>{
 await go(page,'exam');await moduleRoot(page).locator('[data-action="begin-exam"]').click();await page.evaluate(()=>{const p=JSON.parse(localStorage.getItem('study:spanish-shopping:v1'));p.exam.deadline=Date.now()-1;localStorage.setItem('study:spanish-shopping:v1',JSON.stringify(p));});await page.reload();await expect(moduleRoot(page).locator('.exam-results')).toBeVisible();
 await page.evaluate(()=>localStorage.setItem('study:spanish-shopping:v1','{"schema":1,"exam":{"questions":[null],"answers":{},"deadline":1,"startedAt":0}}'));await page.reload();await expect(moduleRoot(page).locator('[data-action="begin-exam"]')).toBeVisible();
});
