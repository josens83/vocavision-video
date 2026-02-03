import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { GradientBackground } from '../components/GradientBackground';
import { Logo } from '../components/Logo';
import { WordCard } from '../components/WordCard';
import { CallToAction } from '../components/CallToAction';
import { TextReveal } from '../components/TextReveal';
import { COLORS } from '../styles';
import { SAMPLE_WORDS } from '../data/words';

export const WordShort: React.FC<{
  wordIndex?: number;
}> = ({ wordIndex = 0 }) => {
  const word = SAMPLE_WORDS[wordIndex] || SAMPLE_WORDS[0];

  // 30fps 기준, 총 20초 = 600프레임
  return (
    <AbsoluteFill>
      <GradientBackground />

      {/* 배경 음악 */}
      <Audio src={staticFile('audio/bgm-short.mp3')} volume={0.3} loop />

      {/* 로고 (0~2초) */}
      <Sequence from={0} durationInFrames={60}>
        <AbsoluteFill
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: 80,
          }}
        >
          <Logo size={60} showText={false} />
        </AbsoluteFill>
      </Sequence>

      {/* "오늘의 단어" 타이틀 (1~3초) */}
      <Sequence from={30} durationInFrames={60}>
        <AbsoluteFill
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: 200,
          }}
        >
          <TextReveal
            text="오늘의 수능 단어"
            fontSize={36}
            color={COLORS.accent}
            fontWeight={500}
          />
        </AbsoluteFill>
      </Sequence>

      {/* 단어 카드 (2~16초) */}
      <Sequence from={60} durationInFrames={420}>
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <WordCard word={word} />
        </AbsoluteFill>
      </Sequence>

      {/* CTA (16~20초) */}
      <Sequence from={480} durationInFrames={120}>
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
