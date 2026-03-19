import { useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import { getArticleBySlug } from '../data/articles'
import {
  getSavedSlugs,
  removeSavedSlug,
  subscribeSavedChanges,
} from '../lib/savedStories'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function SavedPage() {
  const slugs = useSyncExternalStore(
    subscribeSavedChanges,
    getSavedSlugs,
    () => [],
  )

  useDocumentTitle(
    'Saved stories',
    slugs.length > 0
      ? `${slugs.length} story bookmarks stored in this browser.`
      : 'Save articles while you read — stored only on this device.',
    'website',
  )

  return (
    <div className="saved-page">
      <header className="page-header">
        <p className="page-header__label">Your desk</p>
        <h1 className="page-header__title">Saved stories</h1>
        <p className="page-header__dek">
          Bookmarks live in <strong>this browser only</strong> — no account, no
          sync. Clear site data and they disappear, like yellow clips on a
          physical desk.
        </p>
      </header>

      {slugs.length === 0 ? (
        <p className="saved-page__empty">
          Nothing saved yet. Open any article and tap <strong>Save story</strong>{' '}
          in the byline row.
        </p>
      ) : (
        <ul className="saved-page__list">
          {slugs.map((slug) => {
            const article = getArticleBySlug(slug)
            return (
              <li key={slug} className="saved-page__item">
                {article ? (
                  <Link to={`/article/${slug}`} className="saved-page__title-link">
                    {article.title}
                  </Link>
                ) : (
                  <span className="saved-page__missing-title">
                    Removed story ({slug})
                  </span>
                )}
                <button
                  type="button"
                  className="saved-page__remove"
                  onClick={() => {
                    removeSavedSlug(slug)
                  }}
                >
                  Remove
                </button>
              </li>
            )
          })}
        </ul>
      )}

      <p className="saved-page__back">
        <Link to="/">← Front page</Link>
      </p>
    </div>
  )
}
