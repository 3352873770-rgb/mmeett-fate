// 知识图解：对齐 suanlemeai.cn/knowledge 的 10 张结构图（中英双语）

export type DiagramCatId = 'basics' | 'chart' | 'divination' | 'time' | 'liuren' | 'star'

export const DIAGRAM_CATS: DiagramCatId[] = [
  'basics',
  'chart',
  'divination',
  'time',
  'liuren',
  'star',
]

export const CAT_LABEL: Record<DiagramCatId, { zh: string; en: string }> = {
  basics: { zh: '基础', en: 'Basics' },
  chart: { zh: '命盘', en: 'Chart' },
  divination: { zh: '卜筮', en: 'Divination' },
  time: { zh: '时间', en: 'Time' },
  liuren: { zh: '六壬', en: 'Da Liu Ren' },
  star: { zh: '星命', en: 'Star Reading' },
}

/** @deprecated 兼容旧筛选键；请用 DiagramCatId */
export type DiagramCat = DiagramCatId

export type DiagramNode = {
  /** 稳定 id，兼作五行色键（木火土金水） */
  id: string
  zh: string
  en: string
  hintZh: string
  hintEn: string
}

export type DiagramEdge = {
  from: string
  to: string
  labelZh: string
  labelEn: string
}

export type Diagram = {
  id: string
  zh: string
  en: string
  cat: DiagramCatId
  descZh: string
  descEn: string
  tipZh: string
  tipEn: string
  kind: 'cycle' | 'grid' | 'flow' | 'season'
  nodes: DiagramNode[]
  edges: DiagramEdge[]
  cells?: DiagramNode[]
}

export const diagrams: Diagram[] = [
  {
    id: 'wuxing-cycle',
    zh: '五行生克环',
    en: 'Five Elements Cycle',
    cat: 'basics',
    descZh: '把木火土金水的相生、相克关系放在同一张图里，避免只看单个元素。',
    descEn: 'Shows the generating and controlling relationships of wood, fire, earth, metal and water in one diagram.',
    tipZh: '判断五行时先看结构和力量流向，不把“缺什么补什么”当成唯一规则。',
    tipEn: "Read structure and energy flow first; do not reduce Five Elements work to 'missing one element means add it'.",
    kind: 'cycle',
    nodes: [
      { id: '木', zh: '木', en: 'Wood', hintZh: '生发、条达', hintEn: 'growth, expansion' },
      { id: '火', zh: '火', en: 'Fire', hintZh: '表达、升腾', hintEn: 'expression, rising' },
      { id: '土', zh: '土', en: 'Earth', hintZh: '承载、转化', hintEn: 'holding, transforming' },
      { id: '金', zh: '金', en: 'Metal', hintZh: '收敛、规则', hintEn: 'rules, contraction' },
      { id: '水', zh: '水', en: 'Water', hintZh: '流动、蓄藏', hintEn: 'flow, storage' },
    ],
    edges: [
      { from: '木', to: '火', labelZh: '木生火', labelEn: 'Wood generates Fire' },
      { from: '火', to: '土', labelZh: '火生土', labelEn: 'Fire generates Earth' },
      { from: '土', to: '金', labelZh: '土生金', labelEn: 'Earth generates Metal' },
      { from: '金', to: '水', labelZh: '金生水', labelEn: 'Metal generates Water' },
      { from: '水', to: '木', labelZh: '水生木', labelEn: 'Water generates Wood' },
      { from: '木', to: '土', labelZh: '木克土', labelEn: 'Wood controls Earth' },
      { from: '土', to: '水', labelZh: '土克水', labelEn: 'Earth controls Water' },
      { from: '水', to: '火', labelZh: '水克火', labelEn: 'Water controls Fire' },
      { from: '火', to: '金', labelZh: '火克金', labelEn: 'Fire controls Metal' },
      { from: '金', to: '木', labelZh: '金克木', labelEn: 'Metal controls Wood' },
    ],
  },
  {
    id: 'luoshu',
    zh: '洛书九宫',
    en: 'Luo Shu Grid',
    cat: 'basics',
    descZh: '九宫把方位、数字和节律放到一个 3×3 结构里，常用于奇门、风水和方位理解。',
    descEn: 'The nine-palace grid connects direction, number and rhythm, often used in Qimen and directional systems.',
    tipZh: '先把宫位、方位和五行对应看清，再进入具体盘式，理解会快很多。',
    tipEn: 'Understand palaces, directions and elements before reading a full chart.',
    kind: 'grid',
    nodes: [],
    cells: [
      { id: '4', zh: '四绿巽', en: '4 Xun', hintZh: '东南、木', hintEn: 'southeast, wood' },
      { id: '9', zh: '九紫离', en: '9 Li', hintZh: '南方、火', hintEn: 'south, fire' },
      { id: '2', zh: '二黑坤', en: '2 Kun', hintZh: '西南、土', hintEn: 'southwest, earth' },
      { id: '3', zh: '三碧震', en: '3 Zhen', hintZh: '东方、木', hintEn: 'east, wood' },
      { id: '5', zh: '五黄中', en: '5 Center', hintZh: '中宫、土', hintEn: 'center, earth' },
      { id: '7', zh: '七赤兑', en: '7 Dui', hintZh: '西方、金', hintEn: 'west, metal' },
      { id: '8', zh: '八白艮', en: '8 Gen', hintZh: '东北、土', hintEn: 'northeast, earth' },
      { id: '1', zh: '一白坎', en: '1 Kan', hintZh: '北方、水', hintEn: 'north, water' },
      { id: '6', zh: '六白乾', en: '6 Qian', hintZh: '西北、金', hintEn: 'northwest, metal' },
    ],
    edges: [
      { from: '1', to: '9', labelZh: '南北轴', labelEn: 'north-south axis' },
      { from: '3', to: '7', labelZh: '东西轴', labelEn: 'east-west axis' },
      { from: '4', to: '6', labelZh: '巽乾线', labelEn: 'Xun-Qian line' },
      { from: '2', to: '8', labelZh: '坤艮线', labelEn: 'Kun-Gen line' },
    ],
  },
  {
    id: 'bazi-order',
    zh: '八字判断顺序',
    en: 'BaZi Reading Order',
    cat: 'chart',
    descZh: '八字不应只看某一个神煞，完整判断通常从日主、月令、五行流通和格局边界开始。',
    descEn: 'A full Bazi reading should not start from one isolated star. Begin with day master, month command, element flow and pattern boundaries.',
    tipZh: '先建立判断顺序，再谈事业、感情、财运，结论会更稳。',
    tipEn: 'Build the reading order first, then discuss career, relationships and wealth more steadily.',
    kind: 'flow',
    nodes: [
      { id: 'day', zh: '日主', en: 'Day Master', hintZh: '先定观察主体', hintEn: 'reading subject' },
      { id: 'month', zh: '月令', en: 'Month', hintZh: '季节力量', hintEn: 'seasonal force' },
      { id: 'el', zh: '五行', en: 'Elements', hintZh: '生克流通', hintEn: 'generation/control' },
      { id: 'gods', zh: '十神', en: 'Ten Gods', hintZh: '关系角色', hintEn: 'life roles' },
      { id: 'pattern', zh: '格局', en: 'Pattern', hintZh: '整体结构', hintEn: 'whole structure' },
    ],
    edges: [
      { from: 'day', to: 'month', labelZh: '定旺衰背景', labelEn: 'set strength context' },
      { from: 'month', to: 'el', labelZh: '看气势', labelEn: 'read energy flow' },
      { from: 'el', to: 'gods', labelZh: '转成人事', labelEn: 'map to life roles' },
      { from: 'gods', to: 'pattern', labelZh: '合成判断', labelEn: 'synthesize' },
    ],
  },
  {
    id: 'gua-flow',
    zh: '起卦到断卦',
    en: 'Casting to Reading',
    cat: 'divination',
    descZh: '卦象不是一句吉凶，至少要同时看本卦、动爻、变卦和提问背景。',
    descEn: 'A hexagram is not one line of good or bad. Read the original hexagram, moving line, changed hexagram and question context together.',
    tipZh: '问题越具体，卦象越容易给出可执行的提醒。',
    tipEn: 'The more specific the question, the easier it is for the hexagram to become actionable.',
    kind: 'flow',
    nodes: [
      { id: 'q', zh: '问题', en: 'Question', hintZh: '一事一问', hintEn: 'one matter' },
      { id: 'ben', zh: '本卦', en: 'Original', hintZh: '当前结构', hintEn: 'current structure' },
      { id: 'move', zh: '动爻', en: 'Moving Line', hintZh: '变化焦点', hintEn: 'change focus' },
      { id: 'bian', zh: '变卦', en: 'Changed', hintZh: '趋势走向', hintEn: 'trend' },
      { id: 'act', zh: '行动', en: 'Action', hintZh: '落到选择', hintEn: 'practical choice' },
    ],
    edges: [
      { from: 'q', to: 'ben', labelZh: '先限定主题', labelEn: 'define scope' },
      { from: 'ben', to: 'move', labelZh: '找变化点', labelEn: 'find change' },
      { from: 'move', to: 'bian', labelZh: '看后续势', labelEn: 'read trend' },
      { from: 'bian', to: 'act', labelZh: '转成建议', labelEn: 'turn into advice' },
    ],
  },
  {
    id: 'jieqi-wheel',
    zh: '二十四节气',
    en: 'Solar Terms',
    cat: 'time',
    descZh: '节气是传统历法里的时间骨架，八字、黄历和时令养生都会用到它。',
    descEn: 'Solar terms form the time skeleton of traditional calendars and are used in Bazi, almanac and seasonal practices.',
    tipZh: '涉及出生时间和黄历时，节气比农历月份更关键。',
    tipEn: 'For birth time and almanac work, solar terms matter more than lunar month labels.',
    kind: 'season',
    nodes: [
      { id: 'spring', zh: '春', en: 'Spring', hintZh: '立春至谷雨', hintEn: 'Lichun to Guyu' },
      { id: 'summer', zh: '夏', en: 'Summer', hintZh: '立夏至大暑', hintEn: 'Lixia to Dashu' },
      { id: 'autumn', zh: '秋', en: 'Autumn', hintZh: '立秋至霜降', hintEn: 'Liqiu to Shuangjiang' },
      { id: 'winter', zh: '冬', en: 'Winter', hintZh: '立冬至大寒', hintEn: 'Lidong to Dahan' },
    ],
    edges: [
      { from: 'term', to: 'month', labelZh: '分界', labelEn: 'month boundary' },
      { from: 'spring', to: 'summer', labelZh: '生长', labelEn: 'growth' },
      { from: 'summer', to: 'autumn', labelZh: '收藏', labelEn: 'collecting' },
      { from: 'autumn', to: 'winter', labelZh: '沉潜', labelEn: 'settling' },
      { from: 'winter', to: 'spring', labelZh: '复始', labelEn: 'renewal' },
      { from: 'term', to: 'bazi', labelZh: '定月令', labelEn: 'sets month command' },
    ],
  },
  {
    id: 'liuren-flow',
    zh: '六壬四课三传',
    en: 'Da Liu Ren Lessons',
    cat: 'liuren',
    descZh: '大六壬先定月将、占时，再由四课推出三传；判断时要把问事场景、神将和课传顺序放在一起。',
    descEn: 'Da Liu Ren starts from the month general and question hour, then moves from four lessons to three transmissions.',
    tipZh: '六壬要先看问题所属门类，再看课传和神将，不把单个神煞当成全部结论。',
    tipEn: 'Read the question category first, then combine lessons, transmissions and spirits instead of relying on one sign.',
    kind: 'flow',
    nodes: [
      { id: 'general', zh: '月将', en: 'General', hintZh: '太阳过宫定将', hintEn: 'month general' },
      { id: 'hour', zh: '占时', en: 'Hour', hintZh: '落到问事当刻', hintEn: 'question moment' },
      { id: 'lessons', zh: '四课', en: 'Lessons', hintZh: '干支阴阳发用', hintEn: 'four lessons' },
      { id: 'trans', zh: '三传', en: 'Transmissions', hintZh: '初中末传成势', hintEn: 'three stages' },
      { id: 'judge', zh: '断事', en: 'Judgment', hintZh: '结合问类取象', hintEn: 'question type' },
    ],
    edges: [
      { from: 'general', to: 'hour', labelZh: '加时成局', labelEn: 'add hour' },
      { from: 'hour', to: 'lessons', labelZh: '定位课体', labelEn: 'set lessons' },
      { from: 'lessons', to: 'trans', labelZh: '发用递进', labelEn: 'progression' },
      { from: 'trans', to: 'judge', labelZh: '看始中终', labelEn: 'read stages' },
    ],
  },
  {
    id: 'liuyao-relations',
    zh: '六爻六亲六神',
    en: 'Liu Yao Reading Map',
    cat: 'divination',
    descZh: '六爻判断不能只看卦名，要把世应、六亲、六神、动变和提问场景放在一起。',
    descEn: 'A Liu Yao reading should combine self/other lines, Six Relatives, Six Spirits, moving lines and the question context.',
    tipZh: '六爻结果要先回答“问什么”，再把世应、动爻和六亲落到具体选择上。',
    tipEn: 'Start from the question, then use self/other, moving lines and relatives to form advice.',
    kind: 'flow',
    nodes: [
      { id: 'self', zh: '世爻', en: 'Self Line', hintZh: '自己与主位', hintEn: 'the querent' },
      { id: 'other', zh: '应爻', en: 'Other Line', hintZh: '对方与外界', hintEn: 'outside side' },
      { id: 'rel', zh: '六亲', en: 'Relatives', hintZh: '财官父兄子', hintEn: 'life roles' },
      { id: 'spirit', zh: '六神', en: 'Spirits', hintZh: '青朱勾蛇白玄', hintEn: 'image cues' },
      { id: 'moving', zh: '动变', en: 'Moving', hintZh: '变化焦点', hintEn: 'change focus' },
    ],
    edges: [
      { from: 'self', to: 'other', labelZh: '先看关系', labelEn: 'read relationship first' },
      { from: 'rel', to: 'self', labelZh: '定人事', labelEn: 'map to roles' },
      { from: 'spirit', to: 'rel', labelZh: '补象意', labelEn: 'add image cues' },
      { from: 'moving', to: 'other', labelZh: '看趋势', labelEn: 'read trend' },
    ],
  },
  {
    id: 'hecan-path',
    zh: '三术合参路径',
    en: 'Triple-System Cross Check',
    cat: 'chart',
    descZh: '三术合参适合做交叉验证：八字看底盘，紫微看宫位，奇门看当下局势。',
    descEn: 'Use Bazi for the base pattern, Zi Wei for life domains and Qimen for current timing.',
    tipZh: '合参不是把三套术语堆起来，而是让不同盘式互相校验，减少单盘误判。',
    tipEn: 'Cross-reading should reduce single-system bias, not pile up terminology.',
    kind: 'flow',
    nodes: [
      { id: 'bazi', zh: '八字', en: 'Bazi', hintZh: '底层气势', hintEn: 'base structure' },
      { id: 'ziwei', zh: '紫微', en: 'Zi Wei', hintZh: '十二宫位', hintEn: 'life palaces' },
      { id: 'qimen', zh: '奇门', en: 'Qimen', hintZh: '当下局象', hintEn: 'current field' },
      { id: 'q', zh: '问题', en: 'Question', hintZh: '限定主题', hintEn: 'scope' },
      { id: 'advice', zh: '建议', en: 'Advice', hintZh: '取交集', hintEn: 'intersection' },
    ],
    edges: [
      { from: 'q', to: 'bazi', labelZh: '先定长期结构', labelEn: 'long-term base' },
      { from: 'bazi', to: 'ziwei', labelZh: '核对人生领域', labelEn: 'check domain' },
      { from: 'ziwei', to: 'qimen', labelZh: '落到当下时机', labelEn: 'current timing' },
      { from: 'qimen', to: 'advice', labelZh: '转成行动', labelEn: 'turn into action' },
      { from: 'bazi', to: 'advice', labelZh: '不违背底盘', labelEn: 'respect base chart' },
    ],
  },
  {
    id: 'qizheng-structure',
    zh: '七政四余结构',
    en: 'Seven Governors And Four Residues',
    cat: 'star',
    descZh: '七政四余以日月五星为七政，以罗喉、计都、紫气、月孛为四余，常用于星命结构理解。',
    descEn: 'Seven Governors refer to the Sun, Moon and five planets; Four Residues refer to Rahu, Ketu, Ziqi and Yuebei.',
    tipZh: '没有精密星历时，七政四余页面先做结构速览；涉及严肃星命应结合精确历算。',
    tipEn: 'Without precise ephemeris, this page is a structural guide rather than a final astrological judgment.',
    kind: 'flow',
    nodes: [
      { id: 'sun', zh: '太阳', en: 'Sun', hintZh: '主显化', hintEn: 'visibility' },
      { id: 'moon', zh: '月亮', en: 'Moon', hintZh: '主感受', hintEn: 'rhythm' },
      { id: 'planets', zh: '五星', en: 'Planets', hintZh: '木火土金水', hintEn: 'five forces' },
      { id: 'residues', zh: '四余', en: 'Residues', hintZh: '罗计紫孛', hintEn: 'hidden lines' },
      { id: 'houses', zh: '宫度', en: 'Houses', hintZh: '落点判断', hintEn: 'placement' },
    ],
    edges: [
      { from: 'sun', to: 'houses', labelZh: '看主轴', labelEn: 'main axis' },
      { from: 'moon', to: 'houses', labelZh: '看节律', labelEn: 'rhythm' },
      { from: 'planets', to: 'houses', labelZh: '看作用力', labelEn: 'forces' },
      { from: 'residues', to: 'houses', labelZh: '看暗线', labelEn: 'hidden threads' },
    ],
  },
  {
    id: 'zhuge-path',
    zh: '诸葛神数起数路径',
    en: 'Zhuge 384-Sign Oracle Path',
    cat: 'divination',
    descZh: '诸葛神数适合一事一问：先取三字或报数，再归入 384 签，最后把签象转成行动顺序。',
    descEn: 'Zhuge Oracle works best with one concrete question: take three characters or a number, normalize to 384 signs, then turn the sign into action order.',
    tipZh: '诸葛神数的价值不在反复重抽，而在把一个具体问题转成清晰的判断次序。',
    tipEn: 'Its value is not repeated recasting, but turning a concrete question into a clearer decision sequence.',
    kind: 'flow',
    nodes: [
      { id: 'one', zh: '一事一问', en: 'One Question', hintZh: '先定主题', hintEn: 'define scope' },
      { id: 'chars', zh: '三字', en: 'Three Chars', hintZh: '取字或报数', hintEn: 'characters or number' },
      { id: 'signs', zh: '384签', en: '384 Signs', hintZh: '归位成签', hintEn: 'normalized sign' },
      { id: 'hex', zh: '卦象', en: 'Hexagram', hintZh: '参照动爻', hintEn: 'moving-line reference' },
      { id: 'act', zh: '行动', en: 'Action', hintZh: '落实选择', hintEn: 'practical choice' },
    ],
    edges: [
      { from: 'one', to: 'chars', labelZh: '心定则数定', labelEn: 'focus before number' },
      { from: 'chars', to: 'signs', labelZh: '笔画合数', labelEn: 'stroke count' },
      { from: 'signs', to: 'hex', labelZh: '取象参照', labelEn: 'image reference' },
      { from: 'hex', to: 'act', labelZh: '断事落地', labelEn: 'make it practical' },
    ],
  },
]

export function nodeLabel(n: DiagramNode, lang: 'zh' | 'en') {
  return lang === 'en' ? n.en : n.zh
}

export function nodeHint(n: DiagramNode, lang: 'zh' | 'en') {
  return lang === 'en' ? n.hintEn : n.hintZh
}

export function edgeLabel(e: DiagramEdge, lang: 'zh' | 'en') {
  return lang === 'en' ? e.labelEn : e.labelZh
}

export function findNode(nodes: DiagramNode[], id: string) {
  return nodes.find((n) => n.id === id)
}
