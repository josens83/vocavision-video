import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { GradientBackground } from '../components/GradientBackground';
import { Logo } from '../components/Logo';
import { TextReveal } from '../components/TextReveal';
import { CallToAction } from '../components/CallToAction';
import { COLORS } from '../styles';

export const CompanyIntro: React.FC = () => {
  // 30fps × 75초 = 2250프레임
  return (
    <AbsoluteFill>
      <GradientBackground />

      {/* Scene 1: 로고 인트로 (0~5초, 0~150프레임) */}
      <Sequence from={0} durationInFrames={150}>
        <AbsoluteFill
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <Logo size={160} />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: 문제 제기 (5~12초, 150~360) */}
      <Sequence from={150} durationInFrames={210}>
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 80,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'center' }}>
            <TextReveal
              text="영어 단어, 아직 무작정 외우세요?"
              fontSize={64}
              color="white"
            />
            <TextReveal
              text="외워도 까먹고, 까먹어도 또 외우고..."
              startFrame={45}
              fontSize={40}
              color={COLORS.gray}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: 해결책 — 3가지 차별점 (12~30초, 360~900) */}
      {/* Feature 1: AI 8단계 학습 */}
      <Sequence from={360} durationInFrames={180}>
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 80,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
            <TextReveal text="①" fontSize={80} color={COLORS.accent} />
            <TextReveal
              text="AI가 만든 8단계 학습 콘텐츠"
              startFrame={15}
              fontSize={56}
              color="white"
            />
            <TextReveal
              text="어원 → 암기법 → 라임 → 예문"
              startFrame={30}
              fontSize={36}
              color={COLORS.gray}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Feature 2: 이미지 기반 시각 암기 */}
      <Sequence from={540} durationInFrames={180}>
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 80,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
            <TextReveal text="②" fontSize={80} color={COLORS.accent} />
            <TextReveal
              text="이미지로 기억하는 시각 암기"
              startFrame={15}
              fontSize={56}
              color="white"
            />
            <TextReveal
              text="개념 이미지 + 암기법 이미지"
              startFrame={30}
              fontSize={36}
              color={COLORS.gray}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Feature 3: 간격 반복 */}
      <Sequence from={720} durationInFrames={180}>
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 80,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
            <TextReveal text="③" fontSize={80} color={COLORS.accent} />
            <TextReveal
              text="잊기 직전에 다시! 간격 반복"
              startFrame={15}
              fontSize={56}
              color="white"
            />
            <TextReveal
              text="과학적 복습 시스템으로 장기 기억"
              startFrame={30}
              fontSize={36}
              color={COLORS.gray}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: 앱 데모 자리 — 나중에 화면 녹화 삽입 (30~50초, 900~1500) */}
      <Sequence from={900} durationInFrames={600}>
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 80,
          }}
        >
          {/* TODO: 폰 목업 + 화면 녹화 영상 삽입 */}
          <div
            style={{
              width: 350,
              height: 700,
              borderRadius: 40,
              border: '4px solid rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.05)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 24,
              color: COLORS.gray,
              fontFamily: 'Pretendard, sans-serif',
            }}
          >
            📱 화면 녹화 삽입 예정
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 5: 실적 숫자 (50~60초, 1500~1800) */}
      <Sequence from={1500} durationInFrames={300}>
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 80,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'center' }}>
            <TextReveal
              text="수능 필수 단어 1,787개 완벽 수록"
              fontSize={48}
              color="white"
            />
            <TextReveal
              text="TEPS 고급어휘 388개"
              startFrame={30}
              fontSize={48}
              color="white"
            />
            <TextReveal
              text="100% AI 생성 콘텐츠 + 이미지"
              startFrame={60}
              fontSize={40}
              color={COLORS.accent}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 6: CTA (60~75초, 1800~2250) */}
      <Sequence from={1800} durationInFrames={450}>
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
            <Logo size={80} />
            <CallToAction startFrame={30} />
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
