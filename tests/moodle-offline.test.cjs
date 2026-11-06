const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const os=require('node:os');
const {spawnSync}=require('node:child_process');

test('build serves topic sources and derived payloads without eager offline downloads',async()=>{
 const temp=await fs.mkdtemp(path.join(os.tmpdir(),'study-moodle-build-'));
 try{
  for(const folder of ['scripts','src','assets','modules'])await fs.mkdir(path.join(temp,folder),{recursive:true});
  await fs.copyFile(path.join(__dirname,'../scripts/build.mjs'),path.join(temp,'scripts/build.mjs'));
  for(const file of ['index.html','styles.css','themes.css','settings.css','manifest.webmanifest','.nojekyll','sw.js'])await fs.writeFile(path.join(temp,file),file==='sw.js'?'const version="__STUDY_BUILD_VERSION__";':'');
  const base='modules/moodle-sync/data/subjects/mathematics/topics/trig-functions/';
  const source=base+'sources/'+ 'a'.repeat(64)+'.pdf';
  const derived=base+'derived/summary/notes.md';
  const flat='modules/moodle-sync/files/'+ 'b'.repeat(64)+'.pdf';
  const metadata=[base+'sources/index.json',base+'derived/index.json','modules/moodle-sync/data/catalog.json'];
  for(const file of [...metadata,source,derived,flat]){
   await fs.mkdir(path.dirname(path.join(temp,file)),{recursive:true});
   await fs.writeFile(path.join(temp,file),file.endsWith('.json')?'{}':'synthetic payload');
  }
  const build=spawnSync(process.execPath,['scripts/build.mjs'],{cwd:temp,encoding:'utf8'});
  assert.equal(build.status,0,build.stderr);
  const manifest=JSON.parse(await fs.readFile(path.join(temp,'dist/offline-manifest.json'),'utf8'));
  const cached=new Set(manifest.assets.map(asset=>asset.url));
  for(const file of [source,derived,flat]){
   await fs.access(path.join(temp,'dist',file));
   assert.equal(cached.has(file),false,`Large optional payload was eagerly cached: ${file}`);
  }
  for(const file of metadata)assert.ok(cached.has(file),`Small catalog index missing offline: ${file}`);
 }finally{await fs.rm(temp,{recursive:true,force:true});}
});
