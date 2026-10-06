import './CircularProgress.css'

export type CircularProgressTone = 'ink' | 'accent' | 'success' | 'warning' | 'danger'
export type CircularProgressSize = 'sm' | 'md' | 'lg' | 'xl'

export interface CircularProgressProps {
  value: number
  max?: number
  size?: CircularProgressSize
  tone?: CircularProgressTone
  showValue?: boolean
  label?: string
  className?: string
}

const SIZE_MAP: Record<CircularProgressSize, { box: number; stroke: number }> = {
  sm: { box: 40, stroke: 3.5 },
  md: { box: 56, stroke: 4 },
  lg: { box: 72, stroke: 5 },
  xl: { box: 96, stroke: 6 },
}

export function CircularProgress({
  value,
  max = 100,
  size = 'md',
  tone = 'accent',
  showValue = true,
  label,
  className = '',
}: CircularProgressProps) {
  const safeMax = max <= 0 ? 100 : max
  const clamped = Math.min(Math.max(value, 0), safeMax)
  const percent = Math.round((clamped / safeMax) * 100)
  const { box, stroke } = SIZE_MAP[size]
  const radius = (box - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <div
      className={`circular-progress circular-progress--${size} ${className}`.trim()}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={clamped}
      aria-label={label ?? 'Progress'}
    >
      <svg
        className="circular-progress__svg"
        width={box}
        height={box}
        viewBox={`0 0 ${box} ${box}`}
        aria-hidden="true"
      >
        <circle
          className="circular-progress__track"
          cx={box / 2}
          cy={box / 2}
          r={radius}
          strokeWidth={stroke}
        />
        <circle
          className={`circular-progress__fill circular-progress__fill--${tone}`}
          cx={box / 2}
          cy={box / 2}
          r={radius}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      {showValue ? <span className="circular-progress__value">{percent}%</span> : null}
    </div>
  )
}
