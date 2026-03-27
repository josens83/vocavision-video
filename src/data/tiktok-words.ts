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
  {
    id: "cognitive-dissonance",
    word: "cognitive dissonance",
    pronunciation: "/ˌkɒɡnɪtɪv ˈdɪsənəns/",
    meaningKo: "자기 행동과 신념이 충돌할 때 느끼는 불편함",
    meaningEn: "the discomfort of acting against your own beliefs",
    hookLine1Ko: "다이어트 한다면서",
    hookLine2Ko: "치킨 시키는 이유",
    hookLine1En: "Starting a diet",
    hookLine2En: "Ordering chicken",
    scenes: [
      {
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/cognitive%20dissonance/cognitive%20dissonance-scene1.jpeg",
        captionKo: "\"오늘부터 진짜 한다\"",
        captionEn: "\"Today is THE day.\"",
      },
      {
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/cognitive%20dissonance/cognitive%20dissonance-scene2.jpeg",
        captionKo: "\"근데 오늘 좀 피곤하긴 해...\"",
        captionEn: "\"But maybe... not today.\"",
      },
      {
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/cognitive%20dissonance/cognitive%20dissonance-scene3.jpeg",
        captionKo: "\"내일부터 하면 되지 뭐\"",
        captionEn: "\"I deserve this.\"",
      },
    ],
    bridgeKo: "뇌가 자기를\n속이는 거야",
    bridgeEn: "Your brain is\nlying to you.",
    ctaKo: "이거 나인데? 하는 사람 ✋",
    ctaEn: "Your brain does this too? 👇",
  },
  {
    id: "vindication",
    word: "vindication",
    pronunciation: "/ˌvɪndɪˈkeɪʃən/",
    meaningKo: "자신이 옳았음이 증명되는 순간",
    meaningEn: "the proof that you were right all along",
    hookLine1Ko: "다들 안 된다고 했는데",
    hookLine2Ko: "해냈을 때",
    hookLine1En: "They all said no",
    hookLine2En: "He proved them wrong",
    scenes: [
      {
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/vindication/vindication-scene1.jpeg",
        captionKo: "\"현실적으로 생각해\"",
        captionEn: "\"Be realistic.\"",
      },
      {
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/vindication/vindication-scene2.jpeg",
        captionKo: "아무도 보지 않는 곳에서 계속했다",
        captionEn: "He kept going when no one watched.",
      },
      {
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/vindication/vindication-scene3.jpeg",
        captionKo: "그리고 증명했다",
        captionEn: "And then he proved it.",
      },
    ],
    bridgeKo: "그 순간을 설명하는\n단어가 있어",
    bridgeEn: "There's a word\nfor that moment.",
    ctaKo: "이런 순간 겪어본 사람? 👇",
    ctaEn: "Ever felt this? 👇",
  },
  {
    id: "complacency",
    word: "complacency",
    pronunciation: "/kəmˈpleɪsənsi/",
    meaningKo: "현재에 안주하는 위험한 만족감",
    meaningEn: "a dangerous satisfaction with how things are",
    hookLine1Ko: "지금 편한 게",
    hookLine2Ko: "제일 위험하다",
    hookLine1En: "Feeling comfortable?",
    hookLine2En: "That's the danger.",
    scenes: [
      {
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/complacency/complacency-scene1.jpeg",
        captionKo: "\"딱히 불만은 없어\"",
        captionEn: "\"Nothing to complain about.\"",
      },
      {
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/complacency/complacency-scene2.jpeg",
        captionKo: "근데 뭔가 달라진 건 없어",
        captionEn: "But nothing has changed either.",
      },
      {
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/complacency/complacency-scene3.jpeg",
        captionKo: "1년 전이랑 똑같은 나",
        captionEn: "Same person as a year ago.",
      },
    ],
    bridgeKo: "이 상태를 설명하는\n단어가 있어",
    bridgeEn: "There's a word\nfor this state.",
    ctaKo: "너도 지금 이 상태? 👇",
    ctaEn: "Are you stuck too? 👇",
  },
];
