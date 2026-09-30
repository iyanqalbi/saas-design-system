import type { HTMLAttributes, ReactNode } from 'react'
import './Card.css'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div className={`card ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ className = '', children, ...props }: CardProps) {
  return (
    <div className={`card__header ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className = '', children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={`card__title ${className}`.trim()} {...props}>
      {children}
    </h3>
  )
}

export function CardDescription({ className = '', children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`card__description ${className}`.trim()} {...props}>
      {children}
    </p>
  )
}

export function CardAction({ className = '', children, ...props }: CardProps) {
  return (
    <div className={`card__action ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}

export function CardContent({ className = '', children, ...props }: CardProps) {
  return (
    <div className={`card__content ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ className = '', children, ...props }: CardProps) {
  return (
    <div className={`card__footer ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}
