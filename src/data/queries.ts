import { articles, sectionLabels } from './articles'
import type { Article, SectionId } from './types'

export { sectionLabels }

export function sortByPublishedDesc(list: Article[]): Article[] {
  return [...list].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
}

export function getArticlesBySection(section: SectionId): Article[] {
  return sortByPublishedDesc(articles.filter((a) => a.section === section))
}

export function getRelatedArticles(article: Article): Article[] {
  if (!article.relatedSlugs?.length) {
    return []
  }
  const related: Article[] = []
  for (const slug of article.relatedSlugs) {
    const found = articles.find((a) => a.slug === slug)
    if (found && found.slug !== article.slug) {
      related.push(found)
    }
  }
  return related
}

const SEARCH_FIELDS: (keyof Article)[] = [
  'title',
  'dek',
  'byline',
  'dateline',
]

export function searchArticles(query: string): Article[] {
  const q = query.trim().toLowerCase()
  if (!q) {
    return sortByPublishedDesc(articles)
  }
  return sortByPublishedDesc(
    articles.filter((article) => {
      const inFields = SEARCH_FIELDS.some((key) =>
        String(article[key]).toLowerCase().includes(q),
      )
      const inBody = article.body.some((p) => p.toLowerCase().includes(q))
      const inTags = article.tags?.some((t) => t.toLowerCase().includes(q))
      return inFields || inBody || inTags
    }),
  )
}

/** ~200 words per minute for news copy. */
export function estimateReadingMinutes(article: Article): number {
  const words = article.body.join(' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function getNotebookBriefs(count = 3): Article[] {
  const withLine = articles.filter((a) => a.notebookLine)
  return sortByPublishedDesc(withLine).slice(0, count)
}

export function isValidSectionId(id: string): id is SectionId {
  return id in sectionLabels
}

export function getArticlesBySeriesId(seriesId: string): Article[] {
  return sortByPublishedDesc(
    articles.filter((article) => article.seriesId === seriesId),
  )
}
