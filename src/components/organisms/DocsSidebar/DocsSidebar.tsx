import { useEffect, useMemo, useState, type ComponentType } from 'react'
import {
  ArrowLeftRight,
  BadgeCheck,
  Box,
  ChevronDown,
  File,
  Flag,
  Globe,
  Moon,
  Palette,
  PenTool,
  RefreshCw,
  Sparkles,
  SquareTerminal,
  Type,
  User,
  Zap,
} from 'lucide-react'
import { SearchField } from '../../molecules/SearchField'
import { docsNav, type DocsNavGroup, type DocsNavIcon, type DocsNavItem } from '../../../data/docsNav'
import './DocsSidebar.css'

const iconMap: Record<DocsNavIcon, ComponentType<{ size?: number; strokeWidth?: number }>> = {
  sparkles: Sparkles,
  flag: Flag,
  palette: Palette,
  moon: Moon,
  type: Type,
  terminal: SquareTerminal,
  rtl: ArrowLeftRight,
  refresh: RefreshCw,
  box: Box,
  zap: Zap,
  figma: PenTool,
  file: File,
  globe: Globe,
  user: User,
  'badge-check': BadgeCheck,
}

export interface DocsSidebarProps {
  query: string
  onQueryChange: (value: string) => void
  activeId: string
  onSelect: (item: DocsNavItem) => void
}

export function DocsSidebar({ query, onQueryChange, activeId, onSelect }: DocsSidebarProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const node = document.querySelector('.docs-sidebar__item--active')
    node?.scrollIntoView({ block: 'nearest' })
  }, [activeId])

  const groups = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return docsNav

    return docsNav
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.label.toLowerCase().includes(needle) ||
            group.label.toLowerCase().includes(needle),
        ),
      }))
      .filter((group) => group.items.length > 0)
  }, [query])

  return (
    <nav className="docs-sidebar" aria-label="Component catalog">
      <SearchField
        size="sm"
        placeholder="Filter components…"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        className="docs-sidebar__search"
      />

      {groups.map((group) => (
        <DocsGroup
          key={group.id}
          group={group}
          collapsed={Boolean(query ? false : collapsed[group.id])}
          activeId={activeId}
          onToggle={() =>
            setCollapsed((current) => ({ ...current, [group.id]: !current[group.id] }))
          }
          onSelect={onSelect}
        />
      ))}
    </nav>
  )
}

function DocsGroup({
  group,
  collapsed,
  activeId,
  onToggle,
  onSelect,
}: {
  group: DocsNavGroup
  collapsed: boolean
  activeId: string
  onToggle: () => void
  onSelect: (item: DocsNavItem) => void
}) {
  const panelId = `${group.id}-panel`

  return (
    <div className="docs-sidebar__group">
      <button
        type="button"
        className="docs-sidebar__group-toggle"
        aria-expanded={!collapsed}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span>{group.label}</span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={`docs-sidebar__chevron ${collapsed ? 'docs-sidebar__chevron--collapsed' : ''}`}
        />
      </button>
      {collapsed ? null : (
        <div id={panelId} className="docs-sidebar__items">
          {group.items.map((item) => {
            const Icon = item.icon ? iconMap[item.icon] : null
            const active = item.id === activeId

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`docs-sidebar__item ${active ? 'docs-sidebar__item--active' : ''}`}
                aria-current={active ? 'page' : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  onSelect(item)
                }}
              >
                {Icon ? (
                  <span className="docs-sidebar__icon" aria-hidden="true">
                    <Icon size={16} strokeWidth={1.8} />
                  </span>
                ) : null}
                <span>{item.label}</span>
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}
