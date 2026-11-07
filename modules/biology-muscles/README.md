# Svalová soustava

Samostatný modul s režimy `atlas`, `cards` (obrázková poznávačka), `flashcards` (slovní kartičky), `map` a `notes`. Rozhraní `mount(container, {mode, onProgress})` vrací úklidovou funkci s `navigate(mode)`; `getProgress()` poskytuje souhrn pokroku.

Jediným obsahovým zdrojem je očištěná školní prezentace SVALY. Číslování citací odpovídá původním 12 snímkům; veřejné PDF a PPTX jsou samostatné prověřené odvozeniny. Obrázky jsou původní bezpečné výukové obrázky; ukládají se podle otisku v GitHub Release, nikoli v historii repozitáře. Pole `assets` obsahuje původní názvy a jejich veřejné adresy. Runtime přijímá pouze odpovídající adresy tohoto repozitáře, releasu a otisku.

Datový model odděluje soustavu, anatomické struktury, pohledy, slovní kartičky a výpisky. Souřadnice polygonů jsou procenta přesného původního obrázku; `view` zajišťuje, že otázka používá správný podklad. Pro lýtko se z popsaného atlasu ukazuje pouze vnitřní výřez bez názvů. Struktury bez jednoznačného obrazového cíle mají `cardOnly`: kožní sval krční a mezižeberní svaly zůstávají ve slovním obsahu, nikoli ve falešných mapových otázkách. Mimické svaly se zkouší jako skupina reprezentovaná oblastí kolem oka, což je v detailu výslovně uvedeno.

Poznávačka a mapa v každém kole zahrnují všechny obrazové struktury z vybrané oblasti. Pokrok používá výhradně `study:biology:muscles:v1`; nepřebírá stav kosterní soustavy. Pro další tělní soustavu lze použít stejné rozdělení dat a čistých pravidel v `engine.js`, avšak každý obrázek a jeho cíle musí projít samostatným ověřením.

Ověření: `node --test modules/biology-muscles/tests/engine.test.mjs`.
