import { afterEach, describe, expect, it } from 'vitest'
import {
  getSavedSlugs,
  resetSavedStoriesCacheForTests,
  toggleSavedSlug,
} from './savedStories'

describe('getSavedSlugs snapshot stability', () => {
  afterEach(() => {
    localStorage.clear()
    resetSavedStoriesCacheForTests()
  })

  it('returns same empty array reference across calls', () => {
    const a = getSavedSlugs()
    const b = getSavedSlugs()
    expect(a).toBe(b)
    expect(a).toEqual([])
  })

  it('updates reference after toggle adds a slug', () => {
    const empty = getSavedSlugs()
    toggleSavedSlug('metro-library-branch-reopens')
    const withOne = getSavedSlugs()
    expect(withOne).not.toBe(empty)
    expect(withOne).toContain('metro-library-branch-reopens')
  })
})
