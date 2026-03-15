export interface StoryScene {
  description: string;
  descriptionKo: string;
  videoFile: string;
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
    scenes: [
      {
        description: "A father holds his baby daughter for the first time.",
        descriptionKo: "아버지가 처음으로 딸을 안는다.",
        videoFile: "videos/stories/ephemeral-scene1.mp4",
      },
      {
        description: "She takes her first steps. He blinks — she's already running.",
        descriptionKo: "첫 걸음을 뗀다. 눈 깜짝할 사이 — 벌써 달리고 있다.",
        videoFile: "videos/stories/ephemeral-scene2.mp4",
      },
      {
        description: "Graduation day. She lets go of his hand.",
        descriptionKo: "졸업식 날. 그녀가 아버지의 손을 놓는다.",
        videoFile: "videos/stories/ephemeral-scene3.mp4",
      },
    ],
    emotion: "Everything beautiful disappears too fast.",
    emotionKo: "아름다운 모든 것은 너무 빨리 사라진다.",
    closingLine: "Some moments are ephemeral. Hold them while you can.",
    closingLineKo: "어떤 순간은 덧없다. 가능할 때 붙잡아라.",
  },
];
