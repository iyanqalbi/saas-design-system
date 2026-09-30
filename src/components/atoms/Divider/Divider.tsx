import './Divider.css'

export interface DividerProps {
  label?: string
  className?: string
}

export function Divider({ label, className = '' }: DividerProps) {
  if (!label) {
    return <hr className={`divider ${className}`.trim()} />
  }

  return (
    <div className={`divider-labeled ${className}`.trim()} role="separator">
      <span className="divider-labeled__line" />
      <span className="divider-labeled__label">{label}</span>
      <span className="divider-labeled__line" />
    </div>
  )
}
