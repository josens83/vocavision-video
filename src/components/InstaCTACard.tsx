import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS } from '../styles';

interface InstaCTACardProps {
  message?: string;
  url?: string;
}

export const InstaCTACard: React.FC<InstaCTACardProps> = ({
  message = '더 많은 단어 학습하기',
  url = 'vocavision.kr',
}) => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
        fontFamily: FONTS.korean,
        padding: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
      }}
    >
      {/* 로고 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: `linear-gradient(135deg, ${COLORS.accent} 0%, #A855F7 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 40,
          }}
        >
          V
        </div>
        <span
          style={{
            color: 'white',
            fontSize: 36,
            fontWeight: 600,
            fontFamily: FONTS.english,
          }}
        >
          VocaVision AI
        </span>
      </div>

      {/* 메인 메시지 */}
      <div
        style={{
          textAlign: 'center',
          marginTop: 20,
        }}
      >
        <h1
          style={{
            color: 'white',
            fontSize: 48,
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {message}
        </h1>
      </div>

      {/* URL 버튼 스타일 */}
      <div
        style={{
          background: COLORS.accent,
          padding: '20px 60px',
          borderRadius: 50,
          marginTop: 20,
        }}
      >
        <span
          style={{
            color: 'white',
            fontSize: 36,
            fontWeight: 700,
            fontFamily: FONTS.english,
          }}
        >
          {url}
        </span>
      </div>

      {/* 하단 설명 */}
      <div
        style={{
          marginTop: 40,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            color: COLORS.gray,
            fontSize: 24,
            margin: 0,
          }}
        >
          AI 기반 영단어 학습 플랫폼
        </p>
        <p
          style={{
            color: COLORS.gray,
            fontSize: 20,
            marginTop: 12,
          }}
        >
          이미지 + 어원 + 라임 + 예문으로 기억에 남는 학습
        </p>
      </div>
    </AbsoluteFill>
  );
};

export default InstaCTACard;
