import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

let sourcePromise;
const sha = value => createHash('sha256').update(value).digest('hex');
const types = { html: 'text/html', js: 'text/javascript', css: 'text/css', json: 'application/json', webmanifest: 'application/manifest+json', svg: 'image/svg+xml', png: 'image/png', webp: 'image/webp', pdf: 'application/pdf', woff2: 'font/woff2' };

async function sources() {
  if (!sourcePromise) sourcePromise = (async () => {
    const manifest = JSON.parse(await readFile(new URL('../../dist/offline-manifest.json', import.meta.url)));
    const files = new Map(await Promise.all(manifest.assets.map(async asset =>
      [asset.url, await readFile(new URL(`../../dist/${asset.url}`, import.meta.url))])));
    const worker = await readFile(new URL('../../sw.js', import.meta.url), 'utf8');
    return { manifest, files, worker };
  })();
  return sourcePromise;
}

// A pre-automation client: it registers the worker but knows no update messages.
// The actual application UI and study content still come from the full build.
const legacyClient = `
export async function initPwa() { await navigator.serviceWorker.register(new URL('../sw.js', import.meta.url), { scope:new URL('../', import.meta.url).href,updateViaCache:'none' }); }
export function notifyPwaRoute() {}
export const getPwaState=()=>({});
export const subscribePwa=callback=>{callback({});return()=>{};};
export async function requestInstall(){return false;}
export async function downloadOffline(){return {};}
export async function checkForUpdates(){return {};}
export async function applyUpdate(){return false;}
`;

async function release(previous, legacy) {
  const { manifest, files: original, worker } = await sources();
  const files = new Map(original);
  if (previous) {
    const data = files.get('src/data.js').toString();
    if (!data.includes("date:'2026-11-19'")) throw new Error('Expected the current Law date in the release fixture.');
    files.set('src/data.js', Buffer.from(data.replace("date:'2026-11-19'", "date:'2026-11-12'")));
    if (legacy) {
      files.set('src/pwa.js', Buffer.from(legacyClient));
      files.set('index.html', Buffer.from(files.get('index.html').toString().replace(/.*id="app-update-status".*\n/, '')));
    }
  }
  // Each fixture release must have its own module URLs, just like the real build.
  // Otherwise WebKit can reuse an old module held by a second open document.
  const revision = sha([...files].map(([url, body]) => `${url}:${sha(body)}`).join('\n')).slice(0, 20);
  for (const [url, body] of files) if (/\.(?:html|m?js)$/.test(url)) {
    files.set(url, Buffer.from(body.toString().replace(/([?&]v=)[a-f0-9]{20}/g, `$1${revision}`)));
  }
  const assets = manifest.assets.map(({ url }) => ({ url, bytes: files.get(url).length, sha256: sha(files.get(url)) }));
  const version = createHash('sha256').update(JSON.stringify(assets)).update(worker).digest('hex').slice(0, 20);
  files.set('offline-manifest.json', Buffer.from(JSON.stringify({ version, assets, bytes: assets.reduce((n, asset) => n + asset.bytes, 0) })));
  files.set('sw.js', Buffer.from(worker.replaceAll('__STUDY_BUILD_VERSION__', version)));
  return { files, version };
}

/** Two real, verified snapshots on one origin, with production-like HTTP caching. */
export async function updateServer({ legacy = false } = {}) {
  const versions = [await release(true, legacy), await release(false)];
  let phase = 0;
  let failingAsset;
  const requests = [];
  const server = http.createServer((request, response) => {
    const url = new URL(request.url, 'http://localhost');
    const asset = decodeURIComponent(url.pathname).replace(/^\//, '') || 'index.html';
    requests.push({ phase, asset });
    const body = versions[phase].files.get(asset);
    if (!body || (phase === 1 && asset === failingAsset)) {
      response.writeHead(body ? 503 : 404, { 'Cache-Control': 'no-store' });
      response.end(); return;
    }
    response.writeHead(200, { 'Content-Type': types[asset.split('.').at(-1)] || 'application/octet-stream', 'Cache-Control': 'public, max-age=600' });
    response.end(body);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  return {
    url: `http://127.0.0.1:${server.address().port}/`,
    oldVersion: versions[0].version, newVersion: versions[1].version, requests,
    publish: () => { phase = 1; },
    fail: asset => { failingAsset = asset; },
    close: () => new Promise(resolve => { server.close(resolve); server.closeAllConnections(); }),
  };
}
