import { Avatar } from '../../atoms/Avatar'
import './AvatarGroup.css'

export interface AvatarGroupItem {
  name: string
  src?: string
}

export interface AvatarGroupProps {
  items: AvatarGroupItem[]
  max?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function AvatarGroup({
  items,
  max = 4,
  size = 'md',
  className = '',
}: AvatarGroupProps) {
  const visible = items.slice(0, max)
  const overflow = Math.max(items.length - max, 0)

  return (
    <div className={`avatar-group avatar-group--${size} ${className}`.trim()} role="list">
      {visible.map((item) => (
        <span key={item.name} className="avatar-group__item" role="listitem">
          <Avatar name={item.name} src={item.src} size={size} />
        </span>
      ))}
      {overflow > 0 ? (
        <span className={`avatar-group__overflow avatar-group__overflow--${size}`} role="listitem">
          +{overflow}
        </span>
      ) : null}
    </div>
  )
}
