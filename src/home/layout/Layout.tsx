import { ReactNode, useEffect } from 'react'
import AOS from 'aos'
import '../assets/styles/index.scss'
import 'aos/dist/aos.css'

type LayoutProps = {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    AOS.init({ once: true })
  }, [])

  return <div className="min-h-screen bg-white">{children}</div>
}

export default Layout
