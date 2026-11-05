const FORMAT = 'study-progress';
const MAX_BYTES = 2 * 1024 * 1024;
const LAW = 'study:law:progress:v1';
const BIO_V1 = 'study:biology:kostra-progress-v1';
const BIO_V2 = 'study:biology:kostra-progress-v2';
const MAP_RESULTS = 'study:biology:map-results';
const MAP_PROGRESS = 'study:biology:map-progress';
const MATH_FUNCTIONS = 'study:mathematics:trig-functions:progress:v1';
const MATH_EQUATIONS = 'study:mathematics:trig-equations:progress:v1';
const CARD_PROGRESS = [LAW, MATH_FUNCTIONS, MATH_EQUATIONS];
const KEYS = [...CARD_PROGRESS, BIO_V1, BIO_V2, MAP_RESULTS, MAP_PROGRESS];
const LEGACY = { [LAW]: 'casebook-us-law-progress-v1', [BIO_V1]: 'kostra-progress-v1', [BIO_V2]: 'kostra-progress-v2' };

function fail(message = 'Soubor neobsahuje platnou zálohu postupu study lo.') { throw new Error(message); }
function record(value, allowed) {
  if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).some(key => !allowed.includes(key))) fail();
}
function strings(value) {
  if (!Array.isArray(value) || value.length > 10000 || value.some(item => typeof item !== 'string' || !item.length || item.length > 200 || /[\u0000-\u001f]/.test(item))) fail();
  return [...new Set(value)];
}
function integer(value, max = 10000) { if (!Number.isInteger(value) || value < 0 || value > max) fail(); return value; }
function date(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(value) || !Number.isFinite(Date.parse(value))) fail();
  const canonical = new Date(value).toISOString();
  if (canonical.slice(0, 19) !== value.slice(0, 19)) fail();
  return canonical;
}
function attempt(value) {
  record(value, ['date', 'score', 'total', 'mode']);
  const total = integer(value.total), score = integer(value.score, total);
  if (!['mixed', 'mcq', 'boolean', 'text', 'order', 'matching'].includes(value.mode)) fail();
  return { date: date(value.date), score, total, mode: value.mode };
}
function mapRecord(value, current = false) {
  record(value, current ? ['mode', 'region', 'total', 'answered', 'correct', 'mistakes', 'updatedAt'] : ['mode', 'region', 'total', 'correct', 'mistakes', 'finishedAt']);
  if (!['named', 'unnamed'].includes(value.mode) || !['all', 'hlava', 'trup', 'horni', 'dolni'].includes(value.region)) fail();
  const total = integer(value.total, 64);
  const answered = current ? integer(value.answered, total) : total;
  const correct = integer(value.correct, answered);
  const mistakes = strings(value.mistakes);
  if (mistakes.length > answered) fail();
  return current
    ? { mode: value.mode, region: value.region, total, answered, correct, mistakes, updatedAt: date(value.updatedAt) }
    : { mode: value.mode, region: value.region, total, correct, mistakes, finishedAt: date(value.finishedAt) };
}
function arrayOf(value, validator) {
  if (!Array.isArray(value) || value.length > 10000) fail();
  return value.map(validator);
}
function validateValue(key, value) {
  if (CARD_PROGRESS.includes(key)) {
    record(value, ['knownCards', 'mistakes', 'attempts', 'readLessons']);
    return {
      knownCards: strings(value.knownCards), mistakes: strings(value.mistakes),
      attempts: arrayOf(value.attempts, attempt), readLessons: strings(value.readLessons),
    };
  }
  if (key === BIO_V1 || key === BIO_V2) return strings(value);
  if (key === MAP_RESULTS) return arrayOf(value, item => mapRecord(item));
  if (key === MAP_PROGRESS) return mapRecord(value, true);
  fail();
}
function validateBackup(backup) {
  record(backup, ['format', 'version', 'createdAt', 'data']);
  if (backup.format !== FORMAT || backup.version !== 1) fail('Tato verze zálohy není podporovaná.');
  const createdAt = date(backup.createdAt);
  record(backup.data, KEYS);
  const data = {};
  for (const [key, value] of Object.entries(backup.data)) data[key] = validateValue(key, value);
  return { format: FORMAT, version: 1, createdAt, data };
}
function summarize(data) {
  return {
    lawCards: data[LAW]?.knownCards.length || 0,
    lawAttempts: data[LAW]?.attempts.length || 0,
    biologyCards: (data[BIO_V2] || data[BIO_V1] || []).length,
    mapResults: data[MAP_RESULTS]?.length || 0,
    mathCards: [MATH_FUNCTIONS, MATH_EQUATIONS].reduce((sum, key) => sum + (data[key]?.knownCards.length || 0), 0),
    mathAttempts: [MATH_FUNCTIONS, MATH_EQUATIONS].reduce((sum, key) => sum + (data[key]?.attempts.length || 0), 0),
    records: Object.keys(data).length,
  };
}
function readStored(storage, key) {
  const raw = storage.getItem(key) ?? (LEGACY[key] ? storage.getItem(LEGACY[key]) : null);
  if (raw === null) return undefined;
  let parsed;
  try { parsed = JSON.parse(raw); } catch { fail('Uložený postup je poškozený. Původní data zůstala beze změny.'); }
  return validateValue(key, parsed);
}
function uniqueRecords(items) {
  const seen = new Set();
  return items.filter(item => { const key = JSON.stringify(item); if (seen.has(key)) return false; seen.add(key); return true; });
}
function merge(key, previous, incoming) {
  if (previous === undefined) return incoming;
  if (key === MAP_PROGRESS) return previous;
  if (CARD_PROGRESS.includes(key)) return {
    knownCards: [...new Set([...previous.knownCards, ...incoming.knownCards])],
    mistakes: [...new Set([...previous.mistakes, ...incoming.mistakes])],
    attempts: uniqueRecords([...previous.attempts, ...incoming.attempts]),
    readLessons: [...new Set([...previous.readLessons, ...incoming.readLessons])],
  };
  return key === MAP_RESULTS ? uniqueRecords([...previous, ...incoming]) : [...new Set([...previous, ...incoming])];
}

/** Build a portable backup. Only study progress is included; legacy keys are read, never changed. */
export function buildBackup(storage = globalThis.localStorage) {
  const data = {};
  for (const key of KEYS) { const value = readStored(storage, key); if (value !== undefined) data[key] = value; }
  const backup = { format: FORMAT, version: 1, createdAt: new Date().toISOString(), data };
  if (new TextEncoder().encode(JSON.stringify(backup, null, 2)).byteLength > MAX_BYTES) fail('Postup přesahuje velikost podporované zálohy 2 MB. Původní data zůstala beze změny.');
  return backup;
}

/** Validate before presenting an import review. No storage writes occur here. */
export function parseBackup(text) {
  if (typeof text !== 'string' || new TextEncoder().encode(text).byteLength > MAX_BYTES) fail('Záloha musí být JSON soubor menší než 2 MB.');
  let value;
  try { value = JSON.parse(text); } catch { fail('Soubor není platný JSON. Vyber zálohu staženou ze study lo.'); }
  const backup = validateBackup(value);
  return { backup, summary: summarize(backup.data) };
}

/** Merge after an explicit user action. Existing progress and every legacy key are preserved. */
export function restoreBackup(parsed, storage = globalThis.localStorage) {
  const backup = validateBackup(parsed?.backup || parsed);
  const changes = [];
  const data = {};
  for (const [key, incoming] of Object.entries(backup.data)) {
    const previous = readStored(storage, key);
    const merged = merge(key, previous, incoming);
    // Revalidate merged sizes and counts before making any write.
    data[key] = validateValue(key, merged);
    changes.push({ key, before: storage.getItem(key), after: JSON.stringify(data[key]) });
  }
  const written = [];
  try {
    for (const change of changes) { storage.setItem(change.key, change.after); written.push(change); }
  } catch {
    let restored = true;
    for (const change of written.reverse()) {
      try { if (change.before === null) storage.removeItem(change.key); else storage.setItem(change.key, change.before); }
      catch { restored = false; }
    }
    fail(restored ? 'Import se nepodařilo uložit. Původní postup zůstal beze změny.' : 'Import se nepodařilo dokončit ani plně vrátit. Zachovej soubor zálohy a zkontroluj uložený postup.');
  }
  return summarize(data);
}

/** User-triggered download; browsers on iPhone can save the JSON through their normal file flow. */
export function exportProgress(storage = globalThis.localStorage) {
  const backup = buildBackup(storage);
  const text = JSON.stringify(backup, null, 2);
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url; anchor.download = `study-postup-${backup.createdAt.slice(0, 10)}.json`;
  document.body.append(anchor); anchor.click(); anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
  return summarize(backup.data);
}
