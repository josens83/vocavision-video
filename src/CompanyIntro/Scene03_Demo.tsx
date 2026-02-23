import React from 'react';
import { AbsoluteFill, Img, interpolate, Sequence, staticFile, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { BRAND, FONT } from './styles';
import { PhoneMockup } from './PhoneMockup';

// Supabase 이미지 URL
const IMAGES = {
  ubiquitousConcept:
    'https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/visuals/ubiquitous-concept-1770100671787.png',
  ubiquitousRhyme:
    'https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/visuals/ubiquitous-rhyme-1768381623510.png',
  biasConcept:
    'https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/visuals/bias-concept-1771676772210.png',
  bingeRhyme:
    'https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/visuals/binge-rhyme-1771813938130.png',
};

// 8섹션 플래시카드 라벨
const FLASHCARD_SECTIONS = [
  { label: '발음', icon: '\uD83D\uDD0A', color: '#818CF8' },
  { label: '뜻', icon: '\uD83D\uDCCA', color: '#F59E0B' },
  { label: '이미지', icon: '\uD83D\uDCF8', color: '#10B981' },
  { label: '어원', icon: '\uD83D\uDCD6', color: '#06B6D4' },
  { label: '암기법', icon: '\uD83D\uDCA1', color: '#F472B6' },
  { label: '라임', icon: '\uD83C\uDFB5', color: '#A78BFA' },
  { label: '콜로케이션', icon: '\uD83D\uDD17', color: '#34D399' },
  { label: '예문', icon: '\uD83D\uDCDD', color: '#FB923C' },
];

// 섹션 제목 컴포넌트
const SectionTitle: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const y = interpolate(frame, [0, 20], [-20, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        textAlign: 'center',
        opacity,
        transform: `translateY(${y}px)`,
        fontSize: 48,
        fontWeight: 700,
        color: BRAND.white,
        fontFamily: FONT.korean,
      }}
    >
      {text}
    </div>
  );
};

// Part 1: AI CONCEPT 이미지 (225 frames = 7.5초)
const Part1_Concept: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const concepts = [
    { word: 'ubiquitous', url: IMAGES.ubiquitousConcept, meaning: '어디에나 있는' },
    { word: 'bias', url: IMAGES.biasConcept, meaning: '편향, 편견' },
    { word: 'binge', url: IMAGES.bingeRhyme, meaning: '폭식, 정주행' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.dark }}>
      <SectionTitle text="AI CONCEPT 이미지" />
      <div
        style={{
          position: 'absolute',
          top: 60,
          right: 100,
          fontSize: 22,
          color: BRAND.primary,
          fontFamily: FONT.korean,
          fontWeight: 600,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        단어 의미가 그림으로!
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 40,
          height: '100%',
          paddingTop: 80,
        }}
      >
        {concepts.map((item, i) => {
          const delay = 30 + i * 50;
          const scale = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 12, stiffness: 100 },
          });
          const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `scale(${scale})`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 400,
                  height: 400,
                  borderRadius: 24,
                  overflow: 'hidden',
                  boxShadow: `0 10px 40px rgba(0,0,0,0.5)`,
                  border: `3px solid ${BRAND.primary}44`,
                }}
              >
                <Img
                  src={item.url}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: BRAND.white,
                  fontFamily: FONT.english,
                }}
              >
                {item.word}
              </div>
              <div
                style={{
                  fontSize: 22,
                  color: BRAND.accent,
                  fontFamily: FONT.korean,
                  fontWeight: 600,
                }}
              >
                {item.meaning}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Part 2: 어원 분석 (225 frames = 7.5초)
const Part2_Etymology: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ubiquitous = ubique (어디에나) + -ous (형용사)
  const wordOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  const part1Scale = spring({
    frame: Math.max(0, frame - 40),
    fps,
    config: { damping: 12 },
  });
  const part1Opacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const plusOpacity = interpolate(frame, [70, 85], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const part2Scale = spring({
    frame: Math.max(0, frame - 90),
    fps,
    config: { damping: 12 },
  });
  const part2Opacity = interpolate(frame, [90, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const arrowOpacity = interpolate(frame, [130, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const resultOpacity = interpolate(frame, [150, 170], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.dark }}>
      <SectionTitle text="어원 분석" />
      <div
        style={{
          position: 'absolute',
          top: 60,
          right: 100,
          fontSize: 22,
          color: BRAND.primary,
          fontFamily: FONT.korean,
          fontWeight: 600,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        뿌리부터 이해!
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          gap: 50,
          paddingTop: 40,
        }}
      >
        {/* 원래 단어 */}
        <div
          style={{
            opacity: wordOpacity,
            fontSize: 80,
            fontWeight: 800,
            color: BRAND.white,
            fontFamily: FONT.english,
          }}
        >
          ubiquitous
        </div>

        {/* 어원 분해 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 30,
          }}
        >
          {/* ubique */}
          <div
            style={{
              opacity: part1Opacity,
              transform: `scale(${part1Scale})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                padding: '20px 40px',
                borderRadius: 20,
                background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.secondary})`,
                fontSize: 48,
                fontWeight: 700,
                color: BRAND.white,
                fontFamily: FONT.english,
              }}
            >
              ubique
            </div>
            <div
              style={{
                fontSize: 24,
                color: BRAND.gray,
                fontFamily: FONT.korean,
              }}
            >
              라틴어: 어디에나
            </div>
          </div>

          {/* + */}
          <div
            style={{
              opacity: plusOpacity,
              fontSize: 60,
              fontWeight: 700,
              color: BRAND.accent,
            }}
          >
            +
          </div>

          {/* -ous */}
          <div
            style={{
              opacity: part2Opacity,
              transform: `scale(${part2Scale})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                padding: '20px 40px',
                borderRadius: 20,
                background: `linear-gradient(135deg, ${BRAND.accent}, #D97706)`,
                fontSize: 48,
                fontWeight: 700,
                color: BRAND.white,
                fontFamily: FONT.english,
              }}
            >
              -ous
            </div>
            <div
              style={{
                fontSize: 24,
                color: BRAND.gray,
                fontFamily: FONT.korean,
              }}
            >
              ~한 (형용사 접미사)
            </div>
          </div>
        </div>

        {/* 화살표 */}
        <div
          style={{
            opacity: arrowOpacity,
            fontSize: 48,
            color: BRAND.gray,
          }}
        >
          ↓
        </div>

        {/* 결과 */}
        <div
          style={{
            opacity: resultOpacity,
            fontSize: 40,
            fontWeight: 600,
            color: BRAND.secondary,
            fontFamily: FONT.korean,
          }}
        >
          &quot;어디에나 있는&quot; = ubiquitous
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Part 3: 실제 학습 화면 (225 frames = 7.5초) — 폰 목업 + UX 녹화
const Part3_UXDemo: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.dark }}>
      <SectionTitle text="실제 학습 화면" />
      <div
        style={{
          position: 'absolute',
          top: 60,
          right: 100,
          fontSize: 22,
          color: BRAND.primary,
          fontFamily: FONT.korean,
          fontWeight: 600,
          opacity: titleOpacity,
        }}
      >
        플래시카드로 학습!
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          gap: 60,
          paddingTop: 60,
        }}
      >
        {/* 폰 목업 + 로그인 UX 영상 */}
        <PhoneMockup
          videoSrc={staticFile('video/ux-login.mp4')}
          startFrom={10}
        />

        {/* 설명 텍스트 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            maxWidth: 600,
          }}
        >
          {[
            { text: 'AI 이미지로 시각 암기', delay: 30 },
            { text: '어원 분석으로 깊이 이해', delay: 60 },
            { text: '라임으로 재미있게 기억', delay: 90 },
            { text: '8단계 플래시카드 학습', delay: 120 },
          ].map((item, i) => {
            const itemOpacity = interpolate(frame, [item.delay, item.delay + 20], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const itemX = interpolate(frame, [item.delay, item.delay + 20], [30, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <div
                key={i}
                style={{
                  opacity: itemOpacity,
                  transform: `translateX(${itemX}px)`,
                  fontSize: 32,
                  fontWeight: 600,
                  color: BRAND.white,
                  fontFamily: FONT.korean,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: BRAND.primary,
                    flexShrink: 0,
                  }}
                />
                {item.text}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Part 4: 8섹션 플래시카드 (225 frames = 7.5초)
const Part4_Flashcard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.dark }}>
      <SectionTitle text="8섹션 플래시카드" />
      <div
        style={{
          position: 'absolute',
          top: 60,
          right: 100,
          fontSize: 22,
          color: BRAND.primary,
          fontFamily: FONT.korean,
          fontWeight: 600,
          opacity: titleOpacity,
        }}
      >
        완벽한 학습!
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          paddingTop: 60,
        }}
      >
        {/* 카드 그리드 */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 24,
            maxWidth: 1400,
          }}
        >
          {FLASHCARD_SECTIONS.map((section, i) => {
            const delay = 20 + i * 18;
            const cardScale = spring({
              frame: Math.max(0, frame - delay),
              fps,
              config: { damping: 10, stiffness: 120 },
            });
            const cardOpacity = interpolate(frame, [delay, delay + 15], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            // 현재 활성 카드 (하이라이트)
            const activeIndex = Math.floor(
              interpolate(frame, [80, 200], [0, 7.99], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            );
            const isActive = i === activeIndex && frame >= 80;

            return (
              <div
                key={i}
                style={{
                  opacity: cardOpacity,
                  transform: `scale(${cardScale * (isActive ? 1.1 : 1)})`,
                  width: 280,
                  height: 200,
                  borderRadius: 20,
                  background: isActive
                    ? `linear-gradient(135deg, ${section.color}, ${section.color}88)`
                    : 'rgba(255,255,255,0.08)',
                  border: isActive ? `3px solid ${section.color}` : '2px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 16,
                  transition: 'all 0.3s',
                }}
              >
                <span style={{ fontSize: 48 }}>{section.icon}</span>
                <span
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: isActive ? BRAND.white : 'rgba(255,255,255,0.7)',
                    fontFamily: FONT.korean,
                  }}
                >
                  {section.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 메인 Scene 3 — 4파트 조합 (900 frames = 30초)
export const Scene03_Demo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Part 1: AI CONCEPT (0~225, 0~7.5초) */}
      <Sequence from={0} durationInFrames={225}>
        <Part1_Concept />
      </Sequence>

      {/* Part 2: 어원 분석 (225~450, 7.5~15초) */}
      <Sequence from={225} durationInFrames={225}>
        <Part2_Etymology />
      </Sequence>

      {/* Part 3: 실제 학습 화면 (450~675, 15~22.5초) */}
      <Sequence from={450} durationInFrames={225}>
        <Part3_UXDemo />
      </Sequence>

      {/* Part 4: 8섹션 카드 (675~900, 22.5~30초) */}
      <Sequence from={675} durationInFrames={225}>
        <Part4_Flashcard />
      </Sequence>
    </AbsoluteFill>
  );
};
