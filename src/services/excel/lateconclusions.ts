import { axiosApi } from '@/configs/api'

export type ExcelLateConclusionsFileParam = {
  regionSoato: number
  districtSoato: number
  code: string
}

export const getExcelLateConclusionsFile = (module: number, params: ExcelLateConclusionsFileParam) =>
  axiosApi.get(`/excel/late-conclusions-file/${module}`, params)
