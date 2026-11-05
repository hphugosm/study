const test = require('node:test');
const assert = require('node:assert/strict');
const { readFile } = require('node:fs/promises');
const path = require('node:path');

const graphSource = 'Gonio_fce_opakovani.pdf';
const equationSource = 'Opakovani_gonio__ne_rovnice.pdf';

test('worksheets preserve all 164 source exercises, 60 graph tasks and 104 equation tasks, in their nine sections', async () => {
  const { worksheetData } = await import('../modules/math-worksheets/data.js');
  assert.equal(worksheetData.total_exercises, 164);
  assert.equal(worksheetData.exercises.length, 164);
  assert.equal(new Set(worksheetData.exercises.map(exercise => exercise.id)).size, 164);
  assert.deepEqual(worksheetData.generated_from, [graphSource, equationSource]);
  const counts = {};
  for (const item of worksheetData.exercises) {
    assert.match(item.id, /^(?:GF[12]|GR[1-7])-(?:\d{2}|[a-z])$/);
    assert.ok(item.source_label && item.prompt_latex && item.answer_latex, item.id);
    assert.ok(item.steps.length >= 2, `${item.id}: substantial step-by-step explanation`);
    for (const step of item.steps) assert.ok(step.title && step.explanation && step.latex, `${item.id}: complete step`);
    counts[item.section] = (counts[item.section] || 0) + 1;
  }
  assert.deepEqual(counts, worksheetData.sections);
  assert.equal(Object.keys(counts).length, 9);
  assert.equal(worksheetData.exercises.filter(item => item.source_file === graphSource).length, 60);
  assert.equal(worksheetData.exercises.filter(item => item.source_file === equationSource).length, 104);
});

test('every exercise prompt, explanation formula and final answer renders with strict locally bundled KaTeX', async () => {
  const { worksheetData } = await import('../modules/math-worksheets/data.js');
  const { default: katex } = await import('../modules/math-worksheets/vendor/katex/katex.mjs');
  assert.equal(katex.version, '0.19.1');
  let count = 0;
  for (const item of worksheetData.exercises) {
    const expressions = [['prompt', item.prompt_latex], ...item.steps.map((step, index) => [`step ${index + 1}`, step.latex]), ['answer', item.answer_latex]];
    for (const [kind, expression] of expressions) {
      let html;
      assert.doesNotThrow(() => { html = katex.renderToString(expression, { displayMode: true, strict: 'error', throwOnError: true, trust: false }); }, `${item.id} ${kind}`);
      assert.ok(html.includes('class="katex"'), `${item.id} ${kind}`);
      assert.ok(!html.includes('class="katex-error"'), `${item.id} ${kind}`);
      count++;
    }
  }
  assert.ok(count > 1000, 'Every formula in the complete solution set is rendered');
});

test('all 60 worksheet graphs have numerically valid points, periods and tangent or cotangent poles', async () => {
  const { worksheetData } = await import('../modules/math-worksheets/data.js');
  const graphs = worksheetData.exercises.filter(item => item.visualization?.type === 'function_graph');
  assert.equal(graphs.length, 60);
  for (const { id, visualization: graph } of graphs) {
    assert.ok(['sin', 'cos', 'tan', 'cot'].includes(graph.function), id);
    assert.ok(graph.b !== 0 && graph.a !== 0, id);
    const period = (['sin', 'cos'].includes(graph.function) ? 2 : 1) * Math.PI / Math.abs(graph.b);
    assert.ok(Math.abs(graph.period - period) < 1e-10, `${id}: period`);
    for (const point of graph.points) {
      const argument = graph.b * point.x + graph.phase_radians;
      const base = graph.function === 'cot' ? Math.cos(argument) / Math.sin(argument) : Math[graph.function](argument);
      assert.ok(Math.abs(graph.a * base + graph.d - point.y) < 1e-8, `${id}: supplied graph point ${point.x_latex}`);
    }
    if (['tan', 'cot'].includes(graph.function)) {
      assert.ok(Math.abs(graph.asymptote_spacing - period) < 1e-10, `${id}: pole spacing`);
      for (const k of [-2, -1, 0, 1, 2]) {
        const argument = graph.b * (graph.asymptote_anchor + k * graph.asymptote_spacing) + graph.phase_radians;
        const denominator = graph.function === 'tan' ? Math.cos(argument) : Math.sin(argument);
        assert.ok(Math.abs(denominator) < 1e-10, `${id}: pole ${k}`);
      }
    }
  }
});

test('two source PDFs are available inside the existing two mathematics categories without adding another category', async () => {
  const { units } = await import('../src/data.js');
  const categories = units.filter(unit => unit.subjectId === 'mathematics' && unit.module);
  assert.deepEqual(categories.map(unit => unit.id).sort(), ['trig-equations', 'trig-functions']);
  for (const source of [graphSource, equationSource]) {
    const materials = categories.flatMap(unit => unit.materials);
    const record = materials.find(item => item.url.endsWith(`/${source}`));
    assert.ok(record, `Source PDF registered: ${source}`);
    assert.ok(!record.url.startsWith('/'), 'Source PDF supports GitHub Pages subdirectory');
    const bytes = await readFile(path.resolve(__dirname, '..', record.url));
    assert.equal(bytes.subarray(0, 5).toString(), '%PDF-');
  }
});

test('PDF exercise 37 keeps sin(2x) in its denominator and rejects the invalid zero-tangent branch', async () => {
  const { worksheetData } = await import('../modules/math-worksheets/data.js');
  const item = worksheetData.exercises.find(item => item.id === 'GR7-37');
  assert.ok(item.prompt_latex.endsWith('\\sin(2x)}'), 'Original denominator is sin(2x), not sin x');
  assert.ok(item.answer_latex.includes('\\frac{\\pi}{4}+k\\pi'));
  assert.ok(!item.answer_latex.includes('arcsin') && !item.answer_latex.includes('sqrt{17}'));
  assert.ok(item.steps[0].title.includes('definiční'));
  assert.ok(item.steps.some(step => step.explanation.includes('Větev tan x = 0')));
  assert.ok(item.correction_note.includes('původního PDF'));
  for (const k of [-10, -3, 0, 2, 10]) {
    const x = Math.PI / 4 + k * Math.PI;
    assert.ok(Math.abs(Math.sin(2*x)) > .99);
    assert.ok(Math.abs(Math.cos(x)) > .7);
    const left = Math.cos(2*x) / Math.cos(x)**2;
    const right = 1 - 2*Math.sin(x)**2 / Math.sin(2*x);
    assert.ok(Math.abs(left-right) < 1e-10);
  }
});
