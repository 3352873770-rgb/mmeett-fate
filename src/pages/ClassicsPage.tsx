import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import {
  classicCatMeta,
  classicCats,
  classicCatCount,
  classics,
  featuredClassics,
} from '@/data/classics'

export function ClassicsPage() {
  const [cat, setCat] = useState<string>('all')

  const sections = useMemo(() => {
    const cats = cat === 'all' ? [...classicCats] : [cat]
    return cats.map((c) => ({
      cat: c,
      books: classics.filter((b) => b.cat === c),
    }))
  }, [cat])

  return (
    <div className="page classics-page">
      <header className="classics-hero">
        <span className="badge">古籍书楼</span>
        <h1>原典入楼，先看术法从哪里来</h1>
        <p className="soft">
          不用先翻厚书。每本书先给精简摘读、白话提要和术法用法，用户点进去就能看到书里真正能读的内容。
        </p>
      </header>

      <section className="classics-overview">
        <aside className="classics-summary card">
          <div className="classics-summary-head">
            <span className="classics-ico" aria-hidden>▤</span>
            <span>已整理书目</span>
          </div>
          <p className="classics-count">
            <b>{classics.length}</b> 本
          </p>
          <p className="soft">
            这里不是封面陈列，而是按术数门类整理的精简读本。用户先看白话摘读，再回到八字、紫微、奇门、六壬等工具里核盘。
          </p>
          <div className="classics-cat-chips">
            <button
              type="button"
              className={`chip${cat === 'all' ? ' chip-active' : ''}`}
              onClick={() => setCat('all')}
            >
              全部
            </button>
            {classicCats.map((c) => (
              <button
                key={c}
                type="button"
                className={`chip${cat === c ? ' chip-active' : ''}`}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <Link className="btn btn-sm" to="/knowledge" style={{ marginTop: '1rem', alignSelf: 'flex-start' }}>
            查看知识图解 →
          </Link>
        </aside>

        {(cat === 'all' || classicCatMeta.some((m) => m.cat === cat)) && (
          <div className="classics-cat-grid">
            {(cat === 'all' ? classicCatMeta : classicCatMeta.filter((m) => m.cat === cat)).map((m) => (
              <button
                key={m.cat}
                type="button"
                className="card classics-cat-card"
                onClick={() => setCat(m.cat)}
              >
                <div className="classics-cat-card-head">
                  <h3>{m.cat}</h3>
                  <span className="muted">{classicCatCount(m.cat)} 本</span>
                </div>
                <ul className="classics-topic-list">
                  {m.topics.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <span className="badge badge-ghost">{m.tools}</span>
              </button>
            ))}
          </div>
        )}
      </section>

      {cat === 'all' && (
        <section className="classics-featured">
          <div className="classics-section-head">
            <h2>先看这些主书</h2>
            <p className="soft">先给用户看书里讲什么：精读摘句、白话提要、对应工具都直接露出来。</p>
          </div>
          <div className="classics-featured-grid">
            {featuredClassics.map((b) => (
              <Link key={b.id} className="card classics-featured-card" to={`/classics/${encodeURIComponent(b.title)}`}>
                <div className="classics-featured-meta">
                  <span className="badge">{b.cat}</span>
                  <span className="badge badge-ghost">精读</span>
                  <span className="muted" style={{ fontSize: '0.75rem' }}>{b.tools}</span>
                </div>
                <h3>{b.title}</h3>
                <p className="classics-topic-label">讲什么 · {b.topics}</p>
                <p className="soft">{b.paragraphs[0]}</p>
                <p className="soft">{b.paragraphs[1]}</p>
                <span className="classics-read-link">点进书楼看白话摘读 →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {sections.map(({ cat: c, books }) => (
        <section key={c} id={`cat-${c}`} className="classics-cat-section">
          <div className="classics-section-head">
            <h2>{c}</h2>
            <p className="soft">{books.length} 本参考书目</p>
          </div>
          <div className="classics-book-list">
            {books.map((b, i) => (
              <Link
                key={b.id}
                className="card classics-book-row"
                to={`/classics/${encodeURIComponent(b.title)}`}
              >
                <div className="classics-book-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="classics-book-body">
                  <div className="classics-book-top">
                    <span className="badge badge-ghost">{b.cat}</span>
                    <h3>{b.title}</h3>
                    <span className="muted">
                      {b.dynasty} · {b.author}
                    </span>
                  </div>
                  <div className="classics-book-tags">
                    <span className="chip">{b.topics}</span>
                    <span className="chip">{b.tools}</span>
                  </div>
                  <p className="soft">{b.paragraphs[0]}</p>
                  <p className="soft">{b.paragraphs[1]}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
