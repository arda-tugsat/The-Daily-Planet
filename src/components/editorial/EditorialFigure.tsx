import { useCallback, useState } from 'react'
import type { ArticleHeroImage } from '../../data/types'

type FigureVariant = 'hero' | 'card' | 'rail' | 'thumb'

interface EditorialFigureProps {
  hero: ArticleHeroImage
  className?: string
  variant?: FigureVariant
  /** LCP image on article pages */
  priority?: boolean
  /** Used for deterministic Picsum fallback if Unsplash fails to load. */
  fallbackId: string
}

const sizesByVariant: Record<FigureVariant, string> = {
  hero: '(max-width: 640px) 100vw, (max-width: 1200px) 92vw, 1100px',
  card: '(max-width: 1200px) 90vw, 720px',
  rail: '(max-width: 1200px) 42vw, 400px',
  thumb: '140px',
}

function picsumFallback(seed: string, width: number, height: number): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`
}

export function EditorialFigure({
  hero,
  className = '',
  variant = 'card',
  priority = false,
  fallbackId,
}: EditorialFigureProps) {
  const sizes = sizesByVariant[variant]
  const hideCaptionVisually = variant === 'thumb'
  const [useFallback, setUseFallback] = useState(false)
  const [fallbackFailed, setFallbackFailed] = useState(false)

  const onPrimaryError = useCallback(() => {
    setUseFallback(true)
  }, [])

  const onFallbackError = useCallback(() => {
    setFallbackFailed(true)
  }, [])

  const fallbackDims =
    variant === 'thumb'
      ? { w: 560, h: 373 }
      : variant === 'rail'
        ? { w: 900, h: 675 }
        : { w: 1200, h: 675 }

  const fallbackSrc = picsumFallback(
    `dp-${fallbackId}`,
    fallbackDims.w,
    fallbackDims.h,
  )

  if (fallbackFailed) {
    return (
      <figure
        className={`editorial-figure editorial-figure--${variant} editorial-figure--broken ${className}`.trim()}
      >
        <div
          className="editorial-figure__placeholder"
          role="img"
          aria-label={hero.alt}
        />
        <figcaption
          className={
            hideCaptionVisually
              ? 'editorial-figure__credit visually-hidden'
              : 'editorial-figure__credit'
          }
        >
          Photo: Not available
        </figcaption>
      </figure>
    )
  }

  return (
    <figure
      className={`editorial-figure editorial-figure--${variant} ${className}`.trim()}
    >
      {useFallback ? (
        <img
          className="editorial-figure__img"
          src={fallbackSrc}
          alt={hero.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          width={fallbackDims.w}
          height={fallbackDims.h}
          fetchPriority={priority ? 'high' : 'low'}
          referrerPolicy="no-referrer"
          onError={onFallbackError}
        />
      ) : (
        <img
          className="editorial-figure__img"
          src={variant === 'thumb' ? hero.srcThumb : hero.srcMedium}
          srcSet={`${hero.srcThumb} 560w, ${hero.srcMedium} 900w, ${hero.src} 1600w`}
          sizes={sizes}
          alt={hero.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'low'}
          referrerPolicy="no-referrer"
          onError={onPrimaryError}
        />
      )}
      <figcaption
        className={
          hideCaptionVisually
            ? 'editorial-figure__credit visually-hidden'
            : 'editorial-figure__credit'
        }
      >
        {useFallback ? 'Photo: Wire service file' : hero.credit}
      </figcaption>
    </figure>
  )
}
