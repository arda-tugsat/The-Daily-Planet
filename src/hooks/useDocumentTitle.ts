import { useEffect } from 'react'

const siteName = 'The Daily Planet'
const defaultDescription =
  'The Daily Planet — fictional Metropolis newspaper demonstration.'

function setMetaAttribute(
  attributeName: 'name' | 'property',
  key: string,
  content: string,
) {
  const selector =
    attributeName === 'property'
      ? `meta[property="${key}"]`
      : `meta[name="${key}"]`
  let el = document.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attributeName, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function applySocialMeta(
  fullTitle: string,
  description: string,
  ogType: 'website' | 'article',
) {
  const safeDesc = description.slice(0, 320)
  setMetaAttribute('name', 'description', safeDesc)
  setMetaAttribute('property', 'og:title', fullTitle)
  setMetaAttribute('property', 'og:description', safeDesc)
  setMetaAttribute('property', 'og:type', ogType)
  setMetaAttribute('name', 'twitter:card', 'summary_large_image')
  setMetaAttribute('name', 'twitter:title', fullTitle)
  setMetaAttribute('name', 'twitter:description', safeDesc)

  if (typeof window !== 'undefined') {
    const url = `${window.location.origin}${window.location.pathname}${window.location.search}`
    setMetaAttribute('property', 'og:url', url)
  }
}

/**
 * Sets document title and basic Open Graph / Twitter meta tags for SPA routes.
 * Use ogType `article` only on individual story pages.
 */
export function useDocumentTitle(
  pageTitle: string | undefined,
  description?: string,
  ogType: 'website' | 'article' = 'website',
) {
  useEffect(() => {
    const previous = document.title
    const fullTitle = pageTitle
      ? `${pageTitle} · ${siteName}`
      : `${siteName} — Metropolis`
    document.title = fullTitle
    applySocialMeta(
      fullTitle,
      description ?? defaultDescription,
      ogType,
    )

    return () => {
      document.title = previous
    }
  }, [pageTitle, description, ogType])
}
