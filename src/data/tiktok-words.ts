export interface TikTokScene {
  imageUrl: string;
  captionKo: string;
  captionEn: string;
}

export interface TikTokWord {
  id: string;
  word: string;
  pronunciation: string;
  meaningKo: string;
  meaningEn: string;
  hookLine1Ko: string;
  hookLine2Ko: string;
  hookLine1En: string;
  hookLine2En: string;
  scenes: TikTokScene[];
  bridgeKo: string;
  bridgeEn: string;
  ctaKo: string;
  ctaEn: string;
}

export const TIKTOK_WORDS: TikTokWord[] = [
  {
    id: "procrastination",
    word: "procrastination",
    pronunciation: "/prəˌkræstɪˈneɪʃən/",
    meaningKo: "할 일을 자꾸 미루는 것",
    meaningEn: "the habit of delaying tasks unnecessarily",
    hookLine1Ko: "할 일 산더미인데",
    hookLine2Ko: "유튜브 보는 중",
    hookLine1En: "Deadline tomorrow",
    hookLine2En: "Still on YouTube",
    scenes: [
      {
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/procrastination/procrastination-scene1.jpeg",
        captionKo: "\"내일 하면 되지...\"",
        captionEn: "\"I'll do it tomorrow...\"",
      },
      {
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/procrastination/procrastination-scene2.jpeg",
        captionKo: "\"아 진짜 이것만 보고\"",
        captionEn: "\"Just one more video...\"",
      },
      {
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/procrastination/procrastination-scene3.jpeg",
        captionKo: "근데 그 내일이 오늘이야",
        captionEn: "But tomorrow is today",
      },
    ],
    bridgeKo: "이걸 영어로\n뭐라 하는지 알아?",
    bridgeEn: "There's a word\nfor this feeling.",
    ctaKo: "이 단어 알고 있었어? 👇",
    ctaEn: "Did you know this word? 👇",
  },
];
