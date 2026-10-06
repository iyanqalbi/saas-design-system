export interface DocsNavItem {
  id: string
  label: string
  icon?: DocsNavIcon
  /** Catalog / preview keys. Empty means the page is listed but has no kit yet. */
  previewIds: string[]
}

export interface DocsNavGroup {
  id: string
  label: string
  items: DocsNavItem[]
}

export type DocsNavIcon =
  | 'sparkles'
  | 'flag'
  | 'palette'
  | 'moon'
  | 'type'
  | 'terminal'
  | 'rtl'
  | 'refresh'
  | 'box'
  | 'zap'
  | 'figma'
  | 'file'
  | 'globe'
  | 'user'
  | 'badge-check'

export const docsNav: DocsNavGroup[] = [
  {
    id: 'documentation',
    label: 'Documentation',
    items: [
      { id: 'introduction', label: 'Introduction', icon: 'sparkles', previewIds: ['introduction'] },
      { id: 'installation', label: 'Installation', icon: 'flag', previewIds: [] },
      { id: 'theming', label: 'Theming', icon: 'palette', previewIds: ['tokens'] },
      { id: 'dark-mode', label: 'Dark mode', icon: 'moon', previewIds: [] },
      { id: 'typography', label: 'Typography', icon: 'type', previewIds: ['typography'] },
      { id: 'cli', label: 'CLI', icon: 'terminal', previewIds: [] },
      { id: 'rtl-support', label: 'RTL support', icon: 'rtl', previewIds: [] },
      { id: 'upgrade', label: 'Upgrade to v8.0', icon: 'refresh', previewIds: [] },
      { id: 'documentation-icons', label: 'Icons', icon: 'box', previewIds: [] },
      { id: 'integrations', label: 'Integrations', icon: 'zap', previewIds: [] },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    items: [
      { id: 'figma-files', label: 'Figma files', icon: 'figma', previewIds: [] },
      { id: 'resources-icons', label: 'Icons', icon: 'box', previewIds: [] },
      { id: 'file-icons', label: 'File icons', icon: 'file', previewIds: [] },
      { id: 'flag-icons', label: 'Flag icons', icon: 'globe', previewIds: [] },
      { id: 'resources-avatars', label: 'Avatars', icon: 'user', previewIds: [] },
      { id: 'logos', label: 'Logos', icon: 'badge-check', previewIds: [] },
    ],
  },
  {
    id: 'base',
    label: 'Base components',
    items: [
      { id: 'base-overview', label: 'Overview', previewIds: [] },
      { id: 'avatars', label: 'Avatars', previewIds: ['avatar', 'avatar-group', 'user-chip'] },
      { id: 'badge-groups', label: 'Badge groups', previewIds: [] },
      { id: 'badges', label: 'Badges', previewIds: ['badge', 'status-chip', 'type-badge', 'role-badge'] },
      { id: 'button-groups', label: 'Button groups', previewIds: ['button-group'] },
      { id: 'buttons', label: 'Buttons', previewIds: ['button'] },
      { id: 'checkboxes', label: 'Checkboxes', previewIds: ['checkbox'] },
      { id: 'context-menus', label: 'Context menus', previewIds: ['context-menu'] },
      { id: 'credit-cards', label: 'Credit cards', previewIds: [] },
      { id: 'dropdowns', label: 'Dropdowns', previewIds: ['dropdown-menu', 'popover'] },
      { id: 'featured-icons', label: 'Featured icons', previewIds: ['featured-icon'] },
      { id: 'illustrations', label: 'Illustrations', previewIds: [] },
      {
        id: 'inputs',
        label: 'Inputs',
        previewIds: [
          'input',
          'search-field',
          'form-field',
          'label',
          'kbd',
          'password-input',
          'phone-input',
        ],
      },
      { id: 'mobile-app-store-buttons', label: 'Mobile app store buttons', previewIds: [] },
      {
        id: 'progress-indicators',
        label: 'Progress indicators',
        previewIds: ['progress-bar', 'progress-cell', 'circular-progress'],
      },
      { id: 'qr-codes', label: 'QR codes', previewIds: ['qr-scanner'] },
      { id: 'radio-buttons', label: 'Radio buttons', previewIds: [] },
      { id: 'radio-groups', label: 'Radio groups', previewIds: ['radio-group'] },
      { id: 'rating-badge-and-stars', label: 'Rating badge and stars', previewIds: [] },
      { id: 'select', label: 'Select', previewIds: ['select'] },
      { id: 'multi-select', label: 'Multi-select', previewIds: [] },
      { id: 'sliders', label: 'Sliders', previewIds: ['slider'] },
      { id: 'social-buttons', label: 'Social buttons', previewIds: [] },
      { id: 'tags', label: 'Tags', previewIds: ['tag-input'] },
      { id: 'text-editors', label: 'Text editors', previewIds: [] },
      { id: 'textarea', label: 'Textarea', previewIds: ['textarea'] },
      { id: 'toggles', label: 'Toggles', previewIds: ['switch'] },
      { id: 'tooltips', label: 'Tooltips', previewIds: ['tooltip'] },
      { id: 'utility-buttons', label: 'Utility buttons', previewIds: ['icon-button'] },
      { id: 'verification-code-inputs', label: 'Verification code inputs', previewIds: ['otp-input'] },
      { id: 'video-players', label: 'Video players', previewIds: ['video-tile', 'room-controls'] },
    ],
  },
  {
    id: 'application-ui',
    label: 'Application UI components',
    items: [
      { id: 'app-overview', label: 'Overview', previewIds: [] },
      { id: 'activity-feeds', label: 'Activity feeds', previewIds: ['activity-feed'] },
      { id: 'activity-gauges', label: 'Activity gauges', previewIds: [] },
      { id: 'alerts', label: 'Alerts', previewIds: ['alert-banner'] },
      { id: 'breadcrumbs', label: 'Breadcrumbs', previewIds: ['breadcrumb'] },
      { id: 'calendars', label: 'Calendars', previewIds: ['calendar'] },
      { id: 'card-headers', label: 'Card headers', previewIds: ['card', 'document-card', 'template-card'] },
      { id: 'carousels', label: 'Carousels', previewIds: ['carousel'] },
      { id: 'code-snippets', label: 'Code snippets', previewIds: [] },
      { id: 'color-pickers', label: 'Color pickers', previewIds: [] },
      { id: 'command-menus', label: 'Command menus', previewIds: ['command-palette'] },
      { id: 'content-dividers', label: 'Content dividers', previewIds: ['divider'] },
      {
        id: 'content-rich-text',
        label: 'Content & Arabic text',
        previewIds: ['arabic-text', 'doa-content'],
      },
      { id: 'date-pickers', label: 'Date pickers', previewIds: ['date-picker', 'date-range-picker'] },
      { id: 'empty-states', label: 'Empty states', previewIds: ['empty-state'] },
      { id: 'file-uploaders', label: 'File uploaders', previewIds: ['file-upload'] },
      { id: 'filter-bars', label: 'Filter bars', previewIds: ['filter-bar'] },
      { id: 'gradient-pickers', label: 'Gradient pickers', previewIds: [] },
      { id: 'app-header-navigations', label: 'Header navigations', previewIds: ['admin-topbar'] },
      { id: 'image-pickers', label: 'Image pickers', previewIds: [] },
      { id: 'inline-ctas', label: 'Inline CTAs', previewIds: ['upgrade-card'] },
      { id: 'line-bar-charts', label: 'Line & bar charts', previewIds: ['chart-card', 'line-chart'] },
      { id: 'loading-indicators', label: 'Loading indicators', previewIds: ['skeleton-layout'] },
      { id: 'maps', label: 'Maps', previewIds: ['map-view', 'map-marker'] },
      { id: 'messaging', label: 'Messaging', previewIds: [] },
      { id: 'metrics', label: 'Metrics', previewIds: ['stat-metric', 'stats-row', 'amount-diff', 'usage-meter'] },
      { id: 'modals', label: 'Modals', previewIds: ['dialog', 'confirm-modal'] },
      {
        id: 'mobile-navigations',
        label: 'Mobile navigations',
        previewIds: ['bottom-nav'],
      },
      { id: 'notifications', label: 'Notifications', previewIds: ['notifications-menu', 'notification-card', 'toast'] },
      { id: 'page-headers', label: 'Page headers', previewIds: ['page-header'] },
      { id: 'paginations', label: 'Paginations', previewIds: ['pagination'] },
      { id: 'pie-charts', label: 'Pie charts', previewIds: [] },
      { id: 'progress-steps', label: 'Progress steps', previewIds: ['stepper'] },
      { id: 'radar-charts', label: 'Radar charts', previewIds: [] },
      { id: 'section-footers', label: 'Section footers', previewIds: [] },
      { id: 'section-headers', label: 'Section headers', previewIds: ['section-header'] },
      { id: 'sidebar-navigations', label: 'Sidebar navigations', previewIds: ['sidebar', 'workspace-switcher', 'upgrade-card', 'usage-meter'] },
      { id: 'drawers', label: 'Drawers', previewIds: ['drawer'] },
      { id: 'tables', label: 'Tables', previewIds: ['table', 'data-table', 'type-badge', 'progress-cell', 'row-actions'] },
      { id: 'icon-stacks', label: 'Icon stacks', previewIds: ['icon-stack'] },
      { id: 'tabs', label: 'Tabs', previewIds: ['tabs'] },
      { id: 'tree-views', label: 'Tree views', previewIds: ['tree-view'] },
    ],
  },
  {
    id: 'application-examples',
    label: 'Application UI examples',
    items: [
      { id: 'app-examples-overview', label: 'Overview', previewIds: [] },
      { id: 'dashboards-01', label: 'Dashboards 01', previewIds: ['dashboard-preview', 'app-shell'] },
      { id: 'dashboards-02', label: 'Dashboards 02', previewIds: ['dashboard-board'] },
      { id: 'settings-pages-01', label: 'Settings pages 01', previewIds: [] },
      { id: 'settings-pages-02', label: 'Settings pages 02', previewIds: [] },
      { id: 'informational-pages-01', label: 'Informational pages 01', previewIds: [] },
      { id: 'informational-pages-02', label: 'Informational pages 02', previewIds: [] },
    ],
  },
  {
    id: 'shared-examples',
    label: 'Shared page examples',
    items: [
      { id: 'shared-overview', label: 'Overview', previewIds: [] },
      { id: 'log-in-pages', label: 'Log in pages', previewIds: [] },
      { id: 'sign-up-pages', label: 'Sign up pages', previewIds: [] },
      { id: 'verification-pages', label: 'Verification pages', previewIds: [] },
      { id: 'forgot-password-pages', label: 'Forgot password pages', previewIds: [] },
      { id: 'shared-404-sections', label: '404 sections', previewIds: [] },
      { id: 'email-templates', label: 'Email templates', previewIds: [] },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing components',
    items: [
      { id: 'marketing-overview', label: 'Overview', previewIds: [] },
      { id: 'banners', label: 'Banners', previewIds: [] },
      { id: 'blog-sections', label: 'Blog sections', previewIds: [] },
      { id: 'careers-sections', label: 'Careers sections', previewIds: [] },
      { id: 'contact-sections', label: 'Contact sections', previewIds: [] },
      { id: 'content-rich-text-sections', label: 'Content & rich text sections', previewIds: [] },
      { id: 'cta-sections', label: 'CTA sections', previewIds: [] },
      { id: 'faq-sections', label: 'FAQ sections', previewIds: ['accordion'] },
      { id: 'features-sections', label: 'Features sections', previewIds: [] },
      { id: 'footers', label: 'Footers', previewIds: ['site-footer'] },
      { id: 'marketing-header-navigations', label: 'Header navigations', previewIds: ['site-header'] },
      { id: 'hero-header-sections', label: 'Hero header sections', previewIds: [] },
      { id: 'header-sections', label: 'Header sections', previewIds: [] },
      { id: 'metrics-sections', label: 'Metrics sections', previewIds: [] },
      { id: 'newsletter-cta-sections', label: 'Newsletter CTA sections', previewIds: [] },
      { id: 'pricing-sections', label: 'Pricing sections', previewIds: [] },
      { id: 'social-proof-sections', label: 'Social proof sections', previewIds: [] },
      { id: 'team-sections', label: 'Team sections', previewIds: [] },
      { id: 'testimonial-sections', label: 'Testimonial sections', previewIds: [] },
    ],
  },
  {
    id: 'marketing-examples',
    label: 'Marketing examples',
    items: [
      { id: 'marketing-examples-overview', label: 'Overview', previewIds: [] },
      { id: 'about-pages', label: 'About pages', previewIds: [] },
      { id: 'blog-posts', label: 'Blog posts', previewIds: [] },
      { id: 'blogs', label: 'Blogs', previewIds: [] },
      { id: 'contact-pages', label: 'Contact pages', previewIds: [] },
      { id: 'faq-pages', label: 'FAQ pages', previewIds: [] },
      { id: 'landing-pages', label: 'Landing pages', previewIds: [] },
      { id: 'legal-pages', label: 'Legal pages', previewIds: [] },
      { id: 'pricing-pages', label: 'Pricing pages', previewIds: [] },
      { id: 'team-pages', label: 'Team pages', previewIds: [] },
      { id: 'marketing-404-pages', label: '404 pages', previewIds: [] },
    ],
  },
]

export const docsNavItems = docsNav.flatMap((group) => group.items)

const hashAliases: Record<string, string> = {
  tokens: 'theming',
  atoms: 'buttons',
  molecules: 'tabs',
  organisms: 'sidebar-navigations',
  sidebar: 'sidebar-navigations',
  'data-table': 'tables',
  stats: 'metrics',
}

export function resolveDocsNavId(raw: string | undefined) {
  const value = (raw ?? '').replace(/^#/, '')
  if (!value) return 'introduction'
  const aliased = hashAliases[value] ?? value
  return docsNavItems.some((item) => item.id === aliased) ? aliased : 'introduction'
}
