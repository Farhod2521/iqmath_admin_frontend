import { axiosApi } from '@/configs/api'
import { ApiParams, ApiResponse } from '@/types/response'

export type DivisonsRegionsParams = {
  name?: string
  withChildCount?: boolean
}
export type DivisonsDistrictsParams = {
  name?: string
  withChildCount?: boolean
  regionSoato?: number
} & ApiParams

export type DivisionsNeighborhoods = {
  name?: string
  withChildCount?: boolean
  regionSoato?: number
  districtSoato?: number
} & ApiParams

export type DivisionsRegionsData = {
  childCount: number
  code: string
  districts: []
  name: string
  ruName: string
  soato: number
}

export type DivisionsDistrictsData = {
  childCount: number
  code: string
  name: string
  regionName: string
  regionSoato: number
  ruName: string
  soato: number
}

export type DivisionsNeighborhoodsData = {
  id: number
  name: string
  regionName: string
  regionSoato: number
  ruName: string
  soato: number
  districtName: string
  districtSoato: number
}

export type DivisionsNeighborhoodsForm = {
  soato: number
  name: string
  ruName: string
  gType: string
  tType: string
}

export type DivisionsCenterCoordinatesParams = {
  regionOrDistrictSoato: number
  neighborhoodId: number
}

export type DivisionsCenterCoordinatesData = {
  lat: number
  long: number
}

export const getDivisionsRegions = (params: DivisonsRegionsParams) =>
  axiosApi.get<ApiResponse<DivisionsRegionsData>>('/divisions/regions', params)
export const getDivisionsDistricts = (params: DivisonsDistrictsParams) =>
  axiosApi.get<ApiResponse<DivisionsDistrictsData>>('/divisions/districts', params)
export const getDivisionsNeighborhoods = (params: DivisionsNeighborhoods) =>
  axiosApi.get<ApiResponse<DivisionsNeighborhoodsData>>('/divisions/neighborhoods', params)
export const putDivisionsNeighborhoods = (id: number, data: DivisionsNeighborhoodsForm) =>
  axiosApi.put(`/divisions/neighborhoods/${id}`, data)
export const getDivisionsNeighborhoodsHistory = (neighborhoodId: string) =>
  axiosApi.get(`/divisions/neighborhoods/${neighborhoodId}/history`)
export const getDivisionsCenterCoordinates = (params: DivisionsCenterCoordinatesParams) =>
  axiosApi.get<DivisionsCenterCoordinatesData>('/divisions/center-coordinates', params)
