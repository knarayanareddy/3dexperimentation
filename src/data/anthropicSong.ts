export const ANTHROPIC_TITLE = 'The Anthropic Story';
export const ANTHROPIC_TRACK_TITLE = 'Build, Check, Repeat';
/** Storyboard duration after the user-requested 9-second head trim. */
export const ANTHROPIC_DURATION = 111;
/** Measured MPEG duration after re-encoding the 9-second head trim, including encoder padding. */
export const ANTHROPIC_TRACK_DURATION = 111.0465306122449;
export const ANTHROPIC_BPM = 116;

/** New Suno brief requested after the first render came out longer than the short target. */
export const ANTHROPIC_STYLE_PROMPT = `Punchy, bass-forward documentary alt-pop with a catchy, tongue-rolling hook; 116 BPM, 4/4, about 1:48, 52 bars including a very short intro and outro. Prominent rounded electric bass or synth-bass riff up front, deep tight kick, crisp snare, syncopated handclaps, bright muted guitar chops, plucky keys, and a few warm synth/brass accents. Energetic, buoyant, confident groove—not aggressive or corporate. Clear warm lead vocal with crisp consonants, nimble rhythmic phrasing, playful alliteration and internal rhyme; lightly talk-sung verses, a simple melodic chorus with a small group call-and-response on “Try, check, revise.” Keep the bass punchy but leave the vocal intelligible. Build from a quick pickup to a strong final hook and clean ending. No long instrumental intro, no repeated extra chorus, no extended outro; target a complete 90–120-second song.`;

export const ANTHROPIC_EXCLUDE = 'No soundalikes, no celebrity voice, no muddy bass masking the vocal, no long intro or outro, no extra repeated chorus, no dense rap, no corporate jingle, no invented quotations, no claim that AI safety is solved.';

export const ANTHROPIC_LYRICS = `[Verse 1]\nTwenty-twenty-one, a research lab takes shape.\nReliable, robust—systems we can steer.\nInterpret the patterns—look inside the lines.\n\n[Verse 2]\nWrite the rules; let the model critique.\nRevise, re-try; let feedback speak.\nConstitutional AI—one method to explore.\n\n[Chorus]\nClaude in the chat, on A-P-I.\nDraft, search, ask—let ideas fly.\nTry, check, revise—keep questions in sight.\n\n[Verse 3]\nHaiku quick, Sonnet steady, Opus deep.\nPhotos, charts, diagrams—new things to read.\nThree choices, one family—pick the pace you need.\n\n[Bridge]\nArtifacts set your work beside the chat.\nComputer use in beta—early and rough.\nClick, check, correct; keep a human close.\n\n[Verse 4]\nCode takes longer steps; tasks unfold.\nClaude Code ships; Claude 4 arrives.\nMore power, more questions to examine.\n\n[Final Chorus]\nFive years on, the Institute looks out.\nWork, law, society—track the tide.\nTry, check, revise—keep questions in sight.\n\n[Outro]\nFrom research lab, the tools reach the world.\nWho benefits? What must we watch?\nBuild, check, repeat—the story unfolds.`;

const SECTION_NAMES = [
  'A Research Bet',
  'Principles in the Loop',
  'Claude Steps Out',
  'A Family of Models',
  'From Chat to Computer Use',
  'Code and Agents',
  'The Anthropic Institute',
  'The Open Question'
] as const;
const LYRIC_IN = 3;
const LYRIC_SPACING = 4.5;
const ACT_DURATION = 3 * LYRIC_SPACING;
const FIRST_ACT_END = LYRIC_IN + ACT_DURATION;

export const ANTHROPIC_SECTIONS = SECTION_NAMES.map((name, index) => ({
  name,
  start: index === 0 ? 0 : FIRST_ACT_END + (index - 1) * ACT_DURATION,
  end: index === 0 ? FIRST_ACT_END : FIRST_ACT_END + index * ACT_DURATION,
  firstLine: index * 3,
  count: 3
}));

/** Provisional storyboard landmarks only; replace with measured onsets from the new audio master. */
export const ANTHROPIC_LINE_CUES = [
  'Twenty-twenty-one, a research lab takes shape.',
  'Reliable, robust—systems we can steer.',
  'Interpret the patterns—look inside the lines.',
  'Write the rules; let the model critique.',
  'Revise, re-try; let feedback speak.',
  'Constitutional AI—one method to explore.',
  'Claude in the chat, on A-P-I.',
  'Draft, search, ask—let ideas fly.',
  'Try, check, revise—keep questions in sight.',
  'Haiku quick, Sonnet steady, Opus deep.',
  'Photos, charts, diagrams—new things to read.',
  'Three choices, one family—pick the pace you need.',
  'Artifacts set your work beside the chat.',
  'Computer use in beta—early and rough.',
  'Click, check, correct; keep a human close.',
  'Code takes longer steps; tasks unfold.',
  'Claude Code ships; Claude 4 arrives.',
  'More power, more questions to examine.',
  'Five years on, the Institute looks out.',
  'Work, law, society—track the tide.',
  'Try, check, revise—keep questions in sight.',
  'From research lab, the tools reach the world.',
  'Who benefits? What must we watch?',
  "Build, check, repeat—the story unfolds."
] as const;

export const ANTHROPIC_SYNC_CUES = ANTHROPIC_LINE_CUES.map((label, index) => {
  const at = LYRIC_IN + index * LYRIC_SPACING;
  const to = Math.min(ANTHROPIC_DURATION, at + LYRIC_SPACING);
  const section = ANTHROPIC_SECTIONS.find(s => index >= s.firstLine && index < s.firstLine + s.count)?.name;
  return { at, to, film: [at, to] as [number, number], label, section };
});

export function anthropicSectionAt(time: number): string {
  return ANTHROPIC_SECTIONS.find(section => time >= section.start && time < section.end)?.name || 'End';
}
