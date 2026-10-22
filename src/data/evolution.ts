import { Chapter } from '../types/video';

/**
 * "THE LONG THAW" — the evolution of artificial intelligence, 1950 → now.
 * Same painted format and shot grammar as the Jev film: 7 acts, 28 shots,
 * 216 s nominal. codeSnippet carries the actual mathematics of each era.
 */

export const EVOLUTION_CHAPTERS: Chapter[] = [
  {
    id: 'ev1',
    number: 1,
    title: 'The Question (1950–1958)',
    subtitle: 'Can Machines Think? — Turing, Dartmouth and the First Neuron',
    startTime: 0,
    endTime: 32,
    duration: 32,
    themeColor: '#3a9c98',
    accentColor: '#6fc7c3',
    summary: 'Alan Turing refuses to define "thinking" and proposes a game instead. Six years later ten men spend a summer at Dartmouth and give the field its name.',
    shots: [
      {
        id: 'ev1-1', chapterId: 'ev1', startTime: 0, endTime: 8,
        speaker: 'Narrator',
        cue: 'In 1950, Alan Turing asked a question that was impossible to answer, so he replaced it with one that was not.',
        read: 'A chalkboard in a cold English room. The Researcher chalks "CAN MACHINES THINK?" and then crosses it out.',
        visualPrompt: 'Chalkboard, 1950 banner, the question written then struck through.',
        technicalNote: '"Computing Machinery and Intelligence", Mind, October 1950. Turing calls the original question "too meaningless to deserve discussion".',
        codeSnippet: `Q:  "Can machines think?"        // ill-posed
Q': "Can a machine play the imitation game
     well enough that an interrogator
     cannot reliably tell it from a human?"  // testable`
      },
      {
        id: 'ev1-2', chapterId: 'ev1', startTime: 8, endTime: 16,
        speaker: 'Clawd',
        cue: 'The imitation game. Two hidden players, one human, one machine, and a judge who may ask anything at all.',
        read: 'Two curtained booths labelled A and B, teletype ribbons running to a judge. Clawd is behind one curtain.',
        visualPrompt: 'Two painted booths, paper tape running to a seated judge.',
        technicalNote: 'Behaviour, not mechanism, becomes the criterion — a deliberately operational definition.',
        codeSnippet: `judge ⟷ A (human)
judge ⟷ B (machine)
// pass if  P(judge picks correctly) ≈ 0.5
// Turing's 50-year bet: 70% after 5 minutes`
      },
      {
        id: 'ev1-3', chapterId: 'ev1', startTime: 16, endTime: 24,
        speaker: 'Narrator',
        cue: 'Summer, 1956. Ten men book two months at Dartmouth College and propose to solve it. They name the field artificial intelligence.',
        read: 'A New England summer house. Ten empty wooden chairs in a circle, a hand-lettered sign reading DARTMOUTH 1956.',
        visualPrompt: 'Summer house, circle of chairs, hand-painted banner.',
        technicalNote: 'McCarthy, Minsky, Rochester and Shannon, 1955 proposal: "every aspect of learning… can in principle be so precisely described that a machine can be made to simulate it."',
        codeSnippet: `Dartmouth Summer Research Project, 1956
  duration: 2 months · people: 10
  claim: "a significant advance can be made
          if a carefully selected group works
          together for a summer"
  // it took seventy years and counting`
      },
      {
        id: 'ev1-4', chapterId: 'ev1', startTime: 24, endTime: 32,
        speaker: 'Engineer',
        cue: 'Then Frank Rosenblatt built a machine that learned. The perceptron adjusted its own weights whenever it got an answer wrong.',
        read: 'A cabinet of photocells wired to dials. A light blinks, a dial turns itself, the wire glows brighter.',
        visualPrompt: 'Perceptron cabinet, photocell grid, self-turning weight dials.',
        technicalNote: 'Rosenblatt, 1958. The Mark I Perceptron used motor-driven potentiometers as physical weights.',
        codeSnippet: `ŷ = step( Σᵢ wᵢ xᵢ + b )
// learning rule — the first one that worked:
wᵢ ← wᵢ + η (y − ŷ) xᵢ
// converges iff the data is linearly separable`
      }
    ]
  },
  {
    id: 'ev2',
    number: 2,
    title: 'Symbols and Rules (1966–1973)',
    subtitle: 'ELIZA, Expert Systems, and the Brittleness of Hand-Written Thought',
    startTime: 32,
    endTime: 60,
    duration: 28,
    themeColor: '#7b5ca8',
    accentColor: '#a98fd0',
    summary: 'If intelligence is symbol manipulation, write the symbols down. It worked astonishingly well in narrow worlds and collapsed everywhere else.',
    shots: [
      {
        id: 'ev2-1', chapterId: 'ev2', startTime: 32, endTime: 39,
        speaker: 'Narrator',
        cue: 'In 1966 a program with barely two hundred rules convinced people it understood them. Weizenbaum was horrified by how little it took.',
        read: 'A teletype clatters out: HOW DOES THAT MAKE YOU FEEL? The Researcher leans in, strangely moved.',
        visualPrompt: 'Teletype printing ELIZA dialogue, operator leaning close.',
        technicalNote: 'ELIZA / DOCTOR script, Weizenbaum 1966. His secretary asked him to leave the room so she could talk to it privately.',
        codeSnippet: `(* I am (.*))        → "How long have you been \\2?"
(* my (.*))          → "Tell me more about your \\2."
(* always *)         → "Can you think of a specific example?"
// no model of meaning. none at all.`
      },
      {
        id: 'ev2-2', chapterId: 'ev2', startTime: 39, endTime: 46,
        speaker: 'Clawd',
        cue: 'So they scaled the idea. Expert systems captured a specialist in a few thousand rules, and for a while they genuinely beat the specialists.',
        read: 'A wall of index cards, each an IF-THEN rule, being pinned up by Clawd on a ladder.',
        visualPrompt: 'Wall of rule cards, Clawd on a painted ladder pinning more.',
        technicalNote: 'MYCIN (1976) diagnosed bacteraemia at roughly 69% acceptable-therapy rate, above human experts in trials — and was never deployed.',
        codeSnippet: `IF   stain(organism) = gram_positive
AND  morphology(organism) = coccus
AND  growth(organism) = chains
THEN suggests streptococcus  (cf 0.7)`
      },
      {
        id: 'ev2-3', chapterId: 'ev2', startTime: 46, endTime: 53,
        speaker: 'Engineer',
        cue: 'But every exception needed another rule, and every rule collided with the last. The knowledge never finished being written.',
        read: 'The card wall multiplies, cards tangle with string, the whole structure leans and begins to topple.',
        visualPrompt: 'Toppling wall of rule cards, tangled red string, Clawd alarmed.',
        technicalNote: 'The knowledge-acquisition bottleneck: rule interactions grow combinatorially, and common sense never bottoms out.',
        codeSnippet: `rules:      2,000      ✓ works
rules:     20,000      ~ contradictions appear
rules:    200,000      ✗ nobody can maintain it
// Cyc has been hand-coding common sense since 1984`
      },
      {
        id: 'ev2-4', chapterId: 'ev2', startTime: 53, endTime: 60,
        speaker: 'Narrator',
        cue: 'In 1973 the Lighthill report told the British government the promises had not been kept. The money began to close like a tap.',
        read: 'A heavy report slams on a desk, a red stamp lands, a brass funding tap screws shut.',
        visualPrompt: 'Stamped report, brass tap closing, pipe going dry.',
        technicalNote: 'The Lighthill Report (1973) criticised AI\'s failure on "combinatorial explosion"; UK funding was cut to a handful of universities.',
        codeSnippet: `verdict: "in no part of the field have the
          discoveries made so far produced the
          major impact that was then promised"
→ UK AI funding: withdrawn`
      }
    ]
  },
  {
    id: 'ev3',
    number: 3,
    title: 'The Winters (1974–1993)',
    subtitle: 'Two Collapses — and the Small Warm Rooms That Kept Working',
    startTime: 60,
    endTime: 84,
    duration: 24,
    themeColor: '#2f3c7a',
    accentColor: '#8ec3e6',
    summary: 'Twice the field froze. Both times a handful of people kept going on almost no money, and one of their ideas turned out to be the whole future.',
    shots: [
      {
        id: 'ev3-1', chapterId: 'ev3', startTime: 60, endTime: 66,
        speaker: 'Narrator',
        cue: 'The first winter. Snow over the laboratories, projects cancelled, and the phrase artificial intelligence quietly dropped from grant applications.',
        read: 'Snow falls over the painted lab. Clawd stands half-buried, shivering, pale blue.',
        visualPrompt: 'Snow over a lab building, pale shivering Clawd, grey sky.',
        technicalNote: 'DARPA ended open-ended AI funding after the 1969 Mansfield Amendment and the failure of speech-understanding milestones.',
        codeSnippet: `1974–1980  "AI winter"
  grant applications renamed:
    "artificial intelligence" → "informatics"
    "machine learning"        → "pattern recognition"`
      },
      {
        id: 'ev3-2', chapterId: 'ev3', startTime: 66, endTime: 72,
        speaker: 'Clawd',
        cue: 'Minsky and Papert had already shown a single layer could not even learn exclusive-or. Most people read that as a verdict on neural networks entirely.',
        read: 'A chalk XOR truth table with a straight line failing to separate the four points, however it is drawn.',
        visualPrompt: 'XOR plot, four points, a line that cannot separate them, chalk.',
        technicalNote: 'Perceptrons (1969). The result is about single layers only — but it chilled neural research for fifteen years.',
        codeSnippet: `XOR:  (0,0)→0  (0,1)→1  (1,0)→1  (1,1)→0
// no w, b satisfies  step(w·x + b) = XOR(x)
// one hidden layer does. nobody could train it yet.`
      },
      {
        id: 'ev3-3', chapterId: 'ev3', startTime: 72, endTime: 78,
        speaker: 'Engineer',
        cue: 'Then in 1986 a small group showed you could send the error backwards through the layers, and the hidden units would organise themselves.',
        read: 'A warm lamp-lit room in the snow. A network diagram where red error arrows flow backwards, layer by layer.',
        visualPrompt: 'Lamp-lit room, network with backward-flowing error arrows.',
        technicalNote: 'Rumelhart, Hinton & Williams, Nature 1986 — backpropagation popularised. Derived independently several times before (Linnainmaa 1970, Werbos 1974).',
        codeSnippet: `∂E/∂wᵢⱼ = δⱼ · aᵢ
δ_output = (ŷ − y) · σ'(z)
δ_hidden = (Σₖ wⱼₖ δₖ) · σ'(zⱼ)   // the chain rule, backwards
// credit assignment, finally solved`
      },
      {
        id: 'ev3-4', chapterId: 'ev3', startTime: 78, endTime: 84,
        speaker: 'Narrator',
        cue: 'The second winter came anyway. The Lisp machine market vanished in a year. But under the ice, the idea was already alive.',
        read: 'Abandoned Lisp machines under snow — and beneath the frost, a small warm seed glowing orange.',
        visualPrompt: 'Snow-buried hardware, a glowing seed under translucent ice.',
        technicalNote: 'The specialised Lisp-machine industry collapsed in 1987 when cheap general-purpose workstations overtook it.',
        codeSnippet: `1987: Lisp machine market  $500M → ~0
1989: LeCun's LeNet reads handwritten digits
      with convolutions + backprop
// the winter and the future, same year`
      }
    ]
  },
  {
    id: 'ev4',
    number: 4,
    title: 'Learn, Don\'t Tell (1995–2011)',
    subtitle: 'Statistics Wins, Deep Blue Wins, and the Internet Supplies the Data',
    startTime: 84,
    endTime: 116,
    duration: 32,
    themeColor: '#6e9f58',
    accentColor: '#9ccb82',
    summary: 'The field stopped trying to write intelligence down and started fitting it to data. Then the web arrived and supplied data at a scale nobody had planned for.',
    shots: [
      {
        id: 'ev4-1', chapterId: 'ev4', startTime: 84, endTime: 92,
        speaker: 'Narrator',
        cue: 'The quiet revolution was philosophical. Stop telling the machine the rules. Show it enough examples and let it fit the rule itself.',
        read: 'A table of handwritten data points turns into a smooth curve threading through them.',
        visualPrompt: 'Scatter of painted data points, a curve fitting itself through them.',
        technicalNote: 'Statistical learning theory (Vapnik), SVMs, boosting, graphical models — the 1990s ML mainstream, with real guarantees.',
        codeSnippet: `argmin_f   Σᵢ L(f(xᵢ), yᵢ)  +  λ‖f‖²
//         ╰─ fit the data ─╯    ╰─ stay simple ─╯
// generalisation, not memorisation`
      },
      {
        id: 'ev4-2', chapterId: 'ev4', startTime: 92, endTime: 100,
        speaker: 'Clawd',
        cue: 'In 1997 Deep Blue beat Garry Kasparov. It understood nothing about chess — it simply searched two hundred million positions every second.',
        read: 'A painted chessboard; a huge machine tower beside it; a human champion\'s hand hesitating over a piece.',
        visualPrompt: 'Chessboard, looming machine cabinet, hesitant human hand.',
        technicalNote: 'Deep Blue: custom VLSI chess chips, ~200M positions/sec, alpha-beta search with a hand-tuned evaluation function.',
        codeSnippet: `minimax with α-β pruning, depth ~12 ply
positions/sec: 200,000,000
evaluation: hand-written by grandmasters
// brute force is a kind of intelligence too`
      },
      {
        id: 'ev4-3', chapterId: 'ev4', startTime: 100, endTime: 108,
        speaker: 'Engineer',
        cue: 'Then the web filled up with pictures, and Fei-Fei Li had a thought: the bottleneck was never the algorithms. It was the data.',
        read: 'A flood of tiny painted photographs pours across the frame and stacks into a labelled mountain.',
        visualPrompt: 'Torrent of small images forming a labelled mountain, ImageNet banner.',
        technicalNote: 'ImageNet (2009): 14 million hand-labelled images across 20,000 categories, annotated via Amazon Mechanical Turk.',
        codeSnippet: `ImageNet
  images:     14,000,000
  categories: 20,000
  labellers:  49,000 people, 167 countries
// the benchmark that made the next decade possible`
      },
      {
        id: 'ev4-4', chapterId: 'ev4', startTime: 108, endTime: 116,
        speaker: 'Narrator',
        cue: 'And the hardware arrived sideways. Graphics cards built to draw video-game triangles turned out to be perfect for multiplying matrices.',
        read: 'A gaming graphics card is unscrewed from an arcade cabinet and bolted into a lab rack; parallel lanes light up.',
        visualPrompt: 'GPU card moving from arcade machine to lab rack, parallel glowing lanes.',
        technicalNote: 'CUDA (2007) made GPUs programmable for general compute; a GPU offered ~10–50× throughput on dense linear algebra.',
        codeSnippet: `CPU:  ~8 fat cores   → sequential, branchy
GPU:  ~3000 thin cores → the same op, everywhere
// a neural net is mostly  Y = XW  ... repeatedly`
      }
    ]
  },
  {
    id: 'ev5',
    number: 5,
    title: 'Ignition (2012–2016)',
    subtitle: 'AlexNet, Depth, and the Moment the Error Rate Fell Off a Cliff',
    startTime: 116,
    endTime: 146,
    duration: 30,
    themeColor: '#e8aa38',
    accentColor: '#f5c969',
    summary: 'Data, compute and backpropagation finally met in the same room. The results did not improve gradually — they fell off a cliff, and the whole field turned.',
    shots: [
      {
        id: 'ev5-1', chapterId: 'ev5', startTime: 116, endTime: 124,
        speaker: 'Narrator',
        cue: 'September 2012. AlexNet enters the ImageNet competition and cuts the error rate by ten whole points in a single year.',
        read: 'A bar chart of yearly error rates; the 2012 bar drops dramatically below a painted dotted line.',
        visualPrompt: 'Painted bar chart, dramatic 2012 drop, crowd of tiny astonished figures.',
        technicalNote: 'AlexNet: top-5 error 15.3% vs 26.2% for the runner-up. Trained for six days on two GTX 580 GPUs.',
        codeSnippet: `ILSVRC top-5 error
  2010  28.2%   ████████████████████████████
  2011  25.8%   ██████████████████████████
  2012  15.3%   ███████████████   ← AlexNet
  2015   3.6%   ████  ← below human (~5%)`
      },
      {
        id: 'ev5-2', chapterId: 'ev5', startTime: 124, endTime: 131,
        speaker: 'Clawd',
        cue: 'What depth bought was hierarchy. Early layers find edges, middle layers find parts, late layers find whole objects — and nobody specified any of it.',
        read: 'Three stacked painted panels: scratchy edges, then wheels and eyes, then a whole cat emerging.',
        visualPrompt: 'Three stacked feature panels rising from edges to parts to a whole object.',
        technicalNote: 'Learned feature hierarchies replaced hand-designed features (SIFT, HOG) across vision almost entirely within three years.',
        codeSnippet: `layer 1 → oriented edges, colour blobs
layer 3 → textures, corners, repeated motifs
layer 5 → wheels, eyes, faces
// features are learned, not engineered`
      },
      {
        id: 'ev5-3', chapterId: 'ev5', startTime: 131, endTime: 139,
        speaker: 'Engineer',
        cue: 'Everything fell in sequence: speech recognition, translation, then Go — a game people had argued would need genuine intuition.',
        read: 'A painted Go board with the famous shoulder-hit stone glowing; three toppled dominoes labelled speech, vision, translation.',
        visualPrompt: 'Go board with a single glowing stone, toppled labelled dominoes.',
        technicalNote: 'AlphaGo beat Lee Sedol 4–1 in March 2016; move 37 of game 2 was given a ~1-in-10,000 probability of being played by a human.',
        codeSnippet: `AlphaGo = policy net + value net + MCTS
  move 37, game 2:  P(human plays this) ≈ 1/10,000
  Fan Hui: "It's not a human move. It's beautiful."`
      },
      {
        id: 'ev5-4', chapterId: 'ev5', startTime: 139, endTime: 146,
        speaker: 'Narrator',
        cue: 'And then someone plotted performance against size, and found a straight line that refused to bend.',
        read: 'A log-log plot drawn in ink; a perfectly straight descending line extends off the edge of the paper.',
        visualPrompt: 'Log-log plot with a straight line running off the page edge.',
        technicalNote: 'Neural scaling laws (Hestness 2017; Kaplan et al. 2020): loss falls as a power law in parameters, data and compute.',
        codeSnippet: `L(N) ≈ (Nc / N)^αN      // parameters
L(D) ≈ (Dc / D)^αD      // data
L(C) ≈ (Cc / C)^αC      // compute
// smooth, predictable, and no visible ceiling`
      }
    ]
  },
  {
    id: 'ev6',
    number: 6,
    title: 'Attention (2017–2022)',
    subtitle: 'One Architecture, Every Modality, and the Night the World Noticed',
    startTime: 146,
    endTime: 184,
    duration: 38,
    themeColor: '#d97757',
    accentColor: '#f2a283',
    summary: 'A 2017 paper threw away recurrence and kept only attention. It parallelised perfectly, so it scaled — and scaling was now known to work.',
    shots: [
      {
        id: 'ev6-1', chapterId: 'ev6', startTime: 146, endTime: 155,
        speaker: 'Narrator',
        cue: 'In 2017 eight researchers published a paper with an unusually confident title: attention is all you need. They were right.',
        read: 'A painted paper on a table, title hand-lettered, eight small name-cards fanned beneath it.',
        visualPrompt: 'Paper with hand-lettered title, eight author cards, warm desk light.',
        technicalNote: 'Vaswani et al., NeurIPS 2017. Recurrence and convolution removed entirely; the model sees the whole sequence at once.',
        codeSnippet: `Attention(Q,K,V) = softmax( Q Kᵀ / √dk ) V
// every position attends to every other, in ONE pass
// RNN: O(n) sequential steps → Transformer: O(1)`
      },
      {
        id: 'ev6-2', chapterId: 'ev6', startTime: 155, endTime: 164,
        speaker: 'Clawd',
        cue: 'The trick is that every word looks at every other word at the same time, and learns how much each one matters.',
        read: 'A sentence painted across the frame; glowing arcs arch between words, thickening where attention is strong.',
        visualPrompt: 'Sentence with glowing attention arcs of varying thickness between words.',
        technicalNote: 'Multi-head attention runs several such comparisons in parallel subspaces, then concatenates them.',
        codeSnippet: `"the animal didn't cross the street because it was too tired"
                                        ↑          ↑
                            head 4 links  it  →  animal  (0.81)
// the resolution is learned, never written down`
      },
      {
        id: 'ev6-3', chapterId: 'ev6', startTime: 164, endTime: 174,
        speaker: 'Engineer',
        cue: 'Because it parallelised, you could simply make it bigger. And because scaling laws held, bigger kept meaning better.',
        read: 'A painted ladder of rising blocks: 117 million, 1.5 billion, 175 billion, each dwarfing the last.',
        visualPrompt: 'Ascending ladder of blocks labelled with parameter counts, Clawd climbing.',
        technicalNote: 'GPT-1 117M (2018) → GPT-2 1.5B (2019) → GPT-3 175B (2020): a ~1500× increase in three years.',
        codeSnippet: `GPT-1  2018    117,000,000 params
GPT-2  2019  1,500,000,000
GPT-3  2020 175,000,000,000
// same architecture. mostly just… more.`
      },
      {
        id: 'ev6-4', chapterId: 'ev6', startTime: 174, endTime: 184,
        speaker: 'Narrator',
        cue: 'November 2022. They put a text box on the internet, and a hundred million people arrived within two months.',
        read: 'A simple painted chat box on a dark screen; a crowd of tiny figures streams toward it from every direction.',
        visualPrompt: 'Glowing chat box, crowds of small painted figures converging on it.',
        technicalNote: 'ChatGPT reached ~100M monthly users by January 2023 — the fastest consumer-product adoption recorded at the time. RLHF made the capability usable.',
        codeSnippet: `the research had existed for years.
the interface was new.

  pretrain → supervised fine-tune → RLHF
  // the last step is what made it answer you`
      }
    ]
  },
  {
    id: 'ev7',
    number: 7,
    title: 'What We Ask Next (2023– )',
    subtitle: 'Agents, Reflexes, and the Question That Replaces the Turing Test',
    startTime: 184,
    endTime: 216,
    duration: 32,
    themeColor: '#e27a92',
    accentColor: '#f0a3b4',
    summary: 'Models stopped only answering and began acting. Speed became an architecture problem, and the old question — can it think? — quietly stopped being the interesting one.',
    shots: [
      {
        id: 'ev7-1', chapterId: 'ev7', startTime: 184, endTime: 192,
        speaker: 'Clawd',
        cue: 'The senses merged. One model now takes text, images and sound through the same door, because it is all just tokens underneath.',
        read: 'Three painted streams — letters, a photograph, a waveform — converge into one glowing doorway.',
        visualPrompt: 'Three input streams merging into a single painted arch.',
        technicalNote: 'Multimodal transformers patch images and audio into token sequences, letting one attention stack serve every modality.',
        codeSnippet: `text  → tokens
image → 16×16 patches → tokens
audio → spectrogram frames → tokens
// one sequence model, three senses`
      },
      {
        id: 'ev7-2', chapterId: 'ev7', startTime: 192, endTime: 200,
        speaker: 'Engineer',
        cue: 'Then it stopped only answering. Give a model tools and a loop, and it starts doing things in the world on your behalf.',
        read: 'Clawd holds a wrench, a terminal and a browser window on strings, cycling them round in a loop.',
        visualPrompt: 'Clawd juggling tool icons in a circular painted loop with arrows.',
        technicalNote: 'The agent loop: observe → decide → call a tool → read the result → repeat, until a stopping condition.',
        codeSnippet: `while (!done) {
  const thought = model(state);
  const result  = tools[thought.call](thought.args);
  state = state.concat(result);        // it acts
}`
      },
      {
        id: 'ev7-3', chapterId: 'ev7', startTime: 200, endTime: 208,
        speaker: 'Narrator',
        cue: 'And speed came back as a design problem. Not every decision deserves deliberation — most of them want a reflex.',
        read: 'The split mind returns: a fast cyan reflex at the gate, a slow violet thinker behind it, both painted calmly.',
        visualPrompt: 'Gate with a fast cyan guard and a slow violet thinker behind — callback to the Jev film.',
        technicalNote: 'Kahneman\'s split, now an engineering decision: System 1 models answer in ~70 ms; System 2 models reason for seconds.',
        codeSnippet: `if (decision.confidence > 0.90) {
  fastPath(decision.choice);      // ~70 ms, reflex
} else {
  deliberate(state);              // seconds, reasoning
}`
      },
      {
        id: 'ev7-4', chapterId: 'ev7', startTime: 208, endTime: 216,
        speaker: 'Narrator',
        cue: 'Seventy years on, nobody really asks Turing\'s question any more. We stopped asking whether it thinks, and started asking what we should hand it next.',
        read: 'The camera pulls back: the whole history is a painted stage. Curtains fall. Clawd and the Researcher bow together.',
        visualPrompt: 'Stage pullback, red velvet curtains, footlights, Clawd and Researcher bowing.',
        technicalNote: 'A closing rhyme with the Jev film: the same theatre, the same bow, a different question.',
        codeSnippet: `1950: "Can machines think?"
2026: "What should we trust them to decide?"
// the harder question was always the second one`
      }
    ]
  }
];

export const EVOLUTION_DURATION = 216;
