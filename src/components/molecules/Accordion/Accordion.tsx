import { ChevronDown } from 'lucide-react'
import { useId, useState, type ReactNode } from 'react'
import './Accordion.css'

export interface AccordionItem {
  id: string
  title: string
  content: ReactNode
  defaultOpen?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  type?: 'single' | 'multiple'
  className?: string
}

export function Accordion({ items, type = 'single', className = '' }: AccordionProps) {
  const reactId = useId()
  const [openIds, setOpenIds] = useState<string[]>(() =>
    items.filter((item) => item.defaultOpen).map((item) => item.id),
  )

  function toggle(id: string) {
    setOpenIds((current) => {
      const isOpen = current.includes(id)
      if (type === 'single') return isOpen ? [] : [id]
      return isOpen ? current.filter((value) => value !== id) : [...current, id]
    })
  }

  return (
    <div className={`accordion ${className}`.trim()}>
      {items.map((item) => {
        const open = openIds.includes(item.id)
        const triggerId = `${reactId}-trigger-${item.id}`
        const panelId = `${reactId}-panel-${item.id}`
        return (
          <div key={item.id} className={`accordion__item ${open ? 'accordion__item--open' : ''}`}>
            <button
              type="button"
              id={triggerId}
              className="accordion__trigger"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => toggle(item.id)}
            >
              <span>{item.title}</span>
              <ChevronDown size={16} className="accordion__chevron" aria-hidden />
            </button>
            {open ? (
              <div id={panelId} role="region" aria-labelledby={triggerId} className="accordion__panel">
                {item.content}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
