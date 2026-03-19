import { useEdition } from '../../context/EditionContext'

function getEditionLabel(hour: number): string {
  if (hour >= 17 || hour < 4) {
    return 'Late City Edition'
  }
  return 'Morning Edition'
}

export function EditionRibbon() {
  const { edition, toggleEdition } = useEdition()
  const hour = new Date().getHours()
  const label = getEditionLabel(hour)

  return (
    <div className="edition-ribbon">
      <p className="edition-ribbon__label">{label}</p>
      <p className="edition-ribbon__weather" aria-live="polite">
        River fog clearing · High 58°F · Transit: expect minor delays on the N-14
        after midnight.
      </p>
      <button
        type="button"
        className="edition-ribbon__toggle"
        onClick={toggleEdition}
        aria-pressed={edition === 'late'}
      >
        {edition === 'late' ? 'Paper: Late Final' : 'Paper: Morning'}
      </button>
    </div>
  )
}
