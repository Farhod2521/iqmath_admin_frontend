import React, { useEffect, useRef, useState } from 'react'
import { TreeSelect } from 'antd'
import { get } from '@/http/request'
import { url_regions } from '@/constants/urls'

const initialOptions = [
  {
    value: '',
    title: '',
    children: []
  }
]

function FAutoTreeSelect({
  url = url_regions,
  params = {},
  enabled = false,
  formatOptions = (e: any) => e,
  searchName = 'search',
  ...props
}) {
  const [treeData, setOptions] = useState(initialOptions)
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    getOptions('', abortController.signal)
    setOptions(initialOptions)
    return () => abortController.abort()
  }, [JSON.stringify(params)])

  const getOptions = (search = '', signal?: AbortSignal) => {
    if (!props?.disabled || enabled) {
      setLoading(true)
      get(url, { ...params, limit: 1000, page: 1, [searchName]: search }, { signal })
        .then((res: any) => setOptions(formatOptions(res)))
        .catch((err) => {
          if (err.name !== 'AbortError') console.error(err)
        })
        .finally(() => setLoading(false))
    }
  }

  useEffect(() => {
    if (dropdownRef.current) {
      const longestText = Math.max(...treeData.map((item: any) => item.title.length || 0))
      dropdownRef.current.style.width = `${longestText * 10}px`
    }
  }, [treeData])

  return (
    <TreeSelect
      className="fautoTreeselect__container"
      loading={loading}
      showSearch
      allowClear
      onSearch={(e) => getOptions(e)}
      // dropdownStyle={{ maxHeight: 400, maxWidth: 500 }}
      // styles={{
      //   popup: {
      //     root: {
      //       maxHeight: 400,
      //       maxWidth: 500
      //     }
      //   }
      // }}
      treeNodeFilterProp="title"
      filterTreeNode={filterOption}
      popupMatchSelectWidth={false}
      treeData={treeData}
      treeDefaultExpandAll={false}
      onClear={() => {
        getOptions()
      }}
      {...props}
    />
  )
}

export default FAutoTreeSelect

const filterOption = (input: string, node: any) => {
  return node?.title?.toLowerCase()?.includes(input.toLowerCase())
}
