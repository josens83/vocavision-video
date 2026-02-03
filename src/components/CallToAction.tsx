import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../styles';

export const CallToAction: React.FC<{
  startFrame?: number;
}> = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relativeFrame = frame - startFrame;
  const opacity = interpolate(relativeFrame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const buttonScale = spring({
    frame: Math.max(0, relativeFrame - 15),
    fps,
    config: { damping: 10 },
  });

  return (
    <div
      style={{
        opacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 40,
      }}
    >
      <div
        style={{
          fontSize: 56,
          fontWeight: 700,
          color: 'white',
          fontFamily: FONTS.korean,
          textAlign: 'center',
        }}
      >
        지금 무료로 시작하세요
      </div>

      <div
        style={{
          transform: `scale(${buttonScale})`,
          background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentGradient})`,
          padding: '24px 70px',
          borderRadius: 50,
          fontSize: 42,
          fontWeight: 700,
          color: 'white',
          fontFamily: FONTS.english,
        }}
      >
        vocavision.kr
      </div>

      <div
        style={{
          fontSize: 30,
          color: COLORS.gray,
          fontFamily: FONTS.korean,
        }}
      >
        수능 L1(기초) 880개+ 단어 무료 학습
      </div>
    </div>
  );
};
