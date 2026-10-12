import type { ReactNode } from 'react'
import { cx } from '../../lib/classNames'
import './CaseStudy.css'

type Props = {
  eyebrow?: string
  title: string
  lead?: string
  muted?: boolean
  id?: string
  children: ReactNode
}

export function Section({ eyebrow, title, lead, muted = false, id, children }: Props) {
  return (
    <section id={id} className={cx('cs-section', muted && 'cs-section--muted')}>
      <div className="cs-section__header">
        {eyebrow ? <p className="cs-eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {lead ? <p className="cs-section__lead">{lead}</p> : null}
      </div>
      {children}
    </section>
  )
}
