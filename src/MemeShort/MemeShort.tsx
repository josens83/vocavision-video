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
import { MEME_WORDS } from '../data/meme-words';
import { koreanFontFamily, englishFontFamily } from '../fonts';

// 25초 = 750프레임 (30fps)
const SECTIONS = {
  hook:   { start: 0,   end: 45  },  // 0-1.5초
  scene1: { start: 45,  end: 210 },  // 1.5-7초
  scene2: { start: 210, end: 390 },  // 7-13초
  word:   { start: 390, end: 600 },  // 13-20초
  cta:    { start: 600, end: 690 },  // 20-23초
  outro:  { start: 690, end: 750 },  // 23-25초
};

type Section = { start: number; end: number };

// ─── HookText ───
const HookText: React.FC<{
  frame: number;
  text: string;
  section: Section;
  lang: 'ko' | 'en';
}> = ({ frame, text, section, lang }) => {
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
      opacity: fadeIn * fadeOut,
      padding: '0 50px',
    }}>
      <div style={{
        fontSize: 72,
        fontWeight: 900,
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: lang === 'ko' ? koreanFontFamily : englishFontFamily,
        textShadow: '0 4px 30px rgba(0,0,0,0.9)',
        lineHeight: 1.3,
        wordBreak: 'keep-all',
        overflowWrap: 'break-word',
      }}>
        {text}
      </div>
    </AbsoluteFill>
  );
};

// ─── MemeScene ───
const MemeSceneView: React.FC<{
  frame: number;
  imageUrl: string;
  description: string;
  descriptionKo: string;
  section: Section;
  lang: 'ko' | 'en';
}> = ({ frame, imageUrl, description, descriptionKo, section, lang }) => {
  const fadeIn = interpolate(frame, [section.start, section.start + 9], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [section.end - 9, section.end], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const captionProgress = interpolate(frame, [section.start + 10, section.start + 25], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  if (frame < section.start || frame >= section.end) return null;

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <Img src={imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>
      <AbsoluteFill style={{
        background: 'linear-gradient(to bottom, transparent 40%, rgba(15,23,42,0.85) 100%)',
      }} />
      <AbsoluteFill style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 380,
        paddingLeft: 40,
        paddingRight: 40,
      }}>
        {lang === 'ko' ? (
          <>
            <div style={{
              fontSize: 52,
              fontWeight: 800,
              color: '#FFFFFF',
              textAlign: 'center',
              fontFamily: koreanFontFamily,
              textShadow: '0 4px 30px rgba(0,0,0,0.9)',
              lineHeight: 1.4,
              wordBreak: 'keep-all',
              opacity: captionProgress,
              transform: `translateY(${(1 - captionProgress) * 20}px)`,
            }}>
              {descriptionKo}
            </div>
            <div style={{
              fontSize: 34,
              fontWeight: 500,
              color: '#94A3B8',
              textAlign: 'center',
              fontFamily: englishFontFamily,
              lineHeight: 1.4,
              marginTop: 10,
              opacity: captionProgress,
              transform: `translateY(${(1 - captionProgress) * 20}px)`,
            }}>
              {description}
            </div>
          </>
        ) : (
          <div style={{
            fontSize: 52,
            fontWeight: 800,
            color: '#FFFFFF',
            textAlign: 'center',
            fontFamily: englishFontFamily,
            textShadow: '0 4px 30px rgba(0,0,0,0.9)',
            lineHeight: 1.4,
            opacity: captionProgress,
            transform: `translateY(${(1 - captionProgress) * 20}px)`,
          }}>
            {description}
          </div>
        )}
      </AbsoluteFill>
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
  section: Section;
  lang: 'ko' | 'en';
}> = ({ frame, fps, word, pronunciation, meaning, meaningKo, section, lang }) => {
  if (frame < section.start || frame >= section.end) return null;

  const localFrame = frame - section.start;
  const wordScale = spring({ frame: localFrame, fps, config: { damping: 12, stiffness: 120, mass: 0.8 } });
  const pronOpacity = interpolate(localFrame, [8, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const meaningOpacity = interpolate(localFrame, [15, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [section.end - 10, section.end], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 200, opacity: fadeOut }}>
      <div style={{
        fontSize: 80,
        fontWeight: 900,
        color: '#06B6D4',
        fontFamily: englishFontFamily,
        textAlign: 'center',
        textShadow: '0 4px 30px rgba(6,182,212,0.5)',
        transform: `scale(${wordScale})`,
        letterSpacing: 2,
      }}>
        {word.toUpperCase()}
      </div>
      <div style={{
        fontSize: 34,
        fontWeight: 300,
        color: '#94A3B8',
        fontFamily: englishFontFamily,
        textAlign: 'center',
        marginTop: 16,
        opacity: pronOpacity,
      }}>
        {pronunciation}
      </div>
      {lang === 'ko' ? (
        <>
          <div style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#FFFFFF',
            fontFamily: koreanFontFamily,
            textAlign: 'center',
            marginTop: 24,
            opacity: meaningOpacity,
            lineHeight: 1.4,
            wordBreak: 'keep-all',
            padding: '0 50px',
          }}>
            {meaningKo}
          </div>
          <div style={{
            fontSize: 30,
            fontWeight: 400,
            color: '#CBD5E1',
            fontFamily: englishFontFamily,
            textAlign: 'center',
            marginTop: 12,
            opacity: meaningOpacity,
            padding: '0 50px',
          }}>
            {meaning}
          </div>
        </>
      ) : (
        <div style={{
          fontSize: 40,
          fontWeight: 500,
          color: '#FFFFFF',
          fontFamily: englishFontFamily,
          textAlign: 'center',
          marginTop: 24,
          opacity: meaningOpacity,
          lineHeight: 1.4,
          padding: '0 50px',
        }}>
          {meaning}
        </div>
      )}
    </AbsoluteFill>
  );
};

// ─── MemeCTA ───
const MemeCTA: React.FC<{
  frame: number;
  tagline: string;
  taglineKo: string;
  cta: string;
  ctaKo: string;
  section: Section;
  lang: 'ko' | 'en';
}> = ({ frame, tagline, taglineKo, cta, ctaKo, section, lang }) => {
  const fadeIn = interpolate(frame, [section.start, section.start + 15], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [section.end - 10, section.end], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  if (frame < section.start || frame >= section.end) return null;

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: fadeIn * fadeOut, padding: '0 60px' }}>
      <AbsoluteFill style={{ backgroundColor: 'rgba(15,23,42,0.75)' }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, zIndex: 1 }}>
        <div style={{
          fontSize: 60,
          fontWeight: 900,
          color: '#FFFFFF',
          fontFamily: lang === 'ko' ? koreanFontFamily : englishFontFamily,
          textAlign: 'center',
          lineHeight: 1.3,
          wordBreak: 'keep-all',
        }}>
          {lang === 'ko' ? taglineKo : tagline}
        </div>
        <div style={{
          fontSize: 38,
          fontWeight: 700,
          color: '#FFFFFF',
          fontFamily: lang === 'ko' ? koreanFontFamily : englishFontFamily,
          backgroundColor: '#06B6D4',
          padding: '16px 48px',
          borderRadius: 50,
          textAlign: 'center',
          wordBreak: 'keep-all',
          lineHeight: 1.4,
        }}>
          {lang === 'ko' ? ctaKo : cta}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Outro ───
const OutroSection: React.FC<{ frame: number; section: Section; lang: 'ko' | 'en' }> = ({ frame, section, lang }) => {
  const fadeIn = interpolate(frame, [section.start, section.start + 10], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [section.end - 10, section.end], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  if (frame < section.start || frame >= section.end) return null;

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: fadeIn * fadeOut, paddingBottom: 100 }}>
      <div style={{
        fontSize: 56,
        fontWeight: 900,
        color: '#06B6D4',
        fontFamily: englishFontFamily,
        textAlign: 'center',
        letterSpacing: 3,
        textShadow: '0 0 40px rgba(6,182,212,0.5)',
      }}>
        VocaVision AI
      </div>
      <div style={{
        fontSize: 40,
        fontWeight: 700,
        color: '#FFFFFF',
        fontFamily: englishFontFamily,
        textAlign: 'center',
        marginTop: 16,
        backgroundColor: 'rgba(6,182,212,0.15)',
        border: '2px solid rgba(6,182,212,0.4)',
        borderRadius: 12,
        padding: '10px 32px',
      }}>
        {lang === 'ko' ? 'vocavision.kr' : 'vocavision.app'}
      </div>
    </AbsoluteFill>
  );
};

// ─── Main Component ───
interface Props {
  wordIndex: number;
  lang: 'ko' | 'en';
}

export const MemeShort: React.FC<Props> = ({ wordIndex, lang }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const data = MEME_WORDS[wordIndex];
  const hookText = lang === 'ko' ? data.hookKo : data.hook;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)' }} />

      {/* BGM */}
      <Audio
        src={staticFile('audio/bgm-short.mp3')}
        volume={(f) => {
          if (f < 20) return interpolate(f, [0, 20], [0, 0.25], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          if (f > 700) return interpolate(f, [700, 750], [0.25, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return 0.25;
        }}
      />

      {/* Watermark */}
      <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 100 }}>
        <div style={{
          position: 'absolute', top: 70, left: 40,
          backgroundColor: 'rgba(0,0,0,0.35)',
          padding: '8px 16px', borderRadius: 20,
        }}>
          <span style={{
            fontSize: 26, fontWeight: 800, color: '#06B6D4',
            letterSpacing: 1, fontFamily: englishFontFamily,
          }}>
            VocaVision AI
          </span>
        </div>
      </AbsoluteFill>

      <HookText frame={frame} text={hookText} section={SECTIONS.hook} lang={lang} />
      <MemeSceneView frame={frame} imageUrl={data.scenes[0].imageUrl} description={data.scenes[0].description} descriptionKo={data.scenes[0].descriptionKo} section={SECTIONS.scene1} lang={lang} />
      <MemeSceneView frame={frame} imageUrl={data.scenes[1].imageUrl} description={data.scenes[1].description} descriptionKo={data.scenes[1].descriptionKo} section={SECTIONS.scene2} lang={lang} />
      <WordReveal frame={frame} fps={fps} word={data.word} pronunciation={data.pronunciation} meaning={data.meaning} meaningKo={data.meaningKo} section={SECTIONS.word} lang={lang} />
      <MemeCTA frame={frame} tagline={data.tagline} taglineKo={data.taglineKo} cta={data.cta} ctaKo={data.ctaKo} section={SECTIONS.cta} lang={lang} />
      <OutroSection frame={frame} section={SECTIONS.outro} lang={lang} />
    </AbsoluteFill>
  );
};
