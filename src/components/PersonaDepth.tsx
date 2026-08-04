import { useMemo, useState, type ReactNode } from 'react'

export type Persona = 'scholar' | 'hermit'
export type Depth = 'pro' | 'plain'

const PERSONA: { id: Persona; zh: string; en: string; tip: string }[] = [
  { id: 'scholar', zh: '严谨学者', en: 'SCHOLAR', tip: '客观、专业、克制，引经据典、逻辑严密' },
  { id: 'hermit', zh: '幽默隐士', en: 'HERMIT', tip: '随性、风趣、一针见血，生动比喻' },
]

const DEPTH: { id: Depth; zh: string; tip: string }[] = [
  { id: 'pro', zh: '专业级完整推演', tip: '按盘面证据逐层展开' },
  { id: 'plain', zh: '通俗级直给结论', tip: '先给可执行判断，少绕' },
]

/** 把同一条解读改写成两种人格 × 两种深度（演示） */
export function styleReading(base: string, persona: Persona, depth: Depth): string {
  if (persona === 'scholar' && depth === 'pro') {
    return `【学者·详述】据盘面结构而言：${base} 论证顺序为——先定主体，次看气势，再及人事指向。`
  }
  if (persona === 'scholar' && depth === 'plain') {
    return `【学者·直断】结论先行：${base.replace(/（演示假数据）/g, '').trim()} 依据充分处从之，不足处存疑。`
  }
  if (persona === 'hermit' && depth === 'pro') {
    return `【隐士·细说】把这盘当成一出戏：${base} 主角站哪个台口、对手从哪边出场，慢慢对齐就好。`
  }
  return `【隐士·痛快】一句人话：${base.replace(/（演示假数据）。?/g, '').trim()} 别过度脑补，先走眼下能走的那一步。`
}

/** 解读区：人格 × 深度切换（源自青囊「四维交互」） */
export function PersonaDepth({
  reading,
  title = '全能解读',
  extra,
}: {
  reading: string
  title?: string
  extra?: ReactNode
}) {
  const [persona, setPersona] = useState<Persona>('scholar')
  const [depth, setDepth] = useState<Depth>('pro')
  const text = useMemo(() => styleReading(reading, persona, depth), [reading, persona, depth])

  return (
    <div className="tool-panel persona-panel">
      <div className="form-head" style={{ marginBottom: '0.85rem' }}>
        <div>
          <span className="en-label">PERSONA × DEPTH</span>
          <h3 style={{ margin: '0.25rem 0 0' }}>{title}</h3>
        </div>
      </div>

      <p className="muted" style={{ fontSize: '0.82rem', margin: '0 0 0.75rem' }}>
        同一张盘，两种讲法 × 两种深度——点选后即时改写文风。
      </p>

      <div className="persona-grid">
        {PERSONA.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`persona-card${persona === p.id ? ' active' : ''}`}
            onClick={() => setPersona(p.id)}
          >
            <span className="en-label">{p.en}</span>
            <strong>{p.zh}</strong>
            <small>{p.tip}</small>
          </button>
        ))}
      </div>

      <div className="seg seg-2" style={{ marginTop: '0.85rem' }}>
        {DEPTH.map((d) => (
          <button key={d.id} type="button" className={depth === d.id ? 'active' : ''} onClick={() => setDepth(d.id)}>
            {d.zh}
            <small>{d.tip}</small>
          </button>
        ))}
      </div>

      <div className="result-box" style={{ marginTop: '1rem', borderStyle: 'solid' }}>
        <p style={{ margin: 0, lineHeight: 1.85 }}>{text}</p>
        <p className="muted" style={{ fontSize: '0.78rem', marginTop: '0.75rem', marginBottom: 0 }}>
          文风切换为本地演示；解读结合当前盘面生成（假数据）。
        </p>
      </div>
      {extra}
    </div>
  )
}
