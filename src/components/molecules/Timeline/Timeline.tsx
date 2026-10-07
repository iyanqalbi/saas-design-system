import { Check, Clock } from 'lucide-react'
import type { ReactNode } from 'react'
import './Timeline.css'

export type TimelineItemStatus = 'complete' | 'current' | 'upcoming'

export interface TimelineItem {
  id: string
  title: string
  description?: string
  timestamp: string
  status?: TimelineItemStatus
  icon?: ReactNode
}

export interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

function DefaultIcon({ status }: { status: TimelineItemStatus }) {
  if (status === 'complete') {
    return <Check size={14} strokeWidth={2.75} aria-hidden="true" />
  }
  return <Clock size={14} strokeWidth={2.25} aria-hidden="true" />
}

export function Timeline({ items, className = '' }: TimelineProps) {
  return (
    <ol className={`timeline ${className}`.trim()}>
      {items.map((item, index) => {
        const status = item.status ?? 'upcoming'
        const isLast = index === items.length - 1

        return (
          <li
            key={item.id}
            className={`timeline__item timeline__item--${status}`}
            aria-current={status === 'current' ? 'step' : undefined}
          >
            <div className="timeline__rail" aria-hidden="true">
              <span className="timeline__marker">{item.icon ?? <DefaultIcon status={status} />}</span>
              {!isLast ? <span className="timeline__connector" /> : null}
            </div>
            <div className="timeline__content">
              <time className="timeline__timestamp" dateTime={item.timestamp}>
                {item.timestamp}
              </time>
              <h3 className="timeline__title">{item.title}</h3>
              {item.description ? (
                <p className="timeline__description">{item.description}</p>
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
