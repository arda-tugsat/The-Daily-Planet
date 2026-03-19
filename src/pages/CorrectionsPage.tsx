import { Link } from 'react-router-dom'
import { corrections } from '../data/corrections'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function CorrectionsPage() {
  useDocumentTitle(
    'Corrections',
    'Corrections and clarifications to Planet coverage in this demo.',
    'website',
  )

  return (
    <div>
      <header className="page-header">
        <p className="page-header__label">Transparency</p>
        <h1 className="page-header__title">Corrections &amp; Clarifications</h1>
        <p className="page-header__dek">
          We fix errors plainly. If you spot a new one, the newsroom line still
          works — (555) 010-1938.
        </p>
      </header>
      <ul className="corrections-page__list">
        {corrections.map((item) => (
          <li key={item.id} className="corrections-page__item">
            <span className="corrections-page__date">{item.date}</span>
            {item.text}
            {item.articleSlug ? (
              <>
                {' '}
                <Link to={`/article/${item.articleSlug}`}>Related story →</Link>
              </>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
