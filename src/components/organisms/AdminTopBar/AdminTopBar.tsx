import { Bell, HelpCircle } from 'lucide-react'
import { IconButton } from '../../atoms/IconButton'
import { Text } from '../../atoms/Text'
import { Breadcrumb } from '../../molecules/Breadcrumb'
import type { BreadcrumbItem } from '../../molecules/Breadcrumb'
import { SearchField } from '../../molecules/SearchField'
import { UserChip } from '../../molecules/UserChip'
import './AdminTopBar.css'

export interface AdminTopBarProps {
  title?: string
  crumbs?: BreadcrumbItem[]
  className?: string
}

export function AdminTopBar({
  title = 'Overview',
  crumbs = [
    { label: 'Admin', to: '#' },
    { label: 'Overview' },
  ],
  className = '',
}: AdminTopBarProps) {
  return (
    <div className={`admin-topbar ${className}`.trim()}>
      <div className="admin-topbar__left">
        <Breadcrumb items={crumbs} />
        <Text as="h2" variant="headingSm">
          {title}
        </Text>
      </div>
      <div className="admin-topbar__right">
        <SearchField placeholder="Search customers, invoices…" className="admin-topbar__search" />
        <IconButton label="Notifications" tone="subtle">
          <Bell size={16} />
        </IconButton>
        <IconButton label="Help" tone="subtle">
          <HelpCircle size={16} />
        </IconButton>
        <UserChip name="Maya Chen" role="Admin" onClick={() => undefined} />
      </div>
    </div>
  )
}
