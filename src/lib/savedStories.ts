const STORAGE_KEY = 'daily-planet-saved-v1'

/** Stable empty snapshot for useSyncExternalStore (must be same ref when unchanged). */
const EMPTY_SLUGS: string[] = []

let snapshotCacheValid = false
let cachedStorageKey = ''
let cachedSlugs: string[] = EMPTY_SLUGS

function invalidateSnapshotCache() {
  snapshotCacheValid = false
}

function readSlugsFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) {
      return []
    }
    return parsed.filter((item): item is string => typeof item === 'string')
  } catch {
    return []
  }
}

function writeSlugs(slugs: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs))
    invalidateSnapshotCache()
    notifySavedChanged()
  } catch {
    /* quota / private mode */
  }
}

function notifySavedChanged() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('dp-saved-updated'))
  }
}

export function subscribeSavedChanges(onStoreChange: () => void): () => void {
  const handler = () => onStoreChange()
  if (typeof window === 'undefined') {
    return () => {}
  }
  window.addEventListener('dp-saved-updated', handler)
  window.addEventListener('storage', handler)
  return () => {
    window.removeEventListener('dp-saved-updated', handler)
    window.removeEventListener('storage', handler)
  }
}

/**
 * Snapshot for useSyncExternalStore: returns the same array reference while
 * localStorage contents are unchanged. New [] each time causes infinite rerenders
 * (React error #185).
 */
export function getSavedSlugs(): string[] {
  let raw: string | null
  try {
    raw = localStorage.getItem(STORAGE_KEY)
  } catch {
    return EMPTY_SLUGS
  }

  const key = raw === null ? '' : raw
  if (snapshotCacheValid && cachedStorageKey === key) {
    return cachedSlugs
  }

  snapshotCacheValid = true
  cachedStorageKey = key
  if (!raw) {
    cachedSlugs = EMPTY_SLUGS
    return cachedSlugs
  }

  try {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) {
      cachedSlugs = EMPTY_SLUGS
      return cachedSlugs
    }
    const next = parsed.filter((item): item is string => typeof item === 'string')
    cachedSlugs = next.length === 0 ? EMPTY_SLUGS : next
    return cachedSlugs
  } catch {
    cachedSlugs = EMPTY_SLUGS
    return cachedSlugs
  }
}

export function isSlugSaved(slug: string): boolean {
  return getSavedSlugs().includes(slug)
}

/** @returns whether the story is saved after the toggle */
export function toggleSavedSlug(slug: string): boolean {
  const current = readSlugsFromStorage()
  const index = current.indexOf(slug)
  if (index >= 0) {
    const next = current.filter((s) => s !== slug)
    writeSlugs(next)
    return false
  }
  writeSlugs([slug, ...current])
  return true
}

export function removeSavedSlug(slug: string) {
  writeSlugs(readSlugsFromStorage().filter((s) => s !== slug))
}

/** Clears snapshot cache (e.g. tests after direct localStorage edits). */
export function resetSavedStoriesCacheForTests(): void {
  snapshotCacheValid = false
  cachedStorageKey = ''
  cachedSlugs = EMPTY_SLUGS
}
