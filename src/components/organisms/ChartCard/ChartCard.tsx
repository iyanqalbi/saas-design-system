import { Text } from '../../atoms/Text'
import { Badge } from '../../atoms/Badge'
import type { BadgeTone } from '../../atoms/Badge'
import './ChartCard.css'

export interface ChartPoint {
  label: string
  value: number
}

export interface ChartCardProps {
  title: string
  subtitle?: string
  value?: string
  delta?: string
  deltaTone?: BadgeTone
  points: ChartPoint[]
  className?: string
}

export function ChartCard({
  title,
  subtitle,
  value,
  delta,
  deltaTone = 'success',
  points,
  className = '',
}: ChartCardProps) {
  const max = Math.max(...points.map((point) => point.value), 1)
  const width = 280
  const height = 96
  const padding = 8

  const coords = points.map((point, index) => {
    const x =
      points.length === 1
        ? width / 2
        : padding + (index / (points.length - 1)) * (width - padding * 2)
    const y = height - padding - (point.value / max) * (height - padding * 2)
    return { x, y, ...point }
  })

  const linePath = coords
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')

  const areaPath =
    coords.length > 0
      ? `${linePath} L ${coords[coords.length - 1]!.x} ${height - padding} L ${coords[0]!.x} ${height - padding} Z`
      : ''

  return (
    <article className={`chart-card ${className}`.trim()}>
      <div className="chart-card__header">
        <div>
          <Text as="h3" variant="bodySemibold">
            {title}
          </Text>
          {subtitle ? (
            <Text as="p" variant="muted" className="chart-card__subtitle">
              {subtitle}
            </Text>
          ) : null}
        </div>
        {delta ? <Badge tone={deltaTone}>{delta}</Badge> : null}
      </div>

      {value ? (
        <Text as="p" variant="headingSm" className="chart-card__value">
          {value}
        </Text>
      ) : null}

      <svg
        className="chart-card__svg"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${title} trend chart`}
      >
        <path d={areaPath} className="chart-card__area" />
        <path d={linePath} className="chart-card__line" fill="none" />
        {coords.map((point) => (
          <circle key={point.label} cx={point.x} cy={point.y} r="3" className="chart-card__dot" />
        ))}
      </svg>

      <div className="chart-card__labels">
        {points.map((point) => (
          <span key={point.label}>{point.label}</span>
        ))}
      </div>
    </article>
  )
}
