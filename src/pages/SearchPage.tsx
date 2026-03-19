import { useMemo, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useSearchParams } from 'react-router-dom'
import { StoryCard } from '../components/editorial/StoryCard'
import { searchArticles } from '../data/queries'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useStaggerVariants } from '../motion/stagger'

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const prefersReducedMotion = useReducedMotion()
  const { container, item } = useStaggerVariants()

  const results = useMemo(() => searchArticles(query), [query])

  useDocumentTitle(
    query ? `Search: ${query}` : 'Search',
    query
      ? `Search results for “${query}” in the Daily Planet demo archive.`
      : 'Search headlines, bylines, and story text in the Daily Planet demo.',
    'website',
  )

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
  }

  return (
    <div>
      <header className="page-header">
        <p className="page-header__label">Archive search</p>
        <h1 className="page-header__title">Search the Planet</h1>
        <p className="page-header__dek">
          Client-side search across headlines, bylines, and story text. No
          accounts, no tracking.
        </p>
      </header>

      <form className="search-page__form" onSubmit={onSubmit} role="search">
        <label htmlFor="search-q" className="visually-hidden">
          Search query
        </label>
        <input
          id="search-q"
          className="search-page__input"
          name="q"
          value={query}
          onChange={(event) => {
            const next = event.target.value
            if (next.trim()) {
              setSearchParams({ q: next }, { replace: true })
            } else {
              setSearchParams({}, { replace: true })
            }
          }}
          placeholder="Try “harbor,” “LexCorp,” or “library”…"
          autoComplete="off"
        />
        <motion.button
          type="submit"
          className="search-page__submit"
          whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
        >
          Search
        </motion.button>
      </form>

      <p className="search-page__count" aria-live="polite">
        {query
          ? `${results.length} stor${results.length === 1 ? 'y' : 'ies'} found`
          : `${results.length} stories in the archive`}
      </p>

      <motion.div
        key={query}
        className="section-front__list"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {results.map((article) => (
          <motion.div key={article.slug} variants={item}>
            <StoryCard
              article={article}
              variant="list"
              highlightQuery={query}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
