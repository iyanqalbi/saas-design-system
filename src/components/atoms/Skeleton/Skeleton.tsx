import './Skeleton.css'

export interface SkeletonProps {
  width?: string | number
  height?: string | number
  radius?: 'sm' | 'md' | 'pill'
  className?: string
}

export function Skeleton({
  width = '100%',
  height = 14,
  radius = 'md',
  className = '',
}: SkeletonProps) {
  return (
    <span
      className={`skeleton skeleton--${radius} ${className}`.trim()}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}
