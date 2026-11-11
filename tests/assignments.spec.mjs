import {test,expect} from '@playwright/test';
import {readFileSync} from 'node:fs';

// Task browsing does not need to install/cache every original study module.
test.use({serviceWorkers:'block'});
const hexUnit='moodle-informatics-588cd5ee5179c25883c65e0170e6009f';
const hexTitle='Rekonstrukce obrázku z matice HEX';
const hexLesson=JSON.parse(readFileSync(new URL('../modules/course-notes/content/informatics/section-588cd5ee5179c25883c65e0170e6009f.json',import.meta.url),'utf8')).lessons.find(lesson=>lesson.id==='hexove-matice');
const panel=page=>page.locator('.assignments-panel');
const tasksTab=page=>page.getByRole('tab',{name:'Úkoly',exact:true});
async function openTasks(page,unit=hexUnit,tab='tasks'){
 await page.goto(`./#/units/${unit}?tab=${tab}`);
 await expect(tasksTab(page)).toHaveAttribute('aria-selected','true');
 await expect(panel(page)).toBeVisible();
 await expect(page.locator('#unit-panel')).toHaveAttribute('aria-labelledby','unit-tab-tasks');
}
async function fits(page){await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);}

for(const unit of ['skeleton','muscles','law-unit-2','trig-functions','trig-equations',hexUnit]){
 test(`Tasks replaces the global progress tab and opens without a study module: ${unit}`,async({page})=>{
  const moduleRequests=[];
  page.on('request',request=>{if(/\/modules\/(?:biology|biology-muscles|law|math-trig|math-equations|course-notes)\/index\.js(?:\?|$)/.test(new URL(request.url()).pathname))moduleRequests.push(request.url());});
  await openTasks(page,unit);
  await expect(page.getByRole('tab',{name:/^(Můj postup|Postup)$/})).toHaveCount(0);
  await expect(page.getByRole('tab')).toHaveCount(3);
  await expect(page.locator('[data-study-module]')).toHaveCount(0);
  expect(moduleRequests).toEqual([]);
 });
}

test('HEX task exposes its actual prompt, honest deadline and all four reviewed worked-result files',async({page})=>{
 await openTasks(page);
 const task=panel(page).locator('.task-card').filter({has:page.getByRole('heading',{name:hexTitle,exact:true})});
 await expect(task).toHaveCount(1);
 await expect(task.locator('.task-deadline')).toHaveText('Termín není zveřejněný');
 await expect(task.locator('.task-deadline time')).toHaveCount(0);
 const disclosure=task.locator('details.task-summary');
 await expect(disclosure).not.toHaveAttribute('open');
 await disclosure.locator('summary').click();
 await expect(disclosure).toHaveAttribute('open','');
 await expect(disclosure).toContainText(/50\s*[×x]\s*50/);
 await expect(disclosure).toContainText(/HEX/);
 await expect(disclosure).toContainText(/barv/i);
 await expect(task.locator('.task-files a')).toHaveCount(4);
 expect(hexLesson.solutions).toHaveLength(4);
 for(const solution of hexLesson.solutions){
  const link=task.locator('.task-files a').filter({hasText:solution.title});
  await expect(link).toHaveCount(1);
  await expect(link).toHaveAttribute('href',solution.url);
  await expect(link).toBeVisible();
  expect(solution.url).toMatch(/^https:\/\/github\.com\/hphugosm\/study\/releases\/download\//);
 }
 await fits(page);
});

test('an empty topic says no tasks are published without inventing a deadline or a solution',async({page})=>{
 await openTasks(page,'baroque');
 await expect(panel(page).locator('.tasks-empty')).toHaveText('Pro toto téma zatím nejsou zveřejněné žádné úkoly.');
 await expect(panel(page).locator('.task-card,.task-files,.task-deadline')).toHaveCount(0);
 await expect(page.locator('[data-study-module]')).toHaveCount(0);
});

test('an old progress deep link selects Tasks and keeps task content after reload',async({page})=>{
 await openTasks(page,hexUnit,'progress');
 await expect(panel(page).getByRole('heading',{name:hexTitle,exact:true})).toBeVisible();
 await expect(page.locator('.progress-card')).toHaveCount(0);
 await page.reload();
 await expect(tasksTab(page)).toHaveAttribute('aria-selected','true');
 await expect(panel(page).getByRole('heading',{name:hexTitle,exact:true})).toBeVisible();
 await expect(page.locator('[data-study-module]')).toHaveCount(0);
});

test('unit tabs and task disclosure work by keyboard and fit a narrow dark phone',async({page})=>{
 await page.setViewportSize({width:320,height:700});
 await page.goto('./#/settings');
 await page.locator('[name="theme"][value="dark"]').check();
 await openTasks(page);
 await tasksTab(page).focus();
 await page.keyboard.press('ArrowLeft');
 const materials=page.getByRole('tab',{name:'Materiály',exact:true});
 await expect(materials).toBeFocused();
 await expect(materials).toHaveAttribute('aria-selected','true');
 await page.keyboard.press('End');
 await expect(tasksTab(page)).toBeFocused();
 await expect(tasksTab(page)).toHaveAttribute('aria-selected','true');
 await expect(panel(page)).toBeVisible();
 await expect(panel(page).getByRole('heading',{name:hexTitle,exact:true})).toBeVisible();
 await expect(tasksTab(page)).toBeFocused();
 const summary=panel(page).locator('.task-card').filter({has:page.getByRole('heading',{name:hexTitle,exact:true})}).locator('.task-summary>summary');
 await summary.focus();
 await summary.press('Enter');
 await expect(summary.locator('..')).toHaveAttribute('open','');
 await summary.press('Space');
 await expect(summary.locator('..')).not.toHaveAttribute('open');
 const target=await tasksTab(page).boundingBox();
 expect(target.height).toBeGreaterThanOrEqual(44);
 await fits(page);
 await expect(page.getByRole('tab',{name:/^(Můj postup|Postup)$/})).toHaveCount(0);
});

test('a reviewed Moodle assignment shows its real Prague deadline while missing prompt and solution remain explicit',async({page})=>{
 await openTasks(page,'moodle-geography-78d788409010e2eb6c2a02318a5eba7f');
 const task=panel(page).locator('[data-assignment-id="moodle-006bab857d67053988f21c7d477c033ac9633ef42f98bb7a63dd80fc4d2a3e97"]');
 await expect(task.getByRole('heading',{name:'SLEPÁ MAPA LATINSKÉ AMERIKY',exact:true})).toBeVisible();
 const due=task.locator('.task-deadline time');
 await expect(due).toHaveAttribute('datetime','2026-05-07T22:00:00.000Z');
 await expect(due).toContainText(/8\.\s*května\s*2026/);
 await expect(due).toContainText('00:00');
 await expect(due).toContainText('Praha');
 await task.locator('.task-summary>summary').click();
 await expect(task.locator('.task-summary')).toContainText('Úplné zadání zatím není zveřejněné. Ověř ho v Moodlu.');
 await expect(task.getByRole('link',{name:'Otevřít školní Moodle',exact:true})).toHaveAttribute('href','https://ais.gymnazium-amazon.cz/');
 await expect(task.locator('.task-solution-missing')).toHaveText('Hotové řešení zatím není zveřejněné.');
 await expect(task.locator('.task-files')).toHaveCount(0);
 await expect(page.locator('[data-study-module]')).toHaveCount(0);
});
