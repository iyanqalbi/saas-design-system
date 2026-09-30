import { useMemo, useState, type ReactNode } from 'react'
import { Badge } from '../components/atoms/Badge'
import { Button } from '../components/atoms/Button'
import { Avatar } from '../components/atoms/Avatar'
import { Checkbox } from '../components/atoms/Checkbox'
import { Divider } from '../components/atoms/Divider'
import { Input } from '../components/atoms/Input'
import { Skeleton } from '../components/atoms/Skeleton'
import { Text } from '../components/atoms/Text'
import { AlertBanner } from '../components/molecules/AlertBanner'
import { Breadcrumb } from '../components/molecules/Breadcrumb'
import { FormField } from '../components/molecules/FormField'
import { SearchField } from '../components/molecules/SearchField'
import { StatMetric } from '../components/molecules/StatMetric'
import { UserChip } from '../components/molecules/UserChip'
import { ActivityFeed } from '../components/organisms/ActivityFeed'
import { AdminTopBar } from '../components/organisms/AdminTopBar'
import { DataTable } from '../components/organisms/DataTable'
import { Sidebar } from '../components/organisms/Sidebar'
import { StatsRow } from '../components/organisms/StatsRow'
import { catalog } from '../data/catalog'
import type { ComponentLayer } from '../data/catalog'
import { MarketingLayout } from '../templates/MarketingLayout'
import './ComponentsPage.css'

const filters: Array<'All' | ComponentLayer> = ['All', 'Atom', 'Molecule', 'Organism']

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
  'search-field': <SearchField placeholder="Search customers…" style={{ maxWidth: 280 }} />,
  'stat-metric': <StatMetric label="Active seats" value="1,284" delta="+86" />,
  'form-field': (
    <FormField id="company" label="Company" placeholder="Acme Inc." hint="Shown on invoices" style={{ maxWidth: 280 }} />
  ),
  'alert-banner': (
    <AlertBanner tone="warning" title="Card expiring" description="Update billing before Apr 12." />
  ),
  'user-chip': <UserChip name="Maya Chen" role="Admin" onClick={() => undefined} />,
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
