import { describe, expect, it } from 'vitest'
import { articles } from './articles'
import {
  estimateReadingMinutes,
  getArticlesBySeriesId,
  getRelatedArticles,
  isValidSectionId,
  searchArticles,
  sortByPublishedDesc,
} from './queries'

describe('isValidSectionId', () => {
  it('accepts known sections', () => {
    expect(isValidSectionId('metro')).toBe(true)
    expect(isValidSectionId('nope')).toBe(false)
  })
})

describe('searchArticles', () => {
  it('returns full sorted list for empty query', () => {
    const all = searchArticles('')
    expect(all.length).toBe(articles.length)
  })

  it('matches tags and body text', () => {
    const harbor = searchArticles('harbor')
    expect(harbor.some((a) => a.slug.includes('harbor'))).toBe(true)
  })
})

describe('getRelatedArticles', () => {
  it('resolves relatedSlugs excluding self', () => {
    const article = articles.find((a) => a.slug === 'harbor-district-vote-tonight')
    expect(article).toBeDefined()
    const related = getRelatedArticles(article!)
    expect(related.length).toBeGreaterThan(0)
    expect(related.every((r) => r.slug !== article!.slug)).toBe(true)
  })
})

describe('estimateReadingMinutes', () => {
  it('is at least 1', () => {
    const short: (typeof articles)[0] = {
      ...articles[0],
      body: ['one'],
    }
    expect(estimateReadingMinutes(short)).toBeGreaterThanOrEqual(1)
  })
})

describe('getArticlesBySeriesId', () => {
  it('returns harbour inquiry parts', () => {
    const series = getArticlesBySeriesId('harbor-inquiry')
    expect(series.length).toBe(3)
    expect(sortByPublishedDesc(series)[0].seriesId).toBe('harbor-inquiry')
  })
})
