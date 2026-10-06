import type { ReactNode } from 'react'
import { Text } from '../../atoms/Text'
import { ProgressBar, type ProgressBarTone } from '../../atoms/ProgressBar'
import { Button } from '../../atoms/Button'
import './UsageMeter.css'

export interface UsageMeterProps {
  value: number
  max: number
  label?: string
  hint?: string
  actionLabel?: string
  onAction?: () => void
  tone?: ProgressBarTone
  action?: ReactNode
  className?: string
}

export function UsageMeter({
  value,
  max,
  label,
  hint = 'Upgrade for unlimited use',
  actionLabel = 'Upgrade',
  onAction,
  tone = 'accent',
  action,
  className = '',
}: UsageMeterProps) {
  return (
    <div className={`usage-meter ${className}`.trim()}>
      <div className="usage-meter__meta">
        {label ? (
          <Text as="span" variant="muted" className="usage-meter__label">
            {label}
          </Text>
        ) : (
          <span />
        )}
        <Text as="span" variant="bodyMedium" className="usage-meter__count">
          {value}/{max}
        </Text>
      </div>
      <ProgressBar value={value} max={max} tone={tone} size="sm" showValue={false} />
      {hint ? (
        <Text as="p" variant="muted" className="usage-meter__hint">
          {hint}
        </Text>
      ) : null}
      {action ??
        (onAction ? (
          <Button size="sm" variant="outlined" fullWidth onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null)}
    </div>
  )
}
