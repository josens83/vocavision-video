import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { FONTS } from '../styles';

export const TextReveal: React.FC<{
  text: string;
  startFrame?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  textAlign?: 'left' | 'center' | 'right';
}> = ({
  text,
  startFrame = 0,
  fontSize = 60,
  color = 'white',
  fontWeight = 700,
  textAlign = 'center',
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(frame, [startFrame, startFrame + 15], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        fontSize,
        fontWeight,
        color,
        textAlign,
        fontFamily: FONTS.korean,
        lineHeight: 1.4,
      }}
    >
      {text}
    </div>
  );
};
