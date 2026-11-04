import {cp,mkdir,rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const dist=new URL('../dist/',import.meta.url);
await rm(dist,{recursive:true,force:true});await mkdir(dist,{recursive:true});
for(const name of ['index.html','styles.css','src','assets','modules'])await cp(new URL(name,`file://${root}`),new URL(name,dist),{recursive:true,filter:source=>!source.includes('/tests/')&&!source.includes('/scripts/')&&!source.endsWith('/README.md')&&!source.endsWith('/CTI-ME.txt')});
await cp(new URL('../.nojekyll',import.meta.url),new URL('.nojekyll',dist));
console.log('Static site built in dist/. All assets use deploy-safe relative URLs.');
