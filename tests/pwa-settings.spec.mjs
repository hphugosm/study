import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-04T12:00:00+01:00'));
});

const preferences = page => page.evaluate(() => JSON.parse(localStorage.getItem('study:preferences:v1')));
async function choose(page, name, value) {
  const choice = page.locator(`[name="${name}"][value="${value}"]`);
  await choice.check();
}
async function workerReady(page) {
  await expect.poll(() => page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return false;
    const registration = await navigator.serviceWorker.getRegistration();
    return Boolean(registration?.active && navigator.serviceWorker.controller);
  }), { timeout: 60_000 }).toBe(true);
  await expect.poll(() => page.evaluate(async () => {
    const api = await import(new URL('src/pwa.js', location.href).href);
    return api.getPwaState().offlineReady;
  }), { timeout: 60_000 }).toBe(true);
}
async function moduleStyle(page, subject) {
  const module = page.locator(`[data-study-module="${subject}"]`);
  await expect(module).toBeVisible();
  return module.locator(subject === 'biology' ? '.biology-app' : '.lesson-section').first().evaluate(el => {
    const style = getComputedStyle(el);
    return { background: style.backgroundColor, color: style.color, font: parseFloat(style.fontSize) };
  });
}

test('manifest and iPhone metadata support standalone installation under the deployment scope', async ({ page, request, baseURL }) => {
  await page.goto('./');
  const manifestURL = await page.locator('link[rel="manifest"]').getAttribute('href');
  const resolved = new URL(manifestURL, page.url());
  const response = await request.get(resolved.href);
  expect(response.status()).toBe(200);
  const manifest = await response.json();
  expect(manifest.display).toBe('standalone');
  const start = new URL(manifest.start_url, resolved);
  const scope = new URL(manifest.scope, resolved);
  const base = new URL(baseURL.endsWith('/') ? baseURL : `${baseURL}/`);
  expect(start.origin).toBe(base.origin);
  expect(start.pathname.startsWith(base.pathname)).toBe(true);
  expect(scope.pathname).toBe(base.pathname);
  expect(manifest.icons.some(icon => icon.sizes === '192x192')).toBe(true);
  expect(manifest.icons.some(icon => icon.sizes === '512x512')).toBe(true);
  for (const icon of manifest.icons) {
    const iconResponse = await request.get(new URL(icon.src, resolved).href);
    expect(iconResponse.status(), icon.src).toBe(200);
    expect((await iconResponse.body()).length).toBeGreaterThan(100);
  }
  await expect(page.locator('meta[name="apple-mobile-web-app-capable"]')).toHaveAttribute('content', 'yes');
  const touchIcon = await page.locator('link[rel="apple-touch-icon"]').getAttribute('href');
  expect((await request.get(new URL(touchIcon, page.url()).href)).status()).toBe(200);
});

test('settings stay outside primary navigation and selected preferences persist after reload', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('header a[href="#/settings"]')).toHaveCount(0);
  await page.locator('footer a[href="#/settings"]').click();
  await expect(page).toHaveURL(/#\/settings$/);
  await choose(page, 'theme', 'paper');
  await choose(page, 'accent', 'plum');
  await page.locator('[name="largerText"]').check();
  await expect.poll(() => preferences(page)).toMatchObject({ theme: 'paper', accent: 'plum', largerText: true });
  await page.reload();
  await expect(page.locator('[name="theme"][value="paper"]')).toBeChecked();
  await expect(page.locator('[name="accent"][value="plum"]')).toBeChecked();
  await expect(page.locator('[name="largerText"]')).toBeChecked();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});

test('Safari offers an accessible manual iPhone installation guide', async ({ page, browserName }) => {
  test.skip(browserName !== 'webkit', 'Safari manual installation flow');
  await page.goto('./#/settings');
  await page.locator('#install-study').click();
  await expect(page.locator('#install-guide')).toBeVisible();
  await expect(page.locator('#install-guide')).toContainText(/Sdílet/);
  await expect(page.locator('#install-guide')).toContainText(/Přidat na plochu/);
  await expect(page.locator('#install-guide')).toContainText(/Otevřít jako webovou aplikaci/);
});

test('light, dark and paper themes change the actual shell and both isolated study modules', async ({ page }) => {
  await page.goto('./#/settings');
  await choose(page, 'theme', 'light');
  const lightShell = await page.locator('body').evaluate(el => getComputedStyle(el).backgroundColor);
  await page.goto('./#/events/biology-test');
  const bioLight = await moduleStyle(page, 'biology');
  await page.goto('./#/events/law-test');
  const lawLight = await moduleStyle(page, 'law');
  await page.goto('./#/settings');
  await choose(page, 'theme', 'dark');
  const darkShell = await page.locator('body').evaluate(el => getComputedStyle(el).backgroundColor);
  expect(darkShell).not.toBe(lightShell);
  await page.goto('./#/events/biology-test');
  const bioDark = await moduleStyle(page, 'biology');
  await page.goto('./#/events/law-test');
  const lawDark = await moduleStyle(page, 'law');
  expect(bioDark.background).not.toBe(bioLight.background);
  expect(bioDark.color).not.toBe(bioLight.color);
  expect(lawDark.background).not.toBe(lawLight.background);
  expect(lawDark.color).not.toBe(lawLight.color);
  await page.goto('./#/settings');
  await choose(page, 'theme', 'paper');
  expect(await page.locator('body').evaluate(el => getComputedStyle(el).backgroundColor)).not.toBe(darkShell);
  await page.goto('./#/events/biology-test');
  expect((await moduleStyle(page, 'biology')).background).not.toBe(bioDark.background);
  await page.goto('./#/events/law-test');
  expect((await moduleStyle(page, 'law')).background).not.toBe(lawDark.background);
});

test('system theme follows the browser preference and larger text changes rendered study text', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('./#/settings');
  await choose(page, 'theme', 'system');
  const light = await page.locator('body').evaluate(el => getComputedStyle(el).backgroundColor);
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect.poll(() => page.locator('body').evaluate(el => getComputedStyle(el).backgroundColor)).not.toBe(light);
  await page.goto('./#/events/law-test');
  const before = await page.locator('[data-study-module="law"] .lesson-section p').first().evaluate(el => parseFloat(getComputedStyle(el).fontSize));
  await page.goto('./#/settings');
  await page.locator('[name="largerText"]').check();
  await page.goto('./#/events/law-test');
  await expect.poll(() => page.locator('[data-study-module="law"] .lesson-section p').first().evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThan(before);
});

test('first installation caches unopened subjects, images and PDFs and saves progress offline', async ({ page, context }) => {
  test.setTimeout(120_000);
  await page.addInitScript(() => { window.sentinelCache = caches.open('unrelated-app-sentinel'); });
  await page.goto('./');
  await page.evaluate(() => window.sentinelCache);
  await workerReady(page);
  expect(await page.evaluate(() => caches.has('unrelated-app-sentinel'))).toBe(true);
  await context.setOffline(true);
  await page.goto('./#/events/biology-test');
  await page.reload();
  const bio = page.locator('[data-study-module="biology"]');
  await expect(bio.locator('#atlas-page')).toBeVisible();
  await bio.locator('[data-page="cards"]').click();
  await expect.poll(() => bio.locator('#flashcard img').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  await bio.locator('#flip-card').click();
  await bio.locator('#know-card').click();
  await expect(bio.locator('#mastered-total')).toHaveText('1');
  await page.goto('./#/events/law-test');
  await page.reload();
  const law = page.locator('[data-study-module="law"]');
  await law.locator('[data-route="flashcards"]').click();
  await law.locator('[data-action="flip"]').click();
  await law.locator('[data-action="known"]').click();
  await expect(law.locator('.pr-count')).toContainText('1 /');
  const materials = [
    'modules/biology/assets/kosterni-soustava-prehled.pdf',
    'modules/biology/assets/kosterni-soustava-prezentace.pdf',
    'modules/law/assets/US_Law_Expanded_English_Study_Notes.pdf',
    'modules/law/assets/Pravo_USA_barevne_poznamky.pdf',
  ];
  for (const path of materials) {
    const result = await page.evaluate(async path => {
      const response = await fetch(new URL(path, location.href));
      const bytes = new Uint8Array(await response.arrayBuffer());
      return { status: response.status, magic: String.fromCharCode(...bytes.slice(0, 5)) };
    }, path);
    expect(result).toEqual({ status: 200, magic: '%PDF-' });
    const range = await page.evaluate(async path => {
      const response = await fetch(new URL(path, location.href), { headers: { Range: 'bytes=0-9' } });
      return { status: response.status, range: response.headers.get('Content-Range'), length: (await response.arrayBuffer()).byteLength };
    }, path);
    expect(range.status).toBe(206);
    expect(range.range).toMatch(/^bytes 0-9\/\d+$/);
    expect(range.length).toBe(10);
  }
  await page.reload();
  await law.locator('[data-route="flashcards"]').click();
  await expect(law.locator('.pr-count')).toContainText('1 /');
  await context.setOffline(false);
});

test('progress backup downloads and imports through a review step without replacing existing progress', async ({ page }) => {
  await page.goto('./#/settings');
  await page.evaluate(() => {
    localStorage.setItem('study:law:progress:v1', JSON.stringify({ knownCards: ['q001'], mistakes: [], attempts: [], readLessons: [] }));
    localStorage.setItem('study:biology:kostra-progress-v2', JSON.stringify(['pazni']));
  });
  const downloaded = page.waitForEvent('download');
  await page.locator('#export-progress').click();
  const download = await downloaded;
  const exported = JSON.parse(await readFile(await download.path(), 'utf8'));
  expect(exported.format).toBe('study-progress');
  expect(exported.data['study:biology:kostra-progress-v2']).toEqual(['pazni']);
  exported.data['study:biology:kostra-progress-v2'] = ['atlas'];
  exported.data['study:law:progress:v1'].knownCards = ['q002'];
  await page.locator('#backup-file').setInputFiles({ name: 'study-progress.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(exported)) });
  await expect(page.locator('#backup-review')).toBeVisible();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('study:biology:kostra-progress-v2')))).toEqual(['pazni']);
  await page.locator('#restore-progress').click();
  await expect(page.locator('#backup-status')).toContainText('Hotovo');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('study:biology:kostra-progress-v2')))).toEqual(['pazni', 'atlas']);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('study:law:progress:v1')).knownCards)).toEqual(['q001', 'q002']);
});

test('checking for a worker update does not reload or reset an active quiz', async ({ page }) => {
  await page.goto('./');
  await workerReady(page);
  await page.goto('./#/events/law-test');
  const law = page.locator('[data-study-module="law"]');
  await law.locator('[data-route="practice"]').click();
  await law.locator('[data-mode="mcq"]').click();
  await law.locator('[data-action="start"]').click();
  const prompt = await law.locator('#pr-question-title').textContent();
  await law.locator('[data-choice]').first().click();
  await expect(law.locator('.pr-feedback')).toBeVisible();
  await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    await registration.update();
  });
  await expect(law.locator('#pr-question-title')).toHaveText(prompt);
  await expect(law.locator('.pr-feedback')).toBeVisible();
  await expect(law.locator('[data-action="next-question"]')).toBeVisible();
});
