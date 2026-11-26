import React from 'react'
import Button from './ui/Button.jsx'

/**
 * Catches render errors anywhere below it and shows a recovery screen instead
 * of a blank page. The fallback avoids the shared header and footer in case
 * one of them is what failed.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Unhandled render error', error, info.componentStack)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="container container--narrow error-fallback" role="alert">
        <h1>Something went wrong</h1>
        <p>
          We could not load this page. Your request has not been submitted. Try
          again, or return to the list of services.
        </p>
        <div className="error-fallback__actions">
          <Button
            variant="outline"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again
          </Button>
          <Button variant="primary" onClick={() => window.location.assign('/')}>
            Return to services
          </Button>
        </div>
      </main>
    )
  }
}

export default ErrorBoundary
