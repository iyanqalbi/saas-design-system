import { ArrowRight, Boxes, Download, Layers3 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '../components/atoms/Badge'
import { Button } from '../components/atoms/Button'
import { Text } from '../components/atoms/Text'
import { ComponentCard } from '../components/molecules/ComponentCard'
import { StatMetric } from '../components/molecules/StatMetric'
import { AlertBanner } from '../components/molecules/AlertBanner'
import { Button as PreviewButton } from '../components/atoms/Button'
import { Badge as PreviewBadge } from '../components/atoms/Badge'
import { DashboardPreview } from '../components/organisms/DashboardPreview'
import { MarketingLayout } from '../templates/MarketingLayout'
import { downloadAdminTemplate } from '../lib/downloadTemplate'
import './LandingPage.css'

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <MarketingLayout>
      <section className="hero">
        <div className="hero__atmosphere" aria-hidden="true" />
        <div className="hero__grain" aria-hidden="true" />
        <div className="page-shell hero__content">
          <Text as="p" variant="caption" className="hero__brand animate-rise">
            <span className="hero__brand-mark" aria-hidden="true" />
            SaasDS
          </Text>
          <Text as="h1" variant="heading" className="hero__title animate-rise delay-1">
            React admin templates with quiet product craft.
          </Text>
          <Text as="p" variant="muted" className="hero__lede animate-rise delay-2">
            A quiet component kit for SaaS dashboards — indigo for primary actions. Built with
            atomic design so your portal scales without visual noise.
          </Text>
          <div className="hero__actions animate-rise delay-3">
            <Button
              variant="accent"
              size="lg"
              leftIcon={<Download size={16} />}
              onClick={() => void downloadAdminTemplate()}
            >
              Download React template
            </Button>
            <Button variant="ghost" size="lg" rightIcon={<ArrowRight size={16} />} onClick={() => navigate('/components')}>
              Browse components
            </Button>
          </div>
        </div>
        <div className="hero__stage animate-rise delay-4">
          <div className="page-shell">
            <DashboardPreview className="hero__preview" />
          </div>
        </div>
      </section>

      <section className="section page-shell">
        <div className="section__intro">
          <Text as="h2" variant="headingSm">
            Built the atomic way
          </Text>
          <Text as="p" variant="muted">
            Start with atoms, compose molecules, assemble organisms — then ship an admin portal that
            still feels like one system.
          </Text>
        </div>
        <div className="value-grid">
          {[
            {
              icon: <Layers3 size={20} />,
              title: 'Atoms → Organisms',
              copy: 'Buttons, fields, and badges stay consistent as they grow into sidebars and tables.',
            },
            {
              icon: <Boxes size={20} />,
              title: 'Admin-first pieces',
              copy: 'Stats, activity feeds, invoice tables, and top bars ready for SaaS workflows.',
            },
            {
              icon: <Download size={20} />,
              title: 'Downloadable starter',
              copy: 'Grab a Vite + React template wired to the same tokens and folder structure.',
            },
          ].map((item) => (
            <article key={item.title} className="value-card">
              <span className="value-card__icon">{item.icon}</span>
              <Text as="h3" variant="bodySemibold">
                {item.title}
              </Text>
              <Text as="p" variant="muted">
                {item.copy}
              </Text>
            </article>
          ))}
        </div>
      </section>

      <section className="section page-shell">
        <div className="section__intro section__intro--row">
          <div>
            <Text as="h2" variant="headingSm">
              Featured admin components
            </Text>
            <Text as="p" variant="muted">
              A first wave of portal building blocks — more layers landing in the catalog.
            </Text>
          </div>
          <Button variant="subtle" onClick={() => navigate('/components')}>
            View all
          </Button>
        </div>
        <div className="feature-grid">
          <ComponentCard
            name="Button"
            layer="Atom"
            description="Contained, outlined, and texted actions with processing state."
            preview={
              <div className="preview-row">
                <PreviewButton variant="contained" size="sm">
                  Save
                </PreviewButton>
                <PreviewButton variant="outlined" size="sm">
                  Cancel
                </PreviewButton>
                <PreviewButton variant="texted" size="sm">
                  Publish
                </PreviewButton>
              </div>
            }
          />
          <ComponentCard
            name="StatMetric"
            layer="Molecule"
            description="KPI tile with delta badge for overview dashboards."
            preview={<StatMetric label="MRR" value="$48.2k" delta="+12.4%" />}
            tone="success"
          />
          <ComponentCard
            name="AlertBanner"
            layer="Molecule"
            description="Workspace notice for seats, billing, and system events."
            preview={
              <AlertBanner tone="success" title="Invoice sent" description="Northwind Labs · $890" />
            }
            tone="success"
          />
          <ComponentCard
            name="DashboardPreview"
            layer="Organism"
            description="Assembled admin shell with sidebar, stats, and table."
            preview={
              <div className="mini-dash">
                <PreviewBadge>Sidebar</PreviewBadge>
                <PreviewBadge tone="accent">Stats</PreviewBadge>
                <PreviewBadge tone="success">Table</PreviewBadge>
              </div>
            }
            tone="accent"
          />
        </div>
      </section>

      <section className="cta-band">
        <div className="page-shell cta-band__inner">
          <div>
            <Badge soft={false}>Template pack</Badge>
            <Text as="h2" variant="heading" className="cta-band__title">
              Ship your next admin portal faster.
            </Text>
            <Text as="p" variant="muted">
              Download the React starter, keep the tokens, and extend the atomic tree as your product
              grows.
            </Text>
          </div>
          <div className="cta-band__actions">
            <Button
              variant="accent"
              size="lg"
              leftIcon={<Download size={16} />}
              onClick={() => void downloadAdminTemplate()}
            >
              Download .zip
            </Button>
            <Button variant="ghost" size="lg" onClick={() => navigate('/templates')}>
              Template details
            </Button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
