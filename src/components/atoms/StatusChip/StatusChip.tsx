import type { HTMLAttributes } from 'react'
import './StatusChip.css'

export type StatusChipTone =
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'accent'

export type StatusChipSize = 'sm' | 'md' | 'lg'

export interface StatusChipProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: StatusChipTone
  size?: StatusChipSize
  dot?: boolean
}

export function StatusChip({
  tone = 'neutral',
  size = 'md',
  dot = true,
  className = '',
  children,
  ...props
}: StatusChipProps) {
  return (
    <span
      className={`status-chip status-chip--${tone} status-chip--${size} ${className}`.trim()}
      {...props}
    >
      {dot ? <span className="status-chip__dot" aria-hidden /> : null}
      {children}
    </span>
  )
}
