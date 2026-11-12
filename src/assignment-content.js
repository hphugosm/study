/**
 * Separately reviewed public assignment content; never import private scan bodies.
 * Each record is bound to {assignmentId: approved feed ID, version: feed version,
 * subject, topic, reviewed:true, reviewed_on:'YYYY-MM-DD', prompt,
 * steps?: string[], solution?: {paragraphs?:string[],steps?:string[]},
 * solutions?: course-notes solution[],
 * source_refs: actual approved public document ID/SHA references}.
 * Prompt-only / text-only solutions may have source_refs:[]: the reviewed exact
 * assignment ID + version is their provenance, never a fabricated file hash.
 * A changed feed version requires a fresh review. References must belong to the
 * exact topic's published materials. An assignment version is not a file SHA.
 */
// Reviewed JSON sources: modules/course-notes/assignments/*.json.
// Keep the browser registry equal to their records, sorted by assignmentId.
export const reviewedAssignmentContent=Object.freeze([
  {
    "assignmentId": "46ff78e508d382da32b50287e51e16fb3e7220b49bca233ec81f0615c4dd86e9",
    "version": "0240a8a1a25621ff573719ebe4b0fafed9a5bc7b3e5e73be6538e496b82754f6",
    "subject": "chemistry",
    "topic": "section-edb6d4d4a4196dfa9657c0a8a0e93029",
    "reviewed": true,
    "reviewed_on": "2026-11-11",
    "prompt": "Zopakujte si chemickou reakci aminokyselin - vznik peptidové vazby.\n\n1) Do sešitu zapište reakci fenylalaninu s alaninem, glycinem, valinem a cysteinem. Výsledkem je peptid Phe-Ala-Gly-Val-Cys. Zapište celou rovnici, určete druh peptidu, pojmenujte jej. Označte N a C konec a peptidovou vazbu.\n\n2) Do sešitu zapište reakci serinu s alaninem a glycinem. Výsledkem je peptid Ser-Ala-Gly. Zapište celou rovnici, určete druh peptidu, pojmenujte jej. Označte N a C konec a peptidovou vazbu.\n\n3) Vysvětlete amfion, izoelektrický bod, podobu peptidové vazby a mezi jakými skupinami vzniká.",
    "solution": {
      "paragraphs": [
        "Vzorové studijní řešení. Pořadí aminokyselin čteme od N-konce k C-konci zleva doprava. Ve vzorcích je C₆H₅ fenylový kruh, C(=O) karbonylová skupina; hranaté závorky [C(=O)–NH] pouze vyznačují peptidovou skupinu, nejsou další částí molekuly.",
        "1) Phe–Ala–Gly–Val–Cys: úplná školní kondenzační rovnice v neiontové formě: H₂N–CH(CH₂–C₆H₅)–C(=O)–OH + H₂N–CH(CH₃)–C(=O)–OH + H₂N–CH₂–C(=O)–OH + H₂N–CH[CH(CH₃)₂]–C(=O)–OH + H₂N–CH(CH₂–SH)–C(=O)–OH → H₂N–CH(CH₂–C₆H₅)–[C(=O)–NH]–CH(CH₃)–[C(=O)–NH]–CH₂–[C(=O)–NH]–CH[CH(CH₃)₂]–[C(=O)–NH]–CH(CH₂–SH)–C(=O)–OH + 4 H₂O.",
        "Postranní řetězce v daném pořadí jsou Phe: –CH₂–C₆H₅; Ala: –CH₃; Gly: –H, proto je v páteři –CH₂–; Val: –CH(CH₃)₂; Cys: –CH₂–SH. Při tvorbě peptidu je zachováme. Cysteinová skupina –SH zde nevytváří peptidovou vazbu.",
        "Výsledkem je lineární pentapeptid, tedy oligopeptid z pěti aminokyselinových zbytků. Název: fenylalanylalanylglycylvalylcystein. Pro čitelnost rozděleno: fenylalanyl–alanyl–glycyl–valyl–cystein. První čtyři zbytky mají zakončení -yl, poslední zůstává cystein.",
        "N-konec pentapeptidu je vlevo: volná aminová skupina H₂N– u fenylalaninového zbytku. C-konec je vpravo: volná karboxylová skupina –C(=O)–OH cysteinového zbytku. Čtyři peptidové vazby jsou mezi Phe/Ala, Ala/Gly, Gly/Val a Val/Cys. U každé vyznačené skupiny [C(=O)–NH] je vlastní peptidovou vazbou spojení karbonylového uhlíku s dusíkem, C–N.",
        "2) Ser–Ala–Gly: úplná školní kondenzační rovnice v neiontové formě: H₂N–CH(CH₂–OH)–C(=O)–OH + H₂N–CH(CH₃)–C(=O)–OH + H₂N–CH₂–C(=O)–OH → H₂N–CH(CH₂–OH)–[C(=O)–NH]–CH(CH₃)–[C(=O)–NH]–CH₂–C(=O)–OH + 2 H₂O.",
        "Postranní řetězce jsou Ser: –CH₂–OH; Ala: –CH₃; Gly: –H. Hydroxyl postranního řetězce serinu zůstává zachován; spojení v zadaném peptidu vznikají mezi hlavními aminovými a karboxylovými skupinami.",
        "Výsledkem je lineární tripeptid, tedy oligopeptid ze tří aminokyselinových zbytků. Název: serylalanylglycin, pro čitelnost seryl–alanyl–glycin. N-konec je volná H₂N– skupina serinového zbytku vlevo, C-konec volná –C(=O)–OH glycinového zbytku vpravo. Dvě peptidové vazby leží mezi Ser/Ala a Ala/Gly; v obou [C(=O)–NH] označ spojení C–N.",
        "Kontrola vody: otevřený řetězec z n aminokyselinových zbytků obsahuje n − 1 spojení. Pět zbytků proto dává čtyři peptidové vazby a 4 H₂O, tři zbytky dvě vazby a 2 H₂O. V neiontovém školním zápisu se na každém spojení formálně odebere OH z karboxylu a H z aminové skupiny.",
        "Připojené řešení používá amfiontové zápisy. Stejné produkty tedy můžeš zapsat jako H₃N⁺–CH(CH₂–C₆H₅)–[C(=O)–NH]–CH(CH₃)–[C(=O)–NH]–CH₂–[C(=O)–NH]–CH[CH(CH₃)₂]–[C(=O)–NH]–CH(CH₂–SH)–COO⁻ a H₃N⁺–CH(CH₂–OH)–[C(=O)–NH]–CH(CH₃)–[C(=O)–NH]–CH₂–COO⁻. Označení N- a C-konce ani počet peptidových vazeb se tím nemění. Protonace závisí na pH; tento zápis nepředstavuje jedinou formu za všech podmínek.",
        "3) Amfion neboli zwitterion je částice nesoucí současně kladný a záporný náboj, které dávají celkově nulový náboj. Jednoduchý zápis aminokyseliny bez další nabité postranní skupiny je H₃N⁺–CH(R)–COO⁻. Není to molekula bez nábojů: NH₃⁺ a COO⁻ jsou nabité současně.",
        "Izoelektrický bod pI je hodnota pH, při níž má daná aminokyselina nebo peptid nulový průměrný výsledný elektrický náboj. Neznamená to nepřítomnost lokálních nábojů ani univerzálně pH 7. Různé aminokyseliny a peptidy mají různé pI. V zadání se pI nevypočítává a nepřebíráme jednu číselnou hodnotu pro všechny látky.",
        "Peptidová skupina má podobu –C(=O)–NH–. V tomto úkolu vzniká mezi karboxylovou skupinou jedné α-aminokyseliny a aminovou skupinou následující α-aminokyseliny. Vlastní peptidová vazba je amidové spojení C–N, nikoli vodíková vazba nebo spojení dvou postranních řetězců.",
        "Rovnice vyjadřují školní formální kondenzační model. Neznamenají, že pouhé smíchání volných aminokyselin ve vodě samo vytvoří právě zadanou sekvenci. Pro tento úkol zapisujeme předepsané pořadí a bilanci odštěpené vody."
      ],
      "steps": [
        "Zapiš aminokyseliny v pořadí od N-konce k C-konci a doplň všechny postranní řetězce.",
        "Spoj sousední hlavní karboxylové a aminové skupiny; každé nové –C(=O)–NH– vyznač a zachovej volné koncové skupiny.",
        "Doplň 4 H₂O u pentapeptidu a 2 H₂O u tripeptidu. Urči počet zbytků, přesný název a N- i C-konec.",
        "Vysvětli současné náboje amfiontu, význam pI a rozdíl mezi celou peptidovou skupinou a vlastní vazbou C–N."
      ]
    },
    "source_refs": [
      {
        "id": "ae8ed6e348e68c331ae6bb7377c5adeef235c196d553a335407f417cb98df546",
        "sha256": "9ecc12b5eb5ae76fa4f3993bd7777c975cb561da68bbedff36434c386f2c9a83",
        "locator": "horní příklad Phe–Ala–Gly–Val–Cys a dolní příklad Ser–Ala–Gly"
      },
      {
        "id": "f83a97b0a6a7b497852373f9cbdea73a56cd9829712d676fb748ef8009f70696",
        "sha256": "2cc2c6e39cccf9b5b828a4314fe5841fb3882890949ebee54440c80dfe0aa467",
        "page": 3
      },
      {
        "id": "f83a97b0a6a7b497852373f9cbdea73a56cd9829712d676fb748ef8009f70696",
        "sha256": "2cc2c6e39cccf9b5b828a4314fe5841fb3882890949ebee54440c80dfe0aa467",
        "page": 6
      }
    ],
    "solutions": [
      {
        "id": "aminokyseliny-peptidy-reseni",
        "title": "Aminokyseliny: vypracované rovnice a vysvětlení",
        "format": "pdf",
        "sha256": "c6af08874f14c5079caae58c7c131366cf1cfcf675d1fc6b4eba4e745b106266",
        "size": 89247,
        "url": "https://github.com/hphugosm/study/releases/download/studylo-learning-v1/c6af08874f14c5079caae58c7c131366cf1cfcf675d1fc6b4eba4e745b106266.pdf",
        "source_refs": [
          {
            "id": "ae8ed6e348e68c331ae6bb7377c5adeef235c196d553a335407f417cb98df546",
            "sha256": "9ecc12b5eb5ae76fa4f3993bd7777c975cb561da68bbedff36434c386f2c9a83",
            "locator": "horní příklad Phe–Ala–Gly–Val–Cys a dolní příklad Ser–Ala–Gly"
          },
          {
            "id": "f83a97b0a6a7b497852373f9cbdea73a56cd9829712d676fb748ef8009f70696",
            "sha256": "2cc2c6e39cccf9b5b828a4314fe5841fb3882890949ebee54440c80dfe0aa467",
            "page": 3
          },
          {
            "id": "f83a97b0a6a7b497852373f9cbdea73a56cd9829712d676fb748ef8009f70696",
            "sha256": "2cc2c6e39cccf9b5b828a4314fe5841fb3882890949ebee54440c80dfe0aa467",
            "page": 6
          }
        ]
      }
    ]
  },
  {
    "assignmentId": "b1a5a790d7dcee1da7a06925f6b0c99f5894341763e68e1f079b4716e9b4c703",
    "version": "2c1e524625b6c09d095849cf2556b7bb2324a8c3126edf99b47040052f5f7cd3",
    "subject": "chemistry",
    "topic": "section-edb6d4d4a4196dfa9657c0a8a0e93029",
    "reviewed": true,
    "reviewed_on": "2026-11-12",
    "prompt": "Test na aminokyseliny. Teorie - co jsou to aminokyseliny, druhy aminokyselin, obecný vzorec, vzorec ve formě amfiontu, izoelektrický bod. Rozdělení peptidy-bílkoviny. Funkce aminokyselin v organismu. Kódované aminokyseliny. Chemické reakce aminokyselin. Umět sestavit peptid, pojmenovat ho, určit peptidovou vazbu a druh peptidu, umět označit konce peptidu.",
    "solution": {
      "paragraphs": [
        "Studijní příprava podle zveřejněného rozsahu. Jde o vysvětlení uvedených pojmů a vzorové procvičení, nikoli o oficiální odpovědi na skutečné testové otázky. Oznámení neuvádí přesný den ani čas testu. Historické údaje u aktivity nepovažujeme za nově stanovený termín ani za údaj o odevzdání.",
        "Aminokyseliny jsou organické sloučeniny s aminovou a karboxylovou skupinou, základní stavební jednotky bílkovin. Pro zde probírané α-aminokyseliny používáme obecný neiontový vzorec H₂N–CH(R)–COOH. R rozlišuje postranní řetězec: glycin má R = H, alanin –CH₃, serin –CH₂–OH, cystein –CH₂–SH, valin –CH(CH₃)₂ a fenylalanin –CH₂–C₆H₅.",
        "Druhy porovnávej podle hlediska: alifatické uhlovodíkové řetězce mají např. Ala a Val; hydroxyl obsahuje Ser, síru Cys, aromatický kruh Phe. Kyselé aminokyseliny zahrnují kyselinu asparagovou a glutamovou, bazické lysin, arginin a histidin. Esenciálnost je jiné hledisko: znamená nutnost získávat aminokyselinu potravou, ne určitý tvar skupiny R.",
        "Kódované aminokyseliny jsou v tomto školním přehledu skupina 20 běžných aminokyselin, pro jejichž zabudování do bílkovin existuje genetický kód. „Kódovaná“ tedy neoznačuje zvláštní funkční skupinu. Základní funkce aminokyselin je stavební: spojují se do peptidů a bílkovin. Bílkoviny sestavené z aminokyselin mohou působit jako enzymy, tedy katalyzátory biochemických reakcí; neznamená to, že každá volná aminokyselina je katalyzátor. Chemické rozdíly jejich postranních řetězců pomáhají vysvětlit rozdílné vlastnosti výsledných řetězců.",
        "Amfion neboli zwitterion má současně kladný i záporný náboj a celkově nulový náboj. U jednoduché α-aminokyseliny bez další nabité postranní skupiny zapisujeme H₃N⁺–CH(R)–COO⁻. Nulový součet není nepřítomnost nábojů. V kyselém prostředí je ve zjednodušeném schématu H₃N⁺–CH(R)–COOH, v zásaditém H₂N–CH(R)–COO⁻. Izoelektrický bod pI je pH, při němž má daná látka nulový průměrný výsledný náboj; není univerzálně pH 7 a liší se podle látky.",
        "Peptidy i bílkoviny obsahují aminokyselinové zbytky propojené peptidovými vazbami. Kratší řetězce označujeme jako oligopeptidy, delší jako polypeptidy; bílkovinu popisujeme také podle její prostorové stavby a funkce. Pro tyto příklady je rozhodující přesný počet zbytků: tři dávají tripeptid, pět pentapeptid. Nezaměňuj počet zbytků s počtem vazeb; oba zde uvedené peptidy jsou otevřené oligopeptidy.",
        "Peptidová skupina je –C(=O)–NH– a vlastní peptidová vazba spojuje karbonylový uhlík s dusíkem (C–N). V daných α-peptidech se spojuje hlavní karboxylová skupina jedné aminokyseliny s hlavní aminovou skupinou následující. Ve školním kondenzačním modelu se na každém spojení odebere OH a H za vzniku H₂O; otevřený řetězec z n zbytků má n − 1 těchto spojení. Při zachování zadaného pořadí necháváme postranní řetězce beze změny.",
        "1) Phe–Ala–Gly–Val–Cys: úplná školní kondenzační rovnice v neiontové formě: H₂N–CH(CH₂–C₆H₅)–C(=O)–OH + H₂N–CH(CH₃)–C(=O)–OH + H₂N–CH₂–C(=O)–OH + H₂N–CH[CH(CH₃)₂]–C(=O)–OH + H₂N–CH(CH₂–SH)–C(=O)–OH → H₂N–CH(CH₂–C₆H₅)–[C(=O)–NH]–CH(CH₃)–[C(=O)–NH]–CH₂–[C(=O)–NH]–CH[CH(CH₃)₂]–[C(=O)–NH]–CH(CH₂–SH)–C(=O)–OH + 4 H₂O. Výsledkem je lineární pentapeptid, tedy oligopeptid z pěti aminokyselinových zbytků. Název: fenylalanylalanylglycylvalylcystein. Pro čitelnost rozděleno: fenylalanyl–alanyl–glycyl–valyl–cystein. První čtyři zbytky mají zakončení -yl, poslední zůstává cystein. N-konec pentapeptidu je vlevo: volná aminová skupina H₂N– u fenylalaninového zbytku. C-konec je vpravo: volná karboxylová skupina –C(=O)–OH cysteinového zbytku. Čtyři peptidové vazby jsou mezi Phe/Ala, Ala/Gly, Gly/Val a Val/Cys. U každé vyznačené skupiny [C(=O)–NH] je vlastní peptidovou vazbou spojení karbonylového uhlíku s dusíkem, C–N.",
        "2) Ser–Ala–Gly: úplná školní kondenzační rovnice v neiontové formě: H₂N–CH(CH₂–OH)–C(=O)–OH + H₂N–CH(CH₃)–C(=O)–OH + H₂N–CH₂–C(=O)–OH → H₂N–CH(CH₂–OH)–[C(=O)–NH]–CH(CH₃)–[C(=O)–NH]–CH₂–C(=O)–OH + 2 H₂O. Výsledkem je lineární tripeptid, tedy oligopeptid ze tří aminokyselinových zbytků. Název: serylalanylglycin, pro čitelnost seryl–alanyl–glycin. N-konec je volná H₂N– skupina serinového zbytku vlevo, C-konec volná –C(=O)–OH glycinového zbytku vpravo. Dvě peptidové vazby leží mezi Ser/Ala a Ala/Gly; v obou [C(=O)–NH] označ spojení C–N.",
        "Obě rovnice čti od N-konce k C-konci. Hranaté závorky vyznačují peptidové skupiny a nejsou další chemickou součástí molekuly. V amfiontovém zápisu se volný N-konec píše H₃N⁺– a C-konec –COO⁻; vnitřní amidové skupiny zůstávají v uvedeném zápisu –C(=O)–NH–. Přiložené již ověřené PDF obsahuje obě úplná řešení, včetně iontových produktů a vyznačení vazeb. Jde o formální kondenzační model, nikoli tvrzení, že pouhé smíchání aminokyselin ve vodě samo poskytne předepsanou sekvenci."
      ],
      "steps": [
        "Bez nápovědy nakresli obecný vzorec a amfion; vysvětli R, pI a rozdíl mezi chemickým tříděním a esenciálností.",
        "Na konkrétních příkladech vysvětli kódované aminokyseliny, stavební funkci, peptid a bílkovinu.",
        "Sestav oba vzorové peptidy od N-konce k C-konci, zachovej postranní řetězce a označ každou vazbu C–N.",
        "Ověř názvy a počty: Phe–Ala–Gly–Val–Cys je pentapeptid se 4 vazbami a 4 H₂O; Ser–Ala–Gly je tripeptid se 2 vazbami a 2 H₂O."
      ]
    },
    "solutions": [
      {
        "id": "aminokyseliny-peptidy-reseni",
        "title": "Aminokyseliny: vypracované rovnice a vysvětlení",
        "format": "pdf",
        "sha256": "c6af08874f14c5079caae58c7c131366cf1cfcf675d1fc6b4eba4e745b106266",
        "size": 89247,
        "url": "https://github.com/hphugosm/study/releases/download/studylo-learning-v1/c6af08874f14c5079caae58c7c131366cf1cfcf675d1fc6b4eba4e745b106266.pdf",
        "source_refs": [
          {
            "id": "ae8ed6e348e68c331ae6bb7377c5adeef235c196d553a335407f417cb98df546",
            "sha256": "9ecc12b5eb5ae76fa4f3993bd7777c975cb561da68bbedff36434c386f2c9a83",
            "locator": "horní příklad Phe–Ala–Gly–Val–Cys a dolní příklad Ser–Ala–Gly"
          },
          {
            "id": "f83a97b0a6a7b497852373f9cbdea73a56cd9829712d676fb748ef8009f70696",
            "sha256": "2cc2c6e39cccf9b5b828a4314fe5841fb3882890949ebee54440c80dfe0aa467",
            "page": 3
          },
          {
            "id": "f83a97b0a6a7b497852373f9cbdea73a56cd9829712d676fb748ef8009f70696",
            "sha256": "2cc2c6e39cccf9b5b828a4314fe5841fb3882890949ebee54440c80dfe0aa467",
            "page": 6
          }
        ]
      }
    ],
    "source_refs": [
      {
        "id": "f83a97b0a6a7b497852373f9cbdea73a56cd9829712d676fb748ef8009f70696",
        "sha256": "2cc2c6e39cccf9b5b828a4314fe5841fb3882890949ebee54440c80dfe0aa467",
        "page": 2
      },
      {
        "id": "f83a97b0a6a7b497852373f9cbdea73a56cd9829712d676fb748ef8009f70696",
        "sha256": "2cc2c6e39cccf9b5b828a4314fe5841fb3882890949ebee54440c80dfe0aa467",
        "page": 3
      },
      {
        "id": "f83a97b0a6a7b497852373f9cbdea73a56cd9829712d676fb748ef8009f70696",
        "sha256": "2cc2c6e39cccf9b5b828a4314fe5841fb3882890949ebee54440c80dfe0aa467",
        "page": 4
      },
      {
        "id": "f83a97b0a6a7b497852373f9cbdea73a56cd9829712d676fb748ef8009f70696",
        "sha256": "2cc2c6e39cccf9b5b828a4314fe5841fb3882890949ebee54440c80dfe0aa467",
        "page": 5
      },
      {
        "id": "f83a97b0a6a7b497852373f9cbdea73a56cd9829712d676fb748ef8009f70696",
        "sha256": "2cc2c6e39cccf9b5b828a4314fe5841fb3882890949ebee54440c80dfe0aa467",
        "page": 6
      },
      {
        "id": "f83a97b0a6a7b497852373f9cbdea73a56cd9829712d676fb748ef8009f70696",
        "sha256": "2cc2c6e39cccf9b5b828a4314fe5841fb3882890949ebee54440c80dfe0aa467",
        "page": 7
      },
      {
        "id": "0209b994ca57d64b5ba635aab2784aa77e9ff32182f43085d8655ea7fcda738f",
        "sha256": "77e0ce74fb2daff9e49b7e8fe6e2fb125514936ce979fee9b32e560e6317536f",
        "locator": "otázky ke kódovaným aminokyselinám a tvorbě peptidů"
      },
      {
        "id": "ae8ed6e348e68c331ae6bb7377c5adeef235c196d553a335407f417cb98df546",
        "sha256": "9ecc12b5eb5ae76fa4f3993bd7777c975cb561da68bbedff36434c386f2c9a83",
        "locator": "horní příklad Phe–Ala–Gly–Val–Cys a dolní příklad Ser–Ala–Gly"
      }
    ]
  }
]);
