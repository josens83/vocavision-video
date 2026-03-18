import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Img,
  interpolate,
  spring,
  Audio,
  staticFile,
} from 'remotion';
import { STORY_WORDS, StoryScene, StoryWord } from '../data/story-words';
import { koreanFontFamily, englishFontFamily } from '../fonts';

// 55초 = 1650프레임 (30fps)
const SECTIONS = {
  intro:   { start: 0,    end: 90 },    // 0-3초   인트로 로고
  hook:    { start: 90,   end: 210 },   // 3-7초   훅 텍스트
  scene1:  { start: 210,  end: 360 },   // 7-12초  장면1
  scene2:  { start: 360,  end: 510 },   // 12-17초 장면2
  scene3:  { start: 510,  end: 660 },   // 17-22초 장면3
  scene4:  { start: 660,  end: 810 },   // 22-27초 장면4
  scene5:  { start: 810,  end: 960 },   // 27-32초 장면5
  emotion: { start: 960,  end: 1140 },  // 32-38초 감정문장
  word:    { start: 1140, end: 1410 },  // 38-47초 단어 리빌
  cta:     { start: 1410, end: 1530 },  // 47-51초 구독/좋아요
  outro:   { start: 1530, end: 1650 },  // 51-55초 아웃트로
};

type Section = { start: number; end: number };

// ─── Ken Burns (image mode only) ───
const getKenBurnsStyle = (
  frame: number,
  start: number,
  end: number,
  sceneIndex: number,
): React.CSSProperties => {
  const progress = interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const motions = ['zoomIn', 'panRight', 'zoomOut'] as const;
  const motion = motions[sceneIndex % motions.length];

  switch (motion) {
    case 'zoomIn':
      return { transform: `scale(${1 + progress * 0.08})` };
    case 'zoomOut':
      return { transform: `scale(${1.08 - progress * 0.08})` };
    case 'panRight':
      return { transform: `translateX(${progress * 40}px) scale(1.05)` };
  }
};

// ─── CherryBlossomOverlay ───
const CherryBlossomOverlay: React.FC<{ frame: number }> = ({ frame }) => {
  const petals = Array.from({ length: 10 }, (_, i) => ({
    x: (i * 97 + 50) % 1080,
    delay: i * 18,
    speed: 0.8 + (i % 3) * 0.3,
    size: 18 + (i % 4) * 6,
  }));

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 50 }}>
      {petals.map((petal, i) => {
        const localFrame = Math.max(0, frame - petal.delay);
        const y = (localFrame * petal.speed * 3) % 2200 - 100;
        const rotate = localFrame * 2 * (i % 2 === 0 ? 1 : -1);
        const opacity = interpolate(frame, [0, 30], [0, 0.7], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: petal.x,
              top: y,
              width: petal.size,
              height: petal.size,
              opacity,
              transform: `rotate(${rotate}deg)`,
            }}
          >
            <svg
              width={petal.size}
              height={petal.size}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* 5장 꽃잎 */}
              <ellipse cx="12" cy="6" rx="3.5" ry="5.5" fill="#FFB7C5" transform="rotate(0 12 12)" />
              <ellipse cx="12" cy="6" rx="3.5" ry="5.5" fill="#FFB7C5" transform="rotate(72 12 12)" />
              <ellipse cx="12" cy="6" rx="3.5" ry="5.5" fill="#FFB7C5" transform="rotate(144 12 12)" />
              <ellipse cx="12" cy="6" rx="3.5" ry="5.5" fill="#FFB7C5" transform="rotate(216 12 12)" />
              <ellipse cx="12" cy="6" rx="3.5" ry="5.5" fill="#FFB7C5" transform="rotate(288 12 12)" />
              <circle cx="12" cy="12" r="2.5" fill="#FFC0CB" />
            </svg>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ─── SymbolOverlay dispatcher ───
const SymbolOverlay: React.FC<{ frame: number; type?: StoryWord['symbolOverlay'] }> = ({
  frame,
  type,
}) => {
  if (!type) return null;
  switch (type) {
    case 'cherryBlossom':
      return <CherryBlossomOverlay frame={frame} />;
    default:
      return null;
  }
};

// ─── Intro ───
const Intro: React.FC<{ frame: number; section: Section }> = ({ frame, section }) => {
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame: frame - section.start,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.8 },
  });

  const fadeOut = interpolate(
    frame,
    [section.end - 20, section.end],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  if (frame < section.start || frame >= section.end) return null;

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 300,
        opacity: fadeOut,
      }}
    >
      <div style={{ transform: `scale(${logoScale})`, textAlign: 'center' }}>
        <div
          style={{
            fontSize: 68,
            fontWeight: 900,
            color: '#06B6D4',
            fontFamily: englishFontFamily,
            letterSpacing: 3,
            textShadow: '0 0 40px rgba(6,182,212,0.5)',
          }}
        >
          VocaVision AI
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 400,
            color: '#94A3B8',
            fontFamily: englishFontFamily,
            marginTop: 16,
            letterSpacing: 1,
          }}
        >
          Words you feel, not memorize.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── HookText ───
const HookText: React.FC<{ frame: number; text: string; section: Section }> = ({
  frame,
  text,
  section,
}) => {
  const opacity = interpolate(frame, [section.start, section.start + 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [section.end - 10, section.end], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (frame < section.start || frame >= section.end) return null;

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity: opacity * fadeOut,
        padding: 60,
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 900,
          color: '#FFFFFF',
          textAlign: 'center',
          fontFamily: englishFontFamily,
          textShadow: '0 4px 30px rgba(0,0,0,0.9)',
          lineHeight: 1.3,
          padding: '0 40px',
          wordBreak: 'keep-all',
          overflowWrap: 'break-word',
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

// ─── SceneView (Ken Burns image) ───
const SceneView: React.FC<{
  frame: number;
  scene: StoryScene;
  section: Section;
  sceneIndex: number;
  lang: 'ko' | 'en';
}> = ({ frame, scene, section, sceneIndex, lang }) => {
  const fadeIn = interpolate(frame, [section.start, section.start + 9], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [section.end - 9, section.end], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const captionProgress = interpolate(
    frame,
    [section.start + 10, section.start + 25],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  if (frame < section.start || frame >= section.end) return null;

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      {/* Media — Ken Burns */}
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <Img
          src={scene.imageUrl}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            ...getKenBurnsStyle(frame, section.start, section.end, sceneIndex),
          }}
        />
      </AbsoluteFill>

      {/* Bottom gradient overlay */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(to bottom, transparent 40%, rgba(15, 23, 42, 0.85) 100%)',
        }}
      />

      {/* Caption */}
      <AbsoluteFill
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 380,
          paddingLeft: 40,
          paddingRight: 40,
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: '#FFFFFF',
            textAlign: 'center',
            fontFamily: lang === 'ko' ? koreanFontFamily : englishFontFamily,
            textShadow: '0 4px 30px rgba(0,0,0,0.9)',
            lineHeight: 1.4,
            opacity: captionProgress,
            transform: `translateY(${(1 - captionProgress) * 20}px)`,
            wordBreak: 'keep-all',
            overflowWrap: 'break-word',
          }}
        >
          {lang === 'ko' ? scene.descriptionKo : scene.description}
        </div>
        {lang === 'ko' && (
          <div
            style={{
              fontSize: 36,
              fontWeight: 500,
              color: '#94A3B8',
              textAlign: 'center',
              fontFamily: englishFontFamily,
              textShadow: '0 4px 30px rgba(0,0,0,0.9)',
              lineHeight: 1.4,
              marginTop: 12,
              opacity: captionProgress,
              transform: `translateY(${(1 - captionProgress) * 20}px)`,
              overflowWrap: 'break-word',
            }}
          >
            {scene.description}
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─── EmotionText ───
const EmotionText: React.FC<{
  frame: number;
  text: string;
  textKo: string;
  section: Section;
  lang: 'ko' | 'en';
}> = ({ frame, text, textKo, section, lang }) => {
  const fadeIn = interpolate(frame, [section.start, section.start + 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [section.end - 15, section.end], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (frame < section.start || frame >= section.end) return null;

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 50px',
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* Blur overlay */}
      <AbsoluteFill style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }} />
      <div
        style={{
          fontSize: 56,
          fontWeight: 600,
          fontStyle: 'italic',
          color: '#E2E8F0',
          textAlign: 'center',
          fontFamily: lang === 'ko' ? koreanFontFamily : englishFontFamily,
          textShadow: '0 4px 30px rgba(0,0,0,0.9)',
          lineHeight: 1.4,
          padding: '0 50px',
          zIndex: 1,
          wordBreak: 'keep-all',
          overflowWrap: 'break-word',
        }}
      >
        {lang === 'ko' ? textKo : text}
      </div>
      {lang === 'ko' && (
        <div
          style={{
            fontSize: 38,
            fontWeight: 500,
            fontStyle: 'italic',
            color: '#94A3B8',
            textAlign: 'center',
            fontFamily: englishFontFamily,
            textShadow: '0 4px 30px rgba(0,0,0,0.9)',
            lineHeight: 1.4,
            padding: '0 50px',
            marginTop: 20,
            zIndex: 1,
            overflowWrap: 'break-word',
          }}
        >
          {text}
        </div>
      )}
    </AbsoluteFill>
  );
};

// ─── WordReveal ───
const WordReveal: React.FC<{
  frame: number;
  fps: number;
  word: string;
  pronunciation: string;
  meaning: string;
  meaningKo: string;
  closingLine: string;
  closingLineKo: string;
  section: Section;
  lang: 'ko' | 'en';
}> = ({ frame, fps, word, pronunciation, meaning, meaningKo, closingLine, closingLineKo, section, lang }) => {
  if (frame < section.start || frame >= section.end) return null;

  const localFrame = frame - section.start;

  const wordScale = spring({
    frame: localFrame,
    fps,
    config: { damping: 12, stiffness: 120, mass: 0.8 },
  });

  const pronOpacity = interpolate(localFrame, [8, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const meaningOpacity = interpolate(localFrame, [15, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const closingProgress = interpolate(localFrame, [60, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fadeOut = interpolate(frame, [section.end - 10, section.end], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      {/* Word + pronunciation + meaning */}
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 400,
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: '#06B6D4',
            fontFamily: englishFontFamily,
            textAlign: 'center',
            textShadow: '0 4px 30px rgba(6, 182, 212, 0.5)',
            transform: `scale(${wordScale})`,
          }}
        >
          {word.toUpperCase()}
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 300,
            color: '#94A3B8',
            fontFamily: englishFontFamily,
            textAlign: 'center',
            marginTop: 16,
            opacity: pronOpacity,
          }}
        >
          {pronunciation}
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 400,
            color: '#FFFFFF',
            fontFamily: lang === 'ko' ? koreanFontFamily : englishFontFamily,
            textAlign: 'center',
            marginTop: 24,
            opacity: meaningOpacity,
            lineHeight: 1.4,
            padding: '0 40px',
            wordBreak: 'keep-all',
            overflowWrap: 'break-word',
          }}
        >
          {lang === 'ko' ? meaningKo : meaning}
        </div>
        {lang === 'ko' && (
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: '#CBD5E1',
              fontFamily: englishFontFamily,
              textAlign: 'center',
              marginTop: 12,
              opacity: meaningOpacity,
              lineHeight: 1.4,
              padding: '0 40px',
              overflowWrap: 'break-word',
            }}
          >
            {meaning}
          </div>
        )}
      </AbsoluteFill>

      {/* Closing line */}
      <AbsoluteFill
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 420,
          paddingLeft: 50,
          paddingRight: 50,
        }}
      >
        <div
          style={{
            fontSize: 40,
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#94A3B8',
            fontFamily: lang === 'ko' ? koreanFontFamily : englishFontFamily,
            textAlign: 'center',
            lineHeight: 1.5,
            opacity: closingProgress,
            transform: `translateY(${(1 - closingProgress) * 20}px)`,
            wordBreak: 'keep-all',
            overflowWrap: 'break-word',
          }}
        >
          {lang === 'ko' ? closingLineKo : closingLine}
        </div>
        {lang === 'ko' && (
          <div
            style={{
              fontSize: 30,
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#64748B',
              fontFamily: englishFontFamily,
              textAlign: 'center',
              lineHeight: 1.5,
              marginTop: 8,
              opacity: closingProgress,
              transform: `translateY(${(1 - closingProgress) * 20}px)`,
              overflowWrap: 'break-word',
            }}
          >
            {closingLine}
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─── CTA ───
const CTA: React.FC<{ frame: number; section: Section }> = ({ frame, section }) => {
  const fadeIn = interpolate(frame, [section.start, section.start + 20], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [section.end - 15, section.end], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  if (frame < section.start || frame >= section.end) return null;

  return (
    <AbsoluteFill style={{
      justifyContent: 'center',
      alignItems: 'center',
      opacity: fadeIn * fadeOut,
      padding: '0 60px',
    }}>
      {/* 반투명 배경 */}
      <AbsoluteFill style={{ backgroundColor: 'rgba(15,23,42,0.7)' }} />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 36,
        zIndex: 1,
      }}>
        {/* 메인 메시지 */}
        <div style={{
          fontSize: 52,
          fontWeight: 800,
          color: '#FFFFFF',
          fontFamily: koreanFontFamily,
          textAlign: 'center',
          lineHeight: 1.4,
          wordBreak: 'keep-all',
          textShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}>
          더 많은 단어가<br />
          <span style={{ color: '#06B6D4' }}>느껴지고 싶다면?</span>
        </div>

        {/* 구독 버튼 스타일 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}>
          <div style={{
            fontSize: 44,
            fontWeight: 700,
            color: '#FFFFFF',
            fontFamily: koreanFontFamily,
            backgroundColor: '#FF0000',
            padding: '16px 48px',
            borderRadius: 50,
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}>
            구독 👍 좋아요
          </div>

          <div style={{
            fontSize: 34,
            fontWeight: 500,
            color: '#94A3B8',
            fontFamily: koreanFontFamily,
            textAlign: 'center',
            lineHeight: 1.5,
            wordBreak: 'keep-all',
          }}>
            매일 새로운 단어를 느껴보세요
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Outro ───
const Outro: React.FC<{ frame: number; section: Section }> = ({ frame, section }) => {
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [section.start, section.start + 20], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [section.end - 20, section.end], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const logoScale = spring({
    frame: frame - section.start,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.8 },
  });

  if (frame < section.start || frame >= section.end) return null;

  return (
    <AbsoluteFill style={{
      justifyContent: 'center',
      alignItems: 'center',
      opacity: fadeIn * fadeOut,
      paddingBottom: 200,
    }}>
      <div style={{
        transform: `scale(${logoScale})`,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
      }}>
        {/* 브랜드명 */}
        <div style={{
          fontSize: 72,
          fontWeight: 900,
          color: '#06B6D4',
          fontFamily: englishFontFamily,
          letterSpacing: 3,
          textShadow: '0 0 60px rgba(6,182,212,0.6)',
        }}>
          VocaVision AI
        </div>

        {/* URL — 강조 */}
        <div style={{
          fontSize: 52,
          fontWeight: 800,
          color: '#FFFFFF',
          fontFamily: englishFontFamily,
          letterSpacing: 2,
          backgroundColor: 'rgba(6,182,212,0.15)',
          border: '2px solid rgba(6,182,212,0.4)',
          borderRadius: 16,
          padding: '12px 36px',
        }}>
          vocavision.kr
        </div>

        {/* 태그라인 */}
        <div style={{
          fontSize: 32,
          fontWeight: 400,
          color: '#64748B',
          fontFamily: englishFontFamily,
          letterSpacing: 1,
          marginTop: 8,
        }}>
          AI 영단어 학습 플랫폼
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Main Component ───
interface Props {
  wordIndex: number;
  lang: 'ko' | 'en';
}

export const StoryShort: React.FC<Props> = ({ wordIndex, lang }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const data = STORY_WORDS[wordIndex];

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
      {/* BGM */}
      <Audio
        src={staticFile('audio/story-emotional.mp3')}
        volume={(f) => {
          if (f < 30) return interpolate(f, [0, 30], [0, 0.3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          if (f > 1530) return interpolate(f, [1530, 1650], [0.3, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return 0.3;
        }}
      />

      {/* Watermark */}
      <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 100 }}>
        {/* 상단 좌측 워터마크 — 강화 */}
        <div
          style={{
            position: 'absolute',
            top: 70,
            left: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: 'rgba(0,0,0,0.35)',
            padding: '10px 20px',
            borderRadius: 20,
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: '#06B6D4',
              letterSpacing: 1,
              fontFamily: englishFontFamily,
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            VocaVision AI
          </span>
        </div>

        {/* 우측 하단 Veo 워터마크 가리기 */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 120,
            height: 60,
            backgroundColor: '#0F172A',
          }}
        />
      </AbsoluteFill>

      {/* Symbol Overlay */}
      <SymbolOverlay frame={frame} type={data.symbolOverlay} />

      {/* Background gradient */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)',
        }}
      />

      {/* INTRO: 0-3초 */}
      <Intro frame={frame} section={SECTIONS.intro} />

      {/* HOOK: 3-7초 */}
      <HookText
        frame={frame}
        text={lang === 'ko' ? data.hookKo : data.hook}
        section={SECTIONS.hook}
      />

      {/* SCENES: 7-28초 */}
      {data.scenes.map((scene, i) => {
        const sectionKey = `scene${i + 1}` as keyof typeof SECTIONS;
        return (
          <SceneView
            key={i}
            frame={frame}
            scene={scene}
            section={SECTIONS[sectionKey]}
            sceneIndex={i}
            lang={lang}
          />
        );
      })}

      {/* EMOTION: 28-35초 */}
      <EmotionText
        frame={frame}
        text={data.emotion}
        textKo={data.emotionKo}
        section={SECTIONS.emotion}
        lang={lang}
      />

      {/* WORD REVEAL: 35-46초 */}
      <WordReveal
        frame={frame}
        fps={fps}
        word={data.word}
        pronunciation={data.pronunciation}
        meaning={data.meaning}
        meaningKo={data.meaningKo}
        closingLine={data.closingLine}
        closingLineKo={data.closingLineKo}
        section={SECTIONS.word}
        lang={lang}
      />

      {/* CTA: 47-51초 */}
      <CTA frame={frame} section={SECTIONS.cta} />

      {/* OUTRO: 51-55초 */}
      <Outro frame={frame} section={SECTIONS.outro} />
    </AbsoluteFill>
  );
};
