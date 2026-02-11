import { get, put, patch } from '@/http/request'
import { GetDistrictsType, GetNeighborhoodsType, GetRegionsType, NeighborhoodsParamType } from './division'

type DistrictsAllParamsType = {
  region_soato?: string
  page?: number
  limit?: number
  with_child_count?: boolean
}

export type RegionsDataType = {
  soato: string
  name: string
  nameRu: string
  code: string
}

export type DistrictDataType = {
  currentSoato: number
  updateSoato: number
  name: string
  nameRu: string
  code: string
  quantityMinimalWage: number
  region_soato: string
  district_soato: string
  search?: string
  with_child_count?: boolean
}

export type NeighborhoodsDataType = {
  id: string
  soato: string
  name: string
  nameRu: string
  // hectarePrice?: string
}

type PatchNeighborhodPriceParams = {
  neighborhoodIds: string[]
  updateHectarePrice: number
}

export const getRegionsSettingarea = () => get<GetRegionsType>('/settings/geo/private/regions')
export const getDistrictsSettingarea = (params: DistrictsAllParamsType) =>
  get<GetDistrictsType>(`/settings/geo/private/districts`, { limit: 1000, page: 1, ...params })

export const getNeighborhoodsSettingarea = (params: NeighborhoodsParamType) =>
  get<GetNeighborhoodsType>(`/settings/geo/private/neighborhoods`, { limit: 1000, page: 1, ...params })

export const putRegionsSoatoCodeName = async (data: RegionsDataType) =>
  put<GetRegionsType>(`/settings/geo/regions/${data.soato}`, data)
export const putDistricts = async (data: DistrictDataType) => put<GetDistrictsType>('/settings/geo/districts', data)
export const putNeighborhoods = (data: NeighborhoodsDataType) =>
  put<GetNeighborhoodsType>(`/settings/geo/neighborhoods/${data.id}`, data)
export const patchNeighborhodPrice = (saoto: string, params: PatchNeighborhodPriceParams) =>
  patch<GetNeighborhoodsType>(`/settings/geo/districts/${saoto}/neighborhoods/hectare-price`, params)
