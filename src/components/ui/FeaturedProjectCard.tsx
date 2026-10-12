import type { FeaturedProject } from '../../types/portfolio'
import { Tag } from './Tag'
import { ProjectLinks } from './ProjectLinks'
import './FeaturedProjectCard.css'

type Props = {
  project: FeaturedProject
}

export function FeaturedProjectCard({ project }: Props) {
  return (
    <article className="featured-project-card">
      <h3 className="featured-project-title">{project.name}</h3>
      <div className="featured-media-wrapper">
        <div className="featured-media">
          <img src={project.image} alt={`${project.name} screenshot`} loading="lazy" />
        </div>
        <div className="featured-tag-row">
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        <ProjectLinks links={project.links} projectName={project.name} className="featured-link-row" />
      </div>
      <div className="featured-project-body">
        <p>{project.description.trim()}</p>
      </div>
    </article>
  )
}
