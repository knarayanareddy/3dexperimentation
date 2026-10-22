/**
 * characters.ts — faithful Canvas 2D port of PDoomVideo's clawd.js (blocky body: 10u × 6u,
 * four stubby legs, slit eyes, ink-line mouth) + the Researcher (lab coat, round glasses,
 * scribbly hair) and painted props. (x, y) is the ground point between the feet.
 */

import { PAL, TAU, clamp, paint, inkLine, rectPts, ellPts, rrPts, starPts, hash, letter, blob, wob } from './painter';

export type ClawdEyes = 'normal' | 'look' | 'happy' | 'closed' | 'wink' | 'narrow' | 'angry' | 'scared' | 'spark' | 'dot' | 'shades';
export type ClawdMouth = 'o' | 'O' | 'smile' | 'grin' | 'flat' | 'wobble' | 'cat' | 'talk';
export type ClawdHat = 'top' | 'crown' | 'party' | 'wizard' | 'hard' | 'bowtie' | 'halo' | 'band';
export type ClawdEmote = 'sweat' | 'spark' | 'heart' | 'anger' | 'music' | 'swirl' | 'zzz' | '!' | '?' | '!?' | '!!';

export interface ClawdOpts {
  dy?: number; sq?: number; rot?: number; flip?: boolean;
  sx?: number; sy?: number; aL?: number; aR?: number; walk?: number;
  eyes?: ClawdEyes; lookX?: number; lookY?: number; mouth?: ClawdMouth;
  talkT?: number; blush?: boolean; col?: string; dk?: string; lt?: string;
  hat?: ClawdHat; emote?: ClawdEmote; emoteK?: number; noShadow?: boolean;
  monocle?: boolean; seed?: number; t: number;
}

export function clawd(ctx: CanvasRenderingContext2D, x: number, y: number, u: number, o: ClawdOpts) {
  const dy = (o.dy || 0) * u;
  const sq = o.sq || 0;
  const sw = clamp(u / 15, 0.45, 2.4);
  const J = u * 0.07;
  const col = o.col || PAL.clay, dk = o.dk || PAL.clayDk, lt = o.lt || '#F5B394';

  if (!o.noShadow) {
    const f = 1 - Math.min(0.5, Math.abs(o.dy || 0) * 0.06);
    paint(ctx, ellPts(x, y + u * 0.15, u * 5.6 * f, u * 1.0 * f, 22, 2), {
      fill: PAL.ink, fillOp: 62, bleed: 0.25, tex: 0.25, border: 0.1, ink: null
    });
  }

  ctx.save();
  ctx.translate(x, y + dy);
  if (o.rot) ctx.rotate(o.rot);
  ctx.scale((o.flip ? -1 : 1) * (o.sx ?? 1) * (1 + sq * 0.6), (o.sy ?? 1) * (1 - sq));

  // ---- legs ----
  const legX = [-4, -2, 1, 3];
  legX.forEach((lx, i) => {
    let h = 2.2;
    if (o.walk != null) {
      const ph = Math.sin((o.walk + (i % 2 ? 0.5 : 0)) * TAU);
      if (ph > 0) h = 2.2 - ph * 0.9;
    }
    paint(ctx, rectPts(lx * u, -2.4 * u, u, h * u, J * 0.6), { wash: dk, washOp: 255, ink: PAL.ink, sw: sw * 0.8 });
  });

  // ---- arms ----
  const arm = (side: number, a: number) => {
    ctx.save();
    ctx.translate(side * 4.9 * u, -4.5 * u);
    ctx.rotate(side < 0 ? a : -a);
    paint(ctx, rectPts(side < 0 ? -2.2 * u : 0, -0.5 * u, 2.2 * u, u, J * 0.6), {
      wash: col, washOp: 255, fill: dk, fillOp: 60, tex: 0.5, ink: PAL.ink, sw: sw * 0.8
    });
    ctx.restore();
  };
  arm(-1, o.aL ?? 0.2);
  arm(1, o.aR ?? 0.2);

  // ---- body: flat base, lighter pool up top, darker settle along the bottom, ink last ----
  const body = rectPts(-5 * u, -8 * u, 10 * u, 6 * u, J);
  paint(ctx, body, { wash: col, washOp: 255, ink: null });
  paint(ctx, ellPts(-1.6 * u, -6.4 * u, 3.4 * u, 1.5 * u, 18, J * 2, -0.08), {
    fill: lt, fillOp: 120, bleed: 0.2, tex: 0.85, border: 0.8, ink: null
  });
  paint(ctx, rectPts(-4.8 * u, -3.8 * u, 9.6 * u, 1.6 * u, J), {
    fill: dk, fillOp: 120, bleed: 0.03, tex: 0.7, border: 0.5, ink: null
  });
  paint(ctx, body, { ink: PAL.ink, sw });

  if (o.blush) for (const bx of [-3.6, 3.6]) {
    paint(ctx, ellPts(bx * u, -4.6 * u, u * 0.8, u * 0.4, 14, J), { fill: PAL.rose, fillOp: 150, bleed: 0.2, ink: null });
  }

  eyes(ctx, u, o, sw);
  mouth(ctx, u, o, sw);
  hat(ctx, u, o, sw);
  if (o.monocle) {
    // rim only (no wash): ochre ring over the right eye, chain running to the hem
    paint(ctx, ellPts(2.5 * u, -6 * u, u * 1.05, u * 1.05, 16, J * 0.5), { ink: PAL.ochre, sw: sw * 0.9 });
    inkLine(ctx, [[2.5 * u, -6 * u], [2.5 * u, -6 * u]], sw * 0.5, PAL.ochre, 0);
    inkLine(ctx, [[3.4 * u, -5.4 * u], [4.3 * u, -3.2 * u]], sw * 0.55, PAL.ochre, 0.4);
  }

  ctx.restore();

  if (o.emote) emote(ctx, o.emote, x + (o.flip ? -1 : 1) * 5.6 * u, y + dy - 8.9 * u, u * 0.9, o.emoteK ?? 1);
}

function mouth(ctx: CanvasRenderingContext2D, u: number, o: ClawdOpts, sw: number) {
  let m = o.mouth;
  if (m === 'talk') m = Math.sin((o.talkT ?? o.t) * 13.5) > -0.15 ? 'o' : 'smile';
  if (!m) return;
  if (m === 'o') paint(ctx, ellPts(0, -4.3 * u, u * 0.45, u * 0.5, 12, 1), { wash: PAL.ink, ink: null });
  else if (m === 'O') paint(ctx, ellPts(0, -4.1 * u, u * 0.8, u * 0.95, 14, 1), { wash: '#4A1F2A', ink: PAL.ink, sw: sw * 0.6 });
  else if (m === 'smile') inkLine(ctx, [[-0.8 * u, -4.6 * u], [0, -4.1 * u], [0.8 * u, -4.6 * u]], sw * 0.8, PAL.ink, 0.6);
  else if (m === 'grin') paint(ctx, [[-1.3 * u, -4.8 * u], [1.3 * u, -4.8 * u], [0.9 * u, -3.9 * u], [-0.9 * u, -3.9 * u]], { wash: '#4A1F2A', ink: PAL.ink, sw: sw * 0.6, curv: 0.3 });
  else if (m === 'flat') inkLine(ctx, [[-0.7 * u, -4.4 * u], [0.7 * u, -4.4 * u]], sw * 0.8, PAL.ink, 0);
  else if (m === 'wobble') inkLine(ctx, [[-1 * u, -4.4 * u], [-0.5 * u, -4.7 * u], [0, -4.4 * u], [0.5 * u, -4.7 * u], [1 * u, -4.4 * u]], sw * 0.7, PAL.ink, 0.3);
  else if (m === 'cat') inkLine(ctx, [[-0.9 * u, -4.5 * u], [-0.45 * u, -4.1 * u], [0, -4.5 * u], [0.45 * u, -4.1 * u], [0.9 * u, -4.5 * u]], sw * 0.7, PAL.ink, 0.5);
}

function eyes(ctx: CanvasRenderingContext2D, u: number, o: ClawdOpts, sw: number) {
  const e = o.eyes || 'normal';
  const blink = e === 'normal' && ((o.t * 0.9 + (o.seed || 0) * 1.7) % 3.3) < 0.12;
  if (e === 'shades') {
    paint(ctx, rrPts(-4.6 * u, -7.5 * u, 9.2 * u, 2.2 * u, 0.6 * u, 1), { wash: PAL.ink, ink: null });
    inkLine(ctx, [[-3.9 * u, -7 * u], [-2.4 * u, -7.1 * u]], sw * 0.5, PAL.cream, 0);
    return;
  }
  for (const ex of [-3, 2]) {
    const X = ex * u, Y = -7 * u, cx = X + 0.5 * u;
    if (e === 'normal' || e === 'look') {
      const lx = e === 'look' ? (o.lookX || 0) * u * 0.5 : 0;
      const ly = e === 'look' ? (o.lookY || 0) * u * 0.4 : 0;
      if (blink) inkLine(ctx, [[X - 0.2 * u, Y + 1.5 * u], [X + 1.2 * u, Y + 1.5 * u]], sw, PAL.ink, 0);
      else {
        paint(ctx, rectPts(X + lx, Y + ly, u, 2 * u, u * 0.05), { wash: PAL.ink, ink: null });
        if (u > 9) paint(ctx, ellPts(X + lx + 0.32 * u, Y + ly + 0.42 * u, u * 0.17, u * 0.24, 10, 0.5), { wash: PAL.cream, washOp: 230, ink: null });
      }
    } else if (e === 'happy') inkLine(ctx, [[X - 0.4 * u, Y + 1.7 * u], [cx, Y + 0.5 * u], [X + 1.4 * u, Y + 1.7 * u]], sw * 1.3, PAL.ink, 0.2);
    else if (e === 'closed') inkLine(ctx, [[X - 0.4 * u, Y + 1.2 * u], [cx, Y + 1.6 * u], [X + 1.4 * u, Y + 1.2 * u]], sw * 1.2, PAL.ink, 0.4);
    else if (e === 'wink') {
      if (ex < 0) inkLine(ctx, [[X - 0.4 * u, Y + 1.7 * u], [cx, Y + 0.5 * u], [X + 1.4 * u, Y + 1.7 * u]], sw * 1.3, PAL.ink, 0.2);
      else paint(ctx, rectPts(X, Y, u, 2 * u, u * 0.05), { wash: PAL.ink, ink: null });
    } else if (e === 'narrow') paint(ctx, rectPts(X - 0.1 * u, Y + 0.9 * u, 1.2 * u, 0.7 * u, u * 0.03), { wash: PAL.ink, ink: null });
    else if (e === 'angry') paint(ctx, [[X - 0.2 * u, Y + (ex < 0 ? 0.3 : 1) * u], [X + 1.2 * u, Y + (ex < 0 ? 1 : 0.3) * u], [X + 1.2 * u, Y + 2 * u], [X - 0.2 * u, Y + 2 * u]], { wash: PAL.ink, ink: null });
    else if (e === 'scared') {
      paint(ctx, ellPts(cx, Y + u, u * 0.95, u * 1.15, 16, 1), { wash: PAL.cream, ink: PAL.ink, sw: sw * 0.6 });
      paint(ctx, ellPts(cx + (o.lookX || 0) * u * 0.3, Y + 1.1 * u, u * 0.32, u * 0.42, 10, 0.5), { wash: PAL.ink, ink: null });
    } else if (e === 'spark') {
      for (const k of [0, 1]) paint(ctx, starPts(cx, Y + u, u * (k ? 0.55 : 0.95), 0.42, 4, o.t * 2 + k), { wash: k ? PAL.cream : PAL.ochre, ink: null });
    } else if (e === 'dot') {
      paint(ctx, ellPts(cx, Y + u, u * 0.34, u * 0.34, 10, 0.5), { wash: PAL.ink, ink: null });
    }
  }
}

function hat(ctx: CanvasRenderingContext2D, u: number, o: ClawdOpts, sw: number) {
  const h = o.hat;
  if (!h) return;
  if (h === 'top') {
    paint(ctx, rectPts(-4.6 * u, -8.6 * u, 9.2 * u, u, 0.5), { wash: PAL.night, ink: PAL.ink, sw });
    paint(ctx, rectPts(-3 * u, -12.4 * u, 6 * u, 4.2 * u, 1), { wash: PAL.night, ink: PAL.ink, sw });
    paint(ctx, rectPts(-3 * u, -9.6 * u, 6 * u, 1.1 * u, 0.5), { wash: PAL.ochre, ink: null });
  } else if (h === 'crown') {
    const p: [number, number][] = [];
    for (let i = 0; i <= 4; i++) { p.push([(-4 + i * 2) * u - u, -8 * u - (i % 2 ? 3.2 : 1.2) * u]); }
    paint(ctx, [[-5 * u, -8 * u], ...p, [5 * u, -8 * u]], { wash: PAL.ochre, ink: PAL.ink, sw });
  } else if (h === 'party') {
    paint(ctx, [[-3.4 * u, -8 * u], [3.4 * u, -8 * u], [0.6 * u, -13.5 * u], [-0.6 * u, -13.5 * u]], { wash: PAL.violet, ink: PAL.ink, sw, curv: 0.2 });
    paint(ctx, ellPts(0, -13.5 * u, u * 0.9, u * 0.9, 10, 1), { fill: PAL.rose, fillOp: 200, bleed: 0.3, ink: PAL.ink, sw: sw * 0.6 });
  } else if (h === 'wizard') {
    paint(ctx, [[-4.6 * u, -8.4 * u], [4.6 * u, -8.4 * u], [2.2 * u, -9.4 * u], [-1.4 * u, -14 * u], [-3 * u, -9.4 * u]], { wash: PAL.indigo, ink: PAL.ink, sw, curv: 0.25 });
    paint(ctx, starPts(1.5 * u, -11 * u, u * 0.6, 0.4, 4, o.t), { wash: PAL.ochre, ink: null });
  } else if (h === 'hard') {
    paint(ctx, ellPts(0, -8.6 * u, 5.4 * u, 3 * u, 18, 1), { wash: PAL.ochre, ink: PAL.ink, sw });
    paint(ctx, rectPts(-5.4 * u, -8.9 * u, 10.8 * u, u * 0.8, 0.6), { wash: PAL.ochre, ink: PAL.ink, sw });
  } else if (h === 'bowtie') {
    paint(ctx, [[-2.4 * u, -2.6 * u], [-0.4 * u, -3.1 * u], [-0.4 * u, -2.1 * u]], { wash: PAL.ink, ink: PAL.ink, sw: sw * 0.6 });
    paint(ctx, [[2.4 * u, -2.6 * u], [0.4 * u, -3.1 * u], [0.4 * u, -2.1 * u]], { wash: PAL.ink, ink: PAL.ink, sw: sw * 0.6 });
    paint(ctx, ellPts(0, -2.6 * u, u * 0.5, u * 0.5, 8, 0.5), { wash: PAL.ink, ink: null });
  } else if (h === 'halo') {
    ctx.save();
    ctx.translate(0, -10.4 * u + wob(o.t, 0.4) * u * 0.3);
    paint(ctx, ellPts(0, 0, 3.2 * u, u * 0.75, 22, 1), { ink: PAL.ochre, sw: sw * 1.6 });
    ctx.restore();
  } else if (h === 'band') {
    paint(ctx, rectPts(-5 * u, -7.6 * u, 10 * u, 1.4 * u, 0.6), { wash: PAL.rose, ink: PAL.ink, sw: sw * 0.8 });
  }
}

function emote(ctx: CanvasRenderingContext2D, kind: ClawdEmote, x: number, y: number, r: number, k: number) {
  const s = r * clamp(k, 0, 1.4);
  if (s < 0.5) return;
  const P = Math.min(1, k * 1.6);
  if (kind === '!') letter(ctx, '!', x, y, s * 2.1, PAL.rose, { pop: P, stroke: true });
  else if (kind === '!!') letter(ctx, '!!', x, y, s * 2.1, PAL.rose, { pop: P, stroke: true });
  else if (kind === '?') letter(ctx, '?', x, y, s * 2.1, PAL.sky, { pop: P, stroke: true });
  else if (kind === '!?') letter(ctx, '!?', x, y, s * 2.0, PAL.ochre, { pop: P, stroke: true });
  else if (kind === 'music') letter(ctx, '♪', x, y, s * 2.0, PAL.violet, { pop: P });
  else if (kind === 'zzz') { letter(ctx, 'z', x + s * 0.2, y, s * 1.2, PAL.ink, { pop: P, alpha: 0.8 }); letter(ctx, 'z', x + s, y - s * 0.9, s * 1.7, PAL.ink, { pop: P * 0.8, alpha: 0.55 }); }
  else if (kind === 'sweat') {
    paint(ctx, [[x, y - s], [x + s * 0.55, y], [x, y + s * 0.8], [x - s * 0.55, y]], { fill: PAL.sky, fillOp: 220, bleed: 0.25, ink: PAL.ink, sw: 0.8, curv: 0.5 });
  } else if (kind === 'spark') {
    paint(ctx, starPts(x, y, s * 1.2, 0.42, 4), { wash: PAL.ochre, ink: PAL.ink, sw: 0.9 });
  } else if (kind === 'heart') {
    paint(ctx, starPts(x, y, s * 1.05, 0.55, 2, -Math.PI / 2), { wash: PAL.rose, ink: PAL.ink, sw: 0.8 });
  } else if (kind === 'anger') {
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * TAU + 0.4;
      inkLine(ctx, [[x + Math.cos(a) * s * 0.4, y + Math.sin(a) * s * 0.4], [x + Math.cos(a) * s * 1.1, y + Math.sin(a) * s * 1.1]], 1.6, P > 0.5 ? PAL.rose : PAL.ink, 0.1);
    }
  } else if (kind === 'swirl') {
    const pts: [number, number][] = [];
    for (let i = 0; i <= 10; i++) { const a = i / 10 * TAU * 1.4, rr = (i / 10) * s; pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); }
    inkLine(ctx, pts, 1.4, PAL.violet, 0.7);
  }
}

// ---------- the Researcher (lab coat, round glasses, scribbly hair) ----------
export interface ResearcherOpts {
  dy?: number; flip?: boolean; walk?: number; lookX?: number;
  eyes?: 'normal' | 'happy' | 'wide' | 'tired';
  mouth?: 'smile' | 'flat' | 'o' | 'talk'; talkT?: number;
  prop?: 'pointer' | 'none'; rot?: number; t: number;
}

export function researcher(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, o: ResearcherOpts) {
  // s: height unit; researcher is ~13.2s tall. Ground at (x, y).
  ctx.save();
  ctx.translate(x, y + (o.dy || 0) * s);
  if (o.rot) ctx.rotate(o.rot);
  ctx.scale(o.flip ? -1 : 1, 1);

  // shadow
  paint(ctx, ellPts(0, s * 0.14, 5.2 * s, 1.0 * s, 20, 2), { fill: PAL.ink, fillOp: 55, bleed: 0.25, tex: 0.25, border: 0.1, ink: null });

  const skin = '#F2B18C';

  // legs + shoes
  for (const lx of [-1.6, 0.6]) {
    paint(ctx, rectPts(lx * s, -3.2 * s, 1.2 * s, 3.2 * s, 0.2), { wash: PAL.night, ink: PAL.ink, sw: 0.8 });
  }
  paint(ctx, rectPts(-1.9 * s, -0.55 * s, 1.8 * s, 0.55 * s, 0.15), { wash: PAL.ink, ink: PAL.ink, sw: 0.7 });
  paint(ctx, rectPts(0.5 * s, -0.55 * s, 1.8 * s, 0.55 * s, 0.15), { wash: PAL.ink, ink: PAL.ink, sw: 0.7 });

  // lab coat: long trapezoid with collar
  paint(ctx, [[-3.1 * s, 0], [-2.6 * s, -8.2 * s], [-2.9 * s, -9.6 * s], [2.9 * s, -9.6 * s], [2.6 * s, -8.2 * s], [3.1 * s, 0]], {
    wash: PAL.cream, washOp: 255, ink: PAL.ink, sw: 1
  });
  // shading wash at coat bottom
  paint(ctx, rectPts(-3 * s, -1.6 * s, 6 * s, 1.6 * s, 0.3), { fill: PAL.sky, fillOp: 40, bleed: 0.2, tex: 0.5, ink: null });
  // buttons + pocket
  for (const by of [-6.5, -5, -3.6]) paint(ctx, ellPts(0.8 * s, by * s, 0.16 * s, 0.16 * s, 8, 0.2), { wash: PAL.ink, ink: null });
  paint(ctx, rectPts(-2.5 * s, -4.2 * s, 1.5 * s, 1.3 * s, 0.2), { ink: PAL.ink, sw: 0.7 });
  // collar + tie
  paint(ctx, [[-1.3 * s, -9.6 * s], [0, -8.6 * s], [-1.3 * s, -7.9 * s]], { wash: PAL.cream, ink: PAL.ink, sw: 0.7 });
  paint(ctx, [[1.3 * s, -9.6 * s], [0, -8.6 * s], [1.3 * s, -7.9 * s]], { wash: PAL.cream, ink: PAL.ink, sw: 0.7 });
  paint(ctx, [[-0.45 * s, -8.15 * s], [0.45 * s, -8.15 * s], [0.3 * s, -5.6 * s], [-0.3 * s, -5.6 * s]], { wash: PAL.violet, ink: PAL.ink, sw: 0.6 });

  // arms (sleeves)
  const arm = (side: number, a: number) => {
    ctx.save();
    ctx.translate(side * 2.7 * s, -8.6 * s);
    ctx.rotate(side < 0 ? a : -a);
    paint(ctx, rectPts(side < 0 ? -2.8 * s : 0, -0.5 * s, 2.8 * s, 1.05 * s, 0.2), { wash: PAL.cream, ink: PAL.ink, sw: 0.8 });
    paint(ctx, ellPts(side < 0 ? -2.9 * s : 2.9 * s, -0.05 * s, 0.5 * s, 0.5 * s, 10, 0.4), { wash: skin, ink: PAL.ink, sw: 0.7 });
    ctx.restore();
  };
  arm(-1, o.prop === 'pointer' ? 1.15 : 0.25);
  arm(1, 0.25);

  // head
  const hy = -11 * s;
  paint(ctx, ellPts(0, hy, 2.15 * s, 2.3 * s, 22, 0.8), { wash: skin, ink: PAL.ink, sw: 1 });

  // scribbly hair
  ctx.save();
  const hr = 2.1 * s;
  for (let i = 0; i < 7; i++) {
    const a = Math.PI + (i / 6) * Math.PI;
    const hx = Math.cos(a) * hr, hyy = hy + Math.sin(a) * hr * 0.95 - 0.15 * s;
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1; ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(hx, hyy);
    ctx.quadraticCurveTo(hx + (hash(i * 3.3) - 0.5) * 1.6 * s, hyy - 1.25 * s, hx + (hash(i * 7.7) - 0.3) * 2.4 * s, hyy - (hash(i * 5) * 0.7 + 0.2) * s);
    ctx.stroke();
  }
  ctx.restore();

  // glasses
  for (const gx of [-1.05, 1.05]) {
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(gx * s, hy, 0.82 * s, 0, TAU); ctx.stroke(); ctx.restore();
  }
  inkLine(ctx, [[-0.25 * s, hy], [0.25 * s, hy]], 1.1, PAL.ink, 0);

  // eyes through glasses
  const lookX = (o.lookX || 0) * 0.3;
  const es = o.eyes || 'normal';
  for (const gx of [-1.05, 1.05]) {
    if (es === 'happy') inkLine(ctx, [[gx * s - 0.4 * s, hy + 0.2 * s], [gx * s, hy - 0.2 * s], [gx * s + 0.4 * s, hy + 0.2 * s]], 1.1, PAL.ink, 0.3);
    else if (es === 'wide') paint(ctx, ellPts(gx * s + lookX * s, hy, 0.42 * s, 0.42 * s, 12, 0.3), { ink: PAL.ink, sw: 0.9 });
    else if (es === 'tired') inkLine(ctx, [[gx * s - 0.35 * s, hy + 0.05 * s], [gx * s + 0.35 * s, hy + 0.05 * s]], 1.1, PAL.ink, 0);
    else paint(ctx, ellPts(gx * s + lookX * s, hy + 0.05 * s, 0.16 * s, 0.16 * s, 8, 0.2), { wash: PAL.ink, ink: null });
  }

  // mouth
  let m = o.mouth || 'smile';
  if (m === 'talk') m = Math.sin((o.talkT ?? o.t) * 13) > -0.1 ? 'o' : 'smile';
  const my = hy + 1.35 * s;
  if (m === 'o') paint(ctx, ellPts(0, my, 0.3 * s, 0.36 * s, 10, 0.3), { wash: PAL.ink, ink: null });
  else if (m === 'smile') inkLine(ctx, [[-0.5 * s, my - 0.1 * s], [0, my + 0.25 * s], [0.5 * s, my - 0.1 * s]], 1, PAL.ink, 0.5);
  else if (m === 'flat') inkLine(ctx, [[-0.45 * s, my], [0.45 * s, my]], 1, PAL.ink, 0);

  // pointer stick
  if (o.prop === 'pointer') {
    ctx.save();
    ctx.translate(-2.7 * s, -8.6 * s);
    ctx.rotate(1.15);
    inkLine(ctx, [[-2.8 * s, 0], [-2.8 * s - 5.5 * s, 0.4 * s]], 1.4, PAL.clayDk, 0.1);
    ctx.restore();
  }

  ctx.restore();
}

// ---------- painted props ----------
export function steamEngine(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number) {
  // s: pixel scale. Ground at y.
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  const spin = (t * 3.2) % TAU;

  // smoke
  for (let i = 0; i < 4; i++) {
    const age = ((t * 0.55 + i * 0.25) % 1);
    blob(ctx, -64 - age * 78, -66 - age * 52, 10 + age * 26, PAL.sky, { alpha: 0.5 - age * 0.42, seed: 50 + i });
  }

  // boiler
  paint(ctx, rectPts(-80, -52, 118, 44, 3), { wash: PAL.night, ink: PAL.ink, sw: 1.6 });
  // trim bands
  for (const bx of [-52, -16, 20]) paint(ctx, rectPts(bx, -52, 5, 44, 0.6), { wash: PAL.ochre, ink: null });
  // chimney
  paint(ctx, [[-68, -52], [-74, -86], [-56, -86], [-62, -52]], { wash: PAL.ink, ink: PAL.ink, sw: 1.2, curv: 0.1 });
  // cab
  paint(ctx, rectPts(2, -84, 52, 44, 2), { wash: PAL.indigo, ink: PAL.ink, sw: 1.5 });
  paint(ctx, rectPts(10, -76, 24, 20, 1), { fill: PAL.ochre, fillOp: 190, bleed: 0.15, tex: 0.5, ink: PAL.ink, sw: 1 });
  paint(ctx, rectPts(-4, -90, 64, 9, 1), { wash: PAL.night, ink: PAL.ink, sw: 1.2 });

  // cowcatcher
  paint(ctx, [[-80, -12], [-100, 2], [-80, 2]], { wash: PAL.rose, ink: PAL.ink, sw: 1.2, curv: 0.2 });

  // wheels
  for (const wx of [-46, -8, 30]) {
    paint(ctx, ellPts(wx, -2, 15, 15, 20, 1), { wash: PAL.ink, ink: PAL.clayDk, sw: 1.6 });
    ctx.save();
    ctx.translate(wx, -2);
    ctx.rotate(spin);
    for (let sp = 0; sp < 5; sp++) {
      ctx.save(); ctx.rotate((sp / 5) * TAU);
      inkLine(ctx, [[0, 0], [12, 0]], 1.6, PAL.cream, 0);
      ctx.restore();
    }
    paint(ctx, ellPts(0, 0, 3.4, 3.4, 10, 0.5), { wash: PAL.cream, ink: null });
    ctx.restore();
  }
  // drive rod
  ctx.save();
  ctx.translate(0, Math.sin(spin) * 4);
  inkLine(ctx, [[-46, 2], [30, 2]], 3, PAL.ochre, 0.05);
  ctx.restore();

  ctx.restore();
}

export function typewriter(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, typed: string) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // paper emerging with typed text
  paint(ctx, rectPts(-40, -95, 80, 52, 2), { wash: PAL.cream, ink: PAL.ink, sw: 1 });
  letter(ctx, typed + (Math.sin(t * 9) > 0 ? '▌' : ' '), 0, -66, 13, PAL.ink, { mono: true, alpha: 0.9 });

  // body
  paint(ctx, rectPts(-62, -46, 124, 42, 3), { wash: PAL.night, ink: PAL.ink, sw: 1.6 });
  paint(ctx, rectPts(-48, -58, 96, 14, 1.4), { wash: PAL.indigo, ink: PAL.ink, sw: 1.2 });

  // key rows
  for (let r = 0; r < 2; r++) {
    for (let kcol = 0; kcol < 6; kcol++) {
      paint(ctx, ellPts(-38 + kcol * 15, -30 + r * 13, 4.6, 4.6, 10, 0.6), {
        wash: PAL.cream, ink: PAL.ink, sw: 0.8
      });
    }
  }
  // spacebar
  paint(ctx, rectPts(-26, 2, 52, 6, 1), { wash: PAL.cream, ink: PAL.ink, sw: 0.9 });

  // carriage lever bouncing
  ctx.save();
  ctx.translate(56, -48);
  ctx.rotate(-0.4 - Math.max(0, Math.sin(t * 6)) * 0.3);
  inkLine(ctx, [[0, 0], [22, -18]], 2, PAL.ink, 0.1);
  ctx.restore();

  ctx.restore();
}
