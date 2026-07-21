import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { seedFrom, todayKey } from '@/data/games'

const KEYWORDS = ['开局', '沉静', '果断', '柔和', '专注', '开阔', '收敛', '回暖', '守成', '破局']
const COLORS = [
  { name: '月白金', hex: '#e8e4d4' },
  { name: '黛蓝', hex: '#2f4f6f' },
  { name: '朱砂红', hex: '#b54a3c' },
  { name: '松绿', hex: '#4d6b4f' },
  { name: '缃黄', hex: '#d4b46a' },
  { name: '藕荷', hex: '#c9a0b0' },
]
const DIRS = ['正东', '东南', '正南', '西南', '正西', '西北', '正北', '东北']
const YI = ['开市', '交易', '立券', '出行', '会友', '学习', '纳财', '修造']
const JI = ['入宅', '移徙', '作灶', '争执', '熬夜', '轻诺', '久等', '冲动消费']
const STEMS = ['甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉', '甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚寅', '辛卯']
const WUXING = ['木气', '火气', '土气', '金气', '水气']

function lunarLabel(s: number) {
  const month = (s % 12) + 1
  const day = (s % 29) + 1
  const mansions = ['角', '亢', '氐', '房', '心', '尾', '箕', '斗', '女', '虚', '危', '室', '壁', '奎', '娄', '胃', '昴', '毕', '觜', '参', '井', '鬼', '柳', '星', '张', '翼', '轸']
  return `农历${['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'][month - 1]}月${day < 11 ? '初' : day < 20 ? '十' : '廿'}${['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'][(day - 1) % 10]} · ${mansions[s % mansions.length]}宿吉`
}

export function DailyCardGame() {
  const [name, setName] = useState('')
  const [gender, setGender] = useState<'女' | '男'>('女')
  const [toast, setToast] = useState('')

  const card = useMemo(() => {
    const today = new Date()
    const key = `${todayKey('card')}|${name.trim() || '匿名'}|${gender}`
    const s = seedFrom(key)
    const keyword = KEYWORDS[s % KEYWORDS.length]
    const stem = STEMS[s % STEMS.length]
    const wx = WUXING[(s >> 3) % WUXING.length]
    const color = COLORS[(s >> 2) % COLORS.length]
    const yi = [YI[s % YI.length], YI[(s >> 2) % YI.length], YI[(s >> 4) % YI.length]]
    const ji = [JI[s % JI.length], JI[(s >> 3) % JI.length], JI[(s >> 5) % JI.length]]
    const scores = {
      行动: 55 + (s % 40),
      关系: 50 + ((s >> 2) % 45),
      财务: 52 + ((s >> 4) % 43),
      身心: 48 + ((s >> 6) % 47),
    }
    return {
      dateLabel: `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`,
      keyword,
      dayLine: `${stem}日 · ${wx}`,
      blurb: `今日关键词是「${keyword}」。你今天适合先抓一件能落地的小事，顺着${stem}日的气势稳稳推进；先定规则，再行动。`,
      lunar: lunarLabel(s),
      gui: DIRS[(s >> 5) % DIRS.length],
      cai: DIRS[(s >> 7) % DIRS.length],
      color,
      yi: [...new Set(yi)],
      ji: [...new Set(ji)],
      scores,
      tip: `今天的关键词是「${keyword}」：你先看宜忌，再定今天最该推进的一件事。`,
    }
  }, [name, gender])

  const saveHint = () => {
    setToast('演示环境请直接截图保存竖卡分享')
    window.setTimeout(() => setToast(''), 2200)
  }

  return (
    <div className="game-detail">
      <section className="game-hero">
        <div className="game-hero-bg" style={{ backgroundImage: 'url(/games/cloud-paper-mist.jpg)' }} aria-hidden />
        <div className="game-hero-body">
          <span className="badge">每日命理卡</span>
          <h1>把今天做成一张能分享的命理卡</h1>
          <p>每天按北京时间生成一张竖屏卡片，包含今日关键词、宜忌、幸运色、贵人方位和财位。适合保存发朋友圈、抖音封面或发给朋友。</p>
        </div>
      </section>

      <div className="game-split">
        <div className="card game-form">
          <h2>生成今日卡片</h2>
          <p className="soft">名字可留空。卡片每天会随北京时间更新，同一个名字当天生成结果保持一致。</p>

          <label className="field">
            <span>名字</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="可留空" />
          </label>

          <div className="field" style={{ marginTop: '0.85rem' }}>
            <span>性别</span>
            <div className="seg">
              {(['女', '男'] as const).map((g) => (
                <button key={g} type="button" className={gender === g ? 'active' : ''} onClick={() => setGender(g)}>
                  {g}
                </button>
              ))}
            </div>
            <p className="muted" style={{ fontSize: '0.78rem', marginTop: '0.45rem' }}>
              已选：{gender}，切换后会自动刷新今日卡。
            </p>
          </div>

          <div className="game-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setToast('今日卡已按名字与日期刷新')
                window.setTimeout(() => setToast(''), 1600)
              }}
            >
              生成今日卡
            </button>
            <button type="button" className="btn" onClick={saveHint}>保存竖图</button>
            <Link className="btn btn-ghost" to="/tools/bazi">去全能解读 →</Link>
          </div>
          {toast && <p className="game-toast">{toast}</p>}
        </div>

        <div className="game-preview-wrap">
          <article className="daily-share-card">
            <header>
              <span>东方命理 · 云海日签</span>
              <time>{card.dateLabel}</time>
            </header>
            <p className="daily-share-kicker">你的每日命理卡</p>
            <h3>{card.keyword}</h3>
            <p className="daily-share-day">{card.dayLine}</p>
            <p className="daily-share-blurb">{card.blurb}</p>

            <dl className="daily-share-meta">
              <div><dt>农历</dt><dd>{card.lunar}</dd></div>
              <div><dt>贵人方位</dt><dd>{card.gui}</dd></div>
              <div><dt>财位</dt><dd>{card.cai}</dd></div>
            </dl>

            <div className="daily-share-color">
              <span>今日幸运色</span>
              <strong>{card.color.name}</strong>
              <i style={{ background: card.color.hex }} aria-hidden />
            </div>

            <div className="daily-share-yj">
              <div>
                <h4>宜</h4>
                <ul>{card.yi.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
              <div>
                <h4>忌</h4>
                <ul>{card.ji.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            </div>

            <div className="daily-share-scores">
              {Object.entries(card.scores).map(([k, v]) => (
                <div key={k} className="daily-score-row">
                  <span>{k}</span>
                  <div className="daily-score-bar"><i style={{ width: `${v}%` }} /></div>
                  <b>{v}</b>
                </div>
              ))}
            </div>

            <p className="daily-share-tip">先做：{card.yi.slice(0, 2).join('、')}。</p>
            <footer>
              <span>MMEETT Fate</span>
              <small>传统文化体验参考</small>
            </footer>
          </article>
          <p className="soft game-preview-cap">{card.tip}</p>
        </div>
      </div>
    </div>
  )
}
