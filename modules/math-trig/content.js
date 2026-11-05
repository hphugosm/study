export const cards = [
 ['Jaké jsou souřadnice bodu jednotkové kružnice?','P = [cos α; sin α]. Kosinus je vodorovná, sinus svislá souřadnice.','Trigonometrie · sn. 8–12'],
 ['Jak převedeš stupně na radiány?','α v radiánech = α ve stupních · π/180. Například 60° = π/3.','Trigonometrie · sn. 3–7'],
 ['Kdy nejsou tan a cot definované?','tan x: cos x = 0, tedy x = π/2 + kπ. cot x: sin x = 0, tedy x = kπ. k ∈ ℤ.','Grafy · sn. 19–21'],
 ['Jakou periodu mají sin a cos?','Základní perioda je 2π. U a·f(b(x−c))+d pro a ≠ 0, b ≠ 0 je 2π/|b|.','Grafy · sn. 7–15'],
 ['Jakou periodu mají tan a cot?','Základní perioda je π. Při nenulových a, b je po transformaci π/|b|.','Grafy · sn. 19–23'],
 ['Jaké jsou základní hodnoty sin 30°, cos 60°?','Obě jsou 1/2. Základní hodnoty odvodíš na kružnici a pomocí symetrie.','Trigonometrie · sn. 11–14'],
 ['Co mění parametry a, b, c, d?','a: svislé násobení (záporné i převrátí); b: vodorovná změna měřítka; c: posun doprava; d: posun nahoru. Platí pro zápis a·f(b(x−c))+d.','Grafy · sn. 8–14'],
 ['Jak zní sinová věta?','a/sin α = b/sin β = c/sin γ. Strana a leží proti úhlu α, b proti β, c proti γ.','Trigonometrie · sn. 19'],
 ['Jak zní kosinová věta pro stranu c?','c² = a² + b² − 2ab cos γ. γ je úhel mezi stranami a a b.','Trigonometrie · sn. 20'],
 ['Je 2sin(2x+π/2)−3 sudá funkce?','Ano. Rovná se 2cos(2x)−3, proto f(−x)=f(x). Perioda je π a obor hodnot [−5;−1].','Grafy · sn. 13–15']
].map(([question,answer,source],i)=>({id:`trig-${i+1}`,question,answer,source}));
export const questions = [
 {q:'Kolik radiánů je 60°?',choices:['π/6','π/3','2π/3'],answer:1,explain:'60 · π/180 = π/3.',source:'Trigonometrie · sn. 3–7'},
 {q:'Jaká je hodnota cos(7π/6)?',choices:['−√3/2','−1/2','√3/2'],answer:0,explain:'7π/6 = 210°. Ve třetím kvadrantu je cos záporný; referenční úhel je π/6.',source:'Trigonometrie · sn. 10'},
 {q:'Kde není tan x definován?',choices:['x = kπ','x = π/2 + kπ','Nikde, je definován všude'],answer:1,explain:'tan x = sin x / cos x a cos x je v těchto bodech nula. k ∈ ℤ.',source:'Grafy · sn. 19–21'},
 {q:'Jaká je perioda 3sin(0,25x)−1?',choices:['π/2','2π','8π'],answer:2,explain:'T = 2π/|0,25| = 8π. Čísla 3 a −1 periodu nemění.',source:'Grafy · sn. 16'},
 {q:'O kolik je vodorovně posunut cos(2x+π)?',choices:['Doleva o π/2','Doleva o π','Doprava o π/2'],answer:0,explain:'cos(2x+π) = cos(2(x+π/2)). Posun je −π/2.',source:'Grafy · sn. 11'},
 {q:'Jaký obor hodnot má 2sin(2x+π/2)−3?',choices:['[−2;2]','[−5;−1]','[−3;3]'],answer:1,explain:'Sinus nabývá [−1;1], násobení 2 dává [−2;2] a odečtení 3 dává [−5;−1].',source:'Grafy · sn. 13–15'},
 {q:'Pro kterou stranu platí c² = a²+b²−2ab cos γ?',choices:['Pro c, která leží proti γ','Pro c, která leží mezi α a γ','Pouze pro pravoúhlý trojúhelník'],answer:0,explain:'Kosinová věta platí pro libovolný trojúhelník; γ svírají strany a a b.',source:'Trigonometrie · sn. 20'},
 {q:'Jakou hodnotu má cot 0°?',choices:['0','1','Není definována'],answer:2,explain:'cot x = cos x/sin x. Pro x = 0 je jmenovatel nula; ∞ není hodnota funkce.',source:'Trigonometrie · sn. 14; Grafy · sn. 20–21'}
];
