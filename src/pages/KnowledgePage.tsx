import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { KnowledgeDiagram } from '@/components/KnowledgeDiagram'
import {
  CAT_LABEL,
  DIAGRAM_CATS,
  diagrams,
  edgeLabel,
  findNode,
  nodeHint,
  nodeLabel,
  type DiagramCatId,
} from '@/data/knowledge'
import { useLang } from '@/lib/i18n'

type Filter = DiagramCatId | 'all'

export function KnowledgePage() {
  const { t, lang } = useLang()
  const [cat, setCat] = useState<Filter>('all')

  const list = useMemo(
    () => (cat === 'all' ? diagrams : diagrams.filter((d) => d.cat === cat)),
    [cat],
  )

  return (
    <div className="page knowledge-page">
      <header className="knowledge-hero">
        <div className="method-pills" style={{ marginBottom: '0.75rem' }}>
          <span className="chip">{t('知识图解', 'Diagrams')}</span>
        </div>
        <div className="knowledge-hero-row">
          <div>
            <h1 style={{ fontSize: 'clamp(1.85rem, 4.5vw, 2.65rem)', margin: 0 }}>
              {t('把术语关系画清楚', 'Make the relationships visible')}
            </h1>
            <p className="soft" style={{ marginTop: '0.75rem', maxWidth: '38rem', lineHeight: 1.8 }}>
              {t(
                '每一张图只解决一个概念：元素怎么流动、盘面先看哪里、卦象如何从问题走向行动。先看懂结构，再进入工具会更稳。',
                'Each diagram explains one structure: how elements flow, where to start in a chart, and how divination moves from question to action.',
              )}
            </p>
          </div>
          <div className="knowledge-stat">
            <span className="muted" style={{ fontSize: '0.78rem' }}>
              {t('已整理图解', 'Diagrams collected')}
            </span>
            <strong className="serif">
              {diagrams.length} <small>{t('张', 'items')}</small>
            </strong>
          </div>
        </div>

        <div className="method-pills" style={{ marginTop: '1.25rem' }}>
          <button
            type="button"
            className="chip"
            onClick={() => setCat('all')}
            style={cat === 'all' ? { background: 'var(--btn-bg)', color: 'var(--btn-fg)', borderColor: 'var(--btn-bg)' } : undefined}
          >
            {t('全部', 'All')}
          </button>
          {DIAGRAM_CATS.map((c) => (
            <button
              key={c}
              type="button"
              className="chip"
              onClick={() => setCat(c)}
              style={cat === c ? { background: 'var(--btn-bg)', color: 'var(--btn-fg)', borderColor: 'var(--btn-bg)' } : undefined}
            >
              {lang === 'en' ? CAT_LABEL[c].en : CAT_LABEL[c].zh}
            </button>
          ))}
        </div>

        <div className="knowledge-shortcuts">
          <Link className="btn btn-sm" to="/tools/daily-hexagram">
            {t('每日一卦', 'Daily Hexagram')}
          </Link>
          <Link className="btn btn-sm" to="/classics">
            {t('古籍书楼', 'Classics')}
          </Link>
        </div>
      </header>

      <div className="knowledge-list">
        {list.map((d) => {
          const nodeMap = d.kind === 'grid' && d.cells ? d.cells : d.nodes
          return (
            <article key={d.id} id={d.id} className="knowledge-block">
              <div className="knowledge-block-head">
                <span className="chip">{lang === 'en' ? CAT_LABEL[d.cat].en : CAT_LABEL[d.cat].zh}</span>
                <span className="en-label">{d.en}</span>
              </div>
              <h2>{lang === 'en' ? d.en : d.zh}</h2>
              <p className="soft knowledge-block-desc">{lang === 'en' ? d.descEn : d.descZh}</p>

              <div className="knowledge-visual">
                <KnowledgeDiagram d={d} />
              </div>

              {d.kind === 'cycle' && (
                <div className="knowledge-nodes">
                  {d.nodes.map((n) => (
                    <div key={n.id} className="knowledge-node-card">
                      <strong className="serif">{nodeLabel(n, lang)}</strong>
                      <span>{nodeHint(n, lang)}</span>
                    </div>
                  ))}
                </div>
              )}

              {d.edges.length > 0 && (
                <div className="knowledge-edges">
                  {d.edges.map((e) => {
                    const from = findNode(nodeMap, e.from) ?? findNode(d.nodes, e.from)
                    const to = findNode(nodeMap, e.to) ?? findNode(d.nodes, e.to)
                    return (
                      <span key={`${e.from}-${e.to}-${e.labelZh}`} className="knowledge-edge">
                        <b>{from ? nodeLabel(from, lang) : e.from}</b>
                        <i aria-hidden>→</i>
                        <b>{to ? nodeLabel(to, lang) : e.to}</b>
                        <em>{edgeLabel(e, lang)}</em>
                      </span>
                    )
                  })}
                </div>
              )}

              <p className="knowledge-tip">{lang === 'en' ? d.tipEn : d.tipZh}</p>
            </article>
          )
        })}
      </div>
    </div>
  )
}
