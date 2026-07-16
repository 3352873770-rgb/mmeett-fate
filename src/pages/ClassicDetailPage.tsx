import { Link, Navigate, useParams } from 'react-router-dom'
import { classicByTitle, getClassicQuotes } from '@/data/classics'

const SECTIONS = [
  { id: 'summary', label: '读本提要' },
  { id: 'quotes', label: '精简摘读' },
  { id: 'toc', label: '阅读目录' },
  { id: 'viewable', label: '可查看内容' },
  { id: 'usage', label: '怎么用于算了么' },
  { id: 'boundary', label: '阅读边界' },
] as const

export function ClassicDetailPage() {
  const { title = '' } = useParams()
  const book = classicByTitle(title)
  if (!book) return <Navigate to="/classics" replace />

  const quotes = getClassicQuotes(book)
  const toc = book.toc ?? [
    `先按「${book.topics}」来读，不急着套吉凶。`,
    `${book.brief}`,
    `适合和${book.tools.replace(/^对应/, '')}一起看。`,
  ]
  const viewable = [
    ...book.topics.split('、').map((t) => `${t}：用于理解「${book.topics}」里对应的判断环节。`),
    ...quotes.slice(0, 2).map((q) => `摘读：${q.classic}`),
  ]
  const readingOrder =
    book.readingOrder ??
    `${book.topics.split('、')[0]} → 白话提要 → 术法用法 → 回到工具核盘`

  return (
    <div className="page classics-detail">
      <div className="classics-detail-layout">
        <aside className="classics-detail-side">
          <Link className="classics-back" to="/classics">
            ← 返回古籍书楼
          </Link>
          <div className="card classics-side-card">
            <span className="en-label">文字读本</span>
            <h1>{book.title}</h1>
            <p className="soft">不摆大封面，直接看内容。</p>
            <div className="classics-book-tags" style={{ marginTop: '0.75rem' }}>
              <span className="badge">{book.cat}</span>
              <span className="badge badge-ghost">{book.dynasty}</span>
            </div>
            <dl className="classics-meta-dl">
              <div>
                <dt>作者</dt>
                <dd>{book.author}</dd>
              </div>
              <div>
                <dt>范围</dt>
                <dd>{book.topics}</dd>
              </div>
            </dl>
          </div>
          <nav className="classics-toc-nav" aria-label="读本节选">
            {SECTIONS.map((s, i) => (
              <a key={s.id} href={`#${s.id}`}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        <article className="card classics-detail-main">
          <header className="classics-detail-head">
            <span className="classics-ico" aria-hidden>◫</span>
            <span className="muted">古籍精简读本</span>
            <h2>{book.title}</h2>
            <p className="soft">{book.brief}</p>
            <div className="classics-pill-row">
              {SECTIONS.map((s, i) => (
                <a key={s.id} className="chip" href={`#${s.id}`}>
                  {String(i + 1).padStart(2, '0')} {s.label}
                </a>
              ))}
            </div>
          </header>

          <section id="summary" className="classics-block">
            <h3>01 读本提要</h3>
            <p>
              《{book.title}》归入「{book.cat}」，先按「{book.topics}」来读。先看主线，再看细节与变化，最后落到所问之事。
            </p>
            <ul className="classics-kv">
              <li>
                <strong>核心范围：</strong>
                {book.topics}
              </li>
              <li>
                <strong>阅读价值：</strong>
                {book.brief}
              </li>
              <li>
                <strong>先看顺序：</strong>
                {readingOrder}
              </li>
            </ul>
          </section>

          <section id="quotes" className="classics-block">
            <h3>02 精简摘读</h3>
            <p className="soft">
              这里不做整本原文堆砌，只抽出用户能直接读懂的核心意旨。每条都拆成原典意旨、白话提要和术法用法，方便用户看完后回到工具里核盘。
            </p>
            <div className="classics-quote-list">
              {quotes.map((q) => (
                <div key={q.classic} className="classics-quote-card">
                  <div>
                    <span className="badge">原典意旨</span>
                    <p>{q.classic}</p>
                  </div>
                  <div>
                    <span className="badge badge-ghost">白话提要</span>
                    <p className="soft">{q.vernacular}</p>
                  </div>
                  <div>
                    <span className="badge badge-ghost">术法用法</span>
                    <p className="soft">{q.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="toc" className="classics-block">
            <h3>03 阅读目录</h3>
            <p className="soft">用户可以按这几个入口快速看这本书在讲什么，不需要先面对一大段难读原文。</p>
            <ul className="classics-bullet">
              {toc.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>

          <section id="viewable" className="classics-block">
            <h3>04 可查看内容</h3>
            <p className="soft">
              书楼会先开放精简读本：看核心条文、白话提要、术法用法和工具映射。后续如果要扩展，可以继续把每本书拆成更多章节。
            </p>
            <ul className="classics-bullet">
              {viewable.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>

          <section id="usage" className="classics-block">
            <h3>05 怎么用于算了么</h3>
            <p className="soft">
              本站会把这类书目作为术语和解释口径的参考：基础排盘仍由确定性历法和算法生成，解读只结合当前盘面、问题和已整理规则做说明。
            </p>
            <ul className="classics-bullet">
              <li>排盘先按工具算法生成，古籍内容用于解释口径和术语边界。</li>
              <li>用户追问时，可用这些书目帮助区分主线、辅线和现实边界。</li>
              <li>不会把古籍单句包装成绝对承诺。</li>
            </ul>
          </section>

          <section id="boundary" className="classics-block">
            <h3>06 阅读边界</h3>
            <p className="soft">
              古籍常有时代语境、门派差异和歌诀省略。涉及医疗、法律、投资、婚嫁等现实决策时，应以现实信息和专业意见为主。
            </p>
            <ul className="classics-bullet">
              <li>古籍内容用于传统文化体验与学习。</li>
              <li>同一术语在不同门派里可能有不同解释。</li>
              <li>涉及现实高风险决策时，不用书中断语替代专业意见。</li>
            </ul>
          </section>

          <section className="classics-block classics-next">
            <h3>下一步</h3>
            <p className="soft">
              如果你正在使用八字、紫微、奇门、六爻或择日工具，可以先生成基础结果，再围绕当前盘面追问。
            </p>
            <Link className="btn btn-primary" to="/tools">
              进入工具
            </Link>
          </section>
        </article>
      </div>
    </div>
  )
}
