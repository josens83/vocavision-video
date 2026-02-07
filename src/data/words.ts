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
        koreanPron: "유-비-퀴-터스 (강세: 비)",
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
        koreanPron: "패-러-다임 (강세: 패)",
        stress: "패",
        rhymeCaption: "We tear the old design, then align a new paradigm.",
        rhymeCaptionKo: "낡은 방식은 버리고, 새로운 기준으로 움직인다!",
        rhymeImageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/visuals/paradigm-rhyme-1770167215679.png",
        example: "A paradigm shift changes how you think.",
        exampleKo: "패러다임 전환은 사고방식을 바꾼다.",
      },
      {
        word: "conjecture",
        meaning: "추측, 가설",
        pronunciation: "/kənˈdʒek.tʃər/",
        koreanPron: "컨-젝-쳐 (강세: 젝)",
        stress: "젝",
        rhymeCaption: "From a cracked picture, we manufacture conjecture.",
        rhymeCaptionKo: "조각난 단서로, 머릿속에서 추측을 만들어낸다.",
        rhymeImageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/visuals/conjecture-rhyme-1770170237828.png",
        example: "My conjecture about the missing cookies pointed to my cat.",
        exampleKo: "사라진 쿠키에 대한 내 추측은 고양이를 가리켰다.",
      },
    ],
  },
  {
    id: "set-002",
    title: "오늘의 영단어",
    words: [
      {
        word: "inevitable",
        meaning: "피할 수 없는, 불가피한",
        pronunciation: "/ɪnˈev.ɪ.tə.bəl/",
        koreanPron: "이-네-비-터-블 (강세: 네)",
        stress: "네",
        rhymeCaption: "You never beat fate — inevitable.",
        rhymeCaptionKo: "피하려 해도, 결국 마주친다.",
        rhymeImageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/visuals/inevitable-rhyme-1770260572030.png",
        example: "Change is inevitable — the only question is when.",
        exampleKo: "변화는 불가피하다 — 문제는 언제인가뿐.",
      },
      {
        word: "acknowledge",
        meaning: "인정하다",
        pronunciation: "/əkˈnɑːl.ɪdʒ/",
        koreanPron: "억-날-리지 (강세: 날)",
        stress: "날",
        rhymeCaption: "I nod to knowledge — acknowledge.",
        rhymeCaptionKo: "고개를 끄덕여, 봤다는 걸 인정한다.",
        rhymeImageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/visuals/acknowledge-rhyme-1770271252914.png",
        example: "She acknowledged her mistake and apologized.",
        exampleKo: "그녀는 실수를 인정하고 사과했다.",
      },
      {
        word: "conduct",
        meaning: "수행하다, 실시하다",
        pronunciation: "/kənˈdʌkt/",
        koreanPron: "컨-덕-트 (강세: 덕)",
        stress: "덕",
        rhymeCaption: "Conduct the research, conduct the band — both need a steady hand.",
        rhymeCaptionKo: "연구를 수행하든, 악단을 지휘하든 — 둘 다 흔들리지 않는 손이 필요하다.",
        rhymeImageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/visuals/conduct-rhyme-1770267446240.png",
        example: "The team conducted a survey of 1,000 students.",
        exampleKo: "그 팀은 학생 1,000명을 대상으로 설문조사를 실시했다.",
      },
    ],
  },
  {
    id: "set-003",
    title: "오늘의 영단어",
    words: [
      {
        word: "distinct",
        meaning: "뚜렷한, 구별되는",
        pronunciation: "/dɪˈstɪŋkt/",
        koreanPron: "디-스팅크트 (강세: 스팅)",
        stress: "스팅",
        rhymeCaption: "Clip the link — keep it distinct.",
        rhymeCaptionKo: "연결을 끊어, 분명히 나눈다.",
        rhymeImageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/visuals/distinct-rhyme-1770284297184.png",
        example: "The two languages have distinct grammar rules.",
        exampleKo: "그 두 언어는 뚜렷하게 다른 문법 규칙을 가지고 있다.",
      },
      {
        word: "emerge",
        meaning: "나타나다, 드러나다",
        pronunciation: "/ɪˈmɜːrdʒ/",
        koreanPron: "이-머지 (강세: 머)",
        stress: "머",
        rhymeCaption: "From what we immerse, a clear image starts to emerge.",
        rhymeCaptionKo: "잠겨 있던 것 속에서, 형체가 서서히 드러난다.",
        rhymeImageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/visuals/emerge-rhyme-1770284446806.png",
        example: "New evidence emerged during the investigation.",
        exampleKo: "조사 중에 새로운 증거가 드러났다.",
      },
      {
        word: "restraint",
        meaning: "자제, 억제",
        pronunciation: "/rɪˈstreɪnt/",
        koreanPron: "리-스트레인트 (강세: 스트레인)",
        stress: "스트레인",
        rhymeCaption: "The urge strains forward. I pull it back — restraint.",
        rhymeCaptionKo: "충동은 나아가려 하고, 나는 끝에서 멈춘다.",
        rhymeImageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/visuals/restraint-rhyme-1770284136808.png",
        example: "She showed remarkable restraint during the heated debate.",
        exampleKo: "그녀는 격렬한 토론 중에 놀라운 자제력을 보였다.",
      },
    ],
  },
  {
    id: "set-004",
    title: "오늘의 영단어",
    words: [
      {
        word: "tampering",
        meaning: "조작, 불법 접촉",
        pronunciation: "/ˈtæm.pər.ɪŋ/",
        koreanPron: "탬-퍼-링 (강세: 탬)",
        stress: "탬",
        rhymeCaption: "Tampering? They're hampering!",
        rhymeCaptionKo: "불법 접촉? 그건 방해 행위야!",
        rhymeImageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/visuals/tampering-rhyme-1770430476310.png",
        example: "The agency was accused of tampering with artists from rival companies.",
        exampleKo: "그 기획사는 경쟁사 아티스트를 불법 접촉한 혐의를 받았다.",
      },
      {
        word: "tempering",
        meaning: "담금질, 단련",
        pronunciation: "/ˈtem.pər.ɪŋ/",
        koreanPron: "템-퍼-링 (강세: 템)",
        stress: "템",
        rhymeCaption: "Tempering steel, remember the feel — temperature makes it real.",
        rhymeCaptionKo: "철을 담금질할 때, 그 느낌을 기억해 — 온도가 진짜를 만든다.",
        rhymeImageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/visuals/tempering-rhyme-1770430709366.png",
        example: "The chef spent hours tempering chocolate to get that perfect shine.",
        exampleKo: "셰프는 완벽한 광택을 위해 몇 시간 동안 초콜릿을 템퍼링했다.",
      },
      {
        word: "tapering",
        meaning: "점진적 축소",
        pronunciation: "/ˈteɪ.pər.ɪŋ/",
        koreanPron: "테이-퍼-링 (강세: 테이)",
        stress: "테이",
        rhymeCaption: "Tapering like paper — thinner now, thicker later.",
        rhymeCaptionKo: "종이처럼 가늘어져 — 지금은 얇게, 나중에 다시 두껍게.",
        rhymeImageUrl: "https://sfqzlrsvrszdlusntdky.supabase.co/storage/v1/object/public/word-images/visuals/tapering-rhyme-1770430758280.png",
        example: "The Fed announced tapering of bond purchases, shaking global markets.",
        exampleKo: "연준이 채권 매입 축소를 발표하자 글로벌 시장이 흔들렸다.",
      },
    ],
  },
];

// 하위 호환: 기존 SAMPLE_WORDS 유지
export const SAMPLE_WORDS = WORD_SETS[0].words;
