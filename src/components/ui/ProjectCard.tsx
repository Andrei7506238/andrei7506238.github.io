import type { Project } from '../../types/portfolio'
import { Tag } from './Tag'
import { ProjectLinks } from './ProjectLinks'
import './ProjectCard.css'

type Props = {
  project: Project
}

export function ProjectCard({ project }: Props) {
  return (
    <article className="project-card">
      <div className="project-media-wrapper">
        <div className="project-media">
          <img src={project.image} alt={`${project.name} screenshot`} loading="lazy" />
        </div>
        <div className="project-media-overlay">
          <ProjectLinks links={project.links} projectName={project.name} className="link-row" />
        </div>
        <div className="project-content">
          <div className="tag-row">
            {project.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>
      </div>
      <div className="project-body">
        <h3>{project.name}</h3>
        <p>{project.description.trim()}</p>
        <div className="project-date">{project.date}</div>
      </div>
    </article>
  )
}
