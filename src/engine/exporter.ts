/**
 * exporter.ts — records the painted film to a downloadable video file with the
 * song embedded.
 *
 * How it works:
 *   • Renders every frame to a dedicated 1280x720 canvas with the same
 *     renderFrame() the player uses.
 *   • Captures video via canvas.captureStream().
 *   • Loads the song into a SEPARATE <audio> element (so the player's own
 *     element is untouched), routes it through a Web Audio graph into a
 *     MediaStreamAudioDestinationNode, and merges that track into the recording.
 *   • MediaRecorder writes VP9/VP8 + Opus into a WebM you can download.
 *
 * The audio element is the clock, so what you hear is exactly what lands in the
 * file — the film is driven by the same time source that is being recorded.
 */

import { renderFrame } from './animator';
import { Film, filmShotIndexAt, filmTimeForSongAt } from '../data/films';
import { trackEngine } from './track';

export type ExportMode = 'song' | 'silent';

export interface ExportOpts {
  film: Film;
  mode: ExportMode;
  width?: number;
  height?: number;
  fps?: number;
  videoBitrate?: number;
  audioBitrate?: number;
  onProgress?: (p: number, elapsedSec: number, totalSec: number) => void;
  onDone?: (blob: Blob, mime: string, ext: string) => void;
  onError?: (msg: string) => void;
}

export class VideoExporter {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private rec: MediaRecorder | null = null;
  private ac: AudioContext | null = null;
  private audioEl: HTMLAudioElement | null = null;
  private objUrl: string | null = null;
  private raf = 0;
  private cancelled = false;
  private boil = 0;
  private lastTs = 0;
  private startedAt = 0;

  /** Best available recording mime type in this browser. */
  public static pickMime(): { mime: string; ext: string } {
    const cands: Array<[string, string]> = [
      ['video/webm;codecs=vp9,opus', 'webm'],
      ['video/webm;codecs=vp8,opus', 'webm'],
      ['video/webm', 'webm'],
      ['video/mp4;codecs=avc1.42E01E,mp4a.40.2', 'mp4'],
      ['video/mp4', 'mp4']
    ];
    for (const [m, ext] of cands) {
      try {
        if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(m)) {
          return { mime: m, ext };
        }
      } catch { /* keep trying */ }
    }
    return { mime: '', ext: 'webm' };
  }

  public static isSupported(): boolean {
    return (
      typeof MediaRecorder !== 'undefined' &&
      typeof HTMLCanvasElement !== 'undefined' &&
      typeof HTMLCanvasElement.prototype.captureStream === 'function' &&
      VideoExporter.pickMime().mime !== ''
    );
  }

  public get isRecording(): boolean {
    return !!this.rec && this.rec.state === 'recording';
  }

  public async start(opts: ExportOpts): Promise<void> {
    const W = opts.width ?? opts.film.canvasWidth ?? 1280;
    const H = opts.height ?? opts.film.canvasHeight ?? 720;
    const fps = opts.fps ?? 30;
    this.cancelled = false;

    if (!VideoExporter.isSupported()) {
      opts.onError?.(
        'This browser cannot record video (MediaRecorder / canvas.captureStream unavailable). Try Chrome or Edge.'
      );
      return;
    }

    // ---- canvas ----
    this.canvas = document.createElement('canvas');
    this.canvas.width = W;
    this.canvas.height = H;
    this.ctx = this.canvas.getContext('2d', { alpha: false });
    if (!this.ctx) {
      opts.onError?.('Could not create a 2D context.');
      return;
    }

    // Paint the first frame before capture so the stream never starts black.
    renderFrame(opts.film, this.ctx, W, H, 0, 1 / fps, false, 0);

    const stream: MediaStream = this.canvas.captureStream(fps);

    // ---- audio ----
    if (opts.mode === 'song') {
      const song = opts.film.song;
      if (!song) {
        this.cleanup();
        opts.onError?.('This film does not have an aligned song yet.');
        return;
      }
      try {
        this.ac = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        await this.ac.resume();

        // fresh element + object URL so the player's element is untouched
        const trackUrl = trackEngine.getSourceForExport() || song.url;
        if (!trackUrl) throw new Error('No audio track loaded');
        const resp = await fetch(trackUrl);
        if (!resp.ok) throw new Error(`fetch ${resp.status}`);
        const buf = await resp.arrayBuffer();
        this.objUrl = URL.createObjectURL(new Blob([buf], { type: resp.headers.get('content-type') || 'audio/mpeg' }));

        this.audioEl = new Audio(this.objUrl);
        this.audioEl.crossOrigin = 'anonymous';
        this.audioEl.preload = 'auto';
        await new Promise<void>((res, rej) => {
          const ok = () => res();
          this.audioEl!.addEventListener('loadedmetadata', ok, { once: true });
          this.audioEl!.addEventListener('error', () => rej(new Error('audio load')), { once: true });
          setTimeout(ok, 6000); // don't hang forever
        });

        const src = this.ac.createMediaElementSource(this.audioEl);
        const dest = this.ac.createMediaStreamDestination();
        src.connect(dest); // recorded — deliberately NOT to ac.destination (silent export)
        for (const t of dest.stream.getAudioTracks()) stream.addTrack(t);
      } catch (e) {
        this.cleanup();
        opts.onError?.(
          'Could not attach the song to the recording (network or CORS). Switch to Narrated Film export for a silent video.'
        );
        return;
      }
    }

    // ---- recorder ----
    const { mime, ext } = VideoExporter.pickMime();
    const chunks: BlobPart[] = [];
    try {
      this.rec = new MediaRecorder(stream, {
        mimeType: mime,
        videoBitsPerSecond: opts.videoBitrate ?? 8_000_000,
        audioBitsPerSecond: opts.audioBitrate ?? 192_000
      });
    } catch {
      this.cleanup();
      opts.onError?.('MediaRecorder rejected these settings.');
      return;
    }

    this.rec.ondataavailable = (ev) => {
      if (ev.data && ev.data.size > 0) chunks.push(ev.data);
    };
    this.rec.onerror = () => {
      this.cancelled = true;
      opts.onError?.('Recording failed partway through.');
    };
    this.rec.onstop = () => {
      const blob = new Blob(chunks, { type: mime });
      this.cleanup();
      if (this.cancelled && blob.size === 0) return;
      opts.onDone?.(blob, mime, ext);
    };

    // ---- drive the film from the AUDIO clock (or wall clock if silent) ----
    const film = opts.film;
    const audioDuration = this.audioEl?.duration && Number.isFinite(this.audioEl.duration) ? this.audioEl.duration : 0;
    const totalSec = opts.mode === 'song' ? (audioDuration || film.song!.duration) : film.duration;
    this.boil = 0;
    this.lastTs = performance.now();
    this.startedAt = performance.now();

    const loop = (ts: number) => {
      if (this.cancelled) return;
      const dt = Math.min(0.1, (ts - this.lastTs) / 1000);
      this.lastTs = ts;
      this.boil += dt;

      let elapsed: number;
      let nominal: number;

      if (opts.mode === 'song' && this.audioEl) {
        elapsed = this.audioEl.currentTime;
        nominal = filmTimeForSongAt(film, elapsed, audioDuration);
      } else {
        elapsed = (performance.now() - this.startedAt) / 1000;
        nominal = Math.min(film.duration, elapsed);
      }

      // keep the value inside the last shot's range
      const idx = filmShotIndexAt(film, Math.min(nominal, film.duration - 0.001));
      const s = film.shots[idx];
      const local = Math.min(Math.max(0, nominal - s.startTime), s.endTime - s.startTime - 0.001);
      renderFrame(film, this.ctx!, W, H, s.startTime + local, dt, false, this.boil);

      opts.onProgress?.(Math.min(1, elapsed / totalSec), elapsed, totalSec);

      if (elapsed >= totalSec - 0.06) {
        // let the last frames flush, then stop
        setTimeout(() => this.stop(), 350);
        return;
      }
      this.raf = requestAnimationFrame(loop);
    };

    this.rec.start(1000);
    if (opts.mode === 'song' && this.audioEl) {
      try { this.audioEl.currentTime = 0; } catch { /* ignore */ }
      await this.audioEl.play().catch(() => {});
    }
    this.raf = requestAnimationFrame(loop);
  }

  public stop() {
    if (this.rec && this.rec.state !== 'inactive') {
      try { this.rec.stop(); } catch { /* ignore */ }
    }
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
    if (this.audioEl) { this.audioEl.pause(); }
  }

  public cancel() {
    this.cancelled = true;
    this.stop();
    this.cleanup();
  }

  private cleanup() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
    if (this.audioEl) { this.audioEl.pause(); this.audioEl.src = ''; this.audioEl = null; }
    if (this.objUrl) { URL.revokeObjectURL(this.objUrl); this.objUrl = null; }
    if (this.ac) { try { this.ac.close(); } catch { /* ignore */ } this.ac = null; }
    this.canvas = null;
    this.ctx = null;
    this.rec = null;
  }
}
