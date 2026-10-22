import { RenderContext } from '../../types/video';
import {
  PAL, paper, ground, blob, paint, inkLine, rectPts, ellPts, rrPts, starPts,
  letter, sfx, kf, wob, seg, frac, hash, mixCol, arrow, TAU
} from '../painter';
import {
  UB, pin, pinDrop, person, car, phone, skyline, streetGrid,
  surgeBadge, official, growthCurve
} from '../uberCast';

const G = 600; // road line

function snow(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, n = 90) {
  for (let i = 0; i < n; i++) {
    const sx = (hash(i * 3.1) * W + t * (10 + hash(i) * 26)) % W;
    const sy = (hash(i * 7.7) * H + t * (22 + hash(i * 2) * 40)) % H;
    const r = 1.3 + hash(i * 5.5) * 2.4;
    paint(ctx, ellPts(sx, sy, r, r, 7, 0.3), { wash: PAL.cream, washOp: 140 + hash(i * 9) * 90, ink: null });
  }
}

function card(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, col = PAL.cream, ink = PAL.ink) {
  paint(ctx, rrPts(x - w / 2, y - h / 2, w, h, 12, 1.6), { wash: col, ink, sw: 1.6 });
}

export function renderUber(n: number, rc: RenderContext) {
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

// ------------------------------------------------------------------ ACT 1
function act1(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2, lt = t - shot.startTime;
  const talkR = speaking && shot.speaker === 'Rider';

  if (shot.id === 'ub1-1') {
    // --- snowy Paris night ---
    paper(ctx, W, H, '#AFC0D6');
    paint(ctx, rectPts(-40, -40, W + 80, H * 0.72, 4), { fill: PAL.night, fillOp: 205, bleed: 0.06, tex: 0.5, ink: null });
    skyline(ctx, W, 470, 4, mixCol(PAL.night, PAL.cream, 0.14), 0.85, 0.9);
    ground(ctx, W, G + 8, PAL.night);
    paint(ctx, rectPts(-30, G + 6, W + 60, H - G, 4), { fill: PAL.cream, fillOp: 70, bleed: 0.2, tex: 0.5, ink: null });

    // street lamps
    for (const lx of [cx - 420, cx + 330]) {
      inkLine(ctx, [[lx, G], [lx, 300]], 4, mixCol(PAL.night, PAL.cream, 0.3), 0);
      blob(ctx, lx, 292, 46, UB.lemon, { alpha: 0.4, seed: lx });
      paint(ctx, ellPts(lx, 292, 12, 12, 12, 0.6), { wash: UB.lemon, ink: PAL.ink, sw: 1 });
    }

    letter(ctx, 'PARIS · DECEMBER 2008', cx, 92, 30, PAL.cream, { pop: seg(lt, 0.2, 0.9) });

    // taxis sailing past, lights off
    for (let i = 0; i < 3; i++) {
      const p = frac(lt / 3.4 + i / 3);
      car(ctx, -200 + p * (W + 400), G - 4, 34, { t, taxi: true, roll: p * 40, headlights: true });
    }

    // two founders hailing
    person(ctx, cx - 110, G, 11, { t, arm: kf(lt, [[0, 1.3], [1.2, 2.3], [2.4, 1.3]], v => v), mood: 'annoyed', coat: '#2A3550' });
    person(ctx, cx - 10, G, 10.6, { t, arm: kf(lt, [[0.4, 2.2], [1.8, 1.2], [3.2, 2.2]], v => v), mood: 'annoyed', coat: '#45324A' });
    snow(ctx, W, H, t, 110);
    letter(ctx, 'no cab. no app. no idea when.', cx, 540, 19, PAL.cream, { pop: seg(lt, 3.6, 4.8), alpha: 0.95 });
  }

  else if (shot.id === 'ub1-2') {
    paper(ctx, W, H, '#CBD6E4');
    skyline(ctx, W, 440, 9, UB.haze, 0.5, 0.75);
    ground(ctx, W, G + 8, UB.slate);
    letter(ctx, 'ONE BUTTON', cx, 86, 46, PAL.ink, { pop: seg(lt, 0.15, 0.8) });

    // hand dissolves into phone
    const morph = seg(lt, 0.8, 2.4);
    ctx.save();
    ctx.globalAlpha = 1 - morph;
    person(ctx, cx - 300, G, 11.5, { t, arm: 2.2, mood: 'normal', coat: '#2A3550' });
    ctx.restore();
    ctx.save();
    ctx.globalAlpha = morph;
    person(ctx, cx - 300, G, 11.5, { t, phone: true, mood: 'happy', talk: talkR, talkT: t, coat: '#2A3550' });
    ctx.restore();

    phone(ctx, cx + 30, 330, 150, { kind: 'request', t, k: seg(lt, 2.2, 5), label: 'ride requested' });

    // the pin drops onto the kerb
    pinDrop(ctx, cx + 300, G, 34, seg(lt, 2.6, 4.2), { t, face: 'happy', seed: 2 });
    sfx(ctx, 'TAP', cx + 30, 170, 34, UB.signal, lt - 2.0, { life: 1.6 });
    letter(ctx, 'a car comes to where you are standing', cx, 548, 20, UB.jet, { pop: seg(lt, 4.4, 5.6) });
  }

  else if (shot.id === 'ub1-3') {
    paper(ctx, W, H, '#D5DEE8');
    skyline(ctx, W, 430, 2, UB.haze, 0.45, 0.8);
    ground(ctx, W, G + 8, UB.slate);
    letter(ctx, 'SAN FRANCISCO · JULY 2010', cx, 86, 30, PAL.ink, { pop: seg(lt, 0.15, 0.8) });

    phone(ctx, cx - 250, 350, 230, {
      kind: 'eta', t, k: seg(lt, 0.6, 5.2),
      label: 'arriving in', value: `${Math.max(1, Math.ceil(5 - seg(lt, 0.6, 5.2) * 4))} min`
    });

    // the real car crawling the real street
    const dk = seg(lt, 0.6, 5.6);
    inkLine(ctx, [[cx + 80, G - 6], [W - 60, G - 6]], 3, UB.haze, 0);
    car(ctx, W - 80 - dk * (W - 400), G - 6, 40, { t, flip: true, beacon: 0.9, driver: true, roll: -dk * 44 });
    pin(ctx, cx + 110, G - 6, 30, { t, face: dk > 0.8 ? 'happy' : 'normal', seed: 5 });

    letter(ctx, 'UberCab', cx + 300, 170, 36, UB.jet, { pop: seg(lt, 1.2, 2) });
    letter(ctx, 'watching it approach is the product', cx, 552, 19, UB.signal, { pop: seg(lt, 4.2, 5.4) });
  }

  else {
    paper(ctx, W, H, '#D9E3EA');
    skyline(ctx, W, 440, 14, UB.haze, 0.38, 0.72);
    ground(ctx, W, G + 8, UB.slate);
    letter(ctx, 'THE QUIET INVENTION', cx, 84, 32, PAL.ink, { pop: seg(lt, 0.15, 0.8) });

    phone(ctx, cx - 300, 340, 190, { kind: 'eta', t, k: 1, label: 'trip complete', value: '$18.40' });
    car(ctx, cx + 20, G - 4, 44, { t, beacon: 0.5, driver: true, roll: 0 });
    person(ctx, cx + 175, G, 10, { t, mood: 'happy', phone: true, coat: '#45324A', talk: talkR, talkT: t });

    // stored card token becomes a receipt without cash changing hands
    const pay = seg(lt, 1.5, 3.2);
    ctx.save();
    ctx.translate(cx + 360, 250);
    paint(ctx, rrPts(-100, -56, 200, 112, 12, 1.4), { wash: UB.jet, ink: PAL.ink, sw: 1.5 });
    letter(ctx, '••••  4242', 0, -10, 18, PAL.cream, { mono: true, ink: false });
    letter(ctx, 'CARD ON FILE', 0, 24, 13, UB.haze, { ink: false });
    ctx.restore();
    if (pay > 0) {
      arrow(ctx, cx + 360, 320, cx + 360, 390, UB.mint, 2.4);
      ctx.save(); ctx.globalAlpha = pay;
      card(ctx, cx + 360, 455, 250, 116, PAL.cream);
      letter(ctx, 'RECEIPT', cx + 360, 422, 15, PAL.ink, { ink: false });
      letter(ctx, '$18.40', cx + 360, 456, 27, UB.mint, { mono: true, ink: false });
      letter(ctx, 'paid automatically', cx + 360, 486, 14, PAL.ink, { ink: false, alpha: 0.8 });
      ctx.restore();
    }

    pin(ctx, cx - 55, G, 26, { t, face: 'happy', seed: 8 });
    letter(ctx, 'no cash · no swipe · no meter argument', cx, 552, 18, UB.signal, { pop: seg(lt, 4.0, 5.2) });
  }
}

// ------------------------------------------------------------------ ACT 2
function act2(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2, lt = t - shot.startTime;
  paper(ctx, W, H, '#D7E6DB');
  blob(ctx, W * 0.18, H * 0.26, 200, UB.mint, { alpha: 0.14, seed: 31 });
  ground(ctx, W, G + 8, UB.mint);
  const talkD = speaking && shot.speaker === 'Driver';
  const talkR = speaking && shot.speaker === 'Rider';

  if (shot.id === 'ub2-1') {
    letter(ctx, '2012 · UberX', cx, 86, 38, PAL.ink, { pop: seg(lt, 0.15, 0.8) });
    car(ctx, cx - 260, G - 4, 48, { t, col: UB.jet, driver: true, roll: t * 2 });
    letter(ctx, 'BLACK CAR', cx - 260, 476, 17, UB.jet, { ink: false, alpha: 0.9 });
    const arrive = seg(lt, 0.9, 2.2);
    if (arrive > 0) {
      ctx.save(); ctx.globalAlpha = arrive;
      car(ctx, cx + 240 - (1 - arrive) * 260, G - 4, 44, { t, col: '#9FB3C8', driver: true, beacon: 0.7, roll: t * 2.4 });
      ctx.restore();
      letter(ctx, 'ANYONE WITH A CAR', cx + 240, 476, 17, UB.mint, { ink: false, alpha: arrive });
    }
    // falling price tag
    const drop = seg(lt, 2.4, 4);
    card(ctx, cx + 240, 250 + drop * 70, 150, 64, PAL.cream);
    letter(ctx, drop > 0.5 ? '−40%' : '$$$', cx + 240, 250 + drop * 70, 26, drop > 0.5 ? UB.mint : UB.jet, { ink: false });
    pin(ctx, cx, G, 26, { t, face: 'happy', seed: 11, aL: 0.6, aR: 0.6 });
    letter(ctx, 'the constraint was never demand', cx, 552, 19, UB.jet, { pop: seg(lt, 4.2, 5.4) });
  }

  else if (shot.id === 'ub2-2') {
    letter(ctx, 'THE FLYWHEEL', cx, 84, 40, PAL.ink, { pop: seg(lt, 0.15, 0.8) });
    const fx = cx, fy = 340, R = 165;
    const spin = lt * 0.7;
    const ring: Array<[number, number]> = [];
    for (let i = 0; i <= 48; i++) { const a = (i / 48) * TAU; ring.push([fx + Math.cos(a) * R, fy + Math.sin(a) * R * 0.8]); }
    inkLine(ctx, ring, 3.2, UB.mint, 0.5);
    const nodes: Array<[string, string]> = [
      ['more drivers', UB.jet], ['shorter wait', UB.signal],
      ['more riders', UB.mint], ['more earnings', UB.lemon]
    ];
    nodes.forEach(([lab, col], i) => {
      const a = (i / 4) * TAU - Math.PI / 2 + spin;
      const nx = fx + Math.cos(a) * R, ny = fy + Math.sin(a) * R * 0.8;
      const hot = seg(lt, 0.4 + i * 0.7, 0.9 + i * 0.7);
      card(ctx, nx, ny, 150, 54, mixCol(PAL.cream, col, 0.25 + hot * 0.2));
      letter(ctx, lab, nx, ny, 15, PAL.ink, { ink: false });
    });
    // accelerating arrows
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * TAU - Math.PI / 2 + spin + 0.45;
      arrow(ctx, fx + Math.cos(a) * R * 1.06, fy + Math.sin(a) * R * 0.86,
        fx + Math.cos(a + 0.2) * R * 1.06, fy + Math.sin(a + 0.2) * R * 0.86, UB.mint, 2.4);
    }
    letter(ctx, 'it closes', fx, fy, 22, UB.mint, { ink: false, alpha: 0.9 });
    person(ctx, cx - 430, G, 10, { t, mood: 'happy', coat: UB.slate, talk: talkD, talkT: t });
    pin(ctx, cx + 430, G, 26, { t, face: 'star', seed: 12 });
  }

  else if (shot.id === 'ub2-3') {
    paper(ctx, W, H, '#E7D5CF');
    ground(ctx, W, G + 8, UB.surge);
    letter(ctx, 'WHEN DEMAND OUTRUNS SUPPLY', cx, 84, 30, PAL.ink, { pop: seg(lt, 0.15, 0.8) });
    // rain
    for (let i = 0; i < 70; i++) {
      const rx = (hash(i * 3.7) * W + t * 60) % W;
      const ry = (hash(i * 9.1) * H + t * 420) % H;
      inkLine(ctx, [[rx, ry], [rx - 5, ry + 18]], 1.3, mixCol(UB.haze, PAL.cream, 0.4), 0);
    }
    surgeBadge(ctx, cx, 250, 62, '2.4x', t);
    // riders walking away
    for (let i = 0; i < 2; i++) {
      const away = seg(lt, 1.6 + i * 0.5, 4.2 + i * 0.5);
      person(ctx, cx - 180 - away * 230, G, 10, { t, flip: true, mood: 'annoyed', coat: ['#45324A', '#2A3550'][i] });
    }
    // drivers converging
    for (let i = 0; i < 3; i++) {
      const come = seg(lt, 1.2 + i * 0.45, 4.6 + i * 0.45);
      car(ctx, W + 160 - come * (W * 0.52 + 160 - i * 90), G - 4, 34, { t, flip: true, beacon: 0.9, roll: -come * 40 });
    }
    letter(ctx, 'demand falls  ·  supply arrives', cx, 548, 19, UB.surge, { pop: seg(lt, 4.4, 5.6) });
  }

  else {
    letter(ctx, 'BOTH SIDES RATE EACH OTHER', cx, 84, 32, PAL.ink, { pop: seg(lt, 0.15, 0.8) });
    phone(ctx, cx - 210, 330, 150, { kind: 'rating', t, k: seg(lt, 0.8, 3.4), label: 'rate your driver' });
    phone(ctx, cx + 210, 330, 150, { kind: 'rating', t, k: seg(lt, 1.4, 4.0), label: 'rate your rider' });
    arrow(ctx, cx - 110, 300, cx + 110, 300, UB.lemon, 2.4);
    arrow(ctx, cx + 110, 360, cx - 110, 360, UB.lemon, 2.4);
    person(ctx, cx - 400, G, 10.4, { t, mood: 'happy', phone: true, coat: '#45324A', talk: talkR, talkT: t });
    car(ctx, cx + 380, G - 4, 40, { t, driver: true, beacon: 0.5 });
    letter(ctx, 'reputation replaces the medallion', cx, 552, 19, UB.jet, { pop: seg(lt, 4.2, 5.4) });
  }
}

// ------------------------------------------------------------------ ACT 3
function act3(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2, lt = t - shot.startTime;
  paper(ctx, W, H, '#F0E3C4');
  const talkO = speaking && shot.speaker === 'Official';
  const talkD = speaking && shot.speaker === 'Driver';

  if (shot.id === 'ub3-1') {
    blob(ctx, cx, 330, 300, UB.lemon, { alpha: 0.14, seed: 41 });
    letter(ctx, lt < 3.7 ? 'THE FIRST NOTICE' : 'LAUNCH, THEN ARGUE', cx, 82, 36, PAL.ink, { pop: seg(lt, 0.15, 0.8) });

    // The actual song puts "cease and desist" here, immediately before the
    // expansion lyric, so the notice and rename happen before the map fills.
    const noticeFade = 1 - seg(lt, 3.0, 4.1);
    if (noticeFade > 0) {
      ctx.save(); ctx.globalAlpha = noticeFade;
      const slam = kf(lt, [[0, -220], [0.7, 0], [0.9, -12], [1.05, 0]], v => v);
      ctx.translate(cx - 240, 330 + slam);
      paint(ctx, rectPts(-142, -98, 284, 196, 2), { wash: PAL.cream, ink: PAL.ink, sw: 1.8 });
      for (let i = 0; i < 6; i++) inkLine(ctx, [[-110, -62 + i * 23], [110 - (i % 3) * 42, -62 + i * 23]], 1.2, mixCol(PAL.cream, PAL.ink, 0.5), 0.1);
      if (lt > 0.9) {
        ctx.save(); ctx.rotate(-0.18);
        paint(ctx, rectPts(-130, -32, 260, 64, 2), { ink: UB.surge, sw: 4 });
        letter(ctx, 'CEASE & DESIST', 0, 0, 23, UB.surge, { ink: false });
        ctx.restore();
      }
      ctx.restore();

      ctx.save(); ctx.globalAlpha = noticeFade;
      ctx.translate(cx + 260, 315);
      card(ctx, 0, 0, 300, 108, UB.jet, PAL.ink);
      const cut = seg(lt, 1.6, 2.7);
      letter(ctx, 'UBER', -42, 0, 41, PAL.cream, { ink: false });
      ctx.save(); ctx.globalAlpha = 1 - cut * 0.76;
      letter(ctx, 'CAB', 73, 0, 41, mixCol(PAL.cream, UB.surge, cut), { ink: false });
      ctx.restore();
      if (cut > 0.05) inkLine(ctx, [[24, 6], [24 + 106 * cut, -8]], 5, UB.surge, 0.1);
      ctx.restore();
    }

    const mapFade = seg(lt, 2.8, 4.0);
    ctx.save(); ctx.globalAlpha = mapFade;
    // rough world map blocks
    const land: Array<[number, number, number, number]> = [
      [cx - 420, 230, 180, 120], [cx - 250, 210, 90, 70], [cx - 180, 300, 150, 150],
      [cx - 20, 215, 120, 95], [cx + 90, 240, 210, 130], [cx + 250, 370, 120, 80], [cx + 60, 360, 80, 60]
    ];
    land.forEach(([lx, ly, lw, lh], i) => {
      paint(ctx, rrPts(lx, ly, lw, lh, 22, 3), { fill: mixCol(PAL.cream, UB.slate, 0.3), fillOp: 220, bleed: 0.1, tex: 0.5, ink: PAL.ink, sw: 1.2 });
      void i;
    });
    // raining pins
    const N = 26;
    let landed = 0;
    for (let i = 0; i < N; i++) {
      const k = seg(lt, 3.2 + i * 0.12, 3.8 + i * 0.12);
      if (k <= 0) continue;
      if (k >= 0.7) landed++;
      const px = cx - 400 + hash(i * 7.3) * 800;
      const py = 250 + hash(i * 3.9) * 190;
      pinDrop(ctx, px, py, 13, k, { t, face: 'happy', seed: i, noShadow: false });
    }
    card(ctx, cx + 420, 150, 220, 86);
    letter(ctx, 'CITIES LIVE', cx + 420, 128, 15, PAL.ink, { ink: false, alpha: 0.85 });
    letter(ctx, String(Math.floor(landed * 16)), cx + 420, 162, 32, UB.lemon, { ink: false });
    sfx(ctx, 'LAUNCH!', cx - 330, 180, 26, UB.mint, lt - 3.2, { life: 3.8 });
    ctx.restore();
  }

  else if (shot.id === 'ub3-2') {
    ground(ctx, W, G + 8, UB.lemon);
    letter(ctx, 'THE CITIES PUSH BACK', cx, 84, 34, PAL.ink, { pop: seg(lt, 0.15, 0.8) });
    // taxi blockade
    for (let i = 0; i < 4; i++) {
      car(ctx, cx - 420 + i * 190, G - 4, 36, { t, taxi: true, roll: 0, headlights: false });
    }
    // placards
    for (let i = 0; i < 3; i++) {
      const px = cx - 330 + i * 230, sway = wob(t + i, 0.6) * 0.06;
      ctx.save(); ctx.translate(px, 300); ctx.rotate(sway);
      inkLine(ctx, [[0, 0], [0, 150]], 4, PAL.clayDk, 0);
      card(ctx, 0, -30, 160, 74, PAL.cream);
      letter(ctx, ['NOT A TAXI?', 'LICENCE IT', 'SAME RULES'][i], 0, -30, 15, UB.surge, { ink: false });
      ctx.restore();
    }
    official(ctx, cx + 400, G, 10, t, talkO);
    // pin ducking behind a lamppost
    inkLine(ctx, [[cx + 180, G], [cx + 180, 330]], 5, UB.slate, 0);
    pin(ctx, cx + 180, G, 24, { t, face: 'worried', emote: '!', emoteK: seg(lt, 1.6, 2.4), seed: 15 });
    letter(ctx, 'banned here · negotiated there · still going', cx, 552, 18, PAL.ink, { pop: seg(lt, 4.4, 5.6), alpha: 0.9 });
  }

  else if (shot.id === 'ub3-3') {
    letter(ctx, 'GROWTH, BOUGHT', cx, 84, 36, PAL.ink, { pop: seg(lt, 0.15, 0.8) });
    growthCurve(ctx, cx - 430, 470, 420, 300, seg(lt, 0.4, 4.4), UB.lemon, 2.4);
    letter(ctx, 'gross bookings', cx - 220, 510, 16, PAL.ink, { ink: false, alpha: 0.85 });
    // the bucket
    const bx = cx + 250, by = 430;
    paint(ctx, [[bx - 110, by - 130], [bx + 110, by - 130], [bx + 80, by + 60], [bx - 80, by + 60]], {
      wash: PAL.cream, ink: PAL.ink, sw: 2
    });
    const fill = seg(lt, 0.8, 4.6);
    const fy = by + 60 - fill * 186;
    paint(ctx, [[bx - 80 - fill * 28, fy], [bx + 80 + fill * 28, fy], [bx + 80, by + 60], [bx - 80, by + 60]], {
      fill: UB.surge, fillOp: 215, bleed: 0.12, tex: 0.6, border: 0.4, ink: null
    });
    if (fill > 0.85) {
      for (let i = 0; i < 4; i++) {
        const sp = frac(lt / 1.1 + i / 4);
        paint(ctx, ellPts(bx - 100 + i * 66, by - 120 + sp * 180, 7, 11, 10, 0.5), { wash: UB.surge, ink: null, alpha: 1 - sp });
      }
    }
    letter(ctx, 'cash out', bx, by + 96, 17, UB.surge, { ink: false });
    person(ctx, cx - 480, G, 9.6, { t, mood: 'tired', coat: UB.slate, talk: talkD, talkT: t });
    letter(ctx, 'subsidies buy the market and burn the balance sheet', cx, 556, 18, PAL.ink, { pop: seg(lt, 5, 6.4), alpha: 0.9 });
  }

  else {
    paper(ctx, W, H, '#E9D2C6');
    letter(ctx, 'CHINA · AUGUST 2016', cx, 84, 32, PAL.ink, { pop: seg(lt, 0.15, 0.8) });
    blob(ctx, cx, 330, 250, UB.surge, { alpha: 0.18, seed: 44 });
    paint(ctx, rrPts(cx - 230, 190, 460, 290, 26, 3), {
      fill: mixCol(PAL.cream, UB.surge, 0.3), fillOp: 230, bleed: 0.1, tex: 0.55, border: 0.4, ink: PAL.ink, sw: 2
    });
    letter(ctx, '中国', cx, 300, 64, UB.surge, { pop: seg(lt, 0.5, 1.4) });
    letter(ctx, '≈ $1B / year', cx, 376, 24, PAL.ink, { pop: seg(lt, 1.6, 2.4), ink: false });
    letter(ctx, 'burned', cx, 408, 16, PAL.ink, { ink: false, alpha: 0.8 });

    // handover
    const give = seg(lt, 2.8, 4.4);
    pin(ctx, cx - 330, G, 30, { t, face: give > 0.5 ? 'closed' : 'worried', aR: 0.4 + give * 0.9, seed: 17 });
    person(ctx, cx + 330, G, 10.4, { t, flip: true, mood: 'happy', coat: '#B5423A', arm: 0.5 + give * 0.9 });
    if (give > 0.1) {
      const kx = cx - 280 + give * 560;
      paint(ctx, rectPts(kx - 16, 470, 32, 14, 0.6), { wash: UB.lemon, ink: PAL.ink, sw: 1 });
      paint(ctx, ellPts(kx - 20, 477, 9, 9, 10, 0.4), { ink: PAL.ink, sw: 1.4 });
    }
    const certK = seg(lt, 4.4, 5.6);
    if (certK > 0) {
      ctx.save(); ctx.globalAlpha = certK;
      card(ctx, cx - 330, 300, 190, 110, PAL.cream);
      letter(ctx, '≈20%', cx - 330, 288, 30, UB.mint, { ink: false });
      letter(ctx, 'of Didi', cx - 330, 322, 15, PAL.ink, { ink: false, alpha: 0.85 });
      ctx.restore();
    }
    letter(ctx, 'the first time growth-at-all-costs lost an argument', cx, 556, 18, PAL.ink, { pop: seg(lt, 5.6, 7), alpha: 0.9 });
  }
}

// ------------------------------------------------------------------ ACT 4
function act4(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2, lt = t - shot.startTime;
  paper(ctx, W, H, '#EBD2CE');
  blob(ctx, W * 0.8, H * 0.28, 210, UB.surge, { alpha: 0.13, seed: 51 });
  ground(ctx, W, G + 8, UB.surge);
  const talkR = speaking && shot.speaker === 'Rider';
  const talkO = speaking && shot.speaker === 'Official';

  if (shot.id === 'ub4-1') {
    letter(ctx, 'FEBRUARY 2017', cx, 84, 32, PAL.ink, { pop: seg(lt, 0.15, 0.8) });
    // one page multiplying
    const N = 40;
    for (let i = 0; i < N; i++) {
      const k = seg(lt, 0.9 + i * 0.07, 1.5 + i * 0.07);
      if (k <= 0) continue;
      const a = hash(i * 7) * TAU;
      const r = k * (120 + hash(i * 3) * 420);
      const px = cx + Math.cos(a) * r, py = 330 + Math.sin(a) * r * 0.62;
      ctx.save(); ctx.translate(px, py); ctx.rotate((hash(i * 11) - 0.5) * 0.5); ctx.globalAlpha = 0.5 + 0.5 * (1 - k);
      paint(ctx, rectPts(-26, -34, 52, 68, 1), { wash: PAL.cream, ink: PAL.ink, sw: 0.9 });
      for (let l = 0; l < 5; l++) inkLine(ctx, [[-18, -22 + l * 11], [18 - (l % 2) * 10, -22 + l * 11]], 0.9, mixCol(PAL.cream, PAL.ink, 0.55), 0);
      ctx.restore();
    }
    // the original page, lit
    blob(ctx, cx, 330, 120, UB.lemon, { alpha: 0.35, seed: 52 });
    paint(ctx, rectPts(cx - 72, 236, 144, 188, 1.6), { wash: PAL.cream, ink: PAL.ink, sw: 2 });
    for (let l = 0; l < 9; l++) inkLine(ctx, [[cx - 54, 262 + l * 18], [cx + 54 - (l % 3) * 22, 262 + l * 18]], 1.1, mixCol(PAL.cream, PAL.ink, 0.5), 0);
    letter(ctx, 'one engineer. one essay.', cx, 500, 21, PAL.ink, { pop: seg(lt, 3.2, 4.4) });
    letter(ctx, '215 claims reviewed · 20 people fired', cx, 540, 16, UB.surge, { pop: seg(lt, 4.6, 5.8), ink: false });
  }

  else if (shot.id === 'ub4-2') {
    letter(ctx, '#DELETEUBER', cx, 84, 40, UB.surge, { pop: seg(lt, 0.15, 0.8) });
    // grid of phones losing their icon
    for (let r = 0; r < 3; r++) for (let c = 0; c < 7; c++) {
      const i = r * 7 + c;
      const gone = seg(lt, 0.8 + i * 0.1, 1.3 + i * 0.1);
      const px = cx - 400 + c * 134, py = 250 + r * 120;
      paint(ctx, rrPts(px - 30, py - 50, 60, 100, 9, 1), { wash: UB.jet, ink: PAL.ink, sw: 1.1 });
      paint(ctx, rrPts(px - 24, py - 42, 48, 84, 6, 0.8), { wash: PAL.cream, ink: null });
      if (gone < 1) {
        ctx.save();
        ctx.globalAlpha = 1 - gone;
        const shake = gone > 0.1 ? Math.sin(lt * 40 + i) * 3 * gone : 0;
        paint(ctx, rrPts(px - 15 + shake, py - 18, 30, 30, 7, 0.6), { wash: UB.jet, ink: PAL.ink, sw: 0.9 });
        letter(ctx, 'U', px + shake, py - 3, 19, PAL.cream, { ink: false });
        ctx.restore();
      }
    }
    person(ctx, cx - 480, G, 10, { t, mood: 'annoyed', phone: true, coat: '#45324A', talk: talkR, talkT: t });
    letter(ctx, 'in a two-sided market, trust is inventory', cx, 556, 19, PAL.ink, { pop: seg(lt, 4, 5.4) });
  }

  else if (shot.id === 'ub4-3') {
    letter(ctx, 'JUNE 2017', cx, 84, 32, PAL.ink, { pop: seg(lt, 0.15, 0.8) });
    // glass boardroom
    paint(ctx, rrPts(cx - 330, 180, 660, 330, 14, 2.5), { fill: mixCol(PAL.cream, UB.haze, 0.5), fillOp: 150, bleed: 0.08, tex: 0.4, ink: PAL.ink, sw: 2 });
    for (let i = 1; i < 4; i++) inkLine(ctx, [[cx - 330 + i * 165, 180], [cx - 330 + i * 165, 510]], 1.4, mixCol(PAL.cream, UB.haze, 0.2), 0);
    // table + empty chair
    paint(ctx, ellPts(cx, 430, 230, 46, 24, 2), { wash: mixCol(PAL.clayDk, PAL.cream, 0.4), ink: PAL.ink, sw: 1.6 });
    const chairK = seg(lt, 1.4, 2.6);
    ctx.save();
    ctx.translate(cx, 372);
    ctx.globalAlpha = 1 - chairK * 0.55;
    paint(ctx, rrPts(-42, -96, 84, 96, 12, 1.4), { wash: UB.jet, ink: PAL.ink, sw: 1.5 });
    paint(ctx, rectPts(-44, -6, 88, 14, 1), { wash: UB.slate, ink: PAL.ink, sw: 1.2 });
    ctx.restore();
    if (chairK > 0.4) letter(ctx, 'vacant', cx, 300, 20, UB.surge, { pop: (chairK - 0.4) / 0.6 });
    official(ctx, cx - 250, G, 9.4, t, talkO);
    pin(ctx, cx + 250, G, 28, { t, face: 'sad', seed: 18 });
    letter(ctx, 'never back down — built it, then broke it', cx, 556, 18, PAL.ink, { pop: seg(lt, 3.6, 5), alpha: 0.9 });
  }

  else {
    paper(ctx, W, H, '#DEE6DA');
    ground(ctx, W, G + 8, UB.mint);
    letter(ctx, 'AUGUST 2017 · A NEW BRIEF', cx, 84, 30, PAL.ink, { pop: seg(lt, 0.15, 0.8) });
    // new CEO walks in and hangs the sign
    const walk = seg(lt, 0.4, 2.4);
    person(ctx, -120 + walk * (cx - 160), G, 11, { t, mood: 'normal', coat: '#2F4858', arm: 0.3 + walk * 0.9 });
    const hang = seg(lt, 2.6, 4.2);
    if (hang > 0) {
      ctx.save();
      ctx.translate(cx + 150, 200 + (1 - hang) * -120);
      ctx.rotate(wob(t, 0.5) * 0.02);
      ctx.globalAlpha = hang;
      inkLine(ctx, [[-120, -40], [0, -92]], 2, PAL.ink, 0.2);
      inkLine(ctx, [[120, -40], [0, -92]], 2, PAL.ink, 0.2);
      card(ctx, 0, 60, 420, 150, PAL.cream);
      letter(ctx, 'WE DO THE RIGHT', 0, 24, 30, UB.jet, { ink: false });
      letter(ctx, 'THING. PERIOD.', 0, 70, 30, UB.jet, { ink: false });
      letter(ctx, 'cultural norms, 2017', 0, 112, 14, PAL.ink, { ink: false, alpha: 0.75 });
      ctx.restore();
    }
    pin(ctx, cx - 330, G, 30, {
      t, face: hang > 0.6 ? 'determined' : 'normal',
      dy: hang > 0.6 ? -0.1 : 0, seed: 19
    });
    letter(ctx, 'fix it — then make it boring', cx, 556, 19, UB.mint, { pop: seg(lt, 4.6, 5.8) });
  }
}

// ------------------------------------------------------------------ ACT 5
function act5(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2, lt = t - shot.startTime;
  const talkD = speaking && shot.speaker === 'Driver';
  const talkR = speaking && shot.speaker === 'Rider';
  const talkO = speaking && shot.speaker === 'Official';

  if (shot.id === 'ub5-1') {
    // --- the quiet one. no spectacle. ---
    paper(ctx, W, H, '#9BA6B8');
    paint(ctx, rectPts(-40, -40, W + 80, H + 80, 4), { fill: PAL.night, fillOp: 225, bleed: 0.05, tex: 0.5, ink: null });
    ground(ctx, W, G + 8, PAL.night);
    paint(ctx, rectPts(-30, G, W + 60, H - G, 3), { fill: mixCol(PAL.night, PAL.cream, 0.1), fillOp: 220, bleed: 0.1, tex: 0.4, ink: null });
    for (let dx = -40; dx < W; dx += 150) paint(ctx, rectPts(dx, G + 60, 76, 7, 1), { wash: mixCol(PAL.cream, PAL.night, 0.35), ink: null });

    letter(ctx, 'TEMPE, ARIZONA · MARCH 2018', cx, 92, 27, mixCol(PAL.cream, UB.haze, 0.3), { pop: seg(lt, 0.3, 1.2) });

    // sensor cone sweeping, then stopping
    const stop = seg(lt, 3.0, 3.4);
    const sweepT = stop > 0 ? 3.0 : lt;
    const ang = Math.sin(sweepT * 0.9) * 0.34;
    ctx.save();
    ctx.globalAlpha = 0.3 * (1 - stop * 0.6);
    ctx.translate(cx - 280, G - 40);
    ctx.rotate(ang);
    paint(ctx, [[0, 0], [420, -110], [420, 110]], { fill: UB.signal, fillOp: 90, bleed: 0.2, tex: 0.3, ink: null, curv: 0.1 });
    ctx.restore();
    car(ctx, cx - 300, G - 4, 42, { t: stop > 0 ? 3 : t, col: UB.slate, headlights: true, roll: stop > 0 ? 12 : lt * 4 });
    // sensor dome
    paint(ctx, ellPts(cx - 300, G - 78, 16, 10, 14, 0.5), { wash: UB.jet, ink: PAL.ink, sw: 1 });

    // the classification flicker, then nothing
    if (lt > 1.2 && stop < 1) {
      const labels = ['vehicle', 'pedestrian', 'bicycle', 'unknown'];
      const li = Math.floor(lt * 3) % labels.length;
      card(ctx, cx + 300, 280, 290, 86, mixCol(PAL.night, PAL.cream, 0.12), UB.signal);
      letter(ctx, 'classified as', cx + 300, 258, 14, UB.haze, { ink: false, alpha: 0.8 });
      letter(ctx, labels[li], cx + 300, 292, 24, UB.signal, { ink: false });
    }
    if (stop > 0.2) {
      ctx.save();
      ctx.globalAlpha = Math.min(1, (stop - 0.2) / 0.8);
      letter(ctx, 'a person was killed', cx, 470, 26, mixCol(PAL.cream, UB.surge, 0.5), {});
      letter(ctx, 'the self-driving programme stopped', cx, 510, 17, UB.haze, { ink: false, alpha: 0.9 });
      ctx.restore();
    }
  }

  else if (shot.id === 'ub5-2') {
    paper(ctx, W, H, '#DCE3EC');
    ground(ctx, W, G + 8, UB.slate);
    letter(ctx, 'NYSE · 10 MAY 2019', cx, 84, 30, PAL.ink, { pop: seg(lt, 0.15, 0.8) });
    // bell
    const ring = lt < 1.6 ? Math.sin(lt * 22) * 0.16 * (1 - lt / 1.6) : 0;
    ctx.save();
    ctx.translate(cx - 400, 230); ctx.rotate(ring);
    paint(ctx, [[-34, 60], [-24, -16], [24, -16], [34, 60]], { wash: UB.lemon, ink: PAL.ink, sw: 1.6, curv: 0.3 });
    paint(ctx, ellPts(0, 62, 38, 11, 14, 0.6), { wash: UB.lemon, ink: PAL.ink, sw: 1.4 });
    paint(ctx, ellPts(0, 76, 7, 9, 10, 0.4), { wash: PAL.ink, ink: null });
    ctx.restore();
    sfx(ctx, 'DING!', cx - 400, 150, 28, UB.lemon, lt - 0.3, { life: 1.6 });

    // chart that opens then slides
    const ox = cx - 60, oy = 470, w = 520, h = 250;
    inkLine(ctx, [[ox, oy], [ox + w, oy]], 2.2, PAL.ink, 0);
    inkLine(ctx, [[ox, oy], [ox, oy - h]], 2.2, PAL.ink, 0);
    const k = seg(lt, 1.4, 5.2);
    const pts: Array<[number, number]> = [];
    for (let i = 0; i <= 40; i++) {
      const p = (i / 40) * k;
      const y = oy - h * 0.72 + Math.pow(p, 1.3) * h * 0.34 + Math.sin(p * 22) * 7;
      pts.push([ox + 14 + p * (w - 30), y]);
    }
    if (pts.length > 1) inkLine(ctx, pts, 3.4, UB.surge, 0.2);
    inkLine(ctx, [[ox, oy - h * 0.72], [ox + w, oy - h * 0.72]], 1.6, mixCol(PAL.ink, PAL.cream, 0.5), 0);
    letter(ctx, '$45.00 open', ox + w - 60, oy - h * 0.72 - 18, 15, PAL.ink, { ink: false, alpha: 0.85 });
    if (k > 0.85) letter(ctx, '−7.6% day one', ox + w - 70, oy - h * 0.3, 20, UB.surge, { pop: (k - 0.85) / 0.15 });

    // premature confetti
    for (let i = 0; i < 24; i++) {
      const cp = frac(lt / 4 + hash(i * 3));
      const cxx = cx - 300 + hash(i * 7) * 900;
      ctx.save(); ctx.translate(cxx, -20 + cp * (H + 40)); ctx.rotate(cp * 9 + i);
      paint(ctx, rectPts(-6, -3, 12, 6, 0.4), { wash: [UB.lemon, UB.mint, UB.signal, PAL.rose][i % 4], ink: null, alpha: 0.75 });
      ctx.restore();
    }
    person(ctx, cx + 440, G, 10, { t, mood: 'tired', coat: UB.slate, talk: talkD, talkT: t });
  }

  else if (shot.id === 'ub5-3') {
    paper(ctx, W, H, '#CFD3D6');
    ground(ctx, W, G + 8, UB.haze);
    letter(ctx, '2020 · THE STREETS EMPTY', cx, 84, 30, PAL.ink, { pop: seg(lt, 0.15, 0.8) });
    // desaturated city
    skyline(ctx, W, 440, 6, mixCol(UB.haze, PAL.ink, 0.25), 0.45, 0.8);
    streetGrid(ctx, W, 440, G, t, mixCol(UB.haze, PAL.cream, 0.4), 7);

    // the two bars
    const k = seg(lt, 0.8, 5.4);
    const bw = 130;
    // rides down
    const rh = 230 * (1 - k * 0.82);
    paint(ctx, rectPts(cx - 250 - bw / 2, 470 - rh, bw, rh, 1.4), { wash: UB.jet, ink: PAL.ink, sw: 1.6 });
    letter(ctx, 'RIDES', cx - 250, 498, 17, PAL.ink, { ink: false });
    arrow(ctx, cx - 250, 470 - 240, cx - 250, 470 - rh + 16, UB.surge, 2.6);
    // eats up
    const eh = 60 + 320 * k;
    paint(ctx, rectPts(cx + 250 - bw / 2, 470 - eh, bw, eh, 1.4), { wash: UB.mint, ink: PAL.ink, sw: 1.6 });
    letter(ctx, 'EATS', cx + 250, 498, 17, PAL.ink, { ink: false });
    arrow(ctx, cx + 250, 470 - 60, cx + 250, 470 - eh - 16, UB.mint, 2.6);

    // courier bag crossing
    const cp = frac(lt / 3.2);
    person(ctx, -60 + cp * (W + 120), G, 9.4, { t, mood: 'normal', coat: UB.mint });
    pin(ctx, cx, G, 22, { t, face: 'worried', seed: 21, emote: '?', emoteK: seg(lt, 1.4, 2.2) });
    letter(ctx, 'the afterthought became the lifeline', cx, 556, 19, UB.mint, { pop: seg(lt, 5.4, 6.8) });
    void talkR;
  }

  else {
    paper(ctx, W, H, '#DCDCE8');
    ground(ctx, W, G + 8, UB.signal);
    letter(ctx, 'CALIFORNIA · NOVEMBER 2020', cx, 84, 28, PAL.ink, { pop: seg(lt, 0.15, 0.8) });
    // two doors
    const doors: Array<[number, string, string]> = [
      [cx - 230, 'EMPLOYEE', UB.signal],
      [cx + 230, 'CONTRACTOR', UB.mint]
    ];
    doors.forEach(([dx, lab, col], i) => {
      const chosen = i === 1 && lt > 3.2;
      paint(ctx, rrPts((dx as number) - 110, 210, 220, 300, 10, 2), {
        wash: chosen ? mixCol(PAL.cream, col as string, 0.35) : PAL.cream, ink: PAL.ink, sw: 2
      });
      paint(ctx, ellPts((dx as number) + 76, 360, 9, 9, 10, 0.4), { wash: UB.jet, ink: null });
      letter(ctx, lab as string, dx as number, 300, 21, PAL.ink, { ink: false });
      if (chosen) {
        blob(ctx, dx as number, 360, 130, col as string, { alpha: 0.3, seed: 61 });
        letter(ctx, 'PASSED', dx as number, 420, 24, col as string, { pop: seg(lt, 3.2, 4) });
      }
    });
    // ballot box + travelling ballot
    paint(ctx, rrPts(cx - 70, 470, 140, 90, 8, 1.6), { wash: UB.jet, ink: PAL.ink, sw: 1.8 });
    paint(ctx, rectPts(cx - 38, 466, 76, 8, 0.6), { wash: PAL.cream, ink: PAL.ink, sw: 1 });
    const bk = seg(lt, 1.4, 3.2);
    if (bk > 0) {
      const bx2 = cx + bk * 230, by2 = 460 - Math.sin(bk * Math.PI) * 90;
      ctx.save(); ctx.translate(bx2, by2); ctx.rotate(bk * 1.6);
      paint(ctx, rectPts(-24, -16, 48, 32, 0.8), { wash: PAL.cream, ink: PAL.ink, sw: 1 });
      inkLine(ctx, [[-12, -4], [-2, 6], [14, -10]], 2.2, UB.mint, 0.2);
      ctx.restore();
    }
    official(ctx, cx - 470, G, 9.8, t, talkO);
    letter(ctx, 'still an open question nearly everywhere else', cx, 566, 18, PAL.ink, { pop: seg(lt, 4.6, 6), alpha: 0.9 });
  }
}

// ------------------------------------------------------------------ ACT 6
function act6(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2, lt = t - shot.startTime;
  paper(ctx, W, H, '#E0DAEC');
  blob(ctx, W * 0.2, H * 0.3, 210, PAL.violet, { alpha: 0.13, seed: 71 });
  ground(ctx, W, G + 8, PAL.violet);
  const talkD = speaking && shot.speaker === 'Driver';
  const talkR = speaking && shot.speaker === 'Rider';

  if (shot.id === 'ub6-1') {
    letter(ctx, 'ONE APP, MANY ERRANDS', cx, 84, 34, PAL.ink, { pop: seg(lt, 0.15, 0.8) });
    phone(ctx, cx - 300, 350, 240, { kind: 'blank', t });
    // four tiles painting themselves onto the screen
    const tiles: Array<[string, string, (x: number, y: number) => void]> = [
      ['Ride', UB.jet, (x, y) => car(ctx, x, y + 14, 15, { t, beacon: 0.5 })],
      ['Eats', UB.mint, (x, y) => { paint(ctx, rrPts(x - 20, y - 14, 40, 24, 5, 0.6), { wash: '#C4703C', ink: PAL.ink, sw: 0.9 }); paint(ctx, ellPts(x, y - 14, 20, 6, 14, 0.4), { wash: '#E0A063', ink: PAL.ink, sw: 0.7 }); }],
      ['Grocery', UB.lemon, (x, y) => { paint(ctx, [[x - 18, y - 12], [x + 18, y - 12], [x + 13, y + 14], [x - 13, y + 14]], { wash: '#C9A227', ink: PAL.ink, sw: 0.9 }); inkLine(ctx, [[x - 9, y - 12], [x - 9, y - 22]], 1.6, PAL.ink, 0.3); inkLine(ctx, [[x + 9, y - 12], [x + 9, y - 22]], 1.6, PAL.ink, 0.3); }],
      ['Parcel', UB.signal, (x, y) => { paint(ctx, rectPts(x - 17, y - 14, 34, 28, 0.8), { wash: '#B08968', ink: PAL.ink, sw: 1 }); inkLine(ctx, [[x, y - 14], [x, y + 14]], 1.6, PAL.cream, 0); }]
    ];
    tiles.forEach(([lab, col, draw], i) => {
      const k = seg(lt, 0.7 + i * 0.7, 1.3 + i * 0.7);
      if (k <= 0) return;
      const tx = cx - 300 + (i % 2 === 0 ? -52 : 52);
      const ty = 300 + Math.floor(i / 2) * 104;
      ctx.save(); ctx.translate(tx, ty); ctx.scale(k, k); ctx.translate(-tx, -ty);
      paint(ctx, rrPts(tx - 46, ty - 42, 92, 84, 10, 1), { wash: mixCol(PAL.cream, col, 0.2), ink: PAL.ink, sw: 1.1 });
      draw(tx, ty - 4);
      letter(ctx, lab, tx, ty + 30, 13, PAL.ink, { ink: false });
      ctx.restore();
    });
    card(ctx, cx + 300, 300, 330, 160);
    letter(ctx, 'SOLD', cx + 300, 258, 16, UB.surge, { ink: false });
    letter(ctx, 'self-driving · air taxis', cx + 300, 286, 15, PAL.ink, { ink: false, alpha: 0.85 });
    letter(ctx, 'KEPT', cx + 300, 322, 16, UB.mint, { ink: false });
    letter(ctx, 'mobility · delivery · freight', cx + 300, 350, 15, PAL.ink, { ink: false, alpha: 0.85 });
    pin(ctx, cx + 300, G, 26, { t, face: 'determined', seed: 23 });
  }

  else if (shot.id === 'ub6-2') {
    letter(ctx, 'MEMBERSHIP GLUES IT TOGETHER', cx, 84, 30, PAL.ink, { pop: seg(lt, 0.15, 0.8) });
    // card dropping in
    const drop = seg(lt, 0.5, 1.8);
    ctx.save();
    ctx.translate(cx, 250 - (1 - drop) * 220);
    ctx.rotate((1 - drop) * 0.4);
    ctx.globalAlpha = drop;
    paint(ctx, rrPts(-150, -48, 300, 96, 12, 1.6), { wash: UB.jet, ink: PAL.ink, sw: 2 });
    letter(ctx, 'ONE', -60, 0, 30, PAL.cream, { ink: false });
    paint(ctx, ellPts(66, 0, 26, 26, 14, 0.8), { wash: UB.mint, ink: null });
    ctx.restore();
    // four linked nodes
    const nodes: Array<[number, number, string]> = [
      [cx - 230, 430, 'rides'], [cx - 78, 470, 'eats'],
      [cx + 78, 470, 'grocery'], [cx + 230, 430, 'parcels']
    ];
    nodes.forEach(([nx, ny, lab], i) => {
      const k = seg(lt, 2.0 + i * 0.35, 2.6 + i * 0.35);
      if (k <= 0) return;
      card(ctx, nx, ny, 136, 56, mixCol(PAL.cream, PAL.violet, 0.18));
      letter(ctx, lab, nx, ny, 15, PAL.ink, { ink: false });
      inkLine(ctx, [[cx, 300], [nx, ny - 30]], 2 * k, UB.lemon, 0.4);
    });
    card(ctx, cx + 400, 180, 250, 112);
    letter(ctx, 'members', cx + 400, 148, 14, PAL.ink, { ink: false, alpha: 0.8 });
    letter(ctx, 'order more ▲', cx + 400, 176, 16, UB.mint, { ink: false });
    letter(ctx, 'churn less ▼', cx + 400, 204, 16, UB.mint, { ink: false });
    person(ctx, cx - 450, G, 10, { t, mood: 'happy', phone: true, coat: UB.slate, talk: talkD, talkT: t });
  }

  else if (shot.id === 'ub6-3') {
    letter(ctx, '2023 · THE ARITHMETIC TURNS', cx, 84, 30, PAL.ink, { pop: seg(lt, 0.15, 0.8) });
    const ox = cx - 400, oy = 360, w = 800, h = 190;
    inkLine(ctx, [[ox, oy], [ox + w, oy]], 2.6, PAL.ink, 0);
    letter(ctx, 'break-even', ox - 10, oy, 14, PAL.ink, { align: 'right', ink: false, alpha: 0.8, mono: true });
    const k = seg(lt, 0.5, 4.6);
    const pts: Array<[number, number]> = [];
    for (let i = 0; i <= 50; i++) {
      const p = (i / 50) * k;
      const y = oy + h * 0.55 * Math.sin(Math.min(1, p * 1.15) * Math.PI * 0.86) * (1 - p * 1.55);
      pts.push([ox + p * w, y]);
    }
    if (pts.length > 1) {
      const below = pts.filter(p => p[1] >= oy);
      const above = pts.filter(p => p[1] < oy);
      if (below.length > 1) inkLine(ctx, below, 3.6, UB.surge, 0.3);
      if (above.length > 1) inkLine(ctx, above, 3.6, UB.mint, 0.3);
    }
    if (k > 0.82) {
      const tip = pts[pts.length - 1];
      blob(ctx, tip[0], tip[1], 40, UB.mint, { alpha: 0.4, seed: 73 });
      letter(ctx, 'first full-year operating profit', tip[0] - 90, tip[1] - 46, 18, UB.mint, { pop: (k - 0.82) / 0.18 });
    }
    letter(ctx, 'fourteen years', cx - 330, 470, 19, UB.surge, { pop: seg(lt, 1.4, 2.4), alpha: 0.9 });
    letter(ctx, 'added to the S&P 500 · Dec 2023', cx + 230, 470, 17, PAL.ink, { pop: seg(lt, 4.6, 5.6), ink: false });
    pin(ctx, cx, G, 28, { t, face: k > 0.82 ? 'happy' : 'worried', emote: k > 0.82 ? 'spark' : null, emoteK: 1, seed: 24 });
  }

  else {
    letter(ctx, 'THE BUSINESS IS THE SPREAD', cx, 84, 32, PAL.ink, { pop: seg(lt, 0.15, 0.8) });
    card(ctx, cx, 330, 620, 280, PAL.cream);
    const rows: Array<[string, string, string]> = [
      ['gross bookings', '$193.5B', UB.jet],
      ['− driver & merchant earnings', '', UB.surge],
      ['= revenue', '$52.0B', UB.mint]
    ];
    rows.forEach(([lab, val, col], i) => {
      const k = seg(lt, 0.7 + i * 0.9, 1.3 + i * 0.9);
      if (k <= 0) return;
      const ry = 250 + i * 72;
      letter(ctx, lab, cx - 270, ry, 18, PAL.ink, { align: 'left', ink: false, alpha: k * 0.95 });
      if (val) letter(ctx, val, cx + 250, ry, 24, col, { align: 'right', ink: false, alpha: k });
      if (i === 1) inkLine(ctx, [[cx - 272, ry + 28], [cx + 252, ry + 28]], 2, PAL.ink, 0);
    });
    letter(ctx, 'FY2025', cx, 452, 15, PAL.ink, { ink: false, alpha: 0.7, mono: true });
    person(ctx, cx - 470, G, 10, { t, mood: 'happy', coat: '#45324A', talk: talkR, talkT: t });
    pin(ctx, cx + 450, G, 26, { t, face: 'money', seed: 25 });
  }
}

// ------------------------------------------------------------------ ACT 7
function act7(rc: RenderContext) {
  const { ctx, width: W, height: H, t, shot, speaking } = rc;
  const cx = W / 2, lt = t - shot.startTime;
  const talkR = speaking && shot.speaker === 'Rider';
  const talkD = speaking && shot.speaker === 'Driver';

  if (shot.id === 'ub7-1') {
    paper(ctx, W, H, '#CFE1E0');
    paint(ctx, rectPts(-40, -40, W + 80, H * 0.68, 4), { fill: PAL.night, fillOp: 175, bleed: 0.06, tex: 0.45, ink: null });
    skyline(ctx, W, 430, 11, mixCol(PAL.night, PAL.cream, 0.2), 0.8, 0.95);
    streetGrid(ctx, W, 430, H + 40, t, mixCol(UB.haze, PAL.night, 0.35), 11);
    letter(ctx, '202,000,000 RIDERS A MONTH', cx, 92, 30, PAL.cream, { pop: seg(lt, 0.3, 1.2) });

    // a living constellation of pins
    const N = 150;
    for (let i = 0; i < N; i++) {
      const k = seg(lt, 0.3 + (i / N) * 3.4, 0.8 + (i / N) * 3.4);
      if (k <= 0) continue;
      const depth = hash(i * 5.1);
      const px = (hash(i * 3.3) * W + t * (8 + depth * 26)) % W;
      const py = 430 + Math.pow(depth, 1.7) * (H - 430);
      const u = 5 + depth * 13;
      ctx.save(); ctx.globalAlpha = (0.45 + depth * 0.55) * k;
      pin(ctx, px, py, u, { t, face: 'normal', noShadow: depth < 0.4, seed: i });
      ctx.restore();
    }
    for (let i = 0; i < 7; i++) {
      const p = frac(lt / 5 + i / 7);
      car(ctx, -120 + p * (W + 240), 470 + (i % 3) * 70, 18 + (i % 3) * 8, { t, beacon: 0.7, roll: p * 60 });
    }
    letter(ctx, '40,000,000 trips every day', cx, 560, 22, UB.lemon, { pop: seg(lt, 3.6, 4.8) });
  }

  else if (shot.id === 'ub7-2') {
    paper(ctx, W, H, '#DCE8E4');
    ground(ctx, W, G + 8, UB.mint);
    letter(ctx, 'FULL YEAR 2025', cx, 84, 32, PAL.ink, { pop: seg(lt, 0.15, 0.8) });
    const counters: Array<[string, number, string, string]> = [
      ['TRIPS', 13.567, 'B', UB.jet],
      ['GROSS BOOKINGS', 193.5, 'B', UB.signal],
      ['ADJ. EBITDA', 8.7, 'B', UB.mint]
    ];
    counters.forEach(([lab, val, unit, col], i) => {
      const k = seg(lt, 0.5 + i * 0.75, 2.2 + i * 0.75);
      const cxx = cx - 330 + i * 330;
      card(ctx, cxx, 310, 290, 170, PAL.cream);
      letter(ctx, lab, cxx, 256, 14, PAL.ink, { ink: false, alpha: 0.78 });
      const shown = (val * k);
      letter(ctx, `${i === 0 ? shown.toFixed(2) : shown.toFixed(1)}${unit}`, cxx, 304, 36, col, { ink: false });
      if (i === 1) letter(ctx, 'dollars', cxx, 344, 14, PAL.ink, { ink: false, alpha: 0.7 });
      if (i === 0) letter(ctx, 'rides + deliveries', cxx, 344, 14, PAL.ink, { ink: false, alpha: 0.7 });
      if (i === 2) letter(ctx, 'profitable, at scale', cxx, 344, 14, PAL.ink, { ink: false, alpha: 0.7 });
    });
    // steady profit line
    const ox = cx - 400, oy = 470;
    inkLine(ctx, [[ox, oy], [ox + 800, oy]], 2, mixCol(PAL.ink, PAL.cream, 0.5), 0);
    const k2 = seg(lt, 2.6, 5.6);
    const pts: Array<[number, number]> = [];
    for (let i = 0; i <= 40; i++) { const p = (i / 40) * k2; pts.push([ox + p * 800, oy - 20 - p * 44 - Math.sin(p * 15) * 4]); }
    if (pts.length > 1) inkLine(ctx, pts, 3, UB.mint, 0.3);
    person(ctx, cx - 470, G, 9.6, { t, mood: 'happy', coat: UB.slate, talk: talkD, talkT: t });
    pin(ctx, cx + 460, G, 26, { t, face: 'star', seed: 26 });
  }

  else if (shot.id === 'ub7-3') {
    paper(ctx, W, H, '#D6DEE8');
    ground(ctx, W, G + 8, UB.signal);
    letter(ctx, 'NOBODY IN THE FRONT SEAT', cx, 84, 32, PAL.ink, { pop: seg(lt, 0.15, 0.8) });
    // the car arrives
    const arrive = seg(lt, 0.4, 2.4);
    const carX = W + 200 - arrive * (W * 0.58 + 200);
    car(ctx, carX, G - 4, 52, { t, flip: true, driver: false, beacon: 0.9, roll: -arrive * 40, col: mixCol(UB.jet, UB.signal, 0.18) });
    // sensor dome + sweep
    paint(ctx, ellPts(carX, G - 100, 18, 11, 14, 0.5), { wash: UB.slate, ink: PAL.ink, sw: 1.1 });
    ctx.save();
    ctx.globalAlpha = 0.22;
    ctx.translate(carX, G - 100);
    ctx.rotate(Math.sin(t * 1.2) * 0.4);
    paint(ctx, [[0, 0], [-300, -70], [-300, 70]], { fill: UB.signal, fillOp: 100, bleed: 0.2, tex: 0.3, ink: null, curv: 0.1 });
    ctx.restore();

    // pin peers in, then boards
    const peer = seg(lt, 2.6, 3.8);
    const board = seg(lt, 4.2, 5.4);
    if (board < 0.05) {
      pin(ctx, carX - 150 + peer * 40, G, 30, {
        t, face: peer > 0.3 ? 'shocked' : 'normal',
        emote: peer > 0.3 ? '?' : null, emoteK: 1, seed: 27
      });
    } else {
      ctx.save();
      ctx.globalAlpha = 1 - board;
      pin(ctx, carX - 110 + board * 80, G, 30 * (1 - board * 0.4), { t, face: 'happy', seed: 27 });
      ctx.restore();
    }
    card(ctx, cx - 330, 250, 330, 140);
    letter(ctx, '2016', cx - 330, 214, 15, PAL.ink, { ink: false, alpha: 0.75 });
    letter(ctx, 'build the car', cx - 330, 244, 19, UB.surge, { ink: false });
    letter(ctx, '2026', cx - 330, 278, 15, PAL.ink, { ink: false, alpha: 0.75 });
    letter(ctx, 'book everyone\'s', cx - 330, 306, 19, UB.mint, { ink: false });
    letter(ctx, 'marketplace, not manufacturer', cx, 556, 19, UB.signal, { pop: seg(lt, 4.4, 5.6) });
    void talkR;
  }

  else {
    // --- curtain call ---
    paper(ctx, W, H, '#DEC9A6');
    paint(ctx, rectPts(-40, 470, W + 80, H - 430, 4), { fill: PAL.clayDk, fillOp: 220, bleed: 0.1, tex: 0.6, border: 0.4, ink: null });
    for (let px = 40; px < W; px += 150) inkLine(ctx, [[px, 474], [px - 24, H + 10]], 1.6, mixCol(PAL.clayDk, PAL.ink, 0.6), 0.1);
    inkLine(ctx, [[0, 472], [W, 472]], 2, mixCol(PAL.clayDk, PAL.ink, 0.55), 0.2);
    for (let fx = 90; fx < W; fx += 120) {
      blob(ctx, fx, 540, 42, UB.lemon, { alpha: 0.4 + wob(t + fx, 1.4) * 0.08, seed: 80 + fx });
      paint(ctx, ellPts(fx, 542, 9, 9, 12, 0.6), { wash: PAL.cream, ink: PAL.ink, sw: 1 });
    }
    const nightK = seg(lt, 0.3, 1.3);
    blob(ctx, cx, 258, 215 * nightK + 20, PAL.night, { alpha: 0.78, seed: 85 });
    letter(ctx, '2008:  "WHY CAN\'T I GET A CAR?"', cx, 214, 24, PAL.cream, { pop: seg(lt, 0.7, 1.6) });
    letter(ctx, '2026:  FORTY MILLION TIMES A DAY,', cx, 258, 24, UB.lemon, { pop: seg(lt, 1.5, 2.4) });
    letter(ctx, 'YOU CAN', cx, 296, 24, UB.lemon, { pop: seg(lt, 1.9, 2.8) });

    const bowK = 0.5 + wob(t, 0.5) * 0.5;
    const bow = (on: boolean) => (on ? bowK * 0.38 : 0);
    pin(ctx, cx, 545, 32, {
      t, face: 'happy', dy: -bow(lt > 2.2) * 0.5, sq: bow(lt > 2.2) * 0.4,
      emote: 'spark', emoteK: seg(lt, 2.6, 3.4), seed: 29
    });
    person(ctx, cx - 210, 552, 9, { t, mood: 'happy', coat: '#45324A', dy: bow(lt > 2.4) * 0.6 });
    person(ctx, cx + 210, 552, 9, { t, flip: true, mood: 'happy', coat: UB.slate, dy: bow(lt > 2.5) * 0.6 });
    car(ctx, cx + 420, 556, 26, { t, beacon: 0.6 });

    for (let i = 0; i < 6; i++) {
      const ax = 100 + i * ((W - 200) / 5);
      const aAge = ((lt * 1.7 + i * 0.5) % 1.8);
      if (aAge > 0.2 && lt > 1.8) {
        paint(ctx, starPts(ax, 650 - aAge * 30, 14 * (1 - aAge / 1.8), 0.45, 3), {
          wash: mixCol(PAL.clayLt, UB.lemon, 0.4), ink: null, alpha: 1 - aAge / 1.8
        });
      }
    }

    const curtain = kf(lt, [[0, 0], [2.8, 0], [5.6, 1]], v => v * v * (3 - 2 * v));
    const cw = curtain * (W * 0.34) + 60;
    for (const side of [-1, 1]) {
      ctx.save(); ctx.scale(side, 1); ctx.translate(side < 0 ? -W : 0, 0);
      paint(ctx, [[-10, -10], [cw, -10], [cw - 24, H * 0.6], [cw + 8, H + 20], [-10, H + 20]], {
        fill: PAL.rose, fillOp: 245, bleed: 0.06, tex: 0.6, border: 0.4, ink: PAL.ink, sw: 2
      });
      for (let fx = 30; fx < cw - 4; fx += 46) {
        inkLine(ctx, [[fx, -4], [fx - 16 + hash(fx) * 20, H + 4]], (26 - fx * 0.14) / 10, mixCol(PAL.rose, PAL.ink, 0.55), 0.3);
      }
      ctx.restore();
    }
    paint(ctx, [[-10, -10], [W + 10, -10], [W + 10, 96], [-10, 96]], {
      fill: PAL.rose, fillOp: 245, bleed: 0.05, tex: 0.6, border: 0.3, ink: PAL.ink, sw: 2
    });
    for (let vx = 0; vx <= 10; vx++) {
      paint(ctx, ellPts(vx * (W / 10), 96, W / 22, 26, 16, 1), {
        fill: mixCol(PAL.rose, PAL.ink, 0.12), fillOp: 245, bleed: 0.08, tex: 0.5, ink: PAL.ink, sw: 1.2
      });
    }
    inkLine(ctx, [[0, 122], [W, 122]], 3, UB.lemon, 0.3);
    letter(ctx, 'fin', W - 90, H - 60, 22, PAL.cream, { alpha: seg(lt, 3.8, 4.8), rot: -0.05 });
  }
}
