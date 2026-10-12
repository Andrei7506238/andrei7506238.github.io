import type { ProjectLink } from '../../types/portfolio'
import { isExternalUrl } from '../../lib/paths'

type Props = {
  links: ProjectLink[]
  projectName: string
  className: string
}

export function ProjectLinks({ links, projectName, className }: Props) {
  return (
    <div className={className}>
      {links.map((link) => {
        const external = isExternalUrl(link.href)

        return (
          <a
            key={link.label}
            className="link"
            href={link.href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
            aria-label={`${link.label} for ${projectName}`}
          >
            {link.label}
          </a>
        )
      })}
    </div>
  )
}
