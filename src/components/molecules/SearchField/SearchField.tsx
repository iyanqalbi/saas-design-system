import { Search } from 'lucide-react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { Input, type InputSize } from '../../atoms/Input'
import { Kbd } from '../../atoms/Kbd'
import './SearchField.css'

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
  size?: InputSize
  invalid?: boolean
  /** Keyboard shortcut hint shown on the right (e.g. `⌘F` or `/`). */
  shortcut?: ReactNode
}

export function SearchField({
  label = 'Search',
  size = 'md',
  invalid = false,
  shortcut,
  className = '',
  ...props
}: SearchFieldProps) {
  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 18 : 16
  const kbdSize = size === 'lg' ? 'md' : 'sm'

  return (
    <label
      className={`search-field search-field--${size} ${shortcut ? 'search-field--with-shortcut' : ''} ${className}`.trim()}
    >
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
      {shortcut ? (
        <span className="search-field__shortcut" aria-hidden="true">
          {typeof shortcut === 'string' || typeof shortcut === 'number' ? (
            <Kbd size={kbdSize}>{shortcut}</Kbd>
          ) : (
            shortcut
          )}
        </span>
      ) : null}
    </label>
  )
}
