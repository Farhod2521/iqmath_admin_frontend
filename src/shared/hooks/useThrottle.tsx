import { useEffect, useRef, useState } from 'react'

export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState(value)
  const lastRan = useRef(Date.now())

  useEffect(() => {
    const remaining = limit - (Date.now() - lastRan.current)

    const handler = setTimeout(
      () => {
        setThrottledValue(value)
        lastRan.current = Date.now()
      },
      remaining > 0 ? remaining : 0
    )

    return () => clearTimeout(handler)
  }, [value, limit])

  return throttledValue
}
