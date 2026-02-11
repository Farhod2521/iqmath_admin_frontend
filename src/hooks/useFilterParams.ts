import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function useFilterParams<T extends Record<string, any>>(initialParams: T) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [params, setParams] = useState<T>(initialParams)

  const setFilterParams = (newParams: Partial<T>) => {
    const updatedParams = { ...params, ...newParams }
    setParams(updatedParams)
    setSearchParams(updatedParams)
  }

  const initializeParams = () => {
    const updatedParams = { ...params }
    for (const key in updatedParams) {
      if (searchParams.has(key)) {
        updatedParams[key as keyof T] = searchParams.get(key) as any
      }
    }
    setParams(updatedParams)
  }

  useState(initializeParams)

  return [params, setFilterParams] as const
}

export { useFilterParams }
