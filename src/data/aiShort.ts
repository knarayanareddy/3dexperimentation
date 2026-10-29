import { Chapter, Shot } from '../types/video';
import { AI_SHORT_BPM, AI_SHORT_DURATION, AI_SHORT_LINE_CUES, AI_SHORT_SECTIONS, AI_SHORT_SYNC_CUES } from './aiShortSong';

const chapterPlan = [
  { id: 'aishort-01', title: 'Turing & Dartmouth', subtitle: '1950 question · 1956 workshop', start: AI_SHORT_SECTIONS[0].start, end: AI_SHORT_SECTIONS[0].end, theme: '#F3EBDC', accent: '#E8AA38', summary: 'Turing’s 1950 question meets the Dartmouth summer workshop that gave AI its early home.' },
  { id: 'aishort-02', title: 'Winters & Backprop', subtitle: 'Symbolic optimism · funding winters · neural learning', start: AI_SHORT_SECTIONS[1].start, end: AI_SHORT_SECTIONS[1].end, theme: '#8EC3E6', accent: '#2F3C7A', summary: 'Rule-based optimism cools through the funding winters; backpropagation sends error signals backward through neural networks.' },
  { id: 'aishort-03', title: 'Ask, Learn, Try Again', subtitle: 'A chorus for every comeback', start: AI_SHORT_SECTIONS[2].start, end: AI_SHORT_SECTIONS[2].end, theme: '#E8AA38', accent: '#E27A92', summary: 'The recurring cast dances the audience through the refrain—and a playful leap from chessboard to chat.' },
  { id: 'aishort-04', title: 'Chessboards, Photos, GPUs', subtitle: 'Deep Blue · ImageNet · AlexNet', start: AI_SHORT_SECTIONS[3].start, end: AI_SHORT_SECTIONS[3].end, theme: '#1F2550', accent: '#3A9C98', summary: 'Deep Blue beats Kasparov; ImageNet and GPU-powered AlexNet mark a leap in visual recognition.' },
  { id: 'aishort-05', title: 'Attention Takes Flight', subtitle: 'Transformers · ChatGPT · multimodal tools', start: AI_SHORT_SECTIONS[4].start, end: AI_SHORT_SECTIONS[4].end, theme: '#2F3C7A', accent: '#E8AA38', summary: 'Attention and Transformers lead to ChatGPT, then to systems that work across media and use tools under human direction.' },
  { id: 'aishort-06', title: 'Ask, Learn, Try Again', subtitle: 'The hook returns', start: AI_SHORT_SECTIONS[5].start, end: AI_SHORT_SECTIONS[5].end, theme: '#7B5CA8', accent: '#8EC3E6', summary: 'The cast reprises the hook, with the historical props dancing back into view.' },
  { id: 'aishort-07', title: 'The Next Question', subtitle: 'A sing-along outro · 1:24.8 total', start: AI_SHORT_SECTIONS[6].start, end: AI_SHORT_SECTIONS[6].end, theme: '#F3EBDC', accent: '#6E9F58', summary: 'A final chorus tag gives way to one curious student and an open question.' }
] as const;

const beatNotes = [
  'Turing at a 1950 desk; a paper test strip curls toward a clacking early computer.',
  'Summer 1956: researchers gather around a Dartmouth seminar table beneath a hand-lettered AI placard.',
  'A symbolic rulebook tower grows too tall; a cold funding winter arrives at the lab window.',
  'A neural network of bouncing nodes; a bright error signal travels backward along its links.',
  'A four-character call-and-response line dance; the central learner throws both arms up on “try again”.',
  'Paper snowflakes melt into spring flowers as the whole crew spins into a thawing dance.',
  'A chessboard rolls like a stage into a chat window, with pawns hopping into speech bubbles.',
  'The cast races past oversized milestone doors, taking turns opening each one for the next character.',
  'Deep Blue’s chess match: a computer cabinet faces Garry Kasparov; one final piece moves and the crowd reacts.',
  'A flood of labelled image cards—cats, planes, teapots, dogs—swirls around a team of annotators.',
  'A 2012 recognition scoreboard drops its error bar; AlexNet’s layers light up in sequence.',
  'Two GPU boards with spinning fans are hoisted like trophies; a neural net lights up behind them.',
  'Word tokens bob on a ribbon while attention arcs connect context across the whole sentence.',
  'A Transformer tower assembles from encoder/decoder blocks; researchers ride its rising lift in 2017.',
  'A chat window swings open like a door; curious users enter and questions bounce back as speech balloons.',
  'People offer text, images, audio, and video; an assistant plans, uses tools, and checks its work while a human steers.',
  'The full ensemble repeats the hook; each recurring character answers with a different gesture.',
  'Paper snowflakes melt into spring flowers as the whole crew spins into a thawing dance.',
  'The chessboard rolls into a chat window again, now joined by the whole singing cast.',
  'Characters run through painted milestone doors and celebrate the long leap from early machines to capable assistants.',
  'The full ensemble belts the hook one last time, with a different little dance for every character.',
  'The stage empties to one curious student and a small robot, facing the audience beneath an open question mark.'
] as const;

const lineShots: Shot[] = AI_SHORT_SYNC_CUES.map((cue, index) => {
  const group = chapterPlan.find(chapter => cue.at >= chapter.start && cue.at < chapter.end)!;
  return {
    id: `aishort-${String(index + 1).padStart(2, '0')}`,
    chapterId: group.id,
    startTime: cue.at,
    endTime: cue.to,
    cue: AI_SHORT_LINE_CUES[index],
    read: cue.label,
    speaker: index >= 8 && index <= 11 ? 'Scientist' : 'Clawd',
    visualPrompt: beatNotes[index]
  };
});

export const AI_SHORT_CHAPTERS: Chapter[] = chapterPlan.map((plan, chapterIndex) => ({
  id: plan.id,
  number: chapterIndex + 1,
  title: plan.title,
  subtitle: plan.subtitle,
  startTime: plan.start,
  endTime: plan.end,
  duration: plan.end - plan.start,
  themeColor: plan.theme,
  accentColor: plan.accent,
  summary: plan.summary,
  shots: lineShots.filter(shot => shot.chapterId === plan.id)
}));

export const AI_SHORT_SHOTS: Shot[] = AI_SHORT_CHAPTERS.flatMap(chapter => chapter.shots);
export const AI_SHORT_DURATION_SECONDS = AI_SHORT_DURATION;
export const AI_SHORT_PLANNED_BPM = AI_SHORT_BPM;

if (AI_SHORT_SHOTS.length !== 22 || AI_SHORT_SYNC_CUES.length !== 22) {
  throw new Error('AI Short storyboard and provisional lyric cue map must contain one shot for each of its 22 lyric lines.');
}
