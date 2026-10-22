import React, { useRef, useState } from 'react';
import { Chapter } from '../types/video';

interface TimelineScrubberProps {
  currentTime: number;
  duration: number;
  chapters: Chapter[];
  onSeek: (time: number) => void;
}

export const TimelineScrubber: React.FC<TimelineScrubberProps> = ({
  currentTime,
  duration,
  chapters,
  onSeek
}) => {
  const barRef = useRef<HTMLDivElement>(null);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPos, setHoverPos] = useState<number>(0);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins}:${s.toString().padStart(2, '0')}`;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSeek(pos * duration);

    const handlePointerMove = (ev: PointerEvent) => {
      const p = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
      onSeek(p * duration);
    };

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverPos(e.clientX - rect.left);
    setHoverTime(pos * duration);
  };

  const handleMouseLeave = () => {
    setHoverTime(null);
  };

  const progressPercent = Math.min(100, Math.max(0, (currentTime / duration) * 100));

  // Find hover chapter
  const hoveredChapter = hoverTime !== null 
    ? chapters.find(c => hoverTime >= c.startTime && hoverTime < c.endTime)
    : null;

  return (
    <div className="relative w-full group py-2 select-none">
      {/* Time and Chapter Preview Tooltip */}
      {hoverTime !== null && hoveredChapter && (
        <div
          className="absolute -top-12 -translate-x-1/2 pointer-events-none z-30 transition-opacity bg-slate-900 border border-slate-700 px-2.5 py-1 rounded-md shadow-xl text-center"
          style={{ left: `${hoverPos}px` }}
        >
          <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
            Act {hoveredChapter.number}: {hoveredChapter.title}
          </div>
          <div className="text-xs font-mono text-slate-200">
            {formatTime(hoverTime)}
          </div>
        </div>
      )}

      {/* Main Track Bar */}
      <div
        ref={barRef}
        onPointerDown={handlePointerDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-2.5 group-hover:h-3.5 bg-slate-800/90 rounded-full overflow-hidden cursor-pointer transition-all duration-150 border border-slate-700/50"
      >
        {/* Chapter Segment Backgrounds */}
        {chapters.map((chap) => {
          const leftPct = (chap.startTime / duration) * 100;
          const widthPct = (chap.duration / duration) * 100;
          return (
            <div
              key={chap.id}
              className="absolute top-0 bottom-0 opacity-40 hover:opacity-75 transition-opacity"
              style={{
                left: `${leftPct}%`,
                width: `${widthPct}%`,
                backgroundColor: chap.themeColor
              }}
              title={`Act ${chap.number}: ${chap.title}`}
            />
          );
        })}

        {/* Played Progress Bar */}
        <div
          className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-amber-500 via-cyan-400 to-emerald-400 z-10 transition-[width] duration-75"
          style={{ width: `${progressPercent}%` }}
        />

        {/* Chapter Dividers */}
        {chapters.map((chap, idx) => {
          if (idx === 0) return null;
          const leftPct = (chap.startTime / duration) * 100;
          return (
            <div
              key={`div-${chap.id}`}
              className="absolute top-0 bottom-0 w-[2px] bg-slate-900/80 z-20 pointer-events-none"
              style={{ left: `${leftPct}%` }}
            />
          );
        })}
      </div>

      {/* Scrubber Playhead Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-cyan-400 z-30 pointer-events-none transition-transform group-hover:scale-125"
        style={{ left: `${progressPercent}%` }}
      />
    </div>
  );
};
