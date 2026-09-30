import type { HTMLAttributes } from 'react'
import './Badge.css'

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'accent'
export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
  soft?: boolean
  size?: BadgeSize
}

export function Badge({
  tone = 'neutral',
  soft = true,
  size = 'md',
  className = '',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`badge badge--${tone} badge--${size} ${soft ? 'badge--soft' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  )
}
