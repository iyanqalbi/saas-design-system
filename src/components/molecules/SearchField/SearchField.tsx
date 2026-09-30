import { Search } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'
import { Input } from '../../atoms/Input'
import './SearchField.css'

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export function SearchField({ label = 'Search', className = '', ...props }: SearchFieldProps) {
  return (
    <label className={`search-field ${className}`.trim()}>
      <span className="search-field__icon" aria-hidden="true">
        <Search size={16} strokeWidth={2} />
      </span>
      <span className="visually-hidden">{label}</span>
      <Input type="search" className="search-field__input" placeholder={props.placeholder ?? 'Search…'} {...props} />
    </label>
  )
}
