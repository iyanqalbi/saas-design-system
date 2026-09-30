import { X } from 'lucide-react'
import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { IconButton } from '../../atoms/IconButton'
import { Text } from '../../atoms/Text'
import './Dialog.css'

export interface DialogProps {
  open: boolean
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  onClose: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Dialog({
  open,
  title,
  description,
  children,
  footer,
  onClose,
  className = '',
  size = 'md',
}: DialogProps) {
  const titleId = useId()
  const descriptionId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    dialogRef.current?.focus()
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div className="dialog" role="presentation">
      <button type="button" className="dialog__backdrop" aria-label="Close dialog" onClick={onClose} />
      <div
        ref={dialogRef}
        className={`dialog__panel dialog__panel--${size} ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
      >
        <header className="dialog__header">
          <div>
            <Text as="h2" variant="headingSm" id={titleId}>
              {title}
            </Text>
            {description ? (
              <Text as="p" variant="muted" id={descriptionId} className="dialog__description">
                {description}
              </Text>
            ) : null}
          </div>
          <IconButton label="Close" size="sm" tone="ghost" onClick={onClose}>
            <X size={16} />
          </IconButton>
        </header>
        <div className="dialog__body">{children}</div>
        {footer ? <footer className="dialog__footer">{footer}</footer> : null}
      </div>
    </div>,
    document.body,
  )
}
