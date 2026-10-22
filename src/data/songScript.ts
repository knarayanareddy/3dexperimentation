/**
 * songScript.ts — CONTENT-MATCHED sync for the real "JEV.mp3".
 *
 * Timings were measured from the audio, not guessed:
 *   1. ffmpeg decoded the stereo master (207.56 s, 106.5 BPM, beat0 0.383 s).
 *   2. Mid/side split isolated the centre-panned vocal
 *      (mid = 0.5L+0.5R, side = 0.5L-0.5R), band-passed 250-3800 Hz.
 *   3. A vocal-presence envelope (mid minus what the sides explain) was gated
 *      with hysteresis at 100 fps -> 142 vocal fragments; first word at 13.23 s.
 *   4. Each section was divided into exactly as many lines as it has lyrics by
 *      EQUAL CUMULATIVE VOICED TIME, every boundary snapped to a real onset.
 *
 * THE FIX THAT MATTERED: previously the film ranges were assigned by section
 * order, so the 1865 / Jevons visuals began at song 31.6 s while the lyric
 * "Eighteen sixty-five..." is not sung until 50.8 s - the picture ran 19 s
 * ahead. Every lyric is now pinned to the shot that ILLUSTRATES it:
 *
 *   "Eighteen sixty-five, a man named Jevons knew" -> film 26 s (the 1865 reveal)
 *   "Unstructured going in"                        -> film 50 s (JEV named, 70 ms)
 *   "Noul says true, and it says how sure"         -> film 104 s (the noul lever)
 *   "Score climbs the rungs"                       -> film 113 s (score staircase)
 *   "No token crawling out the door"               -> film 130 s (the typewriter)
 *   "Five hundred million little verdicts"         -> film 172 s (the odometer)
 *   "So watch the confidence, hold the line"       -> film 187 s (circuit breaker)
 *   "So was it all for show?"                      -> film 212 s (the curtain)
 *
 * The film is driven line-by-line, so drift cannot accumulate inside a section.
 */

export const TRACK_URL =
  'https://raw.githubusercontent.com/knarayanareddy/ikea3dbuilder/main/JEV.mp3';

export const SUNO_TITLE = 'JEV - Seventy Milliseconds';

export const TRACK_BPM = 106.5;
export const TRACK_BEAT0 = 0.383;
export const TRACK_DURATION = 207.56;
export const FIRST_VOCAL = 13.23;
export const LAST_VOCAL = 197.60;

export interface SongSection {
  at: number;
  to: number;
  film: [number, number];
  label: string;
  act: number;
}

export interface SungLine {
  /** absolute song seconds where this line is sung (measured) */
  at: number;
  to: number;
  /** nominal film seconds this line owns (content-matched) */
  film: [number, number];
  text: string;
  big?: boolean;
}

export const SUNG_LINES: SungLine[] = [
  { at: 13.23, to: 16.01, film: [0, 5], text: 'I built a brain the size of a town' },
  { at: 16.06, to: 19.51, film: [5, 9], text: 'Gave it every book we ever wrote' },
  { at: 19.56, to: 25.22, film: [9, 12], text: 'Then I asked it, is this customer mad' },
  { at: 25.27, to: 29.95, film: [12, 15], text: 'And it typed me a nine-page note' },
  { at: 31.57, to: 35.16, film: [15, 18], text: 'Eight long seconds of a spinning wheel' },
  { at: 35.21, to: 41.31, film: [18, 21], text: 'Burning dollars just to answer me yes' },
  { at: 41.36, to: 44.45, film: [21, 23], text: 'Half the time it starts to improvise' },
  { at: 44.5, to: 48.36, film: [23, 25.5], text: 'And the parser dies in the mess' },
  { at: 50.81, to: 52.83, film: [26, 32], text: 'Eighteen sixty-five, a man named Jevons knew', big: true },
  { at: 52.88, to: 55.79, film: [32, 37], text: 'Make it cheap and they\'ll use it everywhere', big: true },
  { at: 56.95, to: 60.14, film: [37, 42], text: 'Seventy milliseconds!', big: true },
  { at: 60.19, to: 64.6, film: [42, 47], text: 'No chatter, just a choice', big: true },
  { at: 64.65, to: 68.91, film: [47, 56], text: 'Unstructured going in', big: true },
  { at: 68.96, to: 72.68, film: [56, 61], text: 'A typed decision out', big: true },
  { at: 72.73, to: 78.92, film: [61, 70], text: 'System one has found its voice', big: true },
  { at: 78.97, to: 82.02, film: [70, 76], text: 'Seventy milliseconds!', big: true },
  { at: 82.07, to: 84.86, film: [76, 81], text: 'It never writes a line', big: true },
  { at: 84.91, to: 89.18, film: [81, 90], text: 'And the probabilities align', big: true },
  { at: 90.91, to: 94.33, film: [92, 104], text: 'Noul says true, and it says how sure' },
  { at: 94.38, to: 98.63, film: [104, 112], text: 'Choice picks a lane from the ones I set' },
  { at: 98.68, to: 103.2, film: [112, 118], text: 'Score climbs the rungs from calm to furious' },
  { at: 103.25, to: 107.02, film: [118, 122], text: 'It\'s the cleanest answer I\'ve got yet' },
  { at: 107.46, to: 111.09, film: [122, 130], text: 'One forward pass and it scores them all' },
  { at: 111.14, to: 115.01, film: [130, 138], text: 'No token crawling out the door' },
  { at: 115.06, to: 116.96, film: [138, 144], text: 'It cannot ramble, cannot drop a brace' },
  { at: 117.01, to: 120.99, film: [144, 150], text: 'That\'s what I built the schema for' },
  { at: 121.51, to: 124.53, film: [150, 157], text: 'Seventy milliseconds!', big: true },
  { at: 124.58, to: 126.79, film: [157, 163], text: 'A hundred times less to pay', big: true },
  { at: 126.84, to: 130.16, film: [163, 174], text: 'Five hundred million little verdicts', big: true },
  { at: 130.21, to: 132.35, film: [174, 177], text: 'Landing every day', big: true },
  { at: 132.4, to: 136.4, film: [177, 179], text: 'Every trigger, every proxy', big: true },
  { at: 136.45, to: 138.05, film: [179, 180], text: 'Got a point of view', big: true },
  { at: 139.65, to: 145.26, film: [180, 183], text: 'But two percent of infinity' },
  { at: 145.31, to: 151.09, film: [183, 185], text: 'Is a very big mistake' },
  { at: 151.14, to: 155.27, film: [185, 187], text: 'Ten million little wrongs a day' },
  { at: 155.32, to: 159.44, film: [187, 190], text: 'So watch the confidence, hold the line' },
  { at: 159.49, to: 165.15, film: [190, 195], text: 'Wake the slow one when it breaks' },
  { at: 166.03, to: 169.16, film: [195, 199], text: 'Hold the line' },
  { at: 169.21, to: 172.48, film: [199, 202], text: 'Wake the slow one when it breaks' },
  { at: 173.11, to: 175.51, film: [202, 204], text: 'Seventy milliseconds!', big: true },
  { at: 175.56, to: 178.3, film: [204, 206], text: 'Fast and slow, side by side', big: true },
  { at: 178.35, to: 179.94, film: [206, 207.5], text: 'A reflex standing at the gate', big: true },
  { at: 179.99, to: 183.28, film: [207.5, 209], text: 'And a dreamer deep inside', big: true },
  { at: 183.33, to: 184.14, film: [209, 210.5], text: 'Seventy milliseconds!', big: true },
  { at: 184.19, to: 186.94, film: [210.5, 211.5], text: 'From the coal smoke to the wire', big: true },
  { at: 186.99, to: 189.88, film: [211.5, 212.5], text: 'Everything we made cheap, we only wanted more', big: true },
  { at: 191.68, to: 193.25, film: [212.5, 214], text: 'So was it all for show?' },
  { at: 193.3, to: 194.11, film: [214, 215], text: 'The curtain\'s coming down' },
  { at: 194.16, to: 197.6, film: [215, 216], text: 'And the house lights up the town' },
];

export const SECTION_MAP: SongSection[] = [
  { at: 0, to: 12.63, film: [0, 0], label: 'Intro', act: 1 },
  { at: 12.63, to: 30.97, film: [0, 15], label: 'Verse 1', act: 1 },
  { at: 30.97, to: 50.21, film: [15, 25.5], label: 'Verse 2', act: 1 },
  { at: 50.21, to: 56.35, film: [26, 37], label: 'Pre-Chorus', act: 2 },
  { at: 56.35, to: 90.31, film: [37, 90], label: 'Chorus 1', act: 3 },
  { at: 90.31, to: 106.86, film: [92, 122], label: 'Verse 3', act: 4 },
  { at: 106.86, to: 120.91, film: [122, 150], label: 'Verse 4', act: 5 },
  { at: 120.91, to: 139.05, film: [150, 180], label: 'Chorus 2', act: 6 },
  { at: 139.05, to: 165.43, film: [180, 195], label: 'Bridge', act: 6 },
  { at: 165.43, to: 172.51, film: [195, 202], label: 'Build', act: 7 },
  { at: 172.51, to: 191.08, film: [202, 212.5], label: 'Final Chorus', act: 7 },
  { at: 191.08, to: 207.56, film: [212.5, 216], label: 'Outro', act: 7 },
];

/**
 * Song position -> film time, driven LINE BY LINE.
 * While a line is sung the film sweeps that line's own range; between lines it
 * eases from the previous end to the next start, so instrumental gaps glide.
 */
export function filmTimeForSong(songSec: number): number {
  const n = SUNG_LINES.length;
  if (n === 0) return 0;
  const first = SUNG_LINES[0];
  if (songSec < first.at) {
    const k = Math.max(0, songSec) / Math.max(0.001, first.at);
    const e = k * k * (3 - 2 * k);
    return first.film[0] * e;
  }
  for (let i = 0; i < n; i++) {
    const L = SUNG_LINES[i];
    if (songSec >= L.at && songSec < L.to) {
      const k = (songSec - L.at) / Math.max(0.001, L.to - L.at);
      return L.film[0] + (L.film[1] - L.film[0]) * k;
    }
    const next = SUNG_LINES[i + 1];
    if (next && songSec >= L.to && songSec < next.at) {
      const k = (songSec - L.to) / Math.max(0.001, next.at - L.to);
      const e = k * k * (3 - 2 * k);
      return L.film[1] + (next.film[0] - L.film[1]) * e;
    }
  }
  const last = SUNG_LINES[n - 1];
  const k = Math.min(1, (songSec - last.to) / Math.max(0.001, TRACK_DURATION - last.to));
  return last.film[1] + (216 - last.film[1]) * k;
}

/** Inverse: film time -> song position (for scrubbing). */
export function songTimeForFilm(filmSec: number): number {
  const n = SUNG_LINES.length;
  if (n === 0) return 0;
  const first = SUNG_LINES[0], last = SUNG_LINES[n - 1];
  if (filmSec <= first.film[0]) {
    const k = filmSec / Math.max(0.001, first.film[0]);
    return first.at * Math.min(1, Math.max(0, k));
  }
  for (let i = 0; i < n; i++) {
    const L = SUNG_LINES[i];
    if (filmSec >= L.film[0] && filmSec < L.film[1]) {
      const k = (filmSec - L.film[0]) / Math.max(0.001, L.film[1] - L.film[0]);
      return L.at + (L.to - L.at) * k;
    }
    const next = SUNG_LINES[i + 1];
    if (next && filmSec >= L.film[1] && filmSec < next.film[0]) {
      const k = (filmSec - L.film[1]) / Math.max(0.001, next.film[0] - L.film[1]);
      return L.to + (next.at - L.to) * k;
    }
  }
  const k = Math.min(1, (filmSec - last.film[1]) / Math.max(0.001, 216 - last.film[1]));
  return last.to + (TRACK_DURATION - last.to) * k;
}

export function sectionAt(songSec: number): SongSection | null {
  return SECTION_MAP.find(s => songSec >= s.at && songSec < s.to) || null;
}
export function sungLineAt(songSec: number): SungLine | null {
  return SUNG_LINES.find(l => songSec >= l.at && songSec < l.to) || null;
}
export function sungLineIndexAt(songSec: number): number {
  return SUNG_LINES.findIndex(l => songSec >= l.at && songSec < l.to);
}
export function nextSungLine(songSec: number): SungLine | null {
  return SUNG_LINES.find(l => l.at > songSec) || null;
}
export const LYRIC_SHEET = SUNG_LINES.map(l => l.text).join('\n');
