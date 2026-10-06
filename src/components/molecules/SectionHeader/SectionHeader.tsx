import type { ReactNode } from 'react'
import { Text } from '../../atoms/Text'
import './SectionHeader.css'

export interface SectionHeaderProps {
  title: string
  description?: string
  meta?: ReactNode
  actions?: ReactNode
  className?: string
}

export function SectionHeader({
  title,
  description,
  meta,
  actions,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`section-header ${className}`.trim()}>
      <div className="section-header__copy">
        <div className="section-header__title-row">
          <Text as="h2" variant="bodySemibold" className="section-header__title">
            {title}
          </Text>
          {meta}
        </div>
        {description ? (
          <Text as="p" variant="muted" className="section-header__description">
            {description}
          </Text>
        ) : null}
      </div>
      {actions ? <div className="section-header__actions">{actions}</div> : null}
    </div>
  )
}
