import type { Article } from './types'
import { markdownArticles } from './markdownArticles'
import { staticArticles } from './articlesStatic'

function sortPublishedDesc(list: Article[]): Article[] {
  return [...list].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
}

/** Markdown entries override static when slugs collide (CMS-style wins). */
function mergeArticleSources(
  staticList: Article[],
  mdList: Article[],
): Article[] {
  const bySlug = new Map<string, Article>()
  for (const article of staticList) {
    bySlug.set(article.slug, article)
  }
  for (const article of mdList) {
    bySlug.set(article.slug, article)
  }
  return sortPublishedDesc([...bySlug.values()])
}

export const articles: Article[] = mergeArticleSources(
  staticArticles,
  markdownArticles,
)

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}

export const sectionLabels: Record<Article['section'], string> = {
  metro: 'Metro',
  world: 'World',
  science: 'Science',
  opinion: 'Opinion',
  business: 'Business',
  sports: 'Sports',
}
