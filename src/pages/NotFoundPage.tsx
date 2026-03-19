import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function NotFoundPage() {
  useDocumentTitle(
    'Not Found',
    'That page is not in this edition of the Daily Planet demo.',
    'website',
  )

  return (
    <div className="not-found">
      <h1 className="not-found__title">This page is still on the loading dock</h1>
      <p className="not-found__dek">
        The slug does not match anything in tonight’s edition. Try the front
        page or search.
      </p>
      <p>
        <Link to="/">Front page</Link>
        {' · '}
        <Link to="/search">Search</Link>
      </p>
    </div>
  )
}
