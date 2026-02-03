import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from '../styles';

export const GradientBackground: React.FC<{
  colors?: [string, string];
}> = ({ colors = [COLORS.primary, COLORS.secondary] }) => {
  const frame = useCurrentFrame();
  const angle = interpolate(frame, [0, 300], [135, 145]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]})`,
      }}
    />
  );
};
