import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { IconButton } from '../../atoms/IconButton'
import './DatePicker.css'

export interface DatePickerProps {
  label?: string
  value?: string
  defaultValue?: string
  placeholder?: string
  onValueChange?: (value: string) => void
  className?: string
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function toISODate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function parseISODate(value: string) {
  if (!value) return null
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return null
  return new Date(year, month - 1, day)
}

function formatDisplay(value: string) {
  const date = parseISODate(value)
  if (!date) return ''
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function buildCalendarDays(month: Date) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const start = new Date(first)
  start.setDate(first.getDate() - first.getDay())

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    return date
  })
}

export function DatePicker({
  label,
  value,
  defaultValue = '',
  placeholder = 'Pick a date',
  onValueChange,
  className = '',
}: DatePickerProps) {
  const reactId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [internal, setInternal] = useState(defaultValue)
  const current = value ?? internal
  const selectedDate = parseISODate(current)
  const [viewMonth, setViewMonth] = useState(
    () => selectedDate ?? new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  )

  const days = useMemo(() => buildCalendarDays(viewMonth), [viewMonth])

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function commit(date: Date) {
    const next = toISODate(date)
    if (value === undefined) setInternal(next)
    onValueChange?.(next)
    setOpen(false)
  }

  const monthLabel = viewMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <div ref={rootRef} className={`datepicker ${open ? 'datepicker--open' : ''} ${className}`.trim()}>
      {label ? (
        <label className="datepicker__label" htmlFor={`${reactId}-trigger`}>
          {label}
        </label>
      ) : null}

      <button
        type="button"
        id={`${reactId}-trigger`}
        className="datepicker__trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={current ? 'datepicker__value' : 'datepicker__placeholder'}>
          {current ? formatDisplay(current) : placeholder}
        </span>
        <Calendar size={16} aria-hidden />
      </button>

      {open ? (
        <div className="datepicker__panel" role="dialog" aria-label={label ?? 'Choose date'}>
          <div className="datepicker__header">
            <IconButton
              label="Previous month"
              size="sm"
              tone="subtle"
              onClick={() =>
                setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))
              }
            >
              <ChevronLeft size={16} />
            </IconButton>
            <span className="datepicker__month">{monthLabel}</span>
            <IconButton
              label="Next month"
              size="sm"
              tone="subtle"
              onClick={() =>
                setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))
              }
            >
              <ChevronRight size={16} />
            </IconButton>
          </div>

          <div className="datepicker__weekdays">
            {WEEKDAYS.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="datepicker__grid">
            {days.map((date) => {
              const iso = toISODate(date)
              const inMonth = date.getMonth() === viewMonth.getMonth()
              const selected = current === iso
              const today = toISODate(new Date()) === iso
              return (
                <button
                  key={iso + String(inMonth)}
                  type="button"
                  className={`datepicker__day ${inMonth ? '' : 'datepicker__day--muted'} ${selected ? 'datepicker__day--selected' : ''} ${today ? 'datepicker__day--today' : ''}`}
                  onClick={() => commit(date)}
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
