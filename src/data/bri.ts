import { Chapter, Shot } from '../types/video';
import { BRI_DURATION, BRI_LINE_CUES, BRI_SECTIONS, BRI_SYNC_CUES } from './briSong';

const chapterPlan = [
  { id: 'bri-01', title: 'Two Ideas, One Label', subtitle: '2013 · overland + maritime proposals', theme: '#F2E8D8', accent: '#C66A45', summary: 'In 2013 China proposed the Silk Road Economic Belt and 21st Century Maritime Silk Road; the modern initiative is a varied network, not one continuous road.' },
  { id: 'bri-02', title: 'Belt by Land · Road by Sea', subtitle: 'corridors · ports · customs · many projects', theme: '#E6E2D3', accent: '#4A837D', summary: 'The Chinese government’s 2023 white paper describes six overland corridors and connectivity across infrastructure, trade, finance, policy and people-to-people links.' },
  { id: 'bri-03', title: 'Stated Aims, Real Questions', subtitle: 'official framing ≠ measured outcomes', theme: '#EBDCC7', accent: '#BA7850', summary: '“Shared benefits” is the Chinese government’s stated framing; who decides, who benefits and how gains are shared are questions for each project.' },
  { id: 'bri-04', title: 'The Modelled Upside', subtitle: 'World Bank · 2019 · conditional scenario', theme: '#DFE9DF', accent: '#3A817A', summary: 'The World Bank modelled potential effects of transport corridors; travel times along corridors could fall by up to 12% once completed. This is a projection, not an observed result.' },
  { id: 'bri-05', title: 'Who Pays the Cost?', subtitle: 'debt · procurement · people · nature', theme: '#E9DFD1', accent: '#A85B43', summary: 'The World Bank identifies fiscal/debt, transparency, procurement, corruption, environmental and social risks alongside potential gains.' },
  { id: 'bri-06', title: 'Evidence Has a Scope', subtitle: 'AidData · 2021 study · historical dataset', theme: '#DCE6E0', accent: '#4D7B70', summary: 'AidData reported major implementation problems in 35% of its BRI infrastructure-project portfolio; this is a dated study estimate, not a current census of all BRI projects.' },
  { id: 'bri-07', title: 'No One-Size-Fits-All', subtitle: 'loans · borrowers · outcomes differ', theme: '#E9E1D7', accent: '#9A7059', summary: 'Debt risks are material but vary by borrower, contract and project; avoid treating every loan or country outcome as the same “debt trap” story.' },
  { id: 'bri-08', title: 'Follow the Receipts', subtitle: 'who pays · who benefits · who decides?', theme: '#F1E9DC', accent: '#B67455', summary: 'End on questions of distribution, accountability and local voice: a route on a map is not proof that its promised outcomes were delivered.' }
] as const;

const beatNotes = [
  'A tiny cargo box mascot bursts from a folded paper map; two bright route ribbons unfurl, one across a drawn land strip and one over a blue sea. Put “2013” on a dated stamp. The map is symbolic, not geographic.',
  'Split the ribbons into a dotted overland rail/road path and a looping maritime path with ports; connect them through a customs-stamp icon. Persistent tag: “SCHEMATIC · NOT TO SCALE.”',
  'A playful official-aims card reads “SHARED BENEFITS” and is visibly stamped “CHINA’S STATED FRAMING · 2023.” A question-mark pin enters: who decides, who benefits?',
  'A modelled travel-time gauge moves down by up to 12%; a large “UP TO” badge and footnote remain onscreen: “WORLD BANK MODEL · 2019 · IF COMPLETED · CORRIDORS · NOT OBSERVED.”',
  'A route bridge is weighed against a ledger, open procurement cards, a community meeting table and a green landscape. Keep the scene curious, not alarmist; do not make affected people into comic props.',
  'A 35% project-card stack is highlighted with “AIDDATA · 2021 STUDY” and scope text “BRI INFRASTRUCTURE SAMPLE · HISTORICAL DATA THROUGH 2017.” Show some cards with repair/question marks; do not imply all BRI or current projects.',
  'Several different loan folders, borrower types and local meeting notes sit side by side. A rubber stamp marked “ONE LABEL DOESN’T FIT ALL” bounces in; no country is reduced to a debt prop.',
  'The map folds into a big question mark, then opens into three receipt tabs: WHO PAYS? WHO BENEFITS? WHO DECIDES? Finish on a paper ticket marked “CHECK THE PROJECT.”'
] as const;

const lineShots: Shot[] = BRI_SYNC_CUES.map((cue, index) => {
  const chapterIndex = Math.floor(index / 3);
  const plan = chapterPlan[chapterIndex];
  return {
    id: `bri-${String(index + 1).padStart(2, '0')}`,
    chapterId: plan.id,
    startTime: cue.at,
    endTime: cue.to,
    cue: BRI_LINE_CUES[index],
    read: cue.label,
    speaker: 'Narrator',
    visualPrompt: beatNotes[chapterIndex]
  };
});

export const BRI_CHAPTERS: Chapter[] = chapterPlan.map((plan, chapterIndex) => ({
  id: plan.id,
  number: chapterIndex + 1,
  title: plan.title,
  subtitle: plan.subtitle,
  startTime: BRI_SECTIONS[chapterIndex].start,
  endTime: BRI_SECTIONS[chapterIndex].end,
  duration: BRI_SECTIONS[chapterIndex].end - BRI_SECTIONS[chapterIndex].start,
  themeColor: plan.theme,
  accentColor: plan.accent,
  summary: plan.summary,
  shots: lineShots.filter(shot => shot.chapterId === plan.id)
}));

export const BRI_SHOTS: Shot[] = BRI_CHAPTERS.flatMap(chapter => chapter.shots);

if (BRI_SHOTS.length !== 24 || BRI_SYNC_CUES.length !== 24 || BRI_CHAPTERS.length !== 8) {
  throw new Error('BRI storyboard must contain 8 chapters and 24 provisional lyric/shot landmarks.');
}
if (BRI_CHAPTERS[0].startTime !== 0 || BRI_CHAPTERS.at(-1)?.endTime !== BRI_DURATION) {
  throw new Error('BRI storyboard must cover the complete planned runtime.');
}
