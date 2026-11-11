# Školní termíny v kalendáři Study

Kalendář načítá při spuštění veřejný `modules/moodle-sync/feed.json`, tedy stejný schválený přehled, který aktualizuje denní synchronizace. Prohlížeč se nepřihlašuje do Moodlu ani nestahuje studijní přílohy. Při nedostupném přehledu ponechá ručně přidané události, zobrazí omezení a nabídne opakování. Aktualizace úspěšně uloženého veřejného webu dodá další běhy i offline verzi obvyklým postupem aplikace.

## Přiřazení a druh termínu

`src/moodle-calendar.js` vybírá jen schválené aktuální veřejné položky přiřazené k jediné přesné dvojici předmět/téma. Výstup doplňuje původních šest ručně zadaných událostí; nezasahuje do jejich dat ani identifikátorů.

- `assignment.due` je přesný deadline, nikoli čas začátku testu. Položka bez termínu se do kalendáře nevkládá.
- Kalendářový `event` potřebuje výslovně zkontrolované `calendar_type` (`homework` nebo `test`) a `calendar_role` (`deadline` nebo `scheduled`). Test má roli `scheduled`. Okna `opens` a `closes` se do kalendáře termínů nezahrnují.
- Identifikátor termínu úkolu je `moodle-deadline-<veřejné ID úkolu>`. Kalendářová událost používá `moodle-event-<veřejné ID události>`. Názvy nefungují jako identifikátory a neodvozují se z nich data.
- Událost s ověřeným `related_assignment`, shodným tématem a stejným okamžikem se sloučí s deadlinem úkolu. Shodný den či podobný název sám nestačí. Změna času zachová stejné ID a nahradí původní termín.

První přehled má 24 doložených deadlinů. Dalších 24 školních kalendářových záznamů popisuje stejné okamžiky, proto se zobrazí stále jen 24 událostí. Celkem 45 časů otevření nebo uzavření zůstalo nepublikovaných. Tyto časy nejsou důkazem dalších 45 testů.

UTC sekundy se převádějí do `Europe/Prague` včetně letního času a případného posunu na sousední kalendářní den. Kalendář i detail ukazují skutečný český čas. Historické termíny zůstávají v původním měsíci a neznamenají, že uživatel něco neodevzdal. Úkol z kalendáře otevře záložku Úkoly s odpovídající kartou na prvním místě a zvýrazněnou. Původní moduly zůstávají dostupné v záložce Studovat.

## Termín uvedený pouze v textu

Denní redakční kontrola má výslovně zahrnovat potvrzené testy a deadliny z úplných dostupných oznámení a zadání. Jiný agent ověří datum, rok, případnou hodinu, předmět a zdrojovou verzi. Chybějící rok nebo hodina se nedoplňují odhadem. Zdrojový čas publikace není časem testu.

Pokud datum není oficiální kalendářovou položkou, přidej po kontrole doložený záznam do existujících redakčních `events` v `src/data.js` a soukromě ulož přesný doklad zdroje. Použij stabilní ID, při úpravě aktualizuj stejnou událost. Den bez uvedené hodiny zachovej pouze jako `date`; nevyrob půlnoc. Hodnocení, osobní termíny a původní soukromý obsah se nezveřejňují. Dodrž existující přesná schválení a holds.

## Ověření

Spusť `npm run check`, `npm test` a `npm run build`. `tests/moodle-calendar.test.cjs` kontroluje časové posuny, verze, sloučení, změnu data a zachování ručních událostí. Prohlížečová sada `tests/moodle-calendar.spec.mjs` prochází skutečné měsíce a termíny ze schváleného feedu, odkaz z kalendáře do Úkolů a mobilní ovládání. Ve workflow Verify live Studilo vyber `calendar` pro desktop, mobilní Chromium a mobilní WebKit.
