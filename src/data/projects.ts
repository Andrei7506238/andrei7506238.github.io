import type { Project } from '../types/portfolio'
import { withBase } from '../lib/paths'

export const projects: Project[] = [
  {
    name: 'Portfolio Website',
    description: 'The source code of this portfolio website, built with React and TypeScript. It has sections for featured projects, a full project list, skills and a case study page. Built responsive and accessible, no external component libraries used.',
    tags: ['React', 'TypeScript', 'HTML | CSS'],
    image: withBase('images/showcase/portfolio-website.png'),
    links: [{ label: 'Check On GitHub', href: 'https://github.com/Andrei7506238/soft-dev-portofolio' }],
    date: 'Jan 2026',
  },
  {
    name: 'Fish Aquarium OpenGL Demo',
    description: 'A simple OpenGL demo simulating a fish aquarium with animated fish and underwater effects. Built using C++ and OpenGL, it demonstrates basic graphics programming techniques. Showcases 3D rendering, texture mapping and simple fish animation, together with billboard bubbles and skybox. It also allows for custom 3D model loading in the aquarium scene.',
    tags: ['C++', 'OpenGL', 'University'],
    image: withBase('images/showcase/fish-aquarium-opengl-demo.png'),
    links: [{ label: 'Check On GitHub', href: 'https://github.com/AndreiRobertP/fish-tank-opengl' }],
    date: 'Jan 2023',
  },
  {
    name: 'SubInc - Automatic Subtitle Downloader and Softcoder',
    description: 'A Python-based headless script that automates adding subtitles to locally downloaded movies and TV shows, with support for recursive batch processing. Uses MKVToolNix and the OpenSubtitles API to automatically fetch and embed the best matching subtitles for each media file. Provides easy to use installer and context menu integration for Windows.',
    tags: ['Python', 'MKVToolNix', 'API'],
    image: withBase('images/showcase/subtitles_incorporated.png'),
    links: [{ label: 'Check On GitHub', href: 'https://github.com/Andrei7506238/SubInc' }],
    date: 'Sept 2022',
  },
  {
    name: 'Library Management System',
    description: 'A Java and Spring Boot web application for book inventory and loan tracking. Deployed on AWS with EC2, S3 for static assets, RDS for the database, CloudWatch for logging and SES for email notifications.',
    tags: ['Java | Spring Boot', 'AWS', 'University'],
    image: withBase('images/showcase/library-management-system.png'),
    links: [],
    date: 'Jun 2025',
  },
  {
    name: 'School Management System',
    description: 'A desktop platform built with C# and WPF. Uses Clean Architecture and MVVM to keep business logic and the UI layer separate. The data layer uses Entity Framework Core with the Repository pattern, which makes the individual modules easy to test independently.',
    tags: ['C# | WPF', 'Clean Architecture', 'University'],
    image: withBase('images/showcase/school-management.png'),
    links: [
      { label: 'Check On GitHub', href: 'https://github.com/AndreiRobertP/SchoolManagement/tree/master' },
    ],
    date: 'May 2023',
  },
  {
    name: 'Task Nest',
    description: 'A C# and WPF productivity tool focused on managing TODO list workflows through recursive data structures and visitor & composite design patterns. Unlike flat to-do lists, Task Nest implements a hierarchical tree architecture, allowing for infinite task nesting and granular sub-task tracking.',
    tags: ['C# | .WPF', 'Design Patterns', 'University'],
    image: withBase('images/showcase/task-nest.png'),
    links: [{ label: 'Check On GitHub', href: 'https://github.com/AndreiRobertP/TaskNest' }],
    date: 'Apr 2023',
  },
]
