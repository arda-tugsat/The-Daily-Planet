import { sectionLabels } from '../data/articles'
import type { SectionId } from '../data/types'

export interface BreadcrumbCrumb {
  label: string
  to?: string
}

export function buildArticleBreadcrumb(
  section: SectionId,
  shortHeadline: string,
): BreadcrumbCrumb[] {
  return [
    { label: 'Front page', to: '/' },
    { label: sectionLabels[section], to: `/section/${section}` },
    { label: shortHeadline },
  ]
}
