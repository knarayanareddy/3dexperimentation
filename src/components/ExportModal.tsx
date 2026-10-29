import React, { useRef, useState } from 'react';
import { Camera, Download, Check, X, Film, Loader2, AlertTriangle, Music4, Video } from 'lucide-react';
import { Chapter } from '../types/video';
import { VideoExporter, ExportMode } from '../engine/exporter';
import { trackEngine } from '../engine/track';


interface ExportModalProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isOpen: boolean;
  onClose: () => void;
  mode: 'narration' | 'song';
  chapters: Chapter[];
  duration: number;
  film: import('../data/films').Film;
  /** called when recording starts, so the live player can be paused */
  onPause?: () => void;
}

type Phase = 'idle' | 'recording' | 'done' | 'error';

export const ExportModal: React.FC<ExportModalProps> = ({
  canvasRef,
  isOpen,
  onClose,
  mode,
  chapters,
  duration,
  film,
  onPause
}) => {
  const [note, setNote] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [prog, setProg] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [total, setTotal] = useState(0);
  const [errMsg, setErrMsg] = useState('');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState('jev-video.webm');
  const exporterRef = useRef<VideoExporter | null>(null);

  if (!isOpen) return null;

  const supported = VideoExporter.isSupported();
  const isSong = mode === 'song';
  const songReady = trackEngine.ready;
  const exportWidth = film.canvasWidth ?? 1280;
  const exportHeight = film.canvasHeight ?? 720;
  const exportMode: ExportMode = isSong ? 'song' : 'silent';
  const songDuration = film.song?.duration ?? duration;

  const fmt = (s: number) => `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;

  const beginVideoExport = () => {
    if (!supported) return;
    setPhase('recording');
    setProg(0);
    setNote(null);
    setErrMsg('');
    setDownloadUrl(null);
    // the exporter needs the audio device; silence the live player
    onPause?.();

    const ex = new VideoExporter();
    exporterRef.current = ex;
    ex.start({
      film,
      mode: exportMode,
      onProgress: (p, el, tot) => {
        setProg(p);
        setElapsed(el);
        setTotal(tot);
      },
      onDone: (blob, _mime, ext) => {
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        const slug = film.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        setFileName(`${slug}.${ext}`);
        setPhase('done');
        setNote(
          isSong
            ? `Video with the song embedded — ${(blob.size / 1e6).toFixed(1)} MB.`
            : `Silent video exported — ${(blob.size / 1e6).toFixed(1)} MB.`
        );
      },
      onError: (m) => {
        setErrMsg(m);
        setPhase('error');
      }
    });
  };

  const cancelExport = () => {
    exporterRef.current?.cancel();
    setPhase('idle');
    setProg(0);
    setNote(null);
  };

  const captureFrame = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.download = `jev-frame-${Date.now()}.png`;
    a.href = url;
    a.click();
    setNote('Frame snapshot saved.');
    setTimeout(() => setNote(null), 3000);
  };

  const exportStoryboard = () => {
    const blob = new Blob([JSON.stringify(chapters, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = 'jev-storyboard.json';
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
    setNote('Storyboard JSON exported.');
    setTimeout(() => setNote(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Film className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-white">Studio Export</h3>
          </div>
          <button
            onClick={() => { if (phase === 'recording') cancelExport(); onClose(); }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {note && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" /> {note}
          </div>
        )}

        {/* ---------- VIDEO EXPORT ---------- */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                <Video className="w-4 h-4 text-rose-400" /> Export video file
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                Records the painted film at {exportWidth}×{exportHeight} / 30fps and embeds the audio,
                producing a shareable WebM.
              </p>
            </div>
            {isSong && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30 shrink-0 whitespace-nowrap">
                ♫ song in
              </span>
            )}
          </div>

          {!isSong && (
            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-[10.5px] text-amber-200/90 leading-relaxed">
                You're in <strong>Narrated Film</strong> mode. Browser text-to-speech cannot be
                captured into a file, so this export would be silent. Switch to{' '}
                <strong>Song Mode</strong> first to get the video with music embedded.
              </p>
            </div>
          )}

          {isSong && !songReady && (
            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-[10.5px] text-amber-200/90 leading-relaxed">
                Load the generated audio in Song Studio before recording. The user-supplied track will be embedded and its duration will drive the film.
              </p>
            </div>
          )}

          {!supported && (
            <div className="flex items-start gap-2 p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/30">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
              <p className="text-[10.5px] text-rose-200/90">
                Video recording isn't available in this browser. Chrome or Edge on desktop works best.
              </p>
            </div>
          )}

          {/* recording state */}
          {phase === 'recording' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-400" />
                Recording in real time… {fmt(elapsed)} / {fmt(total || (isSong ? songDuration : duration))}
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-[width] duration-200"
                  style={{ width: `${prog * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500">
                  {(prog * 100).toFixed(0)}% · keep this tab in the foreground
                </span>
                <button
                  onClick={cancelExport}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-mono cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {phase === 'done' && downloadUrl && (
            <a
              href={downloadUrl}
              download={fileName}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-sm shadow-lg cursor-pointer"
            >
              <Download className="w-4 h-4" /> Download {fileName}
            </a>
          )}

          {phase === 'error' && (
            <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-[11px] text-rose-200 font-mono">
              {errMsg}
            </div>
          )}

          {phase !== 'recording' && supported && (
            <button
              onClick={beginVideoExport}
              disabled={!supported || (isSong && !songReady)}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm cursor-pointer transition-all ${
                isSong
                  ? 'bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 shadow-lg'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {isSong ? <Music4 className="w-4 h-4" /> : <Video className="w-4 h-4" />}
              {isSong
                ? songReady ? `Record video with song (${fmt(trackEngine.duration || songDuration)})` : 'Load audio to enable song export'
                : `Record silent video (${fmt(duration)})`}
            </button>
          )}
        </div>

        {/* ---------- stills / data ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={captureFrame}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500 text-slate-200 transition-all cursor-pointer group"
          >
            <Camera className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold font-mono">Capture Frame PNG</span>
            <span className="text-[10px] text-slate-400 text-center">the current canvas at full resolution</span>
          </button>

          <button
            onClick={exportStoryboard}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500 text-slate-200 transition-all cursor-pointer group"
          >
            <Download className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold font-mono">Export STORYBOARD.json</span>
            <span className="text-[10px] text-slate-400 text-center">cues, timings and code specs</span>
          </button>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-[10.5px] text-slate-400 leading-relaxed">
          <span className="text-cyan-400 font-bold">Renderer spec:</span> recording runs in real
          time with the audio element as the clock, so the picture in the file is driven by the
          same time source you hear. {exportWidth}×{exportHeight} @ 30fps, VP9/Opus WebM.
        </div>
      </div>
    </div>
  );
};
