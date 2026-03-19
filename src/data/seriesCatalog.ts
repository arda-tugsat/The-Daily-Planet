/** Running investigations and serial coverage — keyed by Article.seriesId */
export const seriesCatalog: Record<
  string,
  { title: string; dek: string }
> = {
  'harbor-inquiry': {
    title: 'Harbor inquiry',
    dek: 'Cranes, contracts, and missing logs along the East Riverfront — a three-part Metro investigation.',
  },
  'n-line-signal': {
    title: 'N-Line signal & intercom audit',
    dek: 'Ghost stops, mismatched firmware, and dispatcher testimony — Metro’s overnight tunnel headache in three parts.',
  },
}

export function getSeriesInfo(seriesId: string) {
  return seriesCatalog[seriesId]
}
