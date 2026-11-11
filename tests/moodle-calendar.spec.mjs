import {test,expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {events as manualEvents} from '../src/data.js';

// Calendar/task checks do not need a full offline installation of the course library.
test.use({serviceWorkers:'block'});
const feed=JSON.parse(readFileSync(new URL('../modules/moodle-sync/feed.json',import.meta.url),'utf8'));
function pragueDay(seconds){
 const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Prague',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(seconds*1000));
 return ['year','month','day'].map(kind=>parts.find(part=>part.type===kind).value).join('-');
}
// Derive the fixture from approved positive deadlines; never infer dates from titles or hashes.
const deadlines=[...new Map(feed.entries.filter(entry=>entry.kind==='assignment'&&entry.available!==false&&entry.policy_excluded!==true&&Number.isSafeInteger(entry.due)&&entry.due>0).map(entry=>[entry.id,entry])).values()];
const months=[...new Set(deadlines.map(entry=>pragueDay(entry.due).slice(0,7)))].sort();
const linkedManual=entry=>manualEvents.find(event=>event.sourceAssignmentId===entry.id);
const deadlineId=entry=>linkedManual(entry)?.id||'moodle-deadline-'+entry.id;
const calendarTitle=entry=>entry.title;
const selectedLink=(page,id)=>page.locator(`.selected-events a[href="#/events/${id}"]`);
async function openMonth(page,month){
 await page.clock.setFixedTime(new Date(month+'-15T12:00:00+01:00'));
 await page.goto('./');
 await expect(page.locator('.calendar-layout')).toBeVisible();
}
async function fits(page){await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);}

for(const month of months){
 test(`approved Moodle deadlines appear on their real Prague days without duplicate links: ${month}`,async({page})=>{
  await openMonth(page,month);
  const entries=deadlines.filter(entry=>pragueDay(entry.due).startsWith(month));
  expect(entries.length).toBeGreaterThan(0);
  const unlinkedManual=manualEvents.filter(event=>!deadlines.some(entry=>entry.id===event.sourceAssignmentId));
  const expectedMonthCount=entries.length+unlinkedManual.filter(event=>event.date.startsWith(month)).length;
  await expect(page.locator('.month-count')).toContainText(new RegExp(`^${expectedMonthCount} `));
  for(const date of [...new Set(entries.map(entry=>pragueDay(entry.due)))]){
   const day=page.locator(`[data-date="${date}"]`);
   await day.click();
   await expect(day).toHaveAttribute('aria-pressed','true');
   // Related school-calendar rows must not create a second event for the same due date.
   await expect(page.locator('.selected-events a.event-card[href^="#/events/moodle-"]')).toHaveCount(entries.filter(entry=>pragueDay(entry.due)===date&&deadlineId(entry).startsWith('moodle-')).length);
   for(const entry of entries.filter(entry=>pragueDay(entry.due)===date)){
    await expect.poll(()=>day.getAttribute('aria-label')).toContain(calendarTitle(entry));
    const link=selectedLink(page,deadlineId(entry));
    await expect(link).toHaveCount(1);
    await expect(link.locator('h3')).toHaveText(calendarTitle(entry));
    await expect(link.locator('.event-type')).toHaveText(entry.calendar_type==='test'?'Test':'Domácí úkol');
    const chips=await day.locator('.calendar-chip .chip-title').allTextContents();
    expect(chips).toContain(calendarTitle(entry));
   }
  }
  await expect(page.locator('[data-study-module]')).toHaveCount(0);
  await fits(page);
 });
}

test('the May 8 geography deadline opens the matching Tasks card and precise Prague time',async({page})=>{
 await openMonth(page,'2026-05');
 const id='006bab857d67053988f21c7d477c033ac9633ef42f98bb7a63dd80fc4d2a3e97';
 const entry=deadlines.find(item=>item.id===id);
 expect(entry).toBeTruthy();
 expect(pragueDay(entry.due)).toBe('2026-05-08');
 const day=page.locator('[data-date="2026-05-08"]');
 await day.click();
 const title=day.locator('.calendar-chip .chip-title').filter({hasText:'SLEPÁ MAPA LATINSKÉ AMERIKY'});
 await expect(title).toHaveCount(1);
 await expect(day.locator('.calendar-chip .chip-title').filter({hasText:'Rozbor Lakomce'})).toHaveCount(0);
 await selectedLink(page,deadlineId(entry)).click();
 await expect(page.getByRole('tab',{name:'Úkoly',exact:true})).toHaveAttribute('aria-selected','true');
 const task=page.locator(`[data-assignment-id="moodle-${id}"]`);
 await expect(task.getByRole('heading',{name:entry.title,exact:true})).toBeVisible();
 await expect(task.locator('.task-deadline time')).toHaveAttribute('datetime','2026-05-07T22:00:00.000Z');
 await expect(task.locator('.task-deadline time')).toContainText('00:00');
 await expect(task.locator('.task-deadline time')).toContainText('Praha');
 await expect(page.locator('[data-study-module]')).toHaveCount(0);
 await fits(page);
 await page.locator('#page-back').click();
 await expect(page.locator('[data-date="2026-05-08"]')).toHaveAttribute('aria-pressed','true');
 await expect(selectedLink(page,deadlineId(entry))).toBeVisible();
});

test('manual events survive the Moodle merge and keyboard day/month selection fits a 320px phone',async({page})=>{
 await page.setViewportSize({width:320,height:700});
 await openMonth(page,'2026-11');
 for(const event of manualEvents){
  const source=deadlines.find(entry=>entry.id===event.sourceAssignmentId);
  const date=source?pragueDay(source.due):event.date;
  await page.locator(`[data-date="${date}"]`).click();
  await expect(selectedLink(page,event.id)).toHaveCount(1);
  await expect(selectedLink(page,event.id).locator('h3')).toHaveText(source?source.title:event.title);
 }
 const day=page.locator('[data-date="2026-11-05"]');
 await day.focus();
 await day.press('Enter');
 await expect(day).toHaveAttribute('aria-pressed','true');
 await expect(selectedLink(page,'biology-test')).toBeVisible();
 await expect(selectedLink(page,'math-test')).toBeVisible();
 const next=page.getByRole('button',{name:'Další měsíc',exact:true});
 await next.focus();
 await next.press('Enter');
 await expect(page.locator('[data-date="2026-12-15"]')).toBeVisible();
 const previous=page.getByRole('button',{name:'Předchozí měsíc',exact:true});
 await previous.focus();
 await previous.press('Space');
 await expect(page.locator('[data-date="2026-11-15"]')).toBeVisible();
 const excursion=page.locator('[data-date="2026-11-12"]');
 await excursion.focus();
 await excursion.press('Space');
 await expect(excursion).toHaveAttribute('aria-pressed','true');
 await expect(selectedLink(page,'power-plants-excursion')).toBeVisible();
 await fits(page);
});

test('a direct Moodle event link waits for metadata and opens the selected task first',async({page})=>{
 const id='006bab857d67053988f21c7d477c033ac9633ef42f98bb7a63dd80fc4d2a3e97';
 await page.goto(`./#/events/moodle-deadline-${id}`);
 await expect(page.getByRole('tab',{name:'Úkoly',exact:true})).toHaveAttribute('aria-selected','true');
 const first=page.locator('.task-card').first();
 await expect(first).toHaveAttribute('data-assignment-id','moodle-'+id);
 await expect(first).toHaveAttribute('data-selected-assignment','true');
 await expect(page.locator('.event-banner')).toContainText('00:00');
 await expect(page.locator('.event-banner')).toContainText('Praha');
 await expect(page.locator('.task-card')).toHaveCount(2);
});

test('unavailable Moodle metadata keeps manual events and retry preserves the chosen day',async({page})=>{
 let unavailable=true;
 await page.route('**/modules/moodle-sync/feed.json',route=>route.fulfill({status:unavailable?503:200,json:unavailable?{}:feed}));
 await openMonth(page,'2026-11');
 await expect(page.locator('.calendar-sync-warning')).toContainText('ručně přidané události');
 await page.locator('[data-date="2026-11-05"]').click();
 await expect(selectedLink(page,'biology-test')).toBeVisible();
 await expect(selectedLink(page,'math-test')).toBeVisible();
 const entry=deadlines.find(item=>pragueDay(item.due).startsWith('2026-11')&&!linkedManual(item));
 expect(entry).toBeTruthy();
 const date=pragueDay(entry.due);
 await page.locator(`[data-date="${date}"]`).click();
 await expect(selectedLink(page,deadlineId(entry))).toHaveCount(0);
 unavailable=false;
 await page.getByRole('button',{name:'Zkusit znovu',exact:true}).click();
 await expect(page.locator('.calendar-sync-warning')).toHaveCount(0);
 await expect(page.locator(`[data-date="${date}"]`)).toHaveAttribute('aria-pressed','true');
 await expect(selectedLink(page,deadlineId(entry))).toBeVisible();
 await expect(page.locator('.calendar-layout')).toBeVisible();
});

test('November 19 has one Test at 08:30; canonical and old Moodle links retain Law practice and select the actual task',async({page})=>{
 const id='4a1dfc8941791503106e8a3354cfb70f061bc2b5713825f53f08edb0cb5c25ed';
 const source=deadlines.find(entry=>entry.id===id);
 expect(source).toBeTruthy();
 expect(source.calendar_type).toBe('test');
 expect(deadlineId(source)).toBe('law-test');
 await openMonth(page,'2026-11');
 const day=page.locator('[data-date="2026-11-19"]');
 await day.click();
 await expect(day.locator('.calendar-chip')).toHaveCount(1);
 await expect(day.locator('.calendar-chip.test')).toHaveCount(1);
 await expect(day.locator('.mobile-event-dots .test')).toHaveCount(1);
 await expect(page.locator('.selected-events .event-card')).toHaveCount(1);
 await expect(selectedLink(page,'law-test').locator('.event-type')).toHaveText('Test');
 await expect(selectedLink(page,'law-test')).toContainText('08:30');
 for(const eventId of ['law-test','moodle-deadline-'+id]){
  await page.goto(`./#/events/${eventId}`);
  await expect(page.locator('.event-banner.test')).toHaveCount(1);
  await expect(page.locator('.event-banner strong')).toContainText('08:30');
  await expect(page.locator('.event-banner strong')).toContainText('Praha');
  await expect(page.locator('.event-banner .banner-title')).toHaveText(source.title);
  await expect(page.getByRole('tab',{name:'Podklady a procvičování',exact:true})).toHaveAttribute('aria-selected','true');
  await expect(page.locator('[data-study-module="law"]')).toBeVisible();
  const assignment=page.getByRole('link',{name:'Zadání testu',exact:true});
  await expect(assignment).toHaveAttribute('href',`#/units/moodle-law-e34a26cc76ae3e441e97436d2360a95f?tab=tasks&assignment=${id}`);
  await assignment.click();
  await expect(page.getByRole('tab',{name:'Úkoly',exact:true})).toHaveAttribute('aria-selected','true');
  const selected=page.locator('.task-card[data-selected-assignment="true"]');
  await expect(selected).toHaveCount(1);
  await expect(selected).toHaveAttribute('data-assignment-id','moodle-'+id);
  await expect(selected.getByRole('heading',{name:source.title,exact:true})).toBeVisible();
  await expect(selected.locator('.task-deadline time')).toHaveAttribute('datetime','2026-11-19T07:30:00.000Z');
 }
 await fits(page);
});
