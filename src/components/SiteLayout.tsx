import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AuthModal } from '@/components/AuthModal'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'

export function SiteLayout() {
  const { pathname } = useLocation()

  // 路由切换回到顶部
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="site-main">
        <Outlet />
      </main>
      <SiteFooter />
      <AuthModal />
    </div>
  )
}
