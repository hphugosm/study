# Přidání předmětu, jednotky a termínu

Všechny běžné změny se dělají v `src/data.js`. Žádné HTML stránky nekopíruj. Komentované příklady najdeš v `templates/subject.example.js`.

## 1. Subject — předmět

Přidej do pole `subjects`:

```js
{id:'physics',name:'Fyzika',color:'#617d96',tint:'#edf2f7',icon:'book',description:'Místo pro fyzikální souvislosti.'}
```

`id` musí být jedinečné, bez mezer a diakritiky. Ikony: `leaf`, `scale`, `function`, `book`, `layers`, `grid`, `calendar`.

## 2. Study Unit — téma

Přidej do `units`. Jeden předmět může mít libovolný počet jednotek:

```js
{
  id:'physics-unit-1',subjectId:'physics',label:'TÉMA 1',
  title:'Název skutečného tématu',description:'Podklady zatím nebyly přidány.',
  notes:[],materials:[]
}
```

Vlastní poznámky patří do `notes` jako pole odstavců prostého textu. PDF vlož například do `assets/physics/` a přidej `materials:[{title:'Podklady',description:'PDF',url:'assets/physics/notes.pdf'}]`. Používej cesty bez úvodního `/`, aby fungovalo i nasazení v podadresáři. Statický text se bezpečně escapuje.

Pro novou jednotku Law lze stejným způsobem přidat skutečné poznámky a PDF. Specifické otázky další jednotky vyžadují vlastní datový balíček / modul; nepřiřazuj automaticky původní `module:'law'`, pokud obsah není stejný jako Unit 2.

## 3. Event — termín

Přidej do `events`:

```js
{id:'physics-test-1',unitId:'physics-unit-1',date:'2026-12-03',type:'test',title:'Název testu',description:'Skutečné zadání nebo popis.'}
```

Typy jsou `test`, `homework` a `review`. Datum je lokální školní den `YYYY-MM-DD`, bez času. Event odkazuje na jednotku, jednotka odkazuje na předmět. Další opakování stejné látky je jen další Event se stejným `unitId`. Kalendář, nejbližší termíny, barvy a detail se aktualizují automaticky.

## 4. Volitelný vlastní interaktivní modul

Vytvoř ES modul exportující `async mount(container,options)` a `getProgress()`. `mount` vrací cleanup funkci. Registruj ho v `moduleLoaders` a do jednotky přidej `module:'nazev'`. Použij Shadow DOM, lokální stav, ukládání `study:<subject>:<unit>:...` a cleanup všech globálních událostí/časovačů. Cesty k obrázkům řeš `new URL('./assets/file.webp',import.meta.url)`.

Běžné poznámky a materiály vlastní modul nepotřebují. Pro referenci jsou obě současné aplikace ve `modules/`, se zachovaným úplným obsahem.

## 5. Ověření a publikování

Spusť `npm run check`, `npm test` a `npm run build`. Pro interaktivní změny spusť i `npm run test:e2e` při běžícím preview. Po commitu a pushi do `main` GitHub Actions publikuje web. Nové ID a vazby kontroluje validátor; chybějící materiál nasazení zastaví.
