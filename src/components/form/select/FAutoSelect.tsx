import { useState, useEffect } from 'react'
import { Select } from 'antd'
import { get } from '@/http/request'
import { url_regions } from '@/constants/urls'

const initialOptions = [{ label: '', value: '' }]

function FAutoSelect({
  url = url_regions,
  params = {},
  enabled = false,
  formatOptions = (e: any) => e,
  searchName = 'search',
  ...props
}) {
  const [options, setOptions] = useState(initialOptions)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()
    setOptions(initialOptions)
    getOptions()
    return () => abortController.abort()
  }, [JSON.stringify(params)])

  const getOptions = (search?: string) => {
    if (!props?.disabled || enabled) {
      setLoading(true)
      get(url, { ...params, limit: 1000, page: 1, ...(search ? { [searchName]: search } : {}) })
        .then((res: any) => setOptions(formatOptions(res)))
        .finally(() => setLoading(false))
    }
  }

  // useEffect(() => {
  //   if (!props?.value) getOptions()
  // }, [props?.value])

  return (
    <Select
      onSearch={(e) => getOptions(e)}
      className="fautoselect__conatinter"
      allowClear
      showSearch
      loading={loading}
      filterOption={filterOption}
      options={options}
      {...props}
    >
      {/* {options.map((option) => (
        <Select.Option className="fautoselect__conatinter__option" key={option.value} value={option.value}>
          {option.label}
        </Select.Option>
      ))} */}
    </Select>
  )
}

export default FAutoSelect

const filterOption = (input: string, option: any) => {
  if (option && option.code) {
    return (
      option.label.toLowerCase().includes(input.toLowerCase()) ||
      option.code.toLowerCase().includes(input.toLowerCase())
    )
  }
  return option.label.toLowerCase().includes(input.toLowerCase())
}
