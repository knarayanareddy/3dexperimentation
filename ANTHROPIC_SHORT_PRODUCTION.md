# The Anthropic Story — short-film production map

**Status:** storyboard, revised lyric draft, and interactive Canvas implementation are in the studio. The current cut is **1:51 (111 seconds), 9:16 portrait, 24 shots across eight chapters**. The supplied Suno render measured **2:15.99**; after making a 2:00 barline edit with a 0.6-second end fade, I removed another **9 seconds from the head** per your note about the instrumental intro. The active MP3 measures **111.05 seconds**. The first vocal should now begin at about 0:03; later phrase timing remains provisional.

## Editorial idea

Tell Anthropic's story as a sequence of choices and changing responsibilities: a research company founded in 2021 around reliable, steerable, interpretable systems; an early research method for training assistants; Claude's introduction and expanding forms of work; and, by 2026, a dedicated institute studying the wider effects of frontier AI. End with questions about public benefit and oversight—not a victory lap or a claim that safety has been solved.

The film does **not** claim a particular personal dispute as the definitive reason for the company's founding. It avoids investment, valuation, IPO, and product claims that are not needed for this arc. Anthropic's own announcement describes its founding at the beginning of 2021 and its early research goals; its 2026 Institute announcement supplies a current epilogue.

## Factual spine and source notes

- **2021 — Founded:** Anthropic says it was founded at the beginning of 2021 and describes its initial work as making systems more steerable, robust, and interpretable. Dario Amodei is identified as CEO and Daniela Amodei as President in its contemporaneous Series B announcement. [Anthropic, Series B and research focus](https://www.anthropic.com/news/anthropic-raises-series-b-to-build-safe-reliable-ai)
- **2022 — Constitutional AI:** The paper describes training a harmless assistant through self-critique/revision and reinforcement learning from AI feedback, with a written set of principles. It is presented as one research method, not as a complete solution to AI safety. [Anthropic, Constitutional AI paper](https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback)
- **2023 — Claude:** Anthropic introduced Claude through chat and API after a closed alpha with partners including Notion, Quora, and DuckDuckGo. The film says “steps from research into chat and API,” not “opened to everyone.” [Anthropic, Introducing Claude](https://www.anthropic.com/news/introducing-claude)
- **2024 — Models and modalities:** Claude 3 introduced Haiku, Sonnet, and Opus; Anthropic described vision capabilities for photos, charts, graphs, and technical diagrams. [Anthropic, Claude 3 family](https://www.anthropic.com/news/claude-3-family)
- **2024 — Workspace and computer use:** Artifacts were introduced as a workspace alongside the conversation. Computer use was announced in public beta and explicitly described as experimental and imperfect. [Anthropic, Computer use and Claude 3.5](https://www.anthropic.com/news/3-5-models-and-computer-use)
- **2025 — Coding and agents:** Claude Opus 4 and Sonnet 4 were announced for coding, reasoning, and agent workflows; Claude Code became generally available. [Anthropic, Claude 4](https://www.anthropic.com/news/claude-4)
- **2026 — Wider consequences:** The Anthropic Institute was introduced to study challenges powerful AI poses to society, bringing together frontier red-teaming, societal-impact research, and economic research. [Anthropic, The Anthropic Institute](https://www.anthropic.com/news/the-anthropic-institute)
- **Purpose and governance language:** Anthropic describes itself as a public benefit corporation whose purpose is the responsible development and maintenance of advanced AI for humanity's long-term benefit. This can appear in the end card or notes, but should be attributed as the company's stated purpose, not narrated as an independently proven outcome. [Anthropic, Company](https://www.anthropic.com/company)

## Narrative and music plan

**Format:** song-led short; the lyric is the narration. No separate spoken narrator is planned. Lyrics/captions sit in a consistent lower-third; no synthetic company spokesperson or fabricated quotation. Original watercolor-inspired illustration and abstract interface metaphors only—no copied Anthropic logo, official portraits, or implied endorsement.

**Music brief:** *Build, Check, Repeat*, generated from the punchy bass-forward 116 BPM / 4/4 prompt. The Suno render came back at 2:15.99 rather than the prompt target of about 1:48. The active cut retains the 2:00 barline edit and its 0.6-second ending fade, then removes the first 9 seconds of the instrumental opening. The embedded lyric metadata remains intact. The copyable original prompt is in `src/data/anthropicSong.ts` and the studio recipe.

**Sync status:** the MP3's embedded lyrics match the revised draft. Per your note, the first vocal starts at about 12 seconds in the original; removing 9 seconds places it at about 3 seconds. The opening scene holds for those 3 instrumental seconds and the first lyric caption appears at 0:03. Subsequent lyric landmarks are placed every 4.5 seconds to fit the remaining 24-line / 1:51 program; those later starts are still estimates, not audio-derived or hand-audited timestamps. Please listen for drift and any clipped ending.

## 8-act timeline and 24-shot map

The first act lasts 16.5 seconds (3 seconds of instrumental opening, then three 4.5-second lyric beats); the remaining acts last 13.5 seconds each. The first visual shot begins at 0:00 but holds its lyric caption until the vocal enters at about 0:03.

| # | Time | Act / story beat | Three-shot visual progression |
|---|---:|---|---|
| 1 | 00:00–00:16.5 | **A Research Bet · 2021** — instrumental pickup, then the stated early research aim | **00:00** hold on team and year card, no lyric caption; **00:03** first founding lyric over the team; **00:07.5** reliable / steerable / robust lenses; **00:12** pattern inspection inside an abstract model |
| 2 | 00:16.5–00:30 | **Principles in the Loop · 2022** — Constitutional AI | **00:16.5** handwritten principles; **00:21** draft → critique → revision; **00:25.5** AI-feedback loop with “one method, not a guarantee” |
| 3 | 00:30–00:43.5 | **Claude Steps Out · 2023** — assistant enters chat and API | **00:30** Claude word card and chat/API; **00:34.5** writing, search, questions, code; **00:39** partner cards for Notion, Quora, DuckDuckGo |
| 4 | 00:43.5–00:57 | **A Family of Models · 2024** — Claude 3 and vision | **00:43.5** Haiku / Sonnet / Opus; **00:48** photo, chart, technical diagram; **00:52.5** three model options shown as a family, not one winner |
| 5 | 00:57–01:10.5 | **From Chat to Computer Use · 2024** — Artifacts and public beta | **00:57** conversation beside Artifact workspace; **01:01.5** cursor through a mock desktop with “experimental”; **01:06** person pauses and checks before the next action |
| 6 | 01:10.5–01:24 | **Code and Agents · 2025** — Claude 4 and Claude Code | **01:10.5** plan / edit / run / review; **01:15** Claude 4 and May 2025 / Claude Code GA cards; **01:19.5** longer agent workflow, with capability and consequence together |
| 7 | 01:24–01:37.5 | **The Anthropic Institute · 2026** — looking beyond the model | **01:24** interdisciplinary institute forms; **01:28.5** frontier capabilities / work & economy / law & society; **01:33** possibility balanced with uncertainty |
| 8 | 01:37.5–01:51 | **The Open Question** — present-tense coda | **01:37.5** research moves toward tools used in the world; **01:42** “Who benefits? What must we watch?”; **01:46.5** unfinished page: “The story is still being written.” |

## Full lyric draft

> **Verse 1**  
> Twenty-twenty-one, a research lab takes shape.  
> Reliable, robust—systems we can steer.  
> Interpret the patterns—look inside the lines.
>
> **Verse 2**  
> Write the rules; let the model critique.  
> Revise, re-try; let feedback speak.  
> Constitutional AI—one method to explore.
>
> **Chorus**  
> Claude in the chat, on A-P-I.  
> Draft, search, ask—let ideas fly.  
> Try, check, revise—keep questions in sight.
>
> **Verse 3**  
> Haiku quick, Sonnet steady, Opus deep.  
> Photos, charts, diagrams—new things to read.  
> Three choices, one family—pick the pace you need.
>
> **Bridge**  
> Artifacts set your work beside the chat.  
> Computer use in beta—early and rough.  
> Click, check, correct; keep a human close.
>
> **Verse 4**  
> Code takes longer steps; tasks unfold.  
> Claude Code ships; Claude 4 arrives.  
> More power, more questions to examine.
>
> **Final chorus**  
> Five years on, the Institute looks out.  
> Work, law, society—track the tide.  
> Try, check, revise—keep questions in sight.
>
> **Outro**  
> From research lab, the tools reach the world.  
> Who benefits? What must we watch?  
> Build, check, repeat—the story unfolds.

## Visual and sound direction

- **Palette:** paper cream, rust-orange, muted teal, amber, moss, soft charcoal. Painterly cards and hand-drawn connecting lines; no visual imitation of Anthropic's website or logo.
- **Cast:** a small recurring ensemble of generic researchers, users, and reviewers. The Claude symbol is an abstract light / interface motif, not a sentient mascot or a portrait.
- **Motion:** gentle parallax and breathing; diagram lines assemble on key terms; occasional match-cuts carry a paper rule into a software interface. Keep 24 shots readable at mobile size.
- **Accessibility:** high-contrast captions, no text-only factual information that is absent from narration/lyrics, and no color-only distinction between model options.
- **End card:** “Anthropic — 2021 to 2026” with “Public benefit is a stated purpose; outcomes remain a question.” Use no official logo unless separately licensed/approved.

## Implementation and handoff

The interactive version is registered as a new film in the studio's Film selector and opens in Song Mode with the 9-second intro-trimmed MP3, revised lyrics, style brief, and cue map. It holds the first shot through the remaining three-second pickup, then reveals the first lyric caption at the expected vocal entrance. Later phrase cues remain provisional; review drift and the final fade before calling the cut locked. The original full MP3 remains at the GitHub `main`-branch path supplied by the user. Production files: `src/data/anthropic.ts`, `src/data/anthropicSong.ts`, and `src/engine/chapters/anthropic.ts`.
