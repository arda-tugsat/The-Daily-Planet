/* eslint-disable react-refresh/only-export-components -- context module exports Provider + hook */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Edition = 'morning' | 'late'

const STORAGE_KEY = 'daily-planet-edition'

interface EditionContextValue {
  edition: Edition
  setEdition: (edition: Edition) => void
  toggleEdition: () => void
}

const EditionContext = createContext<EditionContextValue | null>(null)

function readStoredEdition(): Edition {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw === 'late' ? 'late' : 'morning'
  } catch {
    return 'morning'
  }
}

export function EditionProvider({ children }: { children: ReactNode }) {
  const [edition, setEditionState] = useState<Edition>(() => readStoredEdition())

  useEffect(() => {
    document.documentElement.dataset.edition = edition
    try {
      localStorage.setItem(STORAGE_KEY, edition)
    } catch {
      /* ignore */
    }
  }, [edition])

  const setEdition = useCallback((next: Edition) => {
    setEditionState(next)
  }, [])

  const toggleEdition = useCallback(() => {
    setEditionState((current) => (current === 'morning' ? 'late' : 'morning'))
  }, [])

  const value = useMemo(
    () => ({ edition, setEdition, toggleEdition }),
    [edition, setEdition, toggleEdition],
  )

  return (
    <EditionContext.Provider value={value}>{children}</EditionContext.Provider>
  )
}

export function useEdition(): EditionContextValue {
  const context = useContext(EditionContext)
  if (!context) {
    throw new Error('useEdition must be used within EditionProvider')
  }
  return context
}
