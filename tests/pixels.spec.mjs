import {test,expect} from '@playwright/test';
import {createHash} from 'node:crypto';
import {pixelSamples} from '../modules/course-notes/pixel-data.js';
const unit='moodle-informatics-588cd5ee5179c25883c65e0170e6009f';
async function open(page){await page.goto(`./#/units/${unit}`);const lab=page.locator('.pixels-lab');await expect(lab).toBeVisible();await expect(lab.locator('.pixels-hex')).toHaveText('#1B1F3B');await expect(lab.locator('.pixels-viewport canvas')).toHaveCSS('image-rendering',/pixelated|crisp-edges/);return lab;}
const row=lab=>lab.getByRole('spinbutton',{name:'Řádek v matici',exact:true});
const col=lab=>lab.getByRole('spinbutton',{name:'Sloupec v matici',exact:true});
async function cell(lab,r,c){await row(lab).fill(String(r));await col(lab).fill(String(c));await expect(lab.locator('.pixels-coordinate')).toHaveText(`Řádek ${r} · sloupec ${c}`);}
async function fits(page){await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);}

test('canonical Informatics unit shows both exact source samples and saves widget proof',async({page},info)=>{
 const lab=await open(page);await expect(lab.locator('.pixels-source')).toContainText('R 27');await expect(lab.locator('.pixels-source')).toContainText('G 31');await expect(lab.locator('.pixels-source')).toContainText('B 59');await expect(lab.locator('.pixels-source')).toContainText('50x50 Hex Matrix!A1');
 await lab.getByRole('combobox',{name:'Zdrojový vzorek'}).selectOption('1');await expect(lab.locator('.pixels-hex')).toHaveText('#88C9DF');await expect(lab.locator('.pixels-source')).toContainText('Mountain Lake 50x50!A1');await expect(lab.locator('.pixels-source')).toContainText('R 136');await expect(lab.locator('.pixels-source')).toContainText('G 201');await expect(lab.locator('.pixels-source')).toContainText('B 223');await fits(page);await lab.screenshot({path:info.outputPath('pixels-widget.png')});
});

test('last source cells retain both independent expected values and reject out-of-matrix coordinates',async({page})=>{
 const lab=await open(page);await cell(lab,50,50);await expect(lab.locator('.pixels-hex')).toHaveText('#1A3556');await expect(lab.locator('.pixels-source')).toContainText('!AX50');
 await lab.getByRole('combobox',{name:'Zdrojový vzorek'}).selectOption('1');await cell(lab,50,50);await expect(lab.locator('.pixels-hex')).toHaveText('#367C97');await expect(lab.locator('.pixels-source')).toContainText('!AX50');
 await row(lab).fill('51');await expect(row(lab)).toHaveAttribute('aria-invalid','true');await expect(lab.locator('.pixels-source')).toContainText('Oprav souřadnice');await row(lab).fill('50');await expect(lab.locator('.pixels-hex')).toHaveText('#367C97');
});

test('canvas keyboard selection responds to real key events and stops at each boundary',async({page})=>{
 const lab=await open(page),canvas=lab.locator('.pixels-viewport canvas');await canvas.focus();await canvas.press('ArrowRight');await expect(col(lab)).toHaveValue('2');await canvas.press('End');await expect(col(lab)).toHaveValue('50');await canvas.press('ArrowRight');await expect(col(lab)).toHaveValue('50');await canvas.press('Home');await expect(col(lab)).toHaveValue('1');await canvas.press('ArrowLeft');await canvas.press('ArrowUp');await expect(row(lab)).toHaveValue('1');await expect(col(lab)).toHaveValue('1');await cell(lab,50,1);await canvas.focus();await canvas.press('ArrowDown');await expect(row(lab)).toHaveValue('50');
});

test('canvas click at a measured cell center maps to the actual row, column and color',async({page})=>{
 const lab=await open(page),canvas=lab.locator('.pixels-viewport canvas');await canvas.scrollIntoViewIfNeeded();const b=await canvas.boundingBox();expect(b).not.toBeNull();await canvas.click({position:{x:b.width*2.5/50,y:b.height*1.5/50}});await expect(row(lab)).toHaveValue('2');await expect(col(lab)).toHaveValue('3');await expect(lab.locator('.pixels-hex')).toHaveText(pixelSamples[0].colors[1][2].toUpperCase());await expect(lab.locator('.pixels-source')).toContainText('!C2');
});

test('RGB experiment changes only its own color, rejects 256 and resets to the selected source',async({page})=>{
 const lab=await open(page),red=lab.getByRole('spinbutton',{name:'R · červená hodnota',exact:true}),green=lab.getByRole('spinbutton',{name:'G · zelená hodnota',exact:true}),blue=lab.getByRole('spinbutton',{name:'B · modrá hodnota',exact:true});
 await red.fill('255');await green.fill('0');await blue.fill('0');await expect(lab.locator('.pixels-experiment-code')).toHaveText('#FF0000 = RGB(255, 0, 0)');await expect(lab.locator('.pixels-hex')).toHaveText('#1B1F3B');await red.fill('256');await expect(red).toHaveAttribute('aria-invalid','true');await expect(lab.locator('.pixels-experiment-code')).toContainText('Oprav neplatný kanál');await expect(lab.locator('.pixels-hex')).toHaveText('#1B1F3B');await lab.getByRole('button',{name:'Převzít barvu vybraného pixelu',exact:false}).click();await expect(red).toHaveValue('27');await expect(green).toHaveValue('31');await expect(blue).toHaveValue('59');await expect(lab.locator('.pixels-experiment-code')).toContainText('#1B1F3B');await expect(red).toHaveAttribute('aria-invalid','false');
});

test('zoom scrolls inside its viewport while mobile page and primary touch controls fit',async({page})=>{
 const lab=await open(page),zoom=lab.getByRole('slider',{name:'Zvětšení původní matice'});await zoom.focus();await zoom.press('End');await expect(zoom).toHaveValue('3');const viewport=lab.locator('.pixels-viewport');await expect.poll(()=>viewport.evaluate(n=>n.scrollWidth>n.clientWidth+100)).toBe(true);await fits(page);
 for(const control of [lab.getByRole('combobox',{name:'Zdrojový vzorek'}),row(lab),col(lab),lab.getByRole('button',{name:'Převzít barvu vybraného pixelu',exact:false})]){const box=await control.boundingBox();expect(box).not.toBeNull();expect(box.width).toBeGreaterThanOrEqual(43.5);expect(box.height).toBeGreaterThanOrEqual(43.5);}
 await expect(lab.locator('.pixels-hex')).toHaveText('#1B1F3B');
});

test('new HEX recall card flips one side at a time and saves public card proof',async({page},info)=>{
 await open(page);const shell=page.locator('.course-notes');await shell.getByRole('button',{name:'Procvičování',exact:true}).click();const card=shell.locator('.recall-card').filter({hasText:/1B1F3B/}).first();await expect(card).toBeVisible();const flip=card.locator('.recall-flip');await expect(card.locator('.recall-back')).toBeHidden();await flip.click();await expect(card.locator('.recall-back')).toBeVisible();await expect(card.locator('.recall-face>h3')).toBeHidden();await expect(flip).toHaveAttribute('aria-expanded','true');await card.screenshot({path:info.outputPath('pixels-card.png')});await flip.click();await expect(card.locator('.recall-back')).toBeHidden();await expect(card.locator('.recall-face>h3')).toBeVisible();await fits(page);
});

test('both reviewed public XLSX downloads have ZIP headers and exact derivative SHA',async({request},info)=>{
 test.skip(info.project.name!=='desktop','Download each bounded source once, not for every browser.');test.setTimeout(90_000);
 for(const source of pixelSamples){const url=`https://github.com/hphugosm/study/releases/download/studylo-materials-v1/${source.sha256}.xlsx`;const response=await request.get(url);expect(response.status()).toBe(200);const type=response.headers()['content-type']||'';expect(type).toMatch(/octet-stream|spreadsheetml|zip/i);const size=Number(response.headers()['content-length']||0);expect(size).toBeLessThan(1_000_000);const body=await response.body();expect(body.length).toBeGreaterThan(100);expect(body.length).toBeLessThan(1_000_000);expect(body.subarray(0,2).toString()).toBe('PK');expect(createHash('sha256').update(body).digest('hex')).toBe(source.sha256);}
});
