// 八字排盘：确定性演示算法（结构对齐参考站主盘，非严谨历法）

export const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const
export const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const

export type Element = '木' | '火' | '土' | '金' | '水'

export const STEM_ELEMENT: Element[] = ['木', '木', '火', '火', '土', '土', '金', '金', '水', '水']
export const BRANCH_ELEMENT: Element[] = ['水', '土', '木', '木', '土', '火', '火', '土', '金', '金', '土', '水']
export const ELEMENTS: Element[] = ['木', '火', '土', '金', '水']

export const EL_COLOR: Record<Element, string> = {
  木: '#3d8b5a', 火: '#c24b3f', 土: '#b8893a', 金: '#b89a3d', 水: '#3d6fa0',
}

const HIDDEN: Record<string, string[]> = {
  子: ['癸'], 丑: ['己', '癸', '辛'], 寅: ['甲', '丙', '戊'], 卯: ['乙'],
  辰: ['戊', '乙', '癸'], 巳: ['丙', '戊', '庚'], 午: ['丁', '己'], 未: ['己', '丁', '乙'],
  申: ['庚', '壬', '戊'], 酉: ['辛'], 戌: ['戊', '辛', '丁'], 亥: ['壬', '甲'],
}

const NAYIN = [
  '海中金', '炉中火', '大林木', '路旁土', '剑锋金', '山头火',
  '涧下水', '城头土', '白蜡金', '杨柳木', '泉中水', '屋上土',
  '霹雳火', '松柏木', '长流水', '沙中金', '山下火', '平地木',
  '壁上土', '金箔金', '覆灯火', '天河水', '大驿土', '钗钏金',
  '桑柘木', '大溪水', '沙中土', '天上火', '石榴木', '大海水',
]

const SHISHEN_TABLE = ['比肩', '劫财', '食神', '伤官', '偏财', '正财', '七杀', '正官', '偏印', '正印']

const SHENSHA_POOL = [
  ['天乙贵人', '文昌', '桃花'],
  ['驿马', '华盖', '将星'],
  ['金舆', '禄神', '勾绞'],
  ['孤辰', '寡宿', '空亡'],
  ['红鸾', '天喜', '羊刃'],
  ['词馆', '学堂', '天德'],
]

const STAGE = ['长生', '沐浴', '冠带', '临官', '帝旺', '衰', '病', '死', '墓', '绝', '胎', '养']

export type Pillar = {
  stem: string
  branch: string
  stemEl: Element
  branchEl: Element
  shishen: string
  hidden: string[]
  hiddenGods: string[]
  nayin: string
  stage: string
  selfSit: string
  xunkong: string
  shensha: string[]
}

export type BaziChart = {
  year: Pillar
  month: Pillar
  day: Pillar
  hour: Pillar
  counts: Record<Element, number>
  percents: Record<Element, number>
  dayMaster: string
  dayMasterEl: Element
  summary: string
  strength: '有力' | '中和' | '偏弱'
  qiScore: number
  deling: number
  dedi: number
  deshi: number
  dynamic: number
  useful: Element[]
  careful: Element[]
  relations: { kind: string; items: string[]; note: string }[]
  luckYears: { year: number; label: string; score: number }[]
}

function godOf(dayStem: string, otherStem: string): string {
  const d = STEMS.indexOf(dayStem as typeof STEMS[number])
  const o = STEMS.indexOf(otherStem as typeof STEMS[number])
  if (d < 0 || o < 0) return '—'
  const same = d % 2 === o % 2
  const diff = ((o - d) + 10) % 10
  // map offset to shishen with polarity
  const base = Math.floor(diff / 2)
  const idx = same ? base * 2 : base * 2 + 1
  return SHISHEN_TABLE[((idx % 10) + 10) % 10]
}

function pillarOf(stemIdx: number, branchIdx: number, dayStem: string, seed: number, isDay: boolean): Pillar {
  const s = ((stemIdx % 10) + 10) % 10
  const b = ((branchIdx % 12) + 12) % 12
  const stem = STEMS[s]
  const branch = BRANCHES[b]
  const hidden = HIDDEN[branch]
  return {
    stem,
    branch,
    stemEl: STEM_ELEMENT[s],
    branchEl: BRANCH_ELEMENT[b],
    shishen: isDay ? '日主' : godOf(dayStem, stem),
    hidden,
    hiddenGods: hidden.map((h) => (isDay && h === dayStem ? '比肩' : godOf(dayStem, h))),
    nayin: NAYIN[((s + b) * 3 + seed) % NAYIN.length],
    stage: STAGE[(b + s + seed) % 12],
    selfSit: STAGE[(b * 2 + s) % 12],
    xunkong: `空${BRANCHES[(b + 10) % 12]}${BRANCHES[(b + 11) % 12]}`,
    shensha: SHENSHA_POOL[(s + b + seed) % SHENSHA_POOL.length],
  }
}

export function hourToBranch(hour: number): number {
  return Math.floor(((hour + 1) % 24) / 2)
}

function maxEl(counts: Record<Element, number>): Element {
  return ELEMENTS.reduce((a, b) => (counts[b] > counts[a] ? b : a))
}

function minEl(counts: Record<Element, number>): Element {
  return ELEMENTS.reduce((a, b) => (counts[b] < counts[a] ? b : a))
}

export function baziFromBirth(dateStr: string, hour: number): BaziChart {
  const d = new Date(dateStr + 'T12:00:00')
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const seed = year + month * 17 + hour * 3

  const yStem = (year - 4) % 10
  const yBranch = (year - 4) % 12
  const jdn = Math.floor(Date.UTC(year, month - 1, d.getDate()) / 86400000) + 2440588
  const dStem = (jdn + 9) % 10
  const dBranch = (jdn + 1) % 12
  const dayStem = STEMS[((dStem % 10) + 10) % 10]

  const mStem = (yStem * 2 + month) % 10
  const mBranch = (month + 1) % 12
  const hBranch = hourToBranch(hour)
  const hStem = (dStem * 2 + hBranch) % 10

  // day pillar first needed for 十神
  const dayP = pillarOf(dStem, dBranch, dayStem, seed, true)
  const yearP = pillarOf(yStem, yBranch, dayStem, seed, false)
  const monthP = pillarOf(mStem, mBranch, dayStem, seed + 1, false)
  const hourP = pillarOf(hStem, hBranch, dayStem, seed + 2, false)

  const counts: Record<Element, number> = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 }
  for (const p of [yearP, monthP, dayP, hourP]) {
    counts[p.stemEl]++
    counts[p.branchEl]++
  }
  const total = ELEMENTS.reduce((a, e) => a + counts[e], 0) || 1
  const percents = Object.fromEntries(ELEMENTS.map((e) => [e, Math.round((counts[e] / total) * 100)])) as Record<Element, number>

  const deling = 12 + (seed % 16)
  const dedi = 4 + (seed % 18)
  const deshi = 10 + ((seed * 3) % 14)
  const dynamic = 6 + ((seed * 5) % 14)
  const qiScore = Math.max(35, Math.min(88, Math.round(deling + dedi * 0.6 + deshi + dynamic * 0.4)))
  const strength: BaziChart['strength'] = qiScore >= 58 ? '有力' : qiScore >= 45 ? '中和' : '偏弱'

  const strong = maxEl(counts)
  const weak = minEl(counts)
  const useful: Element[] = strength === '有力'
    ? ELEMENTS.filter((e) => e !== dayP.stemEl).slice(0, 3)
    : [dayP.stemEl, ...ELEMENTS.filter((e) => e !== dayP.stemEl)].slice(0, 3)
  const careful = ELEMENTS.filter((e) => !useful.includes(e)).slice(0, 2)

  const summary = `四柱为 ${yearP.stem}${yearP.branch}、${monthP.stem}${monthP.branch}、${dayP.stem}${dayP.branch}、${hourP.stem}${hourP.branch}，日主为${dayP.stem}${dayP.stemEl}。五行计数中${strong}占比较高（${percents[strong]}%），${weak}占比较低（${percents[weak]}%）；当前按${year}年匹配大运流年，现实年龄以周岁校验为准。`

  const relations = [
    {
      kind: '六合',
      items: [yearP.branch, monthP.branch],
      note: `年柱${yearP.branch} · 月柱${monthP.branch}。有合意与牵连，仍要看是否合化、是否为喜用。`,
    },
    {
      kind: '三合',
      items: [dayP.branch, yearP.branch],
      note: `日柱${dayP.branch}、年柱${yearP.branch}；半合要看岁运是否补齐。`,
    },
    {
      kind: '刑害破',
      items: [hourP.branch, yearP.branch],
      note: `时柱${hourP.branch}、年柱${yearP.branch}；同支自刑，常看自我反复和内在卡点。`,
    },
  ]

  const luckYears = Array.from({ length: 9 }, (_, i) => {
    const y = year - 4 + i
    return { year: y, label: `${STEMS[(y - 4) % 10]}${BRANCHES[(y - 4) % 12]}`, score: 35 + ((seed + i * 11) % 45) }
  })

  return {
    year: yearP, month: monthP, day: dayP, hour: hourP,
    counts, percents, dayMaster: dayP.stem, dayMasterEl: dayP.stemEl,
    summary, strength, qiScore, deling, dedi, deshi, dynamic,
    useful, careful, relations, luckYears,
  }
}
