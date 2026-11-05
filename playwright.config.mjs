import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.mjs',
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.STUDY_TEST_URL || 'http://127.0.0.1:4173',
    locale: 'cs-CZ',
    timezoneId: 'Europe/Prague',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop', testIgnore: ['**/phone.spec.mjs', '**/pwa-settings.spec.mjs'], use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', testIgnore: ['**/phone.spec.mjs', '**/pwa-settings.spec.mjs'], use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
    { name: 'pwa-desktop', testMatch: '**/pwa-settings.spec.mjs', grepInvert: /Safari offers/, use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 }, serviceWorkers: 'allow' } },
    { name: 'pwa-mobile', testMatch: '**/pwa-settings.spec.mjs', grepInvert: /Safari offers/, use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium', serviceWorkers: 'allow' } },
    { name: 'pwa-safari', testMatch: '**/pwa-settings.spec.mjs', use: { ...devices['iPhone 13'], defaultBrowserType: 'webkit', serviceWorkers: 'allow' } },
    { name: 'worksheet-safari', testMatch: '**/worksheets.spec.mjs', use: { ...devices['iPhone 13'], defaultBrowserType: 'webkit', serviceWorkers: 'allow' } },
    ...[
      ['iphone-small-320', 'iPhone SE', { width: 320, height: 568 }],
      ['iphone-se-375', 'iPhone SE (3rd gen)', { width: 375, height: 667 }],
      ['iphone-390', 'iPhone 13', { width: 390, height: 664 }],
      ['iphone-max-430', 'iPhone 14 Pro Max', { width: 430, height: 740 }],
      ['iphone-landscape', 'iPhone 13 landscape', { width: 844, height: 390 }],
    ].map(([name, device, viewport]) => ({
      name,
      testMatch: '**/phone.spec.mjs',
      use: { ...devices[device], defaultBrowserType: 'webkit', viewport },
    })),
  ],
});
