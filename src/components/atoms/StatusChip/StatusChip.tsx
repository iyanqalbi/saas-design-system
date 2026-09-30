import type { HTMLAttributes } from 'react'
import './StatusChip.css'

export type StatusChipTone =
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'accent'

export interface StatusChipProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: StatusChipTone
  dot?: boolean
}

export function StatusChip({
  tone = 'neutral',
  dot = true,
  className = '',
  children,
  ...props
}: StatusChipProps) {
  return (
    <span className={`status-chip status-chip--${tone} ${className}`.trim()} {...props}>
      {dot ? <span className="status-chip__dot" aria-hidden /> : null}
      {children}
    </span>
  )
}
