import type { CaseStudyImage } from './types'
import { ZoomableImage } from './ZoomableImage'
import './CaseStudy.css'

type Props = {
  items: CaseStudyImage[]
}

/** Portrait phone screenshots in a row at the same height, wrapping on narrow screens. */
export function DeviceGallery({ items }: Props) {
  return (
    <div className="cs-device-gallery">
      {items.map((item) => (
        <figure key={item.src} className="cs-device-gallery__item">
          <ZoomableImage {...item} className="cs-device-gallery__screen" />
          {item.caption ? <figcaption className="cs-caption">{item.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  )
}
