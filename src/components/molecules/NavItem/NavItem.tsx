import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import './NavItem.css'

export interface NavItemProps {
  to?: string
  href?: string
  label: string
  icon?: ReactNode
  active?: boolean
  onClick?: () => void
  className?: string
}

export function NavItem({
  to,
  href,
  label,
  icon,
  active = false,
  onClick,
  className = '',
}: NavItemProps) {
  const content = (
    <>
      {icon ? <span className="nav-item__icon">{icon}</span> : null}
      <span className="nav-item__label">{label}</span>
    </>
  )

  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `nav-item ${isActive || active ? 'nav-item--active' : ''} ${className}`.trim()
        }
        onClick={onClick}
      >
        {content}
      </NavLink>
    )
  }

  return (
    <a
      href={href ?? '#'}
      className={`nav-item ${active ? 'nav-item--active' : ''} ${className}`.trim()}
      onClick={onClick}
    >
      {content}
    </a>
  )
}
