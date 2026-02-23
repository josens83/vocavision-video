import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { SUBTITLES } from './subtitles';
import { FONT } from './styles';

interface Props {
  language: 'KR' | 'EN';
}

export const SubtitleOverlay: React.FC<Props> = ({ language }) => {
  const frame = useCurrentFrame();

  const currentSub = SUBTITLES.find(
    (s) => frame >= s.startFrame && frame <= s.endFrame,
  );

  if (!currentSub) return null;

  const text = language === 'KR' ? currentSub.textKR : currentSub.textEN;

  // 페이드인/아웃 효과
  const opacity = interpolate(
    frame,
    [
      currentSub.startFrame,
      currentSub.startFrame + 10,
      currentSub.endFrame - 10,
      currentSub.endFrame,
    ],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        opacity,
        zIndex: 100,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          borderRadius: 12,
          padding: '14px 32px',
          maxWidth: '80%',
        }}
      >
        <p
          style={{
            color: '#FFFFFF',
            fontSize: language === 'KR' ? 32 : 30,
            fontFamily: language === 'KR' ? FONT.korean : FONT.english,
            fontWeight: 500,
            textAlign: 'center',
            lineHeight: 1.5,
            margin: 0,
            whiteSpace: 'pre-line',
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
};
