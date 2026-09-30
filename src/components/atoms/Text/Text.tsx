import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import './Text.css'

export type TextVariant =
  | 'display'
  | 'heading'
  | 'headingSm'
  | 'subheading'
  | 'ui'
  | 'body'
  | 'bodyMedium'
  | 'bodySemibold'
  | 'caption'
  | 'muted'

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  variant?: TextVariant
  children: ReactNode
}

export function Text({
  as: Component = 'p',
  variant = 'body',
  className = '',
  children,
  ...props
}: TextProps) {
  return (
    <Component className={`text text--${variant} ${className}`.trim()} {...props}>
      {children}
    </Component>
  )
}
