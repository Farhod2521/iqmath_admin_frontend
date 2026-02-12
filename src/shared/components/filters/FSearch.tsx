import React, { useEffect, useRef, useState } from 'react'
import { Input } from 'antd'
import type { SearchProps } from 'antd/es/input/Search'
import { debounce } from 'lodash'

type SearchInputProps = {
  onSearchInput: (value: any) => void
  debounceDelay?: number
} & Omit<SearchProps, 'onSearch'>

const FSearch: React.FC<SearchInputProps> = ({ onSearchInput, debounceDelay = 500, ...rest }) => {
  const [value, setValue] = useState(rest.value ?? '')
  const debouncedSearch = useRef<ReturnType<typeof debounce>>()
  const isFirstRender = useRef(true)

  // Controlled value outside change
  useEffect(() => {
    if (typeof rest.value === 'string') setValue(rest.value)
  }, [rest.value])

  // debounce function ni har doim qayta yaratish
  useEffect(() => {
    debouncedSearch.current = debounce(onSearchInput, debounceDelay)
    return () => {
      debouncedSearch.current?.cancel()
    }
  }, [onSearchInput, debounceDelay])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    debouncedSearch.current?.(value)
  }, [value])

  return (
    <Input
      {...rest}
      allowClear
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
        rest.onChange?.(e)
      }}
    />
  )
}

export default FSearch
