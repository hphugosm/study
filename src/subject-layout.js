/** Keep established interactive categories canonical; Moodle sources enrich them. */
const primaryIds={mathematics:['trig-functions','trig-equations'],biology:['skeleton','muscles'],law:['law-unit-2']};
const supplementParents={
 'moodle-mathematics-9b3237cc2327dfc9a3353506fef752b3':['trig-functions','trig-equations'],
 'moodle-biology-03eb3f66a6da14c362750a3968ba2881':['skeleton'],
};
export function parentsForSupplement(unit,units){
 const ids=supplementParents[unit.id]||(unit.subjectId==='law'&&unit.origin==='moodle'&&/^Unit 2\.[1-4]\b/.test(unit.title)?['law-unit-2']:[]);
 return ids.map(id=>units.find(item=>item.id===id)).filter(Boolean);
}
export function supplementsForUnit(id,units){return units.filter(unit=>unit.origin==='moodle'&&parentsForSupplement(unit,units).some(parent=>parent.id===id));}
export function subjectLayout(subjectId,units){
 const selected=units.filter(unit=>unit.subjectId===subjectId&&unit.kind!=='collection');
 const primary=(primaryIds[subjectId]||[]).map(id=>selected.find(unit=>unit.id===id)).filter(Boolean);
 const primarySet=new Set(primary.map(unit=>unit.id));
 const course=selected.filter(unit=>unit.origin==='moodle');
 const legacy=selected.filter(unit=>unit.origin!=='moodle'&&!primarySet.has(unit.id));
 return {primary,course,secondary:course.filter(unit=>!parentsForSupplement(unit,units).length),legacy};
}
export function canonicalUnitHref(unit,units){
 const parent=parentsForSupplement(unit,units)[0];
 return parent?`#/units/${parent.id}?supplement=${encodeURIComponent(unit.id)}`:`#/units/${unit.id}`;
}
export function categoryMaterials(unit,units){
 const seen=new Set();
 return [...(unit.materials||[]),...supplementsForUnit(unit.id,units).flatMap(item=>item.materials||[])].filter(material=>{
  const identity=material.sha256||material.url;if(seen.has(identity))return false;seen.add(identity);return true;
 });
}
export function selectedSupplement(unit,params,units){
 const id=params.get('supplement');return id?supplementsForUnit(unit.id,units).find(item=>item.id===id)||null:null;
}
