import { useEffect, useRef, useState } from 'react'
import type { CaseStudyImage } from './types'
import './CaseStudy.css'

function isPlainLeftClick(event: MouseEvent) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
}

/**
 * One dialog per page that shows any `a[data-lightbox]` image full size. Clicks are picked up
 * by delegation, so the images themselves stay static HTML with no JavaScript of their own.
 */
export function ImageLightbox() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [image, setImage] = useState<CaseStudyImage | null>(null)

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[data-lightbox]')
      if (!link || event.defaultPrevented || !isPlainLeftClick(event)) {
        return
      }

      event.preventDefault()
      setImage({
        src: link.href,
        alt: link.querySelector('img')?.alt ?? '',
        caption: link.dataset.caption,
      })
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (image && dialog && !dialog.open) {
      dialog.showModal()
    }
  }, [image])

  const close = () => dialogRef.current?.close()

  return (
    <dialog
      ref={dialogRef}
      className="cs-lightbox"
      aria-label={image?.alt || 'Enlarged image'}
      onClose={() => setImage(null)}
      onClick={(event) => {
        // Clicking the backdrop or the empty space around the image dismisses the dialog.
        const target = event.target as HTMLElement
        if (target === event.currentTarget || target.classList.contains('cs-lightbox__body')) {
          close()
        }
      }}
    >
      {image ? (
        <figure className="cs-lightbox__body">
          <img className="cs-lightbox__image" src={image.src} alt={image.alt} />
          {image.caption ? <figcaption className="cs-lightbox__caption">{image.caption}</figcaption> : null}
        </figure>
      ) : null}
      <button type="button" className="cs-lightbox__close" onClick={close} aria-label="Close enlarged image">
        ×
      </button>
    </dialog>
  )
}
