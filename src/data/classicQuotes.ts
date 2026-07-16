/** 古籍锚点摘句：用于八字详批等「可溯源」演示（公域古籍名 + 原创白话参注） */

export type ClassicQuote = {
  book: string
  line: string
  note: string
  pillar?: '年' | '月' | '日' | '时' | '总'
}

export const BAZI_QUOTES: ClassicQuote[] = [
  { book: '滴天髓', line: '欲识三元万法宗，先观帝载与神功。', note: '先看天地气机，再谈人事。', pillar: '总' },
  { book: '子平真诠', line: '用神者，八字中所喜之神也。', note: '用神是盘面喜用，不是一句吉凶标签。', pillar: '总' },
  { book: '渊海子平', line: '日主者，自己之身也。', note: '一切从日主强弱与月令起论。', pillar: '日' },
  { book: '三命通会', line: '年为本，日为主，月为提纲，时为结果。', note: '年看根基，月看气势，时看归宿。', pillar: '年' },
  { book: '穷通宝鉴', line: '调候为急，次看用神。', note: '寒暖燥湿先平，再用格局细论。', pillar: '月' },
  { book: '神峰通考', line: '有病方为贵，无伤不是奇。', note: '盘有“病”才有药，勿求表面四平八稳。', pillar: '总' },
  { book: '滴天髓', line: '何知其人财，财旺生官。', note: '财官相生，事业钱财常同看。', pillar: '时' },
  { book: '子平真诠', line: '官杀混杂，以去官留杀或去杀留官为贵。', note: '官杀并见先理清关系，勿混断。', pillar: '日' },
  { book: '渊海子平', line: '印绶生身，性必仁慈。', note: '印重多主思虑与庇护，宜防过静。', pillar: '年' },
  { book: '三命通会', line: '食神者，能干办之事也。', note: '食伤见用，才艺与表达常显。', pillar: '时' },
]

export function quotesForPillar(pillar: ClassicQuote['pillar'], seed: number): ClassicQuote[] {
  const pool = BAZI_QUOTES.filter((q) => q.pillar === pillar || q.pillar === '总')
  const a = pool[seed % pool.length]
  const b = pool[(seed * 3 + 1) % pool.length]
  return a.book === b.book ? [a] : [a, b]
}

export function pickQuotes(seed: number, n = 3): ClassicQuote[] {
  const out: ClassicQuote[] = []
  for (let i = 0; i < n; i++) out.push(BAZI_QUOTES[(seed + i * 4) % BAZI_QUOTES.length])
  return out
}
