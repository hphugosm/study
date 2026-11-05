# Architektura

study lo je jeden statický web postavený na ES modulech. Pro společný shell není potřeba framework ani bundler: starší aplikace mohou zachovat své osvědčené chování a web nemá síťové závislosti na CDN. `npm run build` vytvoří přenositelný `dist/`.

## Instalace, offline a vzhled

Manifest a Apple touch ikona umožňují samostatné okno po přidání na plochu. `src/pwa.js` registruje service worker z rozsahu stejného projektu. Build vytvoří verzi ze SHA-256 obsahu nasazovaných souborů a seznam všech potřebných URL. Service worker stáhne a ověří celý balíček, včetně dosud nenavštívených modulů a PDF, do vlastní cache. Nepoužívá cizí scope ani nemaže localStorage. Aktualizace čekají na výslovnou akci uživatele; dokumenty jiné verze se nemíchají se starými skripty. Podrobný kontrakt a skutečný test přechodu verzí jsou v [PWA](pwa.md).

`src/preferences.js` ukládá pouze tři validované volby do `study:preferences:v1`: motiv, akcent a větší text. Automatický motiv reaguje na změny nastavení systému. Malý synchronní bootstrap v hlavě dokumentu aplikuje uložený motiv před vykreslením; `themes.css` potom poskytuje zděděné barevné proměnné. Oba Shadow DOM moduly je používají přímo, bez `:host-context` nebo přepisování globálního DOM. Originální obrázky a anatomické podklady mají nadále čitelný světlý podklad.

`src/backup.js` exportuje a validuje známé typy studijního postupu. Import po samostatném potvrzení v UI slučuje záznamy; před zápisem se validuje celý obsah a při chybě úložiště se dokončené zápisy vracejí. Neznámé klíče ani vzhled se ze zálohy do aplikace nepřebírají. Nastavení je samostatná route `#/settings` s odkazem pouze v patičce.

## Datový model

`Subject` nese identitu, barvu, ikonu a popis. `Study Unit` odkazuje na Subject a obsahuje vlastní téma, poznámky, materiály a volitelný interaktivní modul. `Event` nese datum, typ a odkaz na Study Unit. Vazby jsou N jednotek na 1 předmět a N událostí na 1 jednotku. Vztahy se kontrolují před sestavením.

## Navigace a izolace

Jediný společný router používá `#/`, `#/subjects`, `#/practice`, `#/subjects/:id`, `#/units/:id` a `#/events/:id`. Přímé URL tedy fungují i na GitHub Pages. Každý předmět má vlastní přehled témat a termínů, i když zatím obsahuje jedinou jednotku.

`src/navigation.js` spravuje skutečnou historii prohlížeče pomocí History API. Přímý odkaz na téma nebo událost připraví předky Kalendář → Předmět → Téma. Při otevření tématu z kalendáře se vloží stránka předmětu bez mezikroku ve vykreslení. Šipky v horní liště i nativní zpět/vpřed používají stejný index; horní šipka nikdy neposílá mimo aplikaci. Nová navigace za posledním návratem odstraní opuštěnou větev. Stav a pozice posunu se uchovávají v odděleném `sessionStorage` klíči `study:navigation:v1`, bez zásahu do studijního postupu. Při blokovaném úložišti historie nadále funguje pro aktuální návštěvu.

Na mobilu je horní lišta sticky a hlavní navigace ve spodní fixed liště. CSS proměnné `--study-sticky-offset` a `--study-bottom-offset` předávají modulům potřebné odstupy; `viewport-fit=cover` a všechny čtyři `safe-area-inset-*` rezervují prostor pro iPhone. Vstupy mají na dotykových zařízeních alespoň 16 px. Přiblížení uživatelem není omezené. Klademe důraz i na malé šířky a otočení na šířku; výsledky emulace WebKitu jsou v záznamu ověření.

Law a Biologie se připojují do společné stránky přes `mount(container,options)`. Každá aplikace má vlastní Shadow DOM, uzavřený runtime, lokální interní navigaci a vlastní úložiště. Společný header zůstává dostupný. Nejsou použity iframe, `eval` ani globální přepisování `document` či `window`. Cleanup při změně stránky odstraní původní pohled i externí listenery.

PDF a všechny obrázky jsou lokální součástí stejného webu. `import.meta.url` zajišťuje správné cesty i pod `/study/`. Původní zdrojové kopie a audit umožňují porovnat přenesené chování.

## Postup a migrace

- Law: `study:law:progress:v1`; legacy čtení `casebook-us-law-progress-v1`.
- Biologie: `study:biology:kostra-progress-v2` a `v1`; legacy klíče bez prefixu se pouze kopírují. K tomu `study:biology:map-progress` a `map-results`.
- Legacy originály se nemění a nemažou. Nové výsledky se zapisují jen do odděleného prostoru příslušného předmětu.
- Web nemá účet ani synchronizaci; uložení platí pro daný prohlížeč a origin. Původní GitHub Pages projekty stejného účtu sdílejí origin, takže dostupné starší klíče lze zachovat. Jiný hostitel vyžaduje ruční přenos, který demo neimplementuje.
- Neplatná nebo nedostupná localStorage neblokuje studijní obsah. Dlouhodobé uložení v soukromém režimu nebo při blokovaném úložišti není zaručeno.

Law původní materiály zůstávají anglicky, Biologie česky; společný shell je česky. Matematika a Literatura obsahují pouze skutečně zadané termíny a výslovně označená prázdná místa pro budoucí podklady.
