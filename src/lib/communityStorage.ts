const COMMENTS_KEY = 'daily-planet-comments-v1'
const FORUM_KEY = 'daily-planet-forum-v1'

export interface StoredComment {
  id: string
  author: string
  body: string
  createdAt: string
}

export interface ForumPost {
  id: string
  author: string
  title: string
  body: string
  kind: 'reporter-tip' | 'general'
  createdAt: string
}

function readCommentsMap(): Record<string, StoredComment[]> {
  try {
    const raw = localStorage.getItem(COMMENTS_KEY)
    if (!raw) {
      return {}
    }
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') {
      return {}
    }
    return parsed as Record<string, StoredComment[]>
  } catch {
    return {}
  }
}

function writeCommentsMap(map: Record<string, StoredComment[]>) {
  try {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(map))
  } catch {
    /* quota or private mode */
  }
}

export function loadCommentsForArticle(slug: string): StoredComment[] {
  const map = readCommentsMap()
  const list = map[slug]
  return Array.isArray(list) ? [...list].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  ) : []
}

export function appendArticleComment(
  slug: string,
  author: string,
  body: string,
): StoredComment | null {
  const trimmedAuthor = author.trim().slice(0, 80) || 'Anonymous reader'
  const trimmedBody = body.trim().slice(0, 4000)
  if (!trimmedBody) {
    return null
  }

  const comment: StoredComment = {
    id:
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `c-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    author: trimmedAuthor,
    body: trimmedBody,
    createdAt: new Date().toISOString(),
  }

  const map = readCommentsMap()
  const existing = Array.isArray(map[slug]) ? map[slug] : []
  map[slug] = [comment, ...existing]
  writeCommentsMap(map)
  return comment
}

export function loadForumPosts(): ForumPost[] {
  try {
    const raw = localStorage.getItem(FORUM_KEY)
    if (!raw) {
      return []
    }
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) {
      return []
    }
    return (parsed as ForumPost[]).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  } catch {
    return []
  }
}

function writeForumPosts(posts: ForumPost[]) {
  try {
    localStorage.setItem(FORUM_KEY, JSON.stringify(posts))
  } catch {
    /* ignore */
  }
}

export function appendForumPost(
  author: string,
  title: string,
  body: string,
  kind: ForumPost['kind'],
): ForumPost | null {
  const trimmedAuthor = author.trim().slice(0, 80) || 'Anonymous'
  const trimmedTitle = title.trim().slice(0, 160)
  const trimmedBody = body.trim().slice(0, 8000)
  if (!trimmedTitle || !trimmedBody) {
    return null
  }

  const post: ForumPost = {
    id:
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `p-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    author: trimmedAuthor,
    title: trimmedTitle,
    body: trimmedBody,
    kind,
    createdAt: new Date().toISOString(),
  }

  const posts = loadForumPosts()
  writeForumPosts([post, ...posts])
  return post
}
