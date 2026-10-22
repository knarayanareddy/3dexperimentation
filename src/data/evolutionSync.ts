/**
 * Measured sync for the supplied Suno render "The long thaw (1).mp3".
 *
 * The MP3 embeds the exact lyric sheet. Word timestamps were then recovered
 * from the audio with Whisper base.en. Important discoveries from the real
 * render (not the original plan):
 *
 * - duration: 262.70 s
 * - first clear lyric: 13.00 s
 * - Verse 4 is sung twice (154.40-173.86)
 * - a 20.7 s wordless vocal / instrumental rise precedes the final chorus
 * - the final vocal line ends around 251.23 s, followed by a musical tail
 *
 * Every cue below owns a content-matched range of the 216 s painted film.
 * No captions are shown in song mode; labels exist only for diagnostics.
 */

export const EV_TRACK_URL =
  'https://raw.githubusercontent.com/knarayanareddy/ikea3dbuilder/main/The%20long%20thaw%20%281%29.mp3';

export const EV_TRACK_TITLE = 'The Long Thaw';
export const EV_TRACK_DURATION = 262.70;
export const EV_TRACK_BPM = 102;

export interface EvolutionSyncCue {
  /** Absolute song seconds. */
  at: number;
  to: number;
  /** Nominal film seconds this cue drives. */
  film: [number, number];
  label: string;
  section: string;
}

export const EV_SYNC_CUES: EvolutionSyncCue[] = [
  // Instrumental intro: establish Turing's cold room.
  { at: 0.00, to: 13.00, film: [0, 0.8], label: 'instrumental intro', section: 'Intro' },

  // Verse 1 - Turing and the imitation game.
  { at: 13.00, to: 18.15, film: [0.8, 3.5], label: 'In fifty, in a cold grey room', section: 'Verse 1' },
  { at: 18.15, to: 22.80, film: [3.5, 5.5], label: 'A man asked something nobody could prove', section: 'Verse 1' },
  { at: 22.80, to: 26.51, film: [5.5, 8.0], label: 'So he threw the question out instead', section: 'Verse 1' },
  { at: 26.51, to: 32.46, film: [8.0, 16.0], label: 'And built a game behind a screen', section: 'Verse 1' },

  // Verse 2 - Dartmouth.
  { at: 32.46, to: 35.40, film: [16.0, 19.0], label: 'Fifty-six, ten men, one summer long', section: 'Verse 2' },
  { at: 35.40, to: 37.26, film: [19.0, 21.0], label: 'Finished by the fall', section: 'Verse 2' },
  { at: 37.26, to: 39.70, film: [21.0, 23.0], label: 'They gave the dream a name', section: 'Verse 2' },
  { at: 39.70, to: 42.84, film: [23.0, 24.0], label: 'How far they had to walk', section: 'Verse 2' },

  // Pre-chorus - the perceptron physically turns its own weights.
  { at: 42.84, to: 45.12, film: [24.0, 26.0], label: 'A little machine with a hundred dials', section: 'Pre-Chorus' },
  { at: 45.12, to: 47.44, film: [26.0, 28.0], label: 'Turned its knobs when it got it wrong', section: 'Pre-Chorus' },
  { at: 47.44, to: 50.92, film: [28.0, 30.0], label: 'Nobody told it the answer', section: 'Pre-Chorus' },
  { at: 50.92, to: 54.80, film: [30.0, 32.0], label: 'Till the light came on', section: 'Pre-Chorus' },

  // Chorus 1 - the symbolic era begins; the generic thaw lyric covers it.
  { at: 54.80, to: 57.80, film: [32.0, 36.0], label: 'It takes longer than they say', section: 'Chorus 1' },
  { at: 57.80, to: 63.80, film: [36.0, 39.0], label: 'Every winter has a seed below the snow', section: 'Chorus 1' },
  { at: 63.80, to: 71.85, film: [39.0, 43.0], label: 'Nobody saw the shape of it', section: 'Chorus 1' },
  { at: 71.85, to: 79.64, film: [43.0, 46.0], label: 'Till the ice began to go', section: 'Chorus 1' },

  // Verse 3 - rule explosion and the funding tap.
  { at: 79.64, to: 81.94, film: [46.0, 49.0], label: 'We wrote the rules down one by one', section: 'Verse 3' },
  { at: 81.94, to: 88.88, film: [49.0, 53.0], label: 'Two hundred thousand and it came undone', section: 'Verse 3' },
  { at: 88.88, to: 91.89, film: [53.0, 56.0], label: 'Every answer grew another branch', section: 'Verse 3' },
  { at: 91.89, to: 95.48, film: [56.0, 60.0], label: 'The money closed like a tap', section: 'Verse 3' },

  // Winter bridge - the two winters and backpropagation.
  { at: 95.48, to: 96.42, film: [60.0, 62.0], label: 'So it froze', section: 'Winter Bridge' },
  { at: 96.42, to: 100.08, film: [62.0, 66.0], label: 'Changed the words on all the forms', section: 'Winter Bridge' },
  { at: 100.08, to: 102.44, film: [66.0, 69.0], label: 'A few kept working anyway', section: 'Winter Bridge' },
  { at: 102.44, to: 104.52, film: [69.0, 72.0], label: 'In a small warm room', section: 'Winter Bridge' },
  { at: 104.52, to: 108.24, film: [72.0, 76.0], label: 'Sending the error backwards through the dark', section: 'Winter Bridge' },
  { at: 108.24, to: 110.03, film: [76.0, 78.0], label: 'Backwards through the dark', section: 'Winter Bridge' },
  { at: 110.03, to: 113.18, film: [78.0, 84.0], label: 'The hidden layers learned to say', section: 'Winter Bridge' },
  { at: 113.18, to: 117.17, film: [84.0, 100.0], label: 'What nobody taught them how to say', section: 'Winter Bridge' },

  // Build - ImageNet, gaming GPUs, and the AlexNet cliff.
  { at: 117.17, to: 120.84, film: [100.0, 108.0], label: 'The pictures came, fourteen million strong', section: 'Build' },
  { at: 120.84, to: 125.76, film: [108.0, 116.0], label: 'The gaming cards were built for this', section: 'Build' },
  { at: 125.76, to: 130.08, film: [116.0, 124.0], label: 'Twenty-twelve, the error fell off a cliff', section: 'Build' },
  { at: 130.08, to: 136.16, film: [124.0, 131.0], label: 'The whole field turned to watch it drop', section: 'Build' },

  // Chorus 2 - depth, AlphaGo and scaling laws.
  { at: 136.16, to: 139.14, film: [131.0, 134.0], label: 'Oh, the long thaw', section: 'Chorus 2' },
  { at: 139.14, to: 141.10, film: [134.0, 138.0], label: 'It takes longer than they say', section: 'Chorus 2' },
  { at: 141.10, to: 145.40, film: [138.0, 142.0], label: 'Every winter has a seed below the snow', section: 'Chorus 2' },
  { at: 145.40, to: 148.66, film: [142.0, 144.0], label: 'Oh, the long thaw', section: 'Chorus 2' },
  { at: 148.66, to: 150.92, film: [144.0, 145.0], label: 'Nobody saw the shape of it', section: 'Chorus 2' },
  { at: 150.92, to: 154.40, film: [145.0, 146.0], label: 'Till the ice began to go', section: 'Chorus 2' },

  // Verse 4, take one - the paper and attention arcs.
  { at: 154.40, to: 156.64, film: [146.0, 150.0], label: 'Seventeen, they threw the memory out', section: 'Verse 4A' },
  { at: 156.64, to: 159.20, film: [150.0, 155.0], label: 'Attention is the only thing about', section: 'Verse 4A' },
  { at: 159.20, to: 161.06, film: [155.0, 160.0], label: 'Every word could see the others', section: 'Verse 4A' },
  { at: 161.06, to: 163.70, film: [160.0, 164.0], label: 'Bigger only made it louder', section: 'Verse 4A' },

  // Suno repeats Verse 4 in this actual render; use the repeat for the scale-up.
  { at: 163.70, to: 165.81, film: [164.0, 167.0], label: 'Seventeen, they threw the memory out', section: 'Verse 4B' },
  { at: 165.81, to: 168.50, film: [167.0, 170.0], label: 'Attention is the only thing about', section: 'Verse 4B' },
  { at: 168.50, to: 170.26, film: [170.0, 172.0], label: 'Every word could see the others', section: 'Verse 4B' },
  { at: 170.59, to: 173.86, film: [172.0, 174.0], label: 'Bigger only made it louder', section: 'Verse 4B' },

  // Long wordless rise detected in the actual audio. Hold the parameter ladder
  // and let it build before ChatGPT appears on the lyric.
  { at: 173.86, to: 194.57, film: [174.0, 176.0], label: 'wordless final-chorus rise', section: 'Instrumental Rise' },

  // Final chorus - ChatGPT, multimodality, and agents.
  { at: 194.57, to: 196.82, film: [176.0, 178.0], label: 'Seventy years in the making', section: 'Final Chorus' },
  { at: 197.18, to: 201.22, film: [178.0, 184.0], label: 'One text box and the whole world came', section: 'Final Chorus' },
  { at: 201.40, to: 203.46, film: [184.0, 188.0], label: 'Oh, the long thaw', section: 'Final Chorus' },
  { at: 203.77, to: 206.18, film: [188.0, 192.0], label: 'It was never about the thinking', section: 'Final Chorus' },
  { at: 206.69, to: 212.66, film: [192.0, 200.0], label: 'What we would ask it to become', section: 'Final Chorus' },

  // Outro - the new question and curtain call.
  { at: 213.66, to: 221.46, film: [200.0, 205.0], label: 'Fifty years we asked it, can you think', section: 'Outro' },
  { at: 222.05, to: 227.46, film: [205.0, 208.0], label: 'Can you think, can you think', section: 'Outro' },
  { at: 228.08, to: 232.50, film: [208.0, 212.0], label: 'Now we only want to know', section: 'Outro' },
  { at: 232.96, to: 236.42, film: [212.0, 214.0], label: 'What we should let it choose', section: 'Outro' },
  { at: 236.63, to: 239.14, film: [214.0, 216.0], label: 'What we should let it choose', section: 'Outro' },
  { at: 239.14, to: 262.70, film: [216.0, 216.0], label: 'wordless outro tail', section: 'Outro Tail' }
];

/** Smooth piecewise mapping from the real track clock to the film clock. */
export function filmTimeForEvolutionSong(songSec: number): number {
  const cues = EV_SYNC_CUES;
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

/** Inverse mapping used by the scrubber and chapter navigation. */
export function evolutionSongTimeForFilm(filmSec: number): number {
  const cues = EV_SYNC_CUES;
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

  return EV_TRACK_DURATION;
}

export function evolutionSectionAt(songSec: number): string {
  return EV_SYNC_CUES.find(c => songSec >= c.at && songSec < c.to)?.section || 'Outro';
}