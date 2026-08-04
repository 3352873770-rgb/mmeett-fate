export type Game = {
  id: string
  zh: string
  en: string
  tag: string
  desc: string
  cta: string
  headline: string
  lead: string
  accent: string
  icon: 'spark' | 'scroll' | 'heart' | 'mask'
}

export const games: Game[] = [
  {
    id: 'daily-card',
    zh: '今日卡片',
    en: 'DAILY CARD',
    tag: '每日命理卡',
    desc: '每天一张竖屏卡，整理今日关键词、宜忌、幸运色、贵人方位和财位，适合保存与分享。',
    cta: '生成今日卡',
    headline: '把今天做成一张能分享的命理卡',
    lead: '每天按北京时间生成一张竖屏卡片，包含今日关键词、宜忌、幸运色、贵人方位和财位。适合保存发朋友圈、抖音封面或发给朋友。',
    accent: '#2f6f8f',
    icon: 'spark',
  },
  {
    id: 'daily-lottery',
    zh: '每日摇签',
    en: 'DAILY LOTTERY',
    tag: '每日一次',
    desc: '服务器锁定当天签文，摇到上上签，当日赠送 1 次全能解读。',
    cta: '进入摇签',
    headline: '每日摇签',
    lead: '每个用户每天只能摇一次。结果当天锁定，刷新或重复点击都不会重抽。',
    accent: '#8a6a32',
    icon: 'scroll',
  },
  {
    id: 'red-thread',
    zh: '红线合拍',
    en: 'MATCHING DIVINATION',
    tag: '缘分合盘',
    desc: '输入两个人的姓名和生日，生成合拍关键词、关系分数、红线动效和分享图。',
    cta: '开始合拍',
    headline: '看两个人的红线牵引感',
    lead: '输入两个人的姓名和生日，生成一张关系合拍卡。适合发给朋友互动，也可以继续进入八字合盘看完整关系结构。',
    accent: '#9b3d45',
    icon: 'heart',
  },
  {
    id: 'tarot-draw',
    zh: '塔罗抽牌',
    en: 'TAROT DRAW',
    tag: '牌阵占问',
    desc: '选择单牌、三牌或抉择牌阵，抽牌、翻牌、保存牌阵结果一步完成。',
    cta: '开始抽牌',
    headline: '洗牌入局，照见当下暗线',
    lead: '先把问题定住，再让牌面落位。这里给你一张可保存的小局图；想继续细问，再进完整塔罗解读。',
    accent: '#6b4f8a',
    icon: 'mask',
  },
]

export function gameById(id: string): Game | undefined {
  return games.find((g) => g.id === id)
}

export function seedFrom(s: string): number {
  let h = 0
  for (const ch of s) h = (h * 31 + ch.codePointAt(0)!) % 1_000_000_007
  return Math.abs(h)
}

export function todayKey(prefix = ''): string {
  const d = new Date()
  const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
  return prefix ? `${prefix}-${key}` : key
}
