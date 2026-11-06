# Podklady podle předmětů a témat

<!-- moodle-outline:start -->
## Přehled jedenácti předmětů JU3
Celkem **184 skutečných témat Moodlu** v **11 předmětech**. Jednotlivé varianty tříd mají uvnitř předmětu vlastní skupinu; pořadí není přeuspořádané podle abecedy.

| Předmět | Témata Moodlu |
| --- | ---: |
| [Area Studies](subjects/area-studies/README.md) | 10 |
| [Biologie](subjects/biology/README.md) | 10 |
| [Chemie](subjects/chemistry/README.md) | 43 |
| [Americká literatura](subjects/american-literature/README.md) | 8 |
| [Fyzika](subjects/physics/README.md) | 14 |
| [Informatika](subjects/informatics/README.md) | 13 |
| [Právo](subjects/law/README.md) | 36 |
| [Matematika](subjects/mathematics/README.md) | 11 |
| [Sociologie](subjects/sociology/README.md) | 10 |
| [Základy společenských věd](subjects/social-sciences/README.md) | 12 |
| [Zeměpis](subjects/geography/README.md) | 17 |

### Další zachované veřejné předměty

- [Literatura](subjects/literature/README.md)
- [Dějepis](subjects/history/README.md)

Nejdřív použij původní podklady z `sources/index.json` příslušného tématu. Ve složce `derived/` vznikají až samostatně schválené výtahy, poznámky a procvičování.
<!-- moodle-outline:end -->

Strojově čitelný rozcestník je v `catalog.json`. Původní podklady jsou vždy oddělené od výtahů a dalších odvozených výstupů.

Při kontrole veřejného přehledu dne 6. 11. 2026 byly vynechány dvě individuální sekce. Jejich názvy ani interní identifikátory zde nejsou zveřejněné.

Úvodní import ze 6. 11. 2026 přidal **125 schválených odkazů na 123 různých souborů** v [GitHub Releases](https://github.com/hphugosm/study/releases/tag/studylo-materials-v1). Nové přílohy jsou mimo Git historii a web je odkazuje přímo. Původní veřejné materiály Study zůstaly zachované. Počet témat není počet příloh: některá témata dosud nemají dostupný soubor.

Pro další práci agenta načti `catalog.json`, potom `sources/index.json` vybraného tématu a stáhni pouze potřebné podklady. Výstupy patří do `derived/` a musí zachovat reference na přesné ID a SHA-256 použitých zdrojů. Katalog ani samotný import agenty automaticky nespouští.
