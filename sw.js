/* A complete, verified snapshot. The build replaces the version token. */
const VERSION = '__STUDY_BUILD_VERSION__';
const BASE = self.registration.scope;
const CACHE_PREFIX = `study-offline:${encodeURIComponent(new URL(BASE).pathname)}:`;
const CACHE_NAME = `${CACHE_PREFIX}${VERSION}`;
const MANIFEST_URL = new URL('offline-manifest.json', BASE).href;
const INDEX_URL = new URL('index.html', BASE).href;
const AUTO_RELOAD_URL = new URL('.study-auto-reload', BASE).href;
let packagePromise;
let activationAttempt;

function hash(buffer) {
  return crypto.subtle.digest('SHA-256', buffer).then(value => [...new Uint8Array(value)].map(byte => byte.toString(16).padStart(2, '0')).join(''));
}
function readPackage() {
  if (!packagePromise) packagePromise = caches.open(CACHE_NAME).then(cache => cache.match(MANIFEST_URL)).then(response => response?.json());
  return packagePromise;
}

async function previousSnapshots() {
  const snapshots = [];
  for (const name of (await caches.keys()).reverse()) {
    if (!name.startsWith(CACHE_PREFIX) || name === CACHE_NAME) continue;
    const cache = await caches.open(name);
    const response = await cache.match(MANIFEST_URL);
    if (!response) continue;
    try {
      const manifest = await response.json();
      snapshots.push({ cache, hashes: new Map(manifest.assets.map(asset => [asset.url, asset.sha256])) });
    } catch { /* An incomplete snapshot can never supply verified assets. */ }
  }
  return snapshots;
}
async function reusableAsset(asset, url, snapshots) {
  for (const snapshot of snapshots) {
    if (snapshot.hashes.get(asset.url) !== asset.sha256) continue;
    const response = await snapshot.cache.match(url);
    if (response && await hash(await response.clone().arrayBuffer()) === asset.sha256) return response;
  }
}
function isCalendarURL(href) {
  const url = new URL(href);
  return url.origin === self.location.origin &&
    [new URL(BASE).pathname, new URL(INDEX_URL).pathname].includes(url.pathname) &&
    ['', '#', '#/'].includes(url.hash);
}
function clientReadiness(client, prepare = false) {
  return new Promise(resolve => {
    const channel = new MessageChannel();
    const timer = setTimeout(() => { channel.port1.close(); resolve({ ready: false }); }, 1500);
    channel.port1.onmessage = event => {
      clearTimeout(timer); channel.port1.close();
      const result = event.data;
      resolve({ ready: result?.ready === true && typeof result.url === 'string' && isCalendarURL(result.url), url: result?.url });
    };
    try { client.postMessage({ type: prepare ? 'STUDY_PREPARE_UPDATE' : 'STUDY_UPDATE_READINESS' }, [channel.port2]); }
    catch { clearTimeout(timer); channel.port1.close(); resolve({ ready: false }); }
  });
}
function notifyClient(client, type) {
  try { client.postMessage({ type }); } catch { /* A panel may close during handoff. */ }
}
async function prepareActivation({ automatic, sourceId } = {}) {
  if (activationAttempt) return activationAttempt;
  let reloadClients = [];
  activationAttempt = (async () => {
    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const appClients = windows.filter(client => client.url.startsWith(BASE));
    reloadClients = appClients.filter(client => automatic || client.id !== sourceId);
    // Client.url can retain an earlier SPA route. Ask each page for its live route.
    // A legacy or suspended page that cannot confirm readiness is left untouched.
    const readiness = await Promise.all(reloadClients.map(client => clientReadiness(client, true)));
    if (!appClients.length || readiness.some(result => !result.ready)) {
      for (const client of reloadClients) notifyClient(client, 'STUDY_UPDATE_POSTPONED');
      return { accepted: false, reason: 'Aktualizace počká na dokončení učení. Vrať ostatní panely study lo do kalendáře nebo je zavři.' };
    }
    const clientIds = reloadClients.map(client => client.id);
    const cache = await caches.open(CACHE_NAME);
    await cache.put(AUTO_RELOAD_URL, new Response(JSON.stringify(clientIds)));
    for (const client of appClients) notifyClient(client, 'STUDY_UPDATE_APPLYING');
    return { accepted: true };
  })();
  try {
    const result = await activationAttempt;
    if (!result.accepted) activationAttempt = undefined;
    return result;
  } catch (error) {
    for (const client of reloadClients) notifyClient(client, 'STUDY_UPDATE_POSTPONED');
    activationAttempt = undefined;
    throw error;
  }
}

async function preparePackage({ repair = false } = {}) {
    const response = await fetch(MANIFEST_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error('Offline package is unavailable.');
    const manifest = await response.json();
    if (manifest.version !== VERSION || !Array.isArray(manifest.assets) || !manifest.assets.length) throw new Error('Offline package version mismatch.');
    const cache = await caches.open(CACHE_NAME);
    const snapshots = await previousSnapshots();
    let position = 0;
    let failure;
    try {
      const download = async () => {
        while (!failure && position < manifest.assets.length) {
          const asset = manifest.assets[position++];
          const url = new URL(asset.url, BASE);
          try {
            if (url.origin !== self.location.origin || !url.href.startsWith(BASE)) throw new Error('Invalid package scope.');
            const result = await reusableAsset(asset, url.href, snapshots) ||
              await fetch(url.href, { cache: 'no-store', credentials: 'same-origin' });
            if (!result.ok || result.type === 'opaque') throw new Error(`Download failed: ${asset.url}`);
            if (await hash(await result.clone().arrayBuffer()) !== asset.sha256) throw new Error(`Version mismatch: ${asset.url}`);
            await cache.put(url.href, result);
          } catch (error) { failure = error; throw error; }
        }
      };
      // Let in-flight writes finish before removing a failed snapshot.
      await Promise.allSettled(Array.from({ length: 4 }, download));
      if (failure) throw failure;
      // Only this final marker makes the snapshot eligible to report readiness.
      await cache.put(MANIFEST_URL, new Response(JSON.stringify(manifest), { headers: { 'Content-Type': 'application/json' } }));
    } catch (error) {
      if (!repair) await caches.delete(CACHE_NAME);
      throw error;
    }
    packagePromise = Promise.resolve(manifest);
}

self.addEventListener('install', event => {
  // The page starts the automatic handoff after installation has fully finished.
  event.waitUntil(preparePackage());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const marker = await cache.match(AUTO_RELOAD_URL);
    const clientIds = marker ? await marker.json() : [];
    await cache.delete(AUTO_RELOAD_URL);
    for (const name of await caches.keys()) if (name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME) await caches.delete(name);
    await self.clients.claim();
    const clients = await Promise.all(clientIds.map(id => self.clients.get(id)));
    for (const client of clients) {
      if (!client) continue;
      // Each page rechecks its live route before reloading. WindowClient.url can be
      // stale after SPA navigation, and WebKit need not navigate a background client.
      notifyClient(client, 'STUDY_UPDATE_ACTIVATED');
    }
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
    return fallback || new Response('study lo zatím není připravené offline. Připoj se a otevři aplikaci znovu.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
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
  if (['ACTIVATE_UPDATE', 'AUTO_ACTIVATE_UPDATE'].includes(event.data?.type)) {
    event.waitUntil((async () => {
      const result = await prepareActivation({ automatic: event.data.type === 'AUTO_ACTIVATE_UPDATE', sourceId: event.source?.id });
      reply(result);
      if (result.accepted) await self.skipWaiting();
    })().catch(() => reply({ accepted: false, error: true, reason: 'Aktualizaci teď nelze načíst. Zkus to znovu s připojením a volným místem v zařízení.' })));
  }
});
