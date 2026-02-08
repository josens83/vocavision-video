import React from 'react';
import { AbsoluteFill, Img } from 'remotion';
import { COLORS, FONTS } from '../styles';
import { WordData } from '../data/words';

interface InstaWordCardProps {
  word: WordData;
}

export const InstaWordCard: React.FC<InstaWordCardProps> = ({ word }) => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
        fontFamily: FONTS.korean,
        padding: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* 상단: 로고 + 태그 */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${COLORS.accent} 0%, #A855F7 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: 20,
            }}
          >
            V
          </div>
          <span style={{ color: 'white', fontSize: 18, fontWeight: 500 }}>
            VocaVision AI
          </span>
        </div>
        <span
          style={{
            background: COLORS.accent,
            color: 'white',
            padding: '6px 14px',
            borderRadius: 20,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          오늘의 영단어
        </span>
      </div>

      {/* 중앙: 이미지 */}
      <div
        style={{
          width: 400,
          height: 400,
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}
      >
        <Img
          src={word.rhymeImageUrl}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* 하단: 단어 정보 */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {/* 단어 */}
        <h1
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 800,
            fontFamily: FONTS.english,
            textTransform: 'uppercase',
            margin: 0,
            letterSpacing: 2,
          }}
        >
          {word.word}
        </h1>

        {/* 발음 */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ color: COLORS.accent, fontSize: 22 }}>
            {word.pronunciation}
          </span>
          <span style={{ color: COLORS.gray, fontSize: 20 }}>
            {word.koreanPron}
          </span>
        </div>

        {/* 뜻 */}
        <div
          style={{
            background: 'rgba(245, 158, 11, 0.15)',
            padding: '10px 24px',
            borderRadius: 12,
            marginTop: 8,
          }}
        >
          <span style={{ color: COLORS.gold, fontSize: 28, fontWeight: 700 }}>
            {word.meaning}
          </span>
        </div>

        {/* Rhyme */}
        <div
          style={{
            marginTop: 12,
            textAlign: 'center',
          }}
        >
          <p
            style={{
              color: COLORS.accent,
              fontSize: 18,
              fontStyle: 'italic',
              margin: 0,
              fontFamily: FONTS.english,
            }}
          >
            {word.rhymeCaption}
          </p>
          <p
            style={{
              color: COLORS.gray,
              fontSize: 16,
              margin: '4px 0 0 0',
            }}
          >
            {word.rhymeCaptionKo}
          </p>
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ color: COLORS.gray, fontSize: 14 }}>
            자세히 보고 연습하기
          </span>
          <span
            style={{
              color: COLORS.accent,
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            vocavision.kr
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default InstaWordCard;
