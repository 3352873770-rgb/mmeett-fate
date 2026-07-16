import { Link } from 'react-router-dom'
import { categoryLabels, toolById } from '@/data/tools'
import { useFavorites } from '@/lib/favorites'

export function FavoritesPage() {
  const { favorites, toggle } = useFavorites()
  const items = favorites.map((id) => toolById(id)).filter((t): t is NonNullable<typeof t> => Boolean(t))

  return (
    <div className="page">
      <span className="en-label">FAVORITES</span>
      <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', margin: '0.5rem 0 0.35rem' }}>我的收藏</h1>
      <p className="soft" style={{ marginBottom: '2rem' }}>收藏的推演工具保存在本设备，随时回来继续。</p>

      {items.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <p className="muted">还没有收藏。去 <Link to="/tools" style={{ color: 'var(--accent)' }}>推演云台</Link> 挑几个常用的吧。</p>
        </div>
      ) : (
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
          {items.map((t) => (
            <div key={t.id} className="card">
              <span className="en-label">{categoryLabels[t.category].zh}</span>
              <h3 style={{ marginTop: '0.35rem' }}>{t.zh}</h3>
              <p className="soft" style={{ margin: '0.4rem 0 0.75rem' }}>{t.subtitle}</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link className="btn btn-primary btn-sm" to={`/tools/${t.id}`}>进入 →</Link>
                <button className="btn btn-sm" onClick={() => toggle(t.id)}>取消收藏</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
