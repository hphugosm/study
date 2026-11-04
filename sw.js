/* A complete, verified snapshot. The build replaces the version token. */
const VERSION = '__STUDY_BUILD_VERSION__';
const BASE = self.registration.scope;
const CACHE_PREFIX = `study-offline:${encodeURIComponent(new URL(BASE).pathname)}:`;
const CACHE_NAME = `${CACHE_PREFIX}${VERSION}`;
const MANIFEST_URL = new URL('offline-manifest.json', BASE).href;
const INDEX_URL = new URL('index.html', BASE).href;
let packagePromise;

function hash(buffer) {
  return crypto.subtle.digest('SHA-256', buffer).then(value => [...new Uint8Array(value)].map(byte => byte.toString(16).padStart(2, '0')).join(''));
}
function readPackage() {
  if (!packagePromise) packagePromise = caches.open(CACHE_NAME).then(cache => cache.match(MANIFEST_URL)).then(response => response?.json());
  return packagePromise;
}

async function preparePackage({ repair = false } = {}) {
    const response = await fetch(MANIFEST_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error('Offline package is unavailable.');
    const manifest = await response.json();
    if (manifest.version !== VERSION || !Array.isArray(manifest.assets) || !manifest.assets.length) throw new Error('Offline package version mismatch.');
    const cache = await caches.open(CACHE_NAME);
    let position = 0;
    try {
      const download = async () => {
        while (position < manifest.assets.length) {
          const asset = manifest.assets[position++];
          const url = new URL(asset.url, BASE);
          if (url.origin !== self.location.origin || !url.href.startsWith(BASE)) throw new Error('Invalid package scope.');
          const result = await fetch(url.href, { cache: 'no-store', credentials: 'same-origin' });
          if (!result.ok || result.type === 'opaque') throw new Error(`Download failed: ${asset.url}`);
          if (await hash(await result.clone().arrayBuffer()) !== asset.sha256) throw new Error(`Version mismatch: ${asset.url}`);
          await cache.put(url.href, result);
        }
      };
      await Promise.all(Array.from({ length: 4 }, download));
      // Only this final marker makes the snapshot eligible to report readiness.
      await cache.put(MANIFEST_URL, new Response(JSON.stringify(manifest), { headers: { 'Content-Type': 'application/json' } }));
    } catch (error) {
      if (!repair) await caches.delete(CACHE_NAME);
      throw error;
    }
    packagePromise = Promise.resolve(manifest);
}

self.addEventListener('install', event => {
  // Updates deliberately wait. The first registration activates naturally.
  event.waitUntil(preparePackage());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const name of await caches.keys()) if (name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME) await caches.delete(name);
    await self.clients.claim();
  })());
});

async function documentResponse(request, cache) {
  const fallback = await cache.match(INDEX_URL);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);
  try {
    const result = await fetch(request, { signal: controller.signal, cache: 'no-store' });
    if (!result.ok) return fallback || result;
    const manifest = await readPackage();
    const expected = manifest?.assets.find(asset => asset.url === 'index.html')?.sha256;
    // Never mix newly deployed HTML with this version's cached modules.
    if (expected && await hash(await result.clone().arrayBuffer()) !== expected) return fallback || result;
    return result;
  } catch {
    return fallback || new Response('study. zatím není připravené offline. Připoj se a otevři aplikaci znovu.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  } finally { clearTimeout(timeout); }
}

async function rangedResponse(request, response) {
  const range = request.headers.get('range');
  if (!range) return response;
  const match = /^bytes=(\d*)-(\d*)$/.exec(range);
  if (!match) return response;
  const bytes = await response.arrayBuffer();
  const start = match[1] ? Number(match[1]) : Math.max(0, bytes.byteLength - Number(match[2]));
  const end = match[1] && match[2] ? Math.min(Number(match[2]), bytes.byteLength - 1) : bytes.byteLength - 1;
  if (start > end || start >= bytes.byteLength) return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${bytes.byteLength}` } });
  const headers = new Headers(response.headers);
  headers.set('Content-Range', `bytes ${start}-${end}/${bytes.byteLength}`);
  headers.set('Content-Length', String(end - start + 1));
  headers.set('Accept-Ranges', 'bytes');
  return new Response(bytes.slice(start, end + 1), { status: 206, headers });
}

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || !url.href.startsWith(BASE)) return;
  if (url.href === MANIFEST_URL || url.pathname === new URL('sw.js', BASE).pathname) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    if (event.request.mode === 'navigate' && [new URL(BASE).pathname, new URL(INDEX_URL).pathname].includes(url.pathname)) {
      return documentResponse(event.request, cache);
    }
    url.search = ''; url.hash = '';
    const cached = await cache.match(url.href);
    if (cached) return rangedResponse(event.request, cached);
    return fetch(event.request);
  })());
});

self.addEventListener('message', event => {
  const reply = value => event.ports[0]?.postMessage(value);
  if (event.data?.type === 'GET_STATUS') {
    event.waitUntil((async () => {
      const manifest = await readPackage();
      const cache = await caches.open(CACHE_NAME);
      const present = new Set((await cache.keys()).map(request => request.url));
      const complete = Boolean(manifest) && manifest.assets.every(asset => present.has(new URL(asset.url, BASE).href));
      reply({ offlineReady: complete, version: VERSION, assetCount: manifest?.assets.length || 0, bytes: manifest?.bytes || 0 });
    })());
  }
  if (event.data?.type === 'PREPARE_OFFLINE') {
    event.waitUntil(preparePackage({ repair: true }).then(() => reply({ ready: true })).catch(() => reply({ ready: false })));
  }
  if (event.data?.type === 'ACTIVATE_UPDATE') {
    event.waitUntil((async () => {
      const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      const appClients = clients.filter(client => client.url.startsWith(BASE));
      if (appClients.length > 1) { reply({ accepted: false, reason: 'Zavři prosím ostatní otevřené panely study. a zkus aktualizaci znovu.' }); return; }
      reply({ accepted: true });
      await self.skipWaiting();
    })());
  }
});
