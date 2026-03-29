import { Select, SelectProps } from "antd";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";
import { OptionType } from "@/types/option";

type FAutoSelectProps<TData> = {
  queryKey: (search: string) => any[];
  queryFn: (params: { search: string; page: number }) => Promise<TData>;
  getOptions: (data: TData | undefined) => OptionType[];
  getTotal: (data: TData | undefined) => number; // optional, for custom total count
  pageSize?: number;
  debounceMs?: number;
  enabled?: boolean;
} & Omit<
  SelectProps,
  | "options"
  | "onSearch"
  | "showSearch"
  | "loading"
  | "filterOption"
  | "searchValue"
  | "onPopupScroll"
>;

function FAutoSelect<TData>({
  queryKey,
  queryFn,
  getOptions,
  getTotal,
  pageSize = 20,
  debounceMs = 500,
  enabled = true,
  ...selectProps
}: FAutoSelectProps<TData>) {
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const debouncedSetSearch = useCallback(
    debounce((val) => setSearch(val), debounceMs),
    [debounceMs],
  );

  useEffect(() => () => debouncedSetSearch.cancel(), [debouncedSetSearch]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: queryKey(search),
    queryFn: ({ pageParam = 1 }) => queryFn({ search, page: pageParam }),
    initialPageParam: 1,
    enabled,
    getNextPageParam: (lastPage, allPages) => {
      const total = getTotal(lastPage) || 0;
      const loaded = allPages.reduce(
        (sum, page) => sum + (getOptions(page)?.length || 0),
        0,
      );
      if (loaded < total) return (allPages?.length || 0) + 1;
      return undefined;
    },
    refetchOnWindowFocus: false,
  });

  // Clear options & search page when searchInput o‘zgarsa (yangi so‘rov uchun)
  useEffect(() => {
    refetch();
  }, [search]);

  // Aggregated options from all pages
  const allOptions = (data?.pages || []).flatMap((page) => getOptions(page));

  // Popup scroll handler for infinity scroll
  const handlePopupScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = e.target as HTMLDivElement;
    if (
      hasNextPage &&
      !isFetchingNextPage &&
      target.scrollTop + target.offsetHeight >= target.scrollHeight - 64 // 64px buffer
    ) {
      fetchNextPage();
    }
  };

  return (
    <Select
      {...selectProps}
      showSearch
      filterOption={false}
      loading={isLoading || isFetchingNextPage || isRefetching}
      options={allOptions}
      searchValue={searchInput}
      notFoundContent={isLoading ? "Yuklanmoqda..." : "Topilmadi"}
      onSearch={(val) => {
        setSearchInput(val);
        debouncedSetSearch(val);
      }}
      onPopupScroll={handlePopupScroll}
    />
  );
}

export default FAutoSelect;
