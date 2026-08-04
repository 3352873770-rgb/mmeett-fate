export type ToolCategory = 'chart' | 'divination' | 'analysis' | 'utility'

export type Tool = {
  id: string
  zh: string
  en: string
  category: ToolCategory
  subtitle: string
  /** 是否需要会员全能解读（结果盘面免费，解读会员） */
  member: boolean
  /** A：完整交互闭环；B：统一表单模板 */
  tier: 'A' | 'B'
  /** 排盘前的准备提示 */
  prep?: string[]
}

export const categoryLabels: Record<ToolCategory, { zh: string; en: string }> = {
  chart: { zh: '命盘', en: 'Charts' },
  divination: { zh: '卜筮', en: 'Divination' },
  analysis: { zh: '分析', en: 'Analysis' },
  utility: { zh: '实用小工具', en: 'Utilities' },
}

export const tools: Tool[] = [
  // ===== 命盘 =====
  { id: 'ziwei', zh: '紫微斗数', en: 'Zi Wei Dou Shu', category: 'chart', subtitle: '十二宫与四化', member: true, tier: 'A', prep: ['出生日期和具体时间', '出生地点，必要时校正真太阳时', '性别、档案或已有历史记录'] },
  { id: 'bazi', zh: '八字排盘', en: 'BaZi Four Pillars', category: 'chart', subtitle: '四柱与五行旺衰', member: true, tier: 'A', prep: ['出生日期和具体时间', '出生地点', '性别'] },
  { id: 'bazi-detail', zh: '八字详批', en: 'BaZi Classic Reading', category: 'chart', subtitle: '古籍锚点逐柱参详', member: false, tier: 'A', prep: ['出生日期和时间', '出生地点', '所问侧重'] },
  { id: 'bazi-hepan', zh: '八字合盘', en: 'BaZi Synastry', category: 'chart', subtitle: '双人四柱对照合缘', member: false, tier: 'A', prep: ['双方出生信息', '关系维度'] },
  { id: 'qimen', zh: '奇门遁甲', en: 'Qi Men Dun Jia', category: 'chart', subtitle: '时家奇门九宫', member: true, tier: 'B', prep: ['起局时间', '所问事项'] },
  { id: 'meihua', zh: '梅花易数', en: 'Plum Blossom', category: 'chart', subtitle: '体用与互变', member: false, tier: 'B', prep: ['起卦数字或时间'] },
  { id: 'hecan', zh: '三术合参', en: 'Tri-Method', category: 'chart', subtitle: '八字 · 紫微 · 奇门互证', member: true, tier: 'A' },
  { id: 'qizheng', zh: '七政四余', en: 'Seven Governors', category: 'chart', subtitle: '恒星古法星盘', member: true, tier: 'B', prep: ['出生日期和时间', '出生地点经纬度'] },
  { id: 'ziwei-hepan', zh: '紫微合盘', en: 'Zi Wei Synastry', category: 'chart', subtitle: '双人十二宫对映', member: false, tier: 'A', prep: ['双方出生信息', '关系维度'] },

  // ===== 卜筮 =====
  { id: 'daliuren', zh: '大六壬', en: 'Da Liu Ren', category: 'divination', subtitle: '月将 · 四课三传', member: true, tier: 'B', prep: ['占问时间', '所问事项'] },
  { id: 'xiaoliuren', zh: '小六壬', en: 'Xiao Liu Ren', category: 'divination', subtitle: '掐指速断', member: false, tier: 'B', prep: ['所问事项'] },
  { id: 'liuyao', zh: '六爻', en: 'Liu Yao', category: 'divination', subtitle: '铜钱法成卦', member: false, tier: 'A', prep: ['心中默念所占之事'] },
  { id: 'tarot', zh: '塔罗牌', en: 'Tarot', category: 'divination', subtitle: '78 张完整牌组', member: false, tier: 'A', prep: ['选择牌阵', '默想问题'] },
  { id: 'zhuge', zh: '诸葛神数', en: 'Zhuge Oracle', category: 'divination', subtitle: '384 签问事', member: false, tier: 'A', prep: ['一事一问', '默念三字'] },
  { id: 'astro', zh: '星盘解析', en: 'Natal Astrology', category: 'divination', subtitle: '现代占星宫位', member: true, tier: 'B', prep: ['出生日期和时间', '出生地点'] },

  // ===== 分析 =====
  { id: 'fengshui', zh: '风水勘宅', en: 'Feng Shui', category: 'analysis', subtitle: '八宅与飞星', member: true, tier: 'B', prep: ['坐向', '户型信息'] },
  { id: 'wuxing', zh: '五行分析', en: 'Five Elements', category: 'analysis', subtitle: '旺衰与喜忌', member: false, tier: 'A', prep: ['出生日期和时间'] },

  // ===== 实用小工具 =====
  { id: 'cezi', zh: '测字', en: 'Character Reading', category: 'utility', subtitle: '拆字断事', member: false, tier: 'B', prep: ['写下一个汉字', '所问事项'] },
  { id: 'dream', zh: '周公解梦', en: 'Dream Reading', category: 'utility', subtitle: '梦境索引', member: false, tier: 'B', prep: ['描述梦境关键词'] },
  { id: 'daily-fortune', zh: '每日运势', en: 'Daily Fortune', category: 'utility', subtitle: '今日宜忌节律', member: false, tier: 'B', prep: ['出生日期'] },
  { id: 'daily-hexagram', zh: '每日一卦', en: 'Daily Hexagram', category: 'utility', subtitle: '当日固定卦象', member: false, tier: 'A', prep: ['姓名、性别与日期（可选）'] },
  { id: 'jieqi', zh: '节气时令', en: 'Solar Terms', category: 'utility', subtitle: '二十四节气', member: false, tier: 'B', prep: ['查询日期'] },
  { id: 'wuyun', zh: '五运六气', en: 'Five Movements', category: 'utility', subtitle: '运气推算', member: true, tier: 'B', prep: ['年份'] },
  { id: 'huangli', zh: '黄历', en: 'Almanac', category: 'utility', subtitle: '每日宜忌', member: false, tier: 'B', prep: ['查询日期'] },
  { id: 'name', zh: '姓名分析', en: 'Name Analysis', category: 'utility', subtitle: '三才五格', member: false, tier: 'B', prep: ['姓名'] },
  { id: 'birth-time', zh: '出生校时', en: 'Birth Time Check', category: 'utility', subtitle: '真太阳时换算', member: false, tier: 'B', prep: ['出生时间', '出生地点'] },
  { id: 'birth-time-rectify', zh: '寻时定盘', en: 'Time Rectification', category: 'utility', subtitle: '缩小出生时辰', member: true, tier: 'B', prep: ['已知大致时辰', '若干人生事件'] },
  { id: 'zeri', zh: '择日速览', en: 'Date Selection', category: 'utility', subtitle: '吉日速查', member: false, tier: 'B', prep: ['事项类型', '时间范围'] },
]

export function toolById(id: string): Tool | undefined {
  return tools.find((t) => t.id === id)
}

export function toolsByCategory(cat: ToolCategory | 'all'): Tool[] {
  return cat === 'all' ? tools : tools.filter((t) => t.category === cat)
}
