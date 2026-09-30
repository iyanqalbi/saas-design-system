import { useMemo, useState, type ReactNode } from 'react'
import {
  Copy,
  Download,
  MoreHorizontal,
  Pencil,
  Trash2,
  Inbox,
  Info,
  LayoutDashboard,
  Settings,
  Users,
  SlidersHorizontal,
} from 'lucide-react'
import { Badge } from '../components/atoms/Badge'
import { Button } from '../components/atoms/Button'
import { Avatar } from '../components/atoms/Avatar'
import { Checkbox } from '../components/atoms/Checkbox'
import { Divider } from '../components/atoms/Divider'
import { IconButton } from '../components/atoms/IconButton'
import { Input } from '../components/atoms/Input'
import { ProgressBar } from '../components/atoms/ProgressBar'
import { Skeleton } from '../components/atoms/Skeleton'
import { Slider } from '../components/atoms/Slider'
import { Switch } from '../components/atoms/Switch'
import { Text } from '../components/atoms/Text'
import { Textarea } from '../components/atoms/Textarea'
import { Accordion } from '../components/molecules/Accordion'
import { AlertBanner } from '../components/molecules/AlertBanner'
import { AvatarGroup } from '../components/molecules/AvatarGroup'
import { Breadcrumb } from '../components/molecules/Breadcrumb'
import { ConfirmModal } from '../components/molecules/ConfirmModal'
import { DatePicker } from '../components/molecules/DatePicker'
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
import { Tabs } from '../components/molecules/Tabs'
import { TagInput } from '../components/molecules/TagInput'
import { Toast } from '../components/molecules/Toast'
import { Tooltip } from '../components/molecules/Tooltip'
import { UserChip } from '../components/molecules/UserChip'
import { ActivityFeed } from '../components/organisms/ActivityFeed'
import { AdminTopBar } from '../components/organisms/AdminTopBar'
import { ChartCard } from '../components/organisms/ChartCard'
import { CommandPalette } from '../components/organisms/CommandPalette'
import { DataTable } from '../components/organisms/DataTable'
import { FilterBar } from '../components/organisms/FilterBar'
import { PageHeader } from '../components/organisms/PageHeader'
import { Sidebar } from '../components/organisms/Sidebar'
import { SkeletonLayout } from '../components/organisms/SkeletonLayout'
import { StatsRow } from '../components/organisms/StatsRow'
import { catalog } from '../data/catalog'
import type { ComponentLayer } from '../data/catalog'
import { MarketingLayout } from '../templates/MarketingLayout'
import './ComponentsPage.css'

const filters: Array<'All' | ComponentLayer> = ['All', 'Atom', 'Molecule', 'Organism']

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
      <ProgressBar label="Seats used" value={seats} max={100} tone="accent" />
    </div>
  )
}

function SelectDemo() {
  const [plan, setPlan] = useState('growth')

  return (
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
  )
}

function PaginationDemo() {
  const [page, setPage] = useState(3)
  return <Pagination page={page} pageCount={12} onPageChange={setPage} />
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

const previews: Record<string, ReactNode> = {
  button: (
    <div className="demo-row">
      <Button variant="inverse" size="sm">
        Inverse
      </Button>
      <Button variant="ghost" size="sm">
        Ghost
      </Button>
      <Button variant="accent" size="sm">
        Accent
      </Button>
    </div>
  ),
  badge: (
    <div className="demo-row">
      <Badge>Neutral</Badge>
      <Badge tone="success">Paid</Badge>
      <Badge tone="warning">Open</Badge>
      <Badge tone="danger">Failed</Badge>
    </div>
  ),
  avatar: (
    <div className="demo-row">
      <Avatar name="Maya Chen" />
      <Avatar name="Jordan Lee" size="lg" />
    </div>
  ),
  input: <Input placeholder="Workspace name" style={{ maxWidth: 260 }} />,
  checkbox: <Checkbox label="Email digests" defaultChecked />,
  'progress-bar': (
    <div className="demo-stack demo-stack--wide">
      <ProgressBar label="Onboarding" value={72} />
      <ProgressBar label="Storage" value={48} tone="accent" size="sm" />
      <ProgressBar label="Export" value={100} tone="success" showValue={false} />
    </div>
  ),
  slider: <SliderDemo />,
  switch: (
    <div className="demo-stack demo-stack--wide">
      <Switch label="Email digests" description="Weekly summary of billing and seats." defaultChecked />
      <Switch label="Maintenance mode" description="Temporarily pause customer signups." />
    </div>
  ),
  textarea: (
    <Textarea placeholder="Add an internal note for this customer…" style={{ maxWidth: 360 }} />
  ),
  'search-field': <SearchField placeholder="Search customers…" style={{ maxWidth: 280 }} />,
  'stat-metric': <StatMetric label="Active seats" value="1,284" delta="+86" />,
  'form-field': (
    <FormField id="company" label="Company" placeholder="Acme Inc." hint="Shown on invoices" style={{ maxWidth: 280 }} />
  ),
  'alert-banner': (
    <AlertBanner tone="warning" title="Card expiring" description="Update billing before Apr 12." />
  ),
  'user-chip': <UserChip name="Maya Chen" role="Admin" onClick={() => undefined} />,
  tabs: (
    <div className="tabs-preview">
      <Tabs
        ariaLabel="Customer sections"
        items={[
          {
            id: 'overview',
            label: 'Overview',
            content: <Text as="p" variant="muted">Plan usage, seats, and recent invoices.</Text>,
          },
          {
            id: 'members',
            label: 'Members',
            badge: '12',
            content: <Text as="p" variant="muted">Invite teammates and manage roles.</Text>,
          },
          {
            id: 'billing',
            label: 'Billing',
            content: <Text as="p" variant="muted">Payment method and invoice history.</Text>,
          },
        ]}
      />
      <Tabs
        variant="segmented"
        ariaLabel="Time range"
        defaultValue="30d"
        items={[
          { id: '7d', label: '7d', content: null },
          { id: '30d', label: '30d', content: null },
          { id: '90d', label: '90d', content: null },
        ]}
      />
    </div>
  ),
  toast: (
    <div className="demo-stack">
      <Toast tone="success" title="Invoice sent" description="Northwind Labs received #4821." />
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
  'file-upload': <FileUpload accept=".csv,.png,.pdf" />,
  'avatar-group': (
    <AvatarGroup
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
    <TagInput label="Invite domains" defaultValue={['acme.com', 'northwind.io']} />
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
  sidebar: <Sidebar compact />,
  'admin-topbar': <AdminTopBar title="Customers" />,
  'data-table': (
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
}

export function ComponentsPage() {
  const [layer, setLayer] = useState<(typeof filters)[number]>('All')
  const [query, setQuery] = useState('')

  const items = useMemo(() => {
    return catalog.filter((entry) => {
      const matchesLayer = layer === 'All' || entry.layer === layer
      const haystack = `${entry.name} ${entry.description} ${entry.tags.join(' ')}`.toLowerCase()
      const matchesQuery = haystack.includes(query.toLowerCase().trim())
      return matchesLayer && matchesQuery
    })
  }, [layer, query])

  return (
    <MarketingLayout>
      <section className="components-hero page-shell">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Components' }]} />
        <Text as="h1" variant="heading" className="animate-rise">
          Component catalog
        </Text>
        <Text as="p" variant="muted" className="components-hero__lede animate-rise delay-1">
          Admin and dashboard building blocks organized by atomic design layers. Tokens follow the
          Refero quiet-gallery system — Hof ink, Faint canvas, Rausch accent.
        </Text>
      </section>

      <section id="tokens" className="page-shell tokens-panel animate-rise delay-2">
        <Text as="h2" variant="headingSm">
          Design tokens
        </Text>
        <div className="token-swatches">
          {[
            ['Rausch', '#ff385c'],
            ['Hof', '#222222'],
            ['Foggy', '#6a6a6a'],
            ['Bebe', '#ebebeb'],
            ['Faint', '#f7f7f7'],
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
        <Divider label="Type & shape" />
        <div className="token-notes">
          <Text as="p" variant="body">
            DM Sans · 14px body · 22px section titles · 12px cards · pill controls
          </Text>
          <div className="demo-row">
            <Skeleton width={120} height={12} />
            <Skeleton width={80} height={24} radius="pill" />
            <Skeleton width={40} height={40} radius="pill" />
          </div>
        </div>
      </section>

      <section className="page-shell components-toolbar">
        <SearchField
          placeholder="Filter components…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="components-toolbar__search"
        />
        <div className="components-toolbar__filters" role="tablist" aria-label="Layer filter">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={layer === item}
              className={`filter-chip ${layer === item ? 'filter-chip--active' : ''}`}
              onClick={() => setLayer(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section id="atoms" className="page-shell components-list">
        {items.length === 0 ? (
          <Text as="p" variant="muted">
            No components match that filter.
          </Text>
        ) : (
          items.map((entry) => (
            <article
              key={entry.id}
              id={entry.id}
              className="catalog-item"
              data-layer={entry.layer.toLowerCase()}
            >
              <div className="catalog-item__meta">
                <div className="catalog-item__title-row">
                  <Text as="h2" variant="subheading">
                    {entry.name}
                  </Text>
                  <Badge tone={entry.layer === 'Organism' ? 'accent' : 'neutral'}>{entry.layer}</Badge>
                </div>
                <Text as="p" variant="muted">
                  {entry.description}
                </Text>
                <div className="catalog-item__tags">
                  <Badge soft>{entry.category}</Badge>
                  {entry.tags.map((tag) => (
                    <Badge key={tag} soft>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="catalog-item__preview">{previews[entry.id]}</div>
            </article>
          ))
        )}
      </section>

      <div id="molecules" />
      <div id="organisms" />
      <div id="sidebar" />
      <div id="data-table" />
      <div id="stats" />
    </MarketingLayout>
  )
}
