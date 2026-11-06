import { events, getSubject, getUnit } from './data.js';

export function routeInfo(hash = '#/') {
  const [path] = hash.replace(/^#/, '').split('?');
  const [section, id] = path.split('/').filter(Boolean);
  const event = section === 'events' ? events.find(item => item.id === id) : null;
  const unit = event ? getUnit(event.unitId) : section === 'units' ? getUnit(id) : null;
  const subject = getSubject(unit?.subjectId || (section === 'subjects' ? id : ''));
  return {
    subject,
    unit,
    parent: unit ? `#/subjects/${subject.id}` : '#/',
    label: subject?.name || event?.title || ({ subjects: 'Předměty', practice: 'Procvičování', settings: 'Nastavení' }[section] || 'Kalendář'),
  };
}

export function routeAncestors(hash) {
  if (hash === '#/') return ['#/'];
  const { unit, parent } = routeInfo(hash);
  return unit ? ['#/', parent, hash] : ['#/', hash];
}

/** App-local browser history. Deep links start with useful parents, never an external Back target. */
export function createNavigation(onChange) {
  const key = 'study:navigation:v1';
  let entries = [];
  let index = 0;
  let session;
  let scrollTimer;
  const currentHash = () => location.hash.startsWith('#/') ? location.hash : '#/';
  const persist = () => {
    try { sessionStorage.setItem(key, JSON.stringify({ session, entries, index })); }
    catch { /* Navigation also works when browser storage is unavailable. */ }
  };
  const state = position => ({ ...history.state, studyNavigation: { session, index: position } });
  const saveScroll = () => {
    if (entries[index]) entries[index].scroll = window.scrollY;
    persist();
  };
  const emit = restore => {
    persist();
    onChange({ hash: entries[index].hash, back: index > 0, forward: index < entries.length - 1,
      backLabel: entries[index - 1] ? routeInfo(entries[index - 1].hash).label : '',
      forwardLabel: entries[index + 1] ? routeInfo(entries[index + 1].hash).label : '',
      scroll: restore ? entries[index].scroll : 0, restore });
  };

  function initialize() {
    try {
      const saved = JSON.parse(sessionStorage.getItem(key));
      const marker = history.state?.studyNavigation;
      if (saved?.session === marker?.session && Array.isArray(saved.entries) &&
        saved.entries.every(entry => typeof entry.hash === 'string' && entry.hash.startsWith('#/') && Number.isFinite(entry.scroll)) &&
        saved.entries[marker.index]?.hash === currentHash()) {
        ({ session, entries } = saved); index = marker.index; return;
      }
    } catch { /* A malformed session is replaced, without touching learning progress. */ }
    session = crypto.randomUUID();
    entries = routeAncestors(currentHash()).map(hash => ({ hash, scroll: 0 }));
    entries.forEach((entry, position) => {
      history[position === 0 ? 'replaceState' : 'pushState'](state(position), '', entry.hash);
    });
    index = entries.length - 1;
  }

  function navigate(hash, { external = false } = {}) {
    if (!hash.startsWith('#/') || hash === entries[index].hash) return;
    saveScroll();
    const target = routeInfo(hash);
    const current = routeInfo(entries[index].hash);
    const additions = [];
    if (target.unit && target.parent !== entries[index].hash && target.unit.id !== current.unit?.id) {
      additions.push(target.parent);
    }
    additions.push(hash);
    entries = entries.slice(0, index + 1);
    additions.forEach((nextHash, offset) => {
      entries.push({ hash: nextHash, scroll: 0 });
      index++;
      // A raw hash link already made one browser entry; reuse it instead of adding a duplicate.
      history[external && offset === 0 ? 'replaceState' : 'pushState'](state(index), '', nextHash);
    });
    emit(false);
  }

  initialize();
  history.scrollRestoration = 'manual';
  window.addEventListener('popstate', () => {
    const marker = history.state?.studyNavigation;
    if (marker?.session === session && entries[marker.index]?.hash === currentHash()) {
      index = marker.index;
      emit(true);
    }
  });
  window.addEventListener('hashchange', () => {
    if (currentHash() !== entries[index].hash) navigate(currentHash(), { external: true });
  });
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(saveScroll, 120);
  }, { passive: true });
  window.addEventListener('pagehide', saveScroll);
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    // Deliberately inspect the retargeted element, leaving each Shadow DOM module's local links alone.
    const anchor = event.target.closest?.('a[href^="#/"]');
    if (!anchor || anchor.target || anchor.hasAttribute('download')) return;
    event.preventDefault();
    navigate(anchor.getAttribute('href'));
  });
  return {
    navigate,
    back: () => { if (index > 0) { saveScroll(); history.back(); } },
    forward: () => { if (index < entries.length - 1) { saveScroll(); history.forward(); } },
    start: () => emit(true),
  };
}
