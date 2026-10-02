import { Component } from 'react'
import PropTypes from 'prop-types'

export default class ErrorBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) return (
      <div className="section-fallback" role="alert">
        <p>{this.props.message}</p>
        <button className="button button-secondary" onClick={() => window.location.reload()}>{this.props.retry}</button>
      </div>
    )
    return this.props.children
  }
}
ErrorBoundary.propTypes = { children: PropTypes.node, message: PropTypes.string.isRequired, retry: PropTypes.string.isRequired }
