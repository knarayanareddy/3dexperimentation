import React, { useState } from 'react';
import { Chapter } from '../types/video';
import { Shot } from '../types/video';
import { Play, Code2, Info, Compass, ChevronRight } from 'lucide-react';

interface StoryboardViewProps {
  chapters: Chapter[];
  title?: string;
  currentTime: number;
  onJumpToTime: (time: number) => void;
}

export const StoryboardView: React.FC<StoryboardViewProps> = ({
  chapters,
  title,
  currentTime,
  onJumpToTime
}) => {
  const [selectedShot, setSelectedShot] = useState<Shot | null>(null);

  const formatSecs = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-7 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Compass className="w-5 h-5" />
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              {title || 'Storyboard & Narration Contract'}
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              STORYBOARD.md
            </span>
          </div>
          <p className="text-sm text-slate-400">
            Shot-by-shot visual screenplay following the Claude Opus 5.5 animation architecture: every frame a pure function of t.
          </p>
        </div>
      </div>

      {/* Chapters & Shots Accordion Table */}
      <div className="mt-6 space-y-6">
        {chapters.map((chap) => {
          const isChapActive = currentTime >= chap.startTime && currentTime < chap.endTime;

          return (
            <div
              key={chap.id}
              className={`rounded-xl border overflow-hidden transition-all ${
                isChapActive
                  ? 'border-amber-500/70 bg-slate-950/70 shadow-lg shadow-amber-500/5'
                  : 'border-slate-800 bg-slate-950/40'
              }`}
            >
              {/* Chapter Header */}
              <div
                className="flex items-center justify-between p-4 border-b border-slate-800/80 cursor-pointer"
                onClick={() => onJumpToTime(chap.startTime)}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-bold font-mono px-2.5 py-1 rounded-full uppercase"
                    style={{
                      backgroundColor: `${chap.themeColor}22`,
                      color: chap.accentColor
                    }}
                  >
                    Act {chap.number}
                  </span>
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
                      {chap.title}
                      {isChapActive && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          NOW PLAYING
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1">{chap.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
                  <span>
                    {formatSecs(chap.startTime)} – {formatSecs(chap.endTime)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onJumpToTime(chap.startTime);
                    }}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                    title="Jump to Act"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              </div>

              {/* Shots List */}
              <div className="divide-y divide-slate-800/60">
                {chap.shots.map((shot) => {
                  const isCurrentShot = currentTime >= shot.startTime && currentTime < shot.endTime;

                  return (
                    <div
                      key={shot.id}
                      onClick={() => {
                        onJumpToTime(shot.startTime);
                        setSelectedShot(shot);
                      }}
                      className={`p-3 md:p-4 transition-colors cursor-pointer flex flex-col md:flex-row md:items-start justify-between gap-4 ${
                        isCurrentShot
                          ? 'bg-amber-500/10 border-l-4 border-amber-400'
                          : 'hover:bg-slate-900/60'
                      }`}
                    >
                      {/* Left: Shot ID & Time */}
                      <div className="shrink-0 flex items-center md:flex-col md:items-start gap-2 md:gap-1 w-28">
                        <span className="text-xs font-mono font-bold text-slate-300">
                          {shot.id.toUpperCase()}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {formatSecs(shot.startTime)} ({shot.endTime - shot.startTime}s)
                        </span>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                          {shot.speaker}
                        </span>
                      </div>

                      {/* Middle: Cue & Read */}
                      <div className="flex-1 space-y-1.5">
                        <div className="text-xs md:text-sm font-medium text-slate-200">
                          <span className="text-amber-400 font-semibold mr-1.5 font-mono">
                            Cue:
                          </span>
                          "{shot.cue}"
                        </div>
                        <div className="text-xs text-slate-400 flex items-start gap-1.5">
                          <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-cyan-300 font-mono">Read:</strong> {shot.read}
                          </span>
                        </div>
                        {shot.technicalNote && (
                          <div className="text-[11px] text-slate-400 font-mono bg-slate-900/80 p-2 rounded-lg border border-slate-800/80">
                            <span className="text-emerald-400 font-bold">Tech:</span> {shot.technicalNote}
                          </div>
                        )}
                      </div>

                      {/* Right: Code inspect button */}
                      <div className="shrink-0 flex items-center gap-2">
                        {shot.codeSnippet && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedShot(shot);
                            }}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
                          >
                            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Code</span>
                          </button>
                        )}
                        <ChevronRight className="w-4 h-4 text-slate-600 hidden md:block" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Code Snippet Modal Drawer */}
      {selectedShot && selectedShot.codeSnippet && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold font-mono text-white">
                  Technical Architecture • Shot {selectedShot.id.toUpperCase()}
                </h3>
              </div>
              <button
                onClick={() => setSelectedShot(null)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
              >
                Close (ESC)
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-4">
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold block mb-1">
                  Narration Cue:
                </span>
                <p className="text-xs text-slate-300 italic">"{selectedShot.cue}"</p>
              </div>

              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">
                  Executable Code / Specification:
                </span>
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                  {selectedShot.codeSnippet}
                </pre>
              </div>

              {selectedShot.technicalNote && (
                <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200 font-mono">
                  {selectedShot.technicalNote}
                </div>
              )}
            </div>

            <div className="p-3 border-t border-slate-800 bg-slate-950 flex justify-end">
              <button
                onClick={() => {
                  onJumpToTime(selectedShot.startTime);
                  setSelectedShot(null);
                }}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold font-mono text-xs hover:bg-cyan-400 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Play From This Shot ({formatSecs(selectedShot.startTime)})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
