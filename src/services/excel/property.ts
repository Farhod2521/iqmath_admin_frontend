import { axiosApi } from '@/configs/api'

export type ExcelProperty = {
  regionSoato?: number
  districtSoato?: number
  neighborhoodId?: number
  statusId?: number
  purpose?: string
  rightType?: string
  fromDate?: string
  toDate?: string
  search?: string
  code: string
}

export const getExcelProperty = (params: ExcelProperty) => axiosApi.get('/excel/property', params)
