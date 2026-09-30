import { Bell, CreditCard, ShieldAlert, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { Avatar } from '../../atoms/Avatar'
import { Badge } from '../../atoms/Badge'
import { IconButton } from '../../atoms/IconButton'
import { Text } from '../../atoms/Text'
import './NotificationCard.css'

export type NotificationKind = 'system' | 'billing' | 'security' | 'message'

export interface NotificationCardProps {
  kind?: NotificationKind
  title: string
  description: string
  time: string
  unread?: boolean
  actor?: string
  actions?: ReactNode
  onDismiss?: () => void
  className?: string
}

const kindIcons = {
  system: Bell,
  billing: CreditCard,
  security: ShieldAlert,
  message: Bell,
}

export function NotificationCard({
  kind = 'system',
  title,
  description,
  time,
  unread = false,
  actor,
  actions,
  onDismiss,
  className = '',
}: NotificationCardProps) {
  const Icon = kindIcons[kind]

  return (
    <article
      className={`notification-card ${unread ? 'notification-card--unread' : ''} ${className}`.trim()}
    >
      <div className="notification-card__leading">
        {actor ? (
          <Avatar name={actor} size="md" />
        ) : (
          <span className={`notification-card__icon notification-card__icon--${kind}`}>
            <Icon size={16} strokeWidth={2} />
          </span>
        )}
      </div>

      <div className="notification-card__body">
        <div className="notification-card__title-row">
          <Text as="h3" variant="bodySemibold">
            {title}
          </Text>
          {unread ? <Badge tone="accent">New</Badge> : null}
        </div>
        <Text as="p" variant="muted" className="notification-card__description">
          {description}
        </Text>
        <Text as="p" variant="caption" className="notification-card__time">
          {time}
        </Text>
        {actions ? <div className="notification-card__actions">{actions}</div> : null}
      </div>

      {onDismiss ? (
        <IconButton label="Dismiss" size="sm" tone="ghost" onClick={onDismiss}>
          <X size={14} />
        </IconButton>
      ) : null}
    </article>
  )
}
