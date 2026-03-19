import type { Article } from './types'

/** URL segment for topic pages, derived from tag text */
export function tagToTopicSlug(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export interface TopicEntry {
  slug: string
  label: string
  count: number
}

/** One row per distinct slug; label is the shortest tag that maps to that slug */
export function listTopics(articleList: Article[]): TopicEntry[] {
  const bySlug = new Map<string, { label: string; count: number }>()

  for (const article of articleList) {
    for (const tag of article.tags ?? []) {
      const slug = tagToTopicSlug(tag)
      if (!slug) {
        continue
      }
      const existing = bySlug.get(slug)
      if (!existing) {
        bySlug.set(slug, { label: tag.trim(), count: 1 })
      } else {
        existing.count += 1
        if (tag.trim().length < existing.label.length) {
          existing.label = tag.trim()
        }
      }
    }
  }

  return [...bySlug.entries()]
    .map(([slug, { label, count }]) => ({ slug, label, count }))
    .sort((a, b) => a.label.localeCompare(b.label, 'en'))
}

export function getArticlesByTopicSlug(
  slug: string,
  articleList: Article[],
): Article[] {
  return articleList.filter((article) =>
    (article.tags ?? []).some((tag) => tagToTopicSlug(tag) === slug),
  )
}

export function findTopicLabel(
  slug: string,
  articleList: Article[],
): string | undefined {
  for (const article of articleList) {
    for (const tag of article.tags ?? []) {
      if (tagToTopicSlug(tag) === slug) {
        return tag.trim()
      }
    }
  }
  return undefined
}
