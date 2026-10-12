import type { ReactNode } from 'react'
import { ButtonLink } from './ButtonLink'
import { withBase } from '../../lib/paths'
import './NavBar.css'

type Props = {
  name: string
  linkedinUrl: string
  /** Slot for the hydrated theme toggle island. */
  children?: ReactNode
}

export function NavBar({ name, linkedinUrl, children }: Props) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <a href={withBase()} className="brand-link">
            <strong>{name}</strong>
          </a>
        </div>

        <div className="nav-actions">
          <a className="nav-link" href={withBase('#skills')}>Skills</a>
          <a className="nav-link" href={withBase('#projects-featured')}>Featured</a>
          <a className="nav-link" href={withBase('#all-projects')}>Projects</a>
          <ButtonLink href={linkedinUrl} variant="ghost">LinkedIn</ButtonLink>
          {children}
        </div>
      </div>
    </nav>
  )
}
