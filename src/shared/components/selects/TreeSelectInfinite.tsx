import { TreeSelect, TreeSelectProps } from 'antd'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'
import debounce from 'lodash/debounce'
import { OptionTreeType } from '@/types/option'

type TreeSelectInfiniteProps<TData> = {
  queryKey: (search: string) => any[]
  queryFn: (params: { search: string; page: number }) => Promise<TData>
  getTreeData: (data: TData | undefined) => OptionTreeType[]
  getTotal: (data: TData | undefined) => number
  debounceMs?: number
  enabled?: boolean
} & Omit<TreeSelectProps, 'treeData' | 'loading' | 'onSearch' | 'onPopupScroll'>

function TreeSelectInfinite<TData>({
  queryKey,
  queryFn,
  getTreeData,
  getTotal,
  debounceMs = 500,
  enabled = true,
  ...props
}: TreeSelectInfiniteProps<TData>) {
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const debouncedSetSearch = useCallback(
    debounce((val: string) => setSearch(val), debounceMs),
    [debounceMs]
  )

  const convertToTreeData = (nodes: OptionTreeType[] = []): any[] =>
    nodes.map((n, idx) => {
      const children = Array.isArray(n.children) ? n.children : []
      const hasChildren = children.length > 0

      return {
        label: n.label,
        value: n.value ?? `__parent_${idx}`,
        selectable: !hasChildren, // children borlar tanlanmaydi
        children: hasChildren ? convertToTreeData(children) : undefined
      }
    })

  useEffect(() => () => debouncedSetSearch.cancel(), [debouncedSetSearch])

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isRefetching } = useInfiniteQuery({
    queryKey: queryKey(search),
    queryFn: ({ pageParam = 1 }) => queryFn({ search, page: pageParam }),
    initialPageParam: 1,
    enabled,
    getNextPageParam: (lastPage, allPages) => {
      const total = getTotal(lastPage) || 0
      const loaded = allPages.reduce((sum, page) => sum + (getTreeData(page)?.length || 0), 0)
      if (loaded < total) return allPages.length + 1
      return undefined
    },
    refetchOnWindowFocus: false
  })

  const treeData = useMemo(() => {
    const merged = (data?.pages || []).flatMap((p) => getTreeData(p))
    return convertToTreeData(merged)
  }, [data, getTreeData])

  const handlePopupScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    if (hasNextPage && !isFetchingNextPage && target.scrollTop + target.offsetHeight >= target.scrollHeight - 64) {
      fetchNextPage()
    }
  }

  return (
    <TreeSelect
      {...props}
      treeData={treeData}
      loading={isLoading || isFetchingNextPage || isRefetching}
      showSearch
      allowClear
      searchValue={searchInput}
      notFoundContent={isLoading ? 'Yuklanmoqda...' : 'Topilmadi'}
      onSearch={(val) => {
        setSearchInput(val)
        debouncedSetSearch(val)
      }}
      onPopupScroll={handlePopupScroll}
      treeDefaultExpandAll={false}
      treeExpandAction="click"
      classNames={{
        popup: {
          root: 'tree_select_popup'
        }
      }}
    />
  )
}

export default TreeSelectInfinite
