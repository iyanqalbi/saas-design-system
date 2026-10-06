import type { HTMLAttributes, ReactNode } from 'react'
import { ScanLine } from 'lucide-react'
import './QrScanner.css'

export type QrScannerState = 'idle' | 'scanning' | 'success' | 'error'

export interface QrScannerProps extends HTMLAttributes<HTMLDivElement> {
  state?: QrScannerState
  title?: string
  helperText?: string
  footer?: ReactNode
}

const HELPER: Record<QrScannerState, string> = {
  idle: 'Align the QR code inside the frame',
  scanning: 'Scanning… hold steady',
  success: 'Code detected',
  error: 'Unable to read code — try again',
}

export function QrScanner({
  state = 'idle',
  title = 'Scan QR code',
  helperText,
  footer,
  className = '',
  ...props
}: QrScannerProps) {
  return (
    <div
      className={`qr-scanner qr-scanner--${state} ${className}`.trim()}
      role="region"
      aria-label={title}
      {...props}
    >
      <div className="qr-scanner__viewport">
        <div className="qr-scanner__frame" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <ScanLine className="qr-scanner__beam" size={28} aria-hidden="true" />
        <div className="qr-scanner__ghost" aria-hidden="true" />
      </div>
      <div className="qr-scanner__copy">
        <h3 className="qr-scanner__title">{title}</h3>
        <p className="qr-scanner__helper">{helperText ?? HELPER[state]}</p>
      </div>
      {footer ? <div className="qr-scanner__footer">{footer}</div> : null}
    </div>
  )
}
