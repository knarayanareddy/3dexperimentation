/**
 * uberCast.ts — a bespoke painted cast for the Uber film.
 *
 * No Clawd here. The through-line character is PIN: a map marker with a face,
 * who drops, bounces, waits, panics and takes a bow. Around it: riders,
 * drivers, cars, phones, city blocks, surge bolts and officials — all drawn in
 * the same watercolour + boiling-ink language as the other two films.
 */

import {
  PAL, TAU, clamp, paint, inkLine, rectPts, ellPts, rrPts, starPts,
  hash, letter, blob, mixCol
} from './painter';

// Uber-ish accents that still live inside the warm paper palette
export const UB = {
  jet: '#1F2024',      // the black car
  slate: '#3C4049',
  mint: '#4FB286',     // "driver online" green
  signal: '#2F6FEB',   // route blue
  surge: '#E2574C',    // surge red
  lemon: '#E8B23A',    // the taxi it replaced
  haze: '#C9D2DC'
};

// ---------------------------------------------------------------- PIN
export type PinFace =
  | 'normal' | 'happy' | 'wink' | 'closed' | 'worried' | 'shocked'
  | 'sad' | 'determined' | 'star' | 'money' | 'sleep';

export interface PinOpts {
  t: number;
  /** vertical offset in pin-units (negative = up) */
  dy?: number;
  /** squash (+) / stretch (−) */
  sq?: number;
  rot?: number;
  face?: PinFace;
  /** 0..1 how open the mouth is when talking */
  talk?: boolean;
  talkT?: number;
  col?: string;
  dk?: string;
  /** draw the bobbing drop-shadow ellipse */
  noShadow?: boolean;
  /** little arms, angle in radians (0 = out sideways) */
  aL?: number;
  aR?: number;
  emote?: '!' | '?' | '!!' | 'zzz' | 'spark' | 'heart' | 'sweat' | 'money' | null;
  emoteK?: number;
  seed?: number;
  /** 0..1 — pin is mid-drop, stretches vertically */
  dropK?: number;
}

/**
 * Pin is drawn from its POINT: (x, y) is the tip that touches the ground.
 * Body is a teardrop ~2.2u wide, 3u tall above the tip.
 */
export function pin(ctx: CanvasRenderingContext2D, x: number, y: number, u: number, o: PinOpts) {
  const t = o.t;
  const dy = (o.dy || 0) * u;
  const sq = o.sq || 0;
  const col = o.col || UB.jet;
  const dk = o.dk || '#0E0F12';
  const sw = clamp(u / 9, 0.6, 3);

  if (!o.noShadow) {
    const lift = Math.max(0, -(o.dy || 0));
    const f = 1 - Math.min(0.55, lift * 0.1);
    paint(ctx, ellPts(x, y + u * 0.1, u * 1.15 * f, u * 0.3 * f, 18, u * 0.04), {
      fill: PAL.ink, fillOp: 60, bleed: 0.25, tex: 0.25, border: 0.1, ink: null
    });
  }

  ctx.save();
  ctx.translate(x, y + dy);
  if (o.rot) ctx.rotate(o.rot);
  const stretch = 1 + (o.dropK || 0) * 0.5;
  ctx.scale((1 + sq * 0.5) * (1 / (1 + (o.dropK || 0) * 0.18)), (1 - sq) * stretch);

  // ---- teardrop body: circle head + tapered point ----
  const R = u;                 // head radius
  const cy = -u * 1.75;        // head centre above the tip
  const body: Array<[number, number]> = [];
  // point at origin, sweeping up around the head and back down
  body.push([0, 0]);
  for (let i = 0; i <= 22; i++) {
    const a = Math.PI * 0.80 - (i / 22) * (Math.PI * 1.60);
    body.push([
      Math.cos(a) * R + hash(i + (o.seed || 0)) * u * 0.02,
      cy + Math.sin(a) * R + hash(i * 3) * u * 0.02
    ]);
  }
  paint(ctx, body, { wash: col, washOp: 255, ink: null, curv: 0.42 });
  // light pool top-left, dark settle at the bottom of the head
  paint(ctx, ellPts(-R * 0.35, cy - R * 0.32, R * 0.52, R * 0.3, 14, u * 0.05, -0.2), {
    fill: mixCol(col, PAL.cream, 0.55), fillOp: 120, bleed: 0.2, tex: 0.8, border: 0.6, ink: null
  });
  paint(ctx, ellPts(0, cy + R * 0.55, R * 0.72, R * 0.3, 14, u * 0.05), {
    fill: dk, fillOp: 130, bleed: 0.05, tex: 0.6, border: 0.4, ink: null
  });
  paint(ctx, body, { ink: PAL.ink, sw, curv: 0.42 });

  // ---- the hole: Uber pins have a ring; ours is the "window" ----
  paint(ctx, ellPts(0, cy, R * 0.44, R * 0.44, 16, u * 0.03), {
    wash: PAL.cream, washOp: 245, ink: PAL.ink, sw: sw * 0.7
  });

  // ---- face, inside the window ----
  const f = o.face || 'normal';
  const blink = f === 'normal' && ((t * 0.9 + (o.seed || 0) * 1.7) % 3.4) < 0.11;
  const ex = R * 0.17, ey = cy - R * 0.06;
  ctx.save();
  if (f === 'closed' || blink || f === 'happy') {
    inkLine(ctx, [[-ex - R * 0.1, ey], [-ex + R * 0.06, ey - (f === 'happy' ? R * 0.1 : -R * 0.04)], [-ex + R * 0.2, ey]], sw * 0.8, PAL.ink, 0.5);
    inkLine(ctx, [[ex - R * 0.2, ey], [ex - R * 0.06, ey - (f === 'happy' ? R * 0.1 : -R * 0.04)], [ex + R * 0.1, ey]], sw * 0.8, PAL.ink, 0.5);
  } else if (f === 'wink') {
    inkLine(ctx, [[-ex - R * 0.1, ey], [-ex + R * 0.06, ey - R * 0.1], [-ex + R * 0.2, ey]], sw * 0.8, PAL.ink, 0.5);
    paint(ctx, ellPts(ex, ey, R * 0.1, R * 0.12, 10, u * 0.01), { wash: PAL.ink, ink: null });
  } else if (f === 'shocked') {
    for (const sx of [-ex, ex]) {
      paint(ctx, ellPts(sx, ey, R * 0.15, R * 0.17, 12, u * 0.01), { wash: PAL.cream, ink: PAL.ink, sw: sw * 0.6 });
      paint(ctx, ellPts(sx, ey, R * 0.06, R * 0.07, 8, u * 0.01), { wash: PAL.ink, ink: null });
    }
  } else if (f === 'worried' || f === 'sad') {
    for (const sx of [-ex, ex]) paint(ctx, ellPts(sx, ey + R * 0.02, R * 0.09, R * 0.1, 10, u * 0.01), { wash: PAL.ink, ink: null });
    inkLine(ctx, [[-ex - R * 0.14, ey - R * 0.22], [-ex + R * 0.12, ey - R * 0.14]], sw * 0.7, PAL.ink, 0.2);
    inkLine(ctx, [[ex - R * 0.12, ey - R * 0.14], [ex + R * 0.14, ey - R * 0.22]], sw * 0.7, PAL.ink, 0.2);
  } else if (f === 'determined') {
    for (const sx of [-ex, ex]) paint(ctx, ellPts(sx, ey + R * 0.03, R * 0.1, R * 0.08, 10, u * 0.01), { wash: PAL.ink, ink: null });
    inkLine(ctx, [[-ex - R * 0.16, ey - R * 0.2], [-ex + R * 0.1, ey - R * 0.08]], sw * 0.8, PAL.ink, 0.1);
    inkLine(ctx, [[ex - R * 0.1, ey - R * 0.08], [ex + R * 0.16, ey - R * 0.2]], sw * 0.8, PAL.ink, 0.1);
  } else if (f === 'star') {
    for (const sx of [-ex, ex]) paint(ctx, starPts(sx, ey, R * 0.17, 0.42, 4, t * 2), { wash: UB.lemon, ink: null });
  } else if (f === 'money') {
    for (const sx of [-ex, ex]) letter(ctx, '$', sx, ey, R * 0.42, UB.mint, { ink: false });
  } else if (f === 'sleep') {
    inkLine(ctx, [[-ex - R * 0.12, ey], [-ex + R * 0.16, ey]], sw * 0.8, PAL.ink, 0);
    inkLine(ctx, [[ex - R * 0.16, ey], [ex + R * 0.12, ey]], sw * 0.8, PAL.ink, 0);
  } else {
    for (const sx of [-ex, ex]) {
      paint(ctx, ellPts(sx, ey, R * 0.1, R * 0.12, 10, u * 0.01), { wash: PAL.ink, ink: null });
      if (u > 14) paint(ctx, ellPts(sx - R * 0.03, ey - R * 0.04, R * 0.035, R * 0.04, 8, 0), { wash: PAL.cream, ink: null });
    }
  }

  // mouth
  const my = cy + R * 0.18;
  if (o.talk && Math.sin((o.talkT ?? t) * 13) > -0.15) {
    paint(ctx, ellPts(0, my, R * 0.1, R * 0.13, 10, u * 0.01), { wash: '#4A1F2A', ink: null });
  } else if (f === 'happy' || f === 'star' || f === 'money') {
    inkLine(ctx, [[-R * 0.14, my - R * 0.04], [0, my + R * 0.08], [R * 0.14, my - R * 0.04]], sw * 0.7, PAL.ink, 0.6);
  } else if (f === 'sad' || f === 'worried') {
    inkLine(ctx, [[-R * 0.13, my + R * 0.05], [0, my - R * 0.04], [R * 0.13, my + R * 0.05]], sw * 0.7, PAL.ink, 0.6);
  } else if (f === 'shocked') {
    paint(ctx, ellPts(0, my, R * 0.08, R * 0.1, 10, 0), { wash: PAL.ink, ink: null });
  } else {
    inkLine(ctx, [[-R * 0.1, my], [R * 0.1, my]], sw * 0.7, PAL.ink, 0.2);
  }
  ctx.restore();

  // ---- stubby arms ----
  const arm = (side: number, a: number) => {
    ctx.save();
    ctx.translate(side * R * 0.9, cy + R * 0.25);
    ctx.rotate(side < 0 ? a : -a);
    paint(ctx, rrPts(side < 0 ? -R * 0.75 : 0, -R * 0.1, R * 0.75, R * 0.2, R * 0.1, u * 0.02), {
      wash: col, ink: PAL.ink, sw: sw * 0.7
    });
    ctx.restore();
  };
  if (o.aL != null) arm(-1, o.aL);
  if (o.aR != null) arm(1, o.aR);

  ctx.restore();

  // ---- emote ----
  if (o.emote) {
    const k = clamp(o.emoteK ?? 1, 0, 1.4);
    const exx = x + u * 1.5, eyy = y + dy - u * 3.3;
    if (k > 0.02) {
      if (o.emote === 'zzz') {
        letter(ctx, 'z', exx, eyy, u * 0.8, PAL.ink, { pop: k, alpha: 0.8 });
        letter(ctx, 'z', exx + u * 0.5, eyy - u * 0.6, u * 1.1, PAL.ink, { pop: k * 0.8, alpha: 0.55 });
      } else if (o.emote === 'spark') {
        paint(ctx, starPts(exx, eyy, u * 0.6 * k, 0.42, 4), { wash: UB.lemon, ink: PAL.ink, sw: 0.8 });
      } else if (o.emote === 'heart') {
        paint(ctx, starPts(exx, eyy, u * 0.55 * k, 0.55, 2, -Math.PI / 2), { wash: PAL.rose, ink: PAL.ink, sw: 0.8 });
      } else if (o.emote === 'sweat') {
        paint(ctx, [[exx, eyy - u * 0.5], [exx + u * 0.28, eyy], [exx, eyy + u * 0.4], [exx - u * 0.28, eyy]], {
          fill: UB.signal, fillOp: 210, bleed: 0.2, ink: PAL.ink, sw: 0.7, curv: 0.5
        });
      } else if (o.emote === 'money') {
        letter(ctx, '$', exx, eyy, u * 1.3 * k, UB.mint, { pop: k, stroke: true });
      } else {
        letter(ctx, o.emote, exx, eyy, u * 1.3, o.emote === '?' ? UB.signal : UB.surge, { pop: k, stroke: true });
      }
    }
  }
}

/** A pin falling from above and landing with a squash — the signature move. */
export function pinDrop(
  ctx: CanvasRenderingContext2D, x: number, groundY: number, u: number,
  k: number, o: Partial<PinOpts> & { t: number }
) {
  const kk = clamp(k);
  if (kk <= 0) return;
  const fall = 1 - Math.pow(1 - Math.min(1, kk / 0.7), 2);   // ease-in fall
  const h = (1 - fall) * 260;
  const landed = kk > 0.7;
  const bounce = landed ? Math.sin((kk - 0.7) / 0.3 * Math.PI * 2) * Math.exp(-(kk - 0.7) * 9) : 0;
  pin(ctx, x, groundY, u, {
    ...o,
    t: o.t,
    dy: (-h / u) + bounce * 0.4,
    sq: landed ? Math.max(0, 0.42 * Math.exp(-(kk - 0.7) * 14)) : -0.12,
    dropK: landed ? 0 : 0.5
  });
}

// ---------------------------------------------------------------- PEOPLE
export interface PersonOpts {
  t: number;
  flip?: boolean;
  phone?: boolean;
  arm?: number;
  coat?: string;
  mood?: 'normal' | 'happy' | 'annoyed' | 'tired' | 'shout';
  talk?: boolean;
  talkT?: number;
  dy?: number;
}

/** A rider / pedestrian. s ≈ 1/13 of height. Ground at (x, y). */
export function person(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, o: PersonOpts) {
  ctx.save();
  ctx.translate(x, y + (o.dy || 0) * s);
  ctx.scale(o.flip ? -1 : 1, 1);
  const coat = o.coat || UB.slate;
  const skin = '#F0B894';

  paint(ctx, ellPts(0, s * 0.12, 4.4 * s, 0.85 * s, 18, s * 0.1), {
    fill: PAL.ink, fillOp: 52, bleed: 0.25, tex: 0.2, ink: null
  });

  for (const lx of [-1.5, 0.5]) paint(ctx, rectPts(lx * s, -3.1 * s, 1.1 * s, 3.1 * s, s * 0.05), { wash: PAL.night, ink: PAL.ink, sw: 0.8 });
  paint(ctx, rectPts(-1.8 * s, -0.5 * s, 1.7 * s, 0.5 * s, s * 0.04), { wash: PAL.ink, ink: null });
  paint(ctx, rectPts(0.4 * s, -0.5 * s, 1.7 * s, 0.5 * s, s * 0.04), { wash: PAL.ink, ink: null });

  // torso
  paint(ctx, rrPts(-2.3 * s, -8.4 * s, 4.6 * s, 5.6 * s, s * 0.7, s * 0.06), { wash: coat, ink: PAL.ink, sw: 1 });

  // arms
  const armA = o.arm ?? (o.phone ? 1.0 : 0.22);
  for (const side of [-1, 1]) {
    ctx.save();
    ctx.translate(side * 2.3 * s, -7.8 * s);
    ctx.rotate(side < 0 ? armA : -armA * (o.phone ? 0.25 : 1));
    paint(ctx, rrPts(side < 0 ? -2.5 * s : 0, -0.42 * s, 2.5 * s, 0.84 * s, s * 0.4, s * 0.05), { wash: coat, ink: PAL.ink, sw: 0.8 });
    paint(ctx, ellPts(side < 0 ? -2.6 * s : 2.6 * s, 0, 0.44 * s, 0.44 * s, 10, s * 0.04), { wash: skin, ink: PAL.ink, sw: 0.7 });
    ctx.restore();
  }

  // phone in the raised hand
  if (o.phone) {
    ctx.save();
    ctx.translate(-2.3 * s, -7.8 * s);
    ctx.rotate(armA);
    ctx.translate(-2.6 * s, 0);
    paint(ctx, rrPts(-0.42 * s, -0.75 * s, 0.84 * s, 1.5 * s, s * 0.14, s * 0.03), { wash: UB.jet, ink: PAL.ink, sw: 0.7 });
    paint(ctx, rrPts(-0.3 * s, -0.62 * s, 0.6 * s, 1.24 * s, s * 0.08, s * 0.02), {
      wash: mixCol(UB.signal, PAL.cream, 0.55 + Math.sin(o.t * 4) * 0.12), ink: null
    });
    ctx.restore();
  }

  // head
  const hy = -9.5 * s;
  paint(ctx, ellPts(0, hy, 1.35 * s, 1.5 * s, 18, s * 0.06), { wash: skin, ink: PAL.ink, sw: 0.9 });
  // hair
  paint(ctx, [[-1.4 * s, hy - 0.3 * s], [-1.1 * s, hy - 1.6 * s], [1.1 * s, hy - 1.6 * s], [1.4 * s, hy - 0.3 * s], [0, hy - 1.0 * s]], {
    wash: mixCol(PAL.ink, coat, 0.25), ink: PAL.ink, sw: 0.8, curv: 0.35
  });

  const m = o.mood || 'normal';
  for (const ex of [-0.5, 0.5]) {
    if (m === 'happy') inkLine(ctx, [[ex * s - 0.22 * s, hy + 0.12 * s], [ex * s, hy - 0.12 * s], [ex * s + 0.22 * s, hy + 0.12 * s]], 0.9, PAL.ink, 0.4);
    else if (m === 'tired') inkLine(ctx, [[ex * s - 0.2 * s, hy], [ex * s + 0.2 * s, hy]], 0.9, PAL.ink, 0);
    else paint(ctx, ellPts(ex * s, hy, 0.12 * s, 0.14 * s, 8, s * 0.01), { wash: PAL.ink, ink: null });
  }
  const my = hy + 0.75 * s;
  if (o.talk && Math.sin((o.talkT ?? o.t) * 12) > -0.1) paint(ctx, ellPts(0, my, 0.2 * s, 0.24 * s, 10, 0), { wash: PAL.ink, ink: null });
  else if (m === 'happy') inkLine(ctx, [[-0.3 * s, my - 0.08 * s], [0, my + 0.14 * s], [0.3 * s, my - 0.08 * s]], 0.9, PAL.ink, 0.5);
  else if (m === 'annoyed') inkLine(ctx, [[-0.28 * s, my + 0.06 * s], [0.28 * s, my - 0.06 * s]], 0.9, PAL.ink, 0);
  else if (m === 'shout') paint(ctx, ellPts(0, my, 0.24 * s, 0.3 * s, 10, 0), { wash: '#4A1F2A', ink: PAL.ink, sw: 0.6 });
  else inkLine(ctx, [[-0.25 * s, my], [0.25 * s, my]], 0.9, PAL.ink, 0.2);

  ctx.restore();
}

// ---------------------------------------------------------------- CAR
export interface CarOpts {
  t: number;
  col?: string;
  flip?: boolean;
  /** 0..1 roof light / beacon strength */
  beacon?: number;
  taxi?: boolean;
  driver?: boolean;
  /** wheels spin with distance travelled */
  roll?: number;
  headlights?: boolean;
  scale?: number;
}

/** Side-view painted car. (x, y) is the road under the wheels. */
export function car(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, o: CarOpts) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale((o.flip ? -1 : 1) * (o.scale ?? 1), o.scale ?? 1);
  const col = o.col || (o.taxi ? UB.lemon : UB.jet);
  const bounce = Math.sin(o.t * 7) * s * 0.03;
  ctx.translate(0, bounce);

  paint(ctx, ellPts(0, s * 0.1, s * 2.5, s * 0.35, 20, s * 0.04), { fill: PAL.ink, fillOp: 58, bleed: 0.25, tex: 0.2, ink: null });

  // body
  paint(ctx, [
    [-2.4 * s, -0.25 * s], [-2.45 * s, -0.95 * s], [-1.75 * s, -1.05 * s],
    [-1.15 * s, -1.75 * s], [0.95 * s, -1.8 * s], [1.6 * s, -1.05 * s],
    [2.4 * s, -0.95 * s], [2.45 * s, -0.25 * s]
  ], { wash: col, ink: PAL.ink, sw: 1.3, curv: 0.32 });
  // lower shade
  paint(ctx, rectPts(-2.3 * s, -0.55 * s, 4.6 * s, 0.34 * s, s * 0.03), {
    fill: mixCol(col, PAL.ink, 0.5), fillOp: 120, bleed: 0.05, tex: 0.6, ink: null
  });
  // windows
  paint(ctx, [[-1.05 * s, -1.08 * s], [-0.6 * s, -1.62 * s], [0.18 * s, -1.63 * s], [0.18 * s, -1.08 * s]], {
    wash: mixCol(UB.haze, PAL.cream, 0.4), ink: PAL.ink, sw: 0.8
  });
  paint(ctx, [[0.36 * s, -1.08 * s], [0.36 * s, -1.63 * s], [0.9 * s, -1.6 * s], [1.3 * s, -1.08 * s]], {
    wash: mixCol(UB.haze, PAL.cream, 0.4), ink: PAL.ink, sw: 0.8
  });
  if (o.driver) {
    paint(ctx, ellPts(-0.3 * s, -1.3 * s, 0.22 * s, 0.26 * s, 12, s * 0.02), { wash: '#F0B894', ink: PAL.ink, sw: 0.6 });
  }
  // wheels
  const spin = (o.roll ?? o.t * 4);
  for (const wx of [-1.45, 1.4]) {
    paint(ctx, ellPts(wx * s, -0.28 * s, s * 0.5, s * 0.5, 16, s * 0.02), { wash: '#17181B', ink: PAL.ink, sw: 1 });
    ctx.save();
    ctx.translate(wx * s, -0.28 * s);
    ctx.rotate(spin);
    for (let i = 0; i < 4; i++) { ctx.save(); ctx.rotate((i / 4) * TAU); inkLine(ctx, [[0, 0], [s * 0.3, 0]], 1.1, UB.haze, 0); ctx.restore(); }
    ctx.restore();
    paint(ctx, ellPts(wx * s, -0.28 * s, s * 0.14, s * 0.14, 10, 0), { wash: UB.haze, ink: null });
  }
  // lights
  if (o.headlights !== false) {
    paint(ctx, ellPts(2.38 * s, -0.72 * s, s * 0.14, s * 0.1, 10, 0), { wash: '#FFF1C4', ink: PAL.ink, sw: 0.5 });
    paint(ctx, ellPts(-2.38 * s, -0.72 * s, s * 0.12, s * 0.09, 10, 0), { wash: UB.surge, ink: PAL.ink, sw: 0.5 });
  }
  // taxi roof sign
  if (o.taxi) {
    paint(ctx, rrPts(-0.5 * s, -2.1 * s, 1.0 * s, 0.34 * s, s * 0.08, s * 0.02), { wash: PAL.cream, ink: PAL.ink, sw: 0.7 });
    letter(ctx, 'TAXI', 0, -1.93 * s, s * 0.26, UB.jet, { ink: false });
  }
  // app beacon
  if (o.beacon) {
    const b = clamp(o.beacon) * (0.6 + Math.abs(Math.sin(o.t * 5)) * 0.4);
    blob(ctx, 0, -2.2 * s, s * 0.8 * b, UB.mint, { alpha: 0.5 * b, seed: 7 });
    paint(ctx, rrPts(-0.34 * s, -2.32 * s, 0.68 * s, 0.3 * s, s * 0.07, s * 0.02), { wash: UB.mint, ink: PAL.ink, sw: 0.6 });
  }
  ctx.restore();
}

// ---------------------------------------------------------------- PHONE
export interface PhoneScreen {
  kind: 'map' | 'eta' | 'surge' | 'rating' | 'eats' | 'request' | 'blank';
  t: number;
  label?: string;
  value?: string;
  /** 0..1 animation progress for the screen's own motion */
  k?: number;
}

/** Big hero phone. (x, y) is the centre. w is the body width. */
export function phone(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, scr: PhoneScreen) {
  const h = w * 2.0;
  ctx.save();
  ctx.translate(x, y);
  paint(ctx, rrPts(-w / 2, -h / 2, w, h, w * 0.12, w * 0.012), { wash: UB.jet, ink: PAL.ink, sw: 2 });
  const sw2 = w * 0.86, sh = h * 0.86;
  paint(ctx, rrPts(-sw2 / 2, -sh / 2, sw2, sh, w * 0.07, w * 0.008), { wash: PAL.cream, ink: null });

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(-sw2 / 2, -sh / 2, sw2, sh, w * 0.07);
  ctx.clip();

  const t = scr.t;
  if (scr.kind === 'map' || scr.kind === 'request' || scr.kind === 'eta') {
    // street grid
    paint(ctx, rectPts(-sw2 / 2, -sh / 2, sw2, sh, 0), { wash: mixCol(PAL.cream, UB.haze, 0.5), ink: null });
    for (let i = -3; i <= 3; i++) {
      inkLine(ctx, [[-sw2 / 2, i * sh * 0.14], [sw2 / 2, i * sh * 0.14]], w * 0.028, PAL.cream, 0);
      inkLine(ctx, [[i * sw2 * 0.2, -sh / 2], [i * sw2 * 0.2, sh / 2]], w * 0.028, PAL.cream, 0);
    }
    // route
    const rk = scr.k ?? clamp((t % 3) / 2.2);
    const route: Array<[number, number]> = [
      [-sw2 * 0.28, sh * 0.3], [-sw2 * 0.28, 0], [sw2 * 0.1, 0], [sw2 * 0.1, -sh * 0.26]
    ];
    const drawn: Array<[number, number]> = [route[0]];
    const total = route.length - 1;
    for (let i = 1; i <= total; i++) {
      const seg = clamp(rk * total - (i - 1));
      const a = route[i - 1], b = route[i];
      drawn.push([a[0] + (b[0] - a[0]) * seg, a[1] + (b[1] - a[1]) * seg]);
      if (seg < 1) break;
    }
    if (drawn.length > 1) inkLine(ctx, drawn, w * 0.05, UB.signal, 0.1);
    // destination pin
    pin(ctx, sw2 * 0.1, -sh * 0.26, w * 0.09, { t, face: 'normal', noShadow: true, seed: 3 });
    // car approaching
    if (scr.kind !== 'map') car(ctx, -sw2 * 0.28, sh * 0.3, w * 0.07, { t, beacon: 0.8 });
  } else if (scr.kind === 'surge') {
    paint(ctx, rectPts(-sw2 / 2, -sh / 2, sw2, sh, 0), { wash: mixCol(PAL.cream, UB.surge, 0.18), ink: null });
    blob(ctx, 0, -sh * 0.1, w * 0.42, UB.surge, { alpha: 0.4 + Math.sin(t * 6) * 0.1, seed: 11 });
    inkLine(ctx, [[-w * 0.08, -sh * 0.28], [w * 0.04, -sh * 0.06], [-w * 0.03, -sh * 0.06], [w * 0.08, sh * 0.16]], w * 0.05, UB.surge, 0.1);
  } else if (scr.kind === 'rating') {
    paint(ctx, rectPts(-sw2 / 2, -sh / 2, sw2, sh, 0), { wash: PAL.cream, ink: null });
    for (let i = 0; i < 5; i++) {
      const lit = i < Math.floor((scr.k ?? 1) * 5 + 0.001);
      paint(ctx, starPts(-sw2 * 0.32 + i * sw2 * 0.16, -sh * 0.05, w * 0.07, 0.45, 5), {
        wash: lit ? UB.lemon : mixCol(PAL.cream, UB.haze, 0.8), ink: PAL.ink, sw: 0.6
      });
    }
  } else if (scr.kind === 'eats') {
    paint(ctx, rectPts(-sw2 / 2, -sh / 2, sw2, sh, 0), { wash: mixCol(PAL.cream, UB.mint, 0.14), ink: null });
    paint(ctx, rrPts(-sw2 * 0.26, -sh * 0.22, sw2 * 0.52, sh * 0.3, w * 0.05, w * 0.01), { wash: '#C4703C', ink: PAL.ink, sw: 0.8 });
    paint(ctx, ellPts(0, -sh * 0.22, sw2 * 0.26, sh * 0.06, 16, w * 0.01), { wash: '#E0A063', ink: PAL.ink, sw: 0.7 });
  } else {
    paint(ctx, rectPts(-sw2 / 2, -sh / 2, sw2, sh, 0), { wash: PAL.cream, ink: null });
  }

  // label / value overlay
  if (scr.label) letter(ctx, scr.label, 0, sh * 0.33, w * 0.11, PAL.ink, { ink: false });
  if (scr.value) letter(ctx, scr.value, 0, sh * 0.43, w * 0.14, UB.jet, { ink: false });
  ctx.restore();

  // notch + button
  paint(ctx, rrPts(-w * 0.14, -h * 0.47, w * 0.28, w * 0.05, w * 0.025, 0), { wash: '#0E0F12', ink: null });
  ctx.restore();
}

// ---------------------------------------------------------------- WORLD
/** Painted city skyline band. */
export function skyline(
  ctx: CanvasRenderingContext2D, W: number, baseY: number,
  seed = 1, col = UB.slate, alpha = 0.5, scale = 1
) {
  ctx.save();
  ctx.globalAlpha = alpha;
  let x = -40;
  let i = 0;
  while (x < W + 40) {
    const w = 46 + hash(seed * 7 + i) * 70;
    const h = (70 + hash(seed * 3 + i * 5) * 190) * scale;
    paint(ctx, rectPts(x, baseY - h, w, h, 2), { wash: col, ink: null });
    // windows
    const rows = Math.floor(h / 26);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < 3; c++) {
        if (hash(i * 31 + r * 7 + c) > 0.55) {
          paint(ctx, rectPts(x + 8 + c * (w - 16) / 3, baseY - h + 10 + r * 24, 8, 10, 0.4), {
            wash: mixCol(UB.lemon, PAL.cream, 0.3), ink: null
          });
        }
      }
    }
    x += w + 8 + hash(i * 13) * 14;
    i++;
  }
  ctx.restore();
}

/** Perspective street grid receding to a vanishing point. */
export function streetGrid(
  ctx: CanvasRenderingContext2D, W: number, horizonY: number, bottomY: number,
  t: number, col = UB.haze, lines = 9
) {
  const vx = W / 2;
  for (let i = 0; i <= lines; i++) {
    const k = i / lines;
    const bx = -W * 0.5 + k * W * 2;
    inkLine(ctx, [[vx, horizonY], [bx, bottomY]], 1.6, col, 0);
  }
  for (let i = 1; i <= 7; i++) {
    const k = Math.pow((i + (t * 0.25 % 1)) / 8, 2.1);
    const y = horizonY + (bottomY - horizonY) * k;
    inkLine(ctx, [[vx - (vx + W * 0.5) * k, y], [vx + (vx + W * 0.5) * k, y]], 1.4, col, 0);
  }
}

/** The surge multiplier badge. */
export function surgeBadge(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, mult: string, t: number) {
  const pulse = 1 + Math.sin(t * 7) * 0.05;
  blob(ctx, x, y, r * 1.5 * pulse, UB.surge, { alpha: 0.35, seed: 21 });
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(pulse, pulse);
  paint(ctx, starPts(0, 0, r, 0.62, 8, t * 0.4), { wash: UB.surge, ink: PAL.ink, sw: 1.6 });
  letter(ctx, mult, 0, 0, r * 0.72, PAL.cream, { ink: false });
  ctx.restore();
  inkLine(ctx, [[x - r * 0.3, y - r * 1.5], [x + r * 0.1, y - r * 0.7], [x - r * 0.12, y - r * 0.7], [x + r * 0.28, y + r * 0.1]], 3, UB.lemon, 0.1);
}

/** An official with a clipboard — regulators, courts, commissions. */
export function official(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, angry = false) {
  person(ctx, x, y, s, { t, coat: UB.signal, mood: angry ? 'shout' : 'annoyed', arm: 0.95 });
  ctx.save();
  ctx.translate(x - 2.6 * s, y - 7.6 * s);
  ctx.rotate(-0.2);
  paint(ctx, rectPts(-0.9 * s, -1.2 * s, 1.8 * s, 2.4 * s, s * 0.05), { wash: PAL.cream, ink: PAL.ink, sw: 0.8 });
  for (let i = 0; i < 4; i++) inkLine(ctx, [[-0.6 * s, -0.8 * s + i * 0.5 * s], [0.6 * s - (i % 2) * 0.3 * s, -0.8 * s + i * 0.5 * s]], 0.8, mixCol(PAL.cream, PAL.ink, 0.5), 0);
  ctx.restore();
}

/** Growth curve that draws itself, with optional axis labels. */
export function growthCurve(
  ctx: CanvasRenderingContext2D, ox: number, oy: number, w: number, h: number,
  k: number, col: string, power = 2.2
) {
  inkLine(ctx, [[ox, oy], [ox + w, oy]], 2.2, PAL.ink, 0);
  inkLine(ctx, [[ox, oy], [ox, oy - h]], 2.2, PAL.ink, 0);
  const kk = clamp(k);
  if (kk <= 0.01) return;
  const pts: Array<[number, number]> = [];
  for (let i = 0; i <= 44; i++) {
    const p = (i / 44) * kk;
    pts.push([ox + p * w, oy - Math.pow(p, power) * h]);
  }
  inkLine(ctx, pts, 3.4, col, 0.3);
  const tip = pts[pts.length - 1];
  paint(ctx, ellPts(tip[0], tip[1], 6, 6, 10, 0.4), { wash: col, ink: PAL.ink, sw: 1 });
}
