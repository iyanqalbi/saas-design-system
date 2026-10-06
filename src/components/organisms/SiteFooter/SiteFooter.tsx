import { ExternalLink, Globe, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Text } from '../../atoms/Text'
import './SiteFooter.css'

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Components', to: '/components' },
      { label: 'Templates', to: '/templates' },
      { label: 'Design tokens', to: '/components#theming' },
    ],
  },
  {
    title: 'Atomic design',
    links: [
      { label: 'Buttons', to: '/components#buttons' },
      { label: 'Tabs', to: '/components#tabs' },
      { label: 'Sidebar', to: '/components#sidebar-navigations' },
    ],
  },
  {
    title: 'Admin kit',
    links: [
      { label: 'Sidebar', to: '/components#sidebar-navigations' },
      { label: 'Data table', to: '/components#tables' },
      { label: 'Stat metrics', to: '/components#metrics' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid page-shell">
        <div className="site-footer__brand">
          <div className="site-footer__logo">
            <span className="site-footer__mark" aria-hidden="true" />
            <Text as="p" variant="ui">
              SaasDS
            </Text>
          </div>
          <Text as="p" variant="muted">
            Quiet admin templates and a React component kit for SaaS dashboards — built with atomic
            design.
          </Text>
        </div>

        {columns.map((column) => (
          <div key={column.title} className="site-footer__column">
            <Text as="p" variant="bodySemibold">
              {column.title}
            </Text>
            <ul>
              {column.links.map((item) => (
                <li key={item.label}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="site-footer__bottom page-shell">
        <Text as="p" variant="muted">
          © {new Date().getFullYear()} SaasDS. Tokens inspired by Refero gallery style.
        </Text>
        <div className="site-footer__social">
          <a href="https://github.com/iyanqalbi/saas-design-system" aria-label="Repository">
            <ExternalLink size={16} />
          </a>
          <a href="#" aria-label="Website">
            <Globe size={16} />
          </a>
          <a href="#" aria-label="Community">
            <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
