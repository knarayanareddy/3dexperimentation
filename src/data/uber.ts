import { Chapter } from '../types/video';

/**
 * "PRESS THE BUTTON" — Uber, from a snowy night in Paris to 40 million trips a day.
 *
 * Same grammar as the other two films: 7 acts, 28 shots, 216 s nominal.
 * The cast is bespoke (see uberCast.ts): PIN is the protagonist, with riders,
 * drivers, cars, phones, a city and the occasional regulator.
 *
 * Figures are from Uber's own filings: FY2025 13.567B trips, $193.5B gross
 * bookings, $52.0B revenue, $8.7B adj. EBITDA, 202M MAPCs (Q4'25).
 */

export const UBER_CHAPTERS: Chapter[] = [
  {
    id: 'ub1',
    number: 1,
    title: 'A Button, Not a Hand',
    subtitle: 'Paris 2008 → San Francisco 2010: the idea, the app, the first cease-and-desist',
    startTime: 0,
    endTime: 32,
    duration: 32,
    themeColor: '#1F2024',
    accentColor: '#8EC3E6',
    summary: 'Two founders cannot get a cab on a cold night in Paris. The fix they imagine is almost insultingly small: one button, and a car comes to you.',
    shots: [
      {
        id: 'ub1-1', chapterId: 'ub1', startTime: 0, endTime: 8,
        speaker: 'Narrator',
        cue: 'Paris, December 2008. Two founders at a tech conference cannot get a taxi in the snow, and start sketching a fix.',
        read: 'Snowy Paris street at night. Two figures with raised arms; three taxis sail past with their lights off.',
        visualPrompt: 'Night street, falling snow, hailing arms, taxis passing, breath clouds.',
        technicalNote: 'Travis Kalanick and Garrett Camp, at LeWeb in Paris. Camp had been working on the idea of a shared on-demand black car service.',
        codeSnippet: `the old protocol:
  stand in the street
  raise an arm
  hope
  // no price, no ETA, no accountability`
      },
      {
        id: 'ub1-2', chapterId: 'ub1', startTime: 8, endTime: 16,
        speaker: 'Rider',
        cue: 'The whole idea fits in one sentence. Tap a button on the phone in your pocket, and a car comes to where you are standing.',
        read: 'The hailing hand dissolves into a phone. A PIN drops out of the sky and lands on the pavement with a squash.',
        visualPrompt: 'Hand becomes phone; map pin falls and bounces on the kerb.',
        technicalNote: 'The enabling conditions arrive together: iPhone (2007), the App Store (2008), cheap GPS, and always-on mobile data.',
        codeSnippet: `GPS(rider) + GPS(driver) + a map + a card on file
  -> tap
  -> a car knows exactly where you are
// none of this was possible in 2005`
      },
      {
        id: 'ub1-3', chapterId: 'ub1', startTime: 16, endTime: 24,
        speaker: 'Narrator',
        cue: 'July 2010, San Francisco. UberCab launches with a handful of black cars, and the first riders watch a dot crawl toward them on a map.',
        read: 'A phone fills the frame; a black car icon crawls along a blue route toward the pin. The city paints itself behind it.',
        visualPrompt: 'Hero phone with live map, moving car dot, route drawing itself.',
        technicalNote: 'Launched in San Francisco in 2010 as UberCab, initially a premium black-car service dispatched from the app.',
        codeSnippet: `the thing nobody had before:
  eta  = f(driver_position, traffic, route)
  // watching the car approach is the product`
      },
      {
        id: 'ub1-4', chapterId: 'ub1', startTime: 24, endTime: 32,
        speaker: 'Rider',
        cue: 'The second invention is quieter. The card is already on file, the fare closes itself, and the receipt arrives before you reach the kerb.',
        read: 'The route completes on the phone; a card token becomes a receipt, and the rider simply steps out.',
        visualPrompt: 'Phone route finishing, stored card token, automatic receipt, no cash changing hands.',
        technicalNote: 'Stored payment closed the trip without a cash exchange, fare negotiation, or card swipe inside the car.',
        codeSnippet: `trip ends
  -> calculate fare(distance, time)
  -> charge tokenised card
  -> email receipt
// no meter argument, no cash, no terminal`
      }
    ]
  },
  {
    id: 'ub2',
    number: 2,
    title: 'The Flywheel',
    subtitle: '2012–2013: UberX, surge pricing, and the marketplace that feeds itself',
    startTime: 32,
    endTime: 62,
    duration: 30,
    themeColor: '#4FB286',
    accentColor: '#86D4AF',
    summary: 'Opening the platform to ordinary cars turns a luxury service into a utility — and a simple feedback loop starts spinning on its own.',
    shots: [
      {
        id: 'ub2-1', chapterId: 'ub2', startTime: 32, endTime: 39,
        speaker: 'Narrator',
        cue: 'In 2012 the black car gets a cheaper sibling. UberX lets anyone with an ordinary car and a clean record pick you up.',
        read: 'A sleek black car is joined by a scruffy painted hatchback; the price tag beside it drops.',
        visualPrompt: 'Black car next to ordinary car, price label falling.',
        technicalNote: 'UberX launched in 2012 using non-professional drivers in their own vehicles, undercutting both Uber Black and incumbent taxis.',
        codeSnippet: `supply before UberX: licensed black cars only
supply after:    anyone with a car and a background check
// the constraint was never demand`
      },
      {
        id: 'ub2-2', chapterId: 'ub2', startTime: 39, endTime: 46,
        speaker: 'Driver',
        cue: 'The loop is the whole business. More drivers means shorter waits, shorter waits mean more riders, more riders mean more drivers.',
        read: 'A circular painted flywheel with four stations lights up in sequence and spins faster each lap.',
        visualPrompt: 'Circular diagram: drivers → shorter ETA → riders → earnings → drivers.',
        technicalNote: 'The classic liquidity flywheel: density lowers pickup time, which raises conversion, which raises utilisation, which attracts supply.',
        codeSnippet: `more drivers
  -> lower ETA
     -> more riders convert
        -> higher earnings per hour
           -> more drivers        // it closes`
      },
      {
        id: 'ub2-3', chapterId: 'ub2', startTime: 46, endTime: 54,
        speaker: 'Narrator',
        cue: 'When demand outruns supply, the price rises until the market clears. Riders hated it. Economists pointed out it works.',
        read: 'A red surge badge pulses over a rainy street. Some riders walk away; more cars swing in from the edges.',
        visualPrompt: 'Surge multiplier badge, rain, riders leaving, cars arriving.',
        technicalNote: 'Dynamic pricing rations scarce supply and pulls idle drivers toward demand. It remains the single most unpopular thing Uber ships.',
        codeSnippet: `price = base x multiplier(demand / supply, region, time)
// 2 effects, both intended:
//   demand falls   (some riders wait or walk)
//   supply rises   (drivers move toward the surge)`
      },
      {
        id: 'ub2-4', chapterId: 'ub2', startTime: 54, endTime: 62,
        speaker: 'Rider',
        cue: 'And both sides rate each other. A five-star system quietly turns strangers into a market that can police itself.',
        read: 'Two phones face each other; five painted stars light up on each, one at a time.',
        visualPrompt: 'Mutual rating screens, stars filling.',
        technicalNote: 'Two-sided ratings substitute for the licensing and medallion systems the service was bypassing.',
        codeSnippet: `rider rates driver   ★★★★★
driver rates rider   ★★★★★
// reputation replaces the medallion`
      }
    ]
  },
  {
    id: 'ub3',
    number: 3,
    title: 'Blitzscale',
    subtitle: '2013–2016: city by city, the playbook, the protests, and the retreat from China',
    startTime: 62,
    endTime: 96,
    duration: 34,
    themeColor: '#E8AA38',
    accentColor: '#F5C969',
    summary: 'Growth becomes the strategy and the culture. Hundreds of cities fall in three years — and the company learns that one of them will not.',
    shots: [
      {
        id: 'ub3-1', chapterId: 'ub3', startTime: 62, endTime: 70,
        speaker: 'Narrator',
        cue: 'The cease-and-desist comes through the door. They drop one word from the name, then open city after city before the law catches up.',
        read: 'The notice stamps down; CAB is crossed out, leaving UBER, then pins rain onto the world map.',
        visualPrompt: 'Cease-and-desist stamp, CAB crossed from UberCab, then cascade of city pins.',
        technicalNote: 'By 2016 Uber operated in over 400 cities across 70+ countries, typically launching before local frameworks existed.',
        codeSnippet: `"UberCab" -> "Uber"

launch(city):
  3 people, a spreadsheet, driver bonuses
  rider promo codes
  regulatory strategy := "later"`
      },
      {
        id: 'ub3-2', chapterId: 'ub3', startTime: 70, endTime: 78,
        speaker: 'Official',
        cue: 'Taxi drivers strike, cities ban the service, courts issue injunctions. In some places it works. In others it very much does not.',
        read: 'A line of yellow taxis blockades a street; officials wave notices; a pin ducks behind a lamppost.',
        visualPrompt: 'Taxi blockade, protest placards, officials with clipboards.',
        technicalNote: 'Bans and suspensions followed in multiple jurisdictions; London, Germany, France, Spain, Austin and others all produced reversals or retreats.',
        codeSnippet: `outcomes by city:
  negotiated framework   ✓ most of the US
  suspended, then won    ~ London
  banned, then exited    ✗ several EU markets`
      },
      {
        id: 'ub3-3', chapterId: 'ub3', startTime: 78, endTime: 87,
        speaker: 'Driver',
        cue: 'Behind the growth charts, the money is going out faster than it is coming in. The subsidies that buy the market also burn the balance sheet.',
        read: 'A rising growth curve is drawn in gold — while beneath it a bucket fills with red and overflows.',
        visualPrompt: 'Growth curve rising, cash bucket overflowing red.',
        technicalNote: 'Uber funded the land-grab with private capital, raising on escalating valuations while absorbing large operating losses.',
        codeSnippet: `gross bookings ↑↑
contribution margin < 0 in most new cities
// growth was bought, not earned — deliberately`
      },
      {
        id: 'ub3-4', chapterId: 'ub3', startTime: 87, endTime: 96,
        speaker: 'Narrator',
        cue: 'China is the exception. After burning about a billion dollars a year, Uber sells its China business to Didi and takes a stake instead.',
        read: 'A huge painted dragon-red map panel; the pin tips its hat, hands over a key, and accepts a share certificate.',
        visualPrompt: 'China map, handover of keys, share certificate, pin bowing out.',
        technicalNote: 'In August 2016 Uber sold Uber China to Didi Chuxing in exchange for roughly a one-fifth stake in the combined company.',
        codeSnippet: `Uber China: ~$1B/year losses
deal (Aug 2016): sell to Didi for ≈20% of Didi
// the first time growth-at-all-costs was overruled`
      }
    ]
  },
  {
    id: 'ub4',
    number: 4,
    title: 'The Reckoning',
    subtitle: '2017: one blog post, a deleted app, and a change at the top',
    startTime: 96,
    endTime: 124,
    duration: 28,
    themeColor: '#E2574C',
    accentColor: '#F0938B',
    summary: 'The culture that won the cities nearly loses the company. A single engineer\'s essay starts the year that forces Uber to grow up.',
    shots: [
      {
        id: 'ub4-1', chapterId: 'ub4', startTime: 96, endTime: 103,
        speaker: 'Narrator',
        cue: 'February 2017. A former engineer publishes an account of harassment and the response to it. It spreads in hours.',
        read: 'A single painted blog page, lit from within, multiplies into hundreds of identical shares filling the frame.',
        visualPrompt: 'One glowing page replicating across the frame.',
        technicalNote: 'Susan Fowler\'s essay on her year at Uber triggered an external investigation led by former US Attorney General Eric Holder.',
        codeSnippet: `one post
  -> internal investigation
     -> 215 claims reviewed
        -> 20 people fired
// the report's recommendations were adopted in full`
      },
      {
        id: 'ub4-2', chapterId: 'ub4', startTime: 103, endTime: 110,
        speaker: 'Rider',
        cue: 'Riders start deleting the app in protest. For the first time the brand itself becomes the liability.',
        read: 'A phone with the app icon; a thumb presses, the icon shakes and vanishes. Hundreds more follow.',
        visualPrompt: 'App icon deleted, repeated across a grid of phones.',
        technicalNote: 'The #DeleteUber campaign drove hundreds of thousands of account deletions in early 2017.',
        codeSnippet: `#DeleteUber
  net effect: 100,000s of accounts closed
  lesson: in a two-sided market, trust is inventory`
      },
      {
        id: 'ub4-3', chapterId: 'ub4', startTime: 110, endTime: 117,
        speaker: 'Official',
        cue: 'By June the founder who built the growth machine resigns under pressure from his own investors.',
        read: 'An empty painted chair in a glass boardroom; the pin stands beside it, hat removed.',
        visualPrompt: 'Empty executive chair, boardroom, pin removing hat.',
        technicalNote: 'Travis Kalanick resigned as CEO in June 2017 after a shareholder revolt.',
        codeSnippet: `the trait that built it:   never back down
the trait that broke it:  never back down
// same line, two outcomes`
      },
      {
        id: 'ub4-4', chapterId: 'ub4', startTime: 117, endTime: 124,
        speaker: 'Narrator',
        cue: 'In August a new chief executive arrives from Expedia with a very different brief: fix it, then make it boring.',
        read: 'A new figure enters and hangs a hand-lettered sign: WE DO THE RIGHT THING. PERIOD. The pin straightens up.',
        visualPrompt: 'New CEO entering, hanging a values sign, pin standing straighter.',
        technicalNote: 'Dara Khosrowshahi became CEO in August 2017 and rewrote the cultural norms, replacing the old "always be hustlin\'" list.',
        codeSnippet: `new cultural norms (2017)
  "We do the right thing. Period."
  // the engineering problem was never the hard part`
      }
    ]
  },
  {
    id: 'ub5',
    number: 5,
    title: 'Hard Lessons',
    subtitle: '2018–2020: a fatality, a flat IPO, a pandemic, and a vote on who drivers are',
    startTime: 124,
    endTime: 160,
    duration: 36,
    themeColor: '#2F3C7A',
    accentColor: '#8EA8E0',
    summary: 'Three years that test whether the business is real: the first pedestrian killed by a self-driving car, a disappointing listing, and a collapse in demand.',
    shots: [
      {
        id: 'ub5-1', chapterId: 'ub5', startTime: 124, endTime: 132,
        speaker: 'Narrator',
        cue: 'March 2018, Tempe Arizona. A self-driving test vehicle strikes and kills a pedestrian. The programme stops.',
        read: 'A dark road at night; a sensor cone sweeps; everything stops. The frame holds, muted and still.',
        visualPrompt: 'Night road, lidar cone, a single still moment, no spectacle.',
        technicalNote: 'Elaine Herzberg was killed in Tempe, Arizona — the first recorded pedestrian fatality involving an autonomous test vehicle. Uber suspended testing and later sold its self-driving unit.',
        codeSnippet: `the system classified her, repeatedly, and changed its mind
  vehicle → pedestrian → bicycle → ...
  emergency braking: disabled during testing
// a person died. the programme ended.`
      },
      {
        id: 'ub5-2', chapterId: 'ub5', startTime: 132, endTime: 140,
        speaker: 'Driver',
        cue: 'May 2019. Uber goes public at forty-five dollars a share, and the stock falls on the first day of trading.',
        read: 'A trading-floor bell; a candlestick chart opens and immediately slides downward; confetti falls anyway.',
        visualPrompt: 'IPO bell, falling chart, confetti that feels premature.',
        technicalNote: 'Uber listed on the NYSE on 10 May 2019 at $45/share, raising about $8.1B; the shares closed down roughly 7.6% on debut.',
        codeSnippet: `IPO  10 May 2019   $45.00
close day one      −7.6%
// the market wanted to see a path to profit, not a map`
      },
      {
        id: 'ub5-3', chapterId: 'ub5', startTime: 140, endTime: 150,
        speaker: 'Rider',
        cue: 'Then in 2020 the streets empty. Rides collapse almost overnight — and the food delivery business, the afterthought, explodes.',
        read: 'The city greys out and empties; the rides bar crashes down while a green Eats bar rockets up past it.',
        visualPrompt: 'Empty grey city, two opposing bars: rides down, Eats up.',
        technicalNote: 'During the first pandemic quarter, Rides gross bookings fell dramatically while Eats bookings more than doubled year-on-year, eventually overtaking Rides.',
        codeSnippet: `Q2 2020
  Rides bookings   ▼▼▼▼▼
  Eats  bookings   ▲▲▲▲▲▲▲
// the hedge nobody planned became the lifeline`
      },
      {
        id: 'ub5-4', chapterId: 'ub5', startTime: 150, endTime: 160,
        speaker: 'Official',
        cue: 'And in November, California votes on the oldest question of all: is a driver an employee, or something else entirely?',
        read: 'A painted ballot box; two doors labelled EMPLOYEE and CONTRACTOR; the ballot slides toward the second.',
        visualPrompt: 'Ballot box, two labelled doors, result card.',
        technicalNote: 'California Proposition 22 passed in November 2020, classifying app-based drivers as independent contractors with limited benefits.',
        codeSnippet: `Prop 22 (Nov 2020): passed
  classification: independent contractor
  plus: earnings floor, stipend, accident cover
// the question is still open nearly everywhere else`
      }
    ]
  },
  {
    id: 'ub6',
    number: 6,
    title: 'Making It Pay',
    subtitle: '2021–2024: one app, many errands, and the first real profit',
    startTime: 160,
    endTime: 190,
    duration: 30,
    themeColor: '#7B5CA8',
    accentColor: '#B49BD8',
    summary: 'The company stops trying to win everything and starts trying to earn something. Discipline turns the oldest criticism — that it never makes money — into history.',
    shots: [
      {
        id: 'ub6-1', chapterId: 'ub6', startTime: 160, endTime: 168,
        speaker: 'Narrator',
        cue: 'The strategy narrows. Fewer moonshots, more errands: rides, meals, groceries, parcels and freight in one app.',
        read: 'The phone screen splits into four tiles — car, meal, bag, box — each painting itself in turn.',
        visualPrompt: 'One phone, four service tiles appearing.',
        technicalNote: 'Uber divested its self-driving (ATG) and flying-taxi (Elevate) units and concentrated on Mobility, Delivery and Freight.',
        codeSnippet: `sold:  ATG (self-driving), Elevate (air taxis)
kept:  Mobility, Delivery, Freight
// one account, one payment method, many errands`
      },
      {
        id: 'ub6-2', chapterId: 'ub6', startTime: 168, endTime: 176,
        speaker: 'Driver',
        cue: 'Membership glues it together. Subscribers order more often, across more services, and they leave far less.',
        read: 'A painted membership card drops onto the phone; the four tiles link together with gold thread.',
        visualPrompt: 'Membership card, tiles connected with thread, frequency counter rising.',
        technicalNote: 'Uber One bundles discounts across Rides and Eats; members spend substantially more per month than non-members.',
        codeSnippet: `member vs non-member:
  orders / month    ▲
  cross-service use ▲
  churn             ▼
// cheapest growth is the trip someone already wanted`
      },
      {
        id: 'ub6-3', chapterId: 'ub6', startTime: 176, endTime: 183,
        speaker: 'Narrator',
        cue: 'In 2023 the arithmetic finally turns. After fourteen years, a full year of operating profit.',
        read: 'A long red line crawling below zero finally crosses the axis into black, and the pin exhales.',
        visualPrompt: 'Profit line crossing zero, pin exhaling, modest confetti.',
        technicalNote: 'Uber reported its first full year of operating profit in 2023 and was added to the S&P 500 in December 2023.',
        codeSnippet: `2023: first full-year operating profit
Dec 2023: added to the S&P 500
// the thesis finally has a number attached`
      },
      {
        id: 'ub6-4', chapterId: 'ub6', startTime: 183, endTime: 190,
        speaker: 'Rider',
        cue: 'And the model turns out to be mostly a matching problem: take the booking, pay the driver, keep the difference.',
        read: 'A clean painted ledger: gross bookings at the top, driver earnings subtracted, the remainder glowing.',
        visualPrompt: 'Ledger card: bookings → earnings → net revenue.',
        technicalNote: 'Reported revenue is what remains after driver and merchant earnings; FY2025 gross bookings were $193.5B against $52.0B revenue.',
        codeSnippet: `gross bookings      $193.5B   (FY2025)
− driver & merchant earnings
= revenue            $52.0B
// the business is the spread, at enormous volume`
      }
    ]
  },
  {
    id: 'ub7',
    number: 7,
    title: 'Forty Million a Day',
    subtitle: '2025 → next: the scale it reached, and the driverless question it has to answer',
    startTime: 190,
    endTime: 216,
    duration: 26,
    themeColor: '#3A9C98',
    accentColor: '#7FCCC9',
    summary: 'Seventeen years from a snowy pavement: two hundred million riders a month, forty million trips a day — and an open question about who is driving.',
    shots: [
      {
        id: 'ub7-1', chapterId: 'ub7', startTime: 190, endTime: 197,
        speaker: 'Narrator',
        cue: 'By the end of 2025 the number is two hundred and two million riders a month, and more than forty million trips every day.',
        read: 'The city fills with thousands of tiny moving pins until the whole frame is a living constellation.',
        visualPrompt: 'Dense city of thousands of animated pins and car dots.',
        technicalNote: 'Q4 2025: 202M monthly active platform consumers, 3.75B trips in the quarter — a run-rate above 15B trips a year.',
        codeSnippet: `Q4 2025
  monthly active consumers   202,000,000
  trips in the quarter     3,751,000,000
  ≈ 40,000,000 trips per day`
      },
      {
        id: 'ub7-2', chapterId: 'ub7', startTime: 197, endTime: 204,
        speaker: 'Driver',
        cue: 'For a full year: thirteen and a half billion trips, a hundred and ninety-three billion dollars booked through the platform.',
        read: 'Three painted counters roll up together: trips, bookings, and the profit line now comfortably above zero.',
        visualPrompt: 'Three rolling counters, profit line steady above the axis.',
        technicalNote: 'FY2025: 13.567B trips, $193.5B gross bookings, $52.0B revenue, $8.7B adjusted EBITDA, roughly $10B free cash flow.',
        codeSnippet: `FY2025
  trips            13,567,000,000
  gross bookings   $193,454,000,000
  revenue           $52,000,000,000
  adj. EBITDA        $8,700,000,000`
      },
      {
        id: 'ub7-3', chapterId: 'ub7', startTime: 204, endTime: 210,
        speaker: 'Rider',
        cue: 'And now the cars are starting to arrive with nobody in the front seat. Uber does not build them — it books them.',
        read: 'A car pulls up; the driver\'s window is empty. The pin peers in, surprised, then shrugs and climbs aboard.',
        visualPrompt: 'Driverless car at the kerb, empty front seat, pin reacting then boarding.',
        technicalNote: 'Rather than building autonomy in-house again, Uber partners with AV operators and aims to be the demand layer that dispatches them.',
        codeSnippet: `strategy shift:
  2016  build the self-driving car
  2026  be the network that dispatches everyone's
// marketplace, not manufacturer`
      },
      {
        id: 'ub7-4', chapterId: 'ub7', startTime: 210, endTime: 216,
        speaker: 'Narrator',
        cue: 'From one cold pavement in Paris to a button almost everyone has. The question was never the car. It was the waiting.',
        read: 'Camera pulls back: the whole story is a painted stage. Curtains fall; the pin, a rider and a driver take a bow.',
        visualPrompt: 'Stage pullback, velvet curtains, footlights, pin and cast bowing.',
        technicalNote: 'A closing rhyme with the other two films: the same theatre, the same bow, a different question answered.',
        codeSnippet: `2008: "why can't I get a car?"
2026: 40,000,000 times a day, you can
// the product was never transport. it was certainty.`
      }
    ]
  }
];

export const UBER_DURATION = 216;
