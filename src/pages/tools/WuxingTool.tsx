import { useState } from 'react'
import { BirthChartForm, type BirthData } from '@/components/BirthChartForm'
import { KnowledgeDiagram } from '@/components/KnowledgeDiagram'
import { MemberLock } from '@/components/MemberLock'
import { diagrams } from '@/data/knowledge'
import { baziFromBirth, ELEMENTS, type BaziChart, type Element } from '@/lib/bazi'

const EL_COLOR: Record<Element, string> = {
  木: '#4f9d6b', 火: '#d0604f', 土: '#c1913f', 金: '#c9a94f', 水: '#4f7fb0',
}

export function WuxingTool() {
  const [chart, setChart] = useState<BaziChart | null>(null)
  const [data, setData] = useState<BirthData | null>(null)

  const generate = (d: BirthData) => {
    setData(d)
    setChart(baziFromBirth(d.dateStr, d.hour))
  }

  const max = chart ? Math.max(...ELEMENTS.map((e) => chart.counts[e])) : 1
  const lacking = chart ? ELEMENTS.filter((e) => chart.counts[e] === 0) : []
  const total = chart ? ELEMENTS.reduce((a, e) => a + chart.counts[e], 0) || 1 : 1
  const diagram = diagrams.find((d) => d.id === 'wuxing-cycle')!

  return (
    <div>
      {!chart ? (
        <BirthChartForm onSubmit={generate} question="我的五行结构偏处是什么?" />
      ) : (
        <>
          <div className="tool-panel">
            <div className="form-head">
              <div>
                <span className="en-label">✧ 专业基础结果</span>
                <h2 style={{ margin: '0.35rem 0' }}>{data?.name || '未署名'}的五行分析</h2>
              </div>
              <button className="btn btn-sm" onClick={() => { setChart(null); setData(null) }}>调整输入</button>
            </div>
            <div className="home-split" style={{ gridTemplateColumns: '200px 1fr', alignItems: 'center', marginTop: '1rem' }}>
              <div style={{ display: 'grid', placeItems: 'center' }}>
                <KnowledgeDiagram d={diagram} />
              </div>
              <div>
                {ELEMENTS.map((e) => (
                  <div key={e} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ width: '1.5rem', color: EL_COLOR[e] }} className="serif">{e}</span>
                    <div style={{ flex: 1, height: 10, background: 'var(--border)', borderRadius: 999 }}>
                      <div style={{ width: `${(chart.counts[e] / max) * 100}%`, height: '100%', background: EL_COLOR[e], borderRadius: 999 }} />
                    </div>
                    <span className="muted" style={{ width: '2.6rem', textAlign: 'right', fontSize: '0.8rem' }}>
                      {Math.round((chart.counts[e] / total) * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="result-box" style={{ marginTop: '1rem' }}>
              日主{chart.dayMaster}（{chart.dayMasterEl}）。
              {lacking.length ? `八字中缺${lacking.join('、')}，宜看流通与调候，不宜直接“缺什么补什么”。` : '五行俱全，先看旺衰与流通。'}
            </div>
          </div>
          <div style={{ marginTop: '1.25rem' }}>
            <MemberLock
              title="五行全能解读"
              reading={`${chart.summary} 就「${data?.question || '五行结构'}」给出喜用方向的演示解释。`}
            />
          </div>
        </>
      )}
    </div>
  )
}
