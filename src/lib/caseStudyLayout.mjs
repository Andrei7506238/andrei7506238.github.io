/**
 * Lays out plain markdown as a case study page, so the MDX files stay standard markdown:
 *
 * - `## Heading` starts a section; everything up to the next `##` belongs to it.
 * - `### Heading` inside a section starts a card. When the card's last block is media, the media
 *   sits beside the text: an image or code block in a split (alternating sides), and a wide piece
 *   (image grid, DeviceGallery, YouTube) below the text. Any other widget (Stats) ends the card.
 * - A paragraph holding only an image becomes a zoomable figure; the image title is its caption:
 *   `![Alt text](/images/x.png "Caption")`. Several images on consecutive lines become a grid.
 *
 * A Sätteri hast plugin (Astro's markdown processor), applied only to files under
 * src/content/case-studies/.
 *
 * @param {{ base?: string }} options base is the site's deploy base, prefixed to image paths.
 */
export default function caseStudyLayout({ base = '/' } = {}) {
  const resolve = (src) => (/^https?:\/\//.test(src) ? src : `${base.replace(/\/?$/, '/')}${src.replace(/^\//, '')}`)

  function zoomable(img, imgClass) {
    const { src, alt = '', title } = img.properties
    const url = resolve(String(src))
    const props = { href: url, dataLightbox: '', ariaLabel: `Enlarge image: ${alt}` }
    if (title) props.dataCaption = title

    return element('a', ['cs-zoom'], [element('img', imgClass, [], { src: url, alt, loading: 'lazy' })], props)
  }

  const caption = (img) => (img.properties.title ? [element('figcaption', ['cs-caption'], [text(img.properties.title)])] : [])

  function figures(images) {
    if (images.length === 1) {
      return element('figure', ['cs-figure'], [zoomable(images[0]), ...caption(images[0])])
    }

    return element(
      'div',
      ['cs-figure-grid'],
      images.map((img) =>
        element('figure', ['cs-figure-grid__item'], [element('div', ['cs-figure-grid__frame'], [zoomable(img)]), ...caption(img)]),
      ),
    )
  }

  // The tree handed to plugins is read-only, so this builds new nodes instead of mutating.
  const withFigures = (nodes) =>
    nodes.map((node) => {
      const images = onlyImages(node)
      if (images) return figures(images)
      return node.children ? { ...node, children: withFigures(node.children) } : node
    })

  return (context) =>
    context.fileURL?.pathname.includes('/src/content/case-studies/') && {
      name: 'case-study-layout',
      after(root, ctx) {
        ctx.replaceNode(root, { type: 'root', children: layoutSections(withFigures(root.children)) })
      },
    }
}

const WIDE_WIDGETS = new Set(['DeviceGallery', 'YouTube'])

function layoutSections(nodes) {
  const out = []
  let section = null

  for (const node of nodes) {
    if (isElement(node, 'h2')) {
      section = { heading: node, body: [] }
      out.push(section)
    } else if (section) {
      section.body.push(node)
    } else {
      out.push(node)
    }
  }

  return out.map((item) =>
    item.heading
      ? element('section', ['cs-section'], [element('div', ['cs-section__header'], [item.heading]), ...layoutCards(item.body)])
      : item,
  )
}

function layoutCards(nodes) {
  const out = []
  let card = null
  let splits = 0

  const flush = () => {
    if (!card) return
    const result = buildCard(card, splits)
    if (result.split) splits += 1
    out.push(result.node)
    card = null
  }

  for (const node of nodes) {
    if (isElement(node, 'h3')) {
      flush()
      card = [node]
    } else if (node.type === 'mdxJsxFlowElement' && !WIDE_WIDGETS.has(node.name)) {
      // Standalone widgets such as Stats close the card before them.
      flush()
      out.push(node)
    } else if (card) {
      card.push(node)
    } else {
      out.push(node)
    }
  }
  flush()

  return out
}

function buildCard(nodes, splitIndex) {
  const blocks = nodes.filter((node) => !isBlank(node))
  const kind = mediaKind(blocks.at(-1))
  const textBlocks = kind ? blocks.slice(0, -1) : blocks
  const media = kind ? [element('div', ['cs-media-section__media'], [blocks.at(-1)])] : []

  const split = kind === 'figure' || kind === 'code'
  const paragraphs = textBlocks.filter((node) => isElement(node, 'p')).length
  const classes = [
    'cs-media-section',
    'cs-card',
    split ? 'cs-media-section--split' : 'cs-media-section--stack',
    split && splitIndex % 2 === 1 && 'cs-media-section--reverse',
    kind === 'figure' && 'cs-media-section--match-text',
    kind === 'wide' && paragraphs >= 3 && 'cs-media-section--two-column-text',
  ].filter(Boolean)

  const body = element('div', ['cs-media-section__body'], [element('div', ['cs-media-section__text'], textBlocks), ...media])
  return { split, node: element('div', classes, [body]) }
}

function mediaKind(node) {
  if (!node) return null
  if (isElement(node, 'figure') && hasClass(node, 'cs-figure')) return 'figure'
  if (isElement(node, 'div') && hasClass(node, 'cs-figure-grid')) return 'wide'
  if (isElement(node, 'pre')) return 'code'
  if (node.type === 'mdxJsxFlowElement' && WIDE_WIDGETS.has(node.name)) return 'wide'
  return null
}

function onlyImages(node) {
  if (!isElement(node, 'p')) return null
  const images = []
  for (const child of node.children) {
    if (isElement(child, 'img')) images.push(child)
    else if (!isBlank(child)) return null
  }
  return images.length ? images : null
}

function element(tagName, className, children = [], properties = {}) {
  return { type: 'element', tagName, properties: className ? { className, ...properties } : properties, children }
}

const text = (value) => ({ type: 'text', value: String(value) })
const isElement = (node, tagName) => node?.type === 'element' && node.tagName === tagName
const isBlank = (node) => node.type === 'text' && !node.value.trim()
const hasClass = (node, name) => [].concat(node.properties.className ?? []).includes(name)
