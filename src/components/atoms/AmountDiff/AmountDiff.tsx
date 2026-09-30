import { TrendingDown, TrendingUp, Minus } from 'lucide-react'
import './AmountDiff.css'

export interface AmountDiffProps {
  value: number
  suffix?: string
  prefix?: string
  invert?: boolean
  className?: string
}

export function AmountDiff({
  value,
  suffix = '',
  prefix = '',
  invert = false,
  className = '',
}: AmountDiffProps) {
  const positive = value > 0
  const negative = value < 0
  const tone = value === 0 ? 'neutral' : invert ? (positive ? 'danger' : 'success') : positive ? 'success' : 'danger'
  const Icon = value === 0 ? Minus : positive ? TrendingUp : TrendingDown
  const abs = Math.abs(value)
  const formatted = Number.isInteger(abs) ? String(abs) : abs.toFixed(1)

  return (
    <span className={`amount-diff amount-diff--${tone} ${className}`.trim()}>
      <Icon size={14} aria-hidden />
      <span>
        {prefix}
        {negative ? '-' : positive ? '+' : ''}
        {formatted}
        {suffix}
      </span>
    </span>
  )
}
