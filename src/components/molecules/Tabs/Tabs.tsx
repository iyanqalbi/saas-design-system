import {
  useId,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import './Tabs.css'

export type TabsVariant =
  | 'underline'
  | 'soft'
  | 'solid'
  | 'boxed'
  | 'pills'
  | 'segmented'
  /** Wash bar with a white “lifted” active tab — icon + label friendly. */
  | 'folder'

export type TabsLayout = 'inline' | 'stacked'

export interface TabItem {
  id: string
  label: string
  content?: ReactNode
  disabled?: boolean
  badge?: string
  icon?: ReactNode
}

export interface TabsProps {
  items: TabItem[]
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  variant?: TabsVariant
  layout?: TabsLayout
  ariaLabel?: string
  className?: string
}

export function Tabs({
  items,
  defaultValue,
  value,
  onValueChange,
  variant = 'underline',
  layout = 'inline',
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

  function focusTab(list: HTMLDivElement, id: string) {
    list.querySelector<HTMLButtonElement>(`#${CSS.escape(getTabId(reactId, id))}`)?.focus()
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
        focusTab(event.currentTarget, next.id)
      }
    }

    if (event.key === 'Home') {
      event.preventDefault()
      const first = enabled[0]
      if (first) {
        selectTab(first.id)
        focusTab(event.currentTarget, first.id)
      }
    }

    if (event.key === 'End') {
      event.preventDefault()
      const last = enabled[enabled.length - 1]
      if (last) {
        selectTab(last.id)
        focusTab(event.currentTarget, last.id)
      }
    }
  }

  const activeItem = items.find((item) => item.id === activeId) ?? items.find((item) => !item.disabled)
  const hasPanel = activeItem?.content != null && activeItem.content !== false

  return (
    <div className={`tabs tabs--${variant} tabs--${layout} ${className}`.trim()}>
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
              aria-controls={hasPanel ? getPanelId(reactId, item.id) : undefined}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              className={`tabs__trigger ${selected ? 'tabs__trigger--active' : ''}`}
              onClick={() => selectTab(item.id)}
            >
              {item.icon ? (
                <span className="tabs__icon" aria-hidden="true">
                  {item.icon}
                </span>
              ) : null}
              <span className="tabs__label">{item.label}</span>
              {item.badge ? <span className="tabs__badge">{item.badge}</span> : null}
            </button>
          )
        })}
      </div>

      {hasPanel && activeItem ? (
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
  return `${scope}-tab-${id}`.replace(/:/g, '')
}

function getPanelId(scope: string, id: string) {
  return `${scope}-panel-${id}`.replace(/:/g, '')
}
