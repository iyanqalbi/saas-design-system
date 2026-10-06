import type { HTMLAttributes, ReactNode } from 'react'
import { ArabicText } from '../../atoms/ArabicText'
import './DoaContent.css'

export interface DoaContentProps extends HTMLAttributes<HTMLElement> {
  title: string
  arabic: ReactNode
  latin?: string
  translation?: string
  source?: string
}

export function DoaContent({
  title,
  arabic,
  latin,
  translation,
  source,
  className = '',
  ...props
}: DoaContentProps) {
  return (
    <article className={`doa-content ${className}`.trim()} {...props}>
      <header className="doa-content__header">
        <h3 className="doa-content__title">{title}</h3>
        {source ? <p className="doa-content__source">{source}</p> : null}
      </header>
      <ArabicText size="lg">{arabic}</ArabicText>
      {latin ? <p className="doa-content__latin">{latin}</p> : null}
      {translation ? <p className="doa-content__translation">{translation}</p> : null}
    </article>
  )
}
