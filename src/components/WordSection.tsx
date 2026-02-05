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

  // === 애니메이션 타이밍 (30fps 기준, 450프레임 = 15초) ===
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
        paddingTop: 200,
        paddingLeft: 60,
        paddingRight: 60,
      }}
    >
      {/* 단어 */}
      <div
        style={{
          opacity: wordOpacity,
          transform: `scale(${wordScale})`,
          fontSize: 96,
          fontWeight: 800,
          color: 'white',
          fontFamily: FONTS.english,
          textAlign: 'center',
          marginBottom: 16,
        }}
      >
        {word.word}
      </div>

      {/* 발음 — IPA (영어 폰트) */}
      <div
        style={{
          opacity: pronOpacity,
          fontSize: 32,
          color: COLORS.accent,
          fontFamily: FONTS.english,
          marginTop: 4,
          textAlign: 'center',
        }}
      >
        {word.pronunciation}
      </div>

      {/* 발음 — 한국어 (한국어 폰트) */}
      <div
        style={{
          opacity: pronOpacity,
          fontSize: 32,
          color: COLORS.accent,
          fontFamily: FONTS.korean,
          marginTop: 6,
          textAlign: 'center',
        }}
      >
        {word.koreanPron}
      </div>

      {/* 뜻 */}
      <div
        style={{
          opacity: meaningOpacity,
          fontSize: 56,
          fontWeight: 600,
          color: COLORS.gold,
          fontFamily: FONTS.korean,
          marginTop: 28,
          textAlign: 'center',
        }}
      >
        {word.meaning}
      </div>

      {/* Rhyme 섹션 */}
      <div
        style={{
          opacity: rhymeCaptionOpacity,
          marginTop: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Rhyme 라벨 */}
        <div
          style={{
            fontSize: 18,
            color: '#9CA3AF',
            fontFamily: FONTS.english,
            marginBottom: 6,
          }}
        >
          🎵 Rhyme
        </div>

        {/* 영어 캡션 */}
        <div
          style={{
            fontSize: 34,
            color: COLORS.accent,
            fontFamily: FONTS.english,
            fontStyle: 'italic',
            textAlign: 'center',
            lineHeight: 1.5,
            maxWidth: 920,
            paddingLeft: 40,
            paddingRight: 40,
          }}
        >
          {word.rhymeCaption}
        </div>

        {/* 한국어 캡션 */}
        <div
          style={{
            fontSize: 28,
            color: '#9CA3AF',
            fontFamily: FONTS.korean,
            marginTop: 10,
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          {word.rhymeCaptionKo}
        </div>
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
            width: 560,
            height: 560,
            objectFit: 'cover',
          }}
        />
      </div>

      {/* 예문 */}
      <div
        style={{
          opacity: exampleOpacity,
          marginTop: 32,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            fontSize: 32,
            color: 'white',
            fontFamily: FONTS.english,
            fontStyle: 'italic',
            textAlign: 'center',
            maxWidth: 920,
            lineHeight: 1.6,
          }}
        >
          "{word.example}"
        </div>
        <div
          style={{
            fontSize: 28,
            color: COLORS.gray,
            fontFamily: FONTS.korean,
            textAlign: 'center',
            maxWidth: 920,
            lineHeight: 1.5,
          }}
        >
          {word.exampleKo}
        </div>
      </div>
    </AbsoluteFill>
  );
};
