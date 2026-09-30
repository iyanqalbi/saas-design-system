import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../../atoms/Button'
import { IconButton } from '../../atoms/IconButton'
import './SiteHeader.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/components', label: 'Components' },
  { to: '/templates', label: 'Templates' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="site-header">
      <div className="site-header__inner page-shell">
        <Link to="/" className="site-header__brand" aria-label="SaasDS home">
          <span className="site-header__mark" aria-hidden="true" />
          <span className="site-header__name">SaasDS</span>
        </Link>

        <nav className="site-header__nav" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `site-header__link ${isActive ? 'site-header__link--active' : ''}`
              }
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__actions">
          <Button
            variant="ghost"
            size="sm"
            className="site-header__desktop-cta"
            onClick={() => navigate('/templates')}
          >
            Get template
          </Button>
          <Button variant="accent" size="sm" onClick={() => navigate('/templates')}>
            Download
          </Button>
          <IconButton
            label={open ? 'Close menu' : 'Open menu'}
            className="site-header__menu-btn"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </IconButton>
        </div>
      </div>

      {open ? (
        <div className="site-header__drawer page-shell">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="site-header__drawer-link"
              onClick={() => setOpen(false)}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
          <Button
            variant="accent"
            fullWidth
            onClick={() => {
              setOpen(false)
              navigate('/templates')
            }}
          >
            Download template
          </Button>
        </div>
      ) : null}
    </header>
  )
}
