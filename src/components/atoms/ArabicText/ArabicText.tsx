import type { HTMLAttributes, ReactNode } from 'react'
import './ArabicText.css'

export type ArabicTextSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ArabicTextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: ArabicTextSize
  children: ReactNode
}

export function ArabicText({
  size = 'lg',
  className = '',
  children,
  ...props
}: ArabicTextProps) {
  return (
    <p
      className={`arabic-text arabic-text--${size} ${className}`.trim()}
      dir="rtl"
      lang="ar"
      {...props}
    >
      {children}
    </p>
  )
}
