import { Check, ChevronDown } from 'lucide-react'
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import './Select.css'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  defaultValue?: string
  placeholder?: string
  label?: string
  disabled?: boolean
  invalid?: boolean
  size?: 'sm' | 'md' | 'lg'
  onValueChange?: (value: string) => void
  className?: string
  id?: string
}

export function Select({
  options,
  value,
  defaultValue = '',
  placeholder = 'Select…',
  label,
  disabled = false,
  invalid = false,
  size = 'md',
  onValueChange,
  className = '',
  id,
}: SelectProps) {
  const reactId = useId()
  const triggerId = id ?? `${reactId}-trigger`
  const listboxId = `${reactId}-listbox`
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [internal, setInternal] = useState(defaultValue)
  const [activeIndex, setActiveIndex] = useState(0)
  const current = value ?? internal
  const selected = options.find((option) => option.value === current)

  const enabledIndexes = options
    .map((option, index) => ({ option, index }))
    .filter(({ option }) => !option.disabled)
    .map(({ index }) => index)

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
    const enabled = options
      .map((option, index) => ({ option, index }))
      .filter(({ option }) => !option.disabled)
      .map(({ index }) => index)
    const selectedIndex = options.findIndex((option) => option.value === current && !option.disabled)
    const fallback = enabled[0] ?? 0
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : fallback)
  }, [open, current, options])

  function commit(next: string) {
    if (value === undefined) setInternal(next)
    onValueChange?.(next)
    setOpen(false)
  }

  function moveActive(delta: number) {
    if (enabledIndexes.length === 0) return
    const position = enabledIndexes.indexOf(activeIndex)
    const start = position >= 0 ? position : 0
    const nextPos = (start + delta + enabledIndexes.length) % enabledIndexes.length
    setActiveIndex(enabledIndexes[nextPos] ?? 0)
  }

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return

    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setOpen(true)
    }
  }

  function onListKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      moveActive(1)
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      moveActive(-1)
    }
    if (event.key === 'Home') {
      event.preventDefault()
      setActiveIndex(enabledIndexes[0] ?? 0)
    }
    if (event.key === 'End') {
      event.preventDefault()
      setActiveIndex(enabledIndexes[enabledIndexes.length - 1] ?? 0)
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      const option = options[activeIndex]
      if (option && !option.disabled) commit(option.value)
    }
  }

  return (
    <div
      ref={rootRef}
      className={`select select--${size} ${open ? 'select--open' : ''} ${disabled ? 'select--disabled' : ''} ${className}`.trim()}
    >
      {label ? (
        <label className="select__label" htmlFor={triggerId}>
          {label}
        </label>
      ) : null}

      <button
        type="button"
        id={triggerId}
        className={`select__trigger ${invalid ? 'select__trigger--invalid' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={onTriggerKeyDown}
      >
        <span className={selected ? 'select__value' : 'select__placeholder'}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown size={16} className="select__chevron" aria-hidden />
      </button>

      {open ? (
        <ul
          id={listboxId}
          className="select__list"
          role="listbox"
          aria-labelledby={triggerId}
          tabIndex={-1}
          onKeyDown={onListKeyDown}
          ref={(node) => node?.focus()}
        >
          {options.map((option, index) => {
            const isSelected = option.value === current
            const isActive = index === activeIndex
            return (
              <li
                key={option.value}
                id={`${reactId}-option-${option.value}`}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled || undefined}
                className={`select__option ${isSelected ? 'select__option--selected' : ''} ${isActive ? 'select__option--active' : ''} ${option.disabled ? 'select__option--disabled' : ''}`}
                onMouseEnter={() => {
                  if (!option.disabled) setActiveIndex(index)
                }}
                onClick={() => {
                  if (!option.disabled) commit(option.value)
                }}
              >
                <span>{option.label}</span>
                {isSelected ? <Check size={14} aria-hidden /> : null}
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
