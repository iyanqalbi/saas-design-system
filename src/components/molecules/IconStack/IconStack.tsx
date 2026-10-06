import type { ReactNode } from 'react'
import './IconStack.css'

export type IconStackSize = 'sm' | 'md' | 'lg'

export interface IconStackItem {
  id: string
  icon: ReactNode
  label?: string
}

export interface IconStackProps {
  items: IconStackItem[]
  max?: number
  size?: IconStackSize
  overflowLabel?: string
  className?: string
}

export function IconStack({
  items,
  max = 4,
  size = 'md',
  overflowLabel,
  className = '',
}: IconStackProps) {
  const visible = items.slice(0, max)
  const overflow = Math.max(items.length - max, 0)
  const overflowText = overflowLabel ?? (overflow > 0 ? `+${overflow}` : undefined)

  return (
    <div className={`icon-stack icon-stack--${size} ${className}`.trim()} role="list">
      {visible.map((item) => (
        <span
          key={item.id}
          className="icon-stack__item"
          role="listitem"
          title={item.label}
          aria-label={item.label}
        >
          {item.icon}
        </span>
      ))}
      {overflowText ? (
        <span className="icon-stack__overflow" role="listitem">
          {overflowText}
        </span>
      ) : null}
    </div>
  )
}
