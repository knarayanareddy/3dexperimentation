import { Chapter } from '../types/video';

/**
 * "TO BENEFIT ALL OF HUMANITY" — The Story of OpenAI, 2015 to Now & Beyond.
 *
 * 7 Acts, 28 Shots, 216s nominal timeline.
 * Visual and narrative grammar aligned with the PDoomVideo engine.
 * Cast: The OpenAI Bloom glyph, researchers, whiteboards, robotic hands,
 * game arenas, datacenters, the chat interface, and reasoning trees.
 */

export const OPENAI_CHAPTERS: Chapter[] = [
  {
    id: 'oa1',
    number: 1,
    title: 'The Rosewood Covenant',
    subtitle: '2015–2017: A Menlo Park dinner, an open non-profit charter, and the mission to save humanity',
    startTime: 0,
    endTime: 32,
    duration: 32,
    themeColor: '#10A37F',
    accentColor: '#34D399',
    summary: 'At a quiet dinner in Silicon Valley, a small group of researchers and founders pledge $1 billion to create an open research lab—a counterweight to Big Tech monopolies, dedicated to safe AGI.',
    shots: [
      {
        id: 'oa1-1', chapterId: 'oa1', startTime: 0, endTime: 8,
        speaker: 'Narrator',
        cue: 'Menlo Park, late 2015. At the Rosewood hotel, a dinner takes place with an audacious premise: build safe superintelligence before anyone else, and give it away.',
        read: 'A candlelit dinner table in Menlo Park. Silhouettes lean over a paper charter. Outside, the headlights of Silicon Valley stream into the night.',
        visualPrompt: 'Quiet hotel dining room, paper contract with "OpenAI Non-Profit Charter", illuminated silhouettes, warm candle glow.',
        technicalNote: 'Founded December 11, 2015 by Sam Altman, Elon Musk, Greg Brockman, Ilya Sutskever, Wojciech Zaremba, and John Schulman with a $1B pledge.',
        codeSnippet: `// The Original Charter (2015)
interface NonProfitLab {
  mission: "Ensure AGI benefits all of humanity";
  ownership: "Public trust (No shareholders)";
  ipPolicy: "Openly publish all research and code";
  commercialPressure: 0.0;
}`
      },
      {
        id: 'oa1-2', chapterId: 'oa1', startTime: 8, endTime: 16,
        speaker: 'Researcher',
        cue: 'We set up shop in an old luggage factory in the Mission. No product, no business plan—just folding tables, whiteboards, and the conviction that intelligence could be computed.',
        read: 'A sunlit San Francisco brick warehouse. Whiteboards covered in loss gradients. A newborn green Bloom glyph wakes up and looks around curiously.',
        visualPrompt: 'San Francisco loft, exposed brick, sprawling equations, laptops on trestle tables, nascent OpenAI spiral emblem glowing on screen.',
        technicalNote: 'Pioneer Building in SF Mission District. Early focus was broad reinforcement learning environments (Gym, Universe) to benchmark agent behaviors.',
        codeSnippet: `const lab = new ResearchLab({
  location: "Pioneer Building, SF",
  furniture: "IKEA desks + folding chairs",
  initialFocus: ["OpenAI Gym", "Universe"],
  target: "Universal Learning Agents"
});`
      },
      {
        id: 'oa1-3', chapterId: 'oa1', startTime: 16, endTime: 24,
        speaker: 'Ilya',
        cue: 'We released Gym and Universe. We told the world: standardise your environments. If the machine can play any game, it can learn any world.',
        read: 'Retro Atari games and simulated desktop environments flicker across floating monitor tiles. The Bloom character balances atop a stack of virtual arcade cabinets.',
        visualPrompt: 'Array of game screens—Pong, Breakout, racing sims—connecting with colorful wires into a central neural core.',
        technicalNote: 'OpenAI Gym (April 2016) became the global standard for RL benchmarks. Universe (Dec 2016) gave AI access to web browsers and games.',
        codeSnippet: `import gymnasium as gym
env = gym.make("WorldSim-v0")
observation, info = env.reset()
action = policy.predict(observation)
// the dream: one policy to solve all environments`
      },
      {
        id: 'oa1-4', chapterId: 'oa1', startTime: 24, endTime: 32,
        speaker: 'Narrator',
        cue: 'The original pledge was an open gift to the world. But deep learning was about to collide with a brutal physical truth: compute is not free, and algorithms are hungry.',
        read: 'A glowing open padlock dissolves as electricity meters spin furiously. Thermal heat maps bleed across server chassis blueprints.',
        visualPrompt: 'Open-source symbol surrounded by climbing electricity watt-meters and GPU heating manifolds.',
        technicalNote: 'Initial donors had delivered only ~$130M of the pledged $1B. Deep learning was rapidly transitioning from clever math to brute compute scale.',
        codeSnippet: `const computeCostPerRun = (params: number, tokens: number) => {
  const flops = 6 * params * tokens;
  return (flops / 1e18) * COST_PER_EXAFLOP;
  // Exponential scaling makes philanthropic funding impossible
};`
      }
    ]
  },
  {
    id: 'oa2',
    number: 2,
    title: 'Games and Metal',
    subtitle: '2017–2019: Dota 2 arenas, robotic Rubik\'s cubes, and the first whisper of unsupervised text',
    startTime: 32,
    endTime: 62,
    duration: 30,
    themeColor: '#3B82F6',
    accentColor: '#93C5FD',
    summary: 'OpenAI pits five bots against world champion esports players and trains a mechanical hand to solve a Rubik\'s cube. Meanwhile, an overlooked language paper reveals the secret power of raw prediction.',
    shots: [
      {
        id: 'oa2-1', chapterId: 'oa2', startTime: 32, endTime: 39,
        speaker: 'Narrator',
        cue: 'August 2018. Five neural networks play eighty thousand years of Dota in twenty-four hours, crushing human champions with alien teamwork.',
        read: 'Esports arena stage with health bars and spell effects. Five small glowing Bloom avatars coordinate tactical ganks against frantic silhouettes.',
        visualPrompt: 'Dark esports stadium, neon health bars, mini-map pings, five glowing bots executing frame-perfect coordinated spells.',
        technicalNote: 'OpenAI Five used Rapid (scaled PPO) on 128,000 CPU cores and 256 GPUs, playing 180 years of game experience every day.',
        codeSnippet: `agent = DistributedPPO({
  experiencePerDay: "180 human years",
  teamCoordination: "Continuous cross-agent reward",
  reactionTime: "20ms (frame-perfect precision)"
}); // The International 2018-2019`
      },
      {
        id: 'oa2-2', chapterId: 'oa2', startTime: 39, endTime: 46,
        speaker: 'Researcher',
        cue: 'In the robotics lab, a five-fingered mechanical hand learns to solve a Rubik\'s cube one-handed—not by programming fingers, but through extreme simulation chaos.',
        read: 'A metallic shadow robot hand rotates a colorful Rubik\'s cube. Ghostly holographic perturbations tug at the joints as domain randomization tests every angle.',
        visualPrompt: 'Robotic hand with articulating steel fingers rotating a scrambled cube under fluctuating simulated gravity and friction overlays.',
        technicalNote: 'Domain Randomization (ADR): training solely in simulation under randomized physics allowed zero-shot sim-to-real physical transfer.',
        codeSnippet: `AutomaticDomainRandomization({
  friction: range(0.1, 4.0),
  gravity: vec3(0, -9.81 * rand(0.8, 1.2), 0),
  surfaceTexture: perturb(noise)
}) -> Sim2Real(ShadowHand);`
      },
      {
        id: 'oa2-3', chapterId: 'oa2', startTime: 46, endTime: 54,
        speaker: 'Ilya',
        cue: 'While the world watched robots and games, a quieter realization took hold. If you predict the next token on enough text, the model must understand the reality behind the words.',
        read: 'Streaming sentences of raw internet text feed into a deep neural stack. Internal attention heads illuminate, forming semantic galaxy clusters.',
        visualPrompt: 'Cascade of raw text tokens folding through multi-headed attention layers, transforming into structured conceptual nodes.',
        technicalNote: 'Alec Radford led GPT-1 (2018), demonstrating that generative pre-training on unlabeled text followed by discriminative fine-tuning beat supervised baselines.',
        codeSnippet: `// Radford et al. (June 2018)
// L1: Unsupervised pre-training
L1(U) = sum(log P(u_i | u_i-k, ..., u_i-1; Theta))
// Compression is equivalent to general intelligence`
      },
      {
        id: 'oa2-4', chapterId: 'oa2', startTime: 54, endTime: 62,
        speaker: 'Narrator',
        cue: 'February 2019. GPT-2 writes fictional stories about unicorns in the Andes. For the first time, OpenAI refuses to release the weights, citing the danger of synthetic deception.',
        read: 'A paper titled "Too Dangerous to Release" stamps itself over a redacted 1.5-billion-parameter network. Public debate erupts across newspapers and forums.',
        visualPrompt: 'Glowing unicorn silhouette sketched in green neon lines behind a locked glass vault with a "1.5 Billion Parameters" plaque.',
        technicalNote: 'GPT-2 (Feb 2019) demonstrated convincing prose and zero-shot task transfer. Staged release sparked controversy over safety vs open science.',
        codeSnippet: `const gpt2 = new Model({
  params: "1.5B",
  status: "STAGED_RELEASE",
  warning: "Large-scale synthetic text generation risks",
  capabilities: ["zero-shot translation", "summarization", "unicorn prose"]
});`
      }
    ]
  },
  {
    id: 'oa3',
    number: 3,
    title: 'The Capped-Profit Crossroads',
    subtitle: '2019–2020: The split with Musk, the $1 billion Microsoft alliance, and the hybrid LP company',
    startTime: 62,
    endTime: 92,
    duration: 30,
    themeColor: '#F59E0B',
    accentColor: '#FCD34D',
    summary: 'Philanthropy cannot purchase supercomputers. To survive the scaling race, OpenAI invents an unprecedented legal structure—a capped-profit commercial entity governed by a non-profit board.',
    shots: [
      {
        id: 'oa3-1', chapterId: 'oa3', startTime: 62, endTime: 69,
        speaker: 'Narrator',
        cue: 'By 2019, the math was indisputable. Training frontier models would cost hundreds of millions of dollars. A 501(c)(3) could not fund the computing frontier.',
        read: 'An exponential curve of training compute requirements breaks through the ceiling of a modest stone non-profit building.',
        visualPrompt: 'Logarithmic chart of compute vs time rocketing upwards, cracking through a classical marble building pediment.',
        technicalNote: 'Training compute had begun doubling every 3.4 months (300,000x from 2012 to 2018), far outstripping Moore\'s Law and philanthropic grants.',
        codeSnippet: `const computeGrowth = Math.pow(2, months / 3.4);
// Between AlexNet and GPT-3: >300,000x compute increase
// Philanthropic donations: linear
// Deficit: existential`
      },
      {
        id: 'oa3-2', chapterId: 'oa3', startTime: 69, endTime: 77,
        speaker: 'Sam',
        cue: 'Elon walked away. He believed we had fallen fatally behind Google. We had to choose: remain a pure charity and become irrelevant, or invent a new kind of company.',
        read: 'Two silhouetted figures part ways at a crossroad. One walks toward a rocket launchpad, the other toward a shimmering glass tower with a turbine.',
        visualPrompt: 'Split path: one direction leading to automotive/rocket factories, the other toward an architectural glass cube housing high-performance servers.',
        technicalNote: 'Musk resigned from the board in Feb 2018 over disagreements on leadership and control, later cancelling his remaining donation commitments.',
        codeSnippet: `class StructuralPivot {
  founderDeparture = "Elon Musk (Feb 2018)";
  reason = "Disagreement over path to AGI & ownership";
  remainingRunway = "Critical";
  decision = "Create a commercial vehicle without sacrificing the charter";
}`
      },
      {
        id: 'oa3-3', chapterId: 'oa3', startTime: 77, endTime: 85,
        speaker: 'Narrator',
        cue: 'They created OpenAI LP: a capped-profit vehicle. Investors could earn up to one hundred times their capital; every penny beyond that would belong to humanity.',
        read: 'A golden scale balances two weights: a limited 100x return stack on one side, and the open Earth globe on the other, tied by legal seals.',
        visualPrompt: 'Legal diagram where commercial profits are piped into a cistern with a fixed spillway overflow marked "All excess to Public Trust".',
        technicalNote: 'OpenAI LP created in March 2019 with a 100x return cap on first-round investors, governed entirely by the non-profit OpenAI Inc. board.',
        codeSnippet: `function distributeReturns(profit: number, invested: number) {
  const cap = invested * 100;
  const investorPayout = Math.min(profit, cap);
  const humanitySurplus = Math.max(0, profit - cap);
  return { investorPayout, humanitySurplus };
}`
      },
      {
        id: 'oa3-4', chapterId: 'oa3', startTime: 85, endTime: 92,
        speaker: 'Sam',
        cue: 'July 2019. Satya Nadella bets one billion dollars on our vision. Microsoft gets the exclusive cloud partnership, and we get the supercomputing supergrid.',
        read: 'A glowing handshake between the emerald Bloom and an Azure blue cloud. Beneath them, rows of server blades ignite with pulse lights.',
        visualPrompt: 'Handshake between glowing green OpenAI ribbon and azure Microsoft logo, with thousands of server racks powering up in unison.',
        technicalNote: 'Microsoft invested $1B in July 2019, agreeing to build custom Azure supercomputing infrastructure with thousands of interconnected Nvidia V100s.',
        codeSnippet: `const alliance = {
  investor: "Microsoft",
  amount: "$1,000,000,000",
  infrastructure: "Custom Azure AI Supercomputer (10,000+ GPUs)",
  exclusiveCloud: true,
  charterSafetyPrecedence: true
};`
      }
    ]
  },
  {
    id: 'oa4',
    number: 4,
    title: 'The Scaling Hypothesis',
    subtitle: '2020–2022: GPT-3, the prompt paradigm, the alignment secret, and the departure of Anthropic',
    startTime: 92,
    endTime: 124,
    duration: 32,
    themeColor: '#8B5CF6',
    accentColor: '#C4B5FD',
    summary: 'GPT-3 stuns the world with one hundred and seventy-five billion parameters. The prompt replaces code. But safety tensions mount, leading key researchers to walk out.',
    shots: [
      {
        id: 'oa4-1', chapterId: 'oa4', startTime: 92, endTime: 100,
        speaker: 'Ilya',
        cue: 'May 2020. One hundred and seventy-five billion parameters. GPT-3 proved that scaling laws were real. More compute didn\'t just give higher accuracy—it gave emergence.',
        read: 'A colossal monolith of neural weights dwarfs a small human silhouette. Words entered at the base emerge from the summit as poems, code, and reasoning.',
        visualPrompt: 'Towering crystalline neural network with 175B glowing parameter junctions, casting a deep violet shadow across the landscape.',
        technicalNote: 'Brown et al. (May 2020) revealed few-shot in-context learning. Scaling law predictions from Kaplan et al. held across four orders of magnitude.',
        codeSnippet: `// Kaplan et al. Scaling Law:
// Test loss L scales as a power-law with compute C, dataset size D, and model size N:
// L(N) = (N_c / N)^alpha_N
// Smooth loss reduction produces discontinuous emergent capabilities`
      },
      {
        id: 'oa4-2', chapterId: 'oa4', startTime: 100, endTime: 108,
        speaker: 'Researcher',
        cue: 'For seventy years, computers spoke in rigid syntax: semicolons, loops, compilers. Now, programming was just talking to the machine in English.',
        read: 'An old command line terminal with blinking green cursor dissolves into natural prose. A user types "Write a poem about relativity" and prose flowers out.',
        visualPrompt: 'C++ syntax fading into human cursive script; prompts transform directly into running software and diagrams without intermediate code.',
        technicalNote: 'The OpenAI API launched in June 2020, inaugurating prompt engineering as the new interface to software computation.',
        codeSnippet: `// Old Paradigm:
function solve(input: Data): Output { return algorithm(input); }

// New Paradigm:
const output = await openai.chat.completions.create({
  model: "text-davinci-003",
  prompt: "Explain quantum electrodynamics to a ten-year-old:"
});`
      },
      {
        id: 'oa4-3', chapterId: 'oa4', startTime: 108, endTime: 116,
        speaker: 'Narrator',
        cue: 'Late 2020. Inside the lab, a schism deepened over commercialization and existential risk. Dario Amodei and eleven core researchers resigned to form Anthropic.',
        read: 'A fault line cracks across the building floor. Eleven figures carry notebooks through the doorway, stepping out under a constellation named Claude.',
        visualPrompt: 'Split in the laboratory: one team remains beside the compute cluster, another team departs under an amber sky to build Constitutional AI.',
        technicalNote: 'VP of Research Dario Amodei, Daniela Amodei, and key safety researchers left in late 2020/early 2021 over commercial pace and governance concerns.',
        codeSnippet: `const schism = {
  departure: ["Dario Amodei", "Daniela Amodei", "Jack Clark", "Jared Kaplan"],
  newLab: "Anthropic PBC (Claude)",
  coreDispute: "Safety guarantees before commercial acceleration",
  culture: "Constitutional AI & Mechanistic Interpretability"
};`
      },
      {
        id: 'oa4-4', chapterId: 'oa4', startTime: 116, endTime: 124,
        speaker: 'Ilya',
        cue: 'Raw pre-training was an untamed wild animal. Reinforcement learning from human feedback gave it manners, honesty, and a conversational soul: InstructGPT.',
        read: 'A wild, roaring fire of raw token probabilities is channeled through two gentle human hands into a steady, warm lantern light.',
        visualPrompt: 'Chaotic multicolored probability cloud being guided through human rating sliders into a clean, courteous chat response.',
        technicalNote: 'Ouyang et al. (InstructGPT, early 2022) used RLHF with PPO to align models to human intent, making a 1.3B aligned model preferred over 175B raw GPT-3.',
        codeSnippet: `// RLHF Pipeline:
const pretraining = trainOnWebCorpus(Tokens);
const rewardModel = learnHumanPreferences(Prompts, Responses);
const alignedModel = PPO_Optimize(pretraining, rewardModel);
// Politeness and helpfulness unlocked mainstream utility`
      }
    ]
  },
  {
    id: 'oa5',
    number: 5,
    title: 'The November Spark',
    subtitle: '2022–2023: ChatGPT explodes, one hundred million users, GPT-4, and the global frenzy',
    startTime: 124,
    endTime: 156,
    duration: 32,
    themeColor: '#EC4899',
    accentColor: '#F472B6',
    summary: 'A low-key research preview on November 30, 2022 detonates across culture. ChatGPT reaches 100M users faster than any product in history, followed by the multimodal marvel of GPT-4.',
    shots: [
      {
        id: 'oa5-1', chapterId: 'oa5', startTime: 124, endTime: 132,
        speaker: 'Narrator',
        cue: 'November 30, 2022. A tweet announces a research preview: ChatGPT. No press tour, no keynote. Just a quiet link on a Wednesday afternoon.',
        read: 'A minimalist white text box with a simple input bar. A finger taps send. A solitary ripple spreads outwards across the entire globe.',
        visualPrompt: 'Minimalist web UI with a single prompt bar and the placeholder "Send a message...". A gentle wave ripples across world continents.',
        technicalNote: 'Launched as a free preview on GPT-3.5 with modest internal expectations. Greg Brockman tweeted: "Try talking with ChatGPT here: chat.openai.com".',
        codeSnippet: `// The Tweet That Changed Everything
const launch = {
  date: "2022-11-30T13:00:00Z",
  product: "ChatGPT (Research Preview)",
  model: "gpt-3.5-turbo",
  marketingBudget: "$0",
  internalExpectation: "Modest feedback on conversation quirks"
};`
      },
      {
        id: 'oa5-2', chapterId: 'oa5', startTime: 132, endTime: 140,
        speaker: 'Sam',
        cue: 'Five days to one million users. Two months to one hundred million. It was the fastest consumer adoption in human history. The servers were melting.',
        read: 'A counter speedometer spins frantically past 1M, 10M, 100M. Around the world, schools, offices, coders, and artists illuminate their screens in the dark.',
        visualPrompt: 'Digital odometer spinning at blinding speed; server racks glowing cherry-red as fans scream; night maps of continents lighting up.',
        technicalNote: 'Reached 100M monthly active users by January 2023, surpassing TikTok and Instagram. Cloud infrastructure strained to keep capacity online.',
        codeSnippet: `const growthVelocity = {
  netflix: "3.5 years to 1M users",
  instagram: "2.5 months to 1M users",
  chatgpt: "5 days to 1M users (60 days to 100M MAU)",
  loadStatus: "Capacity exhausted -> Red alert engineering"
};`
      },
      {
        id: 'oa5-3', chapterId: 'oa5', startTime: 140, endTime: 148,
        speaker: 'Ilya',
        cue: 'March 2023. GPT-4 arrives. It doesn\'t just write—it sees. It passes the bar exam in the ninetieth percentile, writes code from sketches, and perceives the world.',
        read: 'A hand-drawn wireframe on a stained napkin is held up to a camera. Seconds later, a full interactive web application renders live on screen.',
        visualPrompt: 'Napkin sketch of a website being scanned by a camera; instantly morphs into clean HTML/JS with animated buttons and functional physics.',
        technicalNote: 'GPT-4 (March 2023) scored 90th percentile on the Uniform Bar Exam, 99th on the Biology Olympiad, and demonstrated vision capabilities.',
        codeSnippet: `const gpt4 = {
  architecture: "Mixture of Experts (~16x110B)",
  multimodal: ["Text", "High-res Vision"],
  evaluations: {
    uniformBarExam: "90th percentile (GPT-3.5 was 10th)",
    usaboSemifinal: "99th percentile",
    leetCodeHard: "Solved without prompt tricks"
  }
};`
      },
      {
        id: 'oa5-4', chapterId: 'oa5', startTime: 148, endTime: 156,
        speaker: 'Narrator',
        cue: 'World leaders summon Sam Altman to Capitol Hill, Downing Street, and the Elysée Palace. The debate shifts from technology to destiny: is AGI six years away, or sixty?',
        read: 'Sam Altman sitting at a mahogany congressional hearing table. Microphones, flashing flashbulbs, and world leaders leaning forward to listen.',
        visualPrompt: 'Congressional hearing room under harsh marble lighting; senators listening intently; TV chyrons asking "Can AI Be Controlled?".',
        technicalNote: 'Altman testified before the US Senate in May 2023, urging lawmakers to license frontier AI models and establish independent safety oversight.',
        codeSnippet: `// Senate Testimony (May 16, 2023)
const testimony = {
  witness: "Sam Altman",
  coreQuote: "If this technology goes wrong, it can go quite wrong.",
  proposal: "Mandatory government licensing for frontier training runs"
};`
      }
    ]
  },
  {
    id: 'oa6',
    number: 6,
    title: 'Five Days in November',
    subtitle: 'November 2023: The board firing, 700 resignations, 90 hours of crisis, and the return',
    startTime: 156,
    endTime: 188,
    duration: 32,
    themeColor: '#EF4444',
    accentColor: '#FCA5A5',
    summary: 'A Friday afternoon Google Meet detonates the tech world. The non-profit board summarily fires Sam Altman. Within ninety hours, seven hundred employees rebel, forcing a complete reversal.',
    shots: [
      {
        id: 'oa6-1', chapterId: 'oa6', startTime: 156, endTime: 164,
        speaker: 'Narrator',
        cue: 'Friday, November 17, 2023. At noon, the board schedules a Google Meet. Minutes later, a press release drops: Sam Altman is fired, effective immediately.',
        read: 'A sleek glass conference room. A computer screen with a video call cuts to black. A corporate blog post with the headline "OpenAI announces leadership transition" shocks the world.',
        visualPrompt: 'Empty ergonomic chair facing a severed video call window; red alert notifications flooding smartphones; breaking news alerts flashing.',
        technicalNote: 'The 4-member board (Ilya Sutskever, Adam D\'Angelo, Tasha McCauley, Helen Toner) removed Altman, stating he was "not consistently candid".',
        codeSnippet: `const boardAction = {
  time: "2023-11-17T12:00:00 PST",
  action: "Remove CEO Sam Altman & strip Greg Brockman of chairmanship",
  justification: "Failure of candor with the board",
  advanceNoticeToMicrosoft: "1 minute"
};`
      },
      {
        id: 'oa6-2', chapterId: 'oa6', startTime: 164, endTime: 172,
        speaker: 'Researcher',
        cue: 'Saturday and Sunday were a fever dream. Brockman quit in protest. Microsoft announced they would hire Sam and Greg to lead a new advanced AI unit. The company seemed dead.',
        read: 'Two silhouetted co-founders walking out of headquarters carrying backpacks. In Redmond, Satya Nadella opens the Microsoft campus gates with an outstretched hand.',
        visualPrompt: 'Pioneer Building in darkness with laptops open on desks; parallel scene in Seattle with glowing blue Microsoft welcome banner.',
        technicalNote: 'Satya Nadella moved swiftly on Sunday night, offering to hire Altman, Brockman, and any OpenAI employees who wished to join with full compute parity.',
        codeSnippet: `// Nadella\'s Checkmate (Nov 19, 2023):
const microsoftOffer = {
  hiring: ["Sam Altman", "Greg Brockman", "All OpenAI Staff"],
  capital: "Full access to thousands of H100s",
  mission: "Build OpenAI 2.0 inside Microsoft Advanced AI Lab"
};`
      },
      {
        id: 'oa6-3', chapterId: 'oa6', startTime: 172, endTime: 180,
        speaker: 'Researcher',
        cue: 'By 2 a.m. Monday, the impossible happened. Over seven hundred out of seven hundred and seventy employees signed a single letter: reinstate Sam, or we all walk out tonight.',
        read: 'A white petition sheet scrolls endlessly with hundreds of signatures. Ilya Sutskever adds his own name at the top with a tweet of deep remorse.',
        visualPrompt: 'Glowing document titled "OpenAI is nothing without its people", signed by 743 employees, including Chief Scientist Ilya Sutskever.',
        technicalNote: '743 of 770 employees signed the letter threatening to quit. Ilya Sutskever tweeted: "I deeply regret my participation in the board\'s actions."',
        codeSnippet: `// The Rebellion Letter (Nov 20, 2023)
const letter = {
  signatories: "743 / 770 employees (96.5%)",
  demand: "Resignation of the board + reinstatement of Sam & Greg",
  ultimatum: "Immediate resignation to join Microsoft subsidiary"
};`
      },
      {
        id: 'oa6-4', chapterId: 'oa6', startTime: 180, endTime: 188,
        speaker: 'Sam',
        cue: 'Tuesday night, the board conceded. We returned to the office at 3 a.m. The governance fractured, a new board was formed, and the company was reborn.',
        read: 'Sam Altman and Greg Brockman walking through the doors of the Pioneer Building as hundreds of cheering colleagues embrace them in the early morning light.',
        visualPrompt: 'Early dawn light breaking through the glass windows of OpenAI headquarters; applause and hugs; a new board slate written on the main whiteboard.',
        technicalNote: 'Altman returned as CEO on Nov 21 with a reconstituted board chaired by Bret Taylor, Larry Summers, and Adam D\'Angelo.',
        codeSnippet: `const resolution = {
  ceo: "Sam Altman (Reinstated)",
  president: "Greg Brockman (Reinstated)",
  newBoard: ["Bret Taylor (Chair)", "Larry Summers", "Adam D'Angelo"],
  result: "Founder control consolidated; non-profit primacy challenged"
};`
      }
    ]
  },
  {
    id: 'oa7',
    number: 7,
    title: 'The Thinking Machine & Beyond',
    subtitle: '2024–2026+: Strawberry, test-time compute, Stargate, and the twilight of pre-training',
    startTime: 188,
    endTime: 216,
    duration: 28,
    themeColor: '#059669',
    accentColor: '#6EE7B7',
    summary: 'The era of raw pre-training hits the data wall. OpenAI pivots to test-time reasoning with o1, plans hundred-billion-dollar superclusters, and prepares for the final transition to AGI.',
    shots: [
      {
        id: 'oa7-1', chapterId: 'oa7', startTime: 188, endTime: 195,
        speaker: 'Ilya',
        cue: 'September 2024. Project Strawberry: the o1 reasoning model. We discovered a second scaling law: compute during inference. The model now stops, thinks, plans, and corrects its own thoughts.',
        read: 'A deep crimson strawberry symbol morphs into a branching decision graph. A thought trace tree dynamically explores, evaluates, backtracks, and converges on truth.',
        visualPrompt: 'Tree of thoughts visualization: branching neural pathways in glowing rose and emerald, pruning errors and highlighting the golden path of proof.',
        technicalNote: 'OpenAI o1 (Sep 2024) introduced test-time compute scaling via reinforcement learning, spending inference time generating hidden chain-of-thought tokens.',
        codeSnippet: `// The Second Scaling Law: Inference-Time Compute
// In o1, performance on math, coding, and science scales logarithmically
// with the number of internal reasoning tokens spent before answering:
Accuracy(Task) ~ log(InferenceComputeTokens);`
      },
      {
        id: 'oa7-2', chapterId: 'oa7', startTime: 195, endTime: 202,
        speaker: 'Narrator',
        cue: 'From Sora\'s painted video worlds to Voice Mode\'s breath and nuance, the synthetic boundary evaporated. But the data wall loomed: the internet had run out of human tokens.',
        read: 'Hyper-realistic video windows float in mid-air—golden retrievers, neon Tokyo streets, historical figures speaking—while behind them, web archives show 100% indexed.',
        visualPrompt: 'Lush photorealistic cinematic video clips playing inside floating glass panes; background charts show the world\'s text completely consumed.',
        technicalNote: 'Sora (Feb 2024) demonstrated physics simulation in diffusion transformers; GPT-4o introduced native end-to-end multimodal audio and vision.',
        codeSnippet: `const tokenSupply = {
  worldHighQualityText: "~15 Trillion tokens",
  status: "Fully consumed by frontier training runs",
  nextFrontier: ["Synthetic Self-Play", "Test-time compute", "Agentic world experience"]
};`
      },
      {
        id: 'oa7-3', chapterId: 'oa7', startTime: 202, endTime: 209,
        speaker: 'Sam',
        cue: 'Now we build Project Stargate: five gigawatts of power, millions of chips, a hundred billion dollars. We are turning the power grid of nations into thought.',
        read: 'A vast nuclear and geothermal compute park under a starry desert sky. Power cables converge into a central glowing monolithic reactor of pure intelligence.',
        visualPrompt: 'Desert supercluster spanning miles with cooling towers, electrical substations, and fiber cables converging into a shining computing cathedral.',
        technicalNote: 'Project Stargate, a planned $100B+ AI supercomputing cluster partnership with Microsoft and energy providers, requiring multi-gigawatt power scale.',
        codeSnippet: `const stargate = {
  powerRequirement: "5 Gigawatts (equivalent to a major city)",
  gpuCount: "Hundreds of thousands of next-gen accelerators",
  budget: "$100,000,000,000+",
  objective: "The engine for Superintelligence"
};`
      },
      {
        id: 'oa7-4', chapterId: 'oa7', startTime: 209, endTime: 216,
        speaker: 'Narrator',
        cue: 'Ten years from a hotel dinner in Menlo Park, the question is no longer whether machines will think. The question is who we will become when they do.',
        read: 'The emerald Bloom emblem rises gently into the night sky, blooming outward into a warm constellation that encircles the entire living planet.',
        visualPrompt: 'The OpenAI Bloom glyph expanding into a golden-green lattice around Earth, illuminating oceans and cities with tranquil starlight.',
        technicalNote: 'From non-profit charity to public benefit corporation, OpenAI stands at the center of the transition to artificial general intelligence.',
        codeSnippet: `// 2015 -> 2026 and Beyond:
const humanity = {
  curiosity: "Infinite",
  machines: "Awakened",
  future: "Unwritten"
};`
      }
    ]
  }
];

export const OPENAI_DURATION = 216;
