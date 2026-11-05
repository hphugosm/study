import { test, expect } from '@playwright/test';
import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { units, moduleLoaders } from '../src/data.js';

const project = fileURLToPath(new URL('../', import.meta.url));
const extensions = /\.(?:webp|png|jpe?g|svg|pdf|woff2|pptx)$/i;
async function findFiles(directory) {
  const files = [];
  for (const entry of await readdir(`${project}${directory}`, { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) files.push(...await findFiles(path));
    else if (extensions.test(entry.name)) files.push(path);
  }
  return files;
}

test('all retained asset URLs and registered study materials load over HTTP', async ({ request, baseURL }) => {
  test.setTimeout(120_000);
  const assetDirectories = new Set(Object.keys(moduleLoaders).map(id => `modules/${id}/assets`));
  for (const material of units.flatMap(unit => unit.materials)) {
    const match = material.url.match(/^(modules\/[^/]+\/assets)\//);
    if (match) assetDirectories.add(match[1]);
  }
  const files = [...new Set((await Promise.all([...assetDirectories].map(findFiles))).flat())];
  expect(files.length).toBeGreaterThan(0);
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
