/**
 * openaiCast.ts — bespoke painted cast + polish layer for the OpenAI film.
 *
 * Protagonists:
 *   CARET — a blinking text cursor with a face. The interface character:
 *           it types, waits, panics, reasons and takes the final bow.
 *   BLOOM — a six-petal knot. The *model* itself: petals light up as it
 *           scales, it dims when starved, pulses while it thinks.
 *
 * Everything is drawn in the same watercolour + boiling-ink language as the
 * other films, but this module adds a deliberate polish pass: layered glows,
 * three-plane depth, light shafts, and consistent stage framing.
 */

import {
  PAL, TAU, clamp, paint, inkLine, rectPts, ellPts, rrPts, starPts,
  hash, letter, mixCol, paper, ground
} from './painter';

export const OA = {
  ink: '#1A1B20',
  slate: '#3A3F4B',
  mist: '#C7D0DA',
  teal: '#10A37F',      // the signal green
  tealLt: '#5FD4B4',
  deep: '#0E2A3A',
  violet: '#6C5CE7',
  amber: '#E8A33D',
  rose: '#E2574C',
  cream: '#FFF6E8'
};

// ============================================================ POLISH LAYER

/** Multi-layer soft bloom. The single biggest win for perceived polish. */
export function glow(
  ctx: CanvasRenderingContext2D, x: number, y: number, r: number,
  col: string, alpha = 0.4, layers = 4, seed = 1
) {
  for (let i = layers; i >= 1; i--) {
    const k = i / layers;
    paint(ctx, ellPts(x, y, r * k, r * k * (0.9 + hash(seed + i) * 0.16), 20, r * 0.03 * k, hash(seed * 3 + i) * 2), {
      fill: col,
      fillOp: Math.floor(255 * alpha * (1 - k) * 0.55 + 255 * alpha * 0.1),
      bleed: 0.25, tex: 0.35, border: 0.2, ink: null
    });
  }
}

/** A soft diagonal light shaft — adds atmosphere and directionality. */
export function lightShaft(
  ctx: CanvasRenderingContext2D, H: number,
  fromX: number, spread = 300, col = OA.cream, alpha = 0.16, tilt = 0.32
) {
  ctx.save();
  ctx.globalAlpha = alpha;
  for (let i = 0; i < 3; i++) {
    const off = (i - 1) * spread * 0.42;
    const w = spread * (0.5 + i * 0.22);
    paint(ctx, [
      [fromX + off - w * 0.18, -40],
      [fromX + off + w * 0.18, -40],
      [fromX + off + w * 0.6 + H * tilt, H + 40],
      [fromX + off - w * 0.6 + H * tilt, H + 40]
    ], { fill: col, fillOp: 70 - i * 18, bleed: 0.3, tex: 0.25, ink: null });
  }
  ctx.restore();
}

/** Consistent stage: paper, tint, depth planes, optional shaft + ground. */
export interface StageOpts {
  tint?: string;
  night?: number;         // 0..1 how dark the upper field is
  shaft?: { x: number; alpha?: number; col?: string } | null;
  skylineY?: number;
  skylineAlpha?: number;
  groundY?: number | null;
  groundCol?: string;
  seed?: number;
}
export function stage(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, o: StageOpts = {}) {
  paper(ctx, W, H, o.tint ?? '#DCE4E6');
  if (o.night) {
    paint(ctx, rectPts(-40, -40, W + 80, H * 0.78, 4), {
      fill: OA.deep, fillOp: Math.floor(235 * o.night), bleed: 0.05, tex: 0.45, ink: null
    });
  }
  if (o.skylineY != null) depthSkyline(ctx, W, o.skylineY, o.seed ?? 3, o.skylineAlpha ?? 0.4);
  if (o.shaft) lightShaft(ctx, H, o.shaft.x, 320, o.shaft.col ?? OA.cream, o.shaft.alpha ?? 0.14);
  if (o.groundY != null) ground(ctx, W, o.groundY, o.groundCol ?? OA.slate);
  void t;
}

/** Three-plane skyline: far haze, mid blocks, near silhouettes. */
export function depthSkyline(ctx: CanvasRenderingContext2D, W: number, baseY: number, seed = 1, alpha = 0.4) {
  const planes: Array<[number, number, string]> = [
    [0.42, 0.34, mixCol(OA.mist, OA.deep, 0.25)],
    [0.70, 0.62, mixCol(OA.slate, OA.deep, 0.35)],
    [1.00, 1.00, mixCol(OA.ink, OA.deep, 0.45)]
  ];
  planes.forEach(([scale, op, col], pi) => {
    ctx.save();
    ctx.globalAlpha = alpha * op;
    let x = -60;
    let i = 0;
    while (x < W + 60) {
      const w = (50 + hash(seed * 7 + pi * 31 + i) * 84) * (0.7 + scale * 0.5);
      const h = (54 + hash(seed * 3 + pi * 17 + i * 5) * 170) * scale;
      paint(ctx, rectPts(x, baseY - h, w, h + 40, 2), { wash: col, ink: null });
      if (pi === 2) {
        const rows = Math.floor(h / 30);
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < 2; c++) {
            if (hash(i * 41 + r * 9 + c + pi) > 0.62) {
              paint(ctx, rectPts(x + 10 + c * (w - 22) / 2, baseY - h + 12 + r * 28, 7, 9, 0.4), {
                wash: mixCol(OA.amber, OA.cream, 0.35), ink: null
              });
            }
          }
        }
      }
      x += w + 6 + hash(i * 13 + pi) * 16;
      i++;
    }
    ctx.restore();
  });
}

/** Painted panel with a soft drop shadow — used for every card/figure. */
export function panel(
  ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number,
  col = PAL.cream, ink: string | null = PAL.ink, r = 12
) {
  paint(ctx, rrPts(x - w / 2 + 5, y - h / 2 + 9, w, h, r, 2), {
    fill: PAL.ink, fillOp: 44, bleed: 0.25, tex: 0.2, ink: null
  });
  paint(ctx, rrPts(x - w / 2, y - h / 2, w, h, r, 1.6), { wash: col, ink, sw: 1.6 });
}

// ============================================================ CARET

export type CaretFace =
  | 'normal' | 'happy' | 'wink' | 'closed' | 'worried' | 'shocked'
  | 'sad' | 'determined' | 'star' | 'think' | 'sleep' | 'shades';

export interface CaretOpts {
  t: number;
  dy?: number;
  sq?: number;
  rot?: number;
  face?: CaretFace;
  talk?: boolean;
  talkT?: number;
  col?: string;
  /** cursor blink: fades the body like a real caret when idle */
  blink?: boolean;
  aL?: number;
  aR?: number;
  emote?: '!' | '?' | '!!' | 'zzz' | 'spark' | 'heart' | 'sweat' | '…' | null;
  emoteK?: number;
  seed?: number;
  noShadow?: boolean;
  scale?: number;
}

/** CARET — a text cursor with a face. (x, y) is the baseline it sits on. */
export function caret(ctx: CanvasRenderingContext2D, x: number, y: number, u: number, o: CaretOpts) {
  const t = o.t;
  const dy = (o.dy || 0) * u;
  const sq = o.sq || 0;
  const col = o.col || OA.ink;
  const sw = clamp(u / 7, 0.7, 3);
  const H = u * 6.0;          // body height
  const Wd = u * 2.25;        // body width
  const s = o.scale ?? 1;

  if (!o.noShadow) {
    const lift = Math.max(0, -(o.dy || 0));
    const f = 1 - Math.min(0.5, lift * 0.09);
    paint(ctx, ellPts(x, y + u * 0.14, u * 1.7 * f * s, u * 0.4 * f * s, 18, u * 0.04), {
      fill: PAL.ink, fillOp: 58, bleed: 0.25, tex: 0.22, border: 0.1, ink: null
    });
  }

  // caret blink — a real cursor fades; keep it subtle so the face stays legible
  const blinkA = o.blink ? 0.55 + 0.45 * (Math.sin(t * 4.2) > -0.35 ? 1 : 0.18) : 1;

  ctx.save();
  ctx.globalAlpha = blinkA;
  ctx.translate(x, y + dy);
  ctx.scale(s * (1 + sq * 0.45), s * (1 - sq));
  if (o.rot) ctx.rotate(o.rot);

  // serifs — the little top/bottom bars of an I-beam cursor
  paint(ctx, rrPts(-Wd * 0.95, -H, Wd * 1.9, u * 0.5, u * 0.16, u * 0.03), { wash: col, ink: null });
  paint(ctx, rrPts(-Wd * 0.95, -u * 0.5, Wd * 1.9, u * 0.5, u * 0.16, u * 0.03), { wash: col, ink: null });

  // body
  const body = rrPts(-Wd / 2, -H, Wd, H, u * 0.42, u * 0.04);
  paint(ctx, body, { wash: col, washOp: 255, ink: null });
  paint(ctx, rrPts(-Wd / 2 + u * 0.12, -H + u * 0.2, Wd * 0.42, H * 0.42, u * 0.3, u * 0.05), {
    fill: mixCol(col, PAL.cream, 0.5), fillOp: 95, bleed: 0.2, tex: 0.7, border: 0.5, ink: null
  });
  paint(ctx, body, { ink: PAL.ink, sw });

  // face window
  const fy = -H * 0.70;
  paint(ctx, rrPts(-Wd * 0.40, fy - u * 0.72, Wd * 0.80, u * 1.5, u * 0.3, u * 0.02), {
    wash: PAL.cream, washOp: 248, ink: PAL.ink, sw: sw * 0.55
  });

  const f = o.face || 'normal';
  const nat = f === 'normal' && ((t * 0.85 + (o.seed || 0) * 1.9) % 3.6) < 0.1;
  const ex = Wd * 0.17, ey = fy - u * 0.18;
  if (f === 'shades') {
    paint(ctx, rrPts(-Wd * 0.36, ey - u * 0.22, Wd * 0.72, u * 0.44, u * 0.1, 0.4), { wash: PAL.ink, ink: null });
    inkLine(ctx, [[-Wd * 0.3, ey - u * 0.1], [-Wd * 0.14, ey - u * 0.14]], sw * 0.4, PAL.cream, 0);
  } else if (f === 'closed' || nat || f === 'happy') {
    for (const sx of [-ex, ex]) {
      inkLine(ctx, [[sx - u * 0.17, ey], [sx, ey - (f === 'happy' ? u * 0.17 : -u * 0.05)], [sx + u * 0.17, ey]], sw * 0.6, PAL.ink, 0.5);
    }
  } else if (f === 'shocked') {
    for (const sx of [-ex, ex]) {
      paint(ctx, ellPts(sx, ey, u * 0.22, u * 0.25, 12, u * 0.01), { wash: PAL.cream, ink: PAL.ink, sw: sw * 0.45 });
      paint(ctx, ellPts(sx, ey, u * 0.09, u * 0.1, 8, 0), { wash: PAL.ink, ink: null });
    }
  } else if (f === 'worried' || f === 'sad') {
    for (const sx of [-ex, ex]) paint(ctx, ellPts(sx, ey + u * 0.03, u * 0.13, u * 0.15, 10, 0), { wash: PAL.ink, ink: null });
    inkLine(ctx, [[-ex - u * 0.2, ey - u * 0.34], [-ex + u * 0.16, ey - u * 0.2]], sw * 0.5, PAL.ink, 0.2);
    inkLine(ctx, [[ex - u * 0.16, ey - u * 0.2], [ex + u * 0.2, ey - u * 0.34]], sw * 0.5, PAL.ink, 0.2);
  } else if (f === 'determined') {
    for (const sx of [-ex, ex]) paint(ctx, ellPts(sx, ey + u * 0.04, u * 0.15, u * 0.11, 10, 0), { wash: PAL.ink, ink: null });
    inkLine(ctx, [[-ex - u * 0.22, ey - u * 0.3], [-ex + u * 0.14, ey - u * 0.12]], sw * 0.55, PAL.ink, 0.1);
    inkLine(ctx, [[ex - u * 0.14, ey - u * 0.12], [ex + u * 0.22, ey - u * 0.3]], sw * 0.55, PAL.ink, 0.1);
  } else if (f === 'star') {
    for (const sx of [-ex, ex]) paint(ctx, starPts(sx, ey, u * 0.24, 0.42, 4, t * 2), { wash: OA.amber, ink: null });
  } else if (f === 'think') {
    for (const sx of [-ex, ex]) paint(ctx, ellPts(sx, ey - u * 0.04, u * 0.12, u * 0.13, 10, 0), { wash: PAL.ink, ink: null });
    inkLine(ctx, [[-ex - u * 0.2, ey - u * 0.3], [ex + u * 0.2, ey - u * 0.3]], sw * 0.45, PAL.ink, 0.3);
  } else if (f === 'sleep') {
    for (const sx of [-ex, ex]) inkLine(ctx, [[sx - u * 0.17, ey], [sx + u * 0.17, ey]], sw * 0.6, PAL.ink, 0);
  } else if (f === 'wink') {
    inkLine(ctx, [[-ex - u * 0.17, ey], [-ex, ey - u * 0.17], [-ex + u * 0.17, ey]], sw * 0.6, PAL.ink, 0.5);
    paint(ctx, ellPts(ex, ey, u * 0.13, u * 0.15, 10, 0), { wash: PAL.ink, ink: null });
  } else {
    for (const sx of [-ex, ex]) {
      paint(ctx, ellPts(sx, ey, u * 0.13, u * 0.15, 10, 0), { wash: PAL.ink, ink: null });
      if (u > 10) paint(ctx, ellPts(sx - u * 0.04, ey - u * 0.05, u * 0.045, u * 0.05, 8, 0), { wash: PAL.cream, ink: null });
    }
  }

  // mouth
  const my = fy + u * 0.42;
  if (o.talk && Math.sin((o.talkT ?? t) * 13) > -0.15) {
    paint(ctx, ellPts(0, my, u * 0.14, u * 0.18, 10, 0), { wash: '#4A1F2A', ink: null });
  } else if (f === 'happy' || f === 'star') {
    inkLine(ctx, [[-u * 0.2, my - u * 0.05], [0, my + u * 0.12], [u * 0.2, my - u * 0.05]], sw * 0.5, PAL.ink, 0.6);
  } else if (f === 'sad' || f === 'worried') {
    inkLine(ctx, [[-u * 0.18, my + u * 0.07], [0, my - u * 0.05], [u * 0.18, my + u * 0.07]], sw * 0.5, PAL.ink, 0.6);
  } else if (f === 'shocked') {
    paint(ctx, ellPts(0, my, u * 0.11, u * 0.14, 10, 0), { wash: PAL.ink, ink: null });
  } else {
    inkLine(ctx, [[-u * 0.14, my], [u * 0.14, my]], sw * 0.5, PAL.ink, 0.2);
  }

  // arms
  const arm = (side: number, a: number) => {
    ctx.save();
    ctx.translate(side * Wd * 0.48, -H * 0.42);
    ctx.rotate(side < 0 ? a : -a);
    paint(ctx, rrPts(side < 0 ? -u * 1.25 : 0, -u * 0.17, u * 1.25, u * 0.34, u * 0.17, u * 0.02), {
      wash: col, ink: PAL.ink, sw: sw * 0.6
    });
    ctx.restore();
  };
  if (o.aL != null) arm(-1, o.aL);
  if (o.aR != null) arm(1, o.aR);

  ctx.restore();

  if (o.emote) {
    const k = clamp(o.emoteK ?? 1, 0, 1.4);
    const exx = x + u * 1.9 * s, eyy = y + dy - u * 6.4 * s;
    if (k > 0.02) {
      if (o.emote === 'zzz') {
        letter(ctx, 'z', exx, eyy, u * 1.0, PAL.ink, { pop: k, alpha: 0.8 });
        letter(ctx, 'z', exx + u * 0.6, eyy - u * 0.8, u * 1.4, PAL.ink, { pop: k * 0.8, alpha: 0.5 });
      } else if (o.emote === 'spark') {
        paint(ctx, starPts(exx, eyy, u * 0.8 * k, 0.42, 4), { wash: OA.amber, ink: PAL.ink, sw: 0.9 });
      } else if (o.emote === 'heart') {
        paint(ctx, starPts(exx, eyy, u * 0.72 * k, 0.55, 2, -Math.PI / 2), { wash: PAL.rose, ink: PAL.ink, sw: 0.9 });
      } else if (o.emote === 'sweat') {
        paint(ctx, [[exx, eyy - u * 0.6], [exx + u * 0.34, eyy], [exx, eyy + u * 0.5], [exx - u * 0.34, eyy]], {
          fill: OA.mist, fillOp: 225, bleed: 0.2, ink: PAL.ink, sw: 0.8, curv: 0.5
        });
      } else if (o.emote === '…') {
        for (let i = 0; i < 3; i++) {
          const on = (Math.floor(t * 3) % 3) >= i;
          paint(ctx, ellPts(exx - u * 0.6 + i * u * 0.6, eyy, u * 0.16, u * 0.16, 8, 0), {
            wash: on ? OA.teal : mixCol(OA.mist, PAL.cream, 0.4), ink: null
          });
        }
      } else {
        letter(ctx, o.emote, exx, eyy, u * 1.6, o.emote === '?' ? OA.violet : OA.rose, { pop: k, stroke: true });
      }
    }
  }
}

// ============================================================ BLOOM

export interface BloomOpts {
  t: number;
  /** 0..6 — how many petals are lit (the model's scale) */
  lit?: number;
  /** 0..1 — glow strength / health */
  energy?: number;
  /** spin speed multiplier */
  spin?: number;
  col?: string;
  litCol?: string;
  /** 0..1 — pulsing "thinking" ring */
  thinking?: number;
  seed?: number;
}

/** BLOOM — the six-petal knot that stands for the model itself. */
export function bloom(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, o: BloomOpts) {
  const t = o.t;
  const lit = clamp(o.lit ?? 6, 0, 6);
  const energy = clamp(o.energy ?? 1);
  const col = o.col || mixCol(OA.slate, OA.mist, 0.35);
  const litCol = o.litCol || OA.teal;
  const spin = t * 0.22 * (o.spin ?? 1);

  if (energy > 0.02) glow(ctx, x, y, r * 2.0, litCol, 0.32 * energy, 4, o.seed ?? 5);

  // thinking ring — dashes orbiting the knot
  if (o.thinking) {
    const k = clamp(o.thinking);
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * TAU + t * 1.6;
      const rr = r * 1.55;
      const on = ((Math.floor(t * 6) + i) % 12) < 5;
      if (!on) continue;
      paint(ctx, ellPts(x + Math.cos(a) * rr, y + Math.sin(a) * rr, r * 0.07, r * 0.07, 8, 0), {
        wash: litCol, ink: null, alpha: 0.35 + k * 0.5
      });
    }
  }

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(spin);

  // six petals: each is a rounded loop reaching out from the hub
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * TAU;
    const isLit = i < Math.floor(lit) || (i === Math.floor(lit) && lit % 1 > 0.35);
    const pcol = isLit ? litCol : col;
    ctx.save();
    ctx.rotate(a);
    const pts: Array<[number, number]> = [];
    const N = 16;
    for (let j = 0; j <= N; j++) {
      const p = j / N;
      const ang = -0.52 + p * 1.04;
      const rad = r * (0.42 + Math.sin(p * Math.PI) * 0.62);
      pts.push([Math.cos(ang) * rad, Math.sin(ang) * rad]);
    }
    for (let j = N; j >= 0; j--) {
      const p = j / N;
      const ang = -0.52 + p * 1.04;
      const rad = r * (0.42 + Math.sin(p * Math.PI) * 0.62) - r * 0.20;
      pts.push([Math.cos(ang) * rad, Math.sin(ang) * rad]);
    }
    paint(ctx, pts, {
      wash: pcol, washOp: isLit ? 255 : 200,
      ink: PAL.ink, sw: r * 0.035, curv: 0.5
    });
    if (isLit) {
      paint(ctx, pts, { fill: mixCol(pcol, PAL.cream, 0.55), fillOp: 70, bleed: 0.2, tex: 0.6, ink: null, curv: 0.5 });
    }
    ctx.restore();
  }

  // hub
  paint(ctx, ellPts(0, 0, r * 0.3, r * 0.3, 16, r * 0.012), {
    wash: mixCol(col, PAL.cream, 0.3), ink: PAL.ink, sw: r * 0.035
  });
  if (energy > 0.3) {
    paint(ctx, ellPts(0, 0, r * 0.16 * (0.9 + Math.sin(t * 3) * 0.1), r * 0.16, 12, 0), {
      wash: litCol, ink: null
    });
  }
  ctx.restore();
}

// ============================================================ PEOPLE

export interface ScientistOpts {
  t: number;
  flip?: boolean;
  mood?: 'normal' | 'happy' | 'worried' | 'tired' | 'shout';
  talk?: boolean;
  talkT?: number;
  coat?: string;
  arm?: number;
  dy?: number;
  /** holds a tablet / paper */
  prop?: 'tablet' | 'paper' | null;
}

/** A researcher: hoodie, lanyard, messy hair. s ≈ height/13. */
export function scientist(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, o: ScientistOpts) {
  ctx.save();
  ctx.translate(x, y + (o.dy || 0) * s);
  ctx.scale(o.flip ? -1 : 1, 1);
  const coat = o.coat || OA.slate;
  const skin = '#F0B894';

  paint(ctx, ellPts(0, s * 0.12, 4.3 * s, 0.82 * s, 18, s * 0.1), {
    fill: PAL.ink, fillOp: 52, bleed: 0.25, tex: 0.2, ink: null
  });
  for (const lx of [-1.5, 0.5]) paint(ctx, rectPts(lx * s, -3.0 * s, 1.1 * s, 3.0 * s, s * 0.05), { wash: mixCol(coat, PAL.ink, 0.45), ink: PAL.ink, sw: 0.8 });
  paint(ctx, rectPts(-1.85 * s, -0.5 * s, 1.75 * s, 0.5 * s, s * 0.04), { wash: PAL.ink, ink: null });
  paint(ctx, rectPts(0.4 * s, -0.5 * s, 1.75 * s, 0.5 * s, s * 0.04), { wash: PAL.ink, ink: null });

  // hoodie torso
  paint(ctx, rrPts(-2.4 * s, -8.3 * s, 4.8 * s, 5.5 * s, s * 0.8, s * 0.06), { wash: coat, ink: PAL.ink, sw: 1 });
  // hood
  paint(ctx, [[-2.3 * s, -8.0 * s], [0, -9.1 * s], [2.3 * s, -8.0 * s], [1.5 * s, -7.3 * s], [-1.5 * s, -7.3 * s]], {
    wash: mixCol(coat, PAL.ink, 0.25), ink: PAL.ink, sw: 0.8, curv: 0.3
  });
  // lanyard
  inkLine(ctx, [[-0.9 * s, -8.1 * s], [-0.2 * s, -6.2 * s]], 1.1, OA.teal, 0.3);
  inkLine(ctx, [[0.9 * s, -8.1 * s], [0.2 * s, -6.2 * s]], 1.1, OA.teal, 0.3);
  paint(ctx, rectPts(-0.42 * s, -6.3 * s, 0.84 * s, 0.6 * s, s * 0.03), { wash: PAL.cream, ink: PAL.ink, sw: 0.6 });

  const armA = o.arm ?? (o.prop ? 0.95 : 0.22);
  for (const side of [-1, 1]) {
    ctx.save();
    ctx.translate(side * 2.4 * s, -7.7 * s);
    ctx.rotate(side < 0 ? armA : -armA * (o.prop ? 0.3 : 1));
    paint(ctx, rrPts(side < 0 ? -2.5 * s : 0, -0.42 * s, 2.5 * s, 0.84 * s, s * 0.4, s * 0.05), { wash: coat, ink: PAL.ink, sw: 0.8 });
    paint(ctx, ellPts(side < 0 ? -2.6 * s : 2.6 * s, 0, 0.44 * s, 0.44 * s, 10, s * 0.04), { wash: skin, ink: PAL.ink, sw: 0.7 });
    ctx.restore();
  }
  if (o.prop) {
    ctx.save();
    ctx.translate(-2.4 * s, -7.7 * s); ctx.rotate(armA); ctx.translate(-2.6 * s, 0);
    if (o.prop === 'tablet') {
      paint(ctx, rrPts(-0.7 * s, -1.0 * s, 1.4 * s, 2.0 * s, s * 0.1, s * 0.02), { wash: OA.ink, ink: PAL.ink, sw: 0.7 });
      paint(ctx, rrPts(-0.56 * s, -0.86 * s, 1.12 * s, 1.72 * s, s * 0.06, 0), {
        wash: mixCol(OA.teal, PAL.cream, 0.5 + Math.sin(o.t * 4) * 0.1), ink: null
      });
    } else {
      paint(ctx, rectPts(-0.75 * s, -1.0 * s, 1.5 * s, 2.0 * s, s * 0.03), { wash: PAL.cream, ink: PAL.ink, sw: 0.7 });
      for (let i = 0; i < 4; i++) inkLine(ctx, [[-0.5 * s, -0.6 * s + i * 0.42 * s], [0.5 * s - (i % 2) * 0.25 * s, -0.6 * s + i * 0.42 * s]], 0.7, mixCol(PAL.cream, PAL.ink, 0.5), 0);
    }
    ctx.restore();
  }

  // head
  const hy = -9.4 * s;
  paint(ctx, ellPts(0, hy, 1.32 * s, 1.46 * s, 18, s * 0.06), { wash: skin, ink: PAL.ink, sw: 0.9 });
  ctx.save();
  for (let i = 0; i < 6; i++) {
    const a = Math.PI + (i / 5) * Math.PI;
    const hx = Math.cos(a) * 1.28 * s, hyy = hy + Math.sin(a) * 1.3 * s;
    ctx.strokeStyle = mixCol(PAL.ink, coat, 0.2); ctx.lineWidth = 1; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(hx, hyy);
    ctx.quadraticCurveTo(hx + (hash(i * 3.3) - 0.5) * 1.3 * s, hyy - 1.0 * s, hx + (hash(i * 7.7) - 0.3) * 1.8 * s, hyy - (hash(i * 5) * 0.6 + 0.2) * s);
    ctx.stroke();
  }
  ctx.restore();

  const m = o.mood || 'normal';
  for (const exx of [-0.48, 0.48]) {
    if (m === 'happy') inkLine(ctx, [[exx * s - 0.2 * s, hy + 0.1 * s], [exx * s, hy - 0.12 * s], [exx * s + 0.2 * s, hy + 0.1 * s]], 0.9, PAL.ink, 0.4);
    else if (m === 'tired') inkLine(ctx, [[exx * s - 0.19 * s, hy], [exx * s + 0.19 * s, hy]], 0.9, PAL.ink, 0);
    else paint(ctx, ellPts(exx * s, hy, 0.12 * s, 0.14 * s, 8, 0), { wash: PAL.ink, ink: null });
  }
  const my = hy + 0.72 * s;
  if (o.talk && Math.sin((o.talkT ?? o.t) * 12) > -0.1) paint(ctx, ellPts(0, my, 0.19 * s, 0.23 * s, 10, 0), { wash: PAL.ink, ink: null });
  else if (m === 'happy') inkLine(ctx, [[-0.28 * s, my - 0.07 * s], [0, my + 0.13 * s], [0.28 * s, my - 0.07 * s]], 0.9, PAL.ink, 0.5);
  else if (m === 'worried') inkLine(ctx, [[-0.26 * s, my + 0.07 * s], [0, my - 0.04 * s], [0.26 * s, my + 0.07 * s]], 0.9, PAL.ink, 0.5);
  else if (m === 'shout') paint(ctx, ellPts(0, my, 0.22 * s, 0.28 * s, 10, 0), { wash: '#4A1F2A', ink: PAL.ink, sw: 0.6 });
  else inkLine(ctx, [[-0.24 * s, my], [0.24 * s, my]], 0.9, PAL.ink, 0.2);

  ctx.restore();
}

// ============================================================ PROPS

/** The chat box — the product, in one rectangle. */
export function chatBox(
  ctx: CanvasRenderingContext2D, x: number, y: number, w: number,
  typed: string, t: number, opts: { reply?: string; glowK?: number; label?: string } = {}
) {
  const h = w * 0.3;
  if (opts.glowK) glow(ctx, x, y, w * 0.72, OA.teal, 0.3 * opts.glowK, 4, 12);
  panel(ctx, x, y, w, h, PAL.cream, PAL.ink, 14);
  paint(ctx, rrPts(x - w / 2 + w * 0.04, y - h * 0.3, w * 0.78, h * 0.52, h * 0.16, 1), {
    wash: mixCol(PAL.cream, OA.mist, 0.35), ink: PAL.ink, sw: 1.1
  });
  const cur = Math.sin(t * 7) > 0 ? '|' : ' ';
  letter(ctx, typed + cur, x - w / 2 + w * 0.08, y - h * 0.04, w * 0.045, PAL.ink, { mono: true, align: 'left', ink: false });
  // send button
  paint(ctx, rrPts(x + w * 0.3, y - h * 0.22, w * 0.14, h * 0.36, h * 0.1, 0.8), { wash: OA.teal, ink: PAL.ink, sw: 1 });
  paint(ctx, [[x + w * 0.345, y - h * 0.1], [x + w * 0.395, y - h * 0.04], [x + w * 0.345, y + h * 0.02]], { wash: PAL.cream, ink: null });
  if (opts.reply) {
    letter(ctx, opts.reply, x, y + h * 0.3, w * 0.042, OA.teal, { mono: true, ink: false, alpha: 0.95 });
  }
  if (opts.label) letter(ctx, opts.label, x, y - h * 0.72, w * 0.05, PAL.ink, { ink: false, alpha: 0.85 });
}

/** A stream of tokens flowing along a path. */
export function tokenStream(
  ctx: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number,
  t: number, n = 9, col = OA.teal, speed = 0.4, size = 11
) {
  for (let i = 0; i < n; i++) {
    const p = ((t * speed + i / n) % 1);
    const px = x0 + (x1 - x0) * p, py = y0 + (y1 - y0) * p + Math.sin(p * Math.PI * 2 + i) * 7;
    const a = p < 0.12 ? p / 0.12 : p > 0.88 ? (1 - p) / 0.12 : 1;
    paint(ctx, rrPts(px - size, py - size * 0.45, size * 2, size * 0.9, size * 0.3, 0.5), {
      wash: col, ink: null, alpha: 0.55 * a
    });
  }
}

/** GPU / server rack with blinking lights. */
export function rack(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, t: number, hot = 0.5) {
  panel(ctx, x, y, w, h, OA.ink, PAL.ink, 8);
  const rows = Math.floor(h / (w * 0.22));
  for (let r = 0; r < rows; r++) {
    const ry = y - h / 2 + w * 0.16 + r * (w * 0.22);
    paint(ctx, rrPts(x - w * 0.4, ry - w * 0.07, w * 0.8, w * 0.14, w * 0.03, 0.4), {
      wash: mixCol(OA.ink, OA.slate, 0.55), ink: null
    });
    for (let c = 0; c < 3; c++) {
      const on = hash(r * 7 + c * 3 + Math.floor(t * 5)) < 0.35 + hot * 0.4;
      paint(ctx, ellPts(x - w * 0.3 + c * w * 0.1, ry, w * 0.022, w * 0.022, 8, 0), {
        wash: on ? (hot > 0.7 ? OA.amber : OA.teal) : mixCol(OA.slate, OA.ink, 0.5), ink: null
      });
    }
  }
  if (hot > 0.5) glow(ctx, x, y + h * 0.3, w * 0.7, OA.amber, 0.22 * hot, 3, x);
}

/** A benchmark bar chart that fills in. */
export function benchBars(
  ctx: CanvasRenderingContext2D, x: number, y: number, w: number,
  rows: Array<[string, number, string]>, k: number, maxV = 100
) {
  rows.forEach(([lab, v, col], i) => {
    const by = y + i * 38;
    letter(ctx, lab, x - w / 2 - 14, by, 15, PAL.ink, { align: 'right', ink: false, alpha: 0.9 });
    paint(ctx, rrPts(x - w / 2, by - 11, w, 22, 6, 0.5), { wash: mixCol(PAL.cream, OA.mist, 0.55), ink: PAL.ink, sw: 0.9 });
    const bw = w * (v / maxV) * clamp(k * 1.5 - i * 0.2);
    if (bw > 2) paint(ctx, rrPts(x - w / 2, by - 11, bw, 22, 6, 0.5), { wash: col, ink: null });
    if (bw > w * 0.12) letter(ctx, `${v}`, x - w / 2 + bw - 18, by, 13, PAL.cream, { ink: false });
  });
}

/** Scaffolding / guardrail bars — the safety motif. */
export function guardrail(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, k: number, col = OA.teal) {
  const kk = clamp(k);
  if (kk <= 0.01) return;
  ctx.save();
  ctx.globalAlpha = kk;
  for (let i = 0; i <= 4; i++) {
    const px = x - w / 2 + (i / 4) * w;
    inkLine(ctx, [[px, y - h / 2], [px, y + h / 2]], 2.4, col, 0.05);
  }
  inkLine(ctx, [[x - w / 2, y - h / 2], [x + w / 2, y - h / 2]], 3, col, 0.05);
  inkLine(ctx, [[x - w / 2, y + h / 2], [x + w / 2, y + h / 2]], 3, col, 0.05);
  ctx.restore();
}

/** Curtain-call theatre frame, shared closing shot language. */
export function curtainCall(
  ctx: CanvasRenderingContext2D, W: number, H: number, t: number, lt: number,
  openK: number, accent = OA.teal
) {
  paint(ctx, rectPts(-40, 470, W + 80, H - 430, 4), { fill: PAL.clayDk, fillOp: 220, bleed: 0.1, tex: 0.6, border: 0.4, ink: null });
  for (let px = 40; px < W; px += 150) inkLine(ctx, [[px, 474], [px - 24, H + 10]], 1.6, mixCol(PAL.clayDk, PAL.ink, 0.6), 0.1);
  inkLine(ctx, [[0, 472], [W, 472]], 2, mixCol(PAL.clayDk, PAL.ink, 0.55), 0.2);
  for (let fx = 90; fx < W; fx += 120) {
    glow(ctx, fx, 540, 44, OA.amber, 0.3 + Math.sin(t + fx) * 0.05, 3, fx);
    paint(ctx, ellPts(fx, 542, 9, 9, 12, 0.6), { wash: PAL.cream, ink: PAL.ink, sw: 1 });
  }
  void accent; void lt; void openK;
}

export function curtains(ctx: CanvasRenderingContext2D, W: number, H: number, closeK: number) {
  const cw = clamp(closeK) * (W * 0.34) + 60;
  for (const side of [-1, 1]) {
    ctx.save(); ctx.scale(side, 1); ctx.translate(side < 0 ? -W : 0, 0);
    paint(ctx, [[-10, -10], [cw, -10], [cw - 24, H * 0.6], [cw + 8, H + 20], [-10, H + 20]], {
      fill: PAL.rose, fillOp: 245, bleed: 0.06, tex: 0.6, border: 0.4, ink: PAL.ink, sw: 2
    });
    for (let fx = 30; fx < cw - 4; fx += 46) {
      inkLine(ctx, [[fx, -4], [fx - 16 + hash(fx) * 20, H + 4]], (26 - fx * 0.14) / 10, mixCol(PAL.rose, PAL.ink, 0.55), 0.3);
    }
    ctx.restore();
  }
  paint(ctx, [[-10, -10], [W + 10, -10], [W + 10, 96], [-10, 96]], {
    fill: PAL.rose, fillOp: 245, bleed: 0.05, tex: 0.6, border: 0.3, ink: PAL.ink, sw: 2
  });
  for (let vx = 0; vx <= 10; vx++) {
    paint(ctx, ellPts(vx * (W / 10), 96, W / 22, 26, 16, 1), {
      fill: mixCol(PAL.rose, PAL.ink, 0.12), fillOp: 245, bleed: 0.08, tex: 0.5, ink: PAL.ink, sw: 1.2
    });
  }
  inkLine(ctx, [[0, 122], [W, 122]], 3, OA.amber, 0.3);
}
