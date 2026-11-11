# Školní termíny v kalendáři Study

Kalendář načítá při spuštění veřejný `modules/moodle-sync/feed.json`, tedy stejný schválený přehled, který aktualizuje denní synchronizace. Prohlížeč se nepřihlašuje do Moodlu ani nestahuje studijní přílohy. Při nedostupném přehledu ponechá ručně přidané události, zobrazí omezení a nabídne opakování. Aktualizace úspěšně uloženého veřejného webu dodá další běhy i offline verzi obvyklým postupem aplikace.

## Přiřazení a druh termínu

`src/moodle-calendar.js` vybírá jen schválené aktuální veřejné položky přiřazené k jediné přesné dvojici předmět/téma. Původních šest ručních záznamů zůstává jako záložní data. Výslovně potvrzená duplicita se zobrazí jednou s přesným termínem z Moodlu a původním odkazem na přípravu.

- `assignment.due` je přesný deadline, nikoli čas začátku testu. Položka bez termínu se do kalendáře nevkládá.
- Kalendářový `event` potřebuje výslovně zkontrolované `calendar_type` (`homework` nebo `test`) a `calendar_role` (`deadline` nebo `scheduled`). Test může mít i zveřejněný deadline; samotné označení Test nedomýšlí čas zahájení. Okna `opens` a `closes` se do kalendáře termínů nezahrnují.
- Identifikátor termínu úkolu je `moodle-deadline-<veřejné ID úkolu>`. Kalendářová událost používá `moodle-event-<veřejné ID události>`. Názvy nefungují jako identifikátory a neodvozují se z nich data.
- Událost s ověřeným `related_assignment`, shodným tématem a stejným okamžikem se sloučí s deadlinem úkolu. Shodný den či podobný název sám nestačí. Změna času zachová stejné ID a nahradí původní termín.

Po opravě uživatelem potvrzené duplicity je v kalendáři 29 událostí: 24 termínů z Moodlu a pět dalších ručních akcí. Ruční `law-test` se se svým zdrojovým Quizem sloučí do jednoho z těchto 24 termínů. První přehled má 24 doložených deadlinů. Dalších 24 školních kalendářových záznamů popisuje stejné okamžiky, proto se zobrazí stále jen 24 událostí. Celkem 45 časů otevření nebo uzavření zůstalo nepublikovaných. Tyto časy nejsou důkazem dalších 45 testů.

UTC sekundy se převádějí do `Europe/Prague` včetně letního času a případného posunu na sousední kalendářní den. Kalendář i detail ukazují skutečný český čas. Historické termíny zůstávají v původním měsíci a neznamenají, že uživatel něco neodevzdal. Úkol z kalendáře otevře záložku Úkoly s odpovídající kartou na prvním místě a zvýrazněnou. Původní moduly zůstávají dostupné v záložce Studovat.

## Oprava typu a ruční duplicity

Uživatel výslovně potvrdil, že původní `law-test` a „Quiz 2 - American System, Court, and Precedent“ dne 19. 11. 2026 jsou stejná událost. Záznam v `src/data.js` má proto přesné `sourceAssignmentId` a `sourceAssignmentUnitId`. Spojení se nepřenáší na jiný úkol stejného dne nebo podobného názvu.

Sloučená událost přebírá přesný název, typ Test a termín 08:30 z Moodlu, ponechá kanonické `law-test` a původní výukový modul. Původní importovaný odkaz funguje jako alias. Odkaz „Zadání testu“ vede na konkrétní školní zadání; záložka Úkoly ve sloučeném detailu používá stejné zadání. Při změně času zůstane jedna událost. Při chybějícím zdroji funguje původní ruční záznam bez domyšlené hodiny.

Všechny publikované úkoly mají výslovně zkontrolované `calendar_type`. Sedm položek Quiz/Test včetně připomínek testů je označeno jako Test; zbývajících 25 jsou domácí úkoly. „Procvičování na test“, běžné čtení ani práce na známku samy o sobě nejsou oznámením testu. Nový zdroj klasifikuj už při kontrole a publikaci; nenechávej Quiz implicitně jako domácí úkol. Název rozhoduje o druhu aktivity, nikdy se z něj neodvozuje chybějící datum nebo hodina.

## Termín uvedený pouze v textu

Denní redakční kontrola má výslovně zahrnovat potvrzené testy a deadliny z úplných dostupných oznámení a zadání. Jiný agent ověří datum, rok, případnou hodinu, předmět a zdrojovou verzi. Chybějící rok nebo hodina se nedoplňují odhadem. Zdrojový čas publikace není časem testu.

Pokud datum není oficiální kalendářovou položkou, přidej po kontrole doložený záznam do existujících redakčních `events` v `src/data.js` a soukromě ulož přesný doklad zdroje. Použij stabilní ID, při úpravě aktualizuj stejnou událost. Den bez uvedené hodiny zachovej pouze jako `date`; nevyrob půlnoc. Hodnocení, osobní termíny a původní soukromý obsah se nezveřejňují. Dodrž existující přesná schválení a holds.

## Ověření

Spusť `npm run check`, `npm test` a `npm run build`. `tests/moodle-calendar.test.cjs` kontroluje časové posuny, verze, sloučení, změnu data a zachování ručních událostí. Prohlížečová sada `tests/moodle-calendar.spec.mjs` prochází skutečné měsíce a termíny ze schváleného feedu, odkaz z kalendáře do Úkolů a mobilní ovládání. Ve workflow Verify live Studilo vyber `calendar` pro desktop, mobilní Chromium a mobilní WebKit.
