import { Language, LanguageType } from "./types";


const ENGLISH: LanguageType = {
  lang: "English",
  minutesListened: 'Minutes Listened',
  topGenre: 'Top Genre',
  your: 'Your',
  top5: 'Top 5',
  artists: 'Artists',
  albums: 'Albums',
  darkMode: 'Dark Mode',
  cover: "Use the arrows below to find out what your music is like!",
  isHere: "is Here",
  pop: "Popularity",
  favTrack: "",
  lastPlayed: "Last Played",
  song: "Song",
  top: "Top",
  genres: "Genres",
  diverse: "Diverse",
  how: "How",
  isYourMusic: "is Your Music",
  youHaveA: "You have a",
  musicTaste: "music taste",
  whatsYour: "What's your",
  musicPers: "Music Personality",
  acoustic: "Acoustic",
  or: "or",
  electronic: "Electronic",
  acousticness: "Acousticness",
  acousticText: "Your music uses mostly electronic instruments.",
  danceable: "Danceable",
  danceability: "Danceability",
  energy: "Energy",
  energyText: "Your music is very energetic and danceable.",
  generateNew: "Generate New Wrapped",
  delete: "Delete",
  past: "Past",
  pastText: "Click on one of your past wrappeds to view it!",
  profile: "Profile",
  latest: "Latest",
  deleteAccount: "Delete Account",
  monolithic: "monolithic",
  consistent: "consistent",
  balanced: "balanced",
  diverse2: "diverse",
  universal: "univseral",
  viewProfile: "View Profile",
  loginWith: "Login With",
};

const CHINESE: LanguageType = {
  lang: "Chinese",
  minutesListened: '收听时长',
  topGenre: '大音乐风格',
  your: '你喜欢的',
  top5: '五',
  artists: '大创作者',
  darkMode: '深色模式',
  albums: "专辑",
  cover: "使用下面的箭头来了解您的音乐是什么样的!",
  isHere: "在这里",
  pop: "人气",
  favTrack: "最喜欢的歌曲",
  lastPlayed: "最后玩过",
  song: "歌曲",
  top: "最喜欢的",
  genres: "流派",
  diverse: "各种各样的",
  how: "如何",
  isYourMusic: "是你的音乐",
  youHaveA: "你有一个",
  musicTaste: "音乐品味",
  whatsYour: "你是什",
  musicPers: "音乐个性",
  acoustic: "声学的",
  or: "或者",
  electronic: "电子的",
  acousticness: "声学性",
  acousticText: "你的音乐主要使用电子乐器",
  danceable: "可以跳舞的",
  danceability: "舞蹈能力",
  energy: "活力",
  energyText: "你的音乐充满活力且适合跳舞",
  generateNew: "产生新的 Wrapped",
  delete: "删除",
  past: "以前的",
  pastText: "单击您以前的包装之一即可查看它!",
  profile: "轮廓",
  latest: "最新的",
  deleteAccount: "删除帐户",
  monolithic: "整体式的",
  consistent: "持续的",
  balanced: "均衡",
  diverse2: "各种各样的",
  universal: "普遍的",
  viewProfile: "查看个人资料",
  loginWith: "登录",
};

const KOREAN: LanguageType = {
  lang: "Korean",
  minutesListened: '收听分钟数',
  topGenre: '热门流派',
  your: '你的',
  top5: '前 5 名',
  artists: '艺术家',
  darkMode: '다크 모드',
  albums: "앨범",
  cover: "아래 화살표를 사용하여 음악이 어떤 것인지 알아보세요.",
  isHere: "여기 있어요",
  pop: "인기",
  favTrack: "좋아하는 노래",
  lastPlayed: "마지막으로 플레이한",
  song: "노래",
  top: "가장 좋아하는",
  genres: "장르",
  diverse: "다양한",
  how: "어떻게",
  isYourMusic: "당신의 음악인가요",
  youHaveA: "당신은",
  musicTaste: "음악 취향",
  whatsYour: "당신은 무엇입니까",
  musicPers: "음악적 성격",
  acoustic: "음향학",
  or: "또는",
  electronic: "전자",
  acousticness: "음향성",
  acousticText: "당신의 음악은 주로 전자 악기를 사용합니다",
  danceable: "춤출 수 있는",
  danceability: "춤추는 능력",
  energy: "에너지",
  energyText: "당신의 음악은 매우 활기차고 춤을 추기에 좋습니다.",
  generateNew: "새로 생성 Wrapped",
  delete: "삭제",
  past: "이전의",
  pastText: "이전 포장 중 하나를 클릭하여 확인하세요!",
  profile: "윤곽",
  latest: "최신",
  deleteAccount: "계정 삭제",
  monolithic: "단단히 짜여 하나로 되어 있는",
  consistent: "일관된",
  balanced: "균형 잡힌",
  diverse2: "다양한",
  universal: "만능인",
  viewProfile: "프로필 보기",
  loginWith: "다음으로 로그인",
};

export const LANGUAGES: Record<Language, LanguageType> = {
  "English": ENGLISH,
  "Chinese": CHINESE,
  "Korean": KOREAN,
};

export function lang(language: Language): LanguageType {
  return LANGUAGES[language];
}
