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
  {
    id: "hesitation",
    word: "hesitation",
    pronunciation: "/ˌhezɪˈteɪʃən/",
    meaning: "a pause before doing something uncertain",
    meaningKo: "불확실한 것 앞에서 멈추는 순간",
    hook: "The moment before you say 'I love you.'",
    hookKo: "\"사랑해\"를 말하기 직전, 그 순간.",
    scenes: [
      {
        description: "A message typed. The send button — untouched.",
        descriptionKo: "문자는 써졌다. 전송 버튼 — 누르지 못했다.",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/hesitation/hesitation-scene1.jpeg",
      },
      {
        description: "The first time they met. Everything felt possible.",
        descriptionKo: "처음 만났던 날. 모든 것이 가능해 보였다.",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/hesitation/hesitation-scene2.jpeg",
      },
      {
        description: "He opened his mouth. Then looked away.",
        descriptionKo: "그가 입을 열었다. 그리고 시선을 피했다.",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/hesitation/hesitation-scene3.jpeg",
      },
      {
        description: "She walked away. His hand — half raised, too late.",
        descriptionKo: "그녀가 걸어갔다. 그의 손 — 반쯤 들렸다가, 내려졌다.",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/hesitation/hesitation-scene4.jpeg",
      },
      {
        description: "An empty chair. The message still unsent.",
        descriptionKo: "빈 의자. 문자는 아직도 전송되지 않았다.",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/hesitation/hesitation-scene5.jpeg",
      },
    ],
    emotion: "The words you never said live the longest.",
    emotionKo: "말하지 못한 말이 가장 오래 남는다.",
    symbolOverlay: undefined,
    closingLine: "Hesitation costs more than the risk itself.",
    closingLineKo: "망설임의 대가는 위험보다 크다.",
  },
  {
    id: "resilience",
    word: "resilience",
    pronunciation: "/rɪˈzɪliəns/",
    meaning: "the ability to recover from difficult situations",
    meaningKo: "힘든 상황에서 다시 회복하는 능력",
    hook: "Some people break. Others get back up.",
    hookKo: "어떤 사람은 부러진다. 어떤 사람은 다시 선다.",
    scenes: [
      {
        description: "Sitting in the rain. Everything has fallen apart.",
        descriptionKo: "빗속에 주저앉는다. 모든 것이 무너졌다.",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/resilience/resilience-scene1.jpeg",
      },
      {
        description: "There was a time — when everything felt light.",
        descriptionKo: "한때는 — 모든 것이 가벼웠던 때가 있었다.",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/resilience/resilience-scene2.jpeg",
      },
      {
        description: "The night no one sees. The tears no one knows.",
        descriptionKo: "아무도 모르는 밤. 아무도 모르는 눈물.",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/resilience/resilience-scene3.jpeg",
      },
      {
        description: "One knee on the ground. The decision to stand.",
        descriptionKo: "한쪽 무릎을 딛고. 일어서기로 한다.",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/resilience/resilience-scene4.jpeg",
      },
      {
        description: "The rain has stopped. One step forward.",
        descriptionKo: "비가 그쳤다. 한 걸음 내딛는다.",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/resilience/resilience-scene5.jpeg",
      },
    ],
    emotion: "Falling is not failure. Staying down is.",
    emotionKo: "쓰러지는 것이 실패가 아니다. 일어나지 않는 것이 실패다.",
    symbolOverlay: undefined,
    closingLine: "Resilience is not about never breaking. It's about always rising.",
    closingLineKo: "회복탄력성은 부러지지 않는 것이 아니다. 언제나 다시 일어서는 것이다.",
  },
  {
    id: "nostalgia",
    word: "nostalgia",
    pronunciation: "/nɒˈstældʒə/",
    meaning: "a longing for the happiness of the past",
    meaningKo: "과거의 행복을 그리워하는 마음",
    hook: "This smell takes you back 20 years.",
    hookKo: "이 냄새가 20년 전으로 데려간다.",
    scenes: [
      {
        description: "A familiar smell. Suddenly, she is somewhere else.",
        descriptionKo: "익숙한 냄새. 순간, 그녀는 다른 곳에 있다.",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/nostalgia/nostalgia-scene1.jpeg",
      },
      {
        description: "Mother's kitchen. The warmest place she ever knew.",
        descriptionKo: "엄마의 부엌. 세상에서 가장 따뜻한 곳.",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/nostalgia/nostalgia-scene2.jpeg",
      },
      {
        description: "Her hands were always gentle. Always safe.",
        descriptionKo: "엄마의 손은 언제나 부드러웠다. 언제나 안전했다.",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/nostalgia/nostalgia-scene3.jpeg",
      },
      {
        description: "Leaving home. Mother waving from the gate.",
        descriptionKo: "집을 떠나던 날. 대문에서 손 흔들던 엄마.",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/nostalgia/nostalgia-scene4.jpeg",
      },
      {
        description: "The same soup. But it never tastes quite the same.",
        descriptionKo: "같은 국. 그런데 맛이 같지 않다.",
        imageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/stories/nostalgia/nostalgia-scene5.jpeg",
      },
    ],
    emotion: "You don't miss a place. You miss a feeling.",
    emotionKo: "그리운 건 장소가 아니다. 그 느낌이다.",
    symbolOverlay: undefined,
    closingLine: "Nostalgia is love for something you can't return to.",
    closingLineKo: "향수는 돌아갈 수 없는 것에 대한 사랑이다.",
  },
];
