import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BirthChartForm, type BirthData } from '@/components/BirthChartForm'
import { MemberLock } from '@/components/MemberLock'
import { RELATION_DIMS, baziHepan, type RelationDim } from '@/lib/hepan'
import type { Pillar } from '@/lib/bazi'

const TINT = [
  'rgba(79, 157, 107, 0.12)',
  'rgba(208, 96, 79, 0.12)',
  'rgba(193, 145, 63, 0.14)',
  'rgba(201, 169, 79, 0.14)',
]

function MiniPillars({ label, pillars }: { label: string; pillars: [Pillar, Pillar, Pillar, Pillar] }) {
  const names = ['年', '月', '日', '时']
  return (
    <div>
      <span className="form-lbl">{label}</span>
      <div className="pillar-row" style={{ marginTop: '0.35rem' }}>
        {pillars.map((p, i) => (
          <div key={i} className="pillar-chip" style={{ background: TINT[i], padding: '0.55rem 0.35rem' }}>
            <span className="muted" style={{ fontSize: '0.7rem' }}>{names[i]}</span>
            <div className="serif" style={{ fontSize: '1.15rem' }}>{p.stem}{p.branch}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function BaziHepanTool() {
  const [step, setStep] = useState<'a' | 'b' | 'dim' | 'done'>('a')
  const [a, setA] = useState<BirthData | null>(null)
  const [b, setB] = useState<BirthData | null>(null)
  const [dim, setDim] = useState<RelationDim>('情侣')
  const [result, setResult] = useState<ReturnType<typeof baziHepan> | null>(null)

  const run = (nextB?: BirthData, nextDim?: RelationDim) => {
    const aa = a!
    const bb = nextB ?? b!
    const dd = nextDim ?? dim
    setResult(baziHepan(aa.dateStr, aa.hour, bb.dateStr, bb.hour, dd))
    setStep('done')
  }

  if (step === 'done' && result && a && b) {
    const { score } = result
    return (
      <div>
        <div className="tool-panel">
          <div className="form-head">
            <div>
              <span className="en-label">合 盘 推 演</span>
              <h2 style={{ margin: '0.35rem 0' }}>八字合盘 · {dim}</h2>
              <p className="soft" style={{ margin: 0 }}>“缘分天定，逻辑人推。以古籍之眼，观二人之径。”</p>
            </div>
            <button className="btn btn-sm" onClick={() => { setResult(null); setStep('a'); setA(null); setB(null) }}>重新合缘</button>
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
          <div className="tool-panel" style={{ margin: 0 }}>
            <MiniPillars label={`甲 · ${a.name || '主位'}`} pillars={[result.a.year, result.a.month, result.a.day, result.a.hour]} />
            <p className="muted" style={{ fontSize: '0.8rem', marginTop: '0.75rem' }}>{result.a.summary}</p>
          </div>
          <div className="tool-panel" style={{ margin: 0 }}>
            <MiniPillars label={`乙 · ${b.name || '次位'}`} pillars={[result.b.year, result.b.month, result.b.day, result.b.hour]} />
            <p className="muted" style={{ fontSize: '0.8rem', marginTop: '0.75rem' }}>{result.b.summary}</p>
          </div>
        </div>

        <p className="soft" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>{score.pillarsNote}</p>

        <div style={{ marginTop: '1.25rem' }}>
          <MemberLock title="合缘参详" reading={`${score.summary} ${score.pillarsNote}`} />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="tool-panel" style={{ marginBottom: '1rem' }}>
        <div className="seg seg-2">
          <Link className="btn btn-sm" to="/tools/bazi" style={{ textAlign: 'center', borderRadius: 0, border: 'none' }}>单人排盘</Link>
          <button type="button" className="active" style={{ border: 'none', background: 'var(--btn-bg)', color: 'var(--btn-fg)' }}>双人合盘</button>
        </div>
        <p className="soft" style={{ margin: '0.85rem 0 0', fontSize: '0.9rem' }}>
          两盘对照，参看缘分契合与互补。先填甲盘，再填乙盘，最后选参详维度。
        </p>
        <div className="method-pills" style={{ marginTop: '0.75rem' }}>
          <span className={`chip${step === 'a' ? '' : ''}`} style={step === 'a' ? { background: 'var(--btn-bg)', color: 'var(--btn-fg)' } : undefined}>1 主位甲</span>
          <span className="chip" style={step === 'b' ? { background: 'var(--btn-bg)', color: 'var(--btn-fg)' } : undefined}>2 次位乙</span>
          <span className="chip" style={step === 'dim' ? { background: 'var(--btn-bg)', color: 'var(--btn-fg)' } : undefined}>3 维度</span>
        </div>
      </div>

      {step === 'a' && (
        <BirthChartForm
          question="合盘（甲盘）"
          hideQuestion
          onSubmit={(d) => { setA(d); setStep('b') }}
        />
      )}
      {step === 'b' && (
        <BirthChartForm
          question="合盘（乙盘）"
          hideQuestion
          onSubmit={(d) => { setB(d); setStep('dim') }}
        />
      )}
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
                style={{ textAlign: 'left' }}
              >
                <strong>{r.ico} {r.id}</strong>
                <small>{r.tip}</small>
              </button>
            ))}
          </div>
          <button className="btn btn-primary btn-block" style={{ marginTop: '1.25rem' }} onClick={() => run()}>
            开启合缘
          </button>
        </div>
      )}
    </div>
  )
}
