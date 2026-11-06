/** Public source-catalog contract. Never accepts raw Moodle URLs, identities or unreviewed content. */
const slug = /^[a-z][a-z0-9-]{0,59}$/;
const sha = /^[a-f0-9]{64}$/;
const text = value => typeof value === 'string' && value.trim().length > 0 && value.length <= 500 &&
  !/[<>\u0000-\u001f]|https?:\/\/|[\w.+-]+@[\w.-]+\.[a-z]{2,}|(?:token|sesskey|password|cookie)\s*[=:]/i.test(value);
function exactKeys(value, keys) {
  return value && typeof value === 'object' && !Array.isArray(value) &&
    Object.keys(value).every(key => keys.includes(key)) && keys.every(key => Object.hasOwn(value,key));
}
function identity(value) {
  if(value?.schema!==1 || !slug.test(value.subject_id) || !slug.test(value.topic_id)) throw new Error('invalid_topic_identity');
  return `data/subjects/${value.subject_id}/topics/${value.topic_id}/`;
}
export function validateCatalog(catalog) {
  if(!exactKeys(catalog,['schema','subjects']) || catalog.schema!==1 || !Array.isArray(catalog.subjects)) throw new Error('invalid_catalog');
  const subjects=new Set();
  for(const subject of catalog.subjects) {
    if(!exactKeys(subject,['id','title','topics']) || !slug.test(subject.id) || subjects.has(subject.id) || !text(subject.title) || !Array.isArray(subject.topics)) throw new Error('invalid_subject');
    subjects.add(subject.id);
    const topics=new Set();
    for(const topic of subject.topics) {
      if(!exactKeys(topic,['id','title','index']) || !slug.test(topic.id) || topics.has(topic.id) || !text(topic.title) || topic.index!==`subjects/${subject.id}/topics/${topic.id}/index.json`) throw new Error('invalid_topic_reference');
      topics.add(topic.id);
    }
  }
  return catalog;
}
export function validateTopic(topic) {
  identity(topic);
  if(!exactKeys(topic,['schema','subject_id','topic_id','title','sources_index','derived_index']) || !text(topic.title) || topic.sources_index!=='sources/index.json' || topic.derived_index!=='derived/index.json') throw new Error('invalid_topic');
  return topic;
}
export function validateSources(index) {
  const prefix=identity(index);
  if(!exactKeys(index,['schema','subject_id','topic_id','sources']) || !Array.isArray(index.sources)) throw new Error('invalid_sources_index');
  const seen=new Set();
  for(const source of index.sources) {
    if(!exactKeys(source,['id','title','path','sha256','size','source_kind','review_status']) || !sha.test(source.id) || seen.has(source.id) || !text(source.title) || !sha.test(source.sha256) || !Number.isSafeInteger(source.size) || source.size<1 || source.size>25000000 || !['moodle','manual'].includes(source.source_kind) || source.review_status!=='approved') throw new Error('invalid_source');
    const extension=source.path?.slice(source.path.lastIndexOf('.')+1);
    if(!['pdf','pptx','ppt','docx','odt','odp','xlsx','txt'].includes(extension) || source.path!==`${prefix}sources/${source.sha256}.${extension}`) throw new Error('unsafe_source_path');
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
