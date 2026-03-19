import { useEffect, useState } from 'react'

export function useReadingProgress(active: boolean): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!active) {
      return
    }

    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) {
        setProgress(0)
        return
      }
      const ratio = Math.min(1, Math.max(0, scrollTop / docHeight))
      setProgress(ratio)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [active])

  return active ? progress : 0
}
