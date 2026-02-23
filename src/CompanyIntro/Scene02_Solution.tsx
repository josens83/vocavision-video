import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { BRAND, FONT } from './styles';

const SECTIONS = [
  { icon: '\uD83D\uDCF8', label: '이미지' },
  { icon: '\uD83D\uDCD6', label: '어원' },
  { icon: '\uD83C\uDFB5', label: '라임' },
  { icon: '\uD83D\uDCA1', label: '암기법' },
  { icon: '\uD83D\uDCDD', label: '예문' },
  { icon: '\uD83D\uDD17', label: '콜로케이션' },
  { icon: '\uD83D\uDD0A', label: '발음' },
  { icon: '\uD83D\uDCCA', label: '뜻' },
];

export const Scene02_Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 로고 줌인 (0~40)
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  // 빛나는 효과 (20~60)
  const glowOpacity = interpolate(frame, [20, 40, 60], [0, 0.8, 0.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // "VocaVision AI" 타이틀 (30~60)
  const titleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const titleScale = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 12 },
  });

  // "AI 이미지로 기억하는 영단어" 서브타이틀 슬라이드인 (70~100)
  const subX = interpolate(frame, [70, 100], [100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subOpacity = interpolate(frame, [70, 100], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 전체 페이드아웃 (400~450)
  const sceneOut = interpolate(frame, [400, 450], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.secondary} 50%, ${BRAND.primaryDark} 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: sceneOut,
      }}
    >
      {/* 로고 + 빛나는 효과 */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${BRAND.secondary}66, transparent)`,
            opacity: glowOpacity,
            top: -60,
          }}
        />

        {/* 로고 V 아이콘 */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            width: 160,
            height: 160,
            borderRadius: 32,
            background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.secondary})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 80,
            fontWeight: 'bold',
            color: BRAND.white,
            fontFamily: FONT.english,
            boxShadow: `0 20px 60px ${BRAND.primary}88`,
          }}
        >
          V
        </div>

        {/* VocaVision AI */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            marginTop: 30,
            fontSize: 72,
            fontWeight: 800,
            color: BRAND.white,
            fontFamily: FONT.english,
            letterSpacing: -1,
          }}
        >
          VocaVision AI
        </div>

        {/* 서브타이틀 */}
        <div
          style={{
            opacity: subOpacity,
            transform: `translateX(${subX}px)`,
            marginTop: 20,
            fontSize: 36,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.85)',
            fontFamily: FONT.korean,
          }}
        >
          AI 이미지로 기억하는 영단어
        </div>
      </div>

      {/* 8개 섹션 아이콘 원형 배치 */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
        }}
      >
        {SECTIONS.map((section, i) => {
          const angle = (i / SECTIONS.length) * Math.PI * 2 - Math.PI / 2;
          const radius = 360;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          const delay = 120 + i * 15;
          const iconScale = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 10, stiffness: 100 },
          });

          const iconOpacity = interpolate(frame, [delay, delay + 20], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(${x - 50}px, ${y - 50}px) scale(${iconScale})`,
                opacity: iconOpacity,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 20,
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 36,
                }}
              >
                {section.icon}
              </div>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.9)',
                  fontFamily: FONT.korean,
                }}
              >
                {section.label}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
