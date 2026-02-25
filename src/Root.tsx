import React from 'react';
import { Composition, Still } from 'remotion';
import { CompanyIntroNew } from './CompanyIntro/CompanyIntro';
import { WordShort } from './compositions/WordShort';
import { InstaWordCard } from './compositions/InstaWordCard';
import { InstaCompareCard } from './compositions/InstaCompareCard';
import { InstaCTACard } from './components/InstaCTACard';
import { VIDEO } from './styles';
import { WORD_SETS } from './data/words';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 회사 소개 영상 — 한국어 버전 */}
      <Composition
        id="CompanyIntro-KR"
        component={CompanyIntroNew}
        durationInFrames={2700}
        fps={VIDEO.LANDSCAPE.fps}
        width={VIDEO.LANDSCAPE.width}
        height={VIDEO.LANDSCAPE.height}
        defaultProps={{
          language: 'KR' as const,
        }}
      />

      {/* 회사 소개 영상 — 영어 버전 */}
      <Composition
        id="CompanyIntro-EN"
        component={CompanyIntroNew}
        durationInFrames={2700}
        fps={VIDEO.LANDSCAPE.fps}
        width={VIDEO.LANDSCAPE.width}
        height={VIDEO.LANDSCAPE.height}
        defaultProps={{
          language: 'EN' as const,
        }}
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

      {/* set-007: trajectory, autonomous, redundancy (자율주행) */}
      <Composition
        id="WordShort-set-007"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 6,
        }}
      />

      {/* set-008: resolution, reunion, gratitude (설날 Part 2) */}
      <Composition
        id="WordShort-set-008"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 7,
        }}
      />

      {/* set-009: apathy, ambivalent, ardent (TEPS 빈출 - 감정의 온도) */}
      <Composition
        id="WordShort-set-009"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 8,
        }}
      />

      {/* set-010: empathy, animosity, amiable (TEPS 빈출 - 사람 관계의 세 유형) */}
      <Composition
        id="WordShort-set-010"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 9,
        }}
      />

      {/* set-011: allure, captivate, cherish (TEPS 빈출 - 발렌타인데이 사랑의 3단계) */}
      <Composition
        id="WordShort-set-011"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 10,
        }}
      />

      {/* set-012: clandestine, persecute, commemorate (발렌타인데이 Part 2 - 성 발렌타인 이야기) */}
      <Composition
        id="WordShort-set-012"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 11,
        }}
      />

      {/* set-013: scrutinize, contemplate, discern (수능 빈출 - 생각과 판단의 3단계) */}
      <Composition
        id="WordShort-set-013"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 12,
        }}
      />

      {/* set-014: aspire, relentless, persevere (동계올림픽 - 챔피언의 3단계) */}
      <Composition
        id="WordShort-set-014"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 13,
        }}
      />

      {/* set-015: adversity, resilience, triumph (동계올림픽 Part 2 - 넘어져도 다시 일어나는) */}
      <Composition
        id="WordShort-set-015"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 14,
        }}
      />

      {/* set-016: procrastinate, diligent, tenacious (시험 기간 3단계) */}
      <Composition
        id="WordShort-set-016"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 15,
        }}
      />

      {/* set-017: serenity, loyalty, bond (라부부 영단어) */}
      <Composition
        id="WordShort-set-017"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 16,
        }}
      />

      {/* set-018: introvert, extrovert, intuition (MBTI 영단어 Part 1) */}
      <Composition
        id="WordShort-set-018"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 17,
        }}
      />

      {/* set-019: underdog, breakthrough, legacy (동계올림픽 Part 3) */}
      <Composition
        id="WordShort-set-019"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 18,
        }}
      />

      {/* set-020: perceive, judgment, sensation (MBTI 영단어 Part 2) */}
      <Composition
        id="WordShort-set-020"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 19,
        }}
      />

      {/* set-021: viral, algorithm, influence (SNS 영단어) */}
      <Composition
        id="WordShort-set-021"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 20,
        }}
      />

      {/* set-022: respawn, nerf, grind (게임 영단어) */}
      <Composition
        id="WordShort-set-022"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 21,
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

      {/* set-006 비교 표지 카드 (설날 영어 표현) */}
      <Still
        id="InstaCard-set006-cover"
        component={InstaCompareCard}
        width={1080}
        height={1080}
        defaultProps={{
          words: ['lunar', 'ritual', 'prosperity'],
          title: '🧧 설날 영어 표현!',
          subtitle: '외국인에게 설명해보자',
        }}
      />

      {/* set-006 개별 단어 카드 */}
      <Still
        id="InstaCard-lunar"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[5].words[0],
        }}
      />

      <Still
        id="InstaCard-ritual"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[5].words[1],
        }}
      />

      <Still
        id="InstaCard-prosperity"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[5].words[2],
        }}
      />

      {/* set-007 비교 표지 카드 (자율주행) */}
      <Still
        id="InstaCard-set007-cover"
        component={InstaCompareCard}
        width={1080}
        height={1080}
        defaultProps={{
          words: ['trajectory', 'autonomous', 'redundancy'],
          title: '🚗 자율주행 필수 영단어!',
          subtitle: '테슬라 뉴스 볼 때 꼭 나옴',
        }}
      />

      {/* set-007 개별 단어 카드 */}
      <Still
        id="InstaCard-trajectory"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[6].words[0],
        }}
      />

      <Still
        id="InstaCard-autonomous"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[6].words[1],
        }}
      />

      <Still
        id="InstaCard-redundancy"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[6].words[2],
        }}
      />

      {/* set-008 비교 표지 카드 (설날 Part 2) */}
      <Still
        id="InstaCard-set008-cover"
        component={InstaCompareCard}
        width={1080}
        height={1080}
        defaultProps={{
          words: ['resolution', 'reunion', 'gratitude'],
          title: '🧧 설날 영어 Part 2!',
          subtitle: '새해 결심부터 감사까지',
        }}
      />

      {/* set-008 개별 단어 카드 */}
      <Still
        id="InstaCard-resolution"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[7].words[0],
        }}
      />

      <Still
        id="InstaCard-reunion"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[7].words[1],
        }}
      />

      <Still
        id="InstaCard-gratitude"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[7].words[2],
        }}
      />

      {/* CTA 카드 — 인스타 캐러셀 마지막 페이지 (공용) */}
      <Still
        id="InstaCard-CTA"
        component={InstaCTACard}
        width={1080}
        height={1080}
        defaultProps={{
          message: '더 많은 단어 학습하기',
          url: 'vocavision.kr',
        }}
      />

      {/* set-009 비교 표지 카드 (TEPS 빈출 - 감정의 온도) */}
      <Still
        id="InstaCard-set009-cover"
        component={InstaCompareCard}
        width={1080}
        height={1080}
        defaultProps={{
          words: ['apathy', 'ambivalent', 'ardent'],
          title: '🌡️ 감정의 온도 — TEPS 빈출!',
          subtitle: '0도 vs 50도 vs 100도',
        }}
      />

      {/* set-009 개별 단어 카드 */}
      <Still
        id="InstaCard-apathy"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[8].words[0],
        }}
      />

      <Still
        id="InstaCard-ambivalent"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[8].words[1],
        }}
      />

      <Still
        id="InstaCard-ardent"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[8].words[2],
        }}
      />

      {/* set-010 비교 표지 카드 (TEPS 빈출 - 사람 관계의 세 유형) */}
      <Still
        id="InstaCard-set010-cover"
        component={InstaCompareCard}
        width={1080}
        height={1080}
        defaultProps={{
          words: ['empathy', 'animosity', 'amiable'],
          title: '🤝 사람 관계의 세 유형 — TEPS 빈출!',
          subtitle: '공감러 vs 적대러 vs 다정러',
        }}
      />

      {/* set-010 개별 단어 카드 */}
      <Still
        id="InstaCard-empathy"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[9].words[0],
        }}
      />

      <Still
        id="InstaCard-animosity"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[9].words[1],
        }}
      />

      <Still
        id="InstaCard-amiable"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[9].words[2],
        }}
      />

      {/* set-011 비교 표지 카드 (TEPS 빈출 - 발렌타인데이 사랑의 3단계) */}
      <Still
        id="InstaCard-set011-cover"
        component={InstaCompareCard}
        width={1080}
        height={1080}
        defaultProps={{
          words: ['allure', 'captivate', 'cherish'],
          title: '💝 발렌타인데이 영단어!',
          subtitle: '사랑의 3단계 — 끌림 → 사로잡힘 → 소중히',
        }}
      />

      {/* set-011 개별 단어 카드 */}
      <Still
        id="InstaCard-allure"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[10].words[0],
        }}
      />

      <Still
        id="InstaCard-captivate"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[10].words[1],
        }}
      />

      <Still
        id="InstaCard-cherish"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[10].words[2],
        }}
      />

      {/* set-012 비교 표지 카드 (발렌타인데이 Part 2 - 성 발렌타인 이야기) */}
      <Still
        id="InstaCard-set012-cover"
        component={InstaCompareCard}
        width={1080}
        height={1080}
        defaultProps={{
          words: ['clandestine', 'persecute', 'commemorate'],
          title: '📜 발렌타인데이의 진짜 기원!',
          subtitle: '비밀 결혼 → 박해 → 기념',
        }}
      />

      {/* set-012 개별 단어 카드 */}
      <Still
        id="InstaCard-clandestine"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[11].words[0],
        }}
      />

      <Still
        id="InstaCard-persecute"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[11].words[1],
        }}
      />

      <Still
        id="InstaCard-commemorate"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[11].words[2],
        }}
      />

      {/* set-013 비교 표지 카드 (수능 빈출 - 생각과 판단의 3단계) */}
      <Still
        id="InstaCard-set013-cover"
        component={InstaCompareCard}
        width={1080}
        height={1080}
        defaultProps={{
          words: ['scrutinize', 'contemplate', 'discern'],
          title: '🧠 생각과 판단의 3단계!',
          subtitle: '보고 → 생각하고 → 판단하는',
        }}
      />

      {/* set-013 개별 단어 카드 */}
      <Still
        id="InstaCard-scrutinize"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[12].words[0],
        }}
      />

      <Still
        id="InstaCard-contemplate"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[12].words[1],
        }}
      />

      <Still
        id="InstaCard-discern"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[12].words[2],
        }}
      />

      {/* set-014 비교 표지 카드 (동계올림픽 - 챔피언의 3단계) */}
      <Still
        id="InstaCard-set014-cover"
        component={InstaCompareCard}
        width={1080}
        height={1080}
        defaultProps={{
          words: ['aspire', 'relentless', 'persevere'],
          title: '🏔️ 동계올림픽 영단어!',
          subtitle: '챔피언의 3단계 — 열망 → 훈련 → 인내',
        }}
      />

      {/* set-014 개별 단어 카드 */}
      <Still
        id="InstaCard-aspire"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[13].words[0],
        }}
      />

      <Still
        id="InstaCard-relentless"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[13].words[1],
        }}
      />

      <Still
        id="InstaCard-persevere"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[13].words[2],
        }}
      />

      {/* set-015 비교 표지 카드 (동계올림픽 Part 2 - 넘어져도 다시 일어나는) */}
      <Still
        id="InstaCard-set015-cover"
        component={InstaCompareCard}
        width={1080}
        height={1080}
        defaultProps={{
          words: ['adversity', 'resilience', 'triumph'],
          title: '🏔️ 넘어져도 다시 일어나는!',
          subtitle: '역경 → 회복 → 승리',
        }}
      />

      {/* set-015 개별 단어 카드 */}
      <Still
        id="InstaCard-adversity"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[14].words[0],
        }}
      />

      <Still
        id="InstaCard-resilience"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[14].words[1],
        }}
      />

      <Still
        id="InstaCard-triumph"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[14].words[2],
        }}
      />

      {/* set-016 비교 표지 카드 (시험 기간 3단계) */}
      <Still
        id="InstaCard-set016-cover"
        component={InstaCompareCard}
        width={1080}
        height={1080}
        defaultProps={{
          words: ['procrastinate', 'diligent', 'tenacious'],
          title: '📚 시험 기간 3단계!',
          subtitle: '미루고 → 벼락치기 → 끝까지',
        }}
      />

      {/* set-016 개별 단어 카드 */}
      <Still
        id="InstaCard-procrastinate"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[15].words[0],
        }}
      />

      <Still
        id="InstaCard-diligent"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[15].words[1],
        }}
      />

      <Still
        id="InstaCard-tenacious"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[15].words[2],
        }}
      />

      {/* set-017 비교 표지 카드 (라부부 영단어) */}
      <Still
        id="InstaCard-set017-cover"
        component={InstaCompareCard}
        width={1080}
        height={1080}
        defaultProps={{
          words: ['serenity', 'loyalty', 'bond'],
          title: '🧸 라부부 이름이 다 영단어?!',
          subtitle: '평온 → 충성 → 유대',
        }}
      />

      {/* set-017 개별 단어 카드 */}
      <Still
        id="InstaCard-serenity"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[16].words[0],
        }}
      />

      <Still
        id="InstaCard-loyalty"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[16].words[1],
        }}
      />

      <Still
        id="InstaCard-bond"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[16].words[2],
        }}
      />

      {/* set-018 비교 표지 카드 (MBTI 영단어 Part 1) */}
      <Still
        id="InstaCard-set018-cover"
        component={InstaCompareCard}
        width={1080}
        height={1080}
        defaultProps={{
          words: ['introvert', 'extrovert', 'intuition'],
          title: '🧠 MBTI 영어로? I/E/N의 뜻',
          subtitle: '내향 → 외향 → 직관',
        }}
      />

      {/* set-018 개별 단어 카드 */}
      <Still
        id="InstaCard-introvert"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[17].words[0],
        }}
      />

      <Still
        id="InstaCard-extrovert"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[17].words[1],
        }}
      />

      <Still
        id="InstaCard-intuition"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[17].words[2],
        }}
      />

      {/* set-019 비교 표지 카드 (동계올림픽 Part 3) */}
      <Still
        id="InstaCard-set019-cover"
        component={InstaCompareCard}
        width={1080}
        height={1080}
        defaultProps={{
          words: ['underdog', 'breakthrough', 'legacy'],
          title: '🏆 무명에서 전설로 — 동계올림픽 Part 3',
          subtitle: '약자 → 돌파구 → 유산',
        }}
      />

      {/* set-019 개별 단어 카드 */}
      <Still
        id="InstaCard-underdog"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[18].words[0],
        }}
      />

      <Still
        id="InstaCard-breakthrough"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[18].words[1],
        }}
      />

      <Still
        id="InstaCard-legacy"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[18].words[2],
        }}
      />

      {/* set-020 비교 표지 카드 (MBTI 영단어 Part 2) */}
      <Still
        id="InstaCard-set020-cover"
        component={InstaCompareCard}
        width={1080}
        height={1080}
        defaultProps={{
          words: ['perceive', 'judgment', 'sensation'],
          title: '🧠 MBTI 완전 정복! S/J/P의 뜻',
          subtitle: '인식 → 판단 → 감각',
        }}
      />

      {/* set-020 개별 단어 카드 */}
      <Still
        id="InstaCard-perceive"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[19].words[0],
        }}
      />

      <Still
        id="InstaCard-judgment"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[19].words[1],
        }}
      />

      <Still
        id="InstaCard-sensation"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[19].words[2],
        }}
      />

      {/* set-021 비교 표지 카드 (SNS 영단어) */}
      <Still
        id="InstaCard-set021-cover"
        component={InstaCompareCard}
        width={1080}
        height={1080}
        defaultProps={{
          words: ['viral', 'algorithm', 'influence'],
          title: '📱 SNS를 지배하는 영단어!',
          subtitle: '바이럴 → 알고리즘 → 영향력',
        }}
      />

      {/* set-021 개별 단어 카드 */}
      <Still
        id="InstaCard-viral"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[20].words[0],
        }}
      />

      <Still
        id="InstaCard-algorithm"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[20].words[1],
        }}
      />

      <Still
        id="InstaCard-influence"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[20].words[2],
        }}
      />

      {/* set-022 비교 표지 카드 (게임 영단어) */}
      <Still
        id="InstaCard-set022-cover"
        component={InstaCompareCard}
        width={1080}
        height={1080}
        defaultProps={{
          words: ['respawn', 'nerf', 'grind'],
          title: '🎮 게이머라면 무조건 아는 영단어!',
          subtitle: '리스폰 → 너프 → 노가다',
        }}
      />

      {/* set-022 개별 단어 카드 */}
      <Still
        id="InstaCard-respawn"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[21].words[0],
        }}
      />

      <Still
        id="InstaCard-nerf"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[21].words[1],
        }}
      />

      <Still
        id="InstaCard-grind"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[21].words[2],
        }}
      />

      {/* set-023: bias, alignment, ethical (AI 뉴스 Part 2) */}
      <Composition
        id="WordShort-set-023"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 22,
        }}
      />

      {/* set-023 비교 표지 카드 */}
      <Still
        id="InstaCard-set023-cover"
        component={InstaCompareCard}
        width={1080}
        height={1080}
        defaultProps={{
          words: ['bias', 'alignment', 'ethical'],
          title: '🤖 AI 뉴스 필수 영단어 Part 2!',
          subtitle: '편향 → 정렬 → 윤리',
        }}
      />

      {/* set-023 개별 단어 카드 */}
      <Still
        id="InstaCard-bias"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[22].words[0],
        }}
      />

      <Still
        id="InstaCard-alignment"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[22].words[1],
        }}
      />

      <Still
        id="InstaCard-ethical"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[22].words[2],
        }}
      />

      {/* set-024: binge, spoiler, cliffhanger (넷플릭스 영단어) */}
      <Composition
        id="WordShort-set-024"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 23,
        }}
      />

      {/* set-024 비교 표지 카드 */}
      <Still
        id="InstaCard-set024-cover"
        component={InstaCompareCard}
        width={1080}
        height={1080}
        defaultProps={{
          words: ['binge', 'spoiler', 'cliffhanger'],
          title: '🎬 넷플릭스 중독자 필수 영단어!',
          subtitle: '정주행 → 스포 → 다음 시즌',
        }}
      />

      {/* set-024 개별 단어 카드 */}
      <Still
        id="InstaCard-binge"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[23].words[0],
        }}
      />

      <Still
        id="InstaCard-spoiler"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[23].words[1],
        }}
      />

      <Still
        id="InstaCard-cliffhanger"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[23].words[2],
        }}
      />

      {/* set-025: lag, buff, meta (게임 영어 Part 2) */}
      <Composition
        id="WordShort-set-025"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 24,
        }}
      />

      {/* set-025 비교 표지 카드 */}
      <Still
        id="InstaCard-set025-cover"
        component={InstaCompareCard}
        width={1080}
        height={1080}
        defaultProps={{
          words: ['lag', 'buff', 'meta'],
          title: '🎮 게이머 필수 영단어 Part 2!',
          subtitle: '렉 → 버프 → 메타',
        }}
      />

      {/* set-025 개별 단어 카드 */}
      <Still
        id="InstaCard-lag"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[24].words[0],
        }}
      />

      <Still
        id="InstaCard-buff"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[24].words[1],
        }}
      />

      <Still
        id="InstaCard-meta"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[24].words[2],
        }}
      />

      {/* set-026: semester, curriculum, scholarship (새학기 대학생활) */}
      <Composition
        id="WordShort-set-026"
        component={WordShort}
        durationInFrames={1650}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          setIndex: 25,
        }}
      />

      {/* set-026 비교 표지 카드 */}
      <Still
        id="InstaCard-set026-cover"
        component={InstaCompareCard}
        width={1080}
        height={1080}
        defaultProps={{
          words: ['semester', 'curriculum', 'scholarship'],
          title: '🎓 3월 개강! 대학생 필수 영단어!',
          subtitle: '학기 → 커리큘럼 → 장학금',
        }}
      />

      {/* set-026 개별 단어 카드 */}
      <Still
        id="InstaCard-semester"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[25].words[0],
        }}
      />

      <Still
        id="InstaCard-curriculum"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[25].words[1],
        }}
      />

      <Still
        id="InstaCard-scholarship"
        component={InstaWordCard}
        width={1080}
        height={1080}
        defaultProps={{
          word: WORD_SETS[25].words[2],
        }}
      />
    </>
  );
};
