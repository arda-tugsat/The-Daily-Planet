import { Link, useParams } from 'react-router-dom'
import { StoryCard } from '../components/editorial/StoryCard'
import { getArticlesBySeriesId } from '../data/queries'
import { getSeriesInfo } from '../data/seriesCatalog'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function SeriesPage() {
  const { seriesId = '' } = useParams<{ seriesId: string }>()
  const meta = seriesId ? getSeriesInfo(seriesId) : undefined
  const list = seriesId ? getArticlesBySeriesId(seriesId) : []

  useDocumentTitle(
    !seriesId
      ? undefined
      : meta && list.length > 0
        ? meta.title
        : 'Series not found',
    meta?.dek,
    'website',
  )

  if (!seriesId || !meta || list.length === 0) {
    return (
      <div className="series-page series-page--missing">
        <header className="page-header">
          <p className="page-header__label">Series</p>
          <h1 className="page-header__title">Series not found</h1>
          <p className="page-header__dek">
            We do not have a running package under that name.
          </p>
        </header>
        <p>
          <Link to="/">Front page</Link>
        </p>
      </div>
    )
  }

  return (
    <div className="series-page">
      <header className="page-header">
        <p className="page-header__label">Running coverage</p>
        <h1 className="page-header__title">{meta.title}</h1>
        <p className="page-header__dek">{meta.dek}</p>
      </header>
      <p className="series-page__count">
        {list.length} {list.length === 1 ? 'installment' : 'installments'} — read in any
        order; parts are dated as published.
      </p>
      <div className="series-page__grid">
        {list.map((article) => (
          <StoryCard key={article.slug} article={article} variant="list" />
        ))}
      </div>
      <p className="series-page__back">
        <Link to="/">← Front page</Link>
      </p>
    </div>
  )
}
