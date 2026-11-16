export const STORAGE_KEY='study:biology:circulation:v1';
export function visualTargets(data,region='all'){return data.structures.filter(s=>!s.cardOnly&&(region==='all'||s.region===region));}
export function shuffle(items,random=Math.random){const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;}
export function mistakesRound(data,ids){const set=new Set(ids);return visualTargets(data).filter(s=>set.has(s.id));}
export function readProgress(storage){try{const p=JSON.parse(storage.getItem(STORAGE_KEY)||'{}');return {known:Array.isArray(p.known)?[...new Set(p.known.filter(x=>typeof x==='string'))]:[],results:Array.isArray(p.results)?p.results.slice(-300):[]};}catch{return {known:[],results:[]};}}
export function writeProgress(storage,p){try{storage.setItem(STORAGE_KEY,JSON.stringify(p));return true;}catch{return false;}}
export function visibleName(name,{mode,revealed=false,answered=false}){return mode==='cards'&&!revealed||mode==='map'&&!answered?'Anatomický podklad':name;}
export function assetURL(data,name){const a=data.assets?.[name];if(!a||!/^[a-f0-9]{64}$/.test(a.sha256))throw Error('invalid_asset');const ext=name.split('.').pop();if(a.url!==`https://github.com/hphugosm/study/releases/download/studylo-biology-v1/${a.sha256}.${ext}`)throw Error('invalid_asset_url');return a.url;}
export function validate(data){
 const errors=[],ids=new Set(),count=data?.source?.slide_count;const citation=s=>Number.isInteger(s)&&s>=1&&s<=count;
 if(!Number.isInteger(count)||count<1)errors.push('invalid_slide_count');
 if(data?.source?.status!=='approved'||data.source.approved!==true)errors.push('source_not_approved');
 if(!/^[a-f0-9]{64}$/.test(data?.source?.sha256)||data.source.format!=='pptx'||data.source.url!==`https://github.com/hphugosm/study/releases/download/studylo-materials-v1/${data.source.sha256}.pptx`)errors.push('invalid_source');
 for(const [name,a]of Object.entries(data.assets||{})){try{assetURL(data,name);}catch{errors.push('invalid_asset '+name);}if(!Number.isInteger(a.width)||a.width<=0||!Number.isInteger(a.height)||a.height<=0||!citation(a.slide))errors.push('invalid_asset_metadata '+name);}
 for(const s of data.structures||[]){if(ids.has(s.id))errors.push('duplicate '+s.id);ids.add(s.id);for(const page of [s.slide,...(s.slides||[])])if(!citation(page))errors.push('invalid_citation '+s.id);if(!s.cardOnly){const v=data.views.find(v=>v.id===s.view);if(!v)errors.push('missing_view '+s.id);if(!Array.isArray(s.polygon)||s.polygon.length<6||s.polygon.length%2||s.polygon.some(n=>!Number.isFinite(n)||n<0||n>100))errors.push('invalid_polygon '+s.id);}}
 for(const v of data.views||[])if(!data.assets[v.image])errors.push('missing_image '+v.id);
 for(const item of [...data.notes||[],...data.cards||[]])for(const page of item.slides||[item.slide])if(!citation(page))errors.push('invalid_citation '+item.id);
 return errors;
}
