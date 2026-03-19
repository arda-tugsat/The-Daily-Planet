import { Link } from 'react-router-dom'
import { sectionLabels } from '../../data/articles'
import { getArticleHero } from '../../data/photoSources'
import type { Article } from '../../data/types'
import { estimateReadingMinutes } from '../../data/queries'
import { EditorialFigure } from './EditorialFigure'
import { HighlightedTitle } from './HighlightedTitle'

function formatTime(iso: string): string {
  const date = new Date(iso)
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date)
}

function formatShortDate(iso: string): string {
  const date = new Date(iso)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date)
}

interface StoryCardProps {
  article: Article
  variant: 'lead' | 'rail' | 'list' | 'river'
  showReadingTime?: boolean
  /** When set, highlights query matches in the headline (e.g. search results). */
  highlightQuery?: string
}

export function StoryCard({
  article,
  variant,
  showReadingTime = false,
  highlightQuery,
}: StoryCardProps) {
  const hero = getArticleHero(article.slug)
  const sectionName = sectionLabels[article.section]
  const minutes = estimateReadingMinutes(article)
  const seriesLabel =
    article.seriesId &&
    article.seriesPart &&
    article.seriesTotal &&
    `Part ${article.seriesPart} of ${article.seriesTotal}`

  const figureVariant =
    variant === 'lead'
      ? 'card'
      : variant === 'rail'
        ? 'rail'
        : variant === 'list'
          ? 'thumb'
          : 'card'

  return (
    <article
      className={`story-card story-card--${variant}${hero && variant === 'list' ? ' story-card--with-thumb' : ''}`}
      aria-labelledby={`headline-${article.slug}`}
    >
      <div className="story-card__inner">
        {hero && variant === 'list' ? (
          <Link
            to={`/article/${article.slug}`}
            className="story-card__thumb-link"
            aria-hidden="true"
            tabIndex={-1}
          >
            <EditorialFigure
              key={`${article.slug}-${hero.src}`}
              hero={hero}
              variant="thumb"
              className="story-card__figure"
              fallbackId={article.slug}
            />
          </Link>
        ) : null}
        <div className="story-card__text">
          {seriesLabel ? (
            <p className="story-card__series">{seriesLabel}</p>
          ) : null}
          {hero && variant !== 'list' ? (
            <Link
              to={`/article/${article.slug}`}
              className="story-card__media-link"
              aria-hidden="true"
              tabIndex={-1}
            >
              <EditorialFigure
                key={`${article.slug}-${hero.src}`}
                hero={hero}
                variant={figureVariant}
                className="story-card__figure"
                fallbackId={article.slug}
              />
            </Link>
          ) : null}
          <p className="story-card__section">{sectionName}</p>
          <h2
            id={`headline-${article.slug}`}
            className="story-card__headline"
          >
            <Link
              to={`/article/${article.slug}`}
              className="story-card__headline-link"
            >
              {highlightQuery ? (
                <HighlightedTitle text={article.title} query={highlightQuery} />
              ) : (
                article.title
              )}
            </Link>
          </h2>
          <p className="story-card__dek">
            <Link
              to={`/article/${article.slug}`}
              className="story-card__dek-link"
            >
              {article.dek}
            </Link>
          </p>
          <p className="story-card__meta">
            <span className="story-card__byline">{article.byline}</span>
            <span className="story-card__time" aria-label="Published">
              {formatShortDate(article.publishedAt)} ·{' '}
              {formatTime(article.publishedAt)}
              {showReadingTime ? ` · ${minutes} min read` : null}
            </span>
          </p>
        </div>
      </div>
    </article>
  )
}
