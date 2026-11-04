// Original study definitions and examples. S1-S8 identify supplied files;
// E1-E14 refer to the external source key in the English study guide.
export const vocabulary = [
  {
    id: 'vocab-segregation',
    term: 'segregate / segregation',
    definition: 'Separate people into groups, here on the basis of race.',
    translation: 'oddělovat / segregace, zde rasové oddělování',
    example: 'Public schools segregated children by race.',
    category: 'rights', source: 'S6 p. 1; S8 p. 1', provenance: 'supplied'
  },
  {
    id: 'vocab-facility',
    term: 'facility / facilities',
    definition: 'A building, service or equipment provided for a particular purpose.',
    translation: 'zařízení, budova nebo vybavení pro určitý účel',
    example: 'The case concerned separate school facilities.',
    category: 'rights', source: 'S6 p. 1; S8 p. 1', provenance: 'supplied'
  },
  {
    id: 'vocab-precedent',
    term: 'precedent',
    definition: 'An earlier judicial decision used when resolving similar legal questions.',
    translation: 'precedent; dřívější rozhodnutí směrodatné pro podobné případy',
    example: 'Plessy established a precedent supporting segregation.',
    category: 'law', source: 'S1 slide 11; S5 p. 1; S8 p. 1', provenance: 'supplied'
  },
  {
    id: 'vocab-sue',
    term: 'sue / sued',
    definition: 'Bring a civil legal claim against another person or organisation in court.',
    translation: 'žalovat / podal či podala žalobu',
    example: 'The parents sued the school board.',
    category: 'courts', source: 'S8 p. 1', provenance: 'supplied'
  },
  {
    id: 'vocab-appeal',
    term: 'appeal / appealed',
    definition: 'Ask a higher court to review a lower court’s decision.',
    translation: 'odvolat se; odvolání / odvolal či odvolala se',
    example: 'The losing party appealed the decision.',
    category: 'appeals', source: 'S2 slides 13-16; S5 p. 1; S8 p. 1', provenance: 'supplied'
  },
  {
    id: 'vocab-supreme-court',
    term: 'U.S. Supreme Court',
    definition: 'The highest court in the federal judicial system.',
    translation: 'Nejvyšší soud Spojených států',
    example: 'The U.S. Supreme Court decided Brown in 1954.',
    category: 'courts', source: 'S2 slide 16; S5 p. 1', provenance: 'supplied'
  },
  {
    id: 'vocab-district-court',
    term: 'U.S. District Court',
    definition: 'A federal trial court where cases ordinarily begin.',
    translation: 'federální soud prvního stupně',
    example: 'The plaintiff filed the federal claim in a U.S. District Court.',
    category: 'courts', source: 'S2 slide 4; S5 p. 1', provenance: 'supplied'
  },
  {
    id: 'vocab-court-of-appeals',
    term: 'Court of Appeals',
    definition: 'A court that reviews decisions made by lower courts.',
    translation: 'odvolací soud',
    example: 'A Court of Appeals can affirm, reverse or remand a case.',
    category: 'courts', source: 'S2 slides 13-15; S5 p. 1', provenance: 'supplied'
  },
  {
    id: 'vocab-trial-court',
    term: 'trial court',
    definition: 'A court that initially hears evidence and determines the facts of a case.',
    translation: 'soud prvního stupně; nalézací soud',
    example: 'The trial court heard the witnesses before reaching its decision.',
    category: 'courts', source: 'S2 slides 4 and 18', provenance: 'supplied'
  },
  {
    id: 'vocab-appellate-court',
    term: 'appellate court',
    definition: 'A court that examines a lower court’s decision on review.',
    translation: 'odvolací soud; soud přezkoumávající rozhodnutí nižšího soudu',
    example: 'The appellate court normally works from the existing trial record.',
    category: 'appeals', source: 'S2 slides 14-15 and 19', provenance: 'supplied'
  },
  {
    id: 'vocab-jurisdiction',
    term: 'jurisdiction',
    definition: 'A court’s legal authority to hear and decide a case.',
    translation: 'pravomoc soudu projednat a rozhodnout věc',
    example: 'A court must have jurisdiction before it can decide the dispute.',
    category: 'courts', source: 'S2 slides 8-10', provenance: 'supplied'
  },
  {
    id: 'vocab-amount-in-controversy',
    term: 'amount in controversy',
    definition: 'The monetary value at issue in a legal dispute.',
    translation: 'peněžní hodnota předmětu sporu',
    example: 'Ordinary diversity jurisdiction requires an amount in controversy above $75,000.',
    category: 'courts', source: 'S2 slide 10', provenance: 'supplied'
  },
  {
    id: 'vocab-plaintiff',
    term: 'plaintiff',
    definition: 'The party who brings a civil lawsuit.',
    translation: 'žalobce v občanskoprávním řízení',
    example: 'The plaintiff asks the court to provide a legal remedy.',
    category: 'courts', source: 'S2 slide 18; S5 p. 1', provenance: 'supplied'
  },
  {
    id: 'vocab-defendant',
    term: 'defendant',
    definition: 'The party being sued; in a criminal case, the person accused.',
    translation: 'žalovaný; v trestním řízení obžalovaný',
    example: 'The school board was the defendant in the civil lawsuit.',
    category: 'courts', source: 'S2 slide 18; S5 p. 1; E7', provenance: 'added'
  },
  {
    id: 'vocab-appellant',
    term: 'appellant',
    definition: 'The party asking a higher court to review a decision.',
    translation: 'odvolatel; strana podávající odvolání',
    example: 'After losing at trial, the plaintiff became the appellant.',
    category: 'appeals', source: 'S2 slide 14; S5 p. 1', provenance: 'supplied'
  },
  {
    id: 'vocab-appellee',
    term: 'appellee',
    definition: 'The party opposing the appellant in an appeal.',
    translation: 'protistrana odvolatele v odvolacím řízení',
    example: 'The appellee asked the appellate court to affirm the judgment.',
    category: 'appeals', source: 'S2 slide 14; S5 p. 1', provenance: 'supplied'
  },
  {
    id: 'vocab-verdict',
    term: 'verdict',
    definition: 'A trial determination about the facts or guilt, typically made by a jury.',
    translation: 'výrok o skutkových otázkách či vině, typicky porotní',
    example: 'The jury returned a verdict after considering the evidence.',
    category: 'courts', source: 'S5 p. 1; E7', provenance: 'added'
  },
  {
    id: 'vocab-judgment',
    term: 'judgment',
    definition: 'The court’s formal decision resolving the parties’ dispute.',
    translation: 'formální soudní rozhodnutí řešící spor',
    example: 'The appellate court reviewed the judgment entered by the trial court.',
    category: 'courts', source: 'E7', provenance: 'added'
  },
  {
    id: 'vocab-affirm',
    term: 'affirm',
    definition: 'Allow the challenged lower-court decision to stand.',
    translation: 'potvrdit rozhodnutí nižšího soudu',
    example: 'The court of appeals affirmed the trial court’s decision.',
    category: 'appeals', source: 'S2 slide 15; S5 p. 1', provenance: 'supplied'
  },
  {
    id: 'vocab-reverse',
    term: 'reverse',
    definition: 'Overturn the decision in the particular case under review.',
    translation: 'zvrátit rozhodnutí v konkrétní přezkoumávané věci',
    example: 'In Gobitis, the Supreme Court reversed the lower-court result.',
    category: 'appeals', source: 'S2 slide 15; S5 p. 1; example: E2', provenance: 'supplied'
  },
  {
    id: 'vocab-remand',
    term: 'remand',
    definition: 'Send a case back to a lower court for further proceedings.',
    translation: 'vrátit věc nižšímu soudu k dalšímu řízení',
    example: 'A remand does not automatically restart the whole case.',
    category: 'appeals', source: 'S2 slide 15; correction to S5 step 6; E7', provenance: 'corrected'
  },
  {
    id: 'vocab-certiorari',
    term: 'writ of certiorari',
    definition: 'An order calling for a lower court’s record for review; a petition requests that order.',
    translation: 'příkaz nižšímu soudu k předložení spisu k přezkumu',
    example: 'The losing party filed a petition for a writ of certiorari.',
    category: 'appeals', source: 'S2 slide 16; S5 p. 1; E7', provenance: 'added'
  },
  {
    id: 'vocab-landmark',
    term: 'landmark decision',
    definition: 'A particularly significant ruling with an important effect on the law.',
    translation: 'přelomové či zásadní soudní rozhodnutí',
    example: 'Brown is a landmark decision about racial equality in public education.',
    category: 'law', source: 'S5 step 8; S6 p. 1', provenance: 'corrected'
  },
  {
    id: 'vocab-constitutional-law',
    term: 'constitutional law',
    definition: 'Law concerning constitutions, government powers and individual rights.',
    translation: 'ústavní právo',
    example: 'The meaning of the Equal Protection Clause is a constitutional-law question.',
    category: 'law', source: 'S1 slides 3 and 5', provenance: 'supplied'
  },
  {
    id: 'vocab-statutory-law',
    term: 'statute / statutory law',
    definition: 'A law passed by a legislature; statutory law consists of such laws.',
    translation: 'zákon / zákonné právo',
    example: 'Louisiana’s Separate Car Act was a statute.',
    category: 'law', source: 'S1 slide 6; S7 p. 1', provenance: 'supplied'
  },
  {
    id: 'vocab-administrative-law',
    term: 'administrative law',
    definition: 'Law governing the authority, procedures and actions of public agencies.',
    translation: 'správní právo',
    example: 'Administrative law defines the powers of a government agency.',
    category: 'law', source: 'S1 slide 10', provenance: 'supplied'
  },
  {
    id: 'vocab-case-law',
    term: 'case law',
    definition: 'Legal rules and interpretations developed through judicial decisions.',
    translation: 'judikatura; právo rozvíjené soudními rozhodnutími',
    example: 'Case law develops as courts interpret legislation and the Constitution.',
    category: 'law', source: 'S1 slide 11', provenance: 'supplied'
  },
  {
    id: 'vocab-amendment',
    term: 'amendment',
    definition: 'A formal change or addition to a constitution.',
    translation: 'dodatek k ústavě',
    example: 'Brown relied on the Fourteenth Amendment.',
    category: 'law', source: 'S1 slide 3; S6 p. 1', provenance: 'supplied'
  },
  {
    id: 'vocab-bill-of-rights',
    term: 'Bill of Rights',
    definition: 'The first ten amendments to the U.S. Constitution.',
    translation: 'Listina práv; prvních deset dodatků Ústavy USA',
    example: 'The First Amendment is part of the Bill of Rights.',
    category: 'rights', source: 'S1 slide 3', provenance: 'supplied'
  },
  {
    id: 'vocab-bill',
    term: 'bill',
    definition: 'A proposed law presented to a legislature.',
    translation: 'návrh zákona',
    example: 'Both chambers of Congress must pass the same bill text.',
    category: 'law', source: 'S1 slide 7; corrected example: E6', provenance: 'supplied'
  },
  {
    id: 'vocab-veto',
    term: 'veto',
    definition: 'The President’s rejection of a bill passed by Congress.',
    translation: 'prezidentské veto; odmítnutí schváleného návrhu zákona',
    example: 'A presidential veto can prevent a bill from becoming law unless Congress overrides it.',
    category: 'law', source: 'S1 slide 7; E6', provenance: 'supplied'
  },
  {
    id: 'vocab-due-process',
    term: 'due process of law',
    definition: 'Legal protection against arbitrary government action.',
    translation: 'řádný zákonný proces; ochrana před svévolnými zásahy státu',
    example: 'Due process requires government to respect legal safeguards.',
    category: 'rights', source: 'S1 slide 12', provenance: 'supplied'
  },
  {
    id: 'vocab-procedural-due-process',
    term: 'procedural due process',
    definition: 'The requirement for fair procedures when government affects protected rights.',
    translation: 'procesní záruky řádného zákonného procesu',
    example: 'Procedural due process concerns how a government decision is made.',
    category: 'rights', source: 'S1 slide 12', provenance: 'supplied'
  },
  {
    id: 'vocab-substantive-due-process',
    term: 'substantive due process',
    definition: 'Limits on government interference with certain protected rights, even when procedures are followed.',
    translation: 'hmotněprávní ochrana určitých práv před nepřípustnými zásahy státu',
    example: 'Substantive due process concerns what government may do, not only its procedures.',
    category: 'rights', source: 'Precision correction to S1 slide 12', provenance: 'corrected'
  },
  {
    id: 'vocab-adversarial-system',
    term: 'adversarial system',
    definition: 'A system in which opposing parties present their cases before a court.',
    translation: 'systém protistran; adversární soudní systém',
    example: 'In an adversarial system, each side presents its legal arguments.',
    category: 'law', source: 'S1 slide 13', provenance: 'supplied'
  },
  {
    id: 'vocab-presumption-of-innocence',
    term: 'presumption of innocence',
    definition: 'Treating a criminal defendant as innocent until guilt is proved.',
    translation: 'presumpce neviny',
    example: 'The presumption of innocence does not require the defendant to prove innocence.',
    category: 'rights', source: 'S1 slide 13; clarification of criminal context', provenance: 'supplied'
  },
  {
    id: 'vocab-burden-of-proof',
    term: 'burden of proof',
    definition: 'The responsibility to establish a claim with sufficient evidence.',
    translation: 'důkazní břemeno',
    example: 'The prosecution bears the burden of proving guilt in a criminal case.',
    category: 'courts', source: 'S1 slide 13', provenance: 'supplied'
  },
  {
    id: 'vocab-prosecution',
    term: 'prosecution',
    definition: 'The government side bringing a criminal case.',
    translation: 'obžaloba; strana veřejné žaloby v trestním řízení',
    example: 'The prosecution presents evidence supporting the criminal charge.',
    category: 'courts', source: 'S1 slide 13', provenance: 'supplied'
  },
  {
    id: 'vocab-separate-but-equal',
    term: 'separate but equal',
    definition: 'The doctrine accepting racial separation if separate facilities were supposedly equal.',
    translation: 'oddělené, ale rovné; segregační doktrína z případu Plessy',
    example: 'Brown rejected separate but equal in public education.',
    category: 'rights', source: 'S6 p. 1; S7 pp. 1-2', provenance: 'supplied'
  },
  {
    id: 'vocab-equal-protection',
    term: 'Equal Protection Clause',
    definition: 'The Fourteenth Amendment’s rule against a state denying equal legal protection to persons within its jurisdiction.',
    translation: 'ustanovení 14. dodatku o rovné ochraně zákonů',
    example: 'The Equal Protection Clause protects persons, not only U.S. citizens.',
    category: 'rights', source: 'S6 p. 1; correction to S8 question 1; E6b', provenance: 'corrected'
  },
  {
    id: 'vocab-civil-rights',
    term: 'civil rights',
    definition: 'Rights protecting equal treatment and participation without unlawful discrimination.',
    translation: 'občanská práva; práva na rovné zacházení a ochranu před diskriminací',
    example: 'Brown is a landmark civil-rights decision.',
    category: 'rights', source: 'S4 slide 3; added distinction in study guide', provenance: 'added'
  },
  {
    id: 'vocab-civil-liberties',
    term: 'civil liberties',
    definition: 'Fundamental freedoms protected against government interference.',
    translation: 'občanské svobody chránící před zásahy státu',
    example: 'Freedom of expression is a civil liberty.',
    category: 'rights', source: 'S4 slides 2-3', provenance: 'supplied'
  },
  {
    id: 'vocab-compelled-speech',
    term: 'compelled speech',
    definition: 'Expression that government requires a person to make or affirm.',
    translation: 'státem vynucený projev',
    example: 'Barnette protected pupils against compelled patriotic speech.',
    category: 'rights', source: 'E3; E14', provenance: 'added'
  },
  {
    id: 'vocab-overrule',
    term: 'overrule a precedent',
    definition: 'Reject an earlier case’s legal rule as a precedent.',
    translation: 'překonat precedent; odmítnout dřívější právní pravidlo',
    example: 'Barnette overruled Gobitis as a precedent.',
    category: 'law', source: 'E3; E14', provenance: 'added'
  },
  {
    id: 'vocab-dissent',
    term: 'dissent / dissenting opinion',
    definition: 'A judge’s explanation of disagreement with the court’s majority.',
    translation: 'nesouhlas / nesouhlasné soudcovské stanovisko',
    example: 'Justice Harlan wrote the dissent in Plessy.',
    category: 'courts', source: 'S7 p. 1', provenance: 'supplied'
  },
  {
    id: 'vocab-federal-question',
    term: 'federal question jurisdiction',
    definition: 'Authority to hear a claim arising under the U.S. Constitution or federal law.',
    translation: 'pravomoc soudu založená na otázce federálního práva',
    example: 'A claim under the U.S. Constitution may raise a federal question.',
    category: 'courts', source: 'S2 slides 8-9', provenance: 'supplied'
  },
  {
    id: 'vocab-diversity-jurisdiction',
    term: 'diversity jurisdiction',
    definition: 'Federal authority to hear certain civil disputes involving different state citizenship and an amount above $75,000.',
    translation: 'pravomoc federálního soudu při určité různosti státního občanství stran',
    example: 'Diversity jurisdiction can allow a federal court to apply state law.',
    category: 'courts', source: 'S2 slide 10', provenance: 'supplied'
  },
  {
    id: 'vocab-complete-diversity',
    term: 'complete diversity',
    definition: 'No plaintiff shares state citizenship with any defendant in an ordinary diversity case.',
    translation: 'úplná různost státního občanství mezi žalobci a žalovanými',
    example: 'Ordinary diversity jurisdiction requires complete diversity between the opposing sides.',
    category: 'courts', source: 'E9; E9b', provenance: 'added'
  },
  {
    id: 'vocab-majority-opinion',
    term: 'majority opinion',
    definition: 'The court’s explanation supported by a majority of the participating judges.',
    translation: 'většinové stanovisko soudu',
    example: 'Justice Henry Brown wrote the majority opinion in Plessy.',
    category: 'courts', source: 'S7 p. 1', provenance: 'supplied'
  },
  {
    id: 'vocab-freedom-of-speech',
    term: 'freedom of speech',
    definition: 'Constitutional protection for expression against improper government restriction or compulsion.',
    translation: 'svoboda projevu',
    example: 'Barnette protected freedom of speech by rejecting a compulsory affirmation.',
    category: 'rights', source: 'S4 slide 4; added Barnette connection: E3', provenance: 'added'
  },
  {
    id: 'vocab-free-exercise',
    term: 'free exercise of religion',
    definition: 'The First Amendment freedom to practise religion without unconstitutional government interference.',
    translation: 'svobodný výkon náboženství',
    example: 'The Gobitas family raised a religious-liberty objection in Gobitis.',
    category: 'rights', source: 'S3 Gobitas questions; added answer: E2', provenance: 'added'
  },
  {
    id: 'vocab-injunction',
    term: 'injunction',
    definition: 'A court order requiring or restraining a particular action.',
    translation: 'soudní příkaz nebo zákaz určitého jednání',
    example: 'In Barnette, the Supreme Court affirmed the lower court’s injunction.',
    category: 'courts', source: 'E3; E13', provenance: 'added'
  },
  {
    id: 'vocab-expulsion',
    term: 'expulsion',
    definition: 'Removal of a pupil from a school as a disciplinary measure.',
    translation: 'vyloučení ze školy',
    example: 'The Gobitas children faced expulsion after refusing the flag salute.',
    category: 'rights', source: 'E12', provenance: 'added'
  },
  {
    id: 'vocab-inherently-unequal',
    term: 'inherently unequal',
    definition: 'Unequal because of its very nature, rather than only its material conditions.',
    translation: 'ze své podstaty nerovné',
    example: 'Brown held that segregated public education is inherently unequal.',
    category: 'rights', source: 'S6 p. 1', provenance: 'supplied'
  },
  {
    id: 'vocab-national-unity',
    term: 'national unity',
    definition: 'A sense of shared belonging and commitment within a nation.',
    translation: 'národní jednota; pocit společné sounáležitosti',
    example: 'The Gobitis majority treated national unity as an educational objective.',
    category: 'rights', source: 'E2; E14', provenance: 'added'
  }
];
