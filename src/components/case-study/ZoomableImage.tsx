import type { CaseStudyImage } from './types'
import './CaseStudy.css'

type Props = CaseStudyImage & {
  className?: string
}

/**
 * An image that links to its full-size file. ImageLightbox intercepts the click to show it
 * in place; without JavaScript the link still opens the image on its own.
 */
export function ZoomableImage({ src, alt, caption, className }: Props) {
  return (
    <a
      className="cs-zoom"
      href={src}
      data-lightbox
      data-caption={caption}
      aria-label={`Enlarge image: ${alt}`}
    >
      <img className={className} src={src} alt={alt} loading="lazy" />
    </a>
  )
}
