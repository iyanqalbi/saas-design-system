import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { Text } from '../../atoms/Text'
import { Button } from '../../atoms/Button'
import { IconButton } from '../../atoms/IconButton'
import './UpgradeCard.css'

export interface UpgradeCardProps {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  onDismiss?: () => void
  action?: ReactNode
  className?: string
}

export function UpgradeCard({
  title,
  description,
  actionLabel = 'Upgrade Now',
  onAction,
  onDismiss,
  action,
  className = '',
}: UpgradeCardProps) {
  return (
    <aside className={`upgrade-card ${className}`.trim()}>
      {onDismiss ? (
        <IconButton
          label="Dismiss upgrade offer"
          size="sm"
          tone="ghost"
          className="upgrade-card__dismiss"
          onClick={onDismiss}
        >
          <X size={14} />
        </IconButton>
      ) : null}
      <Text as="h3" variant="bodySemibold" className="upgrade-card__title">
        {title}
      </Text>
      {description ? (
        <Text as="p" variant="muted" className="upgrade-card__description">
          {description}
        </Text>
      ) : null}
      {action ??
        (onAction ? (
          <Button size="sm" variant="contained" fullWidth onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null)}
    </aside>
  )
}
