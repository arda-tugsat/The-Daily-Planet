import { useState } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'daily-planet-stop-press-dismissed'

function readInitiallyVisible(): boolean {
  try {
    return !sessionStorage.getItem(STORAGE_KEY)
  } catch {
    return true
  }
}

export function StopPressBanner() {
  const [visible, setVisible] = useState(readInitiallyVisible)

  const dismiss = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  if (!visible) {
    return null
  }

  return (
    <div className="stop-press" role="status">
      <div className="stop-press__inner">
        <span className="stop-press__label">Extra</span>
        <span>
          Harbor vote moved to 8 p.m. roll call —{' '}
          <Link to="/article/harbor-district-vote-tonight">
            read the dispatch
          </Link>
        </span>
        <button
          type="button"
          className="stop-press__dismiss"
          onClick={dismiss}
        >
          Dismiss
        </button>
      </div>
    </div>
  )
}
