export interface WordData {
  word: string;
  meaning: string;
  pronunciation: string;
  koreanPron: string;
  stress: string;
  mnemonic: string;
  mnemonicKo: string;
  rhyme: string;
  rhymeKo: string;
  conceptImagePath?: string;  // public/ 기준 경로
  mnemonicImagePath?: string;
}

// 샘플 데이터 — 실제로는 DB에서 가져와서 교체
export const SAMPLE_WORDS: WordData[] = [
  {
    word: 'ubiquitous',
    meaning: '어디에나 있는',
    pronunciation: '/juːˈbɪk.wɪ.təs/',
    koreanPron: '유-비-퀴-터스',
    stress: '비',
    mnemonic: 'you be with us — everywhere',
    mnemonicKo: '너 우리와 함께 — 어디에나',
    rhyme: 'Ubiquitous — you be with us, everywhere.',
    rhymeKo: '유비쿼터스 — 너 우리와 함께, 어디에나.',
  },
  {
    word: 'paradigm',
    meaning: '사고방식의 틀',
    pronunciation: '/ˈpær.ə.daɪm/',
    koreanPron: '패-러-다임',
    stress: '패',
    mnemonic: 'pair a dime — 같은 동전도 보는 면이 다르다',
    mnemonicKo: '동전 한 쌍 — 관점에 따라 달라 보인다',
    rhyme: 'A paradigm shift changes how you think.',
    rhymeKo: '패러다임 전환은 사고방식을 바꾼다.',
  },
  {
    word: 'conjecture',
    meaning: '추측, 가설',
    pronunciation: '/kənˈdʒek.tʃər/',
    koreanPron: '컨-젝-쳐',
    stress: '젝',
    mnemonic: '"근데 저? 추측이에요."',
    mnemonicKo: '컨젝쳐 = 근데 저? 추측이에요',
    rhyme: 'A conjecture without structure leads to rupture.',
    rhymeKo: '구조 없는 추측은 결국 망한다.',
  },
];
