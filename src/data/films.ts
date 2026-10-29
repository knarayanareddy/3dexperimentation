import { Chapter, Shot, RenderContext } from '../types/video';
import { CHAPTERS as JEV_CHAPTERS, TOTAL_DURATION as JEV_DURATION } from './chapters';
import { EVOLUTION_CHAPTERS, EVOLUTION_DURATION } from './evolution';
import { UBER_CHAPTERS, UBER_DURATION } from './uber';
import { OPENAI_CHAPTERS, OPENAI_DURATION } from './openai';
import { AI_LOOP_CHAPTERS, AI_LOOP_DURATION } from './aiLoop';
import { AI_SHORT_CHAPTERS } from './aiShort';
import { ANTHROPIC_CHAPTERS } from './anthropic';
import { renderAnthropic } from '../engine/chapters/anthropic';
import { BRI_CHAPTERS } from './bri';
import { renderBri } from '../engine/chapters/bri';
import {
  BRI_DURATION, BRI_TRACK_DURATION, BRI_BPM, BRI_TRACK_TITLE, BRI_LYRICS, BRI_STYLE_PROMPT, BRI_SYNC_CUES, briSectionAt
} from './briSong';
import { renderAiLoop } from '../engine/chapters/aiLoop';
import { renderAiShort } from '../engine/chapters/aiShort';
import {
  AI_SHORT_TITLE, AI_SHORT_BPM, AI_SHORT_DURATION, AI_SHORT_LYRICS,
  AI_SHORT_STYLE_PROMPT, AI_SHORT_SYNC_CUES, aiShortSectionAt
} from './aiShortSong';
import {
  ANTHROPIC_TRACK_TITLE, ANTHROPIC_BPM, ANTHROPIC_DURATION, ANTHROPIC_TRACK_DURATION, ANTHROPIC_LYRICS,
  ANTHROPIC_STYLE_PROMPT, ANTHROPIC_SYNC_CUES, anthropicSectionAt
} from './anthropicSong';
import {
  AI_LOOP_TRACK_TITLE, AI_LOOP_TRACK_DURATION, AI_LOOP_TRACK_BPM, AI_LOOP_SYNC_CUES,
  filmTimeForAiLoopSong, aiLoopSongTimeForFilm, aiLoopSectionAt
} from './aiLoopSync';
import { renderJev } from '../engine/chapters/jevIndex';
import { renderEvolution } from '../engine/chapters/evolution';
import { renderUber } from '../engine/chapters/uber';
import { renderOpenAI } from '../engine/chapters/openai';
import {
  TRACK_URL as JEV_TRACK_URL,
  TRACK_DURATION as JEV_TRACK_DURATION,
  TRACK_BPM as JEV_TRACK_BPM,
  SUNO_TITLE as JEV_TRACK_TITLE,
  SUNG_LINES as JEV_LINES,
  filmTimeForSong as filmTimeForJevSong,
  songTimeForFilm as jevSongTimeForFilm,
  sectionAt as jevSectionAt
} from './songScript';
import {
  EV_TRACK_URL,
  EV_TRACK_TITLE,
  EV_TRACK_DURATION,
  EV_TRACK_BPM,
  EV_SYNC_CUES,
  filmTimeForEvolutionSong,
  evolutionSongTimeForFilm,
  evolutionSectionAt
} from './evolutionSync';
import {
  UB_TRACK_URL,
  UB_TRACK_TITLE,
  UB_TRACK_DURATION,
  UB_TRACK_BPM,
  UB_SYNC_CUES,
  filmTimeForUberSong,
  uberSongTimeForFilm,
  uberSectionAt
} from './uberSync';
import {
  OA_TRACK_URL,
  OA_TRACK_TITLE,
  OA_TRACK_DURATION,
  OA_TRACK_BPM,
  OA_SYNC_CUES,
  filmTimeForOpenAISong,
  openAISongTimeForFilm,
  openAISectionAt
} from './openaiSync';

export type FilmId = 'jev' | 'evolution' | 'uber' | 'openai' | 'ai-loop' | 'ai-short' | 'anthropic' | 'bri';

/** Prefix bundled public assets with Vite's base so subpath hosting (GitHub Pages) works. */
const publicAsset = (path: string) => `${__APP_BASE_PATH__}${path.replace(/^\/+/, '')}`;

export interface SongSyncCue {
  at: number;
  to: number;
  film: [number, number];
  label: string;
  section?: string;
}

export interface SongConfig {
  title: string;
  /** Empty until the user supplies their generated track. */
  url: string;
  duration: number;
  bpm: number;
  cues: SongSyncCue[];
  filmTimeForSong: (songSec: number) => number;
  songTimeForFilm: (filmSec: number) => number;
  sectionAt: (songSec: number) => string;
  stylePrompt?: string;
  lyrics?: string;
}

export interface Film {
  id: FilmId;
  title: string;
  subtitle: string;
  blurb: string;
  accent: string;
  chapters: Chapter[];
  shots: Shot[];
  duration: number;
  render: (chapterNumber: number, rc: RenderContext) => void;
  /** true when the film has a song map; its audio may still be pending. */
  hasSong: boolean;
  song?: SongConfig;
  canvasWidth?: number;
  canvasHeight?: number;
  narrationDefault?: boolean;
  musicDefault?: boolean;
  captionsDefault?: boolean;
  songDefault?: boolean;
}

interface FilmOptions {
  canvasWidth?: number;
  canvasHeight?: number;
  narrationDefault?: boolean;
  musicDefault?: boolean;
  captionsDefault?: boolean;
  songDefault?: boolean;
}

function build(
  id: FilmId, title: string, subtitle: string, blurb: string, accent: string,
  chapters: Chapter[], duration: number,
  render: (n: number, rc: RenderContext) => void, song?: SongConfig,
  options: FilmOptions = {}
): Film {
  return {
    id, title, subtitle, blurb, accent, chapters,
    shots: chapters.flatMap(c => c.shots), duration, render,
    hasSong: !!song,
    song,
    ...options
  };
}

const jevSong: SongConfig = {
  title: JEV_TRACK_TITLE,
  url: JEV_TRACK_URL,
  duration: JEV_TRACK_DURATION,
  bpm: JEV_TRACK_BPM,
  cues: JEV_LINES.map(line => ({
    at: line.at,
    to: line.to,
    film: line.film,
    label: line.text,
    section: jevSectionAt(line.at)?.label
  })),
  filmTimeForSong: filmTimeForJevSong,
  songTimeForFilm: jevSongTimeForFilm,
  sectionAt: songSec => jevSectionAt(songSec)?.label || 'Outro'
};

const evolutionSong: SongConfig = {
  title: EV_TRACK_TITLE,
  url: EV_TRACK_URL,
  duration: EV_TRACK_DURATION,
  bpm: EV_TRACK_BPM,
  cues: EV_SYNC_CUES,
  filmTimeForSong: filmTimeForEvolutionSong,
  songTimeForFilm: evolutionSongTimeForFilm,
  sectionAt: evolutionSectionAt
};

const uberSong: SongConfig = {
  title: UB_TRACK_TITLE,
  url: UB_TRACK_URL,
  duration: UB_TRACK_DURATION,
  bpm: UB_TRACK_BPM,
  cues: UB_SYNC_CUES,
  filmTimeForSong: filmTimeForUberSong,
  songTimeForFilm: uberSongTimeForFilm,
  sectionAt: uberSectionAt
};

const openaiSong: SongConfig = {
  title: OA_TRACK_TITLE,
  url: OA_TRACK_URL,
  duration: OA_TRACK_DURATION,
  bpm: OA_TRACK_BPM,
  cues: OA_SYNC_CUES,
  filmTimeForSong: filmTimeForOpenAISong,
  songTimeForFilm: openAISongTimeForFilm,
  sectionAt: openAISectionAt
};

const aiLoopSong: SongConfig = {
  title: AI_LOOP_TRACK_TITLE,
  url: publicAsset('audio/ai-money-loop.mp3'),
  duration: AI_LOOP_TRACK_DURATION,
  bpm: AI_LOOP_TRACK_BPM,
  cues: AI_LOOP_SYNC_CUES,
  filmTimeForSong: filmTimeForAiLoopSong,
  songTimeForFilm: aiLoopSongTimeForFilm,
  sectionAt: aiLoopSectionAt,
  stylePrompt: `Electro-swing alt-pop, charismatic mid-range lead sings melodically with deadpan comic timing, a powerful full-voice belt in the final chorus, and light gang harmonies only on the refrain; roomy, unprocessed vocals, clear consonants and space around the final question; punchy, witty, nimble 100 BPM 4/4 swing with playful stop-start breaks; warm upright/electric bass, tight brushed drums and handclaps, featured sly brass stabs, plucked piano and a little glockenspiel; satirical theatrical phrasing, a slightly uneasy swing, and a dramatic final freeze at 2:00.`,


  lyrics: `[Verse 1]\nWelcome to the loop, take a seat and mind the suits.\nDeals circle back; the server racks stay put.\nChip funds the lab; lab orders compute; cloud orders chips.\n“Up to” on the banner; fine print in the wings.\nSeparate deal: thirty billion, reported in a later round.\n\n[Chorus]\nAzure gets a quarter-trillion in future compute buys.\nOracle’s five-year build gets a three-hundred-billion headline.\nLand, grid, cooling: the chorus has a power bill.\n\n[Verse 2]\nChip wears two hats: supplier and shareholder.\nSix-point-three: spare capacity, if customer seats are empty.\nThrough thirty-two, with service terms and escape clauses.\nNot a blanket debt guarantee—don’t let the bassline lie.\n\n[Bridge]\nReal chips, real jobs, real concrete in the night.\nA promise isn’t cash; a backlog isn’t tonight.\nEquity in one ledger; sales in another drawer.\nSame names on the arrows—so we ask what they’re for.\n\n[Final chorus]\nBulls sing adoption: useful tools and revenue.\nBears count debt, grid delays, and empty rooms.\nIf returns fall short, the dominoes could sway.\nIs it a bubble? Will it pop? We leave it that way.`
};

const aiShortSong: SongConfig = {
  title: AI_SHORT_TITLE,
  url: publicAsset('audio/ai-history-short.mp3'),
  duration: AI_SHORT_DURATION,
  bpm: AI_SHORT_BPM,
  cues: AI_SHORT_SYNC_CUES,
  filmTimeForSong: songSec => Math.max(0, Math.min(AI_SHORT_DURATION, songSec)),
  songTimeForFilm: filmSec => Math.max(0, Math.min(AI_SHORT_DURATION, filmSec)),
  sectionAt: aiShortSectionAt,
  stylePrompt: AI_SHORT_STYLE_PROMPT,
  lyrics: AI_SHORT_LYRICS
};

const anthropicSong: SongConfig = {
  title: ANTHROPIC_TRACK_TITLE,
  url: publicAsset('audio/anthropic-story.mp3'),
  duration: ANTHROPIC_TRACK_DURATION,
  bpm: ANTHROPIC_BPM,
  cues: ANTHROPIC_SYNC_CUES,
  filmTimeForSong: songSec => Math.max(0, Math.min(ANTHROPIC_DURATION, songSec)),
  songTimeForFilm: filmSec => Math.max(0, Math.min(ANTHROPIC_DURATION, filmSec)),
  sectionAt: anthropicSectionAt,
  stylePrompt: ANTHROPIC_STYLE_PROMPT,
  lyrics: ANTHROPIC_LYRICS
};

const briSong: SongConfig = {
  title: BRI_TRACK_TITLE,
  url: publicAsset('audio/bri-map-it-mind-the-cost.mp3'),
  duration: BRI_TRACK_DURATION,
  bpm: BRI_BPM,
  cues: BRI_SYNC_CUES,
  filmTimeForSong: songSec => Math.max(0, Math.min(BRI_DURATION, songSec)),
  songTimeForFilm: filmSec => Math.max(0, Math.min(BRI_DURATION, filmSec)),
  sectionAt: briSectionAt,
  stylePrompt: BRI_STYLE_PROMPT,
  lyrics: BRI_LYRICS
};

export const FILMS: Record<FilmId, Film> = {
  jev: build(
    'jev',
    'Seventy Milliseconds',
    'What Jev Is and How It Works',
    'TypeSafe\'s System One model: Jevons paradox, Kahneman\'s fast mind, and a single forward pass.',
    '#3A9C98',
    JEV_CHAPTERS, JEV_DURATION, renderJev, jevSong
  ),
  evolution: build(
    'evolution',
    'The Long Thaw',
    'The Evolution of Artificial Intelligence, 1950 → Now',
    'Turing\'s question, two winters, the data flood, attention, and the question that replaced the Turing test.',
    '#E8AA38',
    EVOLUTION_CHAPTERS, EVOLUTION_DURATION, renderEvolution, evolutionSong
  ),
  uber: build(
    'uber',
    'Press The Button',
    'Uber, from a Snowy Night in Paris to 40 Million Trips a Day',
    'A cease-and-desist, a flywheel, a reckoning, and the first profit after fourteen years.',
    '#1F2024',
    UBER_CHAPTERS, UBER_DURATION, renderUber, uberSong
  ),
  openai: build(
    'openai',
    'The Text Box',
    'OpenAI, from a Nonprofit Letter to a Billion Conversations',
    'A promise written in 2015, a straight line on a log plot, five days in November, and a question still open.',
    '#10A37F',
    OPENAI_CHAPTERS, OPENAI_DURATION, renderOpenAI, openaiSong
  ),
  'ai-loop': build(
    'ai-loop',
    'The Money Loop',
    'AI Finance: The House of Commitments',
    'A two-minute satirical field guide to Nvidia-centered AI financing, real infrastructure, future purchase commitments, and the open bubble question.',
    '#72E77D',
    AI_LOOP_CHAPTERS, AI_LOOP_DURATION, renderAiLoop, aiLoopSong,
    { canvasWidth: 720, canvasHeight: 1280, narrationDefault: false, musicDefault: false, captionsDefault: false, songDefault: true }
  ),
  'ai-short': build(
    'ai-short',
    'Ask, Learn, Try Again!',
    'A Sing-Along History of AI · 1950 → Now · 1:25',
    'A separate 84.8-second, portrait-format history short: Turing, Dartmouth, the winters, backprop, Deep Blue, AlexNet, Transformers, ChatGPT, and multimodal AI—told with a bouncing painted ensemble.',
    '#E8AA38',
    AI_SHORT_CHAPTERS, AI_SHORT_DURATION, renderAiShort, aiShortSong,
    { canvasWidth: 720, canvasHeight: 1280, narrationDefault: false, musicDefault: false, captionsDefault: false, songDefault: true }
  ),
  anthropic: build(
    'anthropic',
    'The Anthropic Story',
    'Research lab → Claude → public questions · 2021–2026 · 1:51 edit',
    'A factual, portrait-format short tracing Anthropic from its 2021 research beginnings through Constitutional AI, Claude, computer use, Claude Code, and The Anthropic Institute—ending with open questions, not a claim that safety is solved.',
    '#C96F4A',
    ANTHROPIC_CHAPTERS, ANTHROPIC_DURATION, renderAnthropic, anthropicSong,
    { canvasWidth: 720, canvasHeight: 1280, narrationDefault: false, musicDefault: false, captionsDefault: false, songDefault: true }
  ),
  bri: build(
    'bri',
    'The Belt, the Road & the Receipts',
    'A playful map journey · benefits, risks & receipts · 1:48',
    'A lively, balanced short on the Belt and Road Initiative: two 2013 proposals, a varied network, conditional modelled gains, and project-specific risks. Schematic routes; no claim that BRI is one road or one uniform project.',
    '#C66A45',
    BRI_CHAPTERS, BRI_DURATION, renderBri, briSong,
    { canvasWidth: 720, canvasHeight: 1280, narrationDefault: false, musicDefault: false, captionsDefault: false, songDefault: true }
  )
};

export const FILM_LIST: Film[] = [FILMS.jev, FILMS.evolution, FILMS.uber, FILMS.openai, FILMS['ai-loop'], FILMS['ai-short'], FILMS.anthropic, FILMS.bri];

export const shotDur = (s: Shot) => Math.max(0.5, s.endTime - s.startTime);

/** Short-film song clocks scale an actual supplied track to the planned visual runtime; provisional cues are not treated as measured alignment. */
export function filmTimeForSongAt(film: Film, songSec: number, actualSongDuration = 0): number {
  if ((film.id === 'ai-loop' || film.id === 'ai-short' || film.id === 'anthropic' || film.id === 'bri') && actualSongDuration > 0) {
    return Math.max(0, Math.min(film.duration, songSec / actualSongDuration * film.duration));
  }
  return film.song?.filmTimeForSong(songSec) ?? Math.max(0, Math.min(film.duration, songSec));
}

export function songTimeForFilmAt(film: Film, filmSec: number, actualSongDuration = 0): number {
  if ((film.id === 'ai-loop' || film.id === 'ai-short' || film.id === 'anthropic' || film.id === 'bri') && actualSongDuration > 0) {
    return Math.max(0, Math.min(actualSongDuration, filmSec / film.duration * actualSongDuration));
  }
  return film.song?.songTimeForFilm(filmSec) ?? Math.max(0, Math.min(film.duration, filmSec));
}

export function filmShotIndexAt(film: Film, time: number): number {
  const t = Math.max(0, Math.min(time, film.duration - 0.001));
  const i = film.shots.findIndex(s => t >= s.startTime && t < s.endTime);
  return i < 0 ? film.shots.length - 1 : i;
}

export function filmChapterAt(film: Film, time: number): Chapter {
  const t = Math.max(0, Math.min(time, film.duration));
  return film.chapters.find(c => t >= c.startTime && t < c.endTime) || film.chapters[film.chapters.length - 1];
}

export function filmShotAt(film: Film, time: number): Shot {
  return film.shots[filmShotIndexAt(film, time)];
}
