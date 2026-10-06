import type { ReactNode } from 'react'
import { Pencil, Share2 } from 'lucide-react'
import { Text } from '../../atoms/Text'
import { Button } from '../../atoms/Button'
import { AvatarGroup, type AvatarGroupItem } from '../AvatarGroup'
import './DocumentCard.css'

export interface DocumentCardProps {
  icon: ReactNode
  title: string
  description?: string
  people?: AvatarGroupItem[]
  peopleLabel?: string
  onShare?: () => void
  onEdit?: () => void
  shareLabel?: string
  editLabel?: string
  className?: string
}

export function DocumentCard({
  icon,
  title,
  description,
  people = [],
  peopleLabel,
  onShare,
  onEdit,
  shareLabel = 'Share',
  editLabel = 'Edit',
  className = '',
}: DocumentCardProps) {
  return (
    <article className={`document-card ${className}`.trim()}>
      <div className="document-card__top">
        <span className="document-card__icon" aria-hidden>
          {icon}
        </span>
        {people.length > 0 ? (
          <div className="document-card__people">
            <AvatarGroup items={people} max={3} size="sm" />
            {peopleLabel ? (
              <Text as="span" variant="muted" className="document-card__people-label">
                {peopleLabel}
              </Text>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="document-card__body">
        <Text as="h3" variant="bodySemibold" className="document-card__title">
          {title}
        </Text>
        {description ? (
          <Text as="p" variant="muted" className="document-card__description">
            {description}
          </Text>
        ) : null}
      </div>

      {onShare || onEdit ? (
        <div className="document-card__actions">
          {onShare ? (
            <Button size="sm" variant="contained" leftIcon={<Share2 size={14} />} onClick={onShare}>
              {shareLabel}
            </Button>
          ) : null}
          {onEdit ? (
            <Button size="sm" variant="texted" leftIcon={<Pencil size={14} />} onClick={onEdit}>
              {editLabel}
            </Button>
          ) : null}
        </div>
      ) : null}
    </article>
  )
}
