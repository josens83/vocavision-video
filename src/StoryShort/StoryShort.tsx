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
import { STORY_WORDS, StoryScene } from '../data/story-words';
import { koreanFontFamily, englishFontFamily } from '../fonts';

// 20초 = 600프레임 (30fps)
const SECTIONS = {
  hook:    { start: 0,   end: 75 },   // 0-2.5초
  scene1:  { start: 75,  end: 140 },  // 2.5-4.7초
  scene2:  { start: 140, end: 205 },  // 4.7-6.8초
  scene3:  { start: 205, end: 270 },  // 6.8-9초
  emotion: { start: 270, end: 390 },  // 9-13초
  word:    { start: 390, end: 540 },  // 13-18초
  outro:   { start: 540, end: 600 },  // 18-20초
};

type Section = { start: number; end: number };

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
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

// ─── ImageScene ───
const getMotionStyle = (
  frame: number,
  start: number,
  end: number,
  motion: StoryScene['motion'],
): React.CSSProperties => {
  const progress = interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  switch (motion) {
    case 'zoomIn':
      return { transform: `scale(${1 + progress * 0.08})` };
    case 'zoomOut':
      return { transform: `scale(${1.08 - progress * 0.08})` };
    case 'panLeft':
      return { transform: `translateX(${-progress * 40}px) scale(1.05)` };
    case 'panRight':
      return { transform: `translateX(${progress * 40}px) scale(1.05)` };
  }
};

const ImageScene: React.FC<{
  frame: number;
  scene: StoryScene;
  section: Section;
  prevEnd?: number;
  nextStart?: number;
}> = ({ frame, scene, section }) => {
  // Crossfade: fade in over first 9 frames, fade out over last 9 frames
  const fadeIn = interpolate(frame, [section.start, section.start + 9], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [section.end - 9, section.end], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Caption slide up + fade in
  const captionProgress = interpolate(
    frame,
    [section.start + 10, section.start + 25],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  if (frame < section.start || frame >= section.end) return null;

  const motionStyle = getMotionStyle(frame, section.start, section.end, scene.motion);

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      {/* Image with Ken Burns */}
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <Img
          src={scene.imageUrl}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            ...motionStyle,
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
          paddingBottom: 160,
          paddingLeft: 50,
          paddingRight: 50,
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#FFFFFF',
            textAlign: 'center',
            fontFamily: englishFontFamily,
            textShadow: '0 4px 30px rgba(0,0,0,0.9)',
            lineHeight: 1.4,
            opacity: captionProgress,
            transform: `translateY(${(1 - captionProgress) * 20}px)`,
          }}
        >
          {scene.description}
        </div>
        <div
          style={{
            fontSize: 38,
            fontWeight: 600,
            color: '#CBD5E1',
            textAlign: 'center',
            fontFamily: koreanFontFamily,
            textShadow: '0 4px 30px rgba(0,0,0,0.9)',
            lineHeight: 1.4,
            marginTop: 12,
            opacity: captionProgress,
            transform: `translateY(${(1 - captionProgress) * 20}px)`,
          }}
        >
          {scene.descriptionKo}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─── EmotionText ───
const EmotionText: React.FC<{ frame: number; text: string; textKo: string; section: Section }> = ({
  frame,
  text,
  textKo,
  section,
}) => {
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
        opacity: fadeIn * fadeOut,
        padding: 60,
      }}
    >
      {/* Blur overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
        }}
      />
      <div
        style={{
          fontSize: 56,
          fontWeight: 600,
          fontStyle: 'italic',
          color: '#E2E8F0',
          textAlign: 'center',
          fontFamily: englishFontFamily,
          textShadow: '0 4px 30px rgba(0,0,0,0.9)',
          lineHeight: 1.4,
          padding: '0 50px',
          zIndex: 1,
        }}
      >
        {text}
      </div>
      <div
        style={{
          fontSize: 44,
          fontWeight: 600,
          fontStyle: 'italic',
          color: '#94A3B8',
          textAlign: 'center',
          fontFamily: koreanFontFamily,
          textShadow: '0 4px 30px rgba(0,0,0,0.9)',
          lineHeight: 1.4,
          padding: '0 50px',
          marginTop: 20,
          zIndex: 1,
        }}
      >
        {textKo}
      </div>
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
}> = ({ frame, fps, word, pronunciation, meaning, meaningKo, closingLine, closingLineKo, section }) => {
  if (frame < section.start || frame >= section.end) return null;

  const localFrame = frame - section.start;

  // Word spring bounce
  const wordScale = spring({
    frame: localFrame,
    fps,
    config: { damping: 12, stiffness: 120, mass: 0.8 },
  });

  // Pronunciation fade in
  const pronOpacity = interpolate(localFrame, [8, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Meaning fade in (0.5s delay = 15 frames)
  const meaningOpacity = interpolate(localFrame, [15, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Closing line slide up (after 2s = 60 frames)
  const closingProgress = interpolate(localFrame, [60, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fade out at end
  const fadeOut = interpolate(frame, [section.end - 10, section.end], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      {/* Word + pronunciation + meaning - centered */}
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 200,
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
            fontFamily: englishFontFamily,
            textAlign: 'center',
            marginTop: 24,
            opacity: meaningOpacity,
            lineHeight: 1.4,
          }}
        >
          {meaning}
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 400,
            color: '#CBD5E1',
            fontFamily: koreanFontFamily,
            textAlign: 'center',
            marginTop: 12,
            opacity: meaningOpacity,
            lineHeight: 1.4,
          }}
        >
          {meaningKo}
        </div>
      </AbsoluteFill>

      {/* Closing line - bottom */}
      <AbsoluteFill
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 200,
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
            fontFamily: englishFontFamily,
            textAlign: 'center',
            lineHeight: 1.5,
            opacity: closingProgress,
            transform: `translateY(${(1 - closingProgress) * 20}px)`,
          }}
        >
          {closingLine}
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#64748B',
            fontFamily: koreanFontFamily,
            textAlign: 'center',
            lineHeight: 1.5,
            marginTop: 8,
            opacity: closingProgress,
            transform: `translateY(${(1 - closingProgress) * 20}px)`,
          }}
        >
          {closingLineKo}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─── Outro ───
const Outro: React.FC<{ frame: number; section: Section }> = ({ frame, section }) => {
  const fadeIn = interpolate(frame, [section.start, section.start + 10], [0, 1], {
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
        opacity: fadeIn * fadeOut,
      }}
    >
      <div
        style={{
          fontSize: 36,
          fontWeight: 700,
          color: '#06B6D4',
          fontFamily: englishFontFamily,
          textAlign: 'center',
          letterSpacing: 4,
        }}
      >
        VocaVision AI
      </div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 400,
          color: '#64748B',
          fontFamily: englishFontFamily,
          textAlign: 'center',
          marginTop: 12,
        }}
      >
        vocavision.kr
      </div>
    </AbsoluteFill>
  );
};

// ─── Main Component ───
interface Props {
  wordIndex: number;
}

export const StoryShort: React.FC<Props> = ({ wordIndex }) => {
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
          if (f > 540) return interpolate(f, [540, 600], [0.3, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return 0.3;
        }}
      />

      {/* Watermark */}
      <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 100 }}>
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            opacity: 0.7,
          }}
        >
          <span
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: '#06B6D4',
              letterSpacing: 1,
              fontFamily: englishFontFamily,
            }}
          >
            VocaVision AI
          </span>
        </div>
      </AbsoluteFill>

      {/* Background gradient */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)',
        }}
      />

      {/* HOOK: 0-2.5초 */}
      <HookText frame={frame} text={data.hook} section={SECTIONS.hook} />

      {/* SCENES: 2.5-9초 */}
      {data.scenes.map((scene, i) => {
        const sectionKey = `scene${i + 1}` as keyof typeof SECTIONS;
        return (
          <ImageScene
            key={i}
            frame={frame}
            scene={scene}
            section={SECTIONS[sectionKey]}
          />
        );
      })}

      {/* EMOTION: 9-13초 */}
      <EmotionText
        frame={frame}
        text={data.emotion}
        textKo={data.emotionKo}
        section={SECTIONS.emotion}
      />

      {/* WORD REVEAL: 13-18초 */}
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
      />

      {/* OUTRO: 18-20초 */}
      <Outro frame={frame} section={SECTIONS.outro} />
    </AbsoluteFill>
  );
};
