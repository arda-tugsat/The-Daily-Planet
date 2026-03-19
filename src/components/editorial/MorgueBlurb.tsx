import { getMorgueBlurbForToday } from '../../data/historicalNotes'

export function MorgueBlurb() {
  const blurb = getMorgueBlurbForToday()

  if (!blurb) {
    return null
  }

  return (
    <aside className="morgue-blurb" aria-label="From the morgue">
      <p className="morgue-blurb__label">From the morgue — this date</p>
      <p className="morgue-blurb__headline">{blurb.headline}</p>
      <p className="morgue-blurb__dek">{blurb.dek}</p>
      <p className="morgue-blurb__meta">
        Originally published March {blurb.day}, {blurb.year}
      </p>
    </aside>
  )
}
