import { ChevronLeft, ChevronRight } from 'lucide-react'
import { IconButton } from '../../atoms/IconButton'
import { Text } from '../../atoms/Text'
import './Pagination.css'

export interface PaginationProps {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  className?: string
}

function buildPages(page: number, pageCount: number) {
  if (pageCount <= 5) {
    return Array.from({ length: pageCount }, (_, index) => index + 1)
  }

  const pages = new Set<number>([1, pageCount, page, page - 1, page + 1])
  return Array.from(pages)
    .filter((value) => value >= 1 && value <= pageCount)
    .sort((a, b) => a - b)
}

export function Pagination({ page, pageCount, onPageChange, className = '' }: PaginationProps) {
  const pages = buildPages(page, pageCount)

  return (
    <nav className={`pagination ${className}`.trim()} aria-label="Pagination">
      <IconButton
        label="Previous page"
        size="sm"
        tone="subtle"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft size={16} />
      </IconButton>

      <div className="pagination__pages">
        {pages.map((item, index) => {
          const prev = pages[index - 1]
          const showEllipsis = prev !== undefined && item - prev > 1
          return (
            <span key={item} className="pagination__chunk">
              {showEllipsis ? (
                <Text as="span" variant="muted" className="pagination__ellipsis">
                  …
                </Text>
              ) : null}
              <button
                type="button"
                className={`pagination__page ${item === page ? 'pagination__page--active' : ''}`}
                aria-current={item === page ? 'page' : undefined}
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            </span>
          )
        })}
      </div>

      <IconButton
        label="Next page"
        size="sm"
        tone="subtle"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight size={16} />
      </IconButton>
    </nav>
  )
}
