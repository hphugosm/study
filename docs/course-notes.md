# Výpisky z původních školních materiálů

Aktualizováno 10. 11. 2026. Všech 11 vybraných předmětů JU3 má na webu místo pro skutečná témata Moodlu. Dvě varianty Zeměpisu zůstávají oddělené uvnitř společného předmětu, pořadí se nepřerovnává podle abecedy. Starší Literatura, Dějepis a původní interaktivní moduly zůstaly zachované.

| Obsah | Počet |
| --- | ---: |
| Běžná aktuální témata | 184 |
| Témata s podklady a připravenými výpisky | 42 |
| Původní schválené položky / různé soubory | 125 / 123 |
| Výukové oddíly | 190 |
| Kartičky | 263 |
| Otázky s odpovědí a vysvětlením | 277 |
| Vybrané obrázky ve výkladu | 73 |
| Kroky vysvětlení | 205 |
| Ovladatelné modely | 3 |

Členění je v běžné navigaci Předměty → předmět → téma. Lze hledat název tématu; dostupnost podkladů a výpisků je uvedená přímo na kartě. Otevřené úlohy, prázdné šablony a historická klasifikační pravidla nevydáváme za vyřešenou odbornou přednášku. Témata bez zdrojů neobsahují vymyšlené výpisky.

## Od původních souborů k výuce

Úplná lokální extrakce pokryla přesné SHA-256 všech 123 schválených souborů, 2 377 strukturovaných stran/snímků/bloků a 2 824 médií včetně celostránkových náhledů. Nativní text zůstává odlišený od OCR; 374 jednotek má dodatečný automatický přepis, který může chybovat. Textový blok DOCX není totéž co fyzická stránka. Originály nebyly měněné.

Samostatní redakční agenti připravili členěné výklady, obrázky, vysvětlení a otázky. Jiní agenti ověřili všech 277 odpovědí i citované podklady; nalezené nepřesnosti a nejednoznačné možnosti byly opravené. Každý oddíl, tvrzení, obrázek a otázka odkazují na konkrétní veřejné ID, SHA a dostupnou stranu/snímek či textový oddíl. Pochybné původní údaje, historická pravidla a rozpory nejsou potichu změněné na bezpodmínečná fakta. Změna školy nebo právního stavu se nepředpokládá z letitého pracovního listu.

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

[Release s texty a obrázky](https://github.com/hphugosm/study/releases/tag/studylo-learning-v1) má 125 ZIP balíčků, 73 vybraných WebP obrázků a čtyři soubory vzorového řešení, celkem 304 635 203 B. Název ZIPu označuje původní zdrojový SHA; jeho vlastní přesný otisk je v `learning-assets.json` a v GitHub digestu. Jméno WebP odpovídá přímo SHA obrazových bajtů. Binární soubory nejsou v Git historii.

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

`npm run check` kontroluje všech 42 výkladů, příslušnost zdrojů, citace, balíčky, obrazové reference a úplnost 125 přepisů. Testy ověřují i jednoznačnost konkrétní otázky s periodickým posunem grafu, zachování původních modulů a bezpečnost URL. Čisté funkce modelů testují Snellův zákon, úplný odraz, neplatné vstupy i sudou/lichou paritu.

Denní synchronizace načítá změny podkladů a ukládá nové verze ke kontrole; sama negeneruje nové poznámky ani neaktualizuje jejich odpovědi. Změna zdrojové verze vyžaduje nové schválení a redakční kontrolu výkladu. Kontrola přesných referencí odmítne nesoulad; staré poznámky se nepřevážou potichu na nové bajty.

Na denní synchronizaci může navázat samostatný místní plánovaný úkol Codexu, který připraví obsah a nechá jej nezávisle zkontrolovat. AI neběží uvnitř Actions. Nově schválené téma může před dokončením výpisků zůstat pouze se zdroji; nesmí se vydávat za hotovou lekci. U již zpracovaného tématu nová nebo změněná příloha vyžaduje aktualizaci přesných referencí a odpovídajícího výkladu v téže změně. Publikované texty a ZIPy tvoří shodnou schválenou sadu a každý zdroj použitý v hotové lekci musí mít úplnou extrakci.

## Používání a offline režim

Studium obsahuje výklad, barevná upozornění, obrázky se zvětšením, kroky a porovnávání. Procvičování nabízí kartičky a vysvětlené odpovědi. Ve Fyzice lze měnit indexy a úhel dopadu v jednoduchém izotropním modelu; v Informatice měnit bity a sudou/lichou paritu. Modely vysvětlují uvedený vztah a jeho podmínky, nepočítají nevyznačené jevy, například Fresnelovy intenzity.

Výklady a kvízy jsou součástí malého offline balíčku společně s původními moduly. Nové obrazy, původní Moodle přílohy, úplné přepisy a ZIPy vyžadují připojení; 304 MB se při otevření aplikace nestahuje. Nový studijní postup se ukládá místně po tématech v odděleném jmenném prostoru. Původní zálohy a postup nebyly přepsané; stávající export zálohy zatím pokrývá původní moduly.

## Barevné rastry (10. 11. 2026)

Informatika v tématu Kódování informace a komprese nabízí dva původní rastry 50 × 50 buněk: výběr pixelu, přesnou souřadnici listu, HEX a RGB, zvětšení a oddělené míchání vlastní barvy. Matice pocházejí z úplných přepisů dvou samostatně zkontrolovaných studijních kopií XLSX. Kopie zachovávají hodnoty a styly buněk; identifikační metadata byla odstraněna. Obě mají vlastní SHA, veřejný zdrojový záznam `source_kind:manual`, úplný přepis a ZIP. Pozastavené originály tím nebyly schváleny. Denní import ruční zdroje zachovává.

Validace připouští jen schválené ruční zdroje stejného tématu s přesným ID, SHA a URL; rovněž pro ně vyžaduje úplný přepis a ZIP. Test porovnává všech 5 000 barev s nezávisle extrahovaným textem listů. Ruční workflow Verify live Studilo má volbu `pixels` pro cílené ověření veřejného webu v počítačovém a mobilním Chromiu a ve WebKitu.

### Vzorové řešení úkolu s maticí

Po doplnění skutečného zadání jsou v lekci Rekonstrukce obrázku z matice HEX k dispozici dva vybarvené XLSX a dvě PNG 50 × 50. Všech 5 000 výplní odpovídá HEX ve stejné zdrojové buňce; pozice, hodnoty a palety zůstaly zachované. Barva písma odpovídá výplni pro čisté zobrazení obrázku, HEX lze přečíst po označení buňky v řádku vzorců. Výsledné soubory prošly nezávislou kontrolou všech buněk, pixelů a soukromých metadat. Postup vybarvení používá standardní [Barvu výplně v Excelu](https://support.microsoft.com/en-gb/excel/add-or-change-the-background-color-of-cells-in-excel?nochrome=true).

`lesson.solutions` a druh assetu `solution` uchovávají přesné otisky výsledků a odkazy na schválené zdroje. Nejde o nové originální podklady. Validace vyžaduje shodu velikosti, formátu, PNG rozměrů a provenience s manifestem; nepřipustí cizí adresu ani osiřelý výsledek. Příprava zachovává již schválená řešení a odmítne nesoulad před zápisem. Úplná příprava nad syrovým Moodle feedem dosud nepřijímá ručně schválené kopie; u těch se zachovává přírůstkový postup s kontrolou přesných zdrojů, derivátů a celé extrakce.

## Krátký přehled a rozbalovací podtémata (11. 11. 2026)

Všech 190 lekcí ve 42 tématech má věrný stručný `summary` nejvýše 220 znaků. Čtenář nejprve vidí titul a popis; podrobnosti otevře myší, dotykem, Enterem nebo mezerníkem. Rozbalit vše a Sbalit vše umožňují původní souvislé čtení. Obrázky a interaktivní pomůcky se vytvoří až při prvním otevření a opětovné rozbalení zachová nastavení. Otevření samo neoznačuje lekci jako přečtenou.

Stejné členění používá 11 výpiskových částí kosterní soustavy, tři svalové části, 35 podkapitol původního práva a delší výklady původních matematických modulů. Atlas, poznávačky, mapy, krátké vzorce, živé výpočty a všech 164 matematických pracovních příkladů zůstávají přístupné v dosavadních kategoriích. Vyhledání v kosterních poznámkách otevře odpovídající části, aby se nalezený detail neschoval. Stručný slovníček a jednostránkové atlasové detaily již mají vlastní přehledné zobrazení. Barokní kartičky si ponechávají původní postup po jedné kartě.

Pravidlo pro další obsah je v AGENTS.md. Nové domácí úkoly mají po získání úplného zadání nabídnout kompletní vysvětlené vzorové řešení a hotové soubory, jaké zadání požaduje. Stávající zdrojové verze a ověřené odpovědi byly při této úpravě zachovány; změnilo se členění a stručné orientační popisy.
