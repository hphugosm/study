import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-04T12:00:00+01:00'));
});

const biology = page => page.locator('[data-study-module="biology"]');
const law = page => page.locator('[data-study-module="law"]');
async function fitsViewport(page) {
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
}
async function fingerTarget(locator) {
  const box = await locator.boundingBox();
  expect(box, 'visible touch target').not.toBeNull();
  expect(box.width, 'touch target width').toBeGreaterThanOrEqual(43.5);
  expect(box.height, 'touch target height').toBeGreaterThanOrEqual(43.5);
}

test('direct event link has safe parent navigation and forward restores both screens', async ({ page }) => {
  await page.goto('./#/events/biology-test');
  await expect(biology(page)).toBeVisible();
  await page.locator('#page-back').tap();
  await expect(page).toHaveURL(/#\/subjects\/biology$/);
  await expect(page.locator('a[href="#/units/skeleton"]').first()).toBeVisible();
  await expect(biology(page)).toHaveCount(0);
  await page.locator('#page-back').tap();
  await expect(page).toHaveURL(/#\/$/);
  await expect(page.locator('[data-date="2026-11-05"]')).toBeVisible();
  await page.locator('#page-forward').tap();
  await expect(page).toHaveURL(/#\/subjects\/biology$/);
  await page.locator('#page-forward').tap();
  await expect(page).toHaveURL(/#\/events\/biology-test$/);
  await expect(biology(page)).toBeVisible();
});

test('browser history survives reload and a new destination discards the old forward branch', async ({ page }) => {
  await page.goto('./#/events/law-test');
  await expect(law(page)).toBeVisible();
  await page.reload();
  await expect(law(page)).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/#\/subjects\/law$/);
  await expect(page.locator('a[href="#/units/law-unit-2"]').first()).toBeVisible();
  await page.goForward();
  await expect(page).toHaveURL(/#\/events\/law-test$/);
  await expect(law(page)).toBeVisible();
  await page.locator('#page-back').tap();
  await expect(page).toHaveURL(/#\/subjects\/law$/);
  await page.locator('header a[href="#/practice"]').tap();
  await expect(page).toHaveURL(/#\/practice$/);
  await expect(page.locator('#page-forward')).toBeDisabled();
  await page.locator('#page-back').tap();
  await expect(page).toHaveURL(/#\/subjects\/law$/);
  await page.locator('#page-forward').tap();
  await expect(page).toHaveURL(/#\/practice$/);
});

test('header remains reachable after scrolling and primary controls have finger-sized targets', async ({ page, request, baseURL }) => {
  await page.goto('./');
  await expect(page.locator('meta[name="viewport"]')).toHaveAttribute('content', /viewport-fit=cover/);
  const stylesheet = await request.get(new URL('styles.css', baseURL.endsWith('/') ? baseURL : `${baseURL}/`).href);
  const css = await stylesheet.text();
  for (const edge of ['top', 'right', 'bottom', 'left']) expect(css).toContain(`env(safe-area-inset-${edge}`);
  await fingerTarget(page.locator('#page-back'));
  await fingerTarget(page.locator('#page-forward'));
  for (const link of await page.locator('header .main-nav a').all()) await fingerTarget(link);
  for (const action of ['previous', 'next', 'today']) await fingerTarget(page.locator(`[data-action="${action}"]`));
  await fingerTarget(page.locator('[data-date="2026-11-05"]'));
  await page.goto('./#/events/biology-test');
  await expect(biology(page).locator('#atlas-page')).toBeVisible();
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
  for (const id of ['page-back', 'page-forward']) {
    const box = await page.locator(`#${id}`).boundingBox();
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.y + box.height).toBeLessThanOrEqual(page.viewportSize().height);
  }
  await page.locator('#page-back').tap();
  await expect(page).toHaveURL(/#\/subjects\/biology$/);
});

test('all key screens and expanded study tools fit an iPhone viewport', async ({ page }) => {
  for (const route of ['', 'subjects', 'subjects/biology', 'practice', 'events/math-test', 'events/law-test', 'events/biology-test']) {
    await page.goto(`./#/${route}`);
    if (route === 'events/biology-test') await expect(biology(page).locator('#atlas-page')).toBeVisible();
    if (route === 'events/law-test') await expect(law(page)).toBeVisible();
    await fitsViewport(page);
  }
  for (const mode of ['cards', 'map', 'notes']) {
    await biology(page).locator(`[data-page="${mode}"]`).tap();
    await expect(biology(page).locator(`#${mode}-page`)).toBeVisible();
    await fitsViewport(page);
  }
  await page.goto('./#/events/law-test');
  for (const route of ['flashcards', 'practice', 'vocabulary', 'resources']) {
    await law(page).locator(`[data-route="${route}"]`).tap();
    await fitsViewport(page);
  }
});

test('study search and answer fields use a readable 16px font to avoid iOS focus zoom', async ({ page }) => {
  await page.goto('./#/events/biology-test');
  await expect(biology(page).locator('#atlas-page')).toBeVisible();
  for (const selector of ['#bone-search']) {
    expect.soft(await biology(page).locator(selector).evaluate(el => parseFloat(getComputedStyle(el).fontSize)), selector).toBeGreaterThanOrEqual(16);
  }
  await biology(page).locator('[data-page="notes"]').tap();
  expect.soft(await biology(page).locator('#notes-search').evaluate(el => parseFloat(getComputedStyle(el).fontSize)), '#notes-search').toBeGreaterThanOrEqual(16);
  await page.goto('./#/events/law-test');
  await law(page).locator('[data-route="vocabulary"]').tap();
  expect.soft(await law(page).locator('#vocab-search').evaluate(el => parseFloat(getComputedStyle(el).fontSize)), '#vocab-search').toBeGreaterThanOrEqual(16);
  await law(page).locator('[data-route="practice"]').tap();
  await law(page).locator('[data-mode="text"]').tap();
  await law(page).locator('[data-action="start"]').tap();
  expect.soft(await law(page).locator('#pr-text-answer').evaluate(el => parseFloat(getComputedStyle(el).fontSize)), '#pr-text-answer').toBeGreaterThanOrEqual(16);
});

test('biology cards, image dialog and both blank-map modes work with taps', async ({ page }) => {
  await page.goto('./#/events/biology-test');
  const module = biology(page);
  await module.locator('[data-page="cards"]').tap();
  await module.locator('#card-image-zoom').tap();
  await expect(module.locator('#image-preview')).toBeVisible();
  const dialog = await module.locator('#image-preview').boundingBox();
  expect(dialog.width).toBeLessThanOrEqual(page.viewportSize().width);
  expect(dialog.height).toBeLessThanOrEqual(page.viewportSize().height);
  await module.getByRole('button', { name: 'Zavřít detail obrázku' }).tap();
  await fingerTarget(module.locator('#flip-card'));
  await module.locator('#flip-card').tap();
  await module.locator('#know-card').tap();
  await expect(module.locator('#mastered-total')).toHaveText('1');
  await module.locator('[data-page="map"]').tap();
  await module.locator('[data-map-mode="unnamed"]').tap();
  await expect(module.locator('#map-question-image')).toBeVisible();
  await module.locator('#map-reveal').tap();
  await expect(module.locator('#map-feedback')).not.toBeEmpty();
  await module.locator('#map-next').tap();
  await module.locator('[data-map-mode="named"]').tap();
  await expect(module.locator('#map-mode-label')).toContainText('S NÁZVEM');
  await fitsViewport(page);
});

test('Law ordering and matching controls remain usable on Safari touch layouts', async ({ page }) => {
  await page.goto('./#/events/law-test');
  const module = law(page);
  await module.locator('[data-route="practice"]').tap();
  await module.locator('[data-mode="order"]').tap();
  await module.locator('[data-action="start"]').tap();
  const up = module.locator('[data-direction="-1"]:not([disabled])').first();
  await fingerTarget(up);
  await up.tap();
  await module.locator('[data-action="check-order"]').tap();
  await expect(module.locator('.pr-feedback')).toBeVisible();
  await fitsViewport(page);
  await module.locator('[data-route="practice"]').tap();
  await module.locator('[data-mode="matching"]').tap();
  await module.locator('[data-action="start"]').tap();
  const term = module.locator('[data-match-term]').first();
  const id = await term.getAttribute('data-match-term');
  await fingerTarget(term);
  await term.tap();
  await module.locator(`[data-match-definition="${id}"]`).tap();
  await expect(module.locator('.pr-feedback.is-positive')).toBeVisible();
  await fitsViewport(page);
});
