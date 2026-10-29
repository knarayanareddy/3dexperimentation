export const BRI_TITLE = 'The Belt, the Road & the Receipts';
export const BRI_TRACK_TITLE = 'Map It, Mind the Cost';
/** Planned visual runtime: 48 bars at the requested 106.7 BPM, mapped 1:1 to the storyboard. */
export const BRI_DURATION = 108;
/** Measured MPEG duration of the supplied Suno master; phrase onsets are not independently measured. */
export const BRI_TRACK_DURATION = 104.96;
export const BRI_BPM = 106.6666667;
export const BRI_STYLE_PROMPT = `Playful, bright travelogue indie-pop with a handclap-and-bass groove, 106.7 BPM, 4/4, exactly about 1:48 (48 bars; two bars per lyric line; no long intro or instrumental outro). Nimble warm lead vocal with crisp consonants, lightly talk-sung verses, an earworm call-and-response refrain on “Map it, move it, mind the cost!”; buoyant plucked bass, brushed snare, handclaps, marimba / toy-piano accents, muted brass and little paper-map percussion. Curious and witty, not triumphant, nationalistic, corporate, or glib about debt or community impacts. Keep the lyric intelligible and the groove nimble; give the evidence caveats breathing room. Clean final stop after the last question. The song should feel like a colorful map journey that keeps checking its receipts.`;
export const BRI_EXCLUDE = 'No soundalikes, celebrity voices, national stereotypes, faux accents, propaganda, corporate anthem, triumphal claims, trivializing debt or displacement, invented quotes, unqualified current statistics, long intro, extra chorus, or extended outro.';

export const BRI_LYRICS = `[Verse 1]\nTwo thousand thirteen: two big ideas take flight.\nOne by land, one by sea—drawn as a web.\nNot one endless road: a network of routes.\n\n[Verse 2]\nThe Belt is overland; the Road sails by sea.\nSix corridors in China’s plan; projects vary.\nRails, ports, customs—more than concrete.\n\n[Stated aim]\nChina’s stated aim: shared benefits and cooperation.\nThat is a pledge, not a scorecard.\nAsk who decides—and who benefits.\n\n[Modelled opportunity]\nWorld Bank modelled what better links could do.\nIf completed, travel times could fall up to twelve percent.\nA forecast, not a result already measured.\n\n[The questions]\nBig builds need money; loans can raise debt risk.\nClear bids, open books, sound plans all matter.\nLand, labor, nature—whose costs count?\n\n[Evidence check]\nAidData’s 2021 study tracked projects through 2017.\nIn its BRI infrastructure sample, thirty-five percent\nmet major problems in that dataset—not all BRI today.\n\n[No one-size-fits-all]\nDebt risk is real; one label can’t explain all.\nBorrowers, terms, outcomes differ by project.\nRead the contracts; hear local voices.\n\n[Final refrain]\nWho pays? Who benefits? Who gets to decide?\nA route is a promise—not proof of an outcome.\nMap it, move it, mind the cost—and ask again!`;

const SECTION_NAMES = [
  'Two Ideas, One Label',
  'Belt by Land · Road by Sea',
  'Stated Aims, Real Questions',
  'The Modelled Upside',
  'Who Pays the Cost?',
  'Evidence Has a Scope',
  'No One-Size-Fits-All',
  'Follow the Receipts'
] as const;

export const BRI_SECTIONS = SECTION_NAMES.map((name, index) => ({
  name,
  start: index * 13.5,
  end: (index + 1) * 13.5,
  firstLine: index * 3,
  count: 3
}));

export const BRI_LINE_CUES = [
  'Two thousand thirteen: two big ideas take flight.',
  'One by land, one by sea—drawn as a web.',
  'Not one endless road: a network of routes.',
  'The Belt is overland; the Road sails by sea.',
  'Six corridors in China’s plan; projects vary.',
  'Rails, ports, customs—more than concrete.',
  'China’s stated aim: shared benefits and cooperation.',
  'That is a pledge, not a scorecard.',
  'Ask who decides—and who benefits.',
  'World Bank modelled what better links could do.',
  'If completed, travel times could fall up to twelve percent.',
  'A forecast, not a result already measured.',
  'Big builds need money; loans can raise debt risk.',
  'Clear bids, open books, sound plans all matter.',
  'Land, labor, nature—whose costs count?',
  'AidData’s 2021 study tracked projects through 2017.',
  'In its BRI infrastructure sample, thirty-five percent',
  'met major problems in that dataset—not all BRI today.',
  'Debt risk is real; one label can’t explain all.',
  'Borrowers, terms, outcomes differ by project.',
  'Read the contracts; hear local voices.',
  'Who pays? Who benefits? Who gets to decide?',
  'A route is a promise—not proof of an outcome.',
  'Map it, move it, mind the cost—and ask again!'
] as const;

const LINE_DURATION = 4.5;
export const BRI_SYNC_CUES = BRI_LINE_CUES.map((label, index) => {
  const at = index * LINE_DURATION;
  const to = Math.min(BRI_DURATION, at + LINE_DURATION);
  return {
    at,
    to,
    film: [at, to] as [number, number],
    label,
    section: BRI_SECTIONS.find(section => index >= section.firstLine && index < section.firstLine + section.count)?.name
  };
});

export function briSectionAt(time: number): string {
  return BRI_SECTIONS.find(section => time >= section.start && time < section.end)?.name || 'End';
}
