// Original practice questions based on the eight reviewed materials and the
// verification sources listed in the expanded English study guide.
const bank = [];
const defaults = {
  plessy: ['S7; E1', 'supplied'], gobitis: ['S3-S4; E17', 'added'],
  barnette: ['E17', 'added'], brown: ['S6-S8; E4', 'supplied'],
  courts: ['S2; E5', 'supplied'], appeals: ['S2; S5', 'supplied'],
  vocabulary: ['S1; S2; S5; S8', 'supplied'],
};
function add(topic, type, content, source, provenance) {
  const d = defaults[topic];
  bank.push({ id: `q${String(bank.length + 1).padStart(3, '0')}`, topic, type,
    ...content, source: source || d[0], provenance: provenance || d[1] });
}
function m(topic, prompt, options, correct, explanation, source, provenance) {
  add(topic, 'mcq', { prompt, options, correct, explanation }, source, provenance);
}
function b(topic, prompt, correct, explanation, source, provenance) {
  add(topic, 'boolean', { prompt, correct, explanation }, source, provenance);
}
function t(topic, prompt, answers, explanation, source, provenance) {
  add(topic, 'text', { prompt, answers, explanation }, source, provenance);
}
function o(topic, prompt, steps, explanation, source, provenance) {
  add(topic, 'order', { prompt, steps, explanation }, source, provenance);
}

// Multiple choice: 50 questions, with plausible but unambiguous distractors.
m('plessy', 'What kind of segregation was directly challenged in Plessy v. Ferguson?',
  ['Separate public-school districts', 'Separate railway cars', 'Separate polling places', 'Separate military units'], 1,
  'Plessy challenged Louisiana’s requirement for racially separate railway accommodations. Public education was the setting of Brown, not Plessy.');
m('plessy', 'Which statement best describes the rule accepted by the Plessy majority?',
  ['All racial classifications were automatically unconstitutional', 'Schools could compel a flag salute', 'Racial separation could be constitutional if facilities were equal', 'Only private companies could make law'], 2,
  'The majority accepted the doctrine called “separate but equal.” It treated legally enforced separation as compatible with equality when accommodations were supposedly equal.');
m('plessy', 'Which constitutional protection was central to Plessy’s equality argument?',
  ['Equal protection under the Fourteenth Amendment', 'The presidential veto', 'The right to patent an invention', 'The appointment of federal judges'], 0,
  'Plessy argued that enforced racial separation denied equal protection. The majority rejected that claim; Brown later rejected the doctrine in public education.');
m('plessy', 'Why is the statement “Plessy was decided 8:1” inaccurate?',
  ['The decision was unanimous', 'There were only three Supreme Court seats', 'The Court did not issue an opinion', 'The vote was 7:1 because Justice Brewer did not participate'], 3,
  'Nine seats do not mean nine participating justices. Brewer did not participate, leaving a 7:1 vote with Harlan dissenting.', 'E1', 'corrected');
m('plessy', 'Who wrote the dissent in Plessy?',
  ['Earl Warren', 'John Marshall Harlan', 'Robert H. Jackson', 'Felix Frankfurter'], 1,
  'Justice John Marshall Harlan opposed the racial division of citizens. Henry Brown wrote the majority opinion; Earl Warren wrote Brown decades later.');
m('plessy', 'How did the Plessy majority distinguish types of equality?',
  ['It treated every social difference as a federal crime', 'It said the Fourteenth Amendment governed only contracts', 'It separated legal and political equality from social equality', 'It abolished all distinctions between state and federal law'], 2,
  'The majority’s distinction allowed it to regard separate railway cars as compatible with equal civil and political rights. That reasoning supported segregation rather than ending it.');
m('plessy', 'Which timeline correctly distinguishes the Louisiana law, Plessy’s arrest and the judgment?',
  ['1890 law → 1892 arrest → 1896 judgment', '1896 law → 1890 arrest → 1892 judgment', '1892 law → 1896 arrest → 1954 judgment', '1940 law → 1943 arrest → 1954 judgment'], 0,
  'The Separate Car Act was enacted in 1890. Plessy tested it in 1892, and the Supreme Court decided his case in 1896.', 'S7; E1', 'corrected');
m('plessy', 'What was an important consequence of Plessy?',
  ['It immediately desegregated schools nationwide', 'It abolished all state courts', 'It required a religious exemption from every law', 'It gave legal support to further segregation laws'], 3,
  'By accepting separate but equal, the decision helped sustain legally enforced segregation. It was not a ruling ordering integration.');

m('gobitis', 'Why did the Gobitas children refuse the school flag ceremony?',
  ['They believed participation violated their religious convictions', 'They wanted to transfer to a different railway car', 'They were protesting a patent refusal', 'They wanted a jury to write school rules'], 0,
  'As Jehovah’s Witnesses, the children viewed the salute as idolatry. Their refusal raised a conflict between religious conscience and a school requirement.', 'E15', 'added');
m('gobitis', 'Which interest did the Gobitis majority emphasize?',
  ['Equal railway fares', 'The power of juries to pass laws', 'National unity and discretion for elected authorities', 'Automatic Supreme Court review of all disputes'], 2,
  'Frankfurter’s majority deferred to educational and elected authorities in pursuing national unity. It did not require the school to grant the claimed religious exemption.');
m('gobitis', 'What did the Supreme Court decide in Gobitis?',
  ['It unanimously prohibited the salute', 'It upheld the school requirement by 8:1', 'It refused to decide because no lower court existed', 'It ordered all separate schools closed'], 1,
  'The Court ruled for the school district, 8:1. Barnette reached the opposite constitutional result three years later.', 'S3; E15', 'added');
m('gobitis', 'Which justice wrote the Gobitis majority opinion?',
  ['Robert H. Jackson', 'Henry Brown', 'Earl Warren', 'Felix Frankfurter'], 3,
  'Felix Frankfurter wrote the opinion. The worksheet expressly supplies both his authorship and the 8:1 vote.', 'S3, Gobitas section', 'supplied');
m('gobitis', 'What had the lower federal courts done before the Supreme Court decided Gobitis?',
  ['They had protected the family', 'They had abolished the Supreme Court', 'They had decided Plessy instead', 'They had required a new constitutional amendment'], 0,
  'The district court protected the family and the court of appeals affirmed. The Supreme Court reversed that result, showing that an appeal can change the outcome.');
m('gobitis', 'What explains the two spellings Gobitis and Gobitas?',
  ['They name two unrelated Supreme Court cases', 'One means trial and the other means appeal', 'Gobitis is the case name; Gobatas was the family name', 'Gobitis is the case name; Gobitas was the family name'], 3,
  'The family’s surname was Gobitas. A spelling error became part of the official case name Gobitis, so the two spellings here refer to the same dispute.', 'E15', 'added');
m('gobitis', 'What was Justice Stone’s main concern in dissent?',
  ['That public schools could never teach patriotism', 'That children were forced to express beliefs against their conscience', 'That every case required nine lower-court judges', 'That schools were required to accept separate but equal'], 1,
  'Stone objected to compelled affirmations contrary to religious conscience. Teaching patriotism and forcing a declaration of belief were not the same thing.');

m('barnette', 'What is the central constitutional principle in Barnette?',
  ['Every school policy is immune from review', 'A sincere belief excuses every generally applicable law', 'Government cannot force an officially prescribed patriotic expression', 'The Constitution governs only railway companies'], 2,
  'The majority treated the compulsory salute and pledge as compelled speech. Its protection extended beyond a special exemption for one religious group.', 'E16; E17', 'added');
m('barnette', 'How did Barnette treat Gobitis?',
  ['It overruled Gobitis as a precedent', 'It affirmed Gobitis’s rule without qualification', 'It changed the date of Gobitis', 'It turned Gobitis into a statute'], 0,
  'Barnette rejected the earlier constitutional rule. “Overrule” concerns a precedent, whereas “reverse” concerns the judgment being reviewed in the current case.');
m('barnette', 'Who wrote the majority opinion in Barnette?',
  ['Earl Warren', 'John Marshall Harlan', 'Henry Brown', 'Robert H. Jackson'], 3,
  'Justice Robert H. Jackson wrote the majority opinion. Frankfurter, who had written Gobitis, dissented in Barnette.');
m('barnette', 'What was the Barnette vote?',
  ['7:1', '6:3', '8:1', '9:0'], 1,
  'The decision was 6:3 for the families. Keep the four votes distinct: Plessy 7:1, Gobitis 8:1, Barnette 6:3 and Brown 9:0.');
m('barnette', 'Who can benefit from Barnette’s protection against compelled patriotic expression?',
  ['Only the specific plaintiffs named in Gobitis', 'Only adults who vote', 'People with nonreligious objections as well as religious objectors', 'Only members of Congress'], 2,
  'The majority’s compelled-speech reasoning was broader than a religious exemption. The right not to affirm an official belief did not depend on membership in a particular religion.', 'E16; E17', 'added');
m('barnette', 'What did the Supreme Court do to the lower-court injunction in Barnette?',
  ['It affirmed it', 'It converted it into a jury verdict', 'It replaced it with a patent', 'It denied that any lower court had acted'], 0,
  'The Court affirmed the injunction protecting the pupils while overruling Gobitis as precedent. Those two actions concern different objects: a current judgment and an earlier legal rule.');
m('barnette', 'Why did the majority consider a flag salute to involve speech?',
  ['Only spoken words can ever communicate ideas', 'All movement is automatically a criminal act', 'The salute was a monetary contract', 'A salute communicates ideas and can express agreement with a belief'], 3,
  'Expression can include symbolic conduct. The patriotic ceremony communicated a prescribed message, so compulsory participation raised a freedom-of-expression issue.', 'E16', 'added');

m('brown', 'Which setting was directly addressed by Brown v. Board of Education?',
  ['Public education', 'Only railway dining cars', 'Federal tax collection', 'The appointment of ambassadors'], 0,
  'Brown addressed state-sanctioned racial segregation in public schools. State its holding in that setting rather than claiming the case instantly resolved every form of discrimination.');
m('brown', 'What problem did Linda Brown face in Topeka?',
  ['She could not appeal a patent decision', 'She was denied admission to a nearby school reserved for white children', 'She was expelled for a flag salute objection', 'She was denied a seat on the Supreme Court'], 1,
  'Linda Brown’s school access illustrates the practical effects of racial segregation. The nearby school was restricted to white children, while Black families had to use segregated schools.');
m('brown', 'Would equal buildings and equipment alone have satisfied Brown?',
  ['Yes, because only the age of the buildings mattered', 'Yes, if every child used the same textbook cover', 'No, because enforced racial separation itself denied equal educational opportunity', 'No, because the Court lacked any constitutional question'], 2,
  'Brown did not merely require better resources for separate schools. It held that segregated public education was inherently unequal, even if material conditions were equal.');
m('brown', 'Which phrase captures Brown’s conclusion about separate educational facilities?',
  ['Automatically voluntary', 'Outside the Constitution', 'Equal after a vote of Congress', 'Inherently unequal'], 3,
  '“Inherently unequal” means the inequality lies in the segregation itself, not just in unequal physical resources.');
m('brown', 'Which amendment supplied Brown’s equal-protection basis?',
  ['The Fourteenth Amendment', 'The Third Amendment only', 'The Tenth Amendment’s presidential veto', 'An amendment enacted in 1954'], 0,
  'The Equal Protection Clause of the Fourteenth Amendment restricts state action. Brown applied that protection to state-sanctioned public-school segregation.');
m('brown', 'Which pairing correctly identifies Brown’s author and vote?',
  ['Henry Brown; 7:1', 'Chief Justice Earl Warren; 9:0', 'Felix Frankfurter; 8:1', 'Robert H. Jackson; 6:3'], 1,
  'Chief Justice Earl Warren delivered the unanimous opinion. Do not confuse the plaintiff’s surname Brown with Justice Henry Brown, who wrote Plessy.', 'E4', 'added');
m('brown', 'What did Brown II (1955) concern?',
  ['The spelling of Gobitas', 'The constitutionality of the Separate Car Act in 1890', 'How desegregation would be implemented', 'Whether Congress had one chamber'], 2,
  'Brown’s 1954 judgment established the constitutional rule. Brown II addressed implementation; the first judgment did not instantly end segregation in every school.', 'E4', 'added');
m('brown', 'Which statement correctly describes the relationship between Brown and Plessy?',
  ['Brown was a new name for Plessy’s own appeal', 'Brown held that only railway segregation was unconstitutional', 'Brown affirmed all of Plessy’s reasoning', 'Brown rejected Plessy’s doctrine in public education in a different dispute'], 3,
  'Changing a precedent in a later dispute is different from reversing the judgment in the original litigant’s appeal. Brown rejected separate but equal in public education.', 'S6-S7; E4', 'corrected');

m('courts', 'What are the two main judicial systems in the United States?',
  ['Federal and state systems', 'Trial and vocabulary systems', 'Presidential and congressional systems', 'Public and patent systems'], 0,
  'Federal courts and the courts of each state are separate systems. Trial, appellate and highest courts are levels within systems, not the two systems themselves.', 'S2; E5', 'corrected');
m('courts', 'Where does a typical federal civil case begin?',
  ['The state supreme court', 'A U.S. District Court', 'The U.S. Supreme Court in every case', 'The Senate'], 1,
  'U.S. District Courts are the ordinary federal trial level. The court must also have jurisdiction over the particular case.');
m('courts', 'What is the usual role of a trial court?',
  ['To rewrite all earlier Supreme Court decisions', 'To decide which bills Congress should debate', 'To hear evidence and initially determine facts', 'To give an automatic second trial after every appeal'], 2,
  'Trial courts build the factual record using evidence and witnesses. Appellate courts generally review decisions on that existing record.');
m('courts', 'How many U.S. Courts of Appeals are described in the materials?',
  ['Three, all in Washington', 'Nine, one for each justice', 'Fifty, one per state', 'Thirteen: twelve regional courts and the Federal Circuit'], 3,
  'The materials distinguish twelve geographic circuits from the specialized Federal Circuit, making thirteen federal courts of appeals.');
m('courts', 'What does federal question jurisdiction concern?',
  ['Claims arising under the U.S. Constitution or federal law', 'Any disagreement involving more than one person', 'Only claims exceeding one million dollars', 'Every question a federal judge is personally interested in'], 0,
  'Jurisdiction is legal authority, not personal interest. Federal-question jurisdiction concerns the federal legal basis of a claim.');
m('courts', 'Which situation fits the basic diversity-jurisdiction model taught here?',
  ['Any criminal case involving a wealthy defendant', 'A qualifying civil dispute with different state citizenship and an amount over $75,000', 'A state case automatically transferred after an unfavorable result', 'Every dispute below $75,000'], 1,
  'Diversity can allow federal adjudication of a state-law civil dispute. Ordinary diversity also requires complete diversity, and the threshold excludes interest and costs.', 'S2; E9; E9b', 'added');
m('courts', 'When may the U.S. Supreme Court review a qualifying final state-court judgment?',
  ['Whenever a federal district judge dislikes it', 'Only if the state has no constitution', 'When the case presents a qualifying federal-law issue', 'Never, because no federal interpretation binds states'], 2,
  'A state judgment involving federal law may reach the U.S. Supreme Court. State courts are not ordinarily subordinate to district courts, but they are bound by Supreme Court interpretations of federal law.', 'E5; E10', 'corrected');
m('courts', 'Where do local or municipal courts generally fit?',
  ['Above the U.S. Supreme Court', 'Inside Congress', 'In an entirely separate nationwide federal branch', 'Within the state judicial system'], 3,
  'Local courts usually belong within a state’s system. Calling “local” a third nationwide parallel judicial hierarchy is misleading.', 'S2; E5', 'corrected');

m('appeals', 'Who is the appellant?',
  ['The party requesting appellate review', 'Always the original defendant', 'The judge who decided the trial', 'The party that never lost any issue'], 0,
  'Appellant is a procedural role: the party seeking review. Either original party can become the appellant, depending on who challenges the decision.');
m('appeals', 'What typically happens at a federal Court of Appeals hearing?',
  ['A new jury hears all witnesses again', 'Three judges review the decision using the existing record and legal arguments', 'The President replaces the trial judge', 'The parties vote on the correct legal answer'], 1,
  'An ordinary appeal is not a second trial. A typical three-judge panel reviews claimed errors without a jury or a new presentation of evidence.');
m('appeals', 'What does affirm mean?',
  ['Send a case back with no other action', 'Erase every earlier precedent', 'Leave the challenged decision in place', 'Guarantee Supreme Court review'], 2,
  'Affirm means the challenged decision stands. It is different from reversing the decision or remanding for further proceedings.');
m('appeals', 'What does a remand require?',
  ['Every witness must automatically repeat all testimony', 'The appellant must always win immediately', 'The original case ceases to exist', 'Further proceedings in the lower court according to the appellate instructions'], 3,
  'A remand sends the matter back for further proceedings. It does not automatically mean the whole case starts from the beginning.', 'S2; S5; E7', 'corrected');
m('appeals', 'What is a petition for a writ of certiorari?',
  ['A request that the Supreme Court take a case for review', 'An automatic right to a new jury', 'A demand that Congress reverse a judgment', 'The final judgment of every district court'], 0,
  'The petition asks for review; it does not guarantee it. The Court generally exercises discretion in selecting cases.');
m('appeals', 'What does cert. denied mean?',
  ['The Supreme Court has approved every sentence of the lower opinion', 'The Court declined review; the lower judgment remains in place', 'The lower court must always conduct a complete new trial', 'The defendant automatically becomes a plaintiff'], 1,
  'A denial leaves the lower judgment in place but is not itself a ruling endorsing the lower court’s reasoning on the merits.', 'E11', 'added');
m('appeals', 'Which statement correctly distinguishes reverse from overrule?',
  ['Both words always mean return to trial court', 'Reverse means reject a precedent; overrule means accept it', 'Reverse concerns the judgment under review; overrule concerns an earlier legal rule', 'Neither can occur in a Supreme Court case'], 2,
  'Barnette is a useful example: it affirmed the injunction before it while overruling Gobitis as precedent.', 'E17; E14', 'added');

m('vocabulary', 'Which word means bringing a civil legal claim against someone?',
  ['Remand', 'Dissent', 'Veto', 'Sue'], 3,
  'To sue is to bring a civil claim. To appeal is a later request for review of a decision; the two acts are not interchangeable.');
m('vocabulary', 'What is a precedent?',
  ['An earlier decision used in later cases involving similar legal questions', 'A proposed law before a legislature', 'A defendant’s automatic victory', 'The same thing as a presidential veto'], 0,
  'Precedent connects a prior judicial decision to later legal questions. It is one way case law shapes future disputes.');
m('vocabulary', 'Which source of law consists of laws passed by legislatures?',
  ['Administrative law only', 'Statutory law', 'A dissenting opinion only', 'A jury instruction only'], 1,
  'A statute is enacted by a legislature. Case law develops through judicial decisions, while administrative law concerns public agencies.');
m('vocabulary', 'What is the Bill of Rights?',
  ['The first ten Supreme Court judgments', 'A proposed budget for the courts', 'The first ten amendments to the U.S. Constitution', 'The first ten rules of a school district'], 2,
  'The Bill of Rights consists of the Constitution’s first ten amendments. An amendment is a formal constitutional change or addition.');
m('vocabulary', 'What does a dissenting opinion explain?',
  ['Why a bill received a presidential signature', 'Why every justice agreed with the majority', 'Why an appeal has no legal question', 'Why a judge disagrees with the court’s majority'], 3,
  'A dissent records disagreement with the majority’s result or reasoning. Harlan’s dissent in Plessy is a central example in these materials.');

// True/false: apply distinctions rather than merely memorize names.
b('plessy', 'Plessy challenged a Louisiana law requiring separate railway accommodations.', true,
  'The dispute involved railway cars. The public-school setting belongs to Brown.');
b('plessy', 'Justice Henry Brown and Chief Justice Earl Warren wrote the same majority opinion in 1896.', false,
  'Henry Brown wrote Plessy in 1896. Earl Warren delivered Brown in 1954; these are different justices and different judgments.', 'S7; E4', 'added');
b('plessy', 'Because the Supreme Court had nine seats, exactly nine justices must have voted in Plessy.', false,
  'A justice can be absent or not participate. Brewer did not participate in Plessy, so the vote was 7:1.', 'E1', 'corrected');
b('gobitis', 'The Gobitis majority required the school to grant the children the requested religious exemption.', false,
  'The majority upheld the school requirement, despite the children’s religious objection. That rule was later overruled in Barnette.');
b('gobitis', 'Gobitis and Gobitas refer here to the case name and the family name, not two unrelated disputes.', true,
  'Gobitis is the official case spelling; Gobitas was the actual surname. The difference resulted from a spelling error.', 'E15', 'added');
b('gobitis', 'Frankfurter’s Gobitis majority favored considerable deference to elected authorities.', true,
  'The opinion emphasized national unity and democratic decision-making rather than requiring a judicially imposed religious exception.');
b('barnette', 'Barnette protected refusal of an officially prescribed expression even without a religious objection.', true,
  'Its compelled-speech principle was broader than a special exception only for Jehovah’s Witnesses.', 'E16; E17', 'added');
b('barnette', 'Barnette changed the text of the First Amendment by adding a new sentence.', false,
  'The Court changed its constitutional interpretation and overruled a precedent. It did not amend the written Constitution.', 'E14; E17', 'added');
b('barnette', 'Barnette both affirmed the lower judgment and overruled Gobitis.', true,
  'Affirming the current injunction and overruling an earlier legal rule are compatible because they concern different things.');
b('brown', 'Brown held that material equality of segregated school buildings was enough to satisfy equal protection.', false,
  'The Court treated racial separation itself as harmful to equal educational opportunity; matching physical resources was insufficient.');
b('brown', 'Brown rejected separate but equal in public education.', true,
  'State-sanctioned public-school segregation was the field directly addressed by the holding.');
b('brown', 'The 1954 judgment instantly ended racial segregation in every public school in practice.', false,
  'The constitutional ruling and its implementation are distinct. Brown II addressed implementation in 1955, and desegregation met resistance.', 'E4', 'added');
b('courts', 'A state supreme court is ordinarily an intermediate court beneath a federal district court.', false,
  'The systems are separate. A qualifying federal issue may reach the U.S. Supreme Court, but a federal district court is not the next ordinary appellate level.', 'E5; E10', 'corrected');
b('courts', 'Ordinary diversity jurisdiction requires that no plaintiff share state citizenship with any defendant.', true,
  'This is complete diversity. It is more precise than saying that merely some parties come from different states.', 'E9; E9b', 'added');
b('courts', 'A federal-law claim must always begin in federal court.', false,
  'State courts can hear many federal-law claims unless exclusive federal jurisdiction applies. A federal issue does not by itself settle where the action must begin.', 'E10', 'added');
b('appeals', 'An appellee is always the original plaintiff.', false,
  'Appellee identifies the opposing party on appeal. Trial labels and appellate labels depend on different procedural roles.');
b('appeals', 'A reversal and a remand can occur in the same appellate disposition.', true,
  'An appellate court may overturn a decision and send the case back for further proceedings consistent with its instructions.', 'S2; E7', 'added');
b('appeals', 'Every case won in the Supreme Court is automatically a landmark decision.', false,
  '“Landmark” describes exceptional significance, not simply a successful outcome for a party.', 'S5; E7', 'corrected');
b('vocabulary', 'Congress consists of the House of Representatives and the Senate.', true,
  'The House is part of Congress, not a separate stage that a bill reaches only after passing an imagined one-chamber Congress.', 'S1; E6', 'corrected');
b('vocabulary', 'The Fourteenth Amendment’s equal protection applies only to United States citizens.', false,
  'The clause protects persons within a state’s jurisdiction. The wording is broader than citizenship.', 'E6b', 'corrected');

// Typed recall. Answers use explicit, objective targets with common aliases.
t('plessy', 'In which year did the Supreme Court decide Plessy v. Ferguson?', ['1896'],
  '1896 is the judgment year. Keep it separate from the 1890 law and the 1892 arrest.');
t('gobitis', 'In which year did the Supreme Court decide Gobitis?', ['1940'],
  'Gobitis was decided in 1940, three years before Barnette overruled its rule.', 'E15', 'added');
t('barnette', 'In which year did the Supreme Court decide Barnette?', ['1943'],
  'Barnette was decided in 1943 and rejected compelled patriotic expression.', 'E16', 'added');
t('brown', 'In which year did the Supreme Court decide the original Brown school-segregation judgment?', ['1954'],
  'Brown was decided in 1954; Brown II addressed implementation in 1955.');
t('plessy', 'Type Plessy’s vote as majority:minority, counting participating justices.', ['7:1', '7-1', '7 to 1', '7–1', '7 / 1', 'seven to one'],
  'The vote was 7:1. Brewer did not participate, so it was not 8:1.', 'E1', 'corrected');
t('gobitis', 'Type the Gobitis vote as majority:minority.', ['8:1', '8-1', '8 to 1', '8–1', '8 / 1', 'eight to one'],
  'The Court ruled 8:1 for the school. The worksheet supplies this voting information.', 'S3', 'supplied');
t('barnette', 'Type the Barnette vote as majority:minority.', ['6:3', '6-3', '6 to 3', '6–3', '6 / 3', 'six to three'],
  'The Court ruled 6:3 for the families; Frankfurter, Roberts and Reed dissented.', 'E17; E3', 'added');
t('brown', 'Type the Brown vote as majority:minority.', ['9:0', '9-0', '9 to 0', '9–0', '9 / 0', 'nine to zero', 'unanimous', 'unanimously'],
  'Brown was unanimous, 9:0. Earl Warren delivered the opinion.', 'E4', 'added');
t('vocabulary', 'Which English verb means “to bring a civil lawsuit against someone”?', ['sue', 'to sue'],
  'Sue names the act of bringing the civil claim. Appeal means seeking review of a decision.');
t('appeals', 'Which term names the party who requests appellate review?', ['appellant', 'the appellant', 'an appellant', 'appealing party', 'the appealing party'],
  'The appellant seeks review; the appellee is the opposing party in that appeal.');
t('appeals', 'Which term names the opposing party to the appellant?', ['appellee', 'the appellee', 'an appellee'],
  'Appellee is the appellate role, not a synonym that always identifies the original plaintiff or defendant.');
t('appeals', 'Which appellate verb means “leave the challenged decision in place”?', ['affirm', 'to affirm', 'affirmed'],
  'An affirmance leaves the decision standing. It differs from reverse and remand.');
t('appeals', 'Which appellate verb means “send the case back for further proceedings”?', ['remand', 'to remand', 'remanded'],
  'A remand returns the matter to a lower court, usually with instructions; it does not automatically restart everything.');
t('vocabulary', 'What is the English term for a court’s legal authority to hear and decide a case?', ['jurisdiction'],
  'Jurisdiction identifies lawful authority over the case, not whether a judge personally wants to hear it.');
t('vocabulary', 'What noun describes an earlier judicial decision used in similar later legal questions?', ['precedent', 'a precedent', 'judicial precedent'],
  'A precedent supplies an earlier legal decision that can guide or bind later courts depending on its authority.');
t('vocabulary', 'Which expression names the Constitution’s first ten amendments?', ['bill of rights', 'the bill of rights', 'u.s. bill of rights', 'us bill of rights'],
  'The Bill of Rights is the collective name for the first ten amendments, not a bill waiting to become ordinary legislation.');
t('barnette', 'What two-word term describes government-required expression in Barnette?', ['compelled speech', 'compulsory speech', 'forced speech', 'compelled expression'],
  'The salute communicated a message, so forcing pupils to participate raised a compelled-speech problem.', 'E16', 'added');
t('brown', 'Complete Brown’s conclusion: separate educational facilities are inherently ___.', ['unequal'],
  'The Court treated separation itself as denying equal educational opportunity, even if tangible resources were equal.');
t('plessy', 'Complete the name of Plessy’s doctrine: separate but ___.', ['equal'],
  'Separate but equal accepted racial separation with supposedly equal facilities. Brown rejected that rule in public education.');
t('courts', 'How many judges usually sit on a typical federal appellate panel? Type a number.', ['3', 'three'],
  'The ordinary panel described in the materials has three judges. This is different from one usual trial judge or nine Supreme Court justices.');

// Ordered procedures: steps are stored in the correct order for the renderer
// to shuffle. They describe the specified route, not a guarantee of review.
o('appeals', 'Order this ordinary federal civil-case route when every available stage is pursued.',
  ['Trial in a U.S. District Court', 'Review by a U.S. Court of Appeals', 'Petition for a writ of certiorari', 'Supreme Court merits review if the petition is granted'],
  'Trial ordinarily comes first, then a first appeal. A certiorari petition requests a further review; the Supreme Court reaches the merits only if it accepts the case.', 'S2; S5', 'supplied');
o('appeals', 'Order the events in this example: the plaintiff loses at trial and then seeks Supreme Court review.',
  ['The plaintiff loses in district court', 'The plaintiff becomes the appellant by appealing', 'The court of appeals affirms', 'The losing appellant petitions for certiorari'],
  'The appellate role arises when review is sought. An unsuccessful appeal may be followed by a certiorari petition, but review is discretionary.', 'S2; S5', 'supplied');
o('courts', 'Arrange the typical state-court route from the first level to the highest state level.',
  ['State trial court', 'State intermediate appellate court, where available', 'State court of last resort'],
  'A typical state hierarchy has these levels, though structures vary and not every state has the intermediate level. The route is within the state system.', 'S2; E5', 'supplied');
o('vocabulary', 'Order these ordinary federal bill-to-law steps for a bill the President signs.',
  ['A bill is proposed', 'Both chambers of Congress pass the same text', 'The bill is presented to the President', 'The President signs the bill into law'],
  'Congress includes the House and Senate. Identical text must pass both before presidential consideration; this question specifies the signature route, not veto or inaction alternatives.', 'S1; E6', 'corrected');
o('appeals', 'Order the steps in a case that is reversed and remanded after an appeal.',
  ['The trial court enters the challenged judgment', 'A party appeals the judgment', 'The appellate court reverses and remands', 'The lower court conducts further proceedings under the instructions'],
  'Reversal changes the challenged decision, while remand sends the case back. The later proceedings are shaped by the instructions, not an automatic complete restart.', 'S2; S5; E7', 'corrected');

export const questions = bank;
