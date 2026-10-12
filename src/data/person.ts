import type { Person } from '../types/portfolio'
import { withBase } from '../lib/paths'

export const person: Person = {
  name: 'Andrei-Robert Popa',
  role: 'Mobile Software Developer',
  speciality: 'Flutter, Dart & C++',
  company: 'Magic Lane',
  companyUrl: 'https://magiclane.com/',
  headline: `
I am a Mobile Developer focused on building high-performance, cross-platform applications. At Magic Lane, I maintain a major consumer-facing app and work on the core SDK day to day.

My main focus is software architecture, Dart FFI and native C++ bindings. Most of my time goes into building the layer that connects low-level C++ logic with Dart and the mobile stack above it.

I like breaking down complex systems into modular, testable pieces and I treat clean architecture as the baseline for keeping things workable long-term. My strength is on the backend mobile side and SDK integration, but I hold UI work to the same structural standards.
  `,
  photoSrc: withBase('images/showcase/profile.jpeg'),
  photoAlt: 'My profile photo',
  links: {
    linkedin: 'https://www.linkedin.com/in/andrei-robert-popa',
    github: 'https://github.com/Andrei7506238',
  },
}
