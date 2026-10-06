import type { HTMLAttributes } from 'react'
import './RoleBadge.css'

export type RoleBadgeRole = 'admin' | 'editor' | 'viewer' | 'owner' | 'member' | 'guest'
export type RoleBadgeSize = 'sm' | 'md'

const ROLE_LABEL: Record<RoleBadgeRole, string> = {
  admin: 'Admin',
  editor: 'Editor',
  viewer: 'Viewer',
  owner: 'Owner',
  member: 'Member',
  guest: 'Guest',
}

export interface RoleBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  role?: RoleBadgeRole
  size?: RoleBadgeSize
  label?: string
}

export function RoleBadge({
  role = 'member',
  size = 'md',
  label,
  className = '',
  ...props
}: RoleBadgeProps) {
  return (
    <span
      className={`role-badge role-badge--${role} role-badge--${size} ${className}`.trim()}
      {...props}
    >
      {label ?? ROLE_LABEL[role]}
    </span>
  )
}
