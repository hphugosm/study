/** Read the actual module instance loaded by the page, including built URL revisions. */
export async function readPwaState() {
  const entry = document.querySelector('script[type="module"][src]');
  const url = new URL('src/pwa.js', location.href);
  url.search = entry ? new URL(entry.src).search : '';
  const api = await import(url.href);
  const registration = await navigator.serviceWorker.getRegistration();
  return { ...api.getPwaState(), controlled: Boolean(registration?.active && navigator.serviceWorker.controller) };
}
