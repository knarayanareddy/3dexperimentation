/**
 * uberSong.ts — the Suno recipe for the Uber film, "Press The Button".
 *
 * Generate this in Suno, then send me the MP3 (or a raw URL). I'll run the
 * same measurement pipeline used for the first two films:
 *   ffmpeg decode -> vocal isolation / Whisper word timestamps -> phrase
 *   detection -> every lyric pinned to the shot that illustrates it.
 */

export const UB_SUNO_TITLE = 'Press The Button';

export const UB_SUNO_STYLE_PROMPT =
  'late-night city pop with a driving motorik pulse, 112 BPM, F# minor, 4/4; ' +
  'opens cold and sparse with rain-soaked Rhodes, muted bass and a single close ' +
  'male lead vocal almost whispered; verse two adds a tight disco hi-hat, clipped ' +
  'funk guitar and handclaps; pre-chorus lifts with a rising analog synth arp and ' +
  'filtered white-noise sweep; choruses are wide, neon and euphoric with stacked ' +
  'male and female gang vocals, punchy four-on-the-floor kick and a bright sawtooth ' +
  'hook; the "reckoning" bridge drops to half time, almost a cappella with cold ' +
  'room reverb, sub bass and a lone piano; then a long build back to a huge final ' +
  'chorus with strings and tambourine; ends on soft Rhodes and one voice; ' +
  'nocturnal, propulsive, bittersweet, cinematic; glossy modern mix with analog warmth';

export const UB_SUNO_EXCLUDE =
  'country, banjo, screamo, trap hi-hats, heavy metal, chiptune, lo-fi hiss, mumbled vocals';

/** Paste verbatim into Suno's Custom Mode lyrics box. */
export const UB_SUNO_LYRICS = `[Intro - rain, Rhodes, 8 bars]

[Verse 1 - close, almost whispered]
Paris in the snow and the cabs don't stop
Three go by with the light switched off
We're standing in the cold with an arm in the air
Waiting on a maybe that was never there

[Verse 2 - hi-hat enters]
So we drew it on a napkin, small and dumb
A button and a map and a car that comes
Not a better taxi, not a faster ride
Just the end of never knowing, that's the whole design

[Pre-Chorus - lift]
And the city doesn't ask you how you got here
It only ever asks you where you're going

[Chorus - wide, neon]
Press the button, watch it move
That little light is coming through
Four minutes out and closing in
Oh, the waiting's wearing thin
Press the button, hold the line
Somebody's driving through the night
Two hundred million, every one
Pressing the button

[Verse 3 - driving]
Then the cease and desist came through the door
We dropped a word and we opened more
Four hundred cities and a playbook thin
Launch it on a Tuesday, argue later on the win

[Verse 4]
But the money went out faster than it came
And the thing that made us win was the thing to blame
A billion burned in China for a stake and a bow
The first time growth-at-all-costs lost the room somehow

[Bridge - half time, cold, nearly a cappella]
One engineer sat down and wrote it all
And the whole thing cracked right down the wall
They deleted us in thousands overnight
(the trust was inventory, and we spent it)
An empty chair, a quiet room
Somebody hung a sign up in the gloom
We do the right thing — period
Fix it first, then make it boring

[Build - drums return, slow rise]
Then a road in Arizona took a life
And the bell rang flat on the day we listed
Then the streets went empty and the orders flew
The afterthought was all we had, and it carried us through

[Final Chorus - huge, strings]
Press the button, watch it move
That little light is coming through
Fourteen years to break the line
Now the numbers come out right
Press the button, hold the line
Forty million every night
From a pavement in the snow
To everywhere you go

[Outro - Rhodes, one voice, quiet]
And the car pulls up with nobody inside
Still the same old question, just a different ride
It was never about the engine or the road
It was only ever about not waiting
not waiting
not waiting anymore`;

export interface UbSection {
  /** relative position in the finished track, 0..1 — replaced by measured seconds */
  at: number;
  label: string;
  act: number;
  /** nominal film seconds this section should sweep */
  film: [number, number];
  note: string;
}

/** The intended song → film mapping, act by act. */
export const UB_SECTION_PLAN: UbSection[] = [
  { at: 0.00, label: 'Intro', act: 1, film: [0, 4], note: 'rain, empty street, before the idea' },
  { at: 0.06, label: 'Verse 1', act: 1, film: [0, 8], note: 'Paris 2008, taxis passing, arms in the air' },
  { at: 0.15, label: 'Verse 2', act: 1, film: [8, 24], note: 'the napkin sketch, the pin drop, SF 2010' },
  { at: 0.24, label: 'Pre-Chorus', act: 1, film: [24, 32], note: 'cease-and-desist, the word dropped' },
  { at: 0.30, label: 'Chorus 1', act: 2, film: [32, 62], note: 'UberX, the flywheel, surge, ratings' },
  { at: 0.42, label: 'Verse 3', act: 3, film: [62, 78], note: 'the playbook, the blockades' },
  { at: 0.50, label: 'Verse 4', act: 3, film: [78, 96], note: 'cash burn and the China handover' },
  { at: 0.58, label: 'Bridge', act: 4, film: [96, 124], note: 'the essay, #DeleteUber, empty chair, new sign' },
  { at: 0.70, label: 'Build', act: 5, film: [124, 160], note: 'Tempe, the IPO bell, the pandemic, Prop 22' },
  { at: 0.80, label: 'Final Chorus', act: 6, film: [160, 196], note: 'one app, membership, first profit, the spread' },
  { at: 0.92, label: 'Outro', act: 7, film: [196, 216], note: 'the driverless kerb and the curtain call' }
];

/** Key lines that must land on specific shots — the anchors I'll align to. */
export const UB_ANCHORS: Array<{ lyric: string; film: number; shot: string }> = [
  { lyric: "Paris in the snow and the cabs don't stop", film: 2, shot: 'ub1-1 · taxis passing in the snow' },
  { lyric: 'A button and a map and a car that comes', film: 10, shot: 'ub1-2 · the pin drops' },
  { lyric: 'Then the cease and desist came through the door', film: 25, shot: 'ub1-4 · the stamped notice' },
  { lyric: 'Press the button, watch it move', film: 34, shot: 'ub2-1 · UberX arrives' },
  { lyric: "Oh, the waiting's wearing thin", film: 48, shot: 'ub2-3 · surge in the rain' },
  { lyric: 'Four hundred cities and a playbook thin', film: 64, shot: 'ub3-1 · pins raining on the map' },
  { lyric: 'A billion burned in China', film: 88, shot: 'ub3-4 · the Didi handover' },
  { lyric: 'One engineer sat down and wrote it all', film: 98, shot: 'ub4-1 · the essay multiplying' },
  { lyric: 'They deleted us in thousands overnight', film: 105, shot: 'ub4-2 · #DeleteUber grid' },
  { lyric: 'We do the right thing — period', film: 119, shot: 'ub4-4 · the new sign' },
  { lyric: 'Then a road in Arizona took a life', film: 126, shot: 'ub5-1 · Tempe' },
  { lyric: 'the bell rang flat on the day we listed', film: 134, shot: 'ub5-2 · the IPO bell' },
  { lyric: 'the streets went empty and the orders flew', film: 142, shot: 'ub5-3 · rides down, Eats up' },
  { lyric: 'Fourteen years to break the line', film: 178, shot: 'ub6-3 · the profit line crosses zero' },
  { lyric: 'Forty million every night', film: 192, shot: 'ub7-1 · the constellation of pins' },
  { lyric: 'the car pulls up with nobody inside', film: 206, shot: 'ub7-3 · the empty front seat' },
  { lyric: 'not waiting anymore', film: 214, shot: 'ub7-4 · the curtain call' }
];
