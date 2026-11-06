const base = new URL('../', import.meta.url);
const listeners = new Set();
let registration;
let initPromise;
let deferredInstall;
let reloadOnControllerChange = false;
let controllerListenerInstalled = false;
let knownController = navigator.serviceWorker?.controller;
let autoUpdateTimer;
let checkPromise;
let lastCheck = 0;
const CHECK_INTERVAL = 60_000;
const displayMode = matchMedia('(display-mode: standalone)');
const state = {
  supported: 'serviceWorker' in navigator && window.isSecureContext,
  online: navigator.onLine,
  standalone: displayMode.matches || navigator.standalone === true,
  installed: false, installAvailable: false, installing: false, checking: false,
  offlineReady: false, updateAvailable: false,
  updating: false, updateDeferred: false, reloadRequired: false, updated: false, updateFailed: false,
  error: '', version: '', assetCount: 0, bytes: 0,
};
const update = patch => { Object.assign(state, patch); renderUpdateNotice(); for (const listener of listeners) listener(getPwaState()); };
export const getPwaState = () => ({ ...state });
export function subscribePwa(listener) { listeners.add(listener); listener(getPwaState()); return () => listeners.delete(listener); }

function isCalendar() {
  return [base.pathname, new URL('index.html', base).pathname].includes(location.pathname) &&
    ['', '#', '#/'].includes(location.hash);
}
function renderUpdateNotice() {
  const notice = document.querySelector('#app-update-status');
  if (!notice) return;
  let message = '';
  if (state.updating) message = 'Načítám novou verzi study lo…';
  else if (state.installing && state.version) message = 'Stahuji aktualizaci. Za chvíli se načte automaticky.';
  else if (state.updateDeferred) message = 'Nová verze je připravená. Počká na návrat ostatních panelů do kalendáře.';
  else if (state.updateAvailable) message = 'Nová verze je připravená. Za chvíli ji načtu automaticky.';
  else if (state.updated) message = 'Hotovo, study lo je aktuální.';
  else if (state.updateFailed) message = 'Aktualizaci se zatím nepodařilo stáhnout. Automaticky ji zkusím znovu.';
  notice.hidden = !isCalendar() || !message;
  if (notice.textContent !== message) notice.textContent = message;
  // Lock navigation only for the short handoff, after the complete update is ready.
  for (const region of document.querySelectorAll('header, main, footer')) region.inert = state.updating && isCalendar();
}
function reloadWithNotice() {
  const url = new URL(location.href);
  url.searchParams.set('study-updated', '1');
  location.replace(url.href);
}
function scheduleAutoUpdate() {
  clearTimeout(autoUpdateTimer);
  if (!isCalendar() || document.visibilityState !== 'visible' || state.updating ||
      (!registration?.waiting && !state.reloadRequired)) return;
  autoUpdateTimer = setTimeout(async () => {
    if (!isCalendar() || document.visibilityState !== 'visible') return;
    if (state.reloadRequired && !registration?.waiting) { reloadWithNotice(); return; }
    const waiting = registration?.waiting;
    if (!waiting) return;
    update({ updating: true, updateDeferred: false, updateFailed: false });
    try {
      const result = await askWorker(waiting, 'AUTO_ACTIVATE_UPDATE');
      if (!result.accepted) update({ updating: false, updateDeferred: !result.error, updateFailed: Boolean(result.error) });
    } catch { update({ updating: false, updateFailed: true }); }
  }, 1200);
}
async function automaticCheck() {
  if (!registration || !state.online || document.visibilityState !== 'visible' ||
      state.updating || Date.now() - lastCheck < CHECK_INTERVAL) return;
  await checkForUpdates();
}
/** The router calls this after leaving a study unit, including pushState navigation. */
export function notifyPwaRoute() {
  if (state.reloadRequired && !isCalendar()) update({ updating: false });
  renderUpdateNotice();
  scheduleAutoUpdate();
  if (registration?.active) void refresh();
  void automaticCheck();
}

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
    const reloadRequired = state.reloadRequired || Boolean(state.version && result.version && state.version !== result.version);
    update({ ...result, reloadRequired, installing: Boolean(registration.installing), updateAvailable: Boolean(registration.waiting) || reloadRequired });
    scheduleAutoUpdate();
  } catch (error) { update({ error: error.message }); }
}
function watchInstalling(worker) {
  if (!worker) return;
  update({ installing: true, error: '' });
  worker.addEventListener('statechange', () => {
    if (worker.state === 'installed' || worker.state === 'activated') {
      update({ installing: false, updateAvailable: Boolean(registration.waiting) });
      void refresh();
    }
    if (worker.state === 'redundant') update({ installing: false, updating: false, updateFailed: Boolean(state.version), error: 'Offline podklady se nepodařilo stáhnout. Zkontroluj připojení a zkus to znovu.' });
  });
}

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault(); deferredInstall = event; update({ installAvailable: !state.standalone });
});
window.addEventListener('appinstalled', () => { deferredInstall = null; update({ installAvailable: false, installed: true }); });
window.addEventListener('online', () => { update({ online: true }); lastCheck = 0; void automaticCheck(); });
window.addEventListener('offline', () => update({ online: false }));
window.addEventListener('focus', () => { void automaticCheck(); scheduleAutoUpdate(); });
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') { void automaticCheck(); scheduleAutoUpdate(); }
});
if (state.supported) setInterval(() => { void automaticCheck(); }, CHECK_INTERVAL);
displayMode.addEventListener('change', () => update({ standalone: displayMode.matches || navigator.standalone === true }));

export function initPwa() {
  if (initPromise) return initPromise;
  if (!state.supported) return Promise.resolve(getPwaState());
  initPromise = (async () => {
    try {
      lastCheck = Date.now();
      registration = await navigator.serviceWorker.register(new URL('sw.js', base), { scope: base.href, updateViaCache: 'none' });
      registration.addEventListener('updatefound', () => watchInstalling(registration.installing));
      watchInstalling(registration.installing);
      if (!controllerListenerInstalled) {
        controllerListenerInstalled = true;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          const changed = state.updating || (knownController && knownController !== navigator.serviceWorker.controller);
          knownController = navigator.serviceWorker.controller;
          if (reloadOnControllerChange) { reloadOnControllerChange = false; reloadWithNotice(); return; }
          if (changed) {
            update({ reloadRequired: true, updating: state.updating && isCalendar() });
            setTimeout(() => { if (state.reloadRequired && isCalendar()) reloadWithNotice(); }, 5000);
          }
          void refresh();
        });
        navigator.serviceWorker.addEventListener('message', event => {
          if (event.source?.scriptURL !== new URL('sw.js', base).href) return;
          if (['STUDY_PREPARE_UPDATE', 'STUDY_UPDATE_READINESS'].includes(event.data?.type)) {
            const ready = isCalendar();
            if (ready && event.data.type === 'STUDY_PREPARE_UPDATE') update({ updating: true, updateDeferred: false });
            event.ports[0]?.postMessage({ ready, url: location.href });
          } else if (event.data?.type === 'STUDY_UPDATE_ACTIVATED') {
            update({ reloadRequired: true, updating: false });
            if (isCalendar()) reloadWithNotice();
          } else if (event.data?.type === 'STUDY_UPDATE_POSTPONED') update({ updating: false, updateDeferred: true });
          else if (event.data?.type === 'STUDY_UPDATE_APPLYING') update({ updating: true, updateDeferred: false });
        });
      }
      navigator.serviceWorker.ready.then(() => refresh());
      await refresh();
      const url = new URL(location.href);
      if (url.searchParams.get('study-updated') === '1') {
        url.searchParams.delete('study-updated');
        history.replaceState(history.state, '', url.href);
        update({ updated: true });
        setTimeout(() => update({ updated: false }), 6000);
      }
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
export function checkForUpdates() {
  if (checkPromise) return checkPromise;
  lastCheck = Date.now();
  checkPromise = (async () => {
    update({ checking: true, error: '', updateFailed: false });
    try { await ensureRegistration(); if (!registration?.installing) await updateRegistration(); await refresh(); }
    catch { update({ error: 'Aktualizaci teď nelze zkontrolovat. Zkus to později s připojením.' }); }
    finally { update({ checking: false }); checkPromise = undefined; }
    return getPwaState();
  })();
  return checkPromise;
}
export async function applyUpdate() {
  if (state.reloadRequired && !registration?.waiting) { reloadWithNotice(); return true; }
  if (!registration?.waiting) return false;
  reloadOnControllerChange = true;
  try {
    const result = await askWorker(registration.waiting, 'ACTIVATE_UPDATE');
    if (!result.accepted) { reloadOnControllerChange = false; update({ error: result.reason }); return false; }
    return true;
  } catch (error) { reloadOnControllerChange = false; update({ error: error.message }); return false; }
}
