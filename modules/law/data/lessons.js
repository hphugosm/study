// Original study summaries. The uploaded teaching files themselves are not redistributed.
// Supplied = supported by the eight files; added = outside those files;
// corrected = replaces an error or misleading simplification in those files.

export const topics = [
  { id: 'plessy', title: 'Plessy v. Ferguson', short: 'Plessy · 1896', color: '#b4494d' },
  { id: 'gobitis', title: 'Minersville School District v. Gobitis', short: 'Gobitis · 1940', color: '#8055a1' },
  { id: 'barnette', title: 'West Virginia State Board of Education v. Barnette', short: 'Barnette · 1943', color: '#3e70ab' },
  { id: 'brown', title: 'Brown v. Board of Education', short: 'Brown · 1954', color: '#35816b' },
  { id: 'courts', title: 'Hierarchy of U.S. courts', short: 'Court structure', color: '#277c82' },
  { id: 'appeals', title: 'The process of appeals', short: 'Appeals', color: '#b9782c' },
  { id: 'vocabulary', title: 'Legal vocabulary', short: 'Vocabulary', color: '#7a5b98' }
];

export const cases = [
  {
    id: 'plessy',
    title: 'Plessy v. Ferguson',
    year: 1896,
    vote: '7–1',
    author: 'Justice Henry Brown',
    tagline: 'The Court accepted “separate but equal.”',
    provenance: 'supplied',
    source: 'S7; E1',
    sections: [
      {
        title: 'Facts',
        text: 'Louisiana’s Separate Car Act required Black and white passengers to use separate railway cars. A citizens’ committee arranged a legal challenge. Homer Plessy deliberately sat in a whites-only car, refused to move when asked and was arrested. The dispute concerned a law enforced by the state, rather than simply a private passenger’s preference.',
        provenance: 'supplied', source: 'S7, p. 1'
      },
      {
        title: 'Constitutional question',
        text: 'Did government-enforced racial separation violate the Fourteenth Amendment’s guarantee of equal protection of the laws? Plessy argued that forcing Black passengers to sit separately treated them as inferior and therefore unequal.',
        provenance: 'supplied', source: 'S7, p. 1'
      },
      {
        title: 'Holding and reasoning',
        text: 'The Supreme Court upheld the law. The majority distinguished legal and political equality from social equality. It treated racial separation as compatible with equal civil rights when the separate facilities were supposedly equal. This became the doctrine of separate but equal.',
        provenance: 'supplied', source: 'S7, p. 1'
      },
      {
        title: 'The dissent',
        text: 'Justice John Marshall Harlan disagreed. His dissent challenged the state’s division of citizens into racial classes. A dissent explains a judge’s disagreement; it is not the rule adopted by the majority in that case.',
        provenance: 'supplied', source: 'S7, p. 1; S1, slide 11'
      },
      {
        title: 'Dates and vote: a correction',
        text: 'The segregation law was passed in 1890; Plessy was arrested in 1892; the Supreme Court decided the case in 1896. The vote was 7–1 because Justice Brewer did not participate. Do not infer an 8–1 vote merely from the Court’s nine seats. Plessy also raised a Thirteenth Amendment claim, which the majority rejected.',
        provenance: 'corrected', source: 'Correction to S7, p. 1; E1'
      },
      {
        title: 'Why it matters',
        text: 'The decision supported later segregation laws. Brown rejected the doctrine in public education in 1954. The relationship is a change in constitutional precedent, not an appeal by the Brown families in Plessy’s individual lawsuit.',
        provenance: 'corrected', source: 'S6, p. 1; S7, pp. 1–2; E1; E4'
      }
    ],
    takeaway: 'Plessy: separation could be constitutional if the facilities were supposedly equal. Brown later rejected that approach in public education.'
  },
  {
    id: 'gobitis',
    title: 'Minersville School District v. Gobitis',
    year: 1940,
    vote: '8–1',
    author: 'Justice Felix Frankfurter',
    tagline: 'The Court deferred to school authorities over a compulsory flag salute.',
    provenance: 'added',
    source: 'S3; S4; E2; E12; E14',
    sections: [
      {
        title: 'Facts and the spelling of the name',
        text: 'Lillian and William Gobitas were Jehovah’s Witnesses attending public school in Minersville, Pennsylvania. They viewed the patriotic flag-salute ceremony as a religiously forbidden act and refused to participate. The school expelled them. Gobitas was the family’s actual name; Gobitis is the official case name resulting from a spelling error. These are two spellings connected to the same dispute.',
        provenance: 'added', source: 'E12: William Gobitas’s letter and archival context'
      },
      {
        title: 'Constitutional question',
        text: 'Did religious freedom require a public school to excuse children from a compulsory flag salute? The dispute involved First Amendment religious liberty, protected against state action through the Fourteenth Amendment.',
        provenance: 'added', source: 'E2'
      },
      {
        title: 'Holding and reasoning',
        text: 'The Court ruled 8–1 for the school district. Justice Felix Frankfurter wrote the majority opinion. It accepted national unity as an educational objective and gave elected authorities broad discretion. A sincere religious objection did not automatically excuse compliance with the general requirement.',
        provenance: 'added', source: 'E2; S3 explicitly supplies the vote and author'
      },
      {
        title: 'Dissent and lower courts',
        text: 'Justice Harlan Fiske Stone objected to forcing expressions contrary to conscience. The lower federal courts had protected the family. The Supreme Court reversed that result, allowing the school district’s requirement to stand.',
        provenance: 'added', source: 'E2'
      },
      {
        title: 'Historical context',
        text: 'The supplied presentation describes harassment and violent treatment of Jehovah’s Witnesses, including public humiliation and forced relocation. This context shows the pressure that minority beliefs could face when patriotic conformity was strongly expected.',
        provenance: 'supplied', source: 'S4, slide 13'
      },
      {
        title: 'The later change',
        text: 'Barnette overruled Gobitis three years later. For comparison, remember the shift from deference to elected school authorities toward protection of the individual’s freedom not to affirm an official belief.',
        provenance: 'added', source: 'E14'
      }
    ],
    takeaway: 'Gobitis (1940): the school won. Barnette (1943): the Court rejected compelled patriotic expression and overruled Gobitis.'
  },
  {
    id: 'barnette',
    title: 'West Virginia State Board of Education v. Barnette',
    year: 1943,
    vote: '6–3',
    author: 'Justice Robert H. Jackson',
    tagline: 'Freedom of speech includes protection against compelled expression.',
    provenance: 'added',
    source: 'E3; E13; E14',
    sections: [
      {
        title: 'Why this explanation is marked “Added”',
        text: 'Barnette is in the assigned quiz topic list, but the eight supplied files do not explain the decision. This brief therefore adds researched information rather than presenting a completed explanation from the original worksheets.',
        provenance: 'added', source: 'Source comparison: S1–S8; E3'
      },
      {
        title: 'Facts and the lower-court order',
        text: 'West Virginia required public-school pupils to salute the flag and recite the pledge. Jehovah’s Witness families challenged the requirement. In October 1942, the district court barred officials from compelling the plaintiffs’ children and other religious objectors to salute, or excluding them for refusing. This injunction restrained the officials’ actions.',
        provenance: 'added', source: 'E13: district-court final decree'
      },
      {
        title: 'Constitutional question',
        text: 'May government force pupils to express an officially prescribed belief? The issue involved speech and conscience under the First and Fourteenth Amendments, rather than only a request for a special religious exception.',
        provenance: 'added', source: 'E3'
      },
      {
        title: 'Holding and reasoning',
        text: 'The Court ruled 6–3 for the families. Justice Robert H. Jackson wrote the majority opinion. A flag salute communicates ideas, so forcing participation is compelled speech. National unity did not justify compulsory agreement on matters of opinion. Protection was not limited to people with religious objections.',
        provenance: 'added', source: 'E3'
      },
      {
        title: 'Dissent and procedural result',
        text: 'Frankfurter defended judicial restraint and the authority of elected institutions; Justices Roberts and Reed also dissented. The Court affirmed the lower court’s injunction and overruled Gobitis as a precedent.',
        provenance: 'added', source: 'E3'
      },
      {
        title: 'What to compare',
        text: 'A court can affirm the judgment currently before it while overruling a rule from an earlier case. The two flag-salute cases also show that constitutional interpretation can change without changing the written amendment itself.',
        provenance: 'added', source: 'E14'
      }
    ],
    takeaway: 'Barnette protects refusal to express an official belief. It is broader than a religious exemption for Jehovah’s Witnesses.'
  },
  {
    id: 'brown',
    title: 'Brown v. Board of Education',
    year: 1954,
    vote: '9–0',
    author: 'Chief Justice Earl Warren',
    tagline: 'Separate public education is inherently unequal.',
    provenance: 'supplied',
    source: 'S6; S7; S8; E4',
    sections: [
      {
        title: 'Facts',
        text: 'Black parents and children, supported by the NAACP, challenged racially separated public schools. In Topeka, Kansas, Oliver Brown and other parents sought admission to nearby schools reserved for white children. Linda Brown could not attend a nearby whites-only school. Families had to use segregated schools instead.',
        provenance: 'supplied', source: 'S6, p. 1; S8, p. 1'
      },
      {
        title: 'Constitutional question',
        text: 'Does segregation in public education deny the Fourteenth Amendment’s equal protection even when the schools’ buildings, equipment and other material facilities are equal? This asks whether separation itself creates inequality, rather than simply whether one building is better than another.',
        provenance: 'supplied', source: 'S6, p. 1; S7, p. 2'
      },
      {
        title: 'Holding and reasoning',
        text: 'The Court held that segregated public education violates equal protection. Education is vital for participation and success in society. State-enforced separation marks Black children as inferior and undermines equal educational opportunity. Separate educational facilities are inherently unequal; matching physical resources would not remove the harm of separation.',
        provenance: 'supplied', source: 'S6, p. 1; S7, p. 2'
      },
      {
        title: 'Vote, author and implementation',
        text: 'The decision was unanimous, 9–0, and Chief Justice Earl Warren wrote the opinion. Brown II in 1955 addressed how the decision would be implemented. A constitutional ruling did not instantly produce actual desegregation in every school.',
        provenance: 'added', source: 'E4'
      },
      {
        title: 'Relationship to Plessy',
        text: 'Brown rejected separate but equal in public education, 58 years after Plessy. It changed a constitutional precedent in a different dispute. It was not an appeal in Homer Plessy’s own case, and its specific holding should not be described as an immediate ruling about every segregated facility.',
        provenance: 'corrected', source: 'S6, p. 1; S7, p. 2; E4'
      }
    ],
    takeaway: 'Brown: segregation in public education is itself unequal. Equal treatment requires more than supposedly equal buildings or equipment.'
  }
];

export const lessons = [
  {
    id: 'courts', title: 'Hierarchy of courts in the United States',
    intro: 'Think of two main court systems, with different roles at the trial and appellate levels. The diagram is a typical route, not a rule that every case must visit every court.',
    sections: [
      {
        title: 'The federal ladder',
        text: 'U.S. District Court → U.S. Court of Appeals → potentially the U.S. Supreme Court. District courts are trial courts. Federal courts of appeals review lower-court decisions, usually in a panel of three judges. There are 13 courts of appeals: 12 regional circuits and the specialized Federal Circuit. The Supreme Court has nine justices and generally selects which cases to review.',
        provenance: 'supplied', source: 'S2, slides 4 and 13–16'
      },
      {
        title: 'The state ladder',
        text: 'A typical state structure is a trial court, an intermediate appellate court and a court of last resort, often called the state supreme court. State structures, names and procedures vary. Local or municipal courts usually fit within a state system; they do not make up a third nationwide parallel hierarchy.',
        provenance: 'corrected', source: 'Correction to S2, slides 3 and 17–20; E5'
      },
      {
        title: 'Trial versus appeal',
        text: 'A trial court hears evidence and witnesses and initially establishes the facts. An appellate court usually reviews the existing record and legal arguments. It does not conduct a new trial with a jury, new witnesses and a new presentation of evidence.',
        provenance: 'supplied', source: 'S2, slides 4 and 14'
      },
      {
        title: 'Federal jurisdiction',
        text: 'Jurisdiction is the legal authority to hear and decide a case. Federal question jurisdiction concerns claims arising under the U.S. Constitution or federal law. Diversity jurisdiction can allow federal courts to hear a state-law civil dispute when parties have different state citizenship and the amount in controversy exceeds $75,000.',
        provenance: 'supplied', source: 'S2, slides 8–10'
      },
      {
        title: 'Complete diversity',
        text: 'Ordinary diversity jurisdiction requires that no plaintiff shares state citizenship with any defendant. The monetary threshold excludes interest and costs. The amount must exceed $75,000; exactly $75,000 does not exceed it.',
        provenance: 'added', source: 'E9; E9b'
      },
      {
        title: 'How the two systems interact',
        text: 'State courts are not below federal district courts in a normal chain of appeals. However, the U.S. Supreme Court can review a qualifying final state-court judgment involving federal law, and its interpretation of federal law binds state courts. State courts can also hear many federal-law claims unless Congress assigns exclusive federal jurisdiction.',
        provenance: 'corrected', source: 'Correction to S2, slide 17; E5; E10'
      }
    ]
  },
  {
    id: 'appeals', title: 'The process of appeals',
    intro: 'An appeal asks a higher court to review a decision. The usual purpose is to examine claimed errors using the trial record, rather than simply repeat the whole trial.',
    sections: [
      {
        title: '1. Begin with the trial-level parties',
        text: 'In a civil lawsuit, the plaintiff brings the claim and the defendant is sued. After the court decides the dispute, the losing party normally has a first appeal. The labels at trial do not determine which party will later seek review.',
        provenance: 'supplied', source: 'S2, slides 13 and 18; S5, steps 1–4'
      },
      {
        title: '2. Identify the appellate parties',
        text: 'The appellant asks the higher court to review the lower decision. The appellee is the opposing party in the appeal. A typical federal appellate panel contains three judges. It works without a jury, new witnesses or a new presentation of evidence.',
        provenance: 'supplied', source: 'S2, slide 14; S5, steps 4–5'
      },
      {
        title: '3. Understand the possible outcomes',
        text: 'Affirm means allow the challenged decision to stand. Reverse means overturn that decision. Remand means return the case to the lower court for further proceedings. These describe what happens to the decision or case currently being reviewed.',
        provenance: 'supplied', source: 'S2, slide 15; S5, steps 6–7'
      },
      {
        title: '4. Read a remand carefully',
        text: 'A remand does not automatically make the entire process begin again. Further proceedings depend on the appellate court’s instructions. A reversal and a remand may occur together. Overrule is different: it rejects a legal rule from an earlier case as precedent.',
        provenance: 'corrected', source: 'Correction to S5, step 6; E7; E14'
      },
      {
        title: '5. Seek Supreme Court review',
        text: 'A party may file a petition for a writ of certiorari. The Supreme Court generally chooses whether to take the case. Having a first appeal does not create an automatic right to Supreme Court review.',
        provenance: 'supplied', source: 'S2, slide 16; S5, steps 7–8'
      },
      {
        title: '6. Distinguish the petition, writ and denial',
        text: 'The petition requests review; the writ calls for the lower court’s record. Cert. denied means the Court declined review. The lower judgment remains in place, but denial does not itself endorse that court’s reasoning. A victory is not automatically a landmark decision: that term describes a particularly important ruling.',
        provenance: 'added', source: 'E7; E11; correction to S5, step 8'
      }
    ]
  }
];

export const sources = [
  { id: 'S1', title: 'Sources of AmLaw - Year I Moodle(1).pptx · slides 2–13', kind: 'supplied' },
  { id: 'S2', title: 'American Court System 2020(1).pptx · slides 3–21', kind: 'supplied' },
  { id: 'S3', title: 'Video Worksheets - Liberty(1).docx · The Gobitas Children and the Pledge', kind: 'supplied' },
  { id: 'S4', title: 'Liberties - Year I Moodle(1).pptx · slides 2–7 and 10–13', kind: 'supplied' },
  { id: 'S5', title: 'So, Youre Going to Court Worksheet(1).pdf · page 1', kind: 'supplied' },
  { id: 'S6', title: 'Reading 1 - Brown v. Board of Education(1).pdf · pages 1–2', kind: 'supplied' },
  { id: 'S7', title: 'Plessy v. Ferguson - Reading and Response(1).pdf · pages 1–2', kind: 'supplied' },
  { id: 'S8', title: 'HW - Vocabulary and Concepts(1).pdf · page 1', kind: 'supplied' },
  { id: 'E1', title: 'National Archives: Plessy v. Ferguson, judgment and context', url: 'https://www.archives.gov/milestone-documents/plessy-v-ferguson', kind: 'primary' },
  { id: 'E2', title: 'Library of Congress: Gobitis, 310 U.S. 586', url: 'https://tile.loc.gov/storage-services/service/ll/usrep/usrep310/usrep310586/usrep310586.pdf', kind: 'primary' },
  { id: 'E3', title: 'Library of Congress: Barnette, 319 U.S. 624', url: 'https://tile.loc.gov/storage-services/service/ll/usrep/usrep319/usrep319624/usrep319624.pdf', kind: 'primary' },
  { id: 'E4', title: 'National Archives: Brown and Brown II context', url: 'https://www.archives.gov/milestone-documents/brown-v-board-of-education', kind: 'primary' },
  { id: 'E5', title: 'U.S. Courts: comparing federal and state courts', url: 'https://www.uscourts.gov/about-federal-courts/court-role-and-structure/comparing-federal-state-courts', kind: 'official' },
  { id: 'E5b', title: 'U.S. Courts: appeals', url: 'https://www.uscourts.gov/about-federal-courts/types-cases/appeals', kind: 'official' },
  { id: 'E6', title: 'National Archives: Constitution, Articles I and VI', url: 'https://www.archives.gov/founding-docs/constitution-transcript', kind: 'primary' },
  { id: 'E6b', title: 'National Archives: Fourteenth Amendment, section 1', url: 'https://www.archives.gov/milestone-documents/14th-amendment', kind: 'primary' },
  { id: 'E7', title: 'U.S. Courts: Glossary of Legal Terms (selected precision checks)', url: 'https://www.uscourts.gov/glossary', kind: 'official' },
  { id: 'E8', title: 'Supreme Court: Matal v. Tam (2017), trademark restriction', url: 'https://www.supremecourt.gov/opinions/16pdf/15-1293_1o13.pdf', kind: 'primary' },
  { id: 'E9', title: 'U.S. Code: 28 U.S.C. § 1332', url: 'https://www.govinfo.gov/content/pkg/USCODE-2024-title28/html/USCODE-2024-title28-partIV-chap85-sec1332.htm', kind: 'primary' },
  { id: 'E9b', title: 'Fourth Circuit: complete diversity requirement', url: 'https://www.ca4.uscourts.gov/opinions/191341.P.pdf', kind: 'primary' },
  { id: 'E10', title: 'Congressional Research Service: Federal and State Courts: Structure and Interaction', url: 'https://www.congress.gov/crs_external_products/R/PDF/R47641/R47641.2.pdf', kind: 'official' },
  { id: 'E11', title: 'Supreme Court: Missouri v. Jenkins, 515 U.S. 70, 85 (certiorari denial)', url: 'https://www.supremecourt.gov/opinions/boundvolumes/515bv.pdf', kind: 'primary' },
  { id: 'E12', title: 'Library of Congress: A Matter of Conscience (William Gobitas’s letter and context)', url: 'https://www.loc.gov/exhibits/treasures/tr22a.html#obj66', kind: 'primary' },
  { id: 'E13', title: 'National Archives / DocsTeach: Barnette final decree, 1942, record 279139', url: 'https://docsteach.org/document/barnette-final-decree/', kind: 'primary' },
  { id: 'E14', title: 'Federal Judicial Center: The Flag Salute Cases (official historical synthesis and primary records)', url: 'https://www.fjc.gov/sites/default/files/trials/Flag_Salute_Cases.pdf', kind: 'official' },
  { id: 'E15', title: 'Library of Congress: Teaching Civic Ideals through Court Case Primary Sources', url: 'https://blogs.loc.gov/teachers/2020/03/teaching-civic-ideals-through-court-case-primary-sources/', kind: 'official' },
  { id: 'E16', title: 'U.S. Courts: What Does Free Speech Mean? (Barnette and the right not to speak)', url: 'https://www.uscourts.gov/about-federal-courts/educational-resources/about-educational-outreach/activity-resources/what-does-free-speech-mean', kind: 'official' },
  { id: 'E17', title: 'Federal Courts, WDNY Civic Outreach: Teachers’ Supplement (2025), flag-salute cases', url: 'https://library.ca2.uscourts.gov/wdny-125/wp-content/uploads/sites/3/2025/05/Teacher-Supplement.pdf', kind: 'official' }
];
