import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import './Popover.css'

export interface PopoverProps {
  trigger: ReactNode
  children: ReactNode
  title?: string
  align?: 'start' | 'end'
  className?: string
}

export function Popover({
  trigger,
  children,
  title,
  align = 'start',
  className = '',
}: PopoverProps) {
  const reactId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className={`popover ${open ? 'popover--open' : ''} ${className}`.trim()}>
      <div
        className="popover__trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={`${reactId}-content`}
      >
        {trigger}
      </div>
      {open ? (
        <div
          id={`${reactId}-content`}
          role="dialog"
          aria-label={title}
          className={`popover__content popover__content--${align}`}
        >
          {title ? <div className="popover__title">{title}</div> : null}
          <div className="popover__body">{children}</div>
        </div>
      ) : null}
    </div>
  )
}
