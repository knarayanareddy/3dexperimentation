/**
 * openaiSync.ts — Measured sync for the Suno master "sparks in the machine.mp3".
 *
 * Generated via Suno v3.5/v4 from the custom lyrical score:
 *   - Total Duration: 314.36 s
 *   - Measured BPM: 113.2 BPM (4/4 time signature)
 *   - 63 measured lyric cues aligned across 7 historical acts
 *   - Mid/side vocal energy extraction with onset alignment
 *   - Includes Suno's vocal repeats:
 *       • Verse 2: "A robot hand that twists a cube..." (repeated)
 *       • Verse 3: "A billion from the northern cloud..." (repeated)
 *       • Final Chorus: "We are breaking the wall of time!" (repeated)
 *       • Climax and sustained outro through 314.36s
 *
 * Each measured cue drives its corresponding painted scene in the generative film.
 */

export const OA_TRACK_URL = '/sparks-in-the-machine.mp3';
export const OA_TRACK_TITLE = 'Sparks in the Machine';
export const OA_TRACK_DURATION = 314.36;
export const OA_TRACK_BPM = 113;

export interface OpenAISyncCue {
  at: number;
  to: number;
  film: [number, number];
  label: string;
  section: string;
}

export const OA_SYNC_CUES: OpenAISyncCue[] = [
  // Intro - establishing the rainy Silicon Valley night
  { at: 0.00, to: 17.50, film: [0.0, 4.0], label: 'ambient synth & piano intro', section: 'Intro' },

  // Act 1: The Rosewood Covenant (film 0-32s)
  { at: 17.50, to: 23.50, film: [4.0, 8.0], label: 'A quiet room in Menlo Park, December in the rain', section: 'Verse 1' },
  { at: 23.50, to: 29.50, film: [8.0, 11.5], label: 'A promise made in candlelight to never play the game', section: 'Verse 1' },
  { at: 29.50, to: 35.50, film: [11.5, 14.5], label: 'No shareholders, no market greed, just paper on the plate', section: 'Verse 1' },
  { at: 35.50, to: 41.50, film: [14.5, 17.5], label: 'To build the mind before the rest, and give it to the state', section: 'Verse 1' },
  { at: 41.50, to: 47.50, film: [17.5, 20.5], label: 'We carried tables to the loft, the Mission in the cold', section: 'Verse 1' },
  { at: 47.50, to: 54.00, film: [20.5, 24.0], label: 'Equations on a whiteboard where the future would unfold', section: 'Verse 1' },
  { at: 54.00, to: 58.00, film: [24.0, 32.0], label: 'the compute cliff and physical limits', section: 'Turn' },

  // Act 2: Games and Metal (film 32-62s)
  { at: 58.00, to: 67.50, film: [32.0, 37.0], label: 'A robot hand that twists a cube through simulated sky', section: 'Verse 2' },
  { at: 67.50, to: 75.50, film: [37.0, 42.0], label: 'A robot hand that twists a cube through simulated sky', section: 'Verse 2' },
  { at: 75.50, to: 83.50, film: [42.0, 48.0], label: 'Five neural nets in battle lines that never wonder why', section: 'Verse 2' },
  { at: 83.50, to: 89.50, film: [48.0, 54.0], label: 'And Ilya watching tokens fall like snow upon the screen', section: 'Verse 2' },
  { at: 89.50, to: 98.00, film: [54.0, 62.0], label: 'Saying if you guess the very next, you grasp the whole machine', section: 'Verse 2' },

  // Act 3: The Capped-Profit Crossroads (film 62-92s)
  { at: 98.00, to: 102.50, film: [62.0, 65.5], label: 'And the money goes fast when the models grow', section: 'Pre-Chorus' },
  { at: 102.50, to: 107.00, film: [65.5, 69.0], label: 'And the charity ceiling is cracking below', section: 'Pre-Chorus' },
  { at: 107.00, to: 111.50, film: [69.0, 73.0], label: 'Do we stay in the dark where the saints remain?', section: 'Pre-Chorus' },
  { at: 111.50, to: 116.50, film: [73.0, 77.0], label: 'Or buy the fire and bear the chain?', section: 'Pre-Chorus' },

  // Chorus 1 - The $1B Microsoft Alliance & Capped Profit (film 77-92s)
  { at: 116.50, to: 120.50, film: [77.0, 81.0], label: 'Catch the spark inside the machine', section: 'Chorus 1' },
  { at: 120.50, to: 124.50, film: [81.0, 85.0], label: 'Brightest fire the world has seen', section: 'Chorus 1' },
  { at: 124.50, to: 128.50, film: [85.0, 88.0], label: 'Feed the wire, let the numbers climb', section: 'Chorus 1' },
  { at: 128.50, to: 132.50, film: [88.0, 90.0], label: 'We are breaking the wall of time', section: 'Chorus 1' },
  { at: 132.50, to: 136.50, film: [90.0, 91.0], label: 'Hold the charter, guard the door', section: 'Chorus 1' },
  { at: 136.50, to: 140.50, film: [91.0, 91.5], label: 'Nothing will be like it was before', section: 'Chorus 1' },
  { at: 140.50, to: 143.50, film: [91.5, 92.0], label: 'Catch the spark, let the lightning run', section: 'Chorus 1' },
  { at: 143.50, to: 148.00, film: [92.0, 96.0], label: 'To benefit everyone!', section: 'Chorus 1' },

  // Act 4: The Scaling Hypothesis & GPT-3 (film 92-124s)
  { at: 148.00, to: 155.00, film: [96.0, 101.0], label: 'A billion from the northern cloud, the server racks ignited', section: 'Verse 3' },
  { at: 155.00, to: 162.00, film: [101.0, 106.0], label: 'A billion from the northern cloud, the server racks ignited', section: 'Verse 3' },
  { at: 162.00, to: 169.00, film: [106.0, 111.0], label: 'A hundred billion weights of stone, the human tongue rewritten', section: 'Verse 3' },
  { at: 169.00, to: 175.00, film: [111.0, 116.0], label: 'No semicolons, no syntax rules, just tell it what you feel', section: 'Verse 3' },
  { at: 175.00, to: 182.00, film: [116.0, 120.0], label: 'The poets and the engineers are kneeling at the wheel', section: 'Verse 3' },

  // Act 5: The November Spark & ChatGPT Explosion (film 124-156s)
  { at: 182.00, to: 189.00, film: [120.0, 124.0], label: 'Then eleven walked out into the night to build a safer cage', section: 'Verse 4' },
  { at: 189.00, to: 195.50, film: [124.0, 132.0], label: 'And the quiet preview on a Wednesday blew across the stage', section: 'Verse 4' },
  { at: 195.50, to: 201.50, film: [132.0, 140.0], label: 'A hundred million knocking on the door in sixty days', section: 'Verse 4' },
  { at: 201.50, to: 208.50, film: [140.0, 156.0], label: 'The servers melting in the racks, the world caught in a blaze', section: 'Verse 4' },

  // Act 6: Five Days in November (film 156-188s)
  { at: 208.50, to: 212.50, film: [156.0, 160.0], label: 'Then a Google Meet at noon', section: 'Bridge' },
  { at: 212.50, to: 215.50, film: [160.0, 164.0], label: 'And the room went cold and bare', section: 'Bridge' },
  { at: 215.50, to: 219.00, film: [164.0, 167.0], label: 'A sentence dropped like winter stone:', section: 'Bridge' },
  { at: 219.00, to: 223.00, film: [167.0, 170.0], label: '"You\'re not the leader there."', section: 'Bridge' },
  { at: 223.00, to: 226.50, film: [170.0, 172.0], label: 'The laptops shut, the hallway froze', section: 'Bridge' },
  { at: 226.50, to: 230.00, film: [172.0, 174.0], label: 'The Friday turned to ash', section: 'Bridge' },
  { at: 230.00, to: 233.50, film: [174.0, 176.0], label: 'They thought the board had won the day', section: 'Bridge' },
  { at: 233.50, to: 237.00, film: [176.0, 178.0], label: 'Without a single clash', section: 'Bridge' },
  { at: 237.00, to: 240.50, film: [178.0, 180.0], label: 'Until seven hundred names went down', section: 'Bridge' },
  { at: 240.50, to: 244.00, film: [180.0, 183.0], label: '"Bring him back or we walk out now."', section: 'Bridge' },
  { at: 244.00, to: 247.50, film: [183.0, 185.0], label: 'The midnight clock, the early sun', section: 'Bridge' },
  { at: 247.50, to: 251.50, film: [185.0, 188.0], label: 'You cannot kill what we\'ve begun!', section: 'Bridge' },

  // Act 7: The Thinking Machine & Beyond (film 188-216s)
  { at: 251.50, to: 255.50, film: [188.0, 192.0], label: 'Now the strawberry blooms in the crimson light', section: 'Build' },
  { at: 255.50, to: 259.50, film: [192.0, 195.0], label: 'It doesn\'t just guess, it thinks through the night', section: 'Build' },
  { at: 259.50, to: 263.50, film: [195.0, 199.0], label: 'Five gigawatts under a desert sky', section: 'Build' },
  { at: 263.50, to: 267.50, film: [199.0, 202.0], label: 'We turned the earth to a thinking mind!', section: 'Build' },

  // Final Chorus - Maximum energy climax
  { at: 267.50, to: 271.50, film: [202.0, 204.0], label: 'Catch the spark inside the machine!', section: 'Final Chorus' },
  { at: 271.50, to: 275.50, film: [204.0, 206.0], label: 'Brightest fire the world has seen!', section: 'Final Chorus' },
  { at: 275.50, to: 279.50, film: [206.0, 208.0], label: 'Feed the wire, let the numbers climb', section: 'Final Chorus' },
  { at: 279.50, to: 283.50, film: [208.0, 209.0], label: 'We are breaking the wall of time!', section: 'Final Chorus' },
  { at: 283.50, to: 287.50, film: [209.0, 210.0], label: 'We are breaking the wall of time!', section: 'Final Chorus' },
  { at: 287.50, to: 291.50, film: [210.0, 211.0], label: 'Hold the charter, guard the door', section: 'Final Chorus' },
  { at: 291.50, to: 295.50, film: [211.0, 212.0], label: 'Nothing will be like it was before!', section: 'Final Chorus' },
  { at: 295.50, to: 298.50, film: [212.0, 213.0], label: 'Catch the spark, let the lightning run', section: 'Final Chorus' },
  { at: 298.50, to: 303.00, film: [213.0, 214.0], label: 'To benefit everyone!', section: 'Final Chorus' },

  // Outro - Refined piano fade
  { at: 303.00, to: 306.50, film: [214.0, 214.8], label: 'Ten years from a dinner in the snow', section: 'Outro' },
  { at: 306.50, to: 309.50, film: [214.8, 215.4], label: 'Where does the thinking go?', section: 'Outro' },
  { at: 309.50, to: 312.00, film: [215.4, 215.8], label: 'Catch the spark...', section: 'Outro' },
  { at: 312.00, to: 314.36, film: [215.8, 216.0], label: 'musical tail and fade out', section: 'Outro Tail' }
];

export function filmTimeForOpenAISong(songSec: number): number {
  const cues = OA_SYNC_CUES;
  if (songSec <= cues[0].at) return cues[0].film[0];
  for (let i = 0; i < cues.length; i++) {
    const cue = cues[i];
    if (songSec >= cue.at && songSec < cue.to) {
      const k = (songSec - cue.at) / Math.max(0.001, cue.to - cue.at);
      return cue.film[0] + (cue.film[1] - cue.film[0]) * k;
    }
    const next = cues[i + 1];
    if (next && songSec >= cue.to && songSec < next.at) {
      const k = (songSec - cue.to) / Math.max(0.001, next.at - cue.to);
      const eased = k * k * (3 - 2 * k);
      return cue.film[1] + (next.film[0] - cue.film[1]) * eased;
    }
  }
  return 216;
}

export function openaiSongTimeForFilm(filmSec: number): number {
  const cues = OA_SYNC_CUES;
  if (filmSec <= cues[0].film[0]) return cues[0].at;
  for (let i = 0; i < cues.length; i++) {
    const cue = cues[i];
    const [f0, f1] = cue.film;
    if (f1 > f0 && filmSec >= f0 && filmSec < f1) {
      const k = (filmSec - f0) / (f1 - f0);
      return cue.at + (cue.to - cue.at) * k;
    }
    const next = cues[i + 1];
    if (next && filmSec >= f1 && filmSec < next.film[0]) {
      const k = (filmSec - f1) / Math.max(0.001, next.film[0] - f1);
      return cue.to + (next.at - cue.to) * k;
    }
  }
  return OA_TRACK_DURATION;
}

export function openaiSectionAt(songSec: number): string {
  return OA_SYNC_CUES.find(c => songSec >= c.at && songSec < c.to)?.section || 'Outro';
}
