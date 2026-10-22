import { Chapter, Shot, RenderContext } from '../types/video';
import { CHAPTERS as JEV_CHAPTERS, TOTAL_DURATION as JEV_DURATION } from './chapters';
import { EVOLUTION_CHAPTERS, EVOLUTION_DURATION } from './evolution';
import { UBER_CHAPTERS, UBER_DURATION } from './uber';
import { OPENAI_CHAPTERS, OPENAI_DURATION } from './openai';
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

export type FilmId = 'jev' | 'evolution' | 'uber' | 'openai';

export interface SongSyncCue {
  at: number;
  to: number;
  film: [number, number];
  label: string;
  section?: string;
}

export interface SongConfig {
  title: string;
  url: string;
  duration: number;
  bpm: number;
  cues: SongSyncCue[];
  filmTimeForSong: (songSec: number) => number;
  songTimeForFilm: (filmSec: number) => number;
  sectionAt: (songSec: number) => string;
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
  /** does this film have a finished, time-aligned song? */
  hasSong: boolean;
  song?: SongConfig;
}

function build(
  id: FilmId, title: string, subtitle: string, blurb: string, accent: string,
  chapters: Chapter[], duration: number,
  render: (n: number, rc: RenderContext) => void, song?: SongConfig
): Film {
  return {
    id, title, subtitle, blurb, accent, chapters,
    shots: chapters.flatMap(c => c.shots), duration, render,
    hasSong: !!song,
    song
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
  )
};

export const FILM_LIST: Film[] = [FILMS.jev, FILMS.evolution, FILMS.uber, FILMS.openai];

export const shotDur = (s: Shot) => Math.max(0.5, s.endTime - s.startTime);

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
