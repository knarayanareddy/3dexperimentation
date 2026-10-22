import { RenderContext } from '../../types/video';
import {
  PAL, paper, ground, blob, paint, inkLine, rectPts, ellPts, rrPts, polyPts, starPts,
  letter, sfx, kf, wob, seg, frac, hash, mixCol, arrow, TAU
} from '../painter';
import { clawd, researcher, typewriter } from '../characters';

const G = 600; // ground line

// ---------- shared painted props ----------
function chalkboard(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  paint(ctx, rectPts(x - w / 2 - 10, y - h / 2 - 10, w + 20, h + 20, 2), { wash: PAL.clayDk, ink: PAL.ink, sw: 2 });
  paint(ctx, rectPts(x - w / 2, y - h / 2, w, h, 2), { fill: '#2A3A33', fillOp: 250, bleed: 0.05, tex: 0.6, border: 0.4, ink: null });
}

function card(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, col = PAL.cream) {
  paint(ctx, rrPts(x - w / 2, y - h / 2, w, h, 10, 1.6), { wash: col, ink: PAL.ink, sw: 1.5 });
}

function snowfall(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, n = 70) {
  for (let i = 0; i < n; i++) {
    const sx = (hash(i * 3.1) * W + t * (8 + hash(i) * 22)) % W;
    const sy = (hash(i * 7.7) * H + t * (16 + hash(i * 2) * 34)) % H;
    const r = 1.4 + hash(i * 5.5) * 2.6;
    paint(ctx, ellPts(sx, sy, r, r, 7, 0.4), { wash: PAL.cream, washOp: 150 + hash(i * 9) * 90, ink: null });
  }
}

function barChart(
  ctx: CanvasRenderingContext2D, x: number, y: number,
  rows: Array<[string, number, string]>, maxV: number, k: number, w = 300
) {
  rows.forEach((r, i) => {
    const [lab, v, col] = r;
    const by = y + i * 34;
    letter(ctx, lab, x - 52, by, 15, PAL.ink, { mono: true, align: 'right', ink: false });
    const bw = (v / maxV) * w * Math.min(1, Math.max(0, k * 1.4 - i * 0.18));
    paint(ctx, rectPts(x - 38, by - 11, Math.max(2, bw), 22, 0.8), { wash: col, ink: PAL.ink, sw: 1 });
    if (bw > 30) letter(ctx, `${v}%`, x - 38 + bw + 26, by, 14, PAL.ink, { mono: true, ink: false, alpha: 0.9 });
  });
}

// =====================================================================
export function renderEvolution(n: number, rc: RenderContext) {
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

// ---------------------------------------------------------------- ACT 1
function act1(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2, lt = t - shot.startTime;
  paper(ctx, W, H, '#DCE6E2');
  blob(ctx, W * 0.18, H * 0.25, 190, PAL.teal, { alpha: 0.13, seed: 1 });
  blob(ctx, W * 0.84, H * 0.7, 210, PAL.sky, { alpha: 0.12, seed: 2 });
  ground(ctx, W, G + 8, PAL.teal);
  const talkC = speaking && shot.speaker === 'Clawd';
  const talkE = speaking && shot.speaker === 'Engineer';

  if (shot.id === 'ev1-1') {
    letter(ctx, 'ENGLAND, 1950', cx, 74, 30, PAL.teal, { pop: seg(lt, 0.1, 0.7) });
    chalkboard(ctx, cx - 40, 300, 560, 220);
    letter(ctx, 'CAN MACHINES THINK?', cx - 40, 262, 40, PAL.cream, { pop: seg(lt, 0.6, 1.4) });
    // struck through
    const strike = seg(lt, 2.4, 3.2);
    if (strike > 0) inkLine(ctx, [[cx - 300, 266], [cx - 300 + 520 * strike, 258]], 4, PAL.rose, 0.2);
    letter(ctx, 'too meaningless to deserve discussion', cx - 40, 330, 19, mixCol(PAL.cream, PAL.teal, 0.4), { ink: false, alpha: seg(lt, 3.2, 4.2) });
    letter(ctx, '…so: play a game instead', cx - 40, 372, 22, PAL.ochre, { pop: seg(lt, 4.4, 5.4) });
    researcher(ctx, cx + 350, G, 10.5, { t, prop: 'pointer', eyes: 'normal', mouth: speaking ? 'talk' : 'smile', talkT: t });
    clawd(ctx, cx - 420, G, 15, { t, eyes: 'look', lookX: 0.8, lookY: -0.5, mouth: 'o', emote: '?', emoteK: seg(lt, 1.5, 2.3), seed: 1 });
  } else if (shot.id === 'ev1-2') {
    letter(ctx, 'THE IMITATION GAME', cx, 74, 34, PAL.ink, { pop: seg(lt, 0.1, 0.7) });
    // two booths
    [[-200, 'A'], [120, 'B']].forEach(([bx, lab], i) => {
      const x = cx + (bx as number);
      paint(ctx, rectPts(x - 10, 190, 170, 250, 2), { wash: mixCol(PAL.cream, PAL.night, 0.1), ink: PAL.ink, sw: 1.8 });
      // curtain
      paint(ctx, rectPts(x - 4, 200, 158, 180, 2), { fill: PAL.rose, fillOp: 210, bleed: 0.08, tex: 0.6, ink: PAL.ink, sw: 1.2 });
      for (let f = 0; f < 5; f++) inkLine(ctx, [[x + 10 + f * 32, 202], [x + 6 + f * 32, 378]], 1.6, mixCol(PAL.rose, PAL.ink, 0.5), 0.2);
      letter(ctx, lab as string, x + 75, 416, 26, PAL.ink, { pop: seg(lt, 0.5 + i * 0.3, 1.1 + i * 0.3) });
    });
    // occupants
    researcher(ctx, cx - 125, 372, 6.4, { t, eyes: 'normal', mouth: 'smile' });
    clawd(ctx, cx + 200, 374, 10.5, { t, eyes: 'wink', mouth: talkC ? 'talk' : 'cat', talkT: t, seed: 3 });
    // tape to judge
    inkLine(ctx, [[cx - 115, 440], [cx - 40, 520], [cx + 40, 528]], 2, PAL.ink, 0.5);
    inkLine(ctx, [[cx + 205, 440], [cx + 120, 520], [cx + 46, 528]], 2, PAL.ink, 0.5);
    card(ctx, cx + 150, 540, 240, 54);
    letter(ctx, 'which one is the human?', cx + 150, 540, 16, PAL.ink, { ink: false });
    researcher(ctx, cx - 330, G, 10, { t, eyes: 'wide', mouth: 'flat', lookX: 0.6 });
    letter(ctx, 'judge by behaviour, not by mechanism', cx, 150, 17, PAL.teal, { pop: seg(lt, 3, 4) });
  } else if (shot.id === 'ev1-3') {
    letter(ctx, 'DARTMOUTH COLLEGE · SUMMER 1956', cx, 74, 28, PAL.ink, { pop: seg(lt, 0.1, 0.8) });
    // summer house
    paint(ctx, [[cx - 230, 330], [cx, 210], [cx + 230, 330]], { wash: PAL.clayDk, ink: PAL.ink, sw: 1.8 });
    paint(ctx, rectPts(cx - 200, 330, 400, 140, 2), { wash: PAL.cream, ink: PAL.ink, sw: 1.8 });
    for (const wx of [-130, -40, 50, 140]) paint(ctx, rectPts(cx + wx, 360, 54, 54, 1), { fill: PAL.ochre, fillOp: 150, bleed: 0.15, ink: PAL.ink, sw: 1.1 });
    // ten chairs in an arc
    for (let i = 0; i < 10; i++) {
      const a = Math.PI * (0.12 + i / 9 * 0.76);
      const chx = cx + Math.cos(a) * 330, chy = 540 + Math.sin(a) * 52;
      const pop = seg(lt, 0.8 + i * 0.13, 1.2 + i * 0.13);
      if (pop <= 0) continue;
      ctx.save(); ctx.translate(chx, chy); ctx.scale(pop, pop);
      paint(ctx, rectPts(-11, -26, 22, 26, 0.6), { wash: PAL.clay, ink: PAL.ink, sw: 1 });
      paint(ctx, rectPts(-11, -2, 22, 5, 0.4), { wash: PAL.clayDk, ink: null });
      ctx.restore();
    }
    letter(ctx, '"a 2 month, 10 man study of artificial intelligence"', cx, 500, 19, PAL.ink, { pop: seg(lt, 2.6, 3.6), alpha: 0.9 });
    letter(ctx, 'the field gets its name', cx, 150, 22, PAL.teal, { pop: seg(lt, 4, 5) });
  } else {
    letter(ctx, 'THE PERCEPTRON · 1958', cx, 74, 32, PAL.ink, { pop: seg(lt, 0.1, 0.7) });
    const mx = cx - 110;
    paint(ctx, rrPts(mx - 190, 190, 380, 290, 12, 2), { wash: mixCol(PAL.cream, PAL.night, 0.12), ink: PAL.ink, sw: 2 });
    // photocell grid
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
      const on = hash(r * 4 + c + Math.floor(lt * 2)) > 0.45;
      paint(ctx, ellPts(mx - 140 + c * 42, 232 + r * 36, 13, 13, 10, 0.6), { wash: on ? PAL.ochre : mixCol(PAL.cream, PAL.ink, 0.25), ink: PAL.ink, sw: 1 });
    }
    // weight dials turning themselves
    for (let i = 0; i < 3; i++) {
      const dx = mx + 60 + i * 56, dy = 300;
      paint(ctx, ellPts(dx, dy, 22, 22, 14, 0.8), { wash: PAL.cream, ink: PAL.ink, sw: 1.4 });
      const ang = lt * (1.1 + i * 0.5) + i;
      inkLine(ctx, [[dx, dy], [dx + Math.cos(ang) * 15, dy + Math.sin(ang) * 15]], 2.4, PAL.rose, 0);
      letter(ctx, `w${i + 1}`, dx, dy + 36, 13, PAL.ink, { mono: true, ink: false, alpha: 0.85 });
    }
    // output lamp
    const fire = Math.sin(lt * 3) > 0.2;
    blob(ctx, mx + 150, 420, fire ? 44 : 20, PAL.ochre, { alpha: fire ? 0.6 : 0.2, seed: 9 });
    paint(ctx, ellPts(mx + 150, 420, 20, 20, 14, 0.7), { wash: fire ? PAL.ochre : mixCol(PAL.cream, PAL.ink, 0.2), ink: PAL.ink, sw: 1.3 });
    card(ctx, cx + 330, 300, 280, 110);
    letter(ctx, 'wᵢ ← wᵢ + η(y − ŷ)xᵢ', cx + 330, 280, 19, PAL.teal, { mono: true, ink: false });
    letter(ctx, 'it corrects itself', cx + 330, 318, 17, PAL.ink, { ink: false, alpha: 0.85 });
    sfx(ctx, 'IT LEARNS!', cx + 330, 200, 30, PAL.rose, lt - 3, { life: 3 });
    clawd(ctx, cx + 330, G, 16, { t, eyes: 'spark', mouth: talkE ? 'talk' : 'grin', talkT: t, emote: 'spark', emoteK: seg(lt, 3, 4), seed: 4 });
  }
}

// ---------------------------------------------------------------- ACT 2
function act2(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2, lt = t - shot.startTime;
  paper(ctx, W, H, '#E2DCEA');
  blob(ctx, W * 0.8, H * 0.25, 200, PAL.violet, { alpha: 0.14, seed: 11 });
  ground(ctx, W, G + 8, PAL.violet);
  const talkC = speaking && shot.speaker === 'Clawd';

  if (shot.id === 'ev2-1') {
    letter(ctx, 'ELIZA · 1966', cx, 74, 32, PAL.ink, { pop: seg(lt, 0.1, 0.7) });
    typewriter(ctx, cx - 150, 500, 2.6, t, '');
    // printed dialogue
    card(ctx, cx + 250, 300, 420, 230);
    const lines = [
      ['> men are all alike', PAL.ink],
      ['IN WHAT WAY?', PAL.violet],
      ['> they are always bugging us', PAL.ink],
      ['CAN YOU THINK OF A', PAL.violet],
      ['SPECIFIC EXAMPLE?', PAL.violet]
    ];
    lines.forEach((l, i) => {
      const pop = seg(lt, 0.5 + i * 0.6, 0.9 + i * 0.6);
      if (pop > 0) letter(ctx, l[0] as string, cx + 60, 220 + i * 38, 15, l[1] as string, { mono: true, align: 'left', ink: false, alpha: pop });
    });
    letter(ctx, '~200 pattern rules. no understanding.', cx + 250, 436, 15, PAL.ink, { ink: false, alpha: 0.8 });
    researcher(ctx, cx - 400, G, 10, { t, eyes: 'wide', mouth: 'o', lookX: 0.7 });
  } else if (shot.id === 'ev2-2') {
    letter(ctx, 'EXPERT SYSTEMS', cx, 74, 34, PAL.ink, { pop: seg(lt, 0.1, 0.7) });
    // wall of rule cards
    for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) {
      const i = r * 6 + c;
      const pop = seg(lt, 0.3 + i * 0.07, 0.6 + i * 0.07);
      if (pop <= 0) continue;
      const x = cx - 330 + c * 118, y = 200 + r * 80;
      ctx.save(); ctx.translate(x, y); ctx.rotate((hash(i) - 0.5) * 0.09); ctx.scale(pop, pop);
      paint(ctx, rectPts(-52, -32, 104, 64, 1.2), { wash: PAL.cream, ink: PAL.ink, sw: 1.2 });
      letter(ctx, 'IF', -34, -12, 13, PAL.violet, { mono: true, ink: false });
      inkLine(ctx, [[-30, -4], [36, -4]], 1, mixCol(PAL.cream, PAL.ink, 0.5), 0);
      letter(ctx, 'THEN', -22, 14, 13, PAL.teal, { mono: true, ink: false });
      inkLine(ctx, [[2, 20], [38, 20]], 1, mixCol(PAL.cream, PAL.ink, 0.5), 0);
      ctx.restore();
    }
    card(ctx, cx, 530, 520, 58);
    letter(ctx, 'MYCIN 1976 · diagnosed infections better than doctors', cx, 530, 17, PAL.ink, { ink: false });
    clawd(ctx, cx + 430, G - 30, 14, { t, eyes: 'happy', mouth: talkC ? 'talk' : 'grin', talkT: t, aR: 1.2, seed: 12 });
  } else if (shot.id === 'ev2-3') {
    letter(ctx, 'EVERY EXCEPTION NEEDS ANOTHER RULE', cx, 74, 27, PAL.ink, { pop: seg(lt, 0.1, 0.8) });
    const tilt = kf(lt, [[0, 0], [3.2, 0.03], [5.4, 0.22]], v => v);
    ctx.save(); ctx.translate(cx, 520); ctx.rotate(tilt); ctx.translate(-cx, -520);
    for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) {
      const i = r * 7 + c;
      const x = cx - 350 + c * 105, y = 200 + r * 72;
      ctx.save(); ctx.translate(x, y); ctx.rotate((hash(i * 3) - 0.5) * 0.2);
      paint(ctx, rectPts(-44, -27, 88, 54, 1.4), { wash: PAL.cream, ink: PAL.ink, sw: 1.1 });
      letter(ctx, 'IF…', 0, 0, 12, mixCol(PAL.ink, PAL.cream, 0.3), { mono: true, ink: false });
      ctx.restore();
    }
    // tangled string
    for (let i = 0; i < 8; i++) {
      const a: [number, number] = [cx - 300 + hash(i) * 600, 210 + hash(i * 3) * 300];
      const b: [number, number] = [cx - 300 + hash(i * 7) * 600, 210 + hash(i * 11) * 300];
      inkLine(ctx, [a, [(a[0] + b[0]) / 2 + 40, (a[1] + b[1]) / 2 - 30], b], 1.4, PAL.rose, 0.6);
    }
    ctx.restore();
    sfx(ctx, 'CRASH!', cx + 240, 230, 38, PAL.rose, lt - 4.6, { life: 2.4 });
    clawd(ctx, cx - 420, G, 15, { t, eyes: 'scared', mouth: 'wobble', emote: 'sweat', aL: 1.2, aR: 1.2, seed: 13 });
  } else {
    letter(ctx, 'THE LIGHTHILL REPORT · 1973', cx, 74, 30, PAL.ink, { pop: seg(lt, 0.1, 0.7) });
    // report + stamp
    const slam = kf(lt, [[0.6, -200], [1.1, 0], [1.3, -14], [1.5, 0]], v => v);
    ctx.save(); ctx.translate(cx - 180, 320 + slam);
    paint(ctx, rectPts(-140, -100, 280, 200, 2), { wash: PAL.cream, ink: PAL.ink, sw: 1.8 });
    for (let i = 0; i < 6; i++) inkLine(ctx, [[-110, -66 + i * 24], [110 - (i % 3) * 40, -66 + i * 24]], 1.4, mixCol(PAL.cream, PAL.ink, 0.55), 0.1);
    ctx.restore();
    const stampK = seg(lt, 1.6, 2.1);
    if (stampK > 0) {
      ctx.save(); ctx.translate(cx - 150, 330); ctx.rotate(-0.22); ctx.scale(1 + (1 - stampK) * 1.6, 1 + (1 - stampK) * 1.6);
      ctx.globalAlpha = stampK;
      paint(ctx, rectPts(-118, -34, 236, 68, 2), { ink: PAL.rose, sw: 4 });
      letter(ctx, 'NOT DELIVERED', 0, 0, 26, PAL.rose, { ink: false });
      ctx.restore();
    }
    // funding tap closing
    const tx = cx + 300;
    paint(ctx, rectPts(tx - 26, 200, 52, 150, 1.4), { wash: PAL.ochre, ink: PAL.ink, sw: 1.6 });
    ctx.save(); ctx.translate(tx, 196); ctx.rotate(kf(lt, [[2.4, 0], [4.2, 1.5]], v => v));
    inkLine(ctx, [[-42, 0], [42, 0]], 7, PAL.clayDk, 0);
    ctx.restore();
    const flow = 1 - seg(lt, 2.4, 4.2);
    for (let i = 0; i < 5; i++) {
      if (hash(i + Math.floor(lt * 6)) > flow) continue;
      paint(ctx, ellPts(tx + wob(t + i, 2) * 5, 360 + frac(lt * 0.9 + i / 5) * 190, 7, 11, 10, 0.5), { wash: PAL.sap, ink: null });
    }
    letter(ctx, 'funding: withdrawn', tx, 580, 18, PAL.rose, { pop: seg(lt, 4.2, 5.2) });
  }
}

// ---------------------------------------------------------------- ACT 3
function act3(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2, lt = t - shot.startTime;
  paper(ctx, W, H, '#CFD8E8');
  ground(ctx, W, G + 8, PAL.indigo);
  const talkC = speaking && shot.speaker === 'Clawd';

  if (shot.id === 'ev3-1') {
    // buried lab
    paint(ctx, rectPts(cx - 260, 280, 520, 220, 2), { wash: mixCol(PAL.cream, PAL.indigo, 0.2), ink: PAL.ink, sw: 1.8 });
    paint(ctx, [[cx - 290, 280], [cx, 190], [cx + 290, 280]], { wash: PAL.indigo, ink: PAL.ink, sw: 1.8 });
    for (const wx of [-170, -60, 50, 160]) paint(ctx, rectPts(cx + wx, 330, 60, 60, 1), { fill: mixCol(PAL.sky, PAL.night, 0.45), fillOp: 190, bleed: 0.1, ink: PAL.ink, sw: 1.1 });
    // snow drift
    paint(ctx, ellPts(cx, 520, 420, 70, 26, 4), { wash: PAL.cream, ink: null });
    snowfall(ctx, W, H, t, 90);
    letter(ctx, 'THE FIRST WINTER · 1974', cx, 74, 32, PAL.indigo, { pop: seg(lt, 0.1, 0.7) });
    clawd(ctx, cx - 300, 540, 15, {
      t, col: mixCol(PAL.clay, PAL.sky, 0.45), dk: PAL.indigo, eyes: 'closed', mouth: 'flat',
      sq: 0.1 + wob(t, 3) * 0.03, emote: 'sweat', seed: 21
    });
    letter(ctx, 'grants renamed to avoid the words', cx + 120, 560, 17, PAL.indigo, { pop: seg(lt, 3, 4) });
  } else if (shot.id === 'ev3-2') {
    letter(ctx, 'PERCEPTRONS · 1969', cx, 74, 30, PAL.ink, { pop: seg(lt, 0.1, 0.7) });
    chalkboard(ctx, cx, 330, 520, 300);
    // XOR plot
    const ox = cx - 90, oy = 420, s = 150;
    inkLine(ctx, [[ox, oy], [ox + s, oy]], 2, PAL.cream, 0);
    inkLine(ctx, [[ox, oy], [ox, oy - s]], 2, PAL.cream, 0);
    const pts: Array<[number, number, number]> = [[0, 0, 0], [0, 1, 1], [1, 0, 1], [1, 1, 0]];
    pts.forEach(([px, py, lab], i) => {
      const X = ox + px * s, Y = oy - py * s;
      const pop = seg(lt, 0.6 + i * 0.25, 0.95 + i * 0.25);
      if (pop <= 0) return;
      if (lab) paint(ctx, ellPts(X, Y, 13 * pop, 13 * pop, 12, 0.6), { wash: PAL.ochre, ink: PAL.cream, sw: 1.4 });
      else paint(ctx, polyPts(X, Y, 14 * pop, 4, Math.PI / 4), { wash: PAL.rose, ink: PAL.cream, sw: 1.4 });
    });
    // a line that keeps failing
    const ang = Math.sin(lt * 0.9) * 0.9;
    const mxp = ox + s / 2, myp = oy - s / 2;
    inkLine(ctx, [[mxp - Math.cos(ang) * 140, myp - Math.sin(ang) * 140], [mxp + Math.cos(ang) * 140, myp + Math.sin(ang) * 140]], 3, PAL.sky, 0.1);
    letter(ctx, 'no straight line separates XOR', cx + 10, 540, 19, PAL.cream, { ink: false, alpha: 0.95 });
    sfx(ctx, 'nope', cx + 210, 300, 26, PAL.rose, frac(lt / 2.2) * 2.2, { life: 2.2 });
    clawd(ctx, cx + 430, G, 14, { t, eyes: 'narrow', mouth: talkC ? 'talk' : 'flat', talkT: t, seed: 22 });
  } else if (shot.id === 'ev3-3') {
    snowfall(ctx, W, H, t, 50);
    letter(ctx, 'BACKPROPAGATION · 1986', cx, 74, 30, PAL.ochre, { pop: seg(lt, 0.1, 0.7) });
    // warm room
    blob(ctx, cx, 340, 260, PAL.ochre, { alpha: 0.22, seed: 25 });
    paint(ctx, rrPts(cx - 290, 180, 580, 330, 14, 2), { wash: mixCol(PAL.cream, PAL.ochre, 0.22), ink: PAL.ink, sw: 2 });
    // network
    const cols = [3, 4, 4, 2];
    const nodes: Array<Array<[number, number]>> = [];
    cols.forEach((cnt, li) => {
      const arr: Array<[number, number]> = [];
      for (let i = 0; i < cnt; i++) {
        const x = cx - 200 + li * 133;
        const y = 250 + i * 62 + (4 - cnt) * 31;
        arr.push([x, y]);
      }
      nodes.push(arr);
    });
    for (let li = 0; li < nodes.length - 1; li++)
      for (const a of nodes[li]) for (const b of nodes[li + 1])
        inkLine(ctx, [a, b], 1, mixCol(PAL.cream, PAL.ink, 0.45), 0);
    nodes.forEach(col => col.forEach(([x, y]) => paint(ctx, ellPts(x, y, 15, 15, 12, 0.6), { wash: PAL.cream, ink: PAL.ink, sw: 1.3 })));
    // backward error arrows
    const bk = frac(lt / 2.2);
    for (let li = nodes.length - 1; li > 0; li--) {
      const k = 1 - (nodes.length - 1 - li) / nodes.length;
      if (bk > 1 - k - 0.25 && bk < 1 - k + 0.35) {
        for (const a of nodes[li]) for (const b of nodes[li - 1])
          inkLine(ctx, [a, b], 2.4, PAL.rose, 0);
      }
    }
    letter(ctx, '∂E/∂w = δ · a   — the chain rule, backwards', cx, 470, 19, PAL.ink, { ink: false, alpha: 0.9 });
    letter(ctx, 'the hidden layers organise themselves', cx, 556, 20, PAL.ochre, { pop: seg(lt, 3, 4) });
  } else {
    snowfall(ctx, W, H, t, 80);
    letter(ctx, 'THE SECOND WINTER · 1987', cx, 74, 30, PAL.indigo, { pop: seg(lt, 0.1, 0.7) });
    // buried machines
    for (let i = 0; i < 3; i++) {
      const x = cx - 230 + i * 210;
      paint(ctx, rectPts(x - 60, 330, 120, 150, 2), { wash: mixCol(PAL.cream, PAL.indigo, 0.35), ink: PAL.ink, sw: 1.6 });
      paint(ctx, rectPts(x - 42, 356, 84, 56, 1), { wash: mixCol(PAL.night, PAL.sky, 0.2), ink: PAL.ink, sw: 1 });
      paint(ctx, ellPts(x, 468, 76, 26, 18, 3), { wash: PAL.cream, ink: null });
    }
    paint(ctx, rectPts(-30, 470, W + 60, 70, 4), { wash: PAL.cream, ink: null });
    letter(ctx, 'Lisp machine market: $500M → 0', cx, 250, 20, PAL.indigo, { pop: seg(lt, 1, 2) });
    // the seed under the ice
    const sx = cx + 330, sy = 520;
    blob(ctx, sx, sy, 46 + wob(t, 1.1) * 6, PAL.ochre, { alpha: 0.55, seed: 28 });
    paint(ctx, starPts(sx, sy, 18, 0.45, 5, t * 0.6), { wash: PAL.ochre, ink: PAL.clayDk, sw: 1.2 });
    paint(ctx, ellPts(sx, sy, 62, 40, 18, 2), { fill: PAL.sky, fillOp: 70, bleed: 0.2, tex: 0.4, ink: PAL.cream, sw: 1.2 });
    letter(ctx, 'still warm, under the ice', sx, sy + 70, 16, PAL.ochre, { pop: seg(lt, 3.4, 4.4) });
  }
}

// ---------------------------------------------------------------- ACT 4
function act4(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2, lt = t - shot.startTime;
  paper(ctx, W, H, '#DFE6D2');
  blob(ctx, W * 0.2, H * 0.3, 200, PAL.sap, { alpha: 0.14, seed: 31 });
  ground(ctx, W, G + 8, PAL.sap);
  const talkC = speaking && shot.speaker === 'Clawd';
  const talkE = speaking && shot.speaker === 'Engineer';

  if (shot.id === 'ev4-1') {
    letter(ctx, 'STOP TELLING. START FITTING.', cx, 74, 32, PAL.ink, { pop: seg(lt, 0.1, 0.8) });
    const ox = cx - 250, oy = 480, w = 500, h = 260;
    inkLine(ctx, [[ox, oy], [ox + w, oy]], 2.4, PAL.ink, 0);
    inkLine(ctx, [[ox, oy], [ox, oy - h]], 2.4, PAL.ink, 0);
    // data points
    for (let i = 0; i < 26; i++) {
      const px = ox + 24 + hash(i * 3.1) * (w - 50);
      const k = (px - ox) / w;
      const py = oy - (40 + Math.sin(k * 3.4) * 80 + k * 110) + (hash(i * 7.7) - 0.5) * 48;
      const pop = seg(lt, 0.3 + i * 0.045, 0.6 + i * 0.045);
      if (pop <= 0) continue;
      paint(ctx, ellPts(px, py, 6 * pop, 6 * pop, 9, 0.4), { wash: PAL.clayDk, ink: null });
    }
    // fitted curve draws itself
    const draw = seg(lt, 2.6, 5.4);
    if (draw > 0) {
      const pts: Array<[number, number]> = [];
      for (let i = 0; i <= 40 * draw; i++) {
        const k = i / 40;
        pts.push([ox + 24 + k * (w - 50), oy - (40 + Math.sin(k * 3.4) * 80 + k * 110)]);
      }
      if (pts.length > 1) inkLine(ctx, pts, 3.4, PAL.sap, 0.5);
    }
    card(ctx, cx + 330, 250, 300, 96);
    letter(ctx, 'min Σ L(f(x),y) + λ‖f‖²', cx + 330, 232, 17, PAL.sap, { mono: true, ink: false });
    letter(ctx, 'fit — but stay simple', cx + 330, 266, 15, PAL.ink, { ink: false, alpha: 0.85 });
    researcher(ctx, cx + 350, G, 10, { t, prop: 'pointer', eyes: 'happy', mouth: speaking ? 'talk' : 'smile', talkT: t });
  } else if (shot.id === 'ev4-2') {
    letter(ctx, 'DEEP BLUE · 1997', cx, 74, 32, PAL.ink, { pop: seg(lt, 0.1, 0.7) });
    // board
    const bx = cx - 170, by = 250, sq = 42;
    for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++)
      paint(ctx, rectPts(bx + c * sq, by + r * sq, sq, sq, 0.5), { wash: (r + c) % 2 ? mixCol(PAL.cream, PAL.ink, 0.55) : PAL.cream, ink: null });
    paint(ctx, rectPts(bx, by, sq * 8, sq * 8, 1), { ink: PAL.ink, sw: 2 });
    // a few pieces
    for (const [pc, pr, col] of [[3, 7, PAL.cream], [4, 0, PAL.ink], [2, 5, PAL.cream], [5, 2, PAL.ink]] as Array<[number, number, string]>)
      paint(ctx, ellPts(bx + pc * sq + sq / 2, by + pr * sq + sq / 2, 14, 14, 12, 0.5), { wash: col, ink: PAL.ink, sw: 1.2 });
    // machine tower
    paint(ctx, rrPts(cx + 230, 200, 160, 330, 10, 2), { wash: PAL.night, ink: PAL.ink, sw: 2 });
    for (let i = 0; i < 7; i++) {
      paint(ctx, rectPts(cx + 244, 220 + i * 44, 132, 30, 0.8), { wash: mixCol(PAL.night, PAL.cream, 0.12), ink: null });
      paint(ctx, ellPts(cx + 360, 235 + i * 44, 4, 4, 8, 0.3), { wash: hash(i + Math.floor(lt * 8)) > 0.4 ? PAL.sap : PAL.teal, ink: null });
    }
    letter(ctx, '200,000,000', cx + 310, 566, 22, PAL.sap, { pop: seg(lt, 1.6, 2.4) });
    letter(ctx, 'positions / second', cx + 310, 592, 14, PAL.ink, { ink: false, alpha: 0.8 });
    // hesitating hand
    const hv = Math.sin(lt * 1.6) * 10;
    inkLine(ctx, [[cx - 140, 620], [cx - 90, 560 + hv], [cx - 40, 540 + hv]], 5, '#F2B18C', 0.5);
    letter(ctx, 'it understood nothing. it won anyway.', cx - 120, 160, 19, PAL.ink, { pop: seg(lt, 4, 5.4), alpha: 0.9 });
  } else if (shot.id === 'ev4-3') {
    letter(ctx, 'IMAGENET · 2009', cx, 74, 32, PAL.ink, { pop: seg(lt, 0.1, 0.7) });
    // flood of images stacking into a mountain
    const nImg = 90;
    for (let i = 0; i < nImg; i++) {
      const k = seg(lt, 0.2 + (i / nImg) * 3.4, 0.9 + (i / nImg) * 3.4);
      if (k <= 0) continue;
      const tx = cx - 300 + hash(i * 3.3) * 600;
      const ty = 560 - Math.pow(1 - Math.abs((tx - cx) / 320), 1.6) * 270 - hash(i * 7) * 26;
      const sx2 = -200 + hash(i * 5) * 100;
      const x = sx2 + (tx - sx2) * k, y = -40 + (ty + 40) * k;
      ctx.save(); ctx.translate(x, y); ctx.rotate((hash(i * 11) - 0.5) * 0.5 * (1 - k));
      paint(ctx, rectPts(-13, -10, 26, 20, 0.5), { wash: [PAL.sky, PAL.ochre, PAL.rose, PAL.sap, PAL.violet][i % 5], ink: PAL.ink, sw: 0.7 });
      ctx.restore();
    }
    card(ctx, cx + 330, 230, 290, 118);
    letter(ctx, '14,000,000 images', cx + 330, 202, 18, PAL.sap, { mono: true, ink: false });
    letter(ctx, '20,000 categories', cx + 330, 230, 16, PAL.ink, { mono: true, ink: false, alpha: 0.9 });
    letter(ctx, '49,000 labellers', cx + 330, 258, 16, PAL.ink, { mono: true, ink: false, alpha: 0.9 });
    letter(ctx, 'the bottleneck was never the algorithm', cx, 150, 19, PAL.sap, { pop: seg(lt, 4.4, 5.6) });
    clawd(ctx, cx - 400, G, 14, { t, eyes: 'spark', mouth: talkE ? 'talk' : 'o', talkT: t, seed: 34 });
  } else {
    letter(ctx, 'THE ACCIDENTAL HARDWARE', cx, 74, 32, PAL.ink, { pop: seg(lt, 0.1, 0.7) });
    // arcade -> rack
    const prog = seg(lt, 1.2, 3.4);
    paint(ctx, rrPts(cx - 440, 240, 180, 290, 10, 2), { wash: PAL.rose, ink: PAL.ink, sw: 1.8 });
    paint(ctx, rectPts(cx - 420, 266, 140, 100, 1), { wash: PAL.night, ink: PAL.ink, sw: 1.2 });
    letter(ctx, 'ARCADE', cx - 350, 500, 16, PAL.cream, { ink: false });
    paint(ctx, rrPts(cx + 180, 220, 230, 320, 10, 2), { wash: PAL.night, ink: PAL.ink, sw: 1.8 });
    letter(ctx, 'LAB RACK', cx + 295, 566, 16, PAL.ink, { ink: false, alpha: 0.85 });
    // the card itself travelling
    const gx = (cx - 350) + prog * 640, gy = 380 - Math.sin(prog * Math.PI) * 120;
    ctx.save(); ctx.translate(gx, gy); ctx.rotate(prog * 0.5);
    paint(ctx, rectPts(-58, -22, 116, 44, 1), { wash: PAL.sap, ink: PAL.ink, sw: 1.4 });
    paint(ctx, ellPts(-20, 0, 13, 13, 12, 0.5), { wash: PAL.cream, ink: PAL.ink, sw: 1 });
    paint(ctx, ellPts(20, 0, 13, 13, 12, 0.5), { wash: PAL.cream, ink: PAL.ink, sw: 1 });
    letter(ctx, 'GPU', 0, -32, 14, PAL.sap, { ink: false });
    ctx.restore();
    // parallel lanes lighting up
    if (prog > 0.9) {
      for (let i = 0; i < 9; i++) {
        const ly = 250 + i * 32;
        const on = frac(lt * 1.6 + i / 9) < 0.5;
        inkLine(ctx, [[cx + 200, ly], [cx + 390, ly]], 3, on ? PAL.sap : mixCol(PAL.night, PAL.cream, 0.2), 0);
      }
    }
    card(ctx, cx - 110, 560, 420, 60);
    letter(ctx, 'a neural net is mostly Y = XW, repeatedly', cx - 110, 560, 17, PAL.ink, { mono: true, ink: false });
    clawd(ctx, cx - 60, G - 40, 13, { t, eyes: 'happy', mouth: talkC ? 'talk' : 'grin', talkT: t, seed: 35, noShadow: true });
  }
}

// ---------------------------------------------------------------- ACT 5
function act5(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2, lt = t - shot.startTime;
  paper(ctx, W, H, '#F0E2C4');
  blob(ctx, W * 0.75, H * 0.28, 220, PAL.ochre, { alpha: 0.16, seed: 41 });
  ground(ctx, W, G + 8, PAL.ochre);
  const talkC = speaking && shot.speaker === 'Clawd';

  if (shot.id === 'ev5-1') {
    letter(ctx, 'ALEXNET · SEPTEMBER 2012', cx, 74, 32, PAL.ink, { pop: seg(lt, 0.1, 0.7) });
    card(ctx, cx - 60, 340, 620, 290);
    barChart(ctx, cx - 60, 250, [
      ['2010', 28.2, mixCol(PAL.cream, PAL.ink, 0.4)],
      ['2011', 25.8, mixCol(PAL.cream, PAL.ink, 0.4)],
      ['2012', 15.3, PAL.rose],
      ['2015', 3.6, PAL.sap]
    ], 30, seg(lt, 0.4, 3.4), 330);
    inkLine(ctx, [[cx - 100, 318], [cx + 240, 318]], 2, PAL.ink, 0);
    letter(ctx, 'human ≈ 5%', cx + 250, 352, 13, PAL.ink, { mono: true, align: 'left', ink: false, alpha: 0.75 });
    sfx(ctx, 'THE CLIFF', cx + 210, 220, 30, PAL.rose, lt - 2.6, { life: 3 });
    letter(ctx, 'trained 6 days on two gaming GPUs', cx - 60, 470, 17, PAL.ink, { pop: seg(lt, 4.2, 5.2), alpha: 0.9 });
    clawd(ctx, cx + 430, G, 15, { t, eyes: 'spark', mouth: 'O', emote: '!!', emoteK: seg(lt, 2.4, 3.2), seed: 41 });
  } else if (shot.id === 'ev5-2') {
    letter(ctx, 'WHAT DEPTH BUYS YOU', cx, 74, 32, PAL.ink, { pop: seg(lt, 0.1, 0.7) });
    const panels = [
      { y: 470, lab: 'layer 1 · edges', draw: (px: number, py: number) => { for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI; inkLine(ctx, [[px - Math.cos(a) * 34, py - Math.sin(a) * 34], [px + Math.cos(a) * 34, py + Math.sin(a) * 34]], 2, PAL.ink, 0); } } },
      { y: 340, lab: 'layer 3 · parts', draw: (px: number, py: number) => { paint(ctx, ellPts(px - 24, py, 17, 17, 12, 0.6), { ink: PAL.ink, sw: 1.6 }); paint(ctx, ellPts(px + 22, py - 8, 11, 11, 10, 0.5), { ink: PAL.ink, sw: 1.6 }); inkLine(ctx, [[px - 4, py + 22], [px + 30, py + 18]], 2, PAL.ink, 0.4); } },
      { y: 210, lab: 'layer 5 · objects', draw: (px: number, py: number) => { paint(ctx, ellPts(px, py + 4, 30, 25, 16, 0.8), { wash: PAL.clay, ink: PAL.ink, sw: 1.4 }); paint(ctx, [[px - 26, py - 14], [px - 14, py - 38], [px - 4, py - 16]], { wash: PAL.clay, ink: PAL.ink, sw: 1.2 }); paint(ctx, [[px + 26, py - 14], [px + 14, py - 38], [px + 4, py - 16]], { wash: PAL.clay, ink: PAL.ink, sw: 1.2 }); paint(ctx, ellPts(px - 10, py, 3.4, 3.4, 8, 0.2), { wash: PAL.ink, ink: null }); paint(ctx, ellPts(px + 10, py, 3.4, 3.4, 8, 0.2), { wash: PAL.ink, ink: null }); } }
    ];
    panels.forEach((p, i) => {
      const pop = seg(lt, 0.4 + i * 0.9, 1.0 + i * 0.9);
      if (pop <= 0) return;
      ctx.save(); ctx.translate(cx - 120, p.y); ctx.scale(pop, pop);
      paint(ctx, rrPts(-110, -58, 220, 116, 10, 1.6), { wash: PAL.cream, ink: PAL.ink, sw: 1.5 });
      ctx.restore();
      p.draw(cx - 120, p.y);
      letter(ctx, p.lab, cx + 50, p.y, 17, PAL.ink, { align: 'left', ink: false, alpha: pop * 0.95 });
      if (i < 2) arrow(ctx, cx - 120, p.y - 62, cx - 120, p.y - 110, PAL.ochre, 2.4);
    });
    letter(ctx, 'nobody specified any of it', cx + 230, 560, 20, PAL.ochre, { pop: seg(lt, 3.6, 4.6) });
    clawd(ctx, cx + 390, G, 14, { t, eyes: 'happy', mouth: talkC ? 'talk' : 'grin', talkT: t, seed: 42 });
  } else if (shot.id === 'ev5-3') {
    letter(ctx, 'THEN EVERYTHING FELL', cx, 74, 32, PAL.ink, { pop: seg(lt, 0.1, 0.7) });
    // dominoes
    ['SPEECH', 'VISION', 'TRANSLATION'].forEach((lab, i) => {
      const dx = cx - 390 + i * 115;
      const fall = kf(lt, [[0.6 + i * 0.38, 0], [1.1 + i * 0.38, 1.3]], v => v);
      ctx.save(); ctx.translate(dx, 470); ctx.rotate(fall);
      paint(ctx, rectPts(-16, -112, 32, 112, 1.2), { wash: [PAL.sky, PAL.violet, PAL.sap][i], ink: PAL.ink, sw: 1.4 });
      ctx.restore();
      letter(ctx, lab, dx, 500, 12, PAL.ink, { ink: false, alpha: 0.8 });
    });
    // go board
    const bx = cx + 150, by = 330, gs = 26;
    paint(ctx, rectPts(bx - 10, by - 10, gs * 8 + 20, gs * 8 + 20, 1.4), { wash: mixCol(PAL.ochre, PAL.cream, 0.45), ink: PAL.ink, sw: 1.8 });
    for (let i = 0; i <= 8; i++) {
      inkLine(ctx, [[bx, by + i * gs], [bx + gs * 8, by + i * gs]], 1, PAL.ink, 0);
      inkLine(ctx, [[bx + i * gs, by], [bx + i * gs, by + gs * 8]], 1, PAL.ink, 0);
    }
    const stones: Array<[number, number, number]> = [[2, 3, 0], [3, 4, 1], [4, 3, 0], [5, 5, 1], [3, 6, 0], [6, 4, 1]];
    stones.forEach(([c, r, w2]) => paint(ctx, ellPts(bx + c * gs, by + r * gs, 11, 11, 12, 0.4), { wash: w2 ? PAL.cream : PAL.ink, ink: PAL.ink, sw: 1 }));
    // move 37 glowing
    const m37 = seg(lt, 3.4, 4.2);
    if (m37 > 0) {
      blob(ctx, bx + 5 * gs, by + 2 * gs, 30 * m37, PAL.rose, { alpha: 0.5, seed: 44 });
      paint(ctx, ellPts(bx + 5 * gs, by + 2 * gs, 12, 12, 12, 0.4), { wash: PAL.ink, ink: PAL.rose, sw: 2 });
    }
    letter(ctx, 'move 37', bx + 110, by + 52, 20, PAL.rose, { pop: m37 });
    letter(ctx, 'P(a human plays it) ≈ 1/10,000', bx + 10, by + 250, 16, PAL.ink, { ink: false, alpha: seg(lt, 4.4, 5.2) * 0.9 });
    letter(ctx, 'ALPHAGO · 2016', bx + 100, 150, 24, PAL.ochre, { pop: seg(lt, 2.4, 3.2) });
  } else {
    letter(ctx, 'AND THEN SOMEONE PLOTTED IT', cx, 74, 30, PAL.ink, { pop: seg(lt, 0.1, 0.8) });
    const ox = cx - 230, oy = 500, w = 480, h = 290;
    card(ctx, cx - 10, 360, 620, 360);
    inkLine(ctx, [[ox, oy], [ox + w, oy]], 2.4, PAL.ink, 0);
    inkLine(ctx, [[ox, oy], [ox, oy - h]], 2.4, PAL.ink, 0);
    letter(ctx, 'log compute →', ox + w / 2, oy + 30, 14, PAL.ink, { mono: true, ink: false, alpha: 0.8 });
    ctx.save(); ctx.translate(ox - 34, oy - h / 2); ctx.rotate(-Math.PI / 2);
    letter(ctx, 'log loss →', 0, 0, 14, PAL.ink, { mono: true, ink: false, alpha: 0.8 });
    ctx.restore();
    // the straight line extends past the paper
    const k = seg(lt, 0.6, 4.4);
    const pts: Array<[number, number]> = [];
    for (let i = 0; i <= 50; i++) {
      const kk = (i / 50) * k;
      pts.push([ox + 16 + kk * (w + 120), oy - 36 - kk * (h - 40)]);
    }
    if (pts.length > 1) inkLine(ctx, pts, 4, PAL.rose, 0.1);
    // scatter around it
    for (let i = 0; i < 14; i++) {
      const kk = hash(i * 3.3);
      if (kk > k) continue;
      paint(ctx, ellPts(ox + 16 + kk * (w + 120) + (hash(i) - 0.5) * 16, oy - 36 - kk * (h - 40) + (hash(i * 7) - 0.5) * 20, 5, 5, 8, 0.3), { wash: PAL.ink, ink: null });
    }
    letter(ctx, 'L ∝ N^−α   ·   it just… keeps going', cx + 60, 180, 19, PAL.rose, { pop: seg(lt, 3.4, 4.4) });
    letter(ctx, 'no visible ceiling', cx + 250, 560, 18, PAL.ochre, { pop: seg(lt, 4.6, 5.4) });
  }
}

// ---------------------------------------------------------------- ACT 6
function act6(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2, lt = t - shot.startTime;
  paper(ctx, W, H, '#F0DCCE');
  blob(ctx, W * 0.2, H * 0.3, 210, PAL.clay, { alpha: 0.15, seed: 51 });
  ground(ctx, W, G + 8, PAL.clay);
  const talkC = speaking && shot.speaker === 'Clawd';

  if (shot.id === 'ev6-1') {
    letter(ctx, 'JUNE 2017', cx, 74, 30, PAL.clayDk, { pop: seg(lt, 0.1, 0.6) });
    blob(ctx, cx - 60, 330, 230, PAL.ochre, { alpha: 0.2, seed: 52 });
    ctx.save(); ctx.translate(cx - 60, 330); ctx.rotate(-0.025);
    paint(ctx, rectPts(-200, -150, 400, 300, 2), { wash: PAL.cream, ink: PAL.ink, sw: 2 });
    letter(ctx, 'Attention Is All', 0, -92, 30, PAL.ink, { pop: seg(lt, 0.5, 1.3) });
    letter(ctx, 'You Need', 0, -52, 30, PAL.ink, { pop: seg(lt, 0.9, 1.7) });
    for (let i = 0; i < 7; i++) inkLine(ctx, [[-160, 10 + i * 24], [160 - (i % 3) * 52, 10 + i * 24]], 1.3, mixCol(PAL.cream, PAL.ink, 0.5), 0.1);
    ctx.restore();
    // eight author cards
    for (let i = 0; i < 8; i++) {
      const pop = seg(lt, 1.6 + i * 0.16, 2.0 + i * 0.16);
      if (pop <= 0) continue;
      const ax = cx + 250 + (i % 2) * 110, ay = 230 + Math.floor(i / 2) * 74;
      ctx.save(); ctx.translate(ax, ay); ctx.rotate((hash(i) - 0.5) * 0.16); ctx.scale(pop, pop);
      paint(ctx, rectPts(-48, -26, 96, 52, 1), { wash: PAL.cream, ink: PAL.ink, sw: 1.1 });
      paint(ctx, ellPts(-26, 0, 11, 11, 10, 0.4), { wash: PAL.clay, ink: PAL.ink, sw: 0.9 });
      inkLine(ctx, [[-8, -6], [34, -6]], 1.4, mixCol(PAL.cream, PAL.ink, 0.5), 0);
      inkLine(ctx, [[-8, 8], [22, 8]], 1.4, mixCol(PAL.cream, PAL.ink, 0.5), 0);
      ctx.restore();
    }
    letter(ctx, 'throw away recurrence. keep only attention.', cx - 60, 540, 19, PAL.clayDk, { pop: seg(lt, 3.6, 4.8) });
  } else if (shot.id === 'ev6-2') {
    letter(ctx, 'EVERY WORD LOOKS AT EVERY WORD', cx, 70, 28, PAL.ink, { pop: seg(lt, 0.1, 0.8) });
    const words = ['the', 'animal', "didn't", 'cross', 'the', 'street', 'because', 'it', 'was', 'tired'];
    const y = 340;
    const positions = words.map((_, i) => cx - 430 + i * 96);
    // arcs
    const focus = Math.floor(frac(lt / 3.6) * words.length);
    words.forEach((_, i) => {
      if (i === focus) return;
      const strength = (i === 1 && focus === 7) ? 1 : 0.18 + hash(i * 3 + focus * 7) * 0.4;
      const a = positions[focus], b = positions[i];
      const lift = Math.min(150, Math.abs(a - b) * 0.55);
      const pts: Array<[number, number]> = [];
      for (let s = 0; s <= 16; s++) {
        const k = s / 16;
        pts.push([a + (b - a) * k, y - 34 - Math.sin(k * Math.PI) * lift]);
      }
      inkLine(ctx, pts, 0.8 + strength * 5, mixCol(PAL.cream, PAL.clay, Math.min(1, 0.25 + strength)), 0.5);
    });
    words.forEach((w, i) => {
      const hot = i === focus;
      card(ctx, positions[i], y, Math.max(58, w.length * 15), 44, hot ? PAL.ochre : PAL.cream);
      letter(ctx, w, positions[i], y, 15, PAL.ink, { mono: true, ink: false });
    });
    letter(ctx, 'softmax(QKᵀ/√dk)·V   — in ONE pass', cx, 470, 20, PAL.clayDk, { pop: seg(lt, 2.4, 3.4), mono: false });
    letter(ctx, '"it" → "animal"  (learned, never written)', cx, 520, 16, PAL.ink, { ink: false, alpha: 0.85 });
    clawd(ctx, cx - 420, G, 14, { t, eyes: 'look', lookX: 0.8, mouth: talkC ? 'talk' : 'smile', talkT: t, seed: 53 });
  } else if (shot.id === 'ev6-3') {
    letter(ctx, 'SO THEY MADE IT BIGGER', cx, 74, 32, PAL.ink, { pop: seg(lt, 0.1, 0.7) });
    const steps: Array<[string, string, number, string]> = [
      ['GPT-1', '117M', 70, mixCol(PAL.cream, PAL.clay, 0.3)],
      ['GPT-2', '1.5B', 150, mixCol(PAL.cream, PAL.clay, 0.55)],
      ['GPT-3', '175B', 280, PAL.clay]
    ];
    steps.forEach(([name, params, h, col], i) => {
      const pop = seg(lt, 0.6 + i * 1.1, 1.4 + i * 1.1);
      if (pop <= 0) return;
      const x = cx - 230 + i * 220, hh = h * pop;
      paint(ctx, rectPts(x - 80, 520 - hh, 160, hh, 2), { wash: col, ink: PAL.ink, sw: 1.8 });
      letter(ctx, name, x, 548, 17, PAL.ink, { ink: false });
      letter(ctx, params, x, 520 - hh - 24, 20, PAL.clayDk, { pop });
      letter(ctx, `${2018 + i}`, x, 572, 13, PAL.ink, { mono: true, ink: false, alpha: 0.7 });
    });
    letter(ctx, 'same architecture. mostly just… more.', cx, 180, 19, PAL.clayDk, { pop: seg(lt, 3.6, 4.8) });
    // Clawd climbing
    const climb = seg(lt, 1.2, 4.4);
    clawd(ctx, cx - 230 + climb * 440, 520 - [70, 150, 280][Math.min(2, Math.floor(climb * 3))] - 8, 11, {
      t, eyes: 'happy', mouth: 'grin', aL: 1.2, aR: 1.2, noShadow: true, seed: 54
    });
  } else {
    letter(ctx, 'NOVEMBER 30, 2022', cx, 70, 30, PAL.ink, { pop: seg(lt, 0.1, 0.6) });
    // the chat box
    blob(ctx, cx, 300, 190, PAL.ochre, { alpha: 0.22, seed: 56 });
    paint(ctx, rrPts(cx - 230, 230, 460, 140, 14, 2), { wash: PAL.cream, ink: PAL.ink, sw: 2 });
    paint(ctx, rrPts(cx - 206, 258, 412, 52, 10, 1.2), { wash: mixCol(PAL.cream, PAL.ink, 0.1), ink: PAL.ink, sw: 1.1 });
    const typed = 'explain quantum computing to me'.slice(0, Math.floor(seg(lt, 0.6, 3) * 31));
    letter(ctx, typed + (Math.sin(lt * 8) > 0 ? '|' : ''), cx - 190, 284, 16, PAL.ink, { mono: true, align: 'left', ink: false });
    paint(ctx, rrPts(cx + 120, 322, 94, 34, 8, 1), { wash: PAL.clay, ink: PAL.ink, sw: 1.2 });
    letter(ctx, 'send', cx + 167, 339, 14, PAL.cream, { ink: false });
    // crowd converging
    const nF = 46;
    for (let i = 0; i < nF; i++) {
      const k = seg(lt, 1.6 + hash(i) * 2.6, 3.4 + hash(i) * 2.6);
      if (k <= 0) continue;
      const a = hash(i * 7) * TAU;
      const r = 520 * (1 - k) + 180;
      const fx = cx + Math.cos(a) * r, fy = 320 + Math.sin(a) * r * 0.62;
      paint(ctx, ellPts(fx, fy - 11, 6, 6, 8, 0.3), { wash: PAL.ink, ink: null });
      paint(ctx, rectPts(fx - 5, fy - 4, 10, 15, 0.4), { wash: mixCol(PAL.ink, PAL.cream, 0.25), ink: null });
    }
    letter(ctx, '100,000,000 users in two months', cx, 500, 24, PAL.clayDk, { pop: seg(lt, 4.4, 5.6) });
    letter(ctx, 'the research was years old. the text box was new.', cx, 548, 17, PAL.ink, { ink: false, alpha: seg(lt, 5.6, 6.6) * 0.9 });
  }
}

// ---------------------------------------------------------------- ACT 7
function act7(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2, lt = t - shot.startTime;
  const talkC = speaking && shot.speaker === 'Clawd';
  const talkE = speaking && shot.speaker === 'Engineer';

  if (shot.id === 'ev7-1') {
    paper(ctx, W, H, '#E8DCE6');
    ground(ctx, W, G + 8, PAL.rose);
    letter(ctx, 'ONE DOOR, EVERY SENSE', cx, 74, 32, PAL.ink, { pop: seg(lt, 0.1, 0.7) });
    const arch = cx + 180;
    // three streams
    const streams: Array<[string, string, number, (x: number, y: number) => void]> = [
      ['text', PAL.sky, 230, (x, y) => { for (let i = 0; i < 3; i++) inkLine(ctx, [[x - 40, y - 8 + i * 9], [x + 30 - i * 8, y - 8 + i * 9]], 2, PAL.sky, 0); }],
      ['image', PAL.sap, 330, (x, y) => { paint(ctx, rectPts(x - 32, y - 22, 64, 44, 1), { wash: PAL.sap, ink: PAL.ink, sw: 1.1 }); paint(ctx, ellPts(x + 12, y - 8, 6, 6, 8, 0.3), { wash: PAL.cream, ink: null }); }],
      ['audio', PAL.violet, 430, (x, y) => { for (let i = 0; i < 9; i++) { const h = 6 + Math.abs(Math.sin(i * 1.3 + t * 3)) * 22; inkLine(ctx, [[x - 36 + i * 9, y - h / 2], [x - 36 + i * 9, y + h / 2]], 2.6, PAL.violet, 0); } }]
    ];
    streams.forEach(([lab, col, sy, draw], i) => {
      const pop = seg(lt, 0.4 + i * 0.5, 1.0 + i * 0.5);
      if (pop <= 0) return;
      draw(cx - 350, sy);
      letter(ctx, lab, cx - 350, sy + 46, 15, col, { ink: false, alpha: pop });
      // flowing tokens toward the arch
      for (let k = 0; k < 4; k++) {
        const fk = frac(lt * 0.5 + k / 4 + i * 0.2);
        const fx = (cx - 300) + fk * (arch - cx + 240);
        const fy = sy + (330 - sy) * fk;
        paint(ctx, rectPts(fx - 7, fy - 5, 14, 10, 0.3), { wash: col, ink: null, alpha: 0.85 });
      }
    });
    // the arch
    blob(ctx, arch, 330, 150, PAL.rose, { alpha: 0.2, seed: 61 });
    paint(ctx, [[arch - 96, 470], [arch - 96, 300], [arch, 214], [arch + 96, 300], [arch + 96, 470]], { fill: PAL.rose, fillOp: 90, bleed: 0.2, tex: 0.5, ink: PAL.ink, sw: 2, curv: 0.25 });
    letter(ctx, 'tokens', arch, 350, 22, PAL.ink, { ink: false });
    letter(ctx, 'it is all just tokens underneath', cx, 560, 19, PAL.rose, { pop: seg(lt, 4, 5.2) });
    clawd(ctx, cx - 150, G, 15, { t, eyes: 'spark', mouth: talkC ? 'talk' : 'grin', talkT: t, seed: 61 });
  } else if (shot.id === 'ev7-2') {
    paper(ctx, W, H, '#E6E0D2');
    ground(ctx, W, G + 8, PAL.teal);
    letter(ctx, 'IT STOPPED ONLY ANSWERING', cx, 74, 32, PAL.ink, { pop: seg(lt, 0.1, 0.7) });
    // the loop
    const lx = cx + 150, ly = 340, R = 170;
    ctx.save();
    const ringPts: Array<[number, number]> = [];
    for (let i = 0; i <= 44; i++) { const a = (i / 44) * TAU; ringPts.push([lx + Math.cos(a) * R, ly + Math.sin(a) * R * 0.78]); }
    inkLine(ctx, ringPts, 3, PAL.teal, 0.5);
    ctx.restore();
    const nodes: Array<[string, string]> = [['observe', PAL.sky], ['decide', PAL.violet], ['act', PAL.rose], ['read', PAL.sap]];
    nodes.forEach(([lab, col], i) => {
      const a = (i / 4) * TAU - Math.PI / 2 + lt * 0.5;
      const nx = lx + Math.cos(a) * R, ny = ly + Math.sin(a) * R * 0.78;
      card(ctx, nx, ny, 118, 48, mixCol(PAL.cream, col, 0.3));
      letter(ctx, lab, nx, ny, 16, PAL.ink, { ink: false });
    });
    letter(ctx, 'until done', lx, ly, 20, PAL.teal, { ink: false, alpha: 0.9 });
    card(ctx, cx - 320, 330, 330, 170);
    const code = ['while (!done) {', '  t = model(state)', '  r = tools[t.call](t.args)', '  state += r', '}'];
    code.forEach((l, i) => letter(ctx, l, cx - 470, 272 + i * 30, 15, i === 2 ? PAL.rose : PAL.ink, { mono: true, align: 'left', ink: false, alpha: seg(lt, 0.5 + i * 0.35, 0.9 + i * 0.35) }));
    clawd(ctx, cx - 320, G, 15, { t, hat: 'hard', eyes: 'happy', mouth: talkE ? 'talk' : 'grin', talkT: t, aR: 1.1, seed: 62 });
  } else if (shot.id === 'ev7-3') {
    paper(ctx, W, H, '#D7E2E4');
    ground(ctx, W, G + 8, PAL.teal);
    letter(ctx, 'AND SPEED CAME BACK', cx, 74, 32, PAL.ink, { pop: seg(lt, 0.1, 0.7) });
    // gate
    const gx = cx - 110;
    inkLine(ctx, [[cx - 480, 470], [gx - 70, 470]], 4, PAL.ink, 0.3);
    paint(ctx, rectPts(gx - 20, 250, 40, 230, 2), { wash: PAL.clayDk, ink: PAL.ink, sw: 1.8 });
    // fast guard
    blob(ctx, gx, 360, 110, PAL.teal, { alpha: 0.28, seed: 63 });
    clawd(ctx, gx, 470, 15, { t, col: mixCol(PAL.teal, PAL.cream, 0.3), dk: PAL.teal, eyes: 'shades', mouth: 'cat', aL: 0.5, aR: 0.5, seed: 63 });
    letter(ctx, '~70 ms', gx, 250, 20, PAL.teal, { pop: seg(lt, 0.8, 1.6) });
    letter(ctx, 'reflex', gx, 530, 16, PAL.ink, { ink: false, alpha: 0.85 });
    // slow thinker behind
    const sx2 = cx + 270;
    blob(ctx, sx2, 330, 150, PAL.violet, { alpha: 0.26, seed: 64 });
    clawd(ctx, sx2, 480, 20, { t, col: mixCol(PAL.violet, PAL.cream, 0.32), dk: PAL.indigo, eyes: 'narrow', mouth: 'flat', aL: 0.2, aR: 0.2, seed: 64 });
    letter(ctx, 'seconds', sx2, 230, 20, PAL.violet, { pop: seg(lt, 1.6, 2.4) });
    letter(ctx, 'deliberation', sx2, 540, 16, PAL.ink, { ink: false, alpha: 0.85 });
    // split traffic
    arrow(ctx, gx + 40, 440, cx + 60, 400, PAL.teal, 2.6);
    arrow(ctx, gx + 40, 490, sx2 - 90, 470, PAL.violet, 2);
    letter(ctx, '95%', cx + 20, 376, 16, PAL.teal, { ink: false });
    letter(ctx, '5%', cx + 60, 500, 16, PAL.violet, { ink: false });
    letter(ctx, 'most decisions want a reflex, not an essay', cx, 580, 19, PAL.ink, { pop: seg(lt, 3.4, 4.6), alpha: 0.95 });
  } else {
    // ---- the curtain call ----
    paper(ctx, W, H, '#DEC9A6');
    paint(ctx, rectPts(-40, 470, W + 80, H - 430, 4), { fill: PAL.clayDk, fillOp: 220, bleed: 0.1, tex: 0.6, border: 0.4, ink: null });
    for (let px = 40; px < W; px += 150) inkLine(ctx, [[px, 474], [px - 24, H + 10]], 1.6, mixCol(PAL.clayDk, PAL.ink, 0.6), 0.1);
    inkLine(ctx, [[0, 472], [W, 472]], 2, mixCol(PAL.clayDk, PAL.ink, 0.55), 0.2);
    for (let fx = 90; fx < W; fx += 120) {
      blob(ctx, fx, 540, 42, PAL.ochre, { alpha: 0.4 + wob(t + fx, 1.4) * 0.08, seed: 70 + fx });
      paint(ctx, ellPts(fx, 542, 9, 9, 12, 0.6), { wash: PAL.cream, ink: PAL.ink, sw: 1 });
    }
    const nightK = seg(lt, 0.3, 1.3);
    blob(ctx, cx, 262, 210 * nightK + 20, PAL.night, { alpha: 0.75, seed: 75 });
    letter(ctx, '1950:  "CAN MACHINES THINK?"', cx, 214, 25, PAL.cream, { pop: seg(lt, 0.8, 1.7) });
    letter(ctx, '2026:  "WHAT DO WE TRUST THEM', cx, 262, 25, PAL.ochre, { pop: seg(lt, 1.6, 2.5) });
    letter(ctx, 'TO DECIDE?"', cx, 300, 25, PAL.ochre, { pop: seg(lt, 2.0, 2.9) });
    const bowK = 0.5 + wob(t, 0.5) * 0.5;
    const bowDy = (on: boolean) => (on ? bowK * 0.4 : 0);
    clawd(ctx, cx - 150, 545, 18, { t, eyes: 'happy', mouth: 'grin', dy: bowDy(lt > 2.4), sq: bowDy(lt > 2.4) * 0.35, emote: 'music', emoteK: seg(lt, 2.8, 3.6), seed: 71 });
    researcher(ctx, cx + 150, 552, 8.6, { t, eyes: 'happy', mouth: 'smile', rot: bowDy(lt > 2.6) * 0.14 });
    for (let i = 0; i < 6; i++) {
      const ax = 100 + i * ((W - 200) / 5);
      const aAge = ((lt * 1.7 + i * 0.5) % 1.8);
      if (aAge > 0.2 && lt > 2) {
        paint(ctx, starPts(ax, 650 - aAge * 30, 14 * (1 - aAge / 1.8), 0.45, 3), { wash: mixCol(PAL.clayLt, PAL.rose, 0.4), ink: null, alpha: 1 - aAge / 1.8 });
      }
    }
    const curtain = kf(lt, [[0, 0], [3.4, 0], [6.6, 1]], v => v * v * (3 - 2 * v));
    const cw = curtain * (W * 0.34) + 60;
    for (const side of [-1, 1]) {
      ctx.save(); ctx.scale(side, 1); ctx.translate(side < 0 ? -W : 0, 0);
      paint(ctx, [[-10, -10], [cw, -10], [cw - 24, H * 0.6], [cw + 8, H + 20], [-10, H + 20]], { fill: PAL.rose, fillOp: 245, bleed: 0.06, tex: 0.6, border: 0.4, ink: PAL.ink, sw: 2 });
      for (let fx = 30; fx < cw - 4; fx += 46) inkLine(ctx, [[fx, -4], [fx - 16 + hash(fx) * 20, H + 4]], (26 - fx * 0.14) / 10, mixCol(PAL.rose, PAL.ink, 0.55), 0.3);
      ctx.restore();
    }
    paint(ctx, [[-10, -10], [W + 10, -10], [W + 10, 96], [-10, 96]], { fill: PAL.rose, fillOp: 245, bleed: 0.05, tex: 0.6, border: 0.3, ink: PAL.ink, sw: 2 });
    for (let vx = 0; vx <= 10; vx++) paint(ctx, ellPts(vx * (W / 10), 96, W / 22, 26, 16, 1), { fill: mixCol(PAL.rose, PAL.ink, 0.12), fillOp: 245, bleed: 0.08, tex: 0.5, ink: PAL.ink, sw: 1.2 });
    inkLine(ctx, [[0, 122], [W, 122]], 3, PAL.ochre, 0.3);
    letter(ctx, 'fin', W - 90, H - 60, 22, PAL.cream, { alpha: seg(lt, 4.6, 5.6), rot: -0.05 });
  }
}
