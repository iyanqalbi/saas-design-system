import type { ReactNode } from 'react'
import { Text } from '../../atoms/Text'
import { Breadcrumb } from '../../molecules/Breadcrumb'
import type { BreadcrumbItem } from '../../molecules/Breadcrumb'
import './PageHeader.css'

export interface PageHeaderProps {
  title: string
  description?: string
  crumbs?: BreadcrumbItem[]
  actions?: ReactNode
  meta?: ReactNode
  className?: string
}

export function PageHeader({
  title,
  description,
  crumbs,
  actions,
  meta,
  className = '',
}: PageHeaderProps) {
  return (
    <header className={`page-header ${className}`.trim()}>
      <div className="page-header__copy">
        {crumbs && crumbs.length > 0 ? <Breadcrumb items={crumbs} /> : null}
        <Text as="h1" variant="heading">
          {title}
        </Text>
        {description ? (
          <Text as="p" variant="muted" className="page-header__description">
            {description}
          </Text>
        ) : null}
        {meta ? <div className="page-header__meta">{meta}</div> : null}
      </div>
      {actions ? <div className="page-header__actions">{actions}</div> : null}
    </header>
  )
}
