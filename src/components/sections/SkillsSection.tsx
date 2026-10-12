import type { Skill, SkillLevel } from '../../types/portfolio'
import './SkillsSection.css'

type Props = {
  skills: Skill[]
}

type SkillGroupDefinition = {
  level: SkillLevel
  title: string
  description: string
}

const skillGroups: SkillGroupDefinition[] = [
  {
    level: 'most',
    title: 'Primary technologies',
    description: 'Core frameworks and ecosystems I reach for daily.',
  },
  {
    level: 'basic',
    title: 'Familiar technologies',
    description: 'Tools I’m comfortable with when a project requires them but I need a refresher to get up to speed.',
  },
  {
    level: 'practices',
    title: 'Engineering practices and methodologies',
    description: 'Development practices I apply across all my projects.',
  },
]

export function SkillsSection({ skills }: Props) {
  const filledGroups = skillGroups
    .map((group) => ({
      ...group,
      skills: skills.filter((skill) => skill.level === group.level),
    }))
    .filter((group) => group.skills.length > 0)

  if (filledGroups.length === 0) {
    return null
  }

  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title">
      <div className="section-header">
        <h2 id="skills-title">Technical Skills</h2>
        <p className="section-subtitle">Technologies I work with, grouped by familiarity. Hover over a skill for more info.</p>
      </div>

      <div className="skills-groups">
        {filledGroups.map((group) => (
          <SkillGroup key={group.level} group={group} />
        ))}
      </div>
      <div className="section-divider" />
    </section>
  )
}

type SkillGroupProps = {
  group: SkillGroupDefinition & { skills: Skill[] }
}

function SkillGroup({ group }: SkillGroupProps) {
  return (
    <article className="skills-group" aria-labelledby={`group-${group.level}-title`}>
      <header>
        <h3 id={`group-${group.level}-title`} className="group-title">
          {group.title}
        </h3>
        <p className="group-desc">{group.description}</p>
      </header>

      <div className="skill-grid" role="list">
        {group.skills.map((skill) => (
          <article
            key={skill.name}
            className={`skill-card ${skill.level}`}
            title={skill.hoverDescription ?? skill.name}
            role="listitem"
          >
            {skill.logoUrl && <img src={skill.logoUrl} alt="" className="skill-logo" />}
            <span className="skill-name">{skill.name}</span>
          </article>
        ))}
      </div>
    </article>
  )
}
