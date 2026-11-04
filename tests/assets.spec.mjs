import { test, expect } from '@playwright/test';
import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { units } from '../src/data.js';

const project = fileURLToPath(new URL('../', import.meta.url));
const extensions = /\.(?:webp|png|jpe?g|svg|pdf|woff2)$/i;
async function findFiles(directory) {
  const files = [];
  for (const entry of await readdir(`${project}${directory}`, { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) files.push(...await findFiles(path));
    else if (extensions.test(entry.name)) files.push(path);
  }
  return files;
}

test('all retained asset URLs and registered PDF materials load over HTTP', async ({ request, baseURL }) => {
  test.setTimeout(120_000);
  const files = [...await findFiles('modules/biology/assets'), ...await findFiles('modules/law/assets')];
  expect(files).toHaveLength(112);
  const materialURLs = units.flatMap(unit => unit.materials.map(material => material.url));
  for (const url of materialURLs) expect(files).toContain(url);
  // A bounded parallel batch checks every retained image, diagram, font and PDF,
  // including assets not reached by whichever random exercise appeared first.
  for (let start = 0; start < files.length; start += 8) {
    await Promise.all(files.slice(start, start + 8).map(async path => {
      const response = await request.get(new URL(path, baseURL.endsWith('/') ? baseURL : `${baseURL}/`).href);
      expect(response.status(), path).toBe(200);
      const body = await response.body();
      expect(body.length, path).toBeGreaterThan(0);
      if (path.endsWith('.pdf')) {
        expect(body.subarray(0, 5).toString(), path).toBe('%PDF-');
        expect(response.headers()['content-type'], path).toContain('application/pdf');
      }
      if (path.endsWith('.webp')) {
        expect(body.subarray(0, 4).toString(), path).toBe('RIFF');
        expect(body.subarray(8, 12).toString(), path).toBe('WEBP');
      }
      if (path.endsWith('.svg')) expect(body.toString(), path).toContain('<svg');
    }));
  }
});
