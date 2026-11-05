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
