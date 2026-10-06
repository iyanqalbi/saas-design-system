import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import './Button.css'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'linkColor'
  | 'linkGray'
  | 'split'
  /** @deprecated Use `primary` */
  | 'contained'
  /** @deprecated Use `secondary` */
  | 'outlined'
  /** @deprecated Use `tertiary` */
  | 'texted'
  /** @deprecated Use `primary` */
  | 'inverse'
  /** @deprecated Use `tertiary` */
  | 'ghost'
  /** @deprecated Use `primary` */
  | 'accent'
  /** @deprecated Use `tertiary` */
  | 'subtle'
  /** @deprecated Use `linkColor` */
  | 'link'

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type ResolvedVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'linkColor'
  | 'linkGray'
  | 'split'

const VARIANT_MAP: Record<ButtonVariant, ResolvedVariant> = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  linkColor: 'linkColor',
  linkGray: 'linkGray',
  split: 'split',
  contained: 'primary',
  outlined: 'secondary',
  texted: 'tertiary',
  inverse: 'primary',
  ghost: 'tertiary',
  accent: 'primary',
  subtle: 'tertiary',
  link: 'linkColor',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Danger/destructive tone for primary, secondary, and tertiary. */
  destructive?: boolean
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
  variant = 'primary',
  size = 'md',
  destructive = false,
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
  const isLink = resolved === 'linkColor' || resolved === 'linkGray'
  const showDestructive = destructive && !isSplit && !isLink

  const rootClass = [
    'btn',
    isSplit ? 'btn--split' : `btn--${resolved}`,
    `btn--${size}`,
    showDestructive ? 'btn--destructive' : '',
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
