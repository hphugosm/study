/* Pure question and scoring rules for the unlabelled skeletal atlas. */
(function (root) {
  'use strict';

  // Atlas IDs are the question IDs. Explicit aliases are needed only for
  // reusing old picture cards: "hrudni" in the cards means sternum, whereas
  // "hrudni" in the atlas means thoracic vertebrae.
  const cardAliases = {
    'hrudni-kost':'hrudni', panevni:'panev', stehenni:'stehno',
    holenni:'holeni', hlezni:'hlezenni', 'lodkovita-nohy':'lodkovita',
    klinove:'klinovite-noha', nartni:'nart'
  };
  const groupedTargets = {
    pater:['atlas','axis','krcni','hrudni','bederni','krizova','kostrc'],
    krcni:['atlas','axis'],
    lopatka:['nadpazek','hakovity','hreben-lopatky'],
    zapesti:['clunkova','polomesicita','trojhranna','hraskova','mnohohranna-vetsi','mnohohranna-mensi','hlavata','hakovita'],
    panevni:['kycelni','sedaci','stydka'],
    zanarti:['hlezni','patni','lodkovita-nohy','krychlova','klinove','klinova-vnitrni','klinova-prostredni','klinova-zevni'],
    klinove:['klinova-vnitrni','klinova-prostredni','klinova-zevni']
  };
  // Tiny source-photo dots and single dots on whole groups were ambiguous
  // at the card's display size. These prompts use a full orange highlight.
  const clearerAtlasPrompts = new Set([
    'nosni','vretenni','loketni','zapesti','zaprsti','prsty-ruky','panevni',
    'holenni','lytkova','patni','hlezni','krychlova','lodkovita-nohy',
    'klinove','nartni','prsty-nohy'
  ]);
  const groupIds = new Set(['krcni','hrudni','bederni','zebra','zapesti','zaprsti','prsty-ruky','zanarti','klinove','nartni','prsty-nohy']);
  const partIds = new Set(['lebka','pater']);
  const landmarkIds = new Set(['nadpazek','hreben-lopatky','hakovity']);
  const supplementalViews = {tylni:'skull-back', cichova:'skull-floor', klinova:'skull-floor', patrova:'skull-base', radlicna:'skull-base', 'hreben-lopatky':'scapula-back'};
  const handIds = new Set(['zapesti','zaprsti','prsty-ruky',...groupedTargets.zapesti]);
  const footIds = new Set(['zanarti','nartni','prsty-nohy',...groupedTargets.zanarti]);

  function createQuestions(data, region = 'all') {
    if (!data || !Array.isArray(data.bones)) return [];
    const cards = Array.isArray(data.cards) ? data.cards : [];
    const skullIds = data.bones.filter(bone => bone.region === 'hlava' && bone.id !== 'jazylka').map(bone => bone.id);
    return data.bones
      .filter(bone => region === 'all' || bone.region === region)
      .map(bone => {
        // Never use the sternum picture for the thoracic vertebrae question.
        const cardId = cardAliases[bone.id] || bone.id;
        const card = bone.id === 'hrudni' ? null : cards.find(item => item.id === cardId);
        const sourceCard = card && !clearerAtlasPrompts.has(bone.id) ? card : null;
        const promptKind = sourceCard ? sourceCard.target ? 'point' : 'whole' : 'highlight';
        const scope = groupIds.has(bone.id) ? 'group' : partIds.has(bone.id) ? 'part' : landmarkIds.has(bone.id) ? 'landmark' : 'bone';
        const noun = scope === 'group' ? 'skupinu kostí' : scope === 'part' ? 'část kostry' : scope === 'landmark' ? 'útvar kosti' : 'kost';
        const adjective = scope === 'landmark' ? 'zvýrazněný' : 'zvýrazněnou';
        const subject = promptKind === 'highlight' ? `oranžově ${adjective} ${noun}` : `${noun} u oranžového bodu`;
        const targetIds = [...new Set([bone.id,...(bone.id === 'lebka' ? skullIds : groupedTargets[bone.id] || [])])];
        const view = supplementalViews[bone.id] || 'body';
        const focus = ['hreben-lopatky','klinova'].includes(bone.id) ? view : ['nosni','slzni','dolni-skoropa'].includes(bone.id) ? 'nos' : ['atlas','axis','krcni','jazylka'].includes(bone.id) ? 'krk' : handIds.has(bone.id) ? 'ruka' : footIds.has(bone.id) ? 'noha' : bone.region;
        return {
          id:bone.id,
          name:bone.name,
          latin:bone.latin,
          image:sourceCard ? sourceCard.image : `assets/map-prompts/${bone.id}.webp`,
          imageVersion:'prompt-clarity',
          hint:promptKind === 'whole' ? 'Poznej celou kost na obrázku.' : `Poznej ${subject}.`,
          locationHint:promptKind === 'whole' ? 'Najdi na mapě celou kost z obrázku.' : `Najdi na mapě ${subject}.`,
          promptKind,
          scope,
          detail:[bone.summary,...(bone.facts || []).slice(0,1)].filter(Boolean).join(' '),
          region:bone.region,
          slide:bone.slide,
          sourceSlide:sourceCard ? sourceCard.slide : bone.slide,
          targetIds,
          revealIds:bone.id === 'krcni' ? ['atlas','axis','krcni'] : bone.id === 'lopatka' ? ['lopatka','nadpazek','hakovity','hreben-lopatky'] : [bone.id],
          focus,
          view
        };
      });
  }

  function scoreAnswer(question, clickedId) {
    return Boolean(question && Array.isArray(question.targetIds) &&
      typeof clickedId === 'string' && question.targetIds.includes(clickedId));
  }

  function shuffleQuestions(questions, random = Math.random) {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const value = random();
      if (!Number.isFinite(value) || value < 0 || value >= 1) {
        throw new RangeError('Random source must return a value from 0 inclusive to 1 exclusive.');
      }
      const j = Math.floor(value * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  root.KostraMapQuiz = Object.freeze({createQuestions, scoreAnswer, shuffleQuestions});
})(typeof window !== 'undefined' ? window : globalThis);
