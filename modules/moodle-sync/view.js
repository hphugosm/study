import {approvedReleaseURL,MOODLE_SUBJECTS} from './catalog.js';
const allowedKinds = new Set(['file','event','assignment','announcement','section','module','course']);
const filePath = /^files\/[a-f0-9]{64}\.(pdf|pptx|ppt|docx|odt|odp|xlsx|txt|doc|jpg|png|wmv)$/;
const slug = /^[a-z][a-z0-9-]{0,59}$/;
const secretText = /(?:[\w.+-]+@[\w.-]+\.[a-z]{2,}|(?:token|sesskey|password|cookie)\s*[=:]|[<>])/i;
const subjectNames = {literature:'Literatura',history:'Dějepis',...Object.fromEntries(MOODLE_SUBJECTS.map(subject=>[subject.id,subject.title]))};

export function entryContext(entry) {
  return [subjectNames[entry.subject] || entry.subject.replaceAll('-',' '),entry.topic_title].filter(Boolean).join(' · ');
}

export function validateFeed(feed) {
  if (feed?.schema !== 1 || !Array.isArray(feed.entries) || feed.entries.length > 20000) throw new Error('invalid_feed');
  const seen = new Set();
  return feed.entries.map(entry => {
    if (!/^[a-f0-9]{64}$/.test(entry.id) || seen.has(entry.id) || !allowedKinds.has(entry.kind) ||
        !/^[a-z][a-z0-9-]{0,59}$/.test(entry.subject) || typeof entry.title !== 'string' ||
        !entry.title.trim() || entry.title.length > 500 || secretText.test(entry.title) ||
        typeof entry.summary !== 'string' || entry.summary.length > 2000 || secretText.test(entry.summary)) throw new Error('invalid_entry');
    if (entry.topic !== undefined && !slug.test(entry.topic)) throw new Error('invalid_topic');
    if (entry.topic_title !== undefined && (entry.topic === undefined || typeof entry.topic_title !== 'string' || !entry.topic_title.trim() || entry.topic_title.length > 500 || secretText.test(entry.topic_title))) throw new Error('invalid_topic_title');
    if (entry.kind === 'file') {
      const hasPath=Object.hasOwn(entry,'path'),hasURL=Object.hasOwn(entry,'url');
      if(hasPath===hasURL)throw new Error('file_requires_exactly_one_location');
      const location=hasURL?entry.url:entry.path;
      const name = typeof location === 'string' ? location.split('/').at(-1) : '';
      const extension = name.slice(name.lastIndexOf('.')+1);
      const canonical = entry.topic !== undefined && ['pdf','pptx','ppt','docx','odt','odp','xlsx','txt','doc','jpg','png','wmv'].includes(extension) &&
        entry.path === `data/subjects/${entry.subject}/topics/${entry.topic}/sources/${entry.sha256}.${extension}`;
      const flat = entry.topic === undefined && filePath.test(entry.path);
      const release=hasURL&&approvedReleaseURL(entry.url,entry.sha256);
      if ((hasURL?!release:(!flat && !canonical)) || name.split('.')[0] !== entry.sha256 || !/^[a-f0-9]{64}$/.test(entry.sha256) ||
          !Number.isSafeInteger(entry.size) || entry.size < 1 || entry.size > 25000000) throw new Error('unsafe_file');
    }
    for (const field of ['due','opens','cutoff','starts','duration','closes']) {
      if (entry[field] !== undefined && (!Number.isSafeInteger(entry[field]) || entry[field] < 0 || entry[field] > 4102444800)) throw new Error('invalid_date');
    }
    seen.add(entry.id);
    return entry;
  });
}

if (typeof document !== 'undefined') {
  const status = document.querySelector('#status');
  const container = document.querySelector('#entries');
  const search = document.querySelector('#search');
  const dateFormat = new Intl.DateTimeFormat('cs-CZ',{dateStyle:'long',timeStyle:'short',timeZone:'Europe/Prague'});
  let entries = [];
  function text(tag, value, className) {
    const element = document.createElement(tag);
    element.textContent = value;
    if (className) element.className = className;
    return element;
  }
  function render() {
    const query = search.value.trim().toLocaleLowerCase('cs-CZ');
    const matches = entries.filter(entry => `${entry.title} ${entryContext(entry)} ${entry.summary}`.toLocaleLowerCase('cs-CZ').includes(query));
    container.replaceChildren();
    for (const entry of matches) {
      const card = document.createElement('article');
      card.className = 'entry';
      const context = entryContext(entry);
      card.append(text('p',context,'meta'),text('h2',entry.title));
      if (entry.summary) card.append(text('p',entry.summary));
      if (entry.due || entry.starts) card.append(text('p',`${entry.due?'Odevzdání':'Termín'}: ${dateFormat.format(new Date((entry.due||entry.starts)*1000))}`,'meta'));
      if (entry.kind === 'file') {
        const size = entry.size < 1000000 ? `${Math.max(1,Math.round(entry.size/1000))} kB` : `${(entry.size/1000000).toFixed(1)} MB`;
        const link = text('a',`Otevřít materiál · ${size}`,'download');
        link.href = entry.url || new URL(entry.path,import.meta.url).href;
        link.setAttribute('download','');
        card.append(link);
      }
      container.append(card);
    }
    status.textContent = !entries.length ? 'Zatím nejsou zveřejněné žádné schválené materiály ani termíny.' :
      !matches.length ? 'Pro toto hledání tu nic není.' : `Počet položek: ${matches.length}`;
  }
  search.addEventListener('input',render);
  fetch(new URL('./feed.json',import.meta.url),{credentials:'omit'}).then(response=>{
    if (!response.ok) throw new Error('feed_unavailable');
    return response.json();
  }).then(feed=>{entries=validateFeed(feed);render();}).catch(()=>{
    status.textContent='Přehled se nepodařilo načíst. Zkus stránku otevřít znovu s připojením k internetu.';
  });
}
