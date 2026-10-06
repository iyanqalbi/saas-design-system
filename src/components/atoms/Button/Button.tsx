import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import './Button.css'

export type ButtonVariant =
  | 'contained'
  | 'outlined'
  | 'texted'
  | 'split'
  /** @deprecated Use `contained` */
  | 'inverse'
  /** @deprecated Use `outlined` */
  | 'ghost'
  /** @deprecated Use `contained` */
  | 'accent'
  /** @deprecated Use `texted` */
  | 'subtle'

export type ButtonSize = 'sm' | 'md' | 'lg'

type ResolvedVariant = 'contained' | 'outlined' | 'texted' | 'split'

const VARIANT_MAP: Record<ButtonVariant, ResolvedVariant> = {
  contained: 'contained',
  outlined: 'outlined',
  texted: 'texted',
  split: 'split',
  inverse: 'contained',
  ghost: 'outlined',
  accent: 'contained',
  subtle: 'texted',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  /** Renders children as the only icon; requires `aria-label`. */
  iconOnly?: boolean
  fullWidth?: boolean
  loading?: boolean
  /** Click handler for the split-button menu (chevron) segment. */
  onMenuClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  menuAriaLabel?: string
}

function Spinner() {
  return <span className="btn__spinner" aria-hidden="true" />
}

export function Button({
  variant = 'contained',
  size = 'md',
  leftIcon,
  rightIcon,
  iconOnly = false,
  fullWidth = false,
  loading = false,
  onMenuClick,
  menuAriaLabel = 'Open menu',
  className = '',
  children,
  type = 'button',
  disabled,
  ...props
}: ButtonProps) {
  const resolved = VARIANT_MAP[variant]
  const isDisabled = Boolean(disabled || loading)
  const isSplit = resolved === 'split'

  const rootClass = [
    'btn',
    isSplit ? 'btn--split' : `btn--${resolved}`,
    `btn--${size}`,
    iconOnly ? 'btn--icon-only' : '',
    fullWidth ? 'btn--full' : '',
    loading ? 'btn--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {loading ? (
        <Spinner />
      ) : leftIcon || (iconOnly && children) ? (
        <span className="btn__icon">{iconOnly ? children : leftIcon}</span>
      ) : null}
      {!iconOnly ? <span className="btn__label">{loading ? 'Processing' : children}</span> : null}
      {!loading && !iconOnly && rightIcon ? <span className="btn__icon">{rightIcon}</span> : null}
    </>
  )

  if (isSplit) {
    return (
      <span className={rootClass} data-disabled={isDisabled || undefined}>
        <button
          type={type}
          disabled={isDisabled}
          aria-busy={loading || undefined}
          className="btn__main"
          {...props}
        >
          {content}
        </button>
        <span className="btn__divider" aria-hidden="true" />
        <button
          type="button"
          className="btn__menu"
          disabled={isDisabled}
          aria-label={menuAriaLabel}
          onClick={onMenuClick}
        >
          <ChevronDown size={16} strokeWidth={2.25} aria-hidden="true" />
        </button>
      </span>
    )
  }

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={rootClass}
      {...props}
    >
      {content}
    </button>
  )
}
