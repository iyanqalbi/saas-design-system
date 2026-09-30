import type { InputHTMLAttributes } from 'react'
import './Checkbox.css'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
}

export function Checkbox({ label, className = '', id, ...props }: CheckboxProps) {
  const inputId = id ?? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <label className={`checkbox ${className}`.trim()} htmlFor={inputId}>
      <input id={inputId} type="checkbox" className="checkbox__input" {...props} />
      <span className="checkbox__box" aria-hidden="true" />
      <span className="checkbox__label">{label}</span>
    </label>
  )
}
