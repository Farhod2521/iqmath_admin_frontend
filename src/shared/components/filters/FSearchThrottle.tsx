import React, { useEffect, useRef, useState } from 'react'
import { Input } from 'antd'
import type { SearchProps } from 'antd/es/input/Search'
import { throttle } from 'lodash'

type SearchInputProps = {
  onSearchInput: (value: any) => void
  throttleDelay?: number
} & Omit<SearchProps, 'onSearch'>

const FSearchThrottle: React.FC<SearchInputProps> = ({ onSearchInput, throttleDelay = 500, ...rest }) => {
  const [value, setValue] = useState(rest.value ?? '')
  const throttledSearch = useRef<ReturnType<typeof throttle>>()
  const isFirstRender = useRef(true)

  // Controlled value tashqaridan o‘zgarsa
  useEffect(() => {
    if (typeof rest.value === 'string') {
      setValue(rest.value)
    }
  }, [rest.value])

  // throttle function ni qayta yaratish
  useEffect(() => {
    throttledSearch.current = throttle(onSearchInput, throttleDelay, {
      leading: true,
      trailing: true
    })

    return () => {
      throttledSearch.current?.cancel()
    }
  }, [onSearchInput, throttleDelay])

  // value o‘zgarganda throttle ishlaydi
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    throttledSearch.current?.(value)
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

export default FSearchThrottle
