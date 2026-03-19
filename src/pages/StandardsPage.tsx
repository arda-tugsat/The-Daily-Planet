import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function StandardsPage() {
  useDocumentTitle(
    'News standards',
    'How the fictional Daily Planet approaches accuracy, attribution, and reader trust in this demo.',
    'website',
  )

  return (
    <div className="standards-page">
      <header className="page-header">
        <p className="page-header__label">Transparency</p>
        <h1 className="page-header__title">News standards &amp; ethics</h1>
        <p className="page-header__dek">
          The Daily Planet is a <strong>demonstration website</strong>. This page
          describes how we pretend to work — not legal advice, not a real
          newsroom policy.
        </p>
      </header>

      <section className="standards-page__section" aria-labelledby="acc-h">
        <h2 id="acc-h" className="standards-page__h2">
          Accuracy and corrections
        </h2>
        <p className="standards-page__p">
          When we get something wrong in this demo, we say so on the story and
          list it on the{' '}
          <Link to="/corrections">Corrections</Link> page. Fictional errors are
          still errors — they teach the habit of fixing the record visibly.
        </p>
      </section>

      <section className="standards-page__section" aria-labelledby="att-h">
        <h2 id="att-h" className="standards-page__h2">
          Attribution and anonymity
        </h2>
        <p className="standards-page__p">
          Bylines and datelines are part of the story world. “Sources familiar
          with…” lines, when they appear, are narrative devices — not claims
          about real people or documents.
        </p>
      </section>

      <section className="standards-page__section" aria-labelledby="reader-h">
        <h2 id="reader-h" className="standards-page__h2">
          Reader contributions
        </h2>
        <p className="standards-page__p">
          Article comments and the <Link to="/forum">Reader forum</Link> save
          only to your device. There is no newsroom moderation queue because
          there is no server — treat posts as private notes in a prop newspaper.
        </p>
      </section>

      <section className="standards-page__section" aria-labelledby="photo-h">
        <h2 id="photo-h" className="standards-page__h2">
          Images
        </h2>
        <p className="standards-page__p">
          Photographs are stock placeholders with fictional Planet credits (e.g.
          “Photo: Jimmy Olsen”). They do not depict real events tied to the
          headlines.
        </p>
      </section>

      <p className="standards-page__back">
        <Link to="/">← Front page</Link>
      </p>
    </div>
  )
}
