import { RenderContext } from '../../types/video';
import {
  PAL, paper, ground, blob, paint, inkLine, rectPts, ellPts, rrPts, starPts,
  letter, sfx, arrow, wob, kf, seg, mixCol
} from '../painter';
import { clawd, researcher, steamEngine, ClawdOpts } from '../characters';
import { brandLockup } from '../brandMarks';

const C = {
  ink: PAL.ink, paper: PAL.paper, cream: PAL.cream, green: '#4B9D65', greenLt: '#A5CB8B',
  orange: '#DB8052', rust: '#A74E3A', blue: '#5B9DB7', blueLt: '#AED2D8', gold: '#E7AE46',
  red: '#C85E51', plum: '#745A83', slate: '#59666A', coal: '#373C43', white: '#FFF9EB'
};
const FLOOR = 1082;

/** Every shot is painted as a small acted scene, using the JEV film's watercolor paper,
 * expressive Clawd/Researcher cast, prop play, and continuous character motion. */
export function renderAiLoop(_chapterNumber: number, rc: RenderContext) {
  switch (rc.shot.id) {
    case 'loop0-1': return opening(rc);
    case 'loop1-1': return welcome(rc);
    case 'loop1-2': return contracts(rc);
    case 'loop1-3': return invoiceTrain(rc);
    case 'loop1-4': return loiBanner(rc);
    case 'loop1-5': return separateRound(rc);
    case 'loop2-1': return azureReceipt(rc);
    case 'loop2-2': return oracleBuild(rc);
    case 'loop2-3': return powerBill(rc);
    case 'loop3-1': return doubleHat(rc);
    case 'loop3-2': return residualOrder(rc);
    case 'loop3-3': return dateRibbon(rc);
    case 'loop3-4': return noGuarantee(rc);
    case 'loop4-1': return realBuild(rc);
    case 'loop4-2': return notCash(rc);
    case 'loop4-3': return twoDrawers(rc);
    case 'loop4-4': return relationshipStage(rc);
    case 'loop5-1': return bullCase(rc);
    case 'loop5-2': return bearCase(rc);
    case 'loop5-3': return dominoRisk(rc);
    case 'loop5-4': return finalQuestion(rc);
    default: return opening(rc);
  }
}

function age(rc: RenderContext) { return Math.max(0, rc.t - rc.shot.startTime); }

function backdrop(rc: RenderContext, label: string, tint = '#D8D6C7', accent = C.green) {
  const { ctx, width: W, height: H, t } = rc;
  paper(ctx, W, H, tint);
  blob(ctx, W * 0.18, H * 0.36, 190, mixCol(tint, C.gold, 0.35), { alpha: 0.17, seed: 202 });
  blob(ctx, W * 0.83, H * 0.69, 210, mixCol(tint, C.blue, 0.28), { alpha: 0.12, seed: 211 });
  // Slightly imperfect separate strokes frame the page without becoming a distracting oval.
  const frameInk = mixCol(PAL.ink, tint, 0.45);
  inkLine(ctx, [[28, 32], [W - 28, 32]], 1.15, frameInk, 0);
  inkLine(ctx, [[W - 28, 32], [W - 28, H - 31]], 1.15, frameInk, 0);
  inkLine(ctx, [[W - 28, H - 31], [28, H - 31]], 1.15, frameInk, 0);
  inkLine(ctx, [[28, H - 31], [28, 32]], 1.15, frameInk, 0);
  letter(ctx, label.toUpperCase(), W / 2, 68, 15, accent, { mono: true, ink: false, alpha: 0.9 });
  ground(ctx, W, FLOOR, mixCol(tint, C.ink, 0.65));
  // Gentle moving flecks keep the painted world alive even between character actions.
  for (let i = 0; i < 7; i++) {
    const x = 80 + i * 92 + Math.sin(t * 0.42 + i) * 8;
    paint(ctx, ellPts(x, 243 + Math.sin(t * 0.7 + i * 2) * 11, 2.5, 2.5, 8, 0), { wash: accent, ink: null, alpha: 0.38 });
  }
}

function headline(ctx: CanvasRenderingContext2D, text: string, y = 157, size = 34, color = C.ink) {
  letter(ctx, text, 360, y, size, color, { pop: 0.95 });
}

function footer(ctx: CanvasRenderingContext2D, text: string, color = C.ink) {
  paint(ctx, rrPts(63, 1120, 594, 74, 12, 1.4), { fill: C.cream, fillOp: 205, bleed: 0.18, tex: 0.22, border: 0.12, ink: mixCol(color, C.cream, 0.4), sw: 1.2 });
  letter(ctx, text, 360, 1157, 16, color, { mono: true, ink: false, alpha: 0.96 });
}

function ticket(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, title: string, sub: string, col: string, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  paint(ctx, rectPts(-w / 2, -h / 2, w, h, 2), { wash: C.cream, ink: C.ink, sw: 1.7 });
  paint(ctx, [[w / 2 - 22, -h / 2], [w / 2, -h / 2 + 22], [w / 2 - 22, -h / 2 + 22]], { wash: mixCol(C.cream, col, 0.27), ink: C.ink, sw: 0.8 });
  inkLine(ctx, [[-w * 0.38, -h * 0.31], [w * 0.36, -h * 0.31]], 1.4, mixCol(col, C.cream, 0.34), 0);
  letter(ctx, title, 0, -h * 0.04, Math.min(22, w * 0.105), col, { mono: true, ink: false });
  letter(ctx, sub, 0, h * 0.28, Math.min(13, w * 0.064), C.ink, { mono: true, ink: false, alpha: 0.85 });
  ctx.restore();
}

function circularArrow(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, start: number, end: number, col: string, t: number) {
  const pts: [number, number][] = [];
  for (let i = 0; i <= 22; i++) {
    const a = start + (end - start) * i / 22 + Math.sin(t + i) * 0.004;
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  inkLine(ctx, pts, 4.3, col, 0.16);
  const [x, y] = pts[pts.length - 1], a = end;
  paint(ctx, [[x, y], [x - Math.cos(a - 0.48) * 24, y - Math.sin(a - 0.48) * 24], [x - Math.cos(a + 0.48) * 24, y - Math.sin(a + 0.48) * 24]], { wash: col, ink: C.ink, sw: 0.8 });
}

function gpuPerson(ctx: CanvasRenderingContext2D, x: number, y: number, u: number, t: number, opts: Partial<ClawdOpts> = {}) {
  // Pin frame underneath the familiar Clawd body turns the recurring hero into a chip die.
  paint(ctx, rrPts(x - 5.8 * u, y - 8.4 * u, 11.6 * u, 7.3 * u, 0.7 * u, 1), { wash: '#428451', ink: C.ink, sw: 1.6 });
  for (let i = -3; i <= 3; i++) {
    const p = i * 1.42 * u;
    inkLine(ctx, [[x + p, y - 9.15 * u], [x + p, y - 8.4 * u]], 2.1, C.gold, 0.05);
    inkLine(ctx, [[x + p, y - 1.1 * u], [x + p, y - 0.34 * u]], 2.1, C.gold, 0.05);
  }
  for (const side of [-1, 1]) for (let i = -2; i <= 2; i++) {
    const py = y + i * 1.16 * u - 4.5 * u;
    inkLine(ctx, [[x + side * 5.8 * u, py], [x + side * 6.55 * u, py]], 2.1, C.gold, 0.05);
  }
  clawd(ctx, x, y, u, {
    t, col: C.green, dk: '#357247', lt: '#D3D9A7', eyes: 'normal', mouth: 'smile',
    aL: 0.45 + wob(t, 0.55) * 0.45, aR: -0.4 + wob(t, 0.55, 0.25) * 0.5,
    ...opts
  });
  // Clear company identifier on the recurring GPU-supplier character.
  brandLockup(ctx, 'nvidia', x, y - 2.85 * u, Math.min(32, u * 1.05), true);
}

function cloudCharacter(ctx: CanvasRenderingContext2D, x: number, footY: number, scale: number, t: number, name = 'CLOUD', tint = C.blue) {
  const s = scale, bob = Math.sin(t * 2.1 + x * 0.01) * 5;
  const cy = footY - 123 * s + bob;
  // A lumpy, inked cloud body with a different face and silhouette from the chip cast.
  paint(ctx, ellPts(x - 70 * s, cy + 19 * s, 57 * s, 44 * s, 20, 1), { wash: tint, ink: C.ink, sw: 1.9 });
  paint(ctx, ellPts(x - 24 * s, cy - 17 * s, 65 * s, 64 * s, 22, 1), { wash: mixCol(tint, C.white, 0.14), ink: C.ink, sw: 1.9 });
  paint(ctx, ellPts(x + 44 * s, cy - 1 * s, 67 * s, 55 * s, 21, 1), { wash: tint, ink: C.ink, sw: 1.9 });
  paint(ctx, rrPts(x - 111 * s, cy - 6 * s, 213 * s, 81 * s, 31 * s, 1), { wash: tint, ink: C.ink, sw: 1.9 });
  // little legs and sleeves, separately animated from the cloud silhouette
  inkLine(ctx, [[x - 46 * s, cy + 65 * s], [x - 49 * s, footY - 4 * s]], 4 * s, C.ink, 0.12);
  inkLine(ctx, [[x + 45 * s, cy + 65 * s], [x + 51 * s, footY - 4 * s]], 4 * s, C.ink, 0.12);
  inkLine(ctx, [[x - 104 * s, cy + 8 * s], [x - 140 * s, cy - 22 * s + Math.sin(t * 3) * 11]], 5 * s, C.ink, 0.1);
  inkLine(ctx, [[x + 103 * s, cy + 12 * s], [x + 142 * s, cy - 28 * s + Math.cos(t * 2.4) * 9]], 5 * s, C.ink, 0.1);
  paint(ctx, ellPts(x - 16 * s, cy - 18 * s, 5 * s, 9 * s, 12, 0.3), { wash: C.ink, ink: null });
  paint(ctx, ellPts(x + 27 * s, cy - 18 * s, 5 * s, 9 * s, 12, 0.3), { wash: C.ink, ink: null });
  inkLine(ctx, [[x - 3 * s, cy + 3 * s], [x + 7 * s, cy + 9 * s], [x + 17 * s, cy + 3 * s]], 2.4 * s, C.ink, 0.45);
  letter(ctx, name, x, cy + 43 * s, 12.5 * s, C.ink, { mono: true, ink: false, alpha: 0.88 });
}

function worker(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, t: number, vest = C.gold, pose: 'point' | 'walk' | 'none' = 'none') {
  // Stable character variants (face, facing, and posture) keep the ensemble from reading as clones.
  const variant = Math.abs(Math.floor(x / 97)) % 4;
  const eyes = pose === 'point' ? (variant % 2 ? 'wide' : 'happy')
    : variant === 1 ? 'tired' : variant === 2 ? 'happy' : 'normal';
  const mouth = pose === 'point' ? (variant === 1 ? 'talk' : 'o')
    : variant === 2 ? 'flat' : variant === 3 ? 'talk' : 'smile';
  const bob = pose === 'walk' ? Math.abs(Math.sin(t * 3.2 + x)) * 0.13 : Math.sin(t * 1.7 + x) * 0.025;
  researcher(ctx, x, y, scale, {
    t, eyes, mouth, flip: variant % 2 === 0, rot: pose === 'walk' ? Math.sin(t * 1.8 + x) * 0.025 : 0,
    dy: bob, lookX: pose === 'point' ? 0.7 : variant === 1 ? -0.4 : 0,
    prop: pose === 'point' ? 'pointer' : 'none', walk: pose === 'walk' ? t * 1.2 : undefined
  });
  // Hand-painted hi-vis bib and hard hat make this a construction worker, not a clone of the lab.
  paint(ctx, [[x - scale * 1.35, y - scale * 8.1], [x - scale * 0.45, y - scale * 8.85], [x + scale * 0.5, y - scale * 8.85], [x + scale * 1.4, y - scale * 8.1], [x + scale * 1.02, y - scale * 5.3], [x - scale * 0.98, y - scale * 5.3]], { wash: vest, ink: C.ink, sw: 1.0 });
  inkLine(ctx, [[x, y - scale * 8.45], [x, y - scale * 5.35]], 1.2, C.cream, 0.1);
  paint(ctx, ellPts(x, y - scale * 13.15, scale * 2.15, scale * 0.78, 20, 0.6), { wash: C.gold, ink: C.ink, sw: 1.1 });
  paint(ctx, rectPts(x - scale * 2.3, y - scale * 12.55, scale * 4.6, scale * 0.34, 0.12), { wash: C.orange, ink: C.ink, sw: 0.7 });
}

function rackCharacter(ctx: CanvasRenderingContext2D, x: number, footY: number, width: number, height: number, t: number, doors = 4, worried = false) {
  const top = footY - height;
  paint(ctx, rrPts(x - width / 2, top, width, height, 9, 1), { wash: '#515D63', ink: C.ink, sw: 2.3 });
  paint(ctx, rrPts(x - width * 0.39, top + 12, width * 0.78, height - 24, 5, 0.8), { wash: '#343B43', ink: '#202934', sw: 1.1 });
  for (let i = 0; i < doors; i++) {
    const rowH = (height - 74) / doors;
    const y = top + 26 + rowH * i;
    paint(ctx, rrPts(x - width * 0.34, y, width * 0.68, rowH - 8, 4, 0.6), { wash: '#293740', ink: '#A2B5AF', sw: 0.8 });
    for (let j = 0; j < 4; j++) {
      const blink = (Math.floor(t * 3.4 + i * 4 + j) % 4) !== 0;
      paint(ctx, ellPts(x - width * 0.25 + j * width * 0.105, y + rowH * 0.46, 3.2, 3.2, 8, 0), { wash: blink ? (j % 2 ? C.greenLt : C.gold) : C.red, ink: null });
    }
  }
  // A face on the top unit makes the infrastructure a character without hiding that it is hardware.
  paint(ctx, ellPts(x - 17, top + 40, 4.5, 8, 10, 0), { wash: C.cream, ink: null });
  paint(ctx, ellPts(x + 17, top + 40, 4.5, 8, 10, 0), { wash: C.cream, ink: null });
  if (worried) inkLine(ctx, [[x - 10, top + 62], [x, top + 57], [x + 10, top + 62]], 2.2, C.gold, 0.2);
  else inkLine(ctx, [[x - 9, top + 59], [x, top + 65], [x + 9, top + 59]], 2.1, C.cream, 0.3);
  const wave = Math.sin(t * 2.5) * 12;
  inkLine(ctx, [[x - width * 0.5, top + height * 0.43], [x - width * 0.76, top + height * 0.43 + wave]], 3, C.ink, 0.15);
  inkLine(ctx, [[x + width * 0.5, top + height * 0.43], [x + width * 0.76, top + height * 0.43 - wave]], 3, C.ink, 0.15);
  return { top };
}

function bearInvestor(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, eyes: 'normal' | 'worried' = 'normal') {
  const bob = Math.sin(t * 2.3 + x) * 3;
  paint(ctx, ellPts(x, y - 105 * s + bob, 90 * s, 91 * s, 24, 0.9), { wash: '#A87962', ink: C.ink, sw: 2 });
  paint(ctx, ellPts(x - 60 * s, y - 166 * s + bob, 30 * s, 31 * s, 16, 0.6), { wash: '#A87962', ink: C.ink, sw: 1.5 });
  paint(ctx, ellPts(x + 59 * s, y - 165 * s + bob, 30 * s, 31 * s, 16, 0.6), { wash: '#A87962', ink: C.ink, sw: 1.5 });
  paint(ctx, ellPts(x, y - 35 * s + bob, 105 * s, 48 * s, 24, 0.8), { wash: C.plum, ink: C.ink, sw: 1.7 });
  for (const eyeX of [-30, 30]) paint(ctx, ellPts(x + eyeX * s, y - 111 * s + bob, 6 * s, eyes === 'worried' ? 10 * s : 7 * s, 12, 0.2), { wash: C.ink, ink: null });
  paint(ctx, ellPts(x, y - 84 * s + bob, 25 * s, 18 * s, 16, 0.3), { wash: '#E5C3A3', ink: C.ink, sw: 1.1 });
  paint(ctx, ellPts(x, y - 89 * s + bob, 8 * s, 6 * s, 10, 0), { wash: C.ink, ink: null });
  if (eyes === 'worried') inkLine(ctx, [[x - 13 * s, y - 72 * s], [x, y - 77 * s], [x + 13 * s, y - 72 * s]], 2.4, C.ink, 0.2);
  else inkLine(ctx, [[x - 15 * s, y - 73 * s], [x, y - 67 * s], [x + 15 * s, y - 73 * s]], 2.4, C.ink, 0.28);
  inkLine(ctx, [[x - 86 * s, y - 72 * s], [x - 119 * s, y - 43 * s + bob]], 4 * s, C.ink, 0.15);
  inkLine(ctx, [[x + 86 * s, y - 73 * s], [x + 117 * s, y - 107 * s - bob]], 4 * s, C.ink, 0.15);
}

function auditorOwl(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number) {
  const bob = Math.sin(t * 2.4) * 4;
  paint(ctx, ellPts(x, y - 88 * s + bob, 73 * s, 85 * s, 24, 0.8), { wash: '#D6B76C', ink: C.ink, sw: 1.7 });
  paint(ctx, [[x - 69 * s, y - 125 * s + bob], [x - 101 * s, y - 164 * s + bob], [x - 47 * s, y - 146 * s + bob]], { wash: '#A7864F', ink: C.ink, sw: 1.2 });
  paint(ctx, [[x + 69 * s, y - 125 * s + bob], [x + 101 * s, y - 164 * s + bob], [x + 47 * s, y - 146 * s + bob]], { wash: '#A7864F', ink: C.ink, sw: 1.2 });
  for (const dx of [-30, 30]) {
    paint(ctx, ellPts(x + dx * s, y - 103 * s + bob, 29 * s, 28 * s, 18, 0.3), { wash: C.cream, ink: C.ink, sw: 1.2 });
    paint(ctx, ellPts(x + dx * s, y - 103 * s + bob, 5.5 * s, 7 * s, 10, 0), { wash: C.ink, ink: null });
  }
  inkLine(ctx, [[x - 3 * s, y - 104 * s + bob], [x + 3 * s, y - 104 * s + bob]], 2, C.ink, 0.2);
  paint(ctx, [[x, y - 80 * s + bob], [x - 12 * s, y - 64 * s + bob], [x + 12 * s, y - 64 * s + bob]], { wash: C.orange, ink: C.ink, sw: 0.8 });
  paint(ctx, rrPts(x - 80 * s, y - 42 * s + bob, 160 * s, 78 * s, 25 * s, 0.5), { wash: C.plum, ink: C.ink, sw: 1.5 });
  // circular auditor spectacles
  for (const dx of [-30, 30]) paint(ctx, ellPts(x + dx * s, y - 103 * s + bob, 34 * s, 33 * s, 20, 0), { ink: C.plum, sw: 2.2 });
}

function constructionSite(ctx: CanvasRenderingContext2D, cx: number, groundY: number, t: number, progress: number) {
  // Layered hall silhouettes and service doors establish depth before workers enter.
  paint(ctx, rectPts(cx - 250, groundY - 385, 496, 386, 1.6), { wash: '#8C9C97', ink: C.ink, sw: 2.0 });
  paint(ctx, [[cx - 270, groundY - 385], [cx - 180, groundY - 468], [cx + 229, groundY - 468], [cx + 250, groundY - 385]], { wash: '#687978', ink: C.ink, sw: 1.8 });
  for (let i = 0; i < 6; i++) {
    const x = cx - 205 + i * 82;
    paint(ctx, rectPts(x, groundY - 330, 54, 294, 0.8), { wash: '#303D43', ink: '#D0C9AC', sw: 0.8 });
    for (let j = 0; j < 4; j++) paint(ctx, rectPts(x + 8, groundY - 302 + j * 62, 37, 45, 1), { wash: j % 2 ? '#5E7D7E' : '#406B72', ink: C.ink, sw: 0.6 });
  }
  // Crane, trolley, cable, and a swaying GPU crate.
  inkLine(ctx, [[cx - 190, groundY - 480], [cx + 226, groundY - 480], [cx + 226, groundY - 314]], 5, C.orange, 0.1);
  inkLine(ctx, [[cx - 92, groundY - 479], [cx - 92, groundY - 378 + progress * 25]], 2, C.orange, 0.1);
  paint(ctx, rrPts(cx - 133, groundY - 378 + progress * 25, 83, 70, 5, 0.8), { wash: C.green, ink: C.ink, sw: 1.6 });
  letter(ctx, 'GPU', cx - 92, groundY - 343 + progress * 25, 14, C.ink, { mono: true, ink: false });
  // transformers at the edge of the compound
  paint(ctx, rrPts(cx + 262, groundY - 190, 88, 153, 8, 0.8), { wash: C.gold, ink: C.ink, sw: 1.8 });
  for (let i = 0; i < 4; i++) inkLine(ctx, [[cx + 274 + i * 18, groundY - 175], [cx + 274 + i * 18, groundY - 52]], 2.4, C.ink, 0.2);
  for (let i = 0; i < 3; i++) {
    const bx = cx - 211 + i * 20;
    const sway = Math.sin(t * 2 + i) * 3;
    inkLine(ctx, [[bx, groundY - 465], [bx + sway, groundY - 505 - i * 12]], 1.3, C.ink, 0.1);
  }
}

function opening(rc: RenderContext) {
  const { ctx, width: W, t } = rc, lt = age(rc), cx = W / 2;
  backdrop(rc, 'A hand-painted field guide to AI finance', '#D4C49F', C.gold);
  // Theatre proscenium, star bulbs and a curtain that opens with the instrumental.
  paint(ctx, rectPts(57, 207, 606, 653, 8), { wash: '#6F3F41', ink: C.ink, sw: 2.1 });
  paint(ctx, rectPts(82, 230, 556, 596, 5), { wash: '#D6B991', ink: '#6F3F41', sw: 1.4 });
  for (let i = 0; i < 8; i++) {
    const x = 106 + i * 73;
    paint(ctx, ellPts(x, 247 + Math.sin(t * 2 + i) * 2, 5, 5, 10, 0), { wash: i % 2 ? C.gold : C.cream, ink: C.ink, sw: 0.6 });
  }
  // Contract hoops spin behind the characters.
  circularArrow(ctx, cx, 581, 220, -2.58, -0.72, C.blue, t);
  circularArrow(ctx, cx, 581, 220, 0.58, 2.55, C.orange, t + 0.3);
  ticket(ctx, cx - 173, 558 + Math.sin(t * 1.6) * 8, 178, 78, 'EQUITY', 'one kind of deal', C.green, -0.19);
  ticket(ctx, cx + 176, 579 + Math.cos(t * 1.3) * 8, 184, 78, 'COMPUTE', 'another kind', C.blue, 0.16);
  letter(ctx, 'THE MONEY LOOP', cx, 340, 48, C.cream, { pop: seg(lt, 0.4, 1.1), stroke: true });
  letter(ctx, 'who invests · who buys · who gets the receipt?', cx, 411, 17, C.cream, { mono: true, ink: false });
  // A varied cast waits at the footlights.
  const shift = kf(lt, [[0, 125], [2.1, 0], [8.6, 0]]);
  gpuPerson(ctx, cx - 213 + shift, FLOOR, 19, t, { hat: 'top', eyes: 'spark', mouth: 'grin' });
  worker(ctx, cx - 5, FLOOR, 25, t, C.blue, 'point');
  cloudCharacter(ctx, cx + 220 - shift, FLOOR, 0.72, t, 'CLOUD', C.blueLt);
  bearInvestor(ctx, cx + 112, FLOOR + 3, 0.55, t, 'normal');
  footer(ctx, 'REAL BUILDINGS · DIFFERENT PROMISES · OPEN QUESTION', C.ink);
}

function welcome(rc: RenderContext) {
  const { ctx, width: W, t } = rc, cx = W / 2, lt = age(rc);
  backdrop(rc, 'Verse 1 · the curtain rises', '#D8CBAF', C.orange);
  headline(ctx, 'TAKE A SEAT. MIND THE SUITS.', 160, 29);
  // A lopsided stage and a carnival barker introduce the distinct cast.
  paint(ctx, [[84, 908], [119, 674], [188, 625], [252, 670], [286, 908]], { wash: '#C4835C', ink: C.ink, sw: 1.5, curv: 0.18 });
  paint(ctx, [[436, 909], [470, 675], [533, 626], [600, 677], [635, 909]], { wash: '#517D73', ink: C.ink, sw: 1.5, curv: 0.18 });
  for (let i = 0; i < 6; i++) {
    const x = 113 + i * 98;
    paint(ctx, ellPts(x, 338 + Math.sin(t * 2 + i) * 3, 5, 5, 10, 0), { wash: i % 2 ? C.gold : C.cream, ink: C.ink, sw: 0.7 });
  }
  // A twisting paper garland leads the audience into the story.
  circularArrow(ctx, cx, 581, 215, -2.85, -0.25, C.gold, t);
  circularArrow(ctx, cx, 581, 215, 0.35, 2.85, C.green, t + 0.4);
  ticket(ctx, cx - 167, 529, 182, 82, 'CAPITAL', 'investment', C.gold, -0.18);
  ticket(ctx, cx + 169, 612, 190, 82, 'COMPUTE', 'services', C.blue, 0.2);
  const hop = Math.abs(Math.sin(lt * 2.8)) * 14;
  gpuPerson(ctx, cx, FLOOR - hop, 28, t, { hat: 'party', eyes: 'spark', mouth: 'grin', aL: 1.1, aR: -0.9 });
  worker(ctx, cx - 235, FLOOR, 24, t, C.blue, 'point');
  bearInvestor(ctx, cx + 233, FLOOR, 0.55, t, 'worried');
  footer(ctx, 'WELCOME TO THE CONTRACTS’ CIRCUS');
}

function contracts(rc: RenderContext) {
  const { ctx, width: W, t } = rc, cx = W / 2, lt = age(rc);
  backdrop(rc, 'Verse 1 · follow the handoffs', '#C5D9D0', C.green);
  headline(ctx, 'THE RACKS DON’T MOVE. THE PAPERS DO.', 155, 26);
  rackCharacter(ctx, cx, 937, 171, 476, t, 5, false);
  // Three partners act out their own contract directions around the fixed rack.
  const p = lt * 0.8;
  gpuPerson(ctx, cx - 238 + Math.sin(p) * 8, FLOOR, 21, t, { hat: 'hard', eyes: 'normal', mouth: 'smile' });
  worker(ctx, cx + 238 + Math.sin(p + 2) * 8, FLOOR, 23, t, C.blue, 'point');
  cloudCharacter(ctx, cx, 700 + Math.sin(p + 1) * 6, 0.66, t, 'CLOUD', C.blueLt);
  circularArrow(ctx, cx, 710, 254, -2.74, -0.42, C.orange, t);
  circularArrow(ctx, cx, 710, 254, 0.39, 2.78, C.green, t + 0.5);
  ticket(ctx, cx - 250, 483, 174, 72, 'EQUITY', 'stake', C.green, -0.18);
  ticket(ctx, cx + 238, 477, 184, 72, 'COMPUTE', 'purchase', C.blue, 0.12);
  footer(ctx, 'AN ILLUSTRATED NETWORK · NOT ONE RETURNING DOLLAR');
}

function invoiceTrain(rc: RenderContext) {
  const { ctx, width: W, t } = rc, cx = W / 2, lt = age(rc);
  backdrop(rc, 'Verse 1 · one handoff leads to another', '#D7C7A7', C.rust);
  headline(ctx, 'CHIPS. LABS. CLOUD. BACK AGAIN.', 155, 29);
  // A tiny painted locomotive carries separate documents through the scene.
  const trainX = kf(lt, [[0, 875], [1.5, 515], [4.8, 210], [7, -130]]);
  steamEngine(ctx, trainX, 853, 1.65, t);
  for (let i = 0; i < 3; i++) {
    const x = trainX + 187 + i * 132;
    if (x > 54 && x < 666) ticket(ctx, x, 806 + Math.sin(t * 2 + i) * 10, 115, 65, ['EQUITY', 'CLOUD', 'CHIPS'][i], ['stake', 'service', 'delivery'][i], [C.green, C.blue, C.orange][i], 0.08 * Math.sin(t + i));
  }
  inkLine(ctx, [[44, 893], [676, 893]], 2.5, C.ink, 0);
  inkLine(ctx, [[44, 904], [676, 904]], 2.5, C.orange, 0);
  worker(ctx, cx - 206, FLOOR, 25, t, C.gold, 'walk');
  cloudCharacter(ctx, cx + 209, FLOOR, 0.72, t, 'CLOUD', C.blueLt);
  sfx(ctx, 'CHUFF!', trainX + 86, 652, 30, C.orange, lt - 0.7, { life: 1.6 });
  footer(ctx, 'A SATIRICAL ROUTE MAP — NOT A LITERAL MONEY TRACE');
}

function loiBanner(rc: RenderContext) {
  const { ctx, width: W, t } = rc, cx = W / 2, lt = age(rc);
  backdrop(rc, 'Verse 1 · read the asterisk', '#E5CE9F', C.orange);
  headline(ctx, 'THE HEADLINE HAS AN ASTERISK.', 151, 29);
  // Oversized fabric-like scroll swings into the footlights, held by two different characters.
  const swing = Math.sin(t * 1.8) * 0.025;
  ctx.save(); ctx.translate(cx, 480); ctx.rotate(swing);
  paint(ctx, rectPts(-296, -102, 592, 206, 9), { wash: C.gold, ink: C.ink, sw: 2.4 });
  paint(ctx, rectPts(-285, -91, 570, 184, 8), { wash: '#F2D9A0', ink: '#80553A', sw: 1.1 });
  letter(ctx, 'UP TO', 0, -47, 28, C.rust, { mono: true, ink: false });
  letter(ctx, '$100 BILLION', 0, 8, 40, C.ink, { mono: true, pop: seg(lt, 0.4, 1.2) });
  letter(ctx, 'LETTER OF INTENT · SEP 2025', 0, 59, 16, C.ink, { mono: true, ink: false });
  ctx.restore();
  // The researcher pulls one corner while a tiny auditor exposes the conditional language.
  worker(ctx, cx - 225, FLOOR, 27, t, C.blue, 'point');
  gpuPerson(ctx, cx + 214, FLOOR, 24, t, { hat: 'top', eyes: 'scared', mouth: 'O', emote: 'sweat', emoteK: 0.9 });
  auditorOwl(ctx, cx + 80, 902, 0.52, t);
  brandLockup(ctx, 'nvidia', cx - 118, 643, 26, true);
  brandLockup(ctx, 'openai', cx + 118, 643, 26, true);
  ticket(ctx, cx, 761, 232, 74, 'SYSTEMS PLAN', 'progressive framework', C.blue, 0.02);
  sfx(ctx, '*', cx + 292, 354, 52, C.red, lt - 1.1, { life: 3.5 });
  footer(ctx, '“UP TO” IS NOT “PAID IN FULL”');
}

function separateRound(rc: RenderContext) {
  const { ctx, width: W, t } = rc, cx = W / 2;
  backdrop(rc, 'Verse 1 · a later, separate round', '#D6C8B4', C.blue);
  headline(ctx, 'TWO DOCUMENTS. TWO DIFFERENT DEALS.', 150, 26);
  // Split the stage with a visible curtain seam; keep the receipts physically distinct.
  paint(ctx, rectPts(cx - 3, 260, 6, 620, 0.4), { wash: C.red, ink: null });
  ticket(ctx, cx - 168, 514, 272, 182, 'UP TO $100B', '2025 · LETTER OF INTENT', C.green, -0.035);
  ticket(ctx, cx + 169, 514, 272, 182, '≈ $30B', '2026 · REPORTED ROUND', C.blue, 0.035);
  brandLockup(ctx, 'nvidia', cx - 168, 640, 25, true);
  brandLockup(ctx, 'openai', cx + 169, 640, 25, true);
  for (let i = 0; i < 5; i++) {
    const y = 660 + i * 40;
    inkLine(ctx, [[92, y], [cx - 45 - i * 7, y]], 1.3, mixCol(C.green, C.cream, 0.35), 0.1);
    inkLine(ctx, [[cx + 46 + i * 6, y], [628, y]], 1.3, mixCol(C.blue, C.cream, 0.35), 0.1);
  }
  worker(ctx, cx - 205, FLOOR, 25, t, C.gold, 'point');
  gpuPerson(ctx, cx + 206, FLOOR, 24, t, { hat: 'bowtie', eyes: 'normal', mouth: 'flat' });
  letter(ctx, 'NO COMBINED CHEQUE', cx, 900, 18, C.rust, { mono: true, ink: false });
  footer(ctx, 'A LATER INVESTMENT DOESN’T RETROACTIVELY FUND THE LOI');
}

function azureReceipt(rc: RenderContext) {
  const { ctx, width: W, t } = rc, cx = W / 2;
  backdrop(rc, 'Chorus · a very long cloud receipt', '#C8D7D6', C.blue);
  headline(ctx, 'THE RECEIPT REACHES THE FLOOR.', 150, 28);
  cloudCharacter(ctx, cx, 515 + Math.sin(t * 1.4) * 5, 0.84, t, '', '#70ACCF');
  brandLockup(ctx, 'microsoftAzure', cx, 445 + Math.sin(t * 1.4) * 4, 24, true);
  rackCharacter(ctx, cx + 189, FLOOR, 144, 403, t, 4, false);
  // Paper snakes down and curls around the server; the worker has to hold it back.
  paint(ctx, [[cx - 11, 568], [cx + 4, 613], [cx - 16, 658], [cx + 13, 703], [cx - 6, 748], [cx + 12, 793], [cx - 3, 841], [cx - 52, 874], [cx - 164, 882]], { fill: C.cream, fillOp: 240, bleed: 0.15, tex: 0.3, border: 0.12, ink: C.ink, sw: 1.5, curv: 0.4 });
  for (let i = 0; i < 5; i++) inkLine(ctx, [[cx - 12, 611 + i * 45], [cx + 10, 611 + i * 45]], 1.2, C.slate, 0.1);
  letter(ctx, '$250B', cx - 103, 852, 27, C.ink, { mono: true });
  worker(ctx, cx - 220, FLOOR, 25, t, C.gold, 'walk');
  ticket(ctx, cx, 974, 204, 71, 'AZURE', 'incremental services', C.blue, -0.03);
  footer(ctx, 'A MULTI-YEAR PURCHASE COMMITMENT · NOT TODAY’S CASH');
}

function oracleBuild(rc: RenderContext) {
  const { ctx, width: W, t } = rc, cx = W / 2, lt = age(rc);
  backdrop(rc, 'Chorus · five years on the calendar', '#DCC7AA', C.orange);
  headline(ctx, 'THE PALACE TAKES PEOPLE AND POWER.', 149, 27);
  constructionSite(ctx, cx - 18, 1024, t, seg(lt, 0.3, 4.6));
  brandLockup(ctx, 'oracle', cx - 18, 666, 27, true);
  // Two workers move on separate tasks; the date cards flip overhead.
  worker(ctx, cx - 261, FLOOR, 19, t, C.gold, 'walk');
  worker(ctx, cx + 206, FLOOR, 20, t, C.blue, 'point');
  const page = Math.floor(lt / 0.85) % 5;
  ticket(ctx, cx, 347, 263, 92, '≈ $300B', `${2025 + page} / FIVE YEARS`, C.orange, Math.sin(t) * 0.035);
  for (let i = 0; i < 4; i++) {
    const x = 95 + i * 44;
    paint(ctx, ellPts(x, 447 + Math.sin(t * 2 + i) * 13, 17, 20, 12, 0.5), { wash: i % 2 ? C.gold : C.cream, ink: C.ink, sw: 0.8 });
  }
  letter(ctx, 'UP TO 4.5 GW PLANNED CAPACITY', cx, 607, 16, C.cream, { mono: true, stroke: true });
  footer(ctx, 'ANNOUNCED PARTNERSHIP COMMITMENT · NOT A SINGLE UPFRONT PAYMENT');
}

function powerBill(rc: RenderContext) {
  const { ctx, width: W, t } = rc, cx = W / 2;
  backdrop(rc, 'Chorus · the infrastructure chorus', '#BED2CF', C.gold);
  headline(ctx, 'LAND. GRID. COOLING. CHIPS.', 150, 30);
  // Power lines and pipes cross the frame as characters wrestle with the physical bottleneck.
  inkLine(ctx, [[51, 421], [163, 421], [221, 347], [303, 421], [409, 421], [476, 359], [666, 359]], 3, C.ink, 0.18);
  for (let i = 0; i < 6; i++) paint(ctx, ellPts(84 + i * 95, 421 + Math.sin(t * 2 + i) * 3, 4, 4, 8, 0), { wash: C.gold, ink: null });
  rackCharacter(ctx, cx + 206, FLOOR, 172, 414, t, 4, true);
  worker(ctx, cx - 219, FLOOR, 25, t, C.gold, 'point');
  cloudCharacter(ctx, cx - 8, 715, 0.69, t, 'COOLING', C.blueLt);
  // transformer and cable under tension
  paint(ctx, rrPts(cx - 257, 802, 113, 173, 9, 1), { wash: C.gold, ink: C.ink, sw: 1.8 });
  letter(ctx, 'GRID', cx - 200, 853, 17, C.ink, { mono: true, ink: false });
  paint(ctx, [[cx - 191, 892], [cx - 220, 930], [cx - 193, 930], [cx - 211, 966], [cx - 164, 917], [cx - 188, 917]], { wash: C.cream, ink: C.ink, sw: 1 });
  inkLine(ctx, [[cx - 140, 856], [cx - 30, 825], [cx + 58, 862]], 5, C.orange, 0.2);
  ticket(ctx, cx - 238, 678, 148, 70, 'POWER', 'meter', C.gold, -0.12);
  footer(ctx, 'A CLOUD NEEDS LAND, ELECTRICITY, COOLING & CUSTOMERS');
}

function doubleHat(rc: RenderContext) {
  const { ctx, width: W, t } = rc, cx = W / 2, lt = age(rc);
  backdrop(rc, 'Verse 2 · the relationship has two directions', '#CED8C8', C.green);
  headline(ctx, 'ONE CHIP. TWO VERY DIFFERENT HATS.', 150, 27);
  // A character-based gag rather than a paired-transaction infographic.
  const wobble = Math.sin(lt * 2.1) * 9;
  gpuPerson(ctx, cx, 835, 36, t, { eyes: lt < 2.8 ? 'look' : 'scared', mouth: lt < 2.8 ? 'grin' : 'O', lookX: 0.4, aL: 1.25, aR: -1.2 });
  // supplier hard hat, shareholder bowler: each arrives on a separate orbit
  ctx.save(); ctx.translate(cx - 162, 466 + wobble); ctx.rotate(-0.13 + Math.sin(t) * 0.02);
  paint(ctx, ellPts(0, 0, 107, 28, 22, 0.8), { wash: C.gold, ink: C.ink, sw: 1.6 });
  paint(ctx, rectPts(-76, -59, 152, 61, 3), { wash: C.gold, ink: C.ink, sw: 1.4 });
  letter(ctx, 'SUPPLIER', 0, -24, 17, C.ink, { mono: true, ink: false }); ctx.restore();
  ctx.save(); ctx.translate(cx + 166, 464 - wobble); ctx.rotate(0.1 - Math.sin(t * 0.8) * 0.02);
  paint(ctx, ellPts(0, 0, 102, 25, 22, 0.7), { wash: C.blue, ink: C.ink, sw: 1.6 });
  paint(ctx, rrPts(-72, -62, 144, 65, 8, 1), { wash: C.plum, ink: C.ink, sw: 1.5 });
  letter(ctx, 'SHAREHOLDER', 0, -30, 14, C.cream, { mono: true, ink: false }); ctx.restore();
  ticket(ctx, cx - 226, 640, 181, 78, 'GPU SUPPLY', 'goods / services', C.green, -0.1);
  ticket(ctx, cx + 226, 640, 181, 78, 'OWNERSHIP', 'equity stake', C.blue, 0.1);
  cloudCharacter(ctx, cx + 240, FLOOR, 0.55, t, 'COREWEAVE', C.blueLt);
  footer(ctx, 'NVIDIA SUPPLIES GPUS AND HOLDS COREWEAVE SHARES');
}

function residualOrder(rc: RenderContext) {
  const { ctx, width: W, t } = rc, cx = W / 2, lt = age(rc);
  backdrop(rc, 'Verse 2 · qualifying residual capacity', '#D5D2BD', C.gold);
  headline(ctx, 'A SEAT LEFT EMPTY CAN TRIGGER A CLAUSE.', 149, 25);
  // Rack row doubles as a little theatre: some bookings are green; open seats are visible.
  const rack = rackCharacter(ctx, cx, 910, 236, 505, t, 5, true);
  for (let i = 0; i < 5; i++) {
    const y = rack.top + 114 + i * 75;
    const isEmpty = i === 2 || i === 4;
    paint(ctx, rrPts(cx + 34, y, 66, 44, 4, 0.5), { wash: isEmpty ? '#EBCB98' : '#73A97A', ink: C.ink, sw: 0.8 });
    letter(ctx, isEmpty ? 'OPEN' : 'BOOKED', cx + 67, y + 22, 10, C.ink, { mono: true, ink: false });
  }
  // Clerk's moving tag is tethered to an empty slot.
  const y = rack.top + 265 + Math.sin(t * 2.8) * 5;
  ticket(ctx, cx - 200, 565 + Math.sin(t * 1.7) * 6, 209, 107, '$6.3B', 'initial order value', C.orange, -0.08);
  brandLockup(ctx, 'coreweave', cx - 200, 529 + Math.sin(t * 1.7) * 6, 23, false);
  inkLine(ctx, [[cx - 96, 622], [cx - 65, 703], [cx - 36, y + 23]], 2, C.orange, 0.25);
  gpuPerson(ctx, cx + 244, FLOOR, 19, t, { hat: 'hard', eyes: 'normal', mouth: 'flat' });
  sfx(ctx, 'IF UNUSED', cx - 195, 730, 17, C.rust, lt - 0.8, { life: 4.5 });
  footer(ctx, 'ONLY QUALIFYING UNSOLD CAPACITY · CONDITIONS APPLY');
}

function dateRibbon(rc: RenderContext) {
  const { ctx, width: W, t } = rc, cx = W / 2, lt = age(rc);
  backdrop(rc, 'Verse 2 · the time horizon and the terms', '#D9D0BF', C.orange);
  headline(ctx, 'APRIL 13, 2032 — WITH TERMS ATTACHED.', 149, 25);
  // Calendar railway crosses the paper; the line clerk has to keep the clauses from blowing away.
  inkLine(ctx, [[78, 535], [640, 535]], 4, C.ink, 0.12);
  for (let i = 0; i < 7; i++) {
    const x = 91 + i * 87;
    const leaf = Math.sin(t * 2 + i) * 3;
    paint(ctx, rrPts(x - 31, 475 + leaf, 62, 107, 5, 0.5), { wash: i === 6 ? C.orange : C.cream, ink: C.ink, sw: 1.3 });
    letter(ctx, ['2026', '2027', '2028', '2029', '2030', '2031', '2032'][i], x, 514 + leaf, 15, i === 6 ? C.cream : C.ink, { mono: true, ink: false });
    paint(ctx, ellPts(x, 535, 5, 5, 9, 0), { wash: C.gold, ink: C.ink, sw: 0.5 });
  }
  paint(ctx, rrPts(cx - 195, 713, 390, 188, 9, 1), { wash: C.cream, ink: C.ink, sw: 1.8 });
  letter(ctx, 'DELIVERY · AVAILABILITY', cx, 756, 17, C.blue, { mono: true, ink: false });
  letter(ctx, 'SERVICE · TERMINATION', cx, 800, 17, C.rust, { mono: true, ink: false });
  letter(ctx, 'A CONDITIONAL PURCHASE ORDER', cx, 846, 13, C.ink, { mono: true, ink: false });
  worker(ctx, cx - 220, FLOOR, 25, t, C.gold, 'point');
  gpuPerson(ctx, cx + 220, FLOOR, 24, t, { hat: 'hard', eyes: 'look', mouth: 'flat' });
  ticket(ctx, cx, 984, 239, 68, 'FORM 8-K', 'September 2025', C.blue, Math.sin(lt) * 0.025);
  footer(ctx, 'THE CONTRACT IS SPECIFIC; THE CONDITIONS MATTER');
}

function noGuarantee(rc: RenderContext) {
  const { ctx, width: W, t } = rc, cx = W / 2;
  backdrop(rc, 'Verse 2 · keep the footnote in frame', '#D9C7B5', C.red);
  headline(ctx, 'NOT A BLANKET DEBT GUARANTEE.', 151, 28, C.rust);
  // Bear and auditor argue over the same paper; the magnifier enlarges the actual clause.
  bearInvestor(ctx, cx - 168, FLOOR, 0.8, t, 'worried');
  auditorOwl(ctx, cx + 213, FLOOR - 10, 0.78, t);
  ticket(ctx, cx, 601, 331, 164, 'CAPACITY ORDER', 'delivery · availability · terms', C.orange, Math.sin(t * 0.7) * 0.018);
  brandLockup(ctx, 'coreweave', cx, 724, 22, true);
  // Magnifying glass bobs over the fine print without obscuring the headline.
  const lensY = 816 + Math.sin(t * 1.5) * 8;
  paint(ctx, ellPts(cx + 167, lensY, 72, 72, 30, 0.3), { fill: C.blueLt, fillOp: 90, bleed: 0.1, border: 0.3, ink: C.ink, sw: 3 });
  inkLine(ctx, [[cx + 215, lensY + 48], [cx + 267, lensY + 102]], 9, C.ink, 0.1);
  letter(ctx, 'CONDITIONAL', cx + 167, lensY - 2, 12, C.ink, { mono: true, ink: false });
  paint(ctx, starPts(cx - 212, 558, 36, 0.58, 5, t), { wash: C.gold, ink: C.ink, sw: 1 });
  footer(ctx, 'PURCHASE OBLIGATION ≠ UNLIMITED DEBT BACKSTOP');
}

function realBuild(rc: RenderContext) {
  const { ctx, width: W, t } = rc, cx = W / 2;
  backdrop(rc, 'Bridge · a real night shift', '#7C8782', C.gold);
  // Night falloff on paper; warm work lamps preserve the JEV film's watercolor texture.
  paint(ctx, rectPts(50, 290, 620, 670, 4), { fill: '#25343A', fillOp: 100, bleed: 0.1, tex: 0.22, border: 0.1, ink: C.ink, sw: 1.3 });
  for (let i = 0; i < 5; i++) {
    const x = 113 + i * 103;
    rackCharacter(ctx, x, 920, 79, 388, t + i * 0.2, 4, false);
  }
  for (const [x, y] of [[119, 399], [353, 382], [577, 407]] as const) {
    blob(ctx, x, y, 93, C.gold, { alpha: 0.28, seed: x });
    paint(ctx, ellPts(x, y, 8, 8, 10, 0), { wash: C.cream, ink: C.ink, sw: 0.7 });
  }
  // Workers cross in front of the racks; one carries a real GPU crate.
  worker(ctx, cx - 217, FLOOR, 24, t, C.orange, 'walk');
  worker(ctx, cx + 220, FLOOR, 24, t + 0.5, C.blue, 'point');
  paint(ctx, rrPts(cx - 75, 839 + Math.sin(t * 2) * 3, 141, 119, 7, 1), { wash: C.green, ink: C.ink, sw: 1.7 });
  letter(ctx, 'GPU', cx - 4, 882, 20, C.ink, { mono: true, ink: false });
  footer(ctx, 'CHIPS · PEOPLE · CONCRETE · ELECTRICITY', C.cream);
}

function notCash(rc: RenderContext) {
  const { ctx, width: W, t } = rc, cx = W / 2, lt = age(rc);
  backdrop(rc, 'Bridge · different dates, different drawers', '#D5D0BB', C.blue);
  headline(ctx, 'A PROMISE ISN’T CASH TONIGHT.', 151, 29);
  // A future-dated scroll spills toward tomorrow while an impatient bookkeeper watches an empty drawer.
  for (let i = 0; i < 5; i++) {
    const x = 140 + i * 102;
    paint(ctx, rrPts(x - 36, 411 + Math.sin(t * 2 + i) * 5, 73, 103, 6, 0.6), { wash: i === 4 ? C.orange : C.cream, ink: C.ink, sw: 1.1 });
    letter(ctx, ['NOW', '+1Y', '+2Y', '+3Y', 'LATER'][i], x, 454, 13, C.ink, { mono: true, ink: false });
  }
  // Contract paper snakes down in small folds.
  paint(ctx, [[139, 524], [226, 581], [310, 547], [398, 608], [487, 574], [571, 637], [585, 674], [486, 643], [400, 679], [309, 618], [225, 652], [142, 595]], { wash: C.cream, ink: C.ink, sw: 1.2, curv: 0.12 });
  for (let i = 0; i < 4; i++) inkLine(ctx, [[204 + i * 95, 594 + (i % 2) * 4], [250 + i * 75, 600 + (i % 2) * 4]], 1.3, C.slate, 0.12);
  // Cash drawer is present-tense and conspicuously light.
  paint(ctx, rectPts(cx - 153, 820, 306, 125, 6), { wash: '#7E5B4E', ink: C.ink, sw: 2 });
  paint(ctx, rectPts(cx - 124, 796, 248, 29, 4), { wash: C.gold, ink: C.ink, sw: 1.1 });
  paint(ctx, rectPts(cx - 107, 837, 214, 52, 3), { wash: '#D8BDA0', ink: C.ink, sw: 0.8 });
  letter(ctx, 'CASH: NOT YET', cx, 864, 16, C.rust, { mono: true, ink: false });
  worker(ctx, cx - 226, FLOOR, 23, t, C.blue, 'point');
  gpuPerson(ctx, cx + 226, FLOOR, 23, t, { hat: 'bowtie', eyes: 'look', mouth: 'flat' });
  sfx(ctx, 'BACKLOG ≠ CASH', cx, 983, 20, C.orange, lt - 0.7, { life: 3.4 });
  footer(ctx, 'DELIVERY, TIMING & RECOGNITION ALL MATTER');
}

function twoDrawers(rc: RenderContext) {
  const { ctx, width: W, t } = rc, cx = W / 2;
  backdrop(rc, 'Bridge · the bookkeeper keeps two ledgers', '#D8C8B4', C.green);
  headline(ctx, 'EQUITY GOES HERE. SALES GO THERE.', 150, 26);
  // Big wooden cabinet with two visibly separate drawers.
  paint(ctx, rrPts(cx - 279, 427, 558, 446, 14, 1.4), { wash: '#98684B', ink: C.ink, sw: 2.2 });
  paint(ctx, rectPts(cx - 255, 641, 510, 8, 1), { wash: C.ink, ink: null });
  paint(ctx, rrPts(cx - 237, 473, 215, 126, 8, 0.8), { wash: '#E2D3B8', ink: C.ink, sw: 1.4 });
  paint(ctx, rrPts(cx + 22, 473, 215, 126, 8, 0.8), { wash: '#E2D3B8', ink: C.ink, sw: 1.4 });
  paint(ctx, rrPts(cx - 237, 681, 215, 136, 8, 0.8), { wash: '#E2D3B8', ink: C.ink, sw: 1.4 });
  paint(ctx, rrPts(cx + 22, 681, 215, 136, 8, 0.8), { wash: '#E2D3B8', ink: C.ink, sw: 1.4 });
  for (const x of [cx - 128, cx + 131]) for (const y of [555, 767]) paint(ctx, ellPts(x, y, 9, 9, 12, 0), { wash: C.gold, ink: C.ink, sw: 1 });
  letter(ctx, 'EQUITY', cx - 129, 506, 20, C.green, { mono: true, ink: false });
  letter(ctx, 'REVENUE', cx + 129, 506, 20, C.blue, { mono: true, ink: false });
  letter(ctx, 'investment', cx - 129, 544, 15, C.ink, { mono: true, ink: false });
  letter(ctx, 'delivered sale', cx + 129, 544, 14, C.ink, { mono: true, ink: false });
  brandLockup(ctx, 'openai', cx - 129, 578, 16, false);
  brandLockup(ctx, 'microsoftAzure', cx + 129, 578, 16, false);
  ticket(ctx, cx - 128, 734, 145, 48, 'STAKE', 'certificate', C.green, -0.08);
  ticket(ctx, cx + 128, 734, 145, 48, 'SALE', 'invoice', C.blue, 0.08);
  // The cashier gently turns the chip's stamp toward the right drawer.
  worker(ctx, cx - 225, FLOOR, 25, t, C.gold, 'point');
  gpuPerson(ctx, cx + 225, FLOOR, 24, t, { hat: 'top', eyes: 'wink', mouth: 'grin', aR: 1.2 });
  footer(ctx, 'INVESTMENT PROCEEDS ARE NOT RECOGNIZED REVENUE');
}

function relationshipStage(rc: RenderContext) {
  const { ctx, width: W, t } = rc, cx = W / 2, lt = age(rc);
  backdrop(rc, 'Bridge · same names, distinct contracts', '#D0D3C7', C.plum);
  headline(ctx, 'FOLLOW THE ARROWS. READ THEIR LABELS.', 151, 26);
  brandLockup(ctx, 'nvidia', 89, 284, 19, true);
  brandLockup(ctx, 'openai', 224, 284, 19, true);
  brandLockup(ctx, 'microsoftAzure', 361, 284, 18, true);
  brandLockup(ctx, 'oracle', 497, 284, 19, true);
  brandLockup(ctx, 'coreweave', 634, 284, 18, true);
  const pts = [
    [cx, 389], [cx - 221, 640], [cx + 221, 640], [cx, 914]
  ] as const;
  // Different ribbon paths—not a single closed loop—cross behind a live ensemble.
  arrow(ctx, pts[0][0] - 34, pts[0][1] + 42, pts[1][0] + 40, pts[1][1] - 12, C.green, 3.3);
  arrow(ctx, pts[1][0] + 93, pts[1][1] + 30, pts[2][0] - 88, pts[2][1] + 30, C.blue, 3.3);
  arrow(ctx, pts[2][0] - 67, pts[2][1] - 40, pts[0][0] + 48, pts[0][1] + 50, C.orange, 3.3);
  arrow(ctx, pts[0][0] - 24, pts[0][1] + 73, pts[3][0] - 15, pts[3][1] - 61, C.gold, 3.3);
  arrow(ctx, pts[3][0] + 39, pts[3][1] - 45, pts[0][0] + 39, pts[0][1] + 83, C.plum, 3.3);
  const labels = [
    ['EQUITY', 229, 507, C.green], ['COMPUTE', 362, 708, C.blue], ['CHIPS', 512, 495, C.orange],
    ['RESIDUAL CAPACITY', 295, 849, C.gold], ['CONDITIONAL ORDER', 461, 854, C.plum]
  ] as const;
  labels.forEach(([txt, x, y, color]) => {
    paint(ctx, rrPts(x - 70, y - 20, 140, 39, 7, 0.5), { wash: C.cream, ink: C.ink, sw: 0.8, alpha: 0.96 });
    letter(ctx, txt, x, y, txt.length > 12 ? 9.5 : 12, color, { mono: true, ink: false });
  });
  gpuPerson(ctx, pts[0][0], 550, 17, t, { hat: 'hard', eyes: 'look' });
  worker(ctx, pts[1][0], FLOOR, 18, t, C.gold, 'point');
  cloudCharacter(ctx, pts[2][0], FLOOR, 0.51, t, 'CLOUD', C.blueLt);
  rackCharacter(ctx, pts[3][0], FLOOR, 100, 248, t, 3, false);
  // Two sweeping pages are handed across the bottom of the map.
  ticket(ctx, cx - 188, 1014, 146, 60, 'DELIVERY', 'service', C.blue, -0.06);
  ticket(ctx, cx + 187, 1014, 166, 60, 'CAPACITY', 'conditional', C.orange, 0.07);
  footer(ctx, 'INTERCONNECTED EXPOSURE IS A RISK PATTERN, NOT PROOF OF FRAUD');
  void lt;
}

function bullCase(rc: RenderContext) {
  const { ctx, width: W, t } = rc, cx = W / 2, lt = age(rc);
  backdrop(rc, 'Final chorus · the hopeful case', '#D2D9B4', C.green);
  headline(ctx, 'USEFUL TOOLS. CUSTOMERS. REVENUE.', 151, 27);
  // A daylight customer scene: the cast are doing work, not posing beside abstract labels.
  paint(ctx, [[49, 908], [98, 515], [181, 489], [266, 536], [310, 908]], { wash: '#C7B998', ink: C.ink, sw: 1.2 });
  paint(ctx, [[432, 909], [466, 538], [550, 487], [631, 526], [670, 909]], { wash: '#B6C2A2', ink: C.ink, sw: 1.2 });
  for (let i = 0; i < 4; i++) {
    const x = 113 + i * 143;
    paint(ctx, ellPts(x, 338 + Math.sin(t * 0.8 + i) * 7, 33, 33, 16, 0.8), { fill: C.gold, fillOp: 62, bleed: 0.4, ink: null });
  }
  // Customer uses a tool, researcher demonstrates, revenue receipt appears only after the work.
  worker(ctx, cx - 220, FLOOR, 25, t, C.blue, 'point');
  worker(ctx, cx + 226, FLOOR, 25, t, C.gold, 'walk');
  gpuPerson(ctx, cx, 884, 27, t, { hat: 'party', eyes: 'happy', mouth: 'grin', emote: 'spark', emoteK: 0.65 });
  ticket(ctx, cx - 173, 554, 200, 86, 'CUSTOMER', 'real task', C.blue, -0.11);
  ticket(ctx, cx + 172, 550, 195, 86, 'PRODUCTIVITY', 'if it lasts', C.green, 0.1);
  // A deliberately modest receipt, not a forecast arrow.
  for (let i = 0; i < 4; i++) inkLine(ctx, [[cx - 82, 694 + i * 28], [cx + 112 - i * 12, 694 + i * 28]], 1.5, i === 0 ? C.green : C.slate, 0.08);
  letter(ctx, 'VALUE MUST ARRIVE IN THE REAL ECONOMY', cx, 850, 14, C.ink, { mono: true, ink: false });
  sfx(ctx, 'BULL CASE', cx, 389, 24, C.green, lt - 0.3, { life: 4.4 });
  footer(ctx, 'ADOPTION AND CASH FLOWS COULD GROW INTO THE BUILD');
}

function bearCase(rc: RenderContext) {
  const { ctx, width: W, t } = rc, cx = W / 2;
  backdrop(rc, 'Final chorus · the cautious case', '#D7C0B2', C.red);
  headline(ctx, 'DEBT. POWER. UTILIZATION. RETURNS.', 151, 26, C.rust);
  bearInvestor(ctx, cx - 225, FLOOR, 0.9, t, 'worried');
  rackCharacter(ctx, cx + 202, FLOOR, 154, 458, t, 5, true);
  // A delayed grid crew and half-empty room appear in depth.
  worker(ctx, cx - 26, FLOOR, 22, t, C.gold, 'point');
  paint(ctx, rrPts(cx - 97, 460, 194, 73, 8, 0.7), { wash: C.cream, ink: C.ink, sw: 1.1 });
  letter(ctx, 'GRID DELAY', cx, 497, 15, C.rust, { mono: true, ink: false });
  for (let i = 0; i < 3; i++) {
    const x = cx + 95 + i * 29;
    paint(ctx, rrPts(x, 685 + (i % 2) * 61, 24, 28, 3, 0.3), { wash: '#EBCB98', ink: C.ink, sw: 0.7 });
    letter(ctx, '—', x + 12, 699 + (i % 2) * 61, 9, C.ink, { mono: true, ink: false });
  }
  // Upright dominoes sway gently; none falls.
  for (let i = 0; i < 4; i++) {
    const x = 93 + i * 79;
    const lean = Math.sin(t * 2.4 + i) * 0.025;
    ctx.save(); ctx.translate(x, 817); ctx.rotate(lean);
    paint(ctx, rrPts(-27, -83, 54, 166, 7, 0.6), { wash: i < 2 ? '#D58A72' : '#B98572', ink: C.ink, sw: 1.1 });
    letter(ctx, ['DEBT', 'POWER', 'ROOM', 'RETURNS'][i], 0, 0, 10.5, C.ink, { mono: true, ink: false });
    ctx.restore();
  }
  footer(ctx, 'A RISK SCENARIO IS NOT A CRASH FORECAST');
}

function dominoRisk(rc: RenderContext) {
  const { ctx, width: W, t } = rc, cx = W / 2, lt = age(rc);
  backdrop(rc, 'Final chorus · a held moment of fragility', '#DBC9B9', C.orange);
  headline(ctx, 'IF RETURNS FALL SHORT, THE CHAIN CAN SWAY.', 150, 25);
  // The push is animated but caught before the dominoes topple.
  const push = Math.sin(lt * 2.2) * 0.03 + 0.07;
  for (let i = 0; i < 6; i++) {
    const x = 85 + i * 104;
    const lean = i === 0 ? -0.24 : Math.max(-0.02, push * Math.max(0, 1 - i * 0.17));
    ctx.save(); ctx.translate(x, 868); ctx.rotate(lean);
    paint(ctx, rrPts(-27, -151, 54, 302, 7, 0.7), { wash: i % 2 ? '#D38672' : '#C9A071', ink: C.ink, sw: 1.5 });
    letter(ctx, ['SHOCK', 'DEBT', 'POWER', 'DELAY', 'DEMAND', 'RETURNS'][i], 0, -2, 10, C.ink, { mono: true, ink: false });
    ctx.restore();
    if (i < 5) inkLine(ctx, [[x + 34, 799], [x + 65, 799]], 1.8, C.ink, 0.1);
  }
  // The cast physically catches the last link; the scene freezes on hands still holding.
  worker(ctx, cx - 190, FLOOR, 24, t, C.gold, 'point');
  bearInvestor(ctx, cx + 221, FLOOR, 0.57, t, 'worried');
  inkLine(ctx, [[cx + 131, 843], [cx + 98, 770]], 4, C.blue, 0.1);
  paint(ctx, ellPts(cx + 94, 761, 12, 12, 16, 0.5), { wash: C.cream, ink: C.ink, sw: 1 });
  letter(ctx, 'HELD — NOT FALLEN', cx, 453, 18, C.rust, { mono: true, ink: false });
  footer(ctx, 'CONDITIONAL DOWNSIDE · NOT A PREDICTION');
}

function finalQuestion(rc: RenderContext) {
  const { ctx, width: W, t } = rc, cx = W / 2, lt = age(rc);
  backdrop(rc, 'Final chorus · the house lights stay open', '#D8C9AE', C.gold);
  // The curtain moves only halfway. Everyone freezes with an object mid-handoff.
  paint(ctx, [[28, 168], [170, 168], [150, 954], [28, 1044]], { wash: '#8B4E49', ink: C.ink, sw: 1.8, curv: 0.16 });
  paint(ctx, [[692, 168], [550, 168], [570, 954], [692, 1044]], { wash: '#8B4E49', ink: C.ink, sw: 1.8, curv: 0.16 });
  for (let i = 0; i < 6; i++) {
    const y = 240 + i * 120;
    paint(ctx, ellPts(75, y, 4, 4, 8, 0), { wash: C.gold, ink: null });
    paint(ctx, ellPts(645, y, 4, 4, 8, 0), { wash: C.gold, ink: null });
  }
  // Final question carries a nine-second calibrated pre-roll; reveal the title on scene entry.
  letter(ctx, 'IS IT A BUBBLE?', cx, 327, 39, C.ink, { pop: seg(lt, 0.15, 0.8) });
  letter(ctx, 'WILL IT POP?', cx, 404, 43, C.rust, { pop: seg(lt, 1.35, 2.05) });
  // Whole cast shares one painted stage, each carrying a distinct thing.
  gpuPerson(ctx, cx - 225, FLOOR, 20, t, { hat: 'top', eyes: 'look', mouth: 'flat' });
  worker(ctx, cx - 71, FLOOR, 22, t, C.blue, 'point');
  cloudCharacter(ctx, cx + 219, FLOOR, 0.58, t, 'CLOUD', C.blueLt);
  bearInvestor(ctx, cx + 65, FLOOR, 0.49, t, 'worried');
  ticket(ctx, cx - 185, 744, 140, 65, 'EQUITY', 'one direction', C.green, -0.08);
  ticket(ctx, cx + 183, 744, 153, 65, 'COMPUTE', 'another direction', C.blue, 0.08);
  // A final domino remains upright between the ensemble and the question mark.
  ctx.save(); ctx.translate(cx, 925); ctx.rotate(Math.sin(t * 1.5) * 0.018);
  paint(ctx, rrPts(-27, -119, 54, 238, 7, 0.6), { wash: C.gold, ink: C.ink, sw: 1.4 });
  letter(ctx, '?', 0, -2, 47, C.ink, { mono: true, ink: false }); ctx.restore();
  footer(ctx, 'REAL OPPORTUNITY · REAL RISK · NO CRASH DATE');
}
