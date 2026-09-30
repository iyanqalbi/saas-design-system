import { Calendar } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Button } from '../../atoms/Button'
import { IconButton } from '../../atoms/IconButton'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './DateRangePicker.css'

export interface DateRange {
  from?: string
  to?: string
}

export interface DateRangePickerProps {
  label?: string
  value?: DateRange
  defaultValue?: DateRange
  placeholder?: string
  onValueChange?: (range: DateRange) => void
  className?: string
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function toISODate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function parseISODate(value?: string) {
  if (!value) return null
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return null
  return new Date(year, month - 1, day)
}

function formatDisplay(value?: string) {
  const date = parseISODate(value)
  if (!date) return ''
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
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

export function DateRangePicker({
  label,
  value,
  defaultValue = {},
  placeholder = 'Select date range',
  onValueChange,
  className = '',
}: DateRangePickerProps) {
  const reactId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [internal, setInternal] = useState<DateRange>(defaultValue)
  const current = value ?? internal
  const [draft, setDraft] = useState<DateRange>(current)
  const [viewMonth, setViewMonth] = useState(() => {
    const from = parseISODate(current.from)
    return from ?? new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  })

  const days = useMemo(() => buildCalendarDays(viewMonth), [viewMonth])

  useEffect(() => {
    if (!open) return
    setDraft(current)
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
  }, [open, current])

  function pick(date: Date) {
    const iso = toISODate(date)
    if (!draft.from || (draft.from && draft.to)) {
      setDraft({ from: iso, to: undefined })
      return
    }
    if (iso < draft.from) {
      setDraft({ from: iso, to: draft.from })
      return
    }
    setDraft({ from: draft.from, to: iso })
  }

  function apply() {
    if (value === undefined) setInternal(draft)
    onValueChange?.(draft)
    setOpen(false)
  }

  const display =
    current.from && current.to
      ? `${formatDisplay(current.from)} – ${formatDisplay(current.to)}`
      : current.from
        ? `${formatDisplay(current.from)} – …`
        : placeholder

  const monthLabel = viewMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div ref={rootRef} className={`daterange ${open ? 'daterange--open' : ''} ${className}`.trim()}>
      {label ? (
        <label className="daterange__label" htmlFor={`${reactId}-trigger`}>
          {label}
        </label>
      ) : null}
      <button
        type="button"
        id={`${reactId}-trigger`}
        className="daterange__trigger"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={current.from ? 'daterange__value' : 'daterange__placeholder'}>{display}</span>
        <Calendar size={16} aria-hidden />
      </button>

      {open ? (
        <div className="daterange__panel" role="dialog" aria-label={label ?? 'Choose date range'}>
          <div className="daterange__header">
            <IconButton
              label="Previous month"
              size="sm"
              tone="subtle"
              onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
            >
              <ChevronLeft size={16} />
            </IconButton>
            <span className="daterange__month">{monthLabel}</span>
            <IconButton
              label="Next month"
              size="sm"
              tone="subtle"
              onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
            >
              <ChevronRight size={16} />
            </IconButton>
          </div>

          <div className="daterange__weekdays">
            {WEEKDAYS.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="daterange__grid">
            {days.map((date) => {
              const iso = toISODate(date)
              const inMonth = date.getMonth() === viewMonth.getMonth()
              const from = draft.from
              const to = draft.to
              const isFrom = from === iso
              const isTo = to === iso
              const inRange = Boolean(from && to && iso > from && iso < to)
              return (
                <button
                  key={iso + String(inMonth)}
                  type="button"
                  className={`daterange__day ${inMonth ? '' : 'daterange__day--muted'} ${isFrom || isTo ? 'daterange__day--selected' : ''} ${inRange ? 'daterange__day--range' : ''}`}
                  onClick={() => pick(date)}
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>

          <div className="daterange__footer">
            <Button size="sm" variant="ghost" onClick={() => setDraft({})}>
              Clear
            </Button>
            <Button size="sm" variant="inverse" onClick={apply} disabled={!draft.from}>
              Apply
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
