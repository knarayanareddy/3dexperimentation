/**
 * track.ts — plays a real audio file (your Suno render) and acts as the
 * master clock for Song Mode. The film is slaved to it.
 */

class TrackEngine {
  private el: HTMLAudioElement | null = null;
  private objectUrl: string | null = null;
  private _ready = false;
  private _name = '';
  private sourceKey = '';
  private offset = 0; // manual nudge in seconds (+ = lyrics later)
  private onChange?: () => void;

  public setOnChange(cb: () => void) { this.onChange = cb; }

  public get ready() { return this._ready; }
  public get name() { return this._name; }
  public get duration() { return this.el?.duration && isFinite(this.el.duration) ? this.el.duration : 0; }
  public get playing() { return !!this.el && !this.el.paused && !this.el.ended; }

  public getOffset() { return this.offset; }
  public setOffset(v: number) { this.offset = Math.max(-5, Math.min(5, v)); }

  // --- drift-corrected interpolated clock -------------------------------
  // HTMLMediaElement.currentTime only ticks ~4x/sec, which is too coarse
  // to drive animation. We advance a predicted clock with rAF and gently
  // pull it toward the element's real time whenever that actually changes.
  private lastCT = -1;          // last distinct currentTime we observed
  private lastPerf = 0;         // performance.now() at that observation
  private predicted = 0;        // our smooth estimate

  private tick(): number {
    if (!this.el) return 0;
    const ct = this.el.currentTime;
    const now = performance.now();

    if (ct !== this.lastCT) {
      // fresh reading from the element
      if (this.lastCT < 0 || !this.playing) {
        this.predicted = ct;                       // hard sync on seek/pause
      } else {
        // soft-correct: ease the prediction onto truth (no visible jumps)
        const err = ct - this.predicted;
        if (Math.abs(err) > 0.25) this.predicted = ct;   // big slip: snap
        else this.predicted += err * 0.35;                // small slip: ease
      }
      this.lastCT = ct;
      this.lastPerf = now;
    } else if (this.playing) {
      // between element updates, advance by wall-clock
      this.predicted += (now - this.lastPerf) / 1000;
      this.lastPerf = now;
    }

    if (this.duration) this.predicted = Math.min(this.predicted, this.duration);
    return Math.max(0, this.predicted);
  }

  /** Current position in seconds: smooth, drift-corrected, nudge applied. */
  public time(): number {
    if (!this.el) return 0;
    return Math.max(0, this.tick() + this.offset);
  }

  /** Raw element time (no interpolation), for diagnostics. */
  public rawTime(): number {
    return this.el ? this.el.currentTime + this.offset : 0;
  }

  private resetClock() {
    this.lastCT = -1;
    this.lastPerf = performance.now();
    this.predicted = this.el ? this.el.currentTime : 0;
  }

  /** Relative position 0..1 of the track. */
  public rel(): number {
    const d = this.duration;
    return d > 0 ? Math.max(0, Math.min(1, this.time() / d)) : 0;
  }

  public async loadFile(file: File) {
    this.dispose(false);
    this.objectUrl = URL.createObjectURL(file);
    this._name = file.name;
    this.sourceKey = `file:${file.name}:${file.size}:${file.lastModified}`;
    await this.attach(this.objectUrl);
  }

  public async loadUrl(url: string) {
    this.dispose(false);
    this._name = decodeURIComponent(url.split('/').pop() || 'track');
    this.sourceKey = url;
    await this.attach(url);
  }

  /** Load the bundled JEV.mp3 once (idempotent). */
  private autoPromise: Promise<void> | null = null;
  public ensureDefault(url: string): Promise<void> {
    if (this._ready && this.sourceKey === url) return Promise.resolve();
    if (this.sourceKey !== url) this.autoPromise = null;
    if (!this.autoPromise) {
      this.autoPromise = this.loadUrl(url).catch(() => {
        this.autoPromise = null;
      });
    }
    return this.autoPromise;
  }

  private attach(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const a = new Audio();
      a.src = src;
      a.crossOrigin = 'anonymous';
      a.preload = 'auto';
      a.onloadedmetadata = () => {
        this._ready = true;
        this.onChange?.();
        resolve();
      };
      a.onerror = () => {
        this._ready = false;
        this.onChange?.();
        reject(new Error('Could not load audio'));
      };
      a.onended = () => this.onChange?.();
      this.el = a;
    });
  }

  public play(fromRel?: number) {
    if (!this.el) return;
    if (fromRel != null && this.duration > 0) {
      this.el.currentTime = Math.max(0, Math.min(this.duration - 0.05, fromRel * this.duration));
    }
    this.resetClock();
    this.el.play().catch(() => { /* autoplay guard */ });
  }

  /** Play from an absolute song second (the nudge is compensated for). */
  public playSec(sec: number) {
    if (!this.el) return;
    this.seekSec(sec);
    this.resetClock();
    this.el.play().catch(() => { /* autoplay guard */ });
  }

  public pause() { this.el?.pause(); this.resetClock(); }

  public seekRel(rel: number) {
    if (!this.el || !this.duration) return;
    this.el.currentTime = Math.max(0, Math.min(this.duration - 0.05, rel * this.duration));
    this.resetClock();
  }

  /** Seek to an absolute song second, compensating for the sync nudge. */
  public seekSec(sec: number) {
    if (!this.el || !this.duration) return;
    this.el.currentTime = Math.max(0, Math.min(this.duration - 0.05, sec - this.offset));
    this.resetClock();
  }

  public setVolume(v: number) { if (this.el) this.el.volume = Math.max(0, Math.min(1, v)); }

  public dispose(full = true) {
    if (this.el) { this.el.pause(); this.el.src = ''; this.el = null; }
    if (this.objectUrl) { URL.revokeObjectURL(this.objectUrl); this.objectUrl = null; }
    this._ready = false;
    this.autoPromise = null;
    if (full) {
      this._name = '';
      this.sourceKey = '';
    }
  }
}

export const trackEngine = new TrackEngine();
