# Úkoly u každého tématu

Společná záložka **Úkoly** od 11. 11. 2026 nahrazuje původní „Můj postup“. Je dostupná také u témat bez hotových výpisků a u původních interaktivních kategorií. Odkazy s `tab=progress` otevřou Úkoly; neznámá záložka přejde na Studovat. Otevření domácího úkolu z kalendáře směřuje rovnou na Úkoly.

Každá karta obsahuje název, doložený termín, rozbalovací zadání a dostupné studijní řešení. Hotové soubory jsou přístupné rovnou. Chybějící zadání, datum či řešení se výslovně uvedou. Starší termín neznamená, že uživatel nic neodevzdal. UI nečte známky, odevzdání ani osobní stav účtu a nic do Moodlu neposílá. Uložené znalosti uvnitř cvičení zůstávají zachované.

## Zdroje a přiřazení

- `src/assignments.js` načítá veřejný `modules/moodle-sync/feed.json` a vybírá pouze schválené položky `kind: assignment` s přesnou dvojicí `subject` a `topic`. Soubory se za úkoly nepovažují podle názvu.
- Původní kategorie zahrnují pouze výslovně přiřazené doplňky z `subject-layout.js`; souhrnná kategorie může zahrnout své vyjmenované jednotky. Nepřiřazuj automaticky všechny úkoly předmětu každému tématu.
- Výchozí export má 32 zkontrolovaných položek Moodlu ve 20 tématech; 24 má termín. Jde o dostupné školní záznamy včetně historických, ne tvrzení o 32 nových či neodevzdaných domácích úkolech. Tato metadata neobsahují plná zadání.
- Samostatně se zobrazí výslovné události `type: homework` z kalendáře. Záznam bez času zachová datum bez domyšlené hodiny.
- Uživatelem potvrzená aktivita s HEX maticí je doložená dvěma přesnými očištěnými sešity a čtyřmi ověřenými výsledky z existující lekce. Její termín není doložený. Tento konkrétní zdroj není zaměněný za jiný záznam `mod_assign`.

UTC sekundy z Moodlu se zobrazují pomocí `Europe/Prague`, tedy včetně skutečného letního času. Nejprve se řadí budoucí termíny, poté úkoly bez termínu a nakonec historické termíny od nejnovějšího. Neznámý termín je `null`, ne dnešní datum ani půlnoc.

## Doplnění celého zadání a řešení

Soukromý synchronizační projekt schvaluje přesnou verzi každého zveřejnitelného metadatového záznamu. Veřejná položka má neprůhledný `version`, který se změní při změně zdrojového zadání i při zachovaném názvu a datu. Neschválená nová verze se neexportuje.

Po přečtení celého zadání a nezávislé obsahové i soukromé kontrole přidej záznam do `src/assignment-content.js`. Použij aktuální veřejné `assignmentId`, `version`, `subject`, `topic`, `reviewed: true`, datum `reviewed_on`, přesné veřejné `prompt` a volitelně `steps`. Vysvětlené textové řešení patří do `solution: {paragraphs, steps}`; hotové soubory do `solutions`.

Textové zadání bez přílohy může mít `source_refs: []`: jeho zdrojem je přesná zkontrolovaná verze zadání. Soubory řešení potřebují skutečné reference na schválené podklady příslušného tématu (`id`, `sha256`, případně `page` a `locator`), správný SHA, velikost, formát a kanonický odkaz do `studylo-learning-v1` v GitHub Releases. Nepoužívej otisk popisu jako falešný SHA souboru. Publikační doklady a citlivé podklady zůstávají v soukromém projektu.

Obsah se připojí pouze při shodě všech čtyř identifikátorů. Starší řešení se nepřeváže na jiné zadání; chybějící či změněná verze zobrazí čekající stav. Nic nevydávej za uživatelovo odevzdání ani za oficiální učitelský klíč.

## Kontroly

Spusť `npm run check`, `npm test` a `npm run build`. Zaměřené prohlížečové kontroly jsou `tests/assignments.spec.mjs`; ruční workflow **Verify live Studilo → assignments** ověřuje desktop, mobilní Chromium a mobilní WebKit. Ověř skutečný veřejný výsledek před záznamem dokončení.
