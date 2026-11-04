# Biologie: audit a integrace

Zdroj: https://github.com/hphugosm/kostra-procvicovani

Převzatý commit: `958f139a32d0c4b7b864d16c8ee69a80e3c2333d`. Původní repozitář zůstal beze změny.

## Původní aplikace

Aplikace je statický HTML/CSS/JavaScript bez závislostí a backendu. Obsah tvoří `data.json`, jeho offline JavaScriptová verze `data.js` a SVG schéma. `map-views.js` přidává pohled na lebku zezadu, spodinu lebky zevnitř a zespodu a lopatku zezadu. Čistá pravidla v `map-quiz.js` a `study-cards.js` sestavují všechny otázky a migrují starý postup. `map-ui.js` ovládá procvičování mapy, `image-preview.js` zvětšovací dialog a `app.js` atlas, karty, výpisky a navigaci.

Převzatý obsah a funkce:

- 64 položek atlasu: kosti, skupiny kostí a útvary; české/latinské názvy, fakta, zdrojové snímky a vyhledávání.
- Klikací SVG atlas, volba oblasti, přepínání popisků a detailní obrázek kosti.
- 64 kartiček včetně doplňujících obrázků pro položky, které neměly vlastní fotografii; 17 fotografických zadání a 47 zvýrazněných detailů atlasu.
- Otáčení, hodnocení umím/opakovat, filtr neznámých, míchání a klávesové zkratky.
- Slepá mapa všech 64 položek, zadání názvem nebo obrázkem, filtry oblastí, různé pohledy, přiblížení, správná a chybná místa, řešení, výsledky a nové procvičení chyb.
- 11 tematických výpisků, slovníček 40 pojmů, fulltextové hledání, poznámky k opravám a původní zdroje.
- Veškeré obrázky, čtyři doplňující SVG pohledy, původní SVG kostry, lokální fonty a původní devítistránkové PDF `assets/kosterni-soustava-prehled.pdf`.
- Zvětšovací dialog s obrázkem a popisem, který pracuje i uvnitř Shadow DOM.

## Zapojení do study.

`modules/biology/index.js` exportuje `mount(container, {mode, onProgress})`. Výchozí režim je `atlas`; dostupné jsou `atlas`, `cards`, `map`, `notes` a aliasy `materials`/`practice`. Návratová hodnota je úklidová funkce, která má navíc `navigate(mode)` a `root` pro ověřování. `getProgress()` vrací počet zvládnutých položek, celkový počet, poslední stav mapy a historii výsledků.

`template.js` obsahuje původní pracovní rozhraní, ze kterého byly odstraněny pouze samostatná značka a patička. `runtime.js` obsahuje původní JavaScript v izolované funkci: `window`, `document`, `location` a `localStorage` jsou lokální adaptéry. Aplikace proto nezapisuje globální proměnné, nemění URL shellu a její CSS nezasahuje do jiných předmětů. Původní nezměněné skripty jsou vedle runtime zachované pro dohledatelnost a pravidlové testy. Aktualizaci zdrojů je nutné promítnout i do runtime.

Styly se načítají uvnitř Shadow DOM, doplňující styly sjednocují světlý vzhled s hlavní aplikací. Po načtení CSS se teprve měří souřadnice atlasu. Cesty obrázků a dokumentů vznikají přes `new URL(..., import.meta.url)`, takže fungují i pod podadresářem GitHub Pages.

Události na skutečném okně jsou omezeny na změnu velikosti a jsou při opuštění jednotky odstraněny. Klávesové zkratky a klikání jsou omezeny na Shadow DOM. Úklid ruší také čekající vykreslovací snímky.

## Ukládání postupu

Původní aplikace ukládala pouze kartičky do `kostra-progress-v2`; starší `kostra-progress-v1` měla odlišné identifikátory. Adaptér ukládá do `study:biology:kostra-progress-v2` a při prvním použití pouze přečte/kopíruje původní klíče, pokud nový klíč ještě neexistuje. Původní data se nikdy nepřepisují ani nemažou. Zachovává se přesná původní migrace v1, aby například staré `hrudni` neoznačilo hrudní obratle namísto hrudní kosti.

Nově se ukládá také stav mapy `study:biology:map-progress` a historie posledních 30 dokončených sad `study:biology:map-results`. Uživatel po návratu vidí uložené výsledky přes společné rozhraní; nově otevřená mapová sada začíná samostatným procvičením.

Postup z jiné domény nelze kvůli omezením prohlížeče načíst automaticky. Migrace se provede, pokud jsou původní klíče dostupné na stejném originu; původní aplikace na svém originu zůstává nedotčena.

## Ověření

`node --test modules/biology/tests/*.test.cjs`: 17/17 úspěšných testů. Testy ověřují všech 64 položek, existenci každého obrázku, rozdíl hrudní kosti a hrudních obratlů, příslušnost jednotlivých kostí ke skupinám, správná místa všech otázek, zadání skrytých kostí, filtrování, míchání, typy zadání a bezpečnou migraci postupu.

V prohlížeči ověřeno: načtení atlasu a 64 položek; interní navigace bez změny URL shellu; obrázkové kartičky; zvětšovací dialog a zavření; otočení, označení umím a zachování postupu po obnovení stránky; slepá mapa v názvovém i obrázkovém režimu a zobrazení řešení. Atlas byl vizuálně ověřen i při šířce 390 px.

## Dodatečné ověření PDF (4. 11. 2026)

Pomocí pypdf byl přečten text všech 9 stran `kosterni-soustava-prehled.pdf` a metadata. Dokument obsahuje základy kosterní soustavy, stavbu kosti a kloubu, osovou kostru, horní a dolní končetinu, lebku, nemoci a anatomická upřesnění, slovníček a závěrečné opakování se zdroji. Vychází z prezentace 1–63 a výslovně odlišuje anatomická upřesnění. První stránka byla vyrenderována Popplerem a vizuálně ověřena: text je čitelný, bez zjevného ořezu či překrytí. Původní PDF nebylo upraveno.
