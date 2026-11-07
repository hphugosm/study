# Výpisky z původních školních materiálů

Aktualizováno 7. 11. 2026. Všech 11 vybraných předmětů JU3 má na webu místo pro skutečná témata Moodlu. Dvě varianty Zeměpisu zůstávají oddělené uvnitř společného předmětu, pořadí se nepřerovnává podle abecedy. Starší Literatura, Dějepis a původní interaktivní moduly zůstaly zachované.

| Obsah | Počet |
| --- | ---: |
| Běžná aktuální témata | 184 |
| Témata s podklady a připravenými výpisky | 42 |
| Původní schválené položky / různé soubory | 125 / 123 |
| Výukové oddíly | 189 |
| Kartičky | 260 |
| Otázky s odpovědí a vysvětlením | 273 |
| Vybrané obrázky ve výkladu | 73 |
| Kroky vysvětlení | 200 |
| Ovladatelné modely | 2 |

Členění je v běžné navigaci Předměty → předmět → téma. Lze hledat název tématu; dostupnost podkladů a výpisků je uvedená přímo na kartě. Otevřené úlohy, prázdné šablony a historická klasifikační pravidla nevydáváme za vyřešenou odbornou přednášku. Témata bez zdrojů neobsahují vymyšlené výpisky.

## Od původních souborů k výuce

Úplná lokální extrakce pokryla přesné SHA-256 všech 123 schválených souborů, 2 377 strukturovaných stran/snímků/bloků a 2 824 médií včetně celostránkových náhledů. Nativní text zůstává odlišený od OCR; 374 jednotek má dodatečný automatický přepis, který může chybovat. Textový blok DOCX není totéž co fyzická stránka. Originály nebyly měněné.

Samostatní redakční agenti připravili členěné výklady, obrázky, vysvětlení a otázky. Jiní agenti ověřili všech 273 odpovědí i citované podklady; nalezené nepřesnosti a nejednoznačné možnosti byly opravené. Každý oddíl, tvrzení, obrázek a otázka odkazují na konkrétní veřejné ID, SHA a dostupnou stranu/snímek či textový oddíl. Pochybné původní údaje, historická pravidla a rozpory nejsou potichu změněné na bezpodmínečná fakta. Změna školy nebo právního stavu se nepředpokládá z letitého pracovního listu.

Příprava používá pouze schválené veřejné podklady. Materiály s osobními údaji nebo neúplnou kontrolou zůstaly v soukromé části a do této extrakce nevstupují.

## Umístění dat

```text
modules/course-notes/
  index.js, styles.css, interactions.js
  content/<subject>/<topic>.json
  extracted/<original-sha256>.json
  learning-assets.json
modules/moodle-sync/data/subjects/<subject>/topics/<topic>/
  sources/index.json
  derived/index.json
  derived/course-notes-v1/notes.json
src/course-catalog.js
```

`content` obsahuje hotové výklady, kartičky a kvízy. Tematický `derived` uchovává shodnou kopii a otisk s vazbou na zdroje. `extracted` nabízí úplný text po původních jednotkách, načtený až na žádost. Všechny zobrazené texty se vkládají přes `textContent`, bez generovaného HTML nebo spouštění dokumentového kódu.

[Release s texty a obrázky](https://github.com/hphugosm/study/releases/tag/studylo-learning-v1) má 123 ZIP balíčků a 73 vybraných WebP obrázků, celkem 304 589 729 B. Název ZIPu označuje původní zdrojový SHA; jeho vlastní přesný otisk je v `learning-assets.json` a v GitHub digestu. Jméno WebP odpovídá přímo SHA obrazových bajtů. Binární soubory nejsou v Git historii.

ZIP uchovává úplný text, původní vložené obrazy a optimalizované stránkové náhledy. Jeden nepodporovaný WDP zůstal zachovaný v původních bajtech; není nahrazený vymyšlenou ilustrací. Některé vektorové obrazy používají výslovně označený náhled celé původní strany/snímku. Ručně vybrané ilustrace ve výkladu byly prohlédnuté; automatický import všech obrázků do hotové lekce se nedělá.

## Příprava a validace

Extrakční nástroje běží ručně a místně v soukromém projektu. Nepotřebují Google cookies, nečtou Moodle znovu a nevolají placené AI API. Vstupem jsou pouze originály, veřejný schválený feed a všechny aktuální soukromé kontrolní receipts. Pozastavení kterékoli stejné SHA má přednost před schválením.

Po redakční práci ve `content/` a místní přípravě obrazů:

```sh
python3 scripts/prepare-course-notes.py --prepared /path/to/prepared-assets --extractions /path/to/extraction
node scripts/generate-course-catalog.mjs
npm run check
npm test
npm run build
```

Příprava sváže obrázky s přesnými zdroji, nastaví kanonické odkazy do Releases, ověří úplné pokrytí a vytvoří tematické deriváty. Stagingové cesty `extracted/<sha>/media/...` se do vydané výuky nedostanou. Generátor přidává pouze výpisky s platným obsahem a přesnými zdroji; všechny ostatní existující názvy témat zachová s pravdivým stavem. Publikaci přesných bajtů Release provádí samostatný ruční krok po kontrole digestů, bez přepisování existujících assetů.

`npm run check` kontroluje všech 42 výkladů, příslušnost zdrojů, citace, balíčky, obrazové reference a úplnost 123 přepisů. Testy ověřují i jednoznačnost konkrétní otázky s periodickým posunem grafu, zachování původních modulů a bezpečnost URL. Čisté funkce modelů testují Snellův zákon, úplný odraz, neplatné vstupy i sudou/lichou paritu.

Denní synchronizace načítá změny podkladů a ukládá nové verze ke kontrole; sama negeneruje nové poznámky ani neaktualizuje jejich odpovědi. Změna zdrojové verze vyžaduje nové schválení a redakční kontrolu výkladu. Kontrola přesných referencí odmítne nesoulad; staré poznámky se nepřevážou potichu na nové bajty.

## Používání a offline režim

Studium obsahuje výklad, barevná upozornění, obrázky se zvětšením, kroky a porovnávání. Procvičování nabízí kartičky a vysvětlené odpovědi. Ve Fyzice lze měnit indexy a úhel dopadu v jednoduchém izotropním modelu; v Informatice měnit bity a sudou/lichou paritu. Modely vysvětlují uvedený vztah a jeho podmínky, nepočítají nevyznačené jevy, například Fresnelovy intenzity.

Výklady a kvízy jsou součástí malého offline balíčku společně s původními moduly. Nové obrazy, původní Moodle přílohy, úplné přepisy a ZIPy vyžadují připojení; 304 MB se při otevření aplikace nestahuje. Nový studijní postup se ukládá místně po tématech v odděleném jmenném prostoru. Původní zálohy a postup nebyly přepsané; stávající export zálohy zatím pokrývá původní moduly.
