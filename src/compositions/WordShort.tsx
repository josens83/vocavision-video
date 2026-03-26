import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, interpolate, useCurrentFrame } from 'remotion';
import { GradientBackground } from '../components/GradientBackground';
import { WordSection } from '../components/WordSection';
import { Transition } from '../components/Transition';
import { CallToAction } from '../components/CallToAction';
import { WORD_SETS } from '../data/words';

export const WordShort: React.FC<{
  setIndex?: number;
  language?: 'KO' | 'EN';
}> = ({ setIndex = 0, language = 'KO' }) => {
  const wordSet = WORD_SETS[setIndex] || WORD_SETS[0];
  const [word1, word2, word3] = wordSet.words;

  // 30fps × 52초 = 1560프레임 (인트로 제거)
  return (
    <AbsoluteFill>
      <GradientBackground />

      {/* BGM */}
      <Audio src={staticFile('audio/bgm-short.mp3')} volume={0.3} loop />

      {/* ===== 단어 1 (0~15초, 0~450프레임) ===== */}
      <Sequence from={0} durationInFrames={450}>
        <WordSection word={word1} language={language} />
      </Sequence>

      {/* ===== 전환 1 (15~17초, 450~510프레임) ===== */}
      <Sequence from={450} durationInFrames={60}>
        <Transition />
      </Sequence>

      {/* ===== 단어 2 (17~32초, 510~960프레임) ===== */}
      <Sequence from={510} durationInFrames={450}>
        <WordSection word={word2} language={language} />
      </Sequence>

      {/* ===== 전환 2 (32~34초, 960~1020프레임) ===== */}
      <Sequence from={960} durationInFrames={60}>
        <Transition />
      </Sequence>

      {/* ===== 단어 3 (34~49초, 1020~1470프레임) ===== */}
      <Sequence from={1020} durationInFrames={450}>
        <WordSection word={word3} language={language} />
      </Sequence>

      {/* ===== 아웃트로/CTA (49~52초, 1470~1560프레임) ===== */}
      <Sequence from={1470} durationInFrames={90}>
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CallToAction language={language} />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
