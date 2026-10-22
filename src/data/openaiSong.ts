/**
 * openaiSong.ts — the Suno recipe for the OpenAI film, "Still Waiting For Input".
 *
 * Generate in Suno, then send me the MP3 (or a raw URL). I'll run the same
 * measurement pipeline as the other three films: ffmpeg decode → Whisper
 * word timestamps → global force-alignment against this exact lyric sheet →
 * every line pinned to the shot that illustrates it.
 */

export const OA_SUNO_TITLE = 'Still Waiting For Input';

export const OA_SUNO_STYLE_PROMPT =
  'cinematic electronic art-pop that grows from intimate to vast, 108 BPM, C minor, 4/4; ' +
  'opens almost silent with a single felt piano, close-mic breathy male lead vocal and the ' +
  'faint tick of a typing cursor as percussion; verse two adds warm analog pads, soft sub ' +
  'bass and brushed electronic drums; pre-chorus lifts with an arpeggiated glass-synth figure ' +
  'and rising strings; choruses are huge, bright and hopeful with stacked male and female ' +
  'gang harmonies, four-on-the-floor kick, handclaps and a soaring sawtooth hook; the ' +
  'boardroom bridge drops to half time, almost a cappella, cold room reverb, lone piano and ' +
  'a single sustained cello; then a long patient build with tremolo strings into the biggest ' +
  'final chorus; ends intimate again on solo piano and one voice with the cursor tick ' +
  'returning; awed, hopeful, slightly uneasy, documentary-score feeling; pristine modern ' +
  'mix with analog warmth and wide stereo pads';

export const OA_SUNO_EXCLUDE =
  'rap, trap hi-hats, heavy metal, screamo, banjo, chiptune, lo-fi hiss, mumbled vocals, dubstep drop';

/** Paste verbatim into Suno's Custom Mode lyrics box. */
export const OA_SUNO_LYRICS = `[Intro - felt piano and a cursor tick, 8 bars]

[Verse 1 - close, almost whispered]
In a room in the winter they wrote down a line
Build the brightest thing and then give it away
A billion in pledges and a promise too big
For anybody standing there that day

[Verse 2 - drums enter]
It learned by playing itself ten million times
It turned a cube in the dark with a borrowed hand
Then a quiet little paper nobody read
Said predict the next word and you'll understand

[Pre-Chorus - lift]
And the line on the paper didn't bend
It just kept going, it just kept going

[Chorus - huge, bright]
So we built a box and we left it open
Still waiting for input, still waiting for you
Type anything, the cursor's blinking
Oh, the strangest thing we ever grew
Still waiting, still waiting for input

[Verse 3 - driving]
They held one back 'cause they didn't know what it'd do
Then they capped the upside just to pay for the lights
A hundred and seventy-five billion weights
And it learned a new language overnight

[Verse 4]
It wrote the code from a comment and a name
It painted an otter that was never alive
But the thing that changed it wasn't any of that
It was learning which answer we'd prefer

[Bridge - half time, cold, nearly a cappella]
Then a Friday in November took the chair away
And the room went quiet as a stone
Seven hundred and forty-five names on a page
Said we're not doing this alone
(we're not doing this alone)
By the Wednesday he was back in the chair
And nobody could say who was in charge
Nobody could say who was in charge

[Build - strings, slow rise]
Then it listened, and it looked, and it spoke out loud
Then it stopped and thought before it answered me
Half a trillion poured in concrete in the sand
And the nonprofit became a shareholder

[Final Chorus - biggest, stacked]
So we built a box and we left it open
Still waiting for input, still waiting for you
A billion a week with a question ready
Oh, the strangest thing we ever grew
Still waiting, still waiting for input

[Outro - solo piano, one voice, cursor tick]
It started as a letter about everyone
It ended as a cursor on a screen
We measured all the things that we could measure
And we never measured what it means
still waiting
still waiting for input`;

export interface OaSection {
  /** relative position in the finished track, 0..1 — replaced by measured seconds */
  at: number;
  label: string;
  act: number;
  /** nominal film seconds this section should sweep */
  film: [number, number];
  note: string;
}

/** The intended song → film mapping, act by act. */
export const OA_SECTION_PLAN: OaSection[] = [
  { at: 0.00, label: 'Intro', act: 1, film: [0, 4], note: 'the lit room before the letter opens' },
  { at: 0.06, label: 'Verse 1', act: 1, film: [0, 16], note: '2015 letter, the pledge, the wager' },
  { at: 0.15, label: 'Verse 2', act: 1, film: [16, 32], note: 'self-play, the cube, GPT-1' },
  { at: 0.24, label: 'Pre-Chorus', act: 2, film: [48, 56], note: 'the scaling line refusing to bend' },
  { at: 0.30, label: 'Chorus 1', act: 3, film: [88, 96], note: 'the chat box and the crowd' },
  { at: 0.41, label: 'Verse 3', act: 2, film: [32, 64], note: 'GPT-2 held back, the cap, GPT-3' },
  { at: 0.50, label: 'Verse 4', act: 3, film: [64, 88], note: 'Codex, DALL·E, RLHF' },
  { at: 0.58, label: 'Bridge', act: 4, film: [112, 130], note: 'the board, the letter, the return' },
  { at: 0.70, label: 'Build', act: 5, film: [130, 192], note: 'GPT-4o, o1, Stargate, the recapitalisation' },
  { at: 0.82, label: 'Final Chorus', act: 7, film: [192, 206], note: 'a billion weekly users' },
  { at: 0.92, label: 'Outro', act: 7, film: [206, 216], note: 'the open question and the curtain call' }
];

/** Key lines that must land on specific shots — the anchors I'll align to. */
export const OA_ANCHORS: Array<{ lyric: string; film: number; shot: string }> = [
  { lyric: 'In a room in the winter they wrote down a line', film: 3, shot: 'oa1-1 · the letter unfolding' },
  { lyric: 'It learned by playing itself ten million times', film: 18, shot: 'oa1-3 · the self-play arena' },
  { lyric: "predict the next word and you'll understand", film: 27, shot: 'oa1-4 · GPT-1 and the first caret' },
  { lyric: "the line on the paper didn't bend", film: 50, shot: 'oa2-3 · the scaling plot' },
  { lyric: 'we built a box and we left it open', film: 90, shot: 'oa3-4 · the chat box launch' },
  { lyric: "They held one back", film: 34, shot: 'oa2-1 · GPT-2 behind glass' },
  { lyric: 'A hundred and seventy-five billion weights', film: 58, shot: 'oa2-4 · GPT-3' },
  { lyric: 'It painted an otter that was never alive', film: 74, shot: 'oa3-2 · DALL·E resolving' },
  { lyric: "learning which answer we'd prefer", film: 83, shot: 'oa3-3 · RLHF preference pick' },
  { lyric: 'a Friday in November took the chair away', film: 114, shot: 'oa4-3 · the empty chair' },
  { lyric: 'Seven hundred and forty-five names on a page', film: 123, shot: 'oa4-4 · the signatures' },
  { lyric: 'it stopped and thought before it answered me', film: 140, shot: 'oa5-2 · the thinking ring' },
  { lyric: 'Half a trillion poured in concrete', film: 164, shot: 'oa6-1 · Stargate' },
  { lyric: 'the nonprofit became a shareholder', film: 180, shot: 'oa6-3 · the PBC recapitalisation' },
  { lyric: 'A billion a week with a question ready', film: 194, shot: 'oa7-1 · the field of carets' },
  { lyric: 'we never measured what it means', film: 208, shot: 'oa7-3 · the unticked box' },
  { lyric: 'still waiting for input', film: 214, shot: 'oa7-4 · the curtain call' }
];
