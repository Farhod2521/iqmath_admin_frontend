import { axiosApi } from '@/configs/api'

export type ExcrlOffersParams = {
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
  code: string
}

export type ExcelOffersData = {
  fileUrl: string
  message: string
}

export const getExcelOffers = (params: ExcrlOffersParams) => axiosApi.get<ExcelOffersData>('/excel/offers', params)
