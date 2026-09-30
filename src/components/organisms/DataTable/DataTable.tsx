import { Badge } from '../../atoms/Badge'
import type { BadgeTone } from '../../atoms/Badge'
import { Text } from '../../atoms/Text'
import './DataTable.css'

export interface DataTableRow {
  id: string
  customer: string
  email: string
  plan: string
  amount: string
  status: string
  statusTone?: BadgeTone
}

export interface DataTableProps {
  rows: DataTableRow[]
  className?: string
}

export function DataTable({ rows, className = '' }: DataTableProps) {
  return (
    <div className={`data-table ${className}`.trim()}>
      <div className="data-table__header">
        <Text as="h3" variant="bodySemibold">
          Recent invoices
        </Text>
        <Text as="p" variant="muted">
          Last 7 days
        </Text>
      </div>
      <div className="data-table__scroll">
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
      </div>
    </div>
  )
}
