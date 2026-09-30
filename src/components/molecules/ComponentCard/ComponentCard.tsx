import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../../atoms/Badge'
import type { BadgeTone } from '../../atoms/Badge'
import { Text } from '../../atoms/Text'
import './ComponentCard.css'

export interface ComponentCardProps {
  name: string
  layer: 'Atom' | 'Molecule' | 'Organism'
  description: string
  preview: ReactNode
  to?: string
  tone?: BadgeTone
  className?: string
}

export function ComponentCard({
  name,
  layer,
  description,
  preview,
  to = '/components',
  tone = 'neutral',
  className = '',
}: ComponentCardProps) {
  return (
    <article className={`component-card ${className}`.trim()}>
      <div className="component-card__preview">{preview}</div>
      <div className="component-card__meta">
        <div className="component-card__title-row">
          <Text as="h3" variant="bodySemibold">
            {name}
          </Text>
          <Badge tone={tone}>{layer}</Badge>
        </div>
        <Text as="p" variant="muted">
          {description}
        </Text>
        <Link to={to} className="component-card__link">
          View in catalog
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </article>
  )
}
