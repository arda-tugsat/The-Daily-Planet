import { Link, useParams } from 'react-router-dom'
import { StoryCard } from '../components/editorial/StoryCard'
import { sectionLabels } from '../data/articles'
import type { SectionId } from '../data/types'
import { getArticlesBySection, isValidSectionId } from '../data/queries'
import { sectionNotes } from '../data/sectionNotes'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function SectionPage() {
  const { sectionId } = useParams<{ sectionId: string }>()
  const valid = sectionId && isValidSectionId(sectionId)
  const section = valid ? (sectionId as SectionId) : null
  const stories = section ? getArticlesBySection(section) : []
  const label = section ? sectionLabels[section] : 'Section'
  const note = section ? sectionNotes[section] : undefined

  useDocumentTitle(
    valid ? label : 'Section',
    valid
      ? `${label} coverage from the Daily Planet demonstration edition.`
      : undefined,
    'website',
  )

  if (!valid || !section) {
    return (
      <div className="article-page article-page--missing">
        <p className="article-page__missing">Unknown section.</p>
        <p>
          <Link to="/">Return to the front page</Link>
        </p>
      </div>
    )
  }

  return (
    <div>
      <header className="page-header">
        <p className="page-header__label">Section front</p>
        <h1 className="page-header__title">{label}</h1>
        {note ? <p className="page-header__dek">{note}</p> : null}
      </header>
      <div className="section-front__list">
        {stories.map((article) => (
          <StoryCard key={article.slug} article={article} variant="list" />
        ))}
      </div>
    </div>
  )
}
