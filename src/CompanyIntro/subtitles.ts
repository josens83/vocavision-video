export interface SubtitleEntry {
  startFrame: number;
  endFrame: number;
  textKR: string;
  textEN: string;
}

export const SUBTITLES: SubtitleEntry[] = [
  {
    startFrame: 30,    // 1초 후 시작
    endFrame: 270,     // ~9초
    textKR: '영단어, 외워도 외워도 까먹으시죠?',
    textEN: 'You study English vocabulary, but keep forgetting, right?',
  },
  {
    startFrame: 330,   // 11초
    endFrame: 700,     // ~23초
    textKR: 'VocaVision AI는 AI 이미지와 재미있는 라임으로\n영단어를 머릿속에 그려넣는 학습법입니다.',
    textEN: 'VocaVision AI uses AI-generated images and fun rhymes\nto paint words in your mind.',
  },
  {
    startFrame: 780,   // 26초
    endFrame: 1550,    // ~52초
    textKR: 'AI 이미지로 시각적으로 기억하고,\n어원 분석으로 뿌리부터 이해하고,\n재미있는 라임으로 한번 들으면 잊을 수 없습니다.',
    textEN: 'Visually remember with AI images,\nunderstand roots through etymology,\nand never forget with catchy rhymes.',
  },
  {
    startFrame: 1680,  // 56초
    endFrame: 1920,    // 64초
    textKR: '수능, 텝스, 토플까지\n7,600개 이상의 단어를 커버합니다.',
    textEN: 'Covering over 7,600 words\nacross CSAT, TEPS, and TOEFL.',
  },
  {
    startFrame: 1980,  // 66초
    endFrame: 2370,    // 79초
    textKR: '일반 단어장은 뜻만 나열합니다.\nVocaVision은 여러분의 뇌가 기억하기 쉬운 방식으로\n설계되었습니다.',
    textEN: 'Regular flashcards just list definitions.\nVocaVision is designed for how\nyour brain actually remembers.',
  },
  {
    startFrame: 2430,  // 81초
    endFrame: 2670,    // 89초
    textKR: '지금 무료로 시작하세요.\nVocaVision AI, 이미지로 기억하는 영단어.',
    textEN: 'Start for free today.\nVocaVision AI — vocabulary you can see.',
  },
];
