/**
 * openaiShortSong.ts — Short-Form Suno AI Recipe for "Sparks Speedrun (75s)".
 *
 * Engineered specifically for YouTube Shorts, TikTok, and Instagram Reels:
 *   - Total Duration: 75 to 80 seconds
 *   - Tempo: 130 BPM (driving, high-octane 4/4)
 *   - Immediate beat-one drop (0 ambient delay)
 *   - Algorithmic Speech-to-Text and OCR SEO keyword integration
 *   - Infinite loop connector (outro resolves directly into frame 0)
 */

export const OA_SHORT_TITLE = 'Sparks in 75s (The OpenAI Speedrun)';

export const OA_SHORT_STYLE_PROMPT =
  'High-octane synthwave pop, driving electro-rock, 130 BPM, D minor; ' +
  'instant drum hit on beat one, massive analog bass pulse, crisp articulate vocals, ' +
  'frantic 80s drums, anthemic soaring hook, rising white noise risers, seamless loop ending';

export const OA_SHORT_EXCLUDE =
  'slow intro, acoustic guitar, mumble, lo-fi, autotune, heavy metal, country, ambient pause';

export const OA_SHORT_LYRICS = `[Drop - beat one drum hit, instant energy]
From a quiet room in Menlo Park,
To a hundred-billion-dollar spark!
(Let's go!)

[Verse 1 - 2015 to 2018: Fast rhythmic pulse]
December rain, a candle lit,
A non-profit pledge to never quit!
We carried tables to the loft,
Taught robot hands where skin is soft,
Five neural nets in battle lines,
Predicting tokens through the vines!

[Pre-Chorus - 2019 to 2021: Rising tension, bass swells]
Then the compute bill hit a hundred mil!
Tear the charter up or pay the bill!
A billion dollars from the northern cloud,
Ten thousand GPUs burning loud!

[Chorus - 2022: Anthemic explosive drop, chant hook]
Catch the spark inside the machine!
Brightest fire the world has seen!
Wednesday night, the preview drops,
A hundred million never stops!
Servers melting in the rack,
There is no turning back!

[Bridge - 2023: Dramatic half-time cut, high stakes]
Friday noon on Google Meet:
"Sam, you're out, admit defeat!"
Seven hundred signatures:
"Bring him back, the future's yours!"
Wednesday three AM—he's back in town,
You cannot tear this empire down!

[Outro / Climax - 2024 to Beyond: Colossal crescendo]
Strawberry thinks into the night!
Five gigawatts of desert light!
We turned the earth to a thinking brain,
And it all goes back to the pledge in the rain!
[Hard cut / Seamless loop back to Beat One]`;

export const OA_SHORT_SECTION_PLAN = [
  { label: 'Drop & Hook', act: 1 },
  { label: 'Verse 1 (Loft & Dota)', act: 1 },
  { label: 'Pre-Chorus ($100M Cliff)', act: 2 },
  { label: 'Chorus (ChatGPT 100M)', act: 3 },
  { label: 'Bridge (The 5-Day Coup)', act: 4 },
  { label: 'Climax & Loop (Strawberry & Stargate)', act: 5 }
];

export const OA_SHORT_ANCHORS = [
  { lyric: 'From a quiet room in Menlo Park, to a hundred-billion-dollar spark!', shot: 'oas-1' },
  { lyric: 'December rain, a candle lit, a non-profit pledge to never quit!', shot: 'oas-2' },
  { lyric: 'We carried tables to the loft, taught robot hands where skin is soft', shot: 'oas-3' },
  { lyric: 'Five neural nets in battle lines, predicting tokens through the vines', shot: 'oas-4' },
  { lyric: 'Then the compute bill hit a hundred mil! Tear the charter up or pay the bill!', shot: 'oas-5' },
  { lyric: 'A billion dollars from the northern cloud, ten thousand GPUs burning loud!', shot: 'oas-6' },
  { lyric: 'Catch the spark inside the machine! Wednesday night, the preview drops!', shot: 'oas-7' },
  { lyric: 'A hundred million never stops! Servers melting in the rack!', shot: 'oas-8' },
  { lyric: 'Friday noon on Google Meet: "Sam, you\'re out, admit defeat!"', shot: 'oas-9' },
  { lyric: 'Seven hundred signatures: "Bring him back, the future\'s yours!"', shot: 'oas-10' },
  { lyric: 'Strawberry thinks into the night! Five gigawatts of desert light!', shot: 'oas-11' },
  { lyric: 'We turned the earth to a thinking brain!', shot: 'oas-12' },
  { lyric: 'And it all goes back to the pledge in the rain!', shot: 'oas-13' }
];

export const OA_SHORT_SEO_METADATA = {
  title: 'How OpenAI Broke The World in 75 Seconds 🤯 #Shorts',
  description:
    'From a rainy dinner in Menlo Park (2015) to a $157B valuation, 100M users in 60 days, and the 5-day coup that shook Silicon Valley. The full story of OpenAI, ChatGPT, Sam Altman, Ilya Sutskever, and Project Stargate in 75 seconds.',
  hashtags: ['#OpenAI', '#ChatGPT', '#SamAltman', '#ArtificialIntelligence', '#Shorts'],
  keywords: [
    'OpenAI story',
    'ChatGPT history',
    'Sam Altman fired',
    'OpenAI non profit',
    'Ilya Sutskever',
    'Project Strawberry o1',
    'Project Stargate',
    'AI documentary shorts'
  ],
  geoAnchors: ['Menlo Park, CA', 'Silicon Valley', 'San Francisco', '18th & Folsom Loft']
};
