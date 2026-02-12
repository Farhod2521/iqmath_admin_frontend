import { axiosApi } from '@/configs/api'

export type ExcelOverdueConclusionsParams = {
  regionSoato: number
  districtSoato: number
  neighborhoodId: number
  statusId: number
  purpose: string
  rightType: string
  fromDate: string
  toDate: string
  search: string
  code: string
}

export const getExcelOverdueConclusions = (params: ExcelOverdueConclusionsParams) =>
  axiosApi.get('/excel/overdue-conclusions', params)
