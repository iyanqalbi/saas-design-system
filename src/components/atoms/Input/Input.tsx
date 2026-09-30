import type { InputHTMLAttributes } from 'react'
import './Input.css'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  invalid?: boolean
  size?: InputSize
}

export function Input({
  invalid = false,
  size = 'md',
  className = '',
  ...props
}: InputProps) {
  return (
    <input
      className={`input input--${size} ${invalid ? 'input--invalid' : ''} ${className}`.trim()}
      aria-invalid={invalid || undefined}
      {...props}
    />
  )
}
