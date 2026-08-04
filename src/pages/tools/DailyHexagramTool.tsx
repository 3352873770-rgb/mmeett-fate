import { useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { MemberLock } from '@/components/MemberLock'
import { dailyHexagram, type DailyHexResult, type Line } from '@/lib/liuyao'
import { useFavorites } from '@/lib/favorites'

const WEEK = ['日', '一', '二', '三', '四', '五', '六']

function formatCnDate(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00')
  return {
    label: `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`,
    week: `星期${WEEK[d.getDay()]}`,
    full: `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 星期${WEEK[d.getDay()]}`,
  }
}

function ScoreRing({ label, value, tone }: { label: string; value: number; tone: string }) {
  const r = 34
  const c = 2 * Math.PI * r
  const offset = c * (1 - Math.min(100, Math.max(0, value)) / 100)
  return (
    <div className="daily-score">
      <svg viewBox="0 0 88 88" width="88" height="88" aria-hidden>
        <circle cx="44" cy="44" r={r} fill="none" stroke="var(--border)" strokeWidth="7" />
        <circle
          cx="44" cy="44" r={r} fill="none"
          stroke="var(--accent)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform="rotate(-90 44 44)"
        />
        <text x="44" y="42" textAnchor="middle" className="daily-score-num">{value}</text>
        <text x="44" y="58" textAnchor="middle" className="daily-score-lab">{label}</text>
      </svg>
      <span className="daily-score-tone">{tone}</span>
    </div>
  )
}

function HexBoard({ lines }: { lines: Line[] }) {
  // 展示自上爻（6）到初爻（1）
  const rows = [...lines].map((l, i) => ({ line: l, n: i + 1 })).reverse()
  return (
    <div className="daily-hexboard">
      <div className="daily-hexboard-cap">六爻 · 初爻到上爻</div>
      <div className="daily-hexboard-rows">
        {rows.map(({ line, n }) => (
          <div key={n} className={`daily-hex-row${line.changing ? ' moving' : ''}`}>
            <span className="daily-hex-n">{n}爻</span>
            <div className="daily-hex-bar" aria-hidden>
              {line.yang ? (
                <span className="daily-hex-yang" />
              ) : (
                <>
                  <span className="daily-hex-yin" />
                  <span className="daily-hex-yin" />
                </>
              )}
            </div>
            <span className="daily-hex-meta">
              {line.value} · {line.changing ? '动' : '静'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

type DetailKey = 'date' | 'seed' | 'ben' | 'dong' | 'bian' | 'tiyong' | 'tip'

export function DailyHexagramTool() {
  const { has, toggle } = useFavorites()
  const [name, setName] = useState('')
  const [gender, setGender] = useState<'男' | '女'>('男')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [result, setResult] = useState<DailyHexResult | null>(null)
  const [meta, setMeta] = useState<{ name: string; gender: string; date: string } | null>(null)
  const [open, setOpen] = useState<Record<DetailKey, boolean>>({
    date: true, seed: true, ben: true, dong: true, bian: true, tiyong: true, tip: true,
  })
  const [allOpen, setAllOpen] = useState(true)

  const generate = () => {
    const next = dailyHexagram(new Date(date + 'T12:00:00'))
    setResult(next)
    setMeta({ name, gender, date })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const reset = () => {
    setName('')
    setGender('男')
    setDate(new Date().toISOString().slice(0, 10))
    setResult(null)
    setMeta(null)
  }

  const setAll = (v: boolean) => {
    setAllOpen(v)
    setOpen({ date: v, seed: v, ben: v, dong: v, bian: v, tiyong: v, tip: v })
  }

  if (result && meta) {
    return (
      <DailyResult
        result={result}
        meta={meta}
        favorited={has('daily-hexagram')}
        onFav={() => toggle('daily-hexagram')}
        onAdjust={() => { setResult(null); setMeta(null) }}
        onRegen={generate}
        open={open}
        setOpen={setOpen}
        allOpen={allOpen}
        setAll={setAll}
      />
    )
  }

  const cn = formatCnDate(date)

  return (
    <div className="page tool-detail daily-page">
      <div className="tool-detail-head">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ maxWidth: '42rem' }}>
            <div className="method-pills" style={{ marginBottom: '0.75rem' }}>
              <span className="chip">日用</span>
              <span className="chip">基础结果免费</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.6rem)', margin: 0 }}>每日一卦</h1>
            <p className="soft" style={{ marginTop: '0.65rem', lineHeight: 1.75 }}>
              按日期、姓名和性别生成本卦、动爻与变卦，适合早上快速定节奏。
            </p>
          </div>
          <button
            type="button"
            className="icon-btn"
            style={{ borderRadius: '50%', width: 40, minWidth: 40 }}
            onClick={() => toggle('daily-hexagram')}
            aria-pressed={has('daily-hexagram')}
          >
            {has('daily-hexagram') ? '♥' : '♡'}
          </button>
        </div>
      </div>

      <div className="tool-panel" style={{ marginTop: '1.25rem' }}>
        <div className="form-head">
          <h3>推演信息</h3>
          <span className="muted" style={{ fontSize: '0.82rem' }}>只保留此法必需的信息，先定盘，再推演。</span>
        </div>

        <div className="form-sec">
          <span className="form-lbl">姓名</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="可留空" />
        </div>
        <div className="form-sec">
          <span className="form-lbl">性别</span>
          <div className="seg seg-2">
            {(['男', '女'] as const).map((g) => (
              <button key={g} type="button" className={gender === g ? 'active' : ''} onClick={() => setGender(g)}>
                {g}
              </button>
            ))}
          </div>
        </div>
        <div className="form-sec">
          <span className="form-lbl">日期</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <p className="muted" style={{ fontSize: '0.78rem', margin: '0.45rem 0 0' }}>{cn.full}</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button type="button" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={generate}>
            查看今日卦
          </button>
          <button type="button" className="btn" onClick={reset}>重置</button>
        </div>
      </div>
    </div>
  )
}

function DailyResult({
  result, meta, favorited, onFav, onAdjust, onRegen,
  open, setOpen, allOpen, setAll,
}: {
  result: DailyHexResult
  meta: { name: string; gender: string; date: string }
  favorited: boolean
  onFav: () => void
  onAdjust: () => void
  onRegen: () => void
  open: Record<DetailKey, boolean>
  setOpen: Dispatch<SetStateAction<Record<DetailKey, boolean>>>
  allOpen: boolean
  setAll: (v: boolean) => void
}) {
  const cn = formatCnDate(meta.date)
  const title = `${cn.full} 每日一卦`
  const tog = (k: DetailKey) => setOpen((prev) => ({ ...prev, [k]: !prev[k] }))

  const details: { key: DetailKey; label: string; body: ReactNode }[] = [
    { key: 'date', label: '日期', body: <p>{cn.full}{meta.name ? ` · ${meta.name}` : ''} · {meta.gender}</p> },
    {
      key: 'seed',
      label: '起卦数',
      body: (
        <p>
          上 {result.upperSeed} · 下 {result.lowerSeed} · 动 {result.changeSeed}
        </p>
      ),
    },
    {
      key: 'ben',
      label: '本卦',
      body: (
        <p>
          {result.ben.name}
          <span className="muted">（{result.ben.upper.name}上{result.ben.lower.name}下）</span>
        </p>
      ),
    },
    { key: 'dong', label: '动爻', body: <p>{result.movingLabel}</p> },
    {
      key: 'bian',
      label: '变卦',
      body: result.bian ? (
        <p>
          {result.bian.name}
          <span className="muted">（{result.bian.upper.name}上{result.bian.lower.name}下）</span>
        </p>
      ) : (
        <p className="muted">六爻安静，无变卦</p>
      ),
    },
    { key: 'tiyong', label: '体用', body: <p className="soft" style={{ lineHeight: 1.7 }}>{result.tiyong}</p> },
    {
      key: 'tip',
      label: '今日提醒',
      body: <p><strong style={{ color: 'var(--accent)', fontSize: '1.05rem' }}>{result.keyword}</strong></p>,
    },
  ]

  return (
    <div className="page daily-result">
      <div className="daily-result-top">
        <div className="seg-inline">
          <Link to="/tools/huangli" className="seg-link-lite">日历</Link>
          <button type="button" className="active">每日一卦</button>
        </div>
        <div className="daily-result-actions">
          <button type="button" className="btn btn-sm" onClick={() => window.print()}>保存长图</button>
          <button type="button" className="btn btn-sm" onClick={onAdjust}>调整输入</button>
          <button type="button" className="btn btn-sm btn-primary" onClick={onRegen}>重新生成</button>
          <button type="button" className="icon-btn" style={{ borderRadius: '50%', width: 36, minWidth: 36 }} onClick={onFav} aria-pressed={favorited}>
            {favorited ? '♥' : '♡'}
          </button>
        </div>
      </div>

      <span className="en-label">✧ 专业精推结果</span>
      <h1 style={{ fontSize: 'clamp(1.45rem, 3.2vw, 2rem)', margin: '0.4rem 0 0.55rem' }}>{title}</h1>
      <p className="soft" style={{ margin: 0, maxWidth: '44rem', lineHeight: 1.75 }}>{result.summary}</p>
      <div className="method-pills" style={{ marginTop: '0.85rem' }}>
        {['每日一卦', '本卦', '动爻', '变卦'].map((t) => (
          <span key={t} className="chip">{t}</span>
        ))}
      </div>

      <div className="tool-panel" style={{ marginTop: '1.35rem' }}>
        <HexBoard lines={result.lines} />
      </div>

      <section className="tool-panel" style={{ marginTop: '1.15rem' }}>
        <div className="form-head">
          <h3 style={{ margin: 0 }}>排盘依据与细节</h3>
          <button type="button" className="btn btn-sm" onClick={() => setAll(!allOpen)}>
            {allOpen ? '收起全部' : '展开全部'}
          </button>
        </div>
        <div className="daily-detail-grid">
          {details.map((d) => (
            <div key={d.key} className="daily-detail-card">
              <div className="daily-detail-head">
                <span className="daily-detail-tag">{d.label}</span>
                <button type="button" className="linkish" onClick={() => tog(d.key)}>
                  {open[d.key] ? '收起' : '展开'}
                </button>
              </div>
              {open[d.key] && <div className="daily-detail-body">{d.body}</div>}
            </div>
          ))}
        </div>
      </section>

      <section className="tool-panel" style={{ marginTop: '1.15rem' }}>
        <div className="form-head">
          <div>
            <span className="en-label">Item Scores</span>
            <h3 style={{ margin: '0.25rem 0 0' }}>分项取象</h3>
          </div>
          <span className="chip">结构强弱</span>
        </div>
        <div className="daily-scores">
          {result.scores.map((s) => (
            <ScoreRing key={s.label} {...s} />
          ))}
        </div>
      </section>

      <div style={{ marginTop: '1.15rem' }}>
        <MemberLock
          title="每日一卦全能解读"
          reading={`${result.summary}${result.tiyong} 可继续查看逐时宜忌与本周节律推演。（演示假数据）`}
        />
      </div>
    </div>
  )
}
