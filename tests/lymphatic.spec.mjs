import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
const data=JSON.parse(await readFile(new URL('../modules/biology-lymphatic/data.json',import.meta.url)));
const visual=data.structures.filter(s=>!s.cardOnly);
const moduleFor=page=>page.locator('[data-study-module="biology-lymphatic"]');
async function open(page,mode='atlas'){
  await page.goto(`/#/units/lymphatic?mode=${mode}`);
  const module=moduleFor(page);
  await expect(module.locator('[data-mode="atlas"]')).toBeVisible();
  await expect(module.locator('nav button').first()).toHaveCSS('border-radius','12px');
  return module;
}
test.beforeEach(async({context,page},info)=>{
  if(info.project.name==='lymphatic-safari')await page.setViewportSize({width:320,height:568});
  await context.route('**/sw.js',route=>route.abort());
});

test('body systems stay separate; exact source images load and notes start collapsed',async({page},info)=>{
  await page.goto('/#/subjects/biology');
  // The category section has an accessible label even when the browser exposes it as a section.
  const links=page.locator('section[aria-label="Hlavní studijní kategorie"] .unit-card');
  await expect(links).toHaveCount(4);
  await expect(links.nth(0)).toHaveAttribute('href','#/units/skeleton');
  await expect(links.nth(1)).toHaveAttribute('href','#/units/muscles');
  await expect(links.nth(2)).toHaveAttribute('href','#/units/circulation');
  await expect(links.nth(3)).toHaveAttribute('href','#/units/lymphatic');
  const module=await open(page);
  await expect(module.locator('[data-select]')).toHaveCount(4);
  const image=module.locator('svg image').first();
  await expect(image).toHaveAttribute('href',data.assets['image20.jpg'].url);
  const loaded=await page.evaluate(async url=>{
    const image=new Image();image.src=url;await image.decode();return [image.naturalWidth,image.naturalHeight];
  },data.assets['image20.jpg'].url);
  expect(loaded).toEqual([960,720]);
  await module.locator('[data-mode="notes"]').click();
  await expect(module.locator('div.notes>details')).toHaveCount(3);
  await expect(module.locator('div.notes>details[open]')).toHaveCount(0);
  await module.locator('div.notes>details summary').first().click();
  await expect(module.locator('div.notes>details[open]')).toHaveCount(1);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:info.outputPath('lymphatic-notes.png'),fullPage:true});
  await page.getByRole('link',{name:'Předměty',exact:true}).first().click();
  await expect(moduleFor(page)).toHaveCount(0);
});

test('recognition completes every target and repeats only mistakes without answer leaks',async({page},info)=>{
  const module=await open(page,'cards');
  await expect(module.locator('.toolbar')).toContainText('1 / 4');
  await module.getByRole('button',{name:'Zvětšit obrázek',exact:true}).click();
  const dialog=module.getByRole('dialog');
  await expect(dialog).toBeVisible();
  expect(await dialog.locator('svg title').allTextContents()).toEqual(['Anatomická oblast']);
  await expect(dialog.locator('svg')).toHaveAttribute('viewBox','34 7 27 48');
  await expect(dialog.locator('svg rect')).toHaveCount(4);
  await expect(dialog).toContainText('Anatomický podklad');
  await dialog.getByRole('button',{name:'Zavřít obrázek'}).click();
  const seen=[];
  for(let i=0;i<visual.length;i++){
    await module.locator('[data-flip]').click();
    seen.push(await module.locator('.exercise .panel article h2').innerText());
    await module.locator(`[data-grade="${i===0?'0':'1'}"]`).click();
  }
  expect(new Set(seen)).toEqual(new Set(visual.map(s=>s.name)));
  await expect(module).toContainText('3 správně z 4 otázek');
  await module.locator('[data-repeat]').click();
  await expect(module.locator('.toolbar')).toContainText('1 / 1');
  await module.locator('[data-flip]').click();
  await expect(module.locator('.exercise .panel article h2')).toHaveText(seen[0]);
  await module.locator('[data-grade="1"]').click();
  await expect(module).toContainText('1 správně z 1 otázek');
  await module.locator('[data-mode="flashcards"]').click();
  await expect(module.locator('.flash')).not.toContainText(data.cards[0].answer);
  await module.locator('[data-flip]').focus();
  await page.keyboard.press('Enter');
  await expect(module.locator('.flash')).toContainText(data.cards[0].answer);
  await page.screenshot({path:info.outputPath('lymphatic-card.png'),fullPage:true});
});

test('zoomed map accepts the reviewed target by touch and progress remains isolated',async({page},info)=>{
  const module=await open(page,'map');
  const title=await module.locator('main>h2').innerText();
  const target=visual.find(s=>title===`Najdi: ${s.name}`);
  expect(target).toBeTruthy();
  await module.getByRole('button',{name:'Zvětšit obrázek',exact:true}).click();
  const dialog=module.getByRole('dialog');
  await expect(dialog.locator('[data-target]')).toHaveCount(4);
  await expect(dialog.locator('svg')).toHaveAttribute('viewBox','34 7 27 48');
  const area=dialog.locator(`[data-target="${target.id}"]`);
  if(info.project.name==='desktop')await area.click();else await area.tap();
  await expect(dialog).toHaveCount(0);
  await expect(module.locator('[data-next]')).toBeFocused();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await expect(module).toContainText('Správně!');
  const progress=await page.evaluate(()=>JSON.parse(localStorage.getItem('study:biology:lymphatic:v1')));
  expect(progress.known).toContain(target.id);
  await page.goto('/#/units/circulation');
  await expect(page.locator('[data-study-module="biology-circulation"]')).toBeVisible();
  expect(await page.evaluate(()=>localStorage.getItem('study:biology:circulation:v1'))).toBeNull();
  await open(page);
  await expect(moduleFor(page).locator('.toolbar')).toContainText('1 / 4 zvládnuto');
});
