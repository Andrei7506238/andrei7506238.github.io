type Props = {
  items: string[]
}

export function Paragraphs({ items }: Props) {
  return items.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
}
