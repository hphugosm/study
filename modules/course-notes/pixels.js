import {pixelSamples} from './pixel-data.js';
const plain=value=>value!==null&&typeof value==='object'&&!Array.isArray(value)&&Object.getPrototypeOf(value)===Object.prototype;
export function hexToRGB(hex){
 if(typeof hex!=='string'||!/^#[0-9a-f]{6}$/i.test(hex))throw new TypeError('Barva musí mít tvar #RRGGBB.');
 return {r:parseInt(hex.slice(1,3),16),g:parseInt(hex.slice(3,5),16),b:parseInt(hex.slice(5,7),16)};
}
export function encodeRGB(rgb){
 if(!plain(rgb)||Object.keys(rgb).length!==3||['r','g','b'].some(k=>!Object.hasOwn(rgb,k)||!Number.isInteger(rgb[k])||rgb[k]<0||rgb[k]>255))throw new RangeError('Každý RGB kanál musí být celé číslo 0 až 255.');
 return '#'+['r','g','b'].map(k=>rgb[k].toString(16).padStart(2,'0')).join('').toUpperCase();
}
export function worksheetCell(row,column){
 if(!Number.isInteger(row)||row<1||row>1048576||!Number.isInteger(column)||column<1||column>16384)throw new RangeError('Neplatná souřadnice buňky.');
 let letters='',n=column;while(n){n--;letters=String.fromCharCode(65+n%26)+letters;n=Math.floor(n/26);}return letters+row;
}
export function normalizePixelsOptions(defaults={}){
 if(!plain(defaults)||Object.keys(defaults).some(k=>k!=='sample'))throw new TypeError('Neplatné nastavení pixelů.');
 const sample=Object.hasOwn(defaults,'sample')?defaults.sample:0;if(!Number.isInteger(sample)||sample<0||sample>=pixelSamples.length)throw new RangeError('Neplatný vzorek.');return {sample};
}
export function validatePixelSources(refs){
 if(!Array.isArray(refs)||!pixelSamples.every(sample=>refs.some(ref=>ref?.id===sample.source_id&&ref.sha256===sample.sha256&&ref.page===1)))throw new TypeError('Pixelová pomůcka vyžaduje přesné zdroje obou matic.');
}
export function pixelAt(sample,row,column){
 const index=normalizePixelsOptions({sample}).sample,s=pixelSamples[index];
 if(!Number.isInteger(row)||row<1||row>s.matrix.rows||!Number.isInteger(column)||column<1||column>s.matrix.columns)throw new RangeError('Pixel je mimo matici.');
 const hex=s.colors[row-1][column-1];
 return {hex,rgb:hexToRGB(hex),cell:worksheetCell(s.matrix.startRow+row-1,s.matrix.startColumn+column-1),row,column};
}
function el(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;}
export function mountPixels(container,defaults={}){
 let {sample}=normalizePixelsOptions(defaults),row=1,column=1,zoom=1,experiment={r:0,g:0,b:0},disposed=false;
 const host=el('section',undefined,'pixels-lab');host.setAttribute('aria-label','Pixelová laboratoř');
 const stylesheet=el('link');stylesheet.rel='stylesheet';stylesheet.href=new URL('./pixels.css',import.meta.url).href;host.append(stylesheet);
 const header=el('div',undefined,'pixels-toolbar'),select=el('select');select.setAttribute('aria-label','Zdrojový vzorek');pixelSamples.forEach((s,i)=>{const o=el('option',s.label);o.value=i;select.append(o);});select.value=sample;header.append(el('h3','Obrázek jako čísla'),select);host.append(header);
 host.append(el('p','Vyber pixel v původní matici. Každá buňka určuje jednu barvu #RRGGBB; experiment vedle mění jen vlastní barvu. Jde o studijní pomůcku, nikoli oficiální řešení zadání.','pixels-intro'));
 const layout=el('div',undefined,'pixels-layout'),left=el('div'),viewport=el('div',undefined,'pixels-viewport'),canvas=el('canvas');canvas.width=500;canvas.height=500;canvas.tabIndex=0;canvas.setAttribute('role','img');canvas.setAttribute('aria-label','Barevná matice. Kliknutím nebo šipkami vyber pixel; Home a End přesunou na kraj řádku.');viewport.append(canvas);left.append(viewport);
 const controls=el('div',undefined,'pixels-coordinate-controls');
 const coordinate=(title,max)=>{const l=el('label',title),input=el('input');input.type='number';input.min='1';input.max=max;input.step='1';input.value='1';input.setAttribute('aria-label',title+' v matici');l.append(input);controls.append(l);return input;};
 const rowInput=coordinate('Řádek',50),colInput=coordinate('Sloupec',50),zoomLabel=el('label','Zvětšení'),zoomInput=el('input');zoomInput.type='range';zoomInput.min='1';zoomInput.max='3';zoomInput.step='.5';zoomInput.value='1';zoomInput.setAttribute('aria-label','Zvětšení původní matice');zoomLabel.append(zoomInput);controls.append(zoomLabel);left.append(controls,el('p','Klávesnice: zaměř obrázek a použij šipky. Souřadnice matice začínají jedničkou.','pixels-hint'));
 const right=el('div',undefined,'pixels-details'),source=el('div',undefined,'pixels-source');source.setAttribute('aria-live','polite');source.setAttribute('aria-atomic','true');const preview=el('canvas');preview.width=180;preview.height=180;preview.setAttribute('role','img');preview.setAttribute('aria-label','Detail okolí vybraného pixelu');right.append(source,preview);
 const experimentBox=el('section',undefined,'pixels-experiment');experimentBox.append(el('h4','Vlastní RGB experiment'),el('p','Posuvníky mění tento barevný vzorek. Původní obrázek ani zdrojový soubor se nemění.'));const swatch=el('div',undefined,'pixels-swatch');swatch.setAttribute('role','img');experimentBox.append(swatch);const channelInputs={};
 for(const [key,label]of [['r','R · červená'],['g','G · zelená'],['b','B · modrá']]){const l=el('label',label),line=el('div',undefined,'pixels-channel'),range=el('input'),number=el('input');const channelColor={r:'#b91c1c',g:'#15803d',b:'#1d4ed8'}[key];l.style.color=channelColor;range.style.accentColor=channelColor;for(const input of [range,number]){input.type=input===range?'range':'number';input.min='0';input.max='255';input.step='1';input.setAttribute('aria-label',label+(input===range?' posuvník':' hodnota'));}line.append(range,number);l.append(line);experimentBox.append(l);channelInputs[key]=[range,number];for(const input of [range,number])input.addEventListener('input',()=>{const n=Number(input.value);const valid=input.value.trim()!==''&&Number.isInteger(n)&&n>=0&&n<=255;input.setAttribute('aria-invalid',String(!valid));input.setCustomValidity(valid?'':'Zadej celé číslo 0 až 255.');if(valid){experiment[key]=n;for(const sibling of channelInputs[key]){sibling.value=n;sibling.setAttribute('aria-invalid','false');sibling.setCustomValidity('');}}paintExperiment();});}
 const expText=el('p',undefined,'pixels-experiment-code');expText.setAttribute('aria-live','polite');experimentBox.append(expText);const reset=el('button','↺ Převzít barvu vybraného pixelu');reset.type='button';reset.addEventListener('click',()=>resetExperiment());experimentBox.append(reset);right.append(experimentBox);layout.append(left,right);host.append(layout);
 const provenance=el('p',undefined,'pixels-provenance');host.append(provenance);container.append(host);
 const context=canvas.getContext('2d'),detailContext=preview.getContext('2d');if(!context||!detailContext){host.remove();throw new Error('Prohlížeč nepodporuje vykreslení matice.');}
 function paintExperiment(){const invalid=Object.values(channelInputs).flat().some(i=>i.getAttribute('aria-invalid')==='true');if(invalid){expText.textContent='Oprav neplatný kanál: celé číslo od 0 do 255.';swatch.style.background='repeating-conic-gradient(#cbd5e1 0% 25%,#fff 0% 50%) 0 / 16px 16px';swatch.setAttribute('aria-label','Neplatná experimentální barva');return;}const hex=encodeRGB(experiment);swatch.style.background=hex;swatch.setAttribute('aria-label',`Vlastní barva ${hex}`);expText.textContent=`${hex} = RGB(${experiment.r}, ${experiment.g}, ${experiment.b})`;}
 function resetExperiment(){experiment={...pixelAt(sample,row,column).rgb};for(const [key,inputs]of Object.entries(channelInputs))for(const input of inputs){input.value=experiment[key];input.setAttribute('aria-invalid','false');input.setCustomValidity('');}paintExperiment();}
 function selectionBorder(ctx,x,y,size){ctx.strokeStyle='#fff';ctx.lineWidth=3;ctx.strokeRect(x+1.5,y+1.5,size-3,size-3);ctx.strokeStyle='#111827';ctx.lineWidth=1;ctx.strokeRect(x+.5,y+.5,size-1,size-1);}
 function draw(){if(disposed)return;const s=pixelSamples[sample],p=pixelAt(sample,row,column);context.imageSmoothingEnabled=false;context.clearRect(0,0,500,500);for(let r=0;r<s.matrix.rows;r++)for(let c=0;c<s.matrix.columns;c++){context.fillStyle=s.colors[r][c];context.fillRect(c*10,r*10,10,10);}selectionBorder(context,(column-1)*10,(row-1)*10,10);canvas.style.width=(500*zoom)+'px';canvas.style.maxWidth=zoom===1?'100%':'none';canvas.setAttribute('aria-label',`Matice ${s.matrix.rows} × ${s.matrix.columns}. Vybraný řádek ${row}, sloupec ${column}, ${p.hex}. Výběr mění šipky.`);
 detailContext.clearRect(0,0,180,180);for(let dr=-4;dr<=4;dr++)for(let dc=-4;dc<=4;dc++){const rr=row+dr,cc=column+dc;detailContext.fillStyle=rr>=1&&rr<=50&&cc>=1&&cc<=50?s.colors[rr-1][cc-1]:'#e2e8f0';detailContext.fillRect((dc+4)*20,(dr+4)*20,20,20);}selectionBorder(detailContext,80,80,20);rowInput.value=row;colInput.value=column;const h=p.hex.toUpperCase();source.replaceChildren(el('p',`Řádek ${row} · sloupec ${column}`,'pixels-coordinate'),el('strong',h,'pixels-hex'),el('p',`${h.slice(1,3)}₁₆ = R ${p.rgb.r}   ·   ${h.slice(3,5)}₁₆ = G ${p.rgb.g}   ·   ${h.slice(5,7)}₁₆ = B ${p.rgb.b}`),el('p',`Zdrojová buňka: ${s.sheet}!${p.cell}`));provenance.textContent=`${s.label} · ${s.matrix.rows} × ${s.matrix.columns} pixelů · ${s.sheet}!${worksheetCell(s.matrix.startRow,s.matrix.startColumn)}:${worksheetCell(s.matrix.startRow+s.matrix.rows-1,s.matrix.startColumn+s.matrix.columns-1)}. Data jsou převzata ze schválené studijní kopie.`;
 }
 function choose(r,c){row=r;column=c;for(const input of [rowInput,colInput]){input.setCustomValidity('');input.setAttribute('aria-invalid','false');}draw();resetExperiment();}
 canvas.addEventListener('click',event=>{const bounds=canvas.getBoundingClientRect();choose(Math.min(50,Math.max(1,Math.floor((event.clientY-bounds.top)/bounds.height*50)+1)),Math.min(50,Math.max(1,Math.floor((event.clientX-bounds.left)/bounds.width*50)+1)));});
 canvas.addEventListener('keydown',event=>{const delta={ArrowUp:[-1,0],ArrowDown:[1,0],ArrowLeft:[0,-1],ArrowRight:[0,1]};if(delta[event.key]){event.preventDefault();choose(Math.min(50,Math.max(1,row+delta[event.key][0])),Math.min(50,Math.max(1,column+delta[event.key][1])));}else if(event.key==='Home'||event.key==='End'){event.preventDefault();choose(row,event.key==='Home'?1:50);}});
 for(const input of [rowInput,colInput])input.addEventListener('input',()=>{const r=Number(rowInput.value),c=Number(colInput.value);const valid=rowInput.value.trim()!==''&&colInput.value.trim()!==''&&Number.isInteger(r)&&r>=1&&r<=50&&Number.isInteger(c)&&c>=1&&c<=50;input.setCustomValidity(valid?'':'Zadej řádek i sloupec od 1 do 50.');input.setAttribute('aria-invalid',String(!valid));if(valid)choose(r,c);else source.replaceChildren(el('p','Oprav souřadnice: řádek i sloupec musí být celé číslo 1 až 50.'));});
 select.addEventListener('change',()=>{sample=normalizePixelsOptions({sample:Number(select.value)}).sample;choose(1,1);});zoomInput.addEventListener('input',()=>{zoom=Number(zoomInput.value);canvas.style.width=(500*zoom)+'px';canvas.style.maxWidth=zoom===1?'100%':'none';});choose(1,1);return()=>{disposed=true;host.remove();};
}
