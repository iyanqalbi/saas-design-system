import { useRef, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { IconButton } from '../../atoms/IconButton'
import { Text } from '../../atoms/Text'
import './Carousel.css'

export interface CarouselProps {
  title?: string
  action?: ReactNode
  children: ReactNode
  className?: string
}

export function Carousel({ title, action, children, className = '' }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  function scrollBy(direction: -1 | 1) {
    const track = trackRef.current
    if (!track) return
    const amount = Math.max(track.clientWidth * 0.7, 220)
    track.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  return (
    <section className={`carousel ${className}`.trim()}>
      {title || action ? (
        <div className="carousel__header">
          {title ? (
            <Text as="h3" variant="bodySemibold" className="carousel__title">
              {title}
            </Text>
          ) : (
            <span />
          )}
          <div className="carousel__controls">
            {action}
            <IconButton label="Scroll left" size="sm" tone="subtle" onClick={() => scrollBy(-1)}>
              <ChevronLeft size={16} />
            </IconButton>
            <IconButton label="Scroll right" size="sm" tone="subtle" onClick={() => scrollBy(1)}>
              <ChevronRight size={16} />
            </IconButton>
          </div>
        </div>
      ) : null}
      <div className="carousel__track" ref={trackRef}>
        {children}
      </div>
    </section>
  )
}
