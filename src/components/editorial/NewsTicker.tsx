import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

type StockSnapshot = { price: string; pct: string; up: boolean }

type TextEntry = { line: string; emergency?: boolean }

type TickerDef =
  | {
      type: 'stock'
      intervalMs: number
      variants: StockSnapshot[]
    }
  | {
      type: 'text'
      intervalMs: number
      variants: TextEntry[]
    }

/** Each slot advances on its own clock — stock ticks fast; wire lines slower. */
const TICKER_DEFS: TickerDef[] = [
  {
    type: 'stock',
    intervalMs: 4500,
    variants: [
      { price: '412.10', pct: '0.8%', up: true },
      { price: '410.55', pct: '0.4%', up: false },
      { price: '413.45', pct: '1.2%', up: true },
      { price: '409.90', pct: '0.9%', up: false },
      { price: '414.02', pct: '0.3%', up: true },
      { price: '408.12', pct: '1.1%', up: false },
    ],
  },
  {
    type: 'text',
    intervalMs: 17_000,
    variants: [
      { line: 'DAILY PLANET TRUST INDEX: STEADY' },
      { line: 'DAILY PLANET TRUST INDEX: FIRM' },
      { line: 'DAILY PLANET TRUST INDEX: CAUTIOUS' },
      { line: 'DAILY PLANET TRUST INDEX: WATCH' },
    ],
  },
  {
    type: 'text',
    intervalMs: 26_000,
    variants: [
      { line: 'HARBOR VOTE: 8 P.M. ROLL CALL' },
      { line: 'HARBOR VOTE: COUNCIL GAVEL AT 8' },
      {
        line: 'BREAKING: HARBOR QUORUM DELAYED — STANDBY FOR UPDATES',
        emergency: true,
      },
      { line: 'HARBOR VOTE: AMENDMENTS ON THE FLOOR' },
    ],
  },
  {
    type: 'text',
    intervalMs: 21_000,
    variants: [
      { line: 'N-14 NIGHT BUS: SCHEDULE AUDIT OPEN' },
      { line: 'N-14 NIGHT BUS: SIGNAL CHECKS TONIGHT' },
      {
        line: 'METRO ALERT: N-LINE DELAYS AFTER MIDNIGHT — CHECK PLATFORM SIGNS',
        emergency: true,
      },
      { line: 'N-LINE SIGNAL AUDIT: PUBLIC COMMENT OPEN' },
    ],
  },
  {
    type: 'text',
    intervalMs: 19_000,
    variants: [
      { line: 'STARS PLAYOFF: AWAY SUNDAY' },
      { line: 'STARS PLAYOFF: HOME ICE TUESDAY' },
      { line: 'METROPOLIS STARS: PRACTICE OPEN FRIDAY' },
    ],
  },
  {
    type: 'text',
    intervalMs: 23_000,
    variants: [
      { line: 'S.T.A.R. LABS: FIBER HEARINGS APRIL' },
      { line: 'S.T.A.R. LABS: FILINGS DUE MONDAY' },
      { line: 'S.T.A.R. LABS: PUBLIC SESSION MAY 2' },
    ],
  },
  {
    type: 'text',
    intervalMs: 24_000,
    variants: [
      { line: 'KAHNDAQ ENVOY: EMBASSY ROW QUIET' },
      { line: 'KAHNDAQ ENVOY: TECH TEAMS MEET AT NOON' },
      { line: 'KAHNDAQ ENVOY: STATUS UPDATE EXPECTED' },
    ],
  },
  {
    type: 'text',
    intervalMs: 20_000,
    variants: [
      { line: 'RIVER TAXI: MILD CURRENTS' },
      { line: 'RIVER TAXI: FOG THIN BY RUSH HOUR' },
      { line: 'RIVER TAXI: EXTRA RUNS EAST BANK' },
    ],
  },
]

function LexCorpLine({ price, pct, up }: StockSnapshot) {
  return (
    <span
      className={
        up ? 'news-ticker__lex news-ticker__lex--up' : 'news-ticker__lex news-ticker__lex--down'
      }
    >
      LEXCORP MTR {price} {up ? '▲' : '▼'} {pct}
    </span>
  )
}

function renderCellContent(
  def: TickerDef,
  variantIndex: number,
  slotIndex: number,
): { node: ReactNode; emergency: boolean; animateKey: string } {
  const i = variantIndex % def.variants.length
  const animateKey = `${slotIndex}-v${i}`

  if (def.type === 'stock') {
    const v = def.variants[i]
    return {
      node: <LexCorpLine {...v} />,
      emergency: false,
      animateKey,
    }
  }
  const entry = def.variants[i]
  return {
    node: entry.line,
    emergency: Boolean(entry.emergency),
    animateKey,
  }
}

function RollingSlot({
  animateKey,
  reducedMotion,
  emergency,
  children,
}: {
  animateKey: string
  reducedMotion: boolean
  emergency: boolean
  children: ReactNode
}) {
  const itemClass = `news-ticker__item${emergency ? ' news-ticker__item--emergency' : ''}`

  if (reducedMotion) {
    return <span className={itemClass}>{children}</span>
  }

  return (
    <span className={`news-ticker__roll ${itemClass}`.trim()}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={animateKey}
          className="news-ticker__roll-inner"
          initial={{ y: '80%', opacity: 0.25 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-75%', opacity: 0 }}
          transition={{
            duration: 0.36,
            ease: [0.33, 1, 0.68, 1],
          }}
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function NewsTicker() {
  const reducedMotion = useReducedMotion()
  /** Seamless loop needs two copies while animating; one copy when motion is reduced (wrapped layout). */
  const marqueeCopies = reducedMotion ? 1 : 2
  const [indices, setIndices] = useState(() => TICKER_DEFS.map(() => 0))

  useEffect(() => {
    if (reducedMotion) {
      return
    }

    const timers = TICKER_DEFS.map((def, slotIndex) => {
      return window.setInterval(() => {
        setIndices((prev) => {
          const next = [...prev]
          const len = def.variants.length
          next[slotIndex] = (next[slotIndex] + 1) % len
          return next
        })
      }, def.intervalMs)
    })

    return () => {
      timers.forEach((id) => window.clearInterval(id))
    }
  }, [reducedMotion])

  return (
    <div className="news-ticker" aria-label="Headlines ticker">
      <div className="news-ticker__track">
        {Array.from({ length: marqueeCopies }, (_, dup) =>
          TICKER_DEFS.map((def, slotIndex) => {
            const variantIndex = indices[slotIndex] ?? 0
            const { node, emergency, animateKey } = renderCellContent(
              def,
              variantIndex,
              slotIndex,
            )
            return (
              <span
                key={`${dup}-${slotIndex}`}
                className="news-ticker__slot-wrap"
              >
                <RollingSlot
                  animateKey={animateKey}
                  reducedMotion={Boolean(reducedMotion)}
                  emergency={emergency}
                >
                  {node}
                </RollingSlot>
              </span>
            )
          }),
        ).flat()}
      </div>
    </div>
  )
}
