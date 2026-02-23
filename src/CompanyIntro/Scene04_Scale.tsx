import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { BRAND, FONT } from './styles';

const BADGES = [
  { label: '수능', emoji: '\uD83C\uDFAF' },
  { label: 'TEPS', emoji: '\uD83D\uDCDA' },
  { label: 'TOEFL', emoji: '\uD83C\uDF0D' },
  { label: 'EBS', emoji: '\uD83D\uDCFA' },
];

export const Scene04_Scale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 숫자 카운트업 (0~120 frames)
  const countProgress = interpolate(frame, [10, 120], [0, 7600], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const countDisplay = Math.floor(countProgress).toLocaleString();

  const numOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const numScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // "AI가 만든 단어 콘텐츠" (frame 80~)
  const descOpacity = interpolate(frame, [80, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const descY = interpolate(frame, [80, 110], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 전체 페이드아웃 (250~300)
  const sceneOut = interpolate(frame, [250, 300], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.light,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: sceneOut,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 30,
        }}
      >
        {/* 숫자 카운터 */}
        <div
          style={{
            opacity: numOpacity,
            transform: `scale(${numScale})`,
            display: 'flex',
            alignItems: 'baseline',
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 140,
              fontWeight: 800,
              color: BRAND.primary,
              fontFamily: FONT.english,
              lineHeight: 1,
            }}
          >
            {countDisplay}
          </span>
          <span
            style={{
              fontSize: 60,
              fontWeight: 700,
              color: BRAND.primary,
              fontFamily: FONT.english,
            }}
          >
            +
          </span>
        </div>

        {/* 설명 텍스트 */}
        <div
          style={{
            opacity: descOpacity,
            transform: `translateY(${descY}px)`,
            fontSize: 42,
            fontWeight: 600,
            color: BRAND.gray,
            fontFamily: FONT.korean,
          }}
        >
          AI가 만든 단어 콘텐츠
        </div>

        {/* 시험 배지 */}
        <div
          style={{
            display: 'flex',
            gap: 24,
            marginTop: 40,
          }}
        >
          {BADGES.map((badge, i) => {
            const delay = 130 + i * 25;
            const badgeScale = spring({
              frame: Math.max(0, frame - delay),
              fps,
              config: { damping: 10, stiffness: 150 },
            });
            const badgeOpacity = interpolate(frame, [delay, delay + 15], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={i}
                style={{
                  opacity: badgeOpacity,
                  transform: `scale(${badgeScale})`,
                  padding: '16px 36px',
                  borderRadius: 50,
                  background: BRAND.white,
                  border: `3px solid ${BRAND.primary}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                }}
              >
                <span style={{ fontSize: 28 }}>{badge.emoji}</span>
                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: BRAND.primaryDark,
                    fontFamily: FONT.english,
                  }}
                >
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
