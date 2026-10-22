import { RenderContext } from '../../types/video';
import {
  PAL, paper, ground, blob, paint, inkLine, rectPts, ellPts, rrPts, starPts,
  letter, seg, hash, arrow
} from '../painter';
import {
  OA, bloom, robotHandWithCube, chatInterface, reasoningTree,
  serverRacks, stargateComplex,
  samAltman, ilyaSutskever, satyaNadella, employeeCrowd
} from '../openaiCast';

const G = 590; // baseline ground line

export function renderOpenAI(n: number, rc: RenderContext) {
  switch (n) {
    case 1: return act1(rc);
    case 2: return act2(rc);
    case 3: return act3(rc);
    case 4: return act4(rc);
    case 5: return act5(rc);
    case 6: return act6(rc);
    case 7: return act7(rc);
    default: return act1(rc);
  }
}

// ------------------------------------------------------------------ ACT 1: THE ROSEWOOD COVENANT
function act1(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2, lt = t - shot.startTime;

  if (shot.id === 'oa1-1') {
    // Rosewood hotel dinner, rain, candle, non-profit pledge
    paper(ctx, W, H, '#0B1320');
    paint(ctx, rectPts(-20, -20, W + 40, H + 40, 4), { fill: '#0A0F1D', fillOp: 230, bleed: 0.1, tex: 0.4, ink: null });

    // Rainy window background
    for (let i = 0; i < 40; i++) {
      const rx = (hash(i * 7) * W + t * 40) % W;
      const ry = (hash(i * 13) * H + t * 80) % H;
      inkLine(ctx, [[rx, ry], [rx - 8, ry + 22]], 1.2, '#1E293B', 0);
    }

    letter(ctx, 'MENLO PARK · DECEMBER 2015', cx, 84, 28, PAL.cream, { pop: seg(lt, 0.2, 0.9) });
    letter(ctx, 'THE ROSEWOOD HOTEL', cx, 118, 14, OA.emeraldLt, { mono: true, pop: seg(lt, 0.6, 1.2) });

    // Candle on table
    const tableY = 480;
    paint(ctx, rrPts(cx - 320, tableY, 640, 220, 16, 2), { wash: '#1E1B18', ink: PAL.ink, sw: 1.8 });
    paint(ctx, rectPts(cx - 12, tableY - 70, 24, 70, 1), { wash: PAL.cream, ink: PAL.ink, sw: 1 });
    // Candle flame with glow
    const flameFlicker = Math.sin(t * 12) * 2;
    blob(ctx, cx, tableY - 82, 34, OA.gold, { alpha: 0.5 });
    paint(ctx, ellPts(cx + flameFlicker * 0.4, tableY - 82, 7, 14, 10, 0), { wash: OA.gold, ink: null });

    // The Charter document on the table
    paint(ctx, rrPts(cx - 180, tableY + 25, 360, 130, 8, 1.2), { wash: PAL.cream, ink: PAL.ink, sw: 1.4 });
    letter(ctx, 'OPENAI CHARTER', cx, tableY + 52, 14, PAL.ink, { mono: true, ink: false });
    letter(ctx, 'A public endowment for safe general intelligence', cx, tableY + 76, 11, '#475569', { ink: false });
    letter(ctx, '“To benefit all of humanity — free from commercial capture”', cx, tableY + 102, 11.5, OA.emeraldDk, { ink: false });

    // The founders at the table: Sam Altman leaning forward with his pen, Ilya across
    samAltman(ctx, cx - 210, tableY + 70, 8.5, {
      t,
      mood: 'focused',
      gesture: 'pen',
      talk: speaking && shot.speaker === 'Sam',
      talkT: t
    });

    ilyaSutskever(ctx, cx + 210, tableY + 70, 8.5, {
      t,
      flip: true,
      mood: 'focused',
      talk: speaking && shot.speaker === 'Ilya',
      talkT: t
    });

    // $1B Pledge stamp
    if (lt > 2.8) {
      paint(ctx, rrPts(cx + 80, tableY + 45, 90, 36, 6, 0.5), { wash: OA.emerald, ink: PAL.ink, sw: 1.2 });
      letter(ctx, '$1 BILLION', cx + 125, tableY + 63, 11, PAL.cream, { mono: true, pop: seg(lt, 2.8, 3.4), stroke: true });
    }
  }

  else if (shot.id === 'oa1-2') {
    // Pioneer building loft, whiteboards, waking bloom
    paper(ctx, W, H, '#DCE7E1');
    ground(ctx, W, G, '#334155');

    letter(ctx, 'THE PIONEER BUILDING · SF MISSION', cx, 84, 28, PAL.ink, { pop: seg(lt, 0.15, 0.8) });

    // Large whiteboard
    paint(ctx, rrPts(cx - 360, 140, 460, 280, 12, 1.5), { wash: PAL.cream, ink: PAL.ink, sw: 1.8 });
    letter(ctx, '∇_θ E[ R(τ) ] = E[ ∇_θ log π_θ(τ) R(τ) ]', cx - 130, 210, 14, OA.emeraldDk, { mono: true, ink: false });
    letter(ctx, 'Policy Gradients · Q-Learning · Value Networks', cx - 130, 250, 12, '#64748B', { mono: true, ink: false });
    letter(ctx, 'Target: General Problem Solver', cx - 130, 290, 14, OA.strawberry, { mono: true, ink: false });

    // Ilya at the whiteboard actively writing formulas with his marker
    ilyaSutskever(ctx, cx - 180, G, 9.5, {
      t,
      gesture: 'whiteboard',
      talk: speaking && shot.speaker === 'Ilya',
      talkT: t
    });

    // Desk with laptop
    paint(ctx, rectPts(cx + 140, 340, 180, 14, 0.5), { wash: '#78350F', ink: PAL.ink, sw: 1 });
    inkLine(ctx, [[cx + 160, 354], [cx + 160, G]], 2.5, PAL.ink, 0);
    inkLine(ctx, [[cx + 300, 354], [cx + 300, G]], 2.5, PAL.ink, 0);
    // Laptop
    paint(ctx, rectPts(cx + 180, 295, 80, 45, 0.5), { wash: '#0F172A', ink: PAL.ink, sw: 1 });
    paint(ctx, rectPts(cx + 170, 340, 100, 6, 0.5), { wash: '#CBD5E1', ink: PAL.ink, sw: 1 });

    // Sam Altman sitting at his desk coding with his laptop
    samAltman(ctx, cx + 230, G, 9.5, {
      t,
      gesture: 'typing',
      talk: speaking && shot.speaker === 'Sam',
      talkT: t
    });

    // The newborn Bloom waking up and stretching
    const wakeK = seg(lt, 1.0, 3.5);
    bloom(ctx, cx + 220, 240, 36 * (0.4 + wakeK * 0.6), {
      t,
      face: wakeK > 0.7 ? 'happy' : 'sleeping',
      complexity: wakeK,
      talk: speaking,
      talkT: t
    });

    letter(ctx, 'no products. no revenue model. just pure research.', cx, 520, 18, OA.emeraldDk, { pop: seg(lt, 3.8, 4.8) });
  }

  else if (shot.id === 'oa1-3') {
    // Gym & Universe environments, arcade tiles
    paper(ctx, W, H, '#CAD5E2');
    letter(ctx, 'OPENAI GYM & UNIVERSE (2016)', cx, 78, 30, PAL.ink, { pop: seg(lt, 0.15, 0.8) });

    // Grid of virtual game screens
    const games = [
      { name: 'Pong-v0', col: '#10B981', x: cx - 340, y: 140 },
      { name: 'Breakout-v0', col: '#F59E0B', x: cx - 110, y: 140 },
      { name: 'SpaceInvaders', col: '#8B5CF6', x: cx + 120, y: 140 },
      { name: 'CartPole-v1', col: '#3B82F6', x: cx - 225, y: 310 },
      { name: 'LunarLander', col: '#EC4899', x: cx + 5, y: 310 }
    ];

    games.forEach((g, idx) => {
      const active = lt > 0.5 + idx * 0.4;
      if (!active) return;
      paint(ctx, rrPts(g.x, g.y, 200, 140, 10, 1), { wash: '#0F172A', ink: PAL.ink, sw: 1.4 });
      paint(ctx, rectPts(g.x + 8, g.y + 8, 184, 96, 0.4), { wash: '#1E293B', ink: null });
      letter(ctx, g.name, g.x + 100, g.y + 122, 11, g.col, { mono: true, ink: false });

      // Little arcade game animations
      if (g.name.includes('Pong')) {
        paint(ctx, rectPts(g.x + 14, g.y + 40 + Math.sin(t * 5) * 20, 6, 26, 0), { wash: PAL.cream, ink: null });
        paint(ctx, rectPts(g.x + 180, g.y + 40 - Math.sin(t * 5) * 20, 6, 26, 0), { wash: PAL.cream, ink: null });
        paint(ctx, ellPts(g.x + 100 + Math.cos(t * 5) * 60, g.y + 56, 4, 4, 6, 0), { wash: OA.emeraldLt, ink: null });
      }
    });

    letter(ctx, '“standardise the benchmark: if it can play every game, it can learn any world”', cx, 520, 16, PAL.ink, { pop: seg(lt, 3.6, 4.8) });
  }

  else {
    // The compute cliff, spinning meters, thermal reality
    paper(ctx, W, H, '#E2DCD2');
    letter(ctx, 'THE PHYSICAL REALITY', cx, 78, 32, PAL.ink, { pop: seg(lt, 0.15, 0.8) });

    // Open lock turning into power meter
    paint(ctx, rrPts(cx - 280, 160, 240, 260, 14, 1.2), { wash: '#1E293B', ink: PAL.ink, sw: 1.6 });
    letter(ctx, 'POWER DRAW', cx - 160, 200, 14, OA.strawberry, { mono: true, stroke: true });

    // Gauge needle spinning
    const needleAng = -Math.PI * 0.7 + seg(lt, 0.5, 4.0) * Math.PI * 1.4;
    paint(ctx, ellPts(cx - 160, 310, 60, 60, 16, 0), { wash: '#0F172A', ink: OA.strawberry, sw: 2 });
    inkLine(ctx, [[cx - 160, 310], [cx - 160 + Math.cos(needleAng) * 45, 310 + Math.sin(needleAng) * 45]], 3, OA.gold, 0);

    // Compute cost curve
    paint(ctx, rrPts(cx + 40, 160, 260, 260, 14, 1.2), { wash: '#0F172A', ink: PAL.ink, sw: 1.6 });
    letter(ctx, 'TRAINING FLOPS EXPONENT', cx + 170, 195, 12, OA.emeraldLt, { mono: true });

    const plotK = seg(lt, 1.2, 5.0);
    const pts: Array<[number, number]> = [];
    for (let i = 0; i <= 30; i++) {
      const p = (i / 30) * plotK;
      pts.push([cx + 60 + p * 210, 380 - Math.pow(p, 2.5) * 150]);
    }
    if (pts.length > 1) inkLine(ctx, pts, 3, OA.strawberry, 0.2);

    letter(ctx, 'Pledged: $1,000,000,000  ·  Delivered: ~$130M', cx, 470, 14, '#64748B', { mono: true, pop: seg(lt, 2.5, 3.5) });
    letter(ctx, 'Compute is not free. Philanthropy was about to hit a wall.', cx, 520, 18, OA.strawberry, { pop: seg(lt, 4.0, 5.2) });
  }
}

// ------------------------------------------------------------------ ACT 2: GAMES AND METAL
function act2(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2, lt = t - shot.startTime;

  if (shot.id === 'oa2-1') {
    // OpenAI Five Dota 2 arena
    paper(ctx, W, H, '#0B1120');
    letter(ctx, 'OPENAI FIVE · THE INTERNATIONAL (2018)', cx, 76, 28, OA.azureLt, { pop: seg(lt, 0.15, 0.8), stroke: true });

    // Esports arena stage
    paint(ctx, rectPts(cx - 400, 120, 800, 340, 2), { wash: '#111827', ink: OA.azure, sw: 1.5 });

    // Five glowing AI bots in formation
    for (let i = 0; i < 5; i++) {
      const bx = cx - 280 + i * 140;
      const by = 250 + Math.sin(t * 3 + i) * 12;
      bloom(ctx, bx, by, 22, { t, color: OA.azureLt, glowCol: OA.azure, face: 'determined' });

      // Health bar above bot
      paint(ctx, rrPts(bx - 30, by - 38, 60, 8, 3, 0), { wash: '#1F2937', ink: null });
      paint(ctx, rrPts(bx - 30, by - 38, 54, 8, 3, 0), { wash: OA.emerald, ink: null });
      letter(ctx, `BOT ${i + 1}`, bx, by + 34, 10, '#94A3B8', { mono: true, ink: false });
    }

    // Rapid coordination pulse lines connecting all 5
    for (let i = 0; i < 4; i++) {
      const x1 = cx - 280 + i * 140;
      const x2 = cx - 280 + (i + 1) * 140;
      inkLine(ctx, [[x1, 250], [x2, 250]], 2, OA.azureLt, 0.2);
    }

    letter(ctx, '180 YEARS OF GAME EXPERIENCE ACCUMULATED EVERY 24 HOURS', cx, 490, 14, OA.emeraldLt, { mono: true, pop: seg(lt, 2.5, 3.8) });
    letter(ctx, 'World champions defeated by alien continuous coordination', cx, 524, 16, PAL.cream, { pop: seg(lt, 4.0, 5.2) });
  }

  else if (shot.id === 'oa2-2') {
    // Shadow robotic hand & Rubik's cube
    paper(ctx, W, H, '#D7E2DC');
    letter(ctx, 'AUTOMATIC DOMAIN RANDOMIZATION', cx, 74, 28, PAL.ink, { pop: seg(lt, 0.15, 0.8) });

    // Render robotic hand twisting cube
    robotHandWithCube(ctx, cx, 340, 52, t, seg(lt, 0.5, 4.0));

    letter(ctx, 'No real-world training: millions of perturbed simulations transfer zero-shot into steel', cx, 520, 16, OA.emeraldDk, { pop: seg(lt, 3.5, 4.8) });
  }

  else if (shot.id === 'oa2-3') {
    // Unsupervised pre-training & next token prediction
    paper(ctx, W, H, '#0D1424');
    letter(ctx, 'GPT-1 & THE PRE-TRAINING HYPOTHESIS', cx, 74, 28, OA.emeraldLt, { pop: seg(lt, 0.15, 0.8) });

    // Stream of tokens flowing left to right
    const tokens = ['The', 'future', 'of', 'mind', 'is', 'not', 'rules', 'but', 'PREDICTION'];
    tokens.forEach((tok, i) => {
      const active = lt > 0.4 + i * 0.45;
      if (!active) return;
      const tx = cx - 360 + i * 82;
      const isTarget = i === tokens.length - 1;

      paint(ctx, rrPts(tx - 36, 210, 72, 38, 8, 0.8), {
        wash: isTarget ? OA.emerald : '#1E293B',
        ink: isTarget ? OA.emeraldLt : '#475569',
        sw: isTarget ? 2 : 1
      });
      letter(ctx, tok, tx, 229, 12, isTarget ? '#0B291E' : '#F1F5F9', { mono: true, stroke: isTarget });
    });

    // Attention cross-weights connecting tokens
    if (lt > 2.8) {
      for (let i = 0; i < tokens.length - 1; i++) {
        const x1 = cx - 360 + i * 82;
        const x2 = cx - 360 + (tokens.length - 1) * 82;
        inkLine(ctx, [[x1, 248], [(x1 + x2) / 2, 330], [x2, 248]], 1.5, OA.emeraldLt, 0.5);
      }
    }

    // Ilya Sutskever in dark profile watching the token blizzard with awe
    ilyaSutskever(ctx, cx - 180, G - 30, 10.5, {
      t,
      gesture: 'awe',
      mood: 'focused',
      talk: speaking && shot.speaker === 'Ilya',
      talkT: t
    });

    bloom(ctx, cx + 180, 370, 32, { t, face: 'thinking', talk: speaking, talkT: t, complexity: 0.85 });
    letter(ctx, '“If you accurately predict the next word on the internet, you must understand the world.”', cx, 500, 16, PAL.cream, { pop: seg(lt, 3.6, 5.0) });
  }

  else {
    // GPT-2 and too dangerous to release
    paper(ctx, W, H, '#E2DDD4');
    letter(ctx, 'FEBRUARY 2019 · GPT-2 (1.5B)', cx, 74, 30, PAL.ink, { pop: seg(lt, 0.15, 0.8) });

    // Glass vault enclosing model
    paint(ctx, rrPts(cx - 240, 130, 480, 280, 16, 1.4), { wash: '#1E293B', ink: PAL.ink, sw: 2 });
    paint(ctx, rectPts(cx - 220, 150, 440, 240, 0.5), { wash: '#0F172A', ink: null });

    // Glowing unicorn story text
    letter(ctx, '“In a shocking finding, scientist discovered a herd of unicorns...”', cx, 200, 12.5, OA.emeraldLt, { mono: true });
    letter(ctx, 'Synthesizes multi-paragraph prose with uncanny coherence.', cx, 240, 11, '#94A3B8', { mono: true });

    // Big REDACTED / TOO DANGEROUS TO RELEASE Stamp
    if (lt > 1.8) {
      ctx.save();
      ctx.translate(cx, 310);
      ctx.rotate(-0.12);
      paint(ctx, rrPts(-180, -28, 360, 56, 10, 1), { wash: OA.strawberry, ink: PAL.ink, sw: 2 });
      letter(ctx, 'TOO DANGEROUS TO RELEASE', 0, 0, 18, PAL.cream, { mono: true, stroke: true, pop: seg(lt, 1.8, 2.5) });
      ctx.restore();
    }

    letter(ctx, 'For the first time, OpenAI held back the weights. The open era had begun to close.', cx, 510, 16, OA.strawberry, { pop: seg(lt, 3.6, 5.0) });
  }
}

// ------------------------------------------------------------------ ACT 3: THE CAPPED-PROFIT CROSSROADS
function act3(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot } = rc;
  const cx = W / 2, lt = t - shot.startTime;

  if (shot.id === 'oa3-1') {
    // The exponential compute cliff
    paper(ctx, W, H, '#DDD7CD');
    letter(ctx, 'THE COMPUTE GAP (2019)', cx, 74, 30, PAL.ink, { pop: seg(lt, 0.15, 0.8) });

    // Classical non-profit building cracking
    const bldgW = 260, bldgH = 180;
    paint(ctx, rectPts(cx - bldgW / 2, 260, bldgW, bldgH, 1), { wash: PAL.cream, ink: PAL.ink, sw: 1.8 });
    // Pediment triangle
    paint(ctx, [[cx - bldgW / 2 - 20, 260], [cx, 200], [cx + bldgW / 2 + 20, 260]], { wash: PAL.cream, ink: PAL.ink, sw: 1.8 });
    letter(ctx, '501(c)(3)', cx, 240, 14, PAL.ink, { mono: true, ink: false });

    // Giant compute arrow piercing through the roof
    const arrowProg = seg(lt, 1.2, 4.0);
    arrow(ctx, cx, 440, cx, 440 - arrowProg * 310, OA.strawberry, 4);
    letter(ctx, 'Exponential Compute Demand (300,000x)', cx, 110, 16, OA.strawberry, { mono: true, stroke: true });

    letter(ctx, 'Charitable donations could not fund the hardware frontier.', cx, 500, 18, PAL.ink, { pop: seg(lt, 3.5, 4.8) });
  }

  else if (shot.id === 'oa3-2') {
    // Split with Musk
    paper(ctx, W, H, '#D1D9E0');
    letter(ctx, 'THE CROSSROADS', cx, 74, 30, PAL.ink, { pop: seg(lt, 0.15, 0.8) });

    // Fork in the road
    inkLine(ctx, [[cx, 480], [cx, 340], [cx - 280, 180]], 3, PAL.ink, 0.2);
    inkLine(ctx, [[cx, 340], [cx + 280, 180]], 3, PAL.ink, 0.2);

    // Left sign: Elon / Tesla
    paint(ctx, rrPts(cx - 340, 140, 160, 60, 10, 1), { wash: '#1F2937', ink: PAL.ink, sw: 1.4 });
    letter(ctx, 'MUSK PATH', cx - 260, 160, 12, PAL.cream, { mono: true, ink: false });
    letter(ctx, 'Fold into Tesla', cx - 260, 182, 10, '#94A3B8', { ink: false });

    // Right sign: Sam / Independent LP
    paint(ctx, rrPts(cx + 180, 140, 160, 60, 10, 1), { wash: OA.emeraldDk, ink: PAL.ink, sw: 1.4 });
    letter(ctx, 'OPENAI PATH', cx + 260, 160, 12, PAL.cream, { mono: true, ink: false });
    letter(ctx, 'Hybrid Capped-Profit', cx + 260, 182, 10, OA.emeraldLt, { ink: false });

    bloom(ctx, cx + 260, 260, 28, { t, face: 'determined' });

    letter(ctx, '“We had to choose: remain pure and irrelevant, or build a company that could win.”', cx, 510, 16, OA.emeraldDk, { pop: seg(lt, 3.6, 5.0) });
  }

  else if (shot.id === 'oa3-3') {
    // OpenAI LP capped-profit balance scale
    paper(ctx, W, H, '#E5E0D5');
    letter(ctx, 'OPENAI LP · THE CAPPED-PROFIT HYBRID', cx, 74, 28, PAL.ink, { pop: seg(lt, 0.15, 0.8) });

    // Fulcrum balance beam
    const balY = 260;
    inkLine(ctx, [[cx - 220, balY - 20], [cx + 220, balY + 20]], 4, PAL.ink, 0);
    // Fulcrum triangle
    paint(ctx, [[cx - 24, balY + 90], [cx, balY], [cx + 24, balY + 90]], { wash: '#374151', ink: PAL.ink, sw: 1.6 });

    // Left pan: 100x return cap
    paint(ctx, rrPts(cx - 280, balY + 10, 140, 80, 10, 1), { wash: OA.gold, ink: PAL.ink, sw: 1.4 });
    letter(ctx, 'INVESTOR CAP', cx - 210, balY + 38, 12, '#372005', { mono: true, stroke: true });
    letter(ctx, 'Up to 100x Return', cx - 210, balY + 62, 11, '#372005', { ink: false });

    // Right pan: Overflow to Public Trust
    paint(ctx, rrPts(cx + 140, balY + 45, 160, 80, 10, 1), { wash: OA.emerald, ink: PAL.ink, sw: 1.4 });
    letter(ctx, 'HUMANITY SURPLUS', cx + 220, balY + 73, 12, PAL.cream, { mono: true, stroke: true });
    letter(ctx, 'All excess to Mission', cx + 220, balY + 97, 11, PAL.cream, { ink: false });

    letter(ctx, 'Governed not by shareholders, but by the non-profit board.', cx, 490, 16, PAL.ink, { pop: seg(lt, 3.2, 4.8) });
  }

  else {
    // Microsoft $1B handshake and Azure supercomputer
    paper(ctx, W, H, '#0B132B');
    letter(ctx, 'JULY 2019 · THE $1 BILLION ALLIANCE', cx, 74, 28, OA.azureLt, { pop: seg(lt, 0.15, 0.8), stroke: true });

    // Datacenter servers powering up in the background
    serverRacks(ctx, cx - 380, 240, 760, 150, t, OA.azureLt);

    // Handshake between Sam Altman and Satya Nadella!
    samAltman(ctx, cx - 110, G - 40, 10.0, {
      t,
      gesture: 'handshake',
      mood: 'happy',
      talk: speaking && shot.speaker === 'Sam',
      talkT: t
    });

    satyaNadella(ctx, cx + 110, G - 40, 10.0, {
      t,
      flip: true,
      talk: speaking && shot.speaker === 'Researcher',
      talkT: t
    });

    letter(ctx, '10,000 GPUs linked into a single supercomputer for OpenAI.', cx, 500, 17, OA.azureLt, { mono: true, pop: seg(lt, 3.2, 4.6) });
  }
}

// ------------------------------------------------------------------ ACT 4: THE SCALING HYPOTHESIS
function act4(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot } = rc;
  const cx = W / 2, lt = t - shot.startTime;

  if (shot.id === 'oa4-1') {
    // GPT-3 monolithic crystalline scale
    paper(ctx, W, H, '#0C0A1A');
    letter(ctx, 'MAY 2020 · GPT-3 (175 BILLION PARAMETERS)', cx, 74, 28, OA.purple, { pop: seg(lt, 0.15, 0.8), stroke: true });

    // Towering monolith
    paint(ctx, [
      [cx - 90, 440], [cx - 60, 130], [cx + 60, 130], [cx + 90, 440]
    ], { wash: '#1E1438', ink: OA.purple, sw: 2, curv: 0.1 });

    // Glowing parameter rings inside monolith
    for (let i = 0; i < 7; i++) {
      const y = 160 + i * 38;
      const w = 70 + i * 8;
      paint(ctx, ellPts(cx, y, w, 8, 16, 0), { wash: OA.purple, ink: null });
    }

    // Small human standing in awe
    paint(ctx, ellPts(cx - 180, 420, 9, 10, 10, 0), { wash: PAL.cream, ink: PAL.ink, sw: 1 });
    paint(ctx, rectPts(cx - 187, 430, 14, 25, 0.5), { wash: '#334155', ink: PAL.ink, sw: 1 });

    letter(ctx, '“Scaling laws held: compute turned loss into emergent reasoning.”', cx, 490, 17, PAL.cream, { pop: seg(lt, 3.2, 4.8) });
  }

  else if (shot.id === 'oa4-2') {
    // Prompt interface replacing compiler
    paper(ctx, W, H, '#D9E3DC');
    letter(ctx, 'THE PROMPT PARADIGM', cx, 74, 30, PAL.ink, { pop: seg(lt, 0.15, 0.8) });

    // Left: Old compiler
    paint(ctx, rrPts(cx - 360, 140, 320, 260, 12, 1), { wash: '#0F172A', ink: PAL.ink, sw: 1.6 });
    letter(ctx, 'OLD CODE (1950 - 2020)', cx - 200, 175, 12, '#94A3B8', { mono: true });
    letter(ctx, 'for (int i=0; i<N; i++) {', cx - 340, 215, 11, '#38BDF8', { mono: true, align: 'left', ink: false });
    letter(ctx, '  compile_ast(tokens);', cx - 340, 240, 11, '#38BDF8', { mono: true, align: 'left', ink: false });
    letter(ctx, '  memory_barrier();', cx - 340, 265, 11, '#38BDF8', { mono: true, align: 'left', ink: false });
    letter(ctx, '}', cx - 340, 290, 11, '#38BDF8', { mono: true, align: 'left', ink: false });

    // Right: Natural language prompt
    paint(ctx, rrPts(cx + 40, 140, 320, 260, 12, 1), { wash: '#0B291E', ink: OA.emerald, sw: 1.8 });
    letter(ctx, 'NEW INTERFACE: ENGLISH', cx + 200, 175, 12, OA.emeraldLt, { mono: true, stroke: true });
    letter(ctx, '“Summarise this legal contract,”', cx + 60, 220, 12, '#E2E8F0', { align: 'left', ink: false });
    letter(ctx, '“Write a website in React,”', cx + 60, 250, 12, '#E2E8F0', { align: 'left', ink: false });
    letter(ctx, '“Diagnose this CT scan.”', cx + 60, 280, 12, '#E2E8F0', { align: 'left', ink: false });

    letter(ctx, 'The universal programming language was suddenly human speech.', cx, 470, 18, OA.emeraldDk, { pop: seg(lt, 3.5, 4.8) });
  }

  else if (shot.id === 'oa4-3') {
    // Anthropic schism
    paper(ctx, W, H, '#E2DAD0');
    letter(ctx, 'LATE 2020 · THE SAFETY SCHISM', cx, 74, 30, PAL.ink, { pop: seg(lt, 0.15, 0.8) });

    // Fault line across ground
    inkLine(ctx, [[cx, 130], [cx - 40, 260], [cx + 30, 380], [cx, 480]], 3, OA.strawberry, 0.3);

    // Left: OpenAI scaling forward
    bloom(ctx, cx - 180, 260, 42, { t, face: 'determined' });
    letter(ctx, 'OPENAI', cx - 180, 330, 14, OA.emeraldDk, { mono: true, stroke: true });

    // Right: Eleven departure to Anthropic
    paint(ctx, starPts(cx + 180, 260, 38, 0.65, 4), { wash: '#D97757', ink: PAL.ink, sw: 1.6 });
    letter(ctx, 'ANTHROPIC', cx + 180, 330, 14, '#9C4221', { mono: true, stroke: true });
    letter(ctx, 'Constitutional AI · Claude', cx + 180, 355, 11, '#78350F', { ink: false });

    letter(ctx, 'Dario Amodei and eleven core safety researchers walk out.', cx, 490, 17, PAL.ink, { pop: seg(lt, 3.2, 4.8) });
  }

  else {
    // RLHF & InstructGPT alignment
    paper(ctx, W, H, '#D4E4DC');
    letter(ctx, 'INSTRUCTGPT & RLHF (2022)', cx, 74, 30, PAL.ink, { pop: seg(lt, 0.15, 0.8) });

    // Raw flame of tokens on left
    const flameY = 280;
    blob(ctx, cx - 220, flameY, 70, OA.strawberry, { alpha: 0.5 });
    letter(ctx, 'Raw Pre-Training', cx - 220, flameY + 60, 12, OA.strawberry, { mono: true });

    // Human rating thumbs / slider in center
    paint(ctx, rrPts(cx - 60, flameY - 40, 120, 80, 12, 1), { wash: PAL.cream, ink: PAL.ink, sw: 1.4 });
    letter(ctx, 'HUMAN FEEDBACK', cx, flameY - 15, 10, PAL.ink, { mono: true, ink: false });
    letter(ctx, '👍  /  👎', cx, flameY + 18, 22, OA.emeraldDk, { ink: false });

    // Clean warm lantern light on right
    paint(ctx, rrPts(cx + 160, flameY - 50, 120, 100, 12, 1), { wash: OA.emerald, ink: PAL.ink, sw: 1.5 });
    letter(ctx, 'ALIGNED AI', cx + 220, flameY - 15, 12, PAL.cream, { mono: true, stroke: true });
    letter(ctx, 'Helpful · Honest · Harmless', cx + 220, flameY + 15, 9.5, OA.emeraldLt, { ink: false });

    letter(ctx, 'A 1.3B aligned model beat 175B raw GPT-3 for human preference.', cx, 490, 17, OA.emeraldDk, { pop: seg(lt, 3.5, 4.8) });
  }
}

// ------------------------------------------------------------------ ACT 5: THE NOVEMBER SPARK
function act5(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot } = rc;
  const cx = W / 2, lt = t - shot.startTime;

  if (shot.id === 'oa5-1') {
    // November 30 research preview launch
    paper(ctx, W, H, '#0B0F19');
    letter(ctx, 'NOVEMBER 30, 2022 · 1:00 PM PST', cx, 68, 26, OA.emeraldLt, { mono: true, pop: seg(lt, 0.15, 0.8) });

    // Minimal ChatGPT interface card
    chatInterface(ctx, cx - 360, 110, 720, 360, {
      t,
      prompt: 'Write a sonnet explaining the theory of general relativity.',
      response: 'Curved spacetime bends the path where light must flee,\nA cosmic fabric draped in starry grace;\nMass tells the void how curve and fold shall be,\nWhile space commands the matter to its place...',
      streaming: lt > 1.8
    });

    letter(ctx, 'No advertising. No press tour. Just a quiet tweet.', cx, 510, 18, PAL.cream, { pop: seg(lt, 3.6, 5.0) });
  }

  else if (shot.id === 'oa5-2') {
    // 100M users speedrun
    paper(ctx, W, H, '#110E1A');
    letter(ctx, 'THE FASTEST CONSUMER ADOPTION IN HISTORY', cx, 74, 28, OA.strawberry, { stroke: true, pop: seg(lt, 0.15, 0.8) });

    // Odometer counter spinning up
    const odoK = seg(lt, 0.5, 4.5);
    const usersM = Math.floor(odoK * 100);

    paint(ctx, rrPts(cx - 240, 160, 480, 140, 18, 1.4), { wash: '#0D0914', ink: OA.strawberry, sw: 2.2 });
    letter(ctx, `${usersM},000,000`, cx, 235, 52, OA.strawberry, { mono: true, stroke: true });
    letter(ctx, 'MONTHLY ACTIVE USERS IN 60 DAYS', cx, 280, 13, PAL.cream, { mono: true });

    // Benchmark comparison bars below
    const comps = [
      { name: 'Netflix', time: '3.5 yrs', w: 260 },
      { name: 'Instagram', time: '2.5 mos', w: 120 },
      { name: 'ChatGPT', time: '5 days', w: 30, highlight: true }
    ];
    comps.forEach((c, idx) => {
      const y = 350 + idx * 36;
      letter(ctx, c.name, cx - 180, y + 10, 11, '#94A3B8', { mono: true, align: 'right' });
      paint(ctx, rrPts(cx - 160, y, c.w, 18, 4, 0), { wash: c.highlight ? OA.emerald : '#334155', ink: null });
      letter(ctx, c.time, cx - 140 + c.w, y + 10, 10, c.highlight ? OA.emeraldLt : '#94A3B8', { mono: true, align: 'left' });
    });

    letter(ctx, 'The servers were overheating around the world.', cx, 500, 18, PAL.cream, { pop: seg(lt, 3.8, 5.0) });
  }

  else if (shot.id === 'oa5-3') {
    // GPT-4 napkin sketch to interactive code
    paper(ctx, W, H, '#D6E2DC');
    letter(ctx, 'MARCH 2023 · GPT-4 MULTIMODAL', cx, 74, 30, PAL.ink, { pop: seg(lt, 0.15, 0.8) });

    // Left: Napkin sketch
    paint(ctx, rrPts(cx - 360, 140, 320, 260, 14, 1.4), { wash: '#FDF6E2', ink: PAL.ink, sw: 1.6 });
    letter(ctx, 'NAPKIN SKETCH', cx - 200, 175, 12, '#78350F', { mono: true });
    inkLine(ctx, [[cx - 320, 220], [cx - 80, 220]], 2, PAL.ink, 0.2);
    inkLine(ctx, [[cx - 320, 260], [cx - 200, 260]], 2, PAL.ink, 0.2);
    paint(ctx, rrPts(cx - 320, 300, 80, 30, 6, 0.5), { wash: '#CBD5E1', ink: PAL.ink, sw: 1 });
    letter(ctx, '[ Button ]', cx - 280, 315, 10, PAL.ink, { mono: true });

    // Right: Working rendered app
    const morphK = seg(lt, 1.5, 3.8);
    ctx.save();
    ctx.globalAlpha = morphK;
    paint(ctx, rrPts(cx + 40, 140, 320, 260, 14, 1.4), { wash: '#0F172A', ink: OA.emerald, sw: 2 });
    letter(ctx, 'LIVE GENERATED APP', cx + 200, 175, 12, OA.emeraldLt, { mono: true, stroke: true });
    paint(ctx, rrPts(cx + 80, 240, 240, 44, 8, 0.5), { wash: OA.emerald, ink: null });
    letter(ctx, 'Joke Generator Active', cx + 200, 262, 13, '#0B291E', { mono: true, stroke: true });
    ctx.restore();

    letter(ctx, '90th percentile Uniform Bar Exam  ·  99th percentile Biology Olympiad', cx, 470, 14, OA.emeraldDk, { mono: true, pop: seg(lt, 2.8, 3.8) });
    letter(ctx, 'It doesn’t just predict words. It perceives structure.', cx, 510, 18, PAL.ink, { pop: seg(lt, 3.8, 5.0) });
  }

  else {
    // Congressional hearing & Capitol Hill
    paper(ctx, W, H, '#DCD6CB');
    letter(ctx, 'MAY 2023 · CAPITOL HILL TESTIMONY', cx, 74, 28, PAL.ink, { pop: seg(lt, 0.15, 0.8) });

    // Senate hearing witness table
    paint(ctx, rrPts(cx - 260, 340, 520, 120, 14, 1.5), { wash: '#451A03', ink: PAL.ink, sw: 1.8 });
    // Witness microphones
    for (const mx of [-80, 80]) {
      inkLine(ctx, [[cx + mx, 340], [cx + mx, 280]], 2, PAL.ink, 0);
      paint(ctx, ellPts(cx + mx, 276, 5, 8, 8, 0), { wash: '#1E293B', ink: null });
    }

    // Sam Altman sitting at the table
    paint(ctx, ellPts(cx, 220, 18, 22, 14, 0), { wash: '#F0B894', ink: PAL.ink, sw: 1.2 });
    paint(ctx, rrPts(cx - 30, 242, 60, 80, 10, 0.8), { wash: '#1E293B', ink: PAL.ink, sw: 1.3 });

    // Quote banner
    paint(ctx, rrPts(cx - 320, 110, 640, 60, 10, 1), { wash: '#0F172A', ink: OA.strawberry, sw: 1.6 });
    letter(ctx, '“If this technology goes wrong, it can go quite wrong.”', cx, 140, 17, PAL.cream, { stroke: true, pop: seg(lt, 1.2, 2.5) });

    letter(ctx, 'The question had moved from science to global destiny.', cx, 510, 18, PAL.ink, { pop: seg(lt, 3.6, 4.8) });
  }
}

// ------------------------------------------------------------------ ACT 6: FIVE DAYS IN NOVEMBER
function act6(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot } = rc;
  const cx = W / 2, lt = t - shot.startTime;

  if (shot.id === 'oa6-1') {
    // Friday Google Meet firing
    paper(ctx, W, H, '#140D12');
    letter(ctx, 'FRIDAY · NOVEMBER 17, 2023 · 12:00 PM', cx, 74, 26, OA.strawberry, { mono: true, stroke: true, pop: seg(lt, 0.15, 0.8) });

    // Laptop with Google Meet screen
    paint(ctx, rrPts(cx - 240, 140, 480, 260, 14, 1.2), { wash: '#0A0609', ink: OA.strawberry, sw: 2 });

    // Sam Altman on the call looking stunned
    samAltman(ctx, cx, 360, 9.5, {
      t,
      mood: 'shocked',
      talk: speaking && shot.speaker === 'Sam',
      talkT: t
    });

    if (lt > 2.2) {
      paint(ctx, rrPts(cx - 160, 210, 320, 70, 8, 1), { wash: '#7F1D1D', ink: '#EF4444', sw: 1.5 });
      letter(ctx, 'CALL TERMINATED BY BOARD', cx, 245, 16, PAL.cream, { mono: true, bold: true });
    }

    // Press release notification
    if (lt > 2.8) {
      paint(ctx, rrPts(cx - 280, 390, 560, 50, 10, 1), { wash: '#1F1218', ink: OA.strawberry, sw: 1.4 });
      letter(ctx, '“OpenAI announces leadership transition: Sam Altman departs.”', cx, 420, 13, PAL.cream, { stroke: true, pop: seg(lt, 2.8, 3.5) });
    }

    letter(ctx, 'The non-profit board detonated the tech world in a single afternoon.', cx, 510, 18, OA.strawberry, { pop: seg(lt, 3.5, 4.8) });
  }

  else if (shot.id === 'oa6-2') {
    // Brockman quits & Microsoft offer
    paper(ctx, W, H, '#0B1528');
    letter(ctx, 'THE WEEKEND · RESIGNATIONS & SANCTUARY', cx, 74, 26, OA.azureLt, { pop: seg(lt, 0.15, 0.8) });

    // Left: Greg Brockman resigns
    paint(ctx, rrPts(cx - 360, 140, 320, 260, 12, 1), { wash: '#111827', ink: OA.strawberry, sw: 1.4 });
    letter(ctx, 'GREG BROCKMAN TWEET', cx - 200, 175, 11, '#94A3B8', { mono: true });
    letter(ctx, '“I quit. After learning today’s news,', cx - 340, 220, 12, '#F1F5F9', { align: 'left', ink: false });
    letter(ctx, 'I am stepping down as President.”', cx - 340, 245, 12, '#F1F5F9', { align: 'left', ink: false });

    // Right: Satya Nadella's Microsoft offer
    paint(ctx, rrPts(cx + 40, 140, 320, 260, 12, 1), { wash: '#0D2137', ink: OA.azure, sw: 1.6 });
    letter(ctx, 'MICROSOFT REDMOND', cx + 200, 175, 11, OA.azureLt, { mono: true });
    letter(ctx, '“Sam & Greg to lead new advanced', cx + 60, 220, 12, PAL.cream, { align: 'left', ink: false });
    letter(ctx, 'AI research team at Microsoft.”', cx + 60, 245, 12, PAL.cream, { align: 'left', ink: false });

    letter(ctx, 'Within 48 hours, the company was hollowed out.', cx, 490, 18, PAL.cream, { pop: seg(lt, 3.2, 4.8) });
  }

  else if (shot.id === 'oa6-3') {
    // 700 employee signatures petition
    paper(ctx, W, H, '#160E14');
    letter(ctx, 'MONDAY 2:00 AM · THE MUTINY OF 700', cx, 74, 28, OA.strawberry, { stroke: true, pop: seg(lt, 0.15, 0.8) });

    // Giant scrolling petition sheet
    paint(ctx, rrPts(cx - 280, 130, 560, 300, 14, 1.4), { wash: PAL.cream, ink: PAL.ink, sw: 1.8 });
    letter(ctx, 'OPENAI IS NOTHING WITHOUT ITS PEOPLE', cx, 168, 16, '#991B1B', { mono: true, stroke: true });
    letter(ctx, '“We, the undersigned, will immediately resign and join Microsoft', cx, 202, 11.5, PAL.ink, { ink: false });
    letter(ctx, 'unless the entire board resigns and reinstates Sam Altman.”', cx, 222, 11.5, PAL.ink, { ink: false });

    // Signatures grid
    const sigNames = ['Ilya Sutskever', 'Mira Murati', 'Brad Lightcap', 'Jason Kwon', '743 / 770 Employees (96%)'];
    sigNames.forEach((s, idx) => {
      letter(ctx, `✓ ${s}`, cx - 180 + (idx % 2) * 220, 270 + Math.floor(idx / 2) * 36, 13, idx === 4 ? OA.strawberry : OA.emeraldDk, { mono: true, stroke: idx === 4 });
    });

    // The crowd of 738 employees holding phone lights behind Sam!
    employeeCrowd(ctx, cx, G, t);

    // Sam Altman standing in front, determined
    samAltman(ctx, cx, G - 10, 10.0, {
      t,
      mood: 'determined',
      gesture: 'arms_open',
      talk: speaking && shot.speaker === 'Sam',
      talkT: t
    });

    letter(ctx, 'Ilya Sutskever publicly tweeted his deep regret.', cx, 500, 17, PAL.cream, { pop: seg(lt, 3.5, 4.8) });
  }

  else {
    // Tuesday night return and rebirth
    paper(ctx, W, H, '#D4E2D8');
    ground(ctx, W, G, '#1E293B');

    letter(ctx, 'TUESDAY 3:00 AM · THE RETURN', cx, 74, 30, OA.emeraldDk, { stroke: true, pop: seg(lt, 0.15, 0.8) });

    // Glass entrance of Pioneer building with cheering silhouettes
    paint(ctx, rrPts(cx - 300, 140, 600, 340, 16, 1.6), { wash: '#0F172A', ink: PAL.ink, sw: 2 });
    paint(ctx, rectPts(cx - 80, 240, 160, 240, 1), { wash: '#1E293B', ink: OA.emerald, sw: 1.8 });

    // Sam Altman walking through the doors at 3 AM holding his guest pass badge!
    samAltman(ctx, cx, G, 11.0, {
      t,
      mood: 'victorious',
      gesture: 'badge',
      talk: speaking && shot.speaker === 'Sam',
      talkT: t
    });

    bloom(ctx, cx + 180, 280, 42, { t, face: 'happy', glowCol: OA.emeraldLt });

    letter(ctx, 'Board reconstituted  ·  Founders restored  ·  Company galvanized', cx, 510, 17, OA.emeraldDk, { mono: true, pop: seg(lt, 3.2, 4.8) });
  }
}

// ------------------------------------------------------------------ ACT 7: THE THINKING MACHINE & BEYOND
function act7(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot } = rc;
  const cx = W / 2, lt = t - shot.startTime;

  if (shot.id === 'oa7-1') {
    // Project Strawberry o1 reasoning tree
    paper(ctx, W, H, '#160D14');
    reasoningTree(ctx, cx - 360, 70, 720, 360, t, seg(lt, 0.5, 5.0));
    letter(ctx, 'The model no longer just predicts the next token. It verifies, plans, and thinks.', cx, 510, 17, OA.strawberry, { pop: seg(lt, 3.6, 5.0) });
  }

  else if (shot.id === 'oa7-2') {
    // Sora video worlds & the data wall
    paper(ctx, W, H, '#0B1120');
    letter(ctx, 'SORA & THE SYNTHETIC BOUNDARY (2024)', cx, 74, 28, OA.azureLt, { stroke: true, pop: seg(lt, 0.15, 0.8) });

    // Floating photorealistic video panels
    const vids = [
      { x: cx - 320, y: 140, w: 200, h: 140, title: 'Neon Tokyo in the Snow' },
      { x: cx - 100, y: 140, w: 200, h: 140, title: 'Woolly Mammoth Herd' },
      { x: cx + 120, y: 140, w: 200, h: 140, title: 'California Gold Rush 1849' }
    ];

    vids.forEach((v) => {
      paint(ctx, rrPts(v.x, v.y, v.w, v.h, 12, 1), { wash: '#1E293B', ink: OA.azure, sw: 1.5 });
      letter(ctx, v.title, v.x + v.w / 2, v.y + v.h / 2, 10.5, PAL.cream, { mono: true, ink: false });
    });

    // The data wall gauge
    paint(ctx, rrPts(cx - 240, 320, 480, 60, 10, 1), { wash: '#111827', ink: OA.strawberry, sw: 1.4 });
    letter(ctx, 'HUMAN TEXT DATA SUPPLY: 100% EXHAUSTED', cx, 354, 13, OA.strawberry, { mono: true, stroke: true });

    letter(ctx, 'Pre-training on human text had run its course. Self-play reasoning was the new frontier.', cx, 500, 17, PAL.cream, { pop: seg(lt, 3.5, 4.8) });
  }

  else if (shot.id === 'oa7-3') {
    // Project Stargate desert supercluster
    paper(ctx, W, H, '#0B0D18');
    stargateComplex(ctx, W, H, t);
    letter(ctx, 'Turning the energy of nations into thought.', cx, 530, 20, OA.emeraldLt, { stroke: true, pop: seg(lt, 3.0, 4.6) });
  }

  else {
    // The awakened dawn & human future
    paper(ctx, W, H, '#0A131F');

    // Earth globe with emerald lattice constellation
    const earthY = 460;
    paint(ctx, ellPts(cx, earthY, 220, 220, 28, 0), { wash: '#0D2847', ink: OA.emeraldLt, sw: 2 });
    // Continents
    paint(ctx, ellPts(cx - 60, earthY - 40, 80, 50, 14, 2), { wash: '#1E3A5F', ink: null });
    paint(ctx, ellPts(cx + 80, earthY + 20, 90, 60, 14, 2), { wash: '#1E3A5F', ink: null });

    // The OpenAI Bloom ascending into the sky
    const bloomY = 220 + Math.sin(t * 1.5) * 14;
    bloom(ctx, cx, bloomY, 54, {
      t,
      glow: true,
      glowCol: OA.emeraldLt,
      complexity: 1,
      face: 'happy'
    });

    // Constellation lines linking Bloom to Earth
    for (let i = -4; i <= 4; i++) {
      const ex = cx + i * 40;
      inkLine(ctx, [[cx, bloomY + 40], [ex, earthY - 180]], 1.5, OA.emeraldLt, 0.3);
    }

    letter(ctx, 'TO BENEFIT ALL OF HUMANITY', cx, 84, 32, PAL.cream, { stroke: true, pop: seg(lt, 0.5, 1.8) });
    letter(ctx, 'Ten years from a hotel dinner in the rain. The machine has awakened.', cx, 510, 18, OA.emeraldLt, { pop: seg(lt, 2.5, 4.0) });
  }
}
