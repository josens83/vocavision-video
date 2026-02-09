import React from 'react';
import { Composition, Still } from 'remotion';
import { CompanyIntro } from './compositions/CompanyIntro';
import { WordShort } from './compositions/WordShort';
import { InstaWordCard } from './compositions/InstaWordCard';
import { InstaCompareCard } from './compositions/InstaCompareCard';
import { VIDEO } from './styles';
import { WORD_SETS } from './data/words';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 회사 소개 영상 — 16:9, 75초 (기존 유지) */}
      <Composition
        id="CompanyIntro"
        component={CompanyIntro}
        durationInFrames={2250}
        fps={VIDEO.LANDSCAPE.fps}
        width={VIDEO.LANDSCAPE.width}
        height={VIDEO.LANDSCAPE.height}
      />

      {/* ===== 3단어 쇼츠 — 9:16, 55초 ===== */}
      <Composition
        id="WordShort-set-001"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 0,
        }}
      />

      {/* set-002: inevitable, acknowledge, conduct */}
      <Composition
        id="WordShort-set-002"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 1,
        }}
      />

      {/* set-003: distinct, emerge, restraint */}
      <Composition
        id="WordShort-set-003"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 2,
        }}
      />

      {/* set-004: tampering, tempering, tapering */}
      <Composition
        id="WordShort-set-004"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 3,
        }}
      />

      {/* set-005: hallucination, agent, prompt (AI 단어) */}
      <Composition
        id="WordShort-set-005"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 4,
        }}
      />

      {/* set-006: lunar, ritual, prosperity (설날 영어 표현) */}
      <Composition
        id="WordShort-set-006"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 5,
        }}
      />

      {/* 기본 WordShort (하위 호환) */}
      <Composition
        id="WordShort"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 0,
        }}
      />

      {/* ===== 인스타그램 단어 카드 (Still 이미지) ===== */}

      {/* set-004 비교 표지 카드 */}
      <Still
        id="InstaCard-set004-cover"
        component={InstaCompareCard}
        width={1080}
        height={1080}
        defaultProps={{
          words: ['tampering', 'tempering', 'tapering'],
          title: '발음 비슷, 뜻 완전 다름!',
          subtitle: '이 3개 구분 가능?',
        }}
      />

      {/* set-004 개별 단어 카드 */}
      <Still
        id="InstaCard-tampering"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[3].words[0],
        }}
      />

      <Still
        id="InstaCard-tempering"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[3].words[1],
        }}
      />

      <Still
        id="InstaCard-tapering"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[3].words[2],
        }}
      />

      {/* set-005 비교 표지 카드 (AI 단어) */}
      <Still
        id="InstaCard-set005-cover"
        component={InstaCompareCard}
        width={1080}
        height={1080}
        defaultProps={{
          words: ['hallucination', 'agent', 'prompt'],
          title: 'AI 뉴스 필수 단어!',
          subtitle: '이 3개 구분 가능?',
        }}
      />

      {/* set-005 개별 단어 카드 */}
      <Still
        id="InstaCard-hallucination"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[4].words[0],
        }}
      />

      <Still
        id="InstaCard-agent"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[4].words[1],
        }}
      />

      <Still
        id="InstaCard-prompt"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[4].words[2],
        }}
      />
    </>
  );
};
