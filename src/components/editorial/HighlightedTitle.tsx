function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

interface HighlightedTitleProps {
  text: string
  query: string
}

export function HighlightedTitle({ text, query }: HighlightedTitleProps) {
  const q = query.trim()
  if (!q) {
    return <>{text}</>
  }
  const parts = text.split(new RegExp(`(${escapeRegExp(q)})`, 'gi'))
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === q.toLowerCase() ? (
          <mark key={index} className="search-highlight">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  )
}
