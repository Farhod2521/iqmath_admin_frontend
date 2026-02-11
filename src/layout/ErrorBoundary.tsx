import { Component, ErrorInfo, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface Props {
  children: ReactNode
  location: any
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State): State | null {
    if (nextProps.location.pathname !== window.location.pathname) {
      return { hasError: false }
    }
    return null
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Foydalanishda xatolik yuz berdi. Sahifani qayta yuklang.</h1>
    }

    return this.props.children
  }
}

const ErrorBoundaryWrapper = ({ children }: { children: ReactNode }) => {
  const location = useLocation()
  return <ErrorBoundary location={location}>{children}</ErrorBoundary>
}

export default ErrorBoundaryWrapper
