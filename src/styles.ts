import { koreanFontFamily, englishFontFamily } from './fonts';

// VocaVision 브랜드 컬러
export const COLORS = {
  primary: '#0F172A',      // Navy (메인)
  secondary: '#1E293B',    // Dark Navy
  accent: '#06B6D4',       // Cyan (포인트)
  accentGradient: '#0891B2',
  white: '#FFFFFF',
  gray: '#94A3B8',
  lightGray: '#F1F5F9',
  text: '#0F172A',
  textLight: '#64748B',
  gold: '#F59E0B',
  green: '#10B981',
  red: '#EF4444',
};

// 영상 설정
export const VIDEO = {
  // 유튜브 가로 (16:9)
  LANDSCAPE: { width: 1920, height: 1080, fps: 30 },
  // 유튜브 쇼츠/릴스 세로 (9:16)
  PORTRAIT: { width: 1080, height: 1920, fps: 30 },
};

// 폰트 (Google Fonts 로드)
export const FONTS = {
  korean: koreanFontFamily,    // 'Noto Sans KR' - 한국어 텍스트용
  english: englishFontFamily,  // 'Inter' - 영어 텍스트용
};
