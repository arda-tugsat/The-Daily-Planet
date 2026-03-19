import { Link, useParams } from 'react-router-dom'
import { StoryCard } from '../components/editorial/StoryCard'
import { articles } from '../data/articles'
import {
  findTopicLabel,
  getArticlesByTopicSlug,
} from '../data/topicUtils'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function TopicPage() {
  const { topicSlug = '' } = useParams<{ topicSlug: string }>()
  const list = topicSlug ? getArticlesByTopicSlug(topicSlug, articles) : []
  const label =
    topicSlug && list.length > 0
      ? findTopicLabel(topicSlug, articles)
      : undefined
  const displayLabel =
    label ??
    (topicSlug
      ? topicSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      : 'Topic')

  useDocumentTitle(
    !topicSlug
      ? undefined
      : list.length > 0
        ? `Topic: ${displayLabel}`
        : 'Topic not found',
    list.length > 0
      ? `${list.length} Daily Planet stories tagged “${displayLabel}.”`
      : 'No stories use this tag in the demo edition.',
    'website',
  )

  if (!topicSlug || list.length === 0) {
    return (
      <div className="topic-page topic-page--missing">
        <header className="page-header">
          <p className="page-header__label">Topics</p>
          <h1 className="page-header__title">Nothing under this tag</h1>
          <p className="page-header__dek">
            Try another topic from the index, or use Search.
          </p>
        </header>
        <p>
          <Link to="/topics">All topics</Link>
          {' · '}
          <Link to="/search">Search</Link>
        </p>
      </div>
    )
  }

  return (
    <div className="topic-page">
      <header className="page-header">
        <p className="page-header__label">Topic</p>
        <h1 className="page-header__title">{displayLabel}</h1>
        <p className="page-header__dek">
          {list.length} {list.length === 1 ? 'story' : 'stories'} in this demo
          archive.
        </p>
      </header>
      <div className="topic-page__list">
        {list.map((article) => (
          <StoryCard key={article.slug} article={article} variant="list" />
        ))}
      </div>
      <p className="topic-page__back">
        <Link to="/topics">← All topics</Link>
      </p>
    </div>
  )
}
