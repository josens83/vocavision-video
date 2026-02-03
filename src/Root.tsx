import React from 'react';
import { Composition } from 'remotion';
import { CompanyIntro } from './compositions/CompanyIntro';
import { WordShort } from './compositions/WordShort';
import { VIDEO } from './styles';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 회사 소개 영상 — 16:9, 75초 */}
      <Composition
        id="CompanyIntro"
        component={CompanyIntro}
        durationInFrames={2250}
        fps={VIDEO.LANDSCAPE.fps}
        width={VIDEO.LANDSCAPE.width}
        height={VIDEO.LANDSCAPE.height}
      />

      {/* 단어 쇼츠 — 9:16, 20초 */}
      <Composition
        id="WordShort"
        component={WordShort}
        durationInFrames={600}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          wordIndex: 0,
        }}
      />

      {/* 단어 쇼츠 — ubiquitous */}
      <Composition
        id="WordShort-ubiquitous"
        component={WordShort}
        durationInFrames={600}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          wordIndex: 0,
        }}
      />

      {/* 단어 쇼츠 — paradigm */}
      <Composition
        id="WordShort-paradigm"
        component={WordShort}
        durationInFrames={600}
        fps={VIDEO.PORTRAIT.fps}
        width={VIDEO.PORTRAIT.width}
        height={VIDEO.PORTRAIT.height}
        defaultProps={{
          wordIndex: 1,
        }}
      />
    </>
  );
};
