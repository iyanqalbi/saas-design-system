import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Breadcrumb.css'

export interface BreadcrumbItem {
  label: string
  to?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`breadcrumb ${className}`.trim()}>
      <ol className="breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="breadcrumb__item">
              {index > 0 ? (
                <ChevronRight className="breadcrumb__sep" size={14} strokeWidth={2} aria-hidden />
              ) : null}
              {item.to && !isLast ? (
                <Link to={item.to} className="breadcrumb__link">
                  {item.label}
                </Link>
              ) : (
                <span className="breadcrumb__current" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
