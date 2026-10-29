import React, { useRef, useState } from 'react';
import { Music4, Upload, Link2, SlidersHorizontal, CheckCircle2, Loader2, AudioLines, Copy } from 'lucide-react';
import { Film, SongConfig, filmTimeForSongAt } from '../data/films';
import { trackEngine } from '../engine/track';

interface SongStudioProps {
  film: Film;
  song: SongConfig;
  onLoaded: () => void;
  nudge: number;
  onNudge: (v: number) => void;
  songSec: number;
  loading: boolean;
}

export const SongStudio: React.FC<SongStudioProps> = ({ film, song, onLoaded, nudge, onNudge, songSec, loading }) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [url, setUrl] = useState('');
  const [err, setErr] = useState('');
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState('');

  const copyText = async (key: string, value?: string) => {
    if (!value || !navigator.clipboard) return;
    try { await navigator.clipboard.writeText(value); setCopied(key); window.setTimeout(() => setCopied(''), 1600); } catch { setCopied(''); }
  };

  const ready = trackEngine.ready;
  const cueTime = (film.id === 'ai-short' || film.id === 'anthropic' || film.id === 'bri') && ready && trackEngine.duration > 0
    ? filmTimeForSongAt(film, songSec, trackEngine.duration)
    : songSec;
  const activeSection = song.sectionAt(cueTime);
  const activeCueIndex = song.cues.findIndex(c => cueTime >= c.at && cueTime < c.to);
  const mapClock = film.id === 'anthropic' || film.id === 'bri' ? cueTime : songSec;
  const displayDuration = ready && trackEngine.duration > 0 ? trackEngine.duration : song.duration;
  const nextCue = song.cues.find(c => c.at > cueTime);

  const handleFile = async (f?: File | null) => {
    if (!f) return;
    setErr('');
    try { await trackEngine.loadFile(f); onLoaded(); } catch { setErr('Could not read that file.'); }
  };
  const handleUrl = async () => {
    if (!url.trim()) return;
    setErr('');
    try { await trackEngine.loadUrl(url.trim()); onLoaded(); } catch { setErr('Could not load that URL (CORS?).'); }
  };

  return (
    <div className="bg-slate-950 border-b border-slate-800/80 px-4 py-2.5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 min-w-0">
          <span className="p-1.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 shrink-0">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Music4 className="w-4 h-4" />}
          </span>
          <div className="min-w-0">
            <div className="text-sm font-bold text-white leading-tight truncate flex items-center gap-2">
              “{song.title}”
              {ready && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
            </div>
            <div className="text-[11px] text-slate-400 font-mono truncate">
              {loading
                ? 'loading track…'
                : ready
                  ? `${trackEngine.duration.toFixed(1)}s · ${song.bpm} BPM · track loaded`
                  : song.url ? 'track not loaded' : 'audio pending · load your Suno render below'}
            </div>
          </div>
        </div>

        {/* live section + lyric readout */}
        {ready && (
          <div className="flex items-center gap-2 text-[11px] font-mono min-w-0">
            <AudioLines className="w-3.5 h-3.5 text-rose-300 shrink-0" />
            <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-200 border border-rose-500/30 shrink-0">
              {activeSection || '—'}
            </span>
            {(() => {
              if (activeCueIndex >= 0) {
                return (
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-200 border border-emerald-500/30 truncate max-w-[220px]">
                    ♪ {activeCueIndex + 1}/{song.cues.length}
                  </span>
                );
              }
              if (nextCue) {
                const away = nextCue.at - cueTime;
                return (
                  <span className="text-slate-500 truncate">
                    next cue in {away.toFixed(1)}s
                  </span>
                );
              }
              return null;
            })()}
            <span className="text-slate-400 shrink-0">
              {Math.floor(songSec / 60)}:{Math.floor(songSec % 60).toString().padStart(2, '0')}
              <span className="text-slate-600"> / {Math.floor(displayDuration / 60)}:{Math.floor(displayDuration % 60).toString().padStart(2, '0')}</span>
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-900 border border-slate-800">
            <SlidersHorizontal className="w-3 h-3 text-cyan-400" />
            <span className="text-[10px] font-mono text-slate-400">sync</span>
            <input
              type="range" min="-3" max="3" step="0.05" value={nudge}
              onChange={(e) => onNudge(parseFloat(e.target.value))}
              className="w-24 h-1 accent-cyan-400 cursor-pointer"
              title="Nudge lyrics/film against the audio"
            />
            <span className="text-[10px] font-mono text-cyan-300 w-11 text-right">
              {nudge > 0 ? '+' : ''}{nudge.toFixed(2)}s
            </span>
            {nudge !== 0 && (
              <button onClick={() => onNudge(0)} className="text-[10px] font-mono text-slate-500 hover:text-white cursor-pointer">reset</button>
            )}
          </div>
          <button
            onClick={() => setOpen(o => !o)}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-mono font-bold cursor-pointer"
          >
            {open ? 'Hide' : 'Track / map'}
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-3 grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[11px] font-bold text-cyan-300 font-mono block mb-2">REPLACE THE TRACK</span>
            <button
              onClick={() => fileRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold font-mono cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" /> Load local MP3 / WAV
            </button>
            <input ref={fileRef} type="file" accept="audio/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
            <div className="flex items-center gap-1.5 mt-2">
              <input
                value={url} onChange={(e) => setUrl(e.target.value)}
                placeholder="…or a direct audio URL"
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-[11px] font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
              />
              <button onClick={handleUrl} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer" title="Load URL">
                <Link2 className="w-3.5 h-3.5" />
              </button>
            </div>
            {err && <span className="text-[10px] text-rose-400 font-mono block mt-1">{err}</span>}
            <p className="text-[10px] text-slate-500 font-mono mt-2 leading-relaxed break-all">
              {film.id === 'bri'
                ? ready
                  ? 'Bundled Suno master loaded: 104.96 seconds. The 24 line landmarks follow the intended 48-bar structure and are scaled to the track; no sung-word ASR or hand-timed onset pass has been done yet.'
                  : 'Bundled Suno render is loading. The 24 lyric landmarks are structural estimates; listen through and adjust any drift.'
                : film.id === 'anthropic'
                ? ready
                  ? 'The 9-second intro trim is loaded (about 1:51 total). Your noted 0:12 vocal entrance should now land near 0:03. The first lyric caption waits until 0:03; the remaining 4.5-second landmarks are provisional and need listening review.'
                  : 'The 9-second intro-trimmed MP3 is loading. Cue positions remain provisional until the lyrics are checked against the vocal.'
                : film.id === 'ai-short'
                ? ready
                  ? 'The supplied 84.79s Suno master is loaded. Phrase cue starts come from word-level Whisper timestamps; check them by listening before treating them as final.'
                  : 'The bundled Suno master is 84.79s. Phrase cue starts are estimated from word-level Whisper timestamps on this track.'
                : song.url
                  ? `default: ${decodeURIComponent(song.url.split('/').slice(-1)[0])} — section landmarks match this render; lyric-line boundaries are estimates.`
                  : 'No bundled audio yet. Cue estimates are for the supplied Suno render and may not match a replacement track.'}
            </p>
          </div>

          <div className="lg:col-span-2 p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-amber-300 font-mono">
                {film.id === 'bri' ? 'ESTIMATED LYRIC → FILM MAP · REVIEW CUES' : film.id === 'anthropic' ? 'PROVISIONAL STORYBOARD TARGETS' : film.id === 'ai-short' ? 'PROVISIONAL LYRIC → FILM PLAN' : 'ESTIMATED LYRIC → FILM MAP'}
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                film now: {filmTimeForSongAt(film, songSec, trackEngine.duration).toFixed(1)}s
              </span>
            </div>
            <div className="max-h-48 overflow-y-auto space-y-0.5 pr-1">
              {song.cues.map((l, i) => {
                const on = mapClock >= l.at && mapClock < l.to;
                const done = mapClock >= l.to;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 px-2 py-1 rounded text-[10px] font-mono ${
                      on ? 'bg-rose-500/25 border border-rose-500/50 text-white'
                         : done ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    <span className="w-16 shrink-0 tabular-nums">{film.id === 'anthropic' || film.id === 'bri' ? `film ${l.at.toFixed(1)}s` : `${l.at.toFixed(2)}s`}</span>
                    <span className="flex-1 truncate">{l.label}</span>
                    <span className="w-24 shrink-0 text-right tabular-nums text-cyan-400/80">
                      film {l.film[0].toFixed(1)}–{l.film[1].toFixed(1)}s
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-slate-500 font-mono mt-2 leading-relaxed">
              {film.id === 'bri'
                ? 'The 104.96s render is proportionally mapped across the 108s film clock. Cue starts are evenly spaced from the intended two-bars-per-line arrangement, not forced-aligned or hand-audited; listen to the master and refine them before final export.'
                : film.id === 'anthropic'
                ? 'The first vocal entrance at 0:03 is set from your timing note. Later 4.5-second lyric landmarks are provisional estimates, not measured vocal starts. Listen through and tell me where they drift so I can refine the remaining cues.'
                : film.id === 'ai-short'
                ? 'The map is based on word-level Whisper timestamp inference from the supplied song and its embedded lyric text. It is phrase-level, not forced alignment; ASR timing can drift on sung syllables and ad-libs, so audition the cut before calling it final.'
                : 'Section boundaries are estimated from the stereo mix; individual line boundaries are syllable-weighted estimates, not forced-aligned word onsets. Following your latest timing note, the ending visuals advance progressively (3/6/9 seconds) so the full bubble-question reveal begins 9 seconds before its estimated cue. Song mode remains caption-free.'}
            </p>
          </div>
          {(song.stylePrompt || song.lyrics) && (
            <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
              {song.stylePrompt && (
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-emerald-300 font-mono">SUNO STYLE PROMPT</span>
                    <button onClick={() => copyText('style', song.stylePrompt)} className="flex items-center gap-1 text-[10px] font-mono text-cyan-300 hover:text-white cursor-pointer">
                      <Copy className="w-3 h-3" /> {copied === 'style' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{song.stylePrompt}</p>
                </div>
              )}
              {song.lyrics && (
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-amber-300 font-mono">
                      {film.id === 'bri' ? 'LYRICS · 1:44.96 MASTER · CUE REVIEW' : film.id === 'anthropic' ? 'LYRICS · 9S INTRO TRIM · CUES TO REVIEW' : film.id === 'ai-short' ? 'LYRICS · 1:25 SHORT · PROVISIONAL CUES' : 'LYRICS · TRACK 2:11.64'}
                    </span>
                    <button onClick={() => copyText('lyrics', song.lyrics)} className="flex items-center gap-1 text-[10px] font-mono text-cyan-300 hover:text-white cursor-pointer">
                      <Copy className="w-3 h-3" /> {copied === 'lyrics' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="max-h-64 overflow-y-auto whitespace-pre-wrap font-mono text-[10px] text-slate-300 leading-relaxed">{song.lyrics}</pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
