import { Link } from 'react-router-dom'
import type { BreadcrumbCrumb } from '../../utils/articleBreadcrumb'

interface BreadcrumbProps {
  items: BreadcrumbCrumb[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}
          </li>
        ))}
      </ol>
    </nav>
  )
}
