import { test, expect } from '@playwright/test';
import { questions } from '../modules/law/data/questions.js';
import { vocabulary } from '../modules/law/data/vocabulary.js';

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-04T12:00:00+01:00'));
});

async function openEvent(page, id) {
  await page.goto(`./#/events/${id}`);
  await expect(page.locator('[data-study-module]')).toBeVisible();
}

function moduleFor(page, subject) {
  return page.locator(`[data-study-module="${subject}"]`);
}

async function biologyPage(page, mode) {
  const module = moduleFor(page, 'biology');
  await module.locator(`[data-page="${mode}"]`).click();
  await expect(module.locator(`#${mode}-page`)).toBeVisible();
  return module;
}

async function lawPage(page, mode) {
  const module = moduleFor(page, 'law');
  await module.locator(`[data-route="${mode}"]`).click();
  return module;
}

async function expectSavedCount(page, label, count) {
  await page.getByRole('tab', { name: 'Můj postup' }).click();
  await expect(page.locator('.progress-card').filter({ hasText: label }).locator('strong')).toHaveText(String(count));
}

test('calendar displays two November 5 events and opens both real units', async ({ page }) => {
  await page.goto('./');
  await page.locator('[data-date="2026-11-05"]').click();
  const biology = page.locator('a[href="#/events/biology-test"]').first();
  const math = page.locator('a[href="#/events/math-test"]').first();
  await expect(biology).toBeVisible();
  await expect(math).toBeVisible();
  await biology.click();
  await expect(moduleFor(page, 'biology').locator('#atlas-page')).toBeVisible();
  await page.locator('header a[href="#/"]').first().click();
  await expect(page.locator('[data-date="2026-11-05"]')).toBeVisible();
  await page.locator('[data-date="2026-11-12"]').click();
  await page.locator('a[href="#/events/law-test"]').first().click();
  await expect(moduleFor(page, 'law')).toBeVisible();
  await expect(page.getByText('UNIT 2', { exact: true })).toBeVisible();
});

test('calendar navigates months and returns to current date', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('[data-date="2026-11-04"]')).toBeVisible();
  await page.getByRole('button', { name: /další měsíc/i }).click();
  await expect(page.locator('[data-date="2026-12-15"]')).toBeVisible();
  await page.getByRole('button', { name: /předchozí měsíc/i }).click();
  await expect(page.locator('[data-date="2026-11-15"]')).toBeVisible();
  await page.getByRole('button', { name: /předchozí měsíc/i }).click();
  await expect(page.locator('[data-date="2026-10-15"]')).toBeVisible();
  await page.getByRole('button', { name: /dnes/i }).click();
  await expect(page.locator('[data-date="2026-11-04"]')).toBeVisible();
});

test('biology atlas has 64 entries, working search, images, cards, zoom and persisted mastery', async ({ page }) => {
  await openEvent(page, 'biology-test');
  const module = moduleFor(page, 'biology');
  await expect(module.locator('#bone-count')).toContainText('64');
  await module.locator('#bone-search').fill('pažní');
  await expect(module.locator('#bone-directory')).toContainText('Kost pažní');
  await module.locator('#bone-directory button').first().click();
  await expect(module.locator('#bone-detail h3')).toContainText('Kost pažní');
  await expect(module.locator('#bone-detail img')).toBeVisible();
  await expect.poll(() => module.locator('#bone-detail img').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  await biologyPage(page, 'cards');
  await expect(module.locator('#card-position')).toContainText('64');
  await expect.poll(() => module.locator('#flashcard img').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  await module.locator('#card-image-zoom').click();
  await expect(module.locator('#image-preview')).toBeVisible();
  await module.getByRole('button', { name: 'Zavřít detail obrázku' }).click();
  await module.locator('#flip-card').click();
  await module.locator('#know-card').click();
  await expect(module.locator('#mastered-total')).toHaveText('1');
  await page.reload();
  await biologyPage(page, 'cards');
  await expect(module.locator('#mastered-total')).toHaveText('1');
  await expectSavedCount(page, 'zvládnutých položek', 1);
});

test('biology blank map has both modes, real targets and corrective feedback', async ({ page }) => {
  await openEvent(page, 'biology-test');
  const module = await biologyPage(page, 'map');
  await expect(module.locator('#map-position')).toContainText('64');
  await expect(module.locator('#map-skeleton [data-bone]').first()).toBeAttached();
  await module.locator('[data-map-mode="unnamed"]').click();
  await expect(module.locator('#map-question-image')).toBeVisible();
  await expect.poll(() => module.locator('#map-question-image').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  await module.locator('#map-reveal').click();
  await expect(module.locator('#map-feedback')).not.toBeEmpty();
  await expect(module.locator('#map-skeleton .map-correct').first()).toBeAttached();
  await module.locator('#map-next').click();
  await expect(module.locator('#map-position')).toContainText('2');
  await module.locator('[data-map-mode="named"]').click();
  await expect(module.locator('#map-mode-label')).toContainText('S NÁZVEM');
});

test('biology map saves a completed result and offers retry of the mistaken set', async ({ page }) => {
  await openEvent(page, 'biology-test');
  const module = await biologyPage(page, 'map');
  await module.locator('#map-region').selectOption('trup');
  await expect(module.locator('#map-position')).toContainText('10');
  for (let index = 0; index < 10; index++) {
    await module.locator('#map-reveal').click();
    await module.locator('#map-next').click();
  }
  await expect(module.locator('#map-results')).toBeVisible();
  await expect(module.locator('#map-result-score')).toContainText('0');
  const result = await page.evaluate(() => JSON.parse(localStorage.getItem('study:biology:map-results'))[0]);
  expect(result.total).toBe(10);
  expect(result.correct).toBe(0);
  expect(result.mistakes).toHaveLength(10);
  await module.locator('#map-repeat-mistakes').click();
  await expect(module.locator('#map-exercise')).toBeVisible();
  await expect(module.locator('#map-position')).toContainText('10');
  await page.reload();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('study:biology:map-results'))[0])).toEqual(result);
  await expectSavedCount(page, 'uložených výsledků', 1);
});

test('Law flashcards retain answers, explanations and saved learning progress', async ({ page }) => {
  await openEvent(page, 'law-test');
  let module = await lawPage(page, 'flashcards');
  await module.locator('[data-action="flip"]').click();
  await expect(module.locator('.pr-card-answer')).toBeVisible();
  await module.locator('[data-action="known"]').click();
  await expect(module.locator('.pr-count')).toContainText('1 /');
  await page.reload();
  module = await lawPage(page, 'flashcards');
  await expect(module.locator('.pr-count')).toContainText('1 /');
  await expectSavedCount(page, 'známých kartiček', 1);
});

test('Law offers every question format, explains answers and saves session results', async ({ page }) => {
  await openEvent(page, 'law-test');
  const module = await lawPage(page, 'practice');
  for (const mode of ['mcq', 'boolean', 'text', 'order', 'matching', 'mixed']) {
    await expect(module.locator(`[data-mode="${mode}"]`)).toBeVisible();
  }
  await module.locator('[data-mode="mcq"]').click();
  await module.locator('[data-action="start"]').click();
  await module.locator('[data-choice]').first().click();
  await expect(module.locator('.pr-feedback')).toBeVisible();
  await expect(module.locator('.pr-feedback p').first()).not.toBeEmpty();
  await module.locator('[data-action="finish-early"]').click();
  await expect(module.locator('#pr-results-title')).toBeVisible();
  await expect(module.locator('.pr-score')).toContainText('/ 1');
  await expect.poll(() => page.evaluate(() => Object.keys(localStorage).filter(key => key.startsWith('study:law:')).some(key => {
    try { return JSON.parse(localStorage.getItem(key)).attempts?.length > 0; } catch { return false; }
  }))).toBe(true);
  await expectSavedCount(page, 'dokončených testů', 1);
});

for (const mode of ['boolean', 'text', 'order', 'matching']) {
  test(`Law ${mode} exercise can be answered and gives feedback`, async ({ page }) => {
    await openEvent(page, 'law-test');
    const module = await lawPage(page, 'practice');
    await module.locator(`[data-mode="${mode}"]`).click();
    await module.locator('[data-action="start"]').click();
    if (mode === 'matching') {
      for (let index = 0; index < 5; index++) {
        const term = module.locator('[data-match-term]:not([disabled])').first();
        const id = await term.getAttribute('data-match-term');
        await term.click();
        await module.locator(`[data-match-definition="${id}"]`).click();
      }
      await expect(module.getByText('All pairs connected.')).toBeVisible();
    } else {
      const prompt = await module.locator('#pr-question-title').textContent();
      const item = questions.find(question => question.prompt === prompt) || vocabulary.map(term => ({
        prompt: `Which legal term matches this English definition? ${term.definition}`,
        answers: [term.term],
      })).find(question => question.prompt === prompt);
      if (mode === 'boolean') {
        await module.locator(`[data-boolean="${item.correct}"]`).click();
      } else if (mode === 'text') {
        await module.locator('[name="text-answer"]').fill(item.answers[0]);
        await module.getByRole('button', { name: 'Check answer', exact: true }).click();
      } else {
        // Restore each requested step through the actual keyboard-accessible UI.
        for (let target = 0; target < item.steps.length; target++) {
          let order = await module.locator('.pr-order-list li > span:nth-child(2)').allTextContents();
          let current = order.indexOf(item.steps[target]);
          while (current > target) {
            await module.locator(`[data-move="${current}"][data-direction="-1"]`).click();
            current--;
          }
        }
        await module.locator('[data-action="check-order"]').click();
      }
      await expect(module.locator('.pr-feedback.is-positive')).toBeVisible();
    }
  });
}

test('legacy progress is copied without overwriting or removing the originals', async ({ page }) => {
  const law = { knownCards: ['q001'], mistakes: [], attempts: [], readLessons: ['plessy'] };
  const biology = ['pazni'];
  await page.addInitScript(({ law, biology }) => {
    localStorage.setItem('casebook-us-law-progress-v1', JSON.stringify(law));
    localStorage.setItem('kostra-progress-v2', JSON.stringify(biology));
  }, { law, biology });
  await openEvent(page, 'biology-test');
  await biologyPage(page, 'cards');
  await expect(moduleFor(page, 'biology').locator('#mastered-total')).toHaveText('1');
  await page.goto('./#/events/law-test');
  await expect(moduleFor(page, 'law')).toBeVisible();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('casebook-us-law-progress-v1')))).toEqual(law);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('kostra-progress-v2')))).toEqual(biology);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('study:law:progress:v1')))).toEqual(law);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('study:biology:kostra-progress-v2')))).toEqual(biology);
});

test('switching subjects preserves shell navigation without leaking original globals', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await openEvent(page, 'biology-test');
  await biologyPage(page, 'map');
  await page.goto('./#/events/law-test');
  await lawPage(page, 'flashcards');
  await page.goto('./#/events/biology-test');
  await expect(moduleFor(page, 'biology').locator('#atlas-page')).toBeVisible();
  await expect(page.locator('iframe')).toHaveCount(0);
  await expect(page.locator('header a[href="#/subjects"]')).toBeVisible();
  expect(errors).toEqual([]);
  expect(await page.evaluate(() => ['KOSTRA_DATA', 'KOSTRA_SVG', 'KostraMapUI'].filter(key => key in window))).toEqual([]);
});

test('placeholder subjects state that materials have not been supplied', async ({ page }) => {
  for (const route of ['math-test', 'literature-assignment']) {
    await page.goto(`./#/events/${route}`);
    await expect(page.getByText(/dosud nepřid|zatím nepřid|nebyly.*přid|materiály.*přid/i).first()).toBeVisible();
    await expect(page.locator('[data-study-module]')).toHaveCount(0);
  }
});

test('layout fits viewport on calendar and both subject pages', async ({ page }) => {
  for (const route of ['./', './#/events/biology-test', './#/events/law-test']) {
    await page.goto(route);
    if (route !== './') await expect(page.locator('[data-study-module]')).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
});
