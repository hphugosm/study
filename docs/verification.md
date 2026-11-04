# Ověření dema study.

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

Společná záložka **Můj postup** po skutečném uložení ukáže 1 zvládnutou biologickou položku, 1 výsledek slepé mapy, 1 známou Law kartičku a 1 dokončený Law test. Ukládání obou předmětů přežije obnovení stránky. Legacy klíče jsou převzaty do oddělených klíčů `study:biology:*` a `study:law:*`; původní záznamy zůstávají beze změny. Toto převzetí funguje jen pro data dostupná na stejném originu prohlížeče.

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
