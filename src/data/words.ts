export interface WordData {
  word: string;
  meaning: string;           // 한국어 뜻
  pronunciation: string;     // IPA 발음기호
  koreanPron: string;        // 한국어 발음
  stress: string;            // 강세 음절
  rhymeCaption: string;      // Rhyme 영어 캡션 (짧은 문구)
  rhymeCaptionKo: string;    // Rhyme 캡션 한국어 해석
  rhymeImageUrl: string;     // Supabase rhyme 이미지 URL
  example: string;           // 예문 (영어)
  exampleKo: string;         // 예문 (한국어 해석)
}

// 3단어 세트 인터페이스
export interface WordSet {
  id: string;                // 예: "set-001"
  title: string;             // 예: "오늘의 영단어"
  words: [WordData, WordData, WordData];  // 정확히 3개
}

// ============================================================
// 🔧 영상 제작 시 아래 데이터만 수정하면 됩니다
// 각 단어의 모든 필드를 원하는 대로 변경 가능합니다
//
// rhymeImageUrl 확인:
//   Supabase → Storage → word-images → visuals
//   패턴: https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/visuals/{파일명}
// ============================================================

export const WORD_SETS: WordSet[] = [
  {
    id: "set-001",
    title: "오늘의 영단어",
    words: [
      {
        word: "ubiquitous",
        meaning: "어디에나 있는",
        pronunciation: "/juːˈbɪk.wɪ.təs/",
        koreanPron: "유-비-퀴-터스",
        stress: "비",
        rhymeCaption: "Ubiquitous — you be with us, everywhere.",
        rhymeCaptionKo: "유비쿼터스 — 너 우리와 함께, 어디에나",
        rhymeImageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/visuals/ubiquitous-rhyme-1768381623510.png",
        example: "Smartphones have become ubiquitous in modern life.",
        exampleKo: "스마트폰은 현대 생활에서 어디에나 있게 되었다.",
      },
      {
        word: "paradigm",
        meaning: "사고방식의 틀",
        pronunciation: "/ˈpær.ə.daɪm/",
        koreanPron: "패-러-다임",
        stress: "패",
        rhymeCaption: "Through time we climb to build a new paradigm!",
        rhymeCaptionKo: "시간을 통해 올라 새로운 패러다임을 만든다!",
        rhymeImageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/visuals/paradigm-rhyme-1768311466472.png",
        example: "A paradigm shift changes how you think.",
        exampleKo: "패러다임 전환은 사고방식을 바꾼다.",
      },
      {
        word: "conjecture",
        meaning: "추측, 가설",
        pronunciation: "/kənˈdʒek.tʃər/",
        koreanPron: "컨-젝-쳐",
        stress: "젝",
        rhymeCaption: "A conjecture without structure leads to rupture.",
        rhymeCaptionKo: "구조 없는 추측은 결국 망한다.",
        rhymeImageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/visuals/conjecture-rhyme-1768312988877.png",
        example: "My conjecture about the missing cookies pointed to my cat.",
        exampleKo: "사라진 쿠키에 대한 내 추측은 고양이를 가리켰다.",
      },
    ],
  },
];

// 하위 호환: 기존 SAMPLE_WORDS 유지
export const SAMPLE_WORDS = WORD_SETS[0].words;
