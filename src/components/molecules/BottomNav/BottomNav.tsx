import type { HTMLAttributes, ReactNode } from 'react'
import './BottomNav.css'

export interface BottomNavItem {
  id: string
  label: string
  icon: ReactNode
  badge?: number | string
  disabled?: boolean
}

export interface BottomNavProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  items: BottomNavItem[]
  value: string
  onChange?: (id: string) => void
}

export function BottomNav({
  items,
  value,
  onChange,
  className = '',
  ...props
}: BottomNavProps) {
  return (
    <nav className={`bottom-nav ${className}`.trim()} aria-label="Bottom navigation" {...props}>
      {items.map((item) => {
        const active = item.id === value
        return (
          <button
            key={item.id}
            type="button"
            className={`bottom-nav__item ${active ? 'bottom-nav__item--active' : ''}`}
            aria-current={active ? 'page' : undefined}
            disabled={item.disabled}
            onClick={() => onChange?.(item.id)}
          >
            <span className="bottom-nav__icon" aria-hidden="true">
              {item.icon}
              {item.badge != null && item.badge !== '' ? (
                <span className="bottom-nav__badge">{item.badge}</span>
              ) : null}
            </span>
            <span className="bottom-nav__label">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
