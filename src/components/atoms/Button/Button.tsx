import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

export type ButtonVariant = 'inverse' | 'ghost' | 'accent' | 'subtle'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
  loading?: boolean
}

export function Button({
  variant = 'inverse',
  size = 'md',
  leftIcon,
  rightIcon,
  fullWidth = false,
  loading = false,
  className = '',
  children,
  type = 'button',
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full' : ''} ${loading ? 'btn--loading' : ''} ${className}`.trim()}
      {...props}
    >
      {loading ? (
        <span className="btn__spinner" aria-hidden="true" />
      ) : leftIcon ? (
        <span className="btn__icon">{leftIcon}</span>
      ) : null}
      <span className="btn__label">{children}</span>
      {!loading && rightIcon ? <span className="btn__icon">{rightIcon}</span> : null}
    </button>
  )
}
