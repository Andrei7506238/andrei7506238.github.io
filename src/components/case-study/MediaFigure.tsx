import type { CaseStudyImage } from './types'
import { ZoomableImage } from './ZoomableImage'
import { cx } from '../../lib/classNames'
import './CaseStudy.css'

type Props = CaseStudyImage & {
  /** Backdrop behind the image: light for diagrams, dark for app screenshots. */
  tone?: 'light' | 'dark'
}

export function MediaFigure({ src, alt, caption, tone = 'light' }: Props) {
  return (
    <figure className={cx('cs-figure', tone === 'dark' && 'cs-figure--dark')}>
      <ZoomableImage src={src} alt={alt} caption={caption} />
      {caption ? <figcaption className="cs-caption">{caption}</figcaption> : null}
    </figure>
  )
}
