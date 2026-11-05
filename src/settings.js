import { icon } from './icons.js';
import { defaultPreferences, getPreferences, updatePreferences, subscribePreferences } from './preferences.js';
import { getPwaState, subscribePwa, requestInstall, downloadOffline, checkForUpdates, applyUpdate } from './pwa.js';
import { exportProgress, parseBackup, restoreBackup } from './backup.js';

const themes = [
  { value: 'system', title: 'Podle telefonu', help: 'Automaticky', preview: 'system' },
  { value: 'light', title: 'Světlý', help: 'Čistý a vzdušný', preview: 'light' },
  { value: 'dark', title: 'Tmavý', help: 'Na večerní učení', preview: 'dark' },
  { value: 'paper', title: 'Papírový', help: 'Teplé odstíny', preview: 'paper' },
];
const accents = [
  { value: 'sage', title: 'Šalvěj', color: '#779269' },
  { value: 'blue', title: 'Modrá', color: '#7b97bf' },
  { value: 'plum', title: 'Švestka', color: '#a083ab' },
  { value: 'amber', title: 'Med', color: '#bd9a67' },
];
const megabytes = bytes => `${(Number(bytes || 0) / 1_000_000).toLocaleString('cs-CZ', { maximumFractionDigits: 1 })} MB`;

export function mountSettings(container) {
  const preferences = getPreferences();
  let pendingBackup = null;
  let active = true;
  container.innerHTML = `<section class="page-intro settings-intro"><div><p class="eyebrow">PODLE TVÉHO TEMPA</p><h1>Malé věci pro lepší učení.</h1><p>Nastav si vzhled. Vezmi si study. s sebou.</p></div></section>
    <div class="settings-layout">
      <section class="settings-card appearance-settings" aria-labelledby="appearance-title"><div class="settings-section-heading">${icon('spark')}<div><h2 id="appearance-title">Vzhled a pohodlí</h2><p>Tak, aby se ti dobře soustředilo.</p></div></div>
        <fieldset class="settings-fieldset"><legend>Barevný režim</legend><div class="theme-options">${themes.map(theme => `<label class="theme-option"><input type="radio" name="theme" value="${theme.value}" ${preferences.theme === theme.value ? 'checked' : ''}><span class="theme-preview ${theme.preview}" aria-hidden="true"><i></i><i></i><i></i></span><strong>${theme.title}</strong><span class="setting-help">${theme.help}</span></label>`).join('')}</div></fieldset>
        <fieldset class="settings-fieldset"><legend>Tvůj barevný akcent</legend><div class="accent-options">${accents.map(accent => `<label class="accent-option" style="--swatch:${accent.color}"><input type="radio" name="accent" value="${accent.value}" ${preferences.accent === accent.value ? 'checked' : ''}><span class="accent-swatch" aria-hidden="true"></span><span>${accent.title}</span></label>`).join('')}</div></fieldset>
        <label class="settings-toggle" for="larger-text"><span>${icon('text')}<span><strong>Větší text</strong><span class="setting-help">Více pohodlí ve výpiscích, kartičkách a odpovědích.</span></span></span><input id="larger-text" type="checkbox" name="largerText" ${preferences.largerText ? 'checked' : ''}></label>
        <div class="settings-card-footer"><span id="preferences-status" role="status">Změny se ukládají automaticky.</span><button type="button" class="text-link" id="reset-appearance">Výchozí vzhled</button></div>
      </section>
      <div class="settings-side">
        <section class="settings-card install-settings" aria-labelledby="install-title"><div class="settings-section-heading"><span class="app-icon-preview" aria-hidden="true">s<span>.</span></span><div><h2 id="install-title">study. na ploše</h2><p>Jako samostatná aplikace.</p></div></div><p class="settings-description">Jedno klepnutí a jsi u učení. Vlastní ikona, celé okno a tvoje studijní místo vždy po ruce.</p><button class="button primary" id="install-study" type="button">${icon('download')}Přidat na plochu</button></section>
        <section class="settings-card offline-settings" aria-labelledby="offline-title"><div class="settings-section-heading">${icon('cloud')}<div><h2 id="offline-title">I bez připojení</h2><p>Atlas, otázky i podklady s tebou.</p></div></div><p class="offline-status" data-offline-status role="status">Zjišťuji dostupnost podkladů…</p><p class="setting-help" id="offline-detail"></p><div class="settings-actions"><button class="button" id="download-offline" type="button">${icon('download')}Připravit offline</button><button class="text-link" id="check-updates" type="button">Zkontrolovat aktualizaci</button><button class="button primary" id="apply-update" type="button" hidden>Načíst novou verzi</button></div><p class="setting-help" id="pwa-action-status" role="status"></p></section>
      </div>
      <section class="settings-card backup-settings" aria-labelledby="backup-title"><div class="settings-section-heading">${icon('layers')}<div><h2 id="backup-title">Tvůj postup, v bezpečí</h2><p>Kartičky a výsledky patří tobě.</p></div></div><p class="settings-description">Ulož si kopii výsledků do souboru. Při načtení zálohy se záznamy doplní; tvůj současný postup zůstane zachovaný.</p><div class="settings-actions"><button class="button" id="export-progress" type="button">${icon('download')}Stáhnout zálohu</button><button class="button" id="choose-backup" type="button">Načíst zálohu</button><input id="backup-file" type="file" accept="application/json,.json" hidden></div><div class="backup-review" id="backup-review" hidden><p id="backup-summary"></p><button class="button primary" type="button" id="restore-progress">Doplnit uložený postup</button><button class="text-link" type="button" id="cancel-backup">Zrušit</button></div><p class="setting-help" role="status" id="backup-status"></p></section>
    </div>
    <dialog id="install-guide" class="install-dialog" aria-labelledby="install-guide-title"><div class="install-dialog-header"><span class="app-icon-preview" aria-hidden="true">s<span>.</span></span><button class="dialog-close" type="button" id="close-install-guide" aria-label="Zavřít návod">×</button></div><p class="eyebrow">STUDY. V TVÉM IPHONU</p><h2 id="install-guide-title">Tvoje studijní místo.<br>Přímo na ploše.</h2><ol class="install-steps"><li><span>${icon('share')}</span><div><strong>Otevři study. v Safari</strong><p>V nabídce stránky klepni na <b>Sdílet</b> (čtvereček se šipkou nahoru).</p></div></li><li><span>2</span><div><strong>Přidat na plochu</strong><p>Najdi tuto volbu v nabídce sdílení.</p></div></li><li><span>3</span><div><strong>Otevřít jako aplikaci</strong><p>Pokud vidíš volbu <b>Otevřít jako webovou aplikaci</b>, ponech ji zapnutou. Potom klepni na <b>Přidat</b>.</p></div></li></ol><div class="install-offline-note">${icon('cloud')}<p>Novou ikonou otevři study. jednou s připojením. V nastavení počkej na <strong>Připraveno offline</strong> — pak můžeš studovat i bez internetu.</p></div><a class="text-link" href="https://support.apple.com/guide/iphone/open-as-web-app-iphea86e5236/ios" target="_blank" rel="noopener">Návod od Apple ${icon('arrow')}</a><button class="button primary" type="button" id="install-guide-done">Rozumím</button></dialog>`;

  const $ = selector => container.querySelector(selector);
  const dialog = $('#install-guide');
  const status = $('#preferences-status');
  const setPwaMessage = message => { if (active) $('#pwa-action-status').textContent = message; };
  function syncPreferences(next) {
    for (const input of container.querySelectorAll('[name="theme"],[name="accent"]')) input.checked = next[input.name] === input.value;
    $('#larger-text').checked = next.largerText;
  }
  function syncPwa(state) {
    if (!active) return;
    const ready = state.offlineReady;
    const offline = !state.online;
    const message = ready ? 'Připraveno offline' : state.installing ? 'Připravuji offline podklady…' : offline ? 'Pro první stažení se připoj k internetu.' : state.error ? 'Offline podklady zatím nejsou připravené.' : state.supported ? 'Připravuji offline podklady…' : 'Tento prohlížeč offline režim nepodporuje.';
    $('[data-offline-status]').textContent = message;
    $('[data-offline-status]').dataset.ready = String(ready);
    $('#offline-detail').textContent = ready ? `Kalendář, studijní moduly včetně matematiky, obrázky a všechny podklady${state.bytes ? ` · ${megabytes(state.bytes)}` : ''}. ${offline ? 'Právě studuješ bez připojení.' : 'Vše uložené v tomto zařízení.'}` : 'První příprava potřebuje připojení. Stav se aktualizuje automaticky.';
    $('#download-offline').disabled = !state.supported || state.installing || offline;
    $('#download-offline').innerHTML = `${icon(ready ? 'check' : 'download')}${ready ? 'Ověřit podklady' : 'Připravit offline'}`;
    $('#check-updates').disabled = !state.supported || offline;
    $('#apply-update').hidden = !state.updateAvailable;
    $('#install-study').disabled = state.standalone || state.installed;
    $('#install-study').innerHTML = `${icon(state.standalone || state.installed ? 'check' : 'download')}${state.standalone ? 'Otevřeno jako aplikace' : state.installed ? 'Nainstalováno' : 'Přidat na plochu'}`;
  }
  const offPreferences = subscribePreferences(syncPreferences);
  const offPwa = subscribePwa(syncPwa);
  syncPwa(getPwaState());
  container.querySelectorAll('[name="theme"],[name="accent"],[name="largerText"]').forEach(input => input.addEventListener('change', () => {
    const result = updatePreferences({ [input.name]: input.name === 'largerText' ? input.checked : input.value });
    status.textContent = result.saved ? 'Uloženo. Přesně podle tebe.' : 'Vzhled platí pro tuto návštěvu; prohlížeč ho nemohl uložit.';
  }));
  $('#reset-appearance').onclick = () => { updatePreferences(defaultPreferences); status.textContent = 'Výchozí vzhled obnoven. Studijní postup zůstává zachovaný.'; };
  $('#install-study').onclick = async () => {
    if (getPwaState().installAvailable) {
      try { await requestInstall(); } catch { if (active) dialog.showModal(); }
    } else dialog.showModal();
  };
  for (const id of ['close-install-guide', 'install-guide-done']) $(`#${id}`).onclick = () => dialog.close();
  dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });
  $('#download-offline').onclick = async () => {
    setPwaMessage('Kontroluji podklady…');
    try { const next = await downloadOffline(); setPwaMessage(next.error || (next.offlineReady ? 'Vše připraveno i bez připojení.' : 'Podklady se připravují. Nech study. chvíli otevřené.')); }
    catch { setPwaMessage('Podklady se nepodařilo stáhnout. Zkontroluj připojení a zkus to znovu.'); }
  };
  $('#check-updates').onclick = async () => {
    setPwaMessage('Kontroluji novou verzi…');
    try { const next = await checkForUpdates(); setPwaMessage(next.error || (next.updateAvailable ? 'Nová verze je připravená. Načti ji, až dokončíš učení.' : 'Kontrola dokončena. Nová verze se nabídne, jakmile bude připravená.')); }
    catch { setPwaMessage('Kontrola se nepodařila. Zkus to později s připojením.'); }
  };
  $('#apply-update').onclick = async () => {
    try { if (!await applyUpdate()) setPwaMessage(getPwaState().error || 'Nová verze zatím není připravená.'); }
    catch { setPwaMessage('Novou verzi se nepodařilo načíst. Zkus to později.'); }
  };
  $('#export-progress').onclick = () => {
    try { exportProgress(); $('#backup-status').textContent = 'Záloha je připravená ke stažení.'; }
    catch { $('#backup-status').textContent = 'Zálohu se nepodařilo vytvořit. Zkus to znovu.'; }
  };
  $('#choose-backup').onclick = () => $('#backup-file').click();
  $('#backup-file').onchange = async event => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      if (file.size > 2_000_000) throw new Error('too-large');
      const parsed = parseBackup(await file.text());
      if (!active) return;
      pendingBackup = parsed;
      $('#backup-summary').textContent = `Záloha obsahuje ${parsed.summary.lawCards} známých Law kartiček, ${parsed.summary.lawAttempts} právních testů, ${parsed.summary.biologyCards} zvládnutých biologických položek, ${parsed.summary.mapResults} výsledků mapy, ${parsed.summary.mathCards} matematických kartiček a ${parsed.summary.mathAttempts} matematických testů.`;
      $('#backup-review').hidden = false;
      $('#backup-status').textContent = 'Soubor je ověřený. Potvrzením doplníš uložený postup.';
    } catch {
      if (!active) return;
      pendingBackup = null; $('#backup-review').hidden = true;
      $('#backup-status').textContent = 'Tento soubor není platná záloha study. nebo je příliš velký. Žádný postup se nezměnil.';
    }
    if (active) event.target.value = '';
  };
  $('#cancel-backup').onclick = () => { pendingBackup = null; $('#backup-review').hidden = true; $('#backup-status').textContent = 'Načtení zrušeno. Postup se nezměnil.'; };
  $('#restore-progress').onclick = () => {
    if (!pendingBackup) return;
    try { restoreBackup(pendingBackup); pendingBackup = null; $('#backup-review').hidden = true; $('#backup-status').textContent = 'Hotovo. Záloha doplnila tvůj současný postup.'; }
    catch { $('#backup-status').textContent = 'Postup se nepodařilo doplnit. Ponech si záložní soubor a zkus to znovu.'; }
  };
  return () => { active = false; offPreferences(); offPwa(); if (dialog.open) dialog.close(); };
}
