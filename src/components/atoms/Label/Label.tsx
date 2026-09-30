import type { LabelHTMLAttributes } from 'react'
import './Label.css'

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  optional?: boolean
}

export function Label({
  required = false,
  optional = false,
  className = '',
  children,
  ...props
}: LabelProps) {
  return (
    <label className={`label ${className}`.trim()} {...props}>
      <span>{children}</span>
      {required ? <span className="label__required">*</span> : null}
      {optional ? <span className="label__optional">Optional</span> : null}
    </label>
  )
}
