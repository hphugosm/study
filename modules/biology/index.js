import template from './template.js';
import { run } from './runtime.js';

const base = new URL('./', import.meta.url);
const modes = {materials:'notes',practice:'cards',atlas:'atlas',notes:'notes',cards:'cards',map:'map'};

/** Mount the complete biology application in an isolated Shadow DOM. */
export async function mount(container, {mode='atlas', onProgress}={}) {
  const host = globalThis.document.createElement('div');
  host.className = 'biology-module';
  container.append(host);
  const root = host.attachShadow({mode:'open'});
  const sheet = globalThis.document.createElement('link');
  sheet.rel='stylesheet';sheet.href=new URL('style.css',base).href;
  root.append(sheet);
  const wrapper=globalThis.document.createElement('div');
  wrapper.className='biology-app';wrapper.innerHTML=template;
  // Keep accessible names and original route attributes while shortening touch navigation.
  const navLabels={atlas:'Atlas',cards:'Poznávačka',map:'Mapa',notes:'Výpisky'};
  wrapper.querySelectorAll('.site-header nav a[data-page]').forEach(anchor=>{
    const fullLabel=anchor.textContent.trim();
    anchor.setAttribute('aria-label',fullLabel);
    const desktopLabel=globalThis.document.createElement('span');
    desktopLabel.className='bio-nav-long';desktopLabel.textContent=fullLabel;
    const mobileLabel=globalThis.document.createElement('span');
    mobileLabel.className='bio-nav-short';mobileLabel.textContent=navLabels[anchor.dataset.page]||fullLabel;
    anchor.replaceChildren(desktopLabel,mobileLabel);
    if(anchor.dataset.page==='cards'){
      const narrowLabel=globalThis.document.createElement('span');
      narrowLabel.className='bio-nav-tiny';narrowLabel.textContent='Karty';
      anchor.append(narrowLabel);
    }
  });
  root.append(wrapper);
  const style=globalThis.document.createElement('style');
  style.textContent=`
    .bio-nav-short,.bio-nav-tiny{display:none}
    :host{display:block;min-width:0;font-family:Inter,Arial,sans-serif;color:#232628;line-height:1.6;font-size:14px;--bio-accent:#547968}
    .biology-app{background:#fff;border:1px solid #e6e8e5;border-radius:16px;overflow:hidden}
    .site-header{height:auto;min-height:68px;padding:12px 24px;gap:16px;flex-wrap:wrap;background:#fff}
    .site-header nav{display:flex;gap:22px;flex-wrap:wrap;justify-content:flex-start;flex:1}
    .site-header nav>a{padding:8px 0;font-size:12px;letter-spacing:0;text-transform:none;color:#555}
    .site-header nav>a.active{color:#315d49}.site-header .small{font-size:11px;padding:8px 12px}
    main{padding:0 28px 30px;max-width:none}.hero{padding:28px 0}.hero h1{font-size:38px;letter-spacing:-1.5px;color:#202724}.hero em{color:#547968}
    .hero-note{display:none}.hero .intro{font-size:13px;max-width:650px;color:#6a716b}
    .hero.compact h1{font-size:36px}.eyebrow{font-size:9px}.section-head h2,.directory-head h2{font-size:25px;color:#252c28}
    .anatomy-card,.map-board{background:#f7f9f6}.bone-detail,.map-prompt,.flashcard,.notes-topic{background:#fff;border-color:#e2e7e1;box-shadow:none}
    .study-guide h2{font-size:26px;color:#26312a}.study-guide{padding-left:0}
    .primary-button{background:#2e4c3c;color:white}.primary-button:hover{background:#3e6250}
    .body-canvas{min-width:0}.region-tabs{max-width:100%;flex-wrap:wrap}.practice-banner{margin-bottom:0}
    @media(max-width:600px){main{padding:0 14px 22px}.site-header{padding:12px 14px}.site-header nav{order:0;height:auto;gap:13px;width:100%;flex-basis:100%}.site-header nav>a{font-size:11px}.hero h1,.hero.compact h1{font-size:31px}.hero .intro{font-size:12px}.intro br{display:none}.site-header .small{font-size:11px}.section-head h2,.directory-head h2{font-size:22px}.region-tabs button{font-size:10px}.map-score{flex-wrap:wrap}.card-position-tools{gap:6px}.card-position{gap:4px}.card-image-zoom{font-size:9px}}

    /* Touch-first overrides: every study tool remains available on small screens. */
    @media(max-width:700px){
      :host{font-size:16px;line-height:1.55;-webkit-text-size-adjust:100%;--bio-shell-top:var(--study-sticky-offset,112px)}
      .biology-app{overflow:clip;border-radius:12px}
      main{padding:0 12px 24px}
      .site-header{position:sticky;top:var(--bio-shell-top);z-index:20;min-height:52px;height:auto;padding:4px 8px;display:block;background:#fff;border-bottom:1px solid #dce3dc}
      .site-header nav{height:auto;width:100%;margin:0;display:flex;flex-wrap:nowrap;justify-content:space-between;gap:8px;overflow-x:auto;overscroll-behavior-x:contain;scrollbar-width:none;-webkit-overflow-scrolling:touch}
      .site-header nav::-webkit-scrollbar{display:none}
      .site-header nav>a{font-size:14px;min-height:44px;height:auto;flex:0 0 auto;justify-content:center;padding:8px 4px;line-height:1.2;border-bottom-width:2px;white-space:nowrap}
      .site-header .small{display:none}
      .hero,.hero.compact{padding:18px 0 14px;margin:0;gap:8px}
      .hero h1,.hero.compact h1{font-size:27px;letter-spacing:-1px;line-height:1.15}
      .hero h1 em{letter-spacing:-.8px}
      .hero .intro{font-size:15px;line-height:1.5;margin-top:8px}
      .hero .eyebrow{display:none}
      .hero .intro br{display:none}
      .section-head{align-items:center;flex-wrap:wrap;gap:4px;margin-bottom:12px}
      .section-head h2{font-size:21px;line-height:1.25;margin-top:0}
      .section-index{font-size:11px;letter-spacing:.5px}
      .section-head .section-index{display:none}
      button,.outline-button,.primary-button,.text-button,.download,.view-switch button,.region-tabs button{min-height:44px;font-size:15px;line-height:1.35}
      button{touch-action:manipulation}
      input,select,textarea,.search input,.map-select select,.map-board-heading select{font-size:16px!important}
      input[type=checkbox]{width:20px;height:20px;flex:none}
      input[type=search],select{min-height:44px}
      .label-toggle{min-height:44px;font-size:14px;gap:8px;margin:0}
      .label-toggle>span{width:36px;height:22px;flex:none}
      .label-toggle>span:after{width:16px;height:16px;top:3px;left:3px}
      .label-toggle input:checked+span:after{transform:translateX(14px)}
      .atlas-layout{display:grid;grid-template-columns:minmax(0,1fr);gap:12px}
      .canvas-heading{font-size:9px;letter-spacing:.5px;margin:0 12px;padding:12px 0;gap:8px}
      .anatomy-card>.region-tabs{position:static;flex-direction:row;flex-wrap:nowrap;justify-content:flex-start;gap:4px;margin:6px 8px 0;max-width:calc(100% - 16px);overflow-x:auto;overscroll-behavior-x:contain;scrollbar-width:thin}
      .anatomy-card>.region-tabs button{font-size:14px;padding:8px 12px;flex:0 0 auto}
      .anatomy-card>.region-tabs .region-symbol{display:none}
      .body-canvas{height:570px}
      #skeleton-art{width:min(76%,265px)}
      .hotspot{min-height:44px;font-size:11px;gap:2px;padding:0}
      .hotspot .leader{width:6px}
      .hotspot .hotspot-label{padding:4px 2px;max-width:104px;white-space:normal;text-align:center;line-height:1.1}
      .hotspot .point{width:8px;height:8px}
      .canvas-help{font-size:11px;line-height:1.4;left:12px;right:12px}
      .bone-detail{min-height:0;display:block;padding:16px;scroll-margin-top:calc(var(--bio-shell-top) + 64px)}
      .detail-meta{font-size:11px;letter-spacing:.3px}
      .bone-detail h3{font-size:27px;margin-top:12px}
      .bone-detail .latin{font-size:18px}
      .detail-visual{height:180px;margin:12px 0;min-height:120px}
      .detail-intro,.bone-detail li{font-size:16px;line-height:1.55}
      .bone-detail li{padding:10px 0 10px 14px}
      .detail-source{font-size:11px;line-height:1.4;margin:12px 0}
      .outline-button{padding:12px;font-size:15px}
      .directory-head{margin-top:24px;gap:12px;display:flex;flex-direction:column;align-items:stretch}
      .directory-head h2{font-size:23px}
      .directory-head h2>span{font-size:12px;margin-left:0}
      .directory-head p{font-size:15px;line-height:1.5}
      .search,.directory-head .search,.notes-toolbar .search{padding:0 12px;width:100%;max-width:none;min-width:0;min-height:48px}
      .search input{min-width:0;min-height:46px}
      .bone-directory{grid-template-columns:minmax(0,1fr);gap:7px}
      .bone-item{min-height:64px;gap:12px;padding:10px 12px}
      .bone-item>span:first-child{font-size:12px;min-width:22px}
      .bone-item strong{font-size:16px;line-height:1.4}
      .bone-item small{font-size:15px;line-height:1.4}
      .bone-item .item-arrow{display:block;font-size:18px}
      .practice-banner{padding:16px;gap:10px;margin:20px 0 0;min-height:80px}
      .practice-banner strong{font-size:16px;line-height:1.4}
      .practice-banner small{font-size:14px;line-height:1.5}
      .banner-cta{font-size:14px;margin-left:0;max-width:none;flex-basis:100%}
      .progress-summary{margin:12px 0 0;padding:8px 12px;gap:10px;border:0;max-width:none}
      .progress-summary>span{font-size:28px}
      .progress-summary>div{font-size:14px;display:flex;flex-wrap:wrap;gap:5px}
      .progress-summary strong{font-size:14px}
      .study-toolbar{padding:8px 0;gap:6px}
      .study-toolbar .region-tabs{display:flex;flex-wrap:nowrap;overflow:auto;justify-content:flex-start;gap:4px;width:100%;scrollbar-width:thin}
      .study-toolbar .region-tabs button{font-size:14px;min-height:44px;padding:8px 12px;flex:0 0 auto}
      .study-toolbar .region-tabs .region-symbol{display:none}
      .toolbar-actions{gap:8px;font-size:15px;width:100%;justify-content:space-between}
      .toolbar-actions label{min-height:44px;gap:8px}
      .toolbar-actions .text-button{font-size:15px;padding:8px 4px}
      .study-layout{display:block;margin:16px 0 12px}
      .study-guide{display:none}
      .card-position{font-size:12px;letter-spacing:0;line-height:1.3;gap:8px;flex-wrap:wrap;margin-bottom:8px}
      .card-position-tools{gap:8px;margin-left:auto}
      .card-image-zoom{min-height:44px;font-size:14px;padding:8px 10px}
      .flashcard{min-height:310px;padding:16px;border-radius:12px;transform:none}
      .flashcard .question{position:static;align-self:stretch;max-width:none;font-size:16px;line-height:1.4}
      .flashcard .card-image{height:220px;max-height:35svh;width:100%;margin:12px 0 8px}
      .flip-hint{position:static;align-self:stretch;font-size:12px;line-height:1.4;gap:8px}
      .answer-content h2{font-size:28px;line-height:1.25}
      .answer-content .answer-detail{font-size:16px;line-height:1.55}
      .answer-content .latin{font-size:20px}
      .answer-content .answer-label,.answer-content .answer-source{font-size:12px;line-height:1.5}
      .card-actions{gap:8px;margin-top:12px;align-items:stretch}
      .card-actions .primary-button{flex:1;min-height:48px;padding:10px 8px;font-size:15px}
      .arrow-button{flex:none;min-width:48px;width:48px;min-height:48px;height:auto;font-size:22px}
      .assessment{gap:8px;margin-top:8px}
      .assessment button{min-height:48px;max-width:none;padding:10px 8px;font-size:15px}
      .deck-progress{margin-top:18px;height:5px}
      .deck-progress-caption{font-size:14px;color:#5d6c56;line-height:1.45}
      .map-score{margin-top:12px;gap:8px;padding:8px 12px;min-width:0;flex-wrap:wrap}
      .map-score strong{font-size:28px}
      .map-score>span,.map-score>small{font-size:13px;margin:0}
      .map-settings{padding:10px 0;gap:8px;margin-bottom:12px}
      .map-mode{width:100%;min-width:0}
      .map-mode legend,.map-select{font-size:14px;color:#52654d}
      .map-mode .view-switch{gap:6px}
      .map-mode .view-switch button{font-size:15px;min-height:44px;padding:8px 12px;flex:1}
      .map-select{margin:0;flex:1;min-width:0}
      .map-select select{width:100%;padding:8px 24px 8px 10px}
      .map-settings>.text-button{font-size:14px;min-height:44px;white-space:normal;padding:8px}
      .map-layout{grid-template-columns:minmax(0,1fr);gap:10px}
      .map-prompt{position:sticky;top:calc(var(--bio-shell-top) + 54px);padding:12px;gap:0 10px;grid-template-columns:minmax(0,1fr) 92px;z-index:10;background:#fff;box-shadow:0 4px 12px #203d2914}
      .map-prompt-meta{font-size:11px;letter-spacing:0;line-height:1.3;margin-bottom:6px}
      .map-prompt h2{font-size:22px;line-height:1.2;overflow-wrap:anywhere}
      .map-prompt .latin{font-size:16px;margin-top:4px;line-height:1.3}
      .map-prompt.name-only .map-question-hint{margin-top:6px}
      .map-question-image{height:92px;padding:4px;margin:0}
      .map-question-hint{font-size:14px;line-height:1.4;margin-top:6px}
      .map-prompt-actions{gap:6px;margin-top:8px}
      .map-prompt-actions .outline-button,.map-prompt-actions .primary-button,.map-prompt-actions .text-button{font-size:14px;min-height:44px;padding:9px;line-height:1.3;white-space:normal}
      .map-prompt-actions .text-button{flex:1}
      .map-feedback{font-size:14px;margin-top:8px;line-height:1.4}
      .map-feedback>strong{font-size:14px;line-height:1.4}
      .map-feedback .map-your-answer{font-size:13px}
      .map-feedback.correct,.map-feedback.incorrect,.map-feedback.skipped{padding:10px}
      .map-feedback>p:last-child{display:block;font-size:14px}
      .map-feedback>p{margin-top:4px}
      .map-prompt:has(.map-feedback:not(:empty)){position:static}
      .map-tip{display:none}
      .map-board-heading{padding:10px 0;margin:0 12px;flex-direction:column;align-items:stretch;gap:4px}
      .map-board-heading>span{font-size:11px;letter-spacing:.5px}
      .map-board-heading>label{font-size:14px;display:flex;flex-direction:column;align-items:stretch;gap:4px;width:100%;color:#52654d}
      .map-board-heading select{min-height:44px;width:100%;max-width:none;padding:8px 24px 8px 10px}
      .map-skeleton{height:600px;padding:12px 6px;touch-action:manipulation}
      .map-board-footer{font-size:13px;line-height:1.4;padding:12px;gap:8px}
      .map-scope-note{font-size:14px;line-height:1.55;margin:14px 0 0;color:#62705a}
      .map-results{padding:24px 16px;scroll-margin-top:calc(var(--bio-shell-top) + 64px)}
      .map-results h2{font-size:25px}.map-result-score{font-size:56px}
      .map-results>p:last-of-type{font-size:16px;line-height:1.5;margin:12px 0 18px}
      .map-result-actions{gap:8px;flex-direction:column}
      .map-result-actions button,.map-result-actions .primary-button,.map-result-actions .outline-button{width:100%;font-size:16px;min-height:48px;padding:12px}
      .pdf-tile{min-width:0;display:grid;margin-top:12px;padding:12px;gap:2px 12px;min-height:64px}
      .pdf-tile>span{font-size:14px;letter-spacing:0}
      .pdf-tile strong{font-size:20px}.pdf-tile small{font-size:14px;line-height:1.4}
      .notes-toolbar{gap:8px}
      .view-switch{width:100%;gap:4px}
      .view-switch button{min-height:48px;padding:8px;font-size:15px;flex:1;white-space:normal}
      .notes-grid,.glossary{grid-template-columns:minmax(0,1fr);gap:12px}
      .notes-topic,.glossary-item{padding:16px}
      .notes-topic h2{font-size:23px;line-height:1.3}
      .notes-topic p,.notes-topic li,.glossary-item dd{font-size:16px;line-height:1.6;color:#53644c}
      .notes-topic .slides-ref,.notes-topic .topic-number{font-size:12px;color:#65735b;letter-spacing:0}
      .glossary-item dt{font-size:23px}
      .source-details{font-size:16px;margin:20px 0 0}
      .source-details>summary{font-size:16px;min-height:48px;padding:14px}
      .source-details>div{padding:0 14px 14px}
      .source-details h3{font-size:18px}
      .correction strong,.correction p{font-size:15px;line-height:1.6}
      .reference-link{min-height:44px;padding:8px 0;overflow-wrap:anywhere;font-size:15px;line-height:1.5}
      .image-zoom{width:44px;height:44px;min-height:44px;font-size:26px;right:2px;bottom:2px}
      .image-preview{position:fixed;padding:16px;width:calc(100vw - 24px - env(safe-area-inset-left,0px) - env(safe-area-inset-right,0px));max-width:680px;max-height:calc(100dvh - 24px - env(safe-area-inset-top,0px) - env(safe-area-inset-bottom,0px));margin:auto;overflow:auto;overscroll-behavior:contain;animation:none}
      .image-preview-content>header{gap:12px;position:sticky;top:-16px;padding:4px 0;background:#f9fbf5;z-index:1}
      .image-preview h2{font-size:22px;line-height:1.3}
      .image-preview header button{width:44px;height:44px;min-height:44px;font-size:28px}
      .image-preview-content>p{font-size:16px;line-height:1.5;margin:8px 0 12px}
      .image-preview-content>img{max-height:65dvh;width:100%;object-fit:contain}
    }
    @media(max-width:350px){
      main{padding-left:10px;padding-right:10px}
      .site-header{padding-left:6px;padding-right:6px}
      .site-header nav{gap:4px}.site-header nav>a{font-size:13px;padding-left:2px;padding-right:2px}
      .hero h1,.hero.compact h1{font-size:25px}
      .hotspot{font-size:10px}.hotspot .hotspot-label{max-width:86px}
      .card-position-tools{width:100%;justify-content:space-between}
      .assessment button{font-size:14px}
      .map-prompt{grid-template-columns:minmax(0,1fr) 78px;padding:10px;gap:0 8px}
      .map-question-image{height:84px}.map-prompt h2{font-size:20px}
      .map-question-hint{font-size:13px}
    }
    /* iPhones keep their touch ergonomics when rotation crosses desktop breakpoints. */
    @media(pointer:coarse), (max-height:500px) and (orientation:landscape) and (max-width:1000px){
      :host{font-size:16px;line-height:1.55;-webkit-text-size-adjust:100%}
      button:not(.hotspot),.primary-button,.outline-button,.text-button,.view-switch button,.region-tabs button,.card-image-zoom{min-height:48px;font-size:15px;line-height:1.4}
      input:not([type=checkbox]),select,textarea,.search input,.map-select select,.map-board-heading select{font-size:16px!important;min-height:48px}
      .search{min-height:50px;padding-top:0;padding-bottom:0}
      .search input{min-width:0}
      .arrow-button{min-width:48px;min-height:48px;width:48px;height:48px}
      .image-zoom{width:48px;height:48px;min-height:48px;font-size:26px}
      .image-preview header button{width:48px;height:48px;min-height:48px}
      .detail-intro,.bone-detail li,.directory-head p,.flashcard .question,.answer-content .answer-detail,.notes-topic p,.notes-topic li,.glossary-item dd{font-size:16px;line-height:1.55}
      .bone-item{min-height:60px}.bone-item strong{font-size:16px}.bone-item small{font-size:15px}
      .toolbar-actions,.toolbar-actions .text-button,.assessment button{font-size:15px}
      .toolbar-actions label{min-height:48px}
      .map-question-hint,.map-feedback,.map-feedback>strong{font-size:15px;line-height:1.45}
      .map-prompt-actions .primary-button,.map-prompt-actions .outline-button,.map-prompt-actions .text-button{font-size:15px;min-height:48px}
      .map-select,.map-mode legend,.map-board-heading>label{font-size:14px}
      .card-position,.deck-progress-caption,.map-prompt-meta{font-size:13px;line-height:1.45;letter-spacing:0}
      .view-switch button{font-size:15px}
      .reference-link{min-height:44px;padding:8px 0;font-size:15px;line-height:1.5}
    }
    @media(max-height:500px) and (orientation:landscape) and (max-width:1000px){
      :host{--bio-shell-top:var(--study-sticky-offset,56px)}
      .biology-app{overflow:clip}
      main{padding-left:max(16px,env(safe-area-inset-left));padding-right:max(16px,env(safe-area-inset-right))}
      .site-header{position:sticky;top:var(--bio-shell-top);z-index:20;padding:4px max(12px,env(safe-area-inset-left));min-height:48px}
      .site-header nav>a{min-height:44px;font-size:15px}
      .site-header .small{display:none}
      .hero,.hero.compact{padding:12px 0}.hero .eyebrow{display:none}
      .hero h1,.hero.compact h1{font-size:26px}.hero .intro{font-size:15px;margin-top:6px}
      .map-prompt{position:static}
      .image-preview{max-height:calc(100dvh - 16px);padding:12px;width:min(95vw,760px);animation:none}
      .image-preview header button{width:44px;height:44px;min-height:44px}
      .image-preview-content>header{position:sticky;top:-12px;background:#f9fbf5;z-index:1}
      .image-preview-content>img{max-height:70dvh}
    }
    /* All four destinations fit without sideways navigation on every iPhone width. */
    @media(max-width:760px){
      /* The shell already names this unit; atlas introduction has no unique controls. */
      #atlas-page>.hero{display:none}
      #atlas-page>.section-head{margin-top:14px}
      .site-header nav{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));width:100%;height:auto;gap:0;overflow:visible}
      .site-header nav>a{display:flex;min-width:0;min-height:44px;height:auto;padding:8px 2px;justify-content:center;font-size:13px;line-height:1.2;white-space:nowrap}
      .bio-nav-long{display:none}.bio-nav-short{display:block}
    }
    @media(max-width:350px){
      .site-header nav>a{font-size:14px}
      .site-header a[data-page=cards] .bio-nav-short{display:none}
      .site-header a[data-page=cards] .bio-nav-tiny{display:block}
    }
    /* Inherited shell tokens cross Shadow DOM in Safari without :host-context. */
    :host{
      --bio-surface:var(--study-surface,#fff);--bio-soft:var(--study-soft,#f2f5ef);
      --bio-text:var(--study-text,#232628);--bio-muted:var(--study-muted,#62705e);
      --bio-line:var(--study-line,#dfe5dc);--bio-accent:var(--study-accent,#315d49);
      --bio-accent-soft:var(--study-accent-soft,#e7eee5);
      --bio-scale:var(--study-text-scale,1);--bio-reading-size:calc(15px * var(--bio-scale));
      color:var(--bio-text);color-scheme:inherit
    }
    .biology-app,.site-header,.bone-detail,.map-prompt,.flashcard,.notes-topic,.glossary-item,.search,.outline-button{background:var(--bio-surface);color:var(--bio-text);border-color:var(--bio-line)}
    .hero h1,.hero.compact h1,.section-head h2,.directory-head h2,.study-guide h2,.bone-detail h3,.answer-content h2,.notes-topic h2,.glossary-item dt,.map-prompt h2,.map-results h2{color:var(--bio-text)}
    .hero h1 em,.hero.compact h1 em{color:var(--bio-accent)}
    .site-header nav>a{color:var(--bio-muted)}
    .site-header nav>a.active,.site-header nav>a:hover{color:var(--bio-accent);border-color:var(--bio-accent)}
    .hero .intro,.eyebrow,.section-index,.detail-meta,.detail-source,.detail-intro,.bone-detail li,.directory-head p,.bone-item small,.bone-item>span:first-child,.bone-item .item-arrow,.latin,.label-toggle,.toolbar-actions,.card-position,.flip-hint,.deck-progress-caption,.privacy-note,.answer-content .answer-label,.answer-content .answer-detail,.answer-content .answer-source,.notes-topic p,.notes-topic li,.notes-topic .topic-number,.notes-topic .slides-ref,.glossary-item dd,.source-details,.map-prompt-meta,.map-prompt .latin,.map-question-hint,.map-tip,.map-select,.map-mode legend,.map-scope-note,.map-results>p:last-of-type{color:var(--bio-muted)}
    .bone-item strong,.flashcard .question,.map-feedback b{color:inherit}
    .primary-button,.download{background:var(--bio-accent);color:var(--study-accent-ink,#fff)}
    .primary-button:hover,.download:hover{background:var(--bio-accent);filter:brightness(.92)}
    .outline-button:hover,.bone-item:hover,.bone-item.selected,.flashcard.answer,.practice-banner,.progress-summary,.map-score,.pdf-tile,.pdf-tile:hover,.map-results{background:var(--bio-accent-soft);border-color:var(--bio-line);color:var(--bio-text)}
    .practice-banner small,.banner-cta,.banner-symbol,.pdf-tile>span,.pdf-tile small,.progress-summary>div,.progress-summary strong,.map-score>span,.map-score>small{color:var(--bio-muted)}
    .progress-summary>span,.map-score strong,.map-result-score{color:var(--bio-accent)}
    .bone-item,.bone-detail li,.study-toolbar,.notes-toolbar,.map-settings,.map-board,.map-board-heading,.map-board-footer,.source-details,.correction,.keyboard-tip,.map-tip,.search,.image-preview{border-color:var(--bio-line)}
    .region-tabs button,.view-switch button,.text-button{color:var(--bio-muted)}
    .region-tabs button.active,.study-toolbar .region-tabs button.active,.view-switch button.active{background:var(--bio-accent-soft);border-color:var(--bio-line);color:var(--bio-accent);box-shadow:none}
    .region-tabs button:hover,.view-switch button:hover{background:var(--bio-soft);color:var(--bio-text)}
    .outline-button,.arrow-button,.card-image-zoom{background:var(--bio-soft);border-color:var(--bio-line);color:var(--bio-text)}
    .card-image-zoom:hover{background:var(--bio-accent-soft)}
    .search input,.map-select select,.map-board-heading select{background:var(--bio-surface);color:var(--bio-text);border-color:var(--bio-line)}
    .search input::placeholder{color:var(--bio-muted);opacity:1}
    input[type=checkbox]{accent-color:var(--bio-accent)}
    .label-toggle input:checked+span{background:var(--bio-accent)}
    .directory-head h2>span,.deck-progress{background:var(--bio-soft);color:var(--bio-muted)}
    .deck-progress>div{background:var(--bio-accent)}
    .source-details>summary,.source-details a{color:var(--bio-accent)}
    .source-details h3,.correction strong,.correction p{color:var(--bio-text)}
    .keyboard-tip,.keyboard-tip strong,.study-guide li,.study-guide li>span,.empty-state,.loading{color:var(--bio-muted);border-color:var(--bio-line)}
    .empty-state h2{color:var(--bio-text)}
    .empty-state button{background:var(--bio-accent);color:var(--study-accent-ink,#fff)}
    .empty-state p{font-size:var(--bio-reading-size)}
    .notes-topic li::marker,.bone-detail li:before{color:var(--bio-accent)}
    .assessment button{background:#fff1dc;color:#684712;border:1px solid #d6b77b}
    .assessment button:last-child{background:#e6f3e8;color:#215334;border-color:#99bba0}
    .map-feedback.correct{background:#e6f3e8;color:#215334;border:1px solid #99bba0}
    .map-feedback.incorrect{background:#fff1dc;color:#684712;border:1px solid #d6b77b}
    .map-feedback.skipped{background:var(--bio-soft);color:var(--bio-text);border:1px solid var(--bio-line)}
    .map-feedback .map-your-answer{color:inherit}
    /* Original anatomy artwork and photographs keep a neutral, readable light canvas. */
    .anatomy-card,.map-skeleton,.detail-visual,.map-question-image,.flashcard .card-image{background-color:#f7f9f5;color:#294b36}
    .canvas-heading{color:#5c7054;border-color:#dce3d4}.canvas-heading>span:first-child{color:#37533e}
    .anatomy-card>.region-tabs button{color:#415a40}
    .anatomy-card>.region-tabs button.active{background:#fff;border-color:#b6c6b0;color:#264b34}
    .anatomy-card>.region-tabs button:hover{background:#fff;color:#264b34}
    .canvas-help{color:#5d7055}.hotspot{color:#41583c}
    .flashcard .card-image{border-radius:8px}
    .map-board{background:var(--bio-surface)}
    .map-board-heading>span,.map-board-heading>label,.map-board-footer{color:var(--bio-muted)}
    .map-board-footer>span:last-child{color:var(--bio-accent)}
    .image-preview,.image-preview-content>header{background:var(--bio-surface);color:var(--bio-text)}
    .image-preview h2{color:var(--bio-text)}
    .image-preview-content>p{color:var(--bio-muted)}
    .image-preview header button{background:var(--bio-soft);border-color:var(--bio-line);color:var(--bio-text)}
    .image-preview-content>img{background:#fff}
    .image-preview::backdrop{background:#101810b8}
    .detail-intro,.bone-detail li,.directory-head p,.flashcard .question,.answer-content .answer-detail,.notes-topic p,.notes-topic li,.glossary-item dd,.source-details,.correction strong,.correction p,.map-question-hint,.map-feedback,.map-feedback>strong,.map-feedback>p:last-child,.map-scope-note,.map-results>p:last-of-type,.image-preview-content>p{font-size:var(--bio-reading-size)}
    .notes-topic h2,.glossary-item dt{font-size:calc(23px * var(--bio-scale))}
    .bone-detail h3,.answer-content h2{font-size:calc(27px * var(--bio-scale))}
    .bone-detail .latin,.answer-content .latin{font-size:calc(18px * var(--bio-scale))}
    .map-prompt h2{font-size:calc(22px * var(--bio-scale));overflow-wrap:anywhere}
    .bone-item strong{font-size:calc(16px * var(--bio-scale))}
    .bone-item small,.reference-link{font-size:calc(15px * var(--bio-scale))}
    .detail-source,.answer-content .answer-source,.notes-topic .slides-ref{font-size:calc(12px * var(--bio-scale))}
    @media(max-width:760px), (pointer:coarse){:host{--bio-reading-size:calc(16px * var(--bio-scale))}}
  `;
  style.textContent+=`
    #cards-page .study-layout{grid-template-columns:minmax(0,200px) minmax(0,480px);gap:32px}
    #cards-page .flashcard-zone{width:100%;max-width:480px;margin-inline:auto}
    #cards-page .flashcard{width:100%;min-height:clamp(340px,70vw,480px);padding:24px;aspect-ratio:auto}
    #cards-page .flashcard .question{position:static;max-width:none;align-self:stretch;font-size:calc(22px * var(--bio-scale));line-height:1.45}
    #cards-page .flashcard .card-image{height:clamp(210px,48vw,300px);max-height:none;margin:16px 0 12px;object-fit:contain}
    #cards-page .answer-content h2{font-size:calc(28px * var(--bio-scale));line-height:1.25}
    #cards-page .answer-content .answer-detail{font-size:calc(22px * var(--bio-scale));line-height:1.5}
    #cards-page .answer-content .latin{font-size:calc(22px * var(--bio-scale))}
    #cards-page .answer-content{width:100%;overflow-wrap:anywhere}
    #cards-page .flip-hint{position:static;align-self:stretch;margin-top:14px;font-size:13px}
    #cards-page .flip-hint>span:last-child{display:none}
    #cards-page .card-actions{align-items:center;gap:16px}
    #cards-page #flip-card,#cards-page .arrow-button,#cards-page .assessment button{flex:none;width:48px;height:48px;min-height:48px;padding:0;display:inline-grid;place-items:center;font-size:25px;border-radius:50%}
    #cards-page .assessment{gap:18px}
    #cards-page #card-image-zoom{font-size:23px;min-width:44px;min-height:44px}
    @media(max-width:800px){#cards-page .study-layout{grid-template-columns:minmax(0,480px)}}
    @media(prefers-reduced-motion:reduce){#cards-page .flashcard,#cards-page .deck-progress>div{transition:none;transform:none}}
  `;
  root.append(style);
  root.querySelectorAll('[src],[href]').forEach(el=>{
    for(const attr of ['src','href']) {const value=el.getAttribute(attr);if(value?.startsWith('assets/'))el.setAttribute(attr,new URL(value,base).href);}
  });
  const controller=new AbortController();
  const events=new EventTarget();
  const rafs=new Set();
  let active=true,currentHash='#'+(modes[mode]||'atlas');
  const location={get hash(){return currentHash},set hash(value){currentHash=value.startsWith('#')?value:'#'+value;events.dispatchEvent(new Event('hashchange'));}};
  const localStorage={
    getItem(key){
      try {
        const name='study:biology:'+key;let value=globalThis.localStorage.getItem(name);
        if(value===null&&['kostra-progress-v1','kostra-progress-v2'].includes(key)) {
          value=globalThis.localStorage.getItem(key);
          if(value!==null)globalThis.localStorage.setItem(name,value);
        }
        return value;
      }catch{return null;}
    },
    setItem(key,value){
      try {globalThis.localStorage.setItem('study:biology:'+key,value);}catch{}
      onProgress?.(getProgress());
      host.dispatchEvent(new CustomEvent('study-progress',{bubbles:true,composed:true,detail:{subject:'biology',...getProgress()}}));
    }
  };
  const document={
    querySelector:s=>root.querySelector(s),querySelectorAll:s=>root.querySelectorAll(s),
    createElementNS:(...args)=>globalThis.document.createElementNS(...args),
    addEventListener:(name,fn,options)=>root.addEventListener(name,fn,{...options,signal:controller.signal})
  };
  const window={
    addEventListener(name,fn,options){
      if(name==='hashchange')events.addEventListener(name,fn,{...options,signal:controller.signal});
      else globalThis.addEventListener(name,fn,{...options,signal:controller.signal});
    },
    scrollTo(){host.scrollIntoView({block:'start',behavior:'instant'});}
  };
  root.addEventListener('click',event=>{
    const anchor=event.target.closest?.('a[href^="#"]');
    if(anchor) {event.preventDefault();location.hash=anchor.getAttribute('href');}
  },{signal:controller.signal});
  const ready = new Promise(resolve=>{sheet.onload=resolve;sheet.onerror=resolve;});
  // Styles must be loaded before geometry-based SVG hotspots are measured.
  if(!sheet.sheet)await Promise.race([ready,new Promise(resolve=>setTimeout(resolve,3000))]);
  if(!host.isConnected)return ()=>{};
  run({document,window,location,localStorage,asset:value=>new URL(value,base).href,
    requestAnimationFrame(fn){const id=globalThis.requestAnimationFrame(()=>{rafs.delete(id);if(active)fn();});rafs.add(id);return id;}});
  const updateCardControls=()=>{
    const card=root.querySelector('#flashcard'),flipped=card?.classList.contains('answer');
    const controls=[['#flip-card','↻',flipped?'Zobrazit obrázek':'Otočit kartičku a zobrazit odpověď'],['#repeat-card','↺','Ještě zopakovat'],['#know-card','✓','Tohle umím'],['#card-image-zoom','⤢','Zvětšit obrázek zadání']];
    for(const [selector,symbol,label] of controls){const button=root.querySelector(selector);if(!button)continue;if(button.textContent!==symbol)button.textContent=symbol;if(button.getAttribute('aria-label')!==label)button.setAttribute('aria-label',label);button.title=label;}
    root.querySelector('#flip-card')?.setAttribute('aria-pressed',String(!!flipped));
  };
  const cardObserver=new MutationObserver(updateCardControls);
  cardObserver.observe(wrapper,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
  updateCardControls();
  const cleanup=()=>{cardObserver.disconnect();active=false;controller.abort();rafs.forEach(id=>globalThis.cancelAnimationFrame(id));host.remove();};
  cleanup.navigate=next=>{location.hash=modes[next]||next;};
  cleanup.root=root;
  return cleanup;
}

export function getProgress() {
  try {
    const known=JSON.parse(globalThis.localStorage.getItem('study:biology:kostra-progress-v2')||'[]');
    const results=JSON.parse(globalThis.localStorage.getItem('study:biology:map-results')||'[]');
    const map=JSON.parse(globalThis.localStorage.getItem('study:biology:map-progress')||'null');
    return {mastered:Array.isArray(known)?known.length:0,total:64,results:Array.isArray(results)?results:[],map};
  }catch{return {mastered:0,total:64,results:[],map:null};}
}
