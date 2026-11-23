# Španělština · Nueva aventura 2 · Unidad 2 – De tiendas

V existujícím Studilu: **Předměty → Španělština → Unidad 2 – De tiendas** (`#/units/spanish-de-tiendas`). Deset sekcí má přímé adresy přes `?mode=overview|grammar|vocabulary|cards|imperative|pronouns|numbers|writing|exam|stats`. Modul také navazuje na společné Procvičování; původní nástroje zůstaly v původním pořadí.

## Podklady a rozsah

PDF **Nueva Aventura 2.pdf** nebylo v dostupném pracovním prostoru ani připojených přílohách nalezeno. Obsah vychází z přesného uživatelského zadání, nikoli z ověřených tištěných stran 25–36 a 163–169. Všech 80 uvedených výrazů je označeno jako základ lekce **podle zadání**, bez tvrzení, že jde o ověřenou učebnicovou sadu. Texty, příklady, modely a otázky jsou vlastní; učebnice se nepřerozděluje. Modelová písemka nepředpovídá skutečné učitelské otázky.

Pravidla byla nezávisle zkontrolována s primárními zdroji RAE/ASALE:

- [Modo imperativo](https://temporalweb.asale.org/gtg/modo-imperativo): kladné a záporné rozkazy, osoby a postavení zájmen.
- [Formas verbales con pronombres clíticos](https://temporalweb.asale.org/ortograf%C3%ADa/formas-verbales-con-pronombres-cl%C3%ADticos): připojování zájmen a psané přízvuky.
- [Microondas](https://temporalweb.asale.org/diccionario-estudiante/microondas): příklad rodu a neměnného tvaru slova.

Nezávislá kontrola pokryla všech 80 výrazů, devět gramatických podtémat, tři vzorové texty, všech 17 základních slovesných paradigmat a jejich tři zvratné varianty. Rozšiřující le/les → se je výslovně označeno. Číslovky jsou samostatné základní tvary; shoda před podstatným jménem je vysvětlena zvlášť.

## Architektura

- `modules/spanish-shopping/content.js`: osm obchodů × deset slov, příklady, gramatika a tři zadání psaní.
- `engine.js`: testovatelné rozkazy, přízvuky, přesné odpovědi, diagnostika chyb a číslovky. 522 kombinací ve smíšeném režimu, 120 základních rozkazů, 402 rozkazů se zájmeny; transformační režimy dávají stejné tvary v jiných zadáních. 44 zájmenných zadání a 75 číslovek. Počty režimů nejsou součtem různých gramatických tvarů.
- `progress.js`: lokální stav, rozložené opakování, slabá místa, čas a výsledky písemky.
- `index.js`, `style.css`: modul ve stávajícím Shadow DOM kontraktu `mount`/cleanup, existující barevné tokeny, světlý/tmavý režim a větší písmo. Kartičky mají vlastní nutný stav tří hodnocení a používají stejný kompaktní tvar a jeden symbol otočení jako původní moduly.
- `src/data.js`, `src/subject-layout.js`, `src/app.js`: registrace předmětu a jednotky. Původní Moodle katalog se nemění; místní obsah má `origin: editorial`. Kontroly katalogu dál vyžadují všechny původní podklady. Španělština není školní synchronizační kurz ani příjemce školních push notifikací.

Písemka obsahuje 80 překladových zadání, aktuální smíšenou gramatickou banku, zájmena a samostatně vyvážené parecer, číslovky a krátké komunikační věty. Výběr je při každém spuštění nový. Neexistují průběžné nápovědy; až odevzdání nebo konec času otevře řešení a rozpad podle témat. Delší text je samostatný trénink s vlastní kontrolou bodů a délky, nikoli automatická jazyková známka.

## Ukládání a omezení

Klíč `study:spanish-shopping:v1` v localStorage uchovává aktuální sadu a pozici kartiček, filtry a směr, hodnocení karet, termíny opakování, posledních 500 pokusů, koncepty tří textů, rozepsanou písemku s původním časovým koncem a poslední výsledek. Neumím = znovu hned, váhám = za 10 minut, umím = za den, následné úspěchy interval zdvojnásobují nejvýše na 30 dní. Změna směru nemění identitu slova. Slabá zadání mají v dalších kolech přednost; žádné podobné nesprávné odpovědi nejsou přijímány fuzzy porovnáním.

Data se neposílají na server a automaticky se nepřenášejí mezi zařízeními. Poškozený stav se bezpečně zahodí, ostatní ověřitelný pokrok zůstane. Při odmítnutém úložišti lze pokračovat v paměti a UI upozorní, že se stav neukládá. Žádné placené AI API, externí překladová služba ani další backend. Vzorové texty nejsou osobními zkušenostmi uživatele a nic se neodevzdává do Moodlu.

## Ověření

`npm run check`, `npm test`, `npm run build`; cílené `tests/spanish-{engine,content,progress,review}.test.cjs`. Prohlížeč: `tests/spanish-shopping.spec.mjs`, desktop a mobilní Chromium. Scénáře procházejí navigaci všech deseti sekcí, všechny 80 kartičky, výběr více obchodů, otočení a hodnocení, obnovení stavu, správné/chybné odpovědi, přízvuky v builderu, skládání záporné věty, koncept psaní, úplné odevzdání písemky, obnovení časového limitu, expiraci a poškozené úložiště.

Finální lokální ověření 23. 11. 2026: `check` prošel včetně kalendáře, **251/251 unit testů** a build (`923` offline souborů, `36,9 MiB`). Prohlížečové scénáře: **22 prošlo**, 2 záměrné přeskočení úplného 80karetního průchodu na mobilních projektech, protože tento průchod proběhl na desktopu; mobilní projekty zvlášť ověřují výběr více obchodů, otáčení, hodnocení a obnovu. Chromium desktop, Chromium telefon a WebKit/Safari 320 px. Světlý přehled a tmavá kartička byly také vizuálně prohlédnuty. Písemka vybírá z **724 zadání** (80 slovíček + 522 smíšených rozkazů + 44 zájmen + 75 číslovek + 3 komunikační věty).
