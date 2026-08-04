import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BirthChartForm, type BirthData } from '@/components/BirthChartForm'
import { MemberLock } from '@/components/MemberLock'
import { RELATION_DIMS, ziweiHepan, type RelationDim } from '@/lib/hepan'

export function ZiweiHepanTool() {
  const [step, setStep] = useState<'a' | 'b' | 'dim' | 'done'>('a')
  const [a, setA] = useState<BirthData | null>(null)
  const [b, setB] = useState<BirthData | null>(null)
  const [dim, setDim] = useState<RelationDim>('情侣')
  const [result, setResult] = useState<ReturnType<typeof ziweiHepan> | null>(null)

  if (step === 'done' && result && a && b) {
    const { score } = result
    return (
      <div>
        <div className="tool-panel">
          <div className="form-head">
            <div>
              <span className="en-label">紫微合参</span>
              <h2 style={{ margin: '0.35rem 0' }}>紫微合盘 · {dim}</h2>
              <p className="soft" style={{ margin: 0 }}>宫位对映。以十二宫之镜，观二人之缘。</p>
            </div>
            <button className="btn btn-sm" onClick={() => { setResult(null); setStep('a'); setA(null); setB(null) }}>重新合盘</button>
          </div>
          <div className="hepan-scores">
            <div><b>{score.overall}</b><span>总契合</span></div>
            <div><b>{score.attract}</b><span>吸引</span></div>
            <div><b>{score.complement}</b><span>互补</span></div>
            <div><b>{score.friction}</b><span>摩擦</span></div>
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.85rem' }}>
            {score.tags.map((t) => <span key={t} className="chip">{t}</span>)}
          </div>
        </div>

        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.25rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '1rem' }}>甲 · {a.name || '主位'}</h3>
            <p className="soft" style={{ fontSize: '0.88rem' }}>命宫 {result.a.palaces[0].branch} · {result.a.palaces[0].stars.join('、') || '空宫'}</p>
            <p className="muted" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>{result.a.summary}</p>
          </div>
          <div className="card">
            <h3 style={{ fontSize: '1rem' }}>乙 · {b.name || '次位'}</h3>
            <p className="soft" style={{ fontSize: '0.88rem' }}>命宫 {result.b.palaces[0].branch} · {result.b.palaces[0].stars.join('、') || '空宫'}</p>
            <p className="muted" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>{result.b.summary}</p>
          </div>
        </div>

        <div style={{ marginTop: '1.25rem' }}>
          <MemberLock title="紫微合缘参详" reading={`${score.summary} ${score.pillarsNote}`} />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="tool-panel" style={{ marginBottom: '1rem' }}>
        <div className="seg seg-2">
          <Link className="btn btn-sm" to="/tools/ziwei" style={{ textAlign: 'center', borderRadius: 0, border: 'none' }}>单人命盘</Link>
          <button type="button" style={{ border: 'none', background: 'var(--btn-bg)', color: 'var(--btn-fg)' }}>双人合盘</button>
        </div>
        <p className="soft" style={{ margin: '0.85rem 0 0', fontSize: '0.9rem' }}>
          双人命盘十二宫对映，按关系维度参看缘分。
        </p>
        <div className="method-pills" style={{ marginTop: '0.75rem' }}>
          <span className="chip" style={step === 'a' ? { background: 'var(--btn-bg)', color: 'var(--btn-fg)' } : undefined}>1 主位甲</span>
          <span className="chip" style={step === 'b' ? { background: 'var(--btn-bg)', color: 'var(--btn-fg)' } : undefined}>2 次位乙</span>
          <span className="chip" style={step === 'dim' ? { background: 'var(--btn-bg)', color: 'var(--btn-fg)' } : undefined}>3 维度</span>
        </div>
      </div>

      {step === 'a' && <BirthChartForm hideQuestion onSubmit={(d) => { setA(d); setStep('b') }} />}
      {step === 'b' && <BirthChartForm hideQuestion onSubmit={(d) => { setB(d); setStep('dim') }} />}
      {step === 'dim' && (
        <div className="tool-panel">
          <span className="en-label">RELATIONSHIP DIMENSION</span>
          <h3 style={{ margin: '0.35rem 0 0.85rem' }}>参详维度</h3>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.6rem' }}>
            {RELATION_DIMS.map((r) => (
              <button
                key={r.id}
                type="button"
                className={`persona-card${dim === r.id ? ' active' : ''}`}
                onClick={() => setDim(r.id)}
              >
                <strong>{r.ico} {r.id}</strong>
                <small>{r.tip}</small>
              </button>
            ))}
          </div>
          <button
            className="btn btn-primary btn-block"
            style={{ marginTop: '1.25rem' }}
            onClick={() => {
              setResult(ziweiHepan(a!.dateStr, a!.hour, b!.dateStr, b!.hour, dim))
              setStep('done')
            }}
          >
            开始合盘
          </button>
        </div>
      )}
    </div>
  )
}
