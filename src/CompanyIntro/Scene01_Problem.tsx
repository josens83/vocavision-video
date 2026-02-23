import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { BRAND, FONT } from './styles';

// 사라지는 단어 컴포넌트
const FadingWord: React.FC<{ word: string; startFrame: number; yPos: number }> = ({
  word,
  startFrame,
  yPos,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appearProgress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const fadeOutStart = startFrame + 60;
  const fadeOut = interpolate(frame, [fadeOutStart, fadeOutStart + 40], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const blur = interpolate(frame, [fadeOutStart, fadeOutStart + 40], [0, 10], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (frame < startFrame) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: yPos,
        opacity: Math.min(appearProgress, fadeOut),
        filter: `blur(${blur}px)`,
        fontSize: 52,
        fontWeight: 600,
        color: BRAND.white,
        fontFamily: FONT.english,
        letterSpacing: 2,
      }}
    >
      {word}
    </div>
  );
};

// 흔들림 효과
const useShake = (frame: number, startFrame: number, intensity: number = 4) => {
  if (frame < startFrame || frame > startFrame + 20) return 0;
  const progress = frame - startFrame;
  const shake = Math.sin(progress * 3) * intensity * (1 - progress / 20);
  return shake;
};

export const Scene01_Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "영단어, 외워도 외워도..." 페이드인 (0~30)
  const line1Opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const line1Y = interpolate(frame, [0, 30], [30, 0], {
    extrapolateRight: 'clamp',
  });

  // "또 까먹었다" shake + 빨간 강조 (90~)
  const line2Opacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const shakeX = useShake(frame, 120, 6);

  // 전체 페이드아웃 (250~300)
  const sceneOut = interpolate(frame, [250, 300], [1, 0], {
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
      {/* 사라지는 단어들 (배경 효과) */}
      <FadingWord word="abandon" startFrame={10} yPos={200} />
      <FadingWord word="abstract" startFrame={30} yPos={350} />
      <FadingWord word="accumulate" startFrame={50} yPos={500} />

      {/* 메인 텍스트 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 30,
          zIndex: 10,
        }}
      >
        <div
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            fontSize: 64,
            fontWeight: 700,
            color: BRAND.white,
            fontFamily: FONT.korean,
          }}
        >
          영단어, 외워도 외워도...
        </div>

        <div
          style={{
            opacity: line2Opacity,
            transform: `translateX(${shakeX}px)`,
            fontSize: 72,
            fontWeight: 800,
            color: BRAND.red,
            fontFamily: FONT.korean,
          }}
        >
          또 까먹었다
        </div>
      </div>
    </AbsoluteFill>
  );
};
