import { RenderContext } from '../../types/video';
import { PAL, paper, ground, blob, paint, inkLine, rectPts, ellPts, rrPts, letter, sfx, kf, wob, seg, frac, mixCol } from '../painter';
import { clawd, researcher } from '../characters';

// Chapter 6 — the error cascade, alarm-rose mood.
export function renderChapter6(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2;
  const G = 600;
  const lt = t - shot.startTime;

  paper(ctx, W, H, '#EAD3C4');
  blob(ctx, W * 0.15, H * 0.25, 200, PAL.rose, { alpha: 0.15, seed: 91 });
  blob(ctx, W * 0.85, H * 0.75, 230, PAL.indigo, { alpha: 0.12, seed: 92 });
  ground(ctx, W, G + 8, PAL.rose);

  const talkClawd = speaking && shot.speaker === 'Clawd';
  const talkRes = speaking && shot.speaker === 'Engineer';

  if (shot.id === 's6-1') {
    // ---- The decision factory ----
    letter(ctx, 'WHEN A DECISION COSTS NOTHING,', cx, 86, 38, PAL.ink, { pop: seg(lt, 0.2, 0.8) });
    letter(ctx, 'YOU BUILD A FACTORY.', cx, 136, 46, PAL.clayDk, { pop: seg(lt, 0.9, 1.5) });

    // conveyor belt
    const beltY = 430;
    inkLine(ctx, [[40, beltY], [W - 40, beltY]], 5, PAL.ink, 0.05);
    for (let rx = 80; rx < W - 60; rx += 88) {
      paint(ctx, ellPts(rx, beltY + 16, 11, 11, 12, 0.8), { wash: PAL.night, ink: PAL.ink, sw: 1 });
      ctx.save();
      ctx.translate(rx, beltY + 16);
      ctx.rotate(t * 6);
      inkLine(ctx, [[-8, 0], [8, 0]], 1.4, PAL.cream, 0);
      ctx.restore();
    }

    // packets rolling through
    for (let i = 0; i < 7; i++) {
      const px = frac(lt / 3 + i / 7) * (W - 80) + 40;
      ctx.save();
      ctx.translate(px, beltY - 22);
      paint(ctx, rectPts(-20, -14, 40, 28, 0.8), { wash: mixCol(PAL.cream, PAL.sky, 0.4), ink: PAL.ink, sw: 1.1 });
      // stamp mark after passing the stamp
      if (px > cx) letter(ctx, '✓', 0, 1, 15, PAL.teal, { ink: false, alpha: 0.9 });
      ctx.restore();
    }

    // stamping arm slamming
    const slam = Math.max(0, Math.sin(lt * Math.PI * 2 / 0.62));
    ctx.save();
    ctx.translate(cx, beltY - 170);
    ctx.translate(0, slam * 90);
    paint(ctx, rectPts(-40, -20, 80, 26, 1.2), { wash: PAL.rose, ink: PAL.ink, sw: 1.4 });
    inkLine(ctx, [[0, -20], [0, -64]], 5, PAL.ink, 0.05);
    letter(ctx, 'APPROVED', 0, -6.5, 12, PAL.cream, { ink: false, mono: true });
    ctx.restore();
    if (slam > 0.86) blob(ctx, cx, beltY - 48, 46, PAL.ochre, { alpha: 0.4, seed: 93 + Math.floor(lt / 0.62) });

    letter(ctx, 'STAMP · STAMP · STAMP · STAMP', cx, 300, 18, PAL.ink, { alpha: 0.8 });
    researcher(ctx, cx - 320, G, 9.6, { t, eyes: 'wide', mouth: talkRes ? 'talk' : 'o', talkT: t });
    clawd(ctx, cx + 330, G, 16.5, { t, eyes: 'look', lookX: -0.6, mouth: 'o', dy: Math.abs(wob(t, 1.1)) * -0.1, seed: 41 });
  }

  else if (shot.id === 's6-2') {
    // ---- Clawd plugs Jev into everything ----
    letter(ctx, 'SO CLAWD PLUGS IT IN… EVERYWHERE.', cx, 86, 38, PAL.ink, { pop: seg(lt, 0.2, 0.8) });

    const sockets: Array<{ x: number; y: number; name: string; at: number; draw: (ix: number, iy: number) => void }> = [
      {
        x: cx - 330, y: 360, name: 'DB TRIGGER', at: 0.6,
        draw: (ix, iy) => {
          for (const dyy of [-16, 6, 28]) paint(ctx, ellPts(ix, iy + dyy, 44, 13, 18, 1), { wash: mixCol(PAL.cream, PAL.indigo, 0.35), ink: PAL.ink, sw: 1.1 });
          paint(ctx, rectPts(ix - 44, iy - 16, 88, 44, 1), { wash: mixCol(PAL.cream, PAL.indigo, 0.35), ink: null });
          inkLine(ctx, [[ix - 44, iy - 16], [ix - 44, iy + 28]], 1.2, PAL.ink, 0);
          inkLine(ctx, [[ix + 44, iy - 16], [ix + 44, iy + 28]], 1.2, PAL.ink, 0);
        }
      },
      {
        x: cx, y: 310, name: 'EDGE PROXY', at: 1.1,
        draw: (ix, iy) => {
          paint(ctx, rectPts(ix - 52, iy - 40, 104, 80, 2.5), { wash: PAL.night, ink: PAL.ink, sw: 1.3 });
          for (let r = 0; r < 3; r++) {
            paint(ctx, rectPts(ix - 42, iy - 30 + r * 24, 84, 16, 0.6), { wash: PAL.indigo, ink: null });
            paint(ctx, ellPts(ix + 30, iy - 22 + r * 24, 3.5, 3.5, 8, 0.3), { wash: Math.sin(t * 6 + r * 2) > 0 ? PAL.sap : PAL.teal, ink: null });
          }
        }
      },
      {
        x: cx + 330, y: 360, name: 'COMMIT HOOK', at: 1.6,
        draw: (ix, iy) => {
          paint(ctx, ellPts(ix, iy - 2, 40, 40, 20, 1), { wash: PAL.cream, ink: PAL.ink, sw: 1.3 });
          paint(ctx, [[ix, iy + 38], [ix - 16, iy + 70], [ix - 6, iy + 38]], { wash: PAL.cream, ink: PAL.ink, sw: 1.1, curv: 0.3 });
          paint(ctx, [[ix, iy + 38], [ix + 16, iy + 70], [ix + 6, iy + 38]], { wash: PAL.cream, ink: PAL.ink, sw: 1.1, curv: 0.3 });
          paint(ctx, ellPts(ix, iy - 2, 16, 16, 14, 0.5), { wash: PAL.night, ink: null });
          paint(ctx, ellPts(ix, iy - 70, 11, 11, 12, 0.5), { wash: PAL.night, ink: PAL.cream, sw: 1.6 });
          inkLine(ctx, [[ix, iy - 59], [ix, iy - 20]], 2, PAL.night, 0);
        }
      }
    ];

    sockets.forEach((s, i) => {
      const pop = seg(lt, s.at, s.at + 0.45);
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.scale(Math.max(0.001, pop), Math.max(0.001, pop));
      blob(ctx, 0, 10, 90, PAL.teal, { alpha: 0.16, seed: 95 + i });
      s.draw(0, 0);
      // Jev chip slot
      paint(ctx, rrPts(-26, 52, 52, 20, 6, 0.6), { wash: PAL.teal, ink: PAL.ink, sw: 1.1 });
      letter(ctx, 'JEV', 0, 62, 12, PAL.cream, { ink: false });
      letter(ctx, s.name, 0, 96, 16, PAL.ink, { ink: false, alpha: 0.9 });
      ctx.restore();
      // wiggly cable to the chip
      inkLine(ctx, [[s.x, s.y + 122], [s.x + wob(t + i * 7, 1.2) * 12, s.y + 165], [cx - 80 + i * 30, G - 40]], 2, mixCol(PAL.cream, PAL.ink, 0.5), 0.5);
      sfx(ctx, 'CLICK!', s.x + 70, s.y + 30, 22, PAL.teal, lt - s.at - 0.3, { life: 1.4 });
    });

    // Clawd hopping between sockets with a plug
    const hopX = kf(lt, [[0, cx - 200], [1.1, cx - 320], [1.9, cx - 60], [2.4, cx + 40], [3.8, cx + 320], [5, cx + 250]]);
    clawd(ctx, hopX, G, 17, {
      t, hat: 'band', eyes: 'happy', mouth: talkClawd ? 'talk' : 'grin', talkT: t,
      walk: seg(lt, 0, 5) * 1.1, aR: 1.0, seed: 42
    });
    researcher(ctx, cx + 480, G, 9.2, { t, eyes: 'wide', mouth: 'o', lookX: -0.5 });
  }

  else if (shot.id === 's6-3') {
    // ---- The odometer spins out of control ----
    letter(ctx, 'DECISIONS PER DAY:', cx, 110, 40, PAL.ink, { pop: seg(lt, 0.2, 0.8) });

    const count = Math.floor(kf(lt, [[0, 1200000], [6.6, 500000000]], v => Math.pow(v, 3)));
    ctx.save();
    ctx.translate(cx, 300);
    paint(ctx, rrPts(-300, -80, 600, 160, 16, 2), { wash: PAL.night, ink: PAL.ink, sw: 2.2 });
    // steam venting
    for (const vent of [-1, 1]) {
      const vAge = frac(lt / 1.4);
      blob(ctx, vent * 330, -20 - vAge * 90, 34 + vAge * 30, PAL.sky, { alpha: 0.4 - vAge * 0.34, seed: 97 + (vent + 1) });
    }
    // digit window
    paint(ctx, rrPts(-260, -48, 520, 92, 8, 1.2), { wash: PAL.cream, ink: PAL.ink, sw: 1.5 });
    const numStr = count.toLocaleString('en-US');
    const wobScale = lt < 6.2 ? 1 + wob(t, 8) * 0.012 : 1;
    ctx.save();
    ctx.translate(0, 0);
    ctx.scale(wobScale, wobScale);
    letter(ctx, numStr, 0, 2, 46, PAL.rose, { mono: true, ink: false });
    ctx.restore();
    ctx.restore();

    sfx(ctx, 'SPINNING!', cx + 260, 150, 26, PAL.rose, frac(lt / 1.6) * 1.6, { life: 1.6 });

    clawd(ctx, cx - 300, G, 19, {
      t, eyes: 'scared', mouth: 'wobble', emote: '!!', emoteK: seg(lt, 2.2, 3) * 1.4,
      aL: 1.25, aR: 1.25, sq: 0.06 + wob(t, 2.4) * 0.04, seed: 43
    });
    researcher(ctx, cx + 300, G, 10, { t, eyes: 'wide', mouth: talkRes ? 'talk' : 'o', talkT: t, prop: 'none' });
  }

  else {
    // ---- 2% × 500M = the cascade, and the firebreak ----
    letter(ctx, 'NOW DO THE ARITHMETIC.', cx, 84, 44, PAL.ink, { pop: seg(lt, 0.2, 0.8) });

    // banner math
    ctx.save();
    ctx.translate(cx, 190);
    paint(ctx, rrPts(-340, -46, 680, 92, 12, 2), { wash: PAL.rose, ink: PAL.ink, sw: 1.8 });
    letter(ctx, '2% ERROR × 500M CALLS = 10,000,000 OOPS/DAY', 0, 2, 22, PAL.cream, { pop: seg(lt, 0.6, 1.2) });
    ctx.restore();

    // dominoes toppling
    const domsX = [cx - 380, cx - 300, cx - 220];
    domsX.forEach((dx, i) => {
      const fall = kf(lt, [[1.6 + i * 0.32, 0], [2.15 + i * 0.32, 1.25]], v => v);
      ctx.save();
      ctx.translate(dx, 440);
      ctx.rotate(fall);
      paint(ctx, rectPts(-10, -86, 20, 86, 1), { wash: i === 2 ? PAL.rose : PAL.night, ink: PAL.ink, sw: 1.2 });
      ctx.restore();
    });
    sfx(ctx, 'thunk', cx - 260, 380, 20, PAL.ink, lt - 2.1, { life: 1.2 });

    // the firebreak card
    ctx.save();
    ctx.translate(cx + 250, 430);
    const pop = seg(lt, 2.6, 3.3);
    ctx.scale(Math.max(0.001, pop), Math.max(0.001, pop));
    blob(ctx, 0, 0, 130, PAL.teal, { alpha: 0.2, seed: 99 });
    paint(ctx, rrPts(-190, -72, 380, 144, 14, 2), { wash: PAL.cream, ink: PAL.teal, sw: 2 });
    letter(ctx, 'THE CIRCUIT BREAKER', 0, -44, 18, PAL.teal, {});
    letter(ctx, 'if p < 0.85 →', 0, -8, 17, PAL.ink, { mono: true, ink: false });
    letter(ctx, 'wake SYSTEM 2', 0, 20, 19, PAL.violet, { mono: true, ink: false });
    letter(ctx, 'calibration > accuracy', 0, 52, 13, PAL.ink, { ink: false, alpha: 0.8 });
    ctx.restore();

    researcher(ctx, cx - 60, G, 10.2, {
      t, prop: 'pointer', eyes: talkRes ? 'happy' : 'normal',
      mouth: talkRes ? 'talk' : 'smile', talkT: t
    });
    clawd(ctx, cx - 200, G, 16.5, {
      t, eyes: lt > 3 ? 'closed' : 'scared', mouth: lt > 3 ? 'smile' : 'wobble',
      emote: lt > 3 ? 'heart' : 'sweat', emoteK: 1, seed: 44
    });
  }
}
