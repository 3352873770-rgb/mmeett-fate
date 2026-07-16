// 知识图解：对齐 suanlemeai.cn/knowledge 的 10 张结构图

export type DiagramCat = '基础' | '命盘' | '卜筮' | '时间' | '六壬' | '星命'

export const DIAGRAM_CATS: DiagramCat[] = ['基础', '命盘', '卜筮', '时间', '六壬', '星命']

export type DiagramNode = { name: string; hint: string }
export type DiagramEdge = { from: string; to: string; label: string }

export type Diagram = {
  id: string
  zh: string
  en: string
  cat: DiagramCat
  desc: string
  tip: string
  kind: 'cycle' | 'grid' | 'flow' | 'season'
  nodes: DiagramNode[]
  edges: DiagramEdge[]
  /** 九宫格子（左→右、上→下），仅 grid */
  cells?: DiagramNode[]
}

export const diagrams: Diagram[] = [
  {
    id: 'wuxing-cycle',
    zh: '五行生克环',
    en: 'Five Elements Cycle',
    cat: '基础',
    desc: '把木火土金水的相生、相克关系放在同一张图里，避免只看单个元素。',
    tip: '判断五行时先看结构和力量流向，不把“缺什么补什么”当成唯一规则。',
    kind: 'cycle',
    nodes: [
      { name: '木', hint: '生发、条达' },
      { name: '火', hint: '表达、升腾' },
      { name: '土', hint: '承载、转化' },
      { name: '金', hint: '收敛、规则' },
      { name: '水', hint: '流动、蓄藏' },
    ],
    edges: [
      { from: '木', to: '火', label: '木生火' },
      { from: '火', to: '土', label: '火生土' },
      { from: '土', to: '金', label: '土生金' },
      { from: '金', to: '水', label: '金生水' },
      { from: '水', to: '木', label: '水生木' },
      { from: '木', to: '土', label: '木克土' },
      { from: '土', to: '水', label: '土克水' },
      { from: '水', to: '火', label: '水克火' },
      { from: '火', to: '金', label: '火克金' },
      { from: '金', to: '木', label: '金克木' },
    ],
  },
  {
    id: 'luoshu',
    zh: '洛书九宫',
    en: 'Luo Shu Grid',
    cat: '基础',
    desc: '九宫把方位、数字和节律放到一个 3×3 结构里，常用于奇门、风水和方位理解。',
    tip: '先把宫位、方位和五行对应看清，再进入具体盘式，理解会快很多。',
    kind: 'grid',
    nodes: [],
    cells: [
      { name: '四绿巽', hint: '东南、木' },
      { name: '九紫离', hint: '南方、火' },
      { name: '二黑坤', hint: '西南、土' },
      { name: '三碧震', hint: '东方、木' },
      { name: '五黄中', hint: '中宫、土' },
      { name: '七赤兑', hint: '西方、金' },
      { name: '八白艮', hint: '东北、土' },
      { name: '一白坎', hint: '北方、水' },
      { name: '六白乾', hint: '西北、金' },
    ],
    edges: [
      { from: '一白坎', to: '九紫离', label: '南北轴' },
      { from: '三碧震', to: '七赤兑', label: '东西轴' },
      { from: '四绿巽', to: '六白乾', label: '巽乾线' },
      { from: '二黑坤', to: '八白艮', label: '坤艮线' },
    ],
  },
  {
    id: 'bazi-order',
    zh: '八字判断顺序',
    en: 'BaZi Reading Order',
    cat: '命盘',
    desc: '八字不应只看某一个神煞，完整判断通常从日主、月令、五行流通和格局边界开始。',
    tip: '先建立判断顺序，再谈事业、感情、财运，结论会更稳。',
    kind: 'flow',
    nodes: [
      { name: '日主', hint: '先定观察主体' },
      { name: '月令', hint: '季节力量' },
      { name: '五行', hint: '生克流通' },
      { name: '十神', hint: '关系角色' },
      { name: '格局', hint: '整体结构' },
    ],
    edges: [
      { from: '日主', to: '月令', label: '定旺衰背景' },
      { from: '月令', to: '五行', label: '看气势' },
      { from: '五行', to: '十神', label: '转成人事' },
      { from: '十神', to: '格局', label: '合成判断' },
    ],
  },
  {
    id: 'gua-flow',
    zh: '起卦到断卦',
    en: 'Casting to Reading',
    cat: '卜筮',
    desc: '卦象不是一句吉凶，至少要同时看本卦、动爻、变卦和提问背景。',
    tip: '问题越具体，卦象越容易给出可执行的提醒。',
    kind: 'flow',
    nodes: [
      { name: '问题', hint: '一事一问' },
      { name: '本卦', hint: '当前结构' },
      { name: '动爻', hint: '变化焦点' },
      { name: '变卦', hint: '趋势走向' },
      { name: '行动', hint: '落到选择' },
    ],
    edges: [
      { from: '问题', to: '本卦', label: '先限定主题' },
      { from: '本卦', to: '动爻', label: '找变化点' },
      { from: '动爻', to: '变卦', label: '看后续势' },
      { from: '变卦', to: '行动', label: '转成建议' },
    ],
  },
  {
    id: 'jieqi-wheel',
    zh: '二十四节气',
    en: 'Solar Terms',
    cat: '时间',
    desc: '节气是传统历法里的时间骨架，八字、黄历和时令养生都会用到它。',
    tip: '涉及出生时间和黄历时，节气比农历月份更关键。',
    kind: 'season',
    nodes: [
      { name: '春', hint: '立春至谷雨' },
      { name: '夏', hint: '立夏至大暑' },
      { name: '秋', hint: '立秋至霜降' },
      { name: '冬', hint: '立冬至大寒' },
    ],
    edges: [
      { from: '节气', to: '月令', label: '分界' },
      { from: '春', to: '夏', label: '生长' },
      { from: '夏', to: '秋', label: '收藏' },
      { from: '秋', to: '冬', label: '沉潜' },
      { from: '冬', to: '春', label: '复始' },
      { from: '节气', to: '八字', label: '定月令' },
    ],
  },
  {
    id: 'liuren-flow',
    zh: '六壬四课三传',
    en: 'Liu Ren Structure',
    cat: '六壬',
    desc: '大六壬先定月将、占时，再由四课推出三传；判断时要把问事场景、神将和课传顺序放在一起。',
    tip: '六壬要先看问题所属门类，再看课传和神将，不把单个神煞当成全部结论。',
    kind: 'flow',
    nodes: [
      { name: '月将', hint: '太阳过宫定将' },
      { name: '占时', hint: '落到问事当刻' },
      { name: '四课', hint: '干支阴阳发用' },
      { name: '三传', hint: '初中末传成势' },
      { name: '断事', hint: '结合问类取象' },
    ],
    edges: [
      { from: '月将', to: '占时', label: '加时成局' },
      { from: '占时', to: '四课', label: '定位课体' },
      { from: '四课', to: '三传', label: '发用递进' },
      { from: '三传', to: '断事', label: '看始中终' },
    ],
  },
  {
    id: 'liuyao-relations',
    zh: '六爻六亲六神',
    en: 'Liu Yao Relations',
    cat: '卜筮',
    desc: '六爻判断不能只看卦名，要把世应、六亲、六神、动变和提问场景放在一起。',
    tip: '六爻结果要先回答“问什么”，再把世应、动爻和六亲落到具体选择上。',
    kind: 'flow',
    nodes: [
      { name: '世爻', hint: '自己与主位' },
      { name: '应爻', hint: '对方与外界' },
      { name: '六亲', hint: '财官父兄子' },
      { name: '六神', hint: '青朱勾蛇白玄' },
      { name: '动变', hint: '变化焦点' },
    ],
    edges: [
      { from: '世爻', to: '应爻', label: '先看关系' },
      { from: '六亲', to: '世爻', label: '定人事' },
      { from: '六神', to: '六亲', label: '补象意' },
      { from: '动变', to: '应爻', label: '看趋势' },
    ],
  },
  {
    id: 'hecan-path',
    zh: '三术合参路径',
    en: 'Tri-Method Path',
    cat: '命盘',
    desc: '三术合参适合做交叉验证：八字看底盘，紫微看宫位，奇门看当下局势。',
    tip: '合参不是把三套术语堆起来，而是让不同盘式互相校验，减少单盘误判。',
    kind: 'flow',
    nodes: [
      { name: '八字', hint: '底层气势' },
      { name: '紫微', hint: '十二宫位' },
      { name: '奇门', hint: '当下局象' },
      { name: '问题', hint: '限定主题' },
      { name: '建议', hint: '取交集' },
    ],
    edges: [
      { from: '问题', to: '八字', label: '先定长期结构' },
      { from: '八字', to: '紫微', label: '核对人生领域' },
      { from: '紫微', to: '奇门', label: '落到当下时机' },
      { from: '奇门', to: '建议', label: '转成行动' },
      { from: '八字', to: '建议', label: '不违背底盘' },
    ],
  },
  {
    id: 'qizheng-structure',
    zh: '七政四余结构',
    en: 'Seven Governors',
    cat: '星命',
    desc: '七政四余以日月五星为七政，以罗喉、计都、紫气、月孛为四余，常用于星命结构理解。',
    tip: '没有精密星历时，七政四余页面先做结构速览；涉及严肃星命应结合精确历算。',
    kind: 'flow',
    nodes: [
      { name: '太阳', hint: '主显化' },
      { name: '月亮', hint: '主感受' },
      { name: '五星', hint: '木火土金水' },
      { name: '四余', hint: '罗计紫孛' },
      { name: '宫度', hint: '落点判断' },
    ],
    edges: [
      { from: '太阳', to: '宫度', label: '看主轴' },
      { from: '月亮', to: '宫度', label: '看节律' },
      { from: '五星', to: '宫度', label: '看作用力' },
      { from: '四余', to: '宫度', label: '看暗线' },
    ],
  },
  {
    id: 'zhuge-path',
    zh: '诸葛神数起数路径',
    en: 'Zhuge Oracle Path',
    cat: '卜筮',
    desc: '诸葛神数适合一事一问：先取三字或报数，再归入 384 签，最后把签象转成行动顺序。',
    tip: '诸葛神数的价值不在反复重抽，而在把一个具体问题转成清晰的判断次序。',
    kind: 'flow',
    nodes: [
      { name: '一事一问', hint: '先定主题' },
      { name: '三字', hint: '取字或报数' },
      { name: '384签', hint: '归位成签' },
      { name: '卦象', hint: '参照动爻' },
      { name: '行动', hint: '落实选择' },
    ],
    edges: [
      { from: '一事一问', to: '三字', label: '心定则数定' },
      { from: '三字', to: '384签', label: '笔画合数' },
      { from: '384签', to: '卦象', label: '取象参照' },
      { from: '卦象', to: '行动', label: '断事落地' },
    ],
  },
]
