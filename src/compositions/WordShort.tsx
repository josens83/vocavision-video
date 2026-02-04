import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, interpolate, useCurrentFrame } from 'remotion';
import { GradientBackground } from '../components/GradientBackground';
import { Logo } from '../components/Logo';
import { WordSection } from '../components/WordSection';
import { Transition } from '../components/Transition';
import { CallToAction } from '../components/CallToAction';
import { COLORS, FONTS } from '../styles';
import { WORD_SETS } from '../data/words';

// 인트로 컴포넌트 (애니메이션 포함)
const IntroSection: React.FC = () => {
  const frame = useCurrentFrame();

  const logoOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const sloganOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: 'clamp' });
  const urlOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 120,
      }}
    >
      {/* 1행: 로고 + VocaVision AI (가로 배열) */}
      <div
        style={{
          opacity: logoOpacity,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <Logo size={72} showText={false} />
        <span
          style={{
            fontSize: 60,
            fontWeight: 700,
            color: 'white',
            fontFamily: FONTS.english,
          }}
        >
          VocaVision AI
        </span>
      </div>

      {/* 2행: 슬로건 */}
      <div
        style={{
          opacity: sloganOpacity,
          fontSize: 30,
          color: '#9CA3AF',
          fontFamily: FONTS.english,
          marginTop: 12,
          fontStyle: 'italic',
        }}
      >
        Vocabulary, Visualized.
      </div>

      {/* 3행: 오늘의 영단어 */}
      <div
        style={{
          opacity: titleOpacity,
          fontSize: 68,
          fontWeight: 700,
          color: COLORS.accent,
          fontFamily: FONTS.korean,
          marginTop: 50,
        }}
      >
        오늘의 영단어
      </div>

      {/* 4행: URL (하단 고정) */}
      <div
        style={{
          opacity: urlOpacity,
          position: 'absolute',
          bottom: 100,
          fontSize: 36,
          color: '#9CA3AF',
          fontFamily: FONTS.english,
        }}
      >
        vocavision.kr
      </div>
    </AbsoluteFill>
  );
};

export const WordShort: React.FC<{
  setIndex?: number;
}> = ({ setIndex = 0 }) => {
  const wordSet = WORD_SETS[setIndex] || WORD_SETS[0];
  const [word1, word2, word3] = wordSet.words;

  // 30fps × 55초 = 1650프레임
  return (
    <AbsoluteFill>
      <GradientBackground />

      {/* BGM */}
      <Audio src={staticFile('audio/bgm-short.mp3')} volume={0.3} loop />

      {/* ===== 인트로 (0~3초, 0~90프레임) ===== */}
      <Sequence from={0} durationInFrames={90}>
        <IntroSection />
      </Sequence>

      {/* ===== 단어 1 (3~18초, 90~540프레임) ===== */}
      <Sequence from={90} durationInFrames={450}>
        <WordSection word={word1} />
      </Sequence>

      {/* ===== 전환 1 (18~20초, 540~600프레임) ===== */}
      <Sequence from={540} durationInFrames={60}>
        <Transition />
      </Sequence>

      {/* ===== 단어 2 (20~35초, 600~1050프레임) ===== */}
      <Sequence from={600} durationInFrames={450}>
        <WordSection word={word2} />
      </Sequence>

      {/* ===== 전환 2 (35~37초, 1050~1110프레임) ===== */}
      <Sequence from={1050} durationInFrames={60}>
        <Transition />
      </Sequence>

      {/* ===== 단어 3 (37~52초, 1110~1560프레임) ===== */}
      <Sequence from={1110} durationInFrames={450}>
        <WordSection word={word3} />
      </Sequence>

      {/* ===== 아웃트로/CTA (52~55초, 1560~1650프레임) ===== */}
      <Sequence from={1560} durationInFrames={90}>
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CallToAction />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
