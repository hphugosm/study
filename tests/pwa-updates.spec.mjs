import { test as baseTest, expect } from '@playwright/test';
import { updateServer } from './helpers/update-server.mjs';
import { readPwaState } from './helpers/pwa-state.mjs';

const test = baseTest.extend({
  legacyClient: [false, { option: true }],
  rollout: async ({ legacyClient }, use) => {
    const server = await updateServer({ legacy: legacyClient });
    try { await use(server); } finally { await server.close(); }
  },
});
test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-04T12:00:00+01:00'));
});

async function workerState(page) {
  return page.evaluate(async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    const worker = navigator.serviceWorker.controller || registration?.active;
    if (!worker) return {};
    return new Promise(resolve => {
      const channel = new MessageChannel();
      const timer = setTimeout(() => { channel.port1.close(); resolve({}); }, 2000);
      channel.port1.onmessage = event => { clearTimeout(timer); channel.port1.close(); resolve(event.data); };
      worker.postMessage({ type: 'GET_STATUS' }, [channel.port2]);
    });
  }).catch(() => ({})); // A successful automatic navigation can replace the evaluation context.
}
async function ready(page, version) {
  await expect.poll(() => workerState(page), { timeout: 60_000 }).toMatchObject({ version, offlineReady: true });
}
async function focusCheck(page, minute = 2) {
  await page.clock.setFixedTime(new Date(`2026-11-04T12:0${minute}:00+01:00`));
  await page.evaluate(() => window.dispatchEvent(new Event('focus')));
}
async function startQuiz(page, url) {
  await page.goto(`${url}#/events/law-test`);
  const law = page.locator('[data-study-module="law"]');
  await law.locator('[data-route="practice"]').click();
  await law.locator('[data-mode="mcq"]').click();
  await law.locator('[data-action="start"]').click();
  await law.locator('[data-choice]').first().click();
  await expect(law.locator('.pr-feedback')).toBeVisible();
  return { law, question: await law.locator('#pr-question-title').textContent() };
}
async function waiting(page) {
  await expect.poll(() => page.evaluate(async () => Boolean((await navigator.serviceWorker.getRegistration())?.waiting)), { timeout: 60_000 }).toBe(true);
}

test('calendar updates itself on return, reuses verified assets, repairs a corrupt asset and preserves progress offline', async ({ page, context, rollout }) => {
  await page.goto(rollout.url);
  await ready(page, rollout.oldVersion);
  await page.evaluate(async () => {
    localStorage.setItem('study:law:progress:v1', JSON.stringify({ knownCards: ['q001'], mistakes: [], attempts: [], readLessons: [] }));
    localStorage.setItem('study:preferences:v1', JSON.stringify({ theme: 'paper', accent: 'plum', largerText: true }));
    const cacheName = (await caches.keys()).find(name => name.startsWith('study-offline:'));
    const cache = await caches.open(cacheName);
    await cache.put(new URL('modules/biology/assets/kosterni-soustava-prehled.pdf', location.href), new Response('corrupt'));
    await caches.open('unrelated-app-sentinel');
  });
  rollout.publish();
  await focusCheck(page);
  await ready(page, rollout.newVersion);
  await expect(page.locator('[data-date="2026-11-19"]')).toHaveAccessibleName(/Law/);
  await expect(page.locator('#app-update-status')).toContainText('Studilo je aktuální');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'paper');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('study:law:progress:v1')).knownCards)).toEqual(['q001']);
  expect(await page.evaluate(() => caches.keys())).toContain('unrelated-app-sentinel');
  const downloads = rollout.requests.filter(request => request.phase === 1).map(request => request.asset);
  expect(downloads).toContain('src/data.js');
  expect(downloads).toContain('modules/biology/assets/kosterni-soustava-prehled.pdf');
  expect(downloads).not.toContain('modules/law/assets/US_Law_Expanded_English_Study_Notes.pdf');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  if (process.env.STUDY_UPDATE_PROOF && test.info().project.name === 'pwa-safari') await page.screenshot({ path: process.env.STUDY_UPDATE_PROOF });
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator('[data-date="2026-11-19"]')).toHaveAccessibleName(/Law/);
  expect(await page.evaluate(async () => (await (await fetch('modules/biology/assets/kosterni-soustava-prehled.pdf')).text()).slice(0, 5))).toBe('%PDF-');
});

test('a real release waits for the answered quiz and applies automatically after returning to calendar', async ({ page, rollout }) => {
  await page.goto(rollout.url);
  await ready(page, rollout.oldVersion);
  const { law, question } = await startQuiz(page, rollout.url);
  rollout.publish();
  await focusCheck(page);
  await waiting(page);
  await expect(law.locator('#pr-question-title')).toHaveText(question);
  await expect(law.locator('.pr-feedback')).toBeVisible();
  expect((await workerState(page)).version).toBe(rollout.oldVersion);
  await page.locator('header .wordmark').click();
  await ready(page, rollout.newVersion);
  await expect(page.locator('[data-date="2026-11-19"]')).toHaveAccessibleName(/Law/);
  await page.getByRole('button', { name: 'Zpět', exact: true }).click();
  await expect(page).toHaveURL(/#\/events\/law-test$/);
  await page.getByRole('button', { name: 'Vpřed', exact: true }).click();
  await expect(page).toHaveURL(/#\/$/);
  await expect(page.locator('[data-date="2026-11-19"]')).toHaveAccessibleName(/Law/);
});

test('a quiz in another panel postpones automatic activation until both panels are in calendar', async ({ page, rollout }) => {
  await page.goto(rollout.url);
  await ready(page, rollout.oldVersion);
  const other = await page.context().newPage();
  const { law, question } = await startQuiz(other, rollout.url);
  rollout.publish();
  await page.bringToFront();
  await focusCheck(page);
  await waiting(page);
  await expect(page.locator('#app-update-status')).toContainText('ostatních panelů');
  await expect(law.locator('#pr-question-title')).toHaveText(question);
  await expect(law.locator('.pr-feedback')).toBeVisible();
  expect((await workerState(page)).version).toBe(rollout.oldVersion);
  await other.bringToFront();
  await other.locator('header .wordmark').click();
  await ready(page, rollout.newVersion);
  await ready(other, rollout.newVersion);
  await expect(other.locator('[data-date="2026-11-19"]')).toHaveAccessibleName(/Law/);
  await expect(page.locator('[data-date="2026-11-19"]')).toHaveAccessibleName(/Law/);
  await other.close();
});

test('a failed release leaves the old snapshot working and retries on the next return', async ({ page, rollout }) => {
  await page.goto(rollout.url);
  await ready(page, rollout.oldVersion);
  await page.evaluate(() => { window.updateSentinel = 'unchanged'; localStorage.setItem('study-update-sentinel', 'preserved'); });
  rollout.fail('src/data.js');
  rollout.publish();
  await focusCheck(page);
  await expect.poll(() => page.evaluate(readPwaState), { timeout: 60_000 }).toMatchObject({ updateFailed: true });
  expect((await workerState(page)).version).toBe(rollout.oldVersion);
  expect(await page.evaluate(() => window.updateSentinel)).toBe('unchanged');
  await expect(page.locator('[data-date="2026-11-12"]')).toHaveAccessibleName(/Law/);
  rollout.fail(undefined);
  await focusCheck(page, 4);
  await ready(page, rollout.newVersion);
  await expect(page.locator('[data-date="2026-11-19"]')).toHaveAccessibleName(/Law/);
  expect(await page.evaluate(() => localStorage.getItem('study-update-sentinel'))).toBe('preserved');
});

test.describe('existing clients without automatic-update UI', () => {
  test.use({ legacyClient: true });
  test('legacy clients keep their current page and get automation after closing and reopening normally', async ({ page, context, rollout }) => {
    await page.goto(rollout.url);
    await ready(page, rollout.oldVersion);
    await expect(page.locator('#app-update-status')).toHaveCount(0);
    await page.evaluate(() => localStorage.setItem('study-update-sentinel', 'preserved'));
    rollout.publish();
    await page.reload();
    await waiting(page);
    await expect(page.locator('[data-date="2026-11-12"]')).toHaveAccessibleName(/Law/);
    await page.close();
    const reopened = await context.newPage();
    await reopened.goto(rollout.url);
    await ready(reopened, rollout.newVersion);
    await expect(reopened.locator('[data-date="2026-11-19"]')).toHaveAccessibleName(/Law/);
    expect(await reopened.evaluate(() => localStorage.getItem('study-update-sentinel'))).toBe('preserved');
    await reopened.close();
  });
});
