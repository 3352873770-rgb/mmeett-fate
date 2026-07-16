// 塔罗牌组：78 张（大阿卡纳 22 + 小阿卡纳 56），关键词为原创演示文案

export type TarotCard = {
  id: string
  zh: string
  en: string
  arcana: 'major' | 'minor'
  suit?: string
  upright: string
  reversed: string
}

export const majorArcana: TarotCard[] = [
  { id: 'm0', zh: '愚者', en: 'The Fool', arcana: 'major', upright: '新的开始 · 自由 · 冒险', reversed: '鲁莽 · 犹豫 · 逃避' },
  { id: 'm1', zh: '魔术师', en: 'The Magician', arcana: 'major', upright: '行动力 · 创造 · 资源到位', reversed: '拖延 · 空谈 · 操纵' },
  { id: 'm2', zh: '女祭司', en: 'The High Priestess', arcana: 'major', upright: '直觉 · 内省 · 潜藏的答案', reversed: '忽视直觉 · 秘密 · 迷惑' },
  { id: 'm3', zh: '女皇', en: 'The Empress', arcana: 'major', upright: '丰盛 · 滋养 · 创造力', reversed: '依赖 · 停滞 · 空耗' },
  { id: 'm4', zh: '皇帝', en: 'The Emperor', arcana: 'major', upright: '秩序 · 掌控 · 稳固', reversed: '专断 · 僵化 · 失控' },
  { id: 'm5', zh: '教皇', en: 'The Hierophant', arcana: 'major', upright: '传统 · 指引 · 归属', reversed: '教条 · 叛逆 · 形式化' },
  { id: 'm6', zh: '恋人', en: 'The Lovers', arcana: 'major', upright: '关系 · 选择 · 契合', reversed: '失衡 · 诱惑 · 分歧' },
  { id: 'm7', zh: '战车', en: 'The Chariot', arcana: 'major', upright: '意志 · 前进 · 掌握方向', reversed: '失控 · 内耗 · 停滞' },
  { id: 'm8', zh: '力量', en: 'Strength', arcana: 'major', upright: '柔韧 · 自制 · 勇气', reversed: '自我怀疑 · 急躁 · 逞强' },
  { id: 'm9', zh: '隐者', en: 'The Hermit', arcana: 'major', upright: '独处 · 求索 · 内在之光', reversed: '孤立 · 逃避 · 固执' },
  { id: 'm10', zh: '命运之轮', en: 'Wheel of Fortune', arcana: 'major', upright: '转机 · 循环 · 顺势', reversed: '逆流 · 拖延 · 失序' },
  { id: 'm11', zh: '正义', en: 'Justice', arcana: 'major', upright: '公正 · 因果 · 权衡', reversed: '偏颇 · 推责 · 失衡' },
  { id: 'm12', zh: '倒吊人', en: 'The Hanged Man', arcana: 'major', upright: '换位 · 等待 · 放下', reversed: '僵持 · 徒劳 · 牺牲无谓' },
  { id: 'm13', zh: '死神', en: 'Death', arcana: 'major', upright: '结束 · 蜕变 · 重生', reversed: '抗拒改变 · 停滞 · 拖延' },
  { id: 'm14', zh: '节制', en: 'Temperance', arcana: 'major', upright: '调和 · 节奏 · 中道', reversed: '失衡 · 过度 · 急功' },
  { id: 'm15', zh: '恶魔', en: 'The Devil', arcana: 'major', upright: '欲望 · 束缚 · 执着', reversed: '松绑 · 觉察 · 挣脱' },
  { id: 'm16', zh: '高塔', en: 'The Tower', arcana: 'major', upright: '突变 · 瓦解 · 觉醒', reversed: '拖延崩解 · 侥幸 · 余震' },
  { id: 'm17', zh: '星星', en: 'The Star', arcana: 'major', upright: '希望 · 疗愈 · 指引', reversed: '失望 · 自我怀疑 · 迷茫' },
  { id: 'm18', zh: '月亮', en: 'The Moon', arcana: 'major', upright: '潜意识 · 幻象 · 不安', reversed: '拨云见日 · 释怀 · 澄清' },
  { id: 'm19', zh: '太阳', en: 'The Sun', arcana: 'major', upright: '喜悦 · 成功 · 清明', reversed: '短暂受挫 · 过度乐观' },
  { id: 'm20', zh: '审判', en: 'Judgement', arcana: 'major', upright: '觉醒 · 召唤 · 清算', reversed: '自责 · 逃避 · 拖延' },
  { id: 'm21', zh: '世界', en: 'The World', arcana: 'major', upright: '圆满 · 完成 · 整合', reversed: '未竟 · 收尾拖延 · 差一步' },
]

// 小阿卡纳：4 花色 × 14 阶
const suits = [
  { key: 'wands', zh: '权杖', en: 'Wands', theme: '行动与热情' },
  { key: 'cups', zh: '圣杯', en: 'Cups', theme: '情感与关系' },
  { key: 'swords', zh: '宝剑', en: 'Swords', theme: '思维与冲突' },
  { key: 'pentacles', zh: '星币', en: 'Pentacles', theme: '现实与资源' },
]

const ranks = [
  { zh: 'A', en: 'Ace', up: '起始的能量', rev: '起步受阻' },
  { zh: '二', en: 'Two', up: '权衡与选择', rev: '犹豫难决' },
  { zh: '三', en: 'Three', up: '初步成果', rev: '进度受挫' },
  { zh: '四', en: 'Four', up: '稳定与守成', rev: '停滞或固守' },
  { zh: '五', en: 'Five', up: '波动与考验', rev: '走出低谷' },
  { zh: '六', en: 'Six', up: '过渡与回报', rev: '悬而未决' },
  { zh: '七', en: 'Seven', up: '评估与坚持', rev: '动摇或投机' },
  { zh: '八', en: 'Eight', up: '投入与推进', rev: '仓促或受阻' },
  { zh: '九', en: 'Nine', up: '接近圆满', rev: '独木难支' },
  { zh: '十', en: 'Ten', up: '阶段完成', rev: '负担过重' },
  { zh: '侍从', en: 'Page', up: '学习与探索', rev: '分心或幼稚' },
  { zh: '骑士', en: 'Knight', up: '行动与追求', rev: '冲动或迟疑' },
  { zh: '王后', en: 'Queen', up: '成熟与包容', rev: '情绪失衡' },
  { zh: '国王', en: 'King', up: '掌控与担当', rev: '专断或失位' },
]

export const minorArcana: TarotCard[] = suits.flatMap((s) =>
  ranks.map((r) => ({
    id: `${s.key}-${r.en.toLowerCase()}`,
    zh: `${s.zh}${r.zh}`,
    en: `${r.en} of ${s.en}`,
    arcana: 'minor' as const,
    suit: s.zh,
    upright: `${s.theme}：${r.up}`,
    reversed: `${s.theme}：${r.rev}`,
  })),
)

export const fullDeck: TarotCard[] = [...majorArcana, ...minorArcana]

/** Rider–Waite–Smith 牌面（public/tarot/cards/{id}.jpg） */
export const TAROT_CARD_BACK = '/tarot/back.svg'

export function tarotCardImage(id: string): string {
  return `/tarot/cards/${id}.jpg`
}

export type DrawnCard = TarotCard & { reversed_orientation: boolean }

/** 抽 n 张不重复的牌，随机正逆位 */
export function drawCards(n: number): DrawnCard[] {
  const pool = [...fullDeck]
  const out: DrawnCard[] = []
  for (let i = 0; i < n && pool.length; i++) {
    const idx = Math.floor(Math.random() * pool.length)
    const [card] = pool.splice(idx, 1)
    out.push({ ...card, reversed_orientation: Math.random() < 0.35 })
  }
  return out
}

export type Spread = {
  id: string
  zh: string
  en: string
  count: number
  positions: string[]
  desc: string
}

export const spreads: Spread[] = [
  { id: 'single', zh: '单牌', en: 'Single', count: 1, positions: ['当下指引'], desc: '一张牌，直指此刻核心。' },
  { id: 'three', zh: '三牌', en: 'Three Card', count: 3, positions: ['过去', '现在', '未来'], desc: '时间之流，看清脉络。' },
  { id: 'choice', zh: '抉择', en: 'Decision', count: 3, positions: ['现状', '选择 A', '选择 B'], desc: '两难之间，权衡取舍。' },
]
