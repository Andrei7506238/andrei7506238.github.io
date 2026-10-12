import './Footer.css'

type Props = {
  name: string
  linkedinUrl: string
  githubUrl: string
}

function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function Footer({ name, linkedinUrl, githubUrl }: Props) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo" aria-label="Footer">
      <div className="footer-inner">
        <div>
          <small className="footer-copy">© {year} {name}</small>
        </div>

        <div className="footer-links">
          <a href={linkedinUrl} target="_blank" rel="noreferrer">Contact</a>
          <a href={githubUrl} target="_blank" rel="noreferrer">GitHub</a>
          <button type="button" onClick={backToTop} aria-label="Back to top" className="footer-top">Top</button>
        </div>
      </div>
    </footer>
  )
}
