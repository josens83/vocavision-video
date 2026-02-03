import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { COLORS } from '../styles';
import { WordData } from '../data/words';

export const WordCard: React.FC<{
  word: WordData;
  showMeaning?: boolean;
  showMnemonic?: boolean;
  showRhyme?: boolean;
}> = ({ word, showMeaning = true, showMnemonic = true, showRhyme = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({ frame, fps, config: { damping: 12 } });
  const meaningOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const mnemonicOpacity = interpolate(frame, [45, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rhymeOpacity = interpolate(frame, [70, 85], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        transform: `scale(${cardScale})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 30,
        padding: 40,
      }}
    >
      {/* 단어 */}
      <div
        style={{
          fontSize: 100,
          fontWeight: 800,
          color: 'white',
          fontFamily: 'Inter, sans-serif',
          textTransform: 'lowercase',
        }}
      >
        {word.word}
      </div>

      {/* 발음 */}
      <div
        style={{
          fontSize: 32,
          color: COLORS.accent,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {word.pronunciation} · {word.koreanPron}
      </div>

      {/* 뜻 */}
      {showMeaning && (
        <div
          style={{
            opacity: meaningOpacity,
            fontSize: 48,
            fontWeight: 600,
            color: COLORS.gold,
            fontFamily: 'Pretendard, sans-serif',
          }}
        >
          {word.meaning}
        </div>
      )}

      {/* 암기법 */}
      {showMnemonic && (
        <div
          style={{
            opacity: mnemonicOpacity,
            fontSize: 36,
            color: COLORS.green,
            fontFamily: 'Pretendard, sans-serif',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.5,
          }}
        >
          💡 {word.mnemonic}
        </div>
      )}

      {/* 라임 */}
      {showRhyme && (
        <div
          style={{
            opacity: rhymeOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: 'white',
              fontFamily: 'Inter, sans-serif',
              fontStyle: 'italic',
            }}
          >
            🎵 "{word.rhyme}"
          </div>
          <div
            style={{
              fontSize: 24,
              color: COLORS.gray,
              fontFamily: 'Pretendard, sans-serif',
            }}
          >
            → {word.rhymeKo}
          </div>
        </div>
      )}
    </div>
  );
};
