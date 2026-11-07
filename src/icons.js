const paths = {
  earth:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18ZM5 7h14M5 17h14"/>',
  flask:'<path d="M9 3h6m-5 0v6l-6 10a1.4 1.4 0 0 0 1.2 2h13.6A1.4 1.4 0 0 0 20 19L14 9V3M7 15h10M9 18h.01M14 17h.01"/>',
  physics:'<ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1"/>',
  monitor:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4M8 8l-2 2 2 2m8-4 2 2-2 2"/>',
  users:'<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3m1-16a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 5v1"/>',

  settings:'<path d="m9 3-.7 2.5-2 .9L4 5.7 2 9l1.8 1.8v2.4L2 15l2 3.3 2.3-.7 2 .9L9 21h6l.7-2.5 2-.9 2.3.7 2-3.3-1.8-1.8v-2.4L22 9l-2-3.3-2.3.7-2-.9L15 3H9Z"/><circle cx="12" cy="12" r="3"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  share:'<path d="M12 15V2m-4 4 4-4 4 4M8 9H4v13h16V9h-4"/>',
  cloud:'<path d="M7 18a5 5 0 0 1-.9-9.9A6 6 0 0 1 18 7a5.5 5.5 0 0 1 0 11M8 16l3 3 5-6"/>',
  text:'<path d="M4 20 10 4l6 16M6 15h8m3-5h6m-3 0v10"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18m-13 5h2m4 0h2"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  layers:'<path d="m12 3 10 6-10 6L2 9l10-6Zm-9 11 9 5 9-5M3 18l9 5 9-5"/>',
  leaf:'<path d="M20 3C7 2 2 8 5 15c3 7 16 4 15-12Z M4 21 15 10"/>',
  scale:'<path d="M12 3v18M7 21h10M4 7h16M6 7l-4 8h8L6 7Zm12 0-4 8h8l-4-8Z"/>',
  function:'<path d="M16 3h-2c-2 0-3 1-3 3L9 18c0 2-1 3-3 3H4M6 9h11M17 15l5 6m0-6-5 6"/>',
  book:'<path d="M12 5c-3-2-7-2-10-1v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Zm0 0v15"/>',
  arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
  left:'<path d="m14 6-6 6 6 6"/>',
  right:'<path d="m10 6 6 6-6 6"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 0v6h6M8 13h8m-8 4h5"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  spark:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/>',
};
export function icon(name,cls='') {
  return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.book}</svg>`;
}
