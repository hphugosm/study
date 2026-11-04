const base = new URL('../', import.meta.url);
const listeners = new Set();
let registration;
let initPromise;
let deferredInstall;
let reloadOnControllerChange = false;
let controllerListenerInstalled = false;
const displayMode = matchMedia('(display-mode: standalone)');
const state = {
  supported: 'serviceWorker' in navigator && window.isSecureContext,
  online: navigator.onLine,
  standalone: displayMode.matches || navigator.standalone === true,
  installed: false, installAvailable: false, installing: false, checking: false,
  offlineReady: false, updateAvailable: false,
  error: '', version: '', assetCount: 0, bytes: 0,
};
const update = patch => { Object.assign(state, patch); for (const listener of listeners) listener(getPwaState()); };
export const getPwaState = () => ({ ...state });
export function subscribePwa(listener) { listeners.add(listener); listener(getPwaState()); return () => listeners.delete(listener); }

function askWorker(worker, type, timeout = 8000) {
  return new Promise((resolve, reject) => {
    if (!worker) { resolve({}); return; }
    const channel = new MessageChannel();
    const timer = setTimeout(() => { channel.port1.close(); reject(new Error('Příprava offline režimu zatím nebyla dokončena.')); }, timeout);
    channel.port1.onmessage = event => { clearTimeout(timer); channel.port1.close(); resolve(event.data); };
    worker.postMessage({ type }, [channel.port2]);
  });
}
async function refresh() {
  if (!registration) return;
  const worker = registration.active || navigator.serviceWorker.controller;
  try {
    const result = await askWorker(worker, 'GET_STATUS');
    update({ ...result, installing: Boolean(registration.installing), updateAvailable: Boolean(registration.waiting) });
  } catch (error) { update({ error: error.message }); }
}
function watchInstalling(worker) {
  if (!worker) return;
  update({ installing: true, error: '' });
  worker.addEventListener('statechange', () => {
    if (worker.state === 'installed' || worker.state === 'activated') {
      update({ installing: false, updateAvailable: Boolean(registration.waiting) });
      refresh();
    }
    if (worker.state === 'redundant') update({ installing: false, error: 'Offline podklady se nepodařilo stáhnout. Zkontroluj připojení a zkus to znovu.' });
  });
}

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault(); deferredInstall = event; update({ installAvailable: !state.standalone });
});
window.addEventListener('appinstalled', () => { deferredInstall = null; update({ installAvailable: false, installed: true }); });
window.addEventListener('online', () => { update({ online: true }); refresh(); });
window.addEventListener('offline', () => update({ online: false }));
displayMode.addEventListener('change', () => update({ standalone: displayMode.matches || navigator.standalone === true }));

export function initPwa() {
  if (initPromise) return initPromise;
  if (!state.supported) return Promise.resolve(getPwaState());
  initPromise = (async () => {
    try {
      registration = await navigator.serviceWorker.register(new URL('sw.js', base), { scope: base.href, updateViaCache: 'none' });
      registration.addEventListener('updatefound', () => watchInstalling(registration.installing));
      watchInstalling(registration.installing);
      if (!controllerListenerInstalled) {
        controllerListenerInstalled = true;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (reloadOnControllerChange) { reloadOnControllerChange = false; location.reload(); return; }
          refresh();
        });
      }
      navigator.serviceWorker.ready.then(() => refresh());
      await refresh();
    } catch {
      update({ error: 'Offline režim se nepodařilo připravit. Zkus aplikaci otevřít znovu s připojením.', installing: false });
      initPromise = null;
    }
    return getPwaState();
  })();
  return initPromise;
}
export async function requestInstall() {
  if (!deferredInstall) return false;
  const prompt = deferredInstall; deferredInstall = null; update({ installAvailable: false });
  await prompt.prompt();
  const choice = await prompt.userChoice;
  return choice.outcome === 'accepted';
}
async function ensureRegistration() {
  await initPwa();
  if (!state.supported) return;
  const current = await navigator.serviceWorker.getRegistration(base.href);
  if (current && (current.active || current.installing || current.waiting)) {
    registration = current;
    return;
  }
  // A failed first install can remove its registration. Retry without requiring a page reload.
  registration = undefined;
  initPromise = null;
  update({ error: '', installing: true });
  await initPwa();
}
async function updateRegistration() {
  try { await registration?.update(); }
  catch (error) {
    if (error.name !== 'InvalidStateError') throw error;
    registration = undefined;
    initPromise = null;
    await ensureRegistration();
  }
}
export async function downloadOffline() {
  update({ error: '' });
  await ensureRegistration();
  if (!registration || !state.online) return getPwaState();
  if (!state.offlineReady && !registration.installing) {
    await updateRegistration();
    if (!registration.installing && registration.active) {
      update({ installing: true });
      try {
        const result = await askWorker(registration.active, 'PREPARE_OFFLINE', 120000);
        if (!result.ready) update({ error: 'Podklady teď nelze připravit. Zkontroluj připojení nebo dostupnost nové verze.' });
      } catch (error) { update({ error: error.message }); }
      finally { update({ installing: false }); }
    }
  }
  await refresh();
  return getPwaState();
}
export async function checkForUpdates() {
  update({ checking: true, error: '' });
  try { await ensureRegistration(); if (!registration?.installing) await updateRegistration(); await refresh(); }
  catch { update({ error: 'Aktualizaci teď nelze zkontrolovat. Zkus to později s připojením.' }); }
  finally { update({ checking: false }); }
  return getPwaState();
}
export async function applyUpdate() {
  if (!registration?.waiting) return false;
  reloadOnControllerChange = true;
  try {
    const result = await askWorker(registration.waiting, 'ACTIVATE_UPDATE');
    if (!result.accepted) { reloadOnControllerChange = false; update({ error: result.reason }); return false; }
    return true;
  } catch (error) { reloadOnControllerChange = false; update({ error: error.message }); return false; }
}
