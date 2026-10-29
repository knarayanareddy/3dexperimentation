import { RenderContext } from '../../types/video';
import { clawd } from '../characters';
import { ANTHROPIC_SYNC_CUES } from '../../data/anthropicSong';
import { clamp, ellPts, hash, inkLine, letter, paint, rectPts, rrPts, starPts } from '../painter';

const W = 720, H = 1280, FLOOR = 1034;
const INK = '#302821', PAPER = '#F5EFE5';
const RUST = '#C96F4A', TEAL = '#588A7D', GOLD = '#D8A84E', MOSS = '#81966A', ROSE = '#C77D78';
const YEARS = [
  '2021 · A RESEARCH BET', 'RELIABLE · STEERABLE · INTERPRETABLE', 'LOOKING INSIDE THE MODEL',
  '2022 · CONSTITUTIONAL AI', 'CRITIQUE → REVISE', 'AI FEEDBACK · HUMAN QUESTIONS',
  '2023 · INTRODUCING CLAUDE', 'CHAT · API · EVERYDAY WORK', 'NOTION · QUORA · DUCKDUCKGO',
  '2024 · HAIKU · SONNET · OPUS', 'TEXT + VISION', 'A FAMILY OF MODELS',
  'ARTIFACTS · A SHARED WORKSPACE', 'COMPUTER USE · PUBLIC BETA', 'EXPERIMENTAL · HUMAN IN THE LOOP',
  'CODE · MULTI-STEP WORK', '2025 · CLAUDE 4 · CLAUDE CODE', 'CAPABILITY · CONSEQUENCE',
  '2026 · THE ANTHROPIC INSTITUTE', 'WORK · ECONOMY · LAW · SOCIETY', 'PROMISE AND UNCERTAINTY',
  'FROM RESEARCH TO REAL WORK', 'WHO BENEFITS? WHAT MUST WE WATCH?', 'THE STORY IS STILL BEING WRITTEN'
];
const COLORS = [RUST, TEAL, GOLD, MOSS, ROSE, '#7D7395'];

function text(ctx: CanvasRenderingContext2D, value: string, x: number, y: number, size: number, color = INK, mono = false) {
  letter(ctx, value, x, y, size, color, { mono, stroke: !mono });
}
function box(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string, radius = 14) {
  paint(ctx, rrPts(x, y, w, h, radius, 0.8), { wash: color, fill: '#FFFDF8', fillOp: 38, bleed: 0.12, ink: INK, sw: 2 });
}
function dot(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) {
  paint(ctx, ellPts(x, y, r, r, 18, 0.6), { wash: color, ink: INK, sw: 1.5 });
}
function person(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, t: number, seed: number, color = RUST) {
  clawd(ctx, x, y, size, {
    seed, t, walk: t * 0.55 + seed * 0.17,
    dy: Math.sin(t * 3 + seed) * 0.4,
    aL: Math.sin(t * 4.2 + seed) * 0.8,
    aR: Math.cos(t * 4.6 + seed) * 0.8,
    mouth: 'talk', talkT: t + seed,
    col: color, dk: '#614237', eyes: (Math.floor(t * 2 + seed) % 4 === 0) ? 'happy' : 'normal'
  });
}
function crowd(ctx: CanvasRenderingContext2D, t: number, count = 5) {
  for (let i = 0; i < count; i++) {
    const x = 120 + i * (480 / Math.max(1, count - 1));
    person(ctx, x + Math.sin(t + i) * 4, FLOOR, i % 2 ? 14 : 16, t, i + 1, COLORS[i % COLORS.length]);
  }
}
function cardLabel(ctx: CanvasRenderingContext2D, value: string, x: number, y: number, w: number, color: string, size = 18) {
  box(ctx, x - w / 2, y - 31, w, 62, color, 11);
  text(ctx, value, x, y, size, INK, true);
}
function arrows(ctx: CanvasRenderingContext2D, points: Array<[number, number]>, color = TEAL, width = 3) {
  inkLine(ctx, points, width, color, 0.14);
  const [x, y] = points[points.length - 1];
  inkLine(ctx, [[x - 11, y - 8], [x, y], [x - 11, y + 8]], width, color, 0.14);
}
function model(ctx: CanvasRenderingContext2D, x: number, y: number, t: number, label = 'CLAUDE') {
  box(ctx, x - 95, y - 108, 190, 194, '#E5D7C7', 24);
  paint(ctx, ellPts(x, y - 20, 51 + Math.sin(t * 2) * 2, 51 + Math.sin(t * 2) * 2, 22, 0.7), { wash: '#F7E8D2', ink: INK, sw: 2 });
  for (let i = 0; i < 6; i++) {
    const a = t * 0.18 + i * Math.PI / 3;
    dot(ctx, x + Math.cos(a) * 37, y - 20 + Math.sin(a) * 37, 5, COLORS[i % COLORS.length]);
  }
  text(ctx, label, x, y + 61, 19, '#654539', true);
}
function paper(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, title: string, color: string) {
  box(ctx, x - w / 2, y - h / 2, w, h, color, 10);
  text(ctx, title, x, y - h / 2 + 35, 16, INK, true);
  for (let i = 0; i < 3; i++) {
    paint(ctx, rectPts(x - w * 0.31, y - h / 2 + 60 + i * 34, w * (0.62 - (i % 2) * 0.08), 5, 0.3), { wash: '#8B7F70', ink: null });
  }
}
function windowCard(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, heading: string, color: string) {
  box(ctx, x - w / 2, y - h / 2, w, h, color, 16);
  paint(ctx, rectPts(x - w / 2 + 2, y - h / 2 + 2, w - 4, 34, 0.4), { wash: '#564940', ink: null });
  text(ctx, heading, x, y - h / 2 + 19, 14, '#FFF9EF', true);
  for (let i = 0; i < 3; i++) {
    paint(ctx, rrPts(x - w / 2 + 18, y - h / 2 + 53 + i * 31, w * (0.48 + (i % 2) * 0.12), 14, 5, 0.3), { wash: i === 1 ? '#D9C8B4' : '#E9E0D3', ink: null });
  }
}
function drawScene(ctx: CanvasRenderingContext2D, i: number, t: number) {
  if (i === 0) {
    box(ctx, 88, 354, 544, 382, '#EADBC9', 28);
    text(ctx, 'A SMALL TEAM, A BIG QUESTION', 360, 402, 22, '#714B3C', true);
    paper(ctx, 360, 584, 306, 176, 'RESEARCH · 2021', '#F3E8D7');
    person(ctx, 190, FLOOR, 22, t, 1, RUST); person(ctx, 300, FLOOR, 17, t, 2, TEAL);
    person(ctx, 420, FLOOR, 19, t, 3, GOLD); person(ctx, 528, FLOOR, 16, t, 4, MOSS);
  } else if (i === 1) {
    const labels = [['RELIABLE', 162, RUST], ['STEERABLE', 360, TEAL], ['INTERPRETABLE', 558, GOLD]] as const;
    labels.forEach(([s, x, c], k) => { cardLabel(ctx, s, x, 496 + Math.sin(t * 2 + k) * 9, 174, c, 15); dot(ctx, x, 638, 13, c); });
    arrows(ctx, [[162, 540], [162, 630]], RUST); arrows(ctx, [[360, 540], [360, 630]], TEAL); arrows(ctx, [[558, 540], [558, 630]], GOLD);
    text(ctx, 'THREE PARTS OF THE EARLY RESEARCH AIM', 360, 384, 17, INK, true);
  } else if (i === 2) {
    box(ctx, 132, 395, 456, 310, '#E7E4D9', 22);
    for (let row = 0; row < 3; row++) for (let col = 0; col < 4; col++) {
      const x = 222 + col * 92, y = 478 + row * 75;
      if (col < 3) arrows(ctx, [[x + 15, y], [x + 70, y + 30]], '#94877A', 1.7);
      dot(ctx, x, y, 11, COLORS[(row + col) % COLORS.length]);
    }
    paint(ctx, ellPts(360, 570, 115 + Math.sin(t * 2) * 4, 115 + Math.sin(t * 2) * 4, 28, 0.2), { ink: '#FFF7E8', sw: 3 });
    text(ctx, 'LOOK CLOSER', 360, 739, 21, TEAL, true);
  } else if (i === 3) {
    paper(ctx, 360, 560, 330, 390, 'A WRITTEN CONSTITUTION', '#E6D5C2');
    for (let k = 0; k < 4; k++) dot(ctx, 251, 495 + k * 34, 5, k % 2 ? TEAL : RUST);
    person(ctx, 558, FLOOR, 20, t, 6, GOLD);
  } else if (i === 4) {
    windowCard(ctx, 182, 550, 204, 220, 'DRAFT', '#E8D8C6');
    windowCard(ctx, 540, 550, 204, 220, 'REVISION', '#DCE7E0');
    arrows(ctx, [[292, 550], [428, 550]], RUST, 4);
    cardLabel(ctx, 'CRITIQUE', 360, 428, 152, GOLD, 15);
    text(ctx, 'A METHOD TO TRAIN A HELPFUL, HARMLESS ASSISTANT', 360, 726, 15, INK, true);
  } else if (i === 5) {
    cardLabel(ctx, 'MODEL A', 184, 490, 144, '#E9D9C8', 15);
    cardLabel(ctx, 'MODEL B', 536, 490, 144, '#D6E3DA', 15);
    box(ctx, 255, 610, 210, 96, '#F1E4D3', 12); text(ctx, 'AI FEEDBACK', 360, 657, 16, INK, true);
    arrows(ctx, [[244, 502], [300, 572]], TEAL); arrows(ctx, [[476, 572], [525, 502]], RUST);
    person(ctx, 360, FLOOR, 20, t, 4, GOLD);
    text(ctx, 'A TRAINING APPROACH — NOT A GUARANTEE', 360, 733, 15, '#714B3C', true);
  } else if (i === 6) {
    model(ctx, 360, 556, t);
    windowCard(ctx, 360, 738, 382, 142, 'CLAUDE · CHAT + API', '#E8DED0');
    text(ctx, 'INTRODUCED MARCH 2023', 360, 391, 18, RUST, true);
  } else if (i === 7) {
    model(ctx, 360, 544, t, 'CLAUDE');
    const tasks = ['WRITE', 'SEARCH', 'QUESTIONS', 'CODE'];
    tasks.forEach((task, k) => cardLabel(ctx, task, 136 + k * 149, 772 + (k % 2) * 54, 126, COLORS[k % COLORS.length], 13));
    person(ctx, 110, FLOOR, 17, t, 2, TEAL); person(ctx, 610, FLOOR, 17, t, 5, RUST);
  } else if (i === 8) {
    ['NOTION', 'QUORA', 'DUCKDUCKGO'].forEach((name, k) => {
      const x = 188 + k * 172; cardLabel(ctx, name, x, 515 + (k % 2) * 90, 156, COLORS[k % COLORS.length], 13);
      arrows(ctx, [[x, 560 + (k % 2) * 90], [360, 676]], '#897B6A', 2);
    });
    model(ctx, 360, 770, t, 'CLAUDE');
    text(ctx, 'EARLY PARTNERS', 360, 395, 19, RUST, true);
  } else if (i === 9) {
    const names = ['HAIKU', 'SONNET', 'OPUS'];
    names.forEach((name, k) => {
      const x = 172 + k * 188; box(ctx, x - 79, 450, 158, 240, COLORS[k], 18);
      text(ctx, name, x, 495, 18, INK, true);
      for (let b = 0; b <= k + 1; b++) dot(ctx, x - 24 + b * 24, 575, 7, '#FFF9ED');
      text(ctx, ['FAST', 'BALANCED', 'CAPABLE'][k], x, 641, 13, INK, true);
    });
    text(ctx, 'CLAUDE 3 · MARCH 2024', 360, 395, 20, TEAL, true);
  } else if (i === 10) {
    const tiles = [['PHOTO', RUST], ['CHART', TEAL], ['DIAGRAM', GOLD]] as const;
    tiles.forEach(([name, color], k) => {
      const x = 172 + k * 188; box(ctx, x - 73, 468, 146, 198, color, 16); text(ctx, name, x, 506, 14, INK, true);
      if (k === 1) for (let j = 0; j < 4; j++) paint(ctx, rectPts(x - 36 + j * 22, 618 - j * 23, 13, 58 + j * 23, 0.4), { wash: '#FFF5E6', ink: INK, sw: 1 });
      else if (k === 2) { dot(ctx, x - 20, 576, 15, '#FFF5E6'); dot(ctx, x + 23, 602, 15, '#FFF5E6'); arrows(ctx, [[x - 3, 583], [x + 6, 593]], INK, 2); }
      else paint(ctx, ellPts(x, 582, 38, 31, 18, 0.5), { wash: '#F6EBD9', ink: INK, sw: 1.5 });
    });
    model(ctx, 360, 769, t, 'VISION INPUT');
  } else if (i === 11) {
    model(ctx, 360, 562, t, 'CLAUDE 3');
    ['HAIKU', 'SONNET', 'OPUS'].forEach((name, k) => cardLabel(ctx, name, 144 + k * 216, 756 + (k % 2) * 34, 134, COLORS[k], 14));
    text(ctx, 'OPTIONS ACROSS SPEED, CAPABILITY, AND COST', 360, 393, 16, INK, true);
  } else if (i === 12) {
    windowCard(ctx, 250, 574, 260, 254, 'CHAT', '#E7D9C9');
    windowCard(ctx, 500, 574, 260, 254, 'ARTIFACT', '#DCE7E0');
    arrows(ctx, [[360, 574], [386, 574]], TEAL, 3);
    text(ctx, 'A SIDE-BY-SIDE WORKSPACE', 360, 399, 19, TEAL, true);
    person(ctx, 360, FLOOR, 20, t, 2, GOLD);
  } else if (i === 13) {
    windowCard(ctx, 360, 560, 470, 300, 'DESKTOP · PUBLIC BETA', '#E5DDD1');
    const x = 250 + (Math.sin(t * 1.5) + 1) * 90, y = 545 + (Math.cos(t * 1.3) + 1) * 75;
    inkLine(ctx, [[x, y], [x + 22, y + 45], [x + 31, y + 25], [x + 46, y + 55]], 5, RUST, 0.12);
    cardLabel(ctx, 'EXPERIMENTAL', 360, 754, 190, '#EBD3BF', 14);
  } else if (i === 14) {
    windowCard(ctx, 360, 554, 460, 270, 'NEXT STEP?', '#E8DED0');
    person(ctx, 248, FLOOR, 21, t, 7, TEAL);
    paint(ctx, ellPts(250, 795, 18, 18, 18, 0.5), { wash: GOLD, ink: INK, sw: 2 });
    arrows(ctx, [[316, 792], [405, 792]], RUST, 3);
    cardLabel(ctx, 'HUMAN CHECK', 500, 792, 172, '#DCE7E0', 14);
  } else if (i === 15) {
    windowCard(ctx, 260, 556, 270, 294, 'CODE', '#E8D8C7');
    windowCard(ctx, 516, 556, 210, 294, 'TESTS', '#DCE6DD');
    arrows(ctx, [[397, 556], [410, 556]], TEAL, 3);
    for (let k = 0; k < 4; k++) dot(ctx, 223, 501 + k * 42, 4, k % 2 ? TEAL : RUST);
    text(ctx, 'PLAN · EDIT · RUN · REVIEW', 360, 773, 16, INK, true);
    person(ctx, 360, FLOOR, 20, t, 1, GOLD);
  } else if (i === 16) {
    cardLabel(ctx, 'CLAUDE 4', 360, 465, 196, RUST, 18);
    const labels = ['CODING', 'REASONING', 'AGENTS'];
    labels.forEach((s, k) => cardLabel(ctx, s, 176 + k * 184, 614 + (k % 2) * 49, 148, COLORS[k], 14));
    box(ctx, 175, 755, 370, 78, '#DFE8DF', 12); text(ctx, 'CLAUDE CODE · GENERALLY AVAILABLE', 360, 794, 14, INK, true);
    text(ctx, 'MAY 2025', 360, 394, 19, TEAL, true);
  } else if (i === 17) {
    for (let k = 0; k < 5; k++) {
      const x = 134 + k * 113; box(ctx, x - 42, 496, 84, 112, COLORS[k % COLORS.length], 12);
      text(ctx, ['PLAN', 'ACT', 'CHECK', 'REVISE', 'ASK'][k], x, 550, 12, INK, true);
      if (k < 4) arrows(ctx, [[x + 43, 550], [x + 68, 550]], '#837668', 1.5);
    }
    cardLabel(ctx, 'MORE CAPABILITY, MORE TO CONSIDER', 360, 705, 364, '#E7D8C7', 15);
    person(ctx, 360, FLOOR, 18, t, 3, RUST);
  } else if (i === 18) {
    box(ctx, 132, 402, 456, 300, '#E7DCCE', 24);
    text(ctx, 'THE ANTHROPIC INSTITUTE', 360, 449, 20, '#704B3B', true);
    const roles = ['ML RESEARCH', 'ECONOMICS', 'SOCIAL SCIENCE'];
    roles.forEach((s, k) => cardLabel(ctx, s, 202 + k * 158, 570 + (k % 2) * 48, 146, COLORS[k], 12));
    crowd(ctx, t, 5);
  } else if (i === 19) {
    const names = ['FRONTIER\nCAPABILITIES', 'WORK &\nECONOMY', 'LAW &\nSOCIETY'];
    names.forEach((name, k) => {
      const x = 168 + k * 192; box(ctx, x - 78, 478, 156, 178, COLORS[k], 18);
      const parts = name.split('\n'); text(ctx, parts[0], x, 545, 13, INK, true); text(ctx, parts[1], x, 574, 13, INK, true);
      arrows(ctx, [[x, 659], [360, 744]], '#82796B', 2);
    });
    box(ctx, 226, 742, 268, 82, '#EEE4D6', 15); text(ctx, 'PUBLIC QUESTIONS', 360, 783, 15, INK, true);
  } else if (i === 20) {
    paint(ctx, ellPts(360, 590, 128, 128, 30, 0.4), { wash: '#F1E5D4', ink: INK, sw: 2 });
    inkLine(ctx, [[240, 553], [480, 553]], 5, INK, 0.1);
    inkLine(ctx, [[360, 553], [360, 686]], 5, INK, 0.1);
    paint(ctx, rectPts(312, 684, 96, 15, 0.2), { wash: TEAL, ink: INK, sw: 1.5 });
    cardLabel(ctx, 'POSSIBILITY', 220, 486, 188, '#DDE6D8', 14);
    cardLabel(ctx, 'UNCERTAINTY', 500, 486, 190, '#E8D9C9', 14);
    text(ctx, 'NO FINAL ANSWERS YET', 360, 757, 18, '#714B3C', true);
  } else if (i === 21) {
    paper(ctx, 198, 542, 206, 278, 'RESEARCH', '#E8D8C8');
    arrows(ctx, [[312, 542], [407, 542]], TEAL, 4);
    windowCard(ctx, 523, 542, 236, 278, 'TOOLS IN USE', '#DCE6DE');
    person(ctx, 190, FLOOR, 17, t, 1, RUST); person(ctx, 525, FLOOR, 17, t, 4, TEAL);
  } else if (i === 22) {
    crowd(ctx, t, 6);
    cardLabel(ctx, 'WHO BENEFITS?', 360, 456, 288, '#EBDCCB', 18);
    cardLabel(ctx, 'WHAT MUST WE WATCH?', 360, 548, 336, '#DFE9DF', 15);
    for (let k = 0; k < 8; k++) paint(ctx, starPts(112 + k * 72, 680 + Math.sin(t * 2 + k) * 12, 5, 0.35, 4, t), { wash: COLORS[k % COLORS.length], ink: null });
  } else {
    box(ctx, 97, 402, 526, 316, '#EEE2D1', 25);
    text(ctx, 'THE STORY IS STILL', 360, 510, 26, '#71503F', true);
    text(ctx, 'BEING WRITTEN', 360, 568, 31, RUST, true);
    paper(ctx, 360, 774, 252, 130, 'NEXT PAGE…', '#F5EBDC');
  }
}

function lyricBanner(ctx: CanvasRenderingContext2D, cue: string, t: number) {
  let size = 23;
  ctx.save();
  while (size > 15) {
    ctx.font = `500 ${size}px "Fira Code", "Courier New", monospace`;
    if (ctx.measureText(cue).width < 630) break;
    size--;
  }
  ctx.restore();
  paint(ctx, rrPts(22, 1080, 676, 118, 18, 1.2), { wash: '#FFF9EF', fill: GOLD, fillOp: 18, bleed: 0.1, ink: INK, sw: 2.1 });
  paint(ctx, rectPts(40, 1098, 7, 80, 0.4), { wash: RUST, ink: null });
  letter(ctx, cue, 365, 1138, size, INK, { mono: true });
  for (let i = 0; i < 4; i++) paint(ctx, ellPts(75 + i * 188 + ((t * 22 + i * 13) % 62), 1181, 3, 3, 10, 0.2), { wash: COLORS[i], ink: null });
}

export function renderAnthropic(chapterNumber: number, rc: RenderContext) {
  const { ctx, width, height, t, shot, globalProgress } = rc;
  const index = Number(shot.id.slice('anthropic-'.length)) - 1;
  ctx.save(); ctx.scale(width / W, height / H);
  ctx.fillStyle = PAPER; ctx.fillRect(0, 0, W, H);
  const tint = COLORS[(chapterNumber - 1) % COLORS.length];
  ctx.globalAlpha = 0.09; ctx.fillStyle = tint; ctx.beginPath(); ctx.ellipse(360 + Math.sin(t * 0.25) * 28, 590, 322, 438, 0, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
  for (let k = 0; k < 15; k++) paint(ctx, starPts(36 + hash(k + chapterNumber * 23) * 648, 245 + hash(k + 96) * 690, 2 + hash(k + 41) * 2, 0.4, 4, t * 0.1 + k), { wash: k % 3 ? '#D7C6B2' : GOLD, ink: null, alpha: 0.38 });
  paint(ctx, rectPts(0, FLOOR, W, 3, 0), { wash: INK, ink: null });
  paint(ctx, ellPts(360, 1098, 350, 46, 26, 0.8), { wash: '#DFD2C0', ink: null });
  paint(ctx, rrPts(24, 42, 260, 54, 14, 0.8), { wash: '#FFF9EF', fill: RUST, fillOp: 16, ink: INK, sw: 2 });
  letter(ctx, `ANTHROPIC · ${String(chapterNumber).padStart(2, '0')}/08`, 154, 69, 15, '#684A3C', { mono: true });
  letter(ctx, YEARS[Math.max(0, index)] || 'ANTHROPIC · OPEN QUESTIONS', 360, 145, 19, '#76503E', { mono: true });
  drawScene(ctx, index, t);
  if (t >= ANTHROPIC_SYNC_CUES[index].at) lyricBanner(ctx, shot.cue, t);
  paint(ctx, rrPts(584, 52, 108, 32, 12, 0.5), { wash: '#FFF9EF', ink: INK, sw: 1.3 });
  ctx.save(); ctx.beginPath(); ctx.rect(590, 59, 96, 18); ctx.clip();
  paint(ctx, rrPts(590, 59, Math.max(8, 96 * clamp(globalProgress)), 18, 7, 0.2), { wash: TEAL, ink: null }); ctx.restore();
  ctx.restore();
}
