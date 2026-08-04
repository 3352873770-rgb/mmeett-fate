import { Link } from 'react-router-dom'
import { BrandMark } from '@/components/BrandMark'
import { useLang } from '@/lib/i18n'

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

export function SiteHeader() {
  const { lang, toggle, t } = useLang()

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" aria-label={t('MMEETT Fate 首页', 'MMEETT Fate home')}>
          <BrandMark />
          <span className="brand-text">MMEETT Fate</span>
        </Link>
        <span className="header-spacer" />
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
      </div>
    </header>
  )
}
