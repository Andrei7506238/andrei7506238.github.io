import { cx } from '../../lib/classNames'
import './CaseStudy.css'

type Props = {
  items: string[]
  tone?: 'subtle' | 'plain'
  tight?: boolean
}

export function BulletList({ items, tone = 'subtle', tight = false }: Props) {
  return (
    <div className={cx('cs-bullet-list', tone === 'plain' && 'cs-bullet-list--plain', tight && 'cs-bullet-list--tight')}>
      {items.map((item) => (
        <div key={item} className="cs-bullet-item">
          <span className="cs-bullet-item__dot" aria-hidden>
            •
          </span>
          <p>{item}</p>
        </div>
      ))}
    </div>
  )
}
