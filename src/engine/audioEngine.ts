import { Shot } from '../types/video';

interface CueRequest {
  cue: string;
  speaker: string;
}

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private musicVolume: number = 0.25;
  private musicInterval: number | null = null;

  // Narration state
  private synth: SpeechSynthesis | null = null;
  private voiceRegistry: Map<string, SpeechSynthesisVoice> = new Map();
  private userVoiceURI: string | null = null;
  private speechRate: number = 1.0;
  private narrationEnabled: boolean = true;
  private musicEnabled: boolean = true;
  private onSpeakingChangeCallback?: (isSpeaking: boolean) => void;

  // Ranked casting sheets per character — best-in-class neural voices first.
  private static readonly CASTING: Record<string, { prefs: string[]; pitch: number; rateMul: number }> = {
    Narrator: {
      prefs: [
        'Microsoft Guy Online (Natural)', 'Microsoft Guy - English (United States)',
        'Microsoft Brian Online (Natural)', 'Microsoft Christopher Online (Natural)',
        'Google US English', 'Alex', 'Fred', 'Daniel',
        'Microsoft David Desktop', 'Google UK English Male'
      ],
      pitch: 0.98, rateMul: 1.0
    },
    Clawd: {
      prefs: [
        'Microsoft Aria Online (Natural)', 'Microsoft Aria - English (United States)',
        'Microsoft Ana Online (Natural)', 'Microsoft Jenny Online (Natural)',
        'Google UK English Female', 'Samantha', 'Karen', 'Tessa',
        'Microsoft Zira Desktop', 'Google US English'
      ],
      pitch: 1.18, rateMul: 1.06
    },
    Engineer: {
      prefs: [
        'Microsoft Eric Online (Natural)', 'Microsoft Christopher Online (Natural)',
        'Microsoft Guy Online (Natural)', 'Google US English', 'Alex',
        'Microsoft David Desktop'
      ],
      pitch: 1.02, rateMul: 1.02
    },
    Jevons: {
      prefs: [
        'Microsoft Ryan Online (Natural)', 'Google UK English Male',
        'Daniel', 'Microsoft George - English (United Kingdom)',
        'Arthur', 'Google UK English'
      ],
      pitch: 0.9, rateMul: 0.93
    },
    Rider: {
      prefs: [
        'Microsoft Aria Online (Natural)', 'Microsoft Jenny Online (Natural)',
        'Samantha', 'Google UK English Female', 'Google US English'
      ],
      pitch: 1.04, rateMul: 1.02
    },
    Driver: {
      prefs: [
        'Microsoft Eric Online (Natural)', 'Microsoft Guy Online (Natural)',
        'Alex', 'Google US English', 'Microsoft David Desktop'
      ],
      pitch: 0.96, rateMul: 0.98
    },
    Official: {
      prefs: [
        'Microsoft Ryan Online (Natural)', 'Microsoft Brian Online (Natural)',
        'Daniel', 'Google UK English Male', 'Microsoft George'
      ],
      pitch: 0.91, rateMul: 0.94
    },
    Scientist: {
      prefs: [
        'Microsoft Aria Online (Natural)', 'Microsoft Jenny Online (Natural)',
        'Samantha', 'Google UK English Female', 'Google US English'
      ],
      pitch: 1.06, rateMul: 1.03
    },
    Caret: {
      prefs: [
        'Microsoft Ana Online (Natural)', 'Microsoft Aria Online (Natural)',
        'Karen', 'Tessa', 'Google UK English Female'
      ],
      pitch: 1.2, rateMul: 1.05
    },
    Chair: {
      prefs: [
        'Microsoft Brian Online (Natural)', 'Microsoft Ryan Online (Natural)',
        'Daniel', 'Alex', 'Google UK English Male'
      ],
      pitch: 0.88, rateMul: 0.93
    }
  };

  // Queue-based narration: cues are NEVER canceled at shot boundaries.
  private currentCue: string = '';
  private pendingCue: CueRequest | null = null;
  private segmentQueue: string[] = [];
  private isSpeaking: boolean = false;
  private keepAliveId: number | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  /** Resolve the cast: for each speaker, walk the ranked list and take the first installed voice. */
  private loadVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (!voices.length) return;

    for (const [speaker, cfg] of Object.entries(AudioEngine.CASTING)) {
      const match = cfg.prefs
        .map((pref) =>
          voices.find((v) => v.name.toLowerCase().includes(pref.toLowerCase()))
        )
        .find(Boolean);
      if (match) this.voiceRegistry.set(speaker, match);
    }
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    return this.synth.getVoices().filter((v) => v.lang.startsWith('en'));
  }

  /** User override: apply one voice to every speaker. Pass null to restore auto-casting. */
  public setUserVoice(voiceURI: string | null) {
    this.userVoiceURI = voiceURI;
    try {
      if (voiceURI) localStorage.setItem('jev-studio-voice', voiceURI);
      else localStorage.removeItem('jev-studio-voice');
    } catch {
      // ignore
    }
    // restart narration cleanly with the new voice
    this.interruptIfSpeaking();
  }

  public getUserVoice(): string | null {
    if (this.userVoiceURI) return this.userVoiceURI;
    try {
      this.userVoiceURI = localStorage.getItem('jev-studio-voice');
    } catch {
      // ignore
    }
    return this.userVoiceURI;
  }

  private interruptIfSpeaking() {
    if (this.isSpeaking || this.pendingCue) {
      this.pendingCue = null;
      this.segmentQueue = [];
      this.cancelSpeech();
      this.currentCue = ''; // force the current shot's cue to re-speak in the new voice
    }
  }

  /** Pick the voice + prosody for a speaker. */
  private castFor(speaker: string): { voice: SpeechSynthesisVoice | null; pitch: number; rate: number } {
    let voice: SpeechSynthesisVoice | null = null;
    if (this.synth) {
      const uri = this.getUserVoice();
      if (uri) voice = this.synth.getVoices().find((v) => v.voiceURI === uri) || null;
    }
    if (!voice) voice = this.voiceRegistry.get(speaker) || this.voiceRegistry.get('Narrator') || null;
    if (!voice && this.synth) {
      voice = this.synth.getVoices().find((v) => v.lang.startsWith('en')) || null;
    }
    const cfg = AudioEngine.CASTING[speaker] || AudioEngine.CASTING.Narrator;
    // when a single user voice is forced for everyone, still vary pitch so characters differ
    return { voice, pitch: cfg.pitch, rate: this.speechRate * cfg.rateMul };
  }

  public setOnSpeakingChange(cb: (speaking: boolean) => void) {
    this.onSpeakingChangeCallback = cb;
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  private initAudioContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopNarration(true);
      this.stopMusic();
    }
  }

  public setNarrationEnabled(enabled: boolean) {
    this.narrationEnabled = enabled;
    if (!enabled) {
      this.stopNarration(true);
    }
  }

  public setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (!enabled) {
      this.stopMusic();
    }
  }

  public setMusicVolume(vol: number) {
    this.musicVolume = Math.max(0, Math.min(1, vol));
  }

  public setSpeechRate(rate: number) {
    this.speechRate = rate;
  }

  /** Current video playback rate — speech adapts so cues fit their shot windows. */
  private videoRate: number = 1;
  public setVideoRate(rate: number) {
    this.videoRate = Math.max(0.6, Math.min(1.8, rate));
  }

  // ---- Self-calibrating speech pacing ----
  // We measure each spoken cue (wall-clock seconds / words) with an EMA so
  // every platform voice (fast Edge neural vs slow Safari Samantha) auto-tunes.
  private wpsAvg: number = 2.75;
  private cueStartMs: number = 0;
  // --- live speech progress (drives the film + caption highlighting) ---
  private cueText: string = '';
  private cueChars: number = 1;
  private segBase: number = 0;        // chars completed before current segment
  private spokenChars: number = 0;    // chars spoken so far (boundary events)
  private progressRaw: number = 0;    // 0..1 from boundary events
  private progressSmooth: number = 0; // interpolated between boundaries
  private lastBoundaryMs: number = 0;
  private estCueMs: number = 1;
  private cueWords: number = 0;
  private cueRate: number = 1.0;

  private estimateWallSeconds(words: number, rate: number): number {
    return words / Math.max(1.4, this.wpsAvg * rate);
  }

  /**
   * How long (in VIDEO seconds) this cue will take to speak at natural pace.
   * The scheduler uses this to stretch the shot's animation to match the voice.
   */
  public estimateCueDuration(cue: string, speaker: string): number {
    const words = Math.max(1, cue.trim().split(/\s+/).length);
    const cast = this.castFor(speaker);
    const wall = this.estimateWallSeconds(words, cast.rate);
    // convert wall-clock to video seconds; small breath only (the scheduler
    // advances the moment speech ends, so long tails would read as dead air)
    return wall * this.videoRate + 0.25;
  }

  /**
   * Speak a cue immediately at natural pace. The scheduler calls this exactly
   * once per shot and stretches that shot's animation to the spoken length,
   * so picture, captions and voice advance as one unit.
   */
  public speakNow(cue: string, speaker: string) {
    if (!this.synth || !this.narrationEnabled || this.isMuted) return;
    this.pendingCue = null;
    this.segmentQueue = [];
    this.currentCue = cue;
    this.speakCue({ cue, speaker });
  }

  /**
   * Legacy reactive entry point (kept for compatibility with other callers).
   */
  public syncShotNarration(shot: Shot, isPlaying: boolean, currentTime: number) {
    if (!this.synth) return;
    if (!this.narrationEnabled || this.isMuted) {
      return;
    }
    if (!isPlaying) return;
    if (shot.cue === this.currentCue) return;

    // Don't start a brand-new cue if we are basically at the end of the shot
    const duration = Math.max(0.001, shot.endTime - shot.startTime);
    const prog = (currentTime - shot.startTime) / duration;

    this.currentCue = shot.cue;
    const next: CueRequest = { cue: shot.cue, speaker: shot.speaker };

    if (this.isSpeaking) {
      // (Rare fallback — the scheduler normally prevents crossing while speaking.)
      this.pendingCue = next;
    } else if (prog < 0.95) {
      this.speakCue(next);
    }
  }

  /**
   * Hard interruption: used for seeks, pause, mute, disable.
   * Resets the cue tracker so the current shot's cue restarts on resume.
   */
  public interrupt() {
    this.pendingCue = null;
    this.segmentQueue = [];
    this.currentCue = '';
    this.cancelSpeech();
  }

  /** Stop narration; optionally reset cue tracking so it restarts fresh. */
  public stopNarration(resetCue: boolean = true) {
    this.pendingCue = null;
    this.segmentQueue = [];
    if (resetCue) this.currentCue = '';
    this.cancelSpeech();
  }

  private cancelSpeech() {
    this.progressRaw = 0;
    this.progressSmooth = 0;
    this.spokenChars = 0;
    this.stopKeepAlive();
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // ignore
      }
    }
    this.isSpeaking = false;
    this.onSpeakingChangeCallback?.(false);
  }

  /** Split long text into safe sentence chunks to avoid Chrome's ~15s utterance truncation. */
  private splitIntoSegments(text: string): string[] {
    const MAX = 200;
    if (text.length <= MAX) return [text];
    const sentences = text.match(/[^.!?]+[.!?]+[\s]*/g) || [text];
    const segments: string[] = [];
    let acc = '';
    for (const s of sentences) {
      if ((acc + s).length > MAX && acc.length > 0) {
        segments.push(acc.trim());
        acc = s;
      } else {
        acc += s;
      }
    }
    if (acc.trim().length > 0) segments.push(acc.trim());
    return segments.length > 0 ? segments : [text];
  }

  private speakCue(req: CueRequest) {
    if (!this.synth || !this.narrationEnabled || this.isMuted) {
      this.finishNarration();
      return;
    }

    // Always speak at the character's NATURAL pace. The film stretches to the
    // voice (never the other way around), so nothing ever sounds rushed.
    const words = Math.max(1, req.cue.trim().split(/\s+/).length);
    const cast = this.castFor(req.speaker);
    const rate = cast.rate;
    this.cueRate = rate;
    this.cueWords = words;
    this.cueStartMs = performance.now();
    this.cueText = req.cue;
    this.cueChars = Math.max(1, req.cue.length);
    this.segBase = 0;
    this.spokenChars = 0;
    this.progressRaw = 0;
    this.progressSmooth = 0;
    this.lastBoundaryMs = performance.now();
    this.estCueMs = Math.max(600, this.estimateWallSeconds(words, rate) * 1000);

    // Cancel any stale speech, then chain segments
    try {
      this.synth.cancel();
    } catch {
      // ignore
    }
    this.segmentQueue = this.splitIntoSegments(req.cue);
    this.speakNextSegment(req.speaker, rate);
  }

  private speakNextSegment(speaker: string, rate: number) {
    if (!this.synth || !this.narrationEnabled || this.isMuted) {
      this.segmentQueue = [];
      this.finishNarration();
      return;
    }

    const text = this.segmentQueue.shift();
    if (!text) {
      this.finishNarration();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const cast = this.castFor(speaker);
    if (cast.voice) {
      utterance.voice = cast.voice;
    }
    utterance.pitch = cast.pitch;
    utterance.rate = rate;
    utterance.volume = 0.95;

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.startKeepAlive();
      this.onSpeakingChangeCallback?.(true);
    };

    // Word boundaries give us the true read position inside the cue.
    utterance.onboundary = (ev: SpeechSynthesisEvent) => {
      const ci = typeof ev.charIndex === 'number' ? ev.charIndex : 0;
      const abs = this.segBase + ci;
      if (abs >= this.spokenChars) {
        this.spokenChars = abs;
        this.progressRaw = Math.min(1, abs / this.cueChars);
        if (this.progressSmooth < this.progressRaw) this.progressSmooth = this.progressRaw;
        this.lastBoundaryMs = performance.now();
      }
    };

    const done = () => {
      this.segBase += text.length + 1;
      if (this.segmentQueue.length > 0) {
        // Chain the next sentence chunk of this same cue
        this.speakNextSegment(speaker, rate);
      } else {
        this.finishNarration();
      }
    };

    utterance.onend = done;
    utterance.onerror = done;

    try {
      this.synth.speak(utterance);
    } catch {
      done();
    }
  }

  /**
   * How far through the current cue the voice actually is, 0..1.
   * Boundary events give exact anchors; between them we interpolate by
   * wall-clock so the picture moves smoothly instead of stepping.
   */
  public cueProgress(): number {
    if (!this.isSpeaking) return this.progressRaw >= 1 ? 1 : this.progressSmooth;
    const since = performance.now() - this.lastBoundaryMs;
    const drift = Math.min(0.14, (since / this.estCueMs));
    const est = Math.min(0.995, this.progressRaw + drift);
    if (est > this.progressSmooth) this.progressSmooth = est;
    return this.progressSmooth;
  }

  /** Characters of the current cue already spoken (for caption highlighting). */
  public spokenCharCount(): number {
    const p = this.cueProgress();
    return Math.round(p * this.cueChars);
  }

  public currentCueText(): string { return this.cueText; }

  // A cue (or its queued successor) fully completed
  private finishNarration() {
    this.stopKeepAlive();

    // WPS self-calibration from the cue we just finished
    if (this.cueStartMs > 0 && this.cueWords > 0) {
      const measured = Math.max(0.3, (performance.now() - this.cueStartMs) / 1000);
      const wps = Math.min(5, Math.max(1.2, this.cueWords / measured)) * this.cueRate; // normalize back to rate=1
      const measuredAtRate1 = Math.min(4.5, wps / this.cueRate);
      this.wpsAvg = this.wpsAvg * 0.65 + Math.min(4.5, Math.max(1.3, measuredAtRate1)) * 0.35;
      this.cueStartMs = 0;
    }

    // If a cue was queued while the previous one was speaking, play it now — seamless handoff.
    if (this.pendingCue && this.narrationEnabled && !this.isMuted && this.synth) {
      const next = this.pendingCue;
      this.pendingCue = null;
      this.speakCue(next);
      return;
    }

    this.isSpeaking = false;
    this.onSpeakingChangeCallback?.(false);
  }

  // Chrome workaround: long utterances silently pause ~15s in; periodic resume() keeps them alive.
  private startKeepAlive() {
    this.stopKeepAlive();
    this.keepAliveId = window.setInterval(() => {
      try {
        if (this.synth && this.synth.speaking) {
          this.synth.resume();
        }
      } catch {
        // ignore
      }
    }, 8000);
  }

  private stopKeepAlive() {
    if (this.keepAliveId !== null) {
      clearInterval(this.keepAliveId);
      this.keepAliveId = null;
    }
  }

  // Synthesized Ambient Music Soundtrack
  public startMusic() {
    if (!this.musicEnabled || this.isMuted) return;
    this.initAudioContext();
    if (!this.ctx) return;
    if (this.musicInterval) return;

    const chords = [
      [146.83, 220.0, 261.63, 349.23], // Dm7
      [174.61, 261.63, 329.63, 392.0], // Fmaj7
      [196.0, 246.94, 293.66, 392.0], // G
      [130.81, 196.0, 261.63, 329.63] // C
    ];

    let chordIdx = 0;

    const playChord = () => {
      if (!this.ctx || !this.musicEnabled || this.isMuted) return;

      const freqs = chords[chordIdx % chords.length];
      chordIdx++;

      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const now = this.ctx.currentTime;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime((this.musicVolume * 0.12) / freqs.length, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 5.8);
      });
    };

    playChord();
    this.musicInterval = window.setInterval(playChord, 5500);
  }

  public stopMusic() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  // Reactive Sound Effects
  public playZap() {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.15);
      gain.gain.setValueAtTime(this.musicVolume * 0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.17);
    } catch {
      // ignore
    }
  }

  public playClick() {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      gain.gain.setValueAtTime(this.musicVolume * 0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // ignore
    }
  }

  public playChime() {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.3);
      gain.gain.setValueAtTime(this.musicVolume * 0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.65);
    } catch {
      // ignore
    }
  }

  public playApplause() {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.8));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1000;
      filter.Q.value = 1.2;
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(this.musicVolume * 0.25, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
      noise.stop(now + 2.2);
    } catch {
      // ignore
    }
  }

  public dispose() {
    this.stopMusic();
    this.stopNarration(true);
    this.stopKeepAlive();
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch {
        // ignore
      }
      this.ctx = null;
    }
  }
}

export const audioEngine = new AudioEngine();
