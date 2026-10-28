import { paint, rrPts } from './painter';

export type BrandKey = 'nvidia' | 'openai' | 'microsoftAzure' | 'oracle' | 'coreweave';

/** NVIDIA's monochrome eye glyph path, adapted from Simple Icons (v16.36.0).
 * Other lockups below are careful, simplified editorial versions of the named marks.
 * Brand marks identify the parties discussed; they do not imply sponsorship or endorsement. */
const NVIDIA_EYE = 'M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z';
let cachedNvidiaPath: Path2D | null = null;

const BRAND = {
  nvidia: { text: 'NVIDIA', ink: '#252A29', accent: '#76B900' },
  openai: { text: 'OpenAI', ink: '#24272A', accent: '#24272A' },
  microsoftAzure: { text: 'Microsoft Azure', ink: '#30363B', accent: '#0078D4' },
  oracle: { text: 'ORACLE', ink: '#F80000', accent: '#F80000' },
  coreweave: { text: 'coreweave', ink: '#1C3959', accent: '#1166B1' }
} as const;

/** Draw a compact, high-contrast brand lockup centered at (x,y). */
export function brandLockup(
  ctx: CanvasRenderingContext2D,
  brand: BrandKey,
  x: number,
  y: number,
  height = 28,
  plate = true
) {
  const spec = BRAND[brand];
  const h = height;
  const fontSize = brand === 'microsoftAzure' ? h * 0.4 : h * 0.53;
  const weight = brand === 'coreweave' ? 650 : 700;
  ctx.save();
  ctx.font = `${weight} ${fontSize}px Arial, Helvetica, sans-serif`;
  const textWidth = ctx.measureText(spec.text).width;
  const iconSize = brand === 'oracle' ? 0 : h * 0.82;
  const gap = iconSize ? h * 0.2 : 0;
  const totalWidth = iconSize + gap + textWidth;
  if (plate) {
    paint(ctx, rrPts(x - totalWidth / 2 - 7, y - h * 0.69, totalWidth + 14, h * 1.38, h * 0.22, 0.5), {
      wash: '#FFF9EB', ink: '#786D5C', sw: 0.75, alpha: 0.97
    });
  }
  if (iconSize) {
    const iconX = x - totalWidth / 2 + iconSize / 2;
    drawMark(ctx, brand, iconX, y, iconSize, spec.accent);
  }
  const textX = x - totalWidth / 2 + iconSize + gap + textWidth / 2;
  wordmark(ctx, spec.text, textX, y, fontSize, spec.ink, weight);
  ctx.restore();
}

function wordmark(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, size: number, color: string, weight: number) {
  ctx.save();
  ctx.font = `${weight} ${size}px Arial, Helvetica, sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawMark(ctx: CanvasRenderingContext2D, brand: BrandKey, x: number, y: number, size: number, color: string) {
  if (brand === 'nvidia') {
    if (typeof Path2D !== 'undefined') {
      if (!cachedNvidiaPath) cachedNvidiaPath = new Path2D(NVIDIA_EYE);
      ctx.save(); ctx.translate(x - size / 2, y - size / 2); ctx.scale(size / 24, size / 24);
      ctx.fillStyle = color; ctx.fill(cachedNvidiaPath); ctx.restore();
    } else drawFallbackEye(ctx, x, y, size, color);
  } else if (brand === 'openai') {
    // Simplified six-loop knot: a recognizable editorial version of the OpenAI rosette.
    ctx.save(); ctx.translate(x, y); ctx.scale(size / 48, size / 48);
    ctx.strokeStyle = color; ctx.lineWidth = 3.6; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (let i = 0; i < 6; i++) {
      ctx.save(); ctx.rotate(i * Math.PI / 3);
      ctx.beginPath(); ctx.moveTo(0, -17); ctx.bezierCurveTo(9, -19, 17, -13, 17, -5);
      ctx.bezierCurveTo(17, 3, 10, 8, 2, 8); ctx.bezierCurveTo(-5, 8, -9, 4, -9, -2); ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
  } else if (brand === 'microsoftAzure') {
    const d = size / 4;
    const colors = ['#F25022', '#7FBA00', '#00A4EF', '#FFB900'];
    const coords: Array<[number, number]> = [[-d * 1.05, -d * 1.05], [d * 0.1, -d * 1.05], [-d * 1.05, d * 0.1], [d * 0.1, d * 0.1]];
    coords.forEach(([dx, dy], i) => {
      ctx.fillStyle = colors[i]; ctx.fillRect(x + dx, y + dy, d * 0.86, d * 0.86);
    });
  } else if (brand === 'coreweave') {
    ctx.save(); ctx.translate(x, y); ctx.scale(size / 40, size / 40);
    ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (let i = 0; i < 3; i++) {
      const dx = (i - 1) * 8;
      ctx.beginPath(); ctx.moveTo(-13, -12 + i * 3); ctx.bezierCurveTo(15, -14 + dx, -15, 13 - dx, 13, 12 - i * 3); ctx.stroke();
    }
    ctx.restore();
  }
}

function drawFallbackEye(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = Math.max(1.4, size * 0.1); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.ellipse(x, y, size * 0.45, size * 0.3, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(x, y, size * 0.22, size * 0.16, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(x, y, size * 0.07, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill();
  ctx.restore();
}
