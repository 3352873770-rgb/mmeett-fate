import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BirthChartForm, type BirthData } from '@/components/BirthChartForm'
import { MemberLock } from '@/components/MemberLock'
import { ziweiFromBirth, type ZiweiChart } from '@/lib/ziwei'

const POS: [number, number][] = [
  [1, 1], [1, 2], [1, 3], [1, 4], [2, 4], [3, 4],
  [4, 4], [4, 3], [4, 2], [4, 1], [3, 1], [2, 1],
]

export function ZiweiTool() {
  const [chart, setChart] = useState<ZiweiChart | null>(null)
  const [data, setData] = useState<BirthData | null>(null)
  const [boardTab, setBoardTab] = useState('本命')

  const generate = (d: BirthData) => {
    setData(d)
    setChart(ziweiFromBirth(d.dateStr, d.hour))
  }

  return (
    <div>
      {!chart ? (
        <>
          <div className="tool-panel" style={{ marginBottom: '1rem' }}>
            <div className="seg seg-2">
              <button type="button" className="active" style={{ border: 'none' }}>单人命盘</button>
              <Link to="/tools/ziwei-hepan" className="seg-link">双人合盘</Link>
            </div>
          </div>
          <BirthChartForm onSubmit={generate} />
        </>
      ) : (
        <>
          <div className="tool-panel">
            <div className="form-head" style={{ marginBottom: '0.75rem' }}>
              <div>
                <span className="en-label">✧ 专业基础结果</span>
                <h2 style={{ margin: '0.35rem 0 0.35rem' }}>{data?.name || '未署名'}的紫微命盘</h2>
                <p className="soft" style={{ fontSize: '0.88rem', margin: 0 }}>
                  {data?.gender} · {data?.dateStr} {String(data?.hour).padStart(2, '0')}:{String(data?.minute ?? 0).padStart(2, '0')}
                </p>
              </div>
              <button className="btn btn-sm" onClick={() => { setChart(null); setData(null) }}>调整输入</button>
            </div>
            <p className="result-box" style={{ marginTop: '0.75rem' }}>{chart.summary}</p>
          </div>

          <div className="tool-panel" style={{ marginTop: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="en-label">ZI WEI BOARD</span>
              <span className="badge badge-ghost">{boardTab}</span>
            </div>
            <h3 style={{ margin: '0.35rem 0 0.75rem' }}>紫微十二宫盘</h3>
            <div className="seg-inline" style={{ marginBottom: '1rem', flexWrap: 'wrap' }}>
              {['本命', '大限', '小限', '流年', '流月', '流日', '流时'].map((t) => (
                <button key={t} className={boardTab === t ? 'active' : ''} onClick={() => setBoardTab(t)}>{t}</button>
              ))}
            </div>

            <div className="ziwei-board">
              {chart.palaces.map((p, i) => (
                <div
                  key={i}
                  className="card ziwei-cell"
                  style={{
                    gridRow: POS[i][0],
                    gridColumn: POS[i][1],
                    ...(i === 0 ? { borderColor: 'var(--accent)' } : {}),
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '0.82rem', color: i === 0 ? 'var(--accent)' : undefined }}>{p.name}</strong>
                    <span className="muted serif" style={{ fontSize: '0.78rem' }}>{p.branch}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem', marginTop: '0.3rem' }}>
                    {p.stars.map((s) => (
                      <span key={s} style={{ fontSize: '0.68rem', color: 'var(--accent)' }}>{s}</span>
                    ))}
                    {p.stars.length === 0 && <span className="muted" style={{ fontSize: '0.68rem' }}>—</span>}
                  </div>
                  {p.sihua.map((h) => (
                    <span key={h} className="badge" style={{ fontSize: '0.6rem', marginTop: '0.2rem', marginRight: '0.2rem' }}>{h}</span>
                  ))}
                </div>
              ))}
              <div className="card ziwei-center">
                <div className="serif" style={{ fontSize: '1.3rem' }}>紫微斗数</div>
                <p className="muted" style={{ fontSize: '0.75rem', margin: '0.35rem 0 0' }}>十二宫 · 四化 · 运限</p>
                <p className="soft" style={{ fontSize: '0.78rem', marginTop: '0.5rem' }}>命宫在{chart.palaces[0].branch}</p>
                <p className="muted" style={{ fontSize: '0.72rem', marginTop: '0.25rem' }}>{boardTab}盘</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <MemberLock
              title="紫微全能解读"
              reading={`${chart.summary} 就「${data?.question || '所问之事'}」：以命宫与三方四正为主线，${boardTab}信号作辅助。（演示假数据）`}
            />
          </div>
        </>
      )}
    </div>
  )
}
