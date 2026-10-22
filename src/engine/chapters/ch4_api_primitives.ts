import { RenderContext } from '../../types/video';
import { PAL, paper, ground, blob, paint, inkLine, rectPts, ellPts, rrPts, letter, sfx, kf, wob, seg, frac, mixCol } from '../painter';
import { clawd, researcher } from '../characters';

// Chapter 4 — noul / choice / score: the three primitives.
export function renderChapter4(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2;
  const G = 600;
  const lt = t - shot.startTime;

  paper(ctx, W, H, '#DCE5DC');
  blob(ctx, W * 0.82, H * 0.24, 200, PAL.teal, { alpha: 0.14, seed: 71 });
  blob(ctx, W * 0.18, H * 0.75, 210, PAL.violet, { alpha: 0.12, seed: 72 });
  ground(ctx, W, G + 8, PAL.teal);

  const talkClawd = speaking && shot.speaker === 'Clawd';
  const talkRes = speaking && shot.speaker === 'Engineer';

  if (shot.id === 's4-1') {
    // ---- One endpoint, no chat history ----
    letter(ctx, 'ONE ENDPOINT. NO CHAT HISTORY.', cx, 86, 40, PAL.ink, { pop: seg(lt, 0.2, 0.8) });

    // hand-drawn terminal card
    ctx.save();
    ctx.translate(cx - 60, 320);
    ctx.rotate(wob(t, 0.4) * 0.008);
    paint(ctx, rrPts(-330, -130, 660, 240, 14, 2), { wash: PAL.night, ink: PAL.ink, sw: 2 });
    for (const [i, c] of [PAL.rose, PAL.ochre, PAL.sap].entries()) {
      paint(ctx, ellPts(-300 + i * 24, -110, 6.5, 6.5, 10, 0.5), { wash: c as string, ink: null });
    }
    const lines: Array<[string, string, number]> = [
      ['POST /v1/systemone', PAL.sky, 0.5],
      ['state: "payouts failing, 3 days!!"', PAL.clayLt, 1.0],
      ['questions: { urgent, dept, anger }', mixCol(PAL.sky, PAL.cream, 0.4), 1.5],
      ['→ 200 OK · 71 ms', mixCol(PAL.sap, PAL.cream, 0.3), 2.1]
    ];
    lines.forEach(([txt, col, at], i) => {
      const pop = seg(lt, at, at + 0.35);
      if (pop > 0) letter(ctx, txt, -290, -62 + i * 40, 17, col, { mono: true, align: 'left', ink: false, alpha: pop });
    });
    ctx.restore();

    letter(ctx, '"state" + "questions" — that\'s the whole religion.', cx - 60, 508, 17, PAL.ink, { ink: false, alpha: 0.85 });

    clawd(ctx, cx + 400, G, 19, {
      t, eyes: 'look', lookX: -0.9, lookY: -0.5,
      mouth: talkClawd ? 'talk' : 'smile', talkT: t,
      emote: '?', emoteK: seg(lt, 2.6, 3.2) * 1.2, seed: 21
    });
    researcher(ctx, cx - 470, G, 9.8, { t, prop: 'pointer', mouth: talkRes ? 'talk' : 'smile', talkT: t, eyes: 'normal' });
  }

  else if (shot.id === 's4-2') {
    // ---- Three little judgment machines ----
    letter(ctx, 'THREE WAYS TO ASK A QUESTION', cx, 86, 42, PAL.ink, { pop: seg(lt, 0.2, 0.8) });

    const machines: Array<{ x: number; name: string; desc: string; col: string; at: number; icon: (ix: number, iy: number) => void }> = [
      {
        x: cx - 330, name: 'noul', desc: 'yes · no · + p', col: PAL.sap, at: 0.6,
        icon: (ix, iy) => {
          // toggle
          paint(ctx, rrPts(ix - 34, iy - 14, 68, 28, 14, 1), { ink: PAL.ink, sw: 1.4 });
          paint(ctx, ellPts(ix + 16, iy, 12, 12, 14, 0.5), { wash: PAL.sap, ink: PAL.ink, sw: 1.2 });
          letter(ctx, 'T', ix + 16, iy + 1, 13, PAL.cream, { ink: false });
        }
      },
      {
        x: cx, name: 'choice', desc: 'pick 1 of 255', col: PAL.sky, at: 1.1,
        icon: (ix, iy) => {
          inkLine(ctx, [[ix - 40, iy], [ix - 6, iy]], 2.4, PAL.ink, 0.2);
          inkLine(ctx, [[ix - 6, iy], [ix + 30, iy - 20]], 2.4, PAL.ink, 0.3);
          inkLine(ctx, [[ix - 6, iy], [ix + 30, iy + 20]], 2.4, PAL.ink, 0.3);
          paint(ctx, ellPts(ix - 44, iy, 7, 7, 10, 0.5), { wash: PAL.sky, ink: PAL.ink, sw: 1 });
          paint(ctx, ellPts(ix + 36, iy - 23, 7, 7, 10, 0.5), { wash: PAL.sky, ink: PAL.ink, sw: 1 });
          paint(ctx, ellPts(ix + 36, iy + 23, 7, 7, 10, 0.5), { wash: PAL.sky, ink: PAL.ink, sw: 1 });
        }
      },
      {
        x: cx + 330, name: 'score', desc: 'rank 2 – 10 rungs', col: PAL.rose, at: 1.6,
        icon: (ix, iy) => {
          for (let rI = 0; rI < 4; rI++) {
            paint(ctx, rectPts(ix - 44 + rI * 9, iy + 20 - rI * 13, 88 - rI * 18, 9, 0.4), { wash: rI === 2 ? PAL.rose : mixCol(PAL.cream, PAL.rose, 0.3 + rI * 0.1), ink: PAL.ink, sw: 0.8 });
          }
        }
      }
    ];

    machines.forEach((m, i) => {
      const pop = seg(lt, m.at, m.at + 0.5);
      ctx.save();
      ctx.translate(m.x, 350);
      ctx.scale(Math.max(0.001, pop), Math.max(0.001, pop));
      blob(ctx, 0, 8, 96, m.col, { alpha: 0.3, seed: 73 + i });
      paint(ctx, rrPts(-118, -92, 236, 184, 14, 2), { wash: PAL.cream, ink: PAL.ink, sw: 1.5 });
      m.icon(0, -34);
      letter(ctx, m.name, 0, 30, 26, m.col, {});
      letter(ctx, m.desc, 0, 62, 15, PAL.ink, { ink: false, alpha: 0.85 });
      ctx.restore();
    });

    clawd(ctx, cx, G, 17, {
      t, eyes: 'spark', mouth: talkClawd ? 'talk' : 'grin', talkT: t,
      aL: 1.0, aR: 1.0, dy: Math.abs(wob(t, 0.85)) * -0.15, seed: 22
    });
  }

  else if (shot.id === 's4-3') {
    // ---- NOUL: the snapping lever ----
    letter(ctx, 'NOUL: "IS THIS AN OUTAGE?"', cx, 88, 40, PAL.ink, { pop: seg(lt, 0.2, 0.8) });

    // machine base
    const mx = cx - 60, my = 360;
    blob(ctx, mx, my, 170, PAL.sap, { alpha: 0.16, seed: 74 });
    paint(ctx, rrPts(mx - 260, my - 90, 520, 168, 18, 2), { wash: PAL.cream, ink: PAL.ink, sw: 1.8 });
    letter(ctx, 'noul', mx, my - 118, 24, PAL.teal, {});

    // FALSE / TRUE posts
    letter(ctx, 'FALSE', mx - 170, my + 6, 19, PAL.rose, { ink: false, alpha: 0.85 });
    letter(ctx, 'TRUE', mx + 150, my - 36, 21, PAL.sap, {});

    // lever snapping at 1.4s with elastic overshoot
    const lever = kf(lt, [[0, -0.62], [1.4, -0.62], [1.55, 0.62], [1.9, 0.58]], v => v);
    const snapD = lt > 1.4 && lt < 2.6 ? wob(t, 9) * (1 - seg(lt, 1.4, 2.6)) * 0.06 : 0;
    ctx.save();
    ctx.translate(mx - 40, my + 34);
    ctx.rotate(lever + snapD);
    paint(ctx, rectPts(-8, -118, 16, 112, 1.4), { wash: PAL.clayDk, ink: PAL.ink, sw: 1.6 });
    paint(ctx, ellPts(0, -128, 22, 22, 16, 0.8), { wash: PAL.rose, ink: PAL.ink, sw: 1.6 });
    ctx.restore();
    paint(ctx, ellPts(mx - 40, my + 34, 26, 12, 16, 0.8), { wash: PAL.night, ink: PAL.ink, sw: 1.4 });

    // probability gauge
    const gx = mx + 300, gy = my - 30;
    paint(ctx, ellPts(gx, gy, 66, 66, 22, 1.4), { wash: PAL.cream, ink: PAL.ink, sw: 1.4 });
    ctx.save();
    ctx.beginPath();
    ctx.arc(gx, gy, 48, Math.PI, Math.PI * (1 + 0.984 * kf(lt, [[0, 0], [1.5, 0], [2.2, 1]])));
    ctx.strokeStyle = PAL.sap; ctx.lineWidth = 9; ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();
    letter(ctx, 'p', gx, gy - 8, 15, PAL.ink, { mono: true, ink: false });
    letter(ctx, kf(lt, [[0, 0], [1.5, 0], [2.2, 0.984]]).toFixed(3), gx, gy + 14, 16, PAL.teal, { mono: true, ink: false });

    sfx(ctx, 'TRUE!', mx + 90, my - 120, 40, PAL.sap, lt - 1.45, { life: 2.2 });

    clawd(ctx, cx - 420, G, 18.5, {
      t, eyes: lt > 1.45 ? 'happy' : 'look', lookX: 0.8, lookY: -0.5,
      mouth: lt > 1.45 ? 'grin' : (talkClawd ? 'talk' : 'o'), talkT: t,
      aR: lt < 1.45 ? 1.2 : 0.4, aL: 0.3, seed: 23
    });
    researcher(ctx, cx + 440, G, 9.6, { t, eyes: 'happy', mouth: talkRes ? 'talk' : 'smile', talkT: t });
  }

  else {
    // ---- CHOICE rails + SCORE stairs ----
    letter(ctx, 'CHOICE ROUTES. SCORE RANKS.', cx, 86, 40, PAL.ink, { pop: seg(lt, 0.2, 0.8) });

    // railway switch (left half)
    const jx = cx - 380, jy = 350;
    inkLine(ctx, [[60, jy], [jx - 60, jy]], 3, PAL.ink, 0.4);
    const branches: Array<[number, string, string, number]> = [
      [-0.22, 'billing', '#94%', 0.94],
      [0, 'technical', '5%', 0.05],
      [0.22, 'sales', '1%', 0.01]
    ];
    const branchCols = [PAL.teal, mixCol(PAL.cream, PAL.ink, 0.35), mixCol(PAL.cream, PAL.ink, 0.25)];
    branches.forEach(([dyy, name, ptext, p], i) => {
      const ey = jy + dyy * 260;
      inkLine(ctx, [[jx - 60, jy], [jx + 130, (jy + ey) / 2], [jx + 330, ey]], i === 0 ? 3.4 : 1.8, i === 0 ? PAL.ink : branchCols[i], 0.5);
      const pop = seg(lt, 0.5 + i * 0.35, 0.9 + i * 0.35);
      if (p > 0.001 || pop > 0.5) {
        letter(ctx, name, jx + 240, ey - 26, 16, i === 0 ? PAL.teal : branchCols[i], { alpha: pop });
        letter(ctx, ptext, jx + 240, ey - 6, 16, i === 0 ? PAL.clayDk : branchCols[i], { mono: true, alpha: pop, ink: false });
      }
    });

    // cart rolling the billing branch
    const cartK = seg(frac((lt / 3.4)), 0.02, 0.94);
    const cartX = 60 + cartK * (jx + 270 - 60);
    const cartY = cartX < jx - 60 ? jy : jy - 0.22 * 260 * seg(cartX, jx - 60, jx + 330);
    paint(ctx, rectPts(cartX - 24, cartY - 30, 48, 24, 1), { wash: PAL.rose, ink: PAL.ink, sw: 1.2 });
    for (const wxx of [-12, 12]) paint(ctx, ellPts(cartX + wxx, cartY - 4, 6, 6, 10, 0.5), { wash: PAL.ink, ink: null });

    // score staircase (right half)
    const stx = cx + 220, sty = 520;
    const rungs = ['calm', 'miffed', 'angry', 'FURIOUS', 'legal action'];
    for (let rI = 0; rI < 5; rI++) {
      const hot = rI === 3;
      const hotG = hot ? 1 + (lt > 1.2 ? wob(t, 5) * 0.05 : 0) : 1;
      ctx.save();
      ctx.translate(stx, sty - rI * 62);
      ctx.scale(hotG, hotG);
      const col = hot ? PAL.rose : mixCol(PAL.cream, PAL.rose, 0.18 + rI * 0.12);
      paint(ctx, rectPts(-74 - rI * 26, -26, 148 + rI * 52, 44, 1), { wash: col, ink: PAL.ink, sw: 1.2 });
      letter(ctx, `${rI + 1} · ${rungs[rI]}`, -rI * 0 + (hot ? 0 : 0), -4, hot ? 17 : 14, hot ? PAL.cream : PAL.ink, { ink: false });
      if (hot) letter(ctx, '★', -74 - rI * 26 - 30, -4, 22, PAL.ochre, { pop: seg(lt, 1.2, 1.6) });
      ctx.restore();
    }
    letter(ctx, 'score: 4/5, monotone rungs', stx, 130, 17, PAL.teal, { pop: seg(lt, 1.6, 2.1) });

    clawd(ctx, cx - 60, G, 17.5, {
      t, eyes: 'happy', mouth: talkClawd ? 'talk' : 'grin', talkT: t,
      aL: 0.4, aR: 1.0, walk: seg(lt, 0, 4) * 1.4, seed: 24
    });
  }
}
