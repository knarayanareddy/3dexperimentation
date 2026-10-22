import { useState } from 'react';
import {
  Film,
  Zap,
  BookOpen,
  Compass,
  Sparkles,
  ExternalLink,
  Volume2,
  Award,
  Layers
} from 'lucide-react';
import { VideoPlayer } from './components/VideoPlayer';
import { JevPlayground } from './components/JevPlayground';
import { StoryboardView } from './components/StoryboardView';
import { ArchitectureGuide } from './components/ArchitectureGuide';
import { FILM_LIST, FILMS, FilmId } from './data/films';
import { SongRecipe, RecipeData } from './components/SongRecipe';
import {
  EV_SUNO_TITLE, EV_SUNO_STYLE_PROMPT, EV_SUNO_EXCLUDE, EV_SUNO_LYRICS,
  EV_SECTION_PLAN, EV_ANCHORS
} from './data/evolutionSong';
import {
  UB_SUNO_TITLE, UB_SUNO_STYLE_PROMPT, UB_SUNO_EXCLUDE, UB_SUNO_LYRICS,
  UB_SECTION_PLAN, UB_ANCHORS
} from './data/uberSong';
import {
  OA_SUNO_TITLE, OA_SUNO_STYLE_PROMPT, OA_SUNO_EXCLUDE, OA_SUNO_LYRICS,
  OA_SECTION_PLAN, OA_ANCHORS
} from './data/openaiSong';

const RECIPES: Record<string, RecipeData> = {
  evolution: {
    title: EV_SUNO_TITLE, style: EV_SUNO_STYLE_PROMPT, exclude: EV_SUNO_EXCLUDE,
    lyrics: EV_SUNO_LYRICS, sections: EV_SECTION_PLAN, anchors: EV_ANCHORS,
    synced: 'The supplied 4:22 render is measured and aligned.'
  },
  uber: {
    title: UB_SUNO_TITLE, style: UB_SUNO_STYLE_PROMPT, exclude: UB_SUNO_EXCLUDE,
    lyrics: UB_SUNO_LYRICS, sections: UB_SECTION_PLAN, anchors: UB_ANCHORS,
    synced: 'The supplied 4:09 render is force-aligned across all 53 lyric lines.'
  },
  openai: {
    title: OA_SUNO_TITLE, style: OA_SUNO_STYLE_PROMPT, exclude: OA_SUNO_EXCLUDE,
    lyrics: OA_SUNO_LYRICS, sections: OA_SECTION_PLAN, anchors: OA_ANCHORS,
    synced: 'The supplied 4:24 render is force-aligned to its measured vocal arrangement.'
  }
};

export function App() {
  const [activeTab, setActiveTab] = useState<'video' | 'playground' | 'storyboard' | 'architecture'>('video');
  const [filmId, setFilmId] = useState<FilmId>('jev');
  const film = FILMS[filmId];
  const [syncedTime, setSyncedTime] = useState<number>(0);

  const scrollToPlayer = () => {
    setActiveTab('video');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Banner: Homage & Mode indicator */}
      <header className="sticky top-0 z-40 bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-cyan-400 p-0.5 shadow-lg shadow-cyan-500/10">
              <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
                <span className="font-mono font-black text-sm text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-300">
                  {filmId === 'evolution' ? 'AI' : filmId === 'uber' ? 'PIN' : filmId === 'openai' ? '|' : 'JEV'}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  {filmId === 'evolution' ? 'The Long Thaw' : filmId === 'uber' ? 'Press The Button' : filmId === 'openai' ? 'The Text Box' : 'Jev Explained'}
                  <span className="text-xs font-mono font-medium text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-500/30">
                    {filmId === 'evolution' ? '1950 → Now' : filmId === 'uber' ? '2008 → Now' : filmId === 'openai' ? '2015 → Now' : 'System One'}
                  </span>
                </h1>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <span>Homage to</span>
                <a
                  href="https://github.com/JohnHeibel/PDoomVideo"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 hover:text-amber-300 font-mono inline-flex items-center gap-0.5 hover:underline"
                >
                  JohnHeibel/PDoomVideo
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
                <span>• Generative Canvas Engine</span>
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'video'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Animated Video</span>
            </button>

            <button
              onClick={() => setActiveTab('playground')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'playground'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>API Playground</span>
            </button>

            <button
              onClick={() => setActiveTab('storyboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'storyboard'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Storyboard</span>
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'architecture'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Guide</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-8">
        {/* Narration & Audio Tip Announcement */}
        <div className="bg-gradient-to-r from-amber-500/10 via-cyan-500/10 to-indigo-500/10 border border-slate-800 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-amber-500/20 text-amber-300 shrink-0">
              <Volume2 className="w-4 h-4" />
            </span>
            <div>
              <strong className="text-white font-semibold">
                Two ways to watch — Narrated Film or the Song:
              </strong>{' '}
              <span className="text-slate-300">
                {filmId === 'openai' ? (
                  <>In <strong>Narrated Film</strong>, speech drives the picture word by word. <strong>Song Mode</strong> now plays the supplied 4:24 <em>Still Waiting For Input</em> master. Its real vocal structure — including omitted metadata repeats, repeated chorus lines and the long outro tail — drives CARET, BLOOM and the historical scenes.</>
                ) : filmId === 'uber' ? (
                  <>In <strong>Narrated Film</strong>, speech drives the picture word by word. The cast is bespoke — <strong>PIN</strong>, riders, drivers, cars and regulators. <strong>Song Mode</strong> plays the measured 4:09 Suno render, including its instrumental turn, repeated final line and sustained outro.</>
                ) : filmId === 'evolution' ? (
                  <>In <strong>Narrated Film</strong>, speech drives the picture word by word. <strong>Song Mode</strong> plays <em>The Long Thaw</em> (4:22), including its repeated Verse 4 and wordless final rise; every detected lyric phrase is pinned to the historical scene it describes.</>
                ) : (
                  <>In <strong>Narrated Film</strong>, speech drives the picture word by word. <strong>Song Mode</strong> is pure visuals + <em>JEV.mp3</em>, with every measured lyric pinned to its matching shot.</>
                )}
                {' '}Use <strong>Export</strong> to record a shareable video with the active song embedded.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
              60 FPS Canvas Engine
            </span>
            <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
              {filmId === 'evolution' ? '1950 → Now' : filmId === 'uber' ? '40M trips / day' : filmId === 'openai' ? '~1B weekly users' : '70ms Decision Latency'}
            </span>
          </div>
        </div>

        {/* Film selector */}
        <div className="flex flex-col sm:flex-row gap-3">
          {FILM_LIST.map((f) => {
            const on = f.id === filmId;
            return (
              <button
                key={f.id}
                onClick={() => { setFilmId(f.id); setSyncedTime(0); }}
                className={`flex-1 text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  on ? 'bg-slate-900 border-slate-600 shadow-lg ring-1' : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
                style={on ? { borderColor: f.accent, boxShadow: `0 0 0 1px ${f.accent}44` } : undefined}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-sm font-bold text-white">{f.title}</span>
                  <span
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded-full border"
                    style={{ color: f.accent, borderColor: `${f.accent}66`, backgroundColor: `${f.accent}18` }}
                  >
                    {f.hasSong ? 'film + song' : 'film · song pending'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 leading-snug">{f.subtitle}</div>
                <div className="text-[10.5px] text-slate-500 mt-1 leading-snug">{f.blurb}</div>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Video Player & Studio */}
        {activeTab === 'video' && (
          <div className="space-y-6">
            <VideoPlayer film={film} onTimeUpdate={setSyncedTime} />

            {/* Quick Act Cards Grid below player */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {film.chapters.map((c) => (
                <div
                  key={c.id}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: `${c.themeColor}22`,
                        color: c.accentColor
                      }}
                    >
                      Act {c.number}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{c.duration}s</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-200 line-clamp-1 mb-1">
                    {c.title}
                  </div>
                  <div className="text-[10px] text-slate-400 line-clamp-2 leading-tight">
                    {c.summary}
                  </div>
                </div>
              ))}
            </div>

            {RECIPES[filmId] && <SongRecipe data={RECIPES[filmId]} />}

            {/* In-depth Narrative Story Section */}
            {filmId === 'jev' && (
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <h2 className="text-lg md:text-xl font-bold text-white">
                    What is Jev? The Story of System One AI
                  </h2>
                </div>
                <button
                  onClick={() => setActiveTab('playground')}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Test in Playground</span>
                  <Zap className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-300 leading-relaxed">
                <div className="space-y-2 p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
                  <h3 className="font-bold text-cyan-400 font-mono text-xs uppercase tracking-wider">
                    The Problem: Generative Bloat
                  </h3>
                  <p className="text-xs text-slate-400">
                    Modern software stacks call 100-billion-parameter text generators just to make simple conditional choices: routing a support ticket, validating an input, or selecting an agent tool. You wait <strong>8.8 seconds</strong>, burn fractions of a dollar, and risk chatty JSON parse errors.
                  </p>
                </div>

                <div className="space-y-2 p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
                  <h3 className="font-bold text-amber-400 font-mono text-xs uppercase tracking-wider">
                    The Origin: William Stanley Jevons
                  </h3>
                  <p className="text-xs text-slate-400">
                    Named after the 1865 Jevons Paradox: When steam engines made coal consumption 4x more efficient, Britain didn't use less coal—they built railroads everywhere. At <strong>$0.042/1M input tokens</strong>, intelligence becomes cheap enough to embed inside database triggers and edge proxies.
                  </p>
                </div>

                <div className="space-y-2 p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
                  <h3 className="font-bold text-emerald-400 font-mono text-xs uppercase tracking-wider">
                    The Architecture: Single Forward Pass
                  </h3>
                  <p className="text-xs text-slate-400">
                    Jev does not generate tokens sequentially. It is a discriminative cross-attention model that evaluates arbitrary runtime candidate schemas in a single forward pass (~70ms). It outputs strictly typed enums and calibrated probabilities with zero hallucination.
                  </p>
                </div>
              </div>
            </div>
            )}
          </div>
        )}

        {/* Tab 2: Interactive Jev Workbench */}
        {activeTab === 'playground' && (
          <div className="space-y-6">
            <JevPlayground />
          </div>
        )}

        {/* Tab 3: Storyboard Contract (STORYBOARD.md) */}
        {activeTab === 'storyboard' && (
          <div className="space-y-6">
            <StoryboardView
              chapters={film.chapters}
              title={`${film.title} — Storyboard`}
              currentTime={syncedTime}
              onJumpToTime={(t) => {
                setSyncedTime(t);
                scrollToPlayer();
              }}
            />
          </div>
        )}

        {/* Tab 4: Architectural Deep Dive */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <ArchitectureGuide />
          </div>
        )}

        {/* Technical Specification Summary Cards */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                {filmId === 'evolution' ? 'The Long Thaw — Production Map' : filmId === 'uber' ? 'Press The Button — Production Map' : filmId === 'openai' ? 'The Text Box — Production Map' : 'The PDoomVideo x TypeSafe Jev Architecture Matrix'}
              </h2>
              <p className="text-xs text-slate-400">
                How this implementation faithfully adopts the Claude Opus 5.5 PDoomVideo generative pipeline
              </p>
            </div>
            <span className="font-mono text-xs text-slate-400">
              Pure function of time: <code>paint(t, ctx)</code>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-amber-400 font-bold block mb-1">{filmId === 'uber' ? 'Custom PIN Cast' : filmId === 'openai' ? 'Caret & Bloom' : 'Clawd Character'}</span>
              <p className="text-slate-400 font-sans leading-relaxed">
                {filmId === 'openai'
                  ? 'A blinking text cursor leads, beside a six-petal knot whose petals light as the model scales.'
                  : filmId === 'uber'
                  ? 'No Clawd: a map Pin leads riders, drivers, painted cars, live phone screens, city grids and regulators.'
                  : filmId === 'evolution'
                  ? 'The same blocky painted Clawd carries the audience from Turing through the winters to modern agents.'
                  : 'Expressive terracotta shell with boiling outlines, speech flap synchronization, blinking eyes, and 6 emotive states.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">{filmId === 'openai' ? 'Polish Layer' : filmId === 'uber' || filmId === 'evolution' ? 'Measured Song Clock' : 'Single-Pass Scoring'}</span>
              <p className="text-slate-400 font-sans leading-relaxed">
                {filmId === 'openai'
                  ? 'Layered bloom glows, three-plane depth skylines, light shafts and drop-shadowed panels on every card.'
                  : filmId === 'uber'
                  ? 'All 53 lyric lines are force-aligned to Whisper word timestamps from the real 4:09 master.'
                  : filmId === 'evolution'
                  ? 'Whisper word timestamps expose the real 4:22 arrangement, including the repeated verse and long wordless build.'
                  : 'Cross-attention candidate evaluation in 70ms. Discriminative probability vectors rather than autoregressive text tokens.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-rose-400 font-bold block mb-1">{filmId === 'openai' ? 'Eleven Years' : filmId === 'uber' ? 'The Marketplace Flywheel' : filmId === 'evolution' ? 'Seven Historical Eras' : 'Jevons Paradox (1865)'}</span>
              <p className="text-slate-400 font-sans leading-relaxed">
                {filmId === 'openai'
                  ? 'Charter, scaling laws, GPT-3, the text box, five days in November, reasoning models, Stargate, the PBC.'
                  : filmId === 'uber'
                  ? 'Drivers shorten waits; shorter waits create riders; riders raise utilisation; earnings attract drivers.'
                  : filmId === 'evolution'
                  ? 'Turing, symbolic AI, two winters, statistical learning, deep learning, attention, and the agent era.'
                  : 'Demand elasticity rebound: Cheaper intelligence multiplies decision volume from 10k to 500M daily decisions.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-purple-400 font-bold block mb-1">{filmId === 'uber' || filmId === 'evolution' ? 'Content-Matched Visuals' : 'Dual Mind Architecture'}</span>
              <p className="text-slate-400 font-sans leading-relaxed">
                {filmId === 'openai'
                  ? 'Every figure is from OpenAI’s own posts or contemporaneous reporting: 117M, 175B, 745 of 770, $500B, ~26/27%.'
                  : filmId === 'uber'
                  ? 'Paris, cease-and-desist, China, the reckoning, Tempe, the IPO, first profit and driverless cars land on their lyrics.'
                  : filmId === 'evolution'
                  ? 'Every sung historical reference is pinned to the corresponding painted invention, person, winter, or breakthrough.'
                  : 'System 1 (Jev) as the 70ms edge reflex router + System 2 (Claude 3.5 Sonnet) as the deep deliberation engine.'}
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-4 sm:px-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Award className="w-4 h-4 text-amber-400" />
            <span>
              Engineered with code following the{' '}
              <a
                href="https://github.com/JohnHeibel/PDoomVideo"
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:underline font-mono"
              >
                JohnHeibel/PDoomVideo
              </a>{' '}
              creative pipeline.
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px]">
            {filmId === 'openai' ? (
              <>
                <span>Founded December 2015</span><span>•</span>
                <span>Charter to PBC</span><span>•</span>
                <span>Still Waiting For Input</span>
              </>
            ) : filmId === 'uber' ? (
              <>
                <span>Paris (2008)</span><span>•</span>
                <span>UberX to First Profit</span><span>•</span>
                <span>Press The Button (4:09)</span>
              </>
            ) : filmId === 'evolution' ? (
              <>
                <span>Alan Turing (1950)</span><span>•</span>
                <span>Dartmouth to Transformers</span><span>•</span>
                <span>The Long Thaw (4:22)</span>
              </>
            ) : (
              <>
                <span>TypeSafe AI Jev (2026)</span><span>•</span>
                <span>Daniel Kahneman System 1 & 2</span><span>•</span>
                <span>William Stanley Jevons (1865)</span>
              </>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
