import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './IconButton.css'

export type IconButtonSize = 'sm' | 'md' | 'lg'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  size?: IconButtonSize
  tone?: 'subtle' | 'white' | 'ghost'
  children: ReactNode
}

export function IconButton({
  label,
  size = 'md',
  tone = 'subtle',
  className = '',
  children,
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={`icon-btn icon-btn--${size} icon-btn--${tone} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
