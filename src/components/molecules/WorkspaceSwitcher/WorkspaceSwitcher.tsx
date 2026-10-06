import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { Text } from '../../atoms/Text'
import './WorkspaceSwitcher.css'

export interface WorkspaceSwitcherProps {
  name: string
  mark?: ReactNode
  subtitle?: string
  onClick?: () => void
  className?: string
}

export function WorkspaceSwitcher({
  name,
  mark,
  subtitle,
  onClick,
  className = '',
}: WorkspaceSwitcherProps) {
  const Tag = onClick ? 'button' : 'div'

  return (
    <Tag
      type={onClick ? 'button' : undefined}
      className={`workspace-switcher ${onClick ? 'workspace-switcher--interactive' : ''} ${className}`.trim()}
      onClick={onClick}
    >
      <span className="workspace-switcher__mark" aria-hidden>
        {mark ?? <span className="workspace-switcher__mark-fallback" />}
      </span>
      <span className="workspace-switcher__meta">
        <Text as="span" variant="bodySemibold" className="workspace-switcher__name">
          {name}
        </Text>
        {subtitle ? (
          <Text as="span" variant="muted" className="workspace-switcher__subtitle">
            {subtitle}
          </Text>
        ) : null}
      </span>
      {onClick ? <ChevronDown size={16} className="workspace-switcher__caret" aria-hidden /> : null}
    </Tag>
  )
}
