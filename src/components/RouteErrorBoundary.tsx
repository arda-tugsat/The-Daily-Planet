import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface RouteErrorBoundaryProps {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class RouteErrorBoundary extends Component<
  RouteErrorBoundaryProps,
  State
> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="route-error">
          <h1 className="route-error__title">Something went wrong</h1>
          <p className="route-error__dek">
            This page hit an unexpected error. You can try again or return to
            the front page.
          </p>
          <p>
            <Link to="/">Front page</Link>
          </p>
          <button
            type="button"
            className="route-error__retry"
            onClick={() => {
              this.setState({ hasError: false })
            }}
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
