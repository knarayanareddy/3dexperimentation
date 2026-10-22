import { RenderContext } from '../../types/video';
import { renderChapter1 } from './ch1_crisis';
import { renderChapter2 } from './ch2_jevons';
import { renderChapter3 } from './ch3_kahneman';
import { renderChapter4 } from './ch4_api_primitives';
import { renderChapter5 } from './ch5_discriminator';
import { renderChapter6 } from './ch6_cascades';
import { renderChapter7 } from './ch7_grand_synthesis';

/** Dispatch for the Jev film's seven acts. */
export function renderJev(n: number, rc: RenderContext) {
  switch (n) {
    case 1: return renderChapter1(rc);
    case 2: return renderChapter2(rc);
    case 3: return renderChapter3(rc);
    case 4: return renderChapter4(rc);
    case 5: return renderChapter5(rc);
    case 6: return renderChapter6(rc);
    case 7: return renderChapter7(rc);
    default: return renderChapter1(rc);
  }
}
