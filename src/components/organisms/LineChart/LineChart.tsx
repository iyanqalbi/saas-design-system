import type { ReactNode } from 'react'
import { Text } from '../../atoms/Text'
import './LineChart.css'

export interface LineChartPoint {
  label: string
  values: number[]
}

export interface LineChartSeries {
  id: string
  label: string
  dashed?: boolean
  tone?: 'primary' | 'ink' | 'muted'
}

export interface LineChartProps {
  title: string
  series: LineChartSeries[]
  points: LineChartPoint[]
  rangeControl?: ReactNode
  className?: string
}

const TONE_STROKE: Record<NonNullable<LineChartSeries['tone']>, string> = {
  primary: 'var(--color-primary)',
  ink: 'var(--color-ink)',
  muted: 'var(--color-muted)',
}

export function LineChart({
  title,
  series,
  points,
  rangeControl,
  className = '',
}: LineChartProps) {
  const width = 420
  const height = 180
  const padX = 28
  const padY = 16
  const plotW = width - padX * 2
  const plotH = height - padY * 2

  const allValues = points.flatMap((point) => point.values)
  const max = Math.max(...allValues, 1)
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => Math.round(max * ratio))

  function pathForSeries(seriesIndex: number) {
    return points
      .map((point, index) => {
        const x =
          points.length === 1
            ? width / 2
            : padX + (index / (points.length - 1)) * plotW
        const value = point.values[seriesIndex] ?? 0
        const y = padY + plotH - (value / max) * plotH
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
      })
      .join(' ')
  }

  return (
    <article className={`line-chart ${className}`.trim()}>
      <div className="line-chart__header">
        <Text as="h3" variant="bodySemibold">
          {title}
        </Text>
        {rangeControl}
      </div>

      <svg
        className="line-chart__svg"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${title} line chart`}
      >
        {yTicks.map((tick) => {
          const y = padY + plotH - (tick / max) * plotH
          return (
            <g key={tick}>
              <line
                x1={padX}
                y1={y}
                x2={width - padX}
                y2={y}
                className="line-chart__grid"
              />
              <text x={4} y={y + 4} className="line-chart__tick">
                {tick}
              </text>
            </g>
          )
        })}

        {series.map((item, seriesIndex) => (
          <path
            key={item.id}
            d={pathForSeries(seriesIndex)}
            className={`line-chart__line ${item.dashed ? 'line-chart__line--dashed' : ''}`}
            style={{ stroke: TONE_STROKE[item.tone ?? (seriesIndex === 0 ? 'primary' : 'muted')] }}
            fill="none"
          />
        ))}
      </svg>

      <div className="line-chart__footer">
        <div className="line-chart__labels">
          {points.map((point) => (
            <span key={point.label}>{point.label}</span>
          ))}
        </div>
        <div className="line-chart__legend">
          {series.map((item, index) => (
            <span key={item.id} className="line-chart__legend-item">
              <span
                className={`line-chart__legend-swatch ${item.dashed ? 'line-chart__legend-swatch--dashed' : ''}`}
                style={{
                  background: TONE_STROKE[item.tone ?? (index === 0 ? 'primary' : 'muted')],
                }}
              />
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
