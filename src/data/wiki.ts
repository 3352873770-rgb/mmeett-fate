/** 藏经阁：青囊式词条百科（演示，白话释义） */

export type WikiCat = '八字' | '紫微' | '奇门' | '六爻' | '大六壬'

export type WikiArticle = {
  id: string
  cat: WikiCat
  group: string
  title: string
  lead: string
  body: string
}

export const wikiCats: WikiCat[] = ['八字', '紫微', '奇门', '六爻', '大六壬']

export const wikiArticles: WikiArticle[] = [
  // 八字基础
  { id: 'yinyang-wuxing', cat: '八字', group: '八字基础', title: '阴阳五行', lead: '阴阳五行、天干地支、宫位旺衰——八字推演的最底层概念', body: '五行论气的生克制化；阴阳分太少。排盘时先辨气势，再谈十神名目。木火土金水不是性格贴纸，而是力量关系。' },
  { id: 'tiangan', cat: '八字', group: '八字基础', title: '十天干', lead: '甲乙丙丁戊己庚辛壬癸', body: '天干主天气与外显。甲木参天，乙木柔韧；丙火炎上，丁火灯烛——同属一行，阴阳不同，取用亦异。' },
  { id: 'dizhi', cat: '八字', group: '八字基础', title: '十二地支', lead: '子丑寅卯辰巳午未申酉戌亥', body: '地支主藏与根系。支中藏干，决定通根与刑冲合害。看月令，必先站住地支。' },
  { id: 'ganzhi-rel', cat: '八字', group: '八字基础', title: '干支关系', lead: '合冲刑害破', body: '合可化气或绊住，冲则动荡。先看月令与日支是否被破，再论合化是否有成。' },
  { id: 'gongwei', cat: '八字', group: '八字基础', title: '宫位与根苗花果', lead: '年月日时四宫', body: '年如根，月如苗，日如花，时如果。宫位论阶段性与关系位，勿把宫位直接等于某件事。' },
  { id: 'wangshuai', cat: '八字', group: '八字基础', title: '日干旺衰判定法', lead: '得令得地得势', body: '先问月令是否生扶日主，再问通根深浅，再看干上党众。旺衰是结构语言，不是好坏判词。' },
  { id: 'yongshen', cat: '八字', group: '八字基础', title: '用神总论', lead: '病药与调候', body: '用神是当前盘面最需要的力量。有的盘重调候，有的盘重扶抑，勿一口定论。' },
  { id: 'jieqi-pan', cat: '八字', group: '八字基础', title: '排盘与节气', lead: '以节气换月令', body: '月令不以农历月初换，而以节气为界。真太阳时校正的是“时”，节气校正的是“月”。' },

  // 八字十神
  { id: 'zhengguan', cat: '八字', group: '八字十神', title: '正官', lead: '克身之正气', body: '正官多主规矩、职称与他律。见杀混杂时，先清理关系再谈官运。' },
  { id: 'qisha', cat: '八字', group: '八字十神', title: '七杀（偏官）', lead: '克身之偏气', body: '七杀主压力与魄力。有制则锋锐，无制则躁。' },
  { id: 'zhengyin', cat: '八字', group: '八字十神', title: '正印', lead: '生身之正气', body: '正印关文书、贵人与庇护。过重则惰，宜见财调。' },
  { id: 'pianyin', cat: '八字', group: '八字十神', title: '偏印（枭神）', lead: '生身之偏气', body: '偏印主偏门学识与非常思路。见食时常论枭神夺食之象。' },
  { id: 'zhengcai', cat: '八字', group: '八字十神', title: '正财', lead: '我克之正气', body: '正财偏稳定收入与可规划资源。' },
  { id: 'piancai', cat: '八字', group: '八字十神', title: '偏财', lead: '我克之偏气', body: '偏财偏流动性资源与社交财缘。' },
  { id: 'shishen', cat: '八字', group: '八字十神', title: '食神', lead: '我生之正气', body: '食神主表达、技艺与从容泄秀。' },
  { id: 'shangguan', cat: '八字', group: '八字十神', title: '伤官', lead: '我生之偏气', body: '伤官主批判与创新锐气，见官当论配伍。' },
  { id: 'bijian', cat: '八字', group: '八字十神', title: '比肩', lead: '同我之正气', body: '比肩主自立与同辈。过强可助身，也可争财。' },
  { id: 'jiecai', cat: '八字', group: '八字十神', title: '劫财', lead: '同我之偏气', body: '劫财主动性更强，共事宜立清账。' },

  // 紫微
  { id: 'zw-anxing', cat: '紫微', group: '紫微基础', title: '安星法则与排盘基础', lead: '命宫十二位', body: '紫微先安命身，再布十四主星与辅曜。看盘从命宫与三方四正起。' },
  { id: 'zw-ming', cat: '紫微', group: '紫微基础', title: '命宫', lead: '自我与主轴', body: '命宫是人设与行为底色。同星入不同宫，人事指向完全不同。' },
  { id: 'zw-sanfang', cat: '紫微', group: '紫微基础', title: '三方四正与夹宫法则', lead: '结构互参', body: '三方四正是紫微的“引擎”。单宫不论，互参才稳。' },
  { id: 'zw-sihua', cat: '紫微', group: '紫微基础', title: '天干四化底层逻辑', lead: '化禄权科忌', body: '四化是流动箭头：禄开源、权行动、科名声、忌纠结。' },
  { id: 'zw-ziwei', cat: '紫微', group: '紫微星曜', title: '紫微', lead: '北斗帝星', body: '紫微主权贵与中枢。独坐与君臣共朝气势不同。' },
  { id: 'zw-tianfu', cat: '紫微', group: '紫微星曜', title: '天府', lead: '南斗令星', body: '天府主库藏与稳守，常与紫微君臣对照。' },
  { id: 'zw-wuqu', cat: '紫微', group: '紫微星曜', title: '武曲', lead: '财星主刚', body: '武曲主财与决断，落陷则锋利易折。' },
  { id: 'zw-tanlang', cat: '紫微', group: '紫微星曜', title: '贪狼', lead: '欲望与变化', body: '贪狼主欲望、交际与多变性，需看辅曜与四化。' },

  // 奇门
  { id: 'qm-sanqi', cat: '奇门', group: '奇门基础', title: '三奇六仪总论', lead: '乙丙丁与戊己庚辛壬癸', body: '三奇为用，六仪为体。奇门先定局，再布盘。' },
  { id: 'qm-xunkong', cat: '奇门', group: '奇门基础', title: '旬空与驿马', lead: '空亡与动象', body: '旬空论“落空”，驿马论“走动”。合参才能解释进程。' },
  { id: 'qm-yinyangdun', cat: '奇门', group: '奇门基础', title: '阴阳遁与二十四节气定局法', lead: '冬至阳遁，夏至阴遁', body: '节气定阴阳遁与局数。时家奇门以时干定值符值使。' },
  { id: 'qm-shengmen', cat: '奇门', group: '奇门四盘', title: '生门', lead: '八门之一', body: '生门主人丁与生长。求财问病，常看生门落宫。' },
  { id: 'qm-kaimen', cat: '奇门', group: '奇门四盘', title: '开门', lead: '八门之首', body: '开门主开张与事业出口，落吉宫利于进取。' },
  { id: 'qm-zhifu', cat: '奇门', group: '奇门四盘', title: '值符', lead: '八神之首', body: '值符如总指挥。其所落宫，常为当前局势重心。' },

  // 六爻
  { id: 'ly-zhuanggua', cat: '六爻', group: '六爻基础', title: '阴阳八卦与装卦法', lead: '本卦变卦', body: '铜钱或数字起卦后装干支六亲，动爻发动生变卦。' },
  { id: 'ly-liuqin', cat: '六爻', group: '六爻基础', title: '六亲与世应', lead: '父子才官兄', body: '世为自己，应为对方或环境。六亲把人事装进爻位。' },
  { id: 'ly-liushen', cat: '六爻', group: '六爻基础', title: '六神', lead: '龙雀勾蛇虎玄', body: '六神论气氛与附象：青龙喜庆，白虎刚猛，玄武暧昧等。' },
  { id: 'ly-shensha', cat: '六爻', group: '六爻基础', title: '六爻神煞废存定论', lead: '辅助而非主体', body: '神煞宜作旁证。用神旺衰与动静生克，才是主干。' },

  // 大六壬
  { id: 'lr-jigong', cat: '大六壬', group: '大六壬基础', title: '十干寄宫法则', lead: '干落十二支', body: '天干寄宫后才能定四课。寄宫是六壬时空底座之一。' },
  { id: 'lr-yuejiang', cat: '大六壬', group: '大六壬基础', title: '月将与占时定地盘', lead: '月将加时', body: '太阳过宫定月将，占时落入地盘，由此发用。' },
  { id: 'lr-sike', cat: '大六壬', group: '大六壬课传', title: '四课总论（主客关系）', lead: '一二三四课', body: '四课分主客远近。发用看哪一课先动。' },
  { id: 'lr-sanchuan', cat: '大六壬', group: '大六壬课传', title: '三传演进逻辑', lead: '初中末', body: '三传论事之始、中、末。问事越具体，三传越好落地。' },
  { id: 'lr-tianjiang', cat: '大六壬', group: '大六壬神将', title: '十二天将总论', lead: '贵蛇朱六勾青', body: '天将把人事磁场填进天盘。贵人、腾蛇、朱雀等各主气象。' },
]

export function wikiGroups(cat: WikiCat | 'all') {
  const list = cat === 'all' ? wikiArticles : wikiArticles.filter((a) => a.cat === cat)
  const map = new Map<string, WikiArticle[]>()
  for (const a of list) {
    const arr = map.get(a.group) ?? []
    arr.push(a)
    map.set(a.group, arr)
  }
  return [...map.entries()].map(([group, articles]) => ({ group, articles, cat: articles[0].cat }))
}

export function wikiById(id: string) {
  return wikiArticles.find((a) => a.id === id)
}
