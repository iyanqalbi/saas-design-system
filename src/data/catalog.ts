export type ComponentLayer = 'Atom' | 'Molecule' | 'Organism'

export interface CatalogEntry {
  id: string
  name: string
  layer: ComponentLayer
  category: string
  description: string
  tags: string[]
}

export const catalog: CatalogEntry[] = [
  {
    id: 'button',
    name: 'Button',
    layer: 'Atom',
    category: 'Actions',
    description: 'Inverse, ghost, accent, and subtle actions for admin surfaces.',
    tags: ['cta', 'form'],
  },
  {
    id: 'badge',
    name: 'Badge',
    layer: 'Atom',
    category: 'Feedback',
    description: 'Status pills for invoices, seats, and workflow states.',
    tags: ['status'],
  },
  {
    id: 'avatar',
    name: 'Avatar',
    layer: 'Atom',
    category: 'Identity',
    description: 'Circular identity mark with initials fallback.',
    tags: ['user'],
  },
  {
    id: 'input',
    name: 'Input',
    layer: 'Atom',
    category: 'Forms',
    description: 'Quiet text field with hairline borders and Hof focus ring.',
    tags: ['form'],
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    layer: 'Atom',
    category: 'Forms',
    description: 'Compact selection control for filters and settings.',
    tags: ['form'],
  },
  {
    id: 'search-field',
    name: 'SearchField',
    layer: 'Molecule',
    category: 'Navigation',
    description: 'Icon + input pair used in admin top bars.',
    tags: ['search'],
  },
  {
    id: 'stat-metric',
    name: 'StatMetric',
    layer: 'Molecule',
    category: 'Analytics',
    description: 'KPI tile with label, value, and delta badge.',
    tags: ['dashboard'],
  },
  {
    id: 'form-field',
    name: 'FormField',
    layer: 'Molecule',
    category: 'Forms',
    description: 'Label, control, hint, and error composition.',
    tags: ['form'],
  },
  {
    id: 'alert-banner',
    name: 'AlertBanner',
    layer: 'Molecule',
    category: 'Feedback',
    description: 'Inline workspace notices for billing and seats.',
    tags: ['feedback'],
  },
  {
    id: 'user-chip',
    name: 'UserChip',
    layer: 'Molecule',
    category: 'Identity',
    description: 'Avatar + name + role for account menus.',
    tags: ['user'],
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    layer: 'Organism',
    category: 'Navigation',
    description: 'Workspace navigation with grouped admin destinations.',
    tags: ['admin', 'nav'],
  },
  {
    id: 'admin-topbar',
    name: 'AdminTopBar',
    layer: 'Organism',
    category: 'Navigation',
    description: 'Breadcrumbs, title, search, and account utilities.',
    tags: ['admin', 'nav'],
  },
  {
    id: 'data-table',
    name: 'DataTable',
    layer: 'Organism',
    category: 'Data',
    description: 'Invoice/customer table with status badges.',
    tags: ['admin', 'table'],
  },
  {
    id: 'stats-row',
    name: 'StatsRow',
    layer: 'Organism',
    category: 'Analytics',
    description: 'Four-up KPI strip for overview dashboards.',
    tags: ['dashboard'],
  },
  {
    id: 'activity-feed',
    name: 'ActivityFeed',
    layer: 'Organism',
    category: 'Data',
    description: 'Chronological workspace event list.',
    tags: ['admin'],
  },
  {
    id: 'dashboard-preview',
    name: 'DashboardPreview',
    layer: 'Organism',
    category: 'Layouts',
    description: 'Assembled admin portal shell using the kit.',
    tags: ['admin', 'template'],
  },
]
