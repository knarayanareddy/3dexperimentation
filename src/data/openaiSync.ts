/**
 * Measured sync for the supplied Suno render "still waiting for input.mp3".
 *
 * Measurement pipeline:
 *   1. MP3 metadata supplied the exact lyric sequence.
 *   2. Whisper base.en recovered word timestamps from the 16 kHz decode.
 *   3. The expected 386 lyric words were globally force-aligned against 385
 *      recognised tokens (dynamic programming, phonetic-tolerant matching).
 *
 * Real arrangement facts:
 *   duration: 264.02 s
 *   first lyric: 17.00 s
 *   one self-play line in metadata is not repeated in the audio
 *   "we're not doing this alone" is sung twice, not three times
 *   final chorus repeats "still waiting for input"
 *   ~12 s instrumental space before the outro; musical tail after 241 s
 *
 * Song Mode remains caption-free; labels below are diagnostics only.
 */

export const OA_TRACK_URL =
  'https://raw.githubusercontent.com/knarayanareddy/ikea3dbuilder/main/still%20waiting%20for%20input.mp3';

export const OA_TRACK_TITLE = 'Still Waiting For Input';
export const OA_TRACK_DURATION = 264.02;
export const OA_TRACK_BPM = 108;
export const OA_FIRST_VOCAL = 17.00;
export const OA_LAST_VOCAL = 241.00;

export interface OpenAISyncCue {
  at: number;
  to: number;
  film: [number, number];
  label: string;
  section: string;
}

export const OA_SYNC_CUES: OpenAISyncCue[] = [
  { at: 0.00, to: 17.00, film: [0.0, 0.8], label: 'felt-piano instrumental intro', section: 'Intro' },

  // Founding promise and the wager.
  { at: 17.00, to: 21.00, film: [0.8, 4.0], label: 'In a room in the winter they wrote down a line', section: 'Verse 1' },
  { at: 21.00, to: 25.09, film: [4.0, 8.0], label: 'Build the brightest thing and then give it away', section: 'Verse 1' },
  { at: 25.13, to: 30.00, film: [8.0, 12.0], label: 'A billion in pledges and a promise too big', section: 'Verse 1' },
  { at: 30.00, to: 34.00, film: [12.0, 16.0], label: 'For anybody standing there that day', section: 'Verse 1' },

  // Self-play, dexterity and GPT-1. The duplicate self-play line in ID3 is not
  // present in the sung audio, so only the measured occurrence is represented.
  { at: 34.00, to: 38.00, film: [16.0, 20.0], label: 'It learned by playing itself ten million times', section: 'Verse 2' },
  { at: 38.00, to: 43.00, film: [20.0, 24.0], label: 'It turned a cube in the dark with a borrowed hand', section: 'Verse 2' },
  { at: 43.00, to: 47.26, film: [24.0, 27.0], label: 'Then a quiet little paper nobody read', section: 'Verse 2' },
  { at: 47.30, to: 53.22, film: [27.0, 32.0], label: "Predict the next word and you'll understand", section: 'Verse 2' },

  // Scaling laws.
  { at: 53.26, to: 56.35, film: [48.0, 52.0], label: "The line on the paper didn't bend", section: 'Pre-Chorus' },
  { at: 56.35, to: 63.00, film: [52.0, 56.0], label: 'It just kept going, it just kept going', section: 'Pre-Chorus' },

  // First chorus: montage into the text-box launch.
  { at: 63.00, to: 67.00, film: [80.0, 84.0], label: 'We built a box and we left it open', section: 'Chorus 1' },
  { at: 67.00, to: 72.27, film: [84.0, 88.0], label: 'Still waiting for input, still waiting for you', section: 'Chorus 1' },
  { at: 72.31, to: 77.36, film: [88.0, 92.0], label: "Type anything, the cursor's blinking", section: 'Chorus 1' },
  { at: 77.40, to: 81.57, film: [92.0, 96.0], label: 'The strangest thing we ever grew', section: 'Chorus 1' },
  { at: 81.57, to: 85.00, film: [96.0, 96.0], label: 'instrumental chorus turn', section: 'Instrumental' },
  { at: 85.00, to: 90.00, film: [88.0, 96.0], label: 'Still waiting, still waiting for input', section: 'Chorus 1' },

  // GPT-2, capped-profit structure and GPT-3.
  { at: 90.00, to: 93.00, film: [32.0, 40.0], label: "They held one back, didn't know what it would do", section: 'Verse 3' },
  { at: 93.00, to: 96.91, film: [40.0, 48.0], label: 'Capped the upside just to pay for the lights', section: 'Verse 3' },
  { at: 96.95, to: 98.00, film: [56.0, 60.0], label: 'A hundred and seventy-five billion weights', section: 'Verse 3' },
  { at: 98.00, to: 100.22, film: [60.0, 64.0], label: 'It learned a new language overnight', section: 'Verse 3' },

  // Codex, DALL·E and preference learning.
  { at: 100.26, to: 102.96, film: [64.0, 72.0], label: 'It wrote the code from a comment and a name', section: 'Verse 4' },
  { at: 103.00, to: 105.00, film: [72.0, 80.0], label: 'It painted an otter that was never alive', section: 'Verse 4' },
  { at: 105.00, to: 107.00, film: [80.0, 84.0], label: "The thing that changed it wasn't any of that", section: 'Verse 4' },
  { at: 107.00, to: 110.00, film: [84.0, 88.0], label: "It was learning which answer we'd prefer", section: 'Verse 4' },

  // Five days in November.
  { at: 110.00, to: 113.18, film: [112.0, 116.0], label: 'A Friday in November took the chair away', section: 'Bridge' },
  { at: 113.22, to: 119.00, film: [116.0, 121.0], label: 'The room went quiet as a stone', section: 'Bridge' },
  { at: 120.27, to: 122.00, film: [121.0, 125.0], label: 'Seven hundred and forty-five names on a page', section: 'Bridge' },
  { at: 122.00, to: 125.00, film: [125.0, 127.0], label: "We're not doing this alone", section: 'Bridge' },
  { at: 125.00, to: 128.09, film: [127.0, 129.0], label: "We're not doing this alone", section: 'Bridge' },
  { at: 128.13, to: 131.00, film: [129.0, 130.0], label: 'By Wednesday he was back in the chair', section: 'Bridge' },
  { at: 131.00, to: 136.00, film: [121.0, 126.0], label: 'Nobody could say who was in charge', section: 'Bridge' },
  { at: 136.00, to: 140.62, film: [126.0, 130.0], label: 'Nobody could say who was in charge', section: 'Bridge' },

  // Senses, test-time reasoning, Stargate and recapitalisation.
  { at: 140.66, to: 145.13, film: [130.0, 138.0], label: 'It listened, looked, and spoke out loud', section: 'Build' },
  { at: 145.17, to: 149.00, film: [138.0, 146.0], label: 'It stopped and thought before it answered', section: 'Build' },
  { at: 149.00, to: 153.10, film: [162.0, 170.0], label: 'Half a trillion poured in concrete in the sand', section: 'Build' },
  { at: 153.14, to: 161.00, film: [178.0, 185.0], label: 'The nonprofit became a shareholder', section: 'Build' },

  // Final chorus: return to the box, then present-day scale and the open question.
  { at: 161.00, to: 165.00, film: [88.0, 92.0], label: 'We built a box and we left it open', section: 'Final Chorus' },
  { at: 165.00, to: 170.00, film: [92.0, 96.0], label: 'Still waiting for input, still waiting for you', section: 'Final Chorus' },
  { at: 170.00, to: 175.00, film: [192.0, 199.0], label: 'A billion a week with a question ready', section: 'Final Chorus' },
  { at: 175.00, to: 179.10, film: [199.0, 206.0], label: 'The strangest thing we ever grew', section: 'Final Chorus' },
  { at: 179.14, to: 189.25, film: [206.0, 211.0], label: 'Still waiting, still waiting for input', section: 'Final Chorus' },
  { at: 189.25, to: 198.00, film: [211.0, 214.0], label: 'Still waiting, still waiting for input', section: 'Final Chorus' },
  { at: 198.00, to: 210.00, film: [214.0, 214.0], label: 'instrumental space before the outro', section: 'Instrumental' },

  // Outro: letter, cursor, measured/unmeasured, curtain.
  { at: 210.00, to: 220.00, film: [0.0, 8.0], label: 'It started as a letter about everyone', section: 'Outro' },
  { at: 220.00, to: 225.00, film: [211.0, 214.0], label: 'It ended as a cursor on a screen', section: 'Outro' },
  { at: 225.00, to: 230.00, film: [206.0, 208.5], label: 'We measured all the things we could measure', section: 'Outro' },
  { at: 230.00, to: 236.10, film: [208.5, 211.0], label: 'We never measured what it means', section: 'Outro' },
  { at: 236.14, to: 241.00, film: [211.0, 216.0], label: 'Still waiting for input', section: 'Outro' },
  { at: 241.00, to: 264.02, film: [216.0, 216.0], label: 'musical tail', section: 'Outro Tail' }
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

/**
 * Song mode is intentionally a montage and revisits early shots. For chapter
 * navigation, choose the latest matching cue for the closing frames and the
 * earliest one otherwise.
 */
export function openAISongTimeForFilm(filmSec: number): number {
  const matches = OA_SYNC_CUES.filter(c => c.film[1] > c.film[0] && filmSec >= c.film[0] && filmSec < c.film[1]);
  if (!matches.length) return filmSec <= 0 ? 0 : OA_TRACK_DURATION;
  const preferLatest = filmSec >= 206;
  const cue = preferLatest ? matches[matches.length - 1] : matches[0];
  const k = (filmSec - cue.film[0]) / Math.max(0.001, cue.film[1] - cue.film[0]);
  return cue.at + (cue.to - cue.at) * Math.max(0, Math.min(1, k));
}

export function openAISectionAt(songSec: number): string {
  return OA_SYNC_CUES.find(c => songSec >= c.at && songSec < c.to)?.section || 'Outro';
}