import React from 'react';
import { AbsoluteFill, OffthreadVideo, staticFile } from 'remotion';
import { COLORS } from '../styles';

export const PhoneMockup: React.FC<{
  videoSrc?: string;
  width?: number;
  height?: number;
}> = ({ videoSrc, width = 350, height = 700 }) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 40,
        border: '4px solid rgba(255,255,255,0.3)',
        background: 'rgba(255,255,255,0.05)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* 노치 영역 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 120,
          height: 30,
          background: '#000',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          zIndex: 10,
        }}
      />

      {/* 비디오 또는 플레이스홀더 */}
      {videoSrc ? (
        <OffthreadVideo
          src={staticFile(videoSrc)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
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
      )}
    </div>
  );
};
