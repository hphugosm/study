// Run from any directory: node modules/law/check.mjs
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {questions} from './data/questions.js';
import {vocabulary} from './data/vocabulary.js';
import {topics,cases,lessons,sources} from './data/lessons.js';
import {getProgress} from './index.js';

const all = [...questions,...vocabulary];
assert.equal(questions.length,95);
assert.equal(vocabulary.length,55);
assert.equal(new Set(all.map(q=>q.id)).size,all.length,'Question/card IDs must be unique');
for(const q of questions){
  assert.ok(topics.some(t=>t.id===q.topic),`Unknown topic for ${q.id}`);
  assert.ok(q.prompt && q.explanation,`Missing explanation or prompt: ${q.id}`);
  if(q.type==='mcq') assert.ok(q.options[q.correct],`Invalid correct option: ${q.id}`);
  else if(q.type==='text') assert.ok(q.answers?.length,`Missing accepted answers: ${q.id}`);
  else if(q.type==='order') assert.ok(q.steps?.length>1,`Missing ordering steps: ${q.id}`);
  else assert.equal(typeof q.correct,'boolean',`Unsupported question type: ${q.id}`);
}
for(const v of vocabulary) assert.ok(v.term&&v.definition&&v.translation&&v.example,`Incomplete vocabulary: ${v.id}`);
assert.equal(cases.length,4); assert.equal(lessons.length,2); assert.equal(topics.length,7); assert.equal(sources.length,28);
for(const name of ['US_Law_Expanded_English_Study_Notes.pdf','Pravo_USA_barevne_poznamky.pdf']){
  const bytes=readFileSync(new URL(`assets/${name}`,import.meta.url));
  assert.equal(bytes.subarray(0,5).toString(),'%PDF-',`Invalid PDF: ${name}`);
  assert.ok(bytes.length>1000);
}
const values=new Map([['casebook-us-law-progress-v1',JSON.stringify({knownCards:['legacy-card'],mistakes:['legacy-mistake'],attempts:[{score:1,total:2}],readLessons:['brown']})]]);
globalThis.localStorage={getItem:key=>values.get(key)||null};
assert.deepEqual(getProgress().knownCards,['legacy-card'],'Legacy progress must remain readable');
values.set('study:law:progress:v1',JSON.stringify({knownCards:['new-card'],mistakes:null}));
assert.deepEqual(getProgress().knownCards,['new-card']);
assert.deepEqual(getProgress().mistakes,[],'Malformed fields must be safe');
assert.ok(values.has('casebook-us-law-progress-v1'),'Legacy records must remain unchanged');
values.set('study:law:progress:v1','{invalid');
assert.deepEqual(getProgress(),{knownCards:[],mistakes:[],attempts:[],readLessons:[]});
delete globalThis.localStorage;
console.log('Law: data, PDF headers, legacy-read compatibility and malformed-storage checks passed.');
