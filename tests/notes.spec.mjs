import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
import {courseUnits} from '../src/course-catalog.js';
import {topics as lawTopics,cases,lessons as lawLessons} from '../modules/law/data/lessons.js';
// Public isolated CI contexts only; avoid offline prefetch and unrelated release downloads.
test.use({serviceWorkers:'block'});
const authoredUnits=courseUnits.filter(unit=>unit.module==='course-notes');
let content;
test.beforeAll(async()=>{content=new Map(await Promise.all(authoredUnits.map(async unit=>[unit.id,JSON.parse(await readFile(new URL('../'+unit.content_url,import.meta.url),'utf8'))])));});
const pixelUnit='moodle-informatics-588cd5ee5179c25883c65e0170e6009f';
const shell=page=>page.locator('.course-notes');
const disclosure=(page,id)=>shell(page).locator(`.lesson-disclosure[data-lesson-id="${id}"]`);
async function openUnit(page,id){await page.goto(`./#/units/${id}`);await expect(shell(page)).toBeVisible();return shell(page);}
async function fits(page){await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);}
const normalized=text=>text.replace(/\s+/g,' ').trim();

test('every reviewed course topic opens as exact compact authored lesson summaries with no mounted detail',async({page})=>{
 test.setTimeout(180_000);expect(authoredUnits.length).toBeGreaterThanOrEqual(42);let checked=0;
 for(const unit of authoredUnits){const data=content.get(unit.id),host=await openUnit(page,unit.id);await expect(host.locator('.lesson-disclosure')).toHaveCount(data.lessons.length);await expect(host.locator('.lesson-disclosure[open]')).toHaveCount(0);await expect(host.locator('.lesson-body,.interactive-inspector,img,canvas')).toHaveCount(0);
  const actual=await host.locator('.lesson-disclosure').evaluateAll(items=>items.map(item=>({id:item.dataset.lessonId,title:item.querySelector('.lesson-title').textContent,description:item.querySelector('.lesson-description').textContent,open:item.open})));
  expect(actual).toEqual(data.lessons.map(lesson=>{expect(typeof lesson.summary,unit.id+'/'+lesson.id).toBe('string');expect(lesson.summary.length).toBeLessThanOrEqual(220);expect(lesson.summary.trim()).not.toBe('');return {id:lesson.id,title:lesson.title,description:normalized(lesson.summary),open:false};}));checked+=actual.length;await fits(page);
 }expect(checked).toBeGreaterThanOrEqual(190);
});

test('native summary keyboard Enter and Space disclose and reclose without automatically marking read',async({page})=>{
 const host=await openUnit(page,pixelUnit),lesson=content.get(pixelUnit).lessons[0],details=disclosure(page,lesson.id),summary=details.locator('.lesson-summary');await summary.focus();await summary.press('Enter');await expect(details).toHaveAttribute('open','');await expect(details.locator('.lesson-body')).toHaveCount(1);await expect(details).toHaveAttribute('data-read','false');await summary.press('Space');await expect(details).not.toHaveAttribute('open');await expect(details.locator('.lesson-body')).toHaveCount(1);await expect(details).toHaveAttribute('data-read','false');await summary.press('Enter');await expect(details.locator('.lesson-body')).toBeVisible();await expect(host.locator('.lesson-disclosure[open]')).toHaveCount(1);await fits(page);
});

test('pixel controls survive closing and reopening while read state changes only on explicit action',async({page})=>{
 await openUnit(page,pixelUnit);const lesson=content.get(pixelUnit).lessons.find(l=>l.interactive?.kind==='pixels'),details=disclosure(page,lesson.id),summary=details.locator('.lesson-summary');await summary.click();const lab=details.locator('.pixels-lab');await expect(lab).toBeVisible();await lab.getByRole('combobox',{name:'Zdrojový vzorek'}).selectOption('1');const red=lab.getByRole('spinbutton',{name:'R · červená hodnota',exact:true});await red.fill('17');await expect(lab.locator('.pixels-experiment-code')).toContainText('RGB(17, 201, 223)');await summary.click();await expect(lab).toBeHidden();await summary.click();await expect(lab).toBeVisible();await expect(lab.getByRole('combobox',{name:'Zdrojový vzorek'})).toHaveValue('1');await expect(red).toHaveValue('17');await expect(lab.locator('.pixels-experiment-code')).toContainText('RGB(17, 201, 223)');await expect(details).toHaveAttribute('data-read','false');await details.getByRole('button',{name:'Označit jako přečtené',exact:true}).click();await expect(details).toHaveAttribute('data-read','true');await expect(details).toHaveAttribute('open','');await expect(red).toHaveValue('17');
});

test('expand all and collapse all keep four exact worked homework downloads inside their lesson',async({page})=>{
 const host=await openUnit(page,pixelUnit);await host.getByRole('button',{name:'Rozbalit vše',exact:true}).click();await expect(host.locator('.lesson-disclosure[open]')).toHaveCount(content.get(pixelUnit).lessons.length);const solutions=content.get(pixelUnit).lessons.flatMap(l=>l.solutions||[]);expect(solutions).toHaveLength(4);await expect(host.locator('.solution-download')).toHaveCount(4);for(const solution of solutions)await expect(host.getByRole('link',{name:`Stáhnout: ${solution.title} (${solution.format.toUpperCase()})`,exact:true})).toHaveAttribute('href',solution.url);await host.getByRole('button',{name:'Sbalit vše',exact:true}).click();await expect(host.locator('.lesson-disclosure[open]')).toHaveCount(0);await expect(host.locator('.solution-download')).toHaveCount(4);for(const link of await host.locator('.solution-download').all())await expect(link).toBeHidden();await fits(page);
});

test('mobile compact overview and one opened lesson produce public visual evidence without sideways overflow',async({page},info)=>{
 if(info.project.name!=='desktop')await page.setViewportSize({width:320,height:740});const host=await openUnit(page,pixelUnit);await fits(page);await host.screenshot({path:info.outputPath('notes-compact.png')});if(info.project.name!=='desktop')await page.setViewportSize({width:390,height:740});const first=host.locator('.lesson-summary').first();const box=await first.boundingBox();expect(box).not.toBeNull();expect(box.height).toBeGreaterThanOrEqual(44);await first.click();await expect(host.locator('.lesson-body').first()).toBeVisible();await fits(page);await host.locator('.lesson-disclosure').first().screenshot({path:info.outputPath('notes-expanded.png')});
});

test('original skeleton and muscle note sections start closed and skeleton search reveals matches',async({page})=>{
 await page.goto('./#/units/skeleton?mode=notes');const biology=page.locator('[data-study-module="biology"]');await expect(biology.locator('#notes-content .notes-topic')).toHaveCount(11);await expect(biology.locator('#notes-content .notes-topic[open]')).toHaveCount(0);await expect(biology.locator('#notes-content .notes-body').first()).toBeHidden();const title=await biology.locator('#notes-content .notes-topic h2').first().innerText();await biology.locator('#notes-search').fill(title);await expect(biology.locator('#notes-content .notes-topic').first()).toHaveAttribute('open','');expect(await biology.locator('#notes-content .notes-topic').count()).toBeGreaterThan(0);expect(await biology.locator('#notes-content .notes-topic:not([open])').count()).toBe(0);await biology.locator('#notes-search').fill('');await expect(biology.locator('#notes-content .notes-topic[open]')).toHaveCount(0);await fits(page);
 await page.goto('./#/units/muscles?mode=notes');const muscles=page.locator('[data-study-module="biology-muscles"]');await expect(muscles.locator('.notes-topic')).toHaveCount(3);await expect(muscles.locator('.notes-topic[open]')).toHaveCount(0);await expect(muscles.locator('.notes-body').first()).toBeHidden();await muscles.locator('.notes-topic>summary').first().click();await expect(muscles.locator('.notes-body').first()).toBeVisible();await fits(page);
});

test('all original law study topics keep section explanations and source bodies folded',async({page})=>{
 await page.goto('./#/units/law-unit-2');const law=page.locator('[data-study-module="law"]');await expect(law.locator('.lesson-tabs')).toBeVisible();let total=0;for(const topic of lawTopics.filter(t=>t.id!=='vocabulary')){await law.locator(`.lesson-tabs a[href="#learn/${topic.id}"]`).click();const item=[...cases,...lawLessons].find(item=>item.id===topic.id);await expect(law.locator('.law-note')).toHaveCount(item.sections.length);await expect(law.locator('.law-note[open]')).toHaveCount(0);for(const body of await law.locator('.law-note-body').all())await expect(body).toBeHidden();for(const preview of await law.locator('.law-note-preview').all())await expect(preview).not.toHaveText('');total+=item.sections.length;await fits(page);}expect(total).toBe(35);const summary=law.locator('.law-note>summary').first();await summary.click();await expect(law.locator('.law-note-body').first()).toBeVisible();
});

test('original mathematics controls and formulas remain visible outside the common folded reader',async({page})=>{
 await page.goto('./#/units/trig-functions');const trig=page.locator('[data-study-module="math-trig"]');await expect(trig.locator('#unit-circle')).toBeVisible();await expect(trig.locator('#angle-degrees')).toBeVisible();await trig.locator('#angle-degrees').fill('90');await trig.locator('#angle-degrees').press('Tab');await expect(trig.locator('#circle-values [data-value="sin"]')).toContainText('1');await expect(trig.locator('.lesson-disclosure')).toHaveCount(0);await fits(page);
 await page.goto('./#/units/trig-equations');const equations=page.locator('[data-study-module="math-equations"]');await expect(equations.locator('.formula-card .formula').first()).toBeVisible();await equations.locator('[data-view="solver"]').click();await expect(equations.locator('#equation-select')).toBeVisible();await expect(equations.locator('.step-list .step')).toHaveCount(1);await equations.locator('#step-next').click();await expect(equations.locator('.step-list .step')).toHaveCount(2);await expect(equations.locator('.lesson-disclosure')).toHaveCount(0);await fits(page);
});
