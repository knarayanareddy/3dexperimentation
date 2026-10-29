export const AI_SHORT_TITLE = 'Ask, Learn, Try Again';
export const AI_SHORT_PLANNED_DURATION = 75;
/** Measured from the supplied MP3; also checked against its ID3/MP3 stream metadata. */
export const AI_SHORT_TRACK_DURATION = 84.793458;
export const AI_SHORT_DURATION = AI_SHORT_TRACK_DURATION;
export const AI_SHORT_BPM = 120;

/** Preserve the style prompt embedded in the user's supplied Suno render. */
export const AI_SHORT_STYLE_PROMPT = `Indie-pop / retro-synth, polished compact-short production with a clean half-bar breath before each chorus; clear, warm lead vocal in crooning legato phrases, crisp year diction, whispered ad-libs between lines, small-group call-and-response hook; bright piano lead, handclaps, buoyant bass, light live drums, warm synth and playful brass accents; bouncy 120 BPM four-on-the-floor, simple repetitive singalong melody, short held final note.`;

export const AI_SHORT_LYRICS = `[Verse 1]\nTuring asked in nineteen-fifty: “Can a machine play our game?”\nDartmouth, summer ’56: AI took the stage.\nRules grew tall; then winters froze the funding flow.\nBackprop sent the error back; small nets began to grow.\n\n[Chorus]\nAsk it! Learn it! Try again!\nWinter, thaw, then spring again!\nFrom a chessboard to a chat—\nLook how far we’ve come from that!\n\n[Verse 2]\nDeep Blue beat the champ in ’97.\nImageNet brought millions into view.\nAlexNet cut the error in 2012.\nTwo GPUs helped power the breakthrough.\n\n[Bridge]\nAttention linked each word in line.\nTransformers took off in 2017.\nTwenty-twenty-two, the chat door opened wide.\nNow it sees, hears, speaks—people steer the ride.\n\n[Chorus]\nAsk it! Learn it! Try again!\nWinter, thaw, then spring again!\nFrom a chessboard to a chat—\nLook how far we’ve come from that!\n\n[Outro]\nAsk it! Learn it! Try again!\nWhat will we teach it next?`;

/** Section and lyric landmarks estimated from word-level ASR on the supplied sung render. */
export const AI_SHORT_SECTIONS = [
  { name: 'Turing & Dartmouth', start: 0, end: 8.72, firstLine: 0, count: 2 },
  { name: 'Winters & Backprop', start: 8.72, end: 16.56, firstLine: 2, count: 2 },
  { name: 'Chorus', start: 16.56, end: 31.72, firstLine: 4, count: 4 },
  { name: 'Chessboards & GPUs', start: 31.72, end: 46.24, firstLine: 8, count: 4 },
  { name: 'Attention to ChatGPT', start: 46.24, end: 63.16, firstLine: 12, count: 4 },
  { name: 'Chorus', start: 63.16, end: 74.68, firstLine: 16, count: 4 },
  { name: 'Outro', start: 74.68, end: AI_SHORT_DURATION, firstLine: 20, count: 2 }
] as const;

export const AI_SHORT_LINE_CUES = [
  'Turing asked in nineteen-fifty: “Can a machine play our game?”',
  'Dartmouth, summer ’56: AI took the stage.',
  'Rules grew tall; then winters froze the funding flow.',
  'Backprop sent the error back; small nets began to grow.',
  'Ask it! Learn it! Try again!',
  'Winter, thaw, then spring again!',
  'From a chessboard to a chat—',
  'Look how far we’ve come from that!',
  'Deep Blue beat the champ in ’97.',
  'ImageNet brought millions into view.',
  'AlexNet cut the error in 2012.',
  'Two GPUs helped power the breakthrough.',
  'Attention linked each word in line.',
  'Transformers took off in 2017.',
  'Twenty-twenty-two, the chat door opened wide.',
  'Now it sees, hears, speaks—people steer the ride.',
  'Ask it! Learn it! Try again!',
  'Winter, thaw, then spring again!',
  'From a chessboard to a chat—',
  'Look how far we’ve come from that!',
  'Ask it! Learn it! Try again!',
  'What will we teach it next?'
] as const;

/** First-word timestamps from Whisper small word-timestamp inference; cue ends at next line onset. */
const LINE_STARTS = [
  0.00, 4.82, 8.72, 12.30, 16.56, 20.28, 23.98, 25.58,
  31.72, 35.22, 38.44, 42.94, 46.24, 50.96, 54.52, 58.70,
  63.16, 66.94, 70.26, 72.56, 74.68, 77.86
] as const;

export const AI_SHORT_SYNC_CUES = AI_SHORT_LINE_CUES.map((label, index) => {
  const at = LINE_STARTS[index];
  const to = LINE_STARTS[index + 1] ?? AI_SHORT_DURATION;
  const section = AI_SHORT_SECTIONS.find(s => index >= s.firstLine && index < s.firstLine + s.count)?.name;
  return { at, to, film: [at, to] as [number, number], label, section };
});

export function aiShortSectionAt(time: number): string {
  return AI_SHORT_SECTIONS.find(section => time >= section.start && time < section.end)?.name || 'End';
}
