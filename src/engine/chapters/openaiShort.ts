import { RenderContext } from '../../types/video';
import {
  PAL, paper, blob, paint, inkLine, rectPts, ellPts, rrPts,
  letter, seg, hash
} from '../painter';
import {
  OA, bloom, robotHandWithCube, chatInterface, reasoningTree,
  serverRacks, stargateComplex
} from '../openaiCast';

export function renderOpenAIShort(n: number, rc: RenderContext) {
  switch (n) {
    case 1: return act1Short(rc);
    case 2: return act2Short(rc);
    case 3: return act3Short(rc);
    case 4: return act4Short(rc);
    case 5: return act5Short(rc);
    default: return act1Short(rc);
  }
}

// ------------------------------------------------------------------ ACT 1: THE COVENANT & THE METAL (0 - 18s)
function act1Short(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot } = rc;
  const cx = W / 2, cy = H / 2, lt = t - shot.startTime;

  if (shot.id === 'oas-1') {
    // 0-4s: Hook impact - Bloom ignition + Menlo Park window
    paper(ctx, W, H, '#070D18');

    // High velocity particle rain
    for (let i = 0; i < 35; i++) {
      const rx = (hash(i * 11) * W + t * 90) % W;
      const ry = (hash(i * 17) * H + t * 160) % H;
      inkLine(ctx, [[rx, ry], [rx - 12, ry + 28]], 1.5, '#1E293B', 0);
    }

    // Centered glowing Bloom knot
    const bloomScale = 1.0 + Math.sin(t * 8) * 0.08 + seg(lt, 0, 0.4) * 0.3;
    ctx.save();
    ctx.translate(cx, cy - 20);
    ctx.scale(bloomScale, bloomScale);
    bloom(ctx, 0, 0, 110, {
      phase: t * 1.8,
      glow: true,
      face: 'awe',
      color: OA.emerald,
      sparks: true
    });
    ctx.restore();

    // Kinetic typography - Large centered hook for OCR & mobile
    letter(ctx, 'HOW OPENAI BROKE THE WORLD', cx, 80, Math.min(32, W * 0.045), PAL.cream, {
      bold: true,
      pop: seg(lt, 0.1, 0.5)
    });
    letter(ctx, 'DECEMBER 2015 · MENLO PARK', cx, 116, 14, OA.emeraldLt, {
      mono: true,
      pop: seg(lt, 0.3, 0.7)
    });
    letter(ctx, '“A $0 PROFIT NON-PROFIT PLEDGE”', cx, H - 70, Math.min(22, W * 0.035), OA.gold, {
      bold: true,
      pop: seg(lt, 0.5, 0.9)
    });
  } else if (shot.id === 'oas-2') {
    // 4-8s: The Rosewood candle & the original legal charter
    paper(ctx, W, H, '#0B1220');

    // Candle and desk
    const tableY = cy + 60;
    paint(ctx, rrPts(cx - 320, tableY, 640, 240, 16, 2), { wash: '#1A1815', ink: PAL.ink, sw: 2 });
    paint(ctx, rectPts(cx - 10, tableY - 70, 20, 70, 1), { wash: PAL.cream, ink: PAL.ink, sw: 1 });
    blob(ctx, cx, tableY - 82, 40, OA.gold, { alpha: 0.6 });
    paint(ctx, ellPts(cx + Math.sin(t * 14) * 2, tableY - 82, 8, 16, 10, 0), { wash: OA.gold, ink: null });

    // The Charter document
    paint(ctx, rrPts(cx - 200, tableY + 20, 400, 140, 8, 1.2), { wash: PAL.cream, ink: PAL.ink, sw: 1.6 });
    letter(ctx, '501(c)(3) PUBLIC CHARITY PLEDGE', cx, tableY + 50, 13, PAL.ink, { mono: true, bold: true });
    letter(ctx, '“To benefit all of humanity — free from commercial capture”', cx, tableY + 80, 12, OA.emeraldDk, { bold: true });
    letter(ctx, 'Signatures: Altman · Musk · Sutskever · Brockman', cx, tableY + 110, 11, '#64748B', { mono: true });

    // Top kinetic banner
    letter(ctx, 'THE $0 PROFIT COVENANT', cx, 80, Math.min(28, W * 0.04), OA.gold, { bold: true });
    letter(ctx, 'NO SHAREHOLDERS · NO GREED', cx, 115, 13, PAL.cream, { mono: true });
  } else if (shot.id === 'oas-3') {
    // 8-13s: Loft unboxing & Shadow Robot Hand with Rubik's Cube
    paper(ctx, W, H, '#0B132B');

    // Robot hand manipulating Rubik's cube
    robotHandWithCube(ctx, cx, cy + 20, {
      phase: t * 2.2,
      adrHud: true,
      solvedRatio: Math.min(1, lt / 4.0),
      label: 'AUTOMATIC DOMAIN RANDOMIZATION (ADR)'
    });

    // Kinetic typography
    letter(ctx, 'TEACHING MACHINES IN SIMULATION', cx, 75, Math.min(26, W * 0.038), OA.cyan, { bold: true });
    letter(ctx, '18TH & FOLSOM LOFT · 100 YEARS OF ROBOTICS IN DAYS', cx, 108, 12, PAL.cream, { mono: true });
    letter(ctx, 'RUBIK\'S CUBE SOLVED WITH ONE HAND', cx, H - 65, Math.min(20, W * 0.03), OA.gold, { bold: true });
  } else {
    // 13-18s: Dota 2 five neural nets + Ilya next-token snow
    paper(ctx, W, H, '#0A0F1D');

    // Green next-token prediction stream
    for (let col = 0; col < 14; col++) {
      const colX = cx - 260 + col * 40;
      for (let row = 0; row < 12; row++) {
        const charY = (row * 36 + t * 90) % (H - 120) + 70;
        const alpha = 0.2 + (hash(col * 31 + row * 17) * 0.6);
        ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
        ctx.font = '11px monospace';
        ctx.fillText(String.fromCharCode(0x30A0 + ((col * 7 + row * 13) % 96)), colX, charY);
      }
    }

    // Ilya's silhouette watching
    paint(ctx, ellPts(cx, cy + 70, 75, 95, 20, 0), { wash: '#0D1526', ink: OA.emerald, sw: 2 });
    bloom(ctx, cx, cy + 20, 40, { phase: t * 2, face: 'focus', color: OA.emeraldLt });

    letter(ctx, '“IF YOU GUESS THE NEXT WORD...”', cx, 75, Math.min(26, W * 0.038), PAL.cream, { bold: true });
    letter(ctx, '“...YOU GRASP THE WHOLE MACHINE”', cx, 110, 15, OA.emeraldLt, { bold: true, mono: true });
    letter(ctx, 'ILYA SUTSKEVER · 2017', cx, H - 65, 12, '#94A3B8', { mono: true });
  }
}

// ------------------------------------------------------------------ ACT 2: THE $100M CLIFF & MICROSOFT (18 - 34s)
function act2Short(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot } = rc;
  const cx = W / 2, cy = H / 2, lt = t - shot.startTime;

  if (shot.id === 'oas-5') {
    // 18-24s: The $100M compute bill burning & Capped Profit diagram
    paper(ctx, W, H, '#160B0B');

    // Burning red ledger
    const ledgerY = cy - 20;
    paint(ctx, rrPts(cx - 240, ledgerY - 100, 480, 200, 12, 1.5), { wash: '#2A1212', ink: '#EF4444', sw: 2.2 });
    letter(ctx, 'COMPUTE LEDGER · 2019', cx, ledgerY - 65, 13, '#FCA5A5', { mono: true });
    letter(ctx, '-$100,000,000', cx, ledgerY - 15, Math.min(36, W * 0.055), '#EF4444', { bold: true });
    letter(ctx, 'COMPUTE DEMANDS GROWING 10x EVERY YEAR', cx, ledgerY + 30, 12, PAL.cream);
    letter(ctx, 'A CHARITY CANNOT RAISE BILLIONS', cx, ledgerY + 55, 13, OA.gold, { bold: true });

    // Capped-profit restructuring arrow below
    paint(ctx, rrPts(cx - 200, cy + 120, 400, 50, 8, 1), { wash: '#1E293B', ink: OA.cyan, sw: 1.5 });
    letter(ctx, 'HYBRID SOLUTION: 100x CAPPED PROFIT', cx, cy + 150, 12, OA.cyan, { bold: true, mono: true });

    letter(ctx, 'THE $100,000,000 WALL', cx, 75, Math.min(28, W * 0.04), '#EF4444', { bold: true });
    letter(ctx, 'TEAR UP THE CHARTER OR SHUT DOWN', cx, 110, 13, PAL.cream, { mono: true });
  } else {
    // 24-34s: Microsoft $1B partnership + Azure server racks
    paper(ctx, W, H, '#061325');

    // Azure server racks with fiber optic blinkers
    serverRacks(ctx, cx, cy + 30, {
      count: 7,
      blinkRate: 14,
      alert: false,
      label: 'AZURE 10,000-GPU SUPERCLUSTER'
    });

    // Microsoft partnership banner
    paint(ctx, rrPts(cx - 240, cy - 130, 480, 60, 8, 1.2), { wash: '#0F2744', ink: '#38BDF8', sw: 1.8 });
    letter(ctx, 'MICROSOFT COMMITS $1,000,000,000', cx, cy - 95, Math.min(18, W * 0.028), '#38BDF8', { bold: true });

    letter(ctx, 'THE ALLIANCE: SATYA & SAM', cx, 75, Math.min(28, W * 0.04), PAL.cream, { bold: true });
    letter(ctx, '10,000 GPUs IGNITED TO BUILD GPT-3', cx, 110, 13, OA.cyan, { mono: true });
    letter(ctx, '175 BILLION PARAMETERS', cx, H - 65, Math.min(22, W * 0.032), OA.gold, { bold: true });
  }
}

// ------------------------------------------------------------------ ACT 3: THE SPARK: CHATGPT EXPLOSION (34 - 48s)
function act3Short(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot } = rc;
  const cx = W / 2, cy = H / 2, lt = t - shot.startTime;

  if (shot.id === 'oas-7') {
    // 34-41s: November 30, 2022 ChatGPT dark UI streaming
    paper(ctx, W, H, '#0B0F19');

    // Live streaming ChatGPT interface
    chatInterface(ctx, cx, cy + 20, {
      promptText: 'Write a poem about the birth of general intelligence',
      responseText: 'A quiet room in Menlo Park, a promise in the cold,\nWe taught the wires how to speak, the future to unfold...',
      progress: Math.min(1, lt / 5.0),
      cursorBlink: Math.sin(t * 12) > 0
    });

    letter(ctx, 'NOVEMBER 30, 2022: CHATGPT LAUNCH', cx, 75, Math.min(26, W * 0.038), OA.emeraldLt, { bold: true });
    letter(ctx, 'A RESEARCH PREVIEW WITH ZERO AD BUDGET', cx, 110, 13, PAL.cream, { mono: true });
  } else {
    // 41-48s: 100M user exponential curve breaking ceiling
    paper(ctx, W, H, '#1A0E0A');

    // Hockey stick curve
    const originX = cx - 220, originY = cy + 130;
    paint(ctx, rectPts(originX - 10, originY - 240, 460, 260, 2), { wash: '#24120C', ink: '#F59E0B', sw: 1.5 });

    // Animated curve
    const pts: Array<[number, number]> = [];
    for (let x = 0; x <= 440; x += 15) {
      const normX = x / 440;
      const normY = Math.pow(normX, 4.5);
      pts.push([originX + x, originY - normY * 220]);
    }
    inkLine(ctx, pts, 4, '#F59E0B', 0);

    // Glowing explosion point at top
    const peakProg = Math.min(1, lt / 3.0);
    const topPt = pts[Math.floor(peakProg * (pts.length - 1))];
    if (topPt) {
      blob(ctx, topPt[0], topPt[1], 35, '#EF4444', { alpha: 0.7 });
      paint(ctx, ellPts(topPt[0], topPt[1], 8, 8, 10, 0), { wash: PAL.cream, ink: null });
    }

    letter(ctx, '100,000,000 USERS IN 60 DAYS', cx, 75, Math.min(28, W * 0.04), '#F59E0B', { bold: true });
    letter(ctx, 'FASTEST GROWING CONSUMER APP IN HISTORY', cx, 110, 13, PAL.cream, { mono: true });
    letter(ctx, 'SERVERS MELTING IN THE RACKS', cx, H - 65, Math.min(22, W * 0.032), '#EF4444', { bold: true });
  }
}

// ------------------------------------------------------------------ ACT 4: THE 5-DAY COUP & 738 REVOLTERS (48 - 64s)
function act4Short(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot } = rc;
  const cx = W / 2, cy = H / 2, lt = t - shot.startTime;

  if (shot.id === 'oas-9') {
    // 48-54s: Friday noon Google Meet firing & screen cuts
    paper(ctx, W, H, '#160808');

    // Google Meet window
    paint(ctx, rrPts(cx - 260, cy - 90, 520, 200, 12, 1.8), { wash: '#1C0D0D', ink: '#EF4444', sw: 2 });
    letter(ctx, 'GOOGLE MEET · FRIDAY 12:00 PM', cx, cy - 60, 12, '#F87171', { mono: true });

    if (lt < 2.5) {
      letter(ctx, '“THE BOARD HAS REACHED A DECISION”', cx, cy, Math.min(20, W * 0.03), PAL.cream, { bold: true });
      letter(ctx, '“SAM, YOU ARE NO LONGER CEO”', cx, cy + 35, Math.min(22, W * 0.033), '#EF4444', { bold: true });
    } else {
      // Screen goes dead
      paint(ctx, rrPts(cx - 260, cy - 90, 520, 200, 12, 0), { wash: '#000000', ink: '#EF4444', sw: 2 });
      letter(ctx, '[ CALL DISCONNECTED BY HOST ]', cx, cy, 14, '#EF4444', { mono: true, bold: true });
    }

    letter(ctx, 'FRIDAY NOON: SAM ALTMAN FIRED', cx, 75, Math.min(28, W * 0.04), '#EF4444', { bold: true });
    letter(ctx, 'NOVEMBER 17, 2023 · THE 5-DAY COUP', cx, 110, 13, PAL.cream, { mono: true });
  } else {
    // 54-64s: 738 Signatures mutiny & Sam's 3 AM return
    paper(ctx, W, H, '#0B1528');

    // Rapid scrolling signatures
    const scrollY = (t * 140) % 300;
    paint(ctx, rrPts(cx - 240, cy - 100, 480, 210, 10, 1.5), { wash: '#121F38', ink: OA.cyan, sw: 1.8 });
    letter(ctx, 'OPEN LETTER TO THE BOARD OF DIRECTORS', cx, cy - 70, 12, '#38BDF8', { mono: true, bold: true });

    const names = [
      'Greg Brockman', 'Mira Murati', 'Ilya Sutskever', 'Wojciech Zaremba',
      'Jakub Pachocki', 'Brad Lightcap', 'Alec Radford', 'Mark Chen',
      '... 738 OUT OF 770 EMPLOYEES SIGNED'
    ];
    for (let i = 0; i < names.length; i++) {
      const ny = cy - 40 + i * 20 - scrollY;
      if (ny > cy - 50 && ny < cy + 85) {
        letter(ctx, names[i], cx, ny, 11, i === names.length - 1 ? OA.gold : PAL.cream, { mono: true });
      }
    }

    // Sam Altman returns badge
    paint(ctx, rrPts(cx - 180, cy + 120, 360, 48, 8, 1.2), { wash: '#047857', ink: '#34D399', sw: 1.5 });
    letter(ctx, 'WEDNESDAY 3 AM: SAM ALTMAN REINSTATED', cx, cy + 150, 12, PAL.cream, { bold: true, mono: true });

    letter(ctx, 'THE 738-NAME MUTINY', cx, 75, Math.min(28, W * 0.04), OA.cyan, { bold: true });
    letter(ctx, '“BRING HIM BACK OR WE ALL WALK OUT”', cx, 110, 13, OA.gold, { bold: true });
  }
}

// ------------------------------------------------------------------ ACT 5: THINKING MACHINES & BEYOND (64 - 80s)
function act5Short(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot } = rc;
  const cx = W / 2, cy = H / 2, lt = t - shot.startTime;

  if (shot.id === 'oas-11') {
    // 64-72s: Project Strawberry o1 reasoning tree-of-thought
    paper(ctx, W, H, '#160B1E');

    reasoningTree(ctx, cx, cy + 25, {
      depth: 4,
      exploredRatio: Math.min(1, lt / 5.0),
      color: '#EC4899',
      label: 'TEST-TIME REASONING COMPUTE'
    });

    letter(ctx, 'PROJECT STRAWBERRY: OPENAI o1', cx, 75, Math.min(26, W * 0.038), '#EC4899', { bold: true });
    letter(ctx, 'NOT JUST GUESSING WORDS · IT THINKS', cx, 110, 13, PAL.cream, { mono: true });
  } else if (shot.id === 'oas-12') {
    // 72-77s: Project Stargate 5-gigawatt desert monolith
    paper(ctx, W, H, '#080816');

    stargateComplex(ctx, cx, cy + 30, {
      monolithAlpha: Math.min(1, lt / 3.0),
      powerPulse: t * 3.5,
      stars: true,
      label: '5-GIGAWATT HYPERSCALE COMPLEX'
    });

    letter(ctx, 'PROJECT STARGATE: 5 GIGAWATTS', cx, 75, Math.min(28, W * 0.04), OA.cyan, { bold: true });
    letter(ctx, 'TURNING THE EARTH TO A THINKING BRAIN', cx, 110, 13, OA.gold, { bold: true, mono: true });
  } else {
    // 77-80s: Seamless Loop back to the Rosewood candle
    paper(ctx, W, H, '#070D18');

    // Zooming Bloom folding back into candle flame
    const loopT = lt / 3.0;
    const size = 120 * (1 - loopT * 0.6);
    bloom(ctx, cx, cy, size, { phase: t * 2.5, glow: true, color: OA.emerald });

    // The candle appears right in the center of the bloom!
    if (loopT > 0.4) {
      blob(ctx, cx, cy, 30 * (loopT - 0.4) * 2, OA.gold, { alpha: 0.8 });
    }

    letter(ctx, 'AND IT ALL STARTED IN THE RAIN...', cx, 80, Math.min(26, W * 0.038), PAL.cream, { bold: true });
    letter(ctx, 'FROM $0 TO $157,000,000,000', cx, 115, 14, OA.gold, { mono: true, bold: true });
    letter(ctx, 'LOOPING TO FRAME 0', cx, H - 65, 11, '#64748B', { mono: true });
  }
}
