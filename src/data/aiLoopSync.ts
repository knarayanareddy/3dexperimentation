import { SongSyncCue } from './films';

/** Supplied Suno render: 131.64 seconds, 100 BPM, 48 kHz stereo. */
export const AI_LOOP_TRACK_TITLE = 'The Money Loop';
export const AI_LOOP_TRACK_DURATION = 131.64;
export const AI_LOOP_TRACK_BPM = 100;
export const AI_LOOP_FIRST_VOCAL_ESTIMATE = 8.7;

/**
 * Phrase-level timing estimates for the supplied mix. The first vocal entry and
 * broad section breaks were checked against the stereo mid/side envelope; the
 * individual line boundaries are syllable-weighted estimates inside each sung
 * section, not forced-alignment or word-level measurements. Keep that caveat
 * visible in Song Studio until an actual vocal-isolated pass is available.
 */
const lines = [
  { label: 'Welcome to the loop, take a seat and mind the suits.', section: 'Verse 1', syllables: 11 },
  { label: 'Deals circle back; the server racks stay put.', section: 'Verse 1', syllables: 9 },
  { label: 'Chip funds the lab; lab orders compute; cloud orders chips.', section: 'Verse 1', syllables: 13 },
  { label: '“Up to” on the banner; fine print in the wings.', section: 'Verse 1', syllables: 10 },
  { label: 'Separate deal: thirty billion—reported in a later round.', section: 'Verse 1', syllables: 16 },
  { label: 'Azure gets a quarter-trillion in future compute buys.', section: 'Chorus', syllables: 14 },
  { label: 'Oracle’s five-year build gets a three-hundred-billion headline.', section: 'Chorus', syllables: 14 },
  { label: 'Land, grid, cooling: the chorus has a power bill.', section: 'Chorus', syllables: 12 },
  { label: 'Chip wears two hats: supplier and shareholder.', section: 'Verse 2', syllables: 11 },
  { label: 'Six-point-three: spare capacity, if customer seats are empty.', section: 'Verse 2', syllables: 16 },
  { label: 'Through thirty-two, with service terms and escape clauses.', section: 'Verse 2', syllables: 13 },
  { label: 'Not a blanket debt guarantee—don’t let the bassline lie.', section: 'Verse 2', syllables: 14 },
  { label: 'Real chips, real jobs, real concrete in the night.', section: 'Bridge', syllables: 11 },
  { label: 'A promise isn’t cash; a backlog isn’t tonight.', section: 'Bridge', syllables: 13 },
  { label: 'Equity in one ledger; sales in another drawer.', section: 'Bridge', syllables: 14 },
  { label: 'Same names on the arrows—so we ask what they’re for.', section: 'Bridge', syllables: 12 },
  { label: 'Bulls sing adoption: useful tools and revenue.', section: 'Final chorus', syllables: 13 },
  { label: 'Bears count debt, grid delays, and empty rooms.', section: 'Final chorus', syllables: 11 },
  { label: 'If returns fall short, the dominoes could sway.', section: 'Final chorus', syllables: 11 },
  { label: 'Is it a bubble? Will it pop? We leave it that way.', section: 'Final chorus', syllables: 13 }
] as const;

// Broad section landmarks are informed by the mix envelope; micro-boundaries
// are proportioned by sung syllable count and are explicitly approximate.
const groups = [
  { from: 8.7, to: 42.7, indices: [0, 1, 2, 3, 4] },
  { from: 42.8, to: 60.8, indices: [5, 6, 7] },
  { from: 61.1, to: 77.8, indices: [8, 9, 10, 11] },
  { from: 78.0, to: 102.0, indices: [12, 13, 14, 15] },
  { from: 102.2, to: 129.0, indices: [16, 17, 18, 19] }
] as const;

const lineRanges: Array<[number, number]> = Array(lines.length);
for (const group of groups) {
  const pause = 0.12;
  const usable = group.to - group.from - pause * (group.indices.length - 1);
  const totalWeight = group.indices.reduce<number>((sum, i) => sum + lines[i].syllables, 0);
  let at = group.from;
  group.indices.forEach((index, position) => {
    const duration = usable * lines[index].syllables / totalWeight;
    lineRanges[index] = [at, at + duration];
    at += duration + (position < group.indices.length - 1 ? pause : 0);
  });
}

/**
 * Audio cue positions remain estimates; the picture starts slightly ahead to
 * anticipate sung phrases. In the ending, the bear/domino/question visuals are
 * advanced progressively (3/6/9 seconds) to keep the sequence continuous; the
 * final question has the full nine-second lead after the user's latest report.
 */
const visualLeadFor = (index: number) => index >= lines.length - 3 ? (index - (lines.length - 4)) * 3 : index === 0 ? 0 : 0.35;
export const AI_LOOP_SYNC_CUES: SongSyncCue[] = lines.map(({ label, section }, i) => {
  const [at, to] = lineRanges[i];
  const visualAt = Math.max(i === 0 ? 0 : AI_LOOP_FIRST_VOCAL_ESTIMATE, at - visualLeadFor(i));
  const nextAudioAt = lineRanges[i + 1]?.[0];
  const visualTo = nextAudioAt == null
    ? AI_LOOP_TRACK_DURATION
    : Math.max(visualAt + 0.15, nextAudioAt - visualLeadFor(i + 1));
  return { at, to, film: [visualAt, visualTo], label, section };
});

/** Song and film share a clock so phrase-level scene changes stay attached to the audio. */
export function filmTimeForAiLoopSong(songSec: number): number {
  return Math.max(0, Math.min(AI_LOOP_TRACK_DURATION, songSec));
}

export function aiLoopSongTimeForFilm(filmSec: number): number {
  return Math.max(0, Math.min(AI_LOOP_TRACK_DURATION, filmSec));
}

export function aiLoopSectionAt(songSec: number): string {
  const active = AI_LOOP_SYNC_CUES.find(c => songSec >= c.at && songSec < c.to);
  if (active?.section) return active.section;
  const previous = [...AI_LOOP_SYNC_CUES].reverse().find(c => songSec >= c.to);
  return previous?.section || 'Intro / instrumental';
}

/** Diagnostic timeline used by the storyboard to expose all the estimated boundaries. */
export const AI_LOOP_SCENE_TIMES = [
  { id: 'loop0-1', from: 0, to: AI_LOOP_FIRST_VOCAL_ESTIMATE, label: 'Instrumental intro' },
  ...AI_LOOP_SYNC_CUES.map((cue, index) => ({
    id: index < 5 ? `loop1-${index + 1}`
      : index < 8 ? `loop2-${index - 4}`
        : index < 12 ? `loop3-${index - 7}`
          : index < 16 ? `loop4-${index - 11}`
            : `loop5-${index - 15}`,
    from: cue.film[0],
    to: cue.film[1],
    label: cue.label
  }))
];
