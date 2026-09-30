import type { ReactNode } from 'react'
import { SiteFooter } from '../../components/organisms/SiteFooter'
import { SiteHeader } from '../../components/organisms/SiteHeader'
import './MarketingLayout.css'

export interface MarketingLayoutProps {
  children: ReactNode
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="marketing-layout">
      <SiteHeader />
      <main className="marketing-layout__main">{children}</main>
      <SiteFooter />
    </div>
  )
}
