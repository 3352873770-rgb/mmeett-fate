// 六爻起卦：铜钱法（3 枚铜钱 × 6 次），确定性演示算法

export type Line = {
  /** 6 老阴 / 7 少阳 / 8 少阴 / 9 老阳 */
  value: 6 | 7 | 8 | 9
  /** 本卦该爻是否为阳 */
  yang: boolean
  /** 是否为变爻（老阴/老阳） */
  changing: boolean
}

export type Trigram = {
  name: string
  symbol: string
  nature: string
  element: string
}

// 八卦（顺序：乾兑离震巽坎艮坤），symbol 自下而上
export const trigrams: Trigram[] = [
  { name: '乾', symbol: '☰', nature: '天', element: '金' },
  { name: '兑', symbol: '☱', nature: '泽', element: '金' },
  { name: '离', symbol: '☲', nature: '火', element: '火' },
  { name: '震', symbol: '☳', nature: '雷', element: '木' },
  { name: '巽', symbol: '☴', nature: '风', element: '木' },
  { name: '坎', symbol: '☵', nature: '水', element: '水' },
  { name: '艮', symbol: '☶', nature: '山', element: '土' },
  { name: '坤', symbol: '☷', nature: '地', element: '土' },
]

// 三爻阴阳（初,二,三；1=阳 0=阴）→ 八卦索引
const TRIGRAM_KEY: Record<string, number> = {
  '111': 0, '110': 1, '101': 2, '100': 3, '011': 4, '010': 5, '001': 6, '000': 7,
}

// 64 卦名矩阵 [上卦][下卦]，行列顺序均为 乾兑离震巽坎艮坤
const HEX_NAMES: string[][] = [
  ['乾为天', '天泽履', '天火同人', '天雷无妄', '天风姤', '天水讼', '天山遁', '天地否'],
  ['泽天夬', '兑为泽', '泽火革', '泽雷随', '泽风大过', '泽水困', '泽山咸', '泽地萃'],
  ['火天大有', '火泽睽', '离为火', '火雷噬嗑', '火风鼎', '火水未济', '火山旅', '火地晋'],
  ['雷天大壮', '雷泽归妹', '雷火丰', '震为雷', '雷风恒', '雷水解', '雷山小过', '雷地豫'],
  ['风天小畜', '风泽中孚', '风火家人', '风雷益', '巽为风', '风水涣', '风山渐', '风地观'],
  ['水天需', '水泽节', '水火既济', '水雷屯', '水风井', '坎为水', '水山蹇', '水地比'],
  ['山天大畜', '山泽损', '山火贲', '山雷颐', '山风蛊', '山水蒙', '艮为山', '山地剥'],
  ['地天泰', '地泽临', '地火明夷', '地雷复', '地风升', '地水师', '地山谦', '坤为地'],
]

function trigramIndex(l1: boolean, l2: boolean, l3: boolean): number {
  const key = `${l1 ? 1 : 0}${l2 ? 1 : 0}${l3 ? 1 : 0}`
  return TRIGRAM_KEY[key]
}

export type Hexagram = {
  name: string
  upper: Trigram
  lower: Trigram
}

function hexFromLines(lines: boolean[]): Hexagram {
  // lines[0] 为初爻（最下），lines[5] 为上爻
  const lowerIdx = trigramIndex(lines[0], lines[1], lines[2])
  const upperIdx = trigramIndex(lines[3], lines[4], lines[5])
  return {
    name: HEX_NAMES[upperIdx][lowerIdx],
    upper: trigrams[upperIdx],
    lower: trigrams[lowerIdx],
  }
}

export type CastResult = {
  lines: Line[]
  ben: Hexagram
  bian: Hexagram | null
  changingCount: number
  reading: string
}

/** 单爻掷币：返回 6/7/8/9。backs = 背面(阳)数量 */
export function tossLine(): Line {
  let backs = 0
  for (let i = 0; i < 3; i++) backs += Math.random() < 0.5 ? 1 : 0
  const value = (6 + backs) as 6 | 7 | 8 | 9
  const yang = value % 2 === 1
  const changing = value === 6 || value === 9
  return { value, yang, changing }
}

const READINGS: Record<'none' | 'few' | 'many', string[]> = {
  none: [
    '六爻安静，事态平稳，宜守成不宜妄动。先把手上的事做扎实。',
    '卦无动爻，格局已定。当下不必强求转折，顺势而为即可。',
  ],
  few: [
    '动爻点出关键，变化正从一处生起。抓住变爻所示之机，余者不必多虑。',
    '一两处松动，说明转机在细节。盯住变的地方，静待其成。',
  ],
  many: [
    '多爻齐动，局势翻覆。此时信息未定，宜缓不宜急，先看清再落子。',
    '动象纷杂，本卦与变卦拉扯。先分清主次，不要被一时之象牵着走。',
  ],
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/** 起一卦 */
export function castHexagram(): CastResult {
  const lines: Line[] = Array.from({ length: 6 }, () => tossLine())
  const benBools = lines.map((l) => l.yang)
  const ben = hexFromLines(benBools)

  const changingCount = lines.filter((l) => l.changing).length
  let bian: Hexagram | null = null
  if (changingCount > 0) {
    const bianBools = lines.map((l) => (l.changing ? !l.yang : l.yang))
    bian = hexFromLines(bianBools)
  }

  const bucket = changingCount === 0 ? 'none' : changingCount <= 2 ? 'few' : 'many'
  const base = pick(READINGS[bucket])
  const tail = bian ? `由「${ben.name}」变入「${bian.name}」，留意其间的过渡。` : ''
  const reading = `${base}${tail}（演示假数据，仅供体验）`

  return { lines, ben, bian, changingCount, reading }
}

export type DailyScore = { label: string; value: number; tone: string }

export type DailyHexResult = CastResult & {
  keyword: string
  upperSeed: number
  lowerSeed: number
  changeSeed: number
  tiyong: string
  summary: string
  movingLabel: string
  scores: DailyScore[]
}

/** 每日一卦：按日期确定性生成（同一天结果固定） */
export function dailyHexagram(date = new Date()): DailyHexResult {
  const seed =
    date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
  let s = seed
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  const lines: Line[] = Array.from({ length: 6 }, () => {
    let backs = 0
    for (let i = 0; i < 3; i++) backs += rand() < 0.5 ? 1 : 0
    const value = (6 + backs) as 6 | 7 | 8 | 9
    return { value, yang: value % 2 === 1, changing: value === 6 || value === 9 }
  })
  // 与原站截图气质接近：常保 0–2 动爻，演示更清晰
  if (lines.every((l) => !l.changing)) {
    const idx = Math.floor(rand() * 6)
    const yang = lines[idx].yang
    lines[idx] = yang
      ? { value: 9, yang: true, changing: true }
      : { value: 6, yang: false, changing: true }
  }

  const ben = hexFromLines(lines.map((l) => l.yang))
  const changingIdx = lines.map((l, i) => (l.changing ? i : -1)).filter((i) => i >= 0)
  const changingCount = changingIdx.length
  const bian =
    changingCount > 0
      ? hexFromLines(lines.map((l) => (l.changing ? !l.yang : l.yang)))
      : null

  const tips = ['少说多做', '先稳后进', '守静观变', '主动沟通', '收敛锋芒', '顺势借力']
  const keyword = tips[seed % tips.length]
  const movingLabel =
    changingCount === 0
      ? '无动爻'
      : changingCount === 1
        ? `第${changingIdx[0] + 1}爻`
        : changingIdx.map((i) => `第${i + 1}爻`).join('、')

  const upperSeed = 1800 + (seed % 400)
  const lowerSeed = 10 + ((seed * 7) % 90)
  const changeSeed = 18000 + ((seed * 13) % 9000)

  const sameEl = ben.upper.element === ben.lower.element
  const tiyong = bian
    ? `体卦${ben.lower.name}${ben.lower.element}与用卦${bian.lower.name}${bian.lower.element}${
        ben.lower.element === bian.lower.element ? '同气' : '相异'
      }，事情阻力相对${sameEl ? '较小' : '需调配'}；外象不必追过满，把关键动作做完即可。`
    : `本卦${ben.upper.name}${ben.upper.element}上、${ben.lower.name}${ben.lower.element}下，体用同宫察势；宜稳不宜急，把已开的线收束。`

  const shortBen = ben.name.replace(/为.+$/, '') || ben.name
  const summary = bian
    ? `今日得卦为${shortBen.length <= 2 ? shortBen : ben.lower.name}，${movingLabel}动，变为${bian.name}。今日关键词：${keyword}。`
    : `今日得卦为${ben.name}，六爻安静。今日关键词：${keyword}。`

  const scores: DailyScore[] = [
    { label: '推进', value: 55 + (seed % 35), tone: seed % 5 === 0 ? '平平' : '有力' },
    { label: '时机', value: 52 + ((seed * 3) % 38), tone: '有力' },
    { label: '反馈', value: 50 + ((seed * 5) % 40), tone: '有力' },
    { label: '守成', value: 60 + ((seed * 11) % 28), tone: seed % 3 === 0 ? '丰沛' : '有力' },
  ]

  return {
    lines, ben, bian, changingCount,
    reading: keyword,
    keyword, upperSeed, lowerSeed, changeSeed,
    tiyong, summary, movingLabel, scores,
  }
}
