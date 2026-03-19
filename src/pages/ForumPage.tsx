import { useCallback, useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import {
  appendForumPost,
  loadForumPosts,
  type ForumPost,
} from '../lib/communityStorage'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso))
}

const KIND_LABEL: Record<ForumPost['kind'], string> = {
  'reporter-tip': 'Tip for reporters',
  general: 'General',
}

export function ForumPage() {
  useDocumentTitle(
    'Reader forum & tips',
    'Tips and discussion for our fictional newsroom — stored on your device only.',
    'website',
  )

  const [posts, setPosts] = useState<ForumPost[]>(() => loadForumPosts())
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [kind, setKind] = useState<ForumPost['kind']>('reporter-tip')
  const [error, setError] = useState<string | null>(null)
  const [isPosting, setIsPosting] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const refresh = useCallback(() => {
    setPosts(loadForumPosts())
  }, [])

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setIsPosting(true)
    const added = appendForumPost(author, title, body, kind)
    if (!added) {
      setError('Please add both a headline and details before posting.')
      setIsPosting(false)
      return
    }
    setTitle('')
    setBody('')
    refresh()
    window.setTimeout(() => setIsPosting(false), 320)
  }

  return (
    <div className="forum-page">
      <header className="page-header">
        <p className="page-header__label">Community desk</p>
        <h1 className="page-header__title">Reader forum</h1>
        <p className="page-header__dek">
          Leave a lead for our brave reporters or chat with other readers.
          Posts stay on <strong>this browser only</strong> — think of it as the
          Planet’s corkboard in your living room.
        </p>
      </header>

      <section className="forum-page__compose" aria-labelledby="compose-heading">
        <h2 id="compose-heading" className="forum-page__section-title">
          New post
        </h2>
        <form className="forum-page__form" onSubmit={onSubmit}>
          <label className="forum-page__label" htmlFor="forum-kind">
            Type
          </label>
          <select
            id="forum-kind"
            className="forum-page__select"
            value={kind}
            onChange={(event) =>
              setKind(event.target.value as ForumPost['kind'])
            }
          >
            <option value="reporter-tip">Tip / lead for reporters</option>
            <option value="general">General discussion</option>
          </select>

          <label className="forum-page__label" htmlFor="forum-author">
            Display name
          </label>
          <input
            id="forum-author"
            className="forum-page__input"
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="How should we credit you?"
            maxLength={80}
            autoComplete="nickname"
          />

          <label className="forum-page__label" htmlFor="forum-title">
            Headline
          </label>
          <input
            id="forum-title"
            className="forum-page__input"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Short subject line"
            maxLength={160}
            required
          />

          <label className="forum-page__label" htmlFor="forum-body">
            Message
          </label>
          <textarea
            id="forum-body"
            className="forum-page__textarea"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder={
              kind === 'reporter-tip'
                ? 'What should Lois, Clark, or Jimmy know? Be specific if you can.'
                : 'Say your piece…'
            }
            rows={6}
            maxLength={8000}
            required
          />

          {error ? (
            <p className="forum-page__error" role="alert">
              {error}
            </p>
          ) : null}

          <motion.button
            type="submit"
            className={`forum-page__submit${isPosting ? ' forum-page__submit--busy' : ''}`}
            disabled={isPosting}
            whileTap={
              prefersReducedMotion || isPosting ? undefined : { scale: 0.98 }
            }
          >
            Post to the forum
          </motion.button>
        </form>
      </section>

      <section className="forum-page__feed" aria-labelledby="feed-heading">
        <h2 id="feed-heading" className="forum-page__section-title">
          Latest posts ({posts.length})
        </h2>
        {posts.length === 0 ? (
          <p className="forum-page__empty">
            The board is quiet. Be the first to tip the newsroom.
          </p>
        ) : (
          <ul className="forum-page__list">
            {posts.map((post) => (
              <li key={post.id} className="forum-page__post">
                <p className="forum-page__post-kind">{KIND_LABEL[post.kind]}</p>
                <h3 className="forum-page__post-title">{post.title}</h3>
                <p className="forum-page__post-meta">
                  <span>{post.author}</span>
                  <span aria-hidden="true"> · </span>
                  <time dateTime={post.createdAt}>
                    {formatPostDate(post.createdAt)}
                  </time>
                </p>
                <p className="forum-page__post-body">{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="forum-page__back">
        <Link to="/">← Front page</Link>
      </p>
    </div>
  )
}
