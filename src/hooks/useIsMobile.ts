import { useState, useEffect } from 'react'

export const useIsMobile = (width = 767) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (window) {
      setIsMobile(document.documentElement.clientWidth < width)
      window.addEventListener('resize', () => {
        setIsMobile(document.documentElement.clientWidth < width)
      })
    }
    return () => window.removeEventListener('resize', () => {})
  }, [])
  return isMobile
}
