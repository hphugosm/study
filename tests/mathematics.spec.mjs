import { test, expect } from '@playwright/test';
import { questions as trigQuestions } from '../modules/math-trig/content.js';
import { questions as equationQuestions } from '../modules/math-equations/data.js';
import { units } from '../src/data.js';

const trigKey = 'study:mathematics:trig-functions:progress:v1';
const equationKey = 'study:mathematics:trig-equations:progress:v1';
const math = (page, module = 'math-trig') => page.locator(`[data-study-module="${module}"]`);
async function openMath(page, unit = 'trig-functions') {
  await page.goto(`./#/units/${unit}`);
  const host = math(page, unit === 'trig-functions' ? 'math-trig' : 'math-equations');
  await expect(host).toBeVisible();
  return host;
}
async function openView(host, view) {
  await host.locator(`[data-view="${view}"]`).click();
}
async function fitsViewport(page) {
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
}

test('Mathematics shows exactly two new categories and the calendar preparation opens both', async ({ page, request, baseURL }) => {
  await page.goto('./#/subjects/mathematics');
  const cards = page.locator('.unit-list > .unit-card');
  await expect(cards).toHaveCount(2);
  await expect(cards.filter({ hasText: 'Trigonometrie a goniometrické funkce' })).toBeVisible();
  await expect(cards.filter({ hasText: 'Goniometrické vzorce, rovnice a nerovnice' })).toBeVisible();
  await page.goto('./#/events/math-test');
  for (const id of ['trig-functions', 'trig-equations']) await expect(page.locator(`a[href="#/units/${id}"]`).first()).toBeVisible();
  await fitsViewport(page);
  await page.getByRole('tab', { name: /materiály/i }).click();
  const sourceLinks = page.locator('a.material-card[href$=".pptx"]');
  await expect(sourceLinks).toHaveCount(3);
  for (const url of await sourceLinks.evaluateAll(links => links.map(link => link.getAttribute('href')))) {
    const response = await request.get(new URL(url, baseURL.endsWith('/') ? baseURL : `${baseURL}/`).href);
    expect(response.status()).toBe(200);
    expect((await response.body()).subarray(0, 2).toString()).toBe('PK');
  }
});

test('unit circle responds to angle input and keyboard slider while marking singular values correctly', async ({ page }) => {
  const host = await openMath(page);
  await openView(host, 'circle');
  await host.locator('#angle-degrees').fill('90');
  await host.locator('#angle-degrees').press('Tab');
  await expect(host.locator('#circle-values [data-value="sin"]')).toContainText('1');
  await expect(host.locator('#circle-values [data-value="cos"]')).toContainText('0');
  await expect(host.locator('#circle-values [data-value="tan"]')).toContainText(/nedefinováno|není definov/i);
  await expect(host.locator('#circle-values [data-value="cot"]')).toContainText('0');
  const point = host.locator('#unit-circle');
  const first = await point.innerHTML();
  await host.locator('#angle-slider').focus();
  await host.locator('#angle-slider').press('ArrowRight');
  await expect.poll(() => host.locator('#angle-degrees').inputValue()).not.toBe('90');
  await expect.poll(() => point.innerHTML()).not.toBe(first);
  await fitsViewport(page);
});

test('graph controls transform real curves, expose asymptotes and restore the supplied even-function example', async ({ page }) => {
  const host = await openMath(page);
  await openView(host, 'graphs');
  const path = host.locator('#graph-svg path.curve').first();
  await expect(path).toHaveAttribute('d', /[ML]/);
  const before = await path.getAttribute('d');
  await host.locator('#graph-a').focus();
  await host.locator('#graph-a').press('ArrowRight');
  await expect.poll(() => path.getAttribute('d')).not.toBe(before);
  await host.locator('#function-select').selectOption('tan');
  await expect.poll(() => host.locator('#graph-svg path.curve').count()).toBeGreaterThan(1);
  await expect(host.locator('#graph-properties')).toContainText(/asymptot/i);
  await host.locator('#graph-example').click();
  await expect(host.locator('#graph-properties')).toContainText(/sudá/i);
  await expect(host.locator('#graph-properties')).toContainText(/−5|-5/);
  await expect(host.locator('#graph-properties')).toContainText(/−1|-1/);
  await fitsViewport(page);
});

test('trigonometry cards and completed quiz persist independently of the existing subjects', async ({ page }) => {
  const host = await openMath(page);
  await openView(host, 'cards');
  await host.locator('#flip-card').click();
  await expect(host.locator('#card-answer')).toBeVisible();
  await host.locator('#know-card').click();
  await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key) || '{}').knownCards?.length || 0, trigKey)).toBe(1);
  await page.reload();
  await openView(math(page), 'cards');
  await expect(math(page).locator('#card-count')).toContainText('1');
  await openView(math(page), 'quiz');
  for (const question of trigQuestions) {
    await math(page).locator(`[data-choice="${question.answer}"]`).click();
    await expect(math(page).locator('#quiz-feedback')).toContainText(question.explain);
    await math(page).locator('#quiz-next').click();
  }
  await expect(math(page).locator('#quiz-result')).toBeVisible();
  const progress = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), trigKey);
  expect(progress.attempts).toHaveLength(1);
  expect(progress.attempts[0].score).toBe(trigQuestions.length);
  expect(progress.attempts[0].total).toBe(trigQuestions.length);
  await page.getByRole('tab', { name: 'Můj postup' }).click();
  await expect(page.locator('.progress-card').filter({ hasText: 'dokončených testů' }).locator('strong')).toHaveText('1');
});

test('all mathematics views inherit themes, fit small screens and coexist with Law and Biology', async ({ page }, testInfo) => {
  if (testInfo.project.name === 'mobile') await page.setViewportSize({ width: 320, height: 700 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('./#/settings');
  await page.locator('[name="theme"][value="dark"]').check();
  const host = await openMath(page);
  for (const view of ['circle', 'graphs', 'triangle', 'cards', 'quiz']) {
    await openView(host, view);
    await fitsViewport(page);
  }
  const colors = await host.evaluate(element => {
    const root = element.firstElementChild.shadowRoot;
    return { shell: getComputedStyle(document.documentElement).getPropertyValue('--study-text').trim(), module: getComputedStyle(root.host).getPropertyValue('--study-text').trim() };
  });
  expect(colors.module).toBe(colors.shell);
  const equationsHost = await openMath(page, 'trig-equations');
  for (const view of ['notes', 'solver', 'inequalities', 'cards', 'quiz']) {
    await openView(equationsHost, view);
    await fitsViewport(page);
  }
  await page.goto('./#/events/law-test');
  await expect(math(page, 'law')).toBeVisible();
  await page.goto('./#/events/biology-test');
  await expect(math(page, 'biology')).toBeVisible();
  await openMath(page);
  await expect(page.locator('iframe')).toHaveCount(0);
  expect(errors).toEqual([]);
});


test('equation presets reveal justified steps, divide the period and reject impossible substitutions', async ({ page }) => {
  const host = await openMath(page, 'trig-equations');
  await openView(host, 'solver');
  await host.locator('#equation-select').selectOption('sin-three');
  await expect(host.locator('.step')).toHaveCount(1);
  await host.locator('#step-next').click();
  await expect(host.locator('.step')).toHaveCount(2);
  await host.locator('#step-all').click();
  await expect(host.locator('#equation-solution')).toContainText('π/18');
  await expect(host.locator('#equation-solution')).toContainText('2kπ/3');
  await host.locator('#equation-select').selectOption('quadratic');
  await host.locator('#step-all').click();
  await expect(host).toContainText('t = 3 není přípustné');
  await expect(host.locator('#equation-solution')).toContainText('7π/6');
  await expect(host.locator('#equation-solution')).toContainText('11π/6');
  await fitsViewport(page);
});

test('inequality diagrams exclude strict endpoints and update the chosen period and angle', async ({ page }) => {
  const host = await openMath(page, 'trig-equations');
  await openView(host, 'inequalities');
  await host.locator('#inequality-select').selectOption('sin-greater');
  const angle = host.locator('#angle-slider');
  await angle.evaluate(input => { input.value = '30'; input.dispatchEvent(new Event('input', { bubbles: true })); });
  await expect(host.locator('#inequality-readout')).toContainText(/nepatří|nesplňuje|neplatí/i);
  await angle.evaluate(input => { input.value = '90'; input.dispatchEvent(new Event('input', { bubbles: true })); });
  await expect(host.locator('#inequality-readout')).toContainText(/patří|splňuje|platí/i);
  await expect(host.locator('#inequality-readout')).not.toContainText(/nepatří|nesplňuje|neplatí/i);
  await expect(host.locator('#inequality-line .endpoint')).toHaveCount(2);
  const before = await host.locator('#inequality-line').innerHTML();
  await host.locator('#period-slider').focus();
  await host.locator('#period-slider').press('ArrowRight');
  await expect.poll(() => host.locator('#inequality-line').innerHTML()).not.toBe(before);
  await host.locator('#inequality-select').selectOption('sin-less');
  await expect(host).toContainText('−7π/6');
  for (const id of ['#inequality-circle', '#inequality-graph', '#inequality-line']) await expect(host.locator(id)).toBeVisible();
  await fitsViewport(page);
});

test('equation cards persist and quiz gives explanations before saving a complete result', async ({ page }) => {
  let host = await openMath(page, 'trig-equations');
  await openView(host, 'cards');
  await host.locator('#card-flip').click();
  await expect(host.locator('#card-answer')).toBeVisible();
  await host.locator('#card-known').click();
  await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key) || '{}').knownCards?.length || 0, equationKey)).toBe(1);
  await page.reload();
  host = math(page, 'math-equations');
  await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key) || '{}').knownCards?.length || 0, equationKey)).toBe(1);
  await openView(host, 'quiz');
  for (let index = 0; index < equationQuestions.length; index++) {
    const question = equationQuestions[index];
    await host.locator(`[data-choice="${question.correct}"]`).click();
    await expect(host.locator('.feedback')).toContainText(question.explanation);
    if (index < equationQuestions.length - 1) await host.locator('#quiz-next').click();
  }
  await host.locator('#quiz-finish').click();
  await expect(host.locator('#quiz-score')).toBeVisible();
  const progress = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), equationKey);
  expect(progress.attempts).toHaveLength(1);
  expect(progress.attempts[0].score).toBe(equationQuestions.length);
  expect(progress.attempts[0].total).toBe(equationQuestions.length);
  expect(await page.evaluate(key => localStorage.getItem(key), trigKey)).toBeNull();
});


test('calendar-only first visit prepares unopened mathematics modules and original presentations for offline use', async ({ page, context }) => {
  test.setTimeout(120_000);
  await page.goto('./');
  await expect(page.locator('[data-study-module]')).toHaveCount(0);
  await expect.poll(() => page.evaluate(async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    const pwa = await import(new URL('src/pwa.js', location.href).href);
    return Boolean(registration?.active && navigator.serviceWorker.controller && pwa.getPwaState().offlineReady);
  }), { timeout: 60_000 }).toBe(true);
  const materials = [...new Set(units.filter(unit => ['trig-functions', 'trig-equations'].includes(unit.id)).flatMap(unit => unit.materials.map(item => item.url)))];
  expect(materials).toHaveLength(3);
  await context.setOffline(true);
  try {
    await openMath(page);
    await page.reload();
    const trig = math(page);
    await openView(trig, 'circle');
    await trig.locator('#angle-degrees').fill('90');
    await expect(trig.locator('#circle-values [data-value="tan"]')).toHaveText('nedefinováno');
    await openView(trig, 'cards');
    await trig.locator('#flip-card').click();
    await trig.locator('#know-card').click();
    await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key) || '{}').knownCards?.length || 0, trigKey)).toBe(1);
    await openMath(page, 'trig-equations');
    await page.reload();
    const equationsHost = math(page, 'math-equations');
    await openView(equationsHost, 'solver');
    await equationsHost.locator('#equation-select').selectOption('sin-three');
    await equationsHost.locator('#step-all').click();
    await expect(equationsHost.locator('#equation-solution')).toContainText('π/18');
    await expect(equationsHost.locator('#equation-solution')).toContainText('2kπ/3');
    for (const path of materials) {
      // Fetch runs inside the offline browser; Playwright's request client would bypass this condition.
      const result = await page.evaluate(async path => {
        const response = await fetch(new URL(path, location.href));
        const bytes = new Uint8Array(await response.arrayBuffer());
        return { status: response.status, magic: String.fromCharCode(...bytes.slice(0, 2)), bytes: bytes.byteLength };
      }, path);
      expect(result.status, path).toBe(200);
      expect(result.magic, path).toBe('PK');
      expect(result.bytes, path).toBeGreaterThan(1000);
    }
    await openMath(page);
    await page.reload();
    expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)).knownCards.length, trigKey)).toBe(1);
  } finally {
    await context.setOffline(false);
  }
});
