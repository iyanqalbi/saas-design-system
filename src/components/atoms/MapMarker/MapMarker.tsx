import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { MapPin } from 'lucide-react'
import './MapMarker.css'

export type MapMarkerTone = 'accent' | 'danger' | 'success' | 'neutral'

export interface MapMarkerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  tone?: MapMarkerTone
  active?: boolean
  icon?: ReactNode
}

export function MapMarker({
  label,
  tone = 'accent',
  active = false,
  icon,
  className = '',
  type = 'button',
  ...props
}: MapMarkerProps) {
  return (
    <button
      type={type}
      className={`map-marker map-marker--${tone} ${active ? 'map-marker--active' : ''} ${className}`.trim()}
      aria-label={label ?? 'Map marker'}
      {...props}
    >
      <span className="map-marker__pin" aria-hidden="true">
        {icon ?? <MapPin size={18} strokeWidth={2.25} />}
      </span>
      {label ? <span className="map-marker__label">{label}</span> : null}
    </button>
  )
}
