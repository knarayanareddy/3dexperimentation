import { Chapter, Shot } from '../types/video';
import { ANTHROPIC_DURATION, ANTHROPIC_LINE_CUES, ANTHROPIC_SECTIONS, ANTHROPIC_SYNC_CUES } from './anthropicSong';

const chapterPlan = [
  { id: 'anthropic-01', title: 'A Research Bet', subtitle: '2021 · reliable, steerable, interpretable', theme: '#F2E8D8', accent: '#D97757', summary: 'Anthropic begins in 2021 as an AI safety and research company focused on systems that are reliable, steerable, and interpretable.' },
  { id: 'anthropic-02', title: 'Principles in the Loop', subtitle: '2022 · Constitutional AI', theme: '#E6D8C7', accent: '#B46B4F', summary: 'Constitutional AI explores training an assistant to critique and revise responses against written principles, with AI feedback.' },
  { id: 'anthropic-03', title: 'Claude Steps Out', subtitle: '2023 · chat and API', theme: '#EBD9C1', accent: '#C77D53', summary: 'Claude is introduced through a chat interface and API after closed-alpha work with partners including Notion, Quora, and DuckDuckGo.' },
  { id: 'anthropic-04', title: 'A Family of Models', subtitle: '2024 · Haiku · Sonnet · Opus', theme: '#E4E1D6', accent: '#668B82', summary: 'Claude 3 arrives in three sizes, with visual input that can handle photos, charts, graphs, and technical diagrams.' },
  { id: 'anthropic-05', title: 'From Chat to Computer Use', subtitle: '2024 · Artifacts · computer-use beta', theme: '#E2E4D8', accent: '#6D9285', summary: 'Artifacts give generated work a workspace; computer use enters public beta as a new, explicitly experimental capability.' },
  { id: 'anthropic-06', title: 'Code and Agents', subtitle: '2025 · Claude 4 · Claude Code GA', theme: '#DFE3DA', accent: '#587F73', summary: 'Claude 4 emphasizes coding, reasoning, and agent workflows; Claude Code becomes generally available.' },
  { id: 'anthropic-07', title: 'The Anthropic Institute', subtitle: '2026 · capabilities and consequences', theme: '#E8DFD4', accent: '#A66E51', summary: 'The Anthropic Institute brings together research on frontier capabilities, societal impacts, and economic change.' },
  { id: 'anthropic-08', title: 'The Open Question', subtitle: 'Promise · uncertainty · public benefit', theme: '#F1E9DC', accent: '#B67455', summary: 'A measured coda holds capability and responsibility together, ending on questions rather than a claim that safety is solved.' }
] as const;

const beatNotes = [
  '0:00–0:03 instrumental pickup holds on the team and 2021 card; bring the first lyric caption on its vocal onset at about 0:03.',
  'Three translucent lenses read RELIABLE, STEERABLE, INTERPRETABLE; lines connect the words to a model sketch.',
  'A glowing model is shown as a black box, then a researcher turns on a small inspection light.',
  'A handwritten sheet of principles is placed beside a chat bubble; the camera pushes toward the rules.',
  'An assistant drafts, critiques, and revises a response against a visible principles card.',
  'Two model outputs pass before an evaluator; a human researcher watches the process, not a magic shield.',
  'A simple chat window opens under the word CLAUDE; no official logo or portrait is reproduced.',
  'Cards for writing, search, questions, and code orbit a person using the assistant at a desk.',
  'Three partner name cards—Notion, Quora, DuckDuckGo—connect to the early Claude chat window.',
  'Three model cards—HAIKU, SONNET, OPUS—balance speed, capability, and cost on a hand-drawn scale.',
  'A photo, a bar chart, and a technical diagram move into one conversation window.',
  'The three model cards align into a single Claude family, shown as options rather than a single ladder.',
  'A generated diagram and code artifact unfold in a side-by-side workspace beside the conversation.',
  'A cursor moves through a simple desktop mockup; a small BETA / EXPERIMENTAL badge stays visible.',
  'A human hand pauses over the mouse while the assistant suggests the next step; the person remains in control.',
  'A code editor, test window, and checklist become a careful multi-step workflow.',
  'A calendar flips to May 2025; Claude 4 and Claude Code labels appear with a general-availability stamp.',
  'An agent workflow gains more steps, while a small caution marker keeps capability and risk in the same frame.',
  'A new interdisciplinary institute forms around a table of researchers, economists, and social scientists.',
  'Three panels read FRONTIER CAPABILITIES, WORK & ECONOMY, LAW & SOCIETY, then connect to a community map.',
  'A balanced scale holds a bright possibility on one side and unanswered questions on the other.',
  'Research notes flow through a product doorway toward people at work, school, and in a lab.',
  'A group looks toward the audience; the words WHO BENEFITS? WHAT MUST WE WATCH? appear overhead.',
  'The stage dims to an unfinished page, a pencil, and the closing words: THE STORY IS STILL BEING WRITTEN.'
] as const;

const lineShots: Shot[] = ANTHROPIC_SYNC_CUES.map((cue, index) => {
  const shotStart = index === 0 ? 0 : cue.at;
  const group = chapterPlan.find((_, chapterIndex) => shotStart >= ANTHROPIC_SECTIONS[chapterIndex].start && shotStart < ANTHROPIC_SECTIONS[chapterIndex].end)!;
  return {
    id: `anthropic-${String(index + 1).padStart(2, '0')}`,
    chapterId: group.id,
    startTime: shotStart,
    endTime: cue.to,
    cue: ANTHROPIC_LINE_CUES[index],
    read: cue.label,
    speaker: 'Narrator',
    visualPrompt: beatNotes[index]
  };
});

export const ANTHROPIC_CHAPTERS: Chapter[] = chapterPlan.map((plan, chapterIndex) => ({
  id: plan.id,
  number: chapterIndex + 1,
  title: plan.title,
  subtitle: plan.subtitle,
  startTime: ANTHROPIC_SECTIONS[chapterIndex].start,
  endTime: ANTHROPIC_SECTIONS[chapterIndex].end,
  duration: ANTHROPIC_SECTIONS[chapterIndex].end - ANTHROPIC_SECTIONS[chapterIndex].start,
  themeColor: plan.theme,
  accentColor: plan.accent,
  summary: plan.summary,
  shots: lineShots.filter(shot => shot.chapterId === plan.id)
}));

export const ANTHROPIC_SHOTS: Shot[] = ANTHROPIC_CHAPTERS.flatMap(chapter => chapter.shots);
export const ANTHROPIC_DURATION_SECONDS = ANTHROPIC_DURATION;
export const ANTHROPIC_PLANNED_BPM = 116;

if (ANTHROPIC_SHOTS.length !== 24 || ANTHROPIC_SYNC_CUES.length !== 24 || ANTHROPIC_CHAPTERS.length !== 8) {
  throw new Error('Anthropic storyboard must contain 8 chapters and 24 provisional shot/lyric landmarks.');
}
if (ANTHROPIC_CHAPTERS[0].startTime !== 0 || ANTHROPIC_CHAPTERS.at(-1)?.endTime !== ANTHROPIC_DURATION) {
  throw new Error('Anthropic storyboard must cover the complete current runtime.');
}
