// 诸葛神数：384 签起数（演示）。签文为原创演示文案。

const POEMS: { verse: string; note: string }[] = [
  { verse: '云开见月明，行舟遇顺风。', note: '阻碍将散，宜进取，事有转机。' },
  { verse: '静水深流处，缓行终得渡。', note: '不宜急躁，稳步而行自可成。' },
  { verse: '枯木逢春发，旧事又新萌。', note: '旧局重启，把握复苏之机。' },
  { verse: '风高浪未平，暂泊待时清。', note: '时机未到，宜守不宜动。' },
  { verse: '登高一望远，路在脚下开。', note: '视野放宽，方向自明。' },
  { verse: '双径难兼取，择一乃能成。', note: '当断则断，勿两头空。' },
  { verse: '金石虽坚硬，滴水亦能穿。', note: '以恒克难，贵在坚持。' },
  { verse: '灯前思旧事，莫为往者忧。', note: '放下执念，向前方看。' },
  { verse: '花繁易折枝，守拙可长久。', note: '盛极需敛，低调为宜。' },
  { verse: '暗室一灯明，心定则事成。', note: '安顿内心，答案自现。' },
  { verse: '春种秋方获，因果各有时。', note: '当下耕耘，静候收成。' },
  { verse: '同舟须共济，独木不成林。', note: '借力合作，事半功倍。' },
]

export type ZhugeSign = {
  number: number
  chars: string
  verse: string
  note: string
}

/** 由三字（取字符码）确定性起签，1-384 */
export function castZhuge(chars: string): ZhugeSign {
  const clean = chars.trim() || '问'
  let sum = 0
  for (const ch of clean) sum += ch.codePointAt(0) ?? 0
  const number = (sum % 384) + 1
  const poem = POEMS[sum % POEMS.length]
  return { number, chars: clean, verse: poem.verse, note: poem.note }
}
