import { useCallback, useEffect, useRef, useState } from 'react'

type UseCountdownTimerOptions = {
  autoStart?: boolean
}

export function useCountdownTimer() {
  const [remainingSec, setRemainingSec] = useState<number>(0)
  const timerRef = useRef<number | null>(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const startMs = useCallback(
    (ms: string | number) => {
      clearTimer()
      const startSec = Math.max(0, Math.ceil((Number(ms) || 0) / 1000))
      setRemainingSec(startSec)

      if (startSec === 0) return

      timerRef.current = window.setInterval(() => {
        setRemainingSec((prev) => {
          if (prev <= 1) {
            clearTimer()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    },
    [clearTimer]
  )

  const stop = useCallback(() => {
    clearTimer()
    setRemainingSec(0)
  }, [clearTimer])

  useEffect(() => {
    return () => clearTimer()
  }, [clearTimer])

  return {
    remainingSec,
    startMs,
    stop,
    isRunning: remainingSec > 0
  }
}
