import {courseSubjects,courseUnits} from './course-catalog.js';
/** @typedef {{id:string,name:string,color:string,tint:string,icon:string,description:string}} Subject */
/** @typedef {{id:string,subjectId:string,title:string,label?:string,description:string,module?:string,kind?:'collection',relatedUnitIds?:string[],materials:Array<{title:string,description:string,url:string}>,notes?:Array<string|{title:string,text:string}>}} StudyUnit */
/** @typedef {{id:string,unitId?:string,date:string,type:'test'|'homework'|'review'|'excursion',allDay?:boolean,title:string,description:string}} StudyEvent */

/** @type {Subject[]} */
export const subjects = [
  {id:'biology',name:'Biologie',color:'#4d7659',tint:'#edf3ec',icon:'leaf',description:'Poznej, jak funguje lidské tělo.'},
  {id:'law',name:'Law',color:'#6976a1',tint:'#eff0f8',icon:'scale',description:'Cases, courts & civil liberties.'},
  {id:'mathematics',name:'Matematika',color:'#ac8350',tint:'#f7f1e7',icon:'function',description:'Kružnice, grafy a rovnice. Souvislosti, které si můžeš vyzkoušet.'},
  {id:'literature',name:'Literatura',color:'#a56c7b',tint:'#f8eff2',icon:'book',description:'Příběhy, které stojí za pochopení.'},
  {id:'history',name:'Dějepis',color:'#94704e',tint:'#f5efe8',icon:'clock',description:'Historická období a jejich souvislosti.'},
];

subjects.push(...courseSubjects.filter(subject=>!subjects.some(existing=>existing.id===subject.id)));

/** @type {StudyUnit[]} */
export const units = [
  {id:'skeleton',subjectId:'biology',title:'Kosterní soustava člověka – lidské kosti',label:'LIDSKÉ TĚLO',description:'64 studijních položek. Jeden přehledný atlas. Poznej lidskou kostru od hlavy až k patě.',module:'biology',materials:[
    {title:'Kosterní soustava — výpisky',description:'Pouze podle původní prezentace · PDF',url:'modules/biology/assets/kosterni-soustava-prehled.pdf',sha256:'ae29023e1b8a1c5fd8e59f29671061483577178600d3249613542c1a17897b17'},
    {title:'Kosterní soustava — původní prezentace',description:'63 snímků · PDF',url:'modules/biology/assets/kosterni-soustava-prezentace.pdf',sha256:'f11c58c90321af35edd54cc86b5d4e891253e6dfcd525a09ffb9f123e19390be'},
  ]},
  {id:'muscles',subjectId:'biology',title:'Svalová soustava člověka',label:'LIDSKÉ TĚLO',description:'Atlas svalů, poznávačka, kartičky a mapa podle školní prezentace. Poznej svaly hlavy, trupu a končetin a propoj jejich stavbu s pohybem.',module:'biology-muscles',materials:[{"title":"Svalová soustava — studijní kopie (PDF)","description":"Studijní kopie školní prezentace · 12 snímků · PDF","url":"https://github.com/hphugosm/study/releases/download/studylo-biology-v1/e0f832a29f806e231d03a6a1688fabebde715da831d859c62664dae8851810fd.pdf","sha256":"e0f832a29f806e231d03a6a1688fabebde715da831d859c62664dae8851810fd"},{"title":"Svalová soustava — studijní kopie (PPTX)","description":"Studijní kopie školní prezentace · 12 snímků · PPTX","url":"https://github.com/hphugosm/study/releases/download/studylo-biology-v1/36747ed96a59b5954589fca60153c462f97c00fa7493d8894644faf3dea5cbe1.pptx","sha256":"36747ed96a59b5954589fca60153c462f97c00fa7493d8894644faf3dea5cbe1"}]},
  {id:'law-unit-2',subjectId:'law',title:'U.S. Courts & Civil Liberties',label:'UNIT 2',description:'Four landmark Supreme Court cases, the U.S. court system and the language of law.',module:'law',materials:[
    {title:'U.S. Law — Expanded Study Notes',description:'English study notes · PDF',url:'modules/law/assets/US_Law_Expanded_English_Study_Notes.pdf',sha256:'8c217315828b89836abf1f5bad11462f0caae0896aa16bddd65e4c41a0ab090c'},
    {title:'Právo USA — barevné poznámky',description:'České doplňující poznámky · PDF',url:'modules/law/assets/Pravo_USA_barevne_poznamky.pdf',sha256:'3e9d0eec50077309f8a0e5bf498dec981d4269d74ec0ff266e44b6b172ab9283'},
  ]},
  {id:'math-quarter',subjectId:'mathematics',title:'Čtvrtletní práce',label:'PŘÍPRAVA NA TEST',kind:'collection',relatedUnitIds:['trig-functions','trig-equations'],description:'Dvě témata z dodaných prezentací pro přehledné opakování. Přesný rozsah čtvrtletní práce nebyl zadán.',materials:[
    {title:'Trigonometrie',description:'Původní prezentace · 24 snímků · PPTX',url:'modules/math-trig/assets/Trigonometrie.pptx',sha256:'3c83034105c5de3c32749473a3bd388522d96b4b48e2d8eb1bc568557967a054'},
    {title:'Grafy sin, cos, tan, cot',description:'Původní prezentace · PPTX',url:'modules/math-trig/assets/Grafy_sin_cos_tan_cot.pptx',sha256:'16e1d4263fc64eff7681a79d747dc36bc3f0997079ba79c40b632e14a741dc68'},
    {title:'Goniometrické rovnice a vzorce',description:'Původní prezentace · PPTX',url:'modules/math-equations/assets/Goniometricke_rovnice_a_vzorce.pptx',sha256:'f4cfed62588a13fc3d66142003694d22bc684ded9e1b9e0f37abe4f3432b72f8'},
    {title:'Goniometrické funkce — pracovní list',description:'60 příkladů · PDF',url:'modules/math-worksheets/assets/Gonio_fce_opakovani.pdf',sha256:'271265b365a5cd1d499dbdd71c1a4d87f0e07b61e2ec168da18233b5a324e761'},
    {title:'Goniometrické rovnice a nerovnice — pracovní list',description:'104 příkladů · PDF',url:'modules/math-worksheets/assets/Opakovani_gonio__ne_rovnice.pdf',sha256:'c8b291c3e30ce56994b61b08fe44e4e98094cc4baa0ac1fa46ad5fc1a29280c1'},
  ]},
  {id:'trig-functions',subjectId:'mathematics',title:'Trigonometrie a goniometrické funkce',label:'KATEGORIE 1',description:'Jednotková kružnice, stupně a radiány, sin, cos, tan a cot. Grafy a jejich proměny, vlastnosti funkcí, sinová a kosinová věta.',module:'math-trig',materials:[
    {title:'Trigonometrie',description:'Původní výuková prezentace · PPTX',url:'modules/math-trig/assets/Trigonometrie.pptx',sha256:'3c83034105c5de3c32749473a3bd388522d96b4b48e2d8eb1bc568557967a054'},
    {title:'Grafy sin, cos, tan, cot',description:'Původní výuková prezentace · PPTX',url:'modules/math-trig/assets/Grafy_sin_cos_tan_cot.pptx',sha256:'16e1d4263fc64eff7681a79d747dc36bc3f0997079ba79c40b632e14a741dc68'},
    {title:'Goniometrické funkce — pracovní list',description:'60 příkladů · původní zadání PDF',url:'modules/math-worksheets/assets/Gonio_fce_opakovani.pdf',sha256:'271265b365a5cd1d499dbdd71c1a4d87f0e07b61e2ec168da18233b5a324e761'},
  ]},
  {id:'trig-equations',subjectId:'mathematics',title:'Goniometrické vzorce, rovnice a nerovnice',label:'KATEGORIE 2',description:'Přehled vzorců s podmínkami, řešené příklady krok za krokem a nerovnice na kružnici i číselné ose. Kartičky a kvízy s vysvětlením.',module:'math-equations',materials:[
    {title:'Goniometrické rovnice a vzorce',description:'Původní výuková prezentace · PPTX',url:'modules/math-equations/assets/Goniometricke_rovnice_a_vzorce.pptx',sha256:'f4cfed62588a13fc3d66142003694d22bc684ded9e1b9e0f37abe4f3432b72f8'},
    {title:'Goniometrické rovnice a nerovnice — pracovní list',description:'104 příkladů · původní zadání PDF',url:'modules/math-worksheets/assets/Opakovani_gonio__ne_rovnice.pdf',sha256:'c8b291c3e30ce56994b61b08fe44e4e98094cc4baa0ac1fa46ad5fc1a29280c1'},
  ]},
  {id:'miser',subjectId:'literature',title:'Rozbor Lakomce',label:'DOMÁCÍ ÚKOL',description:'Odevzdání rozboru Molièrova Lakomce. Zadání a materiály zatím nebyly přidány.',materials:[]},
  {id:'baroque',subjectId:'history',title:'Baroko',label:'PŘÍPRAVA NA TEST',description:'K testu: znaky baroka, 5 náboženských a 5 světských staveb, malířství, sochařství a hudba podle dodaného obrazového atlasu.',materials:[
    {title:'Baroko — obrazový studijní atlas',description:'Podklad k testu · 9 stran · stavby, výtvarné umění a hudba · PDF',url:'assets/history/baroko-studijni-atlas.pdf'},
  ],notes:[
    {title:'Co si připravit k testu',text:'Vycházej z přiloženého devítistránkového atlasu. Poznej ukázky staveb a děl, přiřaď autora a vysvětli, který znak baroka na nich vidíš. Přehled níže shrnuje strany 2–8; fotografie a reprodukce najdeš v původním PDF.'},
    {title:'Jak poznat baroko · strana 2',text:'Baroko 17.–18. století oslovuje smysly a emoce. Po Tridentském koncilu umění slouží také k vyjádření moci církve a panovníků. Sleduj šest znaků: pohyb a křivky, kontrast světla a stínu (šerosvit), emoce a gesta, velkolepost, propojení architektury se sochou a malbou a symboliku. Renesanční rovnováhu, klid a harmonii porovnej s barokním pohybem, kontrastem a emocionálním účinkem.'},
    {title:'Náboženské stavby v Česku · strana 3',text:'Kostel sv. Mikuláše v Praze — Kryštof a Kilián Ignác Dientzenhofer: kupole, štíhlá věž a zvlněná fasáda. Zelená hora u Žďáru nad Sázavou — Jan Blažej Santini-Aichel: hvězdicový plán, symbolika čísla pět a barokní gotika.'},
    {title:'Náboženské stavby v Evropě · strana 3',text:'Karlskirche ve Vídni — J. B. Fischer von Erlach a syn: velká kupole a dvojice monumentálních sloupů. San Carlo v Římě — Francesco Borromini: konkávní a konvexní, tedy dovnitř a ven prohnutá fasáda. Sant’Andrea al Quirinale v Římě — Gian Lorenzo Bernini: oválný interiér, zlacení a směrované světlo.'},
    {title:'Světské stavby v Česku · strana 4',text:'Zámek Troja v Praze — Jean-Baptiste Mathey: slavnostní schodiště, středová osa a zahradní kompozice. Clam-Gallasův palác v Praze — J. B. Fischer von Erlach: plasticky členěná fasáda a bohaté portály. Zámky a paláce reprezentují moc, bohatství a společenské postavení.'},
    {title:'Světské stavby v Evropě · strana 4',text:'Versailles ve Francii — Le Vau a Hardouin-Mansart: dlouhá osa zahrady a monumentální průčelí. Schönbrunn ve Vídni — Fischer von Erlach a Pacassi: dlouhá symetrická fasáda a císařská reprezentace. Palác Caserta v Itálii — Luigi Vanvitelli: obrovské měřítko a slavnostní osa.'},
    {title:'Malířství: světlo a diagonála · strana 5',text:'Caravaggio — Povolání sv. Matouše: šerosvit, paprsek světla a Kristovo gesto vedou pozornost k hlavnímu ději. Peter Paul Rubens — Vztyčení kříže: šikmý směr kříže a těl, napjaté svaly, drapérie a výrazná gesta vytvářejí pohyb a drama.'},
    {title:'Malířství: pohyb a prostor · strana 6',text:'Rembrandt van Rijn — Noční hlídka: skupinový portrét v akci, světlo zdůrazňuje důležité postavy. Diego Velázquez — Dvorní dámy (Las Meninas): zrcadlo, otevřené dveře a pohledy postav vtahují diváka do prostoru obrazu. Baroko zahrnuje i světská témata.'},
    {title:'Malířství: pomíjivost a reprezentace · strana 7',text:'Nicolas Poussin — Et in Arcadia ego: pastýři u hrobu, připomínka smrti (memento mori) a klidná, klasicizující kompozice. Anthony van Dyck — Karel I. na lovu: uvolněný postoj, pohled zespodu a luxusní oděv vyjadřují královskou autoritu.'},
    {title:'Sochařství · strana 7',text:'Gian Lorenzo Bernini — Extáze sv. Terezie: expresivní tváře, vlnící se oděv a zlaté paprsky vytvářejí náboženský výjev jako na jevišti. Matyáš Bernard Braun a dílna — Víra z cyklu Ctnosti a neřesti v Kuksu: alegorie lidských vlastností, které rozpoznáváme podle gest a atributů.'},
    {title:'Hudba · strana 8',text:'Rozvíjí se orchestr, opera, kantáta a koncert; typickým doprovodem je basso continuo. Zapamatuj si dvojice autor–dílo: Johann Sebastian Bach — Braniborské koncerty (1721, polyfonie a kontrapunkt); Antonio Vivaldi — Čtvero ročních dob (1725, koncert a hudební obrazy); Georg Friedrich Händel — Mesiáš (1741, oratorium); Jan Dismas Zelenka — Missa votiva (1739, duchovní hudba).'},
    {title:'Rychlé opakování · strana 8',text:'Zkus bez nápovědy odpovědět na čtyři otázky z atlasu: Jaký znak poznáš u Caravaggia? Čím je výjimečná Zelená hora? Co je typické pro Borrominiho fasádu? K čemu slouží Versailles a Schönbrunn? Odpovědi si ověř na straně 8 PDF nebo v přehledu výše.'},
  ]},
  ...courseUnits,
];

/** @type {StudyEvent[]} */
export const events = [
  {id:'biology-test',unitId:'skeleton',date:'2026-11-05',type:'test',title:'Test – Kosterní soustava člověka',description:'Připrav se s atlasem, kartičkami a slepou mapou lidské kostry.'},
  {id:'math-test',unitId:'math-quarter',date:'2026-11-05',type:'test',title:'Čtvrtletní práce',description:'Opakování trigonometrie, funkcí, vzorců, rovnic a nerovnic ze tří dodaných prezentací.'},
  {id:'history-test',unitId:'baroque',date:'2026-11-09',type:'test',title:'Test – Baroko',description:'Znaky baroka, náboženské a světské stavby, malířství, sochařství a hudba podle obrazového studijního atlasu.'},
  {id:'power-plants-excursion',date:'2026-11-12',type:'excursion',allDay:true,title:'Exkurze elektráren',description:'Celodenní školní exkurze. Podrobnosti k místu, programu a odjezdu zatím nejsou přidané.'},
  {id:'literature-assignment',unitId:'miser',date:'2026-11-18',type:'homework',title:'Odevzdání rozboru Lakomce',description:'Termín pro odevzdání rozboru. Přesné zadání zatím nebylo přidáno.'},
  {id:'law-test',unitId:'law-unit-2',date:'2026-11-19',type:'test',title:'Unit 2 – Test',description:'Review the landmark cases, court hierarchy and legal vocabulary.'},
];

export const moduleLoaders = {
  'course-notes': () => import('../modules/course-notes/index.js'),
  biology: () => import('../modules/biology/index.js'),
  'biology-muscles': () => import('../modules/biology-muscles/index.js'),
  law: () => import('../modules/law/index.js'),
  'math-trig': () => import('../modules/math-trig/index.js'),
  'math-equations': () => import('../modules/math-equations/index.js'),
};

export const getSubject = id => subjects.find(subject => subject.id === id);
export const getUnit = id => units.find(unit => unit.id === id);
export const eventContext = event => {
  const unit = getUnit(event.unitId);
  return {event,unit,subject:unit?getSubject(unit.subjectId):undefined};
};
export const eventTypes = {test:'Test',homework:'Domácí úkol',review:'Opakování',excursion:'Exkurze'};
