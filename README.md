# study.

Minimalistická studijní aplikace: školní kalendář, Law a Biologie ve společném prostředí. Statický web bez backendu, přihlášení a runtime závislostí. Původní repozitáře zůstaly beze změn.

- **Demo:** https://hphugosm.github.io/study/
- **Repozitář:** https://github.com/hphugosm/study
- **Biologie:** https://hphugosm.github.io/study/#/events/biology-test
- **Law Unit 2:** https://hphugosm.github.io/study/#/events/law-test

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

Pro browser testy:

```sh
npm install
npx playwright install chromium
# V druhém terminálu běží npm start
npm run test:e2e
# Volitelně proti veřejnému webu:
STUDY_TEST_URL=https://hphugosm.github.io/study/ npm run test:e2e
```

## Co aplikace obsahuje

- Datový kalendář s přepínáním měsíců, dneškem, více událostmi denně, detailem dne, typy událostí a nejbližšími termíny. Aktuální datum používá časové pásmo Europe/Prague.
- **Biologie:** všech 64 položek, atlas a filtry, poznávačka, obrázkové/textové kartičky, slepá mapa (pojmenované i nepojmenované režimy), detail/zoom, řešení, opakování chyb, výpisky, původní PDF a uložený postup. Nově se ukládají i výsledky mapy.
- **Law / UNIT 2 / U.S. Courts & Civil Liberties:** čtyři případy, hierarchie soudů a odvolání, 55 slovíček, 145 flashcards, 95 otázek, mixed a tematické testy, výběr odpovědi, true/false, psané odpovědi, řazení, spojování, vysvětlení, výsledky, oprava chyb, postup a oba PDF. Obsah zůstává anglicky.
- Matematika a Literatura mají skutečné termíny a připravené jednotky; chybějící výukové materiály jsou výslovně označené.

Law repozitář neobsahuje oficiální název Unit 2. Název zde je pracovní. Jeho osm původních vstupních učebních souborů je pouze citováno ve zdrojové aplikaci; převzaty jsou všechny skutečně dostupné soubory, včetně dvou PDF. Podrobnosti: [audit Law](docs/law-audit.md), [audit Biologie](docs/biology-audit.md), [ověření](docs/verification.md).

## Struktura

```text
src/data.js             Subject, Study Unit, Event a registr modulů
src/app.js              společná navigace, kalendář, jednotky, materiály, postup
src/calendar.js         datumové funkce a tvorba měsíce
styles.css              společný minimalistický vzhled
modules/law/            izolovaný úplný Law modul, data, PDF
modules/biology/        izolovaný úplný biology modul, obrázky, PDF, upstream testy
templates/              příklad přidání předmětu / jednotky / testu
scripts/                lokální server, validace, statický build
tests/                  kalendářové a browser testy
docs/                   audity, architektura, návod a výsledky kontrol
.github/workflows/      automatické nasazení na GitHub Pages
```

Přidání předmětu a testu je popsáno v [návodu k rozšíření](docs/extension.md). Architektura a kompatibilita postupu v [architektuře](docs/architecture.md).

## Ukládání postupu

Law používá `study:law:progress:v1`; Biologie prefix `study:biology:`. Při prvním použití se čtou a kopírují rozpoznané původní klíče ze stejného originu. Původní klíče se nikdy nepřepisují ani nemažou. localStorage se mezi doménami ani zařízeními automaticky nepřenáší; více GitHub Pages projektů pod `hphugosm.github.io` origin sdílí. Při blokovaném úložišti je možné studovat, výsledky však nemusí přežít zavření stránky.

Zdrojové aplikace: [us-law-casebook](https://github.com/hphugosm/us-law-casebook), [kostra-procvicovani](https://github.com/hphugosm/kostra-procvicovani). Úplné dostupné materiály a jejich označení původu jsou zachované.
