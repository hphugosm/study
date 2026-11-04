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
const assets = [];
for (const file of await walk(dist)) {
  const bytes = await readFile(file);
  assets.push({ url: path.relative(dist, file).split(path.sep).join('/'), bytes: bytes.length,
    sha256: createHash('sha256').update(bytes).digest('hex') });
}
const workerSource = await readFile(path.join(root, 'sw.js'), 'utf8');
const version = createHash('sha256').update(JSON.stringify(assets)).update(workerSource).digest('hex').slice(0, 20);
const manifest = { version, bytes: assets.reduce((sum, asset) => sum + asset.bytes, 0), assets };
await writeFile(path.join(dist, 'offline-manifest.json'), JSON.stringify(manifest));
await writeFile(path.join(dist, 'sw.js'), workerSource.replaceAll('__STUDY_BUILD_VERSION__', version));
console.log(`Static site built in dist/. Offline package: ${assets.length} files, ${(manifest.bytes / 1024 / 1024).toFixed(1)} MiB, version ${version}.`);
