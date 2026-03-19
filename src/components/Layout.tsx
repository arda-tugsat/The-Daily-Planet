import { useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { EditionRibbon } from './editorial/EditionRibbon'
import { NewsTicker } from './editorial/NewsTicker'
import { StopPressBanner } from './editorial/StopPressBanner'
import { Footer } from './Footer'
import { Masthead } from './Masthead'
import { SectionNav } from './SectionNav'
import { StickySubnav } from './StickySubnav'

export function Layout() {
  const location = useLocation()
  const mainRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (location.hash) {
      return
    }
    // BrowserRouter does not reset scroll; focusing <main> can also jump the view.
    window.scrollTo(0, 0)

    const main = mainRef.current
    if (main) {
      main.focus({ preventScroll: true })
    }
  }, [location.pathname, location.hash])

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="layout">
        <StopPressBanner />
        <NewsTicker />
        <EditionRibbon />
        <Masthead />
        <StickySubnav />
        <SectionNav />
        <main
          ref={mainRef}
          id="main-content"
          className="layout__main"
          tabIndex={-1}
        >
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}
