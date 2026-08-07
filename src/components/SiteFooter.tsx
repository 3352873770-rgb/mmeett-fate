import { BrandMark } from '@/components/BrandMark'
import { useLang } from '@/lib/i18n'

export function SiteFooter() {
  const { t } = useLang()
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <div className="brand" style={{ marginBottom: '0.6rem' }}>
            <BrandMark />
            <span className="brand-text">MMEETT Fate</span>
          </div>
          <p className="footer-copy" style={{ maxWidth: '24rem', lineHeight: 1.7 }}>
            {t(
              '推演工具本地可用。所有内容仅作传统文化体验与自我观察参考。',
              'Tools run locally. For cultural experience and self-observation only.',
            )}
          </p>
        </div>
        <p className="footer-copy">Copyright © 2026 MMEETT Fate. All rights reserved.</p>
      </div>
    </footer>
  )
}
