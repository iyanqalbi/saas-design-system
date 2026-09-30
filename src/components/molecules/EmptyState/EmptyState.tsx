import type { ReactNode } from 'react'
import { Text } from '../../atoms/Text'
import './EmptyState.css'

export interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`empty-state ${className}`.trim()}>
      {icon ? <div className="empty-state__icon">{icon}</div> : null}
      <Text as="h3" variant="headingSm">
        {title}
      </Text>
      {description ? (
        <Text as="p" variant="muted" className="empty-state__description">
          {description}
        </Text>
      ) : null}
      {action ? <div className="empty-state__action">{action}</div> : null}
    </div>
  )
}
