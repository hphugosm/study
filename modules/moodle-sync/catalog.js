/** Public source-catalog contract. Never accepts raw Moodle URLs, identities or unreviewed content. */
export const MOODLE_SUBJECTS = Object.freeze([
  {id:'area-studies',title:'Area Studies'}, {id:'biology',title:'Biologie'},
  {id:'chemistry',title:'Chemie'}, {id:'american-literature',title:'Americká literatura'},
  {id:'physics',title:'Fyzika'}, {id:'informatics',title:'Informatika'},
  {id:'law',title:'Právo'}, {id:'mathematics',title:'Matematika'},
  {id:'sociology',title:'Sociologie'}, {id:'social-sciences',title:'Základy společenských věd'}, {id:'geography',title:'Zeměpis'},
]);
const slug = /^[a-z][a-z0-9-]{0,59}$/;
const sha = /^[a-f0-9]{64}$/;
const text = value => typeof value === 'string' && value.trim().length > 0 && value.length <= 500 &&
  !/[<>\u0000-\u001f]|https?:\/\/|[\w.+-]+@[\w.-]+\.[a-z]{2,}|(?:token|sesskey|password|cookie)\s*[=:]/i.test(value);
function exactKeys(value, keys, optional=[]) {
  return value && typeof value === 'object' && !Array.isArray(value) &&
    Object.keys(value).every(key => keys.includes(key)||optional.includes(key)) && keys.every(key => Object.hasOwn(value,key));
}
const outlineFields=['origin','course_variant','section_order','available','listed_current'];
function outlineMetadata(value) {
  if(value.origin===undefined)return outlineFields.slice(1).every(key=>value[key]===undefined);
  if(value.origin==='study')return outlineFields.slice(1).every(key=>value[key]===undefined);
  return value.origin==='moodle' && /^section-[a-f0-9]{32}$/.test(value.id||value.topic_id) &&
    /^JU3[A-Z]*$/.test(value.course_variant) && Number.isSafeInteger(value.section_order) && value.section_order>=0 &&
    typeof value.available==='boolean' && typeof value.listed_current==='boolean';
}
function identity(value) {
  if(value?.schema!==1 || !slug.test(value.subject_id) || !slug.test(value.topic_id)) throw new Error('invalid_topic_identity');
  return `data/subjects/${value.subject_id}/topics/${value.topic_id}/`;
}
export function validateCatalog(catalog) {
  if(!exactKeys(catalog,['schema','subjects'],['moodle_subject_ids']) || catalog.schema!==1 || !Array.isArray(catalog.subjects)) throw new Error('invalid_catalog');
  const subjects=new Set();
  for(const subject of catalog.subjects) {
    if(!exactKeys(subject,['id','title','topics'],['study_title']) || !slug.test(subject.id) || subjects.has(subject.id) || !text(subject.title) || (subject.study_title!==undefined&&!text(subject.study_title)) || !Array.isArray(subject.topics)) throw new Error('invalid_subject');
    subjects.add(subject.id);
    const topics=new Set();
    for(const topic of subject.topics) {
      if(!exactKeys(topic,['id','title','index'],outlineFields) || !slug.test(topic.id) || topics.has(topic.id) || !text(topic.title) || topic.index!==`subjects/${subject.id}/topics/${topic.id}/index.json` || !outlineMetadata(topic)) throw new Error('invalid_topic_reference');
      topics.add(topic.id);
    }
  }
  if(catalog.moodle_subject_ids!==undefined){
    const ids=catalog.moodle_subject_ids;
    if(!Array.isArray(ids)||ids.length!==MOODLE_SUBJECTS.length||new Set(ids).size!==ids.length||
       !MOODLE_SUBJECTS.every(subject=>ids.includes(subject.id)&&subjects.has(subject.id)))throw new Error('invalid_moodle_subject_scope');
  }
  return catalog;
}
export function validateTopic(topic) {
  identity(topic);
  if(!exactKeys(topic,['schema','subject_id','topic_id','title','sources_index','derived_index'],outlineFields) || !text(topic.title) || topic.sources_index!=='sources/index.json' || topic.derived_index!=='derived/index.json' || !outlineMetadata(topic)) throw new Error('invalid_topic');
  return topic;
}
export const RELEASE_ASSET_PREFIX='https://github.com/hphugosm/study/releases/download/studylo-materials-v1/';
export function approvedReleaseURL(url,sha256){
  if(typeof url!=='string'||!sha.test(sha256))return false;
  const match=/^https:\/\/github\.com\/hphugosm\/study\/releases\/download\/studylo-materials-v1\/([a-f0-9]{64})\.(pdf|pptx|ppt|docx|odt|odp|xlsx|txt|doc|jpg|png|wmv)$/.exec(url);
  return !!match&&match[1]===sha256&&url===RELEASE_ASSET_PREFIX+sha256+'.'+match[2];
}
export function validateSources(index) {
  const prefix=identity(index);
  if(!exactKeys(index,['schema','subject_id','topic_id','sources']) || !Array.isArray(index.sources)) throw new Error('invalid_sources_index');
  const seen=new Set();
  for(const source of index.sources) {
    if(!exactKeys(source,['id','title','sha256','size','source_kind','review_status'],['path','url']) || !sha.test(source.id) || seen.has(source.id) || !text(source.title) || !sha.test(source.sha256) || !Number.isSafeInteger(source.size) || source.size<1 || source.size>25000000 || !['moodle','manual'].includes(source.source_kind) || source.review_status!=='approved') throw new Error('invalid_source');
    const hasPath=Object.hasOwn(source,'path'),hasURL=Object.hasOwn(source,'url');
    if(hasPath===hasURL)throw new Error('source_requires_exactly_one_location');
    if(hasURL){
      if(!approvedReleaseURL(source.url,source.sha256))throw new Error('unsafe_source_release_url');
    }else{
      const extension=typeof source.path==='string'?source.path.slice(source.path.lastIndexOf('.')+1):'';
      if(!['pdf','pptx','ppt','docx','odt','odp','xlsx','txt','doc','jpg','png','wmv'].includes(extension) || source.path!==`${prefix}sources/${source.sha256}.${extension}`) throw new Error('unsafe_source_path');
    }
    seen.add(source.id);
  }
  return index;
}
export function validateDerived(index, sources) {
  const prefix=identity(index);
  validateSources(sources);
  if(index.subject_id!==sources.subject_id || index.topic_id!==sources.topic_id || !exactKeys(index,['schema','subject_id','topic_id','artifacts']) || !Array.isArray(index.artifacts)) throw new Error('invalid_derived_index');
  const known=new Map(sources.sources.map(source=>[source.id,source.sha256]));
  const seen=new Set();
  for(const artifact of index.artifacts) {
    if(!exactKeys(artifact,['id','title','kind','path','sha256','source_refs','review_status']) || !slug.test(artifact.id) || seen.has(artifact.id) || !text(artifact.title) || !['extract','notes','flashcards','quiz','other'].includes(artifact.kind) || !sha.test(artifact.sha256) || artifact.review_status!=='approved' || !Array.isArray(artifact.source_refs) || !artifact.source_refs.length) throw new Error('invalid_derived_artifact');
    const rest=artifact.path?.startsWith(`${prefix}derived/${artifact.id}/`)?artifact.path.slice(`${prefix}derived/${artifact.id}/`.length):'';
    if(!/^[a-zA-Z0-9][a-zA-Z0-9_-]*\.(md|json|pdf|txt|html|svg|png|webp)$/.test(rest)) throw new Error('unsafe_derived_path');
    const refs=new Set();
    for(const ref of artifact.source_refs) {
      if(!exactKeys(ref,['id','sha256']) || refs.has(ref.id) || known.get(ref.id)!==ref.sha256) throw new Error('stale_or_unknown_source_reference');
      refs.add(ref.id);
    }
    seen.add(artifact.id);
  }
  return index;
}
