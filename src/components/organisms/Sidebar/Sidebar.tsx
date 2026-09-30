import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  BarChart3,
  Inbox,
  LifeBuoy,
} from 'lucide-react'
import { Text } from '../../atoms/Text'
import { NavItem } from '../../molecules/NavItem'
import { UserChip } from '../../molecules/UserChip'
import './Sidebar.css'

const primary = [
  { label: 'Overview', icon: <LayoutDashboard />, active: true },
  { label: 'Customers', icon: <Users /> },
  { label: 'Billing', icon: <CreditCard /> },
  { label: 'Analytics', icon: <BarChart3 /> },
  { label: 'Inbox', icon: <Inbox /> },
]

const secondary = [
  { label: 'Settings', icon: <Settings /> },
  { label: 'Support', icon: <LifeBuoy /> },
]

export interface SidebarProps {
  className?: string
  compact?: boolean
}

export function Sidebar({ className = '', compact = false }: SidebarProps) {
  return (
    <aside className={`sidebar ${compact ? 'sidebar--compact' : ''} ${className}`.trim()}>
      <div className="sidebar__brand">
        <span className="sidebar__mark" aria-hidden="true" />
        {!compact ? (
          <Text as="p" variant="ui">
            Admin Portal
          </Text>
        ) : null}
      </div>

      <nav className="sidebar__nav" aria-label="Admin">
        <div className="sidebar__group">
          {!compact ? (
            <Text as="p" variant="caption" className="sidebar__group-label">
              Workspace
            </Text>
          ) : null}
          {primary.map((item) => (
            <NavItem
              key={item.label}
              label={compact ? '' : item.label}
              icon={item.icon}
              active={item.active}
              href="#"
              className={compact ? 'sidebar__nav-compact' : ''}
            />
          ))}
        </div>

        <div className="sidebar__group">
          {!compact ? (
            <Text as="p" variant="caption" className="sidebar__group-label">
              Account
            </Text>
          ) : null}
          {secondary.map((item) => (
            <NavItem
              key={item.label}
              label={compact ? '' : item.label}
              icon={item.icon}
              href="#"
              className={compact ? 'sidebar__nav-compact' : ''}
            />
          ))}
        </div>
      </nav>

      {!compact ? (
        <div className="sidebar__footer">
          <UserChip name="Maya Chen" role="Workspace admin" />
        </div>
      ) : null}
    </aside>
  )
}
