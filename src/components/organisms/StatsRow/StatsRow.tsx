import { CreditCard, TrendingUp, Users, Wallet } from 'lucide-react'
import { StatMetric } from '../../molecules/StatMetric'
import './StatsRow.css'

const defaults = [
  {
    label: 'Monthly revenue',
    value: '$48,220',
    delta: '+12.4%',
    deltaTone: 'success' as const,
    icon: <Wallet />,
  },
  {
    label: 'Active seats',
    value: '1,284',
    delta: '+86',
    deltaTone: 'success' as const,
    icon: <Users />,
  },
  {
    label: 'Conversion',
    value: '3.8%',
    delta: '-0.2%',
    deltaTone: 'warning' as const,
    icon: <TrendingUp />,
  },
  {
    label: 'Failed payments',
    value: '14',
    delta: 'Needs review',
    deltaTone: 'danger' as const,
    icon: <CreditCard />,
  },
]

export interface StatsRowProps {
  className?: string
}

export function StatsRow({ className = '' }: StatsRowProps) {
  return (
    <div className={`stats-row ${className}`.trim()}>
      {defaults.map((stat) => (
        <StatMetric key={stat.label} {...stat} />
      ))}
    </div>
  )
}
