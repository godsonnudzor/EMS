import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, info: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    this.setState({ error, info })
    // Also log to console for dev
    console.error('ErrorBoundary caught error:', error, info)
  }

  render() {
    const { error, info } = this.state
    if (error) {
      return (
        <div style={{ padding: 20 }}>
          <h1 style={{ color: 'red' }}>Something went wrong</h1>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{String(error && error.toString())}</pre>
          {info && <details style={{ whiteSpace: 'pre-wrap' }}>{info.componentStack}</details>}
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
