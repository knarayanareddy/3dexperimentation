/**
 * Measured sync for the supplied Suno render "Press The Button.mp3".
 *
 * The MP3 embeds the exact custom lyric sheet. Whisper base.en was run with
 * split-on-word timestamps, then the embedded lyric sequence was globally
 * force-aligned against the 404 recognised word tokens. Result:
 *
 * - duration: 249.60 s
 * - first lyric: 16.28 s
 * - 53 lyric lines aligned; average line confidence is effectively 1.0
 * - a 5.48 s instrumental break precedes "cease and desist"
 * - Suno added a second "To everywhere you go"
 * - "not waiting anymore" is sustained from 216.92 to 242.36 s
 * - a 7.24 s musical tail follows the final vocal
 *
 * Each measured line owns the painted scene that illustrates its content.
 * Song Mode itself remains caption-free.
 */

export const UB_TRACK_URL =
  'https://raw.githubusercontent.com/knarayanareddy/ikea3dbuilder/main/Press%20The%20Button.mp3';

export const UB_TRACK_TITLE = 'Press The Button';
export const UB_TRACK_DURATION = 249.60;
export const UB_TRACK_BPM = 112;
export const UB_FIRST_VOCAL = 16.28;
export const UB_LAST_VOCAL = 242.36;

export interface UberSyncCue {
  /** Absolute song seconds from Whisper word timestamps. */
  at: number;
  to: number;
  /** Nominal painted-film seconds owned by this lyric. */
  film: [number, number];
  label: string;
  section: string;
}

export const UB_SYNC_CUES: UberSyncCue[] = [
  { at: 0.00, to: 16.28, film: [0.0, 0.8], label: 'rain-soaked instrumental intro', section: 'Intro' },

  // Verse 1 - Paris in the snow.
  { at: 16.28, to: 20.19, film: [0.8, 3.0], label: "Paris in the snow and the cabs don't stop", section: 'Verse 1' },
  { at: 20.19, to: 24.32, film: [3.0, 5.0], label: 'Three go by with the light switched off', section: 'Verse 1' },
  { at: 24.32, to: 28.92, film: [5.0, 6.5], label: "We're standing in the cold with an arm in the air", section: 'Verse 1' },
  { at: 28.92, to: 32.28, film: [6.5, 8.0], label: 'Waiting on a maybe that was never there', section: 'Verse 1' },

  // Verse 2 - the product is invented and launched.
  { at: 32.28, to: 36.96, film: [8.0, 10.5], label: 'So we drew it on a napkin, small and dumb', section: 'Verse 2' },
  { at: 36.96, to: 40.60, film: [10.5, 14.0], label: 'A button and a map and a car that comes', section: 'Verse 2' },
  { at: 40.60, to: 44.00, film: [14.0, 18.0], label: 'Not a better taxi, not a faster ride', section: 'Verse 2' },
  { at: 44.00, to: 50.12, film: [18.0, 24.0], label: "Just the end of never knowing, that's the whole design", section: 'Verse 2' },

  // Pre-chorus - cashless completion / destination certainty.
  { at: 50.12, to: 54.76, film: [24.0, 28.0], label: "The city doesn't ask you how you got here", section: 'Pre-Chorus' },
  { at: 54.76, to: 60.80, film: [28.0, 32.0], label: "It only ever asks you where you're going", section: 'Pre-Chorus' },

  // Chorus 1 - UberX, liquidity, surge and reputation.
  { at: 60.80, to: 64.68, film: [32.0, 35.0], label: 'Press the button, watch it move', section: 'Chorus 1' },
  { at: 64.68, to: 68.00, film: [35.0, 39.0], label: 'That little light is coming through', section: 'Chorus 1' },
  { at: 68.00, to: 72.36, film: [39.0, 43.0], label: 'Four minutes out and closing in', section: 'Chorus 1' },
  { at: 72.36, to: 77.32, film: [43.0, 46.0], label: "Oh, the waiting's wearing thin", section: 'Chorus 1' },
  { at: 77.32, to: 79.56, film: [46.0, 50.0], label: 'Press the button, hold the line', section: 'Chorus 1' },
  { at: 79.56, to: 82.24, film: [50.0, 54.0], label: "Somebody's driving through the night", section: 'Chorus 1' },
  { at: 82.24, to: 86.69, film: [54.0, 60.0], label: 'Two hundred million, every one', section: 'Chorus 1' },
  { at: 86.73, to: 88.04, film: [60.0, 62.0], label: 'Pressing the button', section: 'Chorus 1' },
  { at: 88.04, to: 93.52, film: [62.0, 62.0], label: 'instrumental turn', section: 'Instrumental' },

  // Verse 3 - first notice, rename, then the city playbook.
  { at: 93.52, to: 95.64, film: [62.0, 64.0], label: 'Then the cease and desist came through the door', section: 'Verse 3' },
  { at: 95.64, to: 97.68, film: [64.0, 66.0], label: 'We dropped a word and we opened more', section: 'Verse 3' },
  { at: 97.68, to: 100.25, film: [66.0, 69.0], label: 'Four hundred cities and a playbook thin', section: 'Verse 3' },
  { at: 100.29, to: 101.81, film: [69.0, 78.0], label: 'Launch it on a Tuesday, argue later on the win', section: 'Verse 3' },

  // Verse 4 - subsidy burn and China.
  { at: 101.81, to: 104.00, film: [78.0, 82.0], label: 'But the money went out faster than it came', section: 'Verse 4' },
  { at: 104.00, to: 105.88, film: [82.0, 87.0], label: 'The thing that made us win was the thing to blame', section: 'Verse 4' },
  { at: 105.88, to: 107.83, film: [87.0, 92.0], label: 'A billion burned in China for a stake and a bow', section: 'Verse 4' },
  { at: 107.83, to: 109.96, film: [92.0, 96.0], label: 'Growth-at-all-costs lost the room somehow', section: 'Verse 4' },

  // The Reckoning.
  { at: 109.96, to: 112.64, film: [96.0, 100.0], label: 'One engineer sat down and wrote it all', section: 'Bridge' },
  { at: 112.68, to: 114.60, film: [100.0, 103.0], label: 'The whole thing cracked right down the wall', section: 'Bridge' },
  { at: 114.60, to: 116.92, film: [103.0, 108.0], label: 'They deleted us in thousands overnight', section: 'Bridge' },
  { at: 116.92, to: 119.48, film: [108.0, 110.0], label: 'The trust was inventory, and we spent it', section: 'Bridge' },
  { at: 119.48, to: 121.29, film: [110.0, 114.0], label: 'An empty chair, a quiet room', section: 'Bridge' },
  { at: 121.29, to: 123.44, film: [114.0, 118.0], label: 'Somebody hung a sign up in the gloom', section: 'Bridge' },
  { at: 123.44, to: 126.10, film: [118.0, 122.0], label: 'We do the right thing — period', section: 'Bridge' },
  { at: 126.10, to: 127.92, film: [122.0, 124.0], label: 'Fix it first, then make it boring', section: 'Bridge' },

  // Hard lessons - Tempe, IPO, pandemic and the worker question.
  { at: 127.92, to: 136.07, film: [124.0, 132.0], label: 'Then a road in Arizona took a life', section: 'Build' },
  { at: 136.07, to: 143.52, film: [132.0, 140.0], label: 'The bell rang flat on the day we listed', section: 'Build' },
  { at: 143.52, to: 147.28, film: [140.0, 148.0], label: 'The streets went empty and the orders flew', section: 'Build' },
  { at: 147.28, to: 159.96, film: [148.0, 160.0], label: 'The afterthought was all we had, and it carried us through', section: 'Build' },

  // Final chorus - the super-app, membership, profit and present-day scale.
  { at: 159.96, to: 163.92, film: [160.0, 164.0], label: 'Press the button, watch it move', section: 'Final Chorus' },
  { at: 163.96, to: 167.48, film: [164.0, 168.0], label: 'That little light is coming through', section: 'Final Chorus' },
  { at: 167.52, to: 171.24, film: [168.0, 183.0], label: 'Fourteen years to break the line', section: 'Final Chorus' },
  { at: 171.24, to: 177.36, film: [183.0, 190.0], label: 'Now the numbers come out right', section: 'Final Chorus' },
  { at: 177.40, to: 179.16, film: [190.0, 192.0], label: 'Press the button, hold the line', section: 'Final Chorus' },
  { at: 179.16, to: 181.32, film: [192.0, 197.0], label: 'Forty million every night', section: 'Final Chorus' },
  { at: 181.32, to: 183.80, film: [197.0, 200.0], label: 'From a pavement in the snow', section: 'Final Chorus' },
  { at: 183.80, to: 187.84, film: [200.0, 202.0], label: 'To everywhere you go', section: 'Final Chorus' },
  { at: 187.84, to: 192.80, film: [202.0, 204.0], label: 'To everywhere you go', section: 'Final Chorus' },

  // Driverless kerb and curtain call.
  { at: 192.80, to: 196.92, film: [204.0, 210.0], label: 'The car pulls up with nobody inside', section: 'Outro' },
  { at: 196.92, to: 200.79, film: [210.0, 212.0], label: 'Still the same old question, just a different ride', section: 'Outro' },
  { at: 200.79, to: 205.48, film: [212.0, 213.5], label: 'It was never about the engine or the road', section: 'Outro' },
  { at: 205.48, to: 211.36, film: [213.5, 214.7], label: 'It was only ever about not waiting', section: 'Outro' },
  { at: 211.36, to: 216.92, film: [214.7, 215.2], label: 'not waiting', section: 'Outro' },
  { at: 216.92, to: 242.36, film: [215.2, 216.0], label: 'not waiting anymore', section: 'Outro' },
  { at: 242.36, to: 249.60, film: [216.0, 216.0], label: 'musical tail', section: 'Outro Tail' }
];

export function filmTimeForUberSong(songSec: number): number {
  const cues = UB_SYNC_CUES;
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

export function uberSongTimeForFilm(filmSec: number): number {
  const cues = UB_SYNC_CUES;
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
  return UB_TRACK_DURATION;
}

export function uberSectionAt(songSec: number): string {
  return UB_SYNC_CUES.find(c => songSec >= c.at && songSec < c.to)?.section || 'Outro';
}