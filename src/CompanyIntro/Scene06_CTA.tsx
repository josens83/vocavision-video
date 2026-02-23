import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { BRAND, FONT } from './styles';

export const Scene06_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 로고 등장 (0~30)
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 80 },
  });
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // "지금 무료로 시작하세요" (30~60)
  const ctaOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ctaY = interpolate(frame, [30, 60], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // URL 박스 (70~100)
  const urlScale = spring({
    frame: Math.max(0, frame - 70),
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const urlOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 슬로건 (110~140)
  const sloganOpacity = interpolate(frame, [110, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 빛나는 효과 (계속)
  const glowPulse = interpolate(
    frame % 60,
    [0, 30, 60],
    [0.3, 0.6, 0.3],
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${BRAND.primaryDark} 0%, ${BRAND.primary} 40%, ${BRAND.secondary} 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* 배경 빛 */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${BRAND.secondary}44, transparent)`,
          opacity: glowPulse,
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 35,
          zIndex: 10,
        }}
      >
        {/* 로고 */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            width: 120,
            height: 120,
            borderRadius: 28,
            background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.secondary})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 60,
            fontWeight: 'bold',
            color: BRAND.white,
            fontFamily: FONT.english,
            boxShadow: `0 10px 40px rgba(0,0,0,0.3)`,
          }}
        >
          V
        </div>

        {/* VocaVision AI */}
        <div
          style={{
            opacity: logoOpacity,
            fontSize: 52,
            fontWeight: 800,
            color: BRAND.white,
            fontFamily: FONT.english,
            letterSpacing: -1,
          }}
        >
          VocaVision AI
        </div>

        {/* 지금 무료로 시작하세요 */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `translateY(${ctaY}px)`,
            fontSize: 60,
            fontWeight: 800,
            color: BRAND.white,
            fontFamily: FONT.korean,
            marginTop: 10,
          }}
        >
          지금 무료로 시작하세요
        </div>

        {/* URL 박스 */}
        <div
          style={{
            opacity: urlOpacity,
            transform: `scale(${urlScale})`,
            padding: '18px 60px',
            borderRadius: 60,
            background: BRAND.white,
            boxShadow: `0 8px 30px rgba(0,0,0,0.2)`,
          }}
        >
          <span
            style={{
              fontSize: 42,
              fontWeight: 800,
              color: BRAND.primary,
              fontFamily: FONT.english,
            }}
          >
            vocavision.kr
          </span>
        </div>

        {/* 슬로건 */}
        <div
          style={{
            opacity: sloganOpacity,
            fontSize: 30,
            color: 'rgba(255,255,255,0.75)',
            fontFamily: FONT.korean,
            fontWeight: 500,
            marginTop: 10,
          }}
        >
          이미지로 기억하는 영단어
        </div>
      </div>
    </AbsoluteFill>
  );
};
