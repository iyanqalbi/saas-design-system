import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react'
import type { DropdownMenuItem } from '../DropdownMenu'
import './ContextMenu.css'

export type ContextMenuItem = DropdownMenuItem

export interface ContextMenuProps {
  children: ReactNode
  items: ContextMenuItem[]
  label?: string
  className?: string
}

export function ContextMenu({
  children,
  items,
  label = 'Context menu',
  className = '',
}: ContextMenuProps) {
  const reactId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [activeIndex, setActiveIndex] = useState(0)

  const actionable = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => !item.separator && !item.disabled)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: globalThis.MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onScroll = () => setOpen(false)

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('scroll', onScroll, true)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('scroll', onScroll, true)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    setActiveIndex(actionable[0]?.index ?? 0)
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  function onContextMenu(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault()
    const bounds = rootRef.current?.getBoundingClientRect()
    const x = event.clientX - (bounds?.left ?? 0)
    const y = event.clientY - (bounds?.top ?? 0)
    setCoords({ x, y })
    setOpen(true)
  }

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
    <div
      ref={rootRef}
      className={`context-menu ${open ? 'context-menu--open' : ''} ${className}`.trim()}
      onContextMenu={onContextMenu}
    >
      {children}
      {open ? (
        <div
          className="context-menu__menu"
          role="menu"
          aria-label={label}
          tabIndex={-1}
          style={{ left: coords.x, top: coords.y }}
          ref={(node) => node?.focus()}
          onKeyDown={onMenuKeyDown}
        >
          {items.map((item, index) => {
            if (item.separator) {
              return <div key={item.id} className="context-menu__separator" role="separator" />
            }

            const isActive = index === activeIndex
            return (
              <button
                key={item.id}
                type="button"
                id={`${reactId}-item-${item.id}`}
                role="menuitem"
                disabled={item.disabled}
                className={`context-menu__item ${item.danger ? 'context-menu__item--danger' : ''} ${isActive ? 'context-menu__item--active' : ''}`}
                onMouseEnter={() => {
                  if (!item.disabled) setActiveIndex(index)
                }}
                onClick={() => {
                  if (item.disabled) return
                  item.onSelect?.()
                  setOpen(false)
                }}
              >
                {item.icon ? <span className="context-menu__icon">{item.icon}</span> : null}
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
