import { useId, useState, type InputHTMLAttributes } from 'react'
import './Switch.css'

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label: string
  description?: string
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function Switch({
  label,
  description,
  checked,
  defaultChecked = false,
  onCheckedChange,
  className = '',
  id,
  disabled,
  ...props
}: SwitchProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const [internal, setInternal] = useState(defaultChecked)
  const isChecked = checked ?? internal

  return (
    <label
      className={`switch ${disabled ? 'switch--disabled' : ''} ${className}`.trim()}
      htmlFor={inputId}
    >
      <span className="switch__copy">
        <span className="switch__label">{label}</span>
        {description ? <span className="switch__description">{description}</span> : null}
      </span>
      <span className="switch__control">
        <input
          {...props}
          id={inputId}
          type="checkbox"
          role="switch"
          className="switch__input"
          checked={isChecked}
          disabled={disabled}
          onChange={(event) => {
            if (checked === undefined) setInternal(event.target.checked)
            onCheckedChange?.(event.target.checked)
          }}
        />
        <span className="switch__track" aria-hidden="true">
          <span className="switch__thumb" />
        </span>
      </span>
    </label>
  )
}
