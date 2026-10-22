import { Chapter, Shot, RenderContext } from '../types/video';
import { Film, filmChapterAt, filmShotAt } from '../data/films';
import { beginFrame, finishFrame } from './painter';

export function renderFrame(
  film: Film,
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  t: number,
  dt: number,
  speaking: boolean,
  boilTime?: number
): { chapter: Chapter; shot: Shot } {
  const clamped = Math.max(0, Math.min(t, film.duration));
  const chapter = filmChapterAt(film, clamped);
  const shot = filmShotAt(film, clamped);

  const rc: RenderContext = {
    ctx, width, height,
    t: clamped, dt,
    chapterProgress: (clamped - chapter.startTime) / Math.max(0.001, chapter.duration),
    globalProgress: clamped / film.duration,
    chapter, shot, speaking,
    themeColor: chapter.themeColor
  };

  ctx.save();
  beginFrame(clamped, boilTime);
  film.render(chapter.number, rc);
  finishFrame(ctx, width, height);
  ctx.restore();

  return { chapter, shot };
}
