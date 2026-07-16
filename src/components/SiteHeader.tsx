import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navItems } from '@/data/nav'
import { useAuth } from '@/lib/auth'
import { useLang } from '@/lib/i18n'
import { useTheme, type Skin } from '@/lib/theme'

const skins: { key: Skin; glyph: string; label: string }[] = [
  { key: 'day', glyph: '☀', label: '昼' },
  { key: 'cloud', glyph: '☁', label: '云海' },
  { key: 'night', glyph: '☾', label: '夜' },
]

export function SiteHeader() {
  const { skin, setSkin } = useTheme()
  const { lang, toggle, t } = useLang()
  const { isAuthenticated, user, openAuth, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark" aria-hidden />
            算了么
          </Link>
          <nav className="nav-inline">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {lang === 'zh' ? n.zh : n.en}
              </NavLink>
            ))}
          </nav>
          <span className="header-spacer" />
          <div className="header-actions">
            <div className="skin-switch" role="group" aria-label={t('皮肤', 'Skin')}>
              {skins.map((s) => (
                <button
                  key={s.key}
                  className={skin === s.key ? 'active' : ''}
                  onClick={() => setSkin(s.key)}
                  title={s.label}
                  aria-pressed={skin === s.key}
                >
                  {s.glyph}
                </button>
              ))}
            </div>
            <button className="icon-btn" onClick={toggle} aria-label="language">
              {lang === 'zh' ? '文 EN' : '中文'}
            </button>
            {isAuthenticated ? (
              <button className="icon-btn" onClick={logout} title={user?.name}>
                {t('退出', 'Sign out')}
              </button>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={() => openAuth('login')}>
                ✧ {t('登录', 'Login')}
              </button>
            )}
            <button
              className="icon-btn menu-toggle"
              onClick={() => setMenuOpen(true)}
              aria-label={t('菜单', 'Menu')}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="menu-overlay">
          <div className="menu-top">
            <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
              <span className="brand-mark" aria-hidden />
              算了么
            </Link>
            <span className="header-spacer" />
            <button className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="close">
              ✕
            </button>
          </div>
          <nav className="menu-list">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={() => setMenuOpen(false)}
              >
                {lang === 'zh' ? n.zh : n.en}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
