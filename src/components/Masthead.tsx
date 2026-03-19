import { Link } from 'react-router-dom'
import { useEdition } from '../context/EditionContext'

function formatPaperDate(isoDate: string): string {
  const date = new Date(isoDate)
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function Masthead() {
  const today = new Date().toISOString()
  const { edition } = useEdition()

  return (
    <header className="masthead" role="banner">
      <div className="masthead__rule masthead__rule--top" aria-hidden="true" />
      <p className="masthead__tagline">
        All the news Metropolis trusts — morning, noon, and when the presses run
        hot.
      </p>
      {edition === 'late' ? (
        <p className="masthead__edition-kicker">Late City Final</p>
      ) : (
        <p className="masthead__edition-kicker masthead__edition-kicker--morning">
          Morning edition
        </p>
      )}
      <div className="masthead__title-block">
        <p className="masthead__title">
          <Link to="/">The Daily Planet</Link>
        </p>
      </div>
      <div className="masthead__meta">
        <p className="masthead__date">{formatPaperDate(today)}</p>
        <p className="masthead__weather" aria-label="Weather line">
          Today in Metropolis: high 58°F, low 44°F, winds west-northwest, river
          fog clearing by noon.
        </p>
      </div>
      <div className="masthead__rule masthead__rule--bottom" aria-hidden="true" />
    </header>
  )
}
