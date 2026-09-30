import { Search } from 'lucide-react'
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import './CommandPalette.css'

export interface CommandItem {
  id: string
  label: string
  group?: string
  shortcut?: string
  icon?: ReactNode
  onSelect?: () => void
}

export interface CommandPaletteProps {
  open: boolean
  items: CommandItem[]
  placeholder?: string
  onClose: () => void
  className?: string
}

export function CommandPalette({
  open,
  items,
  placeholder = 'Search commands…',
  onClose,
  className = '',
}: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) || item.group?.toLowerCase().includes(q),
    )
  }, [items, query])

  useEffect(() => {
    if (!open) {
      setQuery('')
      setActiveIndex(0)
      return
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(() => inputRef.current?.focus(), 10)
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previous
      window.clearTimeout(timer)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  function run(item: CommandItem) {
    item.onSelect?.()
    onClose()
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => (filtered.length ? (index + 1) % filtered.length : 0))
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) =>
        filtered.length ? (index - 1 + filtered.length) % filtered.length : 0,
      )
    }
    if (event.key === 'Enter') {
      event.preventDefault()
      const item = filtered[activeIndex]
      if (item) run(item)
    }
  }

  if (!open || typeof document === 'undefined') return null

  const groups = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    const key = item.group ?? 'Commands'
    acc[key] = acc[key] ?? []
    acc[key].push(item)
    return acc
  }, {})

  let runningIndex = -1

  return createPortal(
    <div className={`command-palette ${className}`.trim()} role="presentation">
      <button type="button" className="command-palette__backdrop" aria-label="Close" onClick={onClose} />
      <div className="command-palette__panel" role="dialog" aria-modal="true" aria-label="Command palette">
        <div className="command-palette__search">
          <Search size={16} aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            aria-label="Search commands"
          />
        </div>
        <div className="command-palette__list" role="listbox">
          {filtered.length === 0 ? (
            <p className="command-palette__empty">No results</p>
          ) : (
            Object.entries(groups).map(([group, groupItems]) => (
              <div key={group} className="command-palette__group">
                <p className="command-palette__group-label">{group}</p>
                {groupItems.map((item) => {
                  runningIndex += 1
                  const index = runningIndex
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="option"
                      aria-selected={index === activeIndex}
                      className={`command-palette__item ${index === activeIndex ? 'command-palette__item--active' : ''}`}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => run(item)}
                    >
                      <span className="command-palette__item-main">
                        {item.icon ? <span className="command-palette__icon">{item.icon}</span> : null}
                        <span>{item.label}</span>
                      </span>
                      {item.shortcut ? (
                        <kbd className="command-palette__shortcut">{item.shortcut}</kbd>
                      ) : null}
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
