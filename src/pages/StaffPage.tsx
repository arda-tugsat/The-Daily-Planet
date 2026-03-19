import { Link } from 'react-router-dom'
import { staff } from '../data/staff'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function StaffPage() {
  useDocumentTitle(
    'Masthead & Staff',
    'Meet the Planet’s fictional reporters and editors.',
    'website',
  )

  return (
    <div>
      <header className="page-header">
        <p className="page-header__label">The newsroom</p>
        <h1 className="page-header__title">Masthead &amp; Staff</h1>
        <p className="page-header__dek">
          The people who argue about commas so you do not have to.
        </p>
      </header>
      <div className="staff-page__grid">
        {staff.map((member) => (
          <article key={member.id} className="staff-card">
            <h2 className="staff-card__name">{member.name}</h2>
            <p className="staff-card__title">{member.title}</p>
            <p className="staff-card__bio">{member.bio}</p>
            {member.latestArticleSlug ? (
              <Link
                className="staff-card__link"
                to={`/article/${member.latestArticleSlug}`}
              >
                Latest byline →
              </Link>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  )
}
