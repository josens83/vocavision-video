import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { FONTS } from '../styles';

export const Logo: React.FC<{
  size?: number;
  showText?: boolean;
}> = ({ size = 120, showText = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12 } });
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const textOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const textY = interpolate(frame, [15, 30], [20, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
      }}
    >
      {/* 로고 이미지 (public/logo.png 필요) */}
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          width: size,
          height: size,
          borderRadius: size * 0.2,
          background: 'linear-gradient(135deg, #06B6D4, #0891B2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size * 0.5,
          fontWeight: 'bold',
          color: 'white',
          fontFamily: FONTS.english,
        }}
      >
        V
      </div>

      {showText && (
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: size * 0.4,
              fontWeight: 800,
              color: 'white',
              fontFamily: FONTS.english,
              letterSpacing: -1,
            }}
          >
            VocaVision
          </span>
          <span
            style={{
              fontSize: size * 0.15,
              color: '#06B6D4',
              fontWeight: 600,
              fontFamily: FONTS.english,
              letterSpacing: 4,
              textTransform: 'uppercase',
              marginTop: 4,
            }}
          >
            AI
          </span>
        </div>
      )}
    </div>
  );
};
