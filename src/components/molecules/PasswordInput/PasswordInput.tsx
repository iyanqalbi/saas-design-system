import { useState, type InputHTMLAttributes } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input, type InputSize } from '../../atoms/Input'
import './PasswordInput.css'

export interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  invalid?: boolean
  size?: InputSize
  revealLabel?: string
  hideLabel?: string
}

export function PasswordInput({
  invalid = false,
  size = 'md',
  className = '',
  revealLabel = 'Show password',
  hideLabel = 'Hide password',
  disabled,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div className={`password-input password-input--${size} ${className}`.trim()}>
      <Input
        type={visible ? 'text' : 'password'}
        invalid={invalid}
        size={size}
        disabled={disabled}
        autoComplete={props.autoComplete ?? 'current-password'}
        {...props}
      />
      <button
        type="button"
        className="password-input__toggle"
        onClick={() => setVisible((v) => !v)}
        disabled={disabled}
        aria-label={visible ? hideLabel : revealLabel}
        tabIndex={-1}
      >
        {visible ? <EyeOff size={16} strokeWidth={2} /> : <Eye size={16} strokeWidth={2} />}
      </button>
    </div>
  )
}
