import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Scene01_Problem } from './Scene01_Problem';
import { Scene02_Solution } from './Scene02_Solution';
import { Scene03_Demo } from './Scene03_Demo';
import { Scene04_Scale } from './Scene04_Scale';
import { Scene05_Difference } from './Scene05_Difference';
import { Scene06_CTA } from './Scene06_CTA';

// 90초 = 2700프레임 @ 30fps
// Scene 1: 문제 제기    (0~10초,   0~300)
// Scene 2: 솔루션 소개  (10~25초,  300~750)
// Scene 3: 핵심 기능    (25~55초,  750~1650)
// Scene 4: 콘텐츠 규모  (55~65초,  1650~1950)
// Scene 5: 차별점       (65~80초,  1950~2400)
// Scene 6: CTA          (80~90초,  2400~2700)

export const CompanyIntroNew: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Scene 1: 문제 제기 (0~10초, 300프레임) */}
      <Sequence from={0} durationInFrames={300}>
        <Scene01_Problem />
      </Sequence>

      {/* Scene 2: 솔루션 소개 (10~25초, 450프레임) */}
      <Sequence from={300} durationInFrames={450}>
        <Scene02_Solution />
      </Sequence>

      {/* Scene 3: 핵심 기능 시연 (25~55초, 900프레임) */}
      <Sequence from={750} durationInFrames={900}>
        <Scene03_Demo />
      </Sequence>

      {/* Scene 4: 콘텐츠 규모 (55~65초, 300프레임) */}
      <Sequence from={1650} durationInFrames={300}>
        <Scene04_Scale />
      </Sequence>

      {/* Scene 5: 차별점 (65~80초, 450프레임) */}
      <Sequence from={1950} durationInFrames={450}>
        <Scene05_Difference />
      </Sequence>

      {/* Scene 6: CTA (80~90초, 300프레임) */}
      <Sequence from={2400} durationInFrames={300}>
        <Scene06_CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
