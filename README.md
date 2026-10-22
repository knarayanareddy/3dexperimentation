# Sparks in the Machine & Procedural Cinema Engine

A generative, pure-code 60 FPS Canvas 2D animated film player and recorder slaved to AI-composed musical soundtracks from Suno AI and multi-voice speech synthesis. Built in React, Vite, Tailwind CSS, and HTML5 Canvas.

Inspired by and paying homage to John Heibel's [PDoomVideo](https://github.com/JohnHeibel/PDoomVideo).

---

## 🎬 Featured Films

### 1. Sparks in the Machine (The Story of OpenAI, 2015 → Beyond)
* **Runtime**: 5 minutes 14 seconds (314.36s) · 113.2 BPM
* **Soundtrack**: *Sparks in the Machine* (driving cinematic electro-pop / synthwave rock)
* **Narrative Arc**:
  * **Act 1: The Rosewood Covenant (2015)**: A rainy December dinner at the Rosewood Hotel in Menlo Park; Sam Altman, Elon Musk, and Ilya Sutskever draft the non-profit charter ("To benefit all humanity, free from commercial capture").
  * **Act 2: Games and Metal (2016–2018)**: Unboxing workstations at the Pioneer loft, the 5-fingered Shadow robot hand solving a Rubik's cube with Automatic Domain Randomization, OpenAI Five in Dota 2, and Ilya observing next-token prediction fall like green matrix snow.
  * **Act 3: The Capped-Profit Crossroads (2019)**: The \$100M compute bill burning in red ink, cracking the 501(c)(3) ceiling, and the \$1B Microsoft alliance with Satya Nadella.
  * **Act 4: The Scaling Hypothesis & GPT-3 (2020–2021)**: Log-log scaling laws, 175-billion parameter tensor weights, natural language prompt engineering, and the 11 safety researchers walking out in the rain to found Anthropic.
  * **Act 5: The November Spark (2022)**: A quiet Wednesday research preview on November 30; 100 million users in 60 days; servers melting.
  * **Act 6: Five Days in November (2023)**: The Friday noon Google Meet firing; empty Pioneer hallways; the 738-signature open-letter revolt; Sam returning at 3:00 AM wearing his guest pass badge.
  * **Act 7: Thinking Machines & Beyond (2024+)**: Project Strawberry o1 test-time reasoning search trees, the 5-gigawatt Project Stargate desert compute monolith, and the cosmic Bloom finale.

### 2. Sparks in 75s (The OpenAI Speedrun)
* **Format**: High-velocity 75–80s speedrun engineered for YouTube Shorts, TikTok, and Instagram Reels.
* **SEO & GEO**: Speech-to-text keyword indexing (Whisper), on-screen kinetic OCR text cards, and Silicon Valley geographic entity anchors.

### 3. Press The Button (The Story of Uber, 2008 → Now)
* **Runtime**: 4 minutes 09 seconds · 112 BPM
* **Cast**: PIN (animated map marker), black town cars, Travis Kalanick, fare meters, cease-and-desist orders, and the global driver flywheel.

### 4. The Long Thaw (The Evolution of AI, 1950 → Now)
* **Runtime**: 4 minutes 22 seconds · 104 BPM
* **Narrative**: Alan Turing's imitation game, the two AI winters, Perceptrons, the data flood, and the Transformer attention revolution.

### 5. Seventy Milliseconds (What Jev Is & How It Works)
* **Runtime**: 3 minutes 36 seconds · 106.5 BPM
* **Narrative**: Jevons paradox, Daniel Kahneman's System 1 vs System 2 thinking, and single-pass transformer decision latency.

---

## ⚡ Architectural Core

* **Pure Function of Time**: Every scene is painted deterministically at 60 FPS using procedural canvas drawing primitives (`paint`, `inkLine`, `rectPts`, `ellPts`, `rrPts`, `letter`, `blob`) with a 12 FPS line-boil effect.
* **Audio-Slaved Synchronization**: The audio element acts as the master clock. A drift-corrected rAF interpolation engine pulls nominal film time into lockstep with the song's measured musical cues and vocal onsets.
* **Dual Playback Modes**:
  * **Song Mode**: Slaves all 28 shots and keyframe timings directly to the Suno master MP3.
  * **Narrated Film Mode**: Drives speech boundaries with Web Speech API voice casting (**Sam Altman**, **Ilya Sutskever**, **Researcher**, **The Board**).
* **In-Browser Video Exporter**: Records 1280×720 WebM/MP4 directly in the browser via `canvas.captureStream()` and merges the master audio track through a Web Audio API `MediaStreamAudioDestinationNode`.

---

## 🚀 Getting Started

### Prerequisites
* Node.js 18+ (tested up to Node 26)
* npm or pnpm

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/knarayanareddy/3dexperimentation.git
cd 3dexperimentation

# Install dependencies
npm install

# Start local dev server
npm run dev
```

Open **`http://localhost:5173/`** in your browser.

### Production Build

```bash
npm run build
```
Generates a self-contained single-file bundle in `dist/index.html`.

---

## 🛠️ Tech Stack

* **Framework**: React 19 + TypeScript
* **Bundler**: Vite 7 (`vite-plugin-singlefile`)
* **Styling**: Tailwind CSS 4
* **Canvas Engine**: Custom Canvas 2D watercolor / line-boil renderer
* **Audio Master Clock**: Drift-corrected HTML5 Audio + Web Audio API graph
* **Icons**: Lucide React
