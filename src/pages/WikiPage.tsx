import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { wikiArticles, wikiCats, wikiGroups, wikiById, type WikiCat } from '@/data/wiki'

export function WikiPage() {
  const [cat, setCat] = useState<WikiCat | 'all'>('all')
  const [openId, setOpenId] = useState<string | null>(null)
  const groups = useMemo(() => wikiGroups(cat), [cat])
  const open = openId ? wikiById(openId) : null

  return (
    <div className="page">
      <span className="en-label">藏经阁 · WIKI</span>
      <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', margin: '0.5rem 0 0.4rem' }}>翻开词条，先把坐标系立住</h1>
      <p className="soft" style={{ maxWidth: '44rem', lineHeight: 1.8 }}>
        不论吉凶断语，只聊体系边界：八字与紫微是“人”的建模；六爻、大六壬、奇门是“事”的即时研判。词条给概念，古籍给出处。
      </p>

      <div className="card" style={{ marginTop: '1.25rem', background: 'color-mix(in srgb, var(--accent) 6%, var(--surface))' }}>
        <span className="en-label">卷首 · 主创说</span>
        <ul className="wiki-lede">
          <li><strong>八字 vs 紫微：</strong>八字看气，紫微看象——锅汤与汤料之别。</li>
          <li><strong>命理 vs 三式：</strong>前者论终身轨迹，后者论当下事端与决策。</li>
          <li><strong>用法：</strong>先读词条懂坐标系，再回推演云台起盘。</li>
        </ul>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '1.5rem 0 1rem' }}>
        <button className="chip" onClick={() => setCat('all')} style={cat === 'all' ? { background: 'var(--btn-bg)', color: 'var(--btn-fg)', borderColor: 'var(--btn-bg)' } : undefined}>
          全部 <span style={{ opacity: 0.65 }}>{wikiArticles.length}</span>
        </button>
        {wikiCats.map((c) => {
          const n = wikiArticles.filter((a) => a.cat === c).length
          return (
            <button key={c} className="chip" onClick={() => setCat(c)} style={cat === c ? { background: 'var(--btn-bg)', color: 'var(--btn-fg)', borderColor: 'var(--btn-bg)' } : undefined}>
              {c} <span style={{ opacity: 0.65 }}>{n}</span>
            </button>
          )
        })}
      </div>

      <div className="grid" style={{ gap: '1.25rem' }}>
        {groups.map((g) => (
          <section key={g.group} className="tool-panel" style={{ margin: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
              <div>
                <span className="chip" style={{ marginBottom: '0.4rem' }}>{g.cat}</span>
                <h2 style={{ fontSize: '1.25rem', margin: 0 }}>{g.group}</h2>
                <p className="muted" style={{ fontSize: '0.82rem', margin: '0.35rem 0 0' }}>{g.articles.length} 篇</p>
              </div>
            </div>
            <div className="wiki-list">
              {g.articles.map((a) => (
                <button key={a.id} type="button" className="wiki-item" onClick={() => setOpenId(openId === a.id ? null : a.id)}>
                  <span>{a.title}</span>
                  <span className="muted">→</span>
                </button>
              ))}
            </div>
            {open && open.group === g.group && (
              <div className="result-box" style={{ marginTop: '0.85rem' }}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.35rem' }}>{open.title}</h3>
                <p className="muted" style={{ fontSize: '0.82rem', margin: '0 0 0.65rem' }}>{open.lead}</p>
                <p style={{ margin: 0, lineHeight: 1.8 }}>{open.body}</p>
              </div>
            )}
          </section>
        ))}
      </div>

      <div className="member-lock" style={{ marginTop: '2rem' }}>
        <div>
          <strong>看完概念，参看自己的本命</strong>
          <p className="muted" style={{ margin: '0.25rem 0 0', fontSize: '0.85rem' }}>录入生辰，自动起盘；详批可锚定古籍摘句。</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Link className="btn btn-primary btn-sm" to="/tools/bazi">去排盘</Link>
          <Link className="btn btn-sm" to="/tools/bazi-detail">八字详批</Link>
          <Link className="btn btn-sm" to="/classics">古籍书楼</Link>
        </div>
      </div>
    </div>
  )
}
