import { questions } from './data/questions.js';
import { vocabulary } from './data/vocabulary.js';
import { topics } from './data/lessons.js';

const esc = (value = '') => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const shuffle = values => {
  const copy = [...values];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};
const normalise = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
const unique = values => [...new Set(values)];
const progress = context => context.readProgress?.() || {};
const save = (context, patch) => context.saveProgress?.(patch);
const topicTitle = id => topics.find(topic => topic.id === id)?.short || topics.find(topic => topic.id === id)?.title || id;
const topicOptions = selected => `<option value="all" ${selected === 'all' ? 'selected' : ''}>All seven topics</option>${topics.map(topic => `<option value="${esc(topic.id)}" ${selected === topic.id ? 'selected' : ''}>${esc(topic.short || topic.title)}</option>`).join('')}`;
const provenance = item => `<span class="pr-source">${esc(item.source || 'Study notes')}${item.provenance === 'added' ? ' · Added explanation' : item.provenance === 'corrected' ? ' · Corrected source' : ''}</span>`;
const answerFor = item => item.type === 'mcq' ? item.options[item.correct] : item.type === 'boolean' ? (item.correct ? 'True' : 'False') : item.type === 'order' ? item.steps.join(' → ') : item.answers?.[0] || '';
const questionTypes = { mcq: 'Multiple choice', boolean: 'True or false', text: 'Type an answer', order: 'Put in order', matching: 'Match vocabulary', mixed: 'Mixed practice' };
const describeMode = mode => ({ mcq: 'Choose one answer, then learn why it is correct.', boolean: 'Decide whether each statement is true or false.', text: 'Recall the answer without seeing any options.', order: 'Arrange court levels, events and procedural steps.', matching: 'Connect five legal terms with their English definitions.', mixed: 'A shuffled combination of question formats.' }[mode]);

function updateMistake(context, id, incorrect) {
  const existing = progress(context).mistakes || [];
  save(context, { mistakes: incorrect ? unique([...existing, id]) : existing.filter(value => value !== id) });
}

export function renderFlashcards(container, context) {
  const document = container.getRootNode();
  let filter = topics.some(topic => topic.id === context.initialTopic) ? context.initialTopic : 'all';
  let weakOnly = Boolean(context.reviewOnly);
  let index = 0;
  let flipped = false;
  let deck = [];
  const allCards = [
    ...questions.filter(item => item.type !== 'order').map(item => ({ ...item, answer: answerFor(item), definition: item.explanation, cardKind: 'question' })),
    ...vocabulary.map(item => ({ ...item, topic: 'vocabulary', prompt: item.term, answer: item.definition, cardKind: 'vocabulary' })),
  ];
  function rebuild(random = false) {
    const stored = progress(context);
    const known = new Set(stored.knownCards || []);
    deck = allCards.filter(card => (filter === 'all' || card.topic === filter) && (!weakOnly || !known.has(card.id)));
    if (random) deck = shuffle(deck);
    index = 0;
    flipped = false;
  }
  function paint() {
    const known = new Set(progress(context).knownCards || []);
    const card = deck[index];
    const learned = deck.filter(item => known.has(item.id)).length;
    container.innerHTML = `<section class="pr-page" aria-labelledby="pr-flash-title">
      <div class="pr-heading"><div><p class="pr-eyebrow">RECALL BEFORE YOU REVEAL</p><h1 id="pr-flash-title">Practice flashcards</h1><p>Turn the card over, then decide what needs another look.</p></div><span class="pr-count">${learned} / ${deck.length} known</span></div>
      <div class="pr-toolbar"><label class="pr-field">Topic<select name="card-topic">${topicOptions(filter)}</select></label><label class="pr-check"><input type="checkbox" name="weak-cards" ${weakOnly ? 'checked' : ''}> Only cards I haven’t mastered</label><button class="pr-button pr-button-quiet" data-action="shuffle">↻ Shuffle cards</button></div>
      ${card ? `<div class="pr-deck-meta"><span>${esc(topicTitle(card.topic))} ${known.has(card.id) ? '· Known' : '· In practice'}</span><span>Card ${index + 1} of ${deck.length}</span></div>
      <button type="button" class="pr-flashcard ${flipped ? 'is-flipped' : ''}" data-action="flip" aria-label="${flipped ? 'Show question' : 'Reveal answer'}">
        <span class="pr-card-label">${flipped ? 'ANSWER' : card.cardKind === 'vocabulary' ? 'LEGAL VOCABULARY' : 'QUESTION'}</span>
        ${flipped ? `<strong class="pr-card-answer">${esc(card.answer)}</strong>${card.cardKind === 'vocabulary' ? `<span class="pr-translation" lang="cs">${esc(card.translation)}</span><span class="pr-example">${esc(card.example)}</span>` : `<span class="pr-card-explanation">${esc(card.definition)}</span>`}${provenance(card)}` : `<strong class="pr-card-question">${esc(card.prompt)}</strong>${card.cardKind === 'question' && card.type === 'mcq' ? `<span class="pr-card-options">${card.options.map((option, i) => `<span>${String.fromCharCode(65 + i)}. ${esc(option)}</span>`).join('')}</span>` : ''}`}
        <span class="pr-flip-hint">${flipped ? 'Click to return to the question' : 'Click to reveal · Space / Enter'}</span>
      </button>
      <div class="pr-card-navigation"><button class="pr-button pr-button-quiet" data-action="previous" aria-label="Previous card">← Previous</button><span class="pr-card-position">${index + 1} / ${deck.length}</span><button class="pr-button pr-button-quiet" data-action="next" aria-label="Next card">Next →</button></div>
      <div class="pr-confidence"><button class="pr-button pr-button-again" data-action="again" ${!flipped ? 'disabled' : ''}>↺ Study again</button><button class="pr-button pr-button-primary" data-action="known" ${!flipped ? 'disabled' : ''}>✓ I know this</button></div>
      <p class="pr-muted pr-center">Your choices are saved on this device. Reveal the answer before rating a card.</p>` : `<div class="pr-empty"><span aria-hidden="true">✓</span><h2>${weakOnly ? 'You’ve mastered this deck.' : 'No cards in this selection.'}</h2><p>${weakOnly ? 'Switch off the filter to revisit your known cards, or choose another topic.' : 'Try another topic to continue.'}</p><button class="pr-button pr-button-primary" data-action="show-all">Show all cards</button></div>`}
    </section>`;
  }
  function move(delta) {
    if (!deck.length) return;
    index = (index + delta + deck.length) % deck.length;
    flipped = false;
    paint();
  }
  function onClick(event) {
    const button = event.target.closest('[data-action]');
    if (!button || button.disabled) return;
    const action = button.dataset.action;
    if (action === 'flip') { flipped = !flipped; paint(); container.querySelector('[data-action="flip"]')?.focus({ preventScroll: true }); }
    if (action === 'next') move(1);
    if (action === 'previous') move(-1);
    if (action === 'shuffle') { rebuild(true); paint(); }
    if (action === 'show-all') { filter = 'all'; weakOnly = false; rebuild(); paint(); }
    if ((action === 'known' || action === 'again') && deck.length && flipped) {
      const id = deck[index].id;
      const known = progress(context).knownCards || [];
      save(context, { knownCards: action === 'known' ? unique([...known, id]) : known.filter(value => value !== id) });
      updateMistake(context, id, action === 'again');
      if (weakOnly && action === 'known') {
        deck.splice(index, 1);
        if (index >= deck.length) index = 0;
        flipped = false;
        paint();
      } else move(1);
    }
  }
  function onChange(event) {
    if (event.target.name === 'card-topic') filter = event.target.value;
    else if (event.target.name === 'weak-cards') weakOnly = event.target.checked;
    else return;
    rebuild(); paint();
  }
  function onKey(event) {
    if (!container.isConnected || !deck.length || event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target;
    if (target.closest?.('input,select,textarea,a,[contenteditable="true"]')) return;
    const cardFocused = Boolean(target.closest?.('[data-action="flip"]'));
    if (target.closest?.('button') && !cardFocused) return;
    // Enter/Space on the actual card keep native button activation. Arrow keys
    // also work while the card is focused, without escaping this shadow root.
    if (!cardFocused && (event.key === ' ' || event.key === 'Enter')) { event.preventDefault(); flipped = !flipped; paint(); }
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
      if (cardFocused) container.querySelector('[data-action="flip"]')?.focus({preventScroll: true});
    }
  }
  container.addEventListener('click', onClick);
  container.addEventListener('change', onChange);
  document.addEventListener('keydown', onKey);
  rebuild(); paint();
  return () => { container.removeEventListener('click', onClick); container.removeEventListener('change', onChange); document.removeEventListener('keydown', onKey); };
}

export function renderQuiz(container, context) {
  const allQuestions = [
    ...questions,
    ...vocabulary.map(item => ({
      id: item.id,
      topic: 'vocabulary',
      type: 'text',
      prompt: `Which legal term matches this English definition? ${item.definition}`,
      answers: unique([item.term, ...item.term.split('/').map(term => term.trim())].filter(Boolean)),
      explanation: `${item.definition} Czech: ${item.translation} Example: ${item.example}`,
      source: item.source,
      provenance: item.provenance,
    })),
  ];
  let phase = 'setup';
  let mode = Object.hasOwn(questionTypes, context.initialMode) ? context.initialMode : 'mixed';
  let filter = topics.some(topic => topic.id === context.initialTopic) ? context.initialTopic : 'all';
  let length = '10';
  let reviewOnly = Boolean(context.reviewOnly);
  let run = [];
  let index = 0;
  let answers = [];
  let checked = false;
  let chosen = null;
  let ordered = [];
  let optionOrder = [];
  let feedback = '';
  let matching = null;

  function available() {
    const wrong = new Set(progress(context).mistakes || []);
    return allQuestions.filter(item => (filter === 'all' || item.topic === filter) && (mode === 'mixed' || item.type === mode) && (!reviewOnly || wrong.has(item.id)));
  }
  function vocabAvailable() {
    return vocabulary.filter(item => filter === 'all' || filter === 'vocabulary' || item.category === filter);
  }
  function setup() {
    const pool = mode === 'matching' ? vocabAvailable() : available();
    const canStart = mode === 'matching' ? pool.length >= 2 : pool.length > 0;
    container.innerHTML = `<section class="pr-page" aria-labelledby="pr-quiz-title">
      <div class="pr-heading"><div><p class="pr-eyebrow">MAKE THE MISTAKES HERE</p><h1 id="pr-quiz-title">Test your understanding</h1><p>Choose a format. Every answer comes with an explanation.</p></div><span class="pr-count">${questions.length} questions + ${vocabulary.length} vocabulary prompts</span></div>
      <div class="pr-mode-grid">${Object.entries(questionTypes).map(([id, title]) => `<button class="pr-mode ${mode === id ? 'is-selected' : ''}" data-mode="${id}" aria-pressed="${mode === id}"><span class="pr-mode-icon" aria-hidden="true">${({ mcq: 'A', boolean: 'T/F', text: 'Aa', order: '1·2·3', matching: '↔', mixed: '✳' })[id]}</span><strong>${title}</strong><span>${describeMode(id)}</span></button>`).join('')}</div>
      <div class="pr-quiz-settings"><label class="pr-field">Topic<select name="quiz-topic">${topicOptions(filter)}</select></label>${mode !== 'matching' ? `<label class="pr-field">Session length<select name="quiz-length"><option value="10" ${length === '10' ? 'selected' : ''}>10 questions</option><option value="20" ${length === '20' ? 'selected' : ''}>20 questions</option><option value="all" ${length === 'all' ? 'selected' : ''}>All available</option></select></label><label class="pr-check"><input type="checkbox" name="quiz-review" ${reviewOnly ? 'checked' : ''}> Retry my mistakes only</label>` : '<p class="pr-muted">Match five pairs, one term and one definition at a time.</p>'}</div>
      <div class="pr-start-row"><div><strong>${pool.length} ${mode === 'matching' ? 'vocabulary terms' : 'questions'} available</strong><p class="pr-muted">${canStart ? mode === 'matching' ? 'Definitions are in English; Czech translations appear in feedback.' : 'The session uses each selected question at most once.' : reviewOnly ? 'No saved mistakes in this selection. Try a regular session.' : 'This format has no questions for this topic. Choose another combination.'}</p></div><button class="pr-button pr-button-primary" data-action="start" ${!canStart ? 'disabled' : ''}>${mode === 'matching' ? 'Start matching' : 'Start practice'} →</button></div>
    </section>`;
  }
  function prepareQuestion() {
    checked = false; chosen = null; feedback = '';
    const current = run[index];
    if (current.type === 'mcq') optionOrder = shuffle(current.options.map((value, original) => ({ value, original })));
    if (current.type === 'order') {
      ordered = shuffle(current.steps.map((value, original) => ({ value, original })));
      if (ordered.length > 1 && ordered.every((step, i) => step.original === i)) [ordered[0], ordered[1]] = [ordered[1], ordered[0]];
    }
  }
  function start(ids = null) {
    phase = 'playing'; index = 0; answers = [];
    if (mode === 'matching') { startMatching(); return; }
    const pool = ids ? allQuestions.filter(item => ids.includes(item.id)) : available();
    run = shuffle(pool).slice(0, (ids || length === 'all') ? pool.length : Number(length));
    if (!run.length) { phase = 'setup'; setup(); return; }
    prepareQuestion(); playing();
  }
  function playing() {
    const item = run[index];
    const score = answers.filter(answer => answer.correct).length;
    let input = '';
    if (item.type === 'mcq') input = `<div class="pr-options">${optionOrder.map((option, i) => `<button class="pr-option ${chosen === option.original ? 'is-chosen' : ''} ${checked && option.original === item.correct ? 'is-correct' : ''} ${checked && chosen === option.original && chosen !== item.correct ? 'is-wrong' : ''}" data-choice="${option.original}" ${checked ? 'disabled' : ''}><span class="pr-option-letter">${String.fromCharCode(65 + i)}</span><span>${esc(option.value)}</span>${checked && option.original === item.correct ? '<span class="pr-answer-mark" aria-label="Correct answer">✓</span>' : ''}</button>`).join('')}</div>`;
    if (item.type === 'boolean') input = `<div class="pr-options pr-binary">${[true, false].map(value => `<button class="pr-option ${chosen === value ? 'is-chosen' : ''} ${checked && value === item.correct ? 'is-correct' : ''} ${checked && chosen === value && chosen !== item.correct ? 'is-wrong' : ''}" data-boolean="${value}" ${checked ? 'disabled' : ''}>${value ? 'True' : 'False'} ${checked && value === item.correct ? '✓' : ''}</button>`).join('')}</div>`;
    if (item.type === 'text') input = `<form class="pr-answer-form"><label for="pr-text-answer">Your answer</label><input id="pr-text-answer" name="text-answer" type="text" value="${esc(typeof chosen === 'string' ? chosen : '')}" placeholder="Type the term, name or number…" autocomplete="off" spellcheck="false" ${checked ? 'disabled' : ''}><p class="pr-muted">Capitalization, punctuation and accents do not affect your answer.</p><button class="pr-button pr-button-primary" type="submit" ${checked ? 'disabled' : ''}>Check answer</button></form>`;
    if (item.type === 'order') input = `<p class="pr-muted">Move each step into place. Read from top to bottom.</p><ol class="pr-order-list">${ordered.map((step, i) => `<li><span class="pr-order-number">${i + 1}</span><span>${esc(step.value)}</span><div class="pr-order-buttons"><button class="pr-icon-button" data-move="${i}" data-direction="-1" aria-label="Move ${esc(step.value)} up" ${checked || i === 0 ? 'disabled' : ''}>↑</button><button class="pr-icon-button" data-move="${i}" data-direction="1" aria-label="Move ${esc(step.value)} down" ${checked || i === ordered.length - 1 ? 'disabled' : ''}>↓</button></div></li>`).join('')}</ol><button class="pr-button pr-button-primary" data-action="check-order" ${checked ? 'disabled' : ''}>Check the order</button>`;
    const result = answers[index];
    container.innerHTML = `<section class="pr-page pr-playing" aria-labelledby="pr-question-title"><div class="pr-session-meta"><button class="pr-text-button" data-action="finish-early">← End session</button><span>${esc(questionTypes[item.type])} · ${esc(topicTitle(item.topic))}</span><strong>${score} correct</strong></div><div class="pr-progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="${run.length}" aria-valuenow="${index + (checked ? 1 : 0)}" aria-label="Questions answered"><span style="width:${(index + (checked ? 1 : 0)) / run.length * 100}%"></span></div><p class="pr-eyebrow">QUESTION ${index + 1} OF ${run.length}</p><h1 id="pr-question-title" class="pr-question-title">${esc(item.prompt)}</h1>${input}
      ${checked ? `<div class="pr-feedback ${result.correct ? 'is-positive' : 'is-negative'}" role="status" tabindex="-1"><strong>${result.correct ? '✓ Correct.' : 'Let’s learn this one.'}</strong>${!result.correct ? `<p><b>Correct answer:</b> ${esc(answerFor(item))}</p>` : ''}<p>${esc(item.explanation)}</p>${provenance(item)}</div><div class="pr-next-row"><span class="pr-muted">${result.correct ? 'Keep going.' : 'Saved for another look.'}</span><button class="pr-button pr-button-primary" data-action="next-question">${index + 1 === run.length ? 'See results' : 'Next question'} →</button></div>` : `<p class="pr-muted pr-answer-hint">${item.type === 'mcq' || item.type === 'boolean' ? 'Select an answer to check it. Your first answer counts.' : 'Check your answer when you are ready.'}</p>${feedback ? `<p class="pr-validation" role="alert">${esc(feedback)}</p>` : ''}`}
    </section>`;
  }
  function check(value) {
    if (checked || !run.length) return;
    const item = run[index];
    if (item.type === 'text' && !normalise(value)) { feedback = 'Please type an answer before checking.'; playing(); container.querySelector('[name="text-answer"]')?.focus(); return; }
    chosen = value;
    const correct = item.type === 'text' ? item.answers.some(answer => normalise(answer) === normalise(value)) : item.type === 'order' ? ordered.every((step, i) => step.original === i) : value === item.correct;
    answers.push({ id: item.id, correct, given: item.type === 'order' ? ordered.map(step => step.value).join(' → ') : item.type === 'mcq' ? item.options[value] : String(value) });
    checked = true;
    updateMistake(context, item.id, !correct);
    playing();
    container.querySelector('.pr-feedback')?.focus({ preventScroll: true });
  }
  function recordAttempt(score, total, selectedMode = mode) {
    if (!total) return;
    save(context, { attempts: [...(progress(context).attempts || []).slice(-99), { date: new Date().toISOString(), score, total, mode: selectedMode }] });
  }
  function finish() {
    phase = 'results';
    recordAttempt(answers.filter(answer => answer.correct).length, answers.length);
    results();
  }
  function results() {
    const total = answers.length;
    const correct = answers.filter(answer => answer.correct).length;
    const wrong = answers.filter(answer => !answer.correct);
    const percent = total ? Math.round(correct / total * 100) : 0;
    container.innerHTML = `<section class="pr-page" aria-labelledby="pr-results-title"><div class="pr-result-hero"><p class="pr-eyebrow">SESSION COMPLETE</p><h1 id="pr-results-title">${!total ? 'A fresh start is always here.' : percent === 100 ? 'Every answer, understood.' : percent >= 70 ? 'You’re making connections.' : 'Now you know what to revisit.'}</h1><div class="pr-score"><strong>${correct}<span> / ${total}</span></strong><span>${percent}% correct${answers.length < run.length ? ' · Session ended early' : ''}</span></div><p>${wrong.length ? `${wrong.length} ${wrong.length === 1 ? 'question needs' : 'questions need'} another look. The explanations below are your next study plan.` : total ? 'Try another format or explore the study notes to deepen your understanding.' : 'No answers were recorded. Choose a format and start whenever you’re ready.'}</p><div class="pr-result-actions">${wrong.length ? '<button class="pr-button pr-button-primary" data-action="retry-session">Retry these mistakes</button>' : ''}<button class="pr-button ${wrong.length ? 'pr-button-quiet' : 'pr-button-primary'}" data-action="new-session">Choose a new session</button><button class="pr-button pr-button-quiet" data-action="go-notes">Read study notes</button></div></div>${wrong.length ? `<h2 class="pr-review-heading">Your review list</h2><div class="pr-review-list">${wrong.map(answer => { const item = allQuestions.find(question => question.id === answer.id); return `<article><span class="pr-eyebrow">${esc(topicTitle(item.topic))}</span><h3>${esc(item.prompt)}</h3><p class="pr-wrong-answer">Your answer: ${esc(answer.given)}</p><p><b>Correct:</b> ${esc(answerFor(item))}</p><p>${esc(item.explanation)}</p>${provenance(item)}</article>`; }).join('')}</div>` : ''}</section>`;
  }
  function startMatching() {
    const selected = shuffle(vocabAvailable()).slice(0, 5);
    matching = { selected, left: shuffle(selected), right: shuffle(selected), term: null, definition: null, solved: [], attempted: [], error: null, finished: false };
    matchingPaint();
  }
  function matchingPaint() {
    const match = matching;
    const complete = match.solved.length === match.selected.length;
    container.innerHTML = `<section class="pr-page" aria-labelledby="pr-match-title"><div class="pr-session-meta"><button class="pr-text-button" data-action="matching-exit">← Choose a format</button><span>Vocabulary matching</span><strong>${match.solved.length} / ${match.selected.length} pairs</strong></div><p class="pr-eyebrow">CONNECT THE MEANING</p><h1 id="pr-match-title">One term. One definition.</h1><p class="pr-muted">Select a term on the left, then its English definition on the right.</p><div class="pr-matching-grid"><div><h2>Legal terms</h2>${match.left.map(item => `<button class="pr-match-item ${match.term === item.id ? 'is-selected' : ''} ${match.solved.includes(item.id) ? 'is-solved' : ''}" data-match-term="${esc(item.id)}" ${match.solved.includes(item.id) ? 'disabled' : ''}>${esc(item.term)}${match.solved.includes(item.id) ? ' ✓' : ''}</button>`).join('')}</div><div><h2>English definitions</h2>${match.right.map(item => `<button class="pr-match-item ${match.definition === item.id ? 'is-selected' : ''} ${match.solved.includes(item.id) ? 'is-solved' : ''}" data-match-definition="${esc(item.id)}" ${match.solved.includes(item.id) ? 'disabled' : ''}>${esc(item.definition)}${match.solved.includes(item.id) ? ' ✓' : ''}</button>`).join('')}</div></div>
      ${match.error ? `<div class="pr-feedback is-negative" role="status"><strong>Not quite. Here is the connection.</strong><p><b>${esc(match.error.term)}</b> means ${esc(match.error.definition)}</p><p lang="cs">${esc(match.error.translation)}</p><p class="pr-example">${esc(match.error.example)}</p>${provenance(match.error)}<button class="pr-button pr-button-quiet" data-action="dismiss-match-error">Try another pair</button></div>` : match.lastCorrect ? `<div class="pr-feedback is-positive" role="status"><strong>✓ ${esc(match.lastCorrect.term)}</strong><p lang="cs">${esc(match.lastCorrect.translation)}</p><p>${esc(match.lastCorrect.example)}</p></div>` : ''}
      ${complete ? `<div class="pr-result-hero pr-match-result"><h2>All pairs connected.</h2><p>${match.selected.length - match.attempted.length} of ${match.selected.length} pairs matched correctly on the first try.</p><div class="pr-result-actions"><button class="pr-button pr-button-primary" data-action="matching-again">Another five pairs</button><button class="pr-button pr-button-quiet" data-action="new-session">Choose another format</button></div></div>` : ''}
    </section>`;
  }
  function selectMatch(kind, id) {
    if (!matching || matching.solved.includes(id) || matching.error) return;
    matching[kind] = id;
    matching.lastCorrect = null;
    if (matching.term && matching.definition) {
      const item = matching.selected.find(entry => entry.id === matching.term);
      if (matching.term === matching.definition) {
        matching.solved.push(item.id);
        matching.lastCorrect = item;
        updateMistake(context, item.id, false);
      } else {
        matching.attempted = unique([...matching.attempted, item.id]);
        matching.error = item;
        updateMistake(context, item.id, true);
      }
      matching.term = null; matching.definition = null;
      if (matching.solved.length === matching.selected.length && !matching.finished) {
        matching.finished = true;
        recordAttempt(matching.selected.length - matching.attempted.length, matching.selected.length, 'matching');
      }
    }
    matchingPaint();
    if (matching.error) container.querySelector('[data-action="dismiss-match-error"]')?.focus({ preventScroll: true });
    else if (matching.solved.length === matching.selected.length) container.querySelector('[data-action="matching-again"]')?.focus({ preventScroll: true });
    else if (matching.term) container.querySelector('[data-match-definition]:not(:disabled)')?.focus({ preventScroll: true });
    else if (matching.definition) container.querySelector('[data-match-term]:not(:disabled)')?.focus({ preventScroll: true });
    else container.querySelector('[data-match-term]:not(:disabled)')?.focus({ preventScroll: true });
  }
  function onClick(event) {
    const modeButton = event.target.closest('[data-mode]');
    if (modeButton && phase === 'setup') { mode = modeButton.dataset.mode; if (mode === 'matching' && filter !== 'vocabulary' && filter !== 'all' && !vocabAvailable().length) filter = 'vocabulary'; setup(); return; }
    const choice = event.target.closest('[data-choice]');
    if (choice && !choice.disabled) { check(Number(choice.dataset.choice)); return; }
    const binary = event.target.closest('[data-boolean]');
    if (binary && !binary.disabled) { check(binary.dataset.boolean === 'true'); return; }
    const mover = event.target.closest('[data-move]');
    if (mover && !mover.disabled && !checked) {
      const from = Number(mover.dataset.move); const to = from + Number(mover.dataset.direction);
      if (to < 0 || to >= ordered.length) return;
      [ordered[from], ordered[to]] = [ordered[to], ordered[from]];
      playing(); container.querySelector(`[data-move="${to}"][data-direction="${mover.dataset.direction}"]`)?.focus({ preventScroll: true }); return;
    }
    const term = event.target.closest('[data-match-term]');
    if (term && !term.disabled) { selectMatch('term', term.dataset.matchTerm); return; }
    const definition = event.target.closest('[data-match-definition]');
    if (definition && !definition.disabled) { selectMatch('definition', definition.dataset.matchDefinition); return; }
    const actionButton = event.target.closest('[data-action]');
    if (!actionButton || actionButton.disabled) return;
    const action = actionButton.dataset.action;
    if (action === 'start') start();
    if (action === 'check-order') check(null);
    if (action === 'next-question' && checked) {
      if (index + 1 >= run.length) finish();
      else { index++; prepareQuestion(); playing(); }
      container.querySelector('h1')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
    if (action === 'finish-early') finish();
    if (action === 'new-session' || action === 'matching-exit') { phase = 'setup'; setup(); }
    if (action === 'retry-session') { const ids = answers.filter(answer => !answer.correct).map(answer => answer.id); mode = 'mixed'; start(ids); }
    if (action === 'go-notes') context.onNavigate?.('learn');
    if (action === 'matching-again') startMatching();
    if (action === 'dismiss-match-error' && matching) { matching.error = null; matchingPaint(); }
  }
  function onChange(event) {
    if (phase !== 'setup') return;
    if (event.target.name === 'quiz-topic') filter = event.target.value;
    else if (event.target.name === 'quiz-length') length = event.target.value;
    else if (event.target.name === 'quiz-review') reviewOnly = event.target.checked;
    else return;
    setup();
  }
  function onSubmit(event) {
    if (!event.target.matches('.pr-answer-form')) return;
    event.preventDefault();
    check(event.target.elements['text-answer'].value);
  }
  container.addEventListener('click', onClick);
  container.addEventListener('change', onChange);
  container.addEventListener('submit', onSubmit);
  setup();
  return () => { container.removeEventListener('click', onClick); container.removeEventListener('change', onChange); container.removeEventListener('submit', onSubmit); };
}
