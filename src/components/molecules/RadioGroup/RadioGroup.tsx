import { useId, useState } from 'react'
import './RadioGroup.css'

export interface RadioOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export interface RadioGroupProps {
  name?: string
  options: RadioOption[]
  value?: string
  defaultValue?: string
  legend?: string
  onValueChange?: (value: string) => void
  className?: string
}

export function RadioGroup({
  name,
  options,
  value,
  defaultValue = '',
  legend,
  onValueChange,
  className = '',
}: RadioGroupProps) {
  const reactId = useId()
  const groupName = name ?? reactId
  const [internal, setInternal] = useState(defaultValue)
  const current = value ?? internal

  return (
    <fieldset className={`radio-group ${className}`.trim()}>
      {legend ? <legend className="radio-group__legend">{legend}</legend> : null}
      <div className="radio-group__list" role="radiogroup" aria-label={legend}>
        {options.map((option) => {
          const optionId = `${reactId}-${option.value}`
          const checked = current === option.value
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={`radio-group__item ${checked ? 'radio-group__item--checked' : ''} ${option.disabled ? 'radio-group__item--disabled' : ''}`}
            >
              <input
                id={optionId}
                className="radio-group__input"
                type="radio"
                name={groupName}
                value={option.value}
                checked={checked}
                disabled={option.disabled}
                onChange={() => {
                  if (value === undefined) setInternal(option.value)
                  onValueChange?.(option.value)
                }}
              />
              <span className="radio-group__control" aria-hidden="true" />
              <span className="radio-group__copy">
                <span className="radio-group__label">{option.label}</span>
                {option.description ? (
                  <span className="radio-group__description">{option.description}</span>
                ) : null}
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
