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

test('original-paper map covers all 164 exercises with bounded non-overlapping targets covering their printed formulas', async () => {
  const { worksheetData } = await import('../modules/math-worksheets/data.js');
  const { worksheetLayout } = await import('../modules/math-worksheets/layout.js');
  assert.equal(worksheetLayout.exercises.length,164);
  assert.deepEqual(worksheetLayout.exercises.map(item=>item.id).sort(),worksheetData.exercises.map(item=>item.id).sort());
  const pages=worksheetLayout.pages;
  assert.equal(pages.length,3);
  assert.equal(new Set(pages.map(page=>`${page.source_file}:${page.page_index}`)).size,pages.length);
  for(const item of worksheetLayout.exercises){
    const original=worksheetData.exercises.find(exercise=>exercise.id===item.id);
    const page=pages.find(page=>page.source_file===original.source_file&&page.page_index===item.page_index);
    assert.ok(page,`${item.id}: exact source page`);
    assert.equal(item.source_file,original.source_file);
    assert.equal(item.section,original.section);
    assert.ok(page.sections.some(section=>section.key===item.section),`${item.id}: printed task heading`);
    const [x0,y0,x1,y1]=item.bbox;
    assert.ok(item.bbox.length===4&&item.bbox.every(Number.isFinite),`${item.id}: finite PDF points`);
    assert.ok(x0>=0&&y0>=0&&x1>x0&&y1>y0&&x1<=page.width&&y1<=page.height,`${item.id}: positive page-bounded hit area`);
    const [gx0,gy0,gx1,gy1]=item.glyph_bbox;
    assert.ok(x0<=gx0+.01&&x1>=gx1-.01,`${item.id}: complete printed formula width`);
    const center=(gy0+gy1)/2,covered=Math.min(y1,gy1)-Math.max(y0,gy0);
    assert.ok(y0<=center&&y1>=center&&covered/(gy1-gy0)>=.9,`${item.id}: formula center and at least90% of its font bounds remain clickable`);
  }
  for(let i=0;i<worksheetLayout.exercises.length;i++)for(let j=i+1;j<worksheetLayout.exercises.length;j++){
    const a=worksheetLayout.exercises[i],b=worksheetLayout.exercises[j];
    if(a.source_file!==b.source_file||a.page_index!==b.page_index)continue;
    const x=Math.min(a.bbox[2],b.bbox[2])-Math.max(a.bbox[0],b.bbox[0]);
    const y=Math.min(a.bbox[3],b.bbox[3])-Math.max(a.bbox[1],b.bbox[1]);
    assert.ok(x<=.01||y<=.01,`${a.id} must not intercept ${b.id}`);
  }
});

test('PDF page images retain source aspect ratios and a/f/k stay in the first printed exercise row',async()=>{
  const { worksheetData } = await import('../modules/math-worksheets/data.js');
  const { worksheetLayout } = await import('../modules/math-worksheets/layout.js');
  for(const page of worksheetLayout.pages){
    assert.ok(page.image&&!page.image.startsWith('/'),'Page image is a local relative asset');
    const bytes=await readFile(path.resolve(__dirname,'..','modules','math-worksheets',page.image));
    assert.equal(bytes.subarray(1,4).toString(),'PNG');
    const width=bytes.readUInt32BE(16),height=bytes.readUInt32BE(20);
    assert.ok(width>=page.width&&height>=page.height,'Image retains readable source resolution');
    assert.ok(Math.abs(width/height-page.width/page.height)<.001,'Rendered PDF page keeps exact paper proportions');
  }
  const first=worksheetLayout.exercises.find(item=>item.id==='GR1-a');
  const row=['GR1-a','GR1-f','GR1-k'].map(id=>worksheetLayout.exercises.find(item=>item.id===id));
  assert.deepEqual(first.bbox,[59.096,72.5781,125.3875,89.0774]);
  assert.equal(first.label,'a');
  assert.ok(first.source_text.includes('sin(105'));
  assert.equal(worksheetData.exercises.find(item=>item.id==='GR1-a').prompt_latex,'\\sin(105^\\circ)');
  assert.ok(Math.abs(row[0].bbox[1]-row[1].bbox[1])<.1&&Math.abs(row[1].bbox[1]-row[2].bbox[1])<.1);
  assert.ok(row[0].bbox[0]<row[1].bbox[0]&&row[1].bbox[0]<row[2].bbox[0]);
  const page=worksheetLayout.pages.find(page=>page.source_file===first.source_file&&page.page_index===first.page_index);
  assert.ok(page.sections.find(section=>section.key===first.section).title.startsWith('1. Určete přesnou hodnotu'));
});
