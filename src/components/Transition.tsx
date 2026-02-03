import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from '../styles';

export const Transition: React.FC = () => {
  const frame = useCurrentFrame();

  // 60프레임 (2초) 동안: 페이드인 → 페이드아웃
  const progress = interpolate(frame, [0, 30, 30, 60], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.accent,
        opacity: progress * 0.3,
      }}
    />
  );
};
