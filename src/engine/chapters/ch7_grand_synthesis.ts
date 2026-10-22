import { RenderContext } from '../../types/video';
import { PAL, paper, ground, blob, paint, inkLine, rectPts, ellPts, rrPts, letter, kf, wob, seg, frac, hash, mixCol, starPts } from '../painter';
import { clawd, researcher, ClawdOpts } from '../characters';

// Chapter 7 — synthesis, night sky, and the curtain call (the PDoomVideo twist).
export function renderChapter7(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2;
  const G = 600;
  const lt = t - shot.startTime;

  const talkClawd = speaking && shot.speaker === 'Clawd';
  const talkRes = speaking && shot.speaker === 'Engineer';

  if (shot.id === 's7-1') {
    // ---- The gatekeeper fork ----
    paper(ctx, W, H, '#EBDDC2');
    blob(ctx, W * 0.2, H * 0.7, 220, PAL.teal, { alpha: 0.13, seed: 101 });
    blob(ctx, W * 0.82, H * 0.3, 210, PAL.violet, { alpha: 0.13, seed: 102 });
    ground(ctx, W, G + 8);

    letter(ctx, 'THE ARCHITECTURE OF TOMORROW', cx, 86, 42, PAL.ink, { pop: seg(lt, 0.2, 0.8) });
    letter(ctx, 'a reflex at the gate, a brain in the back', cx, 134, 20, PAL.clayDk, { pop: seg(lt, 0.9, 1.4) });

    // fork in the road
    inkLine(ctx, [[cx - 420, 430], [cx - 140, 400]], 4, PAL.ink, 0.4);
    inkLine(ctx, [[cx - 140, 400], [cx + 120, 340]], 4.5, PAL.teal, 0.4);
    inkLine(ctx, [[cx - 140, 400], [cx + 120, 470]], 2.6, PAL.violet, 0.4);

    // fast lane: 95%
    ctx.save();
    ctx.translate(cx + 330, 300);
    paint(ctx, rrPts(-180, -74, 360, 148, 14, 1.6), { wash: mixCol(PAL.cream, PAL.teal, 0.28), ink: PAL.teal, sw: 2 });
    letter(ctx, '95% OF TRAFFIC', 0, -42, 20, PAL.teal, {});
    letter(ctx, 'JEV · 70 ms · $0.042/1M', 0, -6, 16, PAL.ink, { mono: true, ink: false });
    letter(ctx, 'answer and done', 0, 28, 15, PAL.ink, { ink: false, alpha: 0.85 });
    // little fast dashes
    for (let i = 0; i < 3; i++) {
      const dx = frac(t * 1.1 + i / 3) * 220 - 150;
      inkLine(ctx, [[dx, 54], [dx + 30, 54]], 2.4, PAL.teal, 0.1);
    }
    ctx.restore();
    letter(ctx, '95%', cx + 30, 300, 30, PAL.teal, { pop: seg(lt, 1.2, 1.7) });

    // slow lane: 5% — the sleeping brain woken rarely
    ctx.save();
    ctx.translate(cx + 330, 500);
    paint(ctx, rrPts(-180, -60, 360, 122, 14, 1.6), { wash: mixCol(PAL.cream, PAL.violet, 0.25), ink: PAL.violet, sw: 2 });
    letter(ctx, '5% — THE HARD ONES', 0, -30, 18, PAL.violet, { mono: false });
    letter(ctx, 'SYSTEM 2 · deep reasoning', 0, 2, 15, PAL.ink, { mono: true, ink: false });
    letter(ctx, 'essays welcome here', 0, 30, 14, PAL.ink, { ink: false, alpha: 0.85 });
    ctx.restore();
    letter(ctx, '5%', cx + 30, 505, 30, PAL.violet, { pop: seg(lt, 1.6, 2.1) });

    // Clawd the gatekeeper
    clawd(ctx, cx - 170, G, 21, {
      t, eyes: 'shades', mouth: talkClawd ? 'talk' : 'cat', talkT: t,
      aL: 0.6, aR: 0.6, dy: wob(t, 0.6) * 0.06, seed: 51
    });
    researcher(ctx, cx - 380, G, 9.6, { t, eyes: 'happy', mouth: talkRes ? 'talk' : 'smile', talkT: t, lookX: 0.5 });
  }

  else if (shot.id === 's7-2') {
    // ---- Night sky: two minds at peace ----
    paper(ctx, W, H, '#C9C4B4');
    paint(ctx, rectPts(-40, -40, W + 80, H + 80, 4), {
      fill: PAL.night, fillOp: 235, bleed: 0.04, tex: 0.55, border: 0.4, ink: null
    });
    // stars
    for (let i = 0; i < 60; i++) {
      const sx = hash(i * 3.7) * W, sy = hash(i * 8.3) * (H * 0.72);
      const tw = 0.5 + Math.abs(wob(t + i * 2.2, 0.5)) * 0.8;
      if (i % 6 === 0) paint(ctx, starPts(sx, sy, 5 * tw, 0.4, 4), { wash: PAL.cream, ink: null });
      else paint(ctx, ellPts(sx, sy, 1.8 * tw, 1.8 * tw, 8, 0.3), { wash: PAL.cream, washOp: 220 * tw, ink: null });
    }

    // twin orbs
    const jx = cx - 210, by = 300;
    blob(ctx, jx, by, 110, PAL.teal, { alpha: 0.5 + wob(t, 1.2) * 0.08, seed: 103 });
    paint(ctx, ellPts(jx, by, 52, 52, 24, 1), { wash: mixCol(PAL.teal, PAL.cream, 0.4), ink: PAL.cream, sw: 1.4 });
    letter(ctx, 'JEV', jx, by - 4, 20, PAL.night, { ink: false });
    letter(ctx, 'reflex', jx, by + 92, 16, PAL.cream, { alpha: 0.85 });

    const mx = cx + 210;
    blob(ctx, mx, by, 110, PAL.violet, { alpha: 0.5 + wob(t + 2, 0.9) * 0.08, seed: 104 });
    paint(ctx, ellPts(mx, by, 52, 52, 24, 1), { wash: mixCol(PAL.violet, PAL.cream, 0.4), ink: PAL.cream, sw: 1.4 });
    letter(ctx, 'LLM', mx, by - 4, 20, PAL.night, { ink: false });
    letter(ctx, 'dreamer', mx, by + 92, 16, PAL.cream, { alpha: 0.85 });

    // harmonic wave between them
    const wave: [number, number][] = [];
    for (let x = jx + 60; x <= mx - 60; x += 6) {
      const k = (x - jx - 60) / (mx - jx - 120);
      wave.push([x, by + Math.sin(k * Math.PI * 3 + t * 3) * 18]);
    }
    inkLine(ctx, wave, 2.6, mixCol(PAL.cream, PAL.sky, 0.5), 0.5);

    letter(ctx, 'FAST & SLOW, IN HARMONY', cx, 140, 40, PAL.cream, { pop: seg(lt, 0.3, 1) });

    // ground silhouettes watching the sky
    paint(ctx, rectPts(-40, G - 4, W + 80, H - G + 44, 3), { fill: PAL.ink, fillOp: 200, bleed: 0.1, tex: 0.4, ink: null });
    clawd(ctx, cx - 70, G + 40, 16, {
      t, eyes: 'happy', mouth: talkClawd ? 'talk' : 'smile', talkT: t,
      col: mixCol(PAL.clay, PAL.night, 0.25), dk: PAL.clayDk, aL: 0.5, seed: 52
    });
    researcher(ctx, cx + 70, G + 44, 8.8, { t, flip: true, eyes: 'happy', mouth: talkRes ? 'talk' : 'smile', talkT: t });
  }

  else if (shot.id === 's7-3') {
    // ---- The spectrum of thought ----
    paper(ctx, W, H, '#E9D8BC');
    ground(ctx, W, G + 8);
    letter(ctx, 'INTELLIGENCE IS A SPECTRUM', cx, 90, 44, PAL.ink, { pop: seg(lt, 0.2, 0.8) });

    const rungs: Array<[string, string, number]> = [
      ['70 ms reflex', PAL.teal, 0.55],
      ['routing', PAL.sap, 0.6],
      ['quick checks', PAL.ochre, 0.62],
      ['tool calls', PAL.rose, 0.62],
      ['essays', PAL.violet, 0.6],
      ['10-min research', PAL.night, 0.58]
    ];
    const bx = cx - 400, bw = 124;
    rungs.forEach(([label, col, al], i) => {
      const x = bx + i * bw;
      const pop = seg(lt, 0.5 + i * 0.28, 0.9 + i * 0.28);
      ctx.save();
      ctx.translate(x, 320);
      ctx.scale(1, Math.max(0.001, pop));
      blob(ctx, 0, 0, 66, col, { alpha: al, seed: 105 + i });
      paint(ctx, rrPts(-56, -46, 112, 92, 12, 1.5), { wash: mixCol(PAL.cream, col, 0.35), ink: PAL.ink, sw: 1.3 });
      letter(ctx, label.split(' ')[0], 0, -12, 16, col === PAL.night || col === PAL.violet ? PAL.clayDk : PAL.ink, { ink: false });
      letter(ctx, label.slice(label.indexOf(' ') + 1), 0, 14, 14, PAL.ink, { ink: false, alpha: 0.9 });
      ctx.restore();
      if (i > 0) inkLine(ctx, [[x - bw + 58, 320], [x - 58, 320]], 2.2, PAL.ink, 0.3);
    });

    letter(ctx, '"unstructured stuff in —', cx, 460, 30, PAL.clayDk, { pop: seg(lt, 2.4, 3) });
    letter(ctx, 'typed decisions out."', cx, 500, 30, PAL.teal, { pop: seg(lt, 2.9, 3.5) });

    clawd(ctx, cx, G, 19.5, {
      t, eyes: 'happy', mouth: talkClawd ? 'talk' : 'grin', talkT: t,
      aL: 1.05, aR: 1.05, dy: Math.abs(wob(t, 0.75)) * -0.14,
      emote: 'music', emoteK: seg(lt, 2.2, 3) * 1.2, seed: 53
    });
  }

  else {
    // ---- THE TWIST: it was a stage all along ----
    // warm theater interior
    paper(ctx, W, H, '#DEC9A6');

    // stage: wooden boards
    paint(ctx, rectPts(-40, 470, W + 80, H - 430, 4), { fill: PAL.clayDk, fillOp: 220, bleed: 0.1, tex: 0.6, border: 0.4, ink: null });
    for (let px = 40; px < W; px += 150) {
      inkLine(ctx, [[px, 474], [px - 24, H + 10]], 1.6, mixCol(PAL.clayDk, PAL.ink, 0.6), 0.1);
    }
    inkLine(ctx, [[0, 472], [W, 472]], 2, mixCol(PAL.clayDk, PAL.ink, 0.55), 0.2);

    // footlights along the apron
    for (let fx = 90; fx < W; fx += 120) {
      blob(ctx, fx, 540, 42, PAL.ochre, { alpha: 0.4 + wob(t + fx, 1.4) * 0.08, seed: 110 + fx });
      paint(ctx, ellPts(fx, 542, 9, 9, 12, 0.6), { wash: PAL.cream, ink: PAL.ink, sw: 1 });
    }

    // night backdrop circle behind the big question
    const nightK = seg(lt, 0.4, 1.4);
    blob(ctx, cx, 270, 200 * nightK + 20, PAL.night, { alpha: 0.75, seed: 115 });
    letter(ctx, 'WAS IT ALL', cx, 230, 40, PAL.cream, { pop: seg(lt, 1.0, 1.7) });
    letter(ctx, 'FOR SHOW?', cx, 286, 46, PAL.ochre, { pop: seg(lt, 1.5, 2.2) });

    // the troupe takes a bow
    const bowK = 0.5 + wob(t, 0.5) * 0.5;
    const bowDy = (on: boolean) => (on ? bowK * 0.4 : 0);

    const jevonsO: ClawdOpts = {
      t, hat: 'top', monocle: true, eyes: 'happy', mouth: 'smile',
      dy: bowDy(lt > 2.2), sq: bowDy(lt > 2.2) * 0.35, seed: 56
    };
    clawd(ctx, cx - 250, 545, 14, jevonsO);
    clawd(ctx, cx, 545, 19, {
      t, eyes: 'happy', mouth: 'grin',
      dy: bowDy(lt > 2.0), sq: bowDy(lt > 2.0) * 0.35,
      emote: 'music', emoteK: seg(lt, 2.4, 3) * 1.2, seed: 54
    });
    researcher(ctx, cx + 250, 552, 8.6, { t, eyes: 'happy', mouth: talkRes ? 'talk' : 'smile', talkT: t, rot: bowDy(lt > 2.3) * 0.14 });

    // applause marks popping from the "audience"
    for (let i = 0; i < 6; i++) {
      const ax = 100 + i * ((W - 200) / 5);
      const aAge = ((lt * 1.7 + i * 0.5) % 1.8);
      if (aAge > 0.2 && lt > 1.6) {
        paint(ctx, starPts(ax, 650 - aAge * 30, 14 * (1 - aAge / 1.8), 0.45, 3), {
          wash: mixCol(PAL.clayLt, PAL.rose, 0.4), ink: null, alpha: 1 - aAge / 1.8
        });
      }
    }

    // curtains sweeping in from both sides
    const curtain = kf(lt, [[0, 0], [2.6, 0], [5.4, 1]], v => v * v * (3 - 2 * v));
    const cw = curtain * (W * 0.34) + 60;
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.scale(side, 1);
      ctx.translate(side < 0 ? -W : 0, 0);
      // velvet panel
      const panel: [number, number][] = [[-10, -10], [cw, -10], [cw - 24, H * 0.6], [cw + 8, H + 20], [-10, H + 20]];
      paint(ctx, panel, { fill: PAL.rose, fillOp: 245, bleed: 0.06, tex: 0.6, border: 0.4, ink: PAL.ink, sw: 2 });
      // vertical folds
      for (let fx = 30; fx < cw - 4; fx += 46) {
        inkLine(ctx, [[fx, -4], [fx - 16 + hash(fx) * 20, H + 4]], (26 - fx * 0.14) / 10, mixCol(PAL.rose, PAL.ink, 0.55), 0.3);
      }
      // tie-back shadow
      inkLine(ctx, [[cw - 30, H * 0.5], [cw - 6, H * 0.55]], 3.4, mixCol(PAL.rose, PAL.ink, 0.35), 0.4);
      ctx.restore();
    }
    // valance with scallops
    paint(ctx, [[-10, -10], [W + 10, -10], [W + 10, 96], [-10, 96]], { fill: PAL.rose, fillOp: 245, bleed: 0.05, tex: 0.6, border: 0.3, ink: PAL.ink, sw: 2 });
    for (let vx = 0; vx <= 10; vx++) {
      paint(ctx, ellPts(vx * (W / 10), 96, W / 22, 26, 16, 1), { fill: mixCol(PAL.rose, PAL.ink, 0.12), fillOp: 245, bleed: 0.08, tex: 0.5, ink: PAL.ink, sw: 1.2 });
    }
    inkLine(ctx, [[0, 122], [W, 122]], 3, PAL.ochre, 0.3);

    letter(ctx, 'fin', W - 90, H - 60, 22, PAL.cream, { alpha: seg(lt, 3.4, 4.2), rot: -0.05 });
  }
}
