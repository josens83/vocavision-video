import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { BRAND, FONT } from './styles';

const LEFT_ITEMS = [
  { text: '뜻만 나열', icon: '\uD83D\uDE10' },
  { text: '무작정 암기', icon: '\uD83D\uDCD6' },
  { text: '금방 까먹음', icon: '\uD83D\uDE1E' },
  { text: '재미없음', icon: '\uD83D\uDE34' },
];

const RIGHT_ITEMS = [
  { text: 'AI 이미지', icon: '\uD83D\uDDBC\uFE0F' },
  { text: '어원 분석', icon: '\uD83D\uDD2C' },
  { text: '라임 암기법', icon: '\uD83C\uDFB5' },
  { text: '재미있는 학습', icon: '\uD83C\uDFAE' },
];

export const Scene05_Difference: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 제목 등장 (0~30)
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

  // 좌측 등장 (30~)
  const leftOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const leftX = interpolate(frame, [30, 60], [-50, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 우측 슬라이드인 (120~)
  const rightX = interpolate(frame, [120, 170], [100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rightOpacity = interpolate(frame, [120, 170], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // VS 표시 (90~)
  const vsScale = spring({
    frame: Math.max(0, frame - 90),
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  // 체크마크 (250~)
  const checkScale = spring({
    frame: Math.max(0, frame - 250),
    fps,
    config: { damping: 8, stiffness: 100 },
  });

  // 전체 페이드아웃 (400~450)
  const sceneOut = interpolate(frame, [400, 450], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.dark,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: sceneOut,
      }}
    >
      {/* 제목 */}
      <div
        style={{
          position: 'absolute',
          top: 70,
          opacity: titleOpacity,
          fontSize: 48,
          fontWeight: 700,
          color: BRAND.white,
          fontFamily: FONT.korean,
        }}
      >
        뭐가 다를까?
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 60,
          paddingTop: 40,
        }}
      >
        {/* 좌측: 일반 단어장 */}
        <div
          style={{
            opacity: leftOpacity,
            transform: `translateX(${leftX}px)`,
            width: 550,
            padding: '40px 50px',
            borderRadius: 24,
            background: 'rgba(255,255,255,0.05)',
            border: '2px solid rgba(255,255,255,0.1)',
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: BRAND.gray,
              fontFamily: FONT.korean,
              marginBottom: 30,
              textAlign: 'center',
            }}
          >
            일반 단어장
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {LEFT_ITEMS.map((item, i) => {
              const delay = 60 + i * 15;
              const itemOpacity = interpolate(frame, [delay, delay + 20], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });
              return (
                <div
                  key={i}
                  style={{
                    opacity: itemOpacity,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    fontSize: 28,
                    color: 'rgba(255,255,255,0.4)',
                    fontFamily: FONT.korean,
                  }}
                >
                  <span style={{ fontSize: 32 }}>{item.icon}</span>
                  {item.text}
                </div>
              );
            })}
          </div>
        </div>

        {/* VS */}
        <div
          style={{
            transform: `scale(${vsScale})`,
            fontSize: 48,
            fontWeight: 800,
            color: BRAND.accent,
            fontFamily: FONT.english,
          }}
        >
          VS
        </div>

        {/* 우측: VocaVision AI */}
        <div
          style={{
            opacity: rightOpacity,
            transform: `translateX(${rightX}px)`,
            width: 550,
            padding: '40px 50px',
            borderRadius: 24,
            background: `linear-gradient(135deg, ${BRAND.primary}22, ${BRAND.secondary}22)`,
            border: `2px solid ${BRAND.primary}66`,
            position: 'relative',
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: BRAND.secondary,
              fontFamily: FONT.english,
              marginBottom: 30,
              textAlign: 'center',
            }}
          >
            VocaVision AI
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {RIGHT_ITEMS.map((item, i) => {
              const delay = 150 + i * 20;
              const itemOpacity = interpolate(frame, [delay, delay + 20], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });
              return (
                <div
                  key={i}
                  style={{
                    opacity: itemOpacity,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    fontSize: 28,
                    color: BRAND.white,
                    fontWeight: 600,
                    fontFamily: FONT.korean,
                  }}
                >
                  <span style={{ fontSize: 32 }}>{item.icon}</span>
                  {item.text}
                </div>
              );
            })}
          </div>

          {/* 체크마크 */}
          <div
            style={{
              position: 'absolute',
              top: -20,
              right: -20,
              transform: `scale(${checkScale})`,
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: BRAND.secondary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              color: BRAND.white,
              boxShadow: `0 4px 20px ${BRAND.secondary}66`,
            }}
          >
            ✓
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
