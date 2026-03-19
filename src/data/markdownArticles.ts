import matter from 'gray-matter'
import type { Article, SectionId } from './types'

const modules = import.meta.glob('../../content/articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const SECTIONS: SectionId[] = [
  'metro',
  'world',
  'science',
  'opinion',
  'business',
  'sports',
]

function isSectionId(value: unknown): value is SectionId {
  return typeof value === 'string' && SECTIONS.includes(value as SectionId)
}

/** Front matter keys must align with Article; body is paragraph-separated in markdown. */
export function loadMarkdownArticles(): Article[] {
  const out: Article[] = []

  for (const [, raw] of Object.entries(modules)) {
    const { data, content } = matter(raw)
    const slug = data.slug as string
    const title = data.title as string
    const dek = data.dek as string
    const byline = data.byline as string
    const section = data.section
    const publishedAt = data.publishedAt as string
    const dateline = (data.dateline as string) ?? 'METROPOLIS'

    if (
      !slug ||
      !title ||
      !dek ||
      !byline ||
      !isSectionId(section) ||
      !publishedAt
    ) {
      console.warn('[markdownArticles] skipping file with invalid front matter')
      continue
    }

    const body = content
      .trim()
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean)

    if (body.length === 0) {
      continue
    }

    const article: Article = {
      slug,
      title,
      dek,
      byline,
      section,
      publishedAt,
      dateline,
      body,
    }

    if (data.tags) {
      article.tags = Array.isArray(data.tags) ? data.tags : [String(data.tags)]
    }
    if (data.relatedSlugs) {
      article.relatedSlugs = data.relatedSlugs as string[]
    }
    if (data.notebookLine) {
      article.notebookLine = String(data.notebookLine)
    }
    if (data.pullQuote) {
      article.pullQuote = String(data.pullQuote)
    }
    if (data.seriesId) {
      article.seriesId = String(data.seriesId)
      article.seriesPart = Number(data.seriesPart)
      article.seriesTotal = Number(data.seriesTotal)
    }
    if (data.correctionNote) {
      article.correctionNote = String(data.correctionNote)
    }
    if (data.editorNote) {
      article.editorNote = String(data.editorNote)
    }
    if (data.lastUpdatedAt) {
      article.lastUpdatedAt = String(data.lastUpdatedAt)
    }

    out.push(article)
  }

  return out
}

export const markdownArticles: Article[] = loadMarkdownArticles()
