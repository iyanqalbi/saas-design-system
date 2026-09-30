import type { HTMLAttributes } from 'react'
import './Badge.css'

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'accent'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
  soft?: boolean
}

export function Badge({
  tone = 'neutral',
  soft = true,
  className = '',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`badge badge--${tone} ${soft ? 'badge--soft' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  )
}
