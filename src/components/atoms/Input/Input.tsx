import type { InputHTMLAttributes } from 'react'
import './Input.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean
}

export function Input({ invalid = false, className = '', ...props }: InputProps) {
  return (
    <input
      className={`input ${invalid ? 'input--invalid' : ''} ${className}`.trim()}
      aria-invalid={invalid || undefined}
      {...props}
    />
  )
}
