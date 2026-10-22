import { Chapter, Shot } from '../types/video';

export const CHAPTERS: Chapter[] = [
  {
    id: 'ch1',
    number: 1,
    title: 'The Crisis of System Two',
    subtitle: 'Why Are We Asking 100B Parameter Models If A Ticket Is Angry?',
    startTime: 0,
    endTime: 26,
    duration: 26,
    themeColor: '#ef4444',
    accentColor: '#f87171',
    summary: 'The modern AI stack is choking. Developers call 100-billion-parameter generative models just to route a ticket or pick a branch—waiting 8 seconds and burning dollars for a simple enum.',
    shots: [
      {
        id: 's1-1',
        chapterId: 'ch1',
        startTime: 0,
        endTime: 6,
        cue: 'We built the most capable thinking machines in human history, and then we handed them paperwork.',
        read: 'A massive glowing neural brain sits on stage while Clawd and the Researcher look in awe.',
        speaker: 'Narrator',
        visualPrompt: 'Clawd and Engineer staring up at an enormous pulsing LLM neural monolith.',
        technicalNote: 'Autoregressive LLMs (Claude, GPT, Gemini) generate text token-by-token at high computational overhead.',
        codeSnippet: `// The current anti-pattern in 2026:
const response = await anthropic.messages.create({
  model: "claude-3-5-sonnet",
  messages: [{ role: "user", content: "Is this ticket urgent? Return JSON { urgent: boolean }" }]
}); // 8.8s median latency, $0.015/call`
      },
      {
        id: 's1-2',
        chapterId: 'ch1',
        startTime: 6,
        endTime: 13,
        cue: 'We ask a hundred-billion-parameter model a question a light switch could answer: is this customer angry, yes or no?',
        read: 'The Engineer looks exhausted holding a tiny yes/no flag while the giant LLM chugs gears slowly.',
        speaker: 'Clawd',
        visualPrompt: 'Engineer pointing a microscope at a tiny "true/false" boolean while gears grind at 1 token/sec.',
        technicalNote: 'Using generative models for simple deterministic routing wastes 99% of compute on autoregressive autorecovery.',
        codeSnippet: `// Generating 2 tokens: "{"urgent": true}"
// Costs:
// - Time-To-First-Token (TTFT): 1.2s - 2.5s
// - Total roundtrip: 8.8s
// - Vulnerable to JSON schema hallucinations`
      },
      {
        id: 's1-3',
        chapterId: 'ch1',
        startTime: 13,
        endTime: 20,
        cue: 'Eight seconds of spinner. Real money per call. And every so often, it answers in prose and breaks the parser.',
        read: 'A spinning loader wheel tortures Clawd. A dollar meter ticks upward frantically.',
        speaker: 'Narrator',
        visualPrompt: 'A giant spinning browser wheel, dollar signs fluttering away, and red JSON syntax error explosions.',
        technicalNote: 'Every.to & TypeSafe benchmarks showed 8.83s median response time for LLM JSON tool evaluations.',
        codeSnippet: `SyntaxError: Unexpected token '` + '`' + `' in JSON at position 0
// "I'd be happy to help! Here is the JSON: {"urgent": true}"
// System crashes because LLM was chatty!`
      },
      {
        id: 's1-4',
        chapterId: 'ch1',
        startTime: 20,
        endTime: 26,
        cue: 'Software doesn\'t want an essay to pick a branch. It wants one typed decision, right now.',
        read: 'The engineer slaps a big red STOP sign over the slow LLM. A lightning bolt strikes.',
        speaker: 'Engineer',
        visualPrompt: 'Clawd sweeps the slow spinning LLM off stage. A clean lightning circuit appears.',
        technicalNote: 'Software architectures require fast, reliable primitives: enums, booleans, and scalar scores.',
        codeSnippet: `// What software actually needs:
type Decision = { choice: "billing" | "tech", p: [0.94, 0.06] }
// Latency budget: < 100ms. Cost: microcents.`
      }
    ]
  },
  {
    id: 'ch2',
    number: 2,
    title: 'The Ghost of 1865: Jevons Paradox',
    subtitle: 'Why Cheaper Coal Burned More Steam — And Why Cheap AI Explodes Demand',
    startTime: 26,
    endTime: 56,
    duration: 30,
    themeColor: '#f59e0b',
    accentColor: '#fbbf24',
    summary: 'In 1865, William Stanley Jevons proved that making steam engines efficient didn\'t save coal—it multiplied consumption a thousandfold. The same economic law governs AI decisions.',
    shots: [
      {
        id: 's2-1',
        chapterId: 'ch2',
        startTime: 26,
        endTime: 34,
        cue: 'To understand the fix, go back to England, eighteen sixty-five, where an economist named William Stanley Jevons is staring at a steam engine.',
        read: 'A sepia watercolor Victorian city appears with William Stanley Jevons in a top hat pointing at a steam locomotive.',
        speaker: 'Narrator',
        visualPrompt: 'William Stanley Jevons in top hat holding a ledger next to James Watt steam engine with puffing white clouds.',
        technicalNote: 'William Stanley Jevons (1835–1882) published "The Coal Question" in 1865, founding the Jevons paradox.',
        codeSnippet: `// Jevons Paradox (1865):
// Efficiency (η) increases -> Cost (C) drops -> Total Consumption (Q) skyrockets!
// dQ/dη > 0 due to elastic demand rebound.`
      },
      {
        id: 's2-2',
        chapterId: 'ch2',
        startTime: 34,
        endTime: 42,
        cue: 'Everyone assumed that doubling engine efficiency would halve the coal burned. Jevons showed the opposite: Britain burned roughly ten times more.',
        read: 'Clawd holds a balance scale: on one side a small coal lump, on the other an avalanche of black coal.',
        speaker: 'Jevons',
        visualPrompt: 'A balance scale tilting radically as train tracks expand across Britain into every factory and mill.',
        technicalNote: 'When power became cheap enough, steam engines replaced waterwheels, hand looms, and horses everywhere.',
        codeSnippet: `// 1865 Steam Efficiency Rebound:
Watt_Engine_Efficiency = 4x Newcomen;
Coal_Cost_Per_Work_Unit = Drops 75%;
Result = Britain coal usage rose from 10M to 100M+ tons!`
      },
      {
        id: 's2-3',
        chapterId: 'ch2',
        startTime: 42,
        endTime: 49,
        cue: 'Cheap power didn\'t vanish, it found new work: textile looms, steamships, deeper mines, and railways reaching everywhere.',
        read: 'The Victorian cityscape transforms into a bustling industrial network crisscrossed with iron rails.',
        speaker: 'Narrator',
        visualPrompt: 'A vast network of steam trains and clockwork machinery roaring with golden sparks.',
        technicalNote: 'Elasticity of demand: When price drops past friction thresholds, totally new markets emerge.',
        codeSnippet: `// Economic Thresholds:
// $1.00 / decision: Human expert only
// $0.05 / decision: Big LLM on key workflows
// $0.000042 / decision: Every single database trigger and UI click!`
      },
      {
        id: 's2-4',
        chapterId: 'ch2',
        startTime: 49,
        endTime: 56,
        cue: 'So TypeSafe named the model Jev. Make one decision cheap enough, and software will start making millions of them.',
        read: 'Clawd stamps the name "JEV" in bold electric blue on a sleek modern server rack glowing with gold.',
        speaker: 'Clawd',
        visualPrompt: 'Clawd pointing to the glowing logo "JEV: TypeSafe AI" with steam blending into fiber optic cables.',
        technicalNote: 'Released Sept 15, 2026 by TypeSafe AI (founded by Diogo Almeida, ex-OpenAI researcher).',
        codeSnippet: `// TypeSafe AI Jev:
Input Cost:  $0.042 / 1M tokens (100x cheaper than LLMs)
Output Cost: Free (0.00)
Response:    70ms - 350ms`
      }
    ]
  },
  {
    id: 'ch3',
    number: 3,
    title: 'System One: Kahneman\'s Reflex',
    subtitle: 'Thinking Fast and Slow in the Age of Artificial Intelligence',
    startTime: 56,
    endTime: 88,
    duration: 32,
    themeColor: '#06b6d4',
    accentColor: '#22d3ee',
    summary: 'Borrowing from Daniel Kahneman\'s cognitive psychology: LLMs are System 2 (slow, deliberative reasoning). Jev is System 1 (fast, reflexive, intuitive judgment).',
    shots: [
      {
        id: 's3-1',
        chapterId: 'ch3',
        startTime: 56,
        endTime: 64,
        cue: 'Daniel Kahneman split human thinking in two, and that split turns out to describe machines just as well.',
        read: 'A split-brain diagram illuminates: one half in deep purple contemplation, the other half in cyan lightning flashes.',
        speaker: 'Narrator',
        visualPrompt: 'Two halves of a mind on stage: System 1 (flash of instinct) vs System 2 (heavy gears turning).',
        technicalNote: 'Daniel Kahneman & Amos Tversky: System 1 operates automatically and quickly; System 2 allocates attention to effortful mental operations.',
        codeSnippet: `// Kahneman's Cognitive Architecture:
// System 1: Fast, automatic, frequent, emotional, stereotypic, unconscious
// System 2: Slow, effortful, infrequent, logical, calculating, conscious`
      },
      {
        id: 's3-2',
        chapterId: 'ch3',
        startTime: 64,
        endTime: 72,
        cue: 'System two is the slow one: deliberate, effortful, writing out its reasoning. That is exactly what a large language model does.',
        read: 'Clawd sits at a wooden desk with a quill, furrowed brow, writing out step-by-step chain of thought.',
        speaker: 'Narrator',
        visualPrompt: 'Clawd scratching his head, writing multiple steps of mathematical equations on a chalkboard.',
        technicalNote: 'Chain-of-thought (CoT) and autoregression are pure System 2: high inference compute, token sequencing.',
        codeSnippet: `// System 2 (LLM):
// "Let me think step-by-step:
// First, examining the tone of the customer...
// Second, checking policy clause 4.2...
// Therefore, the result is: true."
// Total time: 9.4 seconds.`
      },
      {
        id: 's3-3',
        chapterId: 'ch3',
        startTime: 72,
        endTime: 80,
        cue: 'System one is reflex. You duck before you\'ve decided to duck, you read a face before you can explain it.',
        read: 'Clawd dodges a tennis ball in 50 milliseconds with sunglasses dropping down with style.',
        speaker: 'Clawd',
        visualPrompt: 'Clawd ducking a tennis ball mid-air, smiling instantly, lightning flashing in the background.',
        technicalNote: 'System 1 does not deliberate; it computes a direct feature association and confidence distribution.',
        codeSnippet: `// System 1 (Jev):
// Direct sensory match -> immediate classification
// No internal monologue, no chain of thought
// Evaluates in 70ms: { "is_threat": true, "p": 0.998 }`
      },
      {
        id: 's3-4',
        chapterId: 'ch3',
        startTime: 80,
        endTime: 88,
        cue: 'Jev is pure system one. It never talks, never explains. It takes messy reality and returns a typed decision in seventy milliseconds.',
        read: 'A stream of chaotic documents, audio transcripts, and tickets passes into Jev and emerges as crisp typed enums.',
        speaker: 'Engineer',
        visualPrompt: 'Chaotic messy papers flowing through a sleek glowing prism and emerging as laser-straight colored vectors.',
        technicalNote: 'TypeSafe\'s motto: "Unstructured state in, typed probabilistic decisions out."',
        codeSnippet: `Unstructured State (JSON/Text/Logs) 
        ───► [ JEV ENGINE ] ───► 
Typed Probabilistic Vector: { choice: "refund", p: 0.96 }`
      }
    ]
  },
  {
    id: 'ch4',
    number: 4,
    title: 'Inside the Wire: API & Primitives',
    subtitle: 'Noul, Choice, and Score: The Three Building Blocks of Judgment',
    startTime: 88,
    endTime: 122,
    duration: 34,
    themeColor: '#8b5cf6',
    accentColor: '#a78bfa',
    summary: 'How do you talk to Jev? No prompts, no system preambles. You send state and define questions using three primitives: Noul (boolean), Choice (categorical), and Score (ordinal).',
    shots: [
      {
        id: 's4-1',
        chapterId: 'ch4',
        startTime: 88,
        endTime: 96,
        cue: 'Talking to it is almost boringly simple. One endpoint, no system prompt, no chat history to carry around.',
        read: 'A glowing developer terminal slides in, showing a clean HTTP request structure.',
        speaker: 'Narrator',
        visualPrompt: 'Engineer typing on a floating holographic terminal with indigo syntax glow.',
        technicalNote: 'One unified endpoint: https://api.typesafe.ai/v1/systemone. Accepts model, state, and questions map.',
        codeSnippet: `POST https://api.typesafe.ai/v1/systemone
Authorization: Bearer $TYPESAFE_API_KEY
Content-Type: application/json

{
  "model": "jev-latest",
  "state": "Help! Payouts failing for 3 days. Losing money ASAP!",
  "questions": { ... }
}`
      },
      {
        id: 's4-2',
        chapterId: 'ch4',
        startTime: 96,
        endTime: 104,
        cue: 'Every call has exactly two parts: the state, which is your raw evidence, and the questions you want judged.',
        read: 'The screen splits into two panels: left side raw messy evidence, right side three crystal-clear test tubes.',
        speaker: 'Clawd',
        visualPrompt: 'Clawd pouring messy text into a glass beaker on left; three glowing crystals light up on right.',
        technicalNote: 'The state can be a string, JSON object, or array. All questions evaluate against the state simultaneously in parallel.',
        codeSnippet: `// Request structure:
{
  "state": ticket_data,       // Text, JSON, logs, or transcript
  "questions": {
    "is_urgent": { ... },     // Primitive 1: Noul
    "department": { ... },    // Primitive 2: Choice
    "sentiment": { ... }      // Primitive 3: Score
  }
}`
      },
      {
        id: 's4-3',
        chapterId: 'ch4',
        startTime: 104,
        endTime: 113,
        cue: 'The first question type is noul. It answers true or false, and crucially, it tells you how confident it actually is.',
        read: 'A digital toggle switch snaps to TRUE, with a neon green meter showing 98.4% certainty.',
        speaker: 'Narrator',
        visualPrompt: 'A sleek mechanical boolean flip switch snapping with an emerald spark: TRUE (0.984).',
        technicalNote: 'Noul evaluates true/false hypotheses with well-calibrated confidence scores.',
        codeSnippet: `"has_outage": {
  "type": "noul",
  "instructions": "Does the ticket report an active service outage?"
}
// Response: { "value": true, "p": 0.984 }`
      },
      {
        id: 's4-4',
        chapterId: 'ch4',
        startTime: 113,
        endTime: 122,
        cue: 'Choice routes between options, up to two hundred and fifty-five of them. Score ranks on an ordered scale you define, two to ten rungs.',
        read: 'Three routing channels light up: billing, technical, sales. An anger meter from 1 to 5 ticks up to 4.',
        speaker: 'Clawd',
        visualPrompt: 'A 3-way track switch with trains routing to billing/technical/sales, plus a vertical score thermometer.',
        technicalNote: 'Choice criteria can map up to 255 keys to criteria descriptions; Score enforces ordinal monotonic ranking.',
        codeSnippet: `"department": {
  "type": "choice",
  "criteria": {
    "billing": "Invoices, failed charges, payouts",
    "technical": "500 errors, broken APIs, outages",
    "sales": "Upgrades, demos, contract terms"
  }
} // Returns probabilities for each candidate!`
      }
    ]
  },
  {
    id: 'ch5',
    number: 5,
    title: 'How It Works: Discriminator vs Generator',
    subtitle: 'The Architectural Secret: Single Forward Pass vs Autoregression',
    startTime: 122,
    endTime: 156,
    duration: 34,
    themeColor: '#10b981',
    accentColor: '#34d399',
    summary: 'Why is Jev so fast? LLMs generate token after token autoregressively. Jev is a discriminative model: it computes cross-attention over your runtime schema in a single forward pass.',
    shots: [
      {
        id: 's5-1',
        chapterId: 'ch5',
        startTime: 122,
        endTime: 130,
        cue: 'So is this just a small language model wearing a costume? No, and the difference is architectural.',
        read: 'Clawd holds up an X-Ray light board revealing the inner neural architecture.',
        speaker: 'Narrator',
        visualPrompt: 'Clawd putting on safety glasses, clicking an X-ray viewer showing transformer attention matrices.',
        technicalNote: 'Jev is a discriminative architecture (like ModernBERT or cross-encoders), not a causal language model (GPT).',
        codeSnippet: `// Fundamental Machine Learning Difference:
// Generative Model:     P(token_{t+1} | tokens_{1..t}) -> Loop until <EOS>
// Discriminative Model: P(Class_k | State, Criteria)   -> Single Matrix Pass!`
      },
      {
        id: 's5-2',
        chapterId: 'ch5',
        startTime: 130,
        endTime: 138,
        cue: 'A generator writes one token, feeds it back into itself, and writes the next, over and over, hundreds of times.',
        read: 'An animation of a typewriter typing letter by letter while a ticking clock sweeps around.',
        speaker: 'Engineer',
        visualPrompt: 'A mechanical typewriter chugging letter by letter: "I", " ", "t", "h", "i", "n", "k"...',
        technicalNote: 'Autoregressive generation has O(N) sequential step latency and requires KV caching and token sampling.',
        codeSnippet: `// Autoregressive Loop (O(N) passes):
for (let step = 0; step < 120; step++) {
  const nextToken = sample(softmax(W_unembed * hiddenState));
  hiddenState = forward(hiddenState, nextToken); // 20ms * 120 = 2400ms!
}`
      },
      {
        id: 's5-3',
        chapterId: 'ch5',
        startTime: 138,
        endTime: 147,
        cue: 'Jev scores every candidate you gave it at once, in a single forward pass. That\'s where seventy milliseconds comes from.',
        read: 'A laser sweep passes through all candidates at once; softmax probabilities light up simultaneously in one pulse.',
        speaker: 'Narrator',
        visualPrompt: 'A single high-speed laser pulse illuminating a 3D matrix of candidate vectors instantly in green light.',
        technicalNote: 'One forward pass computes cross-attention between state tokens and candidate criterion embeddings.',
        codeSnippet: `// Jev Single Forward Pass (O(1) forward pass):
const stateEmbeds = encoder(state);
const candidateScores = crossAttention(stateEmbeds, criteriaEmbeds);
const probabilities = softmax(candidateScores); // 70 milliseconds total!`
      },
      {
        id: 's5-4',
        chapterId: 'ch5',
        startTime: 147,
        endTime: 156,
        cue: 'Which means it cannot ramble, cannot forget a brace, cannot invent an option. The probabilities always sum to one.',
        read: 'A golden lock snaps shut around the schema, guaranteeing 100% type safety.',
        speaker: 'Clawd',
        visualPrompt: 'A golden mathematical shield with zero variance, blocking red glitch artifacts.',
        technicalNote: 'Output space is constrained by the request schema at the mathematical level, not via constrained decoding hacks.',
        codeSnippet: `// Mathematical Guarantees:
1. sum(p_i) == 1.000 (Proper probability distribution)
2. result.choice in allowedCandidates (Type-safe by definition)
3. 0 hallucinated tokens (No generative decoder exists!)`
      }
    ]
  },
  {
    id: 'ch6',
    number: 6,
    title: 'The Double-Edged Sword: The Error Cascade',
    subtitle: 'When Automated Decisions Are Free, Mistakes Happen at Factory Speed',
    startTime: 156,
    endTime: 188,
    duration: 32,
    themeColor: '#ec4899',
    accentColor: '#f472b6',
    summary: 'Here is the paradox: When intelligence decisions cost 0.00004 cents, engineers deploy them everywhere—in DB triggers, git commit hooks, edge workers. But what happens when error rates multiply?',
    shots: [
      {
        id: 's6-1',
        chapterId: 'ch6',
        startTime: 156,
        endTime: 164,
        cue: 'Now the uncomfortable part. Jevons works on software too. What happens when a judgement costs almost nothing?',
        read: 'Thousands of glowing blue data packets stream across a vast microservice topology.',
        speaker: 'Narrator',
        visualPrompt: 'A high-speed cybernetic factory with thousands of robotic arms stamping approvals in milliseconds.',
        technicalNote: 'Microservice triggers: Kafka consumers, Postgres row triggers, webhook routers, real-time firewalls.',
        codeSnippet: `// Calling Jev inside a Postgres trigger!
CREATE OR REPLACE FUNCTION triage_incoming_event() RETURNS TRIGGER AS $$
  -- 70ms latency allows inline execution on insert!
  SELECT jev_evaluate(NEW.payload, '{"is_fraud": "noul"}');
$$ LANGUAGE plpgsql;`
      },
      {
        id: 's6-2',
        chapterId: 'ch6',
        startTime: 164,
        endTime: 172,
        cue: 'You stop rationing it. It goes into database triggers, edge proxies, commit hooks, every webhook you own.',
        read: 'Clawd is happily installing Jev chips into every wire, pipe, and server in the datacenter.',
        speaker: 'Clawd',
        visualPrompt: 'Clawd cheerfully plugging glowing cyan Jev chips into water pipes, electrical panels, and routers.',
        technicalNote: 'Because latency is sub-100ms, AI leaves the asynchronous worker queue and enters the synchronous request path.',
        codeSnippet: `// Synchronous Request Path Integration:
app.post("/webhook", async (req, res) => {
  const judgment = await jev.evaluate(req.body); // 70ms!
  if (judgment.score < 2) return res.status(400).send();
  // No Redis queue, no background worker needed!
});`
      },
      {
        id: 's6-3',
        chapterId: 'ch6',
        startTime: 172,
        endTime: 180,
        cue: 'Your system stops making ten thousand decisions a day and starts making five hundred million of them.',
        read: 'A giant digital counter rolls over furiously: 1,000,000... 50,000,000... 500,000,000.',
        speaker: 'Engineer',
        visualPrompt: 'The Engineer watches an odometer spin out of control with steam venting out of the edges.',
        technicalNote: 'Sophos research warned: "If error rate is 2%, 500M decisions produces 10 million automated errors daily."',
        codeSnippet: `Total Decisions = 500,000,000 / day
Error Rate      = 2.1%
Total Failures  = 10,500,000 automated failures daily!
// Cheap decisions multiply the absolute volume of mistakes.`
      },
      {
        id: 's6-4',
        chapterId: 'ch6',
        startTime: 180,
        endTime: 188,
        cue: 'Two percent wrong at that volume is ten million mistakes daily. So read the confidence, and escalate when it drops.',
        read: 'Red alert lights flash across the factory. Dominoes begin falling in rapid succession.',
        speaker: 'Narrator',
        visualPrompt: 'Red sirens flashing, warning alarms, and a chain of cybernetic dominoes toppling down.',
        technicalNote: 'Calibration matters more than raw accuracy: Knowing *when* confidence is low prevents silent pipeline corruption.',
        codeSnippet: `// Critical Defensive Pattern:
if (decision.p < 0.85) {
  // Escalation circuit breaker:
  fallbackToHumanOrSystem2(state);
} else {
  executeFastPath(decision.choice);
}`
      }
    ]
  },
  {
    id: 'ch7',
    number: 7,
    title: 'The Grand Synthesis & Curtain Call',
    subtitle: 'The Hybrid Architecture of Tomorrow — Was It All For Show?',
    startTime: 188,
    endTime: 216,
    duration: 28,
    themeColor: '#3b82f6',
    accentColor: '#60a5fa',
    summary: 'The future of AI systems is not LLM vs Jev—it is the harmonious marriage of System 1 and System 2. And as the camera pulls back, we see the theatrical stage of intelligence.',
    shots: [
      {
        id: 's7-1',
        chapterId: 'ch7',
        startTime: 188,
        endTime: 195,
        cue: 'Which points at the real design: a dual mind, with the fast one standing at the gate.',
        read: 'A pristine architecture diagram appears showing Jev acting as the lightning-fast defensive shield.',
        speaker: 'Clawd',
        visualPrompt: 'Jev floating in front of an API gateway, instantly sorting 95% of traffic in 70ms.',
        technicalNote: 'Hybrid routing: 95% of requests resolved by Jev for $0.0001; 5% complex edge cases passed to Claude 3.5 Sonnet.',
        codeSnippet: `// The Production Dual Mind Architecture:
Incoming Request
    │
    ▼
[ Jev System 1 (70ms) ] ── (Confidence > 0.90) ──► Instant Typed Response ($0.042/1M)
    │
    └── (Low Confidence / High Complexity) ────► [ Claude System 2 (8.0s) ]`
      },
      {
        id: 's7-2',
        chapterId: 'ch7',
        startTime: 195,
        endTime: 202,
        cue: 'The big deliberate model waits behind it, woken only for the few cases that genuinely deserve an essay.',
        read: 'The big neural brain glows peacefully in the background, only humming when a truly hard question arrives.',
        speaker: 'Narrator',
        visualPrompt: 'Clawd and the Researcher standing side by side under a calm starlit sky as both engines harmonize.',
        technicalNote: 'System 1 handles triage, filtering, moderation, and schema binding; System 2 writes prose, executes reasoning, and codes.',
        codeSnippet: `// Realized Efficiency:
- 95% cost reduction across agent loops
- 10x lower average latency
- Strict type-safety boundaries around probabilistic AI`
      },
      {
        id: 's7-3',
        chapterId: 'ch7',
        startTime: 202,
        endTime: 209,
        cue: 'Intelligence stops being one slow thing and becomes a spectrum, from instant reflex to deep deliberation.',
        read: 'A full spectrum of intelligence spans the stage: from 70ms reflex to 10-minute deep research.',
        speaker: 'Clawd',
        visualPrompt: 'A rainbow spectrum of computational thought, glowing with watercolor gradients.',
        technicalNote: 'William Stanley Jevons would smile: By making thought cheap, we put intelligence into the fabric of everything.',
        codeSnippet: `// "Unstructured state in, typed probabilistic decisions out."
// Welcome to System One.`
      },
      {
        id: 's7-4',
        chapterId: 'ch7',
        startTime: 209,
        endTime: 216,
        cue: 'Was it all for show? The camera pulls back, the curtain falls, and Clawd takes a bow.',
        read: 'The signature PDoomVideo twist: The camera zooms back, revealing the red velvet stage, stage lights, and Clawd taking a bow.',
        speaker: 'Narrator',
        visualPrompt: 'The whole video shrinks onto a painted wooden theater stage. Velvet red curtains drop. Clawd and Engineer bow.',
        technicalNote: 'An homage to JohnHeibel/PDoomVideo: Every frame a pure function of t, from opening curtain to closing applause.',
        codeSnippet: `return {
  status: "curtain_call",
  credits: "Built with code, inspired by PDoomVideo & TypeSafe Jev",
  the_end: true
};`
      }
    ]
  }
];

export const TOTAL_DURATION = 216; // 3m 36s (nominal timeline)

/** Flat, ordered list of every shot in the film — the scheduler's unit of work. */
export const SHOTS: Shot[] = CHAPTERS.flatMap(c => c.shots);

export function shotIndexAt(time: number): number {
  const clamped = Math.max(0, Math.min(time, TOTAL_DURATION - 0.001));
  const idx = SHOTS.findIndex(s => clamped >= s.startTime && clamped < s.endTime);
  return idx < 0 ? SHOTS.length - 1 : idx;
}

export function chapterOfShot(shot: Shot): Chapter {
  return CHAPTERS.find(c => c.id === shot.chapterId) || CHAPTERS[0];
}

export const shotDuration = (s: Shot) => Math.max(0.5, s.endTime - s.startTime);

export function getCurrentChapter(time: number): Chapter {
  const clampedTime = Math.max(0, Math.min(time, TOTAL_DURATION));
  const chapter = CHAPTERS.find(c => clampedTime >= c.startTime && clampedTime < c.endTime);
  return chapter || CHAPTERS[CHAPTERS.length - 1];
}

export function getCurrentShot(time: number): Shot {
  const clampedTime = Math.max(0, Math.min(time, TOTAL_DURATION));
  const chapter = getCurrentChapter(clampedTime);
  const shot = chapter.shots.find(s => clampedTime >= s.startTime && clampedTime < s.endTime);
  return shot || chapter.shots[chapter.shots.length - 1];
}
