import {
  getSelectorDistricts,
  getSelectorOrganisations,
  getSelectorRegions,
  getSelectorRoles,
} from "@/services";
import FSearch from "@/shared/components/filters/FSearch";
import SelectInfinite from "@/shared/components/selects/SelectInfinite";
import { Space } from "antd";
import React from "react";

interface FilterData {
  search: string | undefined;
  roleId: number | undefined;
  organisationId: number | undefined;
  regionSoato: number | undefined;
  districtSoato: number | undefined;
}

interface Props {
  filterData: FilterData;
  onFilterChange: (updates: Partial<FilterData>) => void;
}

const FilterPermises = ({ filterData, onFilterChange }: Props) => {
  return (
    <Space className=" w-full flex items-center  mb-2 flex-wrap ">
      <FSearch
        onSearchInput={(value) => onFilterChange({ search: value })}
        style={{ width: 200 }}
        placeholder="Qidiruv..."
      />

      <SelectInfinite
        className="w-full"
        style={{ width: 200 }}
        queryKey={(search) => ["node-organisasion", search]}
        queryFn={({ search, page }) =>
          getSelectorOrganisations({ search, page, limit: 20 })
        }
        getOptions={(data) => data?.data || []}
        getTotal={(data) => data?.count || 0}
        value={filterData.organisationId}
        onChange={(value) => onFilterChange({ organisationId: value })}
        allowClear
        placeholder="Tashkilot"
        size="middle"
      />

      <SelectInfinite
        className="w-full"
        size="middle"
        style={{ width: 200 }}
        queryKey={(search) => ["node-role", search]}
        queryFn={() => getSelectorRoles()}
        getOptions={(data) => data?.data || []}
        getTotal={() => 100}
        value={filterData.roleId}
        onChange={(value) => onFilterChange({ roleId: value })}
        placeholder="Rol"
        allowClear
      />
      <SelectInfinite
        className="w-50"
        queryKey={(search) => ["node-regions", search]}
        queryFn={({ search }) => getSelectorRegions(search)}
        getOptions={(res) => res?.data || []}
        getTotal={(res) => res?.data?.length || 0}
        allowClear
        placeholder="Viloyat tanlang"
        size="middle"
        value={filterData.regionSoato}
        onChange={(value) =>
          onFilterChange({
            regionSoato: value,
            districtSoato: undefined,
          })
        }
      />
      <SelectInfinite
        enabled={!!filterData?.regionSoato}
        className="w-50"
        queryKey={(search) => [
          "node-districts",
          search,
          filterData?.regionSoato,
        ]}
        queryFn={({ search, page }) =>
          getSelectorDistricts({
            search,
            regionSoato: filterData?.regionSoato,
            page,
            limit: 20,
          })
        }
        getOptions={(res) => res?.data || []}
        getTotal={(res) => res?.data?.length || 0}
        allowClear
        placeholder="Tuman tanlang"
        size="middle"
        disabled={!filterData.regionSoato}
        value={filterData.districtSoato}
        onChange={(value) => onFilterChange({ districtSoato: value })}
      />
    </Space>
  );
};

export default FilterPermises;
