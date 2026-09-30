import { Search, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '../../atoms/Button'
import { Input } from '../../atoms/Input'
import './FilterBar.css'

export interface FilterBarProps {
  searchValue?: string
  searchPlaceholder?: string
  onSearchChange?: (value: string) => void
  filters?: ReactNode
  onClear?: () => void
  clearLabel?: string
  className?: string
}

export function FilterBar({
  searchValue = '',
  searchPlaceholder = 'Search…',
  onSearchChange,
  filters,
  onClear,
  clearLabel = 'Clear',
  className = '',
}: FilterBarProps) {
  return (
    <div className={`filter-bar ${className}`.trim()}>
      <label className="filter-bar__search">
        <Search size={16} aria-hidden className="filter-bar__search-icon" />
        <span className="visually-hidden">Search</span>
        <Input
          type="search"
          value={searchValue}
          placeholder={searchPlaceholder}
          className="filter-bar__search-input"
          onChange={(event) => onSearchChange?.(event.target.value)}
        />
      </label>

      {filters ? <div className="filter-bar__filters">{filters}</div> : null}

      {onClear ? (
        <Button size="sm" variant="ghost" leftIcon={<X size={14} />} onClick={onClear}>
          {clearLabel}
        </Button>
      ) : null}
    </div>
  )
}
