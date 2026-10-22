import { RenderContext } from '../../types/video';
import { PAL, paper, ground, blob, paint, inkLine, rectPts, rrPts, polyPts, letter, sfx, wob, seg, frac, mixCol, TAU } from '../painter';
import { clawd, researcher, typewriter } from '../characters';

// Chapter 5 — One Pass vs The Loop, moss/ochre mood.
export function renderChapter5(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2;
  const G = 600;
  const lt = t - shot.startTime;

  paper(ctx, W, H, '#E3DCC0');
  blob(ctx, W * 0.18, H * 0.22, 190, PAL.sap, { alpha: 0.15, seed: 81 });
  blob(ctx, W * 0.84, H * 0.72, 220, PAL.ochre, { alpha: 0.13, seed: 82 });
  ground(ctx, W, G + 8, PAL.sap);

  const talkClawd = speaking && shot.speaker === 'Clawd';
  const talkRes = speaking && shot.speaker === 'Engineer';

  if (shot.id === 's5-1') {
    // ---- Not a mini-LLM: an X-ray ----
    letter(ctx, '"IS JEV JUST A TINY LLM?"', cx, 88, 42, PAL.ink, { pop: seg(lt, 0.2, 0.8) });
    sfx(ctx, 'NO.', cx + 332, 140, 44, PAL.rose, lt - 1.1, { life: 3 });

    // two anatomy cards
    ctx.save();
    ctx.translate(cx - 280, 350);
    paint(ctx, rrPts(-205, -135, 410, 245, 14, 2), { wash: PAL.cream, ink: PAL.ink, sw: 1.6 });
    letter(ctx, 'THE GENERATOR', 0, -104, 22, PAL.violet, {});
    // spiral: write forever
    const spiral: [number, number][] = [];
    for (let i = 0; i <= 26; i++) {
      const a = i / 26 * TAU * 2.6, r = 12 + i * 2.2;
      spiral.push([Math.cos(a + t * 0.5) * r, -8 + Math.sin(a + t * 0.5) * r]);
    }
    inkLine(ctx, spiral, 2.2, PAL.violet, 0.6);
    letter(ctx, 'guess token → feed it back → repeat', 0, 82, 14.5, PAL.ink, { ink: false, alpha: 0.85 });
    letter(ctx, 'O(n) passes', 0, 108, 15, PAL.rose, { mono: true, ink: false });
    ctx.restore();

    ctx.save();
    ctx.translate(cx + 280, 350);
    paint(ctx, rrPts(-205, -135, 410, 245, 14, 2), { wash: PAL.cream, ink: PAL.ink, sw: 1.6 });
    letter(ctx, 'THE SCORER', 0, -104, 22, PAL.teal, {});
    // straight beam through candidates
    inkLine(ctx, [[-140, -10], [140, -10]], 3, PAL.teal, 0.1);
    for (const [i, cy] of [-54, -10, 34].entries()) {
      paint(ctx, rectPts(-150, cy - 12, 60, 24, 0.8), { wash: mixCol(PAL.cream, PAL.teal, 0.25 + i * 0.1), ink: PAL.ink, sw: 1 });
      paint(ctx, rectPts(90, cy - 12, 60, 24, 0.8), { wash: mixCol(PAL.cream, PAL.teal, 0.25 + i * 0.1), ink: PAL.ink, sw: 1 });
    }
    letter(ctx, 'state + candidates → scores, once', 0, 82, 14.5, PAL.ink, { ink: false, alpha: 0.85 });
    letter(ctx, 'O(1) forward pass', 0, 108, 15, PAL.teal, { mono: true, ink: false });
    ctx.restore();

    clawd(ctx, cx, G, 17, {
      t, eyes: 'look', lookX: wob(t, 0.3) * 0.9, lookY: -0.6,
      mouth: talkClawd ? 'talk' : 'smile', talkT: t, aL: 0.8, seed: 31
    });
  }

  else if (shot.id === 's5-2') {
    // ---- The typewriter loop, 60 passes to say "billing" ----
    letter(ctx, 'THE GENERATOR, ON THE SAME QUESTION', cx, 86, 38, PAL.ink, { pop: seg(lt, 0.2, 0.8) });

    const full = '{"dept":"billing"}';
    const typed = full.slice(0, 1 + Math.min(full.length - 1, Math.floor(lt * 2.1)));
    typewriter(ctx, cx - 140, 470, 3.1, t, typed);

    // pass counter: each token costs a whole forward pass
    const passes = 1 + Math.min(full.length - 1, Math.floor(lt * 2.1));
    ctx.save();
    ctx.translate(cx + 330, 300);
    paint(ctx, rrPts(-150, -80, 300, 160, 12, 1.8), { wash: PAL.cream, ink: PAL.ink, sw: 1.5 });
    letter(ctx, 'FORWARD PASSES', 0, -48, 16, PAL.ink, { ink: false });
    letter(ctx, String(passes).padStart(2, ' '), 0, -4, 52, PAL.rose, { mono: true, ink: false });
    letter(ctx, 'and climbing…', 0, 38, 14, PAL.rose, { ink: false, alpha: 0.8 });
    letter(ctx, '≈ 60ms EACH', 0, 64, 13, PAL.ink, { mono: true, ink: false, alpha: 0.75 });
    ctx.restore();
    letter(ctx, '8.8 s elapsed', cx + 330, 420, 20, PAL.rose, { pop: seg(lt, 2.6, 3.4) });

    // Clawd fell asleep waiting
    clawd(ctx, cx + 110, G, 18, {
      t, eyes: 'closed', mouth: 'flat', sq: 0.12 + wob(t, 0.4) * 0.02,
      emote: 'zzz', aL: 0.05, aR: 0.05, seed: 32
    });
    researcher(ctx, cx - 100, G, 9.4, { t, eyes: 'tired', mouth: 'flat', lookX: -0.3 });
  }

  else if (shot.id === 's5-3') {
    // ---- Jev: one pass, every candidate scored at once ----
    letter(ctx, 'JEV: ONE PASS. ALL SCORES.', cx, 86, 42, PAL.ink, { pop: seg(lt, 0.2, 0.8) });

    // the diamond, firing a beam
    const jx = cx - 320, jy = 340;
    paint(ctx, polyPts(jx, jy, 88 + wob(t, 3.4) * 5, 6, 0), { fill: PAL.teal, fillOp: 60, bleed: 0.35, tex: 0.4, ink: null });
    paint(ctx, polyPts(jx, jy, 54, 4, 0), { wash: PAL.teal, ink: PAL.ink, sw: 1.8 });
    letter(ctx, 'JEV', jx, jy - 2, 26, PAL.cream, { ink: false });

    // candidate slips, beam strikes each with a chime pop
    const slips: Array<[number, string, number, string]> = [
      [200, '"billing"', 0.94, '0.94'],
      [310, '"technical"', 0.05, '0.05'],
      [420, '"sales"', 0.01, '0.01']
    ];
    const beamY = jy - 90 + ((t * 260) % 330);
    inkLine(ctx, [[jx + 60, jy], [cx + 40, beamY], [cx + 160, beamY]], 4, PAL.ochre, 0.2);

    slips.forEach(([y, name, p, ptext], i) => {
      const at = 0.7 + i * 0.45;
      const hit = seg(lt, at, at + 0.3);
      const sx = cx + 330;
      ctx.save();
      ctx.translate(sx, y);
      const hot = hit > 0 && hit < 1 ? 1 + hit * 0.06 : 1;
      ctx.scale(hot, hot);
      paint(ctx, rrPts(-170, -34, 340, 68, 10, 1.4), {
        wash: hit > 0.2 ? mixCol(PAL.cream, PAL.teal, 0.3) : PAL.cream,
        ink: PAL.ink, sw: 1.3
      });
      letter(ctx, name, -60, 0, 17, PAL.ink, { mono: true, ink: false });
      // probability bar growing
      const barW = 150 * p * hit;
      paint(ctx, rectPts(10, -9, Math.max(barW, 2), 18, 0.6), { wash: p > 0.5 ? PAL.teal : mixCol(PAL.cream, PAL.ink, 0.25), ink: null });
      if (hit > 0.5) letter(ctx, ptext, 88, 0, 16, p > 0.5 ? PAL.teal : PAL.ink, { mono: true, align: 'left' });
      ctx.restore();
      sfx(ctx, p > 0.5 ? 'BINGO!' : '', sx + 330, y - 30, 30, PAL.teal, lt - at, { life: 1.6 });
    });

    letter(ctx, 'softmax over all of them, simultaneously', cx + 200, 530, 18, PAL.teal, { pop: seg(lt, 2.4, 3) });
    sfx(ctx, '70 ms!', cx - 320, 190, 34, PAL.ochre, lt - 1.0, { life: 3 });

    clawd(ctx, cx - 100, G, 20, {
      t, hat: 'wizard', eyes: 'spark', mouth: talkClawd ? 'talk' : 'grin', talkT: t,
      aL: 1.3, aR: 1.3, emote: 'spark', emoteK: seg(lt, 0.8, 1.4) * 1.3, seed: 33
    });
  }

  else {
    // ---- The zero-hallucination seal ----
    letter(ctx, 'IT CANNOT YAP.', cx, 86, 52, PAL.ink, { pop: seg(lt, 0.2, 0.8) });
    letter(ctx, 'IT CAN ONLY SCORE.', cx, 148, 30, PAL.teal, { pop: seg(lt, 0.9, 1.5) });

    // gold seal
    const sx = cx - 200, sy = 350;
    paint(ctx, polyPts(sx, sy, 150 + wob(t, 2.2) * 6, 8, Math.PI / 8), { fill: PAL.ochre, fillOp: 90, bleed: 0.2, tex: 0.6, border: 0.5, ink: null });
    paint(ctx, polyPts(sx, sy, 118, 8, Math.PI / 8), { wash: PAL.ochre, ink: PAL.ink, sw: 2 });
    paint(ctx, polyPts(sx, sy, 92, 8, Math.PI / 8), { fill: mixCol(PAL.ochre, PAL.cream, 0.5), fillOp: 200, bleed: 0.12, tex: 0.7, border: 0.5, ink: PAL.ink, sw: 1.2 });
    letter(ctx, 'Σ p = 1', sx, sy - 6, 30, PAL.clayDk, { mono: true });
    letter(ctx, 'BY CONSTRUCTION', sx, sy + 30, 13, PAL.clayDk, { ink: false });

    // error gremlins bouncing off
    for (let i = 0; i < 3; i++) {
      const age = frac(lt / 2.2 + i / 3);
      const ang = -0.5 + i * 0.5;
      const exx = sx + Math.cos(ang) * (170 + 90 * age * 4);
      const eyy = sy + Math.sin(ang) * (170 + 90 * age * 4) + age * age * 200;
      ctx.save();
      ctx.translate(exx, eyy);
      ctx.rotate(age * 5 + i);
      ctx.globalAlpha = 1 - age * 0.85;
      paint(ctx, rectPts(-26, -16, 52, 32, 0.8), { wash: PAL.cream, ink: PAL.rose, sw: 1.4 });
      letter(ctx, '✗', 0, 1, 20, PAL.rose, { ink: false });
      ctx.restore();
    }
    letter(ctx, 'missing braces · chatty preambles · made-up enums', sx, sy + 190, 14.5, PAL.ink, { ink: false, alpha: 0.8 });

    clawd(ctx, cx + 220, G, 21, {
      t, eyes: 'happy', mouth: talkClawd ? 'talk' : 'grin', talkT: t,
      emote: 'heart', emoteK: seg(lt, 1.4, 2) * 1.2, aL: 0.5, seed: 34
    });
    researcher(ctx, cx + 420, G, 9.8, { t, eyes: 'happy', mouth: talkRes ? 'talk' : 'smile', talkT: t, lookX: -0.4 });
  }
}
