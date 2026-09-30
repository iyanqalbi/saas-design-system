import { Check } from 'lucide-react'
import './Stepper.css'

export interface StepperStep {
  id: string
  label: string
  description?: string
}

export interface StepperProps {
  steps: StepperStep[]
  currentStep: number
  className?: string
}

export function Stepper({ steps, currentStep, className = '' }: StepperProps) {
  return (
    <ol className={`stepper ${className}`.trim()}>
      {steps.map((step, index) => {
        const status =
          index < currentStep ? 'complete' : index === currentStep ? 'current' : 'upcoming'
        return (
          <li key={step.id} className={`stepper__item stepper__item--${status}`}>
            <span className="stepper__indicator" aria-hidden="true">
              {status === 'complete' ? <Check size={14} strokeWidth={2.5} /> : index + 1}
            </span>
            <span className="stepper__copy">
              <span className="stepper__label">{step.label}</span>
              {step.description ? (
                <span className="stepper__description">{step.description}</span>
              ) : null}
            </span>
            {index < steps.length - 1 ? <span className="stepper__connector" aria-hidden /> : null}
          </li>
        )
      })}
    </ol>
  )
}
