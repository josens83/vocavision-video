import { FONTS } from '../styles';

// CompanyIntro 브랜드 컬러
export const BRAND = {
  primary: '#0D9488',       // 틸
  primaryDark: '#0F766E',
  secondary: '#10B981',     // 에메랄드
  accent: '#F59E0B',        // 앰버 (강조)
  dark: '#1c1c1e',
  light: '#F8FAFC',
  gray: '#6B7280',
  white: '#FFFFFF',
  red: '#EF4444',
};

// 기존 프로젝트 폰트 재사용 (Noto Sans KR + Inter)
export const FONT = {
  korean: FONTS.korean,
  english: FONTS.english,
};

// 공통 스타일 유틸
export const centerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const columnCenter: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
