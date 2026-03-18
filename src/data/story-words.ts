export interface StoryScene {
  description: string;
  descriptionKo: string;
  imageUrl: string;
  videoUrl?: string;
}

export interface StoryWord {
  id: string;
  word: string;
  pronunciation: string;
  meaning: string;
  meaningKo: string;
  hook: string;
  hookKo: string;
  scenes: StoryScene[];
  emotion: string;
  emotionKo: string;
  closingLine: string;
  closingLineKo: string;
  symbolOverlay?: 'cherryBlossom' | 'rain' | 'leaves' | 'snow' | 'dust';
}

export const STORY_WORDS: StoryWord[] = [
  {
    id: "ephemeral",
    word: "ephemeral",
    pronunciation: "/ɪˈfemərəl/",
    meaning: "lasting for a very short time",
    meaningKo: "아주 짧은 시간만 지속되는",
    hook: "You only notice this moment when it's gone.",
    hookKo: "이 순간은 사라져야 알아챈다.",
    symbolOverlay: "cherryBlossom",
    scenes: [
      {
        description: "A father holds his newborn daughter for the very first time.",
        descriptionKo: "아버지가 처음으로 딸을 안는다.",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/ephemeral/ephemeral-scene1.jpeg",
      },
      {
        description: "He sits by the window. The house is quiet now.",
        descriptionKo: "창가에 혼자 앉는다. 집이 조용해졌다.",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/ephemeral/ephemeral-scene2.jpeg",
      },
      {
        description: "She takes her first steps toward him.",
        descriptionKo: "아장아장, 그에게로 걸어온다.",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/ephemeral/ephemeral-scene3.jpeg",
      },
      {
        description: "She laughs. He catches her. Cherry blossoms fall.",
        descriptionKo: "딸이 웃는다. 아버지가 받아 안는다. 벚꽃이 진다.",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/ephemeral/ephemeral-scene4.jpeg",
      },
      {
        description: "Graduation day. She lets go of his hand.",
        descriptionKo: "졸업식 날. 그녀가 아버지의 손을 놓는다.",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/ephemeral/ephemeral-scene5.jpeg",
      },
    ],
    emotion: "Everything beautiful disappears too fast.",
    emotionKo: "아름다운 모든 것은 너무 빨리 사라진다.",
    closingLine: "Some moments are ephemeral. Hold them while you can.",
    closingLineKo: "어떤 순간은 덧없다. 가능할 때 붙잡아라.",
  },
];
