const test = require('node:test');
const assert = require('node:assert/strict');
const LAW = 'study:law:progress:v1';
const BIO = 'study:biology:kostra-progress-v2';
const MAP = 'study:biology:map-results';
const CURRENT = 'study:biology:map-progress';
const FUNCTIONS = 'study:mathematics:trig-functions:progress:v1';
const EQUATIONS = 'study:mathematics:trig-equations:progress:v1';
const now = '2026-11-04T12:00:00.000Z';
const law = knownCards => ({ knownCards, mistakes: ['q002'], attempts: [{ date: now, score: 1, total: 2, mode: 'mcq' }], readLessons: ['plessy'] });
const map = { mode: 'named', region: 'all', total: 64, correct: 2, mistakes: ['lebka'], finishedAt: now };
const current = { mode: 'named', region: 'all', total: 64, correct: 2, answered: 3, mistakes: ['lebka'], updatedAt: now };
function storage(initial = {}) {
  const data = new Map(Object.entries(initial).map(([key, value]) => [key, JSON.stringify(value)]));
  return { data, getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: key => data.delete(key) };
}
const backup = data => JSON.stringify({ format: 'study-progress', version: 1, createdAt: now, data });

test('backup reads legacy data without mutating it and merges into existing progress without duplicates', async () => {
  const { buildBackup, parseBackup, restoreBackup } = await import('../src/backup.js');
  const source = storage({ 'casebook-us-law-progress-v1': law(['q001']), 'kostra-progress-v2': ['pazni'], [MAP]: [map], [CURRENT]: current });
  const legacyBefore = [...source.data];
  const exported = buildBackup(source);
  assert.deepEqual([...source.data], legacyBefore);
  const parsed = parseBackup(JSON.stringify(exported));
  assert.equal(parsed.summary.lawCards, 1);
  assert.equal(parsed.summary.biologyCards, 1);
  const target = storage({ [LAW]: law(['q003']), [BIO]: ['lebka'], [MAP]: [map], [CURRENT]: { ...current, answered: 4 }, 'casebook-us-law-progress-v1': law(['original']) });
  const legacy = target.getItem('casebook-us-law-progress-v1');
  restoreBackup(parsed, target);
  restoreBackup(parsed, target);
  assert.deepEqual(JSON.parse(target.getItem(LAW)).knownCards, ['q003', 'q001']);
  assert.equal(JSON.parse(target.getItem(LAW)).attempts.length, 1);
  assert.deepEqual(JSON.parse(target.getItem(BIO)), ['lebka', 'pazni']);
  assert.equal(JSON.parse(target.getItem(MAP)).length, 1);
  assert.equal(JSON.parse(target.getItem(CURRENT)).answered, 4);
  assert.equal(target.getItem('casebook-us-law-progress-v1'), legacy);
});

test('invalid, oversized and unknown-key imports are rejected before any write', async () => {
  const { parseBackup, restoreBackup } = await import('../src/backup.js');
  for (const text of ['not json', backup({ secret: 'x' }), backup({ [LAW]: { ...law([]), attempts: [{ date: now, score: 3, total: 1, mode: 'mcq' }] } }), backup({ [MAP]: [{ ...map, finishedAt: 'yesterday' }] }), ' '.repeat(2 * 1024 * 1024 + 1)]) assert.throws(() => parseBackup(text));
  assert.throws(() => parseBackup('{"format":"study-progress","version":1,"createdAt":"'+now+'","data":{"__proto__":{}}}'));
  const target = storage({ [BIO]: ['existing'] });
  const before = [...target.data];
  assert.throws(() => restoreBackup({ format: 'study-progress', version: 1, createdAt: now, data: { [BIO]: ['new'], [MAP]: [{ ...map, total: -1 }] } }, target));
  assert.deepEqual([...target.data], before);
});

test('storage failure rolls back completed writes and preserves the legacy originals', async () => {
  const { parseBackup, restoreBackup } = await import('../src/backup.js');
  const target = storage({ [LAW]: law(['old']), 'kostra-progress-v2': ['legacy'] });
  const before = [...target.data];
  const normalSet = target.setItem;
  target.setItem = (key, value) => { if (key === BIO) throw Error('quota'); normalSet(key, value); };
  const parsed = parseBackup(backup({ [LAW]: law(['new']), [BIO]: ['pazni'] }));
  assert.throws(() => restoreBackup(parsed, target), /Původní postup zůstal beze změny/);
  assert.deepEqual([...target.data], before);
});

test('both math units roundtrip independently and merge repeated imports without duplicates', async () => {
  const { buildBackup, parseBackup, restoreBackup } = await import('../src/backup.js');
  const functions = { knownCards: ['circle-sin'], mistakes: ['tan-domain'], attempts: [{ date: now, score: 2, total: 3, mode: 'mcq' }], readLessons: ['unit-circle'] };
  const equations = { knownCards: ['double-angle'], mistakes: ['sin-equation'], attempts: [{ date: now, score: 1, total: 2, mode: 'mixed' }], readLessons: ['identities'] };
  const source = storage({ [FUNCTIONS]: functions, [EQUATIONS]: equations, unrelated: { private: true } });
  const sourceBefore = [...source.data];
  const parsed = parseBackup(JSON.stringify(buildBackup(source)));
  assert.deepEqual([...source.data], sourceBefore);
  assert.deepEqual(Object.keys(parsed.backup.data).sort(), [FUNCTIONS, EQUATIONS].sort());
  assert.equal(parsed.summary.mathCards, 2);
  assert.equal(parsed.summary.mathAttempts, 2);
  const existingFunctions = { ...functions, knownCards: ['cos-range'], readLessons: ['graphs'] };
  const target = storage({ [FUNCTIONS]: existingFunctions, [LAW]: law(['q001']) });
  const existingLaw = target.getItem(LAW);
  restoreBackup(parsed, target);
  restoreBackup(parsed, target);
  assert.deepEqual(JSON.parse(target.getItem(FUNCTIONS)), { ...functions, knownCards: ['cos-range', 'circle-sin'], readLessons: ['graphs', 'unit-circle'] });
  assert.deepEqual(JSON.parse(target.getItem(EQUATIONS)), equations);
  assert.equal(target.getItem(LAW), existingLaw);
  assert.deepEqual(buildBackup(target).data[EQUATIONS], equations);
});

test('legacy backup leaves math progress untouched and malformed math imports are atomic', async () => {
  const { parseBackup, restoreBackup } = await import('../src/backup.js');
  const math = { knownCards: ['sin'], mistakes: [], attempts: [], readLessons: [] };
  const target = storage({ [FUNCTIONS]: math, [EQUATIONS]: math });
  const functionsBefore = target.getItem(FUNCTIONS);
  const equationsBefore = target.getItem(EQUATIONS);
  const legacy = parseBackup(backup({ [LAW]: law(['q001']) }));
  assert.equal(legacy.summary.mathCards, 0);
  assert.equal(legacy.summary.mathAttempts, 0);
  restoreBackup(legacy, target);
  assert.equal(target.getItem(FUNCTIONS), functionsBefore);
  assert.equal(target.getItem(EQUATIONS), equationsBefore);
  const before = [...target.data];
  const invalid = { ...math, attempts: [{ date: now, score: 4, total: 3, mode: 'mcq' }] };
  assert.throws(() => parseBackup(backup({ [EQUATIONS]: invalid })));
  assert.throws(() => restoreBackup(JSON.parse(backup({ [FUNCTIONS]: { ...math, knownCards: ['new'] }, [EQUATIONS]: invalid })), target));
  assert.deepEqual([...target.data], before);
  assert.throws(() => parseBackup(backup({ [FUNCTIONS]: { ...math, unexpected: true } })));
});
