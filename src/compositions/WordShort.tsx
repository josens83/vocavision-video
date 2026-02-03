import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { GradientBackground } from '../components/GradientBackground';
import { Logo } from '../components/Logo';
import { TextReveal } from '../components/TextReveal';
import { WordSection } from '../components/WordSection';
import { Transition } from '../components/Transition';
import { CallToAction } from '../components/CallToAction';
import { COLORS, FONTS } from '../styles';
import { WORD_SETS } from '../data/words';

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
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Logo size={100} showText={true} />
          <div style={{ marginTop: 24 }}>
            <TextReveal
              text="오늘의 영단어"
              fontSize={48}
              color={COLORS.accent}
              fontWeight={700}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 120,
              fontSize: 24,
              color: COLORS.gray,
              fontFamily: FONTS.english,
            }}
          >
            vocavision.kr
          </div>
        </AbsoluteFill>
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
