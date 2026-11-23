const paradigms={comprar:['compra','compres','compre'],abrir:['abre','abras','abra'],escribir:['escribe','escribas','escriba'],hacer:['haz','hagas','haga'],poner:['pon','pongas','ponga'],decir:['di','digas','diga'],ir:['ve','vayas','vaya'],tener:['ten','tengas','tenga'],venir:['ven','vengas','venga'],salir:['sal','salgas','salga'],buscar:['busca','busques','busque'],pagar:['paga','pagues','pague'],probar:['prueba','pruebes','pruebe'],llevar:['lleva','lleves','lleve'],encender:['enciende','enciendas','encienda'],comprobar:['comprueba','compruebes','compruebe'],cerrar:['cierra','cierres','cierre']};
export const verbs=[...Object.keys(paradigms),'probarse','ponerse','llevarse'];
function attach(base,suffix){if(!suffix)return base;const vowels=[...base.matchAll(/[aeiouáéíóúü]+/g)];let stressed=vowels.length-(/[aeiouns]$/.test(base)?2:1);stressed=Math.max(0,stressed);let at=vowels[stressed].index;const nucleus=vowels[stressed][0];const strong=[...nucleus].findIndex(c=>'aeoáéíóú'.includes(c));at+=strong<0? nucleus.length-1:strong;let word=base+suffix;const groups=[...word.matchAll(/[aeiouáéíóúü]+/g)];const natural=groups[Math.max(0,groups.length-(/[aeiouns]$/.test(word)?2:1))];if(natural&&!(at>=natural.index&&at<natural.index+natural[0].length)){word=word.slice(0,at)+({a:'á',e:'é',i:'í',o:'ó',u:'ú'}[word[at]]||word[at])+word.slice(at+1);}return word;}
export function command(verb,person='tu',negative=false,pronouns=[]){if(!['tu','usted','ustedes'].includes(person)||!Array.isArray(pronouns))throw Error('invalid_command');let reflexive=verb.endsWith('se'),base=reflexive?verb.slice(0,-2):verb,p=paradigms[base];if(!p)throw Error('unsupported_verb');let cl=[...pronouns];if(reflexive&&['me','te','se','nos','os'].includes(cl[0])&&cl[0] !== (person==='tu'?'te':'se'))throw Error('reflexive_person_mismatch');if(reflexive&&!['me','te','se','nos','os'].includes(cl[0]))cl.unshift(person==='tu'?'te':'se');if(cl.length>2||cl.some(x=>!['me','te','se','nos','os','lo','la','los','las','le','les'].includes(x)))throw Error('invalid_pronouns');if(cl.length===2){if(!['lo','la','los','las'].includes(cl[1])||['lo','la','los','las'].includes(cl[0]))throw Error('invalid_pronoun_order');if(['le','les'].includes(cl[0]))cl[0]='se';}let form=person==='tu'?p[negative?1:0]:p[2]+(person==='ustedes'?'n':'');return negative?['no',...cl,form].join(' '):attach(form,cl.join(''));}
const norm=s=>String(s).normalize('NFC').trim().toLocaleLowerCase('es').replace(/[¡!¿?.]+$/g,'').replace(/^¡/,'').replace(/\s+/g,' ');
const accents=s=>s.replace(/[áéíóúü]/g,c=>({á:'a',é:'e',í:'i',ó:'o',ú:'u',ü:'u'}[c]));
const objectVerbs=new Set(['comprar','abrir','escribir','hacer','poner','decir','buscar','pagar','probar','llevar','encender','comprobar','cerrar','probarse','ponerse','llevarse']);
const cliticChoices=[[],['lo'],['la'],['los'],['las'],['me','lo'],['te','lo'],['le','lo']];
export function evaluateAnswer(input,q){
 const given=norm(input),answers=q.answers.map(norm),expected=q.answers[0];
 if(answers.includes(given))return{correct:true,kind:'correct',message:'Správně. '+q.explanation,expected};
 let kind='answer';
 if(answers.some(a=>accents(a)===accents(given)))kind='accent';
 else if(q.verb&&q.person){
  const compact=accents(given.replace(/\s+/g,''));
  const detachedClitic=given.includes(' ')&&answers.some(a=>!a.includes(' ')&&accents(a)===compact);
  if(detachedClitic)return{correct:false,kind:'pronoun',message:'U kladného rozkazu připoj zájmena za sloveso do jednoho slova; pak zkontroluj přízvuk. '+q.explanation,expected};
  if(given.startsWith('no ')!==answers[0].startsWith('no '))kind='negation';
  else{
   const otherPerson=['tu','usted','ustedes'].some(person=>{try{return person!==q.person&&norm(command(q.verb,person,q.negative,q.pronouns||[]))===given;}catch{return false;}});
   const otherClitic=cliticChoices.some(cl=>{try{return norm(command(q.verb,q.person,q.negative,cl))===given;}catch{return false;}});
   kind=otherPerson?'person':otherClitic?'pronoun':'verb';
  }
 }else if(q.topic==='pronouns')kind='pronoun';
 return{correct:false,kind,message:({accent:'Zkontroluj psaný přízvuk; zachovává přízvučnou slabiku.',negation:'Zkontroluj zápor no a polohu zájmen.',pronoun:'Zkontroluj funkci, rod, číslo a pořadí zájmen.',person:'Zkontroluj oslovení: tú, usted nebo ustedes.',verb:'Zkontroluj slovesný tvar a změnu kmene.'}[kind]||'Porovnej význam a přesný tvar.')+' '+q.explanation,expected};
}
export function imperativeQuestions(mode='mixed'){
 if(!['forms','negative','pronouns','transform','formal','mixed','blocks'].includes(mode))throw Error('unknown_imperative_mode');
 const out=[];
 for(const verb of verbs)for(const person of ['tu','usted','ustedes'])for(const negative of [false,true]){
  if((mode==='negative'||mode==='blocks')&&!negative)continue;
  const objectAllowed=objectVerbs.has(verb),reflexive=verb.endsWith('se');
  if(['pronouns','blocks'].includes(mode)&&!objectAllowed)continue;
  let sets=(['forms','negative'].includes(mode)||!objectAllowed)?[[]]:[[],['lo'],['la'],['los'],['las']];
  if(['pronouns','blocks'].includes(mode))sets=sets.filter(cl=>cl.length);
  if(['comprar','llevar','buscar'].includes(verb)&&!['forms','negative'].includes(mode))sets.push(['me','lo']);
  for(const pronouns of sets){
   const answer=command(verb,person,negative,pronouns);
   let prompt=`${verb} / ${person==='tu'?'tú':person} / ${negative?'záporně':'kladně'}${pronouns.length?' / '+pronouns.join(' + '):''}`;
   if(mode==='transform')prompt=`Změň na ${negative?'záporný':'kladný'} rozkaz (${person==='tu'?'tú':person}): ${command(verb,person,!negative,pronouns)}`;
   if(mode==='formal')prompt=`Převeď na ${person==='tu'?'tú':person}: ${command(verb,person==='tu'?'usted':'tu',negative,pronouns)}`;
   const cl=reflexive?[person==='tu'?'te':'se',...pronouns]:pronouns;
   const explanation=(negative?'Záporný rozkaz: no + zájmena + příslušný slovesný tvar.':'Kladný rozkaz: zájmena se připojí za sloveso do jednoho slova; zachová se přízvuk.')+(cl.length?` Zájmena v pořadí: ${cl.join(' + ')}.`:'');
   out.push({id:`${mode}-${verb}-${person}-${negative}-${pronouns.join('')}`,topic:'imperative',prompt,answers:[answer],explanation,verb,person,negative,pronouns,tokens:negative?answer.split(' '):[answer]});
  }
 }
 return out;
}
const small=['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve','veinte','veintiuno','veintidós','veintitrés','veinticuatro','veinticinco','veintiséis','veintisiete','veintiocho','veintinueve'];
export function numberToSpanish(n){if(!Number.isInteger(n)||n<0||n>1000000)throw Error('invalid_number');if(n<30)return small[n];if(n<100)return ['','','','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'][Math.floor(n/10)]+(n%10?' y '+small[n%10]:'');if(n===100)return'cien';if(n<1000)return ['','ciento','doscientos','trescientos','cuatrocientos','quinientos','seiscientos','setecientos','ochocientos','novecientos'][Math.floor(n/100)]+(n%100?' '+numberToSpanish(n%100):'');if(n===1000000)return'un millón';const k=Math.floor(n/1000);return(k===1?'':numberToSpanish(k).replace(/veintiuno$/,'veintiún').replace(/uno$/,'un')+' ')+'mil'+(n%1000?' '+numberToSpanish(n%1000):'');}
export function numberQuestions(){return [100,101,121,200,500,700,900,999,1000,1001,21000,31000,100000,999999,1000000,...Array.from({length:60},(_,i)=>105+i*137)].map(n=>({id:'number-'+n,topic:'numbers',prompt:`Napiš španělsky: ${n.toLocaleString('cs-CZ')}`,answers:[numberToSpanish(n)],explanation:'Stovky mají vlastní tvary; y spojuje pouze desítky a jednotky.'}));}
export const pronounQuestions=[['Compro la falda. → ___ compro.','la','Přímý předmět la falda: ženský rod, jednotné číslo.'],['Compro los zapatos. → ___ compro.','los','Zapatos je mužský rod, množné číslo.'],['Voy a comprarle flores a María. → ___ voy a comprar flores.','le','María je nepřímý předmět: komu?'],['¿Te vas a probar el vestido? → Sí, ___ voy a probar.','me lo','Zvratné me před přímým lo, které nahrazuje el vestido.'],['Doplň: Este es ___ abrigo. (můj)','mi','Mi bez přízvuku vyjadřuje vlastnictví.'],['Doplň: Es para ___. (pro mě)','mí','Po para používáme přízvučné mí.'],['Doplň: ___ pongo el abrigo. (oblékám si)','me','Me je nepřízvučné zájmeno před slovesem.'],['Doplň: Las botas me ___ caras. (připadají)','parecen','Množné las botas vyžaduje parecen.'],['Doplň: El abrigo me ___ caro.','parece','Jednotné el abrigo vyžaduje parece.'],['Nadie viene. → No viene ___.','nadie','Záporné zájmeno za slovesem doprovází no.'],['Doplň: No compro ___. (nic)','nada','Nada znamená nic.'] ,['Compro el abrigo. → ___ compro.','lo','El abrigo je přímý předmět v mužském jednotném čísle.'],
['Compro las flores. → ___ compro.','las','Las flores je přímý předmět v ženském množném čísle.'],
['Escribo a mis padres. → ___ escribo.','les','A mis padres je nepřímý předmět v množném čísle.'],
['María compra una rosa para mí. → María ___ compra una rosa.','me','Me označuje příjemce: pro mě.'],
['Ana te da el libro. Nahraď el libro: Ana ___ da.','te lo','Te je nepřímý a lo přímý předmět; te stojí první.'],
['Le doy la camiseta a Ana. Nahraď la camiseta: ___ doy a Ana.','se la','Le se před la mění na se.'],
['Les compro los regalos. Nahraď los regalos: ___ compro.','se los','Les před los přechází na se; los zastupuje regalos.'],
['Chci to koupit: Quiero ___. (infinitiv comprar + lo)','comprarlo','Zájmeno se připojí k infinitivu: comprarlo.'],
['Voy a probarme la falda. Nahraď la falda: Voy a ___.','probármela','Me + la se připojí za infinitiv; přízvuk zůstává na bar.'],
['Voy a probármelo. Přesuň obě zájmena: ___ voy a probar.','me lo','Celá skupina me lo stojí před určitým tvarem voy.'],
['Me lo voy a probar. Přesuň zájmena: Voy a ___.','probármelo','Me lo se připojí k probar do jednoho slova s přízvukem.'],
['¿Te pruebas la camisa? → Sí, ___ pruebo.','me la','V odpovědi mluvím o sobě: me; la nahrazuje camisa.'],
['¿Os probáis los zapatos? → Sí, ___ probamos.','nos los','My si je zkoušíme: nos los; zapatos je mužský množný předmět.'],
['Kladný rozkaz tú: comprar + la → ___.','cómprala','Kladný rozkaz připojuje la za sloveso a zachovává přízvuk com.'],
['Záporný rozkaz tú: no + comprar + la → ___.','no la compres','No + zájmeno + záporný tvar compres.'],
['Kladný rozkaz tú: ponerse + lo → ___.','póntelo','Tú vyžaduje te před lo; pon + te + lo tvoří póntelo.'],
['Záporný rozkaz usted: ponerse + lo → ___.','no se lo ponga','Usted vyžaduje se; celá skupina je před slovesem.'],
['Doplň: ¿___ parece bonita esta falda? (tobě)','te','Te označuje osobu, které sukně připadá hezká.'],
['Doplň: A María ___ parecen caros los zapatos.','le','María je hodnotící osoba, proto nepřímé le.'],
['Doplň: ¿Hay ___ en la tienda? (někdo)','alguien','Alguien označuje neurčitou osobu.'],
['Doplň: Quiero comprar ___. (něco)','algo','Algo označuje neurčitou věc.'],
['Doplň: No tengo ___ abrigo. (žádný)','ningún','Ninguno se před mužským jménem v jednotném čísle krátí na ningún.'],
['Doplň: ¿Tienes ___ regalo? (nějaký)','algún','Alguno se před regalo krátí na algún.'],
['Doplň: Quiero ___ camiseta. (jinou)','otra','Otra se shoduje s ženským jednotným camiseta.'],
['Doplň: Compro ___ regalos. (několik)','varios','Varios se shoduje s mužským množným regalos.'],
['Doplň: ___ las tiendas están abiertas. (všechny)','todas','Todas se shoduje s ženským množným tiendas.']
].map(([prompt,answer,explanation],i)=>({id:'pronoun-'+i,topic:'pronouns',prompt,answers:[answer],explanation}));

pronounQuestions.push({id:'pronoun-infinitive-variants',topic:'pronouns',prompt:'Napiš celou větu: Chci si ho vyzkoušet. (querer, el abrigo, yo)',answers:['Quiero probármelo','Me lo quiero probar'],explanation:'Obě zájmena stojí společně před quiero nebo společně za probar.'});
pronounQuestions.push(...[
 ['Oprav celou větu: «No cómpralo». (tú, lo)','No lo compres','U záporného rozkazu stojí lo před záporným tvarem compres.'],
 ['Oprav celou větu: «Es para mi». (pro mě)','Es para mí','Po para potřebujeme přízvučné zájmeno mí, ne přivlastňovací mi.'],
 ['Oprav celou větu: «Compro la falda. Lo compro». (nahraď falda)','La compro','Falda je ženského rodu a jednotného čísla, proto la.'],
 ['Oprav celou větu: «Me voy a probarlo». (hodlám si ho vyzkoušet, voy a)','Me lo voy a probar','Obě zájmena musí být společně před voy nebo připojená k probar.'],
 ['Oprav celou větu: «Lo no compre». (usted)','No lo compre','Pořadí záporného rozkazu je no + zájmeno + sloveso.'],
 ['Oprav celou větu: «Mi pongo el abrigo».','Me pongo el abrigo','Zvratné me se vztahuje k yo; mi je přivlastňovací tvar.']
].map(([prompt,answer,explanation],i)=>({id:'pronoun-correction-'+i,topic:'pronouns',prompt,answers:i===3?[answer,'Voy a probármelo']:[answer],explanation})));
