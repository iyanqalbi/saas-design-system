import { X } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { IconButton } from '../../atoms/IconButton'
import { Text } from '../../atoms/Text'
import './Drawer.css'

export interface DrawerProps {
  open: boolean
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  side?: 'right' | 'left'
  onClose: () => void
  className?: string
}

export function Drawer({
  open,
  title,
  description,
  children,
  footer,
  side = 'right',
  onClose,
  className = '',
}: DrawerProps) {
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div className={`drawer drawer--${side} ${className}`.trim()} role="presentation">
      <button type="button" className="drawer__backdrop" aria-label="Close drawer" onClick={onClose} />
      <aside className="drawer__panel" role="dialog" aria-modal="true" aria-label={title}>
        <header className="drawer__header">
          <div>
            <Text as="h2" variant="headingSm">
              {title}
            </Text>
            {description ? (
              <Text as="p" variant="muted" className="drawer__description">
                {description}
              </Text>
            ) : null}
          </div>
          <IconButton label="Close" size="sm" tone="ghost" onClick={onClose}>
            <X size={16} />
          </IconButton>
        </header>
        <div className="drawer__body">{children}</div>
        {footer ? <footer className="drawer__footer">{footer}</footer> : null}
      </aside>
    </div>,
    document.body,
  )
}
