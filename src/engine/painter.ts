/**
 * painter.ts — a Canvas 2D port of PDoomVideo's p5.brush painting stack (core.js).
 * Warm paper, watercolor fills with bleeding edges + pigment granulation,
 * tapered ink outlines that "boil" at 12fps like hand-drawn animation.
 * Every frame is a pure function of t.
 */

export const PAL = {
  paper: '#F3EBDC', ink: '#2B2233', clay: '#D97757', clayDk: '#A84D33', clayLt: '#F2A283',
  night: '#1F2550', indigo: '#2F3C7A', rose: '#E27A92', ochre: '#E8AA38', sap: '#6E9F58',
  teal: '#3A9C98', violet: '#7B5CA8', cream: '#FFF5E2', sky: '#8EC3E6'
};

export const TAU = Math.PI * 2;
export const clamp = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const lerp = (a: number, b: number, x: number) => a + (b - a) * x;
export const ease = (x: number) => { x = clamp(x); return x * x * (3 - 2 * x); };
export const easeOut = (x: number) => 1 - Math.pow(1 - clamp(x), 3);
export const easeIn = (x: number) => Math.pow(clamp(x), 3);
export const backOut = (x: number) => { x = clamp(x); const s = 1.9; return 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2); };
export const elasticOut = (x: number) => { x = clamp(x); return x === 0 || x === 1 ? x : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * (TAU / 3)) + 1; };
export const hash = (i: number) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
export const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
export const frac = (x: number) => x - Math.floor(x);
export const wob = (t: number, f = 1, ph = 0) => Math.sin((t * f + ph) * TAU);

export function mixCol(a: string, b: string, k: number): string {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const c = (i: number) => Math.round(lerp((pa >> i) & 255, (pb >> i) & 255, clamp(k)));
  return '#' + ((1 << 24) + (c(16) << 16) + (c(8) << 8) + c(0)).toString(16).slice(1);
}

export function kf(t: number, keys: Array<[number, number]>, e: (x: number) => number = ease): number {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (t < keys[i][0]) {
      const [a, va] = keys[i - 1], [b, vb] = keys[i];
      return lerp(va, vb, e((t - a) / (b - a)));
    }
  }
  return keys[keys.length - 1][1];
}

// ---------- boiling linework: reseeded 12x/s ----------
let BOIL = 0;
let C = 0;
export function beginFrame(t: number, boilTime?: number) {
  // boilTime may run ahead of story time so parked frames still boil
  BOIL = Math.floor((boilTime ?? t) * 12);
  C = 0;
}
const rnd = (k: number) => hash(BOIL * 257.13 + k * 13.73 + 0.5);
export function jit(a: number) { C++; return (rnd(C) * 2 - 1) * a; }

// deterministic per-object jitter (doesn't consume the boil counter)
export const jits = (seed: number, a: number) => (rnd(seed) * 2 - 1) * a;

// ---------- geometry ----------
export type Pt = [number, number];

export function rectPts(x: number, y: number, w: number, h: number, j = 0): Pt[] {
  return [
    [x + jit(j), y + jit(j)], [x + w / 2 + jit(j), y + jit(j) * 0.5], [x + w + jit(j), y + jit(j)],
    [x + w + jit(j) * 0.5, y + h / 2], [x + w + jit(j), y + h + jit(j)], [x + w / 2 + jit(j), y + h + jit(j) * 0.5],
    [x + jit(j), y + h + jit(j)], [x + jit(j) * 0.5, y + h / 2]
  ];
}
export function ellPts(cx: number, cy: number, rx: number, ry: number, n = 28, j = 0, rot = 0): Pt[] {
  const p: Pt[] = [];
  for (let i = 0; i < n; i++) { const a = rot + i / n * TAU; p.push([cx + Math.cos(a) * rx + jit(j), cy + Math.sin(a) * ry + jit(j)]); }
  return p;
}
export function rrPts(x: number, y: number, w: number, h: number, r = 8, j = 0): Pt[] {
  const p: Pt[] = [];
  const segN = 5;
  const corner = (cx: number, cy: number, a0: number) => {
    for (let i = 0; i <= segN; i++) { const a = a0 + i / segN * Math.PI / 2; p.push([cx + Math.cos(a) * r + jit(j), cy + Math.sin(a) * r + jit(j)]); }
  };
  corner(x + w - r, y + r, -Math.PI / 2); corner(x + w - r, y + h - r, 0);
  corner(x + r, y + h - r, Math.PI / 2); corner(x + r, y + r, Math.PI);
  return p;
}
export function starPts(cx: number, cy: number, r: number, inner = 0.38, n = 4, rot = -Math.PI / 2): Pt[] {
  const p: Pt[] = [];
  for (let i = 0; i < n * 2; i++) { const a = rot + i * Math.PI / n, q = i % 2 ? r * inner : r; p.push([cx + Math.cos(a) * q, cy + Math.sin(a) * q]); }
  return p;
}
export function polyPts(cx: number, cy: number, r: number, n: number, rot = -Math.PI / 2, j = 0): Pt[] {
  const p: Pt[] = [];
  for (let i = 0; i < n; i++) { const a = rot + i / n * TAU; p.push([cx + Math.cos(a) * r + jit(j), cy + Math.sin(a) * r + jit(j)]); }
  return p;
}

function trace(ctx: CanvasRenderingContext2D, pts: Pt[], curv: number, closed: boolean) {
  if (curv > 0 && pts.length > 2) {
    if (closed) {
      const n = pts.length;
      ctx.moveTo((pts[n - 1][0] + pts[0][0]) / 2, (pts[n - 1][1] + pts[0][1]) / 2);
      for (let i = 0; i < n; i++) {
        const p = pts[i], q = pts[(i + 1) % n];
        ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2);
      }
    } else {
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length - 1; i++) {
        const p = pts[i], q = pts[i + 1];
        ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2);
      }
      const last = pts[pts.length - 1];
      ctx.lineTo(last[0], last[1]);
    }
  } else {
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    if (closed) ctx.closePath();
  }
}

// ---------- the paint() wrapper ----------
export interface PaintOpts {
  wash?: string; washOp?: number;
  fill?: string; fillOp?: number; bleed?: number; tex?: number; border?: number;
  ink?: string | null; sw?: number; curv?: number; alpha?: number;
}

export function paint(ctx: CanvasRenderingContext2D, pts: Pt[], o: PaintOpts = {}) {
  const closed = true;
  const path = () => { ctx.beginPath(); trace(ctx, pts, o.curv || 0, closed); };

  let cx = 0, cy = 0;
  for (const p of pts) { cx += p[0]; cy += p[1]; }
  cx /= pts.length; cy /= pts.length;
  const aMul = o.alpha ?? 1;

  if (o.wash) {
    ctx.save();
    ctx.globalAlpha = clamp((o.washOp ?? 255) / 255) * aMul;
    ctx.fillStyle = o.wash;
    path(); ctx.fill();
    ctx.restore();
  }

  if (o.fill) {
    const bleed = o.bleed ?? 0.1, op = (o.fillOp ?? 170) / 255;
    ctx.save();
    ctx.globalAlpha = op * 0.45 * aMul;
    ctx.fillStyle = o.fill;
    path(); ctx.fill();
    ctx.restore();

    // bleeding layered glaze — pigment wandering past the border
    const L = 5;
    for (let i = 0; i < L; i++) {
      ctx.save();
      const sc = 1 + (rnd(900 + i + cx) - 0.5) * bleed * 1.7 + bleed * 0.5;
      const rot = (rnd(970 + i + cy) - 0.5) * bleed * 0.35;
      ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(sc, sc * (1 + (rnd(999 + i) - 0.5) * bleed)); ctx.translate(-cx, -cy);
      ctx.globalAlpha = op * (0.13 + rnd(910 + i + cx) * 0.13) * aMul;
      path(); ctx.fillStyle = o.fill; ctx.fill();
      ctx.restore();
    }

    // darker pigment settling at the edge
    if ((o.border ?? 0) > 0) {
      ctx.save();
      ctx.globalAlpha = clamp((o.border ?? 0) * 0.4) * Math.min(1, op + 0.3) * aMul;
      ctx.strokeStyle = o.fill;
      ctx.lineWidth = 1.6 + (o.border ?? 0) * 3;
      ctx.lineJoin = 'round';
      path(); ctx.stroke();
      ctx.restore();
    }

    // granulation speckles
    if ((o.tex ?? 0) > 0) {
      let minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
      for (const p of pts) { minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]); minY = Math.min(minY, p[1]); maxY = Math.max(maxY, p[1]); }
      const n = Math.min(150, Math.floor((maxX - minX) * (maxY - minY) * 0.0009 * clamp(o.tex ?? 0, 0, 1)));
      ctx.save();
      ctx.fillStyle = o.fill;
      for (let i = 0; i < n; i++) {
        const px = minX + rnd(700 + i + cx) * (maxX - minX), py = minY + rnd(800 + i + cy) * (maxY - minY);
        ctx.globalAlpha = (0.04 + rnd(760 + i) * 0.05) * aMul;
        ctx.beginPath(); ctx.arc(px, py, 0.5 + rnd(720 + i) * 1.5, 0, TAU); ctx.fill();
      }
      ctx.restore();
    }
  }

  // tapered hand-ink outline: main pass + ghost pass
  if (o.ink !== null) {
    const col = o.ink || PAL.ink, w = Math.max(0.4, o.sw ?? 1);
    ctx.save();
    ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    path(); ctx.stroke();
    ctx.globalAlpha = 0.38; ctx.lineWidth = w * 0.55;
    ctx.translate(jits(1001, w * 0.9), jits(1002, w * 0.9));
    path(); ctx.stroke();
    ctx.restore();
  }
}

export function inkLine(ctx: CanvasRenderingContext2D, pts: Pt[], sw = 1, col: string = PAL.ink, curv = 0.5) {
  ctx.save();
  ctx.strokeStyle = col; ctx.lineWidth = sw; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath(); trace(ctx, pts, curv, false); ctx.stroke();
  ctx.globalAlpha = 0.35; ctx.lineWidth = sw * 0.5;
  ctx.translate(jits(503, sw), jits(504, sw));
  ctx.beginPath(); trace(ctx, pts, curv * 0.8, false); ctx.stroke();
  ctx.restore();
}

// ---------- lettering (Permanent Marker, ink drop-shadow) ----------
export interface LetterOpts {
  pop?: number; rot?: number; alpha?: number; ink?: boolean; stroke?: boolean;
  font?: string; align?: CanvasTextAlign; mono?: boolean;
}
export function letter(ctx: CanvasRenderingContext2D, txt: string, x: number, y: number, size: number, color: string, o: LetterOpts = {}) {
  const pop = o.pop ?? 1;
  if (pop <= 0) return;
  const k = backOut(Math.min(1, pop));
  ctx.save();
  ctx.globalAlpha = clamp(o.alpha ?? 1);
  ctx.translate(x, y);
  ctx.rotate(o.rot || 0);
  ctx.scale(k, k);
  const font = o.mono
    ? `"Fira Code", "Courier New", monospace`
    : `"Permanent Marker", "Segoe Print", "Comic Sans MS", cursive`;
  ctx.font = `${o.mono ? '500 ' : ''}${size}px ${font}`;
  ctx.textAlign = o.align || 'center';
  ctx.textBaseline = 'middle';
  if (o.stroke) {
    ctx.lineJoin = 'round'; ctx.strokeStyle = PAL.ink; ctx.lineWidth = size * 0.16; ctx.strokeText(txt, 0, 0);
  }
  if (o.ink !== false) {
    ctx.fillStyle = PAL.ink;
    ctx.globalAlpha = clamp((o.alpha ?? 1) * 0.8);
    ctx.fillText(txt, size * 0.055, size * 0.075);
    ctx.globalAlpha = clamp(o.alpha ?? 1);
  }
  ctx.fillStyle = color;
  ctx.fillText(txt, 0, 0);
  ctx.restore();
}

// comic sound-effect word: pops in, wobbles, fades by `life`
export function sfx(ctx: CanvasRenderingContext2D, txt: string, x: number, y: number, size: number, color: string, age: number, o: { life?: number; rot?: number } = {}) {
  const life = o.life ?? 1.2;
  if (age < 0 || age > life) return;
  const popP = Math.min(1, age * 5);
  const fade = age > life * 0.72 ? 1 - (age - life * 0.72) / (life * 0.28) : 1;
  letter(ctx, txt, x, y, size, color, {
    pop: popP,
    rot: (o.rot ?? -0.08) + Math.sin(age * 20) * 0.05 * (1 - age / life),
    alpha: fade
  });
}

// ---------- soft watercolor blob (glows, smoke, pools of light) ----------
export function blob(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string, o: { alpha?: number; seed?: number; bleed?: number } = {}) {
  const seed = o.seed ?? 1;
  paint(ctx, ellPts(cx, cy, r, r * (0.82 + hash(seed * 3.3) * 0.22), 18, r * (o.bleed ?? 0.15), hash(seed * 7) * 2), {
    fill: color, fillOp: Math.floor(255 * (o.alpha ?? 0.3)), bleed: 0.2, tex: 0.5, border: 0.3, ink: null
  });
}

// ---------- warm paper + fixed grain ----------
let grainCv: HTMLCanvasElement | null = null;
function buildGrain() {
  const g = document.createElement('canvas');
  g.width = 256; g.height = 256;
  const c = g.getContext('2d')!;
  for (let i = 0; i < 900; i++) {
    const x = hash(i * 3.1) * 256, y = hash(i * 7.7) * 256;
    c.fillStyle = hash(i * 5.3) > 0.5 ? PAL.ink : PAL.clayDk;
    c.globalAlpha = 0.012 + hash(i * 9.1) * 0.02;
    c.fillRect(x, y, 1, 1 + hash(i * 2.2) * 2);
  }
  for (let i = 0; i < 130; i++) {
    c.strokeStyle = PAL.ink; c.globalAlpha = 0.02; c.lineWidth = 0.6;
    c.beginPath();
    const x = hash(i * 1.3) * 256, y = hash(i * 3.9) * 256;
    c.moveTo(x, y); c.lineTo(x + (hash(i * 7) - 0.5) * 26, y + (hash(i * 11) - 0.5) * 6);
    c.stroke();
  }
  grainCv = g;
}

export function paper(ctx: CanvasRenderingContext2D, w: number, h: number, tintA?: string) {
  ctx.save();
  const gr = ctx.createRadialGradient(w * 0.42, h * 0.36, 80, w * 0.5, h * 0.5, Math.max(w, h) * 0.82);
  if (tintA) {
    gr.addColorStop(0, mixCol('#F7F0E2', tintA, 0.35));
    gr.addColorStop(0.6, mixCol(PAL.paper, tintA, 0.5));
    gr.addColorStop(1, mixCol('#EBDEC6', tintA, 0.68));
  } else {
    gr.addColorStop(0, '#F7F0E2');
    gr.addColorStop(0.6, PAL.paper);
    gr.addColorStop(1, '#EBDEC6');
  }
  ctx.fillStyle = gr;
  ctx.fillRect(0, 0, w, h);
  if (!grainCv) buildGrain();
  const pat = ctx.createPattern(grainCv!, 'repeat');
  if (pat) { ctx.globalAlpha = 0.9; ctx.fillStyle = pat; ctx.fillRect(0, 0, w, h); }
  ctx.restore();
}

export function finishFrame(ctx: CanvasRenderingContext2D, w: number, h: number) {
  if (!grainCv) buildGrain();
  ctx.save();
  const pat = ctx.createPattern(grainCv!, 'repeat');
  if (pat) { ctx.globalAlpha = 0.32; ctx.fillStyle = pat; ctx.fillRect(0, 0, w, h); }
  const vg = ctx.createRadialGradient(w * 0.5, h * 0.5, Math.min(w, h) * 0.42, w * 0.5, h * 0.56, Math.max(w, h) * 0.74);
  vg.addColorStop(0, 'rgba(43,34,51,0)');
  vg.addColorStop(1, 'rgba(43,34,51,0.13)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}

// painted ground strip
export function ground(ctx: CanvasRenderingContext2D, w: number, y: number, col: string = PAL.clayDk) {
  paint(ctx, rectPts(-30, y, w + 60, 24, 3), { fill: col, fillOp: 42, bleed: 0.3, tex: 0.4, border: 0.3, ink: null });
}

// helper for an arrow with painted head
export function arrow(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, col: string = PAL.ink, sw = 2.2) {
  inkLine(ctx, [[x1, y1], [(x1 + x2) / 2, (y1 + y2) / 2], [x2, y2]], sw, col, 0.4);
  const ang = Math.atan2(y2 - y1, x2 - x1);
  paint(ctx, [
    [x2, y2],
    [x2 - Math.cos(ang - 0.5) * 13, y2 - Math.sin(ang - 0.5) * 13],
    [x2 - Math.cos(ang + 0.5) * 13, y2 - Math.sin(ang + 0.5) * 13]
  ], { wash: col, ink: null, curv: 0.4 });
}
