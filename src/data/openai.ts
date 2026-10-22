import { Chapter } from '../types/video';

/**
 * "THE TEXT BOX" — OpenAI, from a nonprofit letter in 2015 to a billion
 * weekly conversations.
 *
 * Same grammar as the other films: 7 acts, 28 shots, 216 s nominal.
 * Cast is bespoke (openaiCast.ts): CARET (the blinking cursor) and BLOOM
 * (the six-petal knot that stands for the model), plus researchers.
 *
 * Figures verified against OpenAI's own posts and contemporaneous reporting:
 * Dec 2015 founding; GPT-1 117M (2018); GPT-2 1.5B staged release (2019);
 * Microsoft $1B + capped-profit (2019); scaling laws (2020); GPT-3 175B;
 * ChatGPT 30 Nov 2022, ~100M users in two months; GPT-4 (Mar 2023);
 * board crisis 17–22 Nov 2023, 745 of ~770 employees signed; GPT-4o and
 * o1 (2024); Stargate $500B (Jan 2025); recapitalisation 28 Oct 2025 —
 * OpenAI Group PBC under the OpenAI Foundation (~26%), Microsoft ~27%;
 * ~1B weekly users and ~$40B+ annualised revenue reported during 2026.
 */

export const OPENAI_CHAPTERS: Chapter[] = [
  {
    id: 'oa1',
    number: 1,
    title: 'A Letter and a Promise',
    subtitle: '2015–2018: a nonprofit, a charter, and a machine that learns by playing itself',
    startTime: 0,
    endTime: 32,
    duration: 32,
    themeColor: '#10A37F',
    accentColor: '#5FD4B4',
    summary: 'A research lab is founded on an unusual premise: build the most powerful technology imaginable, and give the upside away.',
    shots: [
      {
        id: 'oa1-1', chapterId: 'oa1', startTime: 0, endTime: 8,
        speaker: 'Narrator',
        cue: 'December 2015. A small group announces a nonprofit research lab with a billion dollars pledged and one sentence as its purpose.',
        read: 'A quiet lit room; a letter unfolds and the mission sentence is written across it in ink.',
        visualPrompt: 'Unfolding letter, hand-lettered mission line, soft lamp glow, dark surroundings.',
        technicalNote: 'OpenAI was announced in December 2015 as a nonprofit research company, with $1B in pledged donations from its backers.',
        codeSnippet: `mission:
  "ensure that artificial general intelligence
   benefits all of humanity"
// the hard part was never the first clause`
      },
      {
        id: 'oa1-2', chapterId: 'oa1', startTime: 8, endTime: 16,
        speaker: 'Scientist',
        cue: 'The bet underneath it is simple and unproven: that general intelligence is less a puzzle to be solved than a thing to be grown.',
        read: 'A six-petal knot is sketched in faint ink, then one petal lights for the first time.',
        visualPrompt: 'Bloom knot drawn in construction lines, one petal igniting teal.',
        technicalNote: 'The founding wager: general capability would emerge from scale and general methods rather than hand-built domain logic.',
        codeSnippet: `two schools:
  engineer the rules   -> brittle, bounded
  grow the capability  -> general, unproven
// they bet the lab on the second`
      },
      {
        id: 'oa1-3', chapterId: 'oa1', startTime: 16, endTime: 24,
        speaker: 'Narrator',
        cue: 'First it learned by playing. Millions of games against itself, and a robot hand teaching itself a Rubik\'s cube in simulation.',
        read: 'A looping arena where two identical agents replay a match; beside it a painted hand turns a cube.',
        visualPrompt: 'Self-play arena loop, mirrored agents, robot hand rotating a cube.',
        technicalNote: 'Reinforcement learning with self-play (OpenAI Five, 2018–19) and sim-to-real dexterity work established the scale-plus-RL pattern.',
        codeSnippet: `for episode in range(10_000_000):
    a = policy(state)            // play yourself
    policy = improve(policy, reward)
// no human games required`
      },
      {
        id: 'oa1-4', chapterId: 'oa1', startTime: 24, endTime: 32,
        speaker: 'Caret',
        cue: 'Then in 2018 a quieter result: pretrain a transformer on plain text, and fine-tuning it for anything becomes almost easy.',
        read: 'A cursor blinks into existence on a blank page and types its very first line.',
        visualPrompt: 'Blank paper, Caret appears and types, small and new.',
        technicalNote: 'GPT-1 (2018): 117M parameters, generative pretraining then supervised fine-tuning — strong transfer across many NLP tasks.',
        codeSnippet: `GPT-1, 2018
  params: 117,000,000
  step 1: predict the next token, on a lot of text
  step 2: fine-tune for the task you want
// step 1 turned out to be the whole trick`
      }
    ]
  },
  {
    id: 'oa2',
    number: 2,
    title: 'Scale Is the Secret',
    subtitle: '2019–2020: a model held back, a capped profit, and a straight line on a log plot',
    startTime: 32,
    endTime: 64,
    duration: 32,
    themeColor: '#6C5CE7',
    accentColor: '#A397F0',
    summary: 'The lab discovers that making the same model bigger keeps working — and that discovery forces it to change what kind of organisation it is.',
    shots: [
      {
        id: 'oa2-1', chapterId: 'oa2', startTime: 32, endTime: 40,
        speaker: 'Narrator',
        cue: 'In 2019 they build GPT-2 and then hesitate, releasing it in stages because they are not sure what it will be used for.',
        read: 'A larger bloom glows behind glass; a staged release ladder lights one rung at a time.',
        visualPrompt: 'Model behind a glass vitrine, staged release ladder, guarded glow.',
        technicalNote: 'GPT-2 (1.5B) was released in stages through 2019 over misuse concerns — the first time a lab withheld a model on those grounds.',
        codeSnippet: `GPT-2, 1,500,000,000 params
release: 124M -> 355M -> 774M -> 1.5B
// the debate it started outlived the model`
      },
      {
        id: 'oa2-2', chapterId: 'oa2', startTime: 40, endTime: 48,
        speaker: 'Scientist',
        cue: 'Training these things costs more than donations can cover. So the nonprofit grows a commercial arm with a ceiling on its returns.',
        read: 'The letter from act one grows a second panel; a capped meter fills to a marked line and stops.',
        visualPrompt: 'Two-panel structure diagram, a return meter hitting a hard cap line.',
        technicalNote: 'In 2019 OpenAI created a capped-profit entity under nonprofit control and took a $1B investment from Microsoft.',
        codeSnippet: `structure, 2019
  nonprofit  ── controls ──> capped-profit LP
  investor returns: capped multiple, then
  everything above flows back to the mission`
      },
      {
        id: 'oa2-3', chapterId: 'oa2', startTime: 48, endTime: 56,
        speaker: 'Scientist',
        cue: 'And then the clearest result of all. Plot loss against size, data and compute, and you get a straight line that refuses to bend.',
        read: 'A log-log plot draws itself; the line runs clean off the edge of the paper.',
        visualPrompt: 'Log-log scaling plot, straight descending line leaving the page.',
        technicalNote: 'Kaplan et al. (2020): test loss falls as a smooth power law in parameters, dataset size and compute — making capability forecastable.',
        codeSnippet: `L(N) ∝ N^−α     // parameters
L(D) ∝ D^−β     // data
L(C) ∝ C^−γ     // compute
// if the line holds, the roadmap is just money`
      },
      {
        id: 'oa2-4', chapterId: 'oa2', startTime: 56, endTime: 64,
        speaker: 'Caret',
        cue: 'GPT-3 follows: a hundred and seventy-five billion parameters, and the strange new trick of learning a task from the prompt itself.',
        read: 'The bloom opens to full size; a prompt with three examples produces a correct fourth.',
        visualPrompt: 'Full six-petal bloom, few-shot prompt card resolving an answer.',
        technicalNote: 'GPT-3 (2020): 175B parameters; few-shot in-context learning meant new tasks needed examples in the prompt, not gradient updates.',
        codeSnippet: `sea otter  => loutre de mer
cheese     => fromage
plush girafe => ?
// no training step. the answer just arrives.`
      }
    ]
  },
  {
    id: 'oa3',
    number: 3,
    title: 'The Text Box',
    subtitle: '2021–2022: code, pictures, the alignment step, and the night it went public',
    startTime: 64,
    endTime: 96,
    duration: 32,
    themeColor: '#E8A33D',
    accentColor: '#F2C87E',
    summary: 'The research becomes products — and one unglamorous training step turns a powerful model into something an ordinary person can actually use.',
    shots: [
      {
        id: 'oa3-1', chapterId: 'oa3', startTime: 64, endTime: 72,
        speaker: 'Scientist',
        cue: 'First it writes code. A model trained on public repositories starts completing functions from nothing but their names.',
        read: 'An editor panel; a comment is typed and the body of the function writes itself beneath it.',
        visualPrompt: 'Code editor, comment line, auto-written function body, ghost text.',
        technicalNote: 'Codex (2021) powered the first in-editor completion products and showed natural language as a programming interface.',
        codeSnippet: `# return the nth fibonacci number
def fib(n):
    a, b = 0, 1
    for _ in range(n): a, b = b, a + b
    return a
# the comment was the only input`
      },
      {
        id: 'oa3-2', chapterId: 'oa3', startTime: 72, endTime: 80,
        speaker: 'Narrator',
        cue: 'Then it paints. Type a sentence that has never been true, and an image of it arrives anyway.',
        read: 'A line of text dissolves into a grid of painted frames that resolve into one picture.',
        visualPrompt: 'Text prompt dissolving into noise grid, resolving into an image.',
        technicalNote: 'DALL·E 2 (2022) brought diffusion-based image generation to a general audience and made the prompt itself a creative medium.',
        codeSnippet: `prompt -> latent noise -> denoise x N -> image
// the model has never seen this exact thing
// which is the entire point`
      },
      {
        id: 'oa3-3', chapterId: 'oa3', startTime: 80, endTime: 88,
        speaker: 'Scientist',
        cue: 'But raw models are not helpful. The step that changes everything is teaching it, from human preferences, how to actually answer.',
        read: 'Two candidate answers appear; a hand marks the better one; the bloom re-tunes toward it.',
        visualPrompt: 'A/B answer cards, human preference tick, model re-tuning.',
        technicalNote: 'InstructGPT / RLHF: supervised demonstrations plus a reward model trained on human comparisons, then policy optimisation.',
        codeSnippet: `1. demonstrations      -> supervised fine-tune
2. human comparisons   -> reward model
3. optimise policy against the reward
// smaller + aligned beat bigger + raw`
      },
      {
        id: 'oa3-4', chapterId: 'oa3', startTime: 88, endTime: 96,
        speaker: 'Caret',
        cue: 'November the thirtieth, 2022. They put a text box on the internet as a research preview, and a hundred million people arrive in two months.',
        read: 'The chat box appears, small and plain; crowds of tiny figures stream toward it from every edge.',
        visualPrompt: 'Plain chat box glowing, converging crowd, counter climbing.',
        technicalNote: 'ChatGPT launched 30 November 2022 as a research preview and was reported to reach ~100M monthly users within about two months.',
        codeSnippet: `the model had existed for months.
the box was new.

  research preview, 30 Nov 2022
  ~100,000,000 users in ~2 months`
      }
    ]
  },
  {
    id: 'oa4',
    number: 4,
    title: 'Five Days in November',
    subtitle: '2023: GPT-4, the whole world shipping, and the week the company nearly ended',
    startTime: 96,
    endTime: 130,
    duration: 34,
    themeColor: '#E2574C',
    accentColor: '#F09A92',
    summary: 'The most capable model yet, a global race it triggered, and then an internal crisis that answered the question of who actually controls the thing.',
    shots: [
      {
        id: 'oa4-1', chapterId: 'oa4', startTime: 96, endTime: 104,
        speaker: 'Narrator',
        cue: 'March 2023. GPT-4 arrives, it accepts images as well as text, and it starts scoring near the top of exams written for people.',
        read: 'The bloom gains a second ring; exam score bars rise past a dotted human line.',
        visualPrompt: 'Bloom with outer ring, benchmark bars crossing a human-median line.',
        technicalNote: 'GPT-4 (March 2023) was multimodal on input and scored in high percentiles on a range of professional and academic exams.',
        codeSnippet: `GPT-4, Mar 2023
  input:  text + images
  output: text
  exams:  top-decile on several professional tests
// capability stopped being the bottleneck`
      },
      {
        id: 'oa4-2', chapterId: 'oa4', startTime: 104, endTime: 112,
        speaker: 'Scientist',
        cue: 'Everybody ships. Every large lab reprioritises, every product grows a chat panel, and governments start drafting rules in a hurry.',
        read: 'A city of panels lights up one after another; a row of officials unrolls a long scroll of rules.',
        visualPrompt: 'Grid of competing product panels igniting, officials with a long scroll.',
        technicalNote: 'The launch reset the competitive landscape and accelerated legislative work, including the EU AI Act negotiations.',
        codeSnippet: `t+0   one chat box
t+6mo every major lab has one
t+12mo every product has one
t+18mo three continents are drafting law`
      },
      {
        id: 'oa4-3', chapterId: 'oa4', startTime: 112, endTime: 121,
        speaker: 'Chair',
        cue: 'Then on the seventeenth of November the board removes the chief executive, saying he had not been consistently candid with them.',
        read: 'A boardroom; the lights drop; a chair at the head of the table is suddenly empty.',
        visualPrompt: 'Dark boardroom, long table, one empty chair under a cold light.',
        technicalNote: 'On 17 November 2023 the board removed Sam Altman as CEO; the CTO was appointed interim CEO and the president resigned the same day.',
        codeSnippet: `17 Nov 2023, 12:00 PT
  board vote: remove the CEO
  stated reason: "not consistently candid"
// the governance structure finally did something`
      },
      {
        id: 'oa4-4', chapterId: 'oa4', startTime: 121, endTime: 130,
        speaker: 'Narrator',
        cue: 'Within three days, seven hundred and forty-five of about seven hundred and seventy employees sign one letter. By the twenty-second he is back.',
        read: 'Signatures fill a single sheet until it is solid with ink; the empty chair is filled again.',
        visualPrompt: 'Letter filling with signatures, counter racing to 745, chair refilled.',
        technicalNote: 'By 20 November a letter signed by 745 of ~770 employees demanded the board resign; Altman returned on 22 November with a new initial board.',
        codeSnippet: `745 / 770 signed
  demand: reinstate, and the board resigns
  result: both
// the staff turned out to be the real board`
      }
    ]
  },
  {
    id: 'oa5',
    number: 5,
    title: 'Senses and Second Thoughts',
    subtitle: '2024: voice, video, and a model that stops to think before it answers',
    startTime: 130,
    endTime: 162,
    duration: 32,
    themeColor: '#2F6FEB',
    accentColor: '#8AB0F5',
    summary: 'The model gains ears and eyes and a voice — and then a different axis of progress opens up: not a bigger model, but one that is allowed to think for longer.',
    shots: [
      {
        id: 'oa5-1', chapterId: 'oa5', startTime: 130, endTime: 138,
        speaker: 'Caret',
        cue: 'May 2024. One model takes speech, images and text through the same door, and answers out loud in about the time a person would.',
        read: 'Three streams — a waveform, a photograph, a line of letters — converge into a single glowing arch.',
        visualPrompt: 'Waveform, image and text merging into one arch, Caret listening.',
        technicalNote: 'GPT-4o handled audio, vision and text in a single model, cutting spoken-response latency to roughly conversational speed.',
        codeSnippet: `before: speech->text, text->text, text->speech
        three models, ~3 s of latency
after:  one model, audio in, audio out
        ~0.3 s — close to a human turn`
      },
      {
        id: 'oa5-2', chapterId: 'oa5', startTime: 138, endTime: 146,
        speaker: 'Scientist',
        cue: 'Then September. A model trained to reason first and answer second — it spends seconds thinking, and the hard problems start falling.',
        read: 'The bloom slows and a thinking ring orbits it; a hard problem resolves after a visible pause.',
        visualPrompt: 'Bloom with orbiting thinking ring, timer counting, problem resolving.',
        technicalNote: 'The o-series used reinforcement learning on long chains of reasoning, trading inference time for accuracy on maths, code and science.',
        codeSnippet: `scaling, axis 2
  train-time compute  ── still works
  TEST-time compute   ── new: think longer, score higher
// the answer improves while you wait`
      },
      {
        id: 'oa5-3', chapterId: 'oa5', startTime: 146, endTime: 154,
        speaker: 'Narrator',
        cue: 'And it learns to make video. A paragraph of description becomes a moving shot, with objects that mostly stay themselves.',
        read: 'A written line unspools into a strip of film frames that animate as the strip slides past.',
        visualPrompt: 'Text unspooling into a filmstrip, frames animating in sequence.',
        technicalNote: 'Sora generated video from text, treating patches across space and time the way earlier models treated tokens.',
        codeSnippet: `image: patches over space
video: patches over space AND time
// same recipe, one more dimension`
      },
      {
        id: 'oa5-4', chapterId: 'oa5', startTime: 154, endTime: 162,
        speaker: 'Scientist',
        cue: 'But people leave. Several of the researchers who built the safety work depart, arguing that the race is outrunning the guardrails.',
        read: 'Scaffolding around the bloom; a few figures set down their tools and walk out of frame.',
        visualPrompt: 'Safety scaffolding half-built, researchers departing, bloom still growing.',
        technicalNote: 'During 2024 several senior safety researchers left, publicly arguing that safety culture was being deprioritised against shipping.',
        codeSnippet: `the recurring argument:
  capability curve  ── exponential
  assurance curve   ── linear, at best
// the gap between them is the whole debate`
      }
    ]
  },
  {
    id: 'oa6',
    number: 6,
    title: 'The Furnace',
    subtitle: '2025: half a trillion in concrete, and a nonprofit that becomes a shareholder',
    startTime: 162,
    endTime: 192,
    duration: 30,
    themeColor: '#3A3F4B',
    accentColor: '#C7D0DA',
    summary: 'Progress becomes a construction project. The money required to keep the line straight finally reshapes the organisation that drew it.',
    shots: [
      {
        id: 'oa6-1', chapterId: 'oa6', startTime: 162, endTime: 170,
        speaker: 'Narrator',
        cue: 'January 2025. A joint venture is announced to spend up to five hundred billion dollars building data centres in the United States.',
        read: 'A desert plain; foundations are poured and halls of racks rise row after row to the horizon.',
        visualPrompt: 'Desert construction, rising server halls receding to the horizon.',
        technicalNote: 'The Stargate project was announced in January 2025 by OpenAI with SoftBank, Oracle and MGX, planning up to $500B of US AI infrastructure.',
        codeSnippet: `Stargate, announced Jan 2025
  target: up to $500,000,000,000
  horizon: four years
// the roadmap is now partly a civil works programme`
      },
      {
        id: 'oa6-2', chapterId: 'oa6', startTime: 170, endTime: 178,
        speaker: 'Scientist',
        cue: 'Because the straight line has a price. Every step along it costs more power, more silicon and more concrete than the step before.',
        read: 'The scaling line returns, now resting on a stack of substations, racks and transformers that grows beneath it.',
        visualPrompt: 'Scaling line supported by growing infrastructure stack, power pylons.',
        technicalNote: 'Each order-of-magnitude of capability has required roughly an order of magnitude more compute, power and capital.',
        codeSnippet: `to move the loss one notch:
  compute  x10
  power    x10
  capital  x10
// the physics bill arrives before the revenue`
      },
      {
        id: 'oa6-3', chapterId: 'oa6', startTime: 178, endTime: 185,
        speaker: 'Chair',
        cue: 'So in October the structure changes again. The for-profit becomes a public benefit corporation, and the nonprofit becomes its largest mission shareholder.',
        read: 'The two-panel diagram from act two redraws itself: the cap dissolves, the nonprofit keeps the controlling thread.',
        visualPrompt: 'Structure diagram redrawing, cap meter dissolving, control thread held.',
        technicalNote: 'On 28 October 2025 OpenAI recapitalised: the for-profit became OpenAI Group PBC, controlled by the renamed OpenAI Foundation (~26%), with Microsoft at ~27%.',
        codeSnippet: `28 Oct 2025
  for-profit -> OpenAI Group PBC
  nonprofit  -> OpenAI Foundation, ~26%, in control
  Microsoft  -> ~27%
  profit cap -> removed`
      },
      {
        id: 'oa6-4', chapterId: 'oa6', startTime: 185, endTime: 192,
        speaker: 'Narrator',
        cue: 'The promise stays in the charter. Whether a corporation can keep it is the experiment everybody is now inside of.',
        read: 'The 2015 letter reappears, pinned beside the new structure; the original sentence still legible.',
        visualPrompt: 'Original letter pinned next to the new corporate diagram, same sentence.',
        technicalNote: 'The Foundation retains control and a stake that grows at valuation milestones; the PBC form obliges the company to weigh its stated public benefit.',
        codeSnippet: `the sentence is unchanged since 2015.
the entity around it is unrecognisable.
// that tension is the story, not a footnote`
      }
    ]
  },
  {
    id: 'oa7',
    number: 7,
    title: 'A Billion Conversations',
    subtitle: '2026 → next: the scale it reached, and the question it still has not answered',
    startTime: 192,
    endTime: 216,
    duration: 24,
    themeColor: '#10A37F',
    accentColor: '#7FE0C4',
    summary: 'Eleven years from a letter: a billion people a week typing into a box, tens of billions in revenue, and the original promise still outstanding.',
    shots: [
      {
        id: 'oa7-1', chapterId: 'oa7', startTime: 192, endTime: 199,
        speaker: 'Caret',
        cue: 'By 2026 about a billion people a week are typing into it, and millions of businesses are building on top of it.',
        read: 'The frame fills with thousands of tiny cursors blinking in a vast grid, each one a conversation.',
        visualPrompt: 'Field of thousands of blinking carets forming a living grid.',
        technicalNote: 'Weekly active users were reported passing 800M in late 2025 and around 1B during 2026, with business customers in the millions.',
        codeSnippet: `weekly users
  2023   ~100,000,000
  2025   ~800,000,000
  2026  ~1,000,000,000
// one text box`
      },
      {
        id: 'oa7-2', chapterId: 'oa7', startTime: 199, endTime: 206,
        speaker: 'Narrator',
        cue: 'The revenue is real now, in the tens of billions a year. So are the losses, and the trillion-dollar compute commitments behind them.',
        read: 'Two counters roll up side by side: revenue climbing, and beneath it an obligation column climbing faster.',
        visualPrompt: 'Twin counters, revenue column and commitment column, the second taller.',
        technicalNote: 'Annualised revenue was reported in the tens of billions during 2026, against heavy operating losses and very large multi-year compute commitments.',
        codeSnippet: `revenue        annualised, tens of $B
commitments    multi-year, far larger
// the bet is that the first curve catches the second`
      },
      {
        id: 'oa7-3', chapterId: 'oa7', startTime: 206, endTime: 211,
        speaker: 'Scientist',
        cue: 'And the original question is still open. Nobody has shown that the thing in the box understands anything at all.',
        read: 'The bloom turns slowly, fully lit; beside it the 2015 sentence waits, still unticked.',
        visualPrompt: 'Fully lit bloom rotating, mission sentence with an empty checkbox.',
        technicalNote: 'Capability has advanced far faster than consensus on evaluation, interpretability or what the systems internally represent.',
        codeSnippet: `measured:   benchmarks, users, revenue
unmeasured: understanding, intent, alignment
// we shipped the first list and kept arguing about the second`
      },
      {
        id: 'oa7-4', chapterId: 'oa7', startTime: 211, endTime: 216,
        speaker: 'Caret',
        cue: 'It began as a letter about everyone. It became a box that waits for you to type. The cursor is still blinking.',
        read: 'Camera pulls back: the whole story was a stage. Curtains fall and Caret, alone in the light, blinks once and bows.',
        visualPrompt: 'Stage pullback, velvet curtains, footlights, Caret bowing under a single spot.',
        technicalNote: 'A closing rhyme with the other films: the same theatre, the same bow, a question deliberately left open.',
        codeSnippet: `2015: "benefits all of humanity"
2026: a blinking cursor, a billion times a week
// still waiting for input`
      }
    ]
  }
];

export const OPENAI_DURATION = 216;
