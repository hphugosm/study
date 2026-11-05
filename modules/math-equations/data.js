export const SOURCE = 'Goniometrické rovnice a vzorce';
export const formulas = [
  {id:'identity',name:'Základní vztah',formula:'sin² x + cos² x = 1',note:'Platí pro každé reálné x.',source:'3'},
  {id:'shift',name:'Posun o čtvrt periody',formula:'sin x = cos(x − π/2); cos x = sin(x + π/2)',note:'Sínus a kosínus mají stejný tvar, posunutý o π/2.',source:'3'},
  {id:'double-sin',name:'Dvojnásobný argument',formula:'sin 2x = 2 sin x cos x',note:'Číslo 2 před argumentem nepřevádíme na pouhé násobení funkce.',source:'4'},
  {id:'double-cos',name:'Dvojnásobný argument',formula:'cos 2x = cos² x − sin² x',note:'Ze základního vztahu odvodíme také 1 − 2 sin² x nebo 2 cos² x − 1.',source:'4, 19–21'},
  {id:'sum-sin',name:'Součet a rozdíl pro sínus',formula:'sin(α ± β) = sin α cos β ± cos α sin β',note:'U sínu zůstává znaménko stejné jako v argumentu.',source:'6'},
  {id:'sum-cos',name:'Součet a rozdíl pro kosínus',formula:'cos(α ± β) = cos α cos β ∓ sin α sin β',note:'U kosínu se znaménko u druhého součinu obrátí.',source:'6'},
];
export const equations = [
  {id:'tan-third',title:'tan x = √3/3',source:'13, úloha v obrázku',prompt:'Tangens má periodu π a vyžaduje podmínku cos x ≠ 0.',steps:[['Definiční obor','D = ℝ mimo body π/2 + kπ, k ∈ ℤ. V těchto úhlech je cos x = 0 a tangens není definovaný.'],['Základní úhel','tan(π/6) = √3/3. Tangens má periodu π, takže stačí jedna větev.'],['Úplné řešení','x = π/6 + kπ, k ∈ ℤ. Žádný z těchto úhlů není vyloučeným bodem definičního oboru.']],roots:[Math.PI/6],period:Math.PI,solution:'x = π/6 + kπ, k ∈ ℤ'},
  {id:'sin-half',title:'sin x = 1/2',source:'8–12',prompt:'Najdi všechna reálná řešení.',steps:[['Výchozí podmínky','D = ℝ. Hodnota 1/2 patří do intervalu ⟨−1; 1⟩.'],['Dva úhly na kružnici','sin x = 1/2 pro x = π/6 a x = 5π/6 v jedné periodě.'],['Všechny periody','Přičti 2kπ ke každé větvi. Číslo k může být libovolné celé číslo.'],['Úplné řešení','x = π/6 + 2kπ nebo x = 5π/6 + 2kπ, k ∈ ℤ.']],roots:[Math.PI/6,5*Math.PI/6],period:2*Math.PI,solution:'x ∈ {π/6 + 2kπ; 5π/6 + 2kπ}, k ∈ ℤ'},
  {id:'cos-half',title:'cos x = 1/2',source:'13',prompt:'Pozor: i kosínus dává dvě větve.',steps:[['Definiční obor','D = ℝ. Kosínus je na kružnici vodorovná souřadnice.'],['Úhly jedné periody','cos x = 1/2 pro x = π/3 a x = 5π/3. Stejnou dvojici zapíšeme jako ±π/3.'],['Úplné řešení','x = ±π/3 + 2kπ, k ∈ ℤ. Ověření: cos(π/3) = cos(−π/3) = 1/2.']],roots:[Math.PI/3,-Math.PI/3],period:2*Math.PI,solution:'x = ±π/3 + 2kπ, k ∈ ℤ'},
  {id:'simplify',title:'cos x · (cos 2x + 2 sin² x) = 1/2',source:'14',prompt:'Nejprve použij vzorec, potom řeš jednoduchou rovnici.',steps:[['Podmínky','D = ℝ. Žádným výrazem nedělíme, takže nevylučujeme nulové hodnoty kosínu.'],['Vzorec pro dvojnásobný argument','cos 2x = cos² x − sin² x. Závorka je tedy cos² x + sin² x.'],['Zjednodušení závorky','cos² x + sin² x = 1. Rovnice přejde na cos x = 1/2.'],['Úplné řešení','x = ±π/3 + 2kπ, k ∈ ℤ. Po dosazení do původní rovnice je závorka 1.']],roots:[Math.PI/3,-Math.PI/3],period:2*Math.PI,solution:'x = ±π/3 + 2kπ, k ∈ ℤ'},
  {id:'sin-three',title:'sin 3x = 1/2',source:'15–16',prompt:'Při dělení vyděl i periodu.',steps:[['Substituce','Polož s = 3x. Řešíme sin s = 1/2, přičemž x ∈ ℝ.'],['Řešení pro s','s = π/6 + 2kπ nebo s = 5π/6 + 2kπ.'],['Návrat k x','Dosadíme s = 3x a vydělíme celou pravou stranu třemi.'],['Úplné řešení','x = π/18 + 2kπ/3 nebo x = 5π/18 + 2kπ/3, k ∈ ℤ. Perioda funkce sin 3x je 2π/3.']],roots:[Math.PI/18,5*Math.PI/18],period:2*Math.PI/3,solution:'x ∈ {π/18 + 2kπ/3; 5π/18 + 2kπ/3}, k ∈ ℤ'},
  {id:'quadratic',title:'2 + cos 2x = −5 sin x',source:'18–26',prompt:'Druhá substituce a kontrola přípustných hodnot.',steps:[['Vyjádření jednou funkcí','Použij cos 2x = 1 − 2 sin² x. Dostaneš 3 − 2 sin² x = −5 sin x.'],['Úprava na kvadratickou rovnici','2 sin² x − 5 sin x − 3 = 0. Polož t = sin x, takže t ∈ ⟨−1; 1⟩.'],['Rozklad','2t² − 5t − 3 = (2t + 1)(t − 3) = 0. Odtud t = −1/2 nebo t = 3.'],['Kontrola hodnot','t = 3 není přípustné, protože sin x ∈ ⟨−1; 1⟩. Zůstává sin x = −1/2.'],['Úplné řešení','x = 7π/6 + 2kπ nebo x = 11π/6 + 2kπ, k ∈ ℤ.']],roots:[7*Math.PI/6,11*Math.PI/6],period:2*Math.PI,solution:'x ∈ {7π/6 + 2kπ; 11π/6 + 2kπ}, k ∈ ℤ'},
];
export const inequalities = [
  {id:'sin-greater',title:'sin x > 1/2',fn:'sin',operator:'>',level:.5,start:Math.PI/6,end:5*Math.PI/6,source:'28–31',solution:'x ∈ ⋃ₖ (π/6 + 2kπ; 5π/6 + 2kπ), k ∈ ℤ',steps:['Hranice: sin x = 1/2, tedy π/6 a 5π/6 v jedné periodě.','Vyber oblouk nad vodorovnou přímkou y = 1/2. Odpovídá otevřenému intervalu (π/6; 5π/6).','Přičti 2kπ k oběma krajům. Ostrá nerovnost vylučuje koncové body.']},
  {id:'sin-less',title:'sin x < 1/2',fn:'sin',operator:'<',level:.5,start:-7*Math.PI/6,end:Math.PI/6,source:'32–33',solution:'x ∈ ⋃ₖ (−7π/6 + 2kπ; π/6 + 2kπ), k ∈ ℤ',steps:['Hranice: sin x = 1/2. Na kružnici jsou to π/6 a 5π/6.','Vyber zbývající oblouk pod přímkou y = 1/2. Přes nulu jej zapíšeme jako (−7π/6; π/6).','Opakuj interval po 2π. Číslo −7π/6 se od 5π/6 liší právě o −2π. Hranice nepatří do řešení.']},
  {id:'cos-greater',title:'cos x > 1/2',fn:'cos',operator:'>',level:.5,start:-Math.PI/3,end:Math.PI/3,source:'34, úloha 1',solution:'x ∈ ⋃ₖ (−π/3 + 2kπ; π/3 + 2kπ), k ∈ ℤ',steps:['Vyřeš cos x = 1/2. Hranice zvol jako −π/3 a π/3.','Kosínus je vodorovná souřadnice. Vyber pravý oblouk s x-ovou souřadnicí větší než 1/2.','Zapiš otevřený interval (−π/3; π/3) a přidej 2kπ k oběma krajům.']},
];
export const cards = [
 {id:'pythagorean',q:'Jaký je základní vztah mezi sin² x a cos² x?',a:'sin² x + cos² x = 1.',source:'3'},
 {id:'double',q:'Jak vyjádříš sin 2x?',a:'sin 2x = 2 sin x cos x.',source:'4'},
 {id:'double-cos',q:'Jak vyjádříš cos 2x?',a:'cos 2x = cos² x − sin² x = 1 − 2 sin² x.',source:'4, 19–21'},
 {id:'sum-sin',q:'Jak zní součtový vzorec pro sin(α + β)?',a:'sin(α + β) = sin α cos β + cos α sin β.',source:'6'},
 {id:'diff-sin',q:'Jak zní vzorec pro sin(α − β)?',a:'sin(α − β) = sin α cos β − cos α sin β.',source:'6'},
 {id:'sum-cos',q:'Jak zní součtový vzorec pro cos(α + β)?',a:'cos(α + β) = cos α cos β − sin α sin β.',source:'6'},
 {id:'diff-cos',q:'Jak zní vzorec pro cos(α − β)?',a:'cos(α − β) = cos α cos β + sin α sin β.',source:'6'},
 {id:'sine-solutions',q:'Jaká jsou všechna řešení sin x = 1/2?',a:'x = π/6 + 2kπ nebo 5π/6 + 2kπ, k ∈ ℤ.',source:'12'},
 {id:'substitution',q:'Co se při řešení sin 3x = 1/2 děje s periodou?',a:'Po dělení třemi vyděl i 2kπ: perioda je 2π/3.',source:'16'},
 {id:'range',q:'Je sin x = 3 přípustná větev?',a:'Ne. Sínus reálného úhlu má hodnotu v ⟨−1; 1⟩.',source:'25–26'},
 {id:'strict',q:'Patří hraniční úhly do řešení sin x > 1/2?',a:'Ne. Nerovnost je ostrá; interval má otevřené konce.',source:'31'},
 {id:'less',q:'Jak zapsat sin x < 1/2 jedním opakovaným intervalem?',a:'(−7π/6 + 2kπ; π/6 + 2kπ), k ∈ ℤ.',source:'33'},
];
export const questions = [
 {id:'q1',q:'Jaký výsledek má sin² x + cos² x?',choices:['1','0','2 sin x'],correct:0,explanation:'Základní vztah platí pro každé reálné x.',source:'3'},
 {id:'q2',q:'Jaké znaménko je před sin α sin β ve vzorci pro cos(α + β)?',choices:['Minus','Plus','Znaménko závisí na α'],correct:0,explanation:'cos(α + β) = cos α cos β − sin α sin β. Znaménko se obrací.',source:'6'},
 {id:'q3',q:'Co doplníš k x = π/6, aby sin x = 1/2 mělo všechna řešení?',choices:['Druhou větev 5π/6 a ke každé 2kπ','Jen kπ','Jen druhou větev 5π/6'],correct:0,explanation:'Sínus má periodu 2π a v jedné periodě dosahuje hodnoty 1/2 ve dvou úhlech.',source:'8–12'},
 {id:'q4',q:'Která větev patří k řešení sin 3x = 1/2?',choices:['π/18 + 2kπ/3','π/6 + 2kπ','π/18 + 2kπ'],correct:0,explanation:'Dělíme celou rovnici třemi, včetně členu 2kπ.',source:'16'},
 {id:'q5',q:'Substituce t = sin x dá t = −1/2 a t = 3. Co dál?',choices:['Větev t = 3 vyloučím','Použiji obě hodnoty','Vyloučím zápornou hodnotu'],correct:0,explanation:'Při reálném x je sin x v intervalu ⟨−1; 1⟩. Záporná hodnota −1/2 je přípustná.',source:'25–26'},
 {id:'q6',q:'Patří x = π/6 do řešení sin x > 1/2?',choices:['Ne, je to hraniční bod','Ano, vždy','Jen pro sudé k'],correct:0,explanation:'sin(π/6) = 1/2. Rovnost nesplňuje ostrou nerovnost.',source:'31'},
 {id:'q7',q:'Co je cos 2x + 2 sin² x?',choices:['1','cos x','2'],correct:0,explanation:'cos 2x = 1 − 2 sin² x, takže se členy se sin² x odečtou.',source:'14, 19–21'},
 {id:'q8',q:'Které x splňuje sin x < 1/2?',choices:['0','π/2','π/6'],correct:0,explanation:'sin 0 = 0 < 1/2. Pro π/2 je hodnota 1; pro π/6 nastává rovnost.',source:'32–33'},
];
export function equationResidual(id,x){switch(id){case'tan-third':return Math.tan(x)-Math.sqrt(3)/3;case'sin-half':return Math.sin(x)-.5;case'cos-half':return Math.cos(x)-.5;case'simplify':return Math.cos(x)*(Math.cos(2*x)+2*Math.sin(x)**2)-.5;case'sin-three':return Math.sin(3*x)-.5;case'quadratic':return 2+Math.cos(2*x)+5*Math.sin(x);default:throw new RangeError('Neznámá rovnice');}}
export function inequalityHolds(id,x){const item=inequalities.find(i=>i.id===id);if(!item||!Number.isFinite(x))return false;const value=Math[item.fn](x)-item.level;if(Math.abs(value)<1e-10)return false;return item.operator==='>'?value>0:value<0;}
export function intervalContains(id,x){const item=inequalities.find(i=>i.id===id);if(!item||!Number.isFinite(x))return false;const distance=((x-item.start)%(2*Math.PI)+2*Math.PI)%(2*Math.PI);return distance>1e-10&&distance<item.end-item.start-1e-10;}
export function formatPi(value){if(Math.abs(value)<1e-9)return'0';const ratio=value/Math.PI;for(const d of [1,2,3,6,12,18]){const n=Math.round(ratio*d);if(Math.abs(n/d-ratio)<1e-8){const sign=n<0?'−':'';return`${sign}${Math.abs(n)===1?'':Math.abs(n)}π${d===1?'':`/${d}`}`;}}return`${value.toFixed(2)} rad`;}
