import { RenderContext } from '../../types/video';
import { PAL, paper, ground, blob, paint, inkLine, rectPts, ellPts, rrPts, letter, sfx, kf, wob, seg, frac, mixCol } from '../painter';
import { clawd, researcher, steamEngine, ClawdOpts } from '../characters';

// The economist as a Clawd in a top hat + monocle, holding "The Coal Question".
function jevons(ctx: CanvasRenderingContext2D, x: number, y: number, u: number, t: number, talking: boolean) {
  const o: ClawdOpts = {
    t, hat: 'top', monocle: true,
    eyes: talking ? 'normal' : 'happy',
    mouth: talking ? 'talk' : 'smile', talkT: t,
    aL: talking ? 0.9 + wob(t, 1.1) * 0.25 : 0.35, aR: 0.35,
    col: PAL.clay, dk: PAL.clayDk
  };
  clawd(ctx, x, y, u, o);
  // ledger book in right hand
  ctx.save();
  ctx.translate(x + u * 6.4, y - u * 4.1);
  ctx.rotate(-0.35);
  paint(ctx, rectPts(-1.5 * u, -2.2 * u, 3 * u, 4.4 * u, 0.4), { wash: PAL.clayDk, ink: PAL.ink, sw: 1 });
  paint(ctx, rectPts(-1.5 * u, -2.2 * u, 0.9 * u, 4.4 * u, 0.2), { wash: PAL.night, ink: PAL.ink, sw: 0.8 });
  ctx.font = `500 ${u * 0.8}px "Fira Code", monospace`;
  ctx.fillStyle = PAL.ochre; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.save(); ctx.rotate(Math.PI / 2); ctx.fillText('COAL', 0, 0.35 * u); ctx.restore();
  ctx.restore();
}

// Chapter 2 — sepia watercolor of 1865.
export function renderChapter2(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2;
  const G = 600;
  const lt = t - shot.startTime;

  paper(ctx, W, H, '#E4CDA0');
  ground(ctx, W, G + 8, mixCol(PAL.clayDk, PAL.ink, 0.2));

  const talkClawd = speaking && shot.speaker === 'Clawd';
  const talkJev = speaking && shot.speaker === 'Jevons';

  // victorian skyline helper
  const skyline = (alpha: number) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = mixCol(PAL.paper, PAL.ink, 0.55);
    const hs = [95, 130, 88, 150, 105, 78, 122, 92, 140, 96];
    for (let i = 0; i < 10; i++) {
      const bx = i * 140 - 20, bh = hs[i];
      ctx.fillRect(bx, G - bh - 14, 96, bh);
    }
    // chimneys
    ctx.fillRect(180, G - 200, 20, 90);
    ctx.fillRect(760, G - 225, 20, 116);
    ctx.restore();
    blob(ctx, 196, G - 218, 30, mixCol(PAL.paper, PAL.ink, 0.4), { alpha: 0.3, seed: 31 });
    blob(ctx, 776, G - 244, 38, mixCol(PAL.paper, PAL.ink, 0.4), { alpha: 0.32, seed: 32 });
  };

  if (shot.id === 's2-1') {
    skyline(0.5);
    letter(ctx, 'ENGLAND, 1865', cx, 96, 52, PAL.clayDk, { pop: seg(lt, 0.2, 0.9) });
    letter(ctx, '"THE COAL QUESTION"', cx, 152, 26, PAL.ink, { pop: seg(lt, 0.9, 1.4), alpha: 0.9 });

    // steam engine rolls in from the right
    const ex = kf(lt, [[0, W + 300], [1.9, cx + 190], [5.4, cx + 120]]);
    steamEngine(ctx, ex, G - 6, 1.55, t);
    sfx(ctx, 'CHUFF!', ex - 90, G - 210, 26, PAL.sky, frac(lt / 1.1) * 1.1, { life: 1.1 });

    jevons(ctx, cx - 250, G, 19, t, talkJev);
    clawd(ctx, cx - 430, G, 14.5, {
      t, eyes: 'spark', mouth: 'o', aL: 0.6, aR: 0.15,
      dy: wob(t, 0.7) * 0.05, seed: 7
    });
  }

  else if (shot.id === 's2-2') {
    skyline(0.35);
    letter(ctx, '"MORE EFFICIENT COAL…', cx, 92, 42, PAL.ink, { pop: seg(lt, 0.15, 0.7) });
    letter(ctx, '…SO WE\'LL BURN LESS!"', cx, 144, 42, PAL.ink, { pop: seg(lt, 0.4, 0.95) });

    // balance scale: tiny lump vs avalanche
    const sx = cx - 40, sy = 380;
    paint(ctx, rectPts(sx - 8, sy, 16, 130, 1), { wash: PAL.night, ink: PAL.ink, sw: 1.2 });
    paint(ctx, rectPts(sx - 90, sy + 126, 180, 14, 1.5), { wash: PAL.clayDk, ink: PAL.ink, sw: 1.2 });

    const tilt = kf(lt, [[0, 0.02], [1.6, 0.02], [3.2, -0.3], [4.2, -0.26]], v => v);
    ctx.save();
    ctx.translate(sx, sy + 8);
    ctx.rotate(tilt);
    inkLine(ctx, [[-150, 0], [150, 0]], 4, PAL.ink, 0.05);
    // chains + pans
    for (const side of [-1, 1]) {
      inkLine(ctx, [[side * 140, 0], [side * 140, 44]], 1.4, PAL.ink, 0.2);
      paint(ctx, ellPts(side * 140, 56, 56, 14, 18, 1), { fill: PAL.clayDk, fillOp: 190, bleed: 0.15, tex: 0.5, ink: PAL.ink, sw: 1.1 });
    }
    // coals
    const coal = (cxn: number, cyn: number, r: number) => {
      paint(ctx, ellPts(cxn, cyn, r, r * 0.72, 12, 2), { wash: PAL.night, ink: PAL.ink, sw: 1 });
    };
    // left pan: one polite lump
    coal(-140, 40, 17);
    // right pan: avalanche
    coal(96, 34, 22); coal(136, 30, 24); coal(178, 36, 20);
    coal(116, 6, 20); coal(158, 2, 22); coal(138, -22, 18);
    ctx.restore();

    letter(ctx, 'EXPECTED ½', sx - 140, sy + 190, 17, PAL.ink, { alpha: 0.8, mono: false });
    sfx(ctx, '×10 COAL!', sx + 180, sy + 170, 34, PAL.rose, lt - 3.4, { life: 3.4 });

    jevons(ctx, cx + 380, G, 18, t, talkJev);
    clawd(ctx, cx - 380, G, 15, { t, eyes: 'scared', mouth: 'O', emote: '!?', emoteK: seg(lt, 3.4, 4.2) * 1.4, aL: 1.2, aR: 1.2, seed: 5 });
  }

  else if (shot.id === 's2-3') {
    letter(ctx, 'CHEAP POWER FOUND NEW JOBS.', cx, 92, 42, PAL.clayDk, { pop: seg(lt, 0.2, 0.8) });

    // three "new market" cards on a rail line
    const cards: Array<{ x: number; y: number; name: string; col: string; icon: (cxn: number, cyn: number) => void }> = [
      {
        x: cx - 320, y: 330, name: 'TEXTILE LOOMS', col: PAL.rose,
        icon: (ix, iy) => {
          paint(ctx, rectPts(ix - 22, iy - 16, 44, 32, 1), { ink: PAL.ink, sw: 1.2 });
          for (let g = 0; g < 4; g++) inkLine(ctx, [[ix - 22, iy - 8 + g * 8], [ix + 22, iy - 8 + g * 8]], 1, PAL.ink, 0);
        }
      },
      {
        x: cx, y: 300, name: 'STEAMSHIPS', col: PAL.sky,
        icon: (ix, iy) => {
          paint(ctx, [[ix - 26, iy + 12], [ix + 26, iy + 12], [ix + 18, iy - 2], [ix - 18, iy - 2]], { wash: PAL.night, ink: PAL.ink, sw: 1.1, curv: 0.2 });
          paint(ctx, [[ix, iy - 2], [ix, iy - 22], [ix + 16, iy - 6]], { wash: PAL.cream, ink: PAL.ink, sw: 1, curv: 0.2 });
        }
      },
      {
        x: cx + 320, y: 330, name: 'DEEP MINES', col: PAL.ochre,
        icon: (ix, iy) => {
          paint(ctx, ellPts(ix, iy + 4, 24, 14, 16, 1), { wash: PAL.clayDk, ink: PAL.ink, sw: 1.1 });
          inkLine(ctx, [[ix - 10, iy - 14], [ix - 2, iy - 4]], 1.6, PAL.ink, 0.2);
          inkLine(ctx, [[ix - 10, iy - 4], [ix - 2, iy - 14]], 1.6, PAL.ink, 0.2);
        }
      }
    ];

    // rails connecting
    inkLine(ctx, [[60, 560], [cx, 520], [W - 60, 560]], 2.4, PAL.ink, 0.6);
    inkLine(ctx, [[60, 576], [cx, 536], [W - 60, 576]], 2.4, PAL.clayDk, 0.6);

    cards.forEach((c, i) => {
      const pop = seg(lt, 0.5 + i * 0.5, 1.1 + i * 0.5);
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.scale(Math.max(0.001, pop), Math.max(0.001, pop));
      blob(ctx, 0, 4, 74, c.col, { alpha: 0.3, seed: 41 + i });
      paint(ctx, rrPts(-96, -52, 192, 104, 12, 2), { wash: PAL.cream, ink: PAL.ink, sw: 1.4 });
      c.icon(0, -10);
      letter(ctx, c.name, 0, 34, 15, PAL.ink, { ink: false, alpha: 0.9 });
      ctx.restore();
    });

    // little train trundling along the rails
    const tx = kf(lt, [[0.8, -140], [7, W + 140]], v => v);
    steamEngine(ctx, tx, G - 4, 0.9, t);

    sfx(ctx, '+1000% DEMAND', cx, 188, 34, PAL.rose, seg(lt, 2.2, 2.8) * 3, { life: 4 });
    jevons(ctx, cx + 500, G, 15, t, talkJev);
  }

  else {
    // ---- The naming: JEV ----
    blob(ctx, cx, 330, 240, PAL.teal, { alpha: 0.14, seed: 55 });
    letter(ctx, '…SO THEY NAMED IT AFTER HIM.', cx, 88, 40, PAL.ink, { pop: seg(lt, 0.2, 0.8) });

    // stone tablet with JEV carved
    ctx.save();
    ctx.translate(cx - 60, 340);
    ctx.rotate(wob(t, 0.5) * 0.015);
    paint(ctx, rrPts(-150, -110, 300, 220, 18, 3), { fill: mixCol(PAL.cream, PAL.teal, 0.35), fillOp: 235, bleed: 0.08, tex: 0.75, border: 0.6, ink: PAL.ink, sw: 2.2 });
    letter(ctx, 'JEV', 0, -20, 92, PAL.teal, { pop: seg(lt, 1.0, 1.9) });
    letter(ctx, 'after W. S. Jevons', 0, 62, 19, PAL.ink, { ink: false, alpha: 0.85, pop: seg(lt, 1.8, 2.4) });
    ctx.restore();

    // price card
    ctx.save();
    ctx.translate(cx + 330, 340);
    paint(ctx, rrPts(-132, -92, 264, 184, 12, 2), { wash: PAL.cream, ink: PAL.ink, sw: 1.5 });
    letter(ctx, 'THE $ WAR', 0, -66, 18, PAL.clayDk, { ink: false });
    letter(ctx, 'LLM  $3.00 /1M · 8.8s', 0, -30, 14.5, PAL.rose, { mono: true, alpha: 0.95 });
    letter(ctx, 'JEV  $0.042 /1M · 70ms', 0, 0, 14.5, PAL.teal, { mono: true });
    letter(ctx, 'output tokens: free', 0, 32, 14, PAL.teal, { mono: true, alpha: 0.9 });
    letter(ctx, '×100 CHEAPER', 0, 66, 17, PAL.rose, { ink: false });
    ctx.restore();
    sfx(ctx, '↑ CALL IT EVERYWHERE', cx + 330, 178, 22, PAL.clayDk, seg(lt, 2.4, 3) * 2.5, { life: 4.5 });

    // Clawd with rubber stamp
    const stampK = Math.max(0, Math.sin(lt * 4.4)) * (lt > 0.8 && lt < 1.9 ? 1 : 0.2);
    clawd(ctx, cx - 340, G, 18, {
      t, eyes: 'happy', mouth: talkClawd ? 'talk' : 'grin', talkT: t,
      aR: 1.1 - stampK * 0.55, aL: 0.3, emote: 'spark', emoteK: seg(lt, 1.2, 2) * 1.3, seed: 8
    });
    researcher(ctx, cx - 500, G, 9.4, { t, eyes: 'happy', mouth: 'smile', lookX: 0.4 });
  }
}
