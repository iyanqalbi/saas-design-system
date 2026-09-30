import { Skeleton } from '../../atoms/Skeleton'
import './SkeletonLayout.css'

export type SkeletonLayoutVariant = 'dashboard' | 'table' | 'form'

export interface SkeletonLayoutProps {
  variant?: SkeletonLayoutVariant
  className?: string
}

export function SkeletonLayout({ variant = 'dashboard', className = '' }: SkeletonLayoutProps) {
  if (variant === 'table') {
    return (
      <div className={`skeleton-layout skeleton-layout--table ${className}`.trim()} aria-hidden>
        <div className="skeleton-layout__row">
          <Skeleton width={160} height={18} />
          <Skeleton width={88} height={32} radius="pill" />
        </div>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="skeleton-layout__table-row">
            <Skeleton width="28%" height={14} />
            <Skeleton width="18%" height={14} />
            <Skeleton width="14%" height={14} />
            <Skeleton width={64} height={22} radius="pill" />
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'form') {
    return (
      <div className={`skeleton-layout skeleton-layout--form ${className}`.trim()} aria-hidden>
        <Skeleton width={120} height={14} />
        <Skeleton height={40} radius="md" />
        <Skeleton width={120} height={14} />
        <Skeleton height={40} radius="md" />
        <Skeleton width={120} height={14} />
        <Skeleton height={96} radius="md" />
        <div className="skeleton-layout__row skeleton-layout__row--end">
          <Skeleton width={88} height={36} radius="pill" />
          <Skeleton width={112} height={36} radius="pill" />
        </div>
      </div>
    )
  }

  return (
    <div className={`skeleton-layout skeleton-layout--dashboard ${className}`.trim()} aria-hidden>
      <div className="skeleton-layout__stats">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="skeleton-layout__stat">
            <Skeleton width="40%" height={12} />
            <Skeleton width="55%" height={22} />
            <Skeleton width={56} height={20} radius="pill" />
          </div>
        ))}
      </div>
      <div className="skeleton-layout__split">
        <div className="skeleton-layout__panel">
          <Skeleton width={140} height={16} />
          <Skeleton height={120} radius="md" />
        </div>
        <div className="skeleton-layout__panel">
          <Skeleton width={100} height={16} />
          <Skeleton height={18} />
          <Skeleton height={18} />
          <Skeleton height={18} />
        </div>
      </div>
    </div>
  )
}
