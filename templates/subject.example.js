/** Copy these records into the corresponding arrays in src/data.js.
 * Example structure only: no invented teaching material is included.
 * No new HTML page or module is needed for notes and downloadable materials.
 */
export const subject = {
  id:'physics', name:'Fyzika', color:'#617d96', tint:'#edf2f7', icon:'book',
  description:'Místo pro fyzikální souvislosti.',
};
export const unit = {
  id:'physics-unit-1', subjectId:'physics', label:'TÉMA 1',
  title:'Název skutečného tématu', description:'Podklady zatím nebyly přidány.',
  notes:[], materials:[],
  // Once supplied, add real notes and e.g.
  // materials:[{title:'Výukové podklady',description:'PDF',url:'assets/physics/notes.pdf'}]
};
export const event = {
  id:'physics-test-1',unitId:'physics-unit-1',date:'2026-12-03',type:'test',
  title:'Název testu',description:'Skutečné zadání nebo popis události.',
};
