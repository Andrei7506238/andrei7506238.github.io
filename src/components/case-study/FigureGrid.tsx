import type { CaseStudyImage } from './types'
import { ZoomableImage } from './ZoomableImage'
import './CaseStudy.css'

type Props = {
  items: CaseStudyImage[]
}

/** Diagrams side by side in equal-height frames, whatever their aspect ratios. */
export function FigureGrid({ items }: Props) {
  return (
    <div className="cs-figure-grid">
      {items.map((item) => (
        <figure key={item.src} className="cs-figure-grid__item">
          <div className="cs-figure-grid__frame">
            <ZoomableImage {...item} />
          </div>
          {item.caption ? <figcaption className="cs-caption">{item.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  )
}
