import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const files: Record<string, string> = {
  'README.md': `# SaasDS Admin Template

Quiet React admin starter built with Atomic Design.

## Stack
- React + TypeScript + Vite
- CSS design tokens
- Atoms → Molecules → Organisms

## Getting started
\`\`\`bash
npm install
npm run dev
\`\`\`

## Structure
\`\`\`
src/
  components/
    atoms/
    molecules/
    organisms/
  styles/tokens.css
\`\`\`
`,
  'package.json': `{
  "name": "saasds-admin-template",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.544.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^6.0.0"
  }
}
`,
  'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SaasDS Admin</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
  'src/main.tsx': `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/tokens.css'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`,
  'src/App.tsx': `export default function App() {
  return (
    <div style={{ fontFamily: 'var(--font-sans)', padding: 40, background: 'var(--surface-canvas)', minHeight: '100vh' }}>
      <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--color-primary)', marginBottom: 16 }} />
      <h1 style={{ margin: '0 0 8px', fontSize: 32, fontWeight: 700 }}>SaasDS Admin Template</h1>
      <p style={{ margin: 0, color: 'var(--color-muted)', maxWidth: 480 }}>
        Drop in atoms, molecules, and organisms from the SaasDS kit to assemble your next SaaS dashboard.
      </p>
    </div>
  )
}
`,
  'src/styles/tokens.css': `:root {
  --color-primary: #5b5ff7;
  --color-primary-hover: #7c7ef8;
  --color-primary-pressed: #1f2494;
  --color-danger: #ed3b5b;
  --color-danger-strong: #d10f45;
  --color-ink: #1c1c1c;
  --color-muted: #656565;
  --color-grey-500: #bdbdbd;
  --color-border: #e8e8e8;
  --color-soft: #d9d9d9;
  --color-wash: #f5f5f5;
  --color-white: #ffffff;
  --surface-canvas: #f5f5f5;
  --surface-card: #ffffff;
  --font-sans: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
  --radius-cards: 12px;
  --radius-buttons: 10px;
}
`,
  'src/styles/global.css': `body {
  margin: 0;
  font-family: var(--font-sans);
  color: var(--color-ink);
  background: var(--surface-canvas);
}
`,
  'src/components/atoms/Button.tsx': `import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'inverse' | 'ghost' | 'accent'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
}

const styles: Record<Variant, React.CSSProperties> = {
  inverse: { background: '#1c1c1c', color: '#fff', border: 'none' },
  ghost: { background: 'transparent', color: '#1c1c1c', border: '1px solid #1c1c1c' },
  accent: { background: '#5b5ff7', color: '#fff', border: 'none' },
}

export function Button({ variant = 'inverse', children, style, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        padding: '0 16px',
        borderRadius: 10,
        fontWeight: 500,
        cursor: 'pointer',
        ...styles[variant],
        ...style,
      }}
    >
      {children}
    </button>
  )
}
`,
  'src/components/atoms/Badge.tsx': `export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 24,
        padding: '0 12px',
        borderRadius: 9999,
        background: '#f5f5f5',
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  )
}
`,
  'src/components/molecules/StatMetric.tsx': `import { Badge } from '../atoms/Badge'

export function StatMetric({
  label,
  value,
  delta,
}: {
  label: string
  value: string
  delta?: string
}) {
  return (
    <article
      style={{
        padding: 20,
        background: '#fff',
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <p style={{ margin: 0, color: '#656565', fontSize: 15 }}>{label}</p>
      <p style={{ margin: 0, fontSize: 24, fontWeight: 600, letterSpacing: '-0.015em' }}>{value}</p>
      {delta ? <Badge>{delta}</Badge> : null}
    </article>
  )
}
`,
  'vite.config.ts': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
`,
}

export async function downloadAdminTemplate() {
  const zip = new JSZip()
  const root = zip.folder('saasds-admin-template')

  if (!root) {
    throw new Error('Unable to create zip folder')
  }

  Object.entries(files).forEach(([path, content]) => {
    root.file(path, content)
  })

  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, 'saasds-admin-template.zip')
}
