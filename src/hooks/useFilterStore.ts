import { useEffect, useState } from 'react'
import { setLocalStorge, getLocalStorage } from '@/utils/localStorge'

function useFilterStore(filterName: string, defaultFilters: any) {
  const [filterData, setFilterData] = useState({ ...defaultFilters })

  const handleChangeFilter = (name: string, value: string | number | undefined) => {
    const filters = getLocalStorage(filterName)
    setFilterData(() => {
      setLocalStorge(filterName, { ...filters, [name]: value })
      return { ...filters, [name]: value }
    })
  }

  const handleParallelChangeFilter = (data: Record<string, string | undefined>) => {
    const filters = getLocalStorage(filterName)
    setFilterData(() => {
      setLocalStorge(filterName, { ...filters, ...data })
      return { ...filters, ...data }
    })
  }

  useEffect(() => {
    setLocalStorge(filterName, defaultFilters)
  }, [])
  return {
    filterData,
    setFilterData,
    handleChangeFilter,
    handleParallelChangeFilter
  }
}

export { useFilterStore }
