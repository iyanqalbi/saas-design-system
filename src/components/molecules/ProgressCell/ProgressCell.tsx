import { ProgressBar, type ProgressBarTone } from '../../atoms/ProgressBar'
import './ProgressCell.css'

export interface ProgressCellProps {
  value: number
  max?: number
  /** Override auto tone derived from percentage. */
  tone?: ProgressBarTone
  className?: string
}

function toneForPercent(percent: number): ProgressBarTone {
  if (percent >= 70) return 'success'
  if (percent >= 40) return 'warning'
  return 'danger'
}

export function ProgressCell({
  value,
  max = 100,
  tone,
  className = '',
}: ProgressCellProps) {
  const safeMax = max <= 0 ? 100 : max
  const clamped = Math.min(Math.max(value, 0), safeMax)
  const percent = Math.round((clamped / safeMax) * 100)
  const resolvedTone = tone ?? toneForPercent(percent)

  return (
    <div className={`progress-cell ${className}`.trim()}>
      <span className="progress-cell__value">{percent}%</span>
      <ProgressBar
        value={clamped}
        max={safeMax}
        tone={resolvedTone}
        size="sm"
        showValue={false}
        className="progress-cell__bar"
      />
    </div>
  )
}
