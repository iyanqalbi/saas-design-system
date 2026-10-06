import './ProgressBar.css'

export type ProgressBarTone = 'ink' | 'accent' | 'success' | 'warning' | 'danger'

export interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  tone?: ProgressBarTone
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  tone = 'ink',
  size = 'md',
  className = '',
}: ProgressBarProps) {
  const safeMax = max <= 0 ? 100 : max
  const clamped = Math.min(Math.max(value, 0), safeMax)
  const percent = Math.round((clamped / safeMax) * 100)

  return (
    <div className={`progress ${className}`.trim()}>
      {label || showValue ? (
        <div className="progress__meta">
          {label ? <span className="progress__label">{label}</span> : <span />}
          {showValue ? <span className="progress__value">{percent}%</span> : null}
        </div>
      ) : null}
      <div
        className={`progress__track progress__track--${size}`}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={clamped}
        aria-label={label ?? 'Progress'}
      >
        <div
          className={`progress__fill progress__fill--${tone}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
