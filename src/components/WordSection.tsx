import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { COLORS, FONTS } from '../styles';
import { WordData } from '../data/words';

export const WordSection: React.FC<{ word: WordData }> = ({ word }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === 애니메이션 타이밍 (30fps 기준) ===
  // [0~90]   단어 + 발음 (0~3초)
  // [90~150] 뜻 (3~5초)
  // [150~210] Rhyme 캡션 (5~7초)
  // [210~360] Rhyme 이미지 (7~12초)
  // [360~450] 예문 (12~15초)

  const wordOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const wordScale = spring({ frame, fps, config: { damping: 12 } });

  const pronOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: 'clamp' });

  const meaningOpacity = interpolate(frame, [90, 110], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const rhymeCaptionOpacity = interpolate(frame, [150, 170], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const imageOpacity = interpolate(frame, [210, 230], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const imageScale = spring({
    frame: Math.max(0, frame - 210), fps, config: { damping: 15 },
  });

  const exampleOpacity = interpolate(frame, [360, 380], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 180,
        paddingLeft: 60,
        paddingRight: 60,
      }}
    >
      {/* 단어 */}
      <div
        style={{
          opacity: wordOpacity,
          transform: `scale(${wordScale})`,
          fontSize: 80,
          fontWeight: 800,
          color: 'white',
          fontFamily: FONTS.english,
          textAlign: 'center',
        }}
      >
        {word.word}
      </div>

      {/* 발음 */}
      <div
        style={{
          opacity: pronOpacity,
          fontSize: 28,
          color: COLORS.accent,
          fontFamily: FONTS.english,
          marginTop: 16,
          textAlign: 'center',
        }}
      >
        {word.pronunciation} · {word.koreanPron}
      </div>

      {/* 뜻 */}
      <div
        style={{
          opacity: meaningOpacity,
          fontSize: 44,
          fontWeight: 600,
          color: COLORS.gold,
          fontFamily: FONTS.korean,
          marginTop: 24,
          textAlign: 'center',
        }}
      >
        {word.meaning}
      </div>

      {/* Rhyme 캡션 */}
      <div
        style={{
          opacity: rhymeCaptionOpacity,
          fontSize: 28,
          color: COLORS.green,
          fontFamily: FONTS.english,
          marginTop: 20,
          textAlign: 'center',
        }}
      >
        {word.rhymeCaption}
      </div>

      {/* Rhyme 이미지 */}
      <div
        style={{
          opacity: imageOpacity,
          transform: `scale(${imageScale})`,
          marginTop: 24,
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}
      >
        <Img
          src={word.rhymeImageUrl}
          style={{
            width: 480,
            height: 480,
            objectFit: 'cover',
          }}
        />
      </div>

      {/* 예문 */}
      <div
        style={{
          opacity: exampleOpacity,
          marginTop: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div
          style={{
            fontSize: 22,
            color: 'white',
            fontFamily: FONTS.english,
            fontStyle: 'italic',
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          "{word.example}"
        </div>
        <div
          style={{
            fontSize: 20,
            color: COLORS.gray,
            fontFamily: FONTS.korean,
            textAlign: 'center',
            maxWidth: 900,
          }}
        >
          {word.exampleKo}
        </div>
      </div>
    </AbsoluteFill>
  );
};
