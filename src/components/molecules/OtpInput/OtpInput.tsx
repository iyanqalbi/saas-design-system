import {
  useId,
  useRef,
  type ClipboardEvent,
  type KeyboardEvent,
  type InputHTMLAttributes,
} from 'react'
import './OtpInput.css'

export interface OtpInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange' | 'type'> {
  length?: number
  value?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  invalid?: boolean
  size?: 'sm' | 'md' | 'lg'
}

function normalize(value: string, length: number) {
  return value.replace(/\D/g, '').slice(0, length)
}

export function OtpInput({
  length = 6,
  value = '',
  onChange,
  onComplete,
  invalid = false,
  size = 'md',
  disabled,
  className = '',
  id,
  ...props
}: OtpInputProps) {
  const reactId = useId()
  const rootId = id ?? reactId
  const digits = normalize(value, length).padEnd(length, ' ').slice(0, length).split('')
  const refs = useRef<Array<HTMLInputElement | null>>([])

  function commit(next: string) {
    const cleaned = normalize(next, length)
    onChange?.(cleaned)
    if (cleaned.length === length) onComplete?.(cleaned)
  }

  function updateAt(index: number, char: string) {
    const chars = normalize(value, length).split('')
    while (chars.length < length) chars.push('')
    chars[index] = char
    commit(chars.join(''))
  }

  function onKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Backspace') {
      event.preventDefault()
      const current = normalize(value, length)
      if (current[index]) {
        updateAt(index, '')
      } else if (index > 0) {
        updateAt(index - 1, '')
        refs.current[index - 1]?.focus()
      }
      return
    }
    if (event.key === 'ArrowLeft' && index > 0) {
      refs.current[index - 1]?.focus()
    }
    if (event.key === 'ArrowRight' && index < length - 1) {
      refs.current[index + 1]?.focus()
    }
  }

  function onPaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault()
    commit(event.clipboardData.getData('text'))
  }

  return (
    <div
      className={`otp-input otp-input--${size} ${invalid ? 'otp-input--invalid' : ''} ${className}`.trim()}
      role="group"
      aria-label="One-time password"
    >
      {Array.from({ length }, (_, index) => (
        <input
          key={`${rootId}-${index}`}
          ref={(node) => {
            refs.current[index] = node
          }}
          id={`${rootId}-${index}`}
          className="otp-input__cell"
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          value={digits[index]?.trim() ?? ''}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-label={`Digit ${index + 1}`}
          onChange={(event) => {
            const char = event.target.value.replace(/\D/g, '').slice(-1)
            if (!char) {
              updateAt(index, '')
              return
            }
            updateAt(index, char)
            if (index < length - 1) refs.current[index + 1]?.focus()
          }}
          onKeyDown={(event) => onKeyDown(index, event)}
          onPaste={onPaste}
          onFocus={(event) => event.target.select()}
          {...props}
        />
      ))}
    </div>
  )
}
