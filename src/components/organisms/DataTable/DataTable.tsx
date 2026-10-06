import type { ReactNode } from 'react'
import { Badge } from '../../atoms/Badge'
import type { BadgeTone } from '../../atoms/Badge'
import { Text } from '../../atoms/Text'
import { AvatarGroup, type AvatarGroupItem } from '../../molecules/AvatarGroup'
import { ProgressCell } from '../../molecules/ProgressCell'
import { RowActions } from '../../molecules/RowActions'
import { TypeBadge, type TypeBadgeTone } from '../../molecules/TypeBadge'
import './DataTable.css'

export interface DataTableInvoiceRow {
  id: string
  customer: string
  email: string
  plan: string
  amount: string
  status: string
  statusTone?: BadgeTone
}

export interface DataTableTaskRow {
  id: string
  name: string
  people?: AvatarGroupItem[]
  type: string
  typeIcon?: ReactNode
  typeTone?: TypeBadgeTone
  timeline: string
  priority: string
  priorityTone?: BadgeTone
  progress: number
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

/** @deprecated Prefer DataTableInvoiceRow — kept for existing imports. */
export type DataTableRow = DataTableInvoiceRow

export interface DataTableBaseProps {
  title?: string
  subtitle?: string
  headerAction?: ReactNode
  className?: string
}

export type DataTableProps =
  | (DataTableBaseProps & { variant?: 'invoices'; rows: DataTableInvoiceRow[] })
  | (DataTableBaseProps & { variant: 'tasks'; rows: DataTableTaskRow[] })

export function DataTable(props: DataTableProps) {
  const {
    title,
    subtitle,
    headerAction,
    className = '',
    variant = 'invoices',
    rows,
  } = props

  const resolvedTitle = title ?? (variant === 'tasks' ? 'Active tasks' : 'Recent invoices')
  const resolvedSubtitle = subtitle ?? (variant === 'tasks' ? 'This sprint' : 'Last 7 days')

  return (
    <div className={`data-table data-table--${variant} ${className}`.trim()}>
      <div className="data-table__header">
        <div className="data-table__heading">
          <Text as="h3" variant="bodySemibold">
            {resolvedTitle}
          </Text>
          <Text as="p" variant="muted">
            {resolvedSubtitle}
          </Text>
        </div>
        {headerAction}
      </div>
      <div className="data-table__scroll">
        {variant === 'tasks' ? (
          <TaskTableBody rows={rows as DataTableTaskRow[]} />
        ) : (
          <InvoiceTableBody rows={rows as DataTableInvoiceRow[]} />
        )}
      </div>
    </div>
  )
}

function InvoiceTableBody({ rows }: { rows: DataTableInvoiceRow[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Customer</th>
          <th>Plan</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td>
              <div className="data-table__customer">
                <Text as="span" variant="bodyMedium">
                  {row.customer}
                </Text>
                <Text as="span" variant="muted" className="data-table__email">
                  {row.email}
                </Text>
              </div>
            </td>
            <td>{row.plan}</td>
            <td>{row.amount}</td>
            <td>
              <Badge tone={row.statusTone ?? 'neutral'}>{row.status}</Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function TaskTableBody({ rows }: { rows: DataTableTaskRow[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Task</th>
          <th>People</th>
          <th>Type</th>
          <th>Timeline</th>
          <th>Priority</th>
          <th>Progress</th>
          <th aria-label="Actions" />
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td>
              <Text as="span" variant="bodyMedium">
                {row.name}
              </Text>
            </td>
            <td>
              {row.people && row.people.length > 0 ? (
                <AvatarGroup items={row.people} max={3} size="sm" />
              ) : (
                <Text as="span" variant="muted">
                  —
                </Text>
              )}
            </td>
            <td>
              <TypeBadge icon={row.typeIcon} tone={row.typeTone ?? 'neutral'} size="sm">
                {row.type}
              </TypeBadge>
            </td>
            <td>
              <Text as="span" variant="muted" className="data-table__timeline">
                {row.timeline}
              </Text>
            </td>
            <td>
              <Badge tone={row.priorityTone ?? 'neutral'} size="sm">
                {row.priority}
              </Badge>
            </td>
            <td>
              <ProgressCell value={row.progress} />
            </td>
            <td>
              <RowActions onView={row.onView} onEdit={row.onEdit} onDelete={row.onDelete} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
