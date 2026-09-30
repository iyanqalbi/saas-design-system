import type { InputHTMLAttributes, ReactNode } from 'react'
import { Input, type InputSize } from '../../atoms/Input'
import { Text } from '../../atoms/Text'
import './FormField.css'

export interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'size'> {
  id: string
  label: string
  hint?: string
  error?: string
  optional?: boolean
  size?: InputSize
  children?: ReactNode
}

export function FormField({
  id,
  label,
  hint,
  error,
  optional = false,
  size = 'md',
  children,
  className = '',
  ...inputProps
}: FormFieldProps) {
  return (
    <div className={`form-field ${className}`.trim()}>
      <div className="form-field__label-row">
        <label htmlFor={id} className="form-field__label">
          {label}
        </label>
        {optional ? (
          <Text as="span" variant="muted" className="form-field__optional">
            Optional
          </Text>
        ) : null}
      </div>
      {children ?? <Input id={id} size={size} invalid={Boolean(error)} {...inputProps} />}
      {error ? (
        <Text as="p" variant="caption" className="form-field__error">
          {error}
        </Text>
      ) : hint ? (
        <Text as="p" variant="muted" className="form-field__hint">
          {hint}
        </Text>
      ) : null}
    </div>
  )
}
