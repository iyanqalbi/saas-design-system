import type { HTMLAttributes, ReactNode } from 'react'
import './MapView.css'

export interface MapViewProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  zoomControls?: boolean
  onZoomIn?: () => void
  onZoomOut?: () => void
  children?: ReactNode
}

export function MapView({
  title = 'Map',
  subtitle,
  zoomControls = true,
  onZoomIn,
  onZoomOut,
  children,
  className = '',
  ...props
}: MapViewProps) {
  return (
    <div className={`map-view ${className}`.trim()} role="img" aria-label={title} {...props}>
      <div className="map-view__canvas" aria-hidden="true">
        <div className="map-view__grid" />
        <div className="map-view__road map-view__road--h" />
        <div className="map-view__road map-view__road--v" />
        <div className="map-view__park" />
      </div>

      <div className="map-view__markers">{children}</div>

      <div className="map-view__chrome">
        <div className="map-view__meta">
          <strong>{title}</strong>
          {subtitle ? <span>{subtitle}</span> : null}
        </div>
        {zoomControls ? (
          <div className="map-view__zoom">
            <button type="button" aria-label="Zoom in" onClick={onZoomIn}>
              +
            </button>
            <button type="button" aria-label="Zoom out" onClick={onZoomOut}>
              −
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
