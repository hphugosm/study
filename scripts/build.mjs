import { cp, mkdir, rm, readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const name of ['index.html', 'styles.css', 'themes.css', 'settings.css', 'src', 'assets', 'modules', 'manifest.webmanifest']) {
  await cp(path.join(root, name), path.join(dist, name), {
    recursive: true,
    filter: source => !path.relative(root, source).split(path.sep).some(part => ['tests', 'scripts'].includes(part)) &&
      !['README.md', 'CTI-ME.txt', 'check.mjs'].includes(path.basename(source)),
  });
}
await cp(path.join(root, '.nojekyll'), path.join(dist, '.nojekyll'));

async function walk(directory) {
  const files = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, item.name);
    if (item.isDirectory()) files.push(...await walk(file));
    else files.push(file);
  }
  return files.sort();
}
const workerSource = await readFile(path.join(root, 'sw.js'), 'utf8');
const files = await walk(dist);
const originals = await Promise.all(files.map(async file => {
  const bytes = await readFile(file);
  return { url: path.relative(dist, file).split(path.sep).join('/'), bytes: bytes.length,
    sha256: createHash('sha256').update(bytes).digest('hex') };
}));
// A separate source revision avoids a circular hash: version the module graph first,
// then hash the exact emitted bytes for the verified offline snapshot.
const buildSource = await readFile(fileURLToPath(import.meta.url), 'utf8');
const assetRevision = createHash('sha256').update(JSON.stringify(originals)).update(workerSource).update(buildSource).digest('hex').slice(0, 20);
const knownFiles = new Set(originals.map(asset => asset.url));
function versionURL(specifier, source) {
  const url = new URL(specifier, `https://build.invalid/${source}`);
  if (!knownFiles.has(decodeURIComponent(url.pathname.slice(1)))) throw new Error(`Missing built dependency: ${source} → ${specifier}`);
  const [head, fragment] = specifier.split('#');
  const [name, query] = head.split('?');
  const params = new URLSearchParams(query);
  params.set('v', assetRevision);
  return `${name}?${params}${fragment ? `#${fragment}` : ''}`;
}
for (const file of files) {
  const source = path.relative(dist, file).split(path.sep).join('/');
  if (/\.m?js$/.test(file)) {
    let text = await readFile(file, 'utf8');
    text = text.replace(/(\bfrom\s*|\bimport\s*)(['"])(\.{1,2}\/[^'"]+\.m?js)\2/g,
      (_, prefix, quote, url) => `${prefix}${quote}${versionURL(url, source)}${quote}`);
    text = text.replace(/(\bimport\s*\(\s*)(['"])(\.{1,2}\/[^'"]+\.m?js)\2(\s*\))/g,
      (_, prefix, quote, url, suffix) => `${prefix}${quote}${versionURL(url, source)}${quote}${suffix}`);
    text = text.replace(/(\bnew\s+URL\(\s*)(['"])([^'"]+\.(?:css|m?js))\2(\s*,\s*import\.meta\.url\s*\))/g,
      (_, prefix, quote, url, suffix) => `${prefix}${quote}${versionURL(url, source)}${quote}${suffix}`);
    await writeFile(file, text);
  } else if (source === 'index.html' || source === 'modules/moodle-sync/index.html') {
    const text = await readFile(file, 'utf8');
    await writeFile(file, text.replace(/((?:src|href)=)(['"])(\.\/[^'"]+\.(?:css|m?js))\2/g,
      (_, prefix, quote, url) => `${prefix}${quote}${versionURL(url, source)}${quote}`));
  }
}
const assets = [];
for (const file of files) {
  // Moodle materials stay available online without enlarging the automatic offline package.
  const relative = path.relative(dist, file).split(path.sep).join('/');
  if (relative.startsWith('modules/moodle-sync/files/') ||
      /^modules\/moodle-sync\/data\/subjects\/[^/]+\/topics\/[^/]+\/(?:sources|derived)\/(?!index\.json$)/.test(relative)) continue;
  const bytes = await readFile(file);
  assets.push({ url: path.relative(dist, file).split(path.sep).join('/'), bytes: bytes.length,
    sha256: createHash('sha256').update(bytes).digest('hex') });
}
const version = createHash('sha256').update(JSON.stringify(assets)).update(workerSource).digest('hex').slice(0, 20);
const manifest = { version, bytes: assets.reduce((sum, asset) => sum + asset.bytes, 0), assets };
await writeFile(path.join(dist, 'offline-manifest.json'), JSON.stringify(manifest));
await writeFile(path.join(dist, 'sw.js'), workerSource.replaceAll('__STUDY_BUILD_VERSION__', version));
console.log(`Static site built in dist/. Offline package: ${assets.length} files, ${(manifest.bytes / 1024 / 1024).toFixed(1)} MiB, version ${version}.`);
