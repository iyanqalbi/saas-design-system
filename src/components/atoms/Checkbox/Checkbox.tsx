import { useEffect, useRef, type InputHTMLAttributes } from 'react'
import './Checkbox.css'

export type CheckboxSize = 'sm' | 'md' | 'lg'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label: string
  size?: CheckboxSize
  indeterminate?: boolean
}

export function Checkbox({
  label,
  size = 'md',
  indeterminate = false,
  className = '',
  id,
  disabled,
  ...props
}: CheckboxProps) {
  const inputId = id ?? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  return (
    <label
      className={`checkbox checkbox--${size} ${disabled ? 'checkbox--disabled' : ''} ${className}`.trim()}
      htmlFor={inputId}
    >
      <input
        ref={inputRef}
        id={inputId}
        type="checkbox"
        className="checkbox__input"
        disabled={disabled}
        aria-checked={indeterminate ? 'mixed' : undefined}
        {...props}
      />
      <span className="checkbox__box" aria-hidden="true" />
      <span className="checkbox__label">{label}</span>
    </label>
  )
}
