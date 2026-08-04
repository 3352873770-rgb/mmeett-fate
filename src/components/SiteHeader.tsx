import { useEffect, useState, type ComponentType } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BrandMark } from '@/components/BrandMark'
import { navItems } from '@/data/nav'
import { useAuth } from '@/lib/auth'
import { useLang } from '@/lib/i18n'
import { useTheme, type Skin } from '@/lib/theme'

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function CloudIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path
        d="M7.5 18h9a4 4 0 0 0 .4-8 5.5 5.5 0 0 0-10.6 1.6A3.5 3.5 0 0 0 7.5 18z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M20 14.5A7.5 7.5 0 1 1 9.5 4 6 6 0 0 0 20 14.5z" strokeLinejoin="round" />
    </svg>
  )
}

/** 对齐官网 lucide-languages */
function LanguagesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m5 8 6 6" />
      <path d="m4 14 6-6 2-3" />
      <path d="M2 5h12" />
      <path d="M7 2h1" />
      <path d="m22 22-5-10-5 10" />
      <path d="M14 18h6" />
    </svg>
  )
}

const skins: { key: Skin; zh: string; en: string; Icon: ComponentType }[] = [
  { key: 'day', zh: '昼', en: 'Day', Icon: SunIcon },
  { key: 'cloud', zh: '云海', en: 'Cloud', Icon: CloudIcon },
  { key: 'night', zh: '夜', en: 'Night', Icon: MoonIcon },
]

export function SiteHeader() {
  const { skin, setSkin } = useTheme()
  const { lang, toggle, t } = useLang()
  const { isAuthenticated, user, openAuth, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const skinSwitch = (
    <div className="skin-switch" role="group" aria-label={t('皮肤', 'Skin')}>
      {skins.map((s) => {
        const label = lang === 'en' ? s.en : s.zh
        return (
          <button
            key={s.key}
            type="button"
            className={skin === s.key ? 'active' : ''}
            onClick={() => setSkin(s.key)}
            title={label}
            aria-label={label}
            aria-pressed={skin === s.key}
          >
            <s.Icon />
          </button>
        )
      })}
    </div>
  )

  const languageBtn = (
    <button
      type="button"
      className="language-switch"
      onClick={toggle}
      aria-label={t('切换中英文', 'Switch language')}
      title={t('切换中英文', 'Switch language')}
    >
      <LanguagesIcon />
      {lang === 'zh' ? 'EN' : '中文'}
    </button>
  )

  const authBtn = isAuthenticated ? (
    <button type="button" className="icon-btn" onClick={logout} title={user?.name}>
      {t('退出', 'Sign out')}
    </button>
  ) : (
    <button
      type="button"
      className="btn btn-primary btn-sm"
      onClick={() => {
        setMenuOpen(false)
        openAuth('login')
      }}
    >
      ✧ {t('登录', 'Login')}
    </button>
  )

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand" onClick={() => setMenuOpen(false)} aria-label={t('MMEETT Fate 首页', 'MMEETT Fate home')}>
            <BrandMark />
            <span className="brand-text">MMEETT Fate</span>
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
            <div className="header-actions-desktop">
              {skinSwitch}
              {languageBtn}
              {authBtn}
            </div>
            <button
              type="button"
              className="icon-btn menu-toggle"
              onClick={() => setMenuOpen(true)}
              aria-label={t('菜单', 'Menu')}
              aria-expanded={menuOpen}
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
              <BrandMark />
              <span className="brand-text">MMEETT Fate</span>
            </Link>
            <span className="header-spacer" />
            <button type="button" className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="close">
              ✕
            </button>
          </div>
          <div className="menu-toolbar">
            {skinSwitch}
            {languageBtn}
            {authBtn}
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
