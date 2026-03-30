import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Img,
  interpolate,
  spring,
} from 'remotion';
import { MEME_WORDS } from '../data/meme-words';
import { koreanFontFamily, englishFontFamily } from '../fonts';

// 11.5초 = 345프레임 (30fps)
const SECTIONS = {
  hook:   { start: 0,   end: 27  },
  scene1: { start: 27,  end: 99  },
  scene2: { start: 99,  end: 174 },
  scene3: { start: 174, end: 249 },
  word:   { start: 249, end: 309 },
  cta:    { start: 309, end: 327 },
  outro:  { start: 327, end: 345 },
};

type Section = { start: number; end: number };

// ─── 1:1 이미지 + blur 배경 레이어 ───
const ImageWithBlurBg: React.FC<{
  imageUrl: string;
  frame: number;
  section: Section;
  freezeFrom?: number;  // 이 프레임부터 freeze (word 구간에서 scene3 유지)
}> = ({ imageUrl, frame, section, freezeFrom }) => {
  const fadeIn = interpolate(frame, [section.start, section.start + 9], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const fadeOut = freezeFrom
    ? 1  // freeze면 fade out 없음
    : interpolate(frame, [section.end - 9, section.end], [1, 0], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
      });

  if (frame < section.start) return null;
  if (!freezeFrom && frame >= section.end) return null;

  // 미세 줌인 모션
  const zoom = interpolate(frame, [section.start, section.end], [1.0, 1.05], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      {/* 배경 레이어: cover + blur + 어둡게 */}
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <Img
          src={imageUrl}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(20px) brightness(0.4)',
            transform: 'scale(1.1)',
          }}
        />
      </AbsoluteFill>

      {/* 전경 레이어: 1:1 contain, 중앙 배치 */}
      <AbsoluteFill
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{
          width: 1080,
          height: 1080,
          overflow: 'hidden',
          transform: `scale(${zoom})`,
        }}>
          <Img
            src={imageUrl}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
      </AbsoluteFill>

      {/* 하단 그라데이션 (자막 가독성) */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(to bottom, transparent 55%, rgba(15,23,42,0.9) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

// ─── 상단 고정 제목 바 ───
const TopBar: React.FC<{
  word: string;
  topLine: string;
  lang: 'ko' | 'en';
}> = ({ word, topLine, lang }) => {
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 90 }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#06B6D4',
        paddingTop: 56,
        paddingBottom: 20,
        paddingLeft: 36,
        paddingRight: 36,
      }}>
        {/* 한국어 훅 라인 */}
        <div style={{
          fontSize: 44,
          fontWeight: 900,
          color: '#FFFFFF',
          fontFamily: lang === 'ko' ? koreanFontFamily : englishFontFamily,
          lineHeight: 1.2,
          wordBreak: 'keep-all',
        }}>
          {topLine}
        </div>
        {/* 단어 */}
        <div style={{
          fontSize: 36,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.85)',
          fontFamily: englishFontFamily,
          letterSpacing: 2,
          marginTop: 4,
        }}>
          {word.toUpperCase()}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── 장면 자막 ───
const SceneCaption: React.FC<{
  frame: number;
  text: string;
  section: Section;
  lang: 'ko' | 'en';
}> = ({ frame, text, section, lang }) => {
  const progress = interpolate(frame, [section.start + 8, section.start + 20], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [section.end - 8, section.end], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  if (frame < section.start || frame >= section.end) return null;

  return (
    <AbsoluteFill style={{
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 120,
      paddingLeft: 40,
      paddingRight: 40,
      zIndex: 10,
    }}>
      <div style={{
        fontSize: 58,
        fontWeight: 900,
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: lang === 'ko' ? koreanFontFamily : englishFontFamily,
        textShadow: '0 4px 30px rgba(0,0,0,0.95)',
        lineHeight: 1.35,
        wordBreak: 'keep-all',
        maxWidth: 900,
        opacity: progress * fadeOut,
        transform: `translateY(${(1 - progress) * 16}px)`,
      }}>
        {text}
      </div>
    </AbsoluteFill>
  );
};

// ─── 단어 + 뜻 오버레이 (scene3 freeze 위에) ───
const WordOverlay: React.FC<{
  frame: number;
  fps: number;
  word: string;
  meaning: string;
  meaningKo: string;
  meaningLock: string;
  section: Section;
  lang: 'ko' | 'en';
}> = ({ frame, fps, word, meaning, meaningKo, meaningLock, section, lang }) => {
  if (frame < section.start || frame >= section.end) return null;

  const localFrame = frame - section.start;

  // 배경 어둡게
  const dimProgress = interpolate(localFrame, [0, 15], [0, 0.6], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const wordScale = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 130, mass: 0.7 },
  });

  const meaningOpacity = interpolate(localFrame, [12, 25], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const lockOpacity = interpolate(localFrame, [30, 45], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ zIndex: 20 }}>
      {/* 어둡게 오버레이 */}
      <AbsoluteFill style={{
        backgroundColor: `rgba(15,23,42,${dimProgress})`,
      }} />

      {/* 단어 + 뜻 */}
      <AbsoluteFill style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
        flexDirection: 'column',
        gap: 0,
      }}>
        {/* 단어 */}
        <div style={{
          fontSize: 88,
          fontWeight: 900,
          color: '#06B6D4',
          fontFamily: englishFontFamily,
          textAlign: 'center',
          textShadow: '0 4px 40px rgba(6,182,212,0.6)',
          transform: `scale(${wordScale})`,
          letterSpacing: 2,
        }}>
          {word.toUpperCase()}
        </div>

        {/* 한국어 뜻 */}
        <div style={{
          fontSize: 50,
          fontWeight: 700,
          color: '#FFFFFF',
          fontFamily: lang === 'ko' ? koreanFontFamily : englishFontFamily,
          textAlign: 'center',
          marginTop: 20,
          opacity: meaningOpacity,
          lineHeight: 1.4,
          wordBreak: 'keep-all',
          padding: '0 50px',
        }}>
          {lang === 'ko' ? meaningKo : meaning}
        </div>

        {/* 기억 고정 문장 */}
        <div style={{
          fontSize: 38,
          fontWeight: 600,
          color: '#94A3B8',
          fontFamily: lang === 'ko' ? koreanFontFamily : englishFontFamily,
          textAlign: 'center',
          marginTop: 16,
          opacity: lockOpacity,
          lineHeight: 1.4,
          wordBreak: 'keep-all',
          fontStyle: 'italic',
          padding: '0 50px',
        }}>
          {meaningLock}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─── CTA 오버레이 ───
const CTAOverlay: React.FC<{
  frame: number;
  cta: string;
  ctaKo: string;
  section: Section;
  lang: 'ko' | 'en';
}> = ({ frame, cta, ctaKo, section, lang }) => {
  const fadeIn = interpolate(frame, [section.start, section.start + 10], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  if (frame < section.start || frame >= section.end) return null;

  return (
    <AbsoluteFill style={{
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 160,
      zIndex: 25,
      opacity: fadeIn,
    }}>
      <div style={{
        fontSize: 46,
        fontWeight: 900,
        color: '#FFFFFF',
        fontFamily: lang === 'ko' ? koreanFontFamily : englishFontFamily,
        backgroundColor: '#06B6D4',
        padding: '18px 52px',
        borderRadius: 50,
        textAlign: 'center',
        wordBreak: 'keep-all',
        lineHeight: 1.3,
        textShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}>
        {lang === 'ko' ? ctaKo : cta}
      </div>
    </AbsoluteFill>
  );
};

// ─── 미니 엔드마크 ───
const MiniEndMark: React.FC<{
  frame: number;
  section: Section;
  lang: 'ko' | 'en';
}> = ({ frame, section, lang }) => {
  const opacity = interpolate(frame, [section.start, section.start + 8], [0, 0.7], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  if (frame < section.start || frame >= section.end) return null;

  return (
    <AbsoluteFill style={{
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 60,
      zIndex: 30,
      opacity,
    }}>
      <div style={{
        fontSize: 24,
        fontWeight: 600,
        color: '#94A3B8',
        fontFamily: englishFontFamily,
        letterSpacing: 1,
      }}>
        VocaVision AI · {lang === 'ko' ? 'vocavision.kr' : 'vocavision.app'}
      </div>
    </AbsoluteFill>
  );
};

// ─── 워터마크 ───
const Watermark: React.FC<{ lang: 'ko' | 'en' }> = ({ lang }) => (
  <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 100 }}>
    <div style={{
      position: 'absolute',
      top: 200,  // 상단 바 아래
      left: 36,
      backgroundColor: 'rgba(0,0,0,0.4)',
      padding: '6px 14px',
      borderRadius: 16,
    }}>
      <span style={{
        fontSize: 22,
        fontWeight: 800,
        color: '#06B6D4',
        fontFamily: englishFontFamily,
        letterSpacing: 1,
      }}>
        VocaVision AI
      </span>
    </div>
  </AbsoluteFill>
);

// ─── Main Component ───
interface Props {
  wordIndex: number;
  lang: 'ko' | 'en';
}

export const MemeShort: React.FC<Props> = ({ wordIndex, lang }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const data = MEME_WORDS[wordIndex];

  const topLine = lang === 'ko' ? data.topLineKo : data.topLineEn;
  const meaningLock = lang === 'ko' ? data.meaningLockKo : data.meaningLockEn;

  // 장면별 자막
  const scene1Caption = lang === 'ko' ? data.scenes[0].descriptionKo : data.scenes[0].description;
  const scene2Caption = lang === 'ko' ? data.scenes[1].descriptionKo : data.scenes[1].description;
  const scene3Caption = lang === 'ko' ? data.scenes[2].descriptionKo : data.scenes[2].description;

  // word 구간에서 scene3 이미지 freeze (word start 이후에도 scene3 이미지 유지)
  const showScene3Freeze = frame >= SECTIONS.scene3.start;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
      {/* 배경 그라데이션 */}
      <AbsoluteFill style={{
        background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)',
      }} />

      {/* Scene 1 — 책상 */}
      <ImageWithBlurBg
        imageUrl={data.scenes[0].imageUrl}
        frame={frame}
        section={SECTIONS.scene1}
      />

      {/* Scene 2 — 침대 */}
      <ImageWithBlurBg
        imageUrl={data.scenes[1].imageUrl}
        frame={frame}
        section={SECTIONS.scene2}
      />

      {/* Scene 3 — 아침 후회 (word 구간까지 freeze 유지) */}
      {showScene3Freeze && (
        <ImageWithBlurBg
          imageUrl={data.scenes[2].imageUrl}
          frame={frame}
          section={SECTIONS.scene3}
          freezeFrom={SECTIONS.word.start}
        />
      )}

      {/* 자막들 */}
      <SceneCaption frame={frame} text={scene1Caption} section={SECTIONS.scene1} lang={lang} />
      <SceneCaption frame={frame} text={scene2Caption} section={SECTIONS.scene2} lang={lang} />
      <SceneCaption frame={frame} text={scene3Caption} section={SECTIONS.scene3} lang={lang} />

      {/* 단어 + 뜻 오버레이 */}
      <WordOverlay
        frame={frame}
        fps={fps}
        word={data.word}
        meaning={data.meaning}
        meaningKo={data.meaningKo}
        meaningLock={meaningLock}
        section={SECTIONS.word}
        lang={lang}
      />

      {/* CTA */}
      <CTAOverlay
        frame={frame}
        cta={data.cta}
        ctaKo={data.ctaKo}
        section={SECTIONS.cta}
        lang={lang}
      />

      {/* 미니 엔드마크 */}
      <MiniEndMark frame={frame} section={SECTIONS.outro} lang={lang} />

      {/* 상단 고정 제목 바 */}
      <TopBar word={data.word} topLine={topLine} lang={lang} />

      {/* 워터마크 */}
      <Watermark lang={lang} />
    </AbsoluteFill>
  );
};
