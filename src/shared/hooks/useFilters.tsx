import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type Primitive = string | number | boolean | undefined
type Filters = Record<string, Primitive>

interface Options<T extends Filters> {
  storageKey: string
  defaultValues: T
}

export function useFilters<T extends Filters>({ storageKey, defaultValues }: Options<T>) {
  const location = useLocation()
  const navigate = useNavigate()

  /**
   * 1️⃣ URL dan o‘qish
   */
  const urlFilters = useMemo(() => {
    const params = new URLSearchParams(location.search)
    const result: Partial<T> = {}

    Object.keys(defaultValues).forEach((key) => {
      const value = params.get(key)
      if (value !== null) {
        const def = defaultValues[key]
        if (typeof def === 'number') {
          result[key as keyof T] = Number(value) as T[keyof T]
        } else if (typeof def === 'boolean') {
          result[key as keyof T] = (value === 'true') as T[keyof T]
        } else {
          result[key as keyof T] = value as T[keyof T]
        }
      }
    })

    return result
  }, [location.search, defaultValues])

  /**
   * 2️⃣ localStorage fallback
   */
  const getLocalFilters = (): Partial<T> => {
    try {
      const raw = localStorage.getItem(storageKey)
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  }

  /**
   * 3️⃣ Initial state
   */
  const [filters, setFilters] = useState<T>({
    ...defaultValues,
    ...getLocalFilters(),
    ...urlFilters
  })

  /**
   * 4️⃣ URL o‘zgarsa → state sync
   */
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      ...urlFilters
    }))
  }, [urlFilters])

  /**
   * 5️⃣ Update filters
   */
  const updateFilters = (patch: Partial<T>) => {
    const next = { ...filters, ...patch }

    // 🔹 URL update
    const params = new URLSearchParams()

    Object.entries(next).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== null) {
        params.set(key, String(value))
      }
    })

    navigate(
      {
        pathname: location.pathname,
        search: params.toString()
      },
      { replace: true }
    )

    // 🔹 localStorage update
    localStorage.setItem(storageKey, JSON.stringify(next))

    setFilters(next)
  }

  /**
   * 6️⃣ Reset
   */
  const resetFilters = () => {
    localStorage.removeItem(storageKey)
    navigate(location.pathname, { replace: true })
    setFilters(defaultValues)
  }

  return {
    filters,
    setFilters: updateFilters,
    resetFilters
  }
}
