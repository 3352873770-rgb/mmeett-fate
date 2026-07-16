import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { KnowledgeDiagram } from '@/components/KnowledgeDiagram'
import { DIAGRAM_CATS, diagrams, type DiagramCat } from '@/data/knowledge'

type Filter = DiagramCat | '全部'

export function KnowledgePage() {
  const [cat, setCat] = useState<Filter>('全部')

  const list = useMemo(
    () => (cat === '全部' ? diagrams : diagrams.filter((d) => d.cat === cat)),
    [cat],
  )

  return (
    <div className="page knowledge-page">
      <header className="knowledge-hero">
        <div className="method-pills" style={{ marginBottom: '0.75rem' }}>
          <span className="chip">知识图解</span>
        </div>
        <div className="knowledge-hero-row">
          <div>
            <h1 style={{ fontSize: 'clamp(1.85rem, 4.5vw, 2.65rem)', margin: 0 }}>把术语关系画清楚</h1>
            <p className="soft" style={{ marginTop: '0.75rem', maxWidth: '38rem', lineHeight: 1.8 }}>
              每一张图只解决一个概念：元素怎么流动、盘面先看哪里、卦象如何从问题走向行动。先看懂结构，再进入工具会更稳。
            </p>
          </div>
          <div className="knowledge-stat">
            <span className="muted" style={{ fontSize: '0.78rem' }}>已整理图解</span>
            <strong className="serif">{diagrams.length} <small>张</small></strong>
          </div>
        </div>

        <div className="method-pills" style={{ marginTop: '1.25rem' }}>
          <button
            type="button"
            className="chip"
            onClick={() => setCat('全部')}
            style={cat === '全部' ? { background: 'var(--btn-bg)', color: 'var(--btn-fg)', borderColor: 'var(--btn-bg)' } : undefined}
          >
            全部
          </button>
          {DIAGRAM_CATS.map((c) => (
            <button
              key={c}
              type="button"
              className="chip"
              onClick={() => setCat(c)}
              style={cat === c ? { background: 'var(--btn-bg)', color: 'var(--btn-fg)', borderColor: 'var(--btn-bg)' } : undefined}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="knowledge-shortcuts">
          <Link className="btn btn-sm" to="/tools/daily-hexagram">每日一卦</Link>
          <Link className="btn btn-sm" to="/classics">古籍书楼</Link>
        </div>
      </header>

      <div className="knowledge-list">
        {list.map((d) => (
          <article key={d.id} id={d.id} className="knowledge-block">
            <div className="knowledge-block-head">
              <span className="chip">{d.cat}</span>
              <span className="en-label">{d.en}</span>
            </div>
            <h2>{d.zh}</h2>
            <p className="soft knowledge-block-desc">{d.desc}</p>

            <div className="knowledge-visual">
              <KnowledgeDiagram d={d} />
            </div>

            {d.kind === 'cycle' && (
              <div className="knowledge-nodes">
                {d.nodes.map((n) => (
                  <div key={n.name} className="knowledge-node-card">
                    <strong className="serif">{n.name}</strong>
                    <span>{n.hint}</span>
                  </div>
                ))}
              </div>
            )}

            {d.edges.length > 0 && (
              <div className="knowledge-edges">
                {d.edges.map((e) => (
                  <span key={`${e.from}-${e.to}-${e.label}`} className="knowledge-edge">
                    <b>{e.from}</b>
                    <i aria-hidden>→</i>
                    <b>{e.to}</b>
                    <em>{e.label}</em>
                  </span>
                ))}
              </div>
            )}

            <p className="knowledge-tip">{d.tip}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
