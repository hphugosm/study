/** Reviewed outbound references. External video identity is never a file SHA. */
const slug=/^[a-z][a-z0-9-]{0,59}$/;
const exact=(value,keys)=>value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).length===keys.length&&keys.every(key=>Object.hasOwn(value,key));
const assert=(condition,code)=>{if(!condition)throw new Error(code);};
export function validateExternalResources(value,{subjectId,topicId}={}){
 assert(exact(value,['schema','subject_id','topic_id','resources'])&&value.schema===1&&typeof value.subject_id==='string'&&slug.test(value.subject_id)&&typeof value.topic_id==='string'&&slug.test(value.topic_id),'invalid_external_index');
 assert((subjectId===undefined||value.subject_id===subjectId)&&(topicId===undefined||value.topic_id===topicId),'external_scope_mismatch');
 assert(Array.isArray(value.resources)&&value.resources.length<=50,'invalid_external_resources');const ids=new Set();
 for(const resource of value.resources){
  assert(exact(resource,['id','kind','provider','video_id','url','title','reviewed_on','review_status']),'invalid_external_resource');
  assert(resource.kind==='video'&&resource.provider==='youtube'&&typeof resource.video_id==='string'&&/^[A-Za-z0-9_-]{11}$/.test(resource.video_id),'invalid_external_video');
  assert(resource.id==='youtube-'+resource.video_id&&!ids.has(resource.id),'duplicate_or_invalid_external_id');ids.add(resource.id);
  assert(resource.url===`https://www.youtube.com/watch?v=${resource.video_id}`,'unsafe_external_url');
  assert(typeof resource.title==='string'&&resource.title.trim()&&resource.title.length<=500&&!/[<>\u0000-\u001f]|https?:\/\/|[\w.+-]+@[\w.-]+\.[a-z]{2,}|(?:token|sesskey|password|cookie)\s*[=:]/i.test(resource.title),'invalid_external_title');
  assert(resource.review_status==='approved','unreviewed_external_resource');
  assert(typeof resource.reviewed_on==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(resource.reviewed_on),'invalid_external_review_date');
  const date=new Date(resource.reviewed_on+'T12:00:00Z');assert(Number.isFinite(date.getTime())&&date.toISOString().slice(0,10)===resource.reviewed_on,'invalid_external_review_date');
 }
 return value;
}
