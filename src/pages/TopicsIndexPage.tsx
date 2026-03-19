import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { articles } from '../data/articles'
import { listTopics } from '../data/topicUtils'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function TopicsIndexPage() {
  const topics = useMemo(() => listTopics(articles), [])

  useDocumentTitle(
    'Topics & tags',
    'Browse reporting themes across the Daily Planet demonstration edition.',
    'website',
  )

  return (
    <div className="topics-index">
      <header className="page-header">
        <p className="page-header__label">Archive tools</p>
        <h1 className="page-header__title">Topics &amp; tags</h1>
        <p className="page-header__dek">
          Every story in this demo carries simple subject tags — the way a real
          desk routes beats to editors and readers.
        </p>
      </header>
      <ul className="topics-index__list">
        {topics.map(({ slug, label, count }) => (
          <li key={slug} className="topics-index__item">
            <Link to={`/topic/${slug}`} className="topics-index__link">
              <span className="topics-index__label">{label}</span>
              <span className="topics-index__count">{count}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="topics-index__back">
        <Link to="/">← Front page</Link>
      </p>
    </div>
  )
}
