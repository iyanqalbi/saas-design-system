import type { HTMLAttributes, ReactNode } from 'react'
import './TypeBadge.css'

export type TypeBadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info'
export type TypeBadgeSize = 'sm' | 'md'

export interface TypeBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  icon?: ReactNode
  tone?: TypeBadgeTone
  size?: TypeBadgeSize
  children: ReactNode
}

export function TypeBadge({
  icon,
  tone = 'neutral',
  size = 'md',
  className = '',
  children,
  ...props
}: TypeBadgeProps) {
  return (
    <span
      className={`type-badge type-badge--${tone} type-badge--${size} ${className}`.trim()}
      {...props}
    >
      {icon ? <span className="type-badge__icon">{icon}</span> : null}
      <span className="type-badge__label">{children}</span>
    </span>
  )
}
