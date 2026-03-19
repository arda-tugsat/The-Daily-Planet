import { letters } from '../data/letters'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function LettersPage() {
  useDocumentTitle(
    'Letters to the Editor',
    'Fictional reader letters — edited for length and clarity.',
    'website',
  )

  return (
    <div>
      <header className="page-header">
        <p className="page-header__label">Opinion desk</p>
        <h1 className="page-header__title">Letters to the Editor</h1>
        <p className="page-header__dek">
          Fictional correspondence for this demonstration site — edited for
          length and clarity.
        </p>
      </header>
      {letters.map((letter) => (
        <article key={letter.id} className="letters-page__item">
          <p className="letters-page__meta">
            {letter.authorLine} · {letter.locationLine}
          </p>
          <p className="letters-page__body">{letter.body}</p>
        </article>
      ))}
    </div>
  )
}
