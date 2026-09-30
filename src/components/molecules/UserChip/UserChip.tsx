import { ChevronDown } from 'lucide-react'
import { Avatar } from '../../atoms/Avatar'
import { Text } from '../../atoms/Text'
import './UserChip.css'

export interface UserChipProps {
  name: string
  role?: string
  src?: string
  onClick?: () => void
  className?: string
}

export function UserChip({ name, role, src, onClick, className = '' }: UserChipProps) {
  const Tag = onClick ? 'button' : 'div'

  return (
    <Tag
      type={onClick ? 'button' : undefined}
      className={`user-chip ${onClick ? 'user-chip--interactive' : ''} ${className}`.trim()}
      onClick={onClick}
    >
      <Avatar name={name} src={src} size="sm" />
      <span className="user-chip__meta">
        <Text as="span" variant="bodyMedium">
          {name}
        </Text>
        {role ? (
          <Text as="span" variant="muted" className="user-chip__role">
            {role}
          </Text>
        ) : null}
      </span>
      {onClick ? <ChevronDown size={16} className="user-chip__caret" aria-hidden /> : null}
    </Tag>
  )
}
