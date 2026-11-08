# study lo

Studijní aplikace se školním kalendářem, jedenácti aktuálními předměty JU3 a zachovanými původními moduly. Statický web bez backendu, přihlášení a placeného AI API při používání nebo denní synchronizaci.

[Novinky ze školy](modules/moodle-sync/index.html) zobrazují 125 schválených položek se 123 různými soubory v Releases. Synchronizační klient, přihlašovací údaje i neveřejné přehledy patří do odděleného soukromého repozitáře; zde jsou pouze veřejně schválené výstupy. Nové původní přílohy se nestahují automaticky do offline balíčku.

[Předměty](https://studilo.xyz/#/subjects) obsahují všech 184 běžných témat ve skutečném pořadí školních kurzů. Pro 42 témat s dostupnými schválenými podklady vzniklo 189 výukových oddílů, 260 kartiček, 273 vysvětlených otázek a 73 vybraných ilustrací. Součástí jsou postupy krok za krokem, porovnávání, časové osy, ovladatelný lom světla a kontrola parity. Témata bez podkladů mají vlastní místo s pravdivým stavem. Původní atlas, právní modul i matematické nástroje zůstávají dostupné.

[Veřejný katalog podkladů](modules/moodle-sync/data/catalog.json) odděluje původní zdroje v `sources/` a výpisky s přesnými referencemi v `derived/`. Pro všech 123 souborů jsou připravené úplné texty a stahovatelné textové/obrazové balíčky. [Výukové poznámky a jejich příprava](docs/course-notes.md), [kontrakt katalogu](docs/moodle-source-catalog.md).

[Stereometrie](https://studilo.xyz/#/units/moodle-mathematics-19b4bf717ba5fb504c592cbdd891923b) má sedm ovladatelných těles: rozměry mění náčrt i dosazení do barevného vzorce. Přepínání povrchu a objemu, rozklad na podstavy a plášť a společné měřítko pomáhají vztahy pochopit. Kartičky ve všech předmětech mají kompaktní téměř čtvercový tvar, větší písmo a symbol pro otočení; původní postup zůstává zachovaný.

- **Demo:** https://studilo.xyz/
- **Repozitář:** https://github.com/hphugosm/study
- **Biologie:** https://studilo.xyz/#/events/biology-test
- **Matematika:** https://studilo.xyz/#/subjects/mathematics
- **Law Unit 2:** https://studilo.xyz/#/events/law-test

Rozhraní je přizpůsobené především iPhonu: stálá horní lišta se šipkami zpět/vpřed, hlavní navigace dole, dotykové cíle 44–48 px, čitelné vstupy bez automatického přibližování a rezervy pro výřez i spodní indikátor. Předmět má vlastní přehled témat: návrat z Kosterní soustavy vede na Biologii a potom do kalendáře. Platí to i pro přímé odkazy; historie funguje i po obnovení stránky.

V patičce najdeš **Nastavení**: instalaci na plochu iPhonu, skutečný offline režim, světlý/tmavý/papírový motiv nebo vzhled podle telefonu, čtyři barevné akcenty, větší studijní text a zálohu postupu s bezpečným importem. Tyto volby se promítají i do všech studijních modulů. Hlavní navigace zůstává jednoduchá.

## Na ploše iPhonu a bez internetu

Otevři [Nastavení](https://studilo.xyz/#/settings) a zvol **Přidat na plochu**. V Safari použij **Sdílet → Přidat na plochu** a případně ponech zapnuté **Otevřít jako webovou aplikaci**. Ikona study lo potom otevírá vlastní okno aplikace.

Po prvním otevření s připojením se automaticky uloží rozhraní, výpisky a procvičování včetně původních obrázků atlasu, starších PDF a tří matematických prezentací. V nastavení počkej na **Připraveno offline**. Nové původní Moodle přílohy, nové obrázky z Releases, úplné přepisy a ZIP balíčky vyžadují připojení; stovky MB podkladů se automaticky nestahují. Po přidání na plochu ověř stav přímo v nově otevřené aplikaci. Nová verze se připraví na pozadí a v kalendáři se sama načte s krátkou informační hláškou. Rozehrané procvičování zůstane zachované; přepnutí počká na návrat do kalendáře i v ostatních otevřených panelech. Shodné ověřené podklady se při aktualizaci nestahují znovu.

Podrobnosti, aktualizace a provozní omezení jsou v [návodu k PWA](docs/pwa.md). Zálohy a nastavení jsou místní, bez účtu a cloudového přenosu.

## Spuštění

Node.js 22 nebo novější:

```sh
npm start
```

Otevři **http://127.0.0.1:4173**. Žádná instalace není nutná pro běh ani sestavení.

```sh
npm run check
npm test
npm run build
node scripts/serve.mjs --dist
```

Výstup `dist/` lze nasadit na libovolný statický hosting i do podadresáře. Hash routing umožňuje přímé odkazy bez serverových přepisů. GitHub Actions automaticky sestavuje a publikuje `main` na GitHub Pages.

Vlastní doména je `studilo.xyz`; `www.studilo.xyz` i původní odkaz GitHub Pages vedou na ni. DNS a postup kontroly HTTPS jsou v [návodu k nasazení](docs/deployment.md).

Plný offline režim lokálně testuj ze sestaveného `dist/` pomocí `node scripts/serve.mjs --dist`. Zdrojový server bez sestavení nemá vygenerovaný offline balíček; běžné studijní funkce fungují i tam.

Pro browser testy:

```sh
npm install
npx playwright install chromium
# V druhém terminálu běží npm start
npm run test:e2e
# Volitelně proti veřejnému webu:
STUDY_TEST_URL=https://studilo.xyz/ npm run test:e2e
```

## Pracovní listy z goniometrie

V obou matematických kategoriích je záložka **Pracovní list**. Každý ze 164 příkladů je tlačítko: otevře velké okno se zadáním, šipky procházejí jednotlivé vysvětlené kroky a nakonec výsledek. Fungují také klávesy ←/→ a Escape. Příklady leží přímo na podobě původních stránek PDF, se stejnými nadpisy, sloupci i označením. Hledání je vyznačí na stránce; výběr úlohy přesune na její původní místo. Na mobilu lze list přibližovat dvěma prsty a posouvat jedním prstem. Tlačítka ± zachovávají místo uprostřed pohledu; přizpůsobení šířce vrací přehled celé stránky. Tažení ani přiblížení neotevírá příklad a zavření řešení zachová polohu listu.

- [Funkce — 60 příkladů](https://studilo.xyz/#/units/trig-functions?mode=worksheets)
- [Rovnice a nerovnice — 104 příkladů](https://studilo.xyz/#/units/trig-equations?mode=worksheets)

Zadání vycházejí ze dvou původních PDF a postupy z dodaného souboru 164 řešení. Opravy jsou vedené podle PDF; u úlohy GR7-37 je opraven jmenovatel sin(2x), definiční obor i postup. U grafů A/B/C označuje sloupce listu. Originály PDF jsou v Materiálech i přímo u seznamu příkladů. Vzorce, grafy i PDF fungují offline; sazba KaTeX 0.19.1 je přibalená včetně licence a fontů.

## Co aplikace obsahuje

- Datový kalendář s přepínáním měsíců, dneškem, více událostmi denně, detailem dne, typy událostí a nejbližšími termíny. Aktuální datum používá časové pásmo Europe/Prague.
- **Biologie:** všech 64 položek, atlas a filtry, poznávačka, obrázkové/textové kartičky, slepá mapa (pojmenované i nepojmenované režimy), detail/zoom, řešení, opakování chyb, výpisky, původní PDF a uložený postup. Nově se ukládají i výsledky mapy.
- **Svalová soustava:** samostatná hlavní biologická kategorie ve stejném způsobu učení jako kosterní atlas. 18 svalů a skupin, 16 ověřených obrazových cílů, poznávačka, mapa podle názvu i předlohy, kartičky, výpisky, zvětšení a opakování chyb. [Rozsah a kontrola podkladů](docs/biology-muscles.md).
- **Law / UNIT 2 / U.S. Courts & Civil Liberties:** čtyři případy, hierarchie soudů a odvolání, 55 slovíček, 145 flashcards, 95 otázek, mixed a tematické testy, výběr odpovědi, true/false, psané odpovědi, řazení, spojování, vysvětlení, výsledky, oprava chyb, postup a oba PDF. Obsah zůstává anglicky.
- **Matematika:** dvě původní interaktivní kategorie zůstávají zachované: Trigonometrie a goniometrické funkce; Goniometrické vzorce, rovnice a nerovnice. Český obsah z 81 snímků, ovladatelná kružnice, proměny grafů, trojúhelníkové věty, postupná řešení, nerovnice, kartičky a kvízy. Vedle nich jsou skutečná témata aktuálního kurzu. Původní termín čtvrtletní práce otevírá rozcestník obou původních kategorií. Přesný rozsah práce není zadán.
- Literatura má skutečný termín a připravenou jednotku; chybějící podklady jsou označené.
- **Dějepis / Baroko:** test 9. listopadu 2026 je propojený s dodaným devítistránkovým obrazovým atlasem. Výpisky s odkazy na strany pokrývají znaky baroka, 5 náboženských a 5 světských staveb, malířství, sochařství a hudbu. Původní PDF včetně fotografií a licencí je dostupné přímo u výpisků i v Materiálech a je součástí offline balíčku.

Law repozitář neobsahuje oficiální název Unit 2. Název zde je pracovní. Jeho osm původních vstupních učebních souborů je pouze citováno ve zdrojové aplikaci; převzaty jsou všechny skutečně dostupné soubory, včetně dvou PDF. Matematické podklady a opravy: [audit Matematiky](docs/mathematics.md).

Podrobnosti: [audit Law](docs/law-audit.md), [audit Biologie](docs/biology-audit.md), [ověření](docs/verification.md).

Při dalším rozšiřování jsou závazným vzorem původní moduly a [pravidla projektu](AGENTS.md). Matematika zachovává první dvě původní kategorie; související školní výpisky se otevírají uvnitř nich jako doplněk. Stereometrie je viditelná samostatně jako třetí hlavní kategorie. Úplná osnova kurzu zůstává ve vedlejším rozbalovacím přehledu, bez odsunutí původních cvičení nebo skrytí Stereometrie.

Biologické výpisky, slovníček (28 pojmů) a jejich PDF byly zkontrolovány
výhradně podle původní 63snímkové prezentace. U obsahu jsou čísla snímků;
prezentace je také dostupná v Materiálech. Atlas a poznávačka zůstaly beze
změn. Podrobnosti: [kontrola výpisků](docs/biology-notes-audit.md).

## Struktura

```text
src/data.js             Subject, Study Unit, Event a registr modulů
src/app.js              společná navigace, kalendář, jednotky, materiály, postup
src/calendar.js         datumové funkce a tvorba měsíce
src/settings.js         nenápadné nastavení, návod instalace, offline stav a zálohy
src/preferences.js      bezpečně uložený vzhled a reakce na režim telefonu
src/backup.js           validace a sloučení místních záloh postupu
src/pwa.js              stav offline režimu, instalace a explicitní aktualizace
styles.css              společný minimalistický vzhled
themes.css/settings.css barevné motivy a nastavení
sw.js/manifest.webmanifest samostatná aplikace a ověřené offline podklady
modules/law/            izolovaný úplný Law modul, data, PDF
modules/biology/        izolovaný úplný biology modul, obrázky, PDF, upstream testy
modules/math-trig/      kružnice, grafy, trojúhelníky, zdrojové prezentace
modules/math-equations/ vzorce, rovnice, nerovnice, zdrojová prezentace
modules/course-notes/   společný výklad, kartičky, otázky a interaktivní vysvětlení
src/course-catalog.js   generovaný registr skutečných témat a dostupných výpisků
templates/              příklad přidání předmětu / jednotky / testu
scripts/                lokální server, validace, statický build
tests/                  kalendářové a browser testy
docs/                   audity, architektura, návod a výsledky kontrol
.github/workflows/      automatické nasazení na GitHub Pages
```

Přidání předmětu a testu je popsáno v [návodu k rozšíření](docs/extension.md). Architektura a kompatibilita postupu v [architektuře](docs/architecture.md).

## Ukládání postupu

Law používá `study:law:progress:v1`; Biologie prefix `study:biology:`. Při prvním použití se čtou a kopírují rozpoznané původní klíče ze stejného originu. Původní klíče se nikdy nepřepisují ani nemažou. localStorage se mezi doménami ani zařízeními automaticky nepřenáší; více GitHub Pages projektů pod `hphugosm.github.io` origin sdílí. Při blokovaném úložišti je možné studovat, výsledky však nemusí přežít zavření stránky.

V nastavení lze stáhnout JSON zálohu postupu Law, Biologie a obou matematických jednotek, také pro přenos mezi doménami. Import nejprve ověří formát a ukáže počty záznamů; teprve po potvrzení sloučí kartičky a výsledky. Neznámé klíče se odmítnou, starší data se nemažou a rozpracovaná mapa se nepřepisuje. Vzhled používá samostatný klíč `study:preferences:v1`.

Nové kurzové výpisky používají oddělený klíč `study:course-notes:<předmět>:<téma>:v1`. Postup je místní pro konkrétní téma; stávající export záloh je zatím určen pouze původním modulům uvedeným výše.

Zdrojové aplikace: [us-law-casebook](https://github.com/hphugosm/us-law-casebook), [kostra-procvicovani](https://github.com/hphugosm/kostra-procvicovani). Úplné dostupné materiály a jejich označení původu jsou zachované.

Nové schválené školní přílohy používají GitHub Releases a tematické `sources/index.json`; nepřidávají se jako další binární historie tohoto repozitáře. Původní již veřejné soubory zůstávají beze změn.
