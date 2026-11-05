# Matematika ve study.

Dvě kategorie rozšiřují stávající předmět Matematika. Původní `math-quarter` zůstává cílem kalendářové události a slouží jako rozcestník, není třetí kategorií. Přesný rozsah školní čtvrtletní práce není doložen.

| Kategorie | Route | Zdroj |
|---|---|---|
| Trigonometrie a goniometrické funkce | `#/units/trig-functions` | Trigonometrie (24 snímků), Grafy sin/cos/tan/cot (23 snímků) |
| Goniometrické vzorce, rovnice a nerovnice | `#/units/trig-equations` | Goniometrické rovnice a vzorce (34 snímků) |

Celkem bylo přečteno 81 snímků: text, OOXML rovnice i vzorce vložené jako obrázky. Původní soubory PPTX jsou ke stažení v Materiálech obou témat a v přípravě na test. Všechny moduly a podklady automaticky vstupují do offline balíčku bez externích knihoven či fontů.

## Věrnost podkladům

Poznámky vycházejí z uvedených prezentací. Řešení úloh jsou dopočtená a ověřená; nejsou vydávána za výsledky vytištěné ve zdroji. Ve vzorcích nejsou doplněny nepodložené půlúhlové ani součinové identity.

- Trigonometrie s. 14: symbol nekonečna u pólů nahrazuje „nedefinováno“. Nekonečno není funkční hodnota.
- Grafy s. 21: tan roste a cot klesá na každém jednotlivém intervalu mezi sousedními asymptotami.
- Grafy s. 13–15: `2 sin(2x + π/2) − 3 = 2 cos(2x) − 3` je sudá funkce s periodou π a oborem hodnot [−5, −1].
- Rovnice s. 16: při řešení `sin 3x = 1/2` se dělí třemi základní úhly i perioda: `π/18 + 2kπ/3`, `5π/18 + 2kπ/3`.
- Rovnice s. 18–26: substituční kořen `t = 3` se zamítá, protože sin x leží v [−1, 1].
- Ostré nerovnice mají otevřené krajní body. Všechny periodické výsledky uvádějí `k ∈ Z`.

## Postup a kompatibilita

Každý modul ukládá oddělený postup do `study:mathematics:trig-functions:progress:v1` a `study:mathematics:trig-equations:progress:v1`. Kartičky, přečtené lekce a dokončené kvízy vstupují do společné zálohy v Nastavení. Starší zálohy zůstávají kompatibilní. Biologie a Law se nemění.

## Ověření

Povinné kontroly jsou `npm run check`, `npm test`, `npm run build`. Testy matematiky ověřují matematické výsledky i integraci obou kategorií. Browser testy jsou v `tests/mathematics.spec.mjs`; kontrolují interakce, zachování postupu a rozložení na desktopu i mobilu. Výsledek závěrečného běhu je zaznamenán v historii nasazení.

### Závěrečná lokální kontrola 5. listopadu 2026

- `npm run check`: 48 JavaScript souborů, vazby registru, datumy, hlavičky PDF, materiály a cesty úspěšně ověřeny.
- `npm test`: 38/38 úspěšných testů včetně původní Biologie, záloh a nových matematických kontrol.
- Prohlížeče: 89 původních kontrol desktop/mobil/PWA/Safari a 18 matematických kontrol prošlo. Jediná kontrola zasažená krátkou obnovou místního sestavení byla po stabilizaci náhledu zopakována a prošla.
- Matematické testy ověřují převody, póly i záporné měřítko grafu, nulové parametry, trojúhelník √43 a odolnost výpočtu; všechny větve šesti rovnic a 60 000 porovnání intervalů nerovnic.
- Všechny režimy obou kategorií se vejdou do 320 px. Provedena i nezávislá kontrola obrazovek a obsahu.
- První offline návštěva obou matematických kategorií funguje po předchozím otevření pouze kalendáře. V offline režimu se načtou i všechny tři původní PPTX a ukládá se postup.
- Statické sestavení obsahuje 161 souborů (20,2 MiB); všechny vstupují do ověřovaného offline balíčku.

## Dva pracovní listy se 164 příklady

Přidány jako režim `worksheets` uvnitř stávajících dvou kategorií (bez přidávání kategorií). `Gonio_fce_opakovani.pdf` má 60 úloh; `Opakovani_gonio__ne_rovnice.pdf` má 104 úloh po odečtení opakovaných stran. Dodaný JSON obsahuje zadání, kroky a výsledky. Sdílená komponenta `modules/math-worksheets/` je zobrazuje v přístupném velkém dialogu se šipkami, klávesnicí a čistou matematickou sazbou. Volitelné grafy používají zadané parametry a přerušují křivky u asymptot.

Ověřená oprava: GR7-37 má v původním PDF na pravé straně jmenovatel `sin(2x)`, zatímco dodané řešení uvádělo `sin x`. Opravené zadání dává `1 − tan² x = 1 − tan x`, podmínky `sin x ≠ 0`, `cos x ≠ 0`; z větví tan x = 0 a tan x = 1 zůstává jen `x = π/4 + kπ`. Původní uživatelovy soubory nebyly změněny. Záznam nese poznámku o opravě.

Přibalen KaTeX 0.19.1 (MIT licence ve vendor/katex/LICENSE) a jeho fonty. Za běhu není potřeba CDN. Každý vzorec je při testech vykreslen s chybami jako výjimkami a bez důvěry pro externí obsah. Původní PDF se vkládají do offline balíčku stejně jako zbytek Study.


Kontrola pracovních listů: všech 164 zadání odpovídá PDF (60 grafů, 104 ostatních úloh). Po opravách byla ověřena úplnost větví náhodných rovnic algebraickými rozklady; 16 882 kontrol hodnot/kořenů a 180 387 kontrol nerovnic prošlo. Prohlížeč otevřel všech 164 položek a prošel každý krok v obou směrech. Zvlášť ověřeny mobilní šířka 320 px, Safari, skutečně načtené matematické fonty, filtrování, klávesnice, návrat fokusu, grafy a první offline otevření pracovních listů i obou PDF. Padesát regresních scénářů původních modulů prošlo.
