import { url_districts, url_neighborhoods, url_regions } from '@/constants/urls'
import { get, put, patch } from '@/http/request'

export type RegionType = {
  soato: string
  name: string
  ruName: string
  code: string
}

export type DistrictType = {
  soato: string
  name: string
  ruName: string
}
export type NeighborhoodsType = {
  soato: string
  name: string
  ruName: string
  hectarePrice?: string
  id: string
  startDate?: string
  endDate?: string
}

export type GetRegionsType = {
  count: number
  regionsList: RegionType[]
}

export type GetDistrictsType = {
  count: number
  districtsList: DistrictType[]
}

export type GetNeighborhoodsType = {
  count: number
  neighborhoodsList: NeighborhoodsType[]
}

export type NeighborhoodsParamType = {
  region_soato?: string
  district_soato?: string
  search?: string
  page?: number
  limit?: number
  with_child_count?: boolean
}

export type getRegionsParamsType = {
  limit?: number
  page?: number
  region_soato?: string
  with_child_count: boolean
}

type DistrictsParamsType = {
  page?: number
  limit?: number
}

export const getRegions = () => get<GetRegionsType>(url_regions)
export const getDistricts = (region_soato?: string, params?: DistrictsParamsType) =>
  get<GetDistrictsType>(url_districts, { region_soato, limit: 1000, page: 1, ...params })

export const getNeighborhoods = (params: NeighborhoodsParamType) =>
  get<GetNeighborhoodsType>(url_neighborhoods, { limit: 1000, page: 1, ...params })
