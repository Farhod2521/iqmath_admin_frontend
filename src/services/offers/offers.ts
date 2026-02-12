import { axiosApi } from '@/configs/api'
import { ApiParams, ApiResponse } from '@/types/response'

export type OffersParam = {
  regionSoato?: number
  districtSoato?: number
  neighborhoodId?: number
  status?: string
  fromDate?: string
  toDate?: string
  search?: string
  entityNextType?: number
  fromMereAssist?: boolean
  applicantId?: number
} & ApiParams

export type StatusData = {
  color: string
  id: number
  name: string
  shortName: string
}

export type OffersData = {
  id: number
  offerNumber: string
  applicantId: number
  status: StatusData
  acceptanceDate: string
  regionName: string
  districtName: string
  neighborhoodName: string
}

export type OffersFormData = {
  regionSoato: number
  districtSoato: number
  neighborhoodId: number
  // phoneNumber?: string
  fieldValues: { field: string; value: string; valueLabel: string }[]
  area: string
  geometry: string
  fromMereAssist: boolean
  module: number
}

export type AreaData = {
  id: number
  soato: number
  name: string
}
export type FieldValuesData = {
  field: string
  value: string
  valueLabel: string
}

export type OfferSRoleActionsData = {
  name: string
  type: string
  color: string
}

export type OffersFirstData = {
  fieldValues: FieldValuesData[]
  id: number
  offerNumber: string
  applicantId: number
  region: AreaData
  district: AreaData
  neighborhood: AreaData
  applicant: number
  geometryFile: string
  address: string
  area: string
  forModule: number
  fromMereAssist: boolean
  status: StatusData
  createdAt: string
  updatedAt: string
  applicantName: string
  roleActions: OfferSRoleActionsData[]
  //

  propertyId: number
  propertyNumber: string
  photos?: string[]
  geometry?: any
  qurilish_obyekt_turlari?: string | null
  right_type?: string | null
}

export type OffersPatchFormData = {
  actionType: string
}

export type OffersCountData = {
  count: number
}

export type OffersDataMe = {
  acceptanceDate: string
  applicantId: number
  districtName: string
  id: number
  neighborhoodName: string
  offerNumber: string
  regionName: string
  status: StatusData
}

export const getOffers = (params: OffersParam) => axiosApi.get<ApiResponse<OffersData>>('/offers', params)
export const postOffers = (data: OffersFormData) => axiosApi.post('/offers', data)
export const getOffer = (id: string) => axiosApi.get<OffersFirstData>(`/offers/${id}`)
export const patchOffer = (id: string, data: OffersPatchFormData) => axiosApi.patch(`/offers/${id}`, data)
export const getOffersMe = (params: ApiParams) => axiosApi.get<ApiResponse<OffersDataMe>>('/offers/me', params)
export const getOffersCount = () => axiosApi.get<OffersCountData>('/offers/count')
