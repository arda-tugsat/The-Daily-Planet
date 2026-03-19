import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links: { to: string; label: string; match?: 'exact' }[] = [
  { to: '/', label: 'Front', match: 'exact' },
  { to: '/search', label: 'Search' },
  { to: '/briefing', label: 'Briefing' },
  { to: '/letters', label: 'Letters' },
  { to: '/forum', label: 'Forum' },
  { to: '/topics', label: 'Topics' },
  { to: '/saved', label: 'Saved' },
  { to: '/staff', label: 'Staff' },
  { to: '/corrections', label: 'Corrections' },
]

export function StickySubnav() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`sticky-subnav${isScrolled ? ' sticky-subnav--scrolled' : ''}`}
    >
      <div className="sticky-subnav__inner">
        {links.map(({ to, label, match }) => {
          const isActive =
            match === 'exact'
              ? location.pathname === '/'
              : location.pathname === to ||
                location.pathname.startsWith(`${to}/`)

          return (
            <Link
              key={to}
              to={to}
              className="sticky-subnav__link"
              aria-current={isActive ? 'page' : undefined}
            >
              {label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
