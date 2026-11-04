const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const site = path.resolve(__dirname,'..');
const context = vm.createContext({});
for (const name of ['map-quiz.js','study-cards.js']) vm.runInContext(fs.readFileSync(path.join(site,name),'utf8'),context);
const study = context.KostraStudyCards;
const data = JSON.parse(fs.readFileSync(path.join(site,'data.json'),'utf8'));
const originalCards = JSON.stringify(data.cards);
const cards = study.createCards(data);
const card = id => cards.find(item => item.id === id);

test('recognition contains every atlas entry exactly once with a real image', () => {
  assert.equal(cards.length,64);
  assert.equal(new Set(cards.map(item => item.id)).size,64);
  assert.equal(new Set(cards.map(item => item.name)).size,64);
  assert.deepEqual(Array.from(cards,item => item.id).sort(),data.bones.map(item => item.id).sort());
  for (const item of cards) {
    assert.ok(item.name && item.latin && item.region && item.detail,item.id);
    assert.ok(fs.existsSync(path.join(site,item.image)),`${item.id}: ${item.image}`);
  }
  assert.equal(JSON.stringify(data.cards),originalCards);
});

test('sternum and thoracic vertebrae remain different recognition cards', () => {
  assert.equal(card('hrudni-kost').name,'Kost hrudní');
  assert.equal(card('hrudni-kost').image,'assets/bones/hrudni.webp');
  assert.equal(card('hrudni').name,'Hrudní obratle');
  assert.equal(card('hrudni').image,'assets/map-prompts/hrudni.webp');
});

test('attribution distinguishes supplied presentation images from atlas illustrations', () => {
  assert.equal(cards.filter(item => item.source === 'presentation').length,17);
  assert.equal(cards.filter(item => item.source === 'atlas').length,47);
  assert.match(card('pazni').sourceLabel,/Obrázek z prezentace/);
  assert.match(card('cichova').sourceLabel,/Detail atlasu/);
  assert.equal(card('celni').sourceSlide,54);
  assert.equal(card('celni').slide,53);
  assert.match(card('celni').sourceLabel,/snímek 54$/);
  assert.match(card('atlas').sourceLabel,/snímek 21$/);
  for (const item of cards) {
    assert.ok(!/umísti/i.test(item.hint),item.id);
    if (item.source === 'atlas') assert.match(item.hint,/Poznej oranžově zvýrazněn/);
  }
});

test('ambiguous photos have explicit orange targets without tiny-number clues', () => {
  for (const id of ['nosni','vretenni','loketni','zapesti','zaprsti','prsty-ruky','panevni','holenni','lytkova','patni','hlezni','krychlova','lodkovita-nohy','klinove','nartni','prsty-nohy']) {
    assert.equal(card(id).image,`assets/map-prompts/${id}.webp`,id);
    assert.equal(card(id).promptKind,'highlight',id);
  }
  for (const item of cards) {
    assert.ok(!/čís|\b\d+\b/i.test(item.hint),item.id);
    assert.ok(['whole','point','highlight'].includes(item.promptKind),item.id);
  }
  assert.match(card('nosni').hint,/oranžově zvýrazněnou kost/);
});

test('instructions distinguish a whole bone, a group, and an anatomical landmark', () => {
  assert.equal(card('pazni').promptKind,'whole');
  assert.match(card('pazni').hint,/celou kost/);
  for (const id of ['zapesti','prsty-ruky','klinove','krcni']) {
    assert.equal(card(id).scope,'group',id);
    assert.match(card(id).hint,/skupinu kostí/,id);
  }
  assert.match(card('lebka').hint,/část kostry/);
  assert.match(card('hreben-lopatky').hint,/útvar kosti/);
  assert.equal(cards.length,64);
});

test('v1 progress migrates exact old cards without learning the wrong new bones', () => {
  const result = Array.from(study.migrateKnown(['hrudni','panev','stehno','holeni','hlezenni','lodkovita','klinovite-noha','nart','tylni','pazni']));
  assert.deepEqual(result,['hrudni-kost','panevni','stehenni','holenni','hlezni','lodkovita-nohy','klinove','nartni','tylni','pazni']);
  assert.ok(!result.includes('hrudni'));
  assert.ok(result.every(id => cards.some(item => item.id === id)));
});

test('generic old vertebra mastery does not imply mastery of regional spinal groups', () => {
  const result = Array.from(study.migrateKnown(['obratel']));
  assert.deepEqual(result,[]);
  assert.ok(!result.includes('pater'));
  assert.ok(!result.includes('krcni'));
  assert.ok(!result.includes('hrudni'));
});

test('invalid or duplicate legacy progress is safely ignored', () => {
  for (const input of [null,undefined,'hrudni',{},1]) assert.equal(study.migrateKnown(input).length,0);
  assert.deepEqual(Array.from(study.migrateKnown(['pazni','pazni',null,{},42,'unknown','__proto__','constructor'])),['pazni']);
  for (const input of [null,undefined,{}, {bones:null}]) assert.equal(study.createCards(input).length,0);
  assert.equal(study.createCards(data,{}).length,0);
});
