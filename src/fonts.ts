import { loadFont as loadNotoSansKR } from '@remotion/google-fonts/NotoSansKR';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';

// 한국어 폰트 로드
const notoSansKR = loadNotoSansKR('normal', {
  weights: ['400', '500', '600', '700', '800'],
  subsets: ['korean', 'latin'],
});

// 영어 폰트 로드
const inter = loadInter('normal', {
  weights: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const koreanFontFamily = notoSansKR.fontFamily;
export const englishFontFamily = inter.fontFamily;
