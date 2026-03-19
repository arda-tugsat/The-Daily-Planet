import { useEffect } from 'react'
import { motion } from 'motion/react'
import { Link, useLocation } from 'react-router-dom'
import { articles, sectionLabels } from '../data/articles'
import { getSeriesInfo } from '../data/seriesCatalog'
import type { Article, SectionId } from '../data/types'
import {
  getNotebookBriefs,
  sortByPublishedDesc,
} from '../data/queries'
import { CrosswordTeaser } from '../components/editorial/CrosswordTeaser'
import { MorgueBlurb } from '../components/editorial/MorgueBlurb'
import { StoryCard } from '../components/editorial/StoryCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useStaggerVariants } from '../motion/stagger'

const sectionOrder: SectionId[] = [
  'metro',
  'world',
  'science',
  'business',
  'sports',
  'opinion',
]

function groupBySection(list: Article[]): Map<SectionId, Article[]> {
  const map = new Map<SectionId, Article[]>()
  for (const article of list) {
    const bucket = map.get(article.section) ?? []
    bucket.push(article)
    map.set(article.section, bucket)
  }
  return map
}

function pickBySections(
  ordered: Article[],
  used: Set<string>,
  sections: SectionId[],
  max: number,
): Article[] {
  const out: Article[] = []
  for (const article of ordered) {
    if (out.length >= max) {
      break
    }
    if (used.has(article.slug)) {
      continue
    }
    if (sections.includes(article.section)) {
      out.push(article)
      used.add(article.slug)
    }
  }
  return out
}

export function HomePage() {
  useDocumentTitle(
    undefined,
    'The Daily Planet — fictional Metropolis front page, briefing river, and sections demo.',
    'website',
  )
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      return
    }
    const id = location.hash.slice(1)
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location])

  const ordered = sortByPublishedDesc(articles)
  const [lead, ...tail] = ordered
  const rail = tail.slice(0, 2)
  const remainder = tail.slice(2)
  const remainderBySection = groupBySection(remainder)

  const usedSlugs = new Set(
    [lead?.slug, ...rail.map((a) => a.slug)].filter(Boolean) as string[],
  )

  const riverWorldScience = pickBySections(
    ordered,
    usedSlugs,
    ['world', 'science'],
    4,
  )
  const riverOpinion = pickBySections(ordered, usedSlugs, ['opinion'], 4)
  const riverSportsBiz = pickBySections(
    ordered,
    usedSlugs,
    ['sports', 'business'],
    4,
  )

  const notebooks = getNotebookBriefs(3)
  const harborSeries = getSeriesInfo('harbor-inquiry')
  const { container, item } = useStaggerVariants()

  return (
    <div className="home">
      <h1 className="visually-hidden">The Daily Planet — front page</h1>

      <section className="home__notebook" aria-labelledby="notebook-heading">
        <h2 id="notebook-heading" className="home__notebook-title">
          Reporter’s notebook
        </h2>
        <motion.ul
          className="home__notebook-list"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {notebooks.map((article) => (
            <motion.li key={article.slug} variants={item}>
              <Link
                to={`/article/${article.slug}`}
                className="home__notebook-link"
              >
                <span className="home__notebook-kicker">
                  {article.notebookLine}
                </span>{' '}
                <span className="home__notebook-headline">{article.title}</span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {harborSeries ? (
        <section className="home__series-promo" aria-labelledby="series-promo-h">
          <h2 id="series-promo-h" className="home__series-promo-title">
            Running investigation
          </h2>
          <p className="home__series-promo-dek">{harborSeries.dek}</p>
          <Link className="home__series-promo-link" to="/series/harbor-inquiry">
            Read the full {harborSeries.title} series →
          </Link>
        </section>
      ) : null}

      <div className="home__top">
        <motion.div
          className="home__lead"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {lead ? (
            <motion.div variants={item} key={lead.slug}>
              <StoryCard article={lead} variant="lead" showReadingTime />
            </motion.div>
          ) : null}
        </motion.div>
        <motion.aside
          className="home__rail"
          aria-label="Secondary stories"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {rail.map((article) => (
            <motion.div key={article.slug} variants={item}>
              <StoryCard article={article} variant="rail" />
            </motion.div>
          ))}
        </motion.aside>
      </div>

      <div className="home__rule" aria-hidden="true" />

      <p className="home__label" id="river-label">
        Headline river
      </p>
      <div className="home__river" aria-labelledby="river-label">
        <div className="home__river-col">
          <h2 className="home__river-heading">World &amp; Science</h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
          >
            {riverWorldScience.map((article) => (
              <motion.div
                key={article.slug}
                className="home__river-slot"
                variants={item}
              >
                <StoryCard article={article} variant="river" />
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="home__river-col">
          <h2 className="home__river-heading">Opinion</h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
          >
            {riverOpinion.map((article) => (
              <motion.div
                key={article.slug}
                className="home__river-slot"
                variants={item}
              >
                <StoryCard article={article} variant="river" />
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="home__river-col">
          <h2 className="home__river-heading">Sports &amp; Business</h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
          >
            {riverSportsBiz.map((article) => (
              <motion.div
                key={article.slug}
                className="home__river-slot"
                variants={item}
              >
                <StoryCard article={article} variant="river" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <CrosswordTeaser />
      <MorgueBlurb />

      <div className="home__rule" aria-hidden="true" />

      <p className="home__label">More from the Planet</p>

      {sectionOrder.map((sectionId) => {
        const stories = remainderBySection.get(sectionId)
        if (!stories?.length) {
          return null
        }

        return (
          <section
            key={sectionId}
            id={`section-${sectionId}`}
            className="home__section-block"
            aria-labelledby={`heading-${sectionId}`}
          >
            <h2 id={`heading-${sectionId}`} className="home__section-heading">
              <span>{sectionLabels[sectionId]}</span>
              <Link
                className="home__section-see-all"
                to={`/section/${sectionId}`}
              >
                See all in {sectionLabels[sectionId]} →
              </Link>
            </h2>
            <motion.div
              className="home__section-stories"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {stories.map((article) => (
                <motion.div key={article.slug} variants={item}>
                  <StoryCard article={article} variant="list" />
                </motion.div>
              ))}
            </motion.div>
          </section>
        )
      })}
    </div>
  )
}
