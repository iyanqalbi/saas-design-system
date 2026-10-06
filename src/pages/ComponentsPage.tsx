import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  ArrowRight,
  Bug,
  Circle,
  Copy,
  Download,
  Eye,
  FileText,
  FlaskConical,
  Folder,
  Hash,
  Mail,
  Moon,
  MoreHorizontal,
  Pencil,
  Plus,
  Rocket,
  Search,
  Trash2,
  Inbox,
  Info,
  LayoutDashboard,
  Settings,
  Users,
  SlidersHorizontal,
  BookOpen,
  Shirt,
  Music,
  Mic,
  UserPlus,
  Workflow,
} from 'lucide-react'
import { AmountDiff } from '../components/atoms/AmountDiff'
import { Badge } from '../components/atoms/Badge'
import { Button } from '../components/atoms/Button'
import { Avatar } from '../components/atoms/Avatar'
import { Checkbox } from '../components/atoms/Checkbox'
import { Divider } from '../components/atoms/Divider'
import { FeaturedIcon } from '../components/atoms/FeaturedIcon'
import { IconButton } from '../components/atoms/IconButton'
import { Input } from '../components/atoms/Input'
import { Kbd } from '../components/atoms/Kbd'
import { Label } from '../components/atoms/Label'
import { ProgressBar } from '../components/atoms/ProgressBar'
import { Skeleton } from '../components/atoms/Skeleton'
import { Slider } from '../components/atoms/Slider'
import { StatusChip } from '../components/atoms/StatusChip'
import { Switch } from '../components/atoms/Switch'
import { Text } from '../components/atoms/Text'
import { Textarea } from '../components/atoms/Textarea'
import { Accordion } from '../components/molecules/Accordion'
import { AlertBanner } from '../components/molecules/AlertBanner'
import { AvatarGroup } from '../components/molecules/AvatarGroup'
import { Breadcrumb } from '../components/molecules/Breadcrumb'
import { ButtonGroup } from '../components/molecules/ButtonGroup'
import { Carousel } from '../components/molecules/Carousel'
import { ContextMenu } from '../components/molecules/ContextMenu'
import { DocumentCard } from '../components/molecules/DocumentCard'
import { IconStack } from '../components/molecules/IconStack'
import { ProgressCell } from '../components/molecules/ProgressCell'
import { RowActions } from '../components/molecules/RowActions'
import { SectionHeader } from '../components/molecules/SectionHeader'
import { TemplateCard } from '../components/molecules/TemplateCard'
import { TreeView } from '../components/molecules/TreeView'
import { TypeBadge } from '../components/molecules/TypeBadge'
import { UpgradeCard } from '../components/molecules/UpgradeCard'
import { UsageMeter } from '../components/molecules/UsageMeter'
import { WorkspaceSwitcher } from '../components/molecules/WorkspaceSwitcher'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/molecules/Card'
import { ConfirmModal } from '../components/molecules/ConfirmModal'
import { DatePicker } from '../components/molecules/DatePicker'
import { DateRangePicker } from '../components/molecules/DateRangePicker'
import { Dialog } from '../components/molecules/Dialog'
import { Drawer } from '../components/molecules/Drawer'
import { DropdownMenu } from '../components/molecules/DropdownMenu'
import { EmptyState } from '../components/molecules/EmptyState'
import { FileUpload } from '../components/molecules/FileUpload'
import { FormField } from '../components/molecules/FormField'
import { NotificationCard } from '../components/molecules/NotificationCard'
import { Pagination } from '../components/molecules/Pagination'
import { Popover } from '../components/molecules/Popover'
import { RadioGroup } from '../components/molecules/RadioGroup'
import { SearchField } from '../components/molecules/SearchField'
import { Select } from '../components/molecules/Select'
import { StatMetric } from '../components/molecules/StatMetric'
import { Stepper } from '../components/molecules/Stepper'
import {
  SortableTh,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/molecules/Table'
import { Tabs } from '../components/molecules/Tabs'
import { TagInput } from '../components/molecules/TagInput'
import { Toast } from '../components/molecules/Toast'
import { Tooltip } from '../components/molecules/Tooltip'
import { UserChip } from '../components/molecules/UserChip'
import { ActivityFeed } from '../components/organisms/ActivityFeed'
import { AdminTopBar } from '../components/organisms/AdminTopBar'
import { Calendar } from '../components/organisms/Calendar'
import { ChartCard } from '../components/organisms/ChartCard'
import { DashboardBoard } from '../components/organisms/DashboardBoard'
import { LineChart } from '../components/organisms/LineChart'
import { CommandPalette } from '../components/organisms/CommandPalette'
import { DataTable } from '../components/organisms/DataTable'
import { FilterBar } from '../components/organisms/FilterBar'
import { DocsSidebar } from '../components/organisms/DocsSidebar'
import { NotificationsMenu } from '../components/organisms/NotificationsMenu'
import { PageHeader } from '../components/organisms/PageHeader'
import { Sidebar } from '../components/organisms/Sidebar'
import { SiteFooter } from '../components/organisms/SiteFooter'
import { SiteHeader } from '../components/organisms/SiteHeader'
import { SkeletonLayout } from '../components/organisms/SkeletonLayout'
import { StatsRow } from '../components/organisms/StatsRow'
import { AppShell } from '../templates/AppShell'
import { catalog } from '../data/catalog'
import { docsNavItems, resolveDocsNavId, type DocsNavItem } from '../data/docsNav'
import { MarketingLayout } from '../templates/MarketingLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import './ComponentsPage.css'

function ConfirmModalDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="demo-stack">
      <Button variant="accent" size="sm" onClick={() => setOpen(true)}>
        Delete invoice
      </Button>
      <ConfirmModal
        open={open}
        tone="danger"
        title="Delete this invoice?"
        description="This removes invoice #4821 for Northwind Labs. The action cannot be undone."
        confirmLabel="Delete invoice"
        onCancel={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      />
    </div>
  )
}

function SliderDemo() {
  const [seats, setSeats] = useState(24)

  return (
    <div className="demo-stack demo-stack--wide">
      <Slider label="Seat limit" min={5} max={100} value={seats} onValueChange={setSeats} unit=" seats" />
      <Slider label="Disabled" min={0} max={100} defaultValue={40} disabled unit="%" />
    </div>
  )
}

function SelectDemo() {
  const [plan, setPlan] = useState('growth')

  return (
    <div className="demo-stack demo-stack--wide">
      <Select
        label="Plan"
        value={plan}
        onValueChange={setPlan}
        options={[
          { value: 'starter', label: 'Starter' },
          { value: 'growth', label: 'Growth' },
          { value: 'scale', label: 'Scale' },
          { value: 'enterprise', label: 'Enterprise', disabled: true },
        ]}
      />
      <Select
        label="Billing email"
        defaultValue="ops@"
        invalid
        options={[
          { value: 'ops@', label: 'ops@' },
          { value: 'finance@acme.com', label: 'finance@acme.com' },
        ]}
      />
      <Select
        label="Region"
        defaultValue="us"
        disabled
        options={[
          { value: 'us', label: 'United States' },
          { value: 'eu', label: 'Europe' },
        ]}
      />
    </div>
  )
}

function PaginationDemo() {
  const [page, setPage] = useState(3)
  return (
    <div className="demo-stack">
      <Pagination page={page} pageCount={12} onPageChange={setPage} size="sm" />
      <Pagination page={page} pageCount={12} onPageChange={setPage} size="md" />
      <Pagination page={page} pageCount={12} onPageChange={setPage} size="lg" />
    </div>
  )
}

function DrawerDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="demo-stack">
      <Button size="sm" variant="inverse" onClick={() => setOpen(true)}>
        Open customer drawer
      </Button>
      <Drawer
        open={open}
        title="Northwind Labs"
        description="Growth plan · 48 seats"
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button variant="inverse" onClick={() => setOpen(false)}>
              Save changes
            </Button>
          </>
        }
      >
        <FormField id="drawer-company" label="Company" defaultValue="Northwind Labs" />
        <FormField id="drawer-owner" label="Owner email" defaultValue="ops@northwind.io" />
        <Text as="p" variant="muted">
          Update billing owner and seat allocation without leaving the customers list.
        </Text>
      </Drawer>
    </div>
  )
}

function CommandPaletteDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="demo-stack">
      <Button size="sm" variant="ghost" onClick={() => setOpen(true)}>
        Open command palette
      </Button>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        items={[
          {
            id: 'overview',
            label: 'Go to Overview',
            group: 'Navigation',
            icon: <LayoutDashboard />,
            shortcut: 'G O',
            onSelect: () => undefined,
          },
          {
            id: 'customers',
            label: 'Go to Customers',
            group: 'Navigation',
            icon: <Users />,
            shortcut: 'G C',
            onSelect: () => undefined,
          },
          {
            id: 'settings',
            label: 'Open Settings',
            group: 'Navigation',
            icon: <Settings />,
            shortcut: 'G S',
            onSelect: () => undefined,
          },
        ]}
      />
    </div>
  )
}

function FilterBarDemo() {
  const [query, setQuery] = useState('')
  const [plan, setPlan] = useState('all')

  return (
    <FilterBar
      searchValue={query}
      searchPlaceholder="Search customers…"
      onSearchChange={setQuery}
      onClear={() => {
        setQuery('')
        setPlan('all')
      }}
      filters={
        <Select
          value={plan}
          onValueChange={setPlan}
          options={[
            { value: 'all', label: 'All plans' },
            { value: 'growth', label: 'Growth' },
            { value: 'scale', label: 'Scale' },
          ]}
          className="filter-bar-select"
        />
      }
    />
  )
}

function DialogDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="demo-stack">
      <Button size="sm" variant="inverse" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <Dialog
        open={open}
        title="Edit workspace"
        description="Update the display name shown across your admin portal."
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="inverse" onClick={() => setOpen(false)}>
              Save
            </Button>
          </>
        }
      >
        <FormField id="workspace-name" label="Workspace name" defaultValue="Northwind Labs" />
      </Dialog>
    </div>
  )
}

function TabsDemo() {
  const categoryTabs = [
    { id: 'education', label: 'Education', icon: <BookOpen /> },
    { id: 'fashion', label: 'Fashion', icon: <Shirt /> },
    { id: 'music', label: 'Music', icon: <Music /> },
    { id: 'podcast', label: 'Podcast', icon: <Mic /> },
  ]

  const labelTabs = [
    { id: 'education', label: 'Education' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'music', label: 'Music' },
    { id: 'podcast', label: 'Podcast' },
  ]

  return (
    <div className="tabs-preview">
      <div className="demo-panel">
        <h4 className="demo-panel__title">Underline</h4>
        <Tabs ariaLabel="Underline tabs" items={categoryTabs} />
      </div>
      <div className="demo-panel">
        <h4 className="demo-panel__title">Underline stacked</h4>
        <Tabs ariaLabel="Stacked underline tabs" layout="stacked" items={categoryTabs} />
      </div>
      <div className="demo-panel">
        <h4 className="demo-panel__title">Soft</h4>
        <Tabs ariaLabel="Soft tabs" variant="soft" items={categoryTabs} />
      </div>
      <div className="demo-panel">
        <h4 className="demo-panel__title">Solid</h4>
        <Tabs ariaLabel="Solid tabs" variant="solid" items={categoryTabs} />
      </div>
      <div className="demo-panel">
        <h4 className="demo-panel__title">Boxed</h4>
        <Tabs ariaLabel="Boxed tabs" variant="boxed" items={labelTabs} />
      </div>
      <div className="demo-panel">
        <h4 className="demo-panel__title">Pills</h4>
        <Tabs ariaLabel="Pills tabs" variant="pills" items={labelTabs} />
      </div>
      <div className="demo-panel">
        <h4 className="demo-panel__title">Segmented</h4>
        <Tabs ariaLabel="Segmented tabs" variant="segmented" items={labelTabs} />
      </div>
      <div className="demo-panel">
        <h4 className="demo-panel__title">Underline · with badge</h4>
        <Tabs
          ariaLabel="Customer sections"
          items={[
            {
              id: 'overview',
              label: 'Overview',
              content: (
                <Text as="p" variant="muted">
                  Plan usage, seats, and recent invoices.
                </Text>
              ),
            },
            {
              id: 'members',
              label: 'Members',
              badge: '12',
              content: (
                <Text as="p" variant="muted">
                  Invite teammates and manage roles.
                </Text>
              ),
            },
            {
              id: 'billing',
              label: 'Billing',
              content: (
                <Text as="p" variant="muted">
                  Payment method and invoice history.
                </Text>
              ),
            },
          ]}
        />
      </div>
    </div>
  )
}

function TableDemo() {
  const [sorted, setSorted] = useState<'asc' | 'desc' | false>('asc')
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <SortableTh
            sorted={sorted}
            onSort={() => setSorted((value) => (value === 'asc' ? 'desc' : 'asc'))}
          >
            Customer
          </SortableTh>
          <TableHead>Plan</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Northwind</TableCell>
          <TableCell>Growth</TableCell>
          <TableCell>$890</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Harbor</TableCell>
          <TableCell>Starter</TableCell>
          <TableCell>$120</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

const previews: Record<string, ReactNode> = {
  button: (
    <div className="demo-stack demo-stack--button">
      <section className="demo-panel">
        <h4 className="demo-panel__title">Primary buttons</h4>
        <div className="demo-row demo-row--baseline">
          <Button size="xs">Button xs</Button>
          <Button size="sm">Button sm</Button>
          <Button size="md">Button md</Button>
          <Button size="lg">Button lg</Button>
          <Button size="xl">Button xl</Button>
        </div>
      </section>

      <section className="demo-panel">
        <h4 className="demo-panel__title">Secondary buttons</h4>
        <div className="demo-row demo-row--baseline">
          <Button size="xs" variant="secondary">
            Button xs
          </Button>
          <Button size="sm" variant="secondary">
            Button sm
          </Button>
          <Button size="md" variant="secondary">
            Button md
          </Button>
          <Button size="lg" variant="secondary">
            Button lg
          </Button>
          <Button size="xl" variant="secondary">
            Button xl
          </Button>
        </div>
      </section>

      <section className="demo-panel">
        <h4 className="demo-panel__title">Tertiary buttons</h4>
        <div className="demo-row demo-row--baseline">
          <Button size="xs" variant="tertiary">
            Button xs
          </Button>
          <Button size="sm" variant="tertiary">
            Button sm
          </Button>
          <Button size="md" variant="tertiary">
            Button md
          </Button>
          <Button size="lg" variant="tertiary">
            Button lg
          </Button>
          <Button size="xl" variant="tertiary">
            Button xl
          </Button>
        </div>
      </section>

      <section className="demo-panel">
        <h4 className="demo-panel__title">Ghost buttons</h4>
        <div className="demo-row demo-row--baseline">
          <Button size="xs" variant="ghost">
            Button xs
          </Button>
          <Button size="sm" variant="ghost">
            Button sm
          </Button>
          <Button size="md" variant="ghost">
            Button md
          </Button>
          <Button size="lg" variant="ghost">
            Button lg
          </Button>
          <Button size="xl" variant="ghost">
            Button xl
          </Button>
        </div>
      </section>

      <section className="demo-panel">
        <h4 className="demo-panel__title">Link color buttons</h4>
        <div className="demo-row demo-row--baseline">
          <Button size="xs" variant="linkColor">
            Button xs
          </Button>
          <Button size="sm" variant="linkColor">
            Button sm
          </Button>
          <Button size="md" variant="linkColor">
            Button md
          </Button>
          <Button size="lg" variant="linkColor">
            Button lg
          </Button>
          <Button size="xl" variant="linkColor">
            Button xl
          </Button>
        </div>
      </section>

      <section className="demo-panel">
        <h4 className="demo-panel__title">Link gray buttons</h4>
        <div className="demo-row demo-row--baseline">
          <Button size="xs" variant="linkGray">
            Button xs
          </Button>
          <Button size="sm" variant="linkGray">
            Button sm
          </Button>
          <Button size="md" variant="linkGray">
            Button md
          </Button>
          <Button size="lg" variant="linkGray">
            Button lg
          </Button>
          <Button size="xl" variant="linkGray">
            Button xl
          </Button>
        </div>
      </section>

      <section className="demo-panel">
        <h4 className="demo-panel__title">Icon leading buttons</h4>
        <div className="button-size-grid">
          {(['primary', 'secondary', 'tertiary', 'ghost'] as const).map((variant) => (
            <div key={variant} className="demo-row demo-row--baseline">
              {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                <Button
                  key={`${variant}-${size}`}
                  size={size}
                  variant={variant}
                  leftIcon={<Circle strokeWidth={2} />}
                >
                  Button {size}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="demo-panel">
        <h4 className="demo-panel__title">Icon trailing buttons</h4>
        <div className="button-size-grid">
          {(['primary', 'secondary', 'tertiary', 'ghost'] as const).map((variant) => (
            <div key={variant} className="demo-row demo-row--baseline">
              {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                <Button
                  key={`${variant}-${size}`}
                  size={size}
                  variant={variant}
                  rightIcon={<ArrowRight />}
                >
                  Button {size}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="demo-panel">
        <h4 className="demo-panel__title">Icon only buttons</h4>
        <div className="demo-row demo-row--baseline">
          <Button size="sm" iconOnly aria-label="Add">
            <Plus />
          </Button>
          <Button size="sm" variant="secondary" iconOnly aria-label="Add">
            <Plus />
          </Button>
          <Button size="sm" variant="tertiary" iconOnly aria-label="Add">
            <Plus />
          </Button>
          <Button size="sm" variant="ghost" iconOnly aria-label="Add">
            <Plus />
          </Button>
          <Button size="md" iconOnly aria-label="Add">
            <Plus />
          </Button>
          <Button size="lg" variant="tertiary" iconOnly aria-label="Add">
            <Plus />
          </Button>
        </div>
      </section>

      <section className="demo-panel">
        <h4 className="demo-panel__title">Loading buttons</h4>
        <div className="demo-row demo-row--baseline">
          <Button size="sm" loading>
            Processing
          </Button>
          <Button size="sm" variant="secondary" loading>
            Processing
          </Button>
          <Button size="sm" variant="tertiary" loading>
            Processing
          </Button>
          <Button size="sm" variant="ghost" loading>
            Processing
          </Button>
          <Button size="sm" variant="split" loading>
            Processing
          </Button>
        </div>
      </section>

      <section className="demo-panel">
        <h4 className="demo-panel__title">Disabled buttons</h4>
        <div className="demo-row demo-row--baseline">
          <Button size="sm" disabled>
            Disabled
          </Button>
          <Button size="sm" variant="secondary" disabled>
            Disabled
          </Button>
          <Button size="sm" variant="tertiary" disabled>
            Disabled
          </Button>
          <Button size="sm" variant="ghost" disabled>
            Disabled
          </Button>
          <Button size="sm" variant="linkColor" disabled>
            Disabled
          </Button>
          <Button size="sm" variant="linkGray" disabled>
            Disabled
          </Button>
        </div>
      </section>

      <section className="demo-panel">
        <h4 className="demo-panel__title">Primary buttons destructive</h4>
        <div className="demo-row demo-row--baseline">
          <Button size="sm" destructive>
            Delete
          </Button>
          <Button size="md" destructive leftIcon={<Trash2 />}>
            Delete
          </Button>
          <Button size="sm" destructive loading>
            Processing
          </Button>
        </div>
      </section>

      <section className="demo-panel">
        <h4 className="demo-panel__title">Secondary buttons destructive</h4>
        <div className="demo-row demo-row--baseline">
          <Button size="sm" variant="secondary" destructive>
            Delete
          </Button>
          <Button size="md" variant="secondary" destructive leftIcon={<Trash2 />}>
            Delete
          </Button>
          <Button size="sm" variant="secondary" destructive disabled>
            Delete
          </Button>
        </div>
      </section>

      <section className="demo-panel">
        <h4 className="demo-panel__title">Tertiary buttons destructive</h4>
        <div className="demo-row demo-row--baseline">
          <Button size="sm" variant="tertiary" destructive>
            Delete
          </Button>
          <Button size="md" variant="tertiary" destructive leftIcon={<Trash2 />}>
            Delete
          </Button>
          <Button size="sm" variant="tertiary" destructive disabled>
            Delete
          </Button>
        </div>
      </section>

      <section className="demo-panel">
        <h4 className="demo-panel__title">Ghost buttons destructive</h4>
        <div className="demo-row demo-row--baseline">
          <Button size="sm" variant="ghost" destructive>
            Delete
          </Button>
          <Button size="md" variant="ghost" destructive leftIcon={<Trash2 />}>
            Delete
          </Button>
          <Button size="sm" variant="ghost" destructive disabled>
            Delete
          </Button>
        </div>
      </section>

      <section className="demo-panel">
        <h4 className="demo-panel__title">Split buttons</h4>
        <div className="demo-row demo-row--baseline">
          <Button size="sm" variant="split">
            Enabled
          </Button>
          <Button size="sm" variant="split" leftIcon={<Plus />}>
            Enabled
          </Button>
          <Button size="sm" variant="split" iconOnly aria-label="Add">
            <Plus />
          </Button>
        </div>
      </section>
    </div>
  ),
  badge: (
    <div className="demo-stack">
      <div className="demo-row">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </div>
      <div className="demo-row">
        <Badge>Neutral</Badge>
        <Badge tone="success">Paid</Badge>
        <Badge tone="warning">Open</Badge>
        <Badge tone="danger">Failed</Badge>
      </div>
    </div>
  ),
  avatar: (
    <div className="demo-row">
      <Avatar name="Maya Chen" size="sm" />
      <Avatar name="Jordan Lee" size="md" />
      <Avatar name="Priya Shah" size="lg" />
    </div>
  ),
  input: (
    <div className="demo-stack demo-stack--wide">
      <Input placeholder="Default" style={{ maxWidth: 260 }} />
      <Input placeholder="Invalid email" invalid defaultValue="ops@" style={{ maxWidth: 260 }} />
      <Input placeholder="Disabled" disabled defaultValue="Northwind Labs" style={{ maxWidth: 260 }} />
    </div>
  ),
  checkbox: (
    <div className="demo-stack">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" defaultChecked disabled />
    </div>
  ),
  'progress-bar': (
    <div className="demo-stack demo-stack--wide">
      <ProgressBar label="Storage" value={48} tone="accent" size="sm" />
      <ProgressBar label="Onboarding" value={72} size="md" />
      <ProgressBar label="Export" value={100} tone="success" size="lg" />
    </div>
  ),
  slider: <SliderDemo />,
  switch: (
    <div className="demo-stack demo-stack--wide">
      <Switch label="On" defaultChecked />
      <Switch label="Off" />
      <Switch label="Disabled on" defaultChecked disabled />
      <Switch label="Disabled off" disabled description="Cannot change while locked." />
    </div>
  ),
  textarea: (
    <div className="demo-stack demo-stack--wide">
      <Textarea placeholder="Default note…" style={{ maxWidth: 360 }} />
      <Textarea placeholder="Invalid…" invalid defaultValue="Missing required context" style={{ maxWidth: 360 }} rows={2} />
      <Textarea placeholder="Disabled…" disabled defaultValue="Read-only note" style={{ maxWidth: 360 }} rows={2} />
    </div>
  ),
  label: (
    <div className="demo-stack">
      <Label htmlFor="demo-label">Workspace name</Label>
      <Label htmlFor="demo-required" required>
        Owner email
      </Label>
      <Label htmlFor="demo-optional" optional>
        Internal note
      </Label>
    </div>
  ),
  'status-chip': (
    <div className="demo-stack">
      <div className="demo-row">
        <StatusChip size="sm">Small</StatusChip>
        <StatusChip size="md">Medium</StatusChip>
        <StatusChip size="lg">Large</StatusChip>
      </div>
      <div className="demo-row">
        <StatusChip>Queued</StatusChip>
        <StatusChip tone="success">Matched</StatusChip>
        <StatusChip tone="warning">Waiting</StatusChip>
        <StatusChip tone="danger">Failed</StatusChip>
        <StatusChip tone="info">Imported</StatusChip>
      </div>
    </div>
  ),
  'amount-diff': (
    <div className="demo-row">
      <AmountDiff value={12.4} suffix="%" />
      <AmountDiff value={-3.1} suffix="%" />
      <AmountDiff value={0} suffix="%" />
    </div>
  ),
  'search-field': (
    <div className="demo-stack demo-stack--wide">
      <SearchField placeholder="Search customers…" shortcut="⌘F" style={{ maxWidth: 280 }} />
      <SearchField placeholder="Jump to…" shortcut="/" style={{ maxWidth: 280 }} />
      <SearchField placeholder="Invalid query" invalid defaultValue="@@@" style={{ maxWidth: 280 }} />
    </div>
  ),
  kbd: (
    <div className="demo-row">
      <Kbd size="sm">⌘F</Kbd>
      <Kbd>/</Kbd>
      <Kbd>⌘K</Kbd>
      <Kbd size="sm">Esc</Kbd>
    </div>
  ),
  'type-badge': (
    <div className="demo-row">
      <TypeBadge icon={<Rocket size={14} />} tone="accent">
        Feature
      </TypeBadge>
      <TypeBadge icon={<Bug size={14} />} tone="danger">
        Bug
      </TypeBadge>
      <TypeBadge icon={<Search size={14} />} tone="info">
        Review
      </TypeBadge>
      <TypeBadge icon={<FlaskConical size={14} />} tone="success">
        Testing
      </TypeBadge>
    </div>
  ),
  'progress-cell': (
    <div className="demo-stack demo-stack--wide" style={{ maxWidth: 220 }}>
      <ProgressCell value={85} />
      <ProgressCell value={55} />
      <ProgressCell value={20} />
    </div>
  ),
  'document-card': (
    <DocumentCard
      icon={<FileText />}
      title="NDA Agreement"
      description="Standard mutual NDA for vendor onboarding."
      people={[{ name: 'Maya Chen' }, { name: 'Jordan Lee' }, { name: 'Priya Shah' }]}
      peopleLabel="240+"
      onShare={() => undefined}
      onEdit={() => undefined}
    />
  ),
  'template-card': (
    <TemplateCard
      icon={<Workflow />}
      title="Email Support Router"
      meta="Used 2 hours ago · Webhook"
      status="Active"
      statusTone="info"
      integrations={[<Mail key="mail" size={14} />, <Hash key="hash" size={14} />]}
      runsLabel="1,204 runs"
    />
  ),
  'usage-meter': (
    <div style={{ maxWidth: 240, width: '100%' }}>
      <UsageMeter value={891} max={1000} label="Usage" onAction={() => undefined} />
    </div>
  ),
  'upgrade-card': (
    <UpgradeCard
      title="Upgrade to Premium!"
      description="Unlock advanced analytics, unlimited seats, and priority support."
      onAction={() => undefined}
      onDismiss={() => undefined}
    />
  ),
  carousel: (
    <Carousel title="Recent templates" className="demo-stack--wide">
      <TemplateCard
        icon={<Workflow />}
        title="Email Support Router"
        meta="Used 2 hours ago · Webhook"
        status="Active"
        integrations={[<Mail key="m" size={14} />]}
        runsLabel="1,204 runs"
      />
      <TemplateCard
        icon={<Workflow />}
        title="Slack Digest"
        meta="Used yesterday · Schedule"
        status="Paused"
        statusTone="neutral"
        integrations={[<Hash key="s" size={14} />]}
        runsLabel="482 runs"
      />
      <TemplateCard
        icon={<Workflow />}
        title="Invoice Sync"
        meta="Used 3 days ago · Webhook"
        status="Active"
        integrations={[<FileText key="f" size={14} />]}
        runsLabel="96 runs"
      />
    </Carousel>
  ),
  'section-header': (
    <SectionHeader
      title="Your Contacts"
      description="Shared folders and contract packs."
      meta={<Badge>12</Badge>}
      actions={
        <>
          <SearchField placeholder="Search…" size="sm" style={{ width: 160 }} />
          <Button size="sm" variant="ghost" leftIcon={<SlidersHorizontal size={14} />}>
            Filter
          </Button>
        </>
      }
    />
  ),
  'workspace-switcher': (
    <div className="demo-stack" style={{ maxWidth: 240 }}>
      <WorkspaceSwitcher name="Lunor" subtitle="Contracts workspace" mark={<Moon size={16} />} onClick={() => undefined} />
      <WorkspaceSwitcher name="Northwind Labs" subtitle="Billing" />
    </div>
  ),
  'tree-view': (
    <TreeView
      defaultOpenIds={['company']}
      activeId="nda"
      onCreate={() => undefined}
      items={[
        {
          id: 'company',
          label: 'Company contracts',
          icon: <Folder size={14} />,
          children: [
            { id: 'nda', label: 'NDA Agreement', icon: <FileText size={14} /> },
            { id: 'msa', label: 'Master Service', icon: <FileText size={14} /> },
          ],
        },
        {
          id: 'onboarding',
          label: 'Onboarding templates',
          icon: <Folder size={14} />,
          children: [{ id: 'welcome', label: 'Welcome pack', icon: <FileText size={14} /> }],
        },
      ]}
    />
  ),
  'line-chart': (
    <LineChart
      title="Signed over time"
      rangeControl={
        <Select
          label="Range"
          defaultValue="jan-jun"
          options={[
            { value: 'jan-jun', label: 'Jan - Jun' },
            { value: 'jul-dec', label: 'Jul - Dec' },
          ]}
        />
      }
      series={[
        { id: 'signed', label: 'Signed', tone: 'primary' },
        { id: 'sent', label: 'Sent', tone: 'muted', dashed: true },
      ]}
      points={[
        { label: 'Jan', values: [40, 28] },
        { label: 'Feb', values: [55, 36] },
        { label: 'Mar', values: [48, 42] },
        { label: 'Apr', values: [72, 50] },
        { label: 'May', values: [68, 58] },
        { label: 'Jun', values: [90, 64] },
      ]}
    />
  ),
  'featured-icon': (
    <div className="demo-row">
      <FeaturedIcon size="sm" tone="neutral">
        <FileText />
      </FeaturedIcon>
      <FeaturedIcon size="md" tone="accent">
        <Rocket />
      </FeaturedIcon>
      <FeaturedIcon size="lg" tone="success" shape="circle">
        <Workflow />
      </FeaturedIcon>
      <FeaturedIcon size="xl" tone="warning">
        <Folder />
      </FeaturedIcon>
      <FeaturedIcon size="md" tone="danger">
        <Bug />
      </FeaturedIcon>
    </div>
  ),
  'button-group': (
    <div className="demo-stack">
      <ButtonGroup size="sm">
        <Button size="sm" variant="outlined" leftIcon={<UserPlus size={14} />}>
          New Member
        </Button>
        <Button size="sm" variant="outlined">
          New Project
        </Button>
        <Button size="sm" leftIcon={<Plus size={14} />}>
          New Task
        </Button>
      </ButtonGroup>
      <ButtonGroup attached size="sm">
        <Button size="sm" variant="outlined">
          Day
        </Button>
        <Button size="sm" variant="outlined">
          Week
        </Button>
        <Button size="sm" variant="outlined">
          Month
        </Button>
      </ButtonGroup>
    </div>
  ),
  'row-actions': (
    <RowActions
      onView={() => undefined}
      onEdit={() => undefined}
      onDelete={() => undefined}
      moreItems={[
        { id: 'duplicate', label: 'Duplicate', icon: <Copy />, onSelect: () => undefined },
        { id: 'export', label: 'Export', icon: <Download />, onSelect: () => undefined },
      ]}
    />
  ),
  'icon-stack': (
    <div className="demo-stack">
      <IconStack
        size="sm"
        items={[
          { id: 'mail', icon: <Mail size={14} />, label: 'Mail' },
          { id: 'hash', icon: <Hash size={14} />, label: 'Slack' },
          { id: 'file', icon: <FileText size={14} />, label: 'Docs' },
        ]}
      />
      <IconStack
        size="md"
        max={3}
        items={[
          { id: 'mail', icon: <Mail size={14} />, label: 'Mail' },
          { id: 'hash', icon: <Hash size={14} />, label: 'Slack' },
          { id: 'file', icon: <FileText size={14} />, label: 'Docs' },
          { id: 'folder', icon: <Folder size={14} />, label: 'Drive' },
          { id: 'users', icon: <Users size={14} />, label: 'Teams' },
        ]}
      />
    </div>
  ),
  'context-menu': (
    <ContextMenu
      items={[
        { id: 'view', label: 'View', icon: <Eye />, onSelect: () => undefined },
        { id: 'edit', label: 'Edit', icon: <Pencil />, onSelect: () => undefined },
        { id: 'sep', label: '', separator: true },
        { id: 'delete', label: 'Delete', icon: <Trash2 />, danger: true, onSelect: () => undefined },
      ]}
    >
      <div
        style={{
          width: 220,
          padding: 16,
          borderRadius: 12,
          background: 'var(--color-wash)',
          color: 'var(--color-muted)',
          fontSize: 13,
        }}
      >
        Right-click this area
      </div>
    </ContextMenu>
  ),
  'stat-metric': <StatMetric label="Active seats" value="1,284" delta="+86" />,
  'form-field': (
    <div className="demo-stack demo-stack--wide">
      <FormField id="company" label="Company" placeholder="Acme Inc." hint="Shown on invoices" style={{ maxWidth: 280 }} />
      <FormField id="company-error" label="Owner email" defaultValue="ops@" error="Enter a valid email address." style={{ maxWidth: 280 }} />
      <FormField id="company-disabled" label="Workspace ID" defaultValue="ws_northwind" disabled style={{ maxWidth: 280 }} />
    </div>
  ),
  'alert-banner': (
    <div className="demo-stack demo-stack--wide">
      <AlertBanner tone="info" title="New seats available" description="Invite up to 12 more members this cycle." />
      <AlertBanner tone="warning" title="Card expiring" description="Update billing before Apr 12." />
      <AlertBanner tone="danger" title="Payment failed" description="Retry the charge or update the card on file." />
      <AlertBanner tone="success" title="Export ready" description="Your CSV is ready to download." />
    </div>
  ),
  'user-chip': <UserChip name="Maya Chen" role="Admin" onClick={() => undefined} />,
  tabs: <TabsDemo />,
  toast: (
    <div className="demo-stack">
      <Toast tone="info" title="Sync scheduled" description="Customer list refreshes in 5 minutes." />
      <Toast tone="success" title="Invoice sent" description="Northwind Labs received #4821." />
      <Toast tone="warning" title="Seats nearly full" description="4 of 48 seats remain." />
      <Toast tone="danger" title="Payment failed" description="Card ending 4242 was declined." />
    </div>
  ),
  'notification-card': (
    <div className="demo-stack demo-stack--wide">
      <NotificationCard
        kind="billing"
        title="Failed payment"
        description="Harbor Retail’s Growth renewal could not be charged."
        time="12 minutes ago"
        unread
        actions={
          <>
            <Button size="sm" variant="inverse">
              Retry
            </Button>
            <Button size="sm" variant="ghost">
              View invoice
            </Button>
          </>
        }
      />
      <NotificationCard
        kind="message"
        actor="Priya Shah"
        title="New comment"
        description="Priya mentioned you on the seats upgrade thread."
        time="1 hour ago"
      />
    </div>
  ),
  'confirm-modal': <ConfirmModalDemo />,
  select: <SelectDemo />,
  'dropdown-menu': (
    <DropdownMenu
      trigger={
        <IconButton label="Row actions" size="sm" tone="subtle">
          <MoreHorizontal size={16} />
        </IconButton>
      }
      items={[
        { id: 'edit', label: 'Edit', icon: <Pencil />, onSelect: () => undefined },
        { id: 'duplicate', label: 'Duplicate', icon: <Copy />, onSelect: () => undefined },
        { id: 'export', label: 'Export CSV', icon: <Download />, onSelect: () => undefined },
        { id: 'sep', label: '', separator: true },
        { id: 'delete', label: 'Delete', icon: <Trash2 />, danger: true, onSelect: () => undefined },
      ]}
    />
  ),
  tooltip: (
    <Tooltip content="Monthly recurring revenue across active workspaces.">
      <IconButton label="About MRR" size="sm" tone="subtle">
        <Info size={16} />
      </IconButton>
    </Tooltip>
  ),
  pagination: <PaginationDemo />,
  'empty-state': (
    <EmptyState
      icon={<Inbox />}
      title="No invoices yet"
      description="When customers are billed, their invoices will show up here."
      action={
        <Button size="sm" variant="inverse">
          Create invoice
        </Button>
      }
    />
  ),
  'radio-group': (
    <RadioGroup
      legend="Billing cycle"
      defaultValue="yearly"
      options={[
        { value: 'monthly', label: 'Monthly', description: 'Flexible month-to-month billing.' },
        { value: 'yearly', label: 'Yearly', description: 'Save 20% with annual billing.' },
        { value: 'custom', label: 'Custom', description: 'Available on Enterprise only.', disabled: true },
      ]}
    />
  ),
  'date-picker': <DatePicker label="Invoice date" defaultValue="2026-04-12" />,
  popover: (
    <Popover
      title="Filters"
      trigger={
        <Button size="sm" variant="ghost" leftIcon={<SlidersHorizontal size={14} />}>
          Filters
        </Button>
      }
    >
      <Select
        label="Plan"
        defaultValue="growth"
        options={[
          { value: 'starter', label: 'Starter' },
          { value: 'growth', label: 'Growth' },
          { value: 'scale', label: 'Scale' },
        ]}
      />
      <Checkbox label="Only past due" />
      <Button size="sm" variant="inverse">
        Apply
      </Button>
    </Popover>
  ),
  drawer: <DrawerDemo />,
  'file-upload': (
    <div className="demo-stack demo-stack--wide">
      <FileUpload accept=".csv,.png,.pdf" />
      <FileUpload label="Locked upload" hint="Uploads disabled for viewers." accept=".csv" disabled />
    </div>
  ),
  'avatar-group': (
    <div className="demo-stack">
      <AvatarGroup
        size="sm"
        items={[
          { name: 'Maya Chen' },
          { name: 'Jordan Lee' },
          { name: 'Priya Shah' },
          { name: 'Noah Kim' },
        ]}
        max={4}
      />
      <AvatarGroup
        size="md"
        items={[
          { name: 'Maya Chen' },
          { name: 'Jordan Lee' },
          { name: 'Priya Shah' },
          { name: 'Noah Kim' },
          { name: 'Alex Rivera' },
          { name: 'Sam Ortiz' },
        ]}
        max={4}
      />
      <AvatarGroup
        size="lg"
        items={[
          { name: 'Maya Chen' },
          { name: 'Jordan Lee' },
          { name: 'Priya Shah' },
        ]}
        max={4}
      />
    </div>
  ),
  stepper: (
    <Stepper
      currentStep={1}
      steps={[
        { id: 'workspace', label: 'Workspace', description: 'Name and region' },
        { id: 'seats', label: 'Seats', description: 'Choose allocation' },
        { id: 'billing', label: 'Billing', description: 'Confirm payment' },
      ]}
    />
  ),
  'command-palette': <CommandPaletteDemo />,
  'skeleton-layout': <SkeletonLayout variant="dashboard" />,
  accordion: (
    <Accordion
      items={[
        {
          id: 'billing',
          title: 'How does billing work?',
          defaultOpen: true,
          content: 'Plans renew monthly or yearly. Failed payments retry for 7 days.',
        },
        {
          id: 'seats',
          title: 'Can I change seats mid-cycle?',
          content: 'Yes. Seat changes are prorated on the next invoice.',
        },
        {
          id: 'export',
          title: 'Where do I export invoices?',
          content: 'Open Billing → Invoices → Export CSV.',
        },
      ]}
    />
  ),
  'tag-input': (
    <div className="demo-stack demo-stack--wide">
      <TagInput label="Invite domains" defaultValue={['acme.com', 'northwind.io']} />
      <TagInput label="Invalid domains" defaultValue={['bad']} invalid />
      <TagInput label="Locked domains" defaultValue={['acme.com']} disabled />
    </div>
  ),
  'chart-card': (
    <ChartCard
      title="Revenue"
      subtitle="Last 6 weeks"
      value="$48.2k"
      delta="+12.4%"
      points={[
        { label: 'W1', value: 28 },
        { label: 'W2', value: 34 },
        { label: 'W3', value: 31 },
        { label: 'W4', value: 40 },
        { label: 'W5', value: 44 },
        { label: 'W6', value: 48 },
      ]}
    />
  ),
  'page-header': (
    <PageHeader
      title="Customers"
      description="Manage accounts, seats, and billing status."
      crumbs={[
        { label: 'Admin', to: '#' },
        { label: 'Customers' },
      ]}
      meta={<Badge tone="success">1,284 active</Badge>}
      actions={
        <>
          <Button size="sm" variant="ghost">
            Export
          </Button>
          <Button size="sm" variant="inverse">
            Add customer
          </Button>
        </>
      }
    />
  ),
  'filter-bar': <FilterBarDemo />,
  card: (
    <Card className="demo-stack--wide">
      <CardHeader>
        <div>
          <CardTitle>Settlement summary</CardTitle>
          <CardDescription>Last reconciled batch for Harbor Retail.</CardDescription>
        </div>
        <CardAction>
          <StatusChip tone="success">Synced</StatusChip>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Text as="p" variant="muted">
          128 matched · 4 waiting · 1 unidentified
        </Text>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="ghost">
          Details
        </Button>
        <Button size="sm" variant="inverse">
          Re-run
        </Button>
      </CardFooter>
    </Card>
  ),
  dialog: <DialogDemo />,
  'date-range-picker': (
    <DateRangePicker label="Report range" defaultValue={{ from: '2026-03-01', to: '2026-03-31' }} />
  ),
  table: <TableDemo />,
  'notifications-menu': (
    <NotificationsMenu
      items={[
        {
          id: '1',
          title: 'Import finished',
          description: 'BCA statement · 842 rows',
          time: '2m ago',
          unread: true,
        },
        {
          id: '2',
          actor: 'Priya Shah',
          title: 'Review assigned',
          description: 'Waiting queue item #1904',
          time: '1h ago',
        },
      ]}
      onViewAll={() => undefined}
    />
  ),
  'app-shell': (
    <div className="app-shell-preview">
      <AppShell title="Customers" crumbs={[{ label: 'Admin', to: '#' }, { label: 'Customers' }]}>
        <StatsRow />
      </AppShell>
    </div>
  ),
  sidebar: (
    <div className="sidebar-preview">
      <Sidebar
        brand={
          <WorkspaceSwitcher
            name="Lunor"
            subtitle="Contracts"
            mark={<Moon size={16} />}
            onClick={() => undefined}
          />
        }
        header={<SearchField placeholder="Search…" shortcut="/" size="sm" />}
        afterNav={
          <TreeView
            createLabel="Create folder"
            onCreate={() => undefined}
            items={[
              {
                id: 'company',
                label: 'Company contracts',
                icon: <Folder size={14} />,
                children: [{ id: 'nda', label: 'NDA Agreement', icon: <FileText size={14} /> }],
              },
            ]}
          />
        }
        footer={
          <>
            <UsageMeter value={891} max={1000} onAction={() => undefined} />
            <UserChip name="Maya Chen" role="Admin" onClick={() => undefined} />
          </>
        }
      />
      <Sidebar defaultCompact defaultActiveId="dashboard" defaultOpenIds={[]} />
    </div>
  ),
  'admin-topbar': <AdminTopBar title="Customers" />,
  'data-table': (
    <div className="demo-stack demo-stack--wide">
      <DataTable
        rows={[
          {
            id: '1',
            customer: 'Northwind',
            email: 'ops@northwind.io',
            plan: 'Growth',
            amount: '$890',
            status: 'Paid',
            statusTone: 'success',
          },
          {
            id: '2',
            customer: 'Harbor',
            email: 'finance@harbor.co',
            plan: 'Starter',
            amount: '$120',
            status: 'Open',
            statusTone: 'warning',
          },
        ]}
      />
      <DataTable
        variant="tasks"
        title="All tasks"
        subtitle="Current sprint"
        rows={[
          {
            id: 't1',
            name: 'Refactor login flow',
            people: [{ name: 'Maya Chen' }, { name: 'Jordan Lee' }],
            type: 'Feature',
            typeIcon: <Rocket size={14} />,
            typeTone: 'accent',
            timeline: 'Jun 24 – Jul 3',
            priority: 'High',
            priorityTone: 'danger',
            progress: 72,
            onView: () => undefined,
            onEdit: () => undefined,
          },
          {
            id: 't2',
            name: 'Fix avatar stacking',
            people: [{ name: 'Priya Shah' }],
            type: 'Bug',
            typeIcon: <Bug size={14} />,
            typeTone: 'danger',
            timeline: 'Jun 28 – Jul 1',
            priority: 'Medium',
            priorityTone: 'warning',
            progress: 40,
            onView: () => undefined,
            onDelete: () => undefined,
          },
        ]}
      />
    </div>
  ),
  calendar: (
    <Calendar
      className="demo-stack--wide"
      events={[
        { id: '1', title: 'Sprint review', date: '2026-10-08', tone: 'accent' },
        { id: '2', title: 'Design sync', date: '2026-10-08', tone: 'success' },
        { id: '3', title: 'Launch', date: '2026-10-15', tone: 'warning' },
        { id: '4', title: 'Retro', date: '2026-10-22', tone: 'neutral' },
      ]}
      defaultMonth={new Date(2026, 9, 1)}
      actions={
        <Button size="sm" variant="outlined" leftIcon={<Plus size={14} />}>
          Add event
        </Button>
      }
    />
  ),
  'stats-row': <StatsRow />,
  'activity-feed': <ActivityFeed />,
  'dashboard-preview': (
    <div className="demo-row">
      <Badge tone="accent">See landing preview</Badge>
      <Text as="span" variant="muted">
        Full shell on Home
      </Text>
    </div>
  ),
  'dashboard-board': (
    <div className="demo-stack--wide" style={{ width: '100%', overflow: 'auto' }}>
      <DashboardBoard />
    </div>
  ),
  introduction: (
    <div className="demo-stack demo-stack--wide">
      <Text as="p" variant="muted">
        Admin and dashboard building blocks organized like a product catalog. Tokens use ink on a soft
        wash canvas, with indigo as the primary action color.
      </Text>
    </div>
  ),
  tokens: (
    <div className="token-swatches token-swatches--preview">
      {[
        ['Primary', '#5b5ff7'],
        ['Ink', '#1c1c1c'],
        ['Muted', '#656565'],
        ['Border', '#e8e8e8'],
        ['Wash', '#f5f5f5'],
        ['White', '#ffffff'],
      ].map(([name, value]) => (
        <div key={name} className="token-swatch">
          <span className="token-swatch__chip" style={{ background: value }} />
          <Text as="p" variant="bodyMedium">
            {name}
          </Text>
          <Text as="p" variant="muted">
            {value}
          </Text>
        </div>
      ))}
    </div>
  ),
  typography: (
    <div className="demo-stack demo-stack--wide">
      <Text as="p" variant="body">
        DM Sans · 15px body · 24px section titles · 16px cards · rounded controls
      </Text>
      <div className="demo-row">
        <Skeleton width={120} height={12} />
        <Skeleton width={80} height={24} radius="pill" />
        <Skeleton width={40} height={40} radius="pill" />
      </div>
    </div>
  ),
  'icon-button': (
    <div className="demo-row">
      <IconButton label="Add" size="sm">
        <Plus size={14} />
      </IconButton>
      <IconButton label="Edit" size="md">
        <Pencil size={16} />
      </IconButton>
      <IconButton label="More" size="sm" tone="ghost">
        <MoreHorizontal size={16} />
      </IconButton>
    </div>
  ),
  breadcrumb: (
    <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Components' }, { label: 'Breadcrumbs' }]} />
  ),
  divider: (
    <div className="demo-stack demo-stack--wide">
      <Divider />
      <Divider label="Type & shape" />
    </div>
  ),
  'site-footer': (
    <div className="site-chrome-preview">
      <SiteFooter />
    </div>
  ),
  'site-header': (
    <div className="site-chrome-preview">
      <SiteHeader />
    </div>
  ),
}

const extraMeta: Record<
  string,
  { name: string; description: string; layer: string; category: string; tags: string[] }
> = {
  introduction: {
    name: 'Introduction',
    description: 'How the kit is organized and what the token system is for.',
    layer: 'Docs',
    category: 'Documentation',
    tags: ['start'],
  },
  tokens: {
    name: 'Theming',
    description: 'Color tokens for ink, canvas, and primary actions.',
    layer: 'Docs',
    category: 'Documentation',
    tags: ['tokens'],
  },
  typography: {
    name: 'Typography',
    description: 'Type scale used across admin surfaces and marketing pages.',
    layer: 'Docs',
    category: 'Documentation',
    tags: ['type'],
  },
  'icon-button': {
    name: 'IconButton',
    description: 'Compact icon-only actions for toolbars and row utilities.',
    layer: 'Atom',
    category: 'Actions',
    tags: ['actions'],
  },
  breadcrumb: {
    name: 'Breadcrumb',
    description: 'Path trail for nested admin pages.',
    layer: 'Molecule',
    category: 'Navigation',
    tags: ['nav'],
  },
  divider: {
    name: 'Divider',
    description: 'Hairline and labeled separators for stacked content.',
    layer: 'Atom',
    category: 'Layout',
    tags: ['layout'],
  },
  'site-footer': {
    name: 'SiteFooter',
    description: 'Marketing footer with product, atomic, and kit links.',
    layer: 'Organism',
    category: 'Marketing',
    tags: ['layout'],
  },
  'site-header': {
    name: 'SiteHeader',
    description: 'Marketing header with catalog navigation and download actions.',
    layer: 'Organism',
    category: 'Marketing',
    tags: ['nav'],
  },
}

function previewMeta(id: string) {
  const entry = catalog.find((item) => item.id === id)
  if (entry) return entry
  return extraMeta[id]
}

export function ComponentsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [navOpen, setNavOpen] = useState(false)
  const [activeId, setActiveId] = useState(() => resolveDocsNavId(location.hash))

  const activeItem = useMemo(
    () => docsNavItems.find((item) => item.id === activeId) ?? docsNavItems[0],
    [activeId],
  )

  const selectItem = (item: DocsNavItem) => {
    setActiveId(item.id)
    setNavOpen(false)
    navigate({ pathname: '/components', hash: `#${item.id}` }, { replace: true })
  }

  useEffect(() => {
    setActiveId(resolveDocsNavId(location.hash))
  }, [location.hash])

  return (
    <MarketingLayout>
      <div className="components-layout">
        <aside className={`components-nav ${navOpen ? 'components-nav--open' : ''}`}>
          <DocsSidebar
            query={query}
            onQueryChange={setQuery}
            activeId={activeId}
            onSelect={selectItem}
          />
        </aside>

        {navOpen ? (
          <button
            type="button"
            className="components-nav__backdrop"
            aria-label="Close catalog navigation"
            onClick={() => setNavOpen(false)}
          />
        ) : null}

        <section className="components-stage">
          <div className="components-stage__top">
            <button
              type="button"
              className="components-nav__open"
              onClick={() => setNavOpen(true)}
            >
              Browse catalog
            </button>
            <Breadcrumb
              items={[
                { label: 'Home', to: '/' },
                { label: 'Components', to: '/components#introduction' },
                { label: activeItem.label },
              ]}
            />
            <Text as="h1" variant="heading" className="animate-rise">
              {activeItem.label}
            </Text>
          </div>

          {activeItem.previewIds.length === 0 ? (
            <div className="components-empty" />
          ) : (
            <div className="components-list">
              {activeItem.previewIds.map((id) => {
                const meta = previewMeta(id)
                return (
                  <article key={id} id={id} className="catalog-item">
                    {meta ? (
                      <div className="catalog-item__meta">
                        <div className="catalog-item__title-row">
                          <Text as="h2" variant="subheading">
                            {meta.name}
                          </Text>
                          <Badge tone={meta.layer === 'Organism' ? 'accent' : 'neutral'}>
                            {meta.layer}
                          </Badge>
                        </div>
                        <Text as="p" variant="muted">
                          {meta.description}
                        </Text>
                        <div className="catalog-item__tags">
                          <Badge soft>{meta.category}</Badge>
                          {meta.tags.map((tag) => (
                            <Badge key={tag} soft>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    <div className="catalog-item__preview">{previews[id]}</div>
                  </article>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </MarketingLayout>
  )
}
