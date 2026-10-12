import { ButtonLink, type ButtonVariant } from '../ui/ButtonLink'
import { cx } from '../../lib/classNames'
import './CaseStudy.css'

type Cta = {
  label: string
  href: string
  variant?: ButtonVariant
}

type Props = {
  eyebrow: string
  title: string
  lead: string
  ctas: Cta[]
  image?: { src: string; alt: string }
}

export function CaseStudyHero({ eyebrow, title, lead, ctas, image }: Props) {
  return (
    <section className={cx('cs-hero', image && 'cs-hero--with-media')}>
      <div className="cs-hero__content">
        <p className="cs-eyebrow">{eyebrow}</p>
        <h1 className="cs-title">{title}</h1>
        <p className="cs-lead">{lead}</p>
        <div className="cs-cta-row">
          {ctas.map((cta) => (
            <ButtonLink key={cta.label} href={cta.href} variant={cta.variant}>
              {cta.label}
            </ButtonLink>
          ))}
        </div>
      </div>
      {image ? (
        <div className="cs-hero__media">
          <img className="cs-hero__image" src={image.src} alt={image.alt} />
        </div>
      ) : null}
    </section>
  )
}
