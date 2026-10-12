import type { Education } from '../../types/portfolio'
import './EducationSection.css'

type Props = {
  education: Education[]
}

export function EducationSection({ education }: Props) {
  return (
    <section className="section education" id="education" aria-labelledby="education-title">
      <div className="section-header">
        <h2 id="education-title">Education</h2>
        <p className="section-subtitle">Formal education</p>
      </div>

      <div className="education-cards">
        {education.map((e) => (
          <article key={e.id} className="education-card-large">
            <div className="education-card-inner">
              <div className="education-institution">{e.institution}</div>
              <div className="education-degree">{e.degree}</div>
              <div className="education-period">{e.period}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
