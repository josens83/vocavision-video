import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS } from '../styles';

interface InstaCompareCardProps {
  words: string[];
  title: string;
  subtitle: string;
}

export const InstaCompareCard: React.FC<InstaCompareCardProps> = ({
  words,
  title,
  subtitle,
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${COLORS.accent} 0%, #A855F7 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 24,
          }}
        >
          V
        </div>
        <span style={{ color: 'white', fontSize: 22, fontWeight: 500 }}>
          VocaVision AI
        </span>
      </div>

      {/* 타이틀 */}
      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            color: COLORS.gold,
            fontSize: 36,
            fontWeight: 700,
            margin: 0,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            color: COLORS.gray,
            fontSize: 22,
            marginTop: 12,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* 3단어 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          width: '100%',
        }}
      >
        {words.map((word) => (
          <div
            key={word}
            style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 16,
              padding: '20px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                color: 'white',
                fontSize: 48,
                fontWeight: 800,
                fontFamily: FONTS.english,
                textTransform: 'uppercase',
                letterSpacing: 4,
              }}
            >
              {word}
            </span>
          </div>
        ))}
      </div>

      {/* 하단 CTA */}
      <div
        style={{
          marginTop: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ color: COLORS.accent, fontSize: 20 }}>
          밀어서 차이점 확인
        </span>
      </div>
    </AbsoluteFill>
  );
};

export default InstaCompareCard;
