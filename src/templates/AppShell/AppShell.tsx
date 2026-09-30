import type { ReactNode } from 'react'
import { Sidebar } from '../../components/organisms/Sidebar'
import { AdminTopBar } from '../../components/organisms/AdminTopBar'
import type { BreadcrumbItem } from '../../components/molecules/Breadcrumb'
import './AppShell.css'

export interface AppShellProps {
  children: ReactNode
  title?: string
  crumbs?: BreadcrumbItem[]
  topBarExtra?: ReactNode
  className?: string
}

export function AppShell({
  children,
  title = 'Overview',
  crumbs,
  topBarExtra,
  className = '',
}: AppShellProps) {
  return (
    <div className={`app-shell ${className}`.trim()}>
      <Sidebar className="app-shell__sidebar" />
      <div className="app-shell__main">
        <div className="app-shell__top">
          <AdminTopBar title={title} crumbs={crumbs} />
          {topBarExtra}
        </div>
        <div className="app-shell__content">{children}</div>
      </div>
    </div>
  )
}
