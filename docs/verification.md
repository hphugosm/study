# Ověření dema Studilo

## Automatické aktualizace — 6. listopadu 2026

Sestavení `b4f684f9de54e24d25e9` prošlo **158 browserovými a HTTP kontrolami,
11 očekávaných přeskočení, 0 chyb** (2,9 minuty). Dále prošlo všech
**45 Node testů**, kontrola 59 JavaScriptových souborů a sestavení.

Nových 15 kontrol ověřuje skutečný přechod dvou úplných snapshotů na
jednom řízeném originu v desktopovém Chromiu, mobilním Chromiu a Safari
WebKitu. Používají skutečné rozhraní, kalendář, Law kvíz a offline balíček:

- Návrat do aplikace bez tlačítka aktualizace sám načte nové datum Law.
- Výsledky, vzhled a nesouvisející cache zůstávají zachované; nová verze
  funguje i po úplném obnovení bez sítě.
- Ověřené shodné PDF se nestahuje znovu. Poškozený soubor v předchozí
  cache se pozná podle SHA-256 a stáhne se znovu.
- Zodpovězená otázka i zpětná vazba přežijí přípravu nové verze. Přepnutí
  se provede až po návratu do kalendáře, také při kvízu v jiném panelu.
  Šipky zpět a vpřed zůstávají funkční i po automatickém obnovení.
- Chyba 503 při stahování nezničí dosavadní snapshot; příští návrat
  automaticky zopakuje pokus.
- Starší klient bez automatického protokolu zůstane zachovaný a přejde
  na novou verzi po stažení a běžném zavření a znovuotevření.

Test více panelů zachytil případ Safari, ve kterém přímé načtení skriptu
vracelo nová data, ale importovaný modul kalendáře stále obsahoval stará.
Sestavení nyní verzovanými URL označuje celý graf JavaScriptových importů
včetně dynamických modulů a styly. Stejný test poté prošel bez zmírnění
ověření nového data v obou panelech.

Samostatně byl v Chromiu i Safari WebKitu ověřen přechod skutečného
původního sestavení `fe262bebe555862555f0` přes jeho dosavadní tlačítko
na novou verzi. Kalendář poté zobrazil Law 19. listopadu a kontrolní
záznam v localStorage zůstal zachovaný.

Řízené rollout testy používají lokální server s produkčními cache hlavičkami;
nepředstírají dvě různé verze na živém veřejném webu. Mobilní Safari je
ověřeno emulací WebKitu, nikoli fyzickou instalací na iPhonu.

## Vlastní doména — 5. listopadu 2026

Nová hlavní adresa je **https://studilo.xyz/**. GitHub Pages má nastavenou
doménu `studilo.xyz` a povinné HTTPS. Certifikát je schválený pro kořen domény
i `www.studilo.xyz` a platí do 3. února 2027.

V 17:25 UTC bylo plnou kontrolou TLS ověřeno HTTPS 200 na všech čtyřech
GitHub Pages IP. `www` přesměruje na hlavní doménu; HTTP i původní
`https://hphugosm.github.io/study/` vrací 301 na `https://studilo.xyz/`.
Kontrola přes `curl --resolve` nahrazovala pouze DNS vyhledání, nikdy
nevypínala ověření certifikátu. Všechny tři autoritativní DNS servery
souhlasí a GitHub hodnotí DNS obou názvů jako platné.

Aktuální sestavení `fe262bebe555862555f0` ze zdrojů `1cc463a` prošlo místně
**141 browserovými a HTTP testy, 11 očekávaných přeskočení, 0 chyb**.
Přeskočení odpovídají sedmi desktopovým běhům mobilních gest, dvěma
volitelným mobilním výstupům a dvěma opakováním úplné kontroly 164 příkladů,
která běží jednou na desktopu. Dále prošlo všech **45 Node testů**
a kontrola JavaScriptu. Offline balíček má 235 souborů (28,1 MiB).

Sada pokrývá aktuální matematiku a 164 pracovních příkladů, mobilní gesta
Safari, biologické výpisky i původní prezentaci, 121 převzatých podkladů,
Law, navigaci, ukládání a první instalaci offline balíčku. Počet podkladů
se odvozuje z registru modulů a materiálů; nová biologická prezentace se
prověřuje i offline jako úplné PDF a požadavek Range 206.

Stejná kompletní sada potom prošla přímo proti **https://studilo.xyz/**:
**141 úspěšných, 11 očekávaně přeskočených, 0 chyb** (5,1 minuty).
[Veřejný běh 42074991833](https://github.com/hphugosm/study/actions/runs/42074991833)
ověřoval commit `59bb4cd` na čistém Ubuntu s Chromiem a Safari WebKitem.
Používal běžné DNS a platné HTTPS, bez přepisování adres ani vypnutí
ověření certifikátu. Offline scénáře začínaly prázdným úložištěm na novém
originu a ověřily i čtyři PDF včetně původní biologické prezentace.

Tuto kontrolu lze znovu spustit v Actions → **Verify live Studilo** →
**Run workflow**. Neprovádí nasazení ani změny společného obsahu; testovací
postup vzniká v oddělených kontextech prohlížeče. HTML report a diagnostika
se uloží jako artifact běhu na 14 dnů.

V **18:17 UTC** bylo potvrzeno i běžné místní otevření s plným ověřením
HTTPS: hlavní adresa, `www` a původní GitHub Pages URL skončily na
`https://studilo.xyz/` s HTTP 200. Nasazený offline balíček má stále shodnou
verzi `fe262bebe555862555f0`. Následná vizuální kontrola v novém okně
prohlížeče potvrdila kalendář na vlastní doméně a obě události 5. listopadu.

Nastavení domény a přenos místního postupu: [návod k nasazení](deployment.md).

## PWA, offline režim a nastavení: lokální a veřejné ověření

Finální sestavení na `http://127.0.0.1:4181` prošlo **89/89 browserovými a HTTP testy** (45,5 s). Sada obsahuje předchozích 67 kontrol a 22 nových kontrol PWA a nastavení v desktopovém Chromiu, mobilním Chromiu a Safari WebKitu s emulací iPhonu. Kontroly Safari návodu běží pouze v Safari. **23/23 Node testů prošlo** při souhrnné kontrole projektu.

Po nasazení z commitu **`5ae41fe`** prošla stejná kompletní sada **89/89 přímo na [veřejném demu study.](https://hphugosm.github.io/study/)** (1,6 minuty). Běh použil nové oddělené prohlížečové kontexty, takže offline scénáře skutečně stahovaly a ověřovaly první cache z GitHub Pages; nevyužívaly předem připravené úložiště uživatele. Ověřen byl správný scope `/study/`, všech 112 původních podkladů i kompletní studijní provoz bez sítě v Chromiu a Safari WebKitu.

Nově ověřeno:

- Manifest se samostatným zobrazením, správným `scope` a `start_url`, ikonami 192/512 px a iPhone metadaty i ikonou pro plochu.
- Nastavení dostupné z patičky, bez další položky v hlavní navigaci. Uložení zvoleného vzhledu, akcentu a většího textu přežije reload.
- Skutečně vykreslené světlé, tmavé a papírové pozadí a text společného prostředí i obou izolovaných studijních modulů. Systémový motiv reaguje na změnu barevného režimu prohlížeče; větší text zvětší skutečný výukový odstavec Law.
- Přístupný dialog s ručním postupem instalace v Safari: Sdílet, Přidat na plochu, Otevřít jako webovou aplikaci, Přidat.
- **Studený offline scénář v každém ze tří prohlížečů**: nový kontext navštíví pouze kalendář, počká na skutečné dokončení instalace a stav `offlineReady`, vypne síť a následně otevře i obnoví předtím nenavštívenou Biologii a Law. Fungují obrázky, hodnocení kartiček a ukládání postupu i po dalším reloadu.
- Všechny **3 PDF fungují bez sítě**: úplný obsah se signaturou `%PDF-` i rozsah `bytes=0-9` s odpovědí 206, správným `Content-Range` a délkou 10 bajtů. Aktivace workeru zachová předem vytvořenou cizí cache `unrelated-app-sentinel`.
- Záloha postupu se skutečně stáhne přes uživatelské rozhraní. Načtení souboru nejprve zobrazí kontrolní krok bez změny dat; potvrzení sloučí staré a nové známé položky obou předmětů.
- Kontrola aktualizace workeru zachová rozehranou otázku, již zvolenou odpověď a vysvětlení. Silnější samostatné ověření skutečného přechodu verze v1 → v2, čekající aktualizace a dvou otevřených oken je zaznamenáno v [pwa.md](pwa.md).

Součástí každého kompletního běhu zůstává HTTP kontrola všech **112 převzatých obrázkových, fontových a PDF souborů**. Offline scénář ověřuje také dostupnost souborů, které před vypnutím sítě uživatel vůbec neotevřel.

Výsledky potvrzují lokální i veřejné PWA sestavení. Nejde o fyzickou instalaci na iPhonu: test ověřuje manifest, metadata, service worker, offline načítání a návod v emulovaném Safari. Samotné přidání ikony na plochu přes systémovou nabídku iOS musí uživatel provést na zařízení.

## Aktualizace pro iPhone: lokální a veřejné ověření

Po úpravách pro telefon a nové navigaci zpět/vpřed prošlo **67/67 browserových a HTTP testů** proti `http://127.0.0.1:4180` (34,0 s). Stejná kompletní sada následně prošla **67/67 přímo na veřejném demu [hphugosm.github.io/study](https://hphugosm.github.io/study/)**, nasazeném z commitu `0999e4b` (přibližně 1 minuta). Veřejný běh zahrnoval poslední zkrácení záhlaví témat, všechny podcesty i všech 112 obrázkových, fontových a PDF podkladů. Původních 32 kontrol Chromia zůstává zachováno. Nových 35 kontrol běží v **Safari WebKitu** s dotykovou emulací na pěti velikostech:

| Konfigurace | Velikost viewportu |
| --- | --- |
| Malý iPhone SE | 320 × 568 |
| iPhone SE třetí generace | 375 × 667 |
| iPhone 13 | 390 × 664 |
| iPhone 14 Pro Max | 430 × 740 |
| iPhone na šířku | 844 × 390 |

Ověřeno otevření události přímým odkazem, návrat na její předmět a kalendář, obnovení obou obrazovek tlačítkem vpřed, zachování historie po reloadu, nativní zpět/vpřed a zahození staré větve historie při přechodu na jinou stránku. Ovládání zůstává uvnitř aplikace. Záhlaví se zpět/vpřed je dostupné po odrolování atlasu. Hlavní ovládací prvky mají nejméně 44 × 44 CSS px a kontrolované vyhledávací i odpovědní vstupy mají nejméně 16px písmo také na šířku. Prošly kontroly přetékání všech hlavních stránek i rozbalených studijních režimů, dotykové otočení a hodnocení kartičky, obrázkový dialog, oba režimy slepé mapy a ovládání řazení i párování Law.

Ověřeny jsou `viewport-fit=cover` a CSS rezervy pro všechny čtyři `safe-area-inset-*`. **Nejde o test na fyzickém iPhonu.** Emulace WebKitu kontroluje vykreslovací jádro, viewport a dotykové vstupy; nevytváří skutečný výřez displeje, systémovou klávesnici ani všechny změny dynamických lišt Safari. Safe-area rezervy jsou proto prověřené jako implementované CSS a rozložení, nikoliv měřením na konkrétním hardwaru.

Aktualizovaná sada ověřila lokální i veřejnou iPhone verzi. Níže zůstává také záznam ověření původního veřejného dema.

Ověřeno 4. listopadu 2026 na lokálním serveru `http://127.0.0.1:4173` a následně přímo na veřejném GitHub Pages demu [hphugosm.github.io/study](https://hphugosm.github.io/study/), nasazeném z commitu `a5cee6b`.

## Výsledky

- **32/32 HTTP a browser testů prošlo lokálně a dalších 32/32 proti veřejnému demu**: 15 funkčních scénářů na desktopu a mobilu, doplněných úplnou HTTP kontrolou podkladů pro obě konfigurace. Veřejný běh dokončil všech 32 testů za 28,9 s. Desktop: Chromium, 1440 × 1000. Mobil: Chromium, emulace iPhone 13, 390 × 664 CSS px a dotykové ovládání.
- **20/20 Node testů prošlo**: 3 testy kalendáře a datových vazeb, 17 původních biologických testů.
- **112/112 převzatých souborů podkladů načteno přes HTTP**: 109 souborů Biologie a 3 soubory Law. Počet zahrnuje obrázky, SVG schémata, fonty a PDF; nejde o 112 obrázků. Všechny URL v registru PDF materiálů byly zahrnuty. Každá odpověď měla stav 200 a neprázdné tělo; PDF mají hlavičku `%PDF-` a správný typ obsahu, WebP správnou signaturu RIFF/WEBP a SVG skutečný SVG obsah.
- Při převzetí podkladů byly všechny uvedené soubory porovnány s čerstvými kopiemi původních repozitářů pomocí SHA-256: **112/112 shodných**.

## Ověřené uživatelské scénáře

Kalendář zobrazuje Biologii i Matematiku 5. listopadu, přechází mezi měsíci a vrací se na dnešní datum. Událost Biologie otevírá funkční atlas; událost Law 12. listopadu otevírá UNIT 2. Fungují návrat do kalendáře i přímé odkazy na detaily. Testy používají pevné datum 4. listopadu 2026, aby zůstaly opakovatelné i později. Ověřeny jsou také přestupný únor, hranice roků a pondělní začátek týdne.

Biologie obsahuje 64 položek, funkční vyhledávání a detail kosti s načteným obrázkem. Poznávačka zobrazuje obrázky, otevře a zavře zvětšení, otočí kartu a uloží hodnocení „umím“, které přežije obnovení stránky. Slepá mapa má oba režimy, skutečně vykreslené cíle, zobrazení řešení a přechod na další otázku. Test projde celých 10 otázek oblasti Trup, ověří uložený výsledek a otevře opakování chybných odpovědí.

Law flashcards odkrývají odpovědi a ukládají známé karty. Procvičování nabízí multiple choice, true/false, textové odpovědi, řazení, párování i mixed režim. Browser testy skutečně odpovídají v jednotlivých formátech, u řazení uspořádají kroky a u párování spojí všech pět dvojic. Ověřeno zobrazení vysvětlení, výsledku a uloženého pokusu. Mixed režim je kontrolován jako dostupná volba; jeho jednotlivé typy otázek se prověřují samostatně.

Historická kontrola původní společné záložky **Můj postup** po skutečném uložení ukázala 1 zvládnutou biologickou položku, 1 výsledek slepé mapy, 1 známou Law kartičku a 1 dokončený Law test. Ukládání obou předmětů přežije obnovení stránky. Legacy klíče jsou převzaty do oddělených klíčů `study:biology:*` a `study:law:*`; původní záznamy zůstávají beze změny. Toto převzetí funguje jen pro data dostupná na stejném originu prohlížeče.

Od 11. 11. 2026 byla tato společná záložka na přání uživatele nahrazena záložkou **Úkoly** se zadáním, termínem a studijním řešením. Ukládání znalostí uvnitř cvičení zůstává zachované; současné kontroly jsou popsány v [assignments.md](assignments.md).

Přepínání Biologie → Law → Biologie nevyvolalo žádnou chybu stránky. Kontrola nenašla iframe ani biologické globální proměnné v hlavním `window`. Kalendář i obě studijní stránky se vejdou do desktopové i mobilní šířky bez vodorovného přetékání. Matematika a Literatura výslovně oznamují dosud nepřidané podklady.

## Opakování kontrol

Z kořenové složky nového projektu:

```sh
npm test
npm run dev
```

Ve druhém terminálu při běžícím serveru:

```sh
npm run test:e2e
```

Přesný příkaz použitý ke kontrole nasazené verze včetně cest pod GitHub Pages:

```sh
STUDY_TEST_URL=https://hphugosm.github.io/study/ npm run test:e2e
```

Testy spouštějí vlastní prohlížečové kontexty s odděleným úložištěm. HTTP kontrola ověřuje všechny převzaté podklady, včetně těch, které se v náhodně zvolené první otázce nezobrazily. Prohlížeč musí být dostupný pro Playwright; na novém počítači jej připraví `npx playwright install chromium`.

Veřejný běh ověřil přímé URL událostí, oba předměty, ukládání i obnovení postupu, mobilní šířku a všech 112 podkladů přímo pod cestou `/study/`. Nebyly nalezeny nefunkční cesty obrázků ani PDF.
