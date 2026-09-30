import type { TextareaHTMLAttributes } from 'react'
import './Textarea.css'

export type TextareaSize = 'sm' | 'md' | 'lg'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean
  size?: TextareaSize
}

export function Textarea({
  invalid = false,
  size = 'md',
  className = '',
  ...props
}: TextareaProps) {
  return (
    <textarea
      className={`textarea textarea--${size} ${invalid ? 'textarea--invalid' : ''} ${className}`.trim()}
      aria-invalid={invalid || undefined}
      {...props}
    />
  )
}
