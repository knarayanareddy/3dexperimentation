import { RenderContext } from '../../types/video';
import { PAL, paper, ground, blob, paint, inkLine, rectPts, ellPts, rrPts, polyPts, letter, sfx, kf, wob, seg, frac, mixCol, TAU } from '../painter';
import { clawd, researcher, typewriter } from '../characters';

// Chapter 3 — System 1 vs System 2, cool sky/indigo washes on paper.
export function renderChapter3(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2;
  const G = 600;
  const lt = t - shot.startTime;

  paper(ctx, W, H, '#D9E4DA');
  blob(ctx, W * 0.2, H * 0.25, 210, PAL.violet, { alpha: 0.13, seed: 61 });
  blob(ctx, W * 0.8, H * 0.3, 210, PAL.sky, { alpha: 0.16, seed: 62 });
  ground(ctx, W, G + 8, PAL.indigo);

  const talkClawd = speaking && shot.speaker === 'Clawd';
  const talkRes = speaking && shot.speaker === 'Engineer';

  if (shot.id === 's3-1') {
    // ---- The twin engines of the mind ----
    letter(ctx, 'FAST & SLOW', cx, 92, 54, PAL.ink, { pop: seg(lt, 0.2, 0.9) });
    letter(ctx, '— a story by Daniel Kahneman —', cx, 146, 19, PAL.violet, { alpha: 0.9, pop: seg(lt, 0.9, 1.4) });

    // LEFT: System 1 Clawd — lightning in a boxy body
    const lx = cx - 260;
    blob(ctx, lx, 400, 130, PAL.sky, { alpha: 0.28, seed: 63 });
    clawd(ctx, lx, G, 22, {
      t, col: mixCol(PAL.sky, PAL.cream, 0.25), dk: PAL.teal, lt: '#CDEAF4',
      eyes: 'happy', mouth: talkClawd ? 'talk' : 'grin', talkT: t,
      aL: 1.15, aR: 1.15, dy: Math.abs(wob(t, 0.9)) * -0.22, seed: 11
    });
    for (const bz of [-1, 1]) {
      inkLine(ctx, [[lx + bz * 66, 380], [lx + bz * 74, 420], [lx + bz * 66, 416], [lx + bz * 80, 458]], 2.4, PAL.ochre, 0.15);
    }
    letter(ctx, 'SYSTEM 1', lx, 250, 26, PAL.teal, { pop: seg(lt, 0.6, 1.1) });
    letter(ctx, 'fast · instinct · reflex', lx, 282, 16, PAL.ink, { ink: false, alpha: 0.8 });

    // RIGHT: System 2 Clawd — gears and glasses attitude
    const rx = cx + 260;
    blob(ctx, rx, 400, 130, PAL.violet, { alpha: 0.26, seed: 64 });
    clawd(ctx, rx, G, 22, {
      t, col: mixCol(PAL.violet, PAL.cream, 0.3), dk: PAL.indigo, lt: '#CBBDF0',
      eyes: 'narrow', mouth: 'flat', aL: 0.3, aR: 0.3, rot: wob(t, 0.5) * 0.015, seed: 12
    });
    // slow gears above
    for (const g of [-1, 1]) {
      ctx.save();
      ctx.translate(rx + g * 54, 392);
      ctx.rotate(t * 0.5 * g);
      paint(ctx, ellPts(0, 0, 20, 20, 12, 1), { ink: PAL.indigo, sw: 1.6 });
      for (let i = 0; i < 6; i++) {
        ctx.save(); ctx.rotate((i / 6) * TAU);
        paint(ctx, rectPts(-2.6, -27, 5.2, 9, 0.5), { wash: PAL.indigo, ink: null });
        ctx.restore();
      }
      ctx.restore();
    }
    letter(ctx, 'SYSTEM 2', rx, 250, 26, PAL.violet, { pop: seg(lt, 0.6, 1.1) });
    letter(ctx, 'slow · essays · deliberation', rx, 282, 16, PAL.ink, { ink: false, alpha: 0.8 });

    letter(ctx, '&', cx, 300, 40, PAL.clayDk, { pop: seg(lt, 1.2, 1.7) });
  }

  else if (shot.id === 's3-2') {
    // ---- System 2 hard at work: the endless essay ----
    letter(ctx, 'SYSTEM 2 AT WORK…', cx, 90, 44, PAL.ink, { pop: seg(lt, 0.2, 0.8) });

    // speech bubble with chain-of-thought scrolling
    ctx.save();
    ctx.translate(cx - 190, 300);
    paint(ctx, rrPts(-230, -105, 460, 190, 16, 2), { wash: PAL.cream, ink: PAL.ink, sw: 1.6 });
    paint(ctx, [[36, 78], [80, 126], [2, 112]], { wash: PAL.cream, ink: PAL.ink, sw: 1.6, curv: 0.2 });
    const thought = 'Let me think step by step. First, parse the tone of the ticket… hmm. Consult policy §4.2… reason… reason…';
    const shown = thought.slice(0, Math.max(0, Math.floor(lt * 13)));
    const words = shown.split(' ');
    let wy = -72;
    let line: string[] = [];
    words.forEach((w) => {
      if ((line.join(' ') + ' ' + w).length > 42) {
        letter(ctx, line.join(' '), 0, wy, 15, PAL.ink, { mono: true, ink: false, alpha: 0.9 });
        wy += 26;
        line = [w];
      } else line.push(w);
    });
    if (line.length) letter(ctx, line.join(' '), 0, wy, 15, PAL.ink, { mono: true, ink: false, alpha: 0.9 });
    ctx.restore();

    // clock burning
    const clx = cx + 330, cly = 240;
    paint(ctx, ellPts(clx, cly, 70, 70, 24, 1.6), { wash: PAL.cream, ink: PAL.ink, sw: 1.6 });
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * TAU;
      inkLine(ctx, [[clx + Math.cos(a) * 56, cly + Math.sin(a) * 56], [clx + Math.cos(a) * 62, cly + Math.sin(a) * 62]], 1.6, PAL.ink, 0);
    }
    inkLine(ctx, [[clx, cly], [clx + Math.cos(t * 1.6 - 1.57) * 34, cly + Math.sin(t * 1.6 - 1.57) * 34]], 2.6, PAL.rose, 0.05);
    inkLine(ctx, [[clx, cly], [clx + Math.cos(t * 0.4 - 1.57) * 46, cly + Math.sin(t * 0.4 - 1.57) * 46]], 3.2, PAL.ink, 0.05);
    letter(ctx, '8.8 s', clx, cly + 96, 24, PAL.rose, { pop: seg(lt, 1.2, 1.7) });

    letter(ctx, '124 TOKENS OF THINKING,', cx, 505, 22, PAL.ink, { pop: seg(lt, 1.8, 2.4) });
    letter(ctx, 'FOR AN ANSWER OF true.', cx, 542, 22, PAL.teal, { pop: seg(lt, 2.4, 3.0) });

    clawd(ctx, cx - 190, G, 18, {
      t, sq: 0.1, eyes: 'narrow', mouth: 'wobble',
      emote: 'sweat', aL: 0.1, aR: 0.1, seed: 13
    });
    typewriter(ctx, cx + 420, 580, 1.6, t, '{"de');
  }

  else if (shot.id === 's3-3') {
    // ---- System 1: swat first, think never ----
    letter(ctx, 'SYSTEM 1: THE SWAT.', cx, 90, 46, PAL.ink, { pop: seg(lt, 0.2, 0.8) });
    letter(ctx, 'YOU DUCK BEFORE YOU THINK.', cx, 142, 24, PAL.teal, { pop: seg(lt, 0.9, 1.4) });

    // ball whipping past on a loop
    const period = 1.5;
    const age = frac(lt / period);
    const bx = kf(age, [[0, -90], [1, W + 90]], v => v);
    const by = 300 + Math.sin(age * Math.PI) * -34;
    for (let i = 0; i < 5; i++) {
      inkLine(ctx, [[bx - 40 - i * 26, by + wob(t + i, 2) * 4], [bx - 8 - i * 26, by]], 3 - i * 0.4, mixCol(PAL.paper, PAL.sky, 0.4 + i * 0.12), 0.2);
    }
    paint(ctx, ellPts(bx, by, 15, 15, 16, 0.8), { wash: PAL.ochre, ink: PAL.ink, sw: 1.3 });
    inkLine(ctx, [[bx - 10, by - 2], [bx + 10, by + 2]], 1.2, PAL.clayDk, 0.4);

    // Clawd in shades, arm raised mid-swat
    const swatK = Math.min(1, Math.abs(Math.sin(lt * (TAU / period))) ** 2 + 0.35);
    clawd(ctx, cx, G, 22, {
      t, eyes: 'shades', mouth: 'cat',
      aL: 0.2, aR: 0.35 + swatK * 0.9, sq: wob(t, 1.1) * 0.05, seed: 14
    });

    const boomAge = age * period;
    sfx(ctx, 'SWAT!', cx + 150, 250, 34, PAL.rose, boomAge < 0.5 ? boomAge : -1, { life: 0.5 });
    letter(ctx, 'reaction: 70 ms · no essay', cx, 505, 19, PAL.teal, { pop: seg(lt, 1.6, 2.1) });
  }

  else {
    // ---- Unstructured in → typed out ----
    letter(ctx, 'UNSTRUCTURED REALITY…', cx - 300, 120, 30, PAL.ink, { pop: seg(lt, 0.2, 0.8) });
    letter(ctx, '…TYPED PROBABILITIES.', cx + 300, 120, 30, PAL.teal, { pop: seg(lt, 1.0, 1.6) });

    // LEFT: messy pile of tickets/logs
    const pileX = cx - 330;
    for (let i = 0; i < 4; i++) {
      ctx.save();
      ctx.translate(pileX + wob(t + i, 0.9) * 4, 380 - i * 34);
      ctx.rotate((i - 1.5) * 0.09);
      paint(ctx, rectPts(-70, -26, 140, 52, 1), { wash: PAL.cream, ink: PAL.ink, sw: 1 });
      for (let l = 0; l < 3; l++) inkLine(ctx, [[-58, -12 + l * 12], [58 - (i * 13 + l * 20) % 50, -12 + l * 12]], 1, mixCol(PAL.paper, PAL.ink, 0.55), 0.1);
      ctx.restore();
    }
    letter(ctx, 'tickets · logs · audio', pileX, 508, 15, PAL.ink, { ink: false, alpha: 0.85 });

    inkLine(ctx, [[pileX + 92, 300], [cx - 80, 300]], 3.4, PAL.ink, 0.4);

    // CENTER: the Jev diamond
    const jx = cx, jy = 300;
    paint(ctx, polyPts(jx, jy, 92 + wob(t, 3.2) * 5, 6, 0), { fill: PAL.teal, fillOp: 55, bleed: 0.35, tex: 0.4, ink: null });
    paint(ctx, polyPts(jx, jy, 58, 4, 0), { wash: PAL.teal, ink: PAL.ink, sw: 1.8 });
    inkLine(ctx, [[jx, jy - 58], [jx, jy + 58]], 1.2, mixCol(PAL.teal, PAL.cream, 0.6), 0);
    inkLine(ctx, [[jx - 58, jy], [jx + 58, jy]], 1.2, mixCol(PAL.teal, PAL.cream, 0.6), 0);
    letter(ctx, 'JEV', jx, jy - 4, 28, PAL.cream, { ink: false });
    letter(ctx, '1 pass', jx, jy + 92, 13, PAL.teal, { mono: true, alpha: 0.9 });

    inkLine(ctx, [[cx + 80, 300], [cx + 200, 300]], 3.4, PAL.ink, 0.4);

    // RIGHT: pristine typed decision slip
    ctx.save();
    ctx.translate(cx + 350, 300);
    paint(ctx, rrPts(-135, -82, 270, 164, 10, 1.5), { wash: PAL.cream, ink: PAL.ink, sw: 1.5 });
    letter(ctx, '{', -105, -50, 17, PAL.ink, { mono: true, align: 'left' });
    letter(ctx, 'dept: "billing"', -85, -24, 15, PAL.teal, { mono: true, align: 'left' });
    letter(ctx, 'p:     0.94', -85, 2, 15, PAL.clayDk, { mono: true, align: 'left' });
    letter(ctx, '}', -105, 28, 17, PAL.ink, { mono: true, align: 'left' });
    paint(ctx, ellPts(88, -52, 22, 22, 16, 0.8), { wash: PAL.teal, ink: PAL.ink, sw: 1.2 });
    inkLine(ctx, [[78, -52], [86, -42], [100, -62]], 2.6, PAL.cream, 0.1);
    letter(ctx, '70 ms · Σ p = 1', 0, 62, 14, PAL.teal, { mono: true, alpha: 0.9 });
    ctx.restore();

    researcher(ctx, cx - 60, G, 10.5, { t, prop: 'pointer', eyes: talkRes ? 'happy' : 'normal', mouth: talkRes ? 'talk' : 'smile', talkT: t });
    clawd(ctx, cx + 100, G, 16, {
      t, eyes: 'spark', mouth: talkClawd ? 'talk' : 'smile', talkT: t,
      aL: 0.7, seed: 15, dy: wob(t, 0.75) * 0.05
    });
  }
}
