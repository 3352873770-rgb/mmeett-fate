import { baziFromBirth, type BaziChart, type Element } from '@/lib/bazi'
import { ziweiFromBirth, type ZiweiChart } from '@/lib/ziwei'

export type RelationDim =
  | '情侣'
  | '夫妻'
  | '亲子'
  | '合伙'
  | '职场'
  | '朋友'

export const RELATION_DIMS: { id: RelationDim; ico: string; tip: string }[] = [
  { id: '情侣', ico: '♡', tip: '侧重情感吸引与浪漫指数' },
  { id: '夫妻', ico: '⚭', tip: '侧重缘分深度与长期稳定' },
  { id: '亲子', ico: '⌂', tip: '侧重角色定位与天伦纽带' },
  { id: '合伙', ico: '⚙', tip: '侧重事业互补与财运共振' },
  { id: '职场', ico: '▦', tip: '侧重角色适配与协作效率' },
  { id: '朋友', ico: '☾', tip: '侧重三观共鸣与精神默契' },
]

export type HepanScore = {
  overall: number
  attract: number
  complement: number
  friction: number
  tags: string[]
  summary: string
  pillarsNote: string
}

function elDiff(a: Record<Element, number>, b: Record<Element, number>): number {
  const keys: Element[] = ['木', '火', '土', '金', '水']
  let d = 0
  for (const k of keys) d += Math.abs(a[k] - b[k])
  return d
}

function hashPair(a: string, b: string, dim: string): number {
  const s = `${a}|${b}|${dim}`
  let h = 0
  for (const ch of s) h = (h * 33 + ch.codePointAt(0)!) % 9973
  return h
}

/** 两盘八字合缘（确定性演示） */
export function baziHepan(
  dateA: string, hourA: number,
  dateB: string, hourB: number,
  dim: RelationDim,
): { a: BaziChart; b: BaziChart; score: HepanScore } {
  const a = baziFromBirth(dateA, hourA)
  const b = baziFromBirth(dateB, hourB)
  const seed = hashPair(dateA + hourA, dateB + hourB, dim)
  const diff = elDiff(a.counts, b.counts)
  const sameDay = a.dayMaster === b.dayMaster
  const attract = 55 + (seed % 28) + (sameDay ? 8 : 0) - Math.min(12, diff)
  const complement = 50 + ((seed * 3) % 30) + Math.min(15, diff)
  const friction = 20 + ((seed * 7) % 35) + (sameDay ? 5 : 0)
  const overall = Math.round((attract * 0.4 + complement * 0.4 + (100 - friction) * 0.2))
  const clamp = (n: number) => Math.max(35, Math.min(96, Math.round(n)))

  const dimLine: Record<RelationDim, string> = {
    情侣: '情感吸引偏强，日常摩擦多出现在节奏与表达方式。',
    夫妻: '长期稳定看印比与财官是否彼此托底，合处多于冲处。',
    亲子: '角色位差明显，宜以引导代掌控，避免比劫过旺争夺话语。',
    合伙: '事业互补可成势，财运共振看日支与年月是否成局。',
    职场: '协作效率取决于官杀与印星是否互不碍事。',
    朋友: '精神默契先于利益，伤食见印时交谈更畅。',
  }

  const tags = [
    sameDay ? '日主同气' : '日主异气',
    diff < 4 ? '五行近似' : '五行互补',
    attract > complement ? '吸引优先' : '互补优先',
    `${dim}维度`,
  ]

  return {
    a, b,
    score: {
      overall: clamp(overall),
      attract: clamp(attract),
      complement: clamp(complement),
      friction: clamp(friction),
      tags,
      summary: `以「${dim}」观之：${dimLine[dim]}总体契合约 ${clamp(overall)} 分（演示假数据）。`,
      pillarsNote: `甲盘日主${a.dayMaster}（${a.dayMasterEl}）· 乙盘日主${b.dayMaster}（${b.dayMasterEl}）。年柱 ${a.year.stem}${a.year.branch} ↔ ${b.year.stem}${b.year.branch}。`,
    },
  }
}

/** 两盘紫微合缘（确定性演示） */
export function ziweiHepan(
  dateA: string, hourA: number,
  dateB: string, hourB: number,
  dim: RelationDim,
): { a: ZiweiChart; b: ZiweiChart; score: HepanScore } {
  const a = ziweiFromBirth(dateA, hourA)
  const b = ziweiFromBirth(dateB, hourB)
  const seed = hashPair(dateA + hourA, dateB + hourB, `zw-${dim}`)
  const sameMing = a.palaces[0].branch === b.palaces[0].branch
  const attract = 52 + (seed % 30) + (sameMing ? 10 : 3)
  const complement = 48 + ((seed * 5) % 32)
  const friction = 18 + ((seed * 11) % 40)
  const overall = Math.round((attract * 0.35 + complement * 0.4 + (100 - friction) * 0.25))
  const clamp = (n: number) => Math.max(38, Math.min(95, Math.round(n)))

  const dimLine: Record<RelationDim, string> = {
    情侣: '夫妻宫与桃花星互见时吸引偏强，宜看忌星是否对照宫落陷。',
    夫妻: '三方四正是否彼此填空，决定长期相处是否省力。',
    亲子: '子女宫与命身对照，重在教养节奏而非结果强迫。',
    合伙: '财帛与官禄对映顺则利于共事。',
    职场: '迁移与交友宫互辅，协作更顺。',
    朋友: '福德与交友宫同气，精神共鸣更易维持。',
  }

  return {
    a, b,
    score: {
      overall: clamp(overall),
      attract: clamp(attract),
      complement: clamp(complement),
      friction: clamp(friction),
      tags: [
        sameMing ? '命宫同支' : '命宫异支',
        `甲命${a.palaces[0].branch}`,
        `乙命${b.palaces[0].branch}`,
        `${dim}维度`,
      ],
      summary: `紫微合盘以「${dim}」观：${dimLine[dim]}总体约 ${clamp(overall)} 分（演示假数据）。`,
      pillarsNote: `甲命宫在${a.palaces[0].branch}（主星：${a.palaces[0].stars.join('、') || '空'}）；乙命宫在${b.palaces[0].branch}（主星：${b.palaces[0].stars.join('、') || '空'}）。`,
    },
  }
}
