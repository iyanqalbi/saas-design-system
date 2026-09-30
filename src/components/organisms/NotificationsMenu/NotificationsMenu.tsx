import { Bell } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Avatar } from '../../atoms/Avatar'
import { IconButton } from '../../atoms/IconButton'
import { Text } from '../../atoms/Text'
import { StatusChip } from '../../atoms/StatusChip'
import './NotificationsMenu.css'

export interface NotificationItem {
  id: string
  title: string
  description: string
  time: string
  unread?: boolean
  actor?: string
}

export interface NotificationsMenuProps {
  items: NotificationItem[]
  unreadCount?: number
  onItemClick?: (id: string) => void
  onViewAll?: () => void
  className?: string
}

export function NotificationsMenu({
  items,
  unreadCount,
  onItemClick,
  onViewAll,
  className = '',
}: NotificationsMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const count = unreadCount ?? items.filter((item) => item.unread).length

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

  return (
    <div ref={rootRef} className={`notifications-menu ${className}`.trim()}>
      <div className="notifications-menu__trigger">
        <IconButton
          label="Notifications"
          tone="subtle"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
        >
          <Bell size={16} />
        </IconButton>
        {count > 0 ? <span className="notifications-menu__badge">{count > 9 ? '9+' : count}</span> : null}
      </div>

      {open ? (
        <div className="notifications-menu__panel" role="menu" aria-label="Notifications">
          <div className="notifications-menu__header">
            <Text as="p" variant="bodySemibold">
              Notifications
            </Text>
            {count > 0 ? <StatusChip tone="accent">{count} new</StatusChip> : null}
          </div>
          <ul className="notifications-menu__list">
            {items.length === 0 ? (
              <li className="notifications-menu__empty">
                <Text as="p" variant="muted">
                  You're all caught up.
                </Text>
              </li>
            ) : (
              items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`notifications-menu__item ${item.unread ? 'notifications-menu__item--unread' : ''}`}
                    role="menuitem"
                    onClick={() => {
                      onItemClick?.(item.id)
                      setOpen(false)
                    }}
                  >
                    {item.actor ? (
                      <Avatar name={item.actor} size="sm" />
                    ) : (
                      <span className="notifications-menu__dot" aria-hidden />
                    )}
                    <span className="notifications-menu__copy">
                      <Text as="span" variant="bodyMedium">
                        {item.title}
                      </Text>
                      <Text as="span" variant="muted" className="notifications-menu__description">
                        {item.description}
                      </Text>
                      <Text as="span" variant="caption" className="notifications-menu__time">
                        {item.time}
                      </Text>
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
          {onViewAll ? (
            <button type="button" className="notifications-menu__footer" onClick={onViewAll}>
              View all
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
