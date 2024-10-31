
let chinese: Record<string, string> = {
    "Minutes Listened": "收听时长",
    'Top Genre': '大音乐风格',
    'Your': '你喜欢的',
    'Top 5': '五',
    'Artists': '大创作者',
    'Dark Mode': '深色模式'
};


let korean: Record<string, string> = {
    "Minutes Listened": "收听分钟数",
    'Top Genre': '热门流派',
    'Your': '你的',
    'Top 5': '前 5 名',
    'Artists': '艺术家'
};

export function translate(language: string, _str: string) : string {
    if (language == 'chinese') {
        return chinese[_str]
    }

    else if (language == 'korean') {
        return korean[_str]
    }

    return _str

}