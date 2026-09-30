import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './IconButton.css'

export type IconButtonSize = 'sm' | 'md' | 'lg'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  size?: IconButtonSize
  tone?: 'subtle' | 'white' | 'ghost'
  loading?: boolean
  children: ReactNode
}

export function IconButton({
  label,
  size = 'md',
  tone = 'subtle',
  loading = false,
  className = '',
  children,
  type = 'button',
  disabled,
  ...props
}: IconButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={`icon-btn icon-btn--${size} icon-btn--${tone} ${loading ? 'icon-btn--loading' : ''} ${className}`.trim()}
      {...props}
    >
      {loading ? <span className="icon-btn__spinner" aria-hidden="true" /> : children}
    </button>
  )
}
