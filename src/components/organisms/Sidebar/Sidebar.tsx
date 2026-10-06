import { useState, type ReactNode } from 'react'
import {
  CalendarCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
  PieChart,
  Plus,
  Sparkles,
  UserRound,
} from 'lucide-react'
import { Badge } from '../../atoms/Badge'
import type { BadgeTone } from '../../atoms/Badge'
import './Sidebar.css'

type SidebarChild = {
  id: string
  label: string
}

type SidebarItem = {
  id: string
  label: string
  icon: ReactNode
  badge?: { value: string; tone: BadgeTone }
  actionLabel?: string
  children?: SidebarChild[]
}

const items: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <Home /> },
  {
    id: 'audience',
    label: 'Audience',
    icon: <UserRound />,
    children: [
      { id: 'subscribers', label: 'Subscribers' },
      { id: 'segments', label: 'Segments' },
    ],
  },
  { id: 'posts', label: 'Posts', icon: <FileText />, badge: { value: '8', tone: 'success' } },
  {
    id: 'schedules',
    label: 'Schedules',
    icon: <CalendarCheck />,
    badge: { value: '3', tone: 'warning' },
    actionLabel: 'Add schedule',
  },
  {
    id: 'income',
    label: 'Income',
    icon: <PieChart />,
    children: [
      { id: 'earnings', label: 'Earnings' },
      { id: 'refunds', label: 'Refunds' },
      { id: 'declines', label: 'Declines' },
      { id: 'payouts', label: 'Payouts' },
    ],
  },
  {
    id: 'promote',
    label: 'Promote',
    icon: <Sparkles />,
    children: [
      { id: 'campaigns', label: 'Campaigns' },
      { id: 'affiliates', label: 'Affiliates' },
    ],
  },
]

export interface SidebarProps {
  className?: string
  compact?: boolean
  defaultCompact?: boolean
  defaultActiveId?: string
  defaultOpenIds?: string[]
  onCompactChange?: (compact: boolean) => void
}

export function Sidebar({
  className = '',
  compact: compactProp,
  defaultCompact = false,
  defaultActiveId = 'refunds',
  defaultOpenIds = ['income'],
  onCompactChange,
}: SidebarProps) {
  const [uncontrolledCompact, setUncontrolledCompact] = useState(defaultCompact)
  const isCompactControlled = compactProp !== undefined
  const compact = isCompactControlled ? compactProp : uncontrolledCompact
  const [activeId, setActiveId] = useState(defaultActiveId)
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds)

  function setCompact(next: boolean) {
    if (!isCompactControlled) setUncontrolledCompact(next)
    onCompactChange?.(next)
  }

  function toggleGroup(id: string) {
    setOpenIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  return (
    <aside className={`sidebar ${compact ? 'sidebar--compact' : ''} ${className}`.trim()}>
      <div className="sidebar__brand">
        <span className="sidebar__mark" aria-hidden="true" />
        <button
          type="button"
          className="sidebar__collapse"
          aria-label={compact ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={() => setCompact(!compact)}
        >
          {compact ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="sidebar__nav" aria-label="Workspace">
        {items.map((item) => {
          const hasChildren = Boolean(item.children?.length)
          const open = !compact && hasChildren && openIds.includes(item.id)
          const childActive = item.children?.some((child) => child.id === activeId)
          const active = activeId === item.id || (compact && Boolean(childActive))

          return (
            <div key={item.id} className="sidebar__block">
              <div className={`sidebar__row ${active ? 'sidebar__row--active' : ''}`.trim()}>
                <button
                  type="button"
                  className="sidebar__item"
                  aria-current={active ? 'page' : undefined}
                  aria-expanded={hasChildren ? open : undefined}
                  aria-label={compact ? item.label : undefined}
                  title={compact ? item.label : undefined}
                  onClick={() => {
                    if (hasChildren && !compact) {
                      toggleGroup(item.id)
                      return
                    }
                    setActiveId(item.id)
                  }}
                >
                  <span className="sidebar__icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  {!compact ? <span className="sidebar__label">{item.label}</span> : null}
                </button>

                {!compact && item.actionLabel ? (
                  <button
                    type="button"
                    className="sidebar__add"
                    aria-label={item.actionLabel}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Plus size={14} />
                  </button>
                ) : null}

                {!compact && item.badge ? (
                  <Badge tone={item.badge.tone} size="sm" className="sidebar__badge">
                    {item.badge.value}
                  </Badge>
                ) : null}

                {!compact && hasChildren ? (
                  <ChevronDown
                    size={16}
                    className={`sidebar__chevron ${open ? 'sidebar__chevron--open' : ''}`}
                    aria-hidden="true"
                  />
                ) : null}
              </div>

              {open ? (
                <ul className="sidebar__tree">
                  {item.children?.map((child) => {
                    const childIsActive = activeId === child.id
                    return (
                      <li key={child.id}>
                        <button
                          type="button"
                          className={`sidebar__child ${childIsActive ? 'sidebar__child--active' : ''}`.trim()}
                          aria-current={childIsActive ? 'page' : undefined}
                          onClick={() => setActiveId(child.id)}
                        >
                          <span>{child.label}</span>
                          {childIsActive ? <ChevronRight size={16} aria-hidden="true" /> : null}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              ) : null}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
