import { RenderContext } from '../../types/video';
import { PAL, paper, ground, blob, paint, inkLine, rectPts, ellPts, rrPts, polyPts, letter, sfx, wob, mixCol, seg, frac, TAU } from '../painter';
import { clawd, researcher, typewriter } from '../characters';

// Chapter 1 — "The Absurd Question": paper, warm ochre/rose mood.
export function renderChapter1(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2;
  const G = 600; // ground line
  const lt = t - shot.startTime;

  paper(ctx, W, H, '#EBD6AE');
  blob(ctx, W * 0.14, H * 0.2, 190, PAL.rose, { alpha: 0.13, seed: 11 });
  blob(ctx, W * 0.86, H * 0.78, 220, PAL.ochre, { alpha: 0.12, seed: 12 });
  ground(ctx, W, G + 8);

  const talkClawd = speaking && shot.speaker === 'Clawd';
  const talkRes = speaking && shot.speaker === 'Engineer';

  if (shot.id === 's1-1') {
    // ---- The towering 100B LLM ----
    letter(ctx, '"HEY — IS THIS USER MAD?"', cx, 88, 44, PAL.ink, { pop: seg(lt, 0.2, 0.9) });
    letter(ctx, 'ANSWER WITH true OR false', cx, 138, 22, PAL.rose, { pop: seg(lt, 0.8, 1.3) });

    const gx = cx + 240, bob = wob(t, 0.45) * 4;
    // slow breathing giant
    clawd(ctx, gx, G, 30, {
      t, dy: bob / 30, sq: wob(t, 0.45) * 0.06,
      col: mixCol(PAL.violet, PAL.cream, 0.22), dk: PAL.indigo, lt: '#CBBDF0',
      eyes: 'narrow', mouth: 'flat', emote: 'sweat', seed: 3,
      aL: 0.15, aR: 0.15
    });
    letter(ctx, 'THE LLM · 100B PARAMS', gx, 178, 20, PAL.violet, { pop: seg(lt, 0.5, 1.0) });

    // token printer crawl: one sad token at a time
    const tokens = ['is', '_', 'ang', 'ry', '?'];
    paint(ctx, rrPts(gx - 132, G - 96, 264, 42, 8, 1.5), { wash: PAL.cream, ink: PAL.ink, sw: 1.2 });
    for (let i = 0; i < tokens.length; i++) {
      const on = frac((lt / 0.85) + i * 0.13) < 0.72;
      letter(ctx, tokens[i], gx - 102 + i * 50, G - 74, 17, on ? PAL.ink : mixCol(PAL.paper, PAL.ink, 0.25), { mono: true, alpha: on ? 1 : 0.4 });
    }
    letter(ctx, 'token… token… token…', gx, G - 116, 14, PAL.clayDk, { alpha: 0.85 });

    // tiny confused Clawd
    clawd(ctx, cx - 300, G, 15.5, {
      t, walk: undefined, dy: wob(t, 0.6) * 0.06,
      eyes: 'look', lookX: 0.7, lookY: -0.9, mouth: 'o',
      emote: '?', emoteK: seg(lt, 1.6, 2.4) * 1.2, seed: 1, aL: 0.5
    });
    researcher(ctx, cx - 190, G, 9.2, { t, flip: false, lookX: 0.3, eyes: talkRes ? 'wide' : 'normal', mouth: talkRes ? 'talk' : 'smile', talkT: t });
  }

  else if (shot.id === 's1-2') {
    // ---- One boolean, eight seconds ----
    letter(ctx, 'ONE BOOLEAN.', cx, 84, 48, PAL.ink, { pop: seg(lt, 0.2, 0.8) });
    letter(ctx, '8.83 s MEDIAN.', cx, 138, 30, PAL.rose, { pop: seg(lt, 1.0, 1.5) });

    // typewriter chugging the JSON one key at a time
    const full = '{"mad": true}';
    const typed = full.slice(0, Math.min(full.length, 1 + Math.floor(lt * 1.9) % full.length));
    typewriter(ctx, cx + 190, 505, 2.5, t, typed);
    letter(ctx, 'THE AUTOREGRESSIVE LOOP', cx + 190, 240, 19, PAL.indigo, { pop: seg(lt, 0.6, 1.1) });

    // the tiny yes/no card it was asked for
    const cardTiltO = wob(t, 0.8) * 0.03;
    ctx.save();
    ctx.translate(cx - 210, 330);
    ctx.rotate(cardTiltO);
    paint(ctx, rrPts(-95, -42, 190, 84, 10, 1.5), { wash: PAL.cream, ink: PAL.ink, sw: 1.4 });
    letter(ctx, 'is_urgent', 0, -14, 17, PAL.ink, { mono: true });
    letter(ctx, 'true / false', 0, 14, 15, PAL.teal, { mono: true });
    ctx.restore();

    // coin cost dripping away
    for (let i = 0; i < 3; i++) {
      const age = frac(lt / 1.4 + i / 3);
      const cxn = cx + 430 + wob(t + i, 0.6) * 6;
      const py = 180 + age * 260;
      paint(ctx, ellPts(cxn, py, 12, 12, 14, 1), { wash: PAL.ochre, ink: PAL.ink, sw: 1 });
      letter(ctx, '$', cxn, py + 1, 13, PAL.clayDk, { alpha: 1 - age * 0.5 });
    }
    letter(ctx, '$0.018 PER ASK', cx + 430, 150, 18, PAL.clayDk, { pop: seg(lt, 1.4, 2) });

    clawd(ctx, cx - 320, G, 18, {
      t, dy: wob(t, 0.55) * 0.08,
      eyes: talkClawd ? 'normal' : 'look', lookX: 0.8, lookY: -0.6,
      mouth: talkClawd ? 'talk' : 'flat', talkT: t,
      emote: '?', emoteK: seg(lt, 2.2, 3) * 1.3, aR: 0.9, seed: 2
    });
    researcher(ctx, cx - 120, G, 9.6, { t, eyes: 'tired', mouth: talkClawd ? 'flat' : 'smile', lookX: -0.2 });
    sfx(ctx, 'thunk… thunk…', cx + 190, 290, 22, PAL.indigo, frac(lt / 1.6) * 1.6, { life: 1.6 });
  }

  else if (shot.id === 's1-3') {
    // ---- The spinner torture ----
    letter(ctx, 'AND WHILE YOU WAIT…', cx, 86, 40, PAL.ink, { pop: seg(lt, 0.2, 0.8) });

    // giant spinner dial
    const sx = cx - 250, sy = 330;
    blob(ctx, sx, sy, 130, PAL.sky, { alpha: 0.22, seed: 21 });
    paint(ctx, ellPts(sx, sy, 92, 92, 26, 2), { ink: PAL.ink, sw: 1.6 });
    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(t * 3.4);
    for (let i = 0; i < 10; i++) {
      ctx.save();
      ctx.rotate((i / 10) * TAU);
      paint(ctx, rectPts(-3.4, -84, 7, 30, 0.8), { wash: i % 2 ? PAL.rose : PAL.ink, ink: null });
      ctx.restore();
    }
    ctx.restore();
    letter(ctx, '8.83s', sx, sy + 4, 34, PAL.rose, { stroke: false });

    // money fluttering away
    for (let i = 0; i < 5; i++) {
      const age = frac(lt / 2.6 + i / 5);
      const fx = cx + 40 + age * 330, fy = 200 + Math.sin(age * 7 + i) * 46;
      ctx.save();
      ctx.translate(fx, fy);
      ctx.rotate(Math.sin(age * 9 + i) * 0.35);
      paint(ctx, rectPts(-22, -12, 44, 24, 0.8), { wash: PAL.sap, ink: PAL.ink, sw: 1 });
      letter(ctx, '$', 0, 1, 15, PAL.cream, { alpha: 1 - age * 0.4 });
      ctx.restore();
    }

    // crumpled syntax error
    ctx.save();
    ctx.translate(cx + 330, 470);
    ctx.rotate(-0.12 + wob(t, 1.2) * 0.02);
    paint(ctx, rrPts(-118, -30, 236, 60, 8, 2), { wash: PAL.cream, ink: PAL.rose, sw: 1.6 });
    letter(ctx, 'SyntaxError: Unexpected token', 0, -7, 14, PAL.ink, { mono: true });
    letter(ctx, '"sure! here is your JSON: …"', 0, 14, 12, PAL.rose, { mono: true, alpha: 0.9 });
    ctx.restore();
    sfx(ctx, 'BZZZT!', cx + 332, 402, 26, PAL.rose, frac(lt / 2) * 2, { life: 2 });

    clawd(ctx, cx - 60, G, 21, {
      t, sq: 0.08 + wob(t, 2.2) * 0.05, rot: wob(t, 3) * 0.02,
      eyes: 'scared', mouth: 'wobble', emote: 'sweat', aL: 1.25, aR: 1.25, seed: 4
    });
    researcher(ctx, cx - 190, G, 9.4, { t, eyes: 'tired', mouth: 'flat', prop: 'none', lookX: 0.4 });
  }

  else {
    // ---- STOP. Enter the reflex. ----
    letter(ctx, 'SOFTWARE DOESN\'T WANT AN ESSAY.', cx, 84, 38, PAL.ink, { pop: seg(lt, 0.2, 0.8) });
    letter(ctx, 'IT WANTS A DECISION.', cx, 134, 46, PAL.teal, { pop: seg(lt, 1.0, 1.6) });

    // STOP octagon covering the spinner
    const stop = Math.min(1, seg(lt, 0.25, 0.9) * 1.4);
    ctx.save();
    ctx.translate(cx - 300, 350);
    ctx.scale(stop ? 1 + (1 - stop) * 3 : 4, stop ? 1 + (1 - stop) * 3 : 4);
    ctx.globalAlpha = stop;
    paint(ctx, polyPts(0, 0, 86, 8, Math.PI / 8, 2.5), { wash: PAL.rose, ink: PAL.ink, sw: 2 });
    paint(ctx, polyPts(0, 0, 68, 8, Math.PI / 8, 2), { ink: PAL.cream, sw: 3 });
    letter(ctx, 'STOP', 0, 2, 34, PAL.cream, { ink: false });
    ctx.restore();

    // lightning bolt + Jev seal
    inkLine(ctx, [[cx - 120, 480], [cx - 60, 420], [cx - 85, 430], [cx - 10, 360]], 3, PAL.ochre, 0.3);
    const jx = cx + 210, jy = 330;
    paint(ctx, polyPts(jx, jy, 96 + wob(t, 3) * 4, 6, 0, 3), { fill: PAL.teal, fillOp: 60, bleed: 0.3, tex: 0.4, ink: null });
    paint(ctx, polyPts(jx, jy, 62, 4, 0, 2), { wash: PAL.teal, ink: PAL.ink, sw: 1.8 });
    letter(ctx, 'JEV', jx, jy - 6, 30, PAL.cream, { ink: false });
    letter(ctx, '70 ms', jx, jy + 20, 14, PAL.cream, { ink: false, mono: true, alpha: 0.9 });
    letter(ctx, 'unstructured in → typed out', jx, jy + 92, 17, PAL.teal, { alpha: 0.95 });

    // hero Clawd, arms up
    clawd(ctx, cx - 130, G, 22, {
      t, dy: Math.abs(wob(t, 0.7)) * -0.35 * (seg(lt, 1.2, 1.8)),
      eyes: 'happy', mouth: talkClawd ? 'talk' : 'grin', talkT: t,
      aL: 1.2, aR: 1.2, emote: 'spark', emoteK: seg(lt, 1.4, 2.2) * 1.4, seed: 9
    });
    researcher(ctx, cx + 400, G, 10, { t, prop: 'pointer', eyes: 'happy', mouth: talkRes ? 'talk' : 'smile', talkT: t });
  }
}
