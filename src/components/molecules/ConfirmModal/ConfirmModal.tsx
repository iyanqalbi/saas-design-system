import { AlertTriangle, X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '../../atoms/Button'
import { IconButton } from '../../atoms/IconButton'
import { Text } from '../../atoms/Text'
import './ConfirmModal.css'

export type ConfirmModalTone = 'default' | 'danger'

export interface ConfirmModalProps {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  tone?: ConfirmModalTone
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
  className?: string
}

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'default',
  loading = false,
  onConfirm,
  onCancel,
  className = '',
}: ConfirmModalProps) {
  const titleId = useId()
  const descriptionId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !loading) onCancel()
    }

    window.addEventListener('keydown', onKeyDown)
    dialogRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, loading, onCancel])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div className="confirm-modal" role="presentation">
      <button
        type="button"
        className="confirm-modal__backdrop"
        aria-label="Close dialog"
        disabled={loading}
        onClick={onCancel}
      />
      <div
        ref={dialogRef}
        className={`confirm-modal__dialog ${className}`.trim()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
      >
        <div className="confirm-modal__header">
          <span
            className={`confirm-modal__icon confirm-modal__icon--${tone}`}
            aria-hidden="true"
          >
            <AlertTriangle size={18} strokeWidth={2} />
          </span>
          <IconButton
            label="Close"
            size="sm"
            tone="ghost"
            onClick={onCancel}
            disabled={loading}
          >
            <X size={16} />
          </IconButton>
        </div>

        <div className="confirm-modal__content">
          <Text as="h2" variant="headingSm" id={titleId}>
            {title}
          </Text>
          <Text as="p" variant="muted" id={descriptionId}>
            {description}
          </Text>
        </div>

        <div className="confirm-modal__actions">
          <Button variant="ghost" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={tone === 'danger' ? 'accent' : 'inverse'}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Working…' : confirmLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
