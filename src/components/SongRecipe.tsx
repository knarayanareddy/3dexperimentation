import React, { useState } from 'react';
import { Music4, Copy, Check, Sparkles, Target, ListMusic } from 'lucide-react';
export interface RecipeData {
  title: string;
  style: string;
  exclude: string;
  lyrics: string;
  sections: Array<{ label: string; act: number }>;
  anchors: Array<{ lyric: string; shot: string }>;
  /** set when the track already exists and is aligned */
  synced?: string;
  /** set when further generation or timing work remains */
  pending?: string;
  /** true when a master is present but not yet aligned */
  hasMaster?: boolean;
}

const CopyBtn: React.FC<{ text: string; label: string }> = ({ text, label }) => {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); }
        catch {
          const ta = document.createElement('textarea');
          ta.value = text; document.body.appendChild(ta); ta.select();
          document.execCommand('copy'); document.body.removeChild(ta);
        }
        setDone(true); setTimeout(() => setDone(false), 1800);
      }}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold cursor-pointer transition-colors ${
        done ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
      }`}
    >
      {done ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {done ? 'Copied' : label}
    </button>
  );
};

export const SongRecipe: React.FC<{ data: RecipeData }> = ({ data }) => {
  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 md:p-6 shadow-2xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <Music4 className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-white leading-tight">
              {data.synced ? 'Integrated song' : 'Suno recipe'} — “{data.title}”
            </h2>
            <p className="text-[11px] text-slate-400">
              {data.synced
                ? `${data.synced} This panel keeps the source recipe and visual anchors.`
                : data.pending || "Generate this in Suno, then send me the MP3 and I'll measure it and pin every lyric to its shot."}
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 whitespace-nowrap">
          {data.synced ? 'synced' : data.hasMaster ? 'master received · map pending' : 'new song · awaiting master'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* style */}
        <div className="lg:col-span-2 space-y-3">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-rose-300 font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> STYLE OF MUSIC
              </span>
              <CopyBtn text={data.style} label="Copy" />
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-mono max-h-40 overflow-y-auto">
              {data.style}
            </p>
            <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
              <span className="text-[10px] text-slate-500 font-mono leading-snug">
                Exclude: {data.exclude}
              </span>
              <CopyBtn text={data.exclude} label="Copy" />
            </div>
            <div className="mt-2 text-[10px] text-slate-400 font-mono">
              Title: <span className="text-slate-200">{data.title}</span> · use <span className="text-amber-300">Custom Mode</span>
            </div>
          </div>

          {/* anchors */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[11px] font-bold text-cyan-300 font-mono flex items-center gap-1.5 mb-2">
              <Target className="w-3.5 h-3.5" /> LYRIC → SHOT ANCHORS
            </span>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {data.anchors.map((a, i) => (
                <div key={i} className="text-[10px] font-mono leading-snug">
                  <span className="text-slate-200">“{a.lyric}”</span>
                  <span className="text-slate-500"> → {a.shot}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 font-mono mt-2">
              These are the beats I'll pin when the audio arrives.
            </p>
          </div>
        </div>

        {/* lyrics */}
        <div className="lg:col-span-3 p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-amber-300 font-mono flex items-center gap-1.5">
              <ListMusic className="w-3.5 h-3.5" /> LYRICS
            </span>
            <CopyBtn text={data.lyrics} label="Copy lyrics" />
          </div>
          <pre className="text-[11px] leading-relaxed text-slate-300 font-mono whitespace-pre-wrap overflow-y-auto max-h-80 bg-slate-900/70 rounded-lg p-2.5 border border-slate-800">
{data.lyrics}
          </pre>
          <div className="mt-2 pt-2 border-t border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 font-mono">INTENDED SECTION → ACT</span>
            <div className="mt-1 flex flex-wrap gap-1">
              {data.sections.map((s) => (
                <span key={s.label} className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                  {s.label} → Act {s.act}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 font-mono leading-relaxed">
        {data.synced ? (
          <><span className="text-amber-300 font-bold">Integrated:</span> the MP3 was decoded and transcribed with word
          timestamps, and every lyric is pinned to the shot it describes. Use Song Mode above to play the aligned result.</>
        ) : data.pending ? (
          <><span className="text-amber-300 font-bold">{data.hasMaster ? 'Master received:' : 'Next step:'}</span> {data.pending}</>
        ) : (
          <><span className="text-amber-300 font-bold">Then:</span> send me the MP3 (or a raw URL) and I'll decode it,
          recover word-level timings, and pin each lyric to the shot that illustrates it — the same pipeline that got the
          first two films to full landmark sync.</>
        )}
      </div>
    </div>
  );
};
