import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { IconButton } from '../../atoms/IconButton'
import { DropdownMenu, type DropdownMenuItem } from '../DropdownMenu'
import './RowActions.css'

export interface RowActionsProps {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  viewLabel?: string
  editLabel?: string
  deleteLabel?: string
  moreItems?: DropdownMenuItem[]
  children?: ReactNode
  className?: string
}

export function RowActions({
  onView,
  onEdit,
  onDelete,
  viewLabel = 'View',
  editLabel = 'Edit',
  deleteLabel = 'Delete',
  moreItems,
  children,
  className = '',
}: RowActionsProps) {
  return (
    <div className={`row-actions ${className}`.trim()}>
      {onView ? (
        <IconButton label={viewLabel} size="sm" tone="ghost" onClick={onView}>
          <Eye size={16} />
        </IconButton>
      ) : null}
      {onEdit ? (
        <IconButton label={editLabel} size="sm" tone="ghost" onClick={onEdit}>
          <Pencil size={16} />
        </IconButton>
      ) : null}
      {onDelete ? (
        <IconButton label={deleteLabel} size="sm" tone="ghost" onClick={onDelete}>
          <Trash2 size={16} />
        </IconButton>
      ) : null}
      {children}
      {moreItems && moreItems.length > 0 ? (
        <DropdownMenu
          align="end"
          label="More row actions"
          trigger={
            <IconButton label="More actions" size="sm" tone="ghost">
              <MoreHorizontal size={16} />
            </IconButton>
          }
          items={moreItems}
        />
      ) : null}
    </div>
  )
}
