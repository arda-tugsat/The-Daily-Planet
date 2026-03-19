import { motion, useReducedMotion } from 'motion/react'

/**
 * Shown while lazy-loaded routes resolve — matches editorial chrome vaguely.
 */
export function RouteFallback() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="route-fallback" aria-busy="true" aria-live="polite">
      <motion.div
        className="route-fallback__inner"
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.4,
          ease: [0.33, 1, 0.68, 1],
        }}
      >
        <p className="route-fallback__label">Loading…</p>
        <div className="route-fallback__card">
          <span className="route-fallback__shimmer route-fallback__shimmer--title" />
          <span className="route-fallback__shimmer route-fallback__shimmer--line" />
          <span className="route-fallback__shimmer route-fallback__shimmer--line" />
          <span className="route-fallback__shimmer route-fallback__shimmer--line route-fallback__shimmer--short" />
        </div>
      </motion.div>
    </div>
  )
}
