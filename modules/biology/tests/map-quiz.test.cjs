const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const site = path.resolve(__dirname, '..');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(site, 'map-quiz.js'), 'utf8'), context);
const quiz = context.KostraMapQuiz;
const data = JSON.parse(fs.readFileSync(path.join(site, 'data.json'), 'utf8'));
const questions = quiz.createQuestions(data);
const question = id => questions.find(item => item.id === id);
const idsIn = filename => new Set([...fs.readFileSync(path.join(site, filename), 'utf8').matchAll(/data-bone="([^"]+)"/g)].map(match => match[1]));
// Read the actual drawable descendants of each SVG target. A data-bone
// label or an empty metadata group must not count as an answerable shape.
const paintedIdsIn = filename => {
  const svg = fs.readFileSync(path.join(site,filename),'utf8');
  const stack = [];
  const painted = new Set();
  for (const match of svg.matchAll(/<\/?g\b[^>]*>|<(?:path|rect|circle|ellipse|polygon|polyline)\b[^>]*>/g)) {
    const tag = match[0];
    if (/^<\/g/.test(tag)) {stack.pop();continue;}
    if (/^<g\b/.test(tag)) {
      if (!/\/\s*>$/.test(tag)) stack.push(tag.match(/data-bone="([^"]+)"/)?.[1] || null);
      continue;
    }
    if (!/class="[^"]*\bbone\b/.test(tag)) continue;
    for (const id of stack) if (id) painted.add(id);
    const own = tag.match(/data-bone="([^"]+)"/)?.[1];
    if (own) painted.add(own);
  }
  return painted;
};
const bodyIds = idsIn('assets/skeleton.svg');
const supplements = {tylni:'skull-back', cichova:'skull-floor', klinova:'skull-floor', patrova:'skull-base', radlicna:'skull-base', 'hreben-lopatky':'scapula-back'};

test('every atlas entry is present once, without a ten-question subset', () => {
  const expected = data.bones.map(item => item.id).sort();
  assert.equal(expected.length, 64);
  assert.deepEqual(Array.from(questions, item => item.id).sort(), expected);
  assert.equal(new Set(questions.map(item => item.id)).size, expected.length);
  for (const item of questions) {
    assert.ok(item.name && item.latin && item.detail, item.id);
    assert.ok(quiz.scoreAnswer(item, item.id), item.id);
  }
});

test('sternum and thoracic vertebrae retain different names, images and answers', () => {
  assert.equal(question('hrudni-kost').name, 'Kost hrudní');
  assert.equal(question('hrudni').name, 'Hrudní obratle');
  assert.equal(question('hrudni-kost').image, 'assets/bones/hrudni.webp');
  assert.equal(question('hrudni').image, 'assets/map-prompts/hrudni.webp');
  assert.equal(quiz.scoreAnswer(question('hrudni-kost'), 'hrudni'), false);
  assert.equal(quiz.scoreAnswer(question('hrudni'), 'hrudni-kost'), false);
  assert.equal(quiz.scoreAnswer(question('pater'), 'hrudni'), true);
  assert.equal(quiz.scoreAnswer(question('pater'), 'hrudni-kost'), false);
});

test('anatomical group questions accept their true child shapes', () => {
  for (const id of ['zapesti','clunkova','hraskova','hakovita']) assert.equal(quiz.scoreAnswer(question('zapesti'),id),true,id);
  for (const id of ['panevni','kycelni','sedaci','stydka']) assert.equal(quiz.scoreAnswer(question('panevni'),id),true,id);
  for (const id of ['klinove','klinova-vnitrni','klinova-prostredni','klinova-zevni']) assert.equal(quiz.scoreAnswer(question('klinove'),id),true,id);
  for (const id of ['zanarti','hlezni','patni','lodkovita-nohy','krychlova','klinova-vnitrni']) assert.equal(quiz.scoreAnswer(question('zanarti'),id),true,id);
  for (const id of ['atlas','axis','krcni','hrudni','bederni','krizova','kostrc']) assert.equal(quiz.scoreAnswer(question('pater'),id),true,id);
  for (const id of ['celni','tylni','cichova','patrova','dolni-celist']) assert.equal(quiz.scoreAnswer(question('lebka'),id),true,id);
  assert.equal(quiz.scoreAnswer(question('lebka'),'jazylka'),false);
  assert.equal(quiz.scoreAnswer(question('zapesti'),'zaprsti'),false);
  assert.equal(quiz.scoreAnswer(question('panevni'),'krizova'),false);
  assert.equal(quiz.scoreAnswer(question('klinove'),'hlezni'),false);
});

test('individual small-bone and landmark questions do not accept adjacent structures', () => {
  for (const [id,neighbor] of [['clunkova','polomesicita'],['hraskova','trojhranna'],['klinova-vnitrni','klinova-prostredni'],['nadpazek','hakovity'],['ceska','stehenni'],['holenni','lytkova']]) {
    assert.equal(quiz.scoreAnswer(question(id),id),true,id);
    assert.equal(quiz.scoreAnswer(question(id),neighbor),false,id);
  }
  assert.equal(quiz.scoreAnswer(question('krcni'),'atlas'),true);
  assert.equal(quiz.scoreAnswer(question('atlas'),'axis'),false);
});

test('hidden and posterior structures use their anatomically appropriate map view', () => {
  for (const [id,view] of Object.entries(supplements)) {
    const item = question(id);
    assert.equal(item.view, view, id);
    const actual = paintedIdsIn(`assets/${view}.svg`);
    assert.ok(actual.has(id), `${view} must paint ${id}, not merely name it`);
    for (const revealed of item.revealIds) assert.ok(actual.has(revealed), `${view}: ${revealed}`);
  }
  assert.equal(question('hreben-lopatky').view, 'scapula-back');
  assert.equal(question('hreben-lopatky').focus, 'scapula-back');
  assert.equal(question('klinova').view, 'skull-floor');
  assert.equal(question('klinova').focus, 'skull-floor');
  assert.equal(quiz.scoreAnswer(question('klinova'),'klinova'),true);
  assert.equal(quiz.scoreAnswer(question('klinova'),'cichova'),false);
});

test('all question targets and reveals correspond to rendered map shapes', () => {
  const allIds = new Set(bodyIds);
  for (const view of Object.values(supplements)) for (const id of idsIn(`assets/${view}.svg`)) allIds.add(id);
  for (const item of questions) {
    assert.ok(item.targetIds.length > 0, item.id);
    for (const id of item.targetIds) assert.ok(allIds.has(id), `${item.id}: accepted target ${id}`);
    const viewIds = paintedIdsIn(item.view === 'body' ? 'assets/skeleton.svg' : `assets/${item.view}.svg`);
    for (const id of item.revealIds) assert.ok(viewIds.has(id), `${item.id}: reveal ${id} in ${item.view}`);
  }
});

test('all question images exist and reused source-card aliases are exact', () => {
  for (const item of questions) assert.ok(fs.existsSync(path.join(site,item.image)), `${item.id}: ${item.image}`);
  for (const [id,card] of [['stehenni','stehno'],['pazni','pazni'],['hrudni-kost','hrudni']]) {
    assert.equal(question(id).image, `assets/bones/${card}.webp`, id);
  }
  assert.match(question('ceska').image, /map-prompts\/ceska\.webp$/);
  assert.match(question('clunkova').hint, /zvýrazněnou/);
});

test('region filters preserve every entry belonging to that region', () => {
  for (const region of ['hlava','trup','horni','dolni']) {
    const expected = data.bones.filter(item => item.region === region).map(item => item.id).sort();
    assert.deepEqual(Array.from(quiz.createQuestions(data,region), item => item.id).sort(), expected);
  }
  assert.equal(quiz.createQuestions(data,'missing-region').length,0);
  assert.equal(question('clunkova').focus,'ruka');
  assert.equal(question('hlezni').focus,'noha');
  assert.equal(question('axis').focus,'krk');
});

test('shuffle preserves the full set, input ordering and independent question rules', () => {
  const input = ['a','b','c','d'];
  assert.equal(JSON.stringify(quiz.shuffleQuestions(input,()=>0)),JSON.stringify(['b','c','d','a']));
  assert.deepEqual(input,['a','b','c','d']);
  assert.equal(quiz.shuffleQuestions(questions).length,64);
  assert.throws(()=>quiz.shuffleQuestions(input,()=>1),/Random source/);
  question('pazni').targetIds.push('stehenni');
  const fresh = quiz.createQuestions(data).find(item => item.id === 'pazni');
  assert.equal(quiz.scoreAnswer(fresh,'stehenni'),false);
  assert.equal(quiz.scoreAnswer(null,'pazni'),false);
  assert.equal(quiz.createQuestions(null).length,0);
});
