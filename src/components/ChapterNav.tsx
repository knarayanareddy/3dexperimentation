import React from 'react';
import { Chapter } from '../types/video';


interface ChapterNavProps {
  chapters: Chapter[];
  currentChapter: Chapter;
  currentTime: number;
  onSelectChapter: (chapter: Chapter) => void;
}

export const ChapterNav: React.FC<ChapterNavProps> = ({
  chapters,
  currentChapter,
  currentTime,
  onSelectChapter
}) => {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-thin">
      <div className="flex gap-2 min-w-max">
        {chapters.map((chap) => {
          const isActive = chap.id === currentChapter.id;
          const isPassed = currentTime >= chap.endTime;
          const chapterProgress = Math.max(
            0,
            Math.min(100, ((currentTime - chap.startTime) / chap.duration) * 100)
          );

          return (
            <button
              key={chap.id}
              onClick={() => onSelectChapter(chap)}
              className={`group relative flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer min-w-[190px] ${
                isActive
                  ? 'bg-slate-900 border-amber-500/80 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/50'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              {/* Top row: Act number & Duration */}
              <div className="flex items-center justify-between w-full mb-1">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full font-mono"
                  style={{
                    backgroundColor: `${chap.themeColor}22`,
                    color: chap.accentColor
                  }}
                >
                  Act {chap.number}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {chap.duration}s
                </span>
              </div>

              {/* Title */}
              <div
                className={`text-xs font-semibold leading-tight mb-2 line-clamp-1 ${
                  isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                }`}
              >
                {chap.title}
              </div>

              {/* Sub-progress bar within chapter */}
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mt-auto">
                <div
                  className="h-full transition-all duration-100"
                  style={{
                    width: isPassed ? '100%' : `${chapterProgress}%`,
                    backgroundColor: chap.accentColor
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
