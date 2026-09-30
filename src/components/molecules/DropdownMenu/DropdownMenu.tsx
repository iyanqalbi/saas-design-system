import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import './DropdownMenu.css'

export interface DropdownMenuItem {
  id: string
  label: string
  icon?: ReactNode
  danger?: boolean
  disabled?: boolean
  separator?: boolean
  onSelect?: () => void
}

export interface DropdownMenuProps {
  trigger: ReactNode
  items: DropdownMenuItem[]
  align?: 'start' | 'end'
  label?: string
  className?: string
}

export function DropdownMenu({
  trigger,
  items,
  align = 'end',
  label = 'Actions',
  className = '',
}: DropdownMenuProps) {
  const reactId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const actionable = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => !item.separator && !item.disabled)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    setActiveIndex(actionable[0]?.index ?? 0)
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  function move(delta: number) {
    if (actionable.length === 0) return
    const position = actionable.findIndex(({ index }) => index === activeIndex)
    const start = position >= 0 ? position : 0
    const next = (start + delta + actionable.length) % actionable.length
    setActiveIndex(actionable[next]?.index ?? 0)
  }

  function onMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      move(1)
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      move(-1)
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      const target = items[activeIndex]
      if (target && !target.disabled && !target.separator) {
        target.onSelect?.()
        setOpen(false)
      }
    }
  }

  return (
    <div ref={rootRef} className={`dropdown ${open ? 'dropdown--open' : ''} ${className}`.trim()}>
      <div
        className="dropdown__trigger"
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setOpen(true)
          }
        }}
      >
        {trigger}
      </div>

      {open ? (
        <div
          className={`dropdown__menu dropdown__menu--${align}`}
          role="menu"
          aria-label={label}
          tabIndex={-1}
          ref={(node) => node?.focus()}
          onKeyDown={onMenuKeyDown}
        >
          {items.map((item, index) => {
            if (item.separator) {
              return <div key={item.id} className="dropdown__separator" role="separator" />
            }

            const isActive = index === activeIndex
            return (
              <button
                key={item.id}
                type="button"
                id={`${reactId}-item-${item.id}`}
                role="menuitem"
                disabled={item.disabled}
                className={`dropdown__item ${item.danger ? 'dropdown__item--danger' : ''} ${isActive ? 'dropdown__item--active' : ''}`}
                onMouseEnter={() => {
                  if (!item.disabled) setActiveIndex(index)
                }}
                onClick={() => {
                  if (item.disabled) return
                  item.onSelect?.()
                  setOpen(false)
                }}
              >
                {item.icon ? <span className="dropdown__icon">{item.icon}</span> : null}
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
