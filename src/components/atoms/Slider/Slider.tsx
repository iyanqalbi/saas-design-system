import { useId, useState, type ChangeEvent, type CSSProperties } from 'react'
import './Slider.css'

export interface SliderProps {
  label?: string
  min?: number
  max?: number
  step?: number
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  showValue?: boolean
  unit?: string
  disabled?: boolean
  className?: string
  id?: string
}

export function Slider({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = min,
  onValueChange,
  showValue = true,
  unit = '',
  disabled = false,
  className = '',
  id,
}: SliderProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const [internal, setInternal] = useState(defaultValue)
  const current = value ?? internal
  const percent = max === min ? 0 : ((current - min) / (max - min)) * 100

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const next = Number(event.target.value)
    if (value === undefined) setInternal(next)
    onValueChange?.(next)
  }

  return (
    <div className={`slider ${disabled ? 'slider--disabled' : ''} ${className}`.trim()}>
      {label || showValue ? (
        <div className="slider__meta">
          {label ? (
            <label htmlFor={inputId} className="slider__label">
              {label}
            </label>
          ) : (
            <span />
          )}
          {showValue ? (
            <span className="slider__value">
              {current}
              {unit}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="slider__control">
        <div className="slider__track" aria-hidden="true">
          <div className="slider__fill" style={{ width: `${percent}%` }} />
        </div>
        <input
          id={inputId}
          type="range"
          className="slider__input"
          min={min}
          max={max}
          step={step}
          value={current}
          disabled={disabled}
          onChange={handleChange}
          style={{ '--slider-progress': `${percent}%` } as CSSProperties}
        />
      </div>
    </div>
  )
}
