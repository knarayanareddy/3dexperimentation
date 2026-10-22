/**
 * openaiShortSync.ts — Synchronized cue mappings for the 75-80s Short Speedrun.
 */

export const OAS_TRACK_URL = '/sparks-in-the-machine.mp3'; // Can default to main or short track
export const OAS_TRACK_TITLE = 'Sparks in 75s (The OpenAI Speedrun)';
export const OAS_TRACK_DURATION = 80.0;
export const OAS_TRACK_BPM = 130;

export interface OpenAIShortSyncCue {
  at: number;
  to: number;
  film: [number, number];
  label: string;
  section: string;
}

export const OAS_SYNC_CUES: OpenAIShortSyncCue[] = [
  { at: 0.0, to: 4.0, film: [0.0, 4.0], label: 'From a quiet room in Menlo Park, to a hundred-billion-dollar spark!', section: 'Hook' },
  { at: 4.0, to: 8.0, film: [4.0, 8.0], label: 'December rain, a candle lit, a non-profit pledge to never quit!', section: 'Verse 1' },
  { at: 8.0, to: 13.0, film: [8.0, 13.0], label: 'We carried tables to the loft, taught robot hands where skin is soft!', section: 'Verse 1' },
  { at: 13.0, to: 18.0, film: [13.0, 18.0], label: 'Five neural nets in battle lines, predicting tokens through the vines!', section: 'Verse 1' },
  { at: 18.0, to: 24.0, film: [18.0, 24.0], label: 'Then the compute bill hit a hundred mil! Tear the charter up or pay the bill!', section: 'Pre-Chorus' },
  { at: 24.0, to: 34.0, film: [24.0, 34.0], label: 'A billion dollars from the northern cloud, ten thousand GPUs burning loud!', section: 'Pre-Chorus' },
  { at: 34.0, to: 41.0, film: [34.0, 41.0], label: 'Catch the spark inside the machine! Wednesday night, the preview drops!', section: 'Chorus' },
  { at: 41.0, to: 48.0, film: [41.0, 48.0], label: 'A hundred million never stops! Servers melting in the rack!', section: 'Chorus' },
  { at: 48.0, to: 54.0, film: [48.0, 54.0], label: 'Friday noon on Google Meet: "Sam, you\'re out, admit defeat!"', section: 'Bridge' },
  { at: 54.0, to: 64.0, film: [54.0, 64.0], label: 'Seven hundred signatures: "Bring him back, the future\'s yours!"', section: 'Bridge' },
  { at: 64.0, to: 72.0, film: [64.0, 72.0], label: 'Strawberry thinks into the night! Five gigawatts of desert light!', section: 'Climax' },
  { at: 72.0, to: 77.0, film: [72.0, 77.0], label: 'We turned the earth to a thinking brain!', section: 'Climax' },
  { at: 77.0, to: 80.0, film: [77.0, 80.0], label: 'And it all goes back to the pledge in the rain!', section: 'Loop Outro' }
];

export function filmTimeForOpenAIShort(songSec: number): number {
  return Math.max(0, Math.min(80.0, songSec));
}

export function openaiShortTimeForFilm(filmSec: number): number {
  return Math.max(0, Math.min(80.0, filmSec));
}

export function openaiShortSectionAt(songSec: number): string {
  return OAS_SYNC_CUES.find(c => songSec >= c.at && songSec < c.to)?.section || 'Loop Outro';
}
