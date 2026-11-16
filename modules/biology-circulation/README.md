# Tělní tekutiny a cévní soustava

Samostatná výuková část navazuje na atlas kostí a svalů. Režimy: `atlas`, `cards` (poznávačka), `flashcards`, `map`, `notes`. Původní soustavy i jejich uložené výsledky zůstávají oddělené. Modul používá `study:biology:circulation:v1`. `mount(container, {mode, onProgress})` vrací úklidovou funkci s `navigate(mode)`; `getProgress()` poskytuje souhrn.

Obsah zahrnuje krev, cévy a srdce: 11 ověřených obrazových cílů a jednu slovní položku. Poloměsíčité chlopně se zkoušejí slovně, protože podklad neoznačuje samostatný přesný cíl. Anatomická pravá strana je na čelním obrázku vlevo. Poznávačka a mapa používají výřez původního schématu se zakrytými názvy; titulky a přístupné popisy před odpovědí názvy neprozrazují. Každé kolo obsahuje všechny cíle z vybrané oblasti a umožňuje zopakovat chyby.

Zdroj v `data.json` je přesná samostatně zkontrolovaná očištěná školní prezentace (31 snímků). Číslování snímků zůstalo zachované. Odstraněné osobní fotografie, zdravotnické identifikátory, video a metadata nejsou součástí veřejné kopie. Čtyři schválené původní obrázky jsou byteově shodné s diagramy zdroje; soubory jsou v GitHub Releases, mimo historii Git. Odkazy citují PPTX a číslo snímku, nikoli neexistující PDF.

Výuka nepřejímá nepřesná klinická tvrzení prezentace. Imunitní a mízní soustava nejsou touto částí vyčerpané a mohou získat vlastní atlas po samostatné kontrole. Poznámky se otevírají po podtématech.

Kontrola: `node --test modules/biology-circulation/tests/*.test.mjs` a `npm run check`, `npm test`, `npm run build`.
