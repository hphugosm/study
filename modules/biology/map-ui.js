(function () {
  'use strict';
  const find = selector => document.querySelector(selector);
  const all = (selector, root = document) => [...root.querySelectorAll(selector)];
  const text = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const content = window.KOSTRA_DATA;
  const rules = window.KostraMapQuiz;
  if (!content || !rules || !find('#map-page')) return;
  const state = {mode:'named', region:'all', view:'all', diagram:null, questions:[], index:0, answers:[], answered:false, complete:false};
  const views = {
    all:[0,0,500,1000], hlava:[150,20,200,170], nos:[225,85,50,70], krk:[215,150,70,75],
    trup:[85,145,330,410], horni:[15,150,470,510], dolni:[115,435,270,565],
    ruka:[8,515,140,170], noha:[178,905,85,95]
  };
  const current = () => state.questions[state.index];
  const correctCount = () => state.answers.filter(answer => answer.correct).length;
  const boneName = id => content.bones.find(bone => bone.id === id)?.name || 'jiné místo na kostře';
  const extraViews = window.KOSTRA_MAP_VIEWS || {};
  for (const [id,markup] of Object.entries(extraViews)) {
    const box = markup.match(/viewBox="([^"]+)"/);
    if (box) views[id] = box[1].trim().split(/[\s,]+/).map(Number);
  }

  function prepareSkeleton(diagram = 'body') {
    let markup = diagram === 'body' ? window.KOSTRA_SVG : extraViews[diagram];
    if (!markup) return;
    const ids = [...markup.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    for (const id of ids) markup = markup.replaceAll(`id="${id}"`, `id="map-${diagram}-${id}"`).replaceAll(`url(#${id})`, `url(#map-${diagram}-${id})`).replaceAll(`href="#${id}"`, `href="#map-${diagram}-${id}"`);
    find('#map-skeleton').innerHTML = markup;
    state.diagram = diagram;
    const svg = find('#map-skeleton svg');
    svg.setAttribute('role','group');
    svg.setAttribute('aria-label','Slepá mapa kostry. Vyber místo klávesou Tab a odpověz klávesou Enter.');
    const style = svg.querySelector('style');
    if (style) style.textContent = style.textContent.replace(/([^{}]+)\{/g, (_, selectors) => selectors.split(',').map(selector => '#map-skeleton ' + selector.trim()).join(',') + '{');
    // The atlas draws the frontal brow ridge above the eye sockets, outside
    // the main frontal-bone group. Give that visible bone part its true target.
    all('[data-bone="lebka"] > path.bone',svg).forEach(path => {
      const group = document.createElementNS('http://www.w3.org/2000/svg','g');
      group.dataset.bone = 'celni';
      path.replaceWith(group);
      group.append(path);
    });
    all('[data-bone]',svg).filter(group => !group.querySelector('[data-bone]')).forEach((group,index) => {
      group.setAttribute('tabindex','0');
      group.setAttribute('role','button');
      group.setAttribute('aria-label',`Místo na kostře ${index+1}`);
    });
    svg.addEventListener('click',event => {
      const group = event.target.closest('[data-bone]');
      if (group && svg.contains(group)) answer(group.dataset.bone);
      else if (!state.answered) find('#map-instruction').textContent = 'Klikni přímo na kost. Pro drobné kosti použij přiblížení.';
    });
    svg.addEventListener('keydown',event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const group = event.target.closest('[data-bone]');
      if (!group || group.getAttribute('tabindex') !== '0') return;
      event.preventDefault();
      if (answer(group.dataset.bone)) find('#map-next').focus({preventScroll:true});
    });
  }

  function setView(view) {
    state.view = Object.hasOwn(views,view) ? view : 'all';
    find('#map-view').value = state.view;
    const diagram = Object.hasOwn(extraViews,state.view) ? state.view : 'body';
    if (state.diagram !== diagram) prepareSkeleton(diagram);
    const svg = find('#map-skeleton svg');
    svg.setAttribute('viewBox',views[state.view].join(' '));
    find('#map-skeleton').dataset.view = state.view;
    // Fit the SVG viewport itself to the chosen crop. A full-size viewport
    // would let bones outside the viewBox show through its letterbox margins.
    const canvas = find('#map-skeleton');
    const style = getComputedStyle(canvas);
    const availableWidth = canvas.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    const availableHeight = canvas.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
    if (availableWidth > 0 && availableHeight > 0) {
      const ratio = views[state.view][2] / views[state.view][3];
      const width = Math.min(availableWidth,availableHeight * ratio);
      svg.style.width = `${width}px`;
      svg.style.height = `${width / ratio}px`;
    }
    applyAnswerHighlight();
    refreshFocusTargets();
  }

  function refreshFocusTargets() {
    const boundary = find('#map-skeleton svg').getBoundingClientRect();
    all('#map-skeleton [data-bone][role="button"]').forEach(group => {
      const box = group.getBoundingClientRect();
      const visible = box.width > 0 && box.height > 0 && box.right > boundary.left && box.left < boundary.right && box.bottom > boundary.top && box.top < boundary.bottom;
      group.tabIndex = visible && !state.answered ? 0 : -1;
    });
  }

  function updateScore() {
    find('#map-score').textContent = `${correctCount()} / ${state.questions.length}`;
    find('#map-completed').textContent = `Odpovězeno ${state.answers.length} z ${state.questions.length}`;
  }

  function startRound(questions) {
    const pool = questions || rules.createQuestions(content,state.region);
    state.questions = rules.shuffleQuestions(pool);
    state.index = 0;
    state.answers = [];
    state.complete = false;
    find('#map-exercise').hidden = false;
    find('#map-results').hidden = true;
    all('[data-map-mode]').forEach(button => {
      const active = button.dataset.mapMode === state.mode;
      button.classList.toggle('active',active);
      button.setAttribute('aria-pressed',String(active));
    });
    renderQuestion();
  }

  function renderQuestion() {
    const question = current();
    if (!question) { finishRound(); return; }
    state.answered = false;
    updateScore();
    setView(question.view && question.view !== 'body' ? question.view : 'all');
    const named = state.mode === 'named';
    find('.map-prompt').classList.toggle('name-only',named);
    find('#map-position').textContent = `Kost ${state.index+1} / ${state.questions.length}`;
    find('#map-mode-label').textContent = named ? 'S NÁZVEM' : 'BEZ NÁZVU';
    find('#map-question-title').textContent = named ? question.name : 'Najdi tuto kost';
    find('#map-question-title').tabIndex = -1;
    find('#map-latin').textContent = named ? question.latin : '';
    find('#map-latin').hidden = !named;
    const image = find('#map-question-image');
    image.closest('.map-question-image').hidden = named;
    if (named) image.removeAttribute('src');
    else image.src = `${question.image}?v=${question.imageVersion}`;
    image.alt = named ? '' : question.promptKind === 'whole' ? 'Celá kost k umístění na mapě.' : 'Obrázek s oranžovým označením hledané kosti nebo skupiny.';
    find('#map-question-hint').textContent = named ? 'Ukaž tuto kost na těle podle uvedeného názvu.' : question.locationHint;
    find('#map-feedback').className = 'map-feedback';
    find('#map-feedback').textContent = '';
    find('#map-reveal').hidden = false;
    find('#map-next').hidden = true;
    find('#map-next').textContent = state.index === state.questions.length-1 ? 'Vyhodnotit sadu →' : 'Další kost →';
    find('#map-focus-answer').hidden = true;
    find('#map-legend').hidden = true;
    find('#map-instruction').textContent = named ? 'Klikni na místo, kam patří zadaná kost.' : 'Klikni na místo, kam patří kost z obrázku.';
    find('#map-skeleton').classList.remove('answered');
    all('#map-skeleton [data-bone]').forEach(group => {
      group.classList.remove('map-correct','map-wrong');
      group.removeAttribute('aria-disabled');
    });
  }

  function answer(clickedId, skipped = false) {
    if (state.answered || state.complete || !current()) return false;
    const question = current();
    const correct = !skipped && rules.scoreAnswer(question,clickedId);
    state.answered = true;
    state.answers.push({question, correct, clickedId, skipped});
    updateScore();
    const feedback = find('#map-feedback');
    feedback.className = `map-feedback ${correct ? 'correct' : skipped ? 'skipped' : 'incorrect'}`;
    const heading = correct ? '✓ Přesně tak. Tohle je správné místo.' : skipped ? 'Tady ji najdeš.' : 'Ještě ne. Správné místo svítí zeleně.';
    const selection = !correct && !skipped ? `<p class="map-your-answer">Tvůj výběr: ${text(boneName(clickedId))}.</p>` : '';
    feedback.innerHTML = `<strong>${heading}</strong>${selection}<p><b>${text(question.name)}</b> · <i>${text(question.latin)}</i></p><p>${text(question.detail)}</p>`;
    applyAnswerHighlight();
    find('#map-skeleton').classList.add('answered');
    refreshFocusTargets();
    find('#map-reveal').hidden = true;
    find('#map-next').hidden = false;
    find('#map-focus-answer').hidden = false;
    find('#map-legend').hidden = false;
    find('#map-instruction').textContent = correct ? 'Správně. Můžeš pokračovat na další kost.' : 'Prohlédni si správné místo a pak pokračuj.';
    return true;
  }

  function answerView() {
    const question = current();
    return question.view && question.view !== 'body' ? question.view : question.focus;
  }

  function applyAnswerHighlight() {
    const answer = state.answered ? state.answers[state.answers.length-1] : null;
    all('#map-skeleton [data-bone]').forEach(group => {
      group.classList.toggle('map-correct',Boolean(answer && answer.question.revealIds.includes(group.dataset.bone)));
      group.classList.toggle('map-wrong',Boolean(answer && !answer.correct && !answer.skipped && group.dataset.bone === answer.clickedId && !answer.question.revealIds.includes(answer.clickedId)));
      if (group.hasAttribute('role')) {
        if (state.answered) group.setAttribute('aria-disabled','true');
        else group.removeAttribute('aria-disabled');
      }
    });
  }

  function finishRound() {
    state.complete = true;
    updateScore();
    find('#map-exercise').hidden = true;
    find('#map-results').hidden = false;
    const errors = state.answers.filter(answer => !answer.correct);
    find('#map-result-score').textContent = `${correctCount()} / ${state.questions.length}`;
    find('#map-result-copy').textContent = errors.length ? 'Hotovo. Kosti, které se nepovedly nebo jsi přeskočil, si můžeš hned zopakovat.' : 'Všechny kosti jsi umístil správně na první pokus. Zkus novou sadu nebo režim bez názvu.';
    find('#map-repeat-mistakes').hidden = !errors.length;
    find('#map-results-title').tabIndex = -1;
    find('#map-results-title').focus({preventScroll:true});
    find('#map-results').scrollIntoView({behavior:'smooth',block:'center'});
  }

  prepareSkeleton();
  all('[data-map-mode]').forEach(button => button.addEventListener('click',() => {
    if (state.mode === button.dataset.mapMode) return;
    state.mode = button.dataset.mapMode;
    startRound();
  }));
  find('#map-region').addEventListener('change',event => {state.region = event.target.value;startRound();});
  find('#map-view').addEventListener('change',event => setView(event.target.value));
  find('#map-restart').addEventListener('click',() => startRound());
  find('#map-new-round').addEventListener('click',() => startRound());
  find('#map-repeat-mistakes').addEventListener('click',() => startRound(state.answers.filter(answer => !answer.correct).map(answer => answer.question)));
  find('#map-reveal').addEventListener('click',() => answer(null,true));
  find('#map-focus-answer').addEventListener('click',() => setView(answerView()));
  find('#map-next').addEventListener('click',() => {
    if (!state.answered) return;
    state.index += 1;
    if (state.index >= state.questions.length) finishRound();
    else {renderQuestion();find('#map-question-title').focus({preventScroll:true});}
  });
  window.addEventListener('resize',() => {if (!find('#map-page').hidden && !state.complete) setView(state.view);});
  startRound();
  window.KostraMapUI = Object.freeze({activate:() => {if (!state.complete) setView(state.view);}});
})();
