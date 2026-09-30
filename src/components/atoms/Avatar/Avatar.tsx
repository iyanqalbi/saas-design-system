import './Avatar.css'

export type AvatarSize = 'sm' | 'md' | 'lg'

export interface AvatarProps {
  name: string
  src?: string
  size?: AvatarSize
  className?: string
}

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function Avatar({ name, src, size = 'md', className = '' }: AvatarProps) {
  return (
    <span className={`avatar avatar--${size} ${className}`.trim()} title={name} aria-label={name}>
      {src ? (
        <img src={src} alt="" className="avatar__img" />
      ) : (
        <span className="avatar__fallback">{initials(name)}</span>
      )}
    </span>
  )
}
