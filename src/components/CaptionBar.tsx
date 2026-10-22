import React from 'react';
import { Chapter, Shot } from '../types/video';

interface CaptionBarProps {
  chapter: Chapter;
  shot: Shot;
  speaking: boolean;
  visible: boolean;
  fps: number;
  /** 0..1 read position inside the cue, from speech boundary events */
  progress: number;
}

/**
 * Narration caption bar — below the stage (never over the film).
 * Words light up as they are actually spoken, using the live read position
 * reported by the speech engine, so the text is never ahead of the voice.
 */
export const CaptionBar: React.FC<CaptionBarProps> = ({
  chapter, shot, speaking, visible, fps, progress
}) => {
  if (!visible || !shot) return null;

  const speakerStyles: Record<string, string> = {
    Narrator: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/40',
    Clawd: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
    Engineer: 'bg-sky-500/15 text-sky-300 border-sky-500/40',
    Jevons: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
    Sam: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
    Ilya: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
    Researcher: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50',
    Board: 'bg-rose-500/20 text-rose-300 border-rose-500/50',
    Rider: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
    Driver: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
    Official: 'bg-rose-500/15 text-rose-300 border-rose-500/40'
  };
  const speakerStyle = speakerStyles[shot.speaker] || speakerStyles.Narrator;

  // split into words with their char offsets so highlighting follows the voice
  const cue = shot.cue;
  const spokenTo = Math.round(Math.min(1, Math.max(0, progress)) * cue.length);
  const words: Array<{ w: string; start: number }> = [];
  {
    const re = /\S+/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(cue)) !== null) words.push({ w: m[0], start: m.index });
  }

  return (
    <div
      className="flex items-center gap-3 px-4 py-2.5 bg-slate-950/95 border-t border-b border-slate-800/80 min-h-[52px]"
      style={{ boxShadow: `inset 3px 0 0 ${chapter.accentColor}` }}
    >
      <div className="flex flex-col items-start gap-1 shrink-0">
        <span
          className="text-[9px] font-bold uppercase tracking-widest font-mono px-1.5 py-0.5 rounded"
          style={{ backgroundColor: `${chapter.themeColor}22`, color: chapter.accentColor }}
        >
          Act {chapter.number}
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${speakerStyle}`}>
          {shot.speaker}
        </span>
      </div>

      {/* word-by-word narration line */}
      <p className="flex-1 text-xs sm:text-sm leading-snug">
        <span className="text-slate-600 italic">“</span>
        {words.map((it, i) => {
          const done = it.start + it.w.length <= spokenTo;
          const active = !done && it.start <= spokenTo;
          return (
            <span
              key={i}
              className={
                done
                  ? 'text-slate-200'
                  : active
                    ? 'text-white font-semibold'
                    : 'text-slate-500'
              }
            >
              {it.w}{i < words.length - 1 ? ' ' : ''}
            </span>
          );
        })}
        <span className="text-slate-600 italic">”</span>
      </p>

      <div className="hidden sm:flex items-center gap-2 shrink-0">
        {speaking && (
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            VO
          </span>
        )}
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">
          {shot.id.toUpperCase()}
        </span>
        <span className="text-[10px] font-mono text-slate-500">{fps} fps</span>
      </div>
    </div>
  );
};
