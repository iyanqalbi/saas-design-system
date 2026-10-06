import type { HTMLAttributes } from 'react'
import {
  Mic,
  MicOff,
  MonitorUp,
  PhoneOff,
  Video,
  VideoOff,
} from 'lucide-react'
import './RoomControls.css'

export interface RoomControlsProps extends HTMLAttributes<HTMLDivElement> {
  micOn?: boolean
  cameraOn?: boolean
  screenSharing?: boolean
  onToggleMic?: () => void
  onToggleCamera?: () => void
  onToggleScreen?: () => void
  onLeave?: () => void
}

export function RoomControls({
  micOn = true,
  cameraOn = true,
  screenSharing = false,
  onToggleMic,
  onToggleCamera,
  onToggleScreen,
  onLeave,
  className = '',
  ...props
}: RoomControlsProps) {
  return (
    <div className={`room-controls ${className}`.trim()} role="toolbar" aria-label="Room controls" {...props}>
      <button
        type="button"
        className={`room-controls__btn ${micOn ? '' : 'room-controls__btn--off'}`}
        aria-pressed={micOn}
        aria-label={micOn ? 'Mute microphone' : 'Unmute microphone'}
        onClick={onToggleMic}
      >
        {micOn ? <Mic size={18} /> : <MicOff size={18} />}
      </button>
      <button
        type="button"
        className={`room-controls__btn ${cameraOn ? '' : 'room-controls__btn--off'}`}
        aria-pressed={cameraOn}
        aria-label={cameraOn ? 'Turn camera off' : 'Turn camera on'}
        onClick={onToggleCamera}
      >
        {cameraOn ? <Video size={18} /> : <VideoOff size={18} />}
      </button>
      <button
        type="button"
        className={`room-controls__btn ${screenSharing ? 'room-controls__btn--active' : ''}`}
        aria-pressed={screenSharing}
        aria-label={screenSharing ? 'Stop sharing screen' : 'Share screen'}
        onClick={onToggleScreen}
      >
        <MonitorUp size={18} />
      </button>
      <button
        type="button"
        className="room-controls__btn room-controls__btn--danger"
        aria-label="Leave call"
        onClick={onLeave}
      >
        <PhoneOff size={18} />
      </button>
    </div>
  )
}
