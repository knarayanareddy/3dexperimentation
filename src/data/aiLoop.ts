import { Chapter, Shot } from '../types/video';
import { AI_LOOP_FIRST_VOCAL_ESTIMATE, AI_LOOP_SCENE_TIMES, AI_LOOP_TRACK_DURATION } from './aiLoopSync';

/** Five lyric acts plus a musical cold-open and button; total length follows the supplied Suno master. */
const sceneText = [
  {
    cue: 'Welcome to the loop; take a seat and mind the suits.',
    read: 'A chip-showman ushers a researcher, a cloud custodian, and a cautious investor into a tiny vaudeville theatre. Each arrives carrying a different kind of contract.',
    visualPrompt: 'Watercolor vaudeville curtain, expressive cast, a revolving ring of contract pages and a physical server rack; no static infographic cards.',
    technicalNote: 'This is a map of financing and procurement links, not a claim that one dollar literally returns to its origin.'
  },
  {
    cue: 'Deals circle back; the server racks stay put.',
    read: 'The investor passes an equity envelope to a research lab; the lab hands a compute invoice to a cloud custodian; the cloud asks the chip-showman for more GPUs. The rack stays planted while people and papers move around it.',
    visualPrompt: 'Three distinct characters physically hand off different documents around a humming rack; lively camera orbit and broad painted arrows.',
    technicalNote: 'Equity investment, cloud purchases, and hardware sales are separate contract types.'
  },
  {
    cue: 'Chip funds the lab; lab orders compute; cloud orders chips.',
    read: 'A comic steam train of invoices circles the stage. The researcher rides a compute receipt while a GPU crate rolls to the cloud and a separate investment envelope returns to the lab.',
    visualPrompt: 'Moving paper train, locomotive-like server cart, waving cast, real GPU rack anchored in the scene.',
    technicalNote: 'The circulation motif simplifies a network of contracts; it does not suggest every transaction is circular or improper.'
  },
  {
    cue: '“Up to” on the banner; fine print in the wings.',
    read: 'A top-hatted chip-showman and a lab researcher struggle to unfurl an enormous “UP TO $100B” letter-of-intent banner; a tiny legal clerk swings in to point at the asterisk.',
    visualPrompt: 'Oversized theatrical LOI scroll, acrobatic asterisk, a supporting cast with sharply different expressions and poses.',
    technicalNote: 'The September 2025 Nvidia–OpenAI announcement described an intended, progressive investment of up to $100B tied to planned systems deployment; it was a letter of intent, not a completed $100B transfer.'
  },
  {
    cue: 'Separate deal: thirty billion, reported in a later round.',
    read: 'The earlier banner folds away. A different, later $30B investment receipt lands in its own frame while the researcher physically separates the documents with a red divider.',
    visualPrompt: 'Two independent paper streams and differently sized props; no additive total or giant combined cheque.',
    technicalNote: 'Bloomberg reported in October 2026 that Nvidia contributed about $30B in a later OpenAI round, separate from the 2025 framework. Do not add the figures or imply the LOI was fully funded.'
  },
  {
    cue: 'Azure gets a quarter-trillion in future compute buys.',
    read: 'A blue cloud custodian strains under a receipt that unrolls across the stage and curls around a server rack; the researcher measures the long ribbon with a yardstick.',
    visualPrompt: 'Character-led paper gag, enormous curling contract, Azure-blue cloud, illuminated physical racks and human-scale reaction.',
    technicalNote: 'Microsoft’s October 2025 announcement said OpenAI contracted to purchase an incremental $250B of Azure services. This is a future services commitment, not immediate cash revenue.'
  },
  {
    cue: 'Oracle’s five-year build gets a three-hundred-billion headline.',
    read: 'An orange-clad construction foreman and a cloud architect raise a data-center hall as five calendar pages whip past and a crane lifts a “$300B / 5 YEARS” sign.',
    visualPrompt: 'Busy painterly construction scene with workers, crane, rack deliveries, and a flipping calendar; avoid a floating text-only card.',
    technicalNote: 'OpenAI said in July 2025 that its Oracle agreement exceeds $300B over five years and covers up to 4.5 GW of additional capacity; this is not a single upfront payment.'
  },
  {
    cue: 'Land, grid, cooling: the chorus has a power bill.',
    read: 'A hard-hat engineer wrestles a cable toward a transformer while a cloud custodian fans a hot server rack; a delivery driver tries to squeeze a GPU crate through the gate.',
    visualPrompt: 'Comic physical bottleneck: land surveyor, power engineer, cooling pipes, sweating rack mascot, and chip crate all in one deep scene.',
    technicalNote: 'The build-out depends on land, power, cooling, networking, delivery, utilization, and customer demand.'
  },
  {
    cue: 'Chip wears two hats: supplier and shareholder.',
    read: 'The green chip character swaps between a supplier hard hat and a shareholder’s bowler while a CoreWeave rack technician points out that the relationship runs in more than one direction.',
    visualPrompt: 'One expressive chip mascot juggling two different hats and two different documents; CoreWeave-like cloud racks and a skeptical technician.',
    technicalNote: 'Nvidia supplies CoreWeave GPUs and is also a CoreWeave shareholder.'
  },
  {
    cue: 'Six-point-three: spare capacity, if customer seats are empty.',
    read: 'A booking clerk discovers empty seats in a server-rack theatre. A qualifying residual-capacity order form drops into view while the chip supplier checks the unoccupied rows.',
    visualPrompt: 'Anthropomorphic rack seats, moving reservation tags, conditional order form, comic but legible $6.3B initial value.',
    technicalNote: 'CoreWeave’s September 2025 SEC filing described an order form with an initial value of $6.3B for qualifying residual unsold capacity if customer utilization is insufficient.'
  },
  {
    cue: 'Through thirty-two, with service terms and escape clauses.',
    read: 'A long contract ribbon runs down a calendar rail to April 13, 2032. A tiny service technician and a delivery clerk hold it in place as condition tabs flap in the wind.',
    visualPrompt: 'A single continuous time ribbon, animated calendar pages, delivery/service checklist, characters physically holding clauses.',
    technicalNote: 'The filing’s residual-capacity arrangement runs through April 13, 2032, subject to delivery, availability, termination provisions, and service requirements.'
  },
  {
    cue: 'Not a blanket debt guarantee—don’t let the bassline lie.',
    read: 'A worried bear investor lifts a magnifying glass over the contract; an auditor owl stamps “CONDITIONAL PURCHASE OBLIGATION” over a misleading “BAILOUT” placard.',
    visualPrompt: 'Expressive bear and bespectacled auditor, giant magnifier, comic stamp gag, readable legal language on paper.',
    technicalNote: 'The filing describes a conditional purchase obligation for residual capacity, not an unlimited guarantee of CoreWeave debt.'
  },
  {
    cue: 'Real chips, real jobs, real concrete in the night.',
    read: 'A night-shift crew unloads actual GPU crates beside a half-built data hall. A researcher and electricians coordinate under work lights as the server rows begin to glow.',
    visualPrompt: 'Warm human-scale construction tableau, varied workers in motion, forklift, real-looking chips and cable trays, night-shift lighting.',
    technicalNote: 'The ecosystem is not imaginary: capital funds physical equipment, buildings, electricity, and services that are being built and delivered.'
  },
  {
    cue: 'A promise isn’t cash; a backlog isn’t tonight.',
    read: 'A commitment scroll unfurls toward a future calendar while a cashier waits beside an almost-empty cash drawer; a rack worker points to the delivery date, not the headline.',
    visualPrompt: 'Future-dated contract ribbon contrasted with a present-day cash drawer and delivery docket; character interaction, not a three-box chart.',
    technicalNote: 'Commitments can be conditional, cancellable, staged, or dependent on future delivery; backlog and cash are not interchangeable.'
  },
  {
    cue: 'Equity in one ledger; sales in another drawer.',
    read: 'A brisk bookkeeper sorts an investment certificate into one drawer and a delivered-services invoice into another. The chip-showman reaches for the wrong stamp and gets gently corrected.',
    visualPrompt: 'Physical wooden ledger drawers, animated papers, expressive cashier and chip mascot, distinct colors for equity and revenue.',
    technicalNote: 'Investment proceeds and recognized revenue are different accounting categories.'
  },
  {
    cue: 'Same names on the arrows—so we ask what they’re for.',
    read: 'The cast forms a living relationship map: the chip supplier, lab, cloud builder, and capacity provider pass distinct ribbons marked equity, compute, chips, and conditional capacity.',
    visualPrompt: 'Ensemble staging with crossing colored contract ribbons, moving handoffs and clear arrow directions; not a static node-and-edge diagram.',
    technicalNote: 'Interconnected exposures can amplify a pullback, but recurring counterparties alone are not proof of fraud or fictitious sales.'
  },
  {
    cue: 'Bulls sing adoption: useful tools and revenue.',
    read: 'The hopeful bull investor steps through scenes of customers using useful tools; a researcher demonstrates a real task while receipts and productivity gains begin to stack.',
    visualPrompt: 'Bright but grounded human stories: customers, workers, productive tools, busy racks and receipts; energetic character-led montage.',
    technicalNote: 'The bull case is sustained adoption, monetization, productivity improvement, and durable cash generation.'
  },
  {
    cue: 'Bears count debt, grid delays, and empty rooms.',
    read: 'The bear investor counts a debt ledger, a delayed transformer, and half-empty racks. A line of dominoes sways in the draft but remains upright.',
    visualPrompt: 'Bear character with a ledger, delayed grid crew, sparse rack occupancy, and a suspended wobbling domino chain; no crash imagery.',
    technicalNote: 'Leverage, power constraints, utilization, and uncertain returns create downside risks, not a guaranteed collapse.'
  },
  {
    cue: 'If returns fall short, the dominoes could sway.',
    read: 'A small shock travels along contracts and one domino leans toward the next. The cast catches the chain before it falls, holding on a visibly unresolved balance.',
    visualPrompt: 'Kinetic near-fall, characters scrambling to steady separate dominoes, motion lines and a held freeze; the dominoes never topple.',
    technicalNote: 'A downside scenario is conditional: a pullback could transmit through connected balance sheets and commitments if returns disappoint.'
  },
  {
    cue: 'Is it a bubble? Will it pop? We leave it that way.',
    read: 'The music-hall cast freezes mid-handoff. The showman removes his hat, turns to camera, and leaves one question mark suspended between a chip, a cloud, a worker, and an unfallen domino.',
    visualPrompt: 'Expressive ensemble freeze-frame, painterly curtain closing only partway, open question, no crash prediction or tidy verdict.',
    technicalNote: 'The outcome depends on revenues, productivity, financing terms, customer demand, and execution; the film makes no prediction that a crash is imminent.'
  }
] as const;

function makeShot(chapterId: string, index: number, timeIndex: number): Shot {
  const timing = AI_LOOP_SCENE_TIMES[timeIndex];
  const content = sceneText[index];
  return {
    id: timing.id,
    chapterId,
    startTime: timing.from,
    endTime: timing.to,
    speaker: 'Narrator',
    cue: content.cue,
    read: content.read,
    visualPrompt: content.visualPrompt,
    technicalNote: content.technicalNote
  };
}

function chapter(
  id: string, number: number, title: string, subtitle: string, startTime: number, endTime: number,
  themeColor: string, accentColor: string, summary: string, shots: Shot[]
): Chapter {
  return { id, number, title, subtitle, startTime, endTime, duration: endTime - startTime, themeColor, accentColor, summary, shots };
}

export const AI_LOOP_CHAPTERS: Chapter[] = [
  chapter('loop0', 0, 'The House Opens', 'A vaudeville field guide to the money loop', 0, AI_LOOP_FIRST_VOCAL_ESTIMATE,
    '#D99145', '#2B8C82', 'A cast of chips, builders, cloud operators, researchers, and investors takes the stage.', [
      { id: 'loop0-1', chapterId: 'loop0', startTime: 0, endTime: AI_LOOP_FIRST_VOCAL_ESTIMATE, speaker: 'Narrator', cue: 'THE MONEY LOOP', read: 'The curtain rises on the AI-finance music hall.', visualPrompt: 'A moving cast, marquee, curtain and looping paper contracts; hold the title across the instrumental intro.', technicalNote: 'The title sequence intentionally occupies the instrumental opening before the estimated first sung line.' }
    ]),
  chapter('loop1', 1, 'A Theatre of Deals', 'Different contracts pass through the same cast', AI_LOOP_SCENE_TIMES[1].from, AI_LOOP_SCENE_TIMES[6].from,
    '#3A9C98', '#E8AA38', 'The first verse turns a complex financial network into a hand-to-hand vaudeville routine.', [0, 1, 2, 3, 4].map((i) => makeShot('loop1', i, i + 1))),
  chapter('loop2', 2, 'Headlines & Hardware', 'Separate announcements; very physical build-outs', AI_LOOP_SCENE_TIMES[6].from, AI_LOOP_SCENE_TIMES[9].from,
    '#E8AA38', '#D97757', 'A large letter of intent, later investment reporting, cloud commitments, and construction each get distinct staging.', [5, 6, 7].map((i) => makeShot('loop2', i, i + 1))),
  chapter('loop3', 3, 'The Conditions', 'Supplier stakes, residual capacity, and fine print', AI_LOOP_SCENE_TIMES[9].from, AI_LOOP_SCENE_TIMES[13].from,
    '#7B5CA8', '#E8AA38', 'The characters carry the clauses on stage so the conditions remain legible without flattening them into cards.', [8, 9, 10, 11].map((i) => makeShot('loop3', i, i + 1))),
  chapter('loop4', 4, 'Receipts vs. Reality', 'Real infrastructure; different dates and accounts', AI_LOOP_SCENE_TIMES[13].from, AI_LOOP_SCENE_TIMES[17].from,
    '#2F7180', '#E8AA38', 'Workers, cash drawers, contracts, ledgers, and partner relationships occupy one changing stage.', [12, 13, 14, 15].map((i) => makeShot('loop4', i, i + 1))),
  chapter('loop5', 5, 'The Open Question', 'The bull case, bear case, and a held domino', AI_LOOP_SCENE_TIMES[17].from, AI_LOOP_TRACK_DURATION,
    '#CE83A3', '#E8AA38', 'A hopeful case and a cautious case are staged as equally real possibilities; the ending stays unresolved.', [16, 17, 18, 19].map((i) => makeShot('loop5', i, i + 1)))
];

export const AI_LOOP_DURATION = AI_LOOP_TRACK_DURATION;
