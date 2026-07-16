import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { categoryLabels, tools, type Tool, type ToolCategory } from '@/data/tools'
import { useFavorites } from '@/lib/favorites'

type Filter = ToolCategory | 'all'

const filters: Filter[] = ['all', 'chart', 'divination', 'analysis', 'utility']

const ICONS: Record<string, string> = {
  ziwei: '✦', bazi: '☰', 'bazi-detail': '▤', 'bazi-hepan': '⚭', 'ziwei-hepan': '✧',
  qimen: '▦', meihua: '✾', hecan: '☯', qizheng: '☉',
  daliuren: '坎', xiaoliuren: '◇', liuyao: '⚌', tarot: '☾', zhuge: '✧', astro: '★',
  fengshui: '⌂', wuxing: '◎',
  cezi: '文', dream: '☁', 'daily-fortune': '日', 'daily-hexagram': '卦',
  jieqi: '节', wuyun: '运', huangli: '曆', name: '名', 'birth-time': '时',
  'birth-time-rectify': '◷', zeri: '择',
}

export function ToolsPage() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<Filter>('all')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [utilsOpen, setUtilsOpen] = useState(false)
  const { has, toggle } = useFavorites()

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: tools.length, chart: 0, divination: 0, analysis: 0, utility: 0 }
    for (const t of tools) c[t.category]++
    return c
  }, [])

  const list = useMemo(() => {
    return tools.filter((t) => {
      if (cat !== 'all' && t.category !== cat) return false
      if (q && !`${t.zh}${t.en}${t.subtitle}`.toLowerCase().includes(q.toLowerCase())) return false
      return true
    })
  }, [q, cat])

  const featured = list.find((t) => t.category !== 'utility') ?? list[0]
  const mainList = cat === 'utility' ? list : list.filter((t) => t.category !== 'utility' || cat !== 'all')
  const utils = tools.filter((t) => t.category === 'utility')
  const showMain = cat === 'all' ? list.filter((t) => t.category !== 'utility') : mainList
  const showUtils = cat === 'all' || cat === 'utility'
    ? (cat === 'utility' ? list : (utilsOpen || q ? utils.filter((t) => !q || `${t.zh}${t.en}${t.subtitle}`.toLowerCase().includes(q.toLowerCase())) : []))
    : []

  return (
    <div className="page">
      {/* 顶栏横幅 */}
      <section className="tools-hero">
        <div className="tools-hero-bg" style={{ backgroundImage: 'url(/home/suanleme-day-mystic-hero.jpg)' }} aria-hidden />
        <div className="tools-hero-body">
          <span className="en-label" style={{ color: 'rgba(255,250,234,0.7)' }}>云海问卦 · 推演云台</span>
          <h1>一屏选局，备好再推演</h1>
          <p>
            命盘、卜筮、日课和分析推演放在同一张云台上。先选对门类、备好时间地点和问题，再进入专属页面生成结果。
          </p>
          <div className="tools-hero-actions">
            <a className="btn btn-primary" href="#tool-grid">开始入局 →</a>
            <Link className="btn" to="/favorites">看旧盘</Link>
          </div>
        </div>
      </section>

      {/* 搜索 + 视图 */}
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <input
          placeholder="搜索推演、排盘、起卦"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ flex: 1 }}
        />
        <div className="skin-switch">
          <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} title="网格">▦</button>
          <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} title="列表">≡</button>
        </div>
      </div>

      {/* 门类 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '1rem 0 0.35rem', alignItems: 'center' }}>
        <span className="muted" style={{ fontSize: '0.82rem', marginRight: '0.25rem' }}>推演门类</span>
        {filters.map((f) => (
          <button
            key={f}
            className="chip"
            onClick={() => setCat(f)}
            style={
              f === cat
                ? { background: 'var(--btn-bg)', color: 'var(--btn-fg)', borderColor: 'var(--btn-bg)' }
                : undefined
            }
          >
            {f === 'all' ? '全部' : categoryLabels[f].zh} <span style={{ opacity: 0.65 }}>{counts[f]}</span>
          </button>
        ))}
      </div>
      <p className="muted" style={{ fontSize: '0.82rem', margin: '0.25rem 0 1.25rem' }}>
        档案、历史和常用输入仍在各推演页里，不改原流程。
      </p>

      {/* 精选大卡 */}
      {featured && cat !== 'utility' && !q && (
        <div className="feature-spotlight">
          <div>
            <span className="chip" style={{ marginBottom: '0.5rem' }}>{categoryLabels[featured.category].zh}</span>
            <h2 style={{ fontSize: '1.55rem', margin: '0.35rem 0' }}>{featured.zh}</h2>
            <p className="soft" style={{ margin: 0, lineHeight: 1.7, maxWidth: '28rem' }}>
              {featured.subtitle}。{featured.prep ? `入局前备好：${featured.prep.join('，')}。` : ''}
            </p>
          </div>
          {featured.prep && (
            <div>
              <span className="form-lbl">入局准备</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {featured.prep.map((p) => (
                  <span key={p} className="chip">{p}</span>
                ))}
              </div>
            </div>
          )}
          <div className="feature-spotlight-actions">
            <Link className="btn btn-primary" to={`/tools/${featured.id}`}>进入 →</Link>
            <button className="btn" onClick={() => toggle(featured.id)}>
              {has(featured.id) ? '★ 已收藏' : '☆ 收藏'}
            </button>
          </div>
        </div>
      )}

      {/* 三步 */}
      {!q && cat === 'all' && (
        <div className="flow-steps">
          <div><b>01</b><div><strong>定盘</strong><p>先把人、事、时辰和地点落准。</p></div></div>
          <div><b>02</b><div><strong>取象</strong><p>命盘、卜筮、日课按门类入局。</p></div></div>
          <div><b>03</b><div><strong>留档</strong><p>用档案和历史少填重复信息。</p></div></div>
        </div>
      )}

      {/* 主工具网格 */}
      <div
        id="tool-grid"
        className="grid"
        style={{
          marginTop: '1.25rem',
          gridTemplateColumns: view === 'grid' ? 'repeat(auto-fill, minmax(260px, 1fr))' : '1fr',
        }}
      >
        {showMain.map((t) => (
          <ToolCard key={t.id} tool={t} view={view} favorited={has(t.id)} onFav={() => toggle(t.id)} />
        ))}
        {showMain.length === 0 && showUtils.length === 0 && (
          <p className="muted">没有匹配的推演，换个关键词试试。</p>
        )}
      </div>

      {/* 实用小工具 */}
      {showUtils.length > 0 || (cat === 'all' && !q) ? (
        <div style={{ marginTop: '2rem' }}>
          {cat === 'all' && !q && (
            <button className="btn" onClick={() => setUtilsOpen((v) => !v)} style={{ marginBottom: '1rem' }}>
              实用小工具 {utilsOpen ? '收起' : '展开小工具'} · {utils.length}
            </button>
          )}
          {(cat === 'utility' || utilsOpen || q) && (
            <>
              {cat === 'all' && (
                <p className="soft" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                  解梦、测字、黄历、每日运势、出生校时、寻时定盘和择日收进下方小格，入口保留，主推演不拥挤。
                </p>
              )}
              <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                {(cat === 'utility' || q ? showUtils : utils).map((t) => (
                  <Link key={t.id} to={`/tools/${t.id}`} className="card util-card">
                    <span className="util-ico">{ICONS[t.id] ?? '·'}</span>
                    <div>
                      <h3 style={{ fontSize: '0.98rem', margin: 0 }}>{t.zh}</h3>
                      <p style={{ fontSize: '0.8rem', margin: '0.2rem 0 0' }}>{t.subtitle}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      ) : null}
    </div>
  )
}

function ToolCard({
  tool, view, favorited, onFav,
}: {
  tool: Tool
  view: 'grid' | 'list'
  favorited: boolean
  onFav: () => void
}) {
  return (
    <div className={`card tool-entry${view === 'list' ? ' tool-entry-list' : ''}`}>
      <div className="tool-entry-top">
        <span className="tool-entry-ico" aria-hidden>{ICONS[tool.id] ?? '☯'}</span>
        <button className="fav-star" onClick={onFav} aria-label="收藏" aria-pressed={favorited}>
          {favorited ? '★' : '☆'}
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', alignItems: 'flex-start' }}>
        <h3 style={{ margin: '0.35rem 0 0.25rem' }}>{tool.zh}</h3>
        <span className="chip" style={{ fontSize: '0.7rem', flexShrink: 0 }}>{categoryLabels[tool.category].zh}</span>
      </div>
      <p className="soft" style={{ margin: 0, flex: 1, fontSize: '0.88rem' }}>{tool.subtitle}</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.9rem' }}>
        <Link className="btn btn-sm btn-primary" to={`/tools/${tool.id}`}>进入 →</Link>
      </div>
    </div>
  )
}
