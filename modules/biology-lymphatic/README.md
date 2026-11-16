# Mízní soustava — vybrané struktury

Samostatný malý atlas navazuje na kosterní, svalový a cévní modul. Obsahuje čtyři různé ověřené cíle: slezinu, brzlík, krční a podpažní skupinu uzlin. Poznávačka i mapa projdou všechny cíle vybrané oblasti; lze zopakovat chyby. Slovní kartičky jsou jednostranné a kompaktní, výpisky začínají sbalenými podtématy.

Jediný původní obrázek pochází ze snímku 26 již schválené očištěné prezentace. Ve všech režimech včetně zvětšení se používá ověřený horní výřez s trvalými maskami. Chybný popisek tříselných uzlin mířící ke koleni se nezobrazuje. Krční a podpažní cíle představují skupiny, nikoli izolovanou uzlinu. Nepřidáváme neověřené části schématu.

Malé oblasti lze vybrat také v posuvné zvětšené mapě. Výběr uzavře dialog, zobrazí výsledek a přesune fokus na další otázku. Klávesnicí fungují Tab, Enter a mezerník.

Rozhraní: `mount(container, {mode, onProgress})` vrací úklidovou funkci s `navigate(mode)`. Režimy jsou `atlas`, `cards`, `flashcards`, `map`, `notes`; `getProgress()` poskytuje souhrn. Výsledky jsou oddělené klíčem `study:biology:lymphatic:v1`. Běžné školní podklady a jejich otisky zůstávají beze změny, obrázek je v GitHub Releases mimo Git historii.

Kontroly: `node --test modules/biology-lymphatic/tests/*.test.mjs`; funkční mobilní kontrola je v `tests/lymphatic.spec.mjs`.
