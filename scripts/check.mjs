import { readdir,readFile,access } from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import {subjects,units,events,eventTypes} from '../src/data.js';
async function walk(dir){const result=[];for(const entry of await readdir(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(['.git','node_modules','dist','test-results','playwright-report'].includes(entry.name))continue;if(entry.isDirectory())result.push(...await walk(file));else result.push(file);}return result;}
const files=await walk('.');
let checked=0;
for(const file of files.filter(file=>/\.(js|mjs|cjs)$/.test(file))){
  const result=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});
  assert.equal(result.status,0,`${file}: ${result.stderr}`);checked++;
}
for(const group of [subjects,units,events])assert.equal(new Set(group.map(x=>x.id)).size,group.length,'Duplicate registry id');
for(const subject of subjects){assert.match(subject.id,/^[a-z0-9-]+$/);assert.match(subject.color,/^#[0-9a-f]{6}$/i);}
for(const unit of units){assert.ok(subjects.some(s=>s.id===unit.subjectId),`Unknown subject: ${unit.subjectId}`);for(const material of unit.materials)await access(material.url);if(unit.module)await access(`modules/${unit.module}/index.js`);for(const id of unit.relatedUnitIds||[]){assert.ok(units.some(item=>item.id===id&&item.subjectId===unit.subjectId&&item.id!==unit.id),`Invalid related unit: ${id}`);}}
for(const event of events){assert.ok(units.some(u=>u.id===event.unitId),`Unknown unit: ${event.unitId}`);assert.ok(eventTypes[event.type],`Unknown type: ${event.type}`);assert.match(event.date,/^\d{4}-\d{2}-\d{2}$/);assert.equal(new Date(`${event.date}T12:00:00Z`).toISOString().slice(0,10),event.date);}
for(const file of files.filter(file=>/\.(css|html)$/.test(file))){
  const text=await readFile(file,'utf8');
  for(const match of text.matchAll(/(?:src|href)=["']([^"']+)["']|url\(["']?([^)'"\s]+)["']?\)/g)){
    const link=match[1]||match[2];
    if(/^(?:[a-z]+:|#|\/\/)/i.test(link))continue;
    await access(path.resolve(path.dirname(file),link.split('?')[0].split('#')[0]));
  }
}
const law=spawnSync(process.execPath,['modules/law/check.mjs'],{encoding:'utf8'});
assert.equal(law.status,0,law.stderr);process.stdout.write(law.stdout);
console.log(`Checked ${checked} JavaScript files, registry relationships, dates, materials and static asset paths.`);
