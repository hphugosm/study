const definitions = {
 cube:{name:'Krychle',keys:['a'],formula:['6a²','a³']},
 cuboid:{name:'Kvádr',keys:['a','b','c'],formula:['2(ab + ac + bc)','abc']},
 cylinder:{name:'Válec',keys:['r','v'],formula:['2πr² + 2πrv','πr²v']},
 cone:{name:'Kužel',keys:['r','v'],formula:['πr² + πrs','πr²v / 3']},
 sphere:{name:'Koule',keys:['r'],formula:['4πr²','4πr³ / 3']},
 pyramid:{name:'Pravidelný čtyřboký jehlan',keys:['a','v'],formula:['a² + 2as','a²v / 3']},
 frustum:{name:'Komolý kužel',keys:['r1','r2','v'],formula:['πr₁² + πr₂² + π(r₁ + r₂)s','πv(r₁² + r₁r₂ + r₂²) / 3']}
};
const names={a:'a · hrana',b:'b · hrana',c:'c · výška',r:'r · poloměr',r1:'r₁ · dolní poloměr',r2:'r₂ · horní poloměr',v:'v · kolmá výška'};
const colors={a:'#2563eb',b:'#be185d',c:'#d97706',r:'#2563eb',r1:'#2563eb',r2:'#be185d',v:'#d97706',s:'#7c3aed'};
const fmt=x=>new Intl.NumberFormat('cs-CZ',{maximumFractionDigits:2}).format(x);
function record(x){return x!==null&&typeof x==='object'&&!Array.isArray(x)&&Object.getPrototypeOf(x)===Object.prototype;}
export function evaluateSolid(shape, dimensions){
 if(typeof shape!=='string'||!Object.hasOwn(definitions,shape))throw new RangeError('Neznámé těleso.');
 const def=definitions[shape];
 if(!record(dimensions)||Object.keys(dimensions).length!==def.keys.length||def.keys.some(k=>!Object.hasOwn(dimensions,k)||typeof dimensions[k]!=='number'||!Number.isFinite(dimensions[k])||dimensions[k]<=0||dimensions[k]>100))throw new RangeError('Rozměry musí být kladná konečná čísla nejvýše 100.');
 const {a,b,c,r,r1,r2,v}=dimensions;let surface,volume,slant,baseArea,lateralArea,ss,vv;
 switch(shape){
 case'cube':baseArea=a*a;lateralArea=4*a*a;surface=6*a*a;volume=a**3;ss=`6 · ${fmt(a)}²`;vv=`${fmt(a)}³`;break;
 case'cuboid':baseArea=a*b;lateralArea=2*c*(a+b);surface=2*(a*b+a*c+b*c);volume=a*b*c;ss=`2 · (${fmt(a)} · ${fmt(b)} + ${fmt(a)} · ${fmt(c)} + ${fmt(b)} · ${fmt(c)})`;vv=`${fmt(a)} · ${fmt(b)} · ${fmt(c)}`;break;
 case'cylinder':baseArea=Math.PI*r*r;lateralArea=2*Math.PI*r*v;surface=2*baseArea+lateralArea;volume=baseArea*v;ss=`2π · ${fmt(r)}² + 2π · ${fmt(r)} · ${fmt(v)}`;vv=`π · ${fmt(r)}² · ${fmt(v)}`;break;
 case'cone':slant=Math.hypot(r,v);baseArea=Math.PI*r*r;lateralArea=Math.PI*r*slant;surface=baseArea+lateralArea;volume=baseArea*v/3;ss=`π · ${fmt(r)}² + π · ${fmt(r)} · ${fmt(slant)}`;vv=`π · ${fmt(r)}² · ${fmt(v)} / 3`;break;
 case'sphere':baseArea=0;lateralArea=surface=4*Math.PI*r*r;volume=4*Math.PI*r**3/3;ss=`4π · ${fmt(r)}²`;vv=`4π · ${fmt(r)}³ / 3`;break;
 case'pyramid':slant=Math.hypot(a/2,v);baseArea=a*a;lateralArea=2*a*slant;surface=baseArea+lateralArea;volume=baseArea*v/3;ss=`${fmt(a)}² + 2 · ${fmt(a)} · ${fmt(slant)}`;vv=`${fmt(a)}² · ${fmt(v)} / 3`;break;
 case'frustum':slant=Math.hypot(r1-r2,v);baseArea=Math.PI*(r1*r1+r2*r2);lateralArea=Math.PI*(r1+r2)*slant;surface=baseArea+lateralArea;volume=Math.PI*v*(r1*r1+r1*r2+r2*r2)/3;ss=`π · ${fmt(r1)}² + π · ${fmt(r2)}² + π · (${fmt(r1)} + ${fmt(r2)}) · ${fmt(slant)}`;vv=`π · ${fmt(v)} · (${fmt(r1)}² + ${fmt(r1)} · ${fmt(r2)} + ${fmt(r2)}²) / 3`;break;
 }
 return {shape,dimensions:{...dimensions},surface,volume,slant,baseArea,lateralArea,formula:{surface:def.formula[0],volume:def.formula[1]},substitution:{surface:ss,volume:vv}};
}
export function normalizeStereometryOptions(defaults={}){
 if(!record(defaults)||Object.keys(defaults).some(k=>!['shape','dimensions','mode'].includes(k)))throw new TypeError('Neplatné nastavení stereometrie.');
 const shape=defaults.shape??'cone',mode=defaults.mode??'surface';
 if(typeof shape!=='string'||!Object.hasOwn(definitions,shape)||!['surface','volume'].includes(mode))throw new RangeError('Neplatné těleso nebo režim.');
 const dimensions=defaults.dimensions??Object.fromEntries(definitions[shape].keys.map(k=>[k,k==='r2'?2.5:k==='r1'?5:k==='r'?(shape==='sphere'?6:4):k==='v'?7:k==='b'?4:k==='c'?5:6]));
 evaluateSolid(shape,dimensions);
 if(Object.values(dimensions).some(n=>n<0.5||n>10))throw new RangeError('Ovládání podporuje rozměry od 0,5 do 10 cm.');
 return {shape,mode,dimensions:{...dimensions}};
}
function node(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;}
const NS='http://www.w3.org/2000/svg';
function svgNode(tag,attrs={}){const n=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,String(v));return n;}
function draw(svg,shape,d,mode){
 svg.replaceChildren();svg.setAttribute('data-quantity',mode);const title=svgNode('title');title.textContent=`${definitions[shape].name}: rozměry v centimetrech, stejná délková stupnice při změně rozměrů`;svg.append(title);
 const P=['cube','cuboid','pyramid'].includes(shape)?17:14,center=170;let bottom=140+(d.v??0)*P/2;
 const add=(tag,a)=>{const n=svgNode(tag,a);svg.append(n);return n;};
 const face=(pts,tone=0)=>add('polygon',{points:pts.map(p=>p.join(',')).join(' '),fill:mode==='surface'?['#bfdbfe','#dbeafe','#93c5fd'][tone]:'#dbeafe',stroke:'#334155','stroke-width':1.5});
 const line=(x1,y1,x2,y2,key,dashed=false)=>add('line',{x1,y1,x2,y2,stroke:colors[key]||'#64748b','stroke-width':2,'stroke-dasharray':dashed?'5 4':'none'});
 const label=(x,y,key,value)=>{const n=add('text',{x,y,fill:colors[key], 'font-size':18,'font-weight':700,'text-anchor':'middle',stroke:'#fff','stroke-width':3,'paint-order':'stroke'});n.textContent=`${key.replace('1','₁').replace('2','₂')} = ${fmt(value)}`;};
 if(shape==='cube'||shape==='cuboid'||shape==='pyramid'){
 const a=d.a*P,b=(d.b??d.a)*P*.55,h=(d.c??d.v??d.a)*P;bottom=135+(h+b*.5)/2;
 const A=[center-a/2-b*.35,bottom],B=[A[0]+a,bottom],C=[B[0]+b*.7,bottom-b*.5],D=[A[0]+b*.7,bottom-b*.5];
 if(shape==='pyramid'){
 const O=[(A[0]+C[0])/2,(A[1]+C[1])/2],T=[O[0],O[1]-h];face([A,B,C,D],1);face([A,B,T]);face([B,C,T],2);line(...O,...T,'v',true);label(O[0]+19,(O[1]+T[1])/2,'v',d.v);
 const M=[(A[0]+B[0])/2,bottom];line(...T,...M,'s');label(M[0]-20,(T[1]+M[1])/2,'s',Math.hypot(d.a/2,d.v));
 }else{const top=p=>[p[0],p[1]-h];face([A,B,top(B),top(A)]);face([B,C,top(C),top(B)],2);face([top(A),top(B),top(C),top(D)],1);line(...B,...top(B),shape==='cube'?'a':'c');if(shape==='cuboid'){label(B[0]+18,bottom-h/2,'c',d.c);line(...B,...C,'b');label(C[0]+12,C[1]+13,'b',d.b);}}
 line(...A,...B,'a');label((A[0]+B[0])/2,bottom+21,'a',d.a);
 }else if(shape==='sphere'){
 const rr=d.r*P,cy=140;add('circle',{cx:center,cy,r:rr,fill:mode==='surface'?'#bfdbfe':'#dbeafe',stroke:'#334155','stroke-width':1.5});add('ellipse',{cx:center,cy,rx:rr,ry:rr*.25,fill:'none',stroke:'#64748b','stroke-dasharray':'4 3'});line(center,cy,center+rr,cy,'r');label(center+rr/2,cy-9,'r',d.r);
 }else{
 const rb=(d.r??d.r1)*P,rt=shape==='cylinder'?rb:shape==='frustum'?d.r2*P:0,h=d.v*P,y=bottom,top=y-h;
 add('ellipse',{cx:center,cy:y,rx:rb,ry:rb*.25,fill:'#dbeafe',stroke:'#64748b','stroke-dasharray':'4 3'});
 const path=`M ${center-rb} ${y} L ${center-rt} ${top} A ${rt} ${rt*.25} 0 0 1 ${center+rt} ${top} L ${center+rb} ${y} A ${rb} ${rb*.25} 0 0 1 ${center-rb} ${y} Z`;
 add('path',{d:path,fill:mode==='surface'?'#bfdbfe':'#dbeafe',stroke:'#334155','stroke-width':1.5});
 if(rt)add('ellipse',{cx:center,cy:top,rx:rt,ry:rt*.25,fill:'#eff6ff',stroke:'#334155'});
 line(center,y,center,top,'v',true);label(center-17,(top+y)/2,'v',d.v);
 const rk=shape==='frustum'?'r1':'r';line(center,y,center+rb,y,rk);label(center+rb/2,y+19,rk,d.r??d.r1);
 if(shape==='frustum'){line(center,top,center+rt,top,'r2');label(center+rt/2,top-10,'r2',d.r2);}
 if(shape!=='cylinder'){line(center+rb,y,center+rt,top,'s');label(Math.min(290,center+Math.max(rb,rt)+23),(y+top)/2,'s',Math.hypot((d.r??d.r1)-(d.r2??0),d.v));}
 }
 line(20,295,20+P,295,'a');const legend=add('text',{x:42,y:299,fill:'#475569','font-size':11});legend.textContent='1 cm · stejná stupnice, schematická projekce';
}


// True sector angles; points use one uniform scale, translated into a unit square.
export function evaluateNet(shape,dimensions){
 const solid=evaluateSolid(shape,dimensions);
 if(!['cone','frustum'].includes(shape))throw new RangeError('Síť pláště podporuje kužel a komolý kužel.');
 const r=shape==='cone'?dimensions.r:Math.max(dimensions.r1,dimensions.r2),small=shape==='cone'?0:Math.min(dimensions.r1,dimensions.r2),delta=r-small,s=solid.slant;
 if(shape==='frustum'&&delta<=1e-6*Math.max(r,small)){
  const width=2*Math.PI*((r+small)/2),height=dimensions.v,max=Math.max(width,height);
  return {kind:'rectangle',angle:0,outerRadius:null,innerRadius:null,approximate:delta!==0,points:[[0,0],[width/max,0],[width/max,height/max],[0,height/max]]};
 }
 const angle=2*Math.PI*delta/s,outerRadius=s*r/delta,innerRadius=s*small/delta,count=Math.max(24,Math.ceil(angle*24)),points=[];
 // Shift the common apex before normalizing: small-angle nets remain numerically stable.
 for(let i=0;i<=count;i++){const t=-angle/2+angle*i/count;points.push([outerRadius*Math.sin(t),outerRadius*(Math.cos(t)-1)]);}
 if(innerRadius===0)points.push([0,-outerRadius]);
 else for(let i=count;i>=0;i--){const t=-angle/2+angle*i/count;points.push([innerRadius*Math.sin(t),innerRadius*(Math.cos(t)-1)-s]);}
 const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]),minX=Math.min(...xs),minY=Math.min(...ys),scale=Math.max(Math.max(...xs)-minX,Math.max(...ys)-minY);
 return {kind:'sector',angle,outerRadius,innerRadius,approximate:false,points:points.map(([x,y])=>[(x-minX)/scale,(y-minY)/scale])};
}

function explain(host,shape,d,mode){
 host.replaceChildren(node('h4','Proč takhle?'));
 const svg=svgNode('svg',{viewBox:'0 0 360 130',role:'img','aria-label':'Schéma částí povrchu'});host.append(svg);
 const add=(tag,attrs,text)=>{const n=svgNode(tag,attrs);if(text)n.textContent=text;svg.append(n);return n;};
 const box=(x,y,w,h,color='#dbeafe')=>add('rect',{x,y,width:w,height:h,fill:color,stroke:'#2563eb','stroke-width':1.5});
 const text=(x,y,t)=>add('text',{x,y,fill:'#1e293b','font-size':13,'text-anchor':'middle'},t);
 const circle=(x,y,r=23)=>add('circle',{cx:x,cy:y,r,fill:'#dbeafe',stroke:'#2563eb','stroke-width':1.5});
 let explanation;
 if(shape==='cube'||shape==='cuboid'){
 for(let i=0;i<6;i++){const x=10+i*57;box(x,24,47,shape==='cube'?47:i<2?34:i<4?47:57,i<2?'#dbeafe':i<4?'#fce7f3':'#ffedd5');text(x+23,103,shape==='cube'?'a²':i<2?'ab':i<4?'ac':'bc');}
 explanation=shape==='cube'?'Šest shodných čtvercových stěn: S = 6 · a². Objem skládáme z a vrstev, každá má obsah a²: V = a² · a.':'Tři dvojice protějších stěn: 2ab + 2ac + 2bc. Objem: obsah podstavy ab krát kolmá výška c.';
 }else if(shape==='cylinder'){
 circle(40,52);circle(105,52);box(160,28,175,56);text(72,110,'2 × πr²');text(246,20,'2πr');text(345,60,'v');text(246,110,'plášť = 2πr · v');
 explanation='Dvě kruhové podstavy a rozvinutý obdélníkový plášť. Jeho šířka je obvod kruhu 2πr, výška je v. Objem: πr² · v.';
 }else if(shape==='cone'){
 circle(55,65);text(55,112,'πr²');const net=evaluateNet(shape,d);add('polygon',{points:net.points.map(([x,y])=>`${190+x*85},${12+y*85}`).join(' '),fill:'#ede9fe',stroke:'#7c3aed','stroke-width':1.5});text(270,114,`oblouk 2πr · úhel ${fmt(net.angle*180/Math.PI)}°`);
 explanation='Povrch tvoří kruhová podstava a kruhová výseč pláště. Výseč má poloměr s a oblouk 2πr; obsah pláště je πrs. Objem je třetina válce se stejnou podstavou a výškou.';
 }else if(shape==='pyramid'){
 box(12,40,52,52);text(38,114,'a²');for(let i=0;i<4;i++){const x=94+i*65;add('polygon',{points:`${x},90 ${x+52},90 ${x+26},25`,fill:'#ede9fe',stroke:'#7c3aed','stroke-width':1.5});text(x+26,114,'as / 2');}
 explanation='Čtvercová podstava a čtyři shodné trojúhelníkové stěny. Každá má obsah a · s / 2, dohromady tedy 2as. Objem: třetina obsahu podstavy krát kolmá výška v.';
 }else if(shape==='sphere'){
 for(let i=0;i<4;i++){circle(50+i*84,52,28);text(50+i*84,104,'πr²');}
 explanation='Obsah povrchu koule se rovná obsahu čtyř kruhů o poloměru r: 4πr². Toto je srovnání obsahů, nikoli rovinná síť koule. Objem: 4πr³ / 3.';
 }else{
 const largest=Math.max(d.r1,d.r2);circle(35,57,27*d.r1/largest);circle(104,57,27*d.r2/largest);const net=evaluateNet(shape,d);add('polygon',{points:net.points.map(([x,y])=>`${190+x*85},${12+y*85}`).join(' '),fill:'#ede9fe',stroke:'#7c3aed','stroke-width':1.5});text(35,112,'πr₁²');text(105,112,'πr₂²');text(265,112,net.kind==='rectangle'?'obdélník · 2πr × v':`výseč · ${fmt(net.angle*180/Math.PI)}°`);
 explanation='Dvě různé kruhové podstavy a plášť. Plášť se rozvine do mezikruhové výseče; při stejných poloměrech do obdélníku. Jeho obsah π(r₁ + r₂)s musíme přičíst k OBĚMA podstavám. Objem: πv(r₁² + r₁r₂ + r₂²) / 3.';
 }
 const schemaNote=shape==='cone'?'Části jsou zmenšené samostatně; úhel výseče odpovídá rozměrům.':shape==='frustum'?'Části jsou zmenšené samostatně; úhel výseče odpovídá rozměrům. Při téměř stejných poloměrech ukazujeme limitní obdélník.':'Schéma částí není v měřítku.';
 host.append(node('p',explanation),node('p',`${schemaNote} Modrý náčrt výše používá stálou délkovou stupnici.`,'stereo-schema-note'));
}

export function mountStereometry(container,defaults={}){
 let state=normalizeStereometryOptions(defaults),disposed=false;const host=node('section',undefined,'stereometry');host.setAttribute('aria-label','Interaktivní stereometrie');
 const link=node('link');link.rel='stylesheet';link.href=new URL('./stereometry.css',import.meta.url).href;host.append(link);
 const header=node('div',undefined,'stereo-toolbar'),select=node('select');select.setAttribute('aria-label','Těleso');for(const[k,v]of Object.entries(definitions)){const o=node('option',v.name);o.value=k;select.append(o);}select.value=state.shape;header.append(select);
 const tabs=node('div',undefined,'stereo-tabs');tabs.setAttribute('role','group');tabs.setAttribute('aria-label','Počítaná veličina');const modeButtons={};for(const[m,t]of [['surface','Povrch S'],['volume','Objem V']]){const b=node('button',t);b.type='button';b.addEventListener('click',()=>{state.mode=m;update();});modeButtons[m]=b;tabs.append(b);}header.append(tabs);host.append(header);
 const grid=node('div',undefined,'stereo-grid'),visual=node('div',undefined,'stereo-visual'),visualCaption=node('p',undefined,'stereo-visual-caption'),svg=svgNode('svg',{viewBox:'0 0 340 315',role:'img','aria-label':'Rozměrový náčrt tělesa'});visual.append(svg,visualCaption);const controls=node('div',undefined,'stereo-controls');grid.append(visual,controls);host.append(grid);
 const validation=node('p',undefined,'stereo-validation');validation.setAttribute('role','alert');validation.hidden=true;host.append(validation);
 const result=node('div',undefined,'stereo-result');result.setAttribute('aria-live','polite');result.setAttribute('aria-atomic','true');host.append(result);
 const insight=node('div',undefined,'stereo-insight'),scaleLabel=node('label','Změň všechny délky stejným poměrem k '),scale=document.createElement('input');scale.type='range';scale.min='.5';scale.max='2';scale.step='.1';scale.value='2';scaleLabel.append(scale);insight.append(scaleLabel);const scaleText=node('p');scaleText.setAttribute('aria-live','polite');insight.append(scaleText);host.append(insight);
 const why=node('section',undefined,'stereo-why');host.append(why);
 const convention=node('p','Počítáme uzavřená tělesa v cm: povrch zahrnuje i podstavy. r je poloměr, nikoli průměr. Jehlan má čtvercovou podstavu a vrchol kolmo nad jejím středem.','stereo-convention');host.append(convention);
 const prompt=node('p',undefined,'stereo-prompt');host.append(prompt);const inputs={};
 function buildControls(){controls.replaceChildren();for(const k of Object.keys(inputs))delete inputs[k];for(const k of definitions[state.shape].keys){const label=node('label',names[k]+' (cm)'),row=node('div',undefined,'stereo-control-row'),range=node('input'),number=node('input');for(const input of [range,number]){input.type=input===range?'range':'number';input.min='.5';input.max='10';input.step='.1';input.value=state.dimensions[k];input.setAttribute('aria-label',names[k]+' v centimetrech'+(input===range?', posuvník':''));input.style.accentColor=colors[k];}row.append(range,number);label.style.setProperty('--dimension-color',colors[k]);label.append(row);controls.append(label);inputs[k]=[range,number];for(const input of [range,number])input.addEventListener('input',()=>{const n=Number(input.value);if(input.value.trim()===''||!Number.isFinite(n)||n<.5||n>10){input.setCustomValidity('Zadej číslo od 0,5 do 10 cm.');update();return;}input.setCustomValidity('');state.dimensions[k]=n;for(const other of inputs[k])if(other!==input)other.value=n;update();});}}
 function formulaLine(text){const p=node('p',undefined,'stereo-formula');for(const token of text.split(/(r₁|r₂|[abcrvs])/g)){const key=token==='r₁'?'r1':token==='r₂'?'r2':token;const span=node('span',token);if(colors[key])span.style.color=colors[key];p.append(span);}return p;}
 function update(){
 if(disposed)return;
 const invalid=[];
 for(const [key,[,number]] of Object.entries(inputs)){
  const value=Number(number.value),bad=number.value.trim()===''||!Number.isFinite(value)||value<.5||value>10;
  number.setAttribute('aria-invalid',String(bad));number.setCustomValidity(bad?'Zadej číslo od 0,5 do 10 cm.':'');
  if(bad)invalid.push(names[key]);
 }
 validation.hidden=invalid.length===0;visual.hidden=invalid.length>0;result.hidden=invalid.length>0;insight.hidden=invalid.length>0;why.hidden=invalid.length>0;
 if(invalid.length){validation.textContent=`${invalid.join(', ')}: zadej rozměr od 0,5 do 10 cm. Potom se náčrt a výsledek přepočítají.`;return;}
 const e=evaluateSolid(state.shape,state.dimensions),m=state.mode,unit=m==='surface'?'cm²':'cm³',symbol=m==='surface'?'S':'V';for(const[k,b]of Object.entries(modeButtons))b.setAttribute('aria-pressed',String(k===m));draw(svg,state.shape,state.dimensions,m);explain(why,state.shape,state.dimensions,m);visualCaption.textContent=m==='surface'?'S · zvýrazněné hraniční plochy tělesa':'V · modře vyplněný vnitřní prostor tělesa';result.replaceChildren(node('p',m==='surface'?'POVRCH · součet všech hraničních ploch':'OBJEM · prostor uvnitř tělesa','stereo-eyebrow'),formulaLine(`${symbol} = ${e.formula[m]}`),node('p',`${symbol} ≈ ${e.substitution[m]} ≈ ${fmt(e[m])} ${unit}`,'stereo-substitution'));
 if(m==='surface'&&state.shape!=='sphere'){const bases=['cube','cuboid','cylinder'].includes(state.shape)?2*e.baseArea:e.baseArea;result.append(node('p',`Podstavy: ${fmt(bases)} cm² + plášť: ${fmt(e.lateralArea)} cm² ≈ ${fmt(e.surface)} cm².`,'stereo-breakdown'));}
 if(e.slant){const relation=state.shape==='pyramid'?'√(v² + (a/2)²)':state.shape==='frustum'?'√(v² + (r₁ − r₂)²)':'√(v² + r²)';result.append(node('p',`s = ${relation} ≈ ${fmt(e.slant)} cm. ${state.shape==='pyramid'?'s je výška boční trojúhelníkové stěny, ne boční hrana.':'s je délka strany pláště.'} Kolmá výška v je jiná délka.`,'stereo-slant'));}
 const k=Number(scale.value),power=m==='surface'?2:3;scaleText.textContent=`k = ${fmt(k)} → ${symbol} se násobí k${power===2?'²':'³'} = ${fmt(k**power)}. ${fmt(e[m])} → ${fmt(e[m]*k**power)} ${unit}.`;prompt.textContent=state.shape==='cone'?'Zkus měnit jen výšku v. Proč objem roste přímo, ale s se musí znovu dopočítat?':state.shape==='frustum'?'Nastav r₁ = r₂. Poznáš ve vzorcích i v náčrtu válec?':state.shape==='pyramid'?'Sleduj výšku stěny s. Proč pro ni používáme polovinu hrany a?':'Nejdřív odhadni: co udělá zdvojnásobení všech délek? Pak porovnej povrch a objem.';
 }
 select.addEventListener('change',()=>{state=normalizeStereometryOptions({shape:select.value,mode:state.mode});buildControls();update();});scale.addEventListener('input',update);container.append(host);buildControls();update();return()=>{disposed=true;host.remove();};
}
