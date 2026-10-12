export type Person = {
  name: string
  role: string
  speciality: string
  company: string
  companyUrl?: string
  headline: string
  photoSrc: string
  photoAlt: string
  links: {
    linkedin: string
    github: string
  }
}

export type SkillLevel = 'most' | 'basic' | 'practices'

export type Skill = {
  name: string
  level: SkillLevel
  logoUrl?: string
  hoverDescription?: string
}

export type ProjectLink = {
  label: string
  href: string
}

export type FeaturedProject = {
  name: string
  description: string
  tags: string[]
  image: string
  links: ProjectLink[]
}

export type Project = FeaturedProject & {
  date: string
}

export type Education = {
  id: string
  institution: string
  degree: string
  period: string
}
