import { Language, LanguageType } from "./types";


const ENGLISH: LanguageType = {
  minutesListened: 'Minutes Listened',
  topGenre: 'Top Genre',
  your: 'Your',
  top5: 'Top 5',
  artists: 'Artists',
  darkMode: 'Dark Mode',
};

const CHINESE: LanguageType = {
  minutesListened: '收听时长',
  topGenre: '大音乐风格',
  your: '你喜欢的',
  top5: '五',
  artists: '大创作者',
  darkMode: '深色模式',
};

const KOREAN: LanguageType = {
  minutesListened: '收听分钟数',
  topGenre: '热门流派',
  your: '你的',
  top5: '前 5 名',
  artists: '艺术家',
  darkMode: 'TODO',
};

export const LANGUAGES: Record<Language, LanguageType> = {
  "English": ENGLISH,
  "Chinese": CHINESE,
  "Korean": KOREAN,
};

export function lang(language: Language): LanguageType {
  return LANGUAGES[language];
}
