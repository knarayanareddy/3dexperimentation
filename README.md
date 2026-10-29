# Procedural Animated Film Studio

A generative, pure-code 60 FPS Canvas 2D animated film player and recorder, with musical soundtracks and multi-voice speech synthesis. Built in React, Vite, Tailwind CSS, and HTML5 Canvas.

Homage to John Heibel's [PDoomVideo](https://github.com/JohnHeibel/PDoomVideo).

## Live site

**[Watch the films on GitHub Pages](https://knarayanareddy.github.io/3dexperimentation/)** — an interactive static site with six selectable animated films and their soundtracks. The canvas animation is rendered in the browser; use **Export** in the player to record a shareable video.

For first-time publication, set **Settings → Pages → Build and deployment → Source → GitHub Actions**. The included workflow builds the repository-base-path version and deploys it on pushes to `main`.

---

## 🎬 Featured Films

### 1. Still Waiting For Input (The Story of OpenAI, 2015 → Now)
* **Soundtrack**: *Still Waiting For Input* (108 BPM)
* **Protagonists**:
  * **CARET**: The blinking terminal text cursor with a face. The interface character: typing, waiting, panicking, reasoning, and taking the final bow.
  * **BLOOM**: The living six-petal knot representing the model itself: petals illuminate as it scales, dims when starved of compute, and pulses while it reasons.
* **Visual Craft**: 
  * Three-plane depth, atmospheric light shafts, layered watercolor washes, and boiling ink lines.
  * Stage framing, theatrical curtain calls, and animated token streams.

### 2. Press The Button (The Story of Uber, 2008 → Now)
* **Runtime**: 4 minutes 09 seconds · 112 BPM
* **Protagonist**: PIN (the animated map marker).

### 3. The Long Thaw (The Evolution of AI, 1950 → Now)
* **Runtime**: 4 minutes 22 seconds · 104 BPM
* **Narrative**: Turing, Perceptrons, AI winters, the data flood, and the Transformer revolution.

### 4. Ask, Learn, Try Again! (A Sing-Along History of AI)
* **Runtime**: 1 minute 25 seconds · 120 BPM · 9:16 portrait
* **Narrative**: Turing, Dartmouth, AI winters, backpropagation, Deep Blue, AlexNet, Transformers, ChatGPT, and current multimodal/tool-using systems.
* **Soundtrack**: The supplied Suno master plays with phrase cues estimated from word-level timestamps; individual sung-word boundaries are not forced-aligned.

### 5. The Money Loop (AI Finance)
* **Runtime**: 2 minutes 12 seconds · satirical watercolor short
* **Soundtrack**: Supplied Suno master with phrase-level visual cues.

### 6. Seventy Milliseconds (What Jev Is & How It Works)
* **Runtime**: 3 minutes 36 seconds · 106.5 BPM
* **Narrative**: Jevons paradox, Kahneman's System 1 vs System 2 thinking, and single-pass transformer decision latency.

---

## 🚀 Getting Started

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/knarayanareddy/3dexperimentation.git
cd 3dexperimentation

# Install dependencies
npm install

# Start development server
npm run dev
```

Open **`http://localhost:5173/`** in your browser.

### Production Build

```bash
npm run build
```
The Vite single-file plugin inlines the application JavaScript and CSS into `dist/index.html`; soundtrack MP3s remain in `dist/audio/` so the Pages build can stream them independently. The GitHub Pages workflow sets the repository base path and deploys on pushes to `main` (or by manual workflow dispatch).
