import { cx } from '../../lib/classNames'
import './CaseStudy.css'

type Img = {
  src: string
  alt: string
}

type Props = {
  main: Img
  rows?: Img[][]
}

export function MediaCollage({ main, rows = [] }: Props) {
  return (
    <div className="cs-media-collage">
      <img src={main.src} alt={main.alt} />
      {rows.map((row, rowIndex) => {
        const rowKey = `${rowIndex}-${row.map((image) => image.src).join('|')}`
        return (
          <div key={rowKey} className={cx('cs-media-collage__row', row.length === 1 && 'cs-media-collage__row--center')}>
            {row.map((image) => (
              <img key={image.src} src={image.src} alt={image.alt} />
            ))}
          </div>
        )
      })}
    </div>
  )
}
