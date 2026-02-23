import React from 'react';
import {
  OffthreadVideo,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from 'remotion';

interface Props {
  videoSrc: string;
  startFrom?: number; // 영상의 시작 시점 (초)
}

export const PhoneMockup: React.FC<Props> = ({ videoSrc, startFrom = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 폰 등장 애니메이션
  const scale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        transform: `scale(${scale})`,
      }}
    >
      {/* 폰 프레임 */}
      <div
        style={{
          position: 'relative',
          width: 300,
          height: 650,
          borderRadius: 40,
          border: '8px solid #1c1c1e',
          backgroundColor: '#000',
          overflow: 'hidden',
          boxShadow:
            '0 25px 60px rgba(0,0,0,0.4), 0 0 0 2px rgba(255,255,255,0.1)',
        }}
      >
        {/* 상단 노치 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 120,
            height: 25,
            backgroundColor: '#1c1c1e',
            borderRadius: '0 0 20px 20px',
            zIndex: 10,
          }}
        />

        {/* 실제 녹화 영상 */}
        <OffthreadVideo
          src={videoSrc}
          startFrom={startFrom * fps}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
};
