/* Recognition cards share the atlas coverage, without changing source cards. */
(function (root) {
  'use strict';

  const legacyAliases = {
    hrudni:'hrudni-kost', panev:'panevni', stehno:'stehenni',
    holeni:'holenni', hlezenni:'hlezni', lodkovita:'lodkovita-nohy',
    'klinovite-noha':'klinove', nart:'nartni'
  };
  const legacyExactIds = new Set([
    'atlas','axis','krizova','zebra','klicni','lopatka','pazni','vretenni',
    'loketni','zapesti','zaprsti','prsty-ruky','lytkova','patni','krychlova',
    'prsty-nohy','celni','temenni','tylni','spankova','klinova','licni',
    'horni-celist','dolni-celist','nosni'
  ]);

  function createCards(data, quizRules = root.KostraMapQuiz) {
    if (!data || !Array.isArray(data.bones) || !quizRules || typeof quizRules.createQuestions !== 'function') return [];
    return quizRules.createQuestions(data).map(question => {
      const source = question.image.startsWith('assets/bones/') ? 'presentation' : 'atlas';
      return {
        id:question.id,
        name:question.name,
        latin:question.latin,
        region:question.region,
        image:question.image,
        imageVersion:question.imageVersion,
        slide:question.slide,
        sourceSlide:question.sourceSlide,
        detail:question.detail,
        hint:question.hint,
        promptKind:question.promptKind,
        scope:question.scope,
        source,
        sourceLabel:source === 'presentation' ? `Obrázek z prezentace · snímek ${question.sourceSlide}` : `Detail atlasu · navazuje na snímek ${question.slide}`
      };
    });
  }

  // Run only on v1 progress. In particular v1 "hrudni" is the sternum;
  // the canonical v2 "hrudni" is a different question (thoracic vertebrae).
  // The old generic vertebra card has no exact atlas counterpart, so it
  // must not silently mark an entire spinal group as already mastered.
  function migrateKnown(ids) {
    if (!Array.isArray(ids)) return [];
    const migrated = new Set();
    for (const id of ids) {
      if (typeof id !== 'string') continue;
      if (Object.hasOwn(legacyAliases,id)) migrated.add(legacyAliases[id]);
      else if (legacyExactIds.has(id)) migrated.add(id);
    }
    return [...migrated];
  }

  root.KostraStudyCards = Object.freeze({createCards,migrateKnown});
})(typeof window !== 'undefined' ? window : globalThis);
