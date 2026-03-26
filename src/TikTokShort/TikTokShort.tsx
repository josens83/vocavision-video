import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Img,
  interpolate,
  spring,
} from 'remotion';
import { TIKTOK_WORDS, TikTokWord } from '../data/tiktok-words';
import { koreanFontFamily, englishFontFamily } from '../fonts';

// 20초 = 600프레임 (30fps)
const SECTIONS = {
  hook:    { start: 0,   end: 30 },   // 0-1초    굵은 텍스트 Hook
  scene1:  { start: 30,  end: 120 },  // 1-4초    장면 1
  scene2:  { start: 120, end: 210 },  // 4-7초    장면 2
  scene3:  { start: 210, end: 300 },  // 7-10초   장면 3
  bridge:  { start: 300, end: 360 },  // 10-12초  "이걸 영어로 뭐라 하는지 알아?"
  word:    { start: 360, end: 510 },  // 12-17초  단어 카드
  cta:     { start: 510, end: 600 },  // 17-20초  CTA
};

type Section = { start: number; end: number };

// ─── Ken Burns ───
const getKenBurnsStyle = (
  frame: number,
  start: number,
  end: number,
  index: number,
): React.CSSProperties => {
  const progress = interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const motions = ['zoomIn', 'panRight', 'zoomOut'] as const;
  const motion = motions[index % motions.length];

  switch (motion) {
    case 'zoomIn':
      return { transform: `scale(${1 + progress * 0.06})` };
    case 'zoomOut':
      return { transform: `scale(${1.06 - progress * 0.06})` };
    case 'panRight':
      return { transform: `translateX(${progress * 30}px) scale(1.04)` };
  }
};

// ─── Hook (굵은 텍스트) ───
const HookScreen: React.FC<{ frame: number; hookLine1: string; hookLine2: string; section: Section }> = ({
  frame, hookLine1, hookLine2, section,
}) => {
  const fadeIn = interpolate(frame, [section.start, section.start + 8], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [section.end - 5, section.end], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  if (frame < section.start || frame >= section.end) return null;

  return (
    <AbsoluteFill style={{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0A0A0A',
      opacity: fadeIn * fadeOut,
      padding: '0 50px',
      paddingBottom: 300,
    }}>
      <div style={{
        fontSize: 72,
        fontWeight: 900,
        color: '#FFD700',
        fontFamily: koreanFontFamily,
        textAlign: 'center',
        lineHeight: 1.3,
        textShadow: '0 4px 20px rgba(0,0,0,0.8)',
        wordBreak: 'keep-all',
      }}>
        {hookLine1}
      </div>
      <div style={{
        fontSize: 72,
        fontWeight: 900,
        color: '#FFFFFF',
        fontFamily: koreanFontFamily,
        textAlign: 'center',
        lineHeight: 1.3,
        marginTop: 8,
        textShadow: '0 4px 20px rgba(0,0,0,0.8)',
        wordBreak: 'keep-all',
      }}>
        {hookLine2}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene (이미지 + 자막) ───
const SceneView: React.FC<{
  frame: number;
  imageUrl: string;
  caption: string;
  section: Section;
  sceneIndex: number;
}> = ({ frame, imageUrl, caption, section, sceneIndex }) => {
  const fadeIn = interpolate(frame, [section.start, section.start + 6], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [section.end - 6, section.end], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const captionProgress = interpolate(
    frame, [section.start + 8, section.start + 18], [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  if (frame < section.start || frame >= section.end) return null;

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      {/* Image with Ken Burns */}
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <Img
          src={imageUrl}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            ...getKenBurnsStyle(frame, section.start, section.end, sceneIndex),
          }}
        />
      </AbsoluteFill>

      {/* Bottom gradient */}
      <AbsoluteFill style={{
        background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.85) 100%)',
      }} />

      {/* Caption — 하단 큰 자막 */}
      <AbsoluteFill style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 480,
        paddingLeft: 40,
        paddingRight: 40,
      }}>
        <div style={{
          fontSize: 60,
          fontWeight: 800,
          color: '#FFFFFF',
          textAlign: 'center',
          fontFamily: koreanFontFamily,
          textShadow: '0 4px 20px rgba(0,0,0,0.9)',
          lineHeight: 1.4,
          opacity: captionProgress,
          transform: `translateY(${(1 - captionProgress) * 15}px)`,
          wordBreak: 'keep-all',
        }}>
          {caption}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─── Bridge ("이걸 영어로 뭐라 하는지 알아?") ───
const BridgeScreen: React.FC<{ frame: number; text: string; section: Section }> = ({
  frame, text, section,
}) => {
  const fadeIn = interpolate(frame, [section.start, section.start + 10], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [section.end - 8, section.end], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  if (frame < section.start || frame >= section.end) return null;

  return (
    <AbsoluteFill style={{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0A0A0A',
      opacity: fadeIn * fadeOut,
      padding: '0 60px',
      paddingBottom: 300,
    }}>
      <div style={{
        fontSize: 56,
        fontWeight: 800,
        color: '#FFFFFF',
        fontFamily: koreanFontFamily,
        textAlign: 'center',
        lineHeight: 1.4,
        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
        wordBreak: 'keep-all',
      }}>
        {text}
      </div>
    </AbsoluteFill>
  );
};

// ─── Word Card ───
const WordCard: React.FC<{
  frame: number;
  fps: number;
  word: string;
  pronunciation: string;
  meaning: string;
  section: Section;
}> = ({ frame, fps, word, pronunciation, meaning, section }) => {
  if (frame < section.start || frame >= section.end) return null;

  const localFrame = frame - section.start;

  const wordScale = spring({
    frame: localFrame,
    fps,
    config: { damping: 12, stiffness: 120, mass: 0.8 },
  });

  const pronOpacity = interpolate(localFrame, [8, 18], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const meaningOpacity = interpolate(localFrame, [15, 28], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const fadeOut = interpolate(frame, [section.end - 8, section.end], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0A0A0A',
      opacity: fadeOut,
      paddingBottom: 300,
    }}>
      {/* Word */}
      <div style={{
        fontSize: 80,
        fontWeight: 900,
        color: '#06B6D4',
        fontFamily: englishFontFamily,
        textAlign: 'center',
        textShadow: '0 0 40px rgba(6,182,212,0.4)',
        transform: `scale(${wordScale})`,
        letterSpacing: 2,
      }}>
        {word.toUpperCase()}
      </div>

      {/* Pronunciation */}
      <div style={{
        fontSize: 32,
        fontWeight: 300,
        color: '#94A3B8',
        fontFamily: englishFontFamily,
        textAlign: 'center',
        marginTop: 16,
        opacity: pronOpacity,
      }}>
        {pronunciation}
      </div>

      {/* Meaning */}
      <div style={{
        fontSize: 44,
        fontWeight: 600,
        color: '#FFFFFF',
        fontFamily: koreanFontFamily,
        textAlign: 'center',
        marginTop: 24,
        opacity: meaningOpacity,
        padding: '0 50px',
        lineHeight: 1.4,
        wordBreak: 'keep-all',
      }}>
        {meaning}
      </div>
    </AbsoluteFill>
  );
};

// ─── CTA ───
const CTAScreen: React.FC<{ frame: number; text: string; section: Section; lang: 'ko' | 'en' }> = ({
  frame, text, section, lang,
}) => {
  const { fps } = useVideoConfig();
  const fadeIn = interpolate(frame, [section.start, section.start + 10], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const brandScale = spring({
    frame: Math.max(0, frame - section.start - 12),
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  if (frame < section.start || frame >= section.end) return null;

  return (
    <AbsoluteFill style={{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0A0A0A',
      opacity: fadeIn,
      padding: '0 50px',
      paddingBottom: 200,
    }}>
      {/* CTA 텍스트 */}
      <div style={{
        fontSize: 48,
        fontWeight: 700,
        color: '#FFD700',
        fontFamily: lang === 'ko' ? koreanFontFamily : englishFontFamily,
        textAlign: 'center',
        lineHeight: 1.5,
        wordBreak: 'keep-all',
      }}>
        {text}
      </div>

      {/* VocaVision AI 브랜딩 — 강조 */}
      <div style={{
        marginTop: 50,
        transform: `scale(${brandScale})`,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
      }}>
        <div style={{
          fontSize: 48,
          fontWeight: 900,
          color: '#06B6D4',
          fontFamily: englishFontFamily,
          letterSpacing: 2,
          textShadow: '0 0 30px rgba(6,182,212,0.4)',
        }}>
          VocaVision AI
        </div>
        <div style={{
          fontSize: 36,
          fontWeight: 700,
          color: '#FFFFFF',
          fontFamily: englishFontFamily,
          letterSpacing: 1,
          backgroundColor: 'rgba(6,182,212,0.15)',
          border: '2px solid rgba(6,182,212,0.3)',
          borderRadius: 12,
          padding: '8px 28px',
        }}>
          vocavision.app
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Main Component ───
interface Props {
  wordIndex: number;
  lang?: 'ko' | 'en';
}

export const TikTokShort: React.FC<Props> = ({ wordIndex, lang = 'ko' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const data = TIKTOK_WORDS[wordIndex];

  return (
    <AbsoluteFill style={{ backgroundColor: '#0A0A0A' }}>
      {/* 상단 좌측 워터마크 — 전체 영상에 항상 표시 */}
      <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 100 }}>
        <div style={{
          position: 'absolute',
          top: 60,
          left: 30,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          backgroundColor: 'rgba(0,0,0,0.3)',
          padding: '8px 16px',
          borderRadius: 16,
        }}>
          <span style={{
            fontSize: 26,
            fontWeight: 900,
            color: '#06B6D4',
            letterSpacing: 1,
            fontFamily: englishFontFamily,
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
          }}>
            VocaVision AI
          </span>
        </div>
      </AbsoluteFill>

      {/* HOOK: 0-1초 */}
      <HookScreen
        frame={frame}
        hookLine1={lang === 'ko' ? data.hookLine1Ko : data.hookLine1En}
        hookLine2={lang === 'ko' ? data.hookLine2Ko : data.hookLine2En}
        section={SECTIONS.hook}
      />

      {/* SCENES: 1-10초 */}
      {data.scenes.map((scene, i) => {
        const sectionKey = `scene${i + 1}` as keyof typeof SECTIONS;
        return (
          <SceneView
            key={i}
            frame={frame}
            imageUrl={scene.imageUrl}
            caption={lang === 'ko' ? scene.captionKo : scene.captionEn}
            section={SECTIONS[sectionKey]}
            sceneIndex={i}
          />
        );
      })}

      {/* BRIDGE: 10-12초 */}
      <BridgeScreen
        frame={frame}
        text={lang === 'ko' ? data.bridgeKo : data.bridgeEn}
        section={SECTIONS.bridge}
      />

      {/* WORD: 12-17초 */}
      <WordCard
        frame={frame}
        fps={fps}
        word={data.word}
        pronunciation={data.pronunciation}
        meaning={lang === 'ko' ? data.meaningKo : data.meaningEn}
        section={SECTIONS.word}
      />

      {/* CTA: 17-20초 */}
      <CTAScreen
        frame={frame}
        text={lang === 'ko' ? data.ctaKo : data.ctaEn}
        section={SECTIONS.cta}
        lang={lang}
      />
    </AbsoluteFill>
  );
};
