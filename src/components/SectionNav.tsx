import { Link, useLocation } from 'react-router-dom'

const sections = [
  { id: 'metro', label: 'Metro' },
  { id: 'world', label: 'World' },
  { id: 'science', label: 'Science' },
  { id: 'business', label: 'Business' },
  { id: 'sports', label: 'Sports' },
  { id: 'opinion', label: 'Opinion' },
] as const

export function SectionNav() {
  const location = useLocation()

  return (
    <nav className="section-nav" aria-label="Sections">
      <ul className="section-nav__list">
        <li>
          <Link
            className="section-nav__link section-nav__link--home"
            to="/"
            aria-current={location.pathname === '/' ? 'page' : undefined}
          >
            Front Page
          </Link>
        </li>
        {sections.map(({ id, label }) => {
          const sectionPath = `/section/${id}`
          const onSection = location.pathname === sectionPath

          return (
            <li key={id}>
              <Link
                className="section-nav__link"
                to={sectionPath}
                aria-current={onSection ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          )
        })}
        <li>
          <Link
            className="section-nav__link"
            to={{ pathname: '/', hash: '#section-metro' }}
          >
            Jump ↓
          </Link>
        </li>
      </ul>
    </nav>
  )
}
