import type { ReactNode } from 'react'
import { Text } from '../../atoms/Text'
import { Badge } from '../../atoms/Badge'
import type { BadgeTone } from '../../atoms/Badge'
import './StatMetric.css'

export interface StatMetricProps {
  label: string
  value: string
  delta?: string
  deltaTone?: BadgeTone
  icon?: ReactNode
  className?: string
}

export function StatMetric({
  label,
  value,
  delta,
  deltaTone = 'success',
  icon,
  className = '',
}: StatMetricProps) {
  return (
    <article className={`stat-metric ${className}`.trim()}>
      <div className="stat-metric__top">
        <Text as="p" variant="muted" className="stat-metric__label">
          {label}
        </Text>
        {icon ? <span className="stat-metric__icon">{icon}</span> : null}
      </div>
      <Text as="p" variant="headingSm" className="stat-metric__value">
        {value}
      </Text>
      {delta ? (
        <Badge tone={deltaTone} className="stat-metric__delta">
          {delta}
        </Badge>
      ) : null}
    </article>
  )
}
