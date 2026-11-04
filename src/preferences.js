const KEY = 'study:preferences:v1';
export const defaultPreferences = { theme: 'system', accent: 'sage', largerText: false };
const themes = ['system', 'light', 'dark', 'paper'];
const accents = ['sage', 'blue', 'plum', 'amber'];
const listeners = new Set();
let preferences = readPreferences();
let initialized = false;

function sanitize(value = {}) {
  return {
    theme: themes.includes(value?.theme) ? value.theme : defaultPreferences.theme,
    accent: accents.includes(value?.accent) ? value.accent : defaultPreferences.accent,
    largerText: value?.largerText === true,
  };
}
function readPreferences() {
  try { return sanitize(JSON.parse(localStorage.getItem(KEY) || '{}')); }
  catch { return { ...defaultPreferences }; }
}
function applyPreferences() {
  const root = document.documentElement;
  const resolved = preferences.theme === 'system' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : preferences.theme;
  root.dataset.theme = resolved;
  root.dataset.accent = preferences.accent;
  root.dataset.largeText = String(preferences.largerText);
  root.style.colorScheme = resolved === 'dark' ? 'dark' : 'light';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = getComputedStyle(root).getPropertyValue('--study-bg').trim() || '#fafaf8';
  listeners.forEach(listener => listener(getPreferences()));
}
export function getPreferences() { return { ...preferences }; }
export function updatePreferences(patch) {
  preferences = sanitize({ ...preferences, ...patch });
  let saved = true;
  try { localStorage.setItem(KEY, JSON.stringify(preferences)); } catch { saved = false; }
  applyPreferences();
  return { preferences: getPreferences(), saved };
}
export function subscribePreferences(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
export function initPreferences() {
  if (initialized) return;
  initialized = true;
  applyPreferences();
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (preferences.theme === 'system') applyPreferences();
  });
  window.addEventListener('storage', event => {
    if (event.key === KEY || event.key === null) {
      preferences = readPreferences(); applyPreferences();
    }
  });
}
