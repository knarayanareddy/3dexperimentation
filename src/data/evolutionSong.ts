/**
 * evolutionSong.ts — the Suno recipe for "The Long Thaw".
 *
 * Generate the track in Suno with the style + lyrics below, then hand me the
 * MP3 and I'll run the same measurement pipeline used for JEV.mp3:
 *   ffmpeg decode → mid/side vocal isolation → hysteresis-gated vocal
 *   envelope → per-section splitting by equal voiced time → every lyric
 *   pinned to the shot that illustrates it.
 *
 * SECTION_PLAN below is the INTENT (which act each section should be showing).
 * The absolute seconds get filled in from the real audio once it exists.
 */

export const EV_SUNO_TITLE = 'The Long Thaw';

export const EV_SUNO_STYLE_PROMPT =
  'cinematic indie-folk-electronica that grows across the song, 102 BPM, A minor, 4/4; ' +
  'opens sparse and cold with fingerpicked acoustic guitar, bowed upright bass and distant ' +
  'piano, a single intimate male lead vocal almost spoken; verse two adds brushed drums and ' +
  'a warm analog synth pad; the "winter" section strips back to lone piano, breathy vocal and ' +
  'icy reversed-reverb textures; then a long slow build with four-on-the-floor kick, ' +
  'handclaps, rising arpeggiated synth and strings; the final two choruses are huge, bright ' +
  'and anthemic with stacked male and female gang harmonies, big live-room drums and soaring ' +
  'strings; ends warm and quiet on solo piano and one voice; thoughtful, hopeful, awed, ' +
  'documentary-score feeling; pristine modern mix with analog warmth';

export const EV_SUNO_EXCLUDE =
  'rap, trap hi-hats, heavy distortion, screamo, chiptune, lo-fi hiss, mumbled vocals, dubstep drop';

/** Paste verbatim into Suno's Custom Mode lyrics box. */
export const EV_SUNO_LYRICS = `[Intro - sparse fingerpicked guitar, 8 bars]

[Verse 1 - intimate, almost spoken]
In fifty, in a cold grey room
A man asked something nobody could prove
So he threw the question out instead
And built a game you play behind a screen

[Verse 2]
Fifty-six, ten men, one summer long
They swore they'd have it finished by the fall
They gave the dream a name that stuck
And then they found out how far they had to walk

[Pre-Chorus - lift]
And a little machine with a hundred dials
Turned its own knobs when it got it wrong
Nobody told it what the answer was
It just kept moving till the light came on

[Chorus - warm, open]
Oh, the long thaw
It takes longer than they say
Every winter has a seed below the snow
Oh, the long thaw
Nobody saw the shape of it
Till the ice began to go

[Verse 3 - darker, sparser]
We wrote the rules down one by one
Two hundred thousand and it still came undone
Every answer grew another branch
And the money closed up like a tap in a drought

[Bridge - WINTER: lone piano, breathy, half time]
So it froze
And they changed the words on all the forms
And a few of them kept working anyway
In a small warm room
Sending the error backwards through the dark
(backwards through the dark)
Till the hidden layers learned to say
what nobody taught them how to say

[Build - drums enter, slow rise]
Then the pictures came, fourteen million strong
And the gaming cards were built for this all along
Twenty-twelve, the error fell off a cliff
And the whole field turned around to watch it drop

[Chorus 2 - bigger]
Oh, the long thaw
It takes longer than they say
Every winter has a seed below the snow
Oh, the long thaw
Nobody saw the shape of it
Till the ice began to go

[Verse 4 - driving]
Seventeen, they threw the memory out
Said attention is the only thing about
Every word could see the others now
And bigger only ever made it louder

[Final Chorus - huge, stacked harmonies]
Oh, the long thaw
Seventy years in the making
One text box and the whole world came
Oh, the long thaw
It was never about the thinking
It was always what we'd ask it to became

[Outro - solo piano, one voice, quiet]
Fifty years we asked it, can you think
Can you think, can you think
Now we only want to know
what we should let it choose
what we should let it choose`;

export interface EvSection {
  /** relative position in the finished track, 0..1 — replaced by measured seconds */
  at: number;
  label: string;
  act: number;
  /** nominal film seconds this section should sweep */
  film: [number, number];
  note: string;
}

/** The intended song → film mapping, act by act. */
export const EV_SECTION_PLAN: EvSection[] = [
  { at: 0.00, label: 'Intro', act: 1, film: [0, 6], note: 'cold room, chalk dust, before the question' },
  { at: 0.07, label: 'Verse 1', act: 1, film: [0, 16], note: 'Turing 1950, the question struck out, the imitation game' },
  { at: 0.17, label: 'Verse 2', act: 1, film: [16, 24], note: 'Dartmouth 1956, ten chairs, the naming' },
  { at: 0.26, label: 'Pre-Chorus', act: 1, film: [24, 32], note: 'the perceptron turning its own dials' },
  { at: 0.33, label: 'Chorus 1', act: 2, film: [32, 46], note: 'ELIZA and the wall of rules' },
  { at: 0.43, label: 'Verse 3', act: 2, film: [46, 60], note: 'rule explosion, Lighthill, the tap closing' },
  { at: 0.52, label: 'Bridge (winter)', act: 3, film: [60, 84], note: 'the two winters + backprop in the warm room' },
  { at: 0.64, label: 'Build', act: 4, film: [84, 124], note: 'statistics, Deep Blue, ImageNet, GPUs, AlexNet cliff' },
  { at: 0.74, label: 'Chorus 2', act: 5, film: [124, 146], note: 'depth, AlphaGo move 37, scaling laws' },
  { at: 0.82, label: 'Verse 4', act: 6, film: [146, 174], note: 'attention 2017, the arcs, the parameter ladder' },
  { at: 0.89, label: 'Final Chorus', act: 6, film: [174, 200], note: 'ChatGPT night, then multimodal + agents' },
  { at: 0.96, label: 'Outro', act: 7, film: [200, 216], note: 'reflex vs deliberation, then the curtain call' }
];

/** Key lines that MUST land on specific shots — the anchors I'll align to. */
export const EV_ANCHORS: Array<{ lyric: string; film: number; shot: string }> = [
  { lyric: 'he threw the question out instead', film: 4, shot: 'ev1-1 · the struck-out question' },
  { lyric: 'ten men, one summer long', film: 17, shot: 'ev1-3 · Dartmouth chairs' },
  { lyric: 'Turned its own knobs when it got it wrong', film: 27, shot: 'ev1-4 · perceptron dials' },
  { lyric: 'Two hundred thousand and it still came undone', film: 48, shot: 'ev2-3 · the rule wall topples' },
  { lyric: 'the money closed up like a tap', film: 56, shot: 'ev2-4 · the funding tap' },
  { lyric: 'Sending the error backwards through the dark', film: 74, shot: 'ev3-3 · backprop arrows' },
  { lyric: 'fourteen million strong', film: 102, shot: 'ev4-3 · ImageNet mountain' },
  { lyric: 'the error fell off a cliff', film: 119, shot: 'ev5-1 · the 2012 bar chart' },
  { lyric: 'attention is the only thing about', film: 150, shot: 'ev6-1 · the 2017 paper' },
  { lyric: 'One text box and the whole world came', film: 178, shot: 'ev6-4 · the ChatGPT crowd' },
  { lyric: 'what we should let it choose', film: 212, shot: 'ev7-4 · the curtain call' }
];
