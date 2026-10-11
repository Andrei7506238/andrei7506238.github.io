import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AllProjectsSection } from '../components/sections/AllProjectsSection'
import { FeaturedProjectsSection } from '../components/sections/FeaturedProjectsSection'
import { Introduction } from '../components/sections/Introduction'
import { SkillsSection } from '../components/sections/SkillsSection'
import { EducationSection } from '../components/sections/EducationSection'
import { BlogSection } from '../components/sections/BlogSection'
import { person, projects, featuredProjects, skills } from '../data/portfolio'

export function HomePage() {
  const allProjects = projects
  const { sectionId } = useParams<{ sectionId?: string }>()

  useEffect(() => {
    if (!sectionId) {
      return
    }

    const targetId = decodeURIComponent(sectionId)

    requestAnimationFrame(() => {
      const target = document.getElementById(targetId)
      if (!target) {
        return
      }

      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [sectionId])

  return (
    <div className="page">
      <Introduction
        name={person.name}
        role={person.role}
        headline={person.headline}
        photoSrc={person.photoSrc}
        photoAlt={person.photoAlt}
        linkedinUrl={person.links.linkedin}
        speciality={person.speciality}
        company={person.company}
        companyUrl={person.companyUrl}
      />

      <SkillsSection skills={skills} />

      <FeaturedProjectsSection projects={featuredProjects} />
      <AllProjectsSection projects={allProjects} />

      <EducationSection />

      <BlogSection />
    </div>
  )
}

export default HomePage
