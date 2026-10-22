/**
 * openaiCast.ts — Bespoke painted actors and visual elements for the OpenAI film.
 *
 * Cast:
 *   - BLOOM: The living OpenAI knot/spiral glyph, animated with expressions and morphing aura.
 *   - ROBOT HAND: Five-fingered Shadow robot hand twisting a Rubik's cube with randomized physics.
 *   - CHAT UI: The iconic ChatGPT interface, minimal prompt box, streaming tokens.
 *   - REASONING TREE: Project Strawberry / o1 tree-of-thought search graph.
 *   - SERVER RACKS: Azure high-density supercomputer clusters with liquid cooling.
 *   - BOARDROOM: Glass doors, conference screens, and the 700-signature petition sheet.
 *   - STARGATE: Vast desert compute reactors converting power grids into intelligence.
 */

import {
  PAL, TAU, clamp, paint, inkLine, rectPts, ellPts, rrPts, starPts,
  letter, blob, mixCol, hash
} from './painter';

export const OA = {
  emerald: '#10A37F',    // OpenAI brand green
  emeraldDk: '#0B6D54',
  emeraldLt: '#34D399',
  azure: '#0078D4',      // Microsoft cloud
  azureLt: '#60A5FA',
  purple: '#8B5CF6',     // GPT-4 / reasoning
  strawberry: '#E11D48', // Project Strawberry / o1
  gold: '#F59E0B',
  slateDark: '#0D1117',
  cream: '#F7F4EE'
};

// ---------------------------------------------------------------- BLOOM (KNOT)
export type BloomFace = 'normal' | 'happy' | 'thinking' | 'wink' | 'shocked' | 'determined' | 'star' | 'sleeping';

export interface BloomOpts {
  t: number;
  rot?: number;
  face?: BloomFace;
  talk?: boolean;
  talkT?: number;
  glow?: boolean;
  glowCol?: string;
  seed?: number;
  petals?: number;
  complexity?: number; // 0 (simple loop) to 1 (full 6-arm spiral)
  color?: string;
  outlineColor?: string;
  sw?: number;
  alpha?: number;
}

/**
 * The OpenAI spiral knot character. (x, y) is its center.
 */
export function bloom(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  o: BloomOpts
) {
  const t = o.t;
  const col = o.color || OA.emerald;
  const outCol = o.outlineColor || PAL.ink;
  const rot = (o.rot ?? t * 0.4);
  const sw = o.sw ?? Math.max(1, r / 14);
  const comp = clamp(o.complexity ?? 1);

  ctx.save();
  ctx.translate(cx, cy);

  // Soft atmospheric glow
  if (o.glow !== false) {
    const pulse = 1 + Math.sin(t * 3.5) * 0.12;
    blob(ctx, 0, 0, r * 1.5 * pulse, o.glowCol || col, {
      alpha: 0.35,
      seed: o.seed ?? 1
    });
  }

  ctx.rotate(rot);

  // 6 interwoven spiral arms of the OpenAI knot
  const arms = o.petals ?? 6;
  for (let i = 0; i < arms; i++) {
    const a0 = (i / arms) * TAU;
    ctx.save();
    ctx.rotate(a0);

    // Inner to outer looped petal curve
    const pts: Array<[number, number]> = [
      [0, -r * 0.15],
      [r * 0.35 * comp, -r * 0.4],
      [r * 0.7 * comp, -r * 0.25],
      [r * 0.85, 0],
      [r * 0.75, r * 0.35],
      [r * 0.45 * comp, r * 0.45],
      [r * 0.18, r * 0.25]
    ];

    paint(ctx, pts, {
      wash: mixCol(col, PAL.cream, (i % 2 === 0 ? 0.2 : 0)),
      ink: outCol,
      sw,
      curv: 0.45
    });

    ctx.restore();
  }

  // Central nucleus window
  paint(ctx, ellPts(0, 0, r * 0.32, r * 0.32, 16, r * 0.03), {
    wash: PAL.cream,
    ink: outCol,
    sw: sw * 0.9
  });

  // Face inside center
  const f = o.face || 'normal';
  const ex = r * 0.12, ey = -r * 0.05;
  const blink = f === 'normal' && ((t * 0.8 + (o.seed || 0) * 1.3) % 3.6) < 0.12;

  ctx.save();
  // Eyes
  if (f === 'sleeping' || blink || f === 'happy') {
    inkLine(ctx, [[-ex - r * 0.07, ey], [-ex + r * 0.04, ey - (f === 'happy' ? r * 0.07 : -r * 0.03)], [-ex + r * 0.12, ey]], sw * 0.8, PAL.ink, 0.4);
    inkLine(ctx, [[ex - r * 0.12, ey], [ex - r * 0.04, ey - (f === 'happy' ? r * 0.07 : -r * 0.03)], [ex + r * 0.07, ey]], sw * 0.8, PAL.ink, 0.4);
  } else if (f === 'wink') {
    inkLine(ctx, [[-ex - r * 0.07, ey], [-ex + r * 0.04, ey - r * 0.07], [-ex + r * 0.12, ey]], sw * 0.8, PAL.ink, 0.4);
    paint(ctx, ellPts(ex, ey, r * 0.07, r * 0.08, 8, 0), { wash: PAL.ink, ink: null });
  } else if (f === 'star') {
    paint(ctx, starPts(-ex, ey, r * 0.12, 0.45, 4, t * 2), { wash: OA.gold, ink: null });
    paint(ctx, starPts(ex, ey, r * 0.12, 0.45, 4, -t * 2), { wash: OA.gold, ink: null });
  } else if (f === 'shocked') {
    paint(ctx, ellPts(-ex, ey, r * 0.1, r * 0.12, 10, 0), { wash: PAL.cream, ink: PAL.ink, sw: sw * 0.7 });
    paint(ctx, ellPts(-ex, ey, r * 0.04, r * 0.05, 8, 0), { wash: PAL.ink, ink: null });
    paint(ctx, ellPts(ex, ey, r * 0.1, r * 0.12, 10, 0), { wash: PAL.cream, ink: PAL.ink, sw: sw * 0.7 });
    paint(ctx, ellPts(ex, ey, r * 0.04, r * 0.05, 8, 0), { wash: PAL.ink, ink: null });
  } else if (f === 'thinking') {
    paint(ctx, ellPts(-ex, ey - r * 0.04, r * 0.07, r * 0.08, 8, 0), { wash: PAL.ink, ink: null });
    paint(ctx, ellPts(ex, ey - r * 0.04, r * 0.07, r * 0.08, 8, 0), { wash: PAL.ink, ink: null });
    inkLine(ctx, [[-ex - r * 0.08, ey - r * 0.14], [-ex + r * 0.08, ey - r * 0.18]], sw * 0.8, PAL.ink, 0);
  } else {
    paint(ctx, ellPts(-ex, ey, r * 0.07, r * 0.08, 8, 0), { wash: PAL.ink, ink: null });
    paint(ctx, ellPts(ex, ey, r * 0.07, r * 0.08, 8, 0), { wash: PAL.ink, ink: null });
    if (r > 18) {
      paint(ctx, ellPts(-ex - r * 0.02, ey - r * 0.025, r * 0.025, r * 0.03, 6, 0), { wash: PAL.cream, ink: null });
      paint(ctx, ellPts(ex - r * 0.02, ey - r * 0.025, r * 0.025, r * 0.03, 6, 0), { wash: PAL.cream, ink: null });
    }
  }

  // Mouth
  const my = ey + r * 0.16;
  if (o.talk && Math.sin((o.talkT ?? t) * 14) > -0.1) {
    paint(ctx, ellPts(0, my, r * 0.08, r * 0.1, 10, 0), { wash: '#38161D', ink: null });
  } else if (f === 'happy' || f === 'star') {
    inkLine(ctx, [[-r * 0.09, my - r * 0.02], [0, my + r * 0.06], [r * 0.09, my - r * 0.02]], sw * 0.8, PAL.ink, 0.5);
  } else if (f === 'shocked') {
    paint(ctx, ellPts(0, my, r * 0.06, r * 0.08, 8, 0), { wash: PAL.ink, ink: null });
  } else {
    inkLine(ctx, [[-r * 0.07, my], [r * 0.07, my]], sw * 0.8, PAL.ink, 0.2);
  }

  ctx.restore();
  ctx.restore();
}

// ---------------------------------------------------------------- ROBOT HAND & RUBIK'S CUBE
export function robotHandWithCube(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  t: number,
  scrambleK = 0
) {
  ctx.save();
  ctx.translate(x, y);

  // Forearm base
  paint(ctx, rrPts(-s * 1.8, s * 2.8, s * 3.6, s * 3.2, s * 0.4, s * 0.06), {
    wash: '#374151',
    ink: PAL.ink,
    sw: 1.4
  });
  // Metallic wrist joint
  paint(ctx, ellPts(0, s * 2.7, s * 1.4, s * 0.5, 14, s * 0.04), {
    wash: '#9CA3AF',
    ink: PAL.ink,
    sw: 1.2
  });

  // Palm
  paint(ctx, rrPts(-s * 2.1, s * 0.5, s * 4.2, s * 2.4, s * 0.6, s * 0.06), {
    wash: '#4B5563',
    ink: PAL.ink,
    sw: 1.3
  });

  // Rubik's Cube in palm
  const cubeY = s * -0.6;
  const cubeSize = s * 2.6;
  ctx.save();
  ctx.translate(0, cubeY);
  ctx.rotate(Math.sin(t * 2) * 0.12);

  // 3x3 cube face
  const sub = cubeSize / 3;
  const colors = [OA.strawberry, OA.azure, OA.emerald, OA.gold, PAL.cream, '#FF6B00'];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const colIdx = Math.floor(hash(r * 7 + c * 13 + Math.floor(t * 1.5 + scrambleK)) * colors.length);
      paint(ctx, rrPts(-cubeSize / 2 + c * sub, -cubeSize / 2 + r * sub, sub * 0.94, sub * 0.94, s * 0.1, s * 0.03), {
        wash: colors[colIdx],
        ink: PAL.ink,
        sw: 1
      });
    }
  }
  ctx.restore();

  // Articulating robotic fingers wrapping around the cube
  const fingerAngles = [
    -0.8 + Math.sin(t * 3.2) * 0.25,
    -0.3 + Math.sin(t * 3.7 + 1) * 0.2,
    0.3 + Math.sin(t * 2.9 + 2) * 0.2,
    0.8 + Math.sin(t * 3.4 + 3) * 0.25
  ];
  for (let i = 0; i < 4; i++) {
    const fx = -s * 1.5 + (i / 3) * s * 3.0;
    ctx.save();
    ctx.translate(fx, s * 0.6);
    ctx.rotate(fingerAngles[i]);
    // Joint 1
    paint(ctx, rrPts(-s * 0.35, -s * 1.2, s * 0.7, s * 1.2, s * 0.2, s * 0.04), { wash: '#9CA3AF', ink: PAL.ink, sw: 1 });
    // Joint 2
    ctx.translate(0, -s * 1.1);
    ctx.rotate(-0.5);
    paint(ctx, rrPts(-s * 0.28, -s * 1.0, s * 0.56, s * 1.0, s * 0.16, s * 0.04), { wash: '#E5E7EB', ink: PAL.ink, sw: 0.9 });
    ctx.restore();
  }

  // Thumb
  ctx.save();
  ctx.translate(-s * 2.2, s * 1.4);
  ctx.rotate(0.9 + Math.sin(t * 3.5) * 0.2);
  paint(ctx, rrPts(-s * 0.35, -s * 1.4, s * 0.7, s * 1.4, s * 0.25, s * 0.04), { wash: '#9CA3AF', ink: PAL.ink, sw: 1 });
  ctx.restore();

  // Domain Randomization coordinate grid HUD
  ctx.save();
  ctx.strokeStyle = OA.emerald;
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.strokeRect(-s * 3, -s * 3.2, s * 6, s * 6);
  ctx.setLineDash([]);
  letter(ctx, 'ADR · Sim2Real σ=1.4', 0, -s * 3.6, s * 0.65, OA.emerald, { mono: true, ink: false });
  ctx.restore();

  ctx.restore();
}

// ---------------------------------------------------------------- CHATGPT INTERFACE
export interface ChatUIProps {
  t: number;
  prompt: string;
  response: string;
  streaming?: boolean;
  modelName?: string;
}

export function chatInterface(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  opts: ChatUIProps
) {
  ctx.save();
  ctx.translate(x, y);

  // Outer browser window container
  paint(ctx, rrPts(0, 0, w, h, 14, 1.2), {
    wash: '#0F172A',
    ink: PAL.ink,
    sw: 1.6
  });

  // Browser top bar
  paint(ctx, rrPts(0, 0, w, 38, 14, 0), {
    wash: '#1E293B',
    ink: PAL.ink,
    sw: 1
  });
  // Window dots
  for (let i = 0; i < 3; i++) {
    const dotColors = ['#EF4444', '#F59E0B', '#10B981'];
    paint(ctx, ellPts(20 + i * 16, 19, 5, 5, 8, 0), {
      wash: dotColors[i],
      ink: null
    });
  }
  // Model selector pill
  paint(ctx, rrPts(w / 2 - 60, 8, 120, 22, 11, 0), {
    wash: '#334155',
    ink: null
  });
  letter(ctx, opts.modelName || 'ChatGPT · GPT-4o', w / 2, 19, 11, OA.emeraldLt, { mono: true, ink: false });

  // User message bubble (right-aligned)
  const userBubbleY = 60;
  paint(ctx, rrPts(w * 0.25, userBubbleY, w * 0.7, 44, 12, 1), {
    wash: '#1E293B',
    ink: '#334155',
    sw: 1
  });
  letter(ctx, opts.prompt, w * 0.28, userBubbleY + 22, 12, '#F1F5F9', { align: 'left', ink: false });

  // Assistant response bubble with green icon
  const botY = userBubbleY + 58;
  bloom(ctx, 36, botY + 24, 14, { t: opts.t, glow: false, complexity: 0.8 });

  paint(ctx, rrPts(60, botY, w * 0.85, h - botY - 60, 12, 1), {
    wash: '#162032',
    ink: '#1E293B',
    sw: 1
  });

  // Multiline response text rendering
  const lines = opts.response.split('\n');
  lines.forEach((line, idx) => {
    letter(ctx, line, 78, botY + 26 + idx * 22, 12, '#E2E8F0', { align: 'left', mono: true, ink: false });
  });

  // Blinking green cursor
  if (opts.streaming !== false) {
    const cursorBlink = Math.floor(opts.t * 3) % 2 === 0;
    if (cursorBlink) {
      const lastLineIdx = Math.max(0, lines.length - 1);
      const cursorX = 78 + lines[lastLineIdx].length * 7.2;
      paint(ctx, rectPts(cursorX, botY + 16 + lastLineIdx * 22, 7, 16, 0), {
        wash: OA.emerald,
        ink: null
      });
    }
  }

  // Bottom prompt input bar
  const barY = h - 46;
  paint(ctx, rrPts(24, barY, w - 48, 34, 17, 0.8), {
    wash: '#1E293B',
    ink: '#334155',
    sw: 1.2
  });
  letter(ctx, 'Message ChatGPT...', 44, barY + 17, 11, '#64748B', { align: 'left', ink: false });
  // Up arrow send button
  paint(ctx, ellPts(w - 44, barY + 17, 11, 11, 10, 0), {
    wash: OA.emerald,
    ink: null
  });
  letter(ctx, '↑', w - 44, barY + 17, 13, '#0F172A', { ink: false });

  ctx.restore();
}

// ---------------------------------------------------------------- STRAWBERRY / o1 TREE-OF-THOUGHT
export function reasoningTree(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  _h: number,
  t: number,
  progress = 1
) {
  ctx.save();
  ctx.translate(x, y);

  // Title badge
  letter(ctx, 'PROJECT STRAWBERRY · o1 TEST-TIME COMPUTE', w / 2, 20, 16, OA.strawberry, { mono: true, stroke: true });
  letter(ctx, 'Reinforcement Learning Scaling over Chain-of-Thought Search Paths', w / 2, 42, 11, PAL.clayLt, { mono: true });

  const rootX = w / 2, rootY = 75;
  const k = clamp(progress);

  // Root query node
  paint(ctx, rrPts(rootX - 70, rootY - 14, 140, 28, 8, 0.5), {
    wash: OA.strawberry,
    ink: PAL.ink,
    sw: 1.3
  });
  letter(ctx, 'Question: Math Olympiad', rootX, rootY, 10, PAL.cream, { mono: true, ink: false });

  // Level 1 Branches (3 hypotheses)
  const l1Nodes = [
    { x: w * 0.25, y: 140, label: 'Path A: Algebraic', valid: false },
    { x: w * 0.5, y: 140, label: 'Path B: Geometric', valid: true },
    { x: w * 0.75, y: 140, label: 'Path C: Combinatoric', valid: false }
  ];

  if (k > 0.2) {
    l1Nodes.forEach((node, i) => {
      const active = k > 0.25 + i * 0.1;
      if (!active) return;
      inkLine(ctx, [[rootX, rootY + 14], [node.x, node.y - 14]], 1.8, node.valid ? OA.emerald : OA.strawberry, 0.2);

      paint(ctx, rrPts(node.x - 60, node.y - 12, 120, 24, 6, 0.4), {
        wash: node.valid ? OA.emeraldDk : '#7F1D1D',
        ink: PAL.ink,
        sw: 1.1
      });
      letter(ctx, node.label, node.x, node.y, 9.5, PAL.cream, { mono: true, ink: false });
    });
  }

  // Level 2 Sub-branches (Deep verification & backtracking)
  if (k > 0.55) {
    const l2Nodes = [
      { x: w * 0.4, y: 215, label: 'B.1 Lemma 4 (Fail ✕)', valid: false },
      { x: w * 0.6, y: 215, label: 'B.2 Inversion (Pass ✓)', valid: true }
    ];

    l2Nodes.forEach((node) => {
      inkLine(ctx, [[w * 0.5, 152], [node.x, node.y - 14]], 2, node.valid ? OA.emeraldLt : '#991B1B', 0.2);
      paint(ctx, rrPts(node.x - 62, node.y - 12, 124, 24, 6, 0.4), {
        wash: node.valid ? OA.emerald : '#5A1A1A',
        ink: PAL.ink,
        sw: 1.2
      });
      letter(ctx, node.label, node.x, node.y, 9.5, PAL.cream, { mono: true, ink: false });
    });
  }

  // Final Convergence on Ground Truth
  if (k > 0.85) {
    const finalX = w * 0.6, finalY = 285;
    inkLine(ctx, [[w * 0.6, 227], [finalX, finalY - 16]], 2.4, OA.emeraldLt, 0);

    paint(ctx, rrPts(finalX - 85, finalY - 16, 170, 32, 10, 0.8), {
      wash: OA.emerald,
      ink: PAL.ink,
      sw: 1.8
    });
    letter(ctx, 'Q.E.D. VERIFIED ANSWER', finalX, finalY, 11, '#0B291E', { mono: true, stroke: true });

    // Little strawberry badge
    paint(ctx, starPts(finalX + 98, finalY, 12, 0.5, 4, t * 2), { wash: OA.strawberry, ink: null });
  }

  ctx.restore();
}

// ---------------------------------------------------------------- DATACENTER SERVER RACKS
export function serverRacks(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  t: number,
  activeCol = OA.emerald
) {
  ctx.save();
  ctx.translate(x, y);

  const numRacks = Math.floor(w / 70);
  const rackW = w / numRacks - 8;

  for (let i = 0; i < numRacks; i++) {
    const rx = i * (rackW + 8);
    // Outer black rack
    paint(ctx, rrPts(rx, 0, rackW, h, 6, 0.8), {
      wash: '#0A0F1D',
      ink: PAL.ink,
      sw: 1.2
    });

    // Server units inside rack
    const units = Math.floor(h / 18);
    for (let u = 0; u < units; u++) {
      const uy = 8 + u * 17;
      paint(ctx, rectPts(rx + 4, uy, rackW - 8, 13, 0.2), {
        wash: '#1E293B',
        ink: null
      });

      // Blinking LEDs
      const ledOn = hash(i * 19 + u * 7 + Math.floor(t * 8)) > 0.35;
      if (ledOn) {
        paint(ctx, ellPts(rx + 8, uy + 6, 2, 2, 6, 0), {
          wash: activeCol,
          ink: null
        });
        paint(ctx, ellPts(rx + 14, uy + 6, 2, 2, 6, 0), {
          wash: (u % 3 === 0 ? OA.azureLt : activeCol),
          ink: null
        });
      }
    }
  }

  // Overhead fiber optics cable tray
  inkLine(ctx, [[0, -10], [w, -10]], 3, OA.azure, 0);
  for (let i = 0; i < numRacks; i++) {
    const rx = i * (rackW + 8) + rackW / 2;
    inkLine(ctx, [[rx, -10], [rx, 0]], 2, OA.azure, 0);
  }

  ctx.restore();
}

// ---------------------------------------------------------------- STARGATE MULTI-GIGAWATT REACTOR
export function stargateComplex(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  t: number
) {
  ctx.save();

  // Desert horizon line
  const horizY = H * 0.62;
  paint(ctx, rectPts(-20, horizY, W + 40, H - horizY + 20, 2), {
    fill: '#2A1B14',
    fillOp: 220,
    ink: PAL.ink,
    sw: 1.5
  });

  // Mountain silhouettes in background
  const mtn: Array<[number, number]> = [[-20, horizY]];
  for (let x = 0; x <= W + 40; x += 80) {
    mtn.push([x, horizY - 60 - hash(x) * 90]);
  }
  mtn.push([W + 40, horizY]);
  paint(ctx, mtn, { wash: '#1B1425', ink: null, curv: 0.3 });

  // Central Stargate Computing Monolith
  const cx = W / 2, cy = horizY - 80;
  const monoW = 220, monoH = 180;

  // Vast radiating power conduits across the desert floor
  for (let i = -6; i <= 6; i++) {
    const startX = cx + i * 28;
    const endX = cx + i * (W * 0.12);
    inkLine(ctx, [[startX, horizY], [endX, H + 10]], 3.5, mixCol(OA.emerald, OA.azure, Math.abs(i) / 6), 0.1);
  }

  // Giant monolithic computing cathedral
  paint(ctx, rrPts(cx - monoW / 2, cy - monoH / 2, monoW, monoH, 14, 1.2), {
    wash: '#0A0D14',
    ink: PAL.ink,
    sw: 2
  });

  // Glowing core reactor
  const pulse = 1 + Math.sin(t * 4) * 0.1;
  blob(ctx, cx, cy, 75 * pulse, OA.emerald, { alpha: 0.55, seed: 42 });
  bloom(ctx, cx, cy, 42, { t, glowCol: OA.emeraldLt, complexity: 1 });

  // Hyper-power badge
  letter(ctx, 'PROJECT STARGATE', cx, cy - monoH / 2 - 36, 26, PAL.cream, { stroke: true });
  letter(ctx, '5.0 GIGAWATTS · $100B+ CLUSTER', cx, cy - monoH / 2 - 12, 14, OA.emeraldLt, { mono: true });

  ctx.restore();
}

// ================================================================
// STORY-RELATABLE HUMAN CAST & METAPHORS (WATERCOLOR & INK)
// ================================================================

export interface HumanOpts {
  t: number;
  flip?: boolean;
  mood?: 'normal' | 'focused' | 'shocked' | 'happy' | 'victorious' | 'determined';
  talk?: boolean;
  talkT?: number;
  gesture?: 'pen' | 'typing' | 'badge' | 'handshake' | 'whiteboard' | 'coffee' | 'phone' | 'arms_open';
  dy?: number;
  seed?: number;
}

/**
 * Sam Altman: Wavy curly hair, Patagonia puffer vest over dark t-shirt,
 * expressive hands, dynamic poses (signing charter, typing, shocked on Meet, holding 3 AM badge).
 */
export function samAltman(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  o: HumanOpts
) {
  ctx.save();
  ctx.translate(x, y + (o.dy || 0) * s);
  ctx.scale(o.flip ? -1 : 1, 1);

  const t = o.t;
  const skin = '#F6C8A6';
  const vest = '#374151'; // Charcoal puffer vest
  const shirt = '#111827'; // Dark under-shirt
  const pants = '#1E293B'; // Dark denim
  const hairCol = '#261C14'; // Dark curly brown

  // Drop shadow
  paint(ctx, ellPts(0, s * 0.1, 4.2 * s, 0.9 * s, 16, s * 0.08), {
    fill: PAL.ink, fillOp: 55, bleed: 0.25, tex: 0.2, ink: null
  });

  // Legs & Sneakers
  paint(ctx, rectPts(-1.5 * s, -3.2 * s, 1.1 * s, 3.2 * s, s * 0.04), { wash: pants, ink: PAL.ink, sw: 0.9 });
  paint(ctx, rectPts(0.5 * s, -3.2 * s, 1.1 * s, 3.2 * s, s * 0.04), { wash: pants, ink: PAL.ink, sw: 0.9 });
  // White sneakers
  paint(ctx, rrPts(-1.8 * s, -0.6 * s, 1.7 * s, 0.6 * s, s * 0.1, s * 0.03), { wash: PAL.cream, ink: PAL.ink, sw: 0.8 });
  paint(ctx, rrPts(0.4 * s, -0.6 * s, 1.7 * s, 0.6 * s, s * 0.1, s * 0.03), { wash: PAL.cream, ink: PAL.ink, sw: 0.8 });

  // Torso: Puffer vest with horizontal quilted seams
  paint(ctx, rrPts(-2.4 * s, -8.6 * s, 4.8 * s, 5.6 * s, s * 0.7, s * 0.06), { wash: vest, ink: PAL.ink, sw: 1.1 });
  // Quilted seams on vest
  inkLine(ctx, [[-2.2 * s, -7.0 * s], [2.2 * s, -7.0 * s]], 0.7, '#1F2937', 0);
  inkLine(ctx, [[-2.2 * s, -5.6 * s], [2.2 * s, -5.6 * s]], 0.7, '#1F2937', 0);
  inkLine(ctx, [[-2.2 * s, -4.2 * s], [2.2 * s, -4.2 * s]], 0.7, '#1F2937', 0);
  // Dark crewneck collar
  paint(ctx, ellPts(0, -8.6 * s, 1.0 * s, 0.5 * s, 10, 0), { wash: shirt, ink: PAL.ink, sw: 0.8 });

  // Left Arm
  ctx.save();
  ctx.translate(-2.4 * s, -8.0 * s);
  let lArmAngle = 0.2;
  if (o.gesture === 'pen') lArmAngle = 0.9;
  else if (o.gesture === 'badge') lArmAngle = 1.3;
  else if (o.gesture === 'arms_open') lArmAngle = 1.4;
  else if (o.gesture === 'typing') lArmAngle = 0.8;
  ctx.rotate(lArmAngle);
  paint(ctx, rrPts(-2.5 * s, -0.4 * s, 2.5 * s, 0.8 * s, s * 0.35, s * 0.04), { wash: shirt, ink: PAL.ink, sw: 0.8 });
  paint(ctx, ellPts(-2.6 * s, 0, 0.45 * s, 0.45 * s, 10, s * 0.04), { wash: skin, ink: PAL.ink, sw: 0.7 });

  // Gesture Props in Left Hand
  if (o.gesture === 'pen') {
    // Fountain pen
    inkLine(ctx, [[-2.6 * s, -0.2 * s], [-3.4 * s, -0.8 * s]], 1.8, '#D97706', 0);
    paint(ctx, ellPts(-3.5 * s, -0.9 * s, 0.15 * s, 0.15 * s, 6, 0), { wash: OA.gold, ink: null });
  } else if (o.gesture === 'badge') {
    // Visitor Guest Pass Badge!
    paint(ctx, rrPts(-3.4 * s, -0.8 * s, 1.4 * s, 1.8 * s, s * 0.15, s * 0.03), { wash: PAL.cream, ink: PAL.ink, sw: 0.8 });
    paint(ctx, rectPts(-3.2 * s, -0.2 * s, 1.0 * s, 0.4 * s, 0), { wash: '#10B981', ink: null });
    letter(ctx, 'GUEST', -2.7 * s, -0.5 * s, 6 * (s / 10), '#047857', { mono: true, bold: true });
    // Lanyard
    inkLine(ctx, [[-2.7 * s, -0.8 * s], [0, -8.6 * s]], 0.8, '#EF4444', 0);
  }
  ctx.restore();

  // Right Arm
  ctx.save();
  ctx.translate(2.4 * s, -8.0 * s);
  let rArmAngle = -0.2;
  if (o.gesture === 'handshake') rArmAngle = -0.9;
  else if (o.gesture === 'arms_open') rArmAngle = -1.4;
  else if (o.gesture === 'typing') rArmAngle = -0.8;
  else if (o.gesture === 'phone') rArmAngle = -1.2;
  ctx.rotate(rArmAngle);
  paint(ctx, rrPts(0, -0.4 * s, 2.5 * s, 0.8 * s, s * 0.35, s * 0.04), { wash: shirt, ink: PAL.ink, sw: 0.8 });
  paint(ctx, ellPts(2.6 * s, 0, 0.45 * s, 0.45 * s, 10, s * 0.04), { wash: skin, ink: PAL.ink, sw: 0.7 });
  if (o.gesture === 'phone') {
    paint(ctx, rrPts(2.6 * s, -0.7 * s, 0.8 * s, 1.4 * s, s * 0.1, 0), { wash: '#0F172A', ink: PAL.ink, sw: 0.7 });
    paint(ctx, rectPts(2.7 * s, -0.6 * s, 0.6 * s, 1.2 * s, 0), { wash: '#38BDF8', ink: null });
  }
  ctx.restore();

  // Head
  const hy = -9.8 * s;
  paint(ctx, ellPts(0, hy, 1.4 * s, 1.55 * s, 18, s * 0.06), { wash: skin, ink: PAL.ink, sw: 0.9 });

  // Signature Curly Wavy Hair
  paint(ctx, [
    [-1.6 * s, hy - 0.2 * s],
    [-1.5 * s, hy - 1.6 * s],
    [-0.8 * s, hy - 2.2 * s],
    [0.2 * s, hy - 2.3 * s],
    [1.1 * s, hy - 2.0 * s],
    [1.6 * s, hy - 1.4 * s],
    [1.5 * s, hy - 0.1 * s],
    [1.0 * s, hy - 0.9 * s],
    [0, hy - 1.2 * s],
    [-1.0 * s, hy - 0.9 * s]
  ], {
    wash: hairCol, ink: PAL.ink, sw: 1.0, curv: 0.45
  });

  // Eyes & Eyebrows
  const m = o.mood || 'normal';
  for (const ex of [-0.5, 0.5]) {
    if (m === 'shocked') {
      paint(ctx, ellPts(ex * s, hy, 0.22 * s, 0.26 * s, 10, 0), { wash: PAL.cream, ink: PAL.ink, sw: 0.8 });
      paint(ctx, ellPts(ex * s, hy, 0.08 * s, 0.09 * s, 8, 0), { wash: PAL.ink, ink: null });
      inkLine(ctx, [[ex * s - 0.3 * s, hy - 0.45 * s], [ex * s + 0.3 * s, hy - 0.55 * s]], 1.0, PAL.ink, 0);
    } else if (m === 'happy' || m === 'victorious') {
      inkLine(ctx, [[ex * s - 0.25 * s, hy + 0.1 * s], [ex * s, hy - 0.12 * s], [ex * s + 0.25 * s, hy + 0.1 * s]], 1.1, PAL.ink, 0.4);
    } else {
      paint(ctx, ellPts(ex * s, hy, 0.14 * s, 0.16 * s, 8, 0), { wash: PAL.ink, ink: null });
      paint(ctx, ellPts(ex * s - 0.04 * s, hy - 0.04 * s, 0.04 * s, 0.04 * s, 6, 0), { wash: PAL.cream, ink: null });
      inkLine(ctx, [[ex * s - 0.28 * s, hy - 0.35 * s], [ex * s + 0.28 * s, hy - 0.35 * s]], 0.9, hairCol, 0);
    }
  }

  // Mouth
  const my = hy + 0.8 * s;
  if (o.talk && Math.sin((o.talkT ?? t) * 13) > -0.1) {
    paint(ctx, ellPts(0, my, 0.24 * s, 0.28 * s, 10, 0), { wash: '#38161D', ink: null });
  } else if (m === 'shocked') {
    paint(ctx, ellPts(0, my, 0.26 * s, 0.32 * s, 10, 0), { wash: '#2D1515', ink: PAL.ink, sw: 0.7 });
  } else if (m === 'happy' || m === 'victorious') {
    inkLine(ctx, [[-0.35 * s, my - 0.08 * s], [0, my + 0.16 * s], [0.35 * s, my - 0.08 * s]], 1.1, PAL.ink, 0.5);
  } else {
    inkLine(ctx, [[-0.28 * s, my], [0.28 * s, my]], 0.9, PAL.ink, 0.2);
  }

  ctx.restore();
}

/**
 * Ilya Sutskever: Intellectual silhouette, dark crewneck, glasses,
 * holding whiteboard marker or watching tokens fall with awe.
 */
export function ilyaSutskever(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  o: HumanOpts
) {
  ctx.save();
  ctx.translate(x, y + (o.dy || 0) * s);
  ctx.scale(o.flip ? -1 : 1, 1);

  const skin = '#ECC2A2';
  const sweater = '#18181B'; // Black crewneck
  const pants = '#334155'; // Dark grey trousers

  // Drop shadow
  paint(ctx, ellPts(0, s * 0.1, 4.4 * s, 0.9 * s, 16, s * 0.08), {
    fill: PAL.ink, fillOp: 55, bleed: 0.25, tex: 0.2, ink: null
  });

  // Legs & Shoes
  paint(ctx, rectPts(-1.5 * s, -3.2 * s, 1.1 * s, 3.2 * s, s * 0.04), { wash: pants, ink: PAL.ink, sw: 0.9 });
  paint(ctx, rectPts(0.5 * s, -3.2 * s, 1.1 * s, 3.2 * s, s * 0.04), { wash: pants, ink: PAL.ink, sw: 0.9 });
  paint(ctx, rectPts(-1.8 * s, -0.5 * s, 1.6 * s, 0.5 * s, s * 0.05), { wash: PAL.night, ink: null });
  paint(ctx, rectPts(0.4 * s, -0.5 * s, 1.6 * s, 0.5 * s, s * 0.05), { wash: PAL.night, ink: null });

  // Torso: Minimalist black crewneck sweater
  paint(ctx, rrPts(-2.5 * s, -8.8 * s, 5.0 * s, 5.8 * s, s * 0.6, s * 0.06), { wash: sweater, ink: PAL.ink, sw: 1.1 });

  // Arms
  const isWriting = o.gesture === 'whiteboard';
  ctx.save();
  ctx.translate(-2.4 * s, -8.2 * s);
  ctx.rotate(isWriting ? 1.5 : 0.25);
  paint(ctx, rrPts(-2.6 * s, -0.4 * s, 2.6 * s, 0.85 * s, s * 0.35, s * 0.04), { wash: sweater, ink: PAL.ink, sw: 0.8 });
  paint(ctx, ellPts(-2.7 * s, 0, 0.45 * s, 0.45 * s, 10, s * 0.04), { wash: skin, ink: PAL.ink, sw: 0.7 });
  if (isWriting) {
    // Red/Blue whiteboard dry-erase marker
    inkLine(ctx, [[-2.7 * s, -0.2 * s], [-3.6 * s, -0.9 * s]], 2.0, OA.strawberry, 0);
  }
  ctx.restore();

  // Head
  const hy = -10.0 * s;
  paint(ctx, ellPts(0, hy, 1.45 * s, 1.6 * s, 18, s * 0.06), { wash: skin, ink: PAL.ink, sw: 0.9 });

  // Short cropped dark hair
  paint(ctx, [
    [-1.5 * s, hy - 0.2 * s],
    [-1.4 * s, hy - 1.8 * s],
    [0, hy - 2.0 * s],
    [1.4 * s, hy - 1.8 * s],
    [1.5 * s, hy - 0.2 * s],
    [0.8 * s, hy - 1.2 * s],
    [-0.8 * s, hy - 1.2 * s]
  ], {
    wash: '#1C1917', ink: PAL.ink, sw: 0.9, curv: 0.3
  });

  // Glasses (Signature Round Frames)
  for (const ex of [-0.55, 0.55]) {
    paint(ctx, ellPts(ex * s, hy, 0.42 * s, 0.38 * s, 14, 0), { wash: PAL.cream, washOp: 60, ink: PAL.ink, sw: 1.2 });
    paint(ctx, ellPts(ex * s, hy, 0.12 * s, 0.14 * s, 8, 0), { wash: PAL.ink, ink: null });
  }
  inkLine(ctx, [[-0.2 * s, hy], [0.2 * s, hy]], 1.2, PAL.ink, 0); // Bridge of glasses

  // Thoughtful mouth
  const my = hy + 0.85 * s;
  if (o.talk && Math.sin((o.talkT ?? o.t) * 12) > -0.1) {
    paint(ctx, ellPts(0, my, 0.2 * s, 0.24 * s, 10, 0), { wash: '#38161D', ink: null });
  } else {
    inkLine(ctx, [[-0.24 * s, my], [0.24 * s, my]], 0.9, PAL.ink, 0.2);
  }

  ctx.restore();
}

/**
 * Satya Nadella: Round wireframe glasses, tailored dark blue blazer,
 * offering the Azure compute partnership handshake.
 */
export function satyaNadella(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  o: HumanOpts
) {
  ctx.save();
  ctx.translate(x, y + (o.dy || 0) * s);
  ctx.scale(o.flip ? -1 : 1, 1);

  const skin = '#C28B62';
  const suit = '#1E3A8A'; // Microsoft Azure Deep Blue Suit

  // Torso
  paint(ctx, rrPts(-2.5 * s, -8.8 * s, 5.0 * s, 5.8 * s, s * 0.6, s * 0.06), { wash: suit, ink: PAL.ink, sw: 1.1 });
  // White dress shirt collar
  paint(ctx, [[-0.8 * s, -8.8 * s], [0, -7.2 * s], [0.8 * s, -8.8 * s]], { wash: PAL.cream, ink: PAL.ink, sw: 0.8 });

  // Legs & Shoes
  paint(ctx, rectPts(-1.5 * s, -3.2 * s, 1.1 * s, 3.2 * s, s * 0.04), { wash: suit, ink: PAL.ink, sw: 0.9 });
  paint(ctx, rectPts(0.5 * s, -3.2 * s, 1.1 * s, 3.2 * s, s * 0.04), { wash: suit, ink: PAL.ink, sw: 0.9 });

  // Handshake extended arm
  ctx.save();
  ctx.translate(-2.4 * s, -8.0 * s);
  ctx.rotate(0.9);
  paint(ctx, rrPts(-2.5 * s, -0.4 * s, 2.5 * s, 0.8 * s, s * 0.3, 0), { wash: suit, ink: PAL.ink, sw: 0.8 });
  paint(ctx, ellPts(-2.6 * s, 0, 0.45 * s, 0.45 * s, 10, 0), { wash: skin, ink: PAL.ink, sw: 0.7 });
  ctx.restore();

  // Head
  const hy = -10.0 * s;
  paint(ctx, ellPts(0, hy, 1.35 * s, 1.5 * s, 18, s * 0.06), { wash: skin, ink: PAL.ink, sw: 0.9 });

  // Signature Round Wireframe Glasses
  for (const ex of [-0.5, 0.5]) {
    paint(ctx, ellPts(ex * s, hy, 0.4 * s, 0.38 * s, 14, 0), { wash: PAL.cream, washOp: 50, ink: PAL.ink, sw: 1.1 });
    paint(ctx, ellPts(ex * s, hy, 0.12 * s, 0.14 * s, 8, 0), { wash: PAL.ink, ink: null });
  }
  inkLine(ctx, [[-0.18 * s, hy], [0.18 * s, hy]], 1.1, PAL.ink, 0);

  // Warm smile
  const my = hy + 0.8 * s;
  inkLine(ctx, [[-0.28 * s, my - 0.06 * s], [0, my + 0.12 * s], [0.28 * s, my - 0.06 * s]], 1.0, PAL.ink, 0.4);

  ctx.restore();
}

/**
 * 738-Employee Mutiny Crowd: Walking together, holding smartphone torches,
 * signs, and standing as an unbreakable wall behind Sam.
 */
export function employeeCrowd(
  ctx: CanvasRenderingContext2D,
  cx: number,
  groundY: number,
  t: number
) {
  ctx.save();
  const crowdColors = ['#1E293B', '#334155', '#0F172A', '#1E3A8A', '#065F46'];

  for (let i = -8; i <= 8; i++) {
    const px = cx + i * 45 + Math.sin(t * 2 + i) * 6;
    const py = groundY + Math.cos(t * 3 + i) * 4;
    const s = 5.5 + (hash(i * 13) * 1.5);
    const col = crowdColors[Math.abs(i) % crowdColors.length];

    // Person silhouette
    paint(ctx, rrPts(px - 1.4 * s, py - 6.5 * s, 2.8 * s, 4.5 * s, s * 0.4, 0), { wash: col, ink: PAL.ink, sw: 0.8 });
    paint(ctx, ellPts(px, py - 7.6 * s, 0.9 * s, 1.1 * s, 10, 0), { wash: '#E5D0C0', ink: PAL.ink, sw: 0.7 });

    // Raised phone flashlights creating a sea of stars
    const lightBob = Math.sin(t * 4 + i * 1.2) * 5;
    const lx = px + 1.2 * s;
    const ly = py - 9.0 * s + lightBob;
    paint(ctx, ellPts(lx, ly, 2.5, 2.5, 6, 0), { wash: PAL.cream, ink: null });
    blob(ctx, lx, ly, 18, OA.azureLt, { alpha: 0.45 });
  }

  ctx.restore();
}

