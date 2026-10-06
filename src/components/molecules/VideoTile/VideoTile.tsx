import type { HTMLAttributes, ReactNode } from 'react'
import { MicOff, VideoOff } from 'lucide-react'
import './VideoTile.css'

export interface VideoTileProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  initials?: string
  speaking?: boolean
  muted?: boolean
  cameraOff?: boolean
  local?: boolean
  footer?: ReactNode
}

function deriveInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function VideoTile({
  name,
  initials,
  speaking = false,
  muted = false,
  cameraOff = false,
  local = false,
  footer,
  className = '',
  children,
  ...props
}: VideoTileProps) {
  return (
    <div
      className={`video-tile ${speaking ? 'video-tile--speaking' : ''} ${cameraOff ? 'video-tile--camera-off' : ''} ${className}`.trim()}
      {...props}
    >
      <div className="video-tile__media">
        {children ?? (
          <div className="video-tile__placeholder" aria-hidden="true">
            <span>{initials ?? deriveInitials(name)}</span>
          </div>
        )}
        {cameraOff ? (
          <div className="video-tile__camera-off" aria-hidden="true">
            <VideoOff size={22} />
          </div>
        ) : null}
      </div>
      <div className="video-tile__meta">
        <span className="video-tile__name">
          {name}
          {local ? ' (You)' : ''}
        </span>
        <span className="video-tile__flags">
          {muted ? <MicOff size={14} aria-label="Muted" /> : null}
        </span>
      </div>
      {footer}
    </div>
  )
}
