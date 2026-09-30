import { Avatar } from '../../atoms/Avatar'
import { Text } from '../../atoms/Text'
import './ActivityFeed.css'

export interface ActivityItem {
  id: string
  actor: string
  action: string
  time: string
}

export interface ActivityFeedProps {
  items?: ActivityItem[]
  className?: string
}

const defaultItems: ActivityItem[] = [
  {
    id: '1',
    actor: 'Jordan Lee',
    action: 'upgraded Acme Corp to Growth',
    time: '2m ago',
  },
  {
    id: '2',
    actor: 'Priya Shah',
    action: 'invited 4 teammates to Billing',
    time: '18m ago',
  },
  {
    id: '3',
    actor: 'System',
    action: 'reconciled Stripe webhook batch #4821',
    time: '1h ago',
  },
  {
    id: '4',
    actor: 'Noah Kim',
    action: 'closed support ticket #1904',
    time: '3h ago',
  },
]

export function ActivityFeed({ items = defaultItems, className = '' }: ActivityFeedProps) {
  return (
    <section className={`activity-feed ${className}`.trim()}>
      <div className="activity-feed__header">
        <Text as="h3" variant="bodySemibold">
          Activity
        </Text>
        <Text as="p" variant="muted">
          Live workspace events
        </Text>
      </div>
      <ul className="activity-feed__list">
        {items.map((item) => (
          <li key={item.id} className="activity-feed__item">
            <Avatar name={item.actor} size="sm" />
            <div className="activity-feed__copy">
              <Text as="p" variant="body">
                <strong>{item.actor}</strong> {item.action}
              </Text>
              <Text as="p" variant="muted" className="activity-feed__time">
                {item.time}
              </Text>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
