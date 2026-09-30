import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import type { HTMLAttributes, ReactNode, ThHTMLAttributes } from 'react'
import './Table.css'

export function Table({ className = '', children, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="table-wrap">
      <table className={`table ${className}`.trim()} {...props}>
        {children}
      </table>
    </div>
  )
}

export function TableHeader({ className = '', children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={`table__header ${className}`.trim()} {...props}>
      {children}
    </thead>
  )
}

export function TableBody({ className = '', children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={`table__body ${className}`.trim()} {...props}>
      {children}
    </tbody>
  )
}

export function TableFooter({ className = '', children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tfoot className={`table__footer ${className}`.trim()} {...props}>
      {children}
    </tfoot>
  )
}

export function TableRow({ className = '', children, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={`table__row ${className}`.trim()} {...props}>
      {children}
    </tr>
  )
}

export function TableHead({ className = '', children, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={`table__head ${className}`.trim()} {...props}>
      {children}
    </th>
  )
}

export function TableCell({ className = '', children, ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={`table__cell ${className}`.trim()} {...props}>
      {children}
    </td>
  )
}

export function TableCaption({ className = '', children, ...props }: HTMLAttributes<HTMLTableCaptionElement>) {
  return (
    <caption className={`table__caption ${className}`.trim()} {...props}>
      {children}
    </caption>
  )
}

export type SortDirection = 'asc' | 'desc' | false

export interface SortableThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode
  sorted?: SortDirection
  onSort?: () => void
}

export function SortableTh({
  children,
  sorted = false,
  onSort,
  className = '',
  ...props
}: SortableThProps) {
  const Icon = sorted === 'asc' ? ArrowUp : sorted === 'desc' ? ArrowDown : ArrowUpDown

  return (
    <th className={`table__head table__head--sortable ${className}`.trim()} {...props}>
      <button type="button" className="table__sort-btn" onClick={onSort}>
        <span>{children}</span>
        <Icon size={14} aria-hidden />
      </button>
    </th>
  )
}
