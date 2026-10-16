import type { ReactNode } from 'react'
import { cx } from '../../lib/classNames'
import './CaseStudy.css'

type Props = {
  title?: string
  layout?: 'split' | 'stack'
  reverse?: boolean
  /** Stack layout only: flow long text into two columns on wide screens. */
  textColumns?: 1 | 2
  /**
   * Split layout only: size a single MediaFigure to the text column so both sides end level.
   * Turn off for composite media (several elements) that should keep their natural height.
   */
  matchTextHeight?: boolean
  variant?: 'card' | 'plain'
  media: ReactNode
  children: ReactNode
}

export function SplitMediaSection({
  title,
  layout = 'split',
  reverse = false,
  textColumns = 1,
  matchTextHeight = true,
  variant = 'card',
  media,
  children,
}: Props) {
  const rootClasses = cx(
    'cs-media-section',
    variant === 'card' ? 'cs-card' : 'cs-media-section--plain',
    layout === 'stack' ? 'cs-media-section--stack' : 'cs-media-section--split',
    reverse && 'cs-media-section--reverse',
    layout === 'stack' && textColumns === 2 && 'cs-media-section--two-column-text',
    layout === 'split' && matchTextHeight && 'cs-media-section--match-text',
  )

  return (
    <div className={rootClasses}>
      <div className="cs-media-section__body">
        <div className="cs-media-section__text">
          {title ? <h3>{title}</h3> : null}
          {children}
        </div>
        <div className="cs-media-section__media">{media}</div>
      </div>
    </div>
  )
}
