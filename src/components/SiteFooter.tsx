import { Link } from 'react-router-dom'
import { footerLinks } from '@/data/nav'
import { useLang } from '@/lib/i18n'

export function SiteFooter() {
  const { lang, t } = useLang()
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <div className="brand" style={{ marginBottom: '0.6rem' }}>
            <span className="brand-mark" aria-hidden />
            算了么
          </div>
          <p className="footer-copy" style={{ maxWidth: '24rem', lineHeight: 1.7 }}>
            {t(
              '推演工具本地可用。所有内容仅作传统文化体验与自我观察参考。',
              'Tools run locally. For cultural experience and self-observation only.',
            )}
          </p>
        </div>
        <div>
          <div className="footer-links">
            {footerLinks.map((l) => (
              <Link key={l.to} to={l.to}>
                {lang === 'zh' ? l.zh : l.en}
              </Link>
            ))}
          </div>
          <p className="footer-copy" style={{ marginTop: '1.5rem' }}>
            Copyright © 2026 suanlemeai.cn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
