# 🎬 VocaVision Remotion 영상 제작 레퍼런스
## GitHub repo: josens83/vocavision-video
## 최종 업데이트: 2026-02-05

---

## 📌 프로젝트 개요

VocaVision AI의 단어 학습 콘텐츠를 유튜브 쇼츠/인스타 릴스 영상으로 변환하는 Remotion 프로젝트.
`words.ts`에 데이터만 추가하면 새 영상이 자동 생성되는 템플릿 시스템.

**기술 스택:**
- Remotion (React 기반 비디오 생성)
- GitHub Actions (ubuntu-latest, Node.js 20) → MP4 렌더링
- 폰트: Noto Sans KR (한국어) + Inter (영어) via `@remotion/google-fonts`
- BGM: `public/audio/bgm-short.mp3` (volume 0.3, loop)
- 이미지: Supabase Storage (`word-images/visuals/`)

---

## 📁 프로젝트 파일 구조

```
vocavision-video/
├── src/
│   ├── Root.tsx                          # Composition 등록 (세트 추가 시 수정)
│   ├── compositions/
│   │   ├── CompanyIntro.tsx              # 회사 소개 영상 (75초, 16:9)
│   │   └── WordShort.tsx                 # 단어 쇼츠 메인 컴포지션 (55초, 9:16)
│   ├── components/
│   │   ├── WordSection.tsx               # 개별 단어 페이지 (15초, 애니메이션)
│   │   ├── CallToAction.tsx              # CTA 화면 ("vocavision.kr" 버튼)
│   │   ├── Transition.tsx                # 단어 간 전환 (2초, cyan fade)
│   │   ├── GradientBackground.tsx        # Navy 그라데이션 배경
│   │   └── Logo.tsx                      # VocaVision 로고
│   ├── data/
│   │   └── words.ts                      # 🔧 단어 데이터 (영상 제작 시 유일하게 수정)
│   ├── fonts.ts                          # Google Fonts 로드
│   ├── styles.ts                         # 브랜드 컬러 + 영상 설정 상수
│   └── index.ts
├── public/
│   └── audio/bgm-short.mp3
├── .github/workflows/render.yml          # GitHub Actions 렌더링
├── remotion.config.ts
├── package.json
└── tsconfig.json
```

---

## 🎥 영상 포맷 스펙 (WordShort)

| 항목 | 값 |
|------|-----|
| 해상도 | 1080 x 1920 (9:16 세로) |
| FPS | 30 |
| 총 길이 | 55초 (1,650 프레임) |
| 단어 수 | 3개 / 영상 |
| 배경 | Navy 그라데이션 (#0F172A → #1E293B) |
| 포인트 컬러 | Cyan (#06B6D4) |
| 뜻 컬러 | Gold (#F59E0B) |
| 출력 포맷 | MP4 |

### 타임라인 구조 (55초)

| 구간 | 시간 | 프레임 | 내용 |
|------|------|--------|------|
| 인트로 | 0~3초 | 0~90 | 로고 + "VocaVision AI" + "오늘의 영단어" + vocavision.kr |
| 단어 1 | 3~18초 | 90~540 | 단어 + 발음 + 뜻 + Rhyme + 이미지 + 예문 (15초) |
| 전환 1 | 18~20초 | 540~600 | Cyan 페이드 전환 (2초) |
| 단어 2 | 20~35초 | 600~1050 | 단어 + 발음 + 뜻 + Rhyme + 이미지 + 예문 (15초) |
| 전환 2 | 35~37초 | 1050~1110 | Cyan 페이드 전환 (2초) |
| 단어 3 | 37~52초 | 1110~1560 | 단어 + 발음 + 뜻 + Rhyme + 이미지 + 예문 (15초) |
| CTA | 52~55초 | 1560~1650 | "지금 무료로 시작하세요" + vocavision.kr 버튼 (3초) |

### 단어별 애니메이션 시퀀스 (15초, 450프레임)

| 프레임 | 요소 | 스타일 |
|--------|------|--------|
| 0~20 | 단어 | 96px, white, spring 애니메이션 |
| 15~35 | 발음 | IPA(32px) + 한국어 발음(32px), cyan |
| 90~110 | 뜻 | 56px, gold, bold |
| 150~170 | Rhyme 캡션 | 영어(34px, italic) + 한국어(28px, gray) |
| 210~230 | Rhyme 이미지 | 560x560, 라운드 16px, spring 애니메이션 |
| 360~380 | 예문 | 영어(32px, italic) + 한국어(28px, gray) |

---

## 📊 데이터 구조 (words.ts)

### WordData 인터페이스

```typescript
export interface WordData {
  word: string;           // 영단어 (예: "ubiquitous")
  meaning: string;        // 한국어 뜻 (예: "어디에나 있는")
  pronunciation: string;  // IPA 발음기호 (예: "/juːˈbɪk.wɪ.təs/")
  koreanPron: string;     // 한국어 발음 + 강세 (예: "유-비-퀴-터-스 (강세: 비)")
  stress: string;         // 강세 음절 (예: "비")
  rhymeCaption: string;   // Rhyme 영어 캡션
  rhymeCaptionKo: string; // Rhyme 한국어 해석
  rhymeImageUrl: string;  // Supabase Storage URL
  example: string;        // 예문 영어
  exampleKo: string;      // 예문 한국어 해석
}
```

### WordSet 인터페이스

```typescript
export interface WordSet {
  id: string;                              // "set-001", "set-002" 등
  title: string;                           // "오늘의 영단어"
  words: [WordData, WordData, WordData];   // 정확히 3개
}
```

### Rhyme 이미지 URL 패턴

```
https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/visuals/{word}-rhyme-{timestamp}.png
```

확인: Supabase Dashboard → Storage → word-images → visuals 에서 해당 단어 검색

---

## ✅ 현재 완성된 세트

| 세트 | 단어 3개 | 테마 |
|------|---------|------|
| set-001 (setIndex: 0) | ubiquitous / paradigm / conjecture | 첫 번째 쇼츠 |
| set-002 (setIndex: 1) | inevitable / acknowledge / conduct | 2026 수능 3회 반복 출제 TOP 3 |

---

## 🔧 새 세트 추가 시 수정할 파일 3개

### 1. `src/data/words.ts` — WORD_SETS 배열 끝에 추가

```typescript
{
  id: "set-NNN",
  title: "오늘의 영단어",
  words: [
    {
      word: "___",
      meaning: "___",
      pronunciation: "___",
      koreanPron: "___ (강세: ___)",
      stress: "___",
      rhymeCaption: "___",
      rhymeCaptionKo: "___",
      rhymeImageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/visuals/___-rhyme-___.png",
      example: "___",
      exampleKo: "___",
    },
    // 단어 2, 3 동일 구조
  ],
},
```

### 2. `src/Root.tsx` — Composition 추가

```tsx
<Composition
  id="WordShort-set-NNN"
  component={WordShort}
  durationInFrames={1650}
  fps={VIDEO.PORTRAIT.fps}
  width={VIDEO.PORTRAIT.width}
  height={VIDEO.PORTRAIT.height}
  defaultProps={{
    setIndex: N,  // WORD_SETS 배열 인덱스 (0부터 시작)
  }}
/>
```

### 3. `.github/workflows/render.yml` — options에 추가

```yaml
options:
  - CompanyIntro
  - WordShort
  - WordShort-set-001
  - WordShort-set-002
  - WordShort-set-NNN    # ← 추가
```

---

## 🎨 브랜드 컬러 (styles.ts)

```typescript
COLORS = {
  primary: '#0F172A',      // Navy (메인 배경)
  secondary: '#1E293B',    // Dark Navy (배경 그라데이션)
  accent: '#06B6D4',       // Cyan (포인트, 발음, Rhyme)
  accentGradient: '#0891B2',
  gold: '#F59E0B',         // 뜻(meaning) 텍스트
  gray: '#94A3B8',         // 보조 텍스트
  white: '#FFFFFF',        // 단어 텍스트
}
```

---

## ⚠️ 주의사항

- `words.ts` 외 컴포넌트 파일은 포맷 변경이 없는 한 수정 불필요
- Rhyme 이미지 URL은 반드시 Supabase에 실제 존재하는 URL이어야 함
- Composition의 `setIndex`는 WORD_SETS 배열의 인덱스 (0부터 시작)
- 한국어 텍스트는 반드시 `FONTS.korean` (Noto Sans KR) 사용
- 영어 텍스트는 `FONTS.english` (Inter) 사용
- WordSection.tsx의 `paddingTop: 200`은 현재 최적값 (변경 시 확인 필요)

---

## 🔍 트러블슈팅

| 증상 | 해결 |
|------|------|
| Rhyme 이미지 빈 화면 | Supabase URL 정확성 확인. Public 버킷인지 체크 |
| 한국어 폰트 깨짐 | fonts.ts에서 NotoSansKR weights 포함 확인 |
| 렌더링 실패 (timeout) | render.yml timeout-minutes: 30 확인. 이미지 크기 확인 |
| Rhyme 캡션 잘림 | WordSection.tsx maxWidth: 920 + paddingLeft/Right: 40 조정 |
| 단어 페이지 위치 이상 | WordSection.tsx paddingTop 값 조정 (현재 200) |
| GitHub Actions 안 보임 | repo가 Public인지 확인. Actions 탭 활성화 체크 |
