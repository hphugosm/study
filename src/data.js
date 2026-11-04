/** @typedef {{id:string,name:string,color:string,tint:string,icon:string,description:string}} Subject */
/** @typedef {{id:string,subjectId:string,title:string,label?:string,description:string,module?:string,materials:Array<{title:string,description:string,url:string}>,notes?:string[]}} StudyUnit */
/** @typedef {{id:string,unitId:string,date:string,type:'test'|'homework'|'review',title:string,description:string}} StudyEvent */

/** @type {Subject[]} */
export const subjects = [
  {id:'biology',name:'Biologie',color:'#4d7659',tint:'#edf3ec',icon:'leaf',description:'Poznej, jak funguje lidské tělo.'},
  {id:'law',name:'Law',color:'#6976a1',tint:'#eff0f8',icon:'scale',description:'Cases, courts & civil liberties.'},
  {id:'mathematics',name:'Matematika',color:'#ac8350',tint:'#f7f1e7',icon:'function',description:'Prostor pro vzorce i souvislosti.'},
  {id:'literature',name:'Literatura',color:'#a56c7b',tint:'#f8eff2',icon:'book',description:'Příběhy, které stojí za pochopení.'},
];

/** @type {StudyUnit[]} */
export const units = [
  {id:'skeleton',subjectId:'biology',title:'Kosterní soustava člověka – lidské kosti',label:'LIDSKÉ TĚLO',description:'64 studijních položek. Jeden přehledný atlas. Poznej lidskou kostru od hlavy až k patě.',module:'biology',materials:[
    {title:'Kosterní soustava — přehled',description:'Původní studijní podklad · PDF',url:'modules/biology/assets/kosterni-soustava-prehled.pdf'},
  ]},
  {id:'law-unit-2',subjectId:'law',title:'U.S. Courts & Civil Liberties',label:'UNIT 2',description:'Four landmark Supreme Court cases, the U.S. court system and the language of law.',module:'law',materials:[
    {title:'U.S. Law — Expanded Study Notes',description:'English study notes · PDF',url:'modules/law/assets/US_Law_Expanded_English_Study_Notes.pdf'},
    {title:'Právo USA — barevné poznámky',description:'České doplňující poznámky · PDF',url:'modules/law/assets/Pravo_USA_barevne_poznamky.pdf'},
  ]},
  {id:'math-quarter',subjectId:'mathematics',title:'Čtvrtletní práce',label:'PŘÍPRAVA NA TEST',description:'Termín už máš v kalendáři. Podklady a procvičování sem přidáme, až budou k dispozici.',materials:[]},
  {id:'miser',subjectId:'literature',title:'Rozbor Lakomce',label:'DOMÁCÍ ÚKOL',description:'Odevzdání rozboru Molièrova Lakomce. Zadání a materiály zatím nebyly přidány.',materials:[]},
];

/** @type {StudyEvent[]} */
export const events = [
  {id:'biology-test',unitId:'skeleton',date:'2026-11-05',type:'test',title:'Test – Kosterní soustava člověka',description:'Připrav se s atlasem, kartičkami a slepou mapou lidské kostry.'},
  {id:'math-test',unitId:'math-quarter',date:'2026-11-05',type:'test',title:'Čtvrtletní práce',description:'Podklady k této práci zatím nebyly přidány.'},
  {id:'law-test',unitId:'law-unit-2',date:'2026-11-12',type:'test',title:'Unit 2 – Test',description:'Review the landmark cases, court hierarchy and legal vocabulary.'},
  {id:'literature-assignment',unitId:'miser',date:'2026-11-18',type:'homework',title:'Odevzdání rozboru Lakomce',description:'Termín pro odevzdání rozboru. Přesné zadání zatím nebylo přidáno.'},
];

export const moduleLoaders = {
  biology: () => import('../modules/biology/index.js'),
  law: () => import('../modules/law/index.js'),
};

export const getSubject = id => subjects.find(subject => subject.id === id);
export const getUnit = id => units.find(unit => unit.id === id);
export const eventContext = event => {
  const unit = getUnit(event.unitId);
  return {event,unit,subject:getSubject(unit.subjectId)};
};
export const eventTypes = {test:'Test',homework:'Domácí úkol',review:'Opakování'};
