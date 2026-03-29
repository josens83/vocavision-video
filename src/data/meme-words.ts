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
  hook: string;
  hookKo: string;
  scenes: [MemeScene, MemeScene] | [MemeScene, MemeScene, MemeScene];  // 2개 또는 3개
  tagline: string;
  taglineKo: string;
  cta: string;
  ctaKo: string;
}

export const MEME_WORDS: MemeWord[] = [
  {
    id: "procrastination",
    word: "procrastination",
    pronunciation: "/prəˌkræstɪˈneɪʃən/",
    meaning: "the act of delaying something you should do",
    meaningKo: "해야 할 일을 계속 미루는 것",
    hook: "This word is my life.",
    hookKo: "이 단어가 내 인생이다.",
    scenes: [
      {
        description: "To-do list. Deadlines. Everything waiting.",
        descriptionKo: "할 일 목록. 마감. 모든 게 기다리는 중.",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/meme/procrastination/procrastination-scene1.jpeg",
      },
      {
        description: "2AM. Still watching. 'Just one more.'",
        descriptionKo: "새벽 2시. 아직도 보는 중. '한 편만 더.'",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/meme/procrastination/procrastination-scene2.png",
      },
    ],
    tagline: "We all do this.",
    taglineKo: "우리 모두 이런다.",
    cta: "1 word a day. Follow or forget.",
    ctaKo: "매일 1단어. 팔로우하면 내일도 옵니다.",
  },
];
