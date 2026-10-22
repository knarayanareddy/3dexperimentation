import { RenderContext } from '../../types/video';
import {
  PAL, paint, inkLine, rectPts, ellPts, rrPts, starPts,
  letter, sfx, kf, wob, seg, frac, hash, mixCol, arrow, TAU, clamp
} from '../painter';
import {
  OA, glow, stage, panel, caret, bloom, scientist,
  chatBox, tokenStream, rack, benchBars, guardrail, curtainCall, curtains
} from '../openaiCast';

const G = 600;

export function renderOpenAI(n: number, rc: RenderContext) {
  switch (n) {
    case 1: return act1(rc);
    case 2: return act2(rc);
    case 3: return act3(rc);
    case 4: return act4(rc);
    case 5: return act5(rc);
    case 6: return act6(rc);
    case 7: return act7(rc);
    default: return act1(rc);
  }
}

// ---------------------------------------------------------------- ACT 1
function act1(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2, lt = t - shot.startTime;
  const talkS = speaking && shot.speaker === 'Scientist';
  const talkC = speaking && shot.speaker === 'Caret';

  if (shot.id === 'oa1-1') {
    stage(ctx, W, H, t, { tint: '#C9D2D6', night: 0.72, shaft: { x: cx - 180, alpha: 0.2 }, groundY: G + 8, groundCol: OA.deep });
    letter(ctx, 'SAN FRANCISCO · DECEMBER 2015', cx, 88, 27, mixCol(PAL.cream, OA.mist, 0.3), { pop: seg(lt, 0.2, 1.0) });

    // the letter unfolding under a lamp
    const open = seg(lt, 0.5, 2.2);
    glow(ctx, cx, 330, 250 * open, OA.cream, 0.22, 4, 2);
    ctx.save();
    ctx.translate(cx, 330);
    ctx.scale(1, 0.25 + open * 0.75);
    panel(ctx, 0, 0, 520, 300, PAL.cream, PAL.ink, 6);
    ctx.restore();
    if (open > 0.6) {
      const k = (open - 0.6) / 0.4;
      for (let i = 0; i < 4; i++) {
        inkLine(ctx, [[cx - 210, 250 + i * 22], [cx + 190 - (i % 3) * 70, 250 + i * 22]], 1.3, mixCol(PAL.cream, PAL.ink, 0.55), 0.1);
      }
      letter(ctx, 'ensure that artificial general', cx, 362, 23, PAL.ink, { pop: seg(lt, 2.4, 3.4) });
      letter(ctx, 'intelligence benefits', cx, 394, 23, PAL.ink, { pop: seg(lt, 2.8, 3.8) });
      letter(ctx, 'all of humanity', cx, 426, 23, OA.teal, { pop: seg(lt, 3.2, 4.2) });
      void k;
    }
    panel(ctx, cx + 400, 250, 210, 92, PAL.cream);
    letter(ctx, 'PLEDGED', cx + 400, 226, 14, PAL.ink, { ink: false, alpha: 0.8 });
    letter(ctx, '$1,000,000,000', cx + 400, 258, 19, OA.teal, { mono: true, ink: false, pop: seg(lt, 4.2, 5.2) });
    letter(ctx, 'structure: nonprofit', cx + 400, 288, 13, PAL.ink, { ink: false, alpha: 0.75 });
    scientist(ctx, cx - 420, G, 9.6, { t, mood: 'normal', coat: OA.slate, prop: 'paper' });
  }

  else if (shot.id === 'oa1-2') {
    stage(ctx, W, H, t, { tint: '#D4DCDE', night: 0.2, groundY: G + 8, groundCol: OA.slate });
    letter(ctx, 'THE WAGER', cx, 86, 40, PAL.ink, { pop: seg(lt, 0.15, 0.9) });

    // construction lines, then the first petal lights
    const litK = seg(lt, 2.2, 4.4);
    ctx.save();
    ctx.globalAlpha = 0.25 * (1 - litK * 0.6);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * TAU;
      inkLine(ctx, [[cx + 60, 330], [cx + 60 + Math.cos(a) * 150, 330 + Math.sin(a) * 150]], 1.2, OA.slate, 0);
    }
    paint(ctx, ellPts(cx + 60, 330, 150, 150, 30, 1), { ink: OA.slate, sw: 1.2 });
    ctx.restore();
    bloom(ctx, cx + 60, 330, 108, { t, lit: litK * 1.1, energy: litK * 0.8, spin: 0.6, seed: 9 });

    panel(ctx, cx - 350, 300, 330, 190);
    letter(ctx, 'TWO SCHOOLS', cx - 350, 236, 15, PAL.ink, { ink: false, alpha: 0.82 });
    letter(ctx, 'engineer the rules', cx - 350, 274, 17, OA.rose, { ink: false, alpha: seg(lt, 0.8, 1.6) });
    letter(ctx, 'brittle · bounded', cx - 350, 298, 13, PAL.ink, { ink: false, alpha: seg(lt, 0.8, 1.6) * 0.7 });
    letter(ctx, 'grow the capability', cx - 350, 334, 17, OA.teal, { ink: false, alpha: seg(lt, 1.6, 2.4) });
    letter(ctx, 'general · unproven', cx - 350, 358, 13, PAL.ink, { ink: false, alpha: seg(lt, 1.6, 2.4) * 0.7 });
    if (lt > 2.6) inkLine(ctx, [[cx - 490, 334], [cx - 210, 334]], 2.2, OA.teal, 0.1);
    scientist(ctx, cx - 60, G, 9.8, { t, mood: 'normal', talk: talkS, talkT: t, coat: OA.deep, prop: 'tablet' });
    letter(ctx, 'they bet the lab on the second', cx + 60, 548, 19, OA.teal, { pop: seg(lt, 4.6, 5.8) });
  }

  else if (shot.id === 'oa1-3') {
    stage(ctx, W, H, t, { tint: '#D8DEE2', night: 0.35, shaft: { x: cx + 240, alpha: 0.12 }, groundY: G + 8, groundCol: OA.slate });
    letter(ctx, 'IT LEARNED BY PLAYING ITSELF', cx, 86, 32, mixCol(PAL.cream, OA.mist, 0.2), { pop: seg(lt, 0.15, 0.9) });

    // self-play arena: two mirrored agents circling
    const ax = cx - 250, ay = 330;
    glow(ctx, ax, ay, 190, OA.violet, 0.2, 3, 11);
    paint(ctx, ellPts(ax, ay, 165, 110, 28, 2), { fill: OA.deep, fillOp: 200, bleed: 0.1, tex: 0.5, ink: PAL.ink, sw: 1.8 });
    for (let i = 0; i < 2; i++) {
      const a = t * 1.5 + i * Math.PI;
      const px = ax + Math.cos(a) * 110, py = ay + Math.sin(a) * 68;
      paint(ctx, ellPts(px, py, 17, 17, 14, 0.8), { wash: i ? OA.teal : OA.violet, ink: PAL.ink, sw: 1.3 });
      paint(ctx, ellPts(px - 4, py - 4, 5, 5, 8, 0), { wash: PAL.cream, ink: null });
    }
    letter(ctx, 'SELF-PLAY', ax, 470, 18, OA.violet, { ink: false });
    const ep = Math.floor(kf(lt, [[0.4, 0], [6.2, 10_000_000]], v => v));
    letter(ctx, `${ep.toLocaleString()} episodes`, ax, 498, 14, PAL.cream, { mono: true, ink: false, alpha: 0.8 });

    // the robot hand and cube
    const hx = cx + 280, hy = 330;
    panel(ctx, hx, hy, 300, 250, mixCol(PAL.cream, OA.mist, 0.3));
    ctx.save();
    ctx.translate(hx, hy - 10);
    ctx.rotate(Math.sin(t * 0.8) * 0.18);
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
      paint(ctx, rectPts(-54 + c * 36, -54 + r * 36, 32, 32, 0.8), {
        wash: [OA.teal, OA.amber, OA.rose, PAL.cream, OA.violet][(r * 3 + c + Math.floor(t)) % 5], ink: PAL.ink, sw: 1
      });
    }
    ctx.restore();
    for (let f = 0; f < 4; f++) {
      const fx2 = hx - 48 + f * 32;
      inkLine(ctx, [[fx2, hy + 78], [fx2 + Math.sin(t * 2 + f) * 6, hy + 36]], 5, OA.slate, 0.2);
    }
    letter(ctx, 'dexterity, learned in simulation', hx, hy + 118, 15, PAL.ink, { ink: false, alpha: 0.85 });
    letter(ctx, 'no human games required', cx, 556, 19, OA.teal, { pop: seg(lt, 5.0, 6.2) });
  }

  else {
    stage(ctx, W, H, t, { tint: '#E2E7E4', night: 0.08, shaft: { x: cx, alpha: 0.16 }, groundY: G + 8, groundCol: OA.slate });
    letter(ctx, '2018 · THE QUIET RESULT', cx, 86, 32, PAL.ink, { pop: seg(lt, 0.15, 0.9) });

    // a blank page, and Caret appears on it
    panel(ctx, cx - 90, 330, 560, 300, PAL.cream);
    const appear = seg(lt, 0.8, 1.8);
    const typed = 'the quick brown fox'.slice(0, Math.floor(seg(lt, 1.9, 4.6) * 19));
    letter(ctx, typed, cx - 330, 270, 19, PAL.ink, { mono: true, align: 'left', ink: false });
    if (appear > 0) {
      ctx.save();
      ctx.globalAlpha = appear;
      caret(ctx, cx - 330 + typed.length * 11.4, 288, 9, {
        t, blink: typed.length < 19, face: lt > 4.8 ? 'happy' : 'normal',
        talk: talkC, talkT: t, seed: 1, noShadow: true
      });
      ctx.restore();
    }
    panel(ctx, cx + 370, 300, 250, 170);
    letter(ctx, 'GPT-1', cx + 370, 248, 24, OA.teal, { pop: seg(lt, 2.2, 3) });
    letter(ctx, '117,000,000', cx + 370, 284, 18, PAL.ink, { mono: true, ink: false, alpha: 0.9 });
    letter(ctx, 'parameters', cx + 370, 306, 13, PAL.ink, { ink: false, alpha: 0.7 });
    letter(ctx, 'pretrain, then fine-tune', cx + 370, 342, 13, OA.violet, { ink: false, alpha: seg(lt, 3.2, 4) });
    letter(ctx, 'step one turned out to be the whole trick', cx, 556, 19, OA.teal, { pop: seg(lt, 5.2, 6.4) });
  }
}

// ---------------------------------------------------------------- ACT 2
function act2(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2, lt = t - shot.startTime;
  const talkS = speaking && shot.speaker === 'Scientist';
  const talkC = speaking && shot.speaker === 'Caret';

  if (shot.id === 'oa2-1') {
    stage(ctx, W, H, t, { tint: '#DCD8EC', night: 0.42, shaft: { x: cx, alpha: 0.14, col: OA.violet }, groundY: G + 8, groundCol: OA.violet });
    letter(ctx, '2019 · HELD BACK', cx, 86, 34, mixCol(PAL.cream, OA.mist, 0.25), { pop: seg(lt, 0.15, 0.9) });

    // bloom behind glass
    const gx = cx - 170, gy = 330;
    bloom(ctx, gx, gy, 118, { t, lit: 3.4, energy: 0.72, spin: 0.7, seed: 21 });
    ctx.save();
    ctx.globalAlpha = 0.5;
    paint(ctx, rrPts(gx - 185, gy - 185, 370, 370, 14, 2), {
      fill: OA.mist, fillOp: 48, bleed: 0.1, tex: 0.3, ink: PAL.cream, sw: 2
    });
    inkLine(ctx, [[gx - 120, gy - 170], [gx - 30, gy - 170]], 2, PAL.cream, 0.2);
    ctx.restore();

    // staged release ladder
    const rungs = ['124M', '355M', '774M', '1.5B'];
    rungs.forEach((r, i) => {
      const k = seg(lt, 1.0 + i * 1.05, 1.6 + i * 1.05);
      const ry = 470 - i * 78;
      panel(ctx, cx + 290, ry, 200, 54, k > 0.5 ? mixCol(PAL.cream, OA.teal, 0.3) : mixCol(PAL.cream, OA.mist, 0.45));
      letter(ctx, r, cx + 290, ry, 19, k > 0.5 ? OA.deep : mixCol(PAL.ink, PAL.cream, 0.45), { mono: true, ink: false });
      if (k > 0.5 && i < 3) arrow(ctx, cx + 290, ry - 30, cx + 290, ry - 52, OA.teal, 2);
    });
    letter(ctx, 'staged release', cx + 290, 520, 16, PAL.cream, { ink: false, alpha: 0.85 });
    letter(ctx, 'the first model a lab chose not to ship at once', cx, 560, 18, mixCol(PAL.cream, OA.mist, 0.2), { pop: seg(lt, 5.2, 6.4) });
  }

  else if (shot.id === 'oa2-2') {
    stage(ctx, W, H, t, { tint: '#E0E0EE', night: 0.1, groundY: G + 8, groundCol: OA.violet });
    letter(ctx, 'A CEILING ON THE UPSIDE', cx, 86, 34, PAL.ink, { pop: seg(lt, 0.15, 0.9) });

    // structure: nonprofit controls capped-profit
    panel(ctx, cx - 250, 250, 300, 110, mixCol(PAL.cream, OA.teal, 0.18));
    letter(ctx, 'NONPROFIT', cx - 250, 236, 20, OA.deep, { ink: false });
    letter(ctx, 'controls', cx - 250, 264, 13, PAL.ink, { ink: false, alpha: 0.75 });
    const grow = seg(lt, 1.0, 2.2);
    ctx.save();
    ctx.globalAlpha = grow;
    arrow(ctx, cx - 250, 310, cx - 250, 374, OA.teal, 2.6);
    panel(ctx, cx - 250, 430, 300, 110, mixCol(PAL.cream, OA.violet, 0.16));
    letter(ctx, 'CAPPED-PROFIT', cx - 250, 416, 19, OA.violet, { ink: false });
    letter(ctx, 'raises capital', cx - 250, 444, 13, PAL.ink, { ink: false, alpha: 0.75 });
    ctx.restore();

    // the capped meter
    const mx = cx + 290, my = 350;
    panel(ctx, mx, my, 240, 330, PAL.cream);
    const capY = my - 80;
    const fillK = kf(lt, [[1.6, 0], [4.4, 1]], v => v);
    const topY = my + 140 - fillK * 220;
    paint(ctx, rectPts(mx - 70, Math.max(topY, capY), 140, my + 140 - Math.max(topY, capY), 1), {
      wash: mixCol(OA.teal, PAL.cream, 0.25), ink: null
    });
    inkLine(ctx, [[mx - 96, capY], [mx + 96, capY]], 3.4, OA.rose, 0.05);
    letter(ctx, 'CAP', mx + 70, capY - 16, 15, OA.rose, { ink: false });
    paint(ctx, rrPts(mx - 70, my - 160, 140, 300, 8, 1), { ink: PAL.ink, sw: 1.6 });
    letter(ctx, 'returns', mx, my + 170, 15, PAL.ink, { ink: false, alpha: 0.8 });
    if (fillK > 0.95) sfx(ctx, 'everything above -> mission', mx, capY - 60, 17, OA.teal, lt - 4.4, { life: 3 });

    scientist(ctx, cx - 480, G, 9.4, { t, mood: 'normal', talk: talkS, talkT: t, coat: OA.slate });
    letter(ctx, '2019: $1B from Microsoft', cx - 250, 556, 17, PAL.ink, { pop: seg(lt, 4.8, 6), ink: false });
  }

  else if (shot.id === 'oa2-3') {
    stage(ctx, W, H, t, { tint: '#DEE4EC', night: 0.14, shaft: { x: cx + 300, alpha: 0.12 }, groundY: G + 8, groundCol: OA.slate });
    letter(ctx, 'THE STRAIGHT LINE', cx, 86, 38, PAL.ink, { pop: seg(lt, 0.15, 0.9) });

    panel(ctx, cx - 40, 350, 720, 360, PAL.cream);
    const ox = cx - 340, oy = 490, w = 560, h = 270;
    inkLine(ctx, [[ox, oy], [ox + w + 60, oy]], 2.4, PAL.ink, 0);
    inkLine(ctx, [[ox, oy], [ox, oy - h]], 2.4, PAL.ink, 0);
    letter(ctx, 'log compute →', ox + w / 2, oy + 30, 14, PAL.ink, { mono: true, ink: false, alpha: 0.8 });
    ctx.save();
    ctx.translate(ox - 34, oy - h / 2); ctx.rotate(-Math.PI / 2);
    letter(ctx, 'log loss →', 0, 0, 14, PAL.ink, { mono: true, ink: false, alpha: 0.8 });
    ctx.restore();

    const k = seg(lt, 0.6, 5.0);
    const pts: Array<[number, number]> = [];
    for (let i = 0; i <= 52; i++) {
      const p = (i / 52) * k;
      pts.push([ox + 18 + p * (w + 90), oy - 34 - p * (h - 28)]);
    }
    if (pts.length > 1) inkLine(ctx, pts, 4, OA.violet, 0.08);
    for (let i = 0; i < 16; i++) {
      const kk = hash(i * 3.3);
      if (kk > k) continue;
      paint(ctx, ellPts(ox + 18 + kk * (w + 90) + (hash(i) - 0.5) * 14, oy - 34 - kk * (h - 28) + (hash(i * 7) - 0.5) * 18, 5, 5, 8, 0), {
        wash: PAL.ink, ink: null, alpha: 0.75
      });
    }
    if (k > 0.9) {
      glow(ctx, ox + 18 + (w + 90), oy - 34 - (h - 28), 50, OA.violet, 0.35, 3, 31);
      letter(ctx, 'off the page', ox + w + 20, oy - h - 6, 17, OA.violet, { pop: (k - 0.9) / 0.1 });
    }
    scientist(ctx, cx - 480, G, 9.4, { t, mood: 'happy', talk: talkS, talkT: t, coat: OA.deep, prop: 'paper' });
    letter(ctx, 'if the line holds, the roadmap is just money', cx, 560, 18, OA.violet, { pop: seg(lt, 5.4, 6.6) });
  }

  else {
    stage(ctx, W, H, t, { tint: '#E4E2F0', night: 0.1, groundY: G + 8, groundCol: OA.violet });
    letter(ctx, 'GPT-3 · 2020', cx, 86, 36, PAL.ink, { pop: seg(lt, 0.15, 0.9) });

    const bk = seg(lt, 0.4, 2.6);
    bloom(ctx, cx - 250, 330, 90 + bk * 46, { t, lit: 6 * bk, energy: bk, spin: 1, seed: 41 });
    letter(ctx, '175,000,000,000', cx - 250, 480, 21, OA.violet, { mono: true, pop: seg(lt, 1.6, 2.6) });
    letter(ctx, 'parameters', cx - 250, 508, 14, PAL.ink, { ink: false, alpha: 0.75 });

    // few-shot card
    panel(ctx, cx + 260, 330, 420, 280, PAL.cream);
    const rows: Array<[string, string]> = [
      ['sea otter', 'loutre de mer'],
      ['cheese', 'fromage'],
      ['plush giraffe', '?']
    ];
    rows.forEach(([a, b], i) => {
      const k = seg(lt, 1.2 + i * 0.75, 1.8 + i * 0.75);
      if (k <= 0) return;
      letter(ctx, a, cx + 110, 255 + i * 58, 17, PAL.ink, { mono: true, align: 'left', ink: false, alpha: k });
      letter(ctx, '→', cx + 250, 255 + i * 58, 17, mixCol(PAL.ink, PAL.cream, 0.5), { ink: false, alpha: k });
      const solved = i === 2 && lt > 4.2;
      letter(ctx, solved ? 'girafe en peluche' : b, cx + 290, 255 + i * 58, 17, solved ? OA.teal : PAL.ink, {
        mono: true, align: 'left', ink: false, alpha: k
      });
    });
    if (lt > 4.2) {
      glow(ctx, cx + 350, 371, 90, OA.teal, 0.3, 3, 45);
      letter(ctx, 'no training step', cx + 260, 440, 16, OA.teal, { pop: seg(lt, 4.2, 5) });
    }
    caret(ctx, cx + 20, G, 13, { t, face: lt > 4.2 ? 'star' : 'think', talk: talkC, talkT: t, emote: lt > 4.2 ? 'spark' : '…', emoteK: 1, seed: 4 });
    letter(ctx, 'the task is described in the prompt, not the weights', cx, 560, 18, OA.violet, { pop: seg(lt, 5.4, 6.6) });
  }
}

// ---------------------------------------------------------------- ACT 3
function act3(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2, lt = t - shot.startTime;
  const talkS = speaking && shot.speaker === 'Scientist';
  const talkC = speaking && shot.speaker === 'Caret';

  if (shot.id === 'oa3-1') {
    stage(ctx, W, H, t, { tint: '#E6DFCE', night: 0.3, shaft: { x: cx - 120, alpha: 0.12, col: OA.amber }, groundY: G + 8, groundCol: OA.slate });
    letter(ctx, '2021 · IT WRITES CODE', cx, 86, 34, mixCol(PAL.cream, OA.mist, 0.2), { pop: seg(lt, 0.15, 0.9) });

    panel(ctx, cx - 60, 330, 700, 330, OA.deep, PAL.ink, 10);
    // editor chrome
    for (const [i, c] of [OA.rose, OA.amber, OA.teal].entries()) {
      paint(ctx, ellPts(cx - 380 + i * 24, 188, 6.5, 6.5, 10, 0), { wash: c as string, ink: null });
    }
    const comment = '# return the nth fibonacci number';
    const ck = Math.floor(seg(lt, 0.5, 2.0) * comment.length);
    letter(ctx, comment.slice(0, ck), cx - 390, 240, 17, OA.tealLt, { mono: true, align: 'left', ink: false });

    const body = ['def fib(n):', '    a, b = 0, 1', '    for _ in range(n):', '        a, b = b, a + b', '    return a'];
    body.forEach((l, i) => {
      const k = seg(lt, 2.4 + i * 0.42, 2.8 + i * 0.42);
      if (k <= 0) return;
      ctx.save();
      ctx.globalAlpha = k;
      letter(ctx, l, cx - 390, 282 + i * 32, 17, mixCol(OA.mist, PAL.cream, 0.5), { mono: true, align: 'left', ink: false });
      ctx.restore();
    });
    if (lt > 4.8) {
      glow(ctx, cx - 60, 340, 220, OA.teal, 0.14, 3, 51);
      letter(ctx, 'the comment was the only input', cx - 60, 486, 17, OA.tealLt, { pop: seg(lt, 4.8, 5.8) });
    }
    caret(ctx, cx + 400, G, 14, { t, face: 'happy', talk: talkC, talkT: t, seed: 6, aL: 0.9 });
    scientist(ctx, cx - 470, G, 9.2, { t, mood: 'happy', talk: talkS, talkT: t, coat: OA.slate });
  }

  else if (shot.id === 'oa3-2') {
    stage(ctx, W, H, t, { tint: '#E8DEDC', night: 0.12, groundY: G + 8, groundCol: OA.rose });
    letter(ctx, '2022 · IT PAINTS', cx, 86, 36, PAL.ink, { pop: seg(lt, 0.15, 0.9) });

    letter(ctx, '"an otter astronaut, watercolour"', cx - 300, 220, 18, PAL.ink, { pop: seg(lt, 0.4, 1.4), ink: false });

    // noise grid resolving into an image
    const res = seg(lt, 1.4, 5.0);
    const gx = cx + 160, gy = 340, S = 230;
    panel(ctx, gx, gy, S + 40, S + 40, PAL.cream);
    const N = 13;
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
      const px = gx - S / 2 + (c + 0.5) * (S / N);
      const py = gy - S / 2 + (r + 0.5) * (S / N);
      // target: a soft otter-ish blob silhouette
      const dx = (c - N / 2) / N, dy = (r - N / 2.2) / N;
      const inside = Math.hypot(dx * 1.5, dy * 1.9) < 0.34;
      const target = inside ? mixCol(PAL.clay, PAL.cream, 0.25) : mixCol(OA.mist, PAL.cream, 0.55);
      const noise = hash(r * 31 + c * 7 + Math.floor(t * 8)) > 0.5 ? OA.slate : OA.mist;
      const col = res > hash(r * 13 + c * 3) ? target : noise;
      paint(ctx, rectPts(px - S / N / 2, py - S / N / 2, S / N, S / N, 0.3), { wash: col, ink: null });
    }
    if (res > 0.85) {
      const k = (res - 0.85) / 0.15;
      paint(ctx, ellPts(gx, gy + 14, 42, 34, 18, 1), { wash: PAL.clay, ink: PAL.ink, sw: 1.2, alpha: k });
      paint(ctx, ellPts(gx - 30, gy - 24, 15, 15, 12, 0.6), { wash: PAL.clay, ink: PAL.ink, sw: 1, alpha: k });
      paint(ctx, ellPts(gx + 30, gy - 24, 15, 15, 12, 0.6), { wash: PAL.clay, ink: PAL.ink, sw: 1, alpha: k });
      paint(ctx, ellPts(gx - 13, gy + 6, 4, 4, 8, 0), { wash: PAL.ink, ink: null, alpha: k });
      paint(ctx, ellPts(gx + 13, gy + 6, 4, 4, 8, 0), { wash: PAL.ink, ink: null, alpha: k });
    }
    tokenStream(ctx, cx - 300, 260, gx - 150, gy - 40, t, 7, OA.rose, 0.35, 9);
    letter(ctx, 'the model has never seen this exact thing', cx - 300, 400, 17, PAL.ink, { pop: seg(lt, 3.0, 4.2), ink: false, alpha: 0.9 });
    letter(ctx, 'which is the entire point', cx - 300, 430, 17, OA.rose, { pop: seg(lt, 4.2, 5.4), ink: false });
    scientist(ctx, cx - 420, G, 9.4, { t, mood: 'happy', talk: talkS, talkT: t, coat: OA.violet });
  }

  else if (shot.id === 'oa3-3') {
    stage(ctx, W, H, t, { tint: '#DFE6E2', night: 0.1, shaft: { x: cx, alpha: 0.14 }, groundY: G + 8, groundCol: OA.teal });
    letter(ctx, 'THE STEP THAT MADE IT USEFUL', cx, 86, 32, PAL.ink, { pop: seg(lt, 0.15, 0.9) });

    // two candidate answers, human picks one
    const cards: Array<[number, string, string]> = [
      [cx - 230, 'A', 'Sure — here are three options, ranked, with the trade-offs.'],
      [cx + 230, 'B', 'As an AI I cannot possibly comment on that at all.']
    ];
    cards.forEach(([x, tag, body], i) => {
      const chosen = i === 0 && lt > 2.4;
      panel(ctx, x as number, 300, 380, 190, chosen ? mixCol(PAL.cream, OA.teal, 0.22) : PAL.cream);
      letter(ctx, tag as string, (x as number) - 155, 232, 19, PAL.ink, { ink: false, alpha: 0.7 });
      const words = (body as string).split(' ');
      let line: string[] = [], ly = 282;
      words.forEach(wd => {
        if ((line.join(' ') + ' ' + wd).length > 26) {
          letter(ctx, line.join(' '), x as number, ly, 15, PAL.ink, { ink: false, alpha: 0.9 });
          ly += 24; line = [wd];
        } else line.push(wd);
      });
      if (line.length) letter(ctx, line.join(' '), x as number, ly, 15, PAL.ink, { ink: false, alpha: 0.9 });
      if (chosen) {
        glow(ctx, x as number, 300, 210, OA.teal, 0.2, 3, 61);
        paint(ctx, ellPts((x as number) + 150, 232, 20, 20, 14, 0.6), { wash: OA.teal, ink: PAL.ink, sw: 1.2 });
        inkLine(ctx, [[(x as number) + 141, 232], [(x as number) + 148, 240], [(x as number) + 160, 224]], 2.6, PAL.cream, 0.1);
      }
    });
    // the three-step pipeline
    const steps = ['demonstrations', 'reward model', 'optimise policy'];
    steps.forEach((s, i) => {
      const k = seg(lt, 3.0 + i * 0.7, 3.6 + i * 0.7);
      if (k <= 0) return;
      const sx = cx - 300 + i * 300;
      panel(ctx, sx, 470, 250, 58, mixCol(PAL.cream, OA.teal, 0.14));
      letter(ctx, `${i + 1}. ${s}`, sx, 470, 16, PAL.ink, { ink: false });
      if (i < 2) arrow(ctx, sx + 130, 470, sx + 170, 470, OA.teal, 2.2);
    });
    bloom(ctx, cx, 300, 70, { t, lit: 6, energy: 0.5 + seg(lt, 2.4, 4) * 0.5, spin: 0.8, thinking: seg(lt, 2.4, 4), seed: 63 });
    letter(ctx, 'smaller and aligned beat bigger and raw', cx, 556, 19, OA.teal, { pop: seg(lt, 5.4, 6.6) });
  }

  else {
    stage(ctx, W, H, t, { tint: '#D6E0DE', night: 0.55, shaft: { x: cx, alpha: 0.2 }, groundY: G + 8, groundCol: OA.deep });
    letter(ctx, '30 NOVEMBER 2022', cx, 84, 30, mixCol(PAL.cream, OA.mist, 0.25), { pop: seg(lt, 0.15, 0.8) });

    const typed = 'explain quantum computing simply'.slice(0, Math.floor(seg(lt, 0.6, 3.0) * 32));
    chatBox(ctx, cx, 300, 560, typed, t, {
      glowK: seg(lt, 1.0, 3.4),
      reply: lt > 3.6 ? 'Imagine a coin that is spinning rather than…' : undefined,
      label: 'research preview'
    });

    // crowds converging from every edge
    const N = 70;
    for (let i = 0; i < N; i++) {
      const k = seg(lt, 1.6 + hash(i) * 2.8, 3.6 + hash(i) * 2.8);
      if (k <= 0) continue;
      const a = hash(i * 7) * TAU;
      const r = 640 * (1 - k) + 230;
      const fx = cx + Math.cos(a) * r, fy = 330 + Math.sin(a) * r * 0.58;
      ctx.save();
      ctx.globalAlpha = 0.35 + k * 0.5;
      paint(ctx, ellPts(fx, fy - 11, 5.5, 5.5, 8, 0), { wash: mixCol(PAL.cream, OA.mist, 0.2), ink: null });
      paint(ctx, rectPts(fx - 4.5, fy - 4, 9, 14, 0.4), { wash: mixCol(OA.mist, OA.deep, 0.35), ink: null });
      ctx.restore();
    }
    const cnt = Math.floor(kf(lt, [[3.6, 0], [7.4, 100_000_000]], v => Math.pow(v, 2.1)));
    letter(ctx, `${cnt.toLocaleString()} users`, cx, 500, 26, OA.tealLt, { pop: seg(lt, 3.8, 4.6) });
    letter(ctx, 'in about two months', cx, 532, 16, mixCol(PAL.cream, OA.mist, 0.3), { ink: false, alpha: 0.9 });
    caret(ctx, cx - 430, G, 15, { t, face: 'star', talk: talkC, talkT: t, emote: 'spark', emoteK: seg(lt, 4, 5), seed: 7 });
    letter(ctx, 'the model was months old. the box was new.', cx, 572, 18, mixCol(PAL.cream, OA.mist, 0.2), { pop: seg(lt, 6, 7.2) });
  }
}

// ---------------------------------------------------------------- ACT 4
function act4(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2, lt = t - shot.startTime;
  const talkCh = speaking && shot.speaker === 'Chair';
  const talkS = speaking && shot.speaker === 'Scientist';

  if (shot.id === 'oa4-1') {
    stage(ctx, W, H, t, { tint: '#E6DCD8', night: 0.16, shaft: { x: cx - 260, alpha: 0.12 }, groundY: G + 8, groundCol: OA.slate });
    letter(ctx, 'MARCH 2023 · GPT-4', cx, 86, 34, PAL.ink, { pop: seg(lt, 0.15, 0.9) });

    const bk = seg(lt, 0.4, 2.4);
    bloom(ctx, cx - 280, 330, 120, { t, lit: 6, energy: 0.9, spin: 0.9, seed: 71 });
    // outer ring = multimodal
    if (bk > 0.2) {
      ctx.save();
      ctx.globalAlpha = bk;
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * TAU + t * 0.4;
        paint(ctx, ellPts(cx - 280 + Math.cos(a) * 185, 330 + Math.sin(a) * 185, 9, 9, 10, 0), {
          wash: i % 2 ? OA.amber : OA.tealLt, ink: null
        });
      }
      ctx.restore();
    }
    letter(ctx, 'text + images in', cx - 280, 500, 17, PAL.ink, { pop: seg(lt, 2.0, 2.8), ink: false });

    panel(ctx, cx + 250, 330, 500, 300, PAL.cream);
    benchBars(ctx, cx + 290, 258, 300, [
      ['bar exam', 90, OA.teal],
      ['biology olympiad', 99, OA.teal],
      ['SAT reading', 93, OA.teal],
      ['GPT-3.5 avg', 40, mixCol(OA.mist, OA.slate, 0.4)]
    ], seg(lt, 1.0, 4.6), 100);
    inkLine(ctx, [[cx + 110, 240], [cx + 110, 420]], 2, OA.rose, 0);
    letter(ctx, 'human median', cx + 110, 432, 12, OA.rose, { ink: false, alpha: 0.85 });
    letter(ctx, 'capability stopped being the bottleneck', cx, 560, 18, PAL.ink, { pop: seg(lt, 5.2, 6.4) });
  }

  else if (shot.id === 'oa4-2') {
    stage(ctx, W, H, t, { tint: '#DCDEE8', night: 0.3, groundY: G + 8, groundCol: OA.slate });
    letter(ctx, 'EVERYBODY SHIPS', cx, 86, 38, mixCol(PAL.cream, OA.mist, 0.2), { pop: seg(lt, 0.15, 0.9) });

    // grid of competing panels lighting in sequence
    for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) {
      const i = r * 6 + c;
      const k = seg(lt, 0.5 + i * 0.14, 1.0 + i * 0.14);
      const px = cx - 420 + c * 148, py = 250 + r * 112;
      panel(ctx, px, py, 128, 92, k > 0.4 ? mixCol(PAL.cream, [OA.teal, OA.violet, OA.amber, OA.rose][i % 4], 0.26) : mixCol(OA.deep, OA.slate, 0.4), PAL.ink, 8);
      if (k > 0.4) {
        glow(ctx, px, py, 70, [OA.teal, OA.violet, OA.amber, OA.rose][i % 4], 0.14 * k, 2, i);
        for (let l = 0; l < 3; l++) {
          inkLine(ctx, [[px - 44, py - 18 + l * 18], [px + 44 - (l % 2) * 26, py - 18 + l * 18]], 1.5, mixCol(PAL.ink, PAL.cream, 0.45), 0.1);
        }
      }
    }
    // the regulators' scroll
    const sk = seg(lt, 3.2, 5.4);
    if (sk > 0) {
      ctx.save();
      ctx.globalAlpha = sk;
      paint(ctx, rectPts(cx - 300, 486, 600 * sk, 64, 2), { wash: PAL.cream, ink: PAL.ink, sw: 1.6 });
      for (let i = 0; i < 5; i++) inkLine(ctx, [[cx - 280, 502 + i * 11], [cx - 280 + 540 * sk - (i % 3) * 60, 502 + i * 11]], 1, mixCol(PAL.cream, PAL.ink, 0.55), 0);
      paint(ctx, ellPts(cx - 300, 518, 18, 36, 14, 0.8), { wash: PAL.clayDk, ink: PAL.ink, sw: 1.4 });
      ctx.restore();
      letter(ctx, 'three continents start drafting law', cx, 572, 18, mixCol(PAL.cream, OA.mist, 0.2), { pop: seg(lt, 5.4, 6.6) });
    }
    scientist(ctx, cx + 470, G, 9.2, { t, mood: 'worried', talk: talkS, talkT: t, coat: OA.deep });
  }

  else if (shot.id === 'oa4-3') {
    stage(ctx, W, H, t, { tint: '#B9BFC9', night: 0.82, shaft: { x: cx, alpha: 0.1, col: OA.mist }, groundY: null });
    letter(ctx, '17 NOVEMBER 2023', cx, 88, 30, mixCol(PAL.cream, OA.rose, 0.25), { pop: seg(lt, 0.2, 1.0) });

    // cold boardroom
    paint(ctx, rectPts(-30, 470, W + 60, H - 430, 3), { fill: OA.ink, fillOp: 220, bleed: 0.08, tex: 0.4, ink: null });
    paint(ctx, ellPts(cx, 430, 330, 62, 30, 3), { fill: mixCol(OA.slate, OA.deep, 0.4), fillOp: 240, bleed: 0.06, tex: 0.5, ink: PAL.ink, sw: 1.8 });
    // chairs around it, one empty and lit
    const seats = [-250, -150, -50, 150, 250];
    seats.forEach((sx, i) => {
      const occupied = lt < 1.6 || i !== 2;
      paint(ctx, rrPts(cx + sx - 32, 352, 64, 72, 10, 1.2), { wash: mixCol(OA.slate, OA.ink, 0.5), ink: PAL.ink, sw: 1.2 });
      if (occupied && i !== 2) {
        paint(ctx, ellPts(cx + sx, 340, 20, 22, 14, 0.8), { wash: mixCol(OA.deep, OA.mist, 0.25), ink: PAL.ink, sw: 1 });
      }
    });
    // the empty chair, spotlit
    const emptyK = seg(lt, 1.4, 2.6);
    glow(ctx, cx + 50, 380, 150 * emptyK, OA.rose, 0.22 * emptyK, 4, 81);
    paint(ctx, rrPts(cx + 18, 352, 64, 72, 10, 1.2), { wash: mixCol(OA.slate, OA.ink, 0.3), ink: OA.rose, sw: 2 });
    if (emptyK > 0.4) letter(ctx, 'vacant', cx + 50, 318, 19, OA.rose, { pop: (emptyK - 0.4) / 0.6 });

    panel(ctx, cx - 300, 220, 420, 120, mixCol(OA.deep, PAL.cream, 0.1), PAL.ink);
    letter(ctx, '"not consistently candid', cx - 300, 200, 17, mixCol(PAL.cream, OA.mist, 0.2), { ink: false, alpha: seg(lt, 2.6, 3.6) });
    letter(ctx, 'in his communications"', cx - 300, 226, 17, mixCol(PAL.cream, OA.mist, 0.2), { ink: false, alpha: seg(lt, 2.9, 3.9) });
    letter(ctx, '— the board', cx - 300, 256, 13, OA.rose, { ink: false, alpha: seg(lt, 3.4, 4.4) });

    scientist(ctx, cx + 420, 560, 8.6, { t, mood: 'worried', talk: talkCh, talkT: t, coat: OA.ink });
    letter(ctx, 'the governance structure finally did something', cx, 560, 18, mixCol(PAL.cream, OA.mist, 0.25), { pop: seg(lt, 5.4, 6.8) });
  }

  else {
    stage(ctx, W, H, t, { tint: '#D2DAD8', night: 0.4, shaft: { x: cx, alpha: 0.16, col: OA.tealLt }, groundY: null });
    letter(ctx, 'THREE DAYS LATER', cx, 86, 32, mixCol(PAL.cream, OA.mist, 0.2), { pop: seg(lt, 0.15, 0.9) });

    // the letter filling with signatures
    panel(ctx, cx - 240, 330, 440, 330, PAL.cream);
    letter(ctx, 'to the board:', cx - 420, 206, 15, PAL.ink, { mono: true, align: 'left', ink: false, alpha: 0.8 });
    const sigs = Math.floor(seg(lt, 0.6, 5.0) * 745);
    for (let i = 0; i < 160; i++) {
      if (i / 160 * 745 > sigs) break;
      const r = Math.floor(i / 10), c = i % 10;
      const sx = cx - 420 + c * 38, sy = 240 + r * 18;
      ctx.save();
      ctx.globalAlpha = 0.65;
      inkLine(ctx, [
        [sx, sy], [sx + 9 + hash(i) * 6, sy - 5 - hash(i * 3) * 4], [sx + 20, sy + 2], [sx + 30, sy - 3]
      ], 1.3, mixCol(PAL.ink, OA.deep, 0.3), 0.6);
      ctx.restore();
    }
    glow(ctx, cx + 300, 300, 170, OA.tealLt, 0.2, 3, 91);
    panel(ctx, cx + 300, 300, 330, 180, PAL.cream);
    letter(ctx, `${sigs}`, cx + 300, 282, 56, OA.teal, { mono: true, ink: false });
    letter(ctx, 'of about 770 employees', cx + 300, 334, 15, PAL.ink, { ink: false, alpha: 0.85 });
    letter(ctx, 'reinstate him, and resign', cx + 300, 420, 17, PAL.ink, { pop: seg(lt, 4.0, 5.0), ink: false });

    // the chair refilled
    const back = seg(lt, 5.4, 6.6);
    if (back > 0) {
      ctx.save();
      ctx.globalAlpha = back;
      paint(ctx, rrPts(cx + 268, 480, 64, 72, 10, 1.2), { wash: mixCol(OA.slate, OA.ink, 0.4), ink: PAL.ink, sw: 1.2 });
      paint(ctx, ellPts(cx + 300, 468, 20, 22, 14, 0.8), { wash: mixCol(OA.deep, OA.mist, 0.3), ink: PAL.ink, sw: 1 });
      ctx.restore();
      sfx(ctx, '22 NOV: BACK', cx + 300, 560, 24, OA.teal, lt - 5.6, { life: 3 });
    }
    letter(ctx, 'the staff turned out to be the real board', cx - 240, 548, 18, mixCol(PAL.cream, OA.mist, 0.2), { pop: seg(lt, 6.4, 7.6) });
  }
}

// ---------------------------------------------------------------- ACT 5
function act5(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2, lt = t - shot.startTime;
  const talkC = speaking && shot.speaker === 'Caret';
  const talkS = speaking && shot.speaker === 'Scientist';

  if (shot.id === 'oa5-1') {
    stage(ctx, W, H, t, { tint: '#D4DEEC', night: 0.24, shaft: { x: cx + 200, alpha: 0.14 }, groundY: G + 8, groundCol: OA.slate });
    letter(ctx, 'MAY 2024 · ONE DOOR, EVERY SENSE', cx, 86, 30, PAL.ink, { pop: seg(lt, 0.15, 0.9) });

    const arch = cx + 190;
    const senses: Array<[string, string, number, (x: number, y: number) => void]> = [
      ['speech', OA.violet, 230, (x, y) => {
        for (let i = 0; i < 11; i++) {
          const h = 7 + Math.abs(Math.sin(i * 1.2 + t * 4)) * 26;
          inkLine(ctx, [[x - 46 + i * 9, y - h / 2], [x - 46 + i * 9, y + h / 2]], 2.8, OA.violet, 0);
        }
      }],
      ['vision', OA.amber, 335, (x, y) => {
        paint(ctx, rectPts(x - 36, y - 25, 72, 50, 1), { wash: mixCol(OA.amber, PAL.cream, 0.4), ink: PAL.ink, sw: 1.1 });
        paint(ctx, ellPts(x + 14, y - 9, 7, 7, 8, 0), { wash: PAL.cream, ink: null });
        paint(ctx, [[x - 30, y + 20], [x - 8, y - 6], [x + 10, y + 20]], { wash: mixCol(PAL.sap, PAL.cream, 0.2), ink: null });
      }],
      ['text', OA.teal, 440, (x, y) => {
        for (let i = 0; i < 3; i++) inkLine(ctx, [[x - 44, y - 10 + i * 10], [x + 34 - i * 10, y - 10 + i * 10]], 2.4, OA.teal, 0);
      }]
    ];
    senses.forEach(([lab, col, sy, draw], i) => {
      const k = seg(lt, 0.4 + i * 0.5, 1.0 + i * 0.5);
      if (k <= 0) return;
      ctx.save(); ctx.globalAlpha = k;
      draw(cx - 330, sy);
      letter(ctx, lab, cx - 330, sy + 48, 15, col, { ink: false });
      ctx.restore();
      tokenStream(ctx, cx - 270, sy, arch - 80, 340, t, 4, col, 0.33 + i * 0.05, 8);
    });
    glow(ctx, arch, 340, 190, OA.tealLt, 0.26, 4, 101);
    paint(ctx, [[arch - 105, 490], [arch - 105, 300], [arch, 206], [arch + 105, 300], [arch + 105, 490]], {
      fill: OA.teal, fillOp: 95, bleed: 0.22, tex: 0.5, ink: PAL.ink, sw: 2, curv: 0.26
    });
    letter(ctx, 'one model', arch, 352, 21, PAL.cream, { ink: false });
    panel(ctx, cx + 440, 520, 250, 90);
    letter(ctx, 'spoken reply', cx + 440, 498, 14, PAL.ink, { ink: false, alpha: 0.8 });
    letter(ctx, '~0.3 s', cx + 440, 528, 24, OA.teal, { mono: true, ink: false, pop: seg(lt, 3.4, 4.4) });
    caret(ctx, cx - 60, G, 14, { t, face: 'happy', talk: talkC, talkT: t, seed: 11 });
  }

  else if (shot.id === 'oa5-2') {
    stage(ctx, W, H, t, { tint: '#D8DCEC', night: 0.4, shaft: { x: cx, alpha: 0.12, col: OA.violet }, groundY: G + 8, groundCol: OA.violet });
    letter(ctx, 'SEPTEMBER 2024 · IT STOPS TO THINK', cx, 86, 30, mixCol(PAL.cream, OA.mist, 0.2), { pop: seg(lt, 0.15, 0.9) });

    const thinkK = seg(lt, 0.8, 4.4);
    bloom(ctx, cx - 240, 330, 115, { t, lit: 6, energy: 0.85, spin: 0.35, thinking: thinkK, seed: 111 });
    // timer
    const secs = (seg(lt, 0.8, 5.0) * 14).toFixed(1);
    letter(ctx, `${secs} s`, cx - 240, 500, 26, OA.violet, { mono: true, pop: seg(lt, 1.0, 1.8) });
    letter(ctx, 'thinking', cx - 240, 530, 14, mixCol(PAL.cream, OA.mist, 0.3), { ink: false, alpha: 0.85 });

    // the problem resolving after a visible pause
    panel(ctx, cx + 260, 320, 480, 280, PAL.cream);
    letter(ctx, 'find all integer solutions', cx + 260, 236, 17, PAL.ink, { ink: false, alpha: 0.9 });
    letter(ctx, 'to  x³ + y³ = z³ − 1', cx + 260, 266, 19, PAL.ink, { mono: true, ink: false });
    const steps = ['consider parity…', 'bound |x| by…', 'check residues mod 9…'];
    steps.forEach((s, i) => {
      const k = seg(lt, 1.6 + i * 0.85, 2.2 + i * 0.85);
      if (k <= 0) return;
      letter(ctx, s, cx + 260, 310 + i * 30, 14, mixCol(PAL.ink, PAL.cream, 0.35), { mono: true, ink: false, alpha: k * 0.9 });
    });
    if (lt > 4.6) {
      glow(ctx, cx + 260, 420, 150, OA.teal, 0.24, 3, 115);
      letter(ctx, 'solved', cx + 260, 420, 26, OA.teal, { pop: seg(lt, 4.6, 5.4) });
    }
    panel(ctx, cx - 240, 190, 330, 64, mixCol(PAL.cream, OA.violet, 0.2));
    letter(ctx, 'test-time compute', cx - 240, 190, 17, OA.violet, { ink: false });
    scientist(ctx, cx - 470, G, 9.2, { t, mood: 'happy', talk: talkS, talkT: t, coat: OA.deep });
    letter(ctx, 'the answer improves while you wait', cx, 562, 18, mixCol(PAL.cream, OA.mist, 0.2), { pop: seg(lt, 5.6, 6.8) });
  }

  else if (shot.id === 'oa5-3') {
    stage(ctx, W, H, t, { tint: '#E0DEE8', night: 0.18, groundY: G + 8, groundCol: OA.slate });
    letter(ctx, 'AND IT LEARNS TO MAKE VIDEO', cx, 86, 32, PAL.ink, { pop: seg(lt, 0.15, 0.9) });

    letter(ctx, '"a paper boat on a rainy street at night"', cx, 170, 18, PAL.ink, { pop: seg(lt, 0.3, 1.3), ink: false, alpha: 0.9 });

    // filmstrip sliding past
    const slide = seg(lt, 1.2, 6.0);
    ctx.save();
    ctx.translate(-slide * 220, 0);
    paint(ctx, rectPts(cx - 560, 258, 1500, 190, 2), { wash: OA.ink, ink: PAL.ink, sw: 1.6 });
    for (let i = 0; i < 9; i++) {
      const fx = cx - 520 + i * 165;
      // sprocket holes
      for (const hy of [268, 424]) for (let s2 = 0; s2 < 3; s2++) {
        paint(ctx, rectPts(fx + 18 + s2 * 44, hy, 16, 12, 0.3), { wash: PAL.cream, ink: null });
      }
      paint(ctx, rectPts(fx, 292, 148, 120, 1), { wash: mixCol(OA.deep, OA.slate, 0.3), ink: PAL.ink, sw: 1 });
      // rain + boat, advancing per frame
      for (let r = 0; r < 7; r++) {
        const rx = fx + ((r * 31 + i * 17) % 140);
        inkLine(ctx, [[rx, 296 + ((r * 23) % 100)], [rx - 4, 312 + ((r * 23) % 100)]], 1, mixCol(OA.mist, PAL.cream, 0.4), 0);
      }
      const bob = Math.sin(i * 0.9) * 5;
      paint(ctx, [[fx + 56, 384 + bob], [fx + 96, 384 + bob], [fx + 86, 370 + bob], [fx + 66, 370 + bob]], {
        wash: PAL.cream, ink: PAL.ink, sw: 0.9
      });
      paint(ctx, [[fx + 76, 370 + bob], [fx + 76, 350 + bob], [fx + 90, 368 + bob]], { wash: PAL.cream, ink: PAL.ink, sw: 0.8 });
    }
    ctx.restore();

    panel(ctx, cx + 400, 520, 300, 86);
    letter(ctx, 'patches over space AND time', cx + 400, 508, 14, PAL.ink, { ink: false, alpha: 0.85 });
    letter(ctx, 'same recipe, one more dimension', cx + 400, 534, 13, OA.violet, { ink: false, alpha: 0.9 });
    caret(ctx, cx - 430, G, 13, { t, face: 'star', seed: 12, emote: 'spark', emoteK: seg(lt, 3, 4) });
  }

  else {
    stage(ctx, W, H, t, { tint: '#D6DADE', night: 0.45, shaft: { x: cx - 300, alpha: 0.1 }, groundY: G + 8, groundCol: OA.slate });
    letter(ctx, 'BUT PEOPLE LEAVE', cx, 86, 34, mixCol(PAL.cream, OA.mist, 0.2), { pop: seg(lt, 0.15, 0.9) });

    // the bloom keeps growing behind half-built scaffolding
    const grow = 0.7 + seg(lt, 0.5, 6) * 0.3;
    bloom(ctx, cx + 120, 330, 100 + grow * 48, { t, lit: 6, energy: grow, spin: 1.1, seed: 121 });
    const railK = 1 - seg(lt, 2.4, 5.4) * 0.55;
    guardrail(ctx, cx + 120, 330, 420, 360, railK, OA.teal);

    // researchers setting down tools and walking out
    for (let i = 0; i < 3; i++) {
      const leave = seg(lt, 1.8 + i * 0.9, 5.2 + i * 0.9);
      const sx = cx - 180 - leave * (380 + i * 40);
      ctx.save();
      ctx.globalAlpha = 1 - leave * 0.55;
      scientist(ctx, sx, G, 9.2, {
        t, flip: true, mood: leave > 0.3 ? 'worried' : 'normal',
        coat: [OA.deep, OA.slate, OA.violet][i], arm: 0.2
      });
      ctx.restore();
    }
    // the two curves
    panel(ctx, cx + 400, 200, 300, 150);
    const ox = cx + 290, oy = 258;
    inkLine(ctx, [[ox, oy], [ox + 200, oy]], 1.8, PAL.ink, 0);
    const k2 = seg(lt, 1.0, 5.0);
    const cap: Array<[number, number]> = [], ass: Array<[number, number]> = [];
    for (let i = 0; i <= 30; i++) {
      const p = (i / 30) * k2;
      cap.push([ox + p * 200, oy - Math.pow(p, 2.3) * 100]);
      ass.push([ox + p * 200, oy - p * 34]);
    }
    if (cap.length > 1) inkLine(ctx, cap, 2.8, OA.rose, 0.2);
    if (ass.length > 1) inkLine(ctx, ass, 2.8, OA.teal, 0.1);
    letter(ctx, 'capability', cx + 400, 150, 13, OA.rose, { ink: false, alpha: 0.9 });
    letter(ctx, 'assurance', cx + 400, 248, 13, OA.teal, { ink: false, alpha: 0.9 });
    letter(ctx, 'the gap between them is the whole debate', cx, 562, 18, mixCol(PAL.cream, OA.mist, 0.2), { pop: seg(lt, 5.4, 6.6) });
  }
}

// ---------------------------------------------------------------- ACT 6
function act6(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2, lt = t - shot.startTime;
  const talkCh = speaking && shot.speaker === 'Chair';
  const talkS = speaking && shot.speaker === 'Scientist';

  if (shot.id === 'oa6-1') {
    stage(ctx, W, H, t, { tint: '#E6DCC8', night: 0.12, shaft: { x: cx + 320, alpha: 0.16, col: OA.amber }, groundY: G + 8, groundCol: PAL.clayDk });
    letter(ctx, 'JANUARY 2025 · STARGATE', cx, 86, 32, PAL.ink, { pop: seg(lt, 0.15, 0.9) });

    // desert horizon with halls receding
    paint(ctx, rectPts(-30, 360, W + 60, 260, 3), { fill: mixCol(PAL.clayLt, PAL.cream, 0.4), fillOp: 180, bleed: 0.15, tex: 0.5, ink: null });
    const rows = 5;
    for (let r = rows - 1; r >= 0; r--) {
      const k = seg(lt, 0.4 + (rows - 1 - r) * 0.7, 1.2 + (rows - 1 - r) * 0.7);
      if (k <= 0) continue;
      const depth = r / rows;
      const y = 410 + Math.pow(1 - depth, 1.6) * 170;
      const sc = 0.3 + (1 - depth) * 0.75;
      const alpha = 0.45 + (1 - depth) * 0.55;
      for (let c = -3; c <= 3; c++) {
        const x = cx + c * 230 * sc;
        ctx.save();
        ctx.globalAlpha = alpha * k;
        rack(ctx, x, y - 50 * sc, 96 * sc, 150 * sc, t, 0.4 + (1 - depth) * 0.45);
        ctx.restore();
      }
    }
    panel(ctx, cx - 330, 210, 390, 130);
    letter(ctx, 'ANNOUNCED TARGET', cx - 330, 178, 14, PAL.ink, { ink: false, alpha: 0.8 });
    const amt = Math.floor(kf(lt, [[1.2, 0], [5.0, 500]], v => v));
    letter(ctx, `$${amt}B`, cx - 330, 216, 42, OA.amber, { ink: false });
    letter(ctx, 'US AI infrastructure, four years', cx - 330, 252, 13, PAL.ink, { ink: false, alpha: 0.78 });
    letter(ctx, 'the roadmap is now partly a civil works programme', cx, 568, 18, PAL.ink, { pop: seg(lt, 5.4, 6.6) });
  }

  else if (shot.id === 'oa6-2') {
    stage(ctx, W, H, t, { tint: '#DEDED8', night: 0.3, groundY: G + 8, groundCol: OA.slate });
    letter(ctx, 'THE LINE HAS A PRICE', cx, 86, 36, mixCol(PAL.cream, OA.mist, 0.2), { pop: seg(lt, 0.15, 0.9) });

    // the scaling line resting on a growing stack
    const k = seg(lt, 0.5, 4.8);
    const baseY = 520;
    const layers: Array<[string, string, number]> = [
      ['silicon', OA.slate, 0],
      ['power', OA.amber, 1],
      ['concrete', PAL.clayDk, 2]
    ];
    layers.forEach(([lab, col, i]) => {
      const lk = clamp(k * 1.4 - i * 0.3);
      if (lk <= 0) return;
      const h = 54 * lk;
      paint(ctx, rectPts(cx - 330 + i * 18, baseY - i * 58 - h, 660 - i * 36, h, 1.5), {
        wash: mixCol(col, PAL.cream, 0.18), ink: PAL.ink, sw: 1.4
      });
      letter(ctx, lab, cx, baseY - i * 58 - h / 2, 15, PAL.ink, { ink: false, alpha: lk * 0.9 });
    });
    // pylons
    for (const px of [cx - 420, cx + 420]) {
      inkLine(ctx, [[px, baseY], [px, 300]], 3, OA.slate, 0);
      inkLine(ctx, [[px - 34, 330], [px + 34, 330]], 2.4, OA.slate, 0);
      inkLine(ctx, [[px - 26, 370], [px + 26, 370]], 2.4, OA.slate, 0);
    }
    const lineK = seg(lt, 1.6, 5.4);
    const pts: Array<[number, number]> = [];
    for (let i = 0; i <= 40; i++) {
      const p = (i / 40) * lineK;
      pts.push([cx - 330 + p * 660, 330 - p * 110]);
    }
    if (pts.length > 1) inkLine(ctx, pts, 3.6, OA.violet, 0.1);
    panel(ctx, cx + 360, 200, 290, 130);
    letter(ctx, 'one notch of loss', cx + 360, 168, 14, PAL.ink, { ink: false, alpha: 0.8 });
    letter(ctx, 'compute ×10', cx + 360, 196, 15, PAL.ink, { mono: true, ink: false, alpha: seg(lt, 2.2, 3) });
    letter(ctx, 'power ×10', cx + 360, 220, 15, PAL.ink, { mono: true, ink: false, alpha: seg(lt, 2.6, 3.4) });
    letter(ctx, 'capital ×10', cx + 360, 244, 15, OA.rose, { mono: true, ink: false, alpha: seg(lt, 3.0, 3.8) });
    scientist(ctx, cx - 470, G, 9.2, { t, mood: 'tired', talk: talkS, talkT: t, coat: OA.deep });
    letter(ctx, 'the physics bill arrives before the revenue', cx, 566, 18, mixCol(PAL.cream, OA.mist, 0.2), { pop: seg(lt, 5.4, 6.6) });
  }

  else if (shot.id === 'oa6-3') {
    stage(ctx, W, H, t, { tint: '#DCE4E0', night: 0.12, shaft: { x: cx, alpha: 0.14 }, groundY: G + 8, groundCol: OA.teal });
    letter(ctx, '28 OCTOBER 2025', cx, 86, 32, PAL.ink, { pop: seg(lt, 0.15, 0.9) });

    // old structure fading, new one drawing
    const morph = seg(lt, 0.8, 3.4);
    ctx.save();
    ctx.globalAlpha = 1 - morph;
    panel(ctx, cx - 300, 300, 300, 100, mixCol(PAL.cream, OA.mist, 0.4));
    letter(ctx, 'capped-profit', cx - 300, 300, 18, mixCol(PAL.ink, PAL.cream, 0.3), { ink: false });
    inkLine(ctx, [[cx - 430, 258], [cx - 170, 258]], 3, OA.rose, 0.05);
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = morph;
    panel(ctx, cx - 300, 240, 340, 104, mixCol(PAL.cream, OA.teal, 0.2));
    letter(ctx, 'OpenAI Foundation', cx - 300, 226, 18, OA.deep, { ink: false });
    letter(ctx, 'nonprofit · ~26% · in control', cx - 300, 252, 13, PAL.ink, { ink: false, alpha: 0.8 });
    arrow(ctx, cx - 300, 296, cx - 300, 348, OA.teal, 2.8);
    panel(ctx, cx - 300, 410, 340, 104, mixCol(PAL.cream, OA.violet, 0.16));
    letter(ctx, 'OpenAI Group PBC', cx - 300, 396, 18, OA.violet, { ink: false });
    letter(ctx, 'public benefit corporation', cx - 300, 422, 13, PAL.ink, { ink: false, alpha: 0.8 });
    ctx.restore();

    // ownership ring
    const rk = seg(lt, 2.6, 5.0);
    const rx = cx + 280, ry = 330, R = 128;
    const slices: Array<[number, string, string]> = [
      [0.26, OA.teal, 'Foundation 26%'],
      [0.27, OA.violet, 'Microsoft 27%'],
      [0.47, mixCol(OA.mist, OA.slate, 0.3), 'employees & investors 47%']
    ];
    let acc = -Math.PI / 2;
    slices.forEach(([frac2, col, lab], i) => {
      const span = frac2 * TAU * rk;
      const pts: Array<[number, number]> = [[rx, ry]];
      for (let s2 = 0; s2 <= 24; s2++) {
        const a = acc + (s2 / 24) * span;
        pts.push([rx + Math.cos(a) * R, ry + Math.sin(a) * R]);
      }
      paint(ctx, pts, { wash: col as string, ink: PAL.ink, sw: 1.4 });
      const mid = acc + span / 2;
      if (rk > 0.8) {
        letter(ctx, lab as string, rx + Math.cos(mid) * (R + 86), ry + Math.sin(mid) * (R + 36), 13, PAL.ink, {
          ink: false, alpha: (rk - 0.8) / 0.2 * 0.95
        });
      }
      acc += span;
      void i;
    });
    paint(ctx, ellPts(rx, ry, R * 0.42, R * 0.42, 20, 0.8), { wash: PAL.cream, ink: PAL.ink, sw: 1.4 });
    letter(ctx, 'PBC', rx, ry, 19, OA.deep, { ink: false });
    scientist(ctx, cx - 480, G, 9.2, { t, mood: 'normal', talk: talkCh, talkT: t, coat: OA.ink });
    letter(ctx, 'the cap dissolves · the control thread holds', cx, 566, 18, PAL.ink, { pop: seg(lt, 5.2, 6.2) });
  }

  else {
    stage(ctx, W, H, t, { tint: '#E0E4DE', night: 0.1, shaft: { x: cx - 260, alpha: 0.16 }, groundY: G + 8, groundCol: OA.teal });
    letter(ctx, 'THE SENTENCE IS UNCHANGED', cx, 86, 32, PAL.ink, { pop: seg(lt, 0.15, 0.9) });

    // the 2015 letter pinned next to the 2025 diagram
    ctx.save();
    ctx.translate(cx - 290, 330);
    ctx.rotate(-0.025);
    panel(ctx, 0, 0, 420, 290, PAL.cream);
    letter(ctx, '2015', 0, -108, 15, PAL.ink, { ink: false, alpha: 0.7 });
    letter(ctx, 'ensure that artificial', 0, -52, 20, PAL.ink, { ink: false });
    letter(ctx, 'general intelligence', 0, -22, 20, PAL.ink, { ink: false });
    letter(ctx, 'benefits all of humanity', 0, 8, 20, OA.teal, { ink: false });
    paint(ctx, ellPts(0, -140, 9, 9, 10, 0), { wash: OA.rose, ink: PAL.ink, sw: 1 });
    ctx.restore();

    const k = seg(lt, 1.2, 3.0);
    ctx.save();
    ctx.globalAlpha = k;
    ctx.translate(cx + 290, 330);
    ctx.rotate(0.02);
    panel(ctx, 0, 0, 420, 290, PAL.cream);
    letter(ctx, '2025', 0, -108, 15, PAL.ink, { ink: false, alpha: 0.7 });
    letter(ctx, 'OpenAI Group PBC', 0, -56, 19, OA.violet, { ink: false });
    letter(ctx, 'controlled by the Foundation', 0, -26, 14, PAL.ink, { ink: false, alpha: 0.85 });
    letter(ctx, 'Microsoft ~27%', 0, 6, 14, PAL.ink, { ink: false, alpha: 0.85 });
    letter(ctx, 'no profit cap', 0, 34, 14, OA.rose, { ink: false, alpha: 0.9 });
    paint(ctx, ellPts(0, -140, 9, 9, 10, 0), { wash: OA.rose, ink: PAL.ink, sw: 1 });
    ctx.restore();

    if (lt > 3.6) {
      inkLine(ctx, [[cx - 80, 330], [cx + 80, 330]], 2.6, mixCol(PAL.ink, PAL.cream, 0.4), 0.3);
      letter(ctx, 'same promise', cx, 300, 15, PAL.ink, { ink: false, alpha: seg(lt, 3.6, 4.4) * 0.9 });
      letter(ctx, 'different machine', cx, 364, 15, PAL.ink, { ink: false, alpha: seg(lt, 4.0, 4.8) * 0.9 });
    }
    letter(ctx, 'that tension is the story, not a footnote', cx, 560, 18, OA.teal, { pop: seg(lt, 5.0, 6.2) });
  }
}

// ---------------------------------------------------------------- ACT 7
function act7(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2, lt = t - shot.startTime;
  const talkC = speaking && shot.speaker === 'Caret';
  const talkS = speaking && shot.speaker === 'Scientist';

  if (shot.id === 'oa7-1') {
    stage(ctx, W, H, t, { tint: '#CFE0DB', night: 0.62, shaft: { x: cx, alpha: 0.12, col: OA.tealLt }, groundY: null });
    letter(ctx, 'A BILLION CONVERSATIONS A WEEK', cx, 90, 30, mixCol(PAL.cream, OA.mist, 0.2), { pop: seg(lt, 0.3, 1.2) });

    // a field of blinking carets
    const cols = 26, rowsN = 11;
    for (let r = 0; r < rowsN; r++) for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const k = seg(lt, 0.4 + (i / (cols * rowsN)) * 3.2, 0.9 + (i / (cols * rowsN)) * 3.2);
      if (k <= 0) continue;
      const depth = r / rowsN;
      const px = 40 + c * ((W - 80) / (cols - 1)) + Math.sin(t * 0.4 + i) * 2;
      const py = 200 + r * 36;
      const u = 2.6 + depth * 2.6;
      ctx.save();
      ctx.globalAlpha = (0.3 + depth * 0.7) * k;
      caret(ctx, px, py, u, { t: t + hash(i) * 4, blink: true, face: 'normal', noShadow: true, seed: i });
      ctx.restore();
    }
    const cnt = Math.floor(kf(lt, [[1.0, 0], [5.2, 1_000_000_000]], v => Math.pow(v, 1.7)));
    glow(ctx, cx, 560, 230, OA.tealLt, 0.2, 3, 141);
    letter(ctx, cnt.toLocaleString(), cx, 558, 34, OA.tealLt, { mono: true, pop: seg(lt, 1.2, 2.0) });
    letter(ctx, 'weekly active users', cx, 592, 15, mixCol(PAL.cream, OA.mist, 0.3), { ink: false, alpha: 0.9 });
    void talkC;
  }

  else if (shot.id === 'oa7-2') {
    stage(ctx, W, H, t, { tint: '#DDE3E0', night: 0.2, groundY: G + 8, groundCol: OA.slate });
    letter(ctx, 'THE TWO CURVES', cx, 86, 36, PAL.ink, { pop: seg(lt, 0.15, 0.9) });

    const baseY = 500, h = 300;
    const kk = seg(lt, 0.5, 4.6);
    // revenue
    const rh = h * 0.52 * kk;
    paint(ctx, rrPts(cx - 250 - 90, baseY - rh, 180, rh, 8, 1.4), { wash: OA.teal, ink: PAL.ink, sw: 1.6 });
    letter(ctx, 'REVENUE', cx - 250, baseY + 28, 16, PAL.ink, { ink: false });
    letter(ctx, 'tens of $B / yr', cx - 250, baseY - rh - 24, 17, OA.teal, { ink: false, alpha: kk });
    // commitments
    const ch = h * 0.95 * kk;
    paint(ctx, rrPts(cx + 250 - 90, baseY - ch, 180, ch, 8, 1.4), { wash: OA.rose, ink: PAL.ink, sw: 1.6 });
    letter(ctx, 'COMMITMENTS', cx + 250, baseY + 28, 16, PAL.ink, { ink: false });
    letter(ctx, 'multi-year, far larger', cx + 250, baseY - ch - 24, 17, OA.rose, { ink: false, alpha: kk });
    inkLine(ctx, [[cx - 430, baseY], [cx + 430, baseY]], 2.4, PAL.ink, 0);

    if (kk > 0.9) {
      const gap = (kk - 0.9) / 0.1;
      inkLine(ctx, [[cx - 250, baseY - rh - 44], [cx + 250, baseY - ch - 44]], 2.2, mixCol(PAL.ink, PAL.cream, 0.4), 0.3);
      letter(ctx, 'the bet: the first curve catches the second', cx, 180, 18, PAL.ink, { pop: gap });
    }
    scientist(ctx, cx - 470, G, 9.2, { t, mood: 'normal', talk: talkS, talkT: t, coat: OA.deep, prop: 'tablet' });
    caret(ctx, cx + 460, G, 13, { t, face: 'think', emote: '…', emoteK: 1, seed: 15 });
  }

  else if (shot.id === 'oa7-3') {
    stage(ctx, W, H, t, { tint: '#D8E2DE', night: 0.3, shaft: { x: cx - 220, alpha: 0.14 }, groundY: G + 8, groundCol: OA.teal });
    letter(ctx, 'THE QUESTION IS STILL OPEN', cx, 86, 32, mixCol(PAL.cream, OA.mist, 0.2), { pop: seg(lt, 0.15, 0.9) });

    bloom(ctx, cx - 250, 330, 135, { t, lit: 6, energy: 1, spin: 0.5, seed: 151 });

    panel(ctx, cx + 250, 330, 460, 280, PAL.cream);
    letter(ctx, 'MEASURED', cx + 250, 248, 14, OA.teal, { ink: false });
    ['benchmarks', 'users', 'revenue'].forEach((s, i) => {
      const k = seg(lt, 0.6 + i * 0.4, 1.0 + i * 0.4);
      letter(ctx, `✓ ${s}`, cx + 250, 282 + i * 26, 15, PAL.ink, { ink: false, alpha: k * 0.9 });
    });
    letter(ctx, 'UNMEASURED', cx + 250, 376, 14, OA.rose, { ink: false, alpha: seg(lt, 2.0, 2.6) });
    ['understanding', 'intent', 'alignment'].forEach((s, i) => {
      const k = seg(lt, 2.2 + i * 0.4, 2.6 + i * 0.4);
      letter(ctx, `? ${s}`, cx + 250, 410 + i * 26, 15, PAL.ink, { ink: false, alpha: k * 0.9 });
    });
    // the unticked box
    const bk = seg(lt, 3.6, 4.4);
    if (bk > 0) {
      ctx.save(); ctx.globalAlpha = bk;
      paint(ctx, rrPts(cx - 390, 500, 30, 30, 5, 0.8), { ink: PAL.ink, sw: 2.2 });
      letter(ctx, 'benefits all of humanity', cx - 230, 515, 17, PAL.ink, { ink: false, alpha: 0.95 });
      ctx.restore();
    }
    letter(ctx, 'we shipped the first list and kept arguing about the second', cx, 566, 17, mixCol(PAL.cream, OA.mist, 0.2), { pop: seg(lt, 4.4, 5.4) });
  }

  else {
    // ---- curtain call ----
    stage(ctx, W, H, t, { tint: '#DEC9A6', night: 0 });
    curtainCall(ctx, W, H, t, lt, 1, OA.teal);

    const nightK = seg(lt, 0.3, 1.2);
    glow(ctx, cx, 260, 230 * nightK, OA.deep, 0.5, 4, 161);
    paint(ctx, ellPts(cx, 260, 220 * nightK + 20, 165 * nightK + 16, 26, 3), {
      fill: OA.deep, fillOp: 230, bleed: 0.1, tex: 0.5, ink: null
    });
    letter(ctx, '2015:  A LETTER ABOUT EVERYONE', cx, 222, 23, PAL.cream, { pop: seg(lt, 0.7, 1.5) });
    letter(ctx, '2026:  A BOX THAT WAITS FOR YOU', cx, 266, 23, OA.tealLt, { pop: seg(lt, 1.3, 2.1) });

    // Caret alone in a single spot, bows, then blinks
    const bowK = 0.5 + wob(t, 0.5) * 0.5;
    const bow = lt > 2.2 ? bowK * 0.4 : 0;
    glow(ctx, cx, 520, 150, OA.amber, 0.2, 3, 165);
    caret(ctx, cx, 548, 20, {
      t, face: 'happy', dy: -bow * 0.5, sq: bow * 0.35,
      blink: lt > 3.6, talk: false, seed: 9,
      emote: 'spark', emoteK: seg(lt, 2.6, 3.4)
    });

    for (let i = 0; i < 6; i++) {
      const ax = 100 + i * ((W - 200) / 5);
      const aAge = ((lt * 1.7 + i * 0.5) % 1.8);
      if (aAge > 0.2 && lt > 1.8) {
        paint(ctx, starPts(ax, 650 - aAge * 30, 14 * (1 - aAge / 1.8), 0.45, 3), {
          wash: mixCol(PAL.clayLt, OA.amber, 0.4), ink: null, alpha: 1 - aAge / 1.8
        });
      }
    }
    curtains(ctx, W, H, kf(lt, [[0, 0], [2.6, 0], [4.8, 1]], v => v * v * (3 - 2 * v)));
    letter(ctx, 'still waiting for input', W - 140, H - 60, 19, PAL.cream, { alpha: seg(lt, 3.4, 4.4), rot: -0.04 });
  }
  void frac;
}
