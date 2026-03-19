import { Link } from 'react-router-dom'
import { sectionLabels } from '../data/articles'

const sectionEntries = Object.entries(sectionLabels) as [
  keyof typeof sectionLabels,
  string,
][]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__rule" aria-hidden="true" />
      <div className="site-footer__mast">
        <div className="site-footer__mast-text">
          <p className="site-footer__brand">The Daily Planet</p>
          <p className="site-footer__tagline">
            Independent reporting from Metropolis — verified, sourced, and
            corrected when we miss.
          </p>
        </div>
        <div className="site-footer__contact">
          <p className="site-footer__contact-label">Editorial &amp; switchboard</p>
          <address className="site-footer__address">
            1938 Sullivan Place
            <br />
            Metropolis, USA 10038
          </address>
          <p className="site-footer__phone">Newsroom: (555) 010-1938</p>
          <p className="site-footer__meta">
            Tips line encrypted where noted on the briefing page. Wire desk
            staffed overnight.
          </p>
        </div>
      </div>

      <nav className="site-footer__directories" aria-label="Site sections and tools">
        <div className="site-footer__col">
          <h2 className="site-footer__heading">Desk coverage</h2>
          <ul className="site-footer__list">
            {sectionEntries.map(([id, label]) => (
              <li key={id}>
                <Link to={`/section/${id}`}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="site-footer__col">
          <h2 className="site-footer__heading">Reader tools</h2>
          <ul className="site-footer__list">
            <li>
              <Link to="/briefing">Morning briefing</Link>
            </li>
            <li>
              <Link to="/search">Search archives</Link>
            </li>
            <li>
              <Link to="/topics">Topic index</Link>
            </li>
            <li>
              <Link to="/saved">Saved stories</Link>
            </li>
            <li>
              <Link to="/forum">Reader forum</Link>
            </li>
            <li>
              <Link to="/letters">Letters to the editor</Link>
            </li>
          </ul>
        </div>
        <div className="site-footer__col">
          <h2 className="site-footer__heading">Newsroom</h2>
          <ul className="site-footer__list">
            <li>
              <Link to="/staff">Staff &amp; masthead</Link>
            </li>
            <li>
              <Link to="/standards">Ethics &amp; standards</Link>
            </li>
            <li>
              <Link to="/corrections">Corrections log</Link>
            </li>
          </ul>
        </div>
        <div className="site-footer__col site-footer__col--meta">
          <h2 className="site-footer__heading">About this edition</h2>
          <p className="site-footer__about">
            Pages are optimized for reading, not tracking. External photographs
            are credited to Daily Planet staff in the byline where shown.
          </p>
          <p className="site-footer__about">
            <Link to="/standards">Read how we handle sourcing, anonymity, and
            updates</Link>
            {' '}before quoting us elsewhere.
          </p>
          <a className="site-footer__toplink" href="#main-content">
            Back to top
          </a>
        </div>
      </nav>

      <div className="site-footer__base">
        <p className="site-footer__legal">© {year} Daily Planet.</p>
        <p className="site-footer__legal site-footer__legal--disclaimer">
          Fictional newspaper for demonstration; not affiliated with any real
          publication or rights holder.
        </p>
      </div>
    </footer>
  )
}
