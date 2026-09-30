import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { IconButton } from '../../atoms/IconButton'
import { Text } from '../../atoms/Text'
import './Toast.css'

export type ToastTone = 'info' | 'success' | 'warning' | 'danger'

export interface ToastProps {
  tone?: ToastTone
  title: string
  description?: string
  onClose?: () => void
  className?: string
}

const icons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  danger: AlertCircle,
}

export function Toast({
  tone = 'info',
  title,
  description,
  onClose,
  className = '',
}: ToastProps) {
  const Icon = icons[tone]

  return (
    <div className={`toast toast--${tone} ${className}`.trim()} role="status">
      <span className="toast__icon" aria-hidden="true">
        <Icon size={18} strokeWidth={2} />
      </span>
      <div className="toast__body">
        <Text as="p" variant="bodySemibold">
          {title}
        </Text>
        {description ? (
          <Text as="p" variant="muted" className="toast__description">
            {description}
          </Text>
        ) : null}
      </div>
      {onClose ? (
        <IconButton label="Dismiss notification" size="sm" tone="ghost" onClick={onClose}>
          <X size={14} />
        </IconButton>
      ) : null}
    </div>
  )
}

export interface ToastViewportProps {
  children: ReactNode
  position?: 'top-right' | 'bottom-right' | 'top-center'
  className?: string
}

export function ToastViewport({
  children,
  position = 'top-right',
  className = '',
}: ToastViewportProps) {
  return (
    <div className={`toast-viewport toast-viewport--${position} ${className}`.trim()}>
      {children}
    </div>
  )
}
