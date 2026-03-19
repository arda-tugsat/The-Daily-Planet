export type SectionId =
  | 'metro'
  | 'world'
  | 'science'
  | 'opinion'
  | 'business'
  | 'sports'

/** Remote image URLs + on-page credit line (e.g. "Photo: Jimmy Olsen"). */
export interface ArticleHeroImage {
  src: string
  srcMedium: string
  srcThumb: string
  alt: string
  credit: string
}

export interface Article {
  slug: string
  title: string
  dek: string
  byline: string
  section: SectionId
  publishedAt: string
  /** When set and after publishedAt, shows an “Updated” dateline on the story. */
  lastUpdatedAt?: string
  /** Short note shown when the story develops (clarification, new reporting). */
  editorNote?: string
  dateline: string
  body: string[]
  /** One-line front-page notebook kicker (optional). */
  notebookLine?: string
  tags?: string[]
  relatedSlugs?: string[]
  correctionNote?: string
  pullQuote?: string
  /** Investigative or serial story grouping. */
  seriesId?: string
  seriesPart?: number
  seriesTotal?: number
}

export interface Letter {
  id: string
  authorLine: string
  locationLine: string
  body: string
}

export interface CorrectionItem {
  id: string
  date: string
  text: string
  articleSlug?: string
}

export interface StaffMember {
  id: string
  name: string
  title: string
  bio: string
  latestArticleSlug?: string
}

export interface BriefingItem {
  id: string
  text: string
  articleSlug?: string
}

export interface HistoricalBlurb {
  month: number
  day: number
  year: number
  headline: string
  dek: string
}
