import { AlertBanner } from '../../molecules/AlertBanner'
import { AdminTopBar } from '../AdminTopBar'
import { DataTable } from '../DataTable'
import type { DataTableRow } from '../DataTable'
import { Sidebar } from '../Sidebar'
import { StatsRow } from '../StatsRow'
import { ActivityFeed } from '../ActivityFeed'
import './DashboardPreview.css'

const rows: DataTableRow[] = [
  {
    id: '1',
    customer: 'Northwind Labs',
    email: 'ops@northwind.io',
    plan: 'Growth',
    amount: '$890',
    status: 'Paid',
    statusTone: 'success',
  },
  {
    id: '2',
    customer: 'Harbor Retail',
    email: 'finance@harbor.co',
    plan: 'Starter',
    amount: '$120',
    status: 'Open',
    statusTone: 'warning',
  },
  {
    id: '3',
    customer: 'Pixel Forge',
    email: 'hello@pixelforge.app',
    plan: 'Scale',
    amount: '$2,400',
    status: 'Paid',
    statusTone: 'success',
  },
]

export interface DashboardPreviewProps {
  className?: string
}

export function DashboardPreview({ className = '' }: DashboardPreviewProps) {
  return (
    <div className={`dashboard-preview ${className}`.trim()}>
      <Sidebar className="dashboard-preview__sidebar" />
      <div className="dashboard-preview__main">
        <AdminTopBar />
        <AlertBanner
          tone="info"
          title="New seats available"
          description="Your Growth plan can add 12 more members this billing cycle."
        />
        <StatsRow />
        <div className="dashboard-preview__split">
          <DataTable rows={rows} />
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}
