import {
  useId,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import './Tabs.css'

export type TabsVariant = 'underline' | 'segmented'

export interface TabItem {
  id: string
  label: string
  content: ReactNode
  disabled?: boolean
  badge?: string
}

export interface TabsProps {
  items: TabItem[]
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  variant?: TabsVariant
  ariaLabel?: string
  className?: string
}

export function Tabs({
  items,
  defaultValue,
  value,
  onValueChange,
  variant = 'underline',
  ariaLabel = 'Tabs',
  className = '',
}: TabsProps) {
  const reactId = useId()
  const firstEnabled = items.find((item) => !item.disabled)?.id ?? items[0]?.id ?? ''
  const [internalValue, setInternalValue] = useState(defaultValue ?? firstEnabled)
  const activeId = value ?? internalValue

  function selectTab(nextId: string) {
    const target = items.find((item) => item.id === nextId)
    if (!target || target.disabled) return
    if (value === undefined) setInternalValue(nextId)
    onValueChange?.(nextId)
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const enabled = items.filter((item) => !item.disabled)
    const currentIndex = enabled.findIndex((item) => item.id === activeId)
    if (currentIndex < 0) return

    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault()
      const delta = event.key === 'ArrowRight' ? 1 : -1
      const next = enabled[(currentIndex + delta + enabled.length) % enabled.length]
      if (next) {
        selectTab(next.id)
        const button = event.currentTarget.querySelector<HTMLButtonElement>(
          `#${getTabId(reactId, next.id)}`,
        )
        button?.focus()
      }
    }

    if (event.key === 'Home') {
      event.preventDefault()
      const first = enabled[0]
      if (first) selectTab(first.id)
    }

    if (event.key === 'End') {
      event.preventDefault()
      const last = enabled[enabled.length - 1]
      if (last) selectTab(last.id)
    }
  }

  const activeItem = items.find((item) => item.id === activeId) ?? items.find((item) => !item.disabled)

  return (
    <div className={`tabs tabs--${variant} ${className}`.trim()}>
      <div
        className="tabs__list"
        role="tablist"
        aria-label={ariaLabel}
        onKeyDown={onKeyDown}
      >
        {items.map((item) => {
          const selected = item.id === activeId
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={getTabId(reactId, item.id)}
              aria-selected={selected}
              aria-controls={getPanelId(reactId, item.id)}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              className={`tabs__trigger ${selected ? 'tabs__trigger--active' : ''}`}
              onClick={() => selectTab(item.id)}
            >
              <span className="tabs__label">{item.label}</span>
              {item.badge ? <span className="tabs__badge">{item.badge}</span> : null}
            </button>
          )
        })}
      </div>

      {activeItem ? (
        <div
          role="tabpanel"
          id={getPanelId(reactId, activeItem.id)}
          aria-labelledby={getTabId(reactId, activeItem.id)}
          className="tabs__panel"
        >
          {activeItem.content}
        </div>
      ) : null}
    </div>
  )
}

function getTabId(scope: string, id: string) {
  return `${scope}-tab-${id}`
}

function getPanelId(scope: string, id: string) {
  return `${scope}-panel-${id}`
}
