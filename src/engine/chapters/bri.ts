import { RenderContext } from '../../types/video';

const W = 720;
const H = 1280;
const PAPER = '#F5ECDD';
const INK = '#282735';
const RUST = '#C66A45';
const TEAL = '#41847C';
const GOLD = '#E4AD45';
const BLUE = '#8BB8C5';
const PLUM = '#85709A';
const GREEN = '#78966B';
const PALE = '#FFF9EF';

function rounded(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: string, stroke = INK, line = 2) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = line; ctx.stroke(); }
}
function label(ctx: CanvasRenderingContext2D, s: string, x: number, y: number, size = 22, color = INK, weight = 700, align: CanvasTextAlign = 'center') {
  ctx.save(); ctx.font = `${weight} ${size}px "Trebuchet MS", Arial, sans-serif`; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillStyle = color; ctx.fillText(s, x, y, 650); ctx.restore();
}
function line(ctx: CanvasRenderingContext2D, pts: Array<[number, number]>, color = INK, width = 4, dash: number[] = []) {
  ctx.save(); ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.setLineDash(dash); ctx.stroke(); ctx.restore();
}
function dot(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, stroke = INK) {
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill();
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke(); }
}
function pill(ctx: CanvasRenderingContext2D, s: string, x: number, y: number, w: number, color: string, size = 15) {
  rounded(ctx, x - w / 2, y - 16, w, 32, 13, color, INK, 1.5); label(ctx, s, x, y, size, INK, 700);
}
function card(ctx: CanvasRenderingContext2D, s: string, x: number, y: number, w: number, h: number, color: string, size = 20) {
  rounded(ctx, x, y, w, h, 18, color, INK, 2); label(ctx, s, x + w / 2, y + h / 2, size, INK, 700);
}

function drawMascot(ctx: CanvasRenderingContext2D, x: number, y: number, t: number, scale = 1) {
  ctx.save(); ctx.translate(x, y + Math.sin(t * 4) * 6); ctx.scale(scale, scale);
  // generic cargo box character; no flag, logo, or country cue
  rounded(ctx, -59, -63, 118, 98, 12, '#D99562', INK, 3);
  for (let dx = -42; dx <= 42; dx += 28) line(ctx, [[dx, -58], [dx, 27]], '#A65F43', 2);
  dot(ctx, -17, -22, 4.5, INK, ''); dot(ctx, 17, -22, 4.5, INK, '');
  ctx.beginPath(); ctx.arc(0, -11, 15, 0.15, Math.PI - 0.15); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke();
  line(ctx, [[-32, 37], [-40, 48]], INK, 4); line(ctx, [[32, 37], [40, 48]], INK, 4);
  line(ctx, [[-59, -31], [-73, -42]], INK, 4); line(ctx, [[59, -31], [73, -42]], INK, 4);
  ctx.restore();
}

function drawSchematic(ctx: CanvasRenderingContext2D, t: number, dense = false) {
  rounded(ctx, 38, 278, 644, 600, 26, '#E9E2D1', '#897F70', 2);
  // Abstract land-like islands are purely decorative, not geographic boundaries.
  ctx.fillStyle = '#C9D8C3'; ctx.strokeStyle = '#7F9278'; ctx.lineWidth = 2;
  const blobs = [[176, 463, 95, 56], [286, 600, 117, 82], [473, 443, 100, 63], [553, 661, 62, 47], [143, 711, 63, 40]] as const;
  blobs.forEach(([x, y, rx, ry], i) => {
    ctx.beginPath(); ctx.ellipse(x + Math.sin(t * 0.4 + i) * 2, y, rx, ry, (i % 2 ? 0.2 : -0.1), 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  });
  // schematic corridors: distinct land dashes and sea dots, no asserted exact itinerary
  const land = [[92, 526], [188, 467], [300, 541], [405, 486], [545, 527]] as Array<[number, number]>;
  const sea = [[104, 744], [235, 677], [383, 728], [527, 646], [625, 717]] as Array<[number, number]>;
  ctx.save(); ctx.setLineDash([12, 9]); line(ctx, land, RUST, 8, [12, 9]); ctx.setLineDash([]);
  for (const [x, y] of land) dot(ctx, x, y, 10, GOLD);
  ctx.setLineDash([3, 12]); line(ctx, sea, TEAL, 7, [3, 12]); ctx.setLineDash([]);
  for (const [x, y] of sea) dot(ctx, x, y, 9, BLUE);
  ctx.restore();
  pill(ctx, 'OVERLAND · ROAD / RAIL', 249, 406, 225, '#F7D7B7', 14);
  pill(ctx, 'MARITIME · PORTS', 461, 781, 176, '#D7E8E7', 14);
  if (dense) {
    for (let i = 0; i < 6; i++) {
      const x = 112 + i * 98, y = 585 + Math.sin(i * 2.1) * 31;
      dot(ctx, x, y, 7, i % 2 ? PLUM : RUST);
    }
  }
  label(ctx, 'SCHEMATIC ONLY · NOT TO SCALE', 360, 842, 16, '#554D4A', 700);
}

function drawShip(ctx: CanvasRenderingContext2D, x: number, y: number, t: number) {
  const bob = Math.sin(t * 3) * 5;
  ctx.save(); ctx.translate(x, y + bob);
  line(ctx, [[-80, 0], [74, 0], [49, 31], [-53, 31], [-80, 0]], INK, 3);
  ctx.fillStyle = '#C66A45'; ctx.fill();
  rounded(ctx, -34, -43, 40, 42, 4, '#D99562', INK, 2);
  rounded(ctx, 10, -55, 40, 54, 4, '#D5B45D', INK, 2);
  line(ctx, [[-63, 41], [-28, 46], [8, 41], [42, 46], [76, 41]], TEAL, 4);
  ctx.restore();
}

function drawTrain(ctx: CanvasRenderingContext2D, x: number, y: number, t: number) {
  const offset = Math.sin(t * 2.7) * 9;
  rounded(ctx, x - 95 + offset, y - 34, 190, 66, 12, '#76A7A0', INK, 3);
  rounded(ctx, x + 30 + offset, y - 19, 42, 28, 7, '#DDE8DB', INK, 2);
  for (let i = 0; i < 4; i++) dot(ctx, x - 64 + i * 43 + offset, y + 36, 9, INK, '');
  line(ctx, [[x - 132, y + 47], [x + 121, y + 47]], '#786C5C', 4);
  line(ctx, [[x - 115, y + 55], [x + 103, y + 55]], '#A2947E', 2);
}

function drawPort(ctx: CanvasRenderingContext2D, x: number, y: number, t: number) {
  line(ctx, [[x - 118, y + 73], [x + 118, y + 73]], '#786C5C', 5);
  line(ctx, [[x - 72, y - 95], [x + 56, y - 95], [x + 56, y + 62]], RUST, 8);
  line(ctx, [[x - 72, y - 95], [x - 72, y - 54], [x + 52, y - 54]], RUST, 6);
  line(ctx, [[x + 56, y - 54], [x + 14, y + 13]], INK, 3);
  const swing = Math.sin(t * 2) * 10;
  line(ctx, [[x + 14 + swing, y + 13], [x + 14 + swing, y + 47]], INK, 3);
  rounded(ctx, x - 23 + swing, y + 28, 76, 48, 7, GOLD, INK, 2);
}

function drawRiskCards(ctx: CanvasRenderingContext2D, t: number) {
  const entries = [
    ['DEBT', 'Can it be repaid?', '#E9CBB9'],
    ['OPEN BIDS', 'Who gets the contract?', '#E5DBB5'],
    ['LOCAL VOICE', 'Who helps decide?', '#D5E4D9'],
    ['LAND + NATURE', 'What gets changed?', '#C9DDD4']
  ];
  entries.forEach(([title, sub, color], i) => {
    const col = i % 2, row = Math.floor(i / 2), x = 66 + col * 305, y = 390 + row * 190 + Math.sin(t * 2 + i) * 3;
    rounded(ctx, x, y, 280, 154, 20, color, INK, 2);
    label(ctx, title, x + 140, y + 42, 20, INK, 800);
    label(ctx, sub, x + 140, y + 98, 16, '#514B48', 600);
  });
}

function drawBeat(ctx: CanvasRenderingContext2D, i: number, t: number, progress: number) {
  if (i === 0) {
    drawSchematic(ctx, t);
    pill(ctx, '2013 · TWO PROPOSALS', 360, 323, 245, '#F6D9B9', 16);
    drawMascot(ctx, 360 + Math.sin(t * 1.2) * 142, 650, t, 0.8);
    pill(ctx, 'LAND', 230, 794, 105, '#F7D7B7', 15); pill(ctx, 'SEA', 493, 794, 88, '#D7E8E7', 15);
  } else if (i === 1) {
    drawSchematic(ctx, t, true);
    pill(ctx, 'SIX OVERLAND CORRIDORS · OFFICIAL 2023 WHITE PAPER', 360, 335, 460, '#F6D9B9', 13);
    drawTrain(ctx, 268, 622, t); drawShip(ctx, 503, 738, t); drawPort(ctx, 586, 590, t);
  } else if (i === 2) {
    rounded(ctx, 55, 346, 610, 475, 25, '#E9E2D1', '#897F70', 2);
    card(ctx, 'SHARED BENEFITS', 119, 412, 482, 130, '#E3D3B6', 28);
    pill(ctx, 'CHINA’S STATED FRAMING · 2023', 360, 574, 346, '#F8E6C9', 15);
    card(ctx, 'WHO DECIDES?', 93, 650, 242, 102, '#D7E8E7', 20);
    card(ctx, 'WHO BENEFITS?', 385, 650, 242, 102, '#EBC8B1', 20);
    for (let j = 0; j < 5; j++) dot(ctx, 195 + j * 82, 786 + Math.sin(t * 3 + j) * 5, 7, [RUST, TEAL, GOLD, PLUM, GREEN][j]);
  } else if (i === 3) {
    rounded(ctx, 53, 346, 614, 488, 26, '#E7E5D7', '#81796D', 2);
    label(ctx, 'WORLD BANK MODEL · 2019', 360, 400, 21, TEAL, 800);
    label(ctx, 'CORRIDOR TRAVEL TIME', 360, 472, 18, INK, 700);
    rounded(ctx, 112, 536, 496, 66, 18, '#D0C6B5', INK, 2);
    rounded(ctx, 112, 536, 496 * 0.88, 66, 18, TEAL, '', 0);
    label(ctx, 'BASELINE 100', 175, 620, 14, '#514B48', 700);
    label(ctx, 'MODELLED 88', 545, 620, 14, '#514B48', 700);
    label(ctx, 'UP TO 12% LOWER', 360, 661, 30, INK, 800);
    card(ctx, 'IF PROJECTS ARE COMPLETED', 102, 719, 516, 58, '#F3D8B8', 18);
    label(ctx, 'MODELLED PROJECTION · NOT AN OBSERVED RESULT', 360, 805, 15, '#514B48', 700);
  } else if (i === 4) {
    drawRiskCards(ctx, t);
    line(ctx, [[150, 815], [570, 815]], TEAL, 4, [4, 8]);
    label(ctx, 'POTENTIAL UPSIDE DOES NOT CANCEL OUT THE CHECKS', 360, 866, 16, '#554D4A', 700);
  } else if (i === 5) {
    rounded(ctx, 54, 346, 612, 486, 24, '#E6E2D5', '#897F70', 2);
    label(ctx, 'AIDDATA · 2021 STUDY', 360, 399, 23, PLUM, 800);
    label(ctx, 'BRI INFRASTRUCTURE SAMPLE', 360, 448, 18, INK, 700);
    label(ctx, '35%', 360, 562, 98, RUST, 900);
    label(ctx, 'reported major implementation problems', 360, 642, 18, INK, 700);
    for (let j = 0; j < 20; j++) {
      const x = 120 + (j % 5) * 120, y = 690 + Math.floor(j / 5) * 35;
      rounded(ctx, x - 35, y - 11, 70, 22, 6, j < 7 ? '#D88B65' : '#D4D9C9', INK, 1);
      if (j === 2 || j === 9) label(ctx, '?', x, y, 17, INK, 800);
    }
    label(ctx, 'HISTORICAL DATA THROUGH 2017 · STUDY ESTIMATE · NOT ALL BRI TODAY', 360, 826, 14, '#514B48', 700);
  } else if (i === 6) {
    rounded(ctx, 61, 350, 598, 480, 25, '#E8E0D2', '#897F70', 2);
    const folderColors = ['#E8C6AD', '#D8E1D1', '#E6D7A8'];
    for (let j = 0; j < 3; j++) {
      ctx.save(); ctx.translate(166 + j * 194, 528 + Math.sin(t * 2 + j) * 5); ctx.rotate((j - 1) * 0.06);
      rounded(ctx, -72, -88, 144, 184, 12, folderColors[j], INK, 2);
      label(ctx, ['BORROWER', 'TERMS', 'OUTCOME'][j], 0, -49, 15, INK, 800);
      line(ctx, [[-45, -15], [45, -15]], '#8B8071', 2); line(ctx, [[-45, 12], [45, 12]], '#8B8071', 2); line(ctx, [[-45, 39], [20, 39]], '#8B8071', 2);
      ctx.restore();
    }
    pill(ctx, 'ONE LABEL DOESN’T FIT ALL', 360, 711, 316, '#F4D9B8', 17);
    label(ctx, 'PROJECTS, CONTRACTS AND LOCAL CONTEXT DIFFER', 360, 781, 15, '#514B48', 700);
  } else {
    drawSchematic(ctx, t, true);
    rounded(ctx, 95, 359, 530, 208, 22, '#FFF7E8', INK, 2);
    label(ctx, 'WHO PAYS?', 360, 408, 27, RUST, 800);
    label(ctx, 'WHO BENEFITS?', 360, 463, 27, TEAL, 800);
    label(ctx, 'WHO DECIDES?', 360, 518, 27, PLUM, 800);
    drawMascot(ctx, 358, 758 + progress * 9, t, 0.72);
    pill(ctx, 'CHECK THE PROJECT', 360, 869, 222, '#F4D9B8', 16);
  }
}

function drawCaption(ctx: CanvasRenderingContext2D, cue: string, t: number) {
  rounded(ctx, 22, 1048, 676, 158, 20, PALE, INK, 2.5);
  rounded(ctx, 39, 1067, 9, 118, 4, RUST, '', 0);
  let size = 25;
  ctx.save();
  while (size > 15) {
    ctx.font = `700 ${size}px "Trebuchet MS", Arial, sans-serif`;
    if (ctx.measureText(cue).width < 625) break;
    size--;
  }
  ctx.restore();
  label(ctx, cue, 365, 1126 + Math.sin(t * 2) * 1.3, size, INK, 700);
  for (let j = 0; j < 5; j++) dot(ctx, 322 + j * 19 + Math.sin(t * 4 + j) * 2, 1173, 3.2, [RUST, TEAL, GOLD, PLUM, GREEN][j], '');
}

export function renderBri(chapterNumber: number, rc: RenderContext) {
  const { ctx, width, height, t, shot, globalProgress } = rc;
  const index = Math.max(0, Number(shot.id.slice('bri-'.length)) - 1);
  const local = Math.max(0, t - shot.startTime);
  const progress = Math.max(0, Math.min(1, local / Math.max(0.01, shot.endTime - shot.startTime)));
  ctx.save();
  ctx.scale(width / W, height / H);
  ctx.fillStyle = PAPER; ctx.fillRect(0, 0, W, H);
  // Paper-map texture and hand-drawn route confetti.
  for (let k = 0; k < 13; k++) {
    const x = 26 + ((k * 167 + chapterNumber * 41) % 666);
    const y = 211 + ((k * 103 + chapterNumber * 67) % 790);
    dot(ctx, x, y, 2 + (k % 3), k % 2 ? '#D2C6B5' : '#D8C596', '');
  }
  rounded(ctx, 25, 34, 245, 48, 14, '#FFF9EF', '#84796B', 1.5);
  label(ctx, `BRI FIELD TRIP · ${String(chapterNumber).padStart(2, '0')}/08`, 147, 58, 15, '#65594F', 800);
  pill(ctx, 'SCHEMATIC · NOT TO SCALE', 535, 58, 280, '#E3E8D8', 13);
  label(ctx, rc.chapter.title.toUpperCase(), 360, 137, 28, RUST, 800);
  label(ctx, rc.chapter.subtitle.toUpperCase(), 360, 181, 15, '#625D54', 700);
  drawBeat(ctx, index, t, progress);
  drawCaption(ctx, shot.cue, t);
  // A little marker advances along a dotted timeline; entirely editorial, not a project counter.
  rounded(ctx, 48, 1232, 624, 12, 6, '#DED5C7', '', 0);
  rounded(ctx, 48, 1232, Math.max(6, 624 * globalProgress), 12, 6, TEAL, '', 0);
  dot(ctx, 48 + 624 * globalProgress, 1238, 8, GOLD, INK);
  ctx.restore();
}
