import { axiosApi } from '@/configs/api'
import { ApiResponse } from '@/types/response'

export type GeoLoactionsFormData = {
  fileId: string
  regionSoato: string | number
  districtSoato: string | number
  parentNumber?: string
}

export type GeoLoactionsOpenMapsParams = {
  module: number
  regionSoato: number
  districtSoato: number
  status: number
}

export type GeoLoactionsOpenMapsTwoParams = {
  minLat: string
  minLng: string
  maxLat: string
  maxLng: string
}

export type GeoLoactionsOpenMapsCountParams = {
  minLat: number
  minLng: number
  maxLat: number
  maxLng: number
  soato: number
  statusId: number
  divisionType: string
}

export type GeoLoactionsOpenMapsPropertyLocationsParams = {
  uniqueNumber: string
  districtSoato: number
}

export type GeoLoactionsOpenMapsShapeFileViewerParams = {
  fileId: string
}

export type GeoLoactionData = {
  geometry: {
    coordinates: string
    type: string
  }
  isDraft: boolean
  isParent: boolean
  origin: boolean
  propertyNumber: string
  redMark: boolean
  statusId: number
  type: string
}

export type GeoLocationsShapeFileViewerData = {
  type: string
  geometry: string
  longitude: number
  latitude: number
}

export type GeoLocationsPropertyLocationsData = {
  type: string
  geometry: {
    type: string
    coordinates: string
  }
  origin: boolean
  propertyNumber: string
  statusId: number
  redMark: boolean
  isParent: boolean
  isDraft: boolean
}

export const postGeoLocations = (data: GeoLoactionsFormData) =>
  axiosApi.post<ApiResponse<GeoLoactionData>>('/geo/locations', data)
export const getGeoLocationsOpenMaps = (params: GeoLoactionsOpenMapsParams) =>
  axiosApi.get('/map/locations/open-maps', params)
export const getGeoLocationsOpenMaps2 = (params: GeoLoactionsOpenMapsTwoParams) =>
  axiosApi.get('/map/locations/open-maps-2', params)
export const getGeoLocationsOpenMapsCount = (params: GeoLoactionsOpenMapsCountParams) =>
  axiosApi.get('/map/locations/open-maps-count', params)
export const getGeoLocationsPropertyLocations = (params: GeoLoactionsOpenMapsPropertyLocationsParams) =>
  axiosApi.get<ApiResponse<GeoLocationsPropertyLocationsData>>('/map/locations/property-locations', params)
export const getGeoLocationsShapeFileViewer = (params: GeoLoactionsOpenMapsShapeFileViewerParams) =>
  axiosApi.get<GeoLocationsShapeFileViewerData>('/geo/locations/shapefile-viewer', params)
