# Audit a integrace Law

## Původ

- Zdroj: https://github.com/hphugosm/us-law-casebook
- Převzatý commit: `0578fa83fe3100d82316b76e34dd6fa1908caa90`.
- Původní repozitář nebyl měněn. Jeho pracovní kopie byla pouze čtena.
- Prozkoumány všechny soubory repozitáře: `index.html`, `app.js`, `practice.js`, oba styly, všechny tři datové moduly, README a inventář přiložených materiálů. Repozitář nemá automatické testy ani package manifest.

## Obsah

- 4 případové studie: Plessy (1896), Gobitis (1940), Barnette (1943), Brown (1954).
- 2 lekce: hierarchie amerických soudů a proces odvolání. Interaktivně propojené poznámky k případům, schéma státních/federálních soudů, označení doplněných faktů a oprav.
- 55 termínů: anglická definice, český překlad, příklad a zdroj; hledání bez závislosti na diakritice, filtry kategorií.
- 95 otázek: 50 výběrových, 20 pravda/nepravda, 20 psaných odpovědí, 5 řazení.
- 55 dalších slovníkových promptů; matching anglických definic; smíšený test; výběr tématu a délky; opakování pouze chyb.
- 145 flashcards (90 otázek mimo řazení + 55 termínů), otočení, známé/neznámé karty, filtr, náhodné pořadí a klávesové ovládání.
- Okamžité vysvětlení odpovědí, výsledky, opakování chybných odpovědí, ukončení rozběhnutého testu, posledních 100 pokusů.
- 28 zdrojových záznamů: osm dodaných výukových materiálů je popsáno, jejich originály ale původní repozitář neobsahuje. Tyto soubory proto nepředstíráme jako dostupné.
- Oba skutečně přiložené PDF jsou zachovány beze změny: `US_Law_Expanded_English_Study_Notes.pdf` (původní aplikace jej popisuje jako osmistránkový) a `Pravo_USA_barevne_poznamky.pdf` (popisován jako čtyřstránkový).
- Původní repo neobsahuje výukové obrázky kromě faviconu; schéma soudů je HTML/CSS, ikony jsou inline SVG.
- V názvech souborů ani textových datech není výslovný oficiální název UNIT 2. Použit pracovní název „U.S. Courts & Civil Liberties“ dle zadání; neoznačuje se jako ověřený oficiální název.

## Integrace

`modules/law/index.js` exportuje `async mount(container, options)` a `getProgress()`. `mount` vrátí úklidovou funkci. Volba `mode` otevře `learn`, `flashcards`, `practice`, `vocabulary`, `resources` nebo `overview`; `route` přijímá původní interní cestu, například `learn/brown` či `practice?review=1`. Callback `onProgress` dostává aktuální uložený postup. Modul rovněž vysílá `study:progress`.

Všechny původní renderovací funkce a data zůstaly zachovány. Samostatný sidebar původního webu nahradil horizontální navigační pruh uvnitř společné stránky jednotky. Původní CSS je uzavřeno v Shadow DOM a minimalisticky upraveno samostatným integračním stylem; nikdy nezasahuje do kalendáře nebo biologie. Moduly mají ES module scope. Přepínání poznámek a nástrojů používá lokální router, nikoli globální `location.hash`. Sdílený shell si ponechává vlastnictví URL a titulku.

Odkazy k PDF se převádějí přes `new URL(..., import.meta.url)`, takže fungují také pod podcestou GitHub Pages. Veškeré interní odkazy jsou zachyceny uvnitř Shadow DOM. Klávesový posluchač flashcards je připojen pouze na shadow root a při odpojení se odstraní. Obdobně se odpojí MutationObserver, posluchače procvičování a toast timer.

## Uložený postup a kompatibilita

Původní klíč: `casebook-us-law-progress-v1`.

Nový klíč: `study:law:progress:v1`.

Při prvním otevření, pokud nový klíč chybí a legacy klíč na stejném originu existuje, se hodnoty zkopírují. Dále se zapisuje výhradně nový klíč. Původní klíč se nemaže ani nepřepisuje. Pole jsou kontrolována, aby neplatná uložená data nesvrhla obrazovku. Zákaz localStorage nebrání studiu; postup zůstane pro návštěvu v paměti a původní toast upozorní na nedostupnost zápisu.

localStorage je omezeno originem: postup z `hphugosm.github.io/us-law-casebook/` lze číst na jiném GitHub Pages projektu téhož originu, nikoli na novém odlišném hostiteli nebo z lokálního preview. Žádná automatická migrace mezi doménami se netvrdí.

## Kontroly

Import všech datových i integračních ES modulů prošel v Node. Ověřeny počty a struktura otázek, slovíček, unikátní identifikátory a existence obou PDF. Původní datové moduly a PDF jsou identické s upstream soubory. Funkční prohlížečové kontroly celé integrované aplikace jsou prováděny v rámci společného testování projektu.

Dodatečná integrační revize: interní přechody přesunou fokus na obsah, navigační položky mají nejméně 44px výšku, poznámky používají čitelnou sans typografii 14–15px. Šipky na fokusované flashcard přepínají kartu a zachovají fokus; Enter a mezerník ponechávají nativní aktivaci tlačítka. Posluchač je pouze ve Shadow DOM. Neúspěšný zápis při migraci nevymaže již načtený legacy postup z paměti.

Opakovatelná kontrola modulu: `node modules/law/check.mjs` z kořene projektu. Ověřuje datové invarianty, hlavičky a přítomnost PDF, čtení legacy dat, preferenci nového klíče a odolnost vůči chybným uloženým hodnotám. Kontrola prošla.

## Dodatečné ověření PDF (4. 11. 2026)

Text všech stran a metadata byla přečtena pomocí pypdf; první stránky obou PDF byly také vyrenderovány Popplerem a vizuálně zkontrolovány. Anglické `US_Law_Expanded_English_Study_Notes.pdf` má 8 stran: základy práva, Plessy/Brown, Gobitis/Barnette, soudní soustavy, odvolání, slovní zásobu, použití pojmů a zdroje/opravné poznámky. České `Pravo_USA_barevne_poznamky.pdf` má 4 strany: případy, soudy/odvolání, slovní zásobu a původ informací. Ani metadata, ani text dokumentů neobsahují oficiální název „Unit 2“. Pracovní označení „U.S. Courts & Civil Liberties“ je proto oprávněné. Originální PDF zůstávají beze změn; první stránky se zobrazují čitelně bez zjevného ořezu či překrytí.
