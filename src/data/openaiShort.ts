import { Chapter, Shot } from '../types/video';

export const OPENAI_SHORT_SHOTS: Shot[] = [
  // ACT 1: THE COVENANT & THE METAL (0 - 18s)
  {
    id: 'oas-1',
    chapterId: 'oas-c1',
    startTime: 0.0,
    endTime: 4.0,
    cue: 'From a quiet room in Menlo Park, to a hundred-billion-dollar spark!',
    read: 'December 2015. A rainy night in Silicon Valley. A non-profit pledge to never play the commercial game.',
    speaker: 'Sam',
    visualPrompt: 'Bloom knot ignites in emerald light. Rain on Menlo Park window. Rapid punch-zoom.',
    technicalNote: 'Pattern-interrupt hook at t=0. Text-on-screen: HOW OPENAI BROKE THE WORLD IN 75 SECONDS.'
  },
  {
    id: 'oas-2',
    chapterId: 'oas-c1',
    startTime: 4.0,
    endTime: 8.0,
    cue: 'December rain, a candle lit, a non-profit pledge to never quit!',
    read: 'The Rosewood Hotel. A 501(c)(3) public charity. The goal: build AGI to benefit everyone, free from shareholders.',
    speaker: 'Sam',
    visualPrompt: 'Candle flickering on wooden table. The OpenAI Charter document with gold seal.',
    technicalNote: 'Keywords: Non-profit 501(c)(3), $0 profit, Silicon Valley.'
  },
  {
    id: 'oas-3',
    chapterId: 'oas-c1',
    startTime: 8.0,
    endTime: 13.0,
    cue: 'We carried tables to the loft, taught robot hands where skin is soft!',
    read: 'Pioneer factory loft on 18th & Folsom. Shadow Robot Hand manipulating a Rubik\'s cube in simulated physics.',
    speaker: 'Researcher',
    visualPrompt: 'Moving tables into the raw loft, cutting to 5-finger Shadow Robot Hand twisting a Rubik\'s cube.',
    technicalNote: 'Automatic Domain Randomization (ADR) physics vectors.'
  },
  {
    id: 'oas-4',
    chapterId: 'oas-c1',
    startTime: 13.0,
    endTime: 18.0,
    cue: 'Five neural nets in battle lines, predicting tokens through the vines!',
    read: 'OpenAI Five beats world champions in Dota 2. Ilya Sutskever watches next-token prediction stream down.',
    speaker: 'Ilya',
    visualPrompt: 'Five neural network battle nodes morphing into green matrix code snow over Ilya in dark profile.',
    technicalNote: '“If you guess the very next token, you grasp the whole machine.”'
  },

  // ACT 2: THE $100M CLIFF & MICROSOFT ALLIANCE (18 - 34s)
  {
    id: 'oas-5',
    chapterId: 'oas-c2',
    startTime: 18.0,
    endTime: 24.0,
    cue: 'Then the compute bill hit a hundred mil! Tear the charter up or pay the bill!',
    read: '2019. Training models requires millions in compute. A non-profit cannot raise billions from donors.',
    speaker: 'Sam',
    visualPrompt: '$100M burning ledger in red ink. Non-profit foundation cracking open into capped-profit diagram.',
    technicalNote: 'Capped-profit hybrid structure: 100x return cap, board retains non-profit mission control.'
  },
  {
    id: 'oas-6',
    chapterId: 'oas-c2',
    startTime: 24.0,
    endTime: 34.0,
    cue: 'A billion dollars from the northern cloud, ten thousand GPUs burning loud!',
    read: 'Satya Nadella enters. Microsoft commits $1 billion. 10,000 GPUs ignite across Azure datacenters.',
    speaker: 'Sam',
    visualPrompt: 'Satya Nadella & Sam Altman handshake silhouette. Azure datacenter server racks lighting up in cyan.',
    technicalNote: 'GPT-3 175-billion parameter scaling law curve.'
  },

  // ACT 3: THE SPARK: CHATGPT EXPLOSION (34 - 48s)
  {
    id: 'oas-7',
    chapterId: 'oas-c3',
    startTime: 34.0,
    endTime: 41.0,
    cue: 'Catch the spark inside the machine! Brightest fire the world has seen! Wednesday night, the preview drops!',
    read: 'November 30, 2022. A quiet research preview launched on a Wednesday with zero marketing budget.',
    speaker: 'Researcher',
    visualPrompt: 'Dark ChatGPT UI window with green cursor streaming text in real time.',
    technicalNote: 'Fastest consumer application in history to reach 100M users.'
  },
  {
    id: 'oas-8',
    chapterId: 'oas-c3',
    startTime: 41.0,
    endTime: 48.0,
    cue: 'A hundred million never stops! Servers melting in the rack, there is no turning back!',
    read: '100 million users in sixty days. The servers melt. The consumer AI revolution ignites worldwide.',
    speaker: 'Researcher',
    visualPrompt: 'Hockey-stick exponential chart shooting past top screen border, orange thermal warning glow on servers.',
    technicalNote: 'Peak viral velocity. 100M in 60 days.'
  },

  // ACT 4: THE 5-DAY COUP & 738 REVOLTERS (48 - 64s)
  {
    id: 'oas-9',
    chapterId: 'oas-c4',
    startTime: 48.0,
    endTime: 54.0,
    cue: 'Friday noon on Google Meet: "Sam, you\'re out, admit defeat!"',
    read: 'November 17, 2023. A Google Meet at noon. The board fires Sam Altman with zero warning.',
    speaker: 'Board',
    visualPrompt: 'Google Meet call screen with silhouettes, video abruptly disconnects to red "Call Ended" card.',
    technicalNote: 'The 5-day Silicon Valley civil war begins.'
  },
  {
    id: 'oas-10',
    chapterId: 'oas-c4',
    startTime: 54.0,
    endTime: 64.0,
    cue: 'Seven hundred signatures: "Bring him back, the future\'s yours!" Wednesday three AM—he\'s back in town!',
    read: '738 out of 770 employees sign an open letter to quit. The board breaks. Sam walks back at 3 AM.',
    speaker: 'Sam',
    visualPrompt: 'Endless wall of signatures scrolling at blinding speed. Sam smiling holding his guest ID badge.',
    technicalNote: '738 of 770 employees signed. Board capitulates.'
  },

  // ACT 5: THINKING MACHINES: STRAWBERRY & STARGATE (64 - 80s)
  {
    id: 'oas-11',
    chapterId: 'oas-c5',
    startTime: 64.0,
    endTime: 72.0,
    cue: 'Strawberry thinks into the night! Five gigawatts of desert light!',
    read: 'Project Strawberry: OpenAI o1. No longer guessing next words; it reasons, backtracks, and thinks through the night.',
    speaker: 'Ilya',
    visualPrompt: 'Crimson strawberry blooming into tree-of-thought search graph, branching and pruning search nodes.',
    technicalNote: 'o1 test-time reasoning compute scaling.'
  },
  {
    id: 'oas-12',
    chapterId: 'oas-c5',
    startTime: 72.0,
    endTime: 77.0,
    cue: 'We turned the earth to a thinking brain!',
    read: 'Project Stargate: 5-gigawatt supercluster monolith glowing in the desert under the Milky Way.',
    speaker: 'Sam',
    visualPrompt: 'Massive 5GW desert compute monolith under a starlit night sky, power grid pulsing with light.',
    technicalNote: 'Project Stargate: 5GW $100B compute cluster.'
  },
  {
    id: 'oas-13',
    chapterId: 'oas-c5',
    startTime: 77.0,
    endTime: 80.0,
    cue: 'And it all goes back to the pledge in the rain!',
    read: 'From a $0 non-profit dinner to $157 billion. The loop resolves back into the candle flame.',
    speaker: 'Sam',
    visualPrompt: 'Camera zooms into the center of the desert monolith, which dissolves back into the 2015 Rosewood candle.',
    technicalNote: 'Seamless loop: Final frame connects directly to Shot 1 frame 0.'
  }
];

export const OPENAI_SHORT_CHAPTERS: Chapter[] = [
  {
    id: 'oas-c1',
    number: 1,
    title: 'The Covenant & The Metal',
    subtitle: 'From a $0 Non-Profit to Rubik\'s Cubes (2015–2018)',
    startTime: 0.0,
    endTime: 18.0,
    duration: 18.0,
    themeColor: '#10A37F',
    accentColor: '#34D399',
    summary: 'A rainy dinner in Menlo Park, moving desks to the Mission loft, and teaching robot hands to grasp cubes.',
    shots: OPENAI_SHORT_SHOTS.slice(0, 4)
  },
  {
    id: 'oas-c2',
    number: 2,
    title: 'The $100M Cliff & Azure Cloud',
    subtitle: 'Capped-Profit & The Microsoft Alliance (2019–2021)',
    startTime: 18.0,
    endTime: 34.0,
    duration: 16.0,
    themeColor: '#0284C7',
    accentColor: '#38BDF8',
    summary: 'A $100M compute bill threatens bankruptcy, leading to the 100x capped-profit restructuring and Microsoft\'s $1B deal.',
    shots: OPENAI_SHORT_SHOTS.slice(4, 6)
  },
  {
    id: 'oas-c3',
    number: 3,
    title: 'The Spark: ChatGPT Explosion',
    subtitle: '100 Million Users in 60 Days (2022)',
    startTime: 34.0,
    endTime: 48.0,
    duration: 14.0,
    themeColor: '#F59E0B',
    accentColor: '#FBBF24',
    summary: 'November 30, 2022: A quiet Wednesday preview catches fire, reaching 100 million users in 60 days.',
    shots: OPENAI_SHORT_SHOTS.slice(6, 8)
  },
  {
    id: 'oas-c4',
    number: 4,
    title: 'The 5-Day Coup & 738 Revolters',
    subtitle: 'The Firing and 3 AM Return (November 2023)',
    startTime: 48.0,
    endTime: 64.0,
    duration: 16.0,
    themeColor: '#EF4444',
    accentColor: '#F87171',
    summary: 'A Friday noon Google Meet firing triggers a 738-employee mutiny that brings Sam Altman back by Wednesday 3 AM.',
    shots: OPENAI_SHORT_SHOTS.slice(8, 10)
  },
  {
    id: 'oas-c5',
    number: 5,
    title: 'Thinking Machines & Beyond',
    subtitle: 'Strawberry o1 & The 5-Gigawatt Desert Monolith (2024+)',
    startTime: 64.0,
    endTime: 80.0,
    duration: 16.0,
    themeColor: '#8B5CF6',
    accentColor: '#A78BFA',
    summary: 'Project Strawberry unlocks test-time reasoning compute, driving Project Stargate\'s 5GW desert infrastructure.',
    shots: OPENAI_SHORT_SHOTS.slice(10, 13)
  }
];

export const OPENAI_SHORT_DURATION = 80.0;
