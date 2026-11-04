# Architektura

study. je jeden statický web postavený na ES modulech. Pro společný shell není potřeba framework ani bundler: starší aplikace mohou zachovat své osvědčené chování a web nemá síťové závislosti na CDN. `npm run build` vytvoří přenositelný `dist/`.

## Datový model

`Subject` nese identitu, barvu, ikonu a popis. `Study Unit` odkazuje na Subject a obsahuje vlastní téma, poznámky, materiály a volitelný interaktivní modul. `Event` nese datum, typ a odkaz na Study Unit. Vazby jsou N jednotek na 1 předmět a N událostí na 1 jednotku. Vztahy se kontrolují před sestavením.

## Navigace a izolace

Jediný společný router používá `#/`, `#/subjects`, `#/practice`, `#/subjects/:id`, `#/units/:id` a `#/events/:id`. Přímé URL tedy fungují i na GitHub Pages. Při více jednotkách zobrazí předmět automaticky jejich výběr.

Law a Biologie se připojují do společné stránky přes `mount(container,options)`. Každá aplikace má vlastní Shadow DOM, uzavřený runtime, lokální interní navigaci a vlastní úložiště. Společný header zůstává dostupný. Nejsou použity iframe, `eval` ani globální přepisování `document` či `window`. Cleanup při změně stránky odstraní původní pohled i externí listenery.

PDF a všechny obrázky jsou lokální součástí stejného webu. `import.meta.url` zajišťuje správné cesty i pod `/study/`. Původní zdrojové kopie a audit umožňují porovnat přenesené chování.

## Postup a migrace

- Law: `study:law:progress:v1`; legacy čtení `casebook-us-law-progress-v1`.
- Biologie: `study:biology:kostra-progress-v2` a `v1`; legacy klíče bez prefixu se pouze kopírují. K tomu `study:biology:map-progress` a `map-results`.
- Legacy originály se nemění a nemažou. Nové výsledky se zapisují jen do odděleného prostoru příslušného předmětu.
- Web nemá účet ani synchronizaci; uložení platí pro daný prohlížeč a origin. Původní GitHub Pages projekty stejného účtu sdílejí origin, takže dostupné starší klíče lze zachovat. Jiný hostitel vyžaduje ruční přenos, který demo neimplementuje.
- Neplatná nebo nedostupná localStorage neblokuje studijní obsah. Dlouhodobé uložení v soukromém režimu nebo při blokovaném úložišti není zaručeno.

Law původní materiály zůstávají anglicky, Biologie česky; společný shell je česky. Matematika a Literatura obsahují pouze skutečně zadané termíny a výslovně označená prázdná místa pro budoucí podklady.
