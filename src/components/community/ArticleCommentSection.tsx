import { useCallback, useMemo, useState, type FormEvent } from 'react'
import {
  appendArticleComment,
  loadCommentsForArticle,
  type StoredComment,
} from '../../lib/communityStorage'

function formatCommentDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso))
}

interface ArticleCommentSectionProps {
  articleSlug: string
}

export function ArticleCommentSection({ articleSlug }: ArticleCommentSectionProps) {
  const [comments, setComments] = useState<StoredComment[]>(() =>
    loadCommentsForArticle(articleSlug),
  )
  const [author, setAuthor] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(() => {
    setComments(loadCommentsForArticle(articleSlug))
  }, [articleSlug])

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    const added = appendArticleComment(articleSlug, author, body)
    if (!added) {
      setError('Please write something before posting.')
      return
    }
    setBody('')
    refresh()
  }

  const countLabel = useMemo(() => {
    const n = comments.length
    return n === 1 ? '1 comment' : `${n} comments`
  }, [comments.length])

  return (
    <section
      className="comment-section"
      aria-labelledby="comments-heading"
    >
      <h2 id="comments-heading" className="comment-section__title">
        Reader discussion
      </h2>
      <p className="comment-section__note">
        {countLabel}. Comments are saved on <strong>this device only</strong> so
        you can join the conversation in our demo newsroom.
      </p>

      <ul className="comment-section__list">
        {comments.length === 0 ? (
          <li className="comment-section__empty">
            No comments yet — start the thread.
          </li>
        ) : (
          comments.map((comment) => (
            <li key={comment.id} className="comment-section__item">
              <p className="comment-section__meta">
                <span className="comment-section__author">{comment.author}</span>
                <span className="comment-section__date" aria-label="Posted">
                  {formatCommentDate(comment.createdAt)}
                </span>
              </p>
              <p className="comment-section__body">{comment.body}</p>
            </li>
          ))
        )}
      </ul>

      <form className="comment-section__form" onSubmit={onSubmit}>
        <p className="comment-section__form-title">Add a comment</p>
        <label className="comment-section__label" htmlFor={`comment-author-${articleSlug}`}>
          Display name
        </label>
        <input
          id={`comment-author-${articleSlug}`}
          className="comment-section__input"
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          placeholder="e.g. Metropolis resident"
          maxLength={80}
          autoComplete="nickname"
        />
        <label className="comment-section__label" htmlFor={`comment-body-${articleSlug}`}>
          Comment
        </label>
        <textarea
          id={`comment-body-${articleSlug}`}
          className="comment-section__textarea"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Share your perspective…"
          rows={4}
          maxLength={4000}
          required
        />
        {error ? (
          <p className="comment-section__error" role="alert">
            {error}
          </p>
        ) : null}
        <button type="submit" className="comment-section__submit">
          Post comment
        </button>
      </form>
    </section>
  )
}
