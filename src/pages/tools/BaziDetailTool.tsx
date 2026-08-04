import { useMemo, useState } from 'react'
import { BirthChartForm, type BirthData } from '@/components/BirthChartForm'
import { MemberLock } from '@/components/MemberLock'
import { pickQuotes, quotesForPillar } from '@/data/classicQuotes'
import { baziFromBirth, ELEMENTS, type BaziChart, type Element } from '@/lib/bazi'

const EL_COLOR: Record<Element, string> = {
  木: '#4f9d6b', 火: '#d0604f', 土: '#c1913f', 金: '#c9a94f', 水: '#4f7fb0',
}

export function BaziDetailTool() {
  const [data, setData] = useState<BirthData | null>(null)
  const [chart, setChart] = useState<BaziChart | null>(null)

  const seed = useMemo(() => {
    if (!data) return 0
    return data.dateStr.split('-').reduce((a, b) => a + Number(b), 0) + data.hour * 7
  }, [data])

  const generate = (d: BirthData) => {
    setData(d)
    setChart(baziFromBirth(d.dateStr, d.hour))
  }

  if (!chart || !data) {
    return (
      <div>
        <div className="tool-panel" style={{ marginBottom: '1rem' }}>
          <span className="en-label">八字详批 · CLASSIC RAG</span>
          <p className="soft" style={{ margin: '0.5rem 0 0', lineHeight: 1.7 }}>
            RAG 锚定古籍原文，逐柱参详。每一句解读旁附典籍摘句，可溯源、不空谈（演示假数据）。
          </p>
        </div>
        <BirthChartForm onSubmit={generate} question="希望详批侧重哪方面？" />
      </div>
    )
  }

  const pillars = [
    { key: '年' as const, p: chart.year },
    { key: '月' as const, p: chart.month },
    { key: '日' as const, p: chart.day },
    { key: '时' as const, p: chart.hour },
  ]
  const overviewQuotes = pickQuotes(seed, 2)

  return (
    <div>
      <div className="tool-panel">
        <div className="form-head">
          <div>
            <span className="en-label">✧ 详批盘面</span>
            <h2 style={{ margin: '0.35rem 0' }}>{data.name || '未署名'} · 八字详批</h2>
            <p className="soft" style={{ margin: 0, fontSize: '0.88rem' }}>
              {data.gender} · {data.dateStr} {String(data.hour).padStart(2, '0')}:{String(data.minute).padStart(2, '0')} · 日主{chart.dayMaster}
            </p>
          </div>
          <button className="btn btn-sm" onClick={() => { setChart(null); setData(null) }}>调整输入</button>
        </div>
        <p className="result-box" style={{ marginTop: '0.85rem' }}>{chart.summary}</p>
      </div>

      <div className="tool-panel" style={{ marginTop: '1.25rem' }}>
        <h3 style={{ marginBottom: '0.75rem' }}>古籍锚点 · 总览</h3>
        {overviewQuotes.map((q) => (
          <blockquote key={q.book + q.line} className="classic-quote">
            <p className="serif">「{q.line}」</p>
            <footer>—《{q.book}》 · {q.note}</footer>
          </blockquote>
        ))}
      </div>

      {pillars.map(({ key, p }, idx) => {
        const qs = quotesForPillar(key, seed + idx * 5)
        return (
          <div key={key} className="tool-panel" style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <h3>{key}柱 · {p.stem}{p.branch}</h3>
              <span className="chip" style={{ color: EL_COLOR[p.stemEl] }}>{p.stemEl} · {p.branchEl}</span>
            </div>
            <p className="soft" style={{ fontSize: '0.9rem', margin: '0.5rem 0 0.85rem', lineHeight: 1.7 }}>
              {key === '日'
                ? `日主${p.stem}为观察主体，先定旺衰再及十神与格局。`
                : `${key}柱${p.stem}${p.branch}司${key === '年' ? '根基门户' : key === '月' ? '提纲气势' : '结果归趋'}，与日主${chart.dayMaster}同参。`}
            </p>
            {qs.map((q) => (
              <blockquote key={q.line} className="classic-quote">
                <p className="serif">「{q.line}」</p>
                <footer>—《{q.book}》 · {q.note}</footer>
              </blockquote>
            ))}
          </div>
        )
      })}

      <div className="tool-panel" style={{ marginTop: '1rem' }}>
        <h3 style={{ marginBottom: '0.75rem' }}>五行力量</h3>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
          {ELEMENTS.map((e) => (
            <div key={e} className="subpanel" style={{ margin: 0, textAlign: 'center' }}>
              <div className="serif" style={{ color: EL_COLOR[e], fontSize: '1.2rem' }}>{e}</div>
              <div className="muted" style={{ fontSize: '0.78rem' }}>{chart.counts[e]}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '1.25rem' }}>
        <MemberLock
          title="详批参详"
          reading={`就「${data.question || '整体格局'}」：${chart.summary} 详批已按年/月/日/时柱锚定《滴天髓》《子平真诠》等原文摘句，可对照上方溯源。（演示）`}
        />
      </div>
    </div>
  )
}
