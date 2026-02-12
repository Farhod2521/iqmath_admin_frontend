import { axiosApi } from '@/configs/api'
import { useEffect, useState } from 'react'

export function useGetData<T>(url: string, fn: any, params: Record<string, any> = {}, debounceMs = 400) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [debouncedParams, setDebouncedParams] = useState(params)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedParams(params), debounceMs)
    return () => clearTimeout(handler)
  }, [JSON.stringify(params), debounceMs])

  useEffect(() => {
    setLoading(true)
    setError(null)
    axiosApi
      .get<T[]>(url, debouncedParams)
      .then((res: any) => {
        setData(fn(res) || [])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setData([])
        setLoading(false)
      })
  }, [url, JSON.stringify(debouncedParams)])

  return { data, loading, error }
}
