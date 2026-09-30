import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { IconButton } from '../../atoms/IconButton'
import { Text } from '../../atoms/Text'
import './AlertBanner.css'

export type AlertTone = 'info' | 'success' | 'warning' | 'danger'

export interface AlertBannerProps {
  tone?: AlertTone
  title: string
  description?: string
  action?: ReactNode
  onDismiss?: () => void
  className?: string
}

const icons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  danger: AlertCircle,
}

export function AlertBanner({
  tone = 'info',
  title,
  description,
  action,
  onDismiss,
  className = '',
}: AlertBannerProps) {
  const Icon = icons[tone]

  return (
    <div className={`alert alert--${tone} ${className}`.trim()} role="status">
      <span className="alert__icon">
        <Icon size={18} strokeWidth={2} />
      </span>
      <div className="alert__body">
        <Text as="p" variant="bodySemibold">
          {title}
        </Text>
        {description ? (
          <Text as="p" variant="muted">
            {description}
          </Text>
        ) : null}
        {action ? <div className="alert__action">{action}</div> : null}
      </div>
      {onDismiss ? (
        <IconButton label="Dismiss" size="sm" tone="ghost" onClick={onDismiss}>
          <X size={16} />
        </IconButton>
      ) : null}
    </div>
  )
}
