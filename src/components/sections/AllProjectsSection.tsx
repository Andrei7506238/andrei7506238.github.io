import type { Project } from '../../types/portfolio'
import { ProjectCard } from '../ui/ProjectCard'
import './AllProjectsSection.css'

type Props = {
  projects: Project[]
}

export function AllProjectsSection({ projects }: Props) {
  const hasProjects = projects.length > 0

  return (
    <section className="section all-projects" id="all-projects" aria-labelledby="all-projects-title">
      <div className="section-header">
        <h2 id="all-projects-title">All Projects</h2>
        <p className="section-subtitle">
          {hasProjects ? 'A quick overview of the rest of my work.' : 'More projects coming soon!'}
        </p>
      </div>

      {hasProjects ? (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      ) : (
        <div className="empty-projects">
          <p>Check back later for more projects and updates.</p>
        </div>
      )}
    </section>
  )
}
