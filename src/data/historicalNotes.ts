import type { HistoricalBlurb } from './types'

/** “From the morgue” — same calendar day, earlier years (fiction). */
export const historicalNotes: HistoricalBlurb[] = [
  {
    month: 3,
    day: 19,
    year: 1998,
    headline: 'Planet presses cool after ink union pact',
    dek: 'A 24-hour strike ended with night-side crews guaranteed a second proofreader on election specials.',
  },
  {
    month: 3,
    day: 19,
    year: 2011,
    headline: 'River taxi pilot logs 10,000th crossing',
    dek: 'The experimental route later became a fixture — until winter ice forced a seasonal halt.',
  },
]

export function getMorgueBlurbForToday(): HistoricalBlurb | undefined {
  const now = new Date()
  const m = now.getMonth() + 1
  const d = now.getDate()
  return historicalNotes.find((n) => n.month === m && n.day === d)
}
