export interface MemeScene {
  description: string;
  descriptionKo: string;
  imageUrl: string;
}

export interface MemeWord {
  id: string;
  word: string;
  pronunciation: string;
  meaning: string;
  meaningKo: string;
  topLineKo: string;     // 상단 바 1줄 (한국어 훅)
  topLineEn: string;     // 상단 바 1줄 (영어 훅)
  scenes: [MemeScene, MemeScene, MemeScene];  // 정확히 3개
  meaningLockKo: string; // "아, 이게 바로 procrastination이구나"
  meaningLockEn: string;
  cta: string;
  ctaKo: string;
}

export const MEME_WORDS: MemeWord[] = [
  {
    id: "procrastination",
    word: "procrastination",
    pronunciation: "/prəˌkræstɪˈneɪʃən/",
    meaning: "delaying what you should already be doing",
    meaningKo: "해야 할 일을 자꾸 미루는 상태",
    topLineKo: "할 일은 많은데 손이 안 간다",
    topLineEn: "You know what to do. But still delay it.",
    scenes: [
      {
        description: "Work piling up. Can't even start.",
        descriptionKo: "할 일은 쌓였는데 손이 안 간다",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/meme/procrastination/procrastination-scene1.jpeg",
      },
      {
        description: "2AM. Just one more.",
        descriptionKo: "새벽 2시. 이것만 보고 자자",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/meme/procrastination/procrastination-scene2.jpeg",
      },
      {
        description: "Next morning. Still undone.",
        descriptionKo: "다음날 아침. 아직도 그대로다",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/meme/procrastination/procrastination-scene3.jpeg",
      },
    ],
    meaningLockKo: "아, 이게 바로 procrastination이구나",
    meaningLockEn: "oh, so this is the word for it",
    cta: "1 word a day. Follow or forget.",
    ctaKo: "하루 1단어. 보다 보면 박힌다",
  },
];
