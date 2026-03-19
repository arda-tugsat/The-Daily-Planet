import { useReducedMotion } from 'motion/react'
import type { Variants } from 'motion/react'

const easeEditorial = [0.33, 1, 0.68, 1] as const

export const listContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.04,
    },
  },
}

export const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeEditorial },
  },
}

/** Flatten motion for users who prefer reduced motion. */
export function useStaggerVariants(): {
  container: Variants
  item: Variants
} {
  const reduced = useReducedMotion()
  if (reduced) {
    return {
      container: { hidden: {}, show: {} },
      item: { hidden: {}, show: {} },
    }
  }
  return { container: listContainerVariants, item: listItemVariants }
}
