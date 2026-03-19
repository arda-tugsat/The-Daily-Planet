import { describe, expect, it } from 'vitest'
import type { Article } from './types'
import {
  findTopicLabel,
  getArticlesByTopicSlug,
  listTopics,
  tagToTopicSlug,
} from './topicUtils'

const sampleArticles: Article[] = [
  {
    slug: 'a1',
    title: 'A',
    dek: 'd',
    byline: 'b',
    section: 'metro',
    publishedAt: '2026-01-01T12:00:00.000Z',
    dateline: 'X',
    body: ['p'],
    tags: ['City Hall', "readers' choice"],
  },
  {
    slug: 'a2',
    title: 'B',
    dek: 'd',
    byline: 'b',
    section: 'world',
    publishedAt: '2026-01-02T12:00:00.000Z',
    dateline: 'Y',
    body: ['q'],
    tags: ['city hall', 'diplomacy'],
  },
]

describe('tagToTopicSlug', () => {
  it('normalises apostrophes and punctuation', () => {
    expect(tagToTopicSlug("readers' choice")).toBe('readers-choice')
    expect(tagToTopicSlug(' S.T.A.R. Labs ')).toBe('s-t-a-r-labs')
    expect(tagToTopicSlug('Metro — Transit')).toBe('metro-transit')
  })
})

describe('listTopics', () => {
  it('merges tags that share a slug; same string length keeps first label', () => {
    const topics = listTopics(sampleArticles)
    const hall = topics.find((t) => t.slug === 'city-hall')
    expect(hall?.count).toBe(2)
    expect(hall?.label).toBe('City Hall')
  })

  it('prefers strictly shorter display label when slug matches', () => {
    const two: Article[] = [
      {
        slug: 'x',
        title: 't',
        dek: 'd',
        byline: 'b',
        section: 'metro',
        publishedAt: '2026-01-01T12:00:00.000Z',
        dateline: 'M',
        body: ['p'],
        tags: ['City-Hall'],
      },
      {
        slug: 'y',
        title: 't',
        dek: 'd',
        byline: 'b',
        section: 'world',
        publishedAt: '2026-01-02T12:00:00.000Z',
        dateline: 'M',
        body: ['p'],
        tags: ['city hall'],
      },
    ]
    const hall = listTopics(two).find((t) => t.slug === 'city-hall')
    expect(hall?.count).toBe(2)
    expect(hall?.label).toBe('city hall')
  })
})

describe('getArticlesByTopicSlug', () => {
  it('matches tags that map to the slug', () => {
    const list = getArticlesByTopicSlug('city-hall', sampleArticles)
    expect(list.map((a) => a.slug).sort()).toEqual(['a1', 'a2'])
  })
})

describe('findTopicLabel', () => {
  it('returns first matching tag label in archive order', () => {
    expect(findTopicLabel('city-hall', sampleArticles)).toBe('City Hall')
  })
})
