import { useSyncExternalStore } from 'react'
import {
  getSavedSlugs,
  subscribeSavedChanges,
  toggleSavedSlug,
} from '../lib/savedStories'

export function SaveStoryButton({ slug }: { slug: string }) {
  const slugs = useSyncExternalStore(
    subscribeSavedChanges,
    getSavedSlugs,
    () => [],
  )
  const isSaved = slugs.includes(slug)

  return (
    <button
      type="button"
      className={isSaved ? 'save-story-btn save-story-btn--saved' : 'save-story-btn'}
      onClick={() => {
        toggleSavedSlug(slug)
      }}
      aria-pressed={isSaved}
    >
      {isSaved ? 'Saved' : 'Save story'}
    </button>
  )
}
