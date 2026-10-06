import { useState, type ReactNode } from 'react'
import { ChevronDown, ChevronRight, Plus } from 'lucide-react'
import { Text } from '../../atoms/Text'
import { IconButton } from '../../atoms/IconButton'
import './TreeView.css'

export interface TreeViewItem {
  id: string
  label: string
  icon?: ReactNode
  children?: TreeViewItem[]
}

export interface TreeViewProps {
  items: TreeViewItem[]
  defaultOpenIds?: string[]
  activeId?: string
  onSelect?: (id: string) => void
  createLabel?: string
  onCreate?: () => void
  className?: string
}

function TreeNode({
  item,
  depth,
  openIds,
  activeId,
  onToggle,
  onSelect,
}: {
  item: TreeViewItem
  depth: number
  openIds: string[]
  activeId?: string
  onToggle: (id: string) => void
  onSelect?: (id: string) => void
}) {
  const hasChildren = Boolean(item.children?.length)
  const isOpen = openIds.includes(item.id)
  const isActive = activeId === item.id

  return (
    <li className="tree-view__node">
      <button
        type="button"
        className={`tree-view__row ${isActive ? 'tree-view__row--active' : ''}`}
        style={{ paddingLeft: 8 + depth * 14 }}
        onClick={() => {
          if (hasChildren) onToggle(item.id)
          onSelect?.(item.id)
        }}
      >
        {hasChildren ? (
          <span className="tree-view__chevron" aria-hidden>
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
        ) : (
          <span className="tree-view__chevron tree-view__chevron--spacer" aria-hidden />
        )}
        {item.icon ? <span className="tree-view__icon">{item.icon}</span> : null}
        <Text as="span" variant="bodyMedium" className="tree-view__label">
          {item.label}
        </Text>
      </button>
      {hasChildren && isOpen ? (
        <ul className="tree-view__list">
          {item.children!.map((child) => (
            <TreeNode
              key={child.id}
              item={child}
              depth={depth + 1}
              openIds={openIds}
              activeId={activeId}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export function TreeView({
  items,
  defaultOpenIds = [],
  activeId,
  onSelect,
  createLabel = 'Create folder',
  onCreate,
  className = '',
}: TreeViewProps) {
  const [openIds, setOpenIds] = useState(defaultOpenIds)

  function toggle(id: string) {
    setOpenIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  return (
    <div className={`tree-view ${className}`.trim()}>
      <ul className="tree-view__list">
        {items.map((item) => (
          <TreeNode
            key={item.id}
            item={item}
            depth={0}
            openIds={openIds}
            activeId={activeId}
            onToggle={toggle}
            onSelect={onSelect}
          />
        ))}
      </ul>
      {onCreate ? (
        <button type="button" className="tree-view__create" onClick={onCreate}>
          <Plus size={14} aria-hidden />
          <span>{createLabel}</span>
        </button>
      ) : null}
    </div>
  )
}

/** Optional header control for section add actions. */
export function TreeViewAddButton({
  label = 'Add',
  onClick,
}: {
  label?: string
  onClick?: () => void
}) {
  return (
    <IconButton label={label} size="sm" tone="ghost" onClick={onClick}>
      <Plus size={14} />
    </IconButton>
  )
}
