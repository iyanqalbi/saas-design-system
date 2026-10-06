import type { HTMLAttributes, ReactNode } from 'react'
import './ButtonGroup.css'

export type ButtonGroupSize = 'sm' | 'md' | 'lg'

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  size?: ButtonGroupSize
  attached?: boolean
  fullWidth?: boolean
}

export function ButtonGroup({
  children,
  size = 'md',
  attached = false,
  fullWidth = false,
  className = '',
  ...props
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      className={`button-group button-group--${size} ${attached ? 'button-group--attached' : ''} ${fullWidth ? 'button-group--full' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  )
}
