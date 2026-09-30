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
}

export function Button({
  variant = 'inverse',
  size = 'md',
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full' : ''} ${className}`.trim()}
      {...props}
    >
      {leftIcon ? <span className="btn__icon">{leftIcon}</span> : null}
      <span className="btn__label">{children}</span>
      {rightIcon ? <span className="btn__icon">{rightIcon}</span> : null}
    </button>
  )
}
