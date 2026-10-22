/**
 * openaiSong.ts — Suno AI generation recipe for "Sparks in the Machine".
 *
 * Designed for Suno v3.5 / v4 Custom Mode:
 *   - Style Prompt: Driving cinematic electro-pop / synthwave rock, 112 BPM.
 *   - Full lyrical narrative matching the 7 acts (from Rosewood 2015 to o1 and Stargate).
 *   - Verbatim section plan and visual anchors so the audio can be measured
 *     and force-aligned with Whisper when the MP3 is generated.
 */

export const OA_SUNO_TITLE = 'Sparks in the Machine';

export const OA_SUNO_STYLE_PROMPT =
  'cinematic electro-pop, driving synthwave with indie-rock emotion, 112 BPM, D minor, 4/4; ' +
  'starts sparse with warm analog synthesizer pads, delicate piano chords and an intimate male lead vocal; ' +
  'verse two brings in a crisp 80s drum groove, pulsing bassline, and subtle electric guitar arpeggios; ' +
  'pre-chorus builds tension with rising white-noise risers and layered vocal harmonies; ' +
  'chorus explodes wide and anthemic with soaring vocals, massive four-on-the-floor kick, lush supersaw leads, and stacked gang harmonies; ' +
  'the "November coup" bridge drops to dramatic half-time with clock ticks, distorted bass, and desperate vocal whispers; ' +
  'then a colossal crescendo build with pounding tom fills and rising synth sweeps into a transcendent final double chorus; ' +
  'outro fades on quiet piano, soft synth pad and a single reflective whisper; ' +
  'polished modern production, emotional, propulsive, epic, bittersweet';

export const OA_SUNO_EXCLUDE =
  'country, acoustic banjo, heavy metal growl, screamo, trap stutter hi-hats, autotune mumble, polka, lo-fi hiss';

/** Paste verbatim into Suno's Custom Mode lyrics box. */
export const OA_SUNO_LYRICS = `[Intro - warm synth pads, sparse piano chords, 8 bars]

[Verse 1 - intimate, quiet vocal]
A quiet room in Menlo Park, December in the rain
A promise made in candlelight to never play the game
No shareholders, no market greed, just paper on the plate
To build the mind before the rest, and give it to the state
We carried tables to the loft, the Mission in the cold
Equations on a whiteboard where the future would unfold

[Verse 2 - drums enter, steady pulse]
A robot hand that twists a cube through simulated sky
Five neural nets in battle lines that never wonder why
And Ilya watching tokens fall like snow upon the screen
Saying if you guess the very next, you grasp the whole machine

[Pre-Chorus - rising synth arp, tension builds]
And the money goes fast when the models grow
And the charity ceiling is cracking below
Do we stay in the dark where the saints remain?
Or buy the fire and bear the chain?

[Chorus - wide, anthemic, neon explosion]
Catch the spark inside the machine
Brightest fire the world has seen
Feed the wire, let the numbers climb
We are breaking the wall of time
Hold the charter, guard the door
Nothing will be like it was before
Catch the spark, let the lightning run
To benefit everyone!

[Verse 3 - driving motorik groove]
A billion from the northern cloud, the server racks ignited
A hundred billion weights of stone, the human tongue rewritten
No semicolons, no syntax rules, just tell it what you feel
The poets and the engineers are kneeling at the wheel

[Verse 4 - darker, bass pulse]
Then eleven walked out into the night to build a safer cage
And the quiet preview on a Wednesday blew across the stage
A hundred million knocking on the door in sixty days
The servers melting in the racks, the world caught in a blaze

[Bridge - half-time, dramatic, clock ticking, stripped back]
Then a Google Meet at noon
And the room went cold and bare
A sentence dropped like winter stone:
"You're not the leader there."
The laptops shut, the hallway froze
The Friday turned to ash
They thought the board had won the day
Without a single clash
Until seven hundred names went down
"Bring him back or we walk out now."
The midnight clock, the early sun
You cannot kill what we've begun!

[Build - rising drums, arpeggios soaring]
Now the strawberry blooms in the crimson light
It doesn't just guess, it thinks through the night
Five gigawatts under a desert sky
We turned the earth to a thinking mind!

[Final Chorus - colossal, stacked harmonies, maximum energy]
Catch the spark inside the machine!
Brightest fire the world has seen!
Feed the wire, let the numbers climb
We are breaking the wall of time!
Hold the charter, guard the door
Nothing will be like it was before!
Catch the spark, let the lightning run
To benefit everyone!

[Outro - gentle piano, soft pads, reflective fade]
Ten years from a dinner in the snow
Where does the thinking go?
It was never about the math we made
It was only about the soul we gave
Catch the spark...
Catch the spark...
[fade out on soft unresolved chord]`;

export const OA_SECTION_PLAN = [
  { label: 'Intro', act: 1 },
  { label: 'Verse 1', act: 1 },
  { label: 'Verse 2', act: 2 },
  { label: 'Pre-Chorus', act: 3 },
  { label: 'Chorus 1', act: 3 },
  { label: 'Verse 3', act: 4 },
  { label: 'Verse 4', act: 5 },
  { label: 'Bridge (The Firing)', act: 6 },
  { label: 'Build (Strawberry & Stargate)', act: 7 },
  { label: 'Final Chorus', act: 7 },
  { label: 'Outro', act: 7 }
];

export const OA_ANCHORS = [
  { lyric: 'A quiet room in Menlo Park, December in the rain', shot: 'oa1-1' },
  { lyric: 'We carried tables to the loft, the Mission in the cold', shot: 'oa1-2' },
  { lyric: 'A robot hand that twists a cube through simulated sky', shot: 'oa2-2' },
  { lyric: 'Five neural nets in battle lines that never wonder why', shot: 'oa2-1' },
  { lyric: 'Saying if you guess the very next, you grasp the whole machine', shot: 'oa2-3' },
  { lyric: 'And the charity ceiling is cracking below', shot: 'oa3-1' },
  { lyric: 'A billion from the northern cloud, the server racks ignited', shot: 'oa3-4' },
  { lyric: 'A hundred billion weights of stone, the human tongue rewritten', shot: 'oa4-1' },
  { lyric: 'Then eleven walked out into the night to build a safer cage', shot: 'oa4-3' },
  { lyric: 'And the quiet preview on a Wednesday blew across the stage', shot: 'oa5-1' },
  { lyric: 'A hundred million knocking on the door in sixty days', shot: 'oa5-2' },
  { lyric: 'Then a Google Meet at noon and the room went cold and bare', shot: 'oa6-1' },
  { lyric: 'Until seven hundred names went down: bring him back or we walk out now', shot: 'oa6-3' },
  { lyric: 'Now the strawberry blooms in the crimson light', shot: 'oa7-1' },
  { lyric: 'Five gigawatts under a desert sky', shot: 'oa7-3' },
  { lyric: 'Ten years from a dinner in the snow, where does the thinking go?', shot: 'oa7-4' }
];
