import type { ReactNode } from 'react'
import { Text } from '../../atoms/Text'
import { StatusChip, type StatusChipTone } from '../../atoms/StatusChip'
import './TemplateCard.css'

export interface TemplateCardProps {
  icon: ReactNode
  title: string
  meta?: string
  status?: string
  statusTone?: StatusChipTone
  integrations?: ReactNode[]
  runsLabel?: string
  className?: string
}

export function TemplateCard({
  icon,
  title,
  meta,
  status,
  statusTone = 'info',
  integrations = [],
  runsLabel,
  className = '',
}: TemplateCardProps) {
  return (
    <article className={`template-card ${className}`.trim()}>
      {status ? (
        <div className="template-card__status">
          <StatusChip tone={statusTone} size="sm" dot={false}>
            {status}
          </StatusChip>
        </div>
      ) : null}

      <span className="template-card__icon" aria-hidden>
        {icon}
      </span>

      <div className="template-card__body">
        <Text as="h3" variant="bodySemibold" className="template-card__title">
          {title}
        </Text>
        {meta ? (
          <Text as="p" variant="muted" className="template-card__meta">
            {meta}
          </Text>
        ) : null}
      </div>

      {integrations.length > 0 || runsLabel ? (
        <div className="template-card__footer">
          {integrations.length > 0 ? (
            <div className="template-card__integrations" role="list">
              {integrations.map((item, index) => (
                <span key={index} className="template-card__integration" role="listitem">
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <span />
          )}
          {runsLabel ? (
            <Text as="span" variant="muted" className="template-card__runs">
              {runsLabel}
            </Text>
          ) : null}
        </div>
      ) : null}
    </article>
  )
}
