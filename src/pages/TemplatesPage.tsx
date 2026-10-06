import { Check, Download, FolderTree, Package } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '../components/atoms/Badge'
import { Button } from '../components/atoms/Button'
import { Text } from '../components/atoms/Text'
import { AlertBanner } from '../components/molecules/AlertBanner'
import { Breadcrumb } from '../components/molecules/Breadcrumb'
import { downloadAdminTemplate } from '../lib/downloadTemplate'
import { MarketingLayout } from '../templates/MarketingLayout'
import './TemplatesPage.css'

const includes = [
  'Vite + React + TypeScript starter',
  'CSS design tokens (variables)',
  'Atomic folder structure (atoms / molecules / organisms)',
  'Sample Button, Badge, and StatMetric components',
  'DM Sans typography wiring',
]

export function TemplatesPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleDownload() {
    try {
      setStatus('loading')
      await downloadAdminTemplate()
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <MarketingLayout>
      <section className="templates-hero page-shell">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Templates' }]} />
        <Badge tone="accent">React admin pack</Badge>
        <Text as="h1" variant="heading" className="animate-rise">
          Download the SaasDS admin template
        </Text>
        <Text as="p" variant="muted" className="templates-hero__lede animate-rise delay-1">
          A ready-to-run React starter that mirrors this site’s tokens and atomic design layout —
          so your product portal and marketing kit stay in sync.
        </Text>
        <div className="templates-hero__actions animate-rise delay-2">
          <Button
            variant="accent"
            size="lg"
            leftIcon={<Download size={16} />}
            onClick={() => void handleDownload()}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Preparing zip…' : 'Download React template'}
          </Button>
          <Button variant="ghost" size="lg" onClick={() => window.open('https://github.com/iyanqalbi/saas-design-system', '_blank')}>
            View repository
          </Button>
        </div>
        {status === 'done' ? (
          <AlertBanner tone="success" title="Download started" description="saasds-admin-template.zip is ready." />
        ) : null}
        {status === 'error' ? (
          <AlertBanner tone="danger" title="Download failed" description="Please try again in a moment." />
        ) : null}
      </section>

      <section className="page-shell templates-grid">
        <article className="template-card">
          <span className="template-card__icon">
            <Package size={20} />
          </span>
          <Text as="h2" variant="headingSm">
            What’s inside
          </Text>
          <ul className="template-card__list">
            {includes.map((item) => (
              <li key={item}>
                <Check size={16} aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="template-card">
          <span className="template-card__icon">
            <FolderTree size={20} />
          </span>
          <Text as="h2" variant="headingSm">
            Suggested structure
          </Text>
          <pre className="template-card__code">{`src/
  components/
    atoms/
    molecules/
    organisms/
  styles/
    tokens.css
    global.css
  App.tsx`}</pre>
        </article>
      </section>
    </MarketingLayout>
  )
}
