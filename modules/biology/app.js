'use strict';
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const regions = [{id:'all',name:'Celé tělo',symbol:'✳'},{id:'hlava',name:'Hlava',symbol:'◉'},{id:'trup',name:'Trup',symbol:'⊞'},{id:'horni',name:'Horní končetina',symbol:'⌁'},{id:'dolni',name:'Dolní končetina',symbol:'⌇'}];
const regionName = id => regions.find(x=>x.id===id)?.name || id;
const viewBoxes = {all:[0,0,500,1000],hlava:[150,20,200,170],trup:[85,145,330,410],horni:[15,150,470,510],dolni:[115,435,270,565]};
let data, studyCards=[], atlasRegion='all', selected='pazni', cardRegion='all', deck=[], cardIndex=0, flipped=false, notesView='sections', page='atlas';
let known=new Set(), legacyKnown=null;
try {
  const saved=localStorage.getItem('kostra-progress-v2');
  if(saved!==null){const ids=JSON.parse(saved);if(Array.isArray(ids))known=new Set(ids.filter(x=>typeof x==='string'));}
  else {const ids=JSON.parse(localStorage.getItem('kostra-progress-v1')||'[]');if(Array.isArray(ids))legacyKnown=ids;}
} catch {}
const save = () => {try {localStorage.setItem('kostra-progress-v2',JSON.stringify([...known]));}catch{}};
const getBone = () => data.bones.find(b=>b.id===selected) || data.bones[0];
function renderRegionTabs(container,current,onChange){
  container.innerHTML=regions.map(r=>`<button type="button" data-region="${r.id}" class="${current===r.id?'active':''}" aria-pressed="${current===r.id}"><span class="region-symbol" aria-hidden="true">${r.symbol}</span>${r.name}</button>`).join('');
  $$('button',container).forEach(btn=>btn.addEventListener('click',()=>onChange(btn.dataset.region)));
}
function chooseRegion(id){
  atlasRegion=id;
  if(id!=='all'&&getBone().region!==id)selected=data.bones.find(b=>b.region===id&&b.visibility!=='hidden').id;
  renderAtlas();
}
function chooseBone(id,scroll=false){
  selected=id;
  const b=getBone();
  if(atlasRegion!=='all'&&atlasRegion!==b.region)atlasRegion=b.region;
  renderAtlas();
  if(scroll&&matchMedia('(max-width:600px)').matches)$('#bone-detail').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function renderAtlas(){
  renderRegionTabs($('#atlas-regions'),atlasRegion,chooseRegion);
  const b=getBone();
  const card=studyCards.find(c=>c.id===b.id);
  const number=String(data.bones.indexOf(b)+1).padStart(2,'0');
  let detailArt='';
  const sourceSvg=$('#skeleton-art svg');
  if(!card&&sourceSvg){const clone=sourceSvg.cloneNode(true);clone.querySelectorAll('defs').forEach(el=>el.remove());clone.setAttribute('viewBox',[b.point[0]-65,b.point[1]-65,130,130].join(' '));clone.setAttribute('aria-hidden','true');clone.querySelectorAll('.bone-selected,.region-muted').forEach(el=>el.classList.remove('bone-selected','region-muted'));clone.querySelectorAll('[data-bone]').forEach(el=>{if(el.dataset.bone===b.id){el.style.stroke='#b07b35';el.style.strokeWidth='2.5';}});detailArt=clone.outerHTML;}
  const visibility=b.visibility==='hidden'?'<p class="detail-intro">↳ Tato kost je v předním pohledu skrytá. Její skutečnou polohu popisují fakta níže.</p>':b.visibility==='partial'?'<p class="detail-intro">↳ V předním pohledu je vidět jen část této kosti.</p>':'';
  $('#bone-detail').innerHTML=`<div class="detail-meta"><span><i class="mini-dot"></i>${esc(regionName(b.region))}</span><span>č. ${number}</span></div><h3>${esc(b.name)}</h3><p class="latin">${esc(b.latin)}</p><div class="detail-visual">${card?`<img src="${esc(card.image)}?v=${esc(card.imageVersion)}" alt="${esc(b.name)} — ${card.source==='presentation'?'obrázek z prezentace':'zvýrazněný detail atlasu'}">`:detailArt}</div><p class="detail-intro">${esc(b.summary)}</p>${visibility}<ul>${b.facts.map(f=>`<li>${esc(f)}</li>`).join('')}</ul><p class="detail-source">NAVAZUJE NA SNÍMEK ${esc(b.slide)} Z PREZENTACE</p><button class="outline-button" id="practice-region">Procvičit ${b.region==='hlava'?'hlavu':b.region==='trup'?'trup':b.region==='horni'?'horní končetinu':'dolní končetinu'} <span>↗</span></button>`;
  $('#practice-region').addEventListener('click',()=>{cardRegion=b.region;$('#only-unknown').checked=false;rebuildDeck();location.hash='cards';});
  const svg=$('#skeleton-art svg');
  if(svg){
    svg.setAttribute('viewBox',viewBoxes[atlasRegion].join(' '));
    const art=$('#skeleton-art');art.style.width=atlasRegion==='all'?'': '77%';
    $$('[data-bone]',svg).forEach(el=>{el.classList.toggle('bone-selected',(el.dataset.bone||'').split(' ').includes(b.id));const bone=data.bones.find(x=>x.id===el.dataset.bone);el.classList.toggle('region-muted',atlasRegion!=='all'&&bone&&bone.region!==atlasRegion);});
  }
  renderDirectory();requestAnimationFrame(renderHotspots);
}
function renderHotspots(){
  if(!data||page!=='atlas')return;
  const art=$('#skeleton-art'),layer=$('#bone-hotspots'),canvas=$('.body-canvas');
  const vb=viewBoxes[atlasRegion];
  const w=Math.min(art.clientWidth,art.clientHeight*vb[2]/vb[3]),h=w*vb[3]/vb[2];
  const curated={all:['lebka','klicni','lopatka','hrudni-kost','zebra','pazni','vretenni','loketni','panevni','zapesti','stehenni','ceska','holenni','lytkova','nartni'],hlava:['celni','temenni','spankova','nosni','licni','horni-celist','dolni-celist','jazylka'],trup:['krcni','hrudni-kost','zebra','hrudni','bederni','krizova','kostrc'],horni:['klicni','lopatka','pazni','loketni','vretenni','zapesti','zaprsti','prsty-ruky'],dolni:['panevni','stehenni','ceska','holenni','lytkova','zanarti','nartni','prsty-nohy']};
  const ids=[...curated[atlasRegion]];
  if(getBone().visibility!=='hidden'&&!ids.includes(selected))ids.push(selected);
  const visible=ids.map(id=>data.bones.find(b=>b.id===id)).filter(b=>b&&b.visibility!=='hidden'&&b.point[1]>=vb[1]&&b.point[1]<=vb[1]+vb[3]);
  const rightIds=new Set(['hrudni-kost','zebra','vretenni','panevni','stehenni','holenni','nartni','temenni','spankova','horni-celist','jazylka','hrudni','kostrc','zaprsti','prsty-nohy']);
  const paired=new Set(['klicni','lopatka','zebra','pazni','vretenni','loketni','panevni','zapesti','zaprsti','prsty-ruky','stehenni','ceska','holenni','lytkova','zanarti','nartni','prsty-nohy','temenni','spankova','horni-celist','licni']);
  const anchors=visible.map(b=>{
    const left=!rightIds.has(b.id);
    let px=b.point[0];if(paired.has(b.id)&&((left&&px>250)||(!left&&px<250)))px=500-px;
    const x=canvas.clientWidth/2+(px-vb[0]-vb[2]/2)*w/vb[2],y=(layer.clientHeight-h)/2+(b.point[1]-vb[1])*h/vb[3];
    return {b,left,x,y,labelY:y};
  });
  for(const side of [true,false]){
    const list=anchors.filter(a=>a.left===side).sort((a,b)=>a.y-b.y);let prev=-10;
    for(const a of list){a.labelY=Math.max(a.y,prev+20);prev=a.labelY;}
    const overflow=prev-(layer.clientHeight-15);if(overflow>0)for(const a of list)a.labelY-=overflow;
  }
  layer.innerHTML=anchors.map(({b,left,x,y,labelY})=>{
    const dy=labelY-y,angle=Math.atan2(dy,26)*180/Math.PI*(left?-1:1);
    return `<button class="hotspot ${left?'label-left':'label-right'} ${selected===b.id?'selected':''}" data-bone="${b.id}" style="left:${x}px;top:${y}px" aria-label="${esc(b.name)}" aria-pressed="${selected===b.id}"><span class="point"></span><span class="leader" style="transform:rotate(${angle}deg);transform-origin:${left?'right':'left'} center"></span><span class="hotspot-label" style="position:relative;top:${dy}px">${esc(b.name)}</span></button>`;
  }).join('');
  $$('button',layer).forEach(el=>el.addEventListener('click',()=>chooseBone(el.dataset.bone,true)));
}
function renderDirectory(){
  const query=normalize($('#bone-search').value);
  const bones=data.bones.filter(b=>(atlasRegion==='all'||b.region===atlasRegion)&&normalize(b.name+' '+b.latin).includes(query));
  $('#bone-count').textContent=bones.length+' položek';
  $('#bone-directory').innerHTML=bones.length?bones.map(b=>`<button class="bone-item ${selected===b.id?'selected':''}" data-id="${b.id}" aria-pressed="${selected===b.id}"><span>${String(data.bones.indexOf(b)+1).padStart(2,'0')}</span><span><strong>${esc(b.name)}</strong><small>${esc(b.latin)}</small></span><span class="item-arrow">↗</span></button>`).join(''):'<p class="empty-state">Takovou kost tu nemáme. Zkus jiný název nebo vyber celé tělo.</p>';
  $$('button',$('#bone-directory')).forEach(btn=>btn.addEventListener('click',()=>chooseBone(btn.dataset.id,true)));
}
function rebuildDeck(){
  deck=studyCards.filter(c=>(cardRegion==='all'||c.region===cardRegion)&&(!$('#only-unknown').checked||!known.has(c.id)));
  cardIndex=0;flipped=false;
  renderRegionTabs($('#card-regions'),cardRegion,id=>{cardRegion=id;rebuildDeck();});
  renderCard();
}
function renderCard(){
  const c=deck[cardIndex],card=$('#flashcard');
  const total=studyCards.filter(x=>known.has(x.id)).length;
  $('#mastered-total').textContent=total;$('#cards-total').textContent=`z ${studyCards.length} obrázků`;
  $('#card-position').textContent=c?`Kartička ${cardIndex+1} / ${deck.length}`:'Sada dokončena';
  $('#card-topic').textContent=c?regionName(c.region):regionName(cardRegion);
  card.classList.toggle('answer',flipped&&!!c);
  $('#card-status').textContent=c?(flipped?`Odpověď: ${c.name}. ${c.detail}`:`Kartička ${cardIndex+1} z ${deck.length}. ${c.hint}`):'V této sadě už nic nezbývá k opakování.';
  if(!c){
    card.innerHTML='<div class="empty-state"><h2>Tohle už máš v hlavě.</h2><p>V této oblasti teď nezbývá žádná kartička k opakování.</p><button id="show-all-cards">Prohlédnout celou sadu</button></div>';card.removeAttribute('role');card.tabIndex=-1;
    $('#show-all-cards').addEventListener('click',()=>{$('#only-unknown').checked=false;rebuildDeck();});
  }else{
    card.setAttribute('role','button');card.tabIndex=0;
    card.setAttribute('aria-label',flipped?'Zobrazit obrázek':'Otočit kartičku a zobrazit odpověď');
    card.innerHTML=flipped?`<div class="answer-content"><p class="answer-label">SPRÁVNÁ ODPOVĚĎ</p><h2>${esc(c.name)}</h2><p class="latin">${esc(c.latin)}</p><p class="answer-detail">${esc(c.detail)}</p><p class="answer-source">${esc(c.sourceLabel)}</p></div><span class="flip-hint"><span>${known.has(c.id)?'✓ Tuto kartičku už máš označenou jako umím':''}</span><span>Zpět na obrázek ↻</span></span>`:`<span class="question">${esc(c.hint)}</span><img class="card-image" src="${esc(c.image)}?v=${esc(c.imageVersion)}" alt="${c.promptKind==='whole'?'Celá kost k poznání.':'Obrázek s oranžovým označením hledané kosti nebo skupiny.'}"><span class="flip-hint"><span>Vybav si český název</span><span>Kliknutím otočíš ↻</span></span>`;
  }
  $('#flip-card').textContent=flipped?'Zobrazit obrázek ↻':'Otočit kartičku ↻';
  $('#assessment').hidden=!flipped||!c;$('.card-actions').hidden=!c;$('#card-image-zoom').hidden=flipped||!c;
  $('#prev-card').disabled=deck.length<2;$('#next-card').disabled=deck.length<2;
  const filtered=studyCards.filter(x=>cardRegion==='all'||x.region===cardRegion),mastered=filtered.filter(x=>known.has(x.id)).length;
  $('#deck-progress-fill').style.width=`${filtered.length?100*mastered/filtered.length:0}%`;
  $('#deck-progress-caption').textContent=`${mastered} z ${filtered.length} kartiček v této oblasti už poznáš`;
}
function flipCard(){if(deck.length){flipped=!flipped;renderCard();}}
function moveCard(delta){if(deck.length){cardIndex=(cardIndex+delta+deck.length)%deck.length;flipped=false;renderCard();}}
function assess(value){
  const c=deck[cardIndex];if(!c||!flipped)return;
  value?known.add(c.id):known.delete(c.id);save();
  if($('#only-unknown').checked&&value){deck.splice(cardIndex,1);if(cardIndex>=deck.length)cardIndex=0;flipped=false;renderCard();}else moveCard(1);
}
function shuffle(){for(let i=deck.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]];}cardIndex=0;flipped=false;renderCard();$('#card-status').textContent='Kartičky jsou zamíchané.';}
function renderNotes(){
  const query=normalize($('#notes-search').value);
  $$('[data-notes-view]').forEach(b=>{b.classList.toggle('active',b.dataset.notesView===notesView);b.setAttribute('aria-pressed',String(b.dataset.notesView===notesView));});
  const target=$('#notes-content');
  if(notesView==='glossary'){
    const list=data.notes.glossary.filter(t=>normalize(t.term+' '+t.definition).includes(query)).sort((a,b)=>a.term.localeCompare(b.term,'cs'));
    target.innerHTML=list.length?`<dl class="glossary">${list.map(t=>`<div class="glossary-item"><dt>${esc(t.term)}</dt><dd>${esc(t.definition)}</dd><small class="slides-ref">SNÍMKY ${esc(t.slides.join(", "))}</small></div>`).join('')}</dl>`:'<p class="empty-state">Tento pojem se ve slovníčku nenašel.</p>';
  }else{
    const list=data.notes.sections.filter(s=>normalize(s.title+' '+s.summary+' '+s.items.join(' ')).includes(query));
    target.innerHTML=list.length?`<div class="notes-grid">${list.map(s=>`<details class="notes-topic"${query?' open':''}><summary><div class="topic-head"><h2>${esc(s.title)}</h2><span class="topic-number">${String(data.notes.sections.indexOf(s)+1).padStart(2,'0')}</span></div><p class="notes-summary">${esc(s.summary)}</p><span class="notes-disclosure" aria-hidden="true">＋</span></summary><div class="notes-body"><ul>${s.items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul><span class="slides-ref">SNÍMKY ${esc(s.slideRange)}</span></div></details>`).join('')}</div>`:'<p class="empty-state">Zkus hledat jiné slovo. Pro rychlé definice přepni na slovníček.</p>';
  }
}
function route(){
  page=['atlas','cards','map','notes'].includes(location.hash.slice(1))?location.hash.slice(1):'atlas';
  $$('.page').forEach(s=>s.hidden=s.id!==page+'-page');
  $$('nav [data-page]').forEach(a=>{a.classList.toggle('active',a.dataset.page===page);if(a.dataset.page===page)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  if(page==='atlas')requestAnimationFrame(renderHotspots);
  if(page==='map')window.KostraMapUI?.activate();
}
async function init(){
  try{
    const content=window.KOSTRA_DATA,art=window.KOSTRA_SVG;
    if(!content||!art)throw Error('Chybí obsah atlasu');
    data=content;
    studyCards=window.KostraStudyCards.createCards(data,window.KostraMapQuiz);
    if(legacyKnown)known=new Set(window.KostraStudyCards.migrateKnown(legacyKnown));
    known=new Set([...known].filter(id=>studyCards.some(c=>c.id===id)));
    save();
    $('#skeleton-art').innerHTML=art;
    $('#skeleton-art').addEventListener('click',e=>{const group=e.target.closest('[data-bone]');if(group&&data.bones.some(b=>b.id===group.dataset.bone))chooseBone(group.dataset.bone,true);});
    $('#loading').hidden=true;route();renderAtlas();rebuildDeck();renderNotes();
    $('#references').innerHTML=data.notes.sources.map(s=>`<a class="reference-link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a>`).join('');
    $('#bone-search').addEventListener('input',renderDirectory);
    $('#show-labels').addEventListener('change',e=>$('.anatomy-card').classList.toggle('labels-hidden',!e.target.checked));
    $('#only-unknown').addEventListener('change',rebuildDeck);
    $('#shuffle').addEventListener('click',shuffle);
    $('#flashcard').addEventListener('click',e=>{if(!e.target.closest('button'))flipCard();});
    $('#flip-card').addEventListener('click',flipCard);$('#next-card').addEventListener('click',()=>moveCard(1));$('#prev-card').addEventListener('click',()=>moveCard(-1));
    $('#repeat-card').addEventListener('click',()=>assess(false));$('#know-card').addEventListener('click',()=>assess(true));
    $('#notes-search').addEventListener('input',renderNotes);
    $$('[data-notes-view]').forEach(b=>b.addEventListener('click',()=>{notesView=b.dataset.notesView;renderNotes();}));
    window.addEventListener('hashchange',()=>{route();window.scrollTo({top:0,behavior:'instant'});});
    window.addEventListener('resize',()=>requestAnimationFrame(renderHotspots));
    document.addEventListener('keydown',e=>{
      if(page!=='cards'||e.ctrlKey||e.altKey||e.metaKey||e.target.closest('input,textarea,select,a,summary'))return;
      if((e.key===' '||e.key==='Enter')&&e.target.closest('button'))return;
      if(e.key===' '||e.key==='Enter'){e.preventDefault();flipCard();}
      else if(e.key==='ArrowRight'){e.preventDefault();moveCard(1);}else if(e.key==='ArrowLeft'){e.preventDefault();moveCard(-1);}else if(e.key==='1')assess(false);else if(e.key==='2')assess(true);
    });
  }catch(error){$('#loading').innerHTML='Atlas se nepodařilo načíst. Zkus stránku obnovit.';console.error(error);}
}
init();
