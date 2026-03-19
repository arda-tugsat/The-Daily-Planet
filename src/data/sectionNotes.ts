import type { SectionId } from './types'

/** Fictional editor’s kicker for section fronts. */
export const sectionNotes: Partial<Record<SectionId, string>> = {
  metro:
    'City desk: zoning fights, neighborhood beats, and the stubborn poetry of a bus schedule.',
  world:
    'Foreign desk: cables, consulates, and the long pause between handshake and treaty.',
  science:
    'Science desk: peer review first, headline second — unless the lab is on fire.',
  opinion:
    'Opinion: argument with receipts; letters welcome; cruelty is not argument.',
  business:
    'Business desk: filings tell stories spreadsheets forget to mention.',
  sports:
    'Sports: box scores, human costs, and the clock that never apologizes.',
}
