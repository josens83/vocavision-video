import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { GradientBackground } from '../components/GradientBackground';
import { COLORS, FONTS } from '../styles';
import { WORD_SETS, WordData } from '../data/words';

// Safe Area 상수
const SAFE = {
  left: 64,
  right: 170,
  top: 72,
  bottom: 220,
};

// 26초 = 780프레임 @30fps
// [0~36f]     Hook 배너 (1.2초)
// [36~246f]   단어1 (7초)
// [246~456f]  단어2 (7초)
// [456~666f]  단어3 (7초)
// [666~780f]  CTA (3.8초)
const HOOK_END = 36;
const WORD_DURATION = 210;
const CTA_START = 666;
const TOTAL_FRAMES = 780;

// ─── Hook Banner ───
const HookBanner: React.FC<{
  frame: number;
  hookText: string;
  isEn: boolean;
}> = ({ frame, hookText, isEn }) => {
  if (frame >= HOOK_END) return null;

  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [HOOK_END - 6, HOOK_END], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeIn * fadeOut,
        padding: `0 ${SAFE.left}px`,
        paddingBottom: 100,
      }}
    >
      <div
        style={{
          fontSize: 46,
          fontWeight: 800,
          color: '#FFFFFF',
          fontFamily: isEn ? FONTS.english : FONTS.korean,
          textAlign: 'center',
          lineHeight: 1.4,
          wordBreak: 'keep-all',
          overflowWrap: 'break-word',
        }}
      >
        {hookText}
      </div>
    </AbsoluteFill>
  );
};

// ─── Word Scene (단어당 7초 = 210프레임) ───
const WordScene: React.FC<{
  word: WordData;
  sceneStart: number;
  index: number;
  total: number;
  language: 'KO' | 'EN';
  fps: number;
  globalFrame: number;
}> = ({ word, sceneStart, index, total, language, fps, globalFrame }) => {
  const frame = globalFrame - sceneStart;
  const sceneEnd = sceneStart + WORD_DURATION;
  const isEn = language === 'EN';

  if (globalFrame < sceneStart || globalFrame >= sceneEnd) return null;

  // Cross-fade in/out (8프레임)
  const fadeIn = interpolate(globalFrame, [sceneStart, sceneStart + 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(globalFrame, [sceneEnd - 8, sceneEnd], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 단어 reveal (spring bounce)
  const wordScale = spring({
    frame: Math.max(0, frame),
    fps,
    config: { damping: 200, stiffness: 120, mass: 0.8 },
  });

  // 핵심 뜻 fade-in + slide-up
  const meaningOpacity = interpolate(frame, [18, 36], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const meaningSlide = interpolate(frame, [18, 36], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 이미지 slow zoom
  const imageZoom = interpolate(globalFrame, [sceneStart + 36, sceneEnd], [1.0, 1.04], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const imageOpacity = interpolate(frame, [36, 48], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 기억 문장 slide-up
  const memoryOpacity = interpolate(frame, [120, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const memorySlide = interpolate(frame, [120, 140], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // recall 문장
  const recallOpacity = interpolate(frame, [165, 185], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const meaningText = isEn
    ? word.definitionEn || word.meaning
    : word.meaning;

  const memoryText = isEn
    ? word.memoryLine || ''
    : word.memoryLineKo || '';

  const recallText = isEn
    ? word.recallLine || ''
    : word.recallLineKo || '';

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      {/* 상단: 단어 + 뜻 */}
      <div
        style={{
          position: 'absolute',
          top: SAFE.top + 50,
          left: SAFE.left,
          right: SAFE.right,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        {/* 단어 */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: '#FFFFFF',
            fontFamily: FONTS.english,
            textAlign: 'center',
            transform: `scale(${wordScale})`,
            letterSpacing: 1,
          }}
        >
          {word.word}
        </div>

        {/* IPA 발음 */}
        <div
          style={{
            fontSize: 28,
            color: COLORS.accent,
            fontFamily: FONTS.english,
            marginTop: 4,
            opacity: meaningOpacity,
          }}
        >
          {word.pronunciation}
        </div>

        {/* 핵심 뜻 (노란색) */}
        <div
          style={{
            fontSize: isEn ? 36 : 44,
            fontWeight: 700,
            color: COLORS.gold,
            fontFamily: isEn ? FONTS.english : FONTS.korean,
            textAlign: 'center',
            marginTop: 12,
            opacity: meaningOpacity,
            transform: `translateY(${meaningSlide}px)`,
            lineHeight: 1.3,
            wordBreak: 'keep-all',
          }}
        >
          {meaningText}
        </div>
      </div>

      {/* 중간: 큰 이미지 (58%) */}
      <div
        style={{
          position: 'absolute',
          top: '18%',
          left: 0,
          right: 0,
          height: '58%',
          overflow: 'hidden',
          opacity: imageOpacity,
        }}
      >
        <Img
          src={word.rhymeImageUrl}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(${imageZoom})`,
          }}
        />
        {/* 하단 그라데이션 */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to bottom, transparent, rgba(15,23,42,0.95))',
          }}
        />
      </div>

      {/* 하단: 기억 문장 + recall */}
      <div
        style={{
          position: 'absolute',
          bottom: SAFE.bottom + 20,
          left: SAFE.left,
          right: SAFE.right,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          zIndex: 10,
        }}
      >
        {/* 기억 문장 (흰색) */}
        {memoryText && (
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: '#FFFFFF',
              fontFamily: isEn ? FONTS.english : FONTS.korean,
              textAlign: 'center',
              lineHeight: 1.4,
              opacity: memoryOpacity,
              transform: `translateY(${memorySlide}px)`,
              wordBreak: 'keep-all',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            }}
          >
            {memoryText}
          </div>
        )}

        {/* recall 문장 (민트색) */}
        {recallText && (
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: COLORS.accent,
              fontFamily: isEn ? FONTS.english : FONTS.korean,
              textAlign: 'center',
              lineHeight: 1.4,
              opacity: recallOpacity,
              wordBreak: 'keep-all',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            }}
          >
            {recallText}
          </div>
        )}
      </div>

      {/* Progress 표시 */}
      <div
        style={{
          position: 'absolute',
          top: SAFE.top,
          right: SAFE.right,
          fontSize: 24,
          color: 'rgba(255,255,255,0.6)',
          fontWeight: 600,
          fontFamily: FONTS.english,
          zIndex: 20,
        }}
      >
        {index + 1}/{total}
      </div>
    </AbsoluteFill>
  );
};

// ─── CTA ───
const CTASection: React.FC<{
  frame: number;
  fps: number;
  language: 'KO' | 'EN';
}> = ({ frame, fps, language }) => {
  if (frame < CTA_START) return null;
  const isEn = language === 'EN';

  const localFrame = frame - CTA_START;
  const fadeIn = interpolate(localFrame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const brandScale = spring({
    frame: Math.max(0, localFrame - 15),
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeIn,
        paddingBottom: 100,
      }}
    >
      {/* CTA 텍스트 */}
      <div
        style={{
          fontSize: 44,
          fontWeight: 700,
          color: '#FFFFFF',
          fontFamily: isEn ? FONTS.english : FONTS.korean,
          textAlign: 'center',
          lineHeight: 1.5,
          wordBreak: 'keep-all',
          padding: '0 60px',
        }}
      >
        {isEn
          ? '1 word a day. Miss one, forget one.'
          : '매일 1단어. 놓치면 까먹습니다.'}
      </div>

      {/* VocaVision 브랜딩 */}
      <div
        style={{
          marginTop: 40,
          transform: `scale(${brandScale})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: COLORS.accent,
            fontFamily: FONTS.english,
            letterSpacing: 2,
            textShadow: '0 0 30px rgba(6,182,212,0.4)',
          }}
        >
          VocaVision AI
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#FFFFFF',
            fontFamily: FONTS.english,
            letterSpacing: 1,
            backgroundColor: 'rgba(6,182,212,0.15)',
            border: '2px solid rgba(6,182,212,0.3)',
            borderRadius: 12,
            padding: '8px 28px',
          }}
        >
          {isEn ? 'vocavision.app' : 'vocavision.kr'}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Main Component ───
export const WordShort: React.FC<{
  setIndex?: number;
  language?: 'KO' | 'EN';
}> = ({ setIndex = 0, language = 'KO' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const wordSet = WORD_SETS[setIndex] || WORD_SETS[0];
  const words = wordSet.words;
  const isEn = language === 'EN';

  const hookText = isEn
    ? wordSet.hookLineEn || `${words.map((w) => w.word).join(', ')} — let's learn`
    : wordSet.hookLine || `${words.map((w) => w.word).join(', ')} 헷갈리면 이걸로 끝`;

  return (
    <AbsoluteFill>
      <GradientBackground />

      {/* BGM */}
      <Audio src={staticFile('audio/bgm-short.mp3')} volume={0.25} loop />

      {/* 미세 브랜드 워터마크 (항상 표시) */}
      <div
        style={{
          position: 'absolute',
          top: SAFE.top,
          left: SAFE.left,
          fontSize: 18,
          fontWeight: 600,
          color: 'rgba(6, 182, 212, 0.5)',
          fontFamily: FONTS.english,
          letterSpacing: 1,
          zIndex: 50,
        }}
      >
        VocaVision
      </div>

      {/* Hook Banner (0-1.2초) */}
      <HookBanner frame={frame} hookText={hookText} isEn={isEn} />

      {/* 단어 Scenes */}
      {words.map((word, i) => (
        <WordScene
          key={i}
          word={word}
          sceneStart={HOOK_END + i * WORD_DURATION}
          index={i}
          total={words.length}
          language={language}
          fps={fps}
          globalFrame={frame}
        />
      ))}

      {/* CTA (3.8초) */}
      <CTASection frame={frame} fps={fps} language={language} />
    </AbsoluteFill>
  );
};
