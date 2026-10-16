import Stats from './Stats.astro'
import YouTube from './YouTube.astro'
import { DeviceGallery } from './DeviceGallery'

/**
 * The few components a case study's MDX can use without importing them. Everything else is plain
 * markdown, laid out by src/lib/rehypeCaseStudy.mjs.
 */
export const caseStudyWidgets = {
  Stats,
  YouTube,
  DeviceGallery,
}
