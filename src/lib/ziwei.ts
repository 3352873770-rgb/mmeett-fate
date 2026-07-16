// 紫微斗数：确定性简化布盘（演示，非严谨排盘）
import { STEMS, BRANCHES } from './bazi'

export const PALACE_NAMES = [
  '命宫', '兄弟', '夫妻', '子女', '财帛', '疾厄',
  '迁移', '交友', '官禄', '田宅', '福德', '父母',
]

export const MAJOR_STARS = [
  '紫微', '天机', '太阳', '武曲', '天同', '廉贞', '天府',
  '太阴', '贪狼', '巨门', '天相', '天梁', '七杀', '破军',
]

const SIHUA = ['化禄', '化权', '化科', '化忌']

export type Palace = {
  name: string
  branch: string
  stars: string[]
  sihua: string[]
}

export type ZiweiChart = {
  palaces: Palace[]
  mingIndex: number
  yearStem: string
  summary: string
}

export function ziweiFromBirth(dateStr: string, hour: number): ZiweiChart {
  const d = new Date(dateStr)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const hourBranch = Math.floor(((hour + 1) % 24) / 2)

  // 命宫：寅起正月，顺数生月，再逆数生时（简化演示）
  const mingIndex = ((month - hourBranch + 12) % 12)

  const yearStemIdx = ((year - 4) % 10 + 10) % 10

  const palaces: Palace[] = PALACE_NAMES.map((name, i) => {
    const branchIdx = (2 + mingIndex + i) % 12 // 命宫落在某地支，其余顺布
    return {
      name,
      branch: BRANCHES[branchIdx],
      stars: [] as string[],
      sihua: [] as string[],
    }
  })

  // 主星分布（演示：以命宫为起点，按固定步长散布 14 主星）
  MAJOR_STARS.forEach((star, idx) => {
    const p = (idx * 5 + mingIndex) % 12
    palaces[p].stars.push(star)
  })

  // 四化（演示：由年干决定，落在 4 颗主星上）
  SIHUA.forEach((h, i) => {
    const starIdx = (yearStemIdx + i * 3) % MAJOR_STARS.length
    const star = MAJOR_STARS[starIdx]
    const palace = palaces.find((p) => p.stars.includes(star))
    if (palace) palace.sihua.push(`${star}${h}`)
  })

  const mingStars = palaces[0].stars.join('、') || '空宫（借对宫）'
  const summary = `命宫在${palaces[0].branch}，主星${mingStars}。年干${STEMS[yearStemIdx]}引动四化，命局格局以此为枢。（演示假数据）`

  return { palaces, mingIndex, yearStem: STEMS[yearStemIdx], summary }
}
