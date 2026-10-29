import { RenderContext } from '../../types/video';
import { clawd, ClawdOpts } from '../characters';
import { PAL, clamp, ellPts, hash, inkLine, letter, paint, rectPts, rrPts, starPts } from '../painter';

const W = 720, H = 1280, FLOOR = 1036, INK = '#2B2233', PAPER = '#F3EBDC';
const ROBOT = '#8EC3E6';
const PALETTE = ['#D97757', '#3A9C98', '#E8AA38', '#7B5CA8', '#6E9F58', '#E27A92'];
const YEARS = [
  '1950 · THE QUESTION', '1956 · DARTMOUTH', 'SYMBOLIC AI · WINTERS', '1986 · BACKPROP GOES MAINSTREAM',
  'ASK · LEARN · TRY AGAIN', 'WINTER → THAW', 'DEEP BLUE → CHAT', 'A LONG WAY FROM HERE',
  '1997 · DEEP BLUE', 'IMAGENET · MILLIONS OF IMAGES', '2012 · ALEXNET', 'GPUs + DATA',
  'ATTENTION', '2017 · TRANSFORMER', '2022 · CHATGPT', 'MULTIMODAL · PEOPLE STEER',
  'ASK · LEARN · TRY AGAIN', 'WINTER → THAW', 'DEEP BLUE → CHAT', 'A LONG WAY FROM HERE',
  'ASK · LEARN · TRY AGAIN', 'ONE MORE QUESTION'
];

function person(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, t: number, seed: number, o: Partial<ClawdOpts> = {}) {
  clawd(ctx, x, y, size, {
    seed, t, walk: t * 0.6 + seed * 0.19,
    dy: Math.sin(t * 3 + seed) * 0.45,
    aL: Math.sin(t * 4.8 + seed) * 0.9,
    aR: Math.cos(t * 4.3 + seed) * 0.9,
    mouth: 'talk', talkT: t + seed,
    col: PALETTE[seed % PALETTE.length], dk: '#633A43', ...o
  });
}
function card(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  paint(ctx, rrPts(x, y, w, h, 12, 0.8), { wash: color, fill: '#FFFFFF', fillOp: 32, bleed: 0.12, ink: INK, sw: 2, curv: 0.2 });
}
function txt(ctx: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, color = INK, mono = false) {
  letter(ctx, s, x, y, size, color, { mono, stroke: !mono });
}
function cast(ctx: CanvasRenderingContext2D, t: number, count = 6) {
  for (let i = 0; i < count; i++) {
    const x = 60 + i * (600 / Math.max(1, count - 1));
    person(ctx, x + Math.sin(t * 1.5 + i) * 5, FLOOR - (i % 3 === 1 ? 8 : 0), i === 2 ? 16 : 13, t, i + 1, {
      eyes: (Math.floor(t * 2) + i) % 4 === 0 ? 'happy' : 'normal',
      hat: i === 0 ? 'party' : i === 3 ? 'band' : undefined,
      emote: i % 3 === 0 ? 'music' : undefined
    });
  }
}
function computer(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, t: number) {
  ctx.save(); ctx.translate(x, y); ctx.scale(scale, scale);
  paint(ctx, rrPts(-96, -150, 192, 132, 10, 1), { wash: PAL.night, ink: INK, sw: 3 });
  paint(ctx, rrPts(-77, -134, 154, 98, 5, 0.5), { wash: '#A9D5D3', ink: INK, sw: 1.5 });
  for (let i = 0; i < 3; i++) paint(ctx, ellPts(-42 + i * 42, -90 + Math.sin(t * 3 + i) * 10, 7, 7, 12, 0.4), { wash: [PAL.rose, PAL.ochre, PAL.teal][i], ink: INK, sw: 1 });
  paint(ctx, rectPts(-22, -18, 44, 18, 1), { wash: '#7F7785', ink: INK, sw: 2 });
  paint(ctx, rrPts(-72, -3, 144, 15, 5, 0.8), { wash: '#C4B8A6', ink: INK, sw: 2 });
  ctx.restore();
}
function network(ctx: CanvasRenderingContext2D, t: number, backward = false) {
  const pts: Array<Array<[number, number]>> = [
    [[150, 470], [150, 585], [150, 700]],
    [[355, 420], [355, 520], [355, 620], [355, 720]],
    [[560, 475], [560, 585], [560, 695]]
  ];
  for (let l = 0; l < 2; l++) for (let a = 0; a < pts[l].length; a++) for (let b = 0; b < pts[l + 1].length; b++) {
    const active = (Math.floor(t * 3) + a + b + l) % 4 === 0;
    inkLine(ctx, [pts[l][a], pts[l + 1][b]], active ? 3 : 1.3, active ? PAL.rose : '#887E89', 0.1);
  }
  pts.forEach((layer, li) => layer.forEach(([x, y]) => paint(ctx, ellPts(x, y, 22, 22, 18, 0.8), {
    wash: backward && (Math.floor(t * 2) + li) % 3 === 0 ? PAL.rose : [PAL.sky, PAL.ochre, PAL.teal][li], ink: INK, sw: 2
  })));
  if (backward) {
    const x = 190 + ((t * 140) % 330);
    inkLine(ctx, [[x + 75, 775], [x, 775]], 5, PAL.rose, 0.1);
    inkLine(ctx, [[x + 16, 761], [x, 775], [x + 16, 789]], 5, PAL.rose, 0.1);
  }
}
function chess(ctx: CanvasRenderingContext2D, t: number) {
  const x0 = 184, y0 = 430, s = 51;
  for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) paint(ctx, rectPts(x0 + c * s, y0 + r * s, s, s, 0.2), { wash: (r + c) % 2 ? '#F7DCA5' : '#8D6A55', ink: null });
  const pieces: Array<[number, number, string]> = [[0, 5, '♜'], [1, 4, '♟'], [2, 3, '♞'], [3, 2, '♟'], [4, 4, '♙'], [5, 1, '♔']];
  pieces.forEach(([c, r, g], i) => txt(ctx, g, x0 + c * s + s / 2, y0 + r * s + s / 2 + Math.sin(t * 4 + i) * 3, 30, i % 2 ? '#FFF5E2' : INK));
}
function snow(ctx: CanvasRenderingContext2D, t: number) {
  for (let i = 0; i < 30; i++) {
    const x = 40 + hash(i) * 640;
    const y = 405 + ((t * (60 + hash(i + 19) * 65) + hash(i + 4) * 440) % 400);
    paint(ctx, starPts(x, y, 4 + hash(i + 100) * 4, 0.4, 4, t + i), { wash: '#FFF9E8', ink: null });
  }
}
function lineLyric(ctx: CanvasRenderingContext2D, text: string, t: number) {
  let size = 27;
  ctx.save();
  while (size > 16) { ctx.font = `500 ${size}px "Fira Code", "Courier New", monospace`; if (ctx.measureText(text).width < 642) break; size--; }
  ctx.restore();
  paint(ctx, rrPts(22, 1080, 676, 118, 18, 1.2), { wash: '#FFF9ED', fill: '#E8AA38', fillOp: 25, bleed: 0.15, ink: INK, sw: 2.2 });
  paint(ctx, rectPts(40, 1098, 8, 81, 0.4), { wash: PAL.rose, ink: null });
  letter(ctx, text, 365, 1138, size * (1 + Math.max(0, Math.sin(t * Math.PI * 4)) * 0.015), INK, { mono: true });
  for (let i = 0; i < 4; i++) paint(ctx, ellPts(70 + i * 194 + ((t * 28 + i * 17) % 72), 1181, 3, 3, 10, 0.2), { wash: [PAL.rose, PAL.teal, PAL.ochre, PAL.violet][i], ink: null });
}

function drawBeat(ctx: CanvasRenderingContext2D, i: number, t: number, p: number) {
  if (i === 0) {
    txt(ctx, 'ASK, LEARN, TRY AGAIN!', 360, 263, 27, PAL.violet);
    card(ctx, 102, 350, 516, 348, '#E4CDA8'); computer(ctx, 432, 695, 1.05, t);
    person(ctx, 192 + p * 24, FLOOR, 23, t, 7, { col: PAL.ochre, hat: 'top', eyes: 'look', emote: '!' });
    person(ctx, 520 - p * 18, FLOOR - 10, 17, t, 8, { col: ROBOT, eyes: 'scared', mouth: 'O', emote: '?' });
    txt(ctx, 'CAN A MACHINE PLAY?', 360, 388, 26, PAL.night, true);
  } else if (i === 1) {
    card(ctx, 68, 340, 584, 360, '#F7E8C8'); txt(ctx, 'SUMMER · 1956', 360, 378, 28, PAL.night);
    paint(ctx, rrPts(116, 452, 488, 114, 12, 0.8), { wash: '#B5906F', ink: INK, sw: 2 });
    ['LOGIC', 'SEARCH', 'LEARN', 'AI'].forEach((s, k) => { const x = 124 + k * 120 + Math.sin(t * 2 + k) * 5; card(ctx, x, 480 + Math.cos(t * 2 + k) * 7, 100, 48, k % 2 ? PAL.sky : PAL.ochre); txt(ctx, s, x + 50, 504 + Math.cos(t * 2 + k) * 7, 15); });
    for (let k = 0; k < 5; k++) person(ctx, 152 + k * 104, 644, 14, t, k + 11, { eyes: 'happy', hat: k === 0 ? 'top' : undefined });
  } else if (i === 2) {
    card(ctx, 72, 360, 576, 366, '#D9C4A9');
    for (let k = 0; k < 5; k++) { const y = 682 - k * 63 + Math.sin(t * 2 + k) * 5; card(ctx, 185 + k * 3, y, 350 - k * 6, 47, k % 2 ? '#D6B36A' : '#CB8A61'); txt(ctx, ['IF / THEN', 'RULE 01', 'RULE 02', 'SEARCH', 'EXPERT SYSTEM'][k], 360, y + 24, 16); }
    person(ctx, 118, FLOOR, 19, t, 3, { eyes: 'scared', emote: '!?'}); person(ctx, 604, FLOOR, 18, t, 5, { hat: 'wizard', emote: 'zzz' });
    snow(ctx, t); txt(ctx, 'FUNDING WINTER', 360, 395, 25, '#4D5873');
  } else if (i === 3) {
    network(ctx, t, true); person(ctx, 77, FLOOR, 14, t, 2, { emote: '!' }); person(ctx, 642, FLOOR, 14, t, 5, { eyes: 'spark' });
  } else if (i === 4 || i === 16 || i === 20) {
    for (let k = 0; k < 7; k++) paint(ctx, starPts(90 + k * 90, 420 + Math.sin(t * 4 + k) * 25, 11 + (k % 2) * 4, 0.4, 4, t), { wash: k % 2 ? PAL.rose : PAL.ochre, ink: null });
    txt(ctx, 'ASK!  LEARN!  TRY AGAIN!', 360, 494, 31, PAL.violet);
    cast(ctx, t, 6);
    if (i === 20) person(ctx, 360 + Math.sin(t * 2) * 90, FLOOR - 110, 22, t, 7, { hat: 'party', eyes: 'happy', emote: 'music' });
  } else if (i === 5 || i === 17) {
    card(ctx, 53, 365, 614, 332, '#BFDDF0'); snow(ctx, t);
    for (let k = 0; k < 9; k++) paint(ctx, ellPts(92 + k * 68, 744 + Math.sin(t * 4 + k) * 7, 15, 12, 14, 0.3), { wash: k % 2 ? '#88B66A' : PAL.ochre, ink: INK, sw: 1 });
    txt(ctx, 'THE THAW!', 360, 412, 39, PAL.teal); cast(ctx, t, 6);
  } else if (i === 6 || i === 18) {
    chess(ctx, t); card(ctx, 414, 472, 214, 151, '#E3F1F2'); txt(ctx, 'HELLO!', 520, 522, 26, PAL.teal);
    for (let k = 0; k < 3; k++) paint(ctx, ellPts(465 + k * 42, 577, 6, 6, 10, 0.3), { wash: PAL.rose, ink: null }); cast(ctx, t, 5);
  } else if (i === 7 || i === 19) {
    const hues = [PAL.ochre, PAL.rose, PAL.teal, PAL.violet];
    for (let k = 0; k < 4; k++) { const x = 105 + k * 145; const y = 420 + (k % 2) * 72 + Math.sin(t * 2 + k) * 12; card(ctx, x, y, 112, 234, hues[k]); txt(ctx, ['1950', '1956', '1997', '2012'][k], x + 56, y + 36, 20, '#FFF9EE'); person(ctx, x + 56, y + 206, 15, t, k + 2, { eyes: 'happy' }); }
    cast(ctx, t, 5);
  } else if (i === 8) {
    chess(ctx, t); computer(ctx, 568, 750, 0.66, t); txt(ctx, '1997', 360, 370, 36, PAL.ochre);
    person(ctx, 130, FLOOR, 21, t, 9, { col: '#D7D1C7', eyes: 'scared', emote: '!?'}); person(ctx, 594, FLOOR - 24, 16, t, 2, { col: ROBOT, eyes: 'happy', emote: '!' });
  } else if (i === 9) {
    const kinds = ['CAT', 'PLANE', 'CUP', 'DOG', 'BIKE', 'FLOWER', 'TRAIN', 'APPLE'];
    for (let k = 0; k < 10; k++) { const x = 92 + (k % 5) * 110 + Math.sin(t * 2 + k) * 10; const y = 427 + Math.floor(k / 5) * 143 + Math.cos(t * 2 + k) * 12; card(ctx, x, y, 86, 108, '#FFF9EC'); txt(ctx, kinds[k % 8], x + 43, y + 43, 13, PAL.violet, true); paint(ctx, rectPts(x + 13, y + 78, 60, 5, 0.3), { wash: k % 2 ? PAL.teal : PAL.rose, ink: null }); }
    txt(ctx, 'LABEL · SORT · LEARN', 360, 365, 23, PAL.night); for (let k = 0; k < 4; k++) person(ctx, 134 + k * 150, 844, 13, t, k + 4, { eyes: 'look', emote: '!' });
  } else if (i === 10) {
    card(ctx, 94, 375, 532, 382, '#FFF9EE'); txt(ctx, 'IMAGE CLASSIFICATION', 360, 420, 22, PAL.night);
    inkLine(ctx, [[169, 674], [169, 500], [567, 500]], 3, INK, 0.1);
    [145, 126, 105, 76, 47, 30].forEach((v, k) => paint(ctx, rectPts(207 + k * 57, 666 - v, 29, v, 0.6), { wash: k < 3 ? PAL.rose : PAL.teal, ink: INK, sw: 1.2 }));
    txt(ctx, 'ERROR ↓', 500, 533, 20, PAL.rose); txt(ctx, '2012 · ALEXNET', 360, 717, 23, PAL.violet);
    person(ctx, 108, FLOOR, 15, t, 1, { emote: 'spark' }); person(ctx, 612, FLOOR, 15, t, 3, { emote: '!' });
  } else if (i === 11) {
    for (const x of [180, 450]) { card(ctx, x - 110, 445, 220, 224, '#4A4B5E'); paint(ctx, rrPts(x - 48, 471, 96, 129, 10, 0.8), { wash: '#75BA99', ink: INK, sw: 2 }); paint(ctx, ellPts(x, 530, 33 + Math.sin(t * 6) * 3, 33 + Math.sin(t * 6) * 3, 20, 0.5), { ink: '#D8F1DC', sw: 3 }); paint(ctx, ellPts(x, 530, 6, 6, 12, 0.3), { wash: PAL.ochre, ink: null }); txt(ctx, 'GPU', x, 626, 18, '#FFF5E2'); }
    txt(ctx, 'PARALLEL POWER', 360, 380, 23, PAL.night); person(ctx, 360, FLOOR, 20, t, 7, { eyes: 'happy', emote: '!!', aL: -1.3, aR: -1.3 }); cast(ctx, t, 4);
  } else if (i === 12) {
    const words = ['THE', 'CAT', 'SAT', 'ON', 'THE', 'MAT'];
    words.forEach((w, k) => { const x = 85 + k * 110; const y = 500 + Math.sin(t * 3 + k) * 18; card(ctx, x, y, 90, 58, k % 2 ? PAL.sky : '#F5D684'); txt(ctx, w, x + 45, y + 29, 18, INK, true); if (k < words.length - 1) inkLine(ctx, [[x + 48, y + 74], [x + 110, y + 112], [x + 164, 504 + Math.sin(t * 3 + k + 1) * 18]], 2.4, PAL.violet, 0.4); });
    txt(ctx, 'CONTEXT CAN REACH ACROSS THE LINE', 360, 420, 19, PAL.night, true); cast(ctx, t, 4);
  } else if (i === 13) {
    ['ENCODER', 'ATTENTION', 'FEED FORWARD', 'DECODER'].forEach((s, k) => { const y = 693 - k * 76 + Math.sin(t * 2 + k) * 5; card(ctx, 205 + (k % 2) * 28, y, 310 - (k % 2) * 56, 50, [PAL.sky, PAL.ochre, PAL.rose, PAL.teal][k]); txt(ctx, s, 360, y + 25, 17); });
    txt(ctx, '2017', 360, 382, 31, PAL.violet); cast(ctx, t, 5);
  } else if (i === 14) {
    card(ctx, 89, 385, 542, 361, '#E9F3F2'); paint(ctx, rrPts(126, 424, 468, 258, 20, 1.5), { wash: '#FFFDF8', ink: INK, sw: 2 });
    const y = 480 + Math.sin(t * 2.4) * 6; card(ctx, 158, y, 248, 62, '#E8AA38'); txt(ctx, 'What can you do?', 282, y + 31, 16);
    card(ctx, 301, y + 84, 232, 66, '#9BCBC6'); txt(ctx, 'Let’s explore!', 417, y + 117, 18); txt(ctx, 'NOVEMBER 2022', 360, 360, 21, PAL.violet); cast(ctx, t, 5);
  } else if (i === 15) {
    const names = ['TEXT', 'IMAGE', 'AUDIO', 'VIDEO'];
    names.forEach((s, k) => { const x = 74 + k * 154; card(ctx, x, 432, 116, 129, [ '#F8E0AA', '#C4DEEF', '#EFC7D2', '#C9DDB8' ][k]); txt(ctx, s, x + 58, 462, 15, INK, true); if (k === 0) for (let n = 0; n < 3; n++) paint(ctx, rectPts(x + 28, 492 + n * 15, 59, 4, 0.2), { wash: PAL.night, ink: null }); if (k === 2) for (let n = 0; n < 5; n++) inkLine(ctx, [[x + 20 + n * 14, 518], [x + 27 + n * 14, 492 - (n % 2) * 12], [x + 34 + n * 14, 524]], 2, PAL.violet, 0.1); });
    person(ctx, 360 + Math.sin(t * 2) * 24, 820, 23, t, 8, { col: ROBOT, eyes: 'happy', hat: 'band', emote: 'spark' });
    card(ctx, 125, 700, 470, 71, '#FFF8E5'); txt(ctx, 'PLAN  →  USE TOOLS  →  CHECK', 360, 735, 17, PAL.night, true);
    person(ctx, 190, FLOOR, 19, t, 3, { hat: 'hard', emote: '!' }); person(ctx, 540, FLOOR, 19, t, 5, { emote: 'music' });
    inkLine(ctx, [[175, 775], [280, 822], [360, 834], [440, 822], [545, 775]], 4, PAL.ochre, 0.2); txt(ctx, 'PEOPLE STEER', 360, 382, 23, PAL.night);
  } else if (i === 21) {
    card(ctx, 101, 384, 518, 332, '#FFF7E4'); txt(ctx, 'WHAT NEXT?', 360, 452, 38, PAL.violet);
    person(ctx, 290, FLOOR - 18, 21, t, 7, { col: PAL.ochre, eyes: 'look', emote: '?' }); person(ctx, 432, FLOOR - 12, 18, t, 8, { col: ROBOT, eyes: 'happy', emote: '!' });
    for (let k = 0; k < 8; k++) paint(ctx, starPts(142 + k * 62, 770 + Math.sin(t * 2 + k) * 28, 8, 0.4, 4, t), { wash: k % 2 ? PAL.rose : PAL.ochre, ink: null });
  }
}

export function renderAiShort(chapterNumber: number, rc: RenderContext) {
  const { ctx, width, height, t, shot, globalProgress } = rc;
  const index = Number(shot.id.slice('aishort-'.length)) - 1;
  const local = Math.max(0, t - shot.startTime);
  const progress = clamp(local / Math.max(0.01, shot.endTime - shot.startTime));
  ctx.save(); ctx.scale(width / W, height / H); ctx.fillStyle = PAPER; ctx.fillRect(0, 0, W, H);
  const wash = [PAL.ochre, PAL.sky, PAL.rose, PAL.teal, PAL.violet, PAL.sap][Math.max(0, chapterNumber - 1) % 6];
  ctx.globalAlpha = 0.12; ctx.fillStyle = wash; ctx.beginPath(); ctx.ellipse(356 + Math.sin(t * 0.35) * 24, 590, 315, 440, 0, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
  for (let k = 0; k < 18; k++) paint(ctx, starPts(38 + hash(k + chapterNumber * 31) * 644, 260 + hash(k + 88) * 660, 3 + hash(k + 40) * 2, 0.4, 4, t * 0.1 + k), { wash: k % 3 ? '#D6BCA3' : PAL.ochre, ink: null, alpha: 0.45 });
  paint(ctx, rectPts(0, FLOOR, W, 3, 0), { wash: INK, ink: null }); paint(ctx, ellPts(360, 1101, 350, 48, 28, 1), { wash: '#D4C4A7', ink: null });
  paint(ctx, rrPts(24, 42, 232, 54, 14, 0.8), { wash: '#FFF9EC', fill: PAL.ochre, fillOp: 30, ink: INK, sw: 2 });
  letter(ctx, `AI HISTORY · ${String(chapterNumber).padStart(2, '0')}/07`, 140, 69, 16, PAL.night, { mono: true });
  letter(ctx, YEARS[Math.max(0, index)] || 'AI · THE NEXT QUESTION', 359, 145, 22, PAL.violet, { mono: true });
  drawBeat(ctx, index, t, progress);
  // Each lyric caption enters at its ASR-estimated phrase onset in the supplied master.
  lineLyric(ctx, shot.cue, t);
  paint(ctx, rrPts(584, 52, 108, 32, 12, 0.5), { wash: '#FFF9EC', ink: INK, sw: 1.4 });
  ctx.save(); ctx.beginPath(); ctx.rect(590, 59, 96, 18); ctx.clip(); paint(ctx, rrPts(590, 59, Math.max(8, 96 * globalProgress), 18, 7, 0.2), { wash: PAL.teal, ink: null }); ctx.restore();
  ctx.restore();
}
