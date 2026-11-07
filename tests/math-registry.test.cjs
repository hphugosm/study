const test = require('node:test');
const assert = require('node:assert/strict');
const { access, readFile } = require('node:fs/promises');
const path = require('node:path');

const expected = ['trig-functions', 'trig-equations'];

test('Mathematics preserves its two original interactive categories and existing test destination', async () => {
  const { units, events, getUnit, moduleLoaders } = await import('../src/data.js');
  const mathematics = units.filter(unit => unit.subjectId === 'mathematics');
  const categories = mathematics.filter(unit => unit.module && unit.origin !== 'moodle');
  assert.deepEqual(categories.map(unit => unit.id).sort(), [...expected].sort());
  assert.equal(categories.find(unit => unit.id === 'trig-functions').title, 'Trigonometrie a goniometrické funkce');
  assert.equal(categories.find(unit => unit.id === 'trig-equations').title, 'Goniometrické vzorce, rovnice a nerovnice');
  for (const unit of categories) {
    const module = await moduleLoaders[unit.module]();
    assert.equal(typeof module.mount, 'function');
    assert.equal(typeof module.getProgress, 'function');
  }
  const destination = getUnit(events.find(event => event.id === 'math-test').unitId);
  assert.equal(destination.id, 'math-quarter');
  assert.deepEqual([...destination.relatedUnitIds].sort(), [...expected].sort());
  assert.equal(events.filter(event => event.date === '2026-11-05').length, 2);
  assert.ok(units.find(unit => unit.id === 'skeleton').module === 'biology');
  assert.ok(units.find(unit => unit.id === 'law-unit-2').module === 'law');
});

test('all three original mathematical presentations remain downloadable source materials', async () => {
  const { units } = await import('../src/data.js');
  const mathematics = units.filter(unit => unit.subjectId === 'mathematics');
  const sources = new Set(mathematics.flatMap(unit => unit.materials.map(item => item.url)));
  const expectedFiles = ['Trigonometrie.pptx', 'Grafy_sin_cos_tan_cot.pptx', 'Goniometricke_rovnice_a_vzorce.pptx'];
  for (const name of expectedFiles) {
    const relative = [...sources].find(url => url.endsWith(`/${name}`));
    assert.ok(relative, `Missing original presentation: ${name}`);
    assert.ok(!relative.startsWith('/'), 'Sources must work under the /study/ GitHub Pages base path');
    const absolute = path.resolve(__dirname, '..', relative);
    await access(absolute);
    assert.equal((await readFile(absolute)).subarray(0, 2).toString(), 'PK', `${name} should retain the PPTX ZIP container`);
  }
});
