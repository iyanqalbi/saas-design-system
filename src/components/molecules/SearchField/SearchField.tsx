import { Search } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'
import { Input, type InputSize } from '../../atoms/Input'
import './SearchField.css'

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
  size?: InputSize
  invalid?: boolean
}

export function SearchField({
  label = 'Search',
  size = 'md',
  invalid = false,
  className = '',
  ...props
}: SearchFieldProps) {
  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 18 : 16

  return (
    <label className={`search-field search-field--${size} ${className}`.trim()}>
      <span className="search-field__icon" aria-hidden="true">
        <Search size={iconSize} strokeWidth={2} />
      </span>
      <span className="visually-hidden">{label}</span>
      <Input
        type="search"
        size={size}
        invalid={invalid}
        className="search-field__input"
        placeholder={props.placeholder ?? 'Search…'}
        {...props}
      />
    </label>
  )
}
