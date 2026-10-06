import type { InputHTMLAttributes, SelectHTMLAttributes } from 'react'
import { Input, type InputSize } from '../../atoms/Input'
import './PhoneInput.css'

export interface PhoneCountry {
  code: string
  dial: string
  label: string
}

const DEFAULT_COUNTRIES: PhoneCountry[] = [
  { code: 'ID', dial: '+62', label: 'Indonesia' },
  { code: 'MY', dial: '+60', label: 'Malaysia' },
  { code: 'SG', dial: '+65', label: 'Singapore' },
  { code: 'US', dial: '+1', label: 'United States' },
  { code: 'GB', dial: '+44', label: 'United Kingdom' },
]

export interface PhoneInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  invalid?: boolean
  size?: InputSize
  countries?: PhoneCountry[]
  countryCode?: string
  onCountryChange?: (code: string) => void
  countrySelectProps?: Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'>
}

export function PhoneInput({
  invalid = false,
  size = 'md',
  countries = DEFAULT_COUNTRIES,
  countryCode = 'ID',
  onCountryChange,
  countrySelectProps,
  className = '',
  ...props
}: PhoneInputProps) {
  const selected = countries.find((c) => c.code === countryCode) ?? countries[0]

  return (
    <div className={`phone-input phone-input--${size} ${invalid ? 'phone-input--invalid' : ''} ${className}`.trim()}>
      <select
        className="phone-input__country"
        value={selected?.code}
        onChange={(e) => onCountryChange?.(e.target.value)}
        aria-label="Country code"
        disabled={props.disabled}
        {...countrySelectProps}
      >
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.code} {country.dial}
          </option>
        ))}
      </select>
      <Input
        type="tel"
        inputMode="tel"
        invalid={invalid}
        size={size}
        placeholder="812 3456 7890"
        {...props}
      />
    </div>
  )
}
