import React from 'react';
import { Composition } from 'remotion';
import { CompanyIntro } from './compositions/CompanyIntro';
import { WordShort } from './compositions/WordShort';
import { VIDEO } from './styles';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 회사 소개 영상 — 16:9, 75초 (기존 유지) */}
      <Composition
        id="CompanyIntro"
        component={CompanyIntro}
        durationInFrames={2250}
        fps={VIDEO.LANDSCAPE.fps}
        width={VIDEO.LANDSCAPE.width}
        height={VIDEO.LANDSCAPE.height}
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
    </>
  );
};
