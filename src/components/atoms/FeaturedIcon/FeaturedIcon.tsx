import type { HTMLAttributes, ReactNode } from 'react'
import './FeaturedIcon.css'

export type FeaturedIconTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info'
export type FeaturedIconSize = 'sm' | 'md' | 'lg' | 'xl'
export type FeaturedIconShape = 'rounded' | 'square' | 'circle'

export interface FeaturedIconProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  tone?: FeaturedIconTone
  size?: FeaturedIconSize
  shape?: FeaturedIconShape
}

export function FeaturedIcon({
  children,
  tone = 'neutral',
  size = 'md',
  shape = 'rounded',
  className = '',
  ...props
}: FeaturedIconProps) {
  return (
    <span
      className={`featured-icon featured-icon--${tone} featured-icon--${size} featured-icon--${shape} ${className}`.trim()}
      aria-hidden={props['aria-label'] ? undefined : true}
      {...props}
    >
      {children}
    </span>
  )
}
