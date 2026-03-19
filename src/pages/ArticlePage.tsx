import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb } from '../components/editorial/Breadcrumb'
import { ArticleCommentSection } from '../components/community/ArticleCommentSection'
import { SaveStoryButton } from '../components/SaveStoryButton'
import { EditorialFigure } from '../components/editorial/EditorialFigure'
import { buildArticleBreadcrumb } from '../utils/articleBreadcrumb'
import { getArticleBySlug, sectionLabels } from '../data/articles'
import { getSeriesInfo } from '../data/seriesCatalog'
import { tagToTopicSlug } from '../data/topicUtils'
import { getArticleHero } from '../data/photoSources'
import type { ArticleHeroImage } from '../data/types'
import { estimateReadingMinutes, getRelatedArticles } from '../data/queries'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useReadingProgress } from '../hooks/useReadingProgress'
import { useStaggerVariants } from '../motion/stagger'

function RelatedThumb({ slug, thumb }: { slug: string; thumb: ArticleHeroImage }) {
  const [tier, setTier] = useState(0)

  if (tier >= 2) {
    return (
      <span
        className="article-page__related-img article-page__related-img--stub"
        aria-hidden
      />
    )
  }

  const src =
    tier === 0
      ? thumb.srcThumb
      : `https://picsum.photos/seed/dp-rel-${encodeURIComponent(slug)}/224/150`

  return (
    <img
      key={tier}
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      width="112"
      height="75"
      className="article-page__related-img"
      referrerPolicy="no-referrer"
      onError={() => setTier((t) => t + 1)}
    />
  )
}

function formatLongDate(iso: string): string {
  const date = new Date(iso)
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date)
}

function breadcrumbHeadline(title: string): string {
  return title.length > 72 ? `${title.slice(0, 69)}…` : title
}

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getArticleBySlug(slug) : undefined
  const progress = useReadingProgress(Boolean(article))
  const prefersReducedMotion = useReducedMotion()
  const { container: relatedContainer, item: relatedItem } = useStaggerVariants()

  useDocumentTitle(
    article?.title ?? (slug ? 'Story not found' : undefined),
    article?.dek,
    article ? 'article' : 'website',
  )

  if (!article) {
    return (
      <div className="article-page article-page--missing">
        <p className="article-page__missing">We could not find that story.</p>
        <p>
          <Link to="/">Return to the front page</Link>
        </p>
      </div>
    )
  }

  const related = getRelatedArticles(article)
  const minutes = estimateReadingMinutes(article)
  const seriesMeta = article.seriesId ? getSeriesInfo(article.seriesId) : undefined

  const crumbs = buildArticleBreadcrumb(
    article.section,
    breadcrumbHeadline(article.title),
  )

  const hasPullQuote = Boolean(article.pullQuote)
  const hero = getArticleHero(article.slug)

  return (
    <>
      <div
        className="reading-progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
      <article className="article-page">
        <motion.div
          className="article-page__lead-in"
          initial={
            prefersReducedMotion ? undefined : { opacity: 0, y: 20 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.48,
            ease: [0.33, 1, 0.68, 1],
          }}
        >
          <Breadcrumb items={crumbs} />
          <p className="article-page__section">{sectionLabels[article.section]}</p>
          {article.seriesPart && article.seriesTotal && article.seriesId ? (
            <p className="article-page__series">
              {seriesMeta ? (
                <>
                  <Link to={`/series/${article.seriesId}`}>{seriesMeta.title}</Link>
                  {' — '}
                </>
              ) : null}
              Part {article.seriesPart} of {article.seriesTotal}
            </p>
          ) : null}
          <h1 className="article-page__title">{article.title}</h1>
          <p className="article-page__dek">{article.dek}</p>
          {article.tags && article.tags.length > 0 ? (
            <ul className="article-page__tags" aria-label="Story topics">
              {article.tags.map((tag) => (
                <li key={tag}>
                  <Link to={`/topic/${tagToTopicSlug(tag)}`}>{tag}</Link>
                </li>
              ))}
            </ul>
          ) : null}
        </motion.div>
        {hero ? (
          <motion.div
            className="article-page__hero-wrap"
            initial={
              prefersReducedMotion ? undefined : { opacity: 0, y: 12 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.52,
              ease: [0.33, 1, 0.68, 1],
              delay: prefersReducedMotion ? 0 : 0.06,
            }}
          >
            <EditorialFigure
              key={`${article.slug}-${hero.src}`}
              hero={hero}
              variant="hero"
              priority
              className="article-page__hero"
              fallbackId={article.slug}
            />
          </motion.div>
        ) : null}
        <div className="article-page__byline-block">
          <div className="article-page__byline-row">
            <div className="article-page__byline-main">
              <p className="article-page__byline">{article.byline}</p>
              <p className="article-page__readtime">{minutes} min read</p>
              <p className="article-page__dateline">
                {article.dateline} — {formatLongDate(article.publishedAt)}
              </p>
              {article.lastUpdatedAt ? (
                <p className="article-page__updated">
                  Updated {formatLongDate(article.lastUpdatedAt)}
                </p>
              ) : null}
            </div>
            <SaveStoryButton slug={article.slug} />
          </div>
        </div>
        <div className="article-page__rule" aria-hidden="true" />
        {article.editorNote ? (
          <aside className="article-page__editor-note" aria-label="Editor’s note">
            <p className="article-page__editor-note-label">Editor’s note</p>
            <p>{article.editorNote}</p>
          </aside>
        ) : null}
        <div
          className={
            hasPullQuote
              ? 'article-page__layout article-page__layout--quote'
              : 'article-page__layout'
          }
        >
          <div className="article-page__body">
            {article.body.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? 'article-page__paragraph article-page__paragraph--dropcap'
                    : 'article-page__paragraph'
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
          {article.pullQuote ? (
            <motion.blockquote
              className="article-page__pullquote"
              cite="."
              initial={
                prefersReducedMotion ? undefined : { opacity: 0, x: 14 }
              }
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.42,
                ease: [0.33, 1, 0.68, 1],
              }}
            >
              {article.pullQuote}
            </motion.blockquote>
          ) : null}
        </div>

        {article.correctionNote ? (
          <aside className="article-page__correction">
            <p className="article-page__correction-label">Correction</p>
            <p>{article.correctionNote}</p>
          </aside>
        ) : null}

        {related.length > 0 ? (
          <section className="article-page__related" aria-labelledby="related-h">
            <h2 id="related-h" className="article-page__related-title">
              Related coverage
            </h2>
            <motion.ul
              className="article-page__related-list"
              variants={relatedContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
            >
              {related.map((item) => {
                const thumb = getArticleHero(item.slug)
                return (
                  <motion.li key={item.slug} variants={relatedItem}>
                    <Link
                      to={`/article/${item.slug}`}
                      className="article-page__related-item"
                    >
                      {thumb ? (
                        <RelatedThumb slug={item.slug} thumb={thumb} />
                      ) : null}
                      <span className="article-page__related-title-text">
                        {item.title}
                      </span>
                    </Link>
                  </motion.li>
                )
              })}
            </motion.ul>
          </section>
        ) : null}

        <ArticleCommentSection
          key={article.slug}
          articleSlug={article.slug}
        />

        <p className="article-page__back">
          <Link to="/">Back to the front page</Link>
        </p>
      </article>
    </>
  )
}
