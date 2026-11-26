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
    "assignmentId": "388c23412e6d71ff7777c0e5c560c07bb8eed4b4f1b0f993b6ca6a01ea928f99",
    "version": "11ad4ee7ac33de19f3cb52e2b1b56d0d7b4337b3e191ac3a39cea239cea94e90",
    "subject": "area-studies",
    "topic": "section-57ebae4359c71a17acb53e96ea8717bd",
    "reviewed": true,
    "reviewed_on": "2026-11-26",
    "prompt": "As promised, please find the article attached that we started to read today during class on one native student's take on the history of Thanksgiving. Read it and answer the questions on the second attached document as well. Once finished, please bring the document with the answers to the questions to our next class so I can give you credit.\n\nAs usual, just let me know if you have any questions!\n\nAttached worksheet\n1) Why did the author feel uncomfortable during Thanksgiving celebrations at elementary school?\n2) What was the significance of the first Thanksgiving in 1621, according to the article?\n3) How did the Wampanoag people help the Pilgrims survive?\n4) Why did the relationship between Indigenous peoples and European settlers eventually deteriorate?\n5) What does the author suggest people should do to make Thanksgiving more meaningful?\n6) Do you think schools should change the way they teach children about Thanksgiving? Why or why not?\n7) How important is it for modern societies to acknowledge historical injustices, even when they happened hundreds of years ago?",
    "solution": {
      "paragraphs": [
        "Explained model study answers to the complete seven-question worksheet. Questions 1–5 interpret Jeremy Harley’s guest opinion It’s Time to Move Past the Thanksgiving Myth (27 November 2024); this is not a separate historical fact check or an official teacher key. Read the article yourself. The positions in questions 6–7 are examples to adapt, not statements of your personal opinion. Article attribution and publisher link: https://nativenewsonline.net/opinion/it-s-time-to-move-past-the-thanksgiving-myth/ .",
        "1) Why did the author feel uncomfortable during Thanksgiving celebrations at elementary school?",
        "He felt excluded: classmates performed simplified Indigenous stereotypes, while the lesson presented peaceful cooperation and ignored his community’s suffering. Nobody asked for his perspective.",
        "Explanation: Connect the classroom activities with the missing Indigenous voice; it was more than disliking a holiday.",
        "2) What was the significance of the first Thanksgiving in 1621, according to the article?",
        "The article presents the 1621 meal as a temporary accommodation between the Wampanoag and the Pilgrims, rather than evidence of lasting equality or harmony.",
        "Explanation: This is the author’s interpretation. A shared meal should not be treated as proof that later colonial relationships were peaceful.",
        "3) How did the Wampanoag people help the Pilgrims survive?",
        "They shared practical knowledge about obtaining food and living in the local environment, including farming, hunting and finding their way around.",
        "Explanation: Name the concrete help described, rather than merely saying that they were friendly.",
        "4) Why did the relationship between Indigenous peoples and European settlers eventually deteriorate?",
        "According to the author, settlers increasingly wanted Indigenous land and ignored agreements once Indigenous assistance was less useful to them. Dispossession and violence undermined cooperation.",
        "Explanation: Explain the change from mutual dependence to unequal power; avoid presenting all Indigenous communities as one interchangeable group.",
        "5) What does the author suggest people should do to make Thanksgiving more meaningful?",
        "He recommends learning from Indigenous communities, investigating local history and reflecting on continuing harms. He still celebrates with his family, so his proposal is informed reflection rather than simply abolishing Thanksgiving.",
        "Explanation: Include both historical learning and listening to living communities; notice the final paragraphs’ distinction between changing understanding and abandoning family traditions.",
        "6) Do you think schools should change the way they teach children about Thanksgiving? Why or why not?",
        "One possible response: yes. Lessons should include Indigenous accounts alongside familiar traditions, explain the later conflicts and avoid costume stereotypes. Children can discuss gratitude while also asking whose experiences a story leaves out.",
        "Explanation: This is an example argument, not the learner’s personal opinion or a uniquely correct answer. Support your own view with a specific example from the article.",
        "7) How important is it for modern societies to acknowledge historical injustices, even when they happened hundreds of years ago?",
        "One possible response: acknowledging past injustice matters because it can explain present relationships and challenge misleading public stories. Recognition should involve listening to affected communities and examining evidence, rather than assuming that an apology alone resolves every harm.",
        "Explanation: This is a model position open to reasoned disagreement. Distinguish historical responsibility from blaming every person alive today, and explain your reasoning."
      ],
      "steps": [
        "Read the complete article, keeping track of the author’s perspective.",
        "Answer all five comprehension questions using the article.",
        "Review the two model discussion positions and develop your own supported answers.",
        "Bring the document with your answers to the next class. Nothing has been submitted to Moodle."
      ]
    },
    "source_refs": [
      {
        "id": "59198fe8b258a8ad4b2bb27a78ce52b581b6de10bf809bda5f9a2484e4366226",
        "sha256": "0f6f6b99cc019ff6da097caf99045de9d61ae7074618e480842b080e42d91105",
        "locator": "THANKSGIVING ARTICLE QUESTIONS, Part 1, question 1"
      },
      {
        "id": "59198fe8b258a8ad4b2bb27a78ce52b581b6de10bf809bda5f9a2484e4366226",
        "sha256": "0f6f6b99cc019ff6da097caf99045de9d61ae7074618e480842b080e42d91105",
        "locator": "THANKSGIVING ARTICLE QUESTIONS, Part 1, question 2"
      },
      {
        "id": "59198fe8b258a8ad4b2bb27a78ce52b581b6de10bf809bda5f9a2484e4366226",
        "sha256": "0f6f6b99cc019ff6da097caf99045de9d61ae7074618e480842b080e42d91105",
        "locator": "THANKSGIVING ARTICLE QUESTIONS, Part 1, question 3"
      },
      {
        "id": "59198fe8b258a8ad4b2bb27a78ce52b581b6de10bf809bda5f9a2484e4366226",
        "sha256": "0f6f6b99cc019ff6da097caf99045de9d61ae7074618e480842b080e42d91105",
        "locator": "THANKSGIVING ARTICLE QUESTIONS, Part 1, question 4"
      },
      {
        "id": "59198fe8b258a8ad4b2bb27a78ce52b581b6de10bf809bda5f9a2484e4366226",
        "sha256": "0f6f6b99cc019ff6da097caf99045de9d61ae7074618e480842b080e42d91105",
        "locator": "THANKSGIVING ARTICLE QUESTIONS, Part 1, question 5"
      },
      {
        "id": "59198fe8b258a8ad4b2bb27a78ce52b581b6de10bf809bda5f9a2484e4366226",
        "sha256": "0f6f6b99cc019ff6da097caf99045de9d61ae7074618e480842b080e42d91105",
        "locator": "THANKSGIVING ARTICLE QUESTIONS, Part 2, question 1"
      },
      {
        "id": "59198fe8b258a8ad4b2bb27a78ce52b581b6de10bf809bda5f9a2484e4366226",
        "sha256": "0f6f6b99cc019ff6da097caf99045de9d61ae7074618e480842b080e42d91105",
        "locator": "THANKSGIVING ARTICLE QUESTIONS, Part 2, question 2"
      }
    ],
    "solutions": [
      {
        "id": "thanksgiving-article-study-answers",
        "title": "Thanksgiving article — seven explained model answers",
        "format": "docx",
        "sha256": "e7b2812bb98049fe25f2aadea9fb56bdb326057e1e419b9a18a6a6b384d30e9b",
        "size": 37768,
        "url": "https://github.com/hphugosm/study/releases/download/studylo-learning-v1/e7b2812bb98049fe25f2aadea9fb56bdb326057e1e419b9a18a6a6b384d30e9b.docx",
        "source_refs": [
          {
            "id": "59198fe8b258a8ad4b2bb27a78ce52b581b6de10bf809bda5f9a2484e4366226",
            "sha256": "0f6f6b99cc019ff6da097caf99045de9d61ae7074618e480842b080e42d91105",
            "locator": "THANKSGIVING ARTICLE QUESTIONS, Part 1, question 1"
          },
          {
            "id": "59198fe8b258a8ad4b2bb27a78ce52b581b6de10bf809bda5f9a2484e4366226",
            "sha256": "0f6f6b99cc019ff6da097caf99045de9d61ae7074618e480842b080e42d91105",
            "locator": "THANKSGIVING ARTICLE QUESTIONS, Part 1, question 2"
          },
          {
            "id": "59198fe8b258a8ad4b2bb27a78ce52b581b6de10bf809bda5f9a2484e4366226",
            "sha256": "0f6f6b99cc019ff6da097caf99045de9d61ae7074618e480842b080e42d91105",
            "locator": "THANKSGIVING ARTICLE QUESTIONS, Part 1, question 3"
          },
          {
            "id": "59198fe8b258a8ad4b2bb27a78ce52b581b6de10bf809bda5f9a2484e4366226",
            "sha256": "0f6f6b99cc019ff6da097caf99045de9d61ae7074618e480842b080e42d91105",
            "locator": "THANKSGIVING ARTICLE QUESTIONS, Part 1, question 4"
          },
          {
            "id": "59198fe8b258a8ad4b2bb27a78ce52b581b6de10bf809bda5f9a2484e4366226",
            "sha256": "0f6f6b99cc019ff6da097caf99045de9d61ae7074618e480842b080e42d91105",
            "locator": "THANKSGIVING ARTICLE QUESTIONS, Part 1, question 5"
          },
          {
            "id": "59198fe8b258a8ad4b2bb27a78ce52b581b6de10bf809bda5f9a2484e4366226",
            "sha256": "0f6f6b99cc019ff6da097caf99045de9d61ae7074618e480842b080e42d91105",
            "locator": "THANKSGIVING ARTICLE QUESTIONS, Part 2, question 1"
          },
          {
            "id": "59198fe8b258a8ad4b2bb27a78ce52b581b6de10bf809bda5f9a2484e4366226",
            "sha256": "0f6f6b99cc019ff6da097caf99045de9d61ae7074618e480842b080e42d91105",
            "locator": "THANKSGIVING ARTICLE QUESTIONS, Part 2, question 2"
          }
        ]
      }
    ]
  },
  {
    "assignmentId": "39591decae9c518bee2de885978d533162b0a696dcff776cbff69a6747770d4f",
    "prompt": "Your homework is to read the rest of Flannery O'Conner's short story \"A Good Man Is Hard to Find\". We will have a basic reading check on the entire story in class on May 5th.",
    "reviewed": true,
    "reviewed_on": "2026-11-20",
    "solution": {
      "paragraphs": [
        "Studijní příprava k četbě, nikoli oficiální klíč ke skutečným kontrolním otázkám. Zadání vyžaduje vlastní dočtení celé povídky; neobsahuje otázky ani soubor k vyplnění. Připravené kontrolní otázky jsou nově vytvořené procvičení. Odevzdání do Moodlu se neprovádí.",
        "Termín kontroly četby: Původní popis uvádí kontrolu četby 5. května bez roku. Nelze z toho určit nový termín testu. Samostatně evidovaný deadline aktivity ponecháváme beze změny.",
        "Od rodinné cesty k nehodě: Rodina jede z Atlanty na Floridu, přestože by babička raději navštívila Tennessee. Vezme s sebou tajně kočku. Později vyláká děti příběhem o ukrytém stříbře a přiměje Baileyho odbočit ke starému domu.",
        "Od rodinné cesty k nehodě: Dům si však pamatuje z Tennessee, nikoli z Georgie. Při náhlém uvědomění pohne zavazadlem, kočka vyskočí Baileymu na rameno a auto havaruje. Odbočka je výsledkem její manipulace, bezprostředním spouštěčem nehody je kočka.",
        "Pomoc se obrátí v ohrožení: Po havárii přijedou tři ozbrojení muži. Babička v jejich vůdci pozná Misfita, o němž četla v novinách. Jeho společníci odvádějí členy rodiny do lesa; výstřely a další dění ukazují jejich zabití. Babička nakonec zůstane s Misfitem sama.",
        "Pomoc se obrátí v ohrožení: Snaží se ho přesvědčit poukazem na slušný původ, dobré vychování, modlitbu a peníze. Na konci ho osloví jako někoho z vlastních dětí a dotkne se jeho ramene; on ji zastřelí. Zdvořilé způsoby v této scéně ostře kontrastují s násilím.",
        "Co znamená být dobrý?: Babička opakovaně spojuje dobro se společenskou úrovní a dávnými časy, ale sama lže a její nostalgie obsahuje rasové předsudky. Příběh tak vystavuje její sebehodnocení zkoušce; hezké vystupování není důkazem dobroty.",
        "Co znamená být dobrý?: Misfit vysvětluje svou přezdívku nepoměrem mezi proviněním a trestem. Jeho sporný výklad vlastní minulosti však není nezávisle ověřeným vypravěčským faktem.",
        "Co znamená být dobrý?: Babiččin poslední dotyk lze číst jako okamžik soucitu a rozpoznání společného lidství. Je to interpretace opřená o náhlou změnu jejího oslovení; nelze z ní vyvodit, že Misfit přijal náboženské obrácení. Jeho závěrečná odpověď společníkovi zpochybňuje dřívější představu, že krutost přináší potěšení."
      ],
      "steps": [
        "Vlastní procvičení 1 — Where does the family intend to go, and where would the grandmother prefer to travel? Odpověď: The planned destination is Florida; the grandmother would prefer east Tennessee. Vysvětlení: Distinguish the family’s original plan from her preference and the later detour.",
        "Vlastní procvičení 2 — How does the grandmother persuade the children to support the detour? Odpověď: She invents a secret-panel story suggesting that hidden family silver could still be in the old house. Vysvětlení: The narrator explicitly identifies this claim as untrue; the prospect of a discovery excites the children.",
        "Vlastní procvičení 3 — What mistake does she realize just before the crash? Odpověď: The remembered house is in Tennessee, not Georgia. Vysvětlení: Her startled movement upsets the luggage; the concealed cat escapes and jumps on Bailey.",
        "Vlastní procvičení 4 — Why is identifying the arriving driver as the Misfit dangerous? Odpověď: The grandmother reveals that she recognizes the escaped criminal, and he indicates that this recognition worsens the family’s position. Vysvětlení: Do not confuse the three armed men with ordinary rescuers.",
        "Vlastní procvičení 5 — Which two companions act with the Misfit? Odpověď: Bobby Lee and Hiram. Vysvětlení: They take family members into the woods while the Misfit remains with the grandmother.",
        "Vlastní procvičení 6 — Why does he call himself the Misfit? Odpověď: He believes that his wrongdoing and the punishment he has suffered do not correspond. Vysvětlení: This is his explanation of himself, not proof that he is innocent or that his account of the past is reliable.",
        "Vlastní procvičení 7 — What happens when the grandmother touches his shoulder? Odpověď: He recoils and shoots her. Vysvětlení: The touch may suggest a sudden recognition of shared humanity, but the violent response is the stated event. Keep interpretation separate from action.",
        "Vlastní procvičení 8 — Does the ending establish that the Misfit has become a good man? Odpověď: No. His final response complicates his earlier connection between cruelty and pleasure, but the story does not establish redemption or lasting reform. Vysvětlení: A change in tone is evidence for discussion, not proof of moral transformation."
      ]
    },
    "source_refs": [],
    "steps": [
      "Dočti povídku v oprávněně dostupném školním zdroji.",
      "Bez nahlížení si obnov pořadí hlavních událostí a příčiny odbočky i havárie.",
      "U interpretace uveď konkrétní dějový důkaz a odliš ji od výroků postav."
    ],
    "subject": "american-literature",
    "topic": "section-b1211e24ac753b629e528c0fc039f0ca",
    "version": "ec8f1dc87bcccb1cf1af332fe3fb96a41e6e1d5c2a9c578ca26c754f27340cd1"
  },
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
  },
  {
    "assignmentId": "bde17ada3c9306f502d6b405a2f70688ea7cd7249b9594436649d7412926c5e6",
    "prompt": "Vypracujte odpovědi na otázky přiložené v příloze.\n\nPřiložený pracovní list Lipidy — otázky 1–10:\n1) Co jsou to lipidy?\n2) Na jaké podskupiny dělíme lipidy?\n3) Co jsou to triacylglyceroly? - chemické složení.\n4) Jaký je rozdíl mezi triacylglycerolem a mastnou kyselinou?\n5) Jaké znáte funkce lipidů v organismu?\n6) Vysvětlete pojem esenciální mastné kyseliny. Jaké znáte dvě hlavní skupiny esenc. MK?\n7) Zapište vzorec kyseliny laurové.\n8) Dají se ze všech lipidů vyrobit mýdla? Dělíme je na nějaké skupiny?\n9) Zapište vzorec kyseliny stearové.\n10) Zapište chemický vzorec glycerolu.",
    "reviewed": true,
    "reviewed_on": "2026-11-26",
    "solution": {
      "paragraphs": [
        "Vzorové studijní řešení všech deseti otázek přiloženého pracovního listu. Úplný aktuálně přečtený popis v Moodlu žádné další požadavky neobsahuje. Nejde o oficiální učitelský klíč ani o potvrzení uživatelova odevzdání.",
        "1) Lipidy jsou chemicky rozmanitá skupina organických látek, které jsou převážně hydrofobní: ve vodě se nerozpouštějí nebo jen málo, zato se rozpouštějí v nepolárních rozpouštědlech. Nejde jen o tuky. Některé, například fosfolipidy, mají nepolární i polární část; tuto vlastnost využívají při stavbě membrán.",
        "2) Ve školním přehledu rozlišujeme triacylglyceroly (tuky), vosky, polární lipidy (např. fosfolipidy) a isoprenoidy včetně steroidů (např. cholesterolu). Podskupiny mají různé stavby i funkce; tuky jsou jen jednou skupinou lipidů.",
        "3) Triacylglyceroly jsou triestery glycerolu a tří mastných kyselin. Každá ze tří hydroxylových skupin glycerolu je spojena esterovou vazbou s acylovým zbytkem mastné kyseliny. Zjednodušená struktura je CH₂[O-C(=O)-R₁]-CH[O-C(=O)-R₂]-CH₂[O-C(=O)-R₃]. R₁, R₂ a R₃ označují uhlovodíkové řetězce; mohou být stejné i různé. Formální bilance vzniku: glycerol + 3 mastné kyseliny → triacylglycerol + 3 H₂O.",
        "4) Mastná kyselina je karboxylová kyselina s uhlovodíkovým řetězcem, obecně R-COOH; má volnou karboxylovou skupinu. Triacylglycerol je naproti tomu ester obsahující glycerolovou část a tři zbytky mastných kyselin. Mastná kyselina tedy není totéž co tuk: při esterifikaci se stává součástí triacylglycerolu a její karboxyl již není volným -COOH.",
        "5) Hlavní funkce lipidů jsou zásobní (zásobárna energie), strukturní (složky biologických membrán), ochranná (mechanická ochrana orgánů) a tepelně izolační. Různé skupiny lipidů plní různé role; nemusí všechny současně plnit tutéž funkci.",
        "6) Esenciální mastné kyseliny si lidský organismus nedokáže vytvořit v potřebné podobě, a proto je musí získat potravou. Základními zástupci jsou kyselina linolová, 18:2 n-6 (omega-6), a kyselina alfa-linolenová, 18:3 n-3 (omega-3, ALA). Dvě požadované skupiny jsou tedy omega-6 a omega-3. Ne každá mastná kyselina z těchto řad je automaticky základní esenciální MK: další jsou odvozené; u některých se podle situace rozlišuje podmíněná esencialita. Upřesnění podkladu: tvrzení na straně 7 prezentace o 20-24 uhlících není obecným pravidlem esenciality; základní LA a ALA mají 18 uhlíků. Primární ověření: NIH Office of Dietary Supplements, Omega-3 Fatty Acids - Health Professional Fact Sheet, https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional/ .",
        "7) Kyselina laurová: CH₃-(CH₂)₁₀-COOH. Sumární vzorec je C₁₂H₂₄O₂. Kontrola uhlíků: 1 v koncovém CH₃ + 10 ve skupinách CH₂ + 1 v COOH = 12. Jde o nasycenou mastnou kyselinu.",
        "8) Ne, mýdlo nelze tímto způsobem vyrobit ze všech lipidů. Zmýdelnitelné lipidy mají štěpitelné esterové vazby a při zásadité hydrolýze poskytují soli mastných kyselin (mýdla); patří sem triacylglyceroly, přírodní esterové vosky a fosfolipidy s esterovými vazbami. Nezmýdelnitelné lipidy takovou esterovou část nemají - příkladem je volný cholesterol a další isoprenoidy. U triacylglycerolu proběhne: triacylglycerol + 3 NaOH → glycerol + R₁COONa + R₂COONa + R₃COONa. Vznikají soli kyselin, nikoli samotné volné mastné kyseliny; to je rozdíl oproti kyselé hydrolýze.",
        "9) Kyselina stearová: CH₃-(CH₂)₁₆-COOH. Sumární vzorec je C₁₈H₃₆O₂. Kontrola uhlíků: 1 + 16 + 1 = 18. Je to nasycená mastná kyselina; oproti laurové má o šest skupin CH₂ delší řetězec.",
        "10) Glycerol: HO-CH₂-CH(OH)-CH₂-OH, sumární vzorec C₃H₈O₃. Má tři hydroxylové skupiny, po jedné na každém uhlíku, proto je to trojsytný alkohol (propan-1,2,3-triol). Ve schématu triacylglycerolu jsou právě tyto tři -OH skupiny esterifikované."
      ]
    },
    "solutions": [
      {
        "format": "docx",
        "id": "lipidy-vypracovane-otazky",
        "sha256": "e5dd1d0551a1298ee4db8478af9bdeb9a38a4172493af926b1db03014c4c89f8",
        "size": 37918,
        "source_refs": [
          {
            "id": "0c4e78fa1e178dbc8b49f36ae06b9e23b7779bf179877de1f5e536aa7562d066",
            "locator": "celý pracovní list, otázky 1–10",
            "page": 1,
            "sha256": "786db8517e1c70489e03eaff1f597a9245b8e63c7ebc23219fc300aa49295431"
          },
          {
            "id": "20cedbe4740735d8350ecfd90b7474d9f703ed3d551f10ce2d4f75e787850618",
            "locator": "výklad a vzorce, strany 2–8, 14–16, 21, 24 a 26",
            "page": 2,
            "sha256": "04d34b04847e8948bcf932f959eb3b14f5300e07a02d591cc45c3b5f166c4912"
          }
        ],
        "title": "Lipidy — všech 10 odpovědí s vysvětlením",
        "url": "https://github.com/hphugosm/study/releases/download/studylo-learning-v1/e5dd1d0551a1298ee4db8478af9bdeb9a38a4172493af926b1db03014c4c89f8.docx"
      }
    ],
    "source_refs": [
      {
        "id": "0c4e78fa1e178dbc8b49f36ae06b9e23b7779bf179877de1f5e536aa7562d066",
        "locator": "celý pracovní list, otázky 1–10",
        "page": 1,
        "sha256": "786db8517e1c70489e03eaff1f597a9245b8e63c7ebc23219fc300aa49295431"
      },
      {
        "id": "20cedbe4740735d8350ecfd90b7474d9f703ed3d551f10ce2d4f75e787850618",
        "locator": "výklad a vzorce, strany 2–8, 14–16, 21, 24 a 26",
        "page": 2,
        "sha256": "04d34b04847e8948bcf932f959eb3b14f5300e07a02d591cc45c3b5f166c4912"
      }
    ],
    "steps": [
      "Přečti všech deset otázek v přiloženém pracovním listu.",
      "Odpovědi s vysvětlením jsou uvedeny níže a ve skutečném vypracovaném souboru DOCX. Výsledek je vzorové studijní řešení, nikoli odevzdání za uživatele."
    ],
    "subject": "chemistry",
    "topic": "section-e50b1d9503439050a4b416599d3b6a19",
    "version": "5598e6c41cf3c6a81968491742feaa7cbaa37cc77b3508af10137d4daa7d7e25"
  },
  {
    "assignmentId": "df69549de7e2b1053fe7a8bf591c0dbbfd473f2237978b1c7794d0e3d0490fbb",
    "prompt": "Pokud zkusíte pokus doma, výsledek vyfoťte a vyplňte přiložený protokol. Za úkol máte 2x +",
    "reviewed": true,
    "reviewed_on": "2026-11-26",
    "source_refs": [
      {
        "id": "c05414ff4aad7aa1c182c8fbbd3f8a9de13ee1b699f34b5fbc1b5e8c66401d38",
        "locator": "pracovní list, vykreslená strana 1: předpoklad, postup, pět pozorování a závěr",
        "page": 1,
        "sha256": "6d227322a848f577095710039e4f8d315d3541330fd63e592ffd43ac1d6a831c"
      }
    ],
    "steps": [
      "Pokud pokus zkusíš doma, podle zadání vyfoť jeho skutečný výsledek a vyplň přiložený protokol.",
      "Vlastní předpoklad zapiš před pokusem. Doplň pět skutečných pozorování po 10 minutách a vlastní závěr podle pracovního listu.",
      "Přiložená studijní příprava obsahuje vysvětlení a formulář; nenahrazuje tvá pozorování, vyplněný osobní protokol ani fotografii.",
      "Údaj „2x +“ je ponechán jako původní text; jeho význam ani pravidla hodnocení zde nevykládáme."
    ],
    "subject": "chemistry",
    "topic": "section-7c81652c3859af6be5d57780191a659f",
    "version": "bd3182c2f790b3af6a9341e5b4bb3a7184147ca0e945ea1fd35c97dd9b2a7808"
  }
]);

// Separately reviewed preparation; actual observations and photograph remain personal inputs.
export const reviewedAssignmentPreparations = [
  {
    "assignmentId": "df69549de7e2b1053fe7a8bf591c0dbbfd473f2237978b1c7794d0e3d0490fbb",
    "description": "Úplný popis úkolu je ověřen. Pokud pokus zkusíš doma, zadání vyžaduje fotografii skutečného výsledku a vyplněný protokol. Příprava obsahuje postup a teorii; vlastní předpoklad, pět pozorování, závěr a fotografii doplň podle svého pokusu.",
    "downloads": [
      {
        "format": "docx",
        "id": "denaturace-bilku-studijni-protokol",
        "sha256": "0121bd65d80461fb15d2b266ae37245fdabe980ade235cf3738fb2ac7b78185c",
        "size": 39437,
        "source_refs": [
          {
            "id": "c05414ff4aad7aa1c182c8fbbd3f8a9de13ee1b699f34b5fbc1b5e8c66401d38",
            "locator": "pracovní list, vykreslená strana 1: předpoklad, postup, pět pozorování a závěr",
            "page": 1,
            "sha256": "6d227322a848f577095710039e4f8d315d3541330fd63e592ffd43ac1d6a831c"
          },
          {
            "id": "08af84fbde7760324a54ab200b49a857463e57261fb83963a0a75793bf37088e",
            "page": 9,
            "sha256": "356c55b3d5dcf04b452f0491636f515ab5c9ea65c97b54441b1e0332fc4d1992"
          },
          {
            "id": "08af84fbde7760324a54ab200b49a857463e57261fb83963a0a75793bf37088e",
            "page": 17,
            "sha256": "356c55b3d5dcf04b452f0491636f515ab5c9ea65c97b54441b1e0332fc4d1992"
          },
          {
            "id": "08af84fbde7760324a54ab200b49a857463e57261fb83963a0a75793bf37088e",
            "page": 24,
            "sha256": "356c55b3d5dcf04b452f0491636f515ab5c9ea65c97b54441b1e0332fc4d1992"
          }
        ],
        "title": "Denaturace bílku — vysvětlení a protokol pro vlastní pozorování",
        "url": "https://github.com/hphugosm/study/releases/download/studylo-learning-v1/0121bd65d80461fb15d2b266ae37245fdabe980ade235cf3738fb2ac7b78185c.docx"
      }
    ],
    "reviewed": true,
    "reviewed_on": "2026-11-26",
    "scope": "attachment-study-preparation",
    "source_refs": [
      {
        "id": "c05414ff4aad7aa1c182c8fbbd3f8a9de13ee1b699f34b5fbc1b5e8c66401d38",
        "locator": "pracovní list, vykreslená strana 1: předpoklad, postup, pět pozorování a závěr",
        "page": 1,
        "sha256": "6d227322a848f577095710039e4f8d315d3541330fd63e592ffd43ac1d6a831c"
      },
      {
        "id": "08af84fbde7760324a54ab200b49a857463e57261fb83963a0a75793bf37088e",
        "page": 9,
        "sha256": "356c55b3d5dcf04b452f0491636f515ab5c9ea65c97b54441b1e0332fc4d1992"
      },
      {
        "id": "08af84fbde7760324a54ab200b49a857463e57261fb83963a0a75793bf37088e",
        "page": 17,
        "sha256": "356c55b3d5dcf04b452f0491636f515ab5c9ea65c97b54441b1e0332fc4d1992"
      },
      {
        "id": "08af84fbde7760324a54ab200b49a857463e57261fb83963a0a75793bf37088e",
        "page": 24,
        "sha256": "356c55b3d5dcf04b452f0491636f515ab5c9ea65c97b54441b1e0332fc4d1992"
      }
    ],
    "subject": "chemistry",
    "title": "Studijní příprava k pracovnímu listu",
    "topic": "section-7c81652c3859af6be5d57780191a659f",
    "version": "bd3182c2f790b3af6a9341e5b4bb3a7184147ca0e945ea1fd35c97dd9b2a7808"
  }
];
