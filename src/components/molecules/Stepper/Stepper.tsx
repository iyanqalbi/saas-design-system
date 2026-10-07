import { Check } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import './Stepper.css'

export type StepperVariant =
  | 'chevrons'
  | 'inline'
  | 'circles'
  | 'icons'
  | 'status'
  /** Legacy stacked list (vertical on all breakpoints). */
  | 'stack'

export type StepperStatus = 'complete' | 'current' | 'upcoming'

export interface StepperStep {
  id: string
  label: string
  description?: string
  /** Optional icon for the `icons` variant. */
  icon?: ReactNode
  /** Override status copy for the `status` variant. */
  statusLabel?: string
}

export interface StepperProps {
  steps: StepperStep[]
  /** Zero-based index of the active step. */
  currentStep: number
  variant?: StepperVariant
  className?: string
}

const STATUS_COPY: Record<StepperStatus, string> = {
  complete: 'Completed',
  current: 'In Progress',
  upcoming: 'Pending',
}

function stepStatus(index: number, currentStep: number): StepperStatus {
  if (index < currentStep) return 'complete'
  if (index === currentStep) return 'current'
  return 'upcoming'
}

function padIndex(index: number) {
  return String(index + 1).padStart(2, '0')
}

function StepIndicator({
  status,
  index,
  variant,
  icon,
}: {
  status: StepperStatus
  index: number
  variant: StepperVariant
  icon?: ReactNode
}) {
  if (variant === 'icons') {
    return (
      <span className="stepper__indicator" aria-hidden="true">
        {icon ?? <span className="stepper__dot" />}
      </span>
    )
  }

  if (variant === 'inline' || variant === 'status') {
    return (
      <span className="stepper__indicator" aria-hidden="true">
        {status === 'complete' ? (
          <Check size={variant === 'status' ? 10 : 12} strokeWidth={2.75} />
        ) : status === 'current' ? (
          <span className="stepper__dot" />
        ) : null}
      </span>
    )
  }

  return (
    <span className="stepper__indicator" aria-hidden="true">
      {status === 'complete' ? <Check size={16} strokeWidth={2.5} /> : padIndex(index)}
    </span>
  )
}

export function Stepper({
  steps,
  currentStep,
  variant = 'circles',
  className = '',
}: StepperProps) {
  const safeCurrent = Math.min(Math.max(currentStep, 0), Math.max(steps.length - 1, 0))
  const progress = steps.length <= 1 ? 0 : safeCurrent / (steps.length - 1)
  const showConnector = variant !== 'chevrons' && variant !== 'icons'
  const showIndicator = variant !== 'chevrons'

  return (
    <ol
      className={`stepper stepper--${variant} ${className}`.trim()}
      style={
        variant === 'icons'
          ? ({ '--stepper-progress': `${progress * 100}%` } as CSSProperties)
          : undefined
      }
    >
      {steps.map((step, index) => {
        const status = stepStatus(index, safeCurrent)
        const statusLabel = step.statusLabel ?? STATUS_COPY[status]

        return (
          <li
            key={step.id}
            className={`stepper__item stepper__item--${status}`}
            aria-current={status === 'current' ? 'step' : undefined}
          >
            {showConnector && index < steps.length - 1 ? (
              <span className="stepper__connector" aria-hidden="true" />
            ) : null}

            {showIndicator ? (
              <StepIndicator
                status={status}
                index={index}
                variant={variant}
                icon={step.icon}
              />
            ) : null}

            <span className="stepper__copy">
              {variant === 'status' ? (
                <span className="stepper__meta">Step {index + 1}</span>
              ) : null}
              <span className="stepper__label">{step.label}</span>
              {variant === 'status' ? (
                <span className={`stepper__status stepper__status--${status}`}>{statusLabel}</span>
              ) : step.description ? (
                <span className="stepper__description">{step.description}</span>
              ) : null}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
