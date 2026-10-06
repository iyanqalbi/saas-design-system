import { useMemo, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { IconButton } from '../../atoms/IconButton'
import { Text } from '../../atoms/Text'
import { Badge, type BadgeTone } from '../../atoms/Badge'
import './Calendar.css'

export interface CalendarEvent {
  id: string
  title: string
  date: string
  tone?: BadgeTone
}

export interface CalendarProps {
  title?: string
  events?: CalendarEvent[]
  defaultMonth?: Date
  actions?: ReactNode
  onDayClick?: (date: string) => void
  className?: string
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function toISODate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
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

export function Calendar({
  title = 'Calendar',
  events = [],
  defaultMonth,
  actions,
  onDayClick,
  className = '',
}: CalendarProps) {
  const [viewMonth, setViewMonth] = useState(
    () => defaultMonth ?? new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  )

  const days = useMemo(() => buildCalendarDays(viewMonth), [viewMonth])
  const today = toISODate(new Date())

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>()
    for (const event of events) {
      const list = map.get(event.date) ?? []
      list.push(event)
      map.set(event.date, list)
    }
    return map
  }, [events])

  const monthLabel = viewMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <section className={`calendar-board ${className}`.trim()}>
      <div className="calendar-board__header">
        <div className="calendar-board__title-block">
          <Text as="h3" variant="bodySemibold">
            {title}
          </Text>
          <Text as="p" variant="muted" className="calendar-board__month">
            {monthLabel}
          </Text>
        </div>
        <div className="calendar-board__controls">
          {actions}
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
      </div>

      <div className="calendar-board__weekdays">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="calendar-board__grid">
        {days.map((date) => {
          const iso = toISODate(date)
          const inMonth = date.getMonth() === viewMonth.getMonth()
          const dayEvents = eventsByDate.get(iso) ?? []
          const isToday = iso === today

          return (
            <button
              key={iso}
              type="button"
              className={[
                'calendar-board__day',
                inMonth ? '' : 'calendar-board__day--muted',
                isToday ? 'calendar-board__day--today' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onDayClick?.(iso)}
            >
              <span className="calendar-board__date">{date.getDate()}</span>
              {dayEvents.length > 0 ? (
                <span className="calendar-board__events">
                  {dayEvents.slice(0, 2).map((event) => (
                    <Badge key={event.id} size="sm" tone={event.tone ?? 'accent'} className="calendar-board__event">
                      {event.title}
                    </Badge>
                  ))}
                  {dayEvents.length > 2 ? (
                    <span className="calendar-board__more">+{dayEvents.length - 2}</span>
                  ) : null}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </section>
  )
}
