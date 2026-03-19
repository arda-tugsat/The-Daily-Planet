import { Link } from 'react-router-dom'
import { briefingItems } from '../data/briefing'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function BriefingPage() {
  useDocumentTitle(
    'Morning Briefing',
    'Editors’ radar: what the Planet is watching today in Metropolis.',
    'website',
  )

  return (
    <div>
      <header className="page-header">
        <p className="page-header__label">Editors’ note</p>
        <h1 className="page-header__title">Morning Briefing</h1>
        <p className="page-header__dek">
          What we are watching today in Metropolis — links go to Planet
          reporting, not algorithms.
        </p>
      </header>
      <ol className="briefing-page__list">
        {briefingItems.map((item) => (
          <li key={item.id}>
            {item.articleSlug ? (
              <Link
                to={`/article/${item.articleSlug}`}
                className="briefing-page__story-link"
              >
                {item.text}{' '}
                <span className="briefing-page__link-cta" aria-hidden="true">
                  Read more →
                </span>
              </Link>
            ) : (
              item.text
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
