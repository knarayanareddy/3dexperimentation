import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Minimize2,
  SkipBack, SkipForward, ChevronLeft, ChevronRight, Code2,
  Mic, MicOff, Music, Camera, Subtitles, Music4, MessageSquare
} from 'lucide-react';
import { Film, filmShotIndexAt, filmChapterAt, filmShotAt, shotDur, filmTimeForSongAt, songTimeForFilmAt } from '../data/films';
import { renderFrame } from '../engine/animator';
import { audioEngine } from '../engine/audioEngine';
import { trackEngine } from '../engine/track';
import { TimelineScrubber } from './TimelineScrubber';
import { CaptionBar } from './CaptionBar';
import { ChapterNav } from './ChapterNav';
import { ExportModal } from './ExportModal';
import { SongStudio } from './SongStudio';

interface VideoPlayerProps {
  film: Film;
  onTimeUpdate?: (time: number) => void;
}

type Mode = 'narration' | 'song';

// Safety valve: if a voice is pathologically slow, stop waiting after this
// many extra seconds on one shot (the picture is already fully played out).
const MAX_HOLD_SECONDS = 6;

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ film, onTimeUpdate }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const SHOTS = film.shots;
  const TOTAL_DURATION = film.duration;
  const canvasWidth = film.canvasWidth ?? 1280;
  const canvasHeight = film.canvasHeight ?? 720;
  const isPortrait = canvasHeight > canvasWidth;
  const filmRef = useRef<Film>(film);
  useEffect(() => { filmRef.current = film; }, [film]);
  const previousFilmRef = useRef(film.id);

  const [mode, setMode] = useState<Mode>(() => film.songDefault && film.hasSong ? 'song' : 'narration');
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [narrationEnabled, setNarrationEnabled] = useState<boolean>(film.narrationDefault ?? true);
  const [musicEnabled, setMusicEnabled] = useState<boolean>(film.musicDefault ?? true);
  const [captionsVisible, setCaptionsVisible] = useState<boolean>(film.captionsDefault ?? true);
  const [showCodeHUD, setShowCodeHUD] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [fps, setFps] = useState<number>(60);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState<string>(() => audioEngine.getUserVoice() || '');
  const [, setTrackTick] = useState(0);
  const [syncNudge, setSyncNudge] = useState(0);
  const [songSec, setSongSec] = useState(0);
  const [cueProg, setCueProg] = useState(0);
  const [trackLoading, setTrackLoading] = useState(false);

  // ---- narration-driven scheduler state ----
  // shotIdx: which shot is on screen. shotLocal: seconds played *within* that
  // shot, measured against its NOMINAL length (so authored keyframes land
  // exactly as designed). stretch: how much we slow the shot down so its
  // animation spans the spoken cue instead of finishing early.
  const shotIdxRef = useRef<number>(0);
  const shotLocalRef = useRef<number>(0);
  const stretchRef = useRef<number>(1);
  const holdRef = useRef<number>(0);
  const cueStartedForRef = useRef<number>(-1);

  const lastTimestampRef = useRef<number | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const fpsCountRef = useRef<number>(0);
  const fpsTimerRef = useRef<number>(performance.now());
  const boilClockRef = useRef<number>(0);
  const capTickRef = useRef<number>(0);

  const isSpeakingRef = useRef<boolean>(false);
  const narrationEnabledRef = useRef<boolean>(true);
  const isMutedRef = useRef<boolean>(false);
  const endPlayedRef = useRef<boolean>(false);
  const modeRef = useRef<Mode>('narration');
  const playbackRateRef = useRef<number>(1);

  const activeChapter = filmChapterAt(film, currentTime);
  const activeShot = filmShotAt(film, currentTime);

  // nominal timeline position from scheduler state
  const nominalTime = useCallback(() => {
    const s = filmRef.current.shots[shotIdxRef.current];
    return (s?.startTime ?? 0) + shotLocalRef.current;
  }, []);

  useEffect(() => { modeRef.current = (mode === 'song' && film.hasSong) ? 'song' : 'narration'; }, [mode, film]);
  useEffect(() => {
    if (previousFilmRef.current !== film.id || mode !== 'song' || !film.hasSong || !film.song?.url || trackEngine.ready) return;
    let active = true;
    setTrackLoading(true);
    trackEngine.ensureDefault(film.song.url)
      .then(() => { if (active) setTrackTick(n => n + 1); })
      .finally(() => { if (active) setTrackLoading(false); });
    return () => { active = false; };
  }, [mode, film]);
  // a film with no song map can only use the silent/narration transport
  useEffect(() => {
    if (!film.hasSong && mode === 'song') setMode('narration');
  }, [film, mode]);
  useEffect(() => { playbackRateRef.current = playbackRate; }, [playbackRate]);
  useEffect(() => { narrationEnabledRef.current = narrationEnabled; }, [narrationEnabled]);
  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);

  // speaking listener + voice harvest
  useEffect(() => {
    audioEngine.setOnSpeakingChange((speaking) => {
      isSpeakingRef.current = speaking;
      setIsSpeaking(speaking);
    });
    const harvest = () => {
      const v = audioEngine.getAvailableVoices();
      if (v.length) setVoices(v);
    };
    harvest();
    const timers = [250, 900, 2200].map((ms) => window.setTimeout(harvest, ms));
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.addEventListener?.('voiceschanged', harvest);
    }
    return () => {
      timers.forEach(clearTimeout);
      audioEngine.dispose();
      trackEngine.dispose();
    };
  }, []);

  useEffect(() => { audioEngine.setMuted(isMuted); trackEngine.setVolume(isMuted ? 0 : volume); }, [isMuted, volume]);
  useEffect(() => { audioEngine.setNarrationEnabled(narrationEnabled); }, [narrationEnabled]);
  useEffect(() => { audioEngine.setMusicVolume(volume); }, [volume]);
  useEffect(() => { trackEngine.setOnChange(() => setTrackTick(n => n + 1)); }, []);

  useEffect(() => {
    if (mode === 'song') { audioEngine.stopMusic(); audioEngine.interrupt(); return; }
    audioEngine.setMusicEnabled(musicEnabled);
    if (isPlaying && musicEnabled && !isMuted) audioEngine.startMusic();
    else audioEngine.stopMusic();
  }, [musicEnabled, isPlaying, isMuted, mode]);

  // ---- seeking: rebuild scheduler state from a nominal timeline position ----
  const applySeek = useCallback((newTime: number, silent = false) => {
    const clamped = Math.max(0, Math.min(newTime, TOTAL_DURATION));
    const idx = filmShotIndexAt(film, clamped);
    shotIdxRef.current = idx;
    shotLocalRef.current = clamped - SHOTS[idx].startTime;
    stretchRef.current = 1;
    holdRef.current = 0;
    cueStartedForRef.current = -1;
    if (clamped < TOTAL_DURATION) endPlayedRef.current = false;
    audioEngine.interrupt();
    setCurrentTime(clamped);
    onTimeUpdate?.(clamped);
    if (modeRef.current === 'song' && trackEngine.ready && film.song) {
      const st = songTimeForFilmAt(film, clamped, trackEngine.duration);
      trackEngine.seekSec(st);
      setSongSec(st);
    }
    if (!silent) audioEngine.playClick();
  }, [film, onTimeUpdate, SHOTS, TOTAL_DURATION]);

  const handleSeek = useCallback((t: number) => applySeek(t), [applySeek]);

  // A film change is a hard transport change: stop every audio path and return
  // to the opening frame so no scheduler state leaks across productions.
  useEffect(() => {
    if (previousFilmRef.current === film.id) return;
    previousFilmRef.current = film.id;
    setIsPlaying(false);
    const nextMode: Mode = film.songDefault && film.hasSong ? 'song' : 'narration';
    setMode(nextMode);
    modeRef.current = nextMode;
    setNarrationEnabled(film.narrationDefault ?? true);
    setMusicEnabled(film.musicDefault ?? true);
    setCaptionsVisible(film.captionsDefault ?? true);
    audioEngine.interrupt();
    audioEngine.stopMusic();
    trackEngine.dispose();
    setSongSec(0);
    setSyncNudge(0);
    applySeek(0, true);
  }, [film.id, film.songDefault, film.hasSong, film.narrationDefault, film.musicDefault, film.captionsDefault, applySeek]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (next) {
        if (nominalTime() >= TOTAL_DURATION - 0.05) applySeek(0, true);
        if (modeRef.current === 'song') {
          if (trackEngine.ready && film.song) {
            trackEngine.playSec(songTimeForFilmAt(film, nominalTime(), trackEngine.duration));
          }
        } else if (musicEnabled && !isMuted) {
          audioEngine.startMusic();
        }
      } else {
        audioEngine.interrupt();
        trackEngine.pause();
      }
      return next;
    });
  }, [applySeek, musicEnabled, isMuted, nominalTime, film]);

  const stepFrame = useCallback((d: number) => {
    setIsPlaying(false);
    trackEngine.pause();
    applySeek(nominalTime() + d / 60);
    audioEngine.stopMusic();
  }, [applySeek, nominalTime]);

  const skipSeconds = useCallback((d: number) => applySeek(nominalTime() + d), [applySeek, nominalTime]);

  const switchMode = useCallback((m: Mode) => {
    setIsPlaying(false);
    audioEngine.interrupt();
    audioEngine.stopMusic();
    trackEngine.pause();
    setMode(m);
    modeRef.current = m;
    applySeek(0, true);
  }, [applySeek, film]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
      else if (e.code === 'ArrowLeft') { e.preventDefault(); e.shiftKey ? stepFrame(-1) : skipSeconds(-5); }
      else if (e.code === 'ArrowRight') { e.preventDefault(); e.shiftKey ? stepFrame(1) : skipSeconds(5); }
      else if (e.code === 'KeyM') { e.preventDefault(); setIsMuted(m => !m); }
      else if (e.code === 'KeyC') { e.preventDefault(); setCaptionsVisible(s => !s); }
      else if (e.code === 'KeyH') { e.preventDefault(); setShowCodeHUD(h => !h); }
      else if (e.code === 'KeyF') { e.preventDefault(); toggleFullscreen(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [togglePlay, stepFrame, skipSeconds]);

  // ---------- master loop ----------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let mounted = true;

    const loop = (ts: number) => {
      if (!mounted) return;
      if (lastTimestampRef.current === null) lastTimestampRef.current = ts;
      const dt = Math.min((ts - lastTimestampRef.current) / 1000, 0.1);
      lastTimestampRef.current = ts;

      fpsCountRef.current++;
      if (ts - fpsTimerRef.current >= 1000) {
        setFps(fpsCountRef.current);
        fpsCountRef.current = 0;
        fpsTimerRef.current = ts;
      }

      if (isPlaying) boilClockRef.current += dt;

      const songMode = modeRef.current === 'song';

      if (isPlaying && songMode) {
        // ---- SONG MODE: the real track is the clock; the film is slaved ----
        const song = filmRef.current.song;
        if (trackEngine.ready && song) {
          const sec = trackEngine.time();            // absolute song seconds (+nudge)
          const nominal = filmTimeForSongAt(film, sec, trackEngine.duration); // measured cue -> film map
          const idx = filmShotIndexAt(film, nominal);
          shotIdxRef.current = idx;
          shotLocalRef.current = nominal - SHOTS[idx].startTime;
          stretchRef.current = 1;
          setSongSec(sec);
          setCurrentTime(nominal);
          onTimeUpdate?.(nominal);
          if (!trackEngine.playing && sec >= song.duration - 0.3 && !endPlayedRef.current) {
            endPlayedRef.current = true;
            setIsPlaying(false);
          }
        }
      } else if (isPlaying) {
        // ---- NARRATION MODE: the voice is the clock; the film stretches ----
        const idx = shotIdxRef.current;
        const shot = SHOTS[idx];
        const nominalDur = shotDur(shot);

        // Start this shot's cue once.
        if (cueStartedForRef.current !== idx) {
          cueStartedForRef.current = idx;
          holdRef.current = 0;
          if (narrationEnabledRef.current && !isMutedRef.current) {
            audioEngine.speakNow(shot.cue, shot.speaker);
          }
        }

        const voiceOn = narrationEnabledRef.current && !isMutedRef.current;
        const narrating = voiceOn && isSpeakingRef.current;

        if (voiceOn) {
          // ---- SPEECH-DRIVEN: the film position IS the read position ----
          // Word-boundary events tell us exactly how far through the line the
          // voice is; the shot's animation is mapped onto that progress, so a
          // visual beat can never run ahead of (or lag behind) the words.
          const p = audioEngine.cueProgress();
          const target = nominalDur * Math.min(1, p);
          // ease toward the target so corrections are never visible as jumps
          const cur = shotLocalRef.current;
          const d = target - cur;
          const step = dt * playbackRateRef.current;
          if (d > 0) {
            shotLocalRef.current = cur + Math.min(d, Math.max(step * 0.9, d * 0.14));
          } else {
            // voice paused mid-line: keep the picture gently alive, never rewind
            shotLocalRef.current = cur + step * 0.08;
          }
          if (!isSpeakingRef.current && p >= 0.999) {
            shotLocalRef.current = nominalDur;
          }
        } else {
          shotLocalRef.current += dt * playbackRateRef.current;
        }

        if (shotLocalRef.current >= nominalDur - 0.001) {
          shotLocalRef.current = nominalDur;
          if (narrating && holdRef.current < MAX_HOLD_SECONDS) {
            holdRef.current += dt;           // last syllables still landing
          } else if (idx < SHOTS.length - 1) {
            shotIdxRef.current = idx + 1;
            shotLocalRef.current = 0;
            holdRef.current = 0;
          } else if (!narrating && !endPlayedRef.current) {
            endPlayedRef.current = true;
            setIsPlaying(false);
            audioEngine.playApplause();
          }
        }

        const nt = nominalTime();
        setCurrentTime(nt);
        onTimeUpdate?.(nt);

        // publish the read position to the caption bar ~12x/sec
        if (ts - capTickRef.current > 80) {
          capTickRef.current = ts;
          setCueProg(voiceOn ? audioEngine.cueProgress() : 1);
        }
      }

      // Render: shot-local time is remapped onto the nominal timeline so every
      // authored keyframe plays exactly as designed, just slower when stretched.
      const sIdx = shotIdxRef.current;
      const renderT = SHOTS[sIdx].startTime + Math.min(shotLocalRef.current, shotDur(SHOTS[sIdx]) - 0.001);

      renderFrame(filmRef.current, ctx, canvasWidth, canvasHeight, renderT, dt, isSpeaking, boilClockRef.current);

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);
    return () => {
      mounted = false;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isPlaying, isSpeaking, onTimeUpdate, nominalTime, film, canvasWidth, canvasHeight]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;

  const isSongMode = mode === 'song' && film.hasSong;

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col w-full bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden transition-all ${isFullscreen ? 'p-0 rounded-none' : ''}`}
    >
      {/* Stage — pure cinema, no overlays */}
      <div
        className="relative bg-black overflow-hidden select-none group"
        style={{
          width: isPortrait ? `min(100%, calc(80vh * ${canvasWidth / canvasHeight}))` : '100%',
          aspectRatio: `${canvasWidth} / ${canvasHeight}`,
          maxHeight: isPortrait ? '80vh' : undefined,
          marginInline: 'auto'
        }}
      >
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className="w-full h-full object-contain block"
          onClick={togglePlay}
        />
        {!isPlaying && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[2px] cursor-pointer z-10"
          >
            <div className="w-18 h-18 rounded-full bg-gradient-to-tr from-amber-500 to-cyan-400 p-0.5 shadow-2xl group-hover:scale-110 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                <Play className="w-8 h-8 fill-cyan-400 text-cyan-400 ml-1" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Caption bar — narration mode only; song mode is pure visuals + music */}
      {!isSongMode && (
        <CaptionBar
          chapter={activeChapter}
          shot={activeShot}
          speaking={isSpeaking}
          visible={captionsVisible && !isFullscreen}
          fps={fps}
          progress={cueProg}
        />
      )}

      {showCodeHUD && activeShot.codeSnippet && !isFullscreen && (
        <div className="bg-slate-950 border-b border-slate-800/80 px-4 py-3">
          <div className="flex items-center justify-between pb-1.5 mb-2">
            <span className="text-[11px] font-mono font-bold text-cyan-400 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" />
              Active Shot Architecture — {activeShot.id.toUpperCase()}
            </span>
            <button onClick={() => setShowCodeHUD(false)} className="text-[10px] text-slate-400 hover:text-white font-mono cursor-pointer">✕ close</button>
          </div>
          <pre className="font-mono text-[10px] text-emerald-300 overflow-x-auto p-2.5 bg-slate-900/90 rounded-lg max-h-40 leading-relaxed border border-slate-800">
            {activeShot.codeSnippet}
          </pre>
        </div>
      )}

      {/* Song Studio — Suno prompt + load your generated track */}
      {isSongMode && !isFullscreen && (
        <SongStudio
          film={film}
          song={film.song!}
          onLoaded={() => { setTrackTick(n => n + 1); applySeek(0, true); }}
          nudge={syncNudge}
          onNudge={(v: number) => { setSyncNudge(v); trackEngine.setOffset(v); }}
          songSec={songSec}
          loading={trackLoading}
        />
      )}

      {/* Transport */}
      <div className="flex flex-col bg-slate-950/95 border-t border-slate-800/80 px-4 py-3 gap-2">
        {/* Mode switch */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => switchMode('narration')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                !isSongMode ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Narrated Film
            </button>
            <button
              onClick={() => switchMode('song')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isSongMode ? 'bg-rose-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Music4 className="w-3.5 h-3.5" />
              Song: "{film.song?.title || 'Pending'}"
            </button>
          </div>

          <span className="text-[11px] font-mono text-slate-400">
            {isSongMode
              ? `film + music · ${film.song?.bpm || '?'} BPM · lyrics mapped to shots`
              : 'shots stretch to fit the voice — never rushed'}
          </span>
        </div>

        <TimelineScrubber currentTime={currentTime} duration={TOTAL_DURATION} chapters={film.chapters} onSeek={handleSeek} />

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button onClick={togglePlay} className="p-2 sm:px-3 sm:py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer flex items-center gap-1.5" title="Play/Pause (Space)">
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              <span className="hidden sm:inline text-xs font-mono">{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            <button onClick={() => skipSeconds(-5)} className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer" title="Rewind 5s (←)"><SkipBack className="w-4 h-4" /></button>
            <button onClick={() => stepFrame(-1)} className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer hidden md:flex" title="Step back (Shift+←)"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={() => stepFrame(1)} className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer hidden md:flex" title="Step forward (Shift+→)"><ChevronRight className="w-4 h-4" /></button>
            <button onClick={() => skipSeconds(5)} className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer" title="Forward 5s (→)"><SkipForward className="w-4 h-4" /></button>
            <button onClick={() => handleSeek(0)} className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer hidden sm:flex" title="Restart"><RotateCcw className="w-4 h-4" /></button>
            <div className="font-mono text-xs text-slate-300 px-2">
              <span className="text-white font-bold">{formatTime(currentTime)}</span>
              <span className="text-slate-500"> / {formatTime(TOTAL_DURATION)}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {!isSongMode && (
              <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800">
                {[0.75, 1, 1.25, 1.5].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setPlaybackRate(rate)}
                    className={`px-1.5 py-0.5 text-[11px] font-mono rounded cursor-pointer ${playbackRate === rate ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                  >{rate}x</button>
                ))}
              </div>
            )}

            <div className={`rounded-lg border flex items-center ${narrationEnabled ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>
              <button onClick={() => setNarrationEnabled(n => !n)} className="p-2 cursor-pointer flex items-center gap-1" title={isSongMode ? 'Toggle sung vocals' : 'Toggle voiceover narration'}>
                {narrationEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                <span className="text-[10px] font-mono hidden xl:inline">{isSongMode ? 'Vocals' : 'Voice'}</span>
              </button>
              {!isSongMode && (
                <select
                  value={voiceURI}
                  onChange={(e) => { setVoiceURI(e.target.value); audioEngine.setUserVoice(e.target.value || null); }}
                  className={`max-w-[120px] bg-transparent text-[10px] font-mono py-1 pr-1 cursor-pointer focus:outline-none ${narrationEnabled ? 'text-amber-200' : 'text-slate-500'}`}
                  title="Voice casting"
                >
                  <option value="" className="bg-slate-900 text-slate-200">Auto-cast</option>
                  {voices.map(v => (
                    <option key={v.voiceURI} value={v.voiceURI} className="bg-slate-900 text-slate-200">
                      {v.name.replace(/\(.*?\)/g, '').slice(0, 24)}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {!isSongMode && (
              <button onClick={() => setMusicEnabled(m => !m)} className={`p-2 rounded-lg cursor-pointer flex items-center gap-1 ${musicEnabled ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-900 text-slate-500 border border-slate-800'}`} title="Ambient score">
                <Music className="w-4 h-4" />
              </button>
            )}

            {!isSongMode && (
              <button onClick={() => setCaptionsVisible(s => !s)} className={`p-2 rounded-lg cursor-pointer ${captionsVisible ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'bg-slate-900 text-slate-500 border border-slate-800'}`} title="Captions (C)">
                <Subtitles className="w-4 h-4" />
              </button>
            )}

            <button onClick={() => setShowCodeHUD(h => !h)} className={`p-2 rounded-lg cursor-pointer flex items-center gap-1 ${showCodeHUD ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`} title="Shot code (H)">
              <Code2 className="w-4 h-4" />
            </button>

            <button onClick={() => setIsMuted(m => !m)} className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer" title="Mute (M)">
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range" min="0" max="1" step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => { setVolume(parseFloat(e.target.value)); if (isMuted) setIsMuted(false); }}
              className="w-16 h-1.5 accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer hidden md:block"
              title="Volume"
            />
            <button onClick={() => setIsExportOpen(true)} className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 cursor-pointer" title="Export"><Camera className="w-4 h-4" /></button>
            <button onClick={toggleFullscreen} className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer" title="Fullscreen (F)">
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <ChapterNav chapters={film.chapters} currentChapter={activeChapter} currentTime={currentTime} onSelectChapter={(c) => handleSeek(c.startTime)} />
        </div>
      </div>

      <ExportModal
        canvasRef={canvasRef}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        mode={isSongMode ? 'song' : 'narration'}
        chapters={film.chapters}
        duration={TOTAL_DURATION}
        film={film}
        onPause={() => { setIsPlaying(false); audioEngine.interrupt(); trackEngine.pause(); }}
      />
    </div>
  );
};
