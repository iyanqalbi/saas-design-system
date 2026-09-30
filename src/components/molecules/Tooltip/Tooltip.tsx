import { useId, useState, type ReactNode } from 'react'
import './Tooltip.css'

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  content: ReactNode
  children: ReactNode
  side?: TooltipSide
  className?: string
}

export function Tooltip({ content, children, side = 'top', className = '' }: TooltipProps) {
  const tooltipId = useId()
  const [open, setOpen] = useState(false)

  return (
    <span
      className={`tooltip ${className}`.trim()}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span className="tooltip__anchor" aria-describedby={open ? tooltipId : undefined}>
        {children}
      </span>
      {open ? (
        <span id={tooltipId} role="tooltip" className={`tooltip__content tooltip__content--${side}`}>
          {content}
        </span>
      ) : null}
    </span>
  )
}
