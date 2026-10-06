import type { HTMLAttributes, ReactNode } from 'react'
import './Kbd.css'

export type KbdSize = 'sm' | 'md'

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  size?: KbdSize
}

export function Kbd({ children, size = 'md', className = '', ...props }: KbdProps) {
  return (
    <kbd className={`kbd kbd--${size} ${className}`.trim()} {...props}>
      {children}
    </kbd>
  )
}
