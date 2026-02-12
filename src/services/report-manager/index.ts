import { axiosApi } from '@/configs/api'
import { ApiResponse } from '@/types/response'

export type ReportManagerActivParam = {
  excelLocation?: string
}

export type ReportManagerActiveData = {
  code: string
  createdAt: string
  endpoint: string
  excelLocation: string[]
  templateName: string
}

export const getReportManagerActive = (module: number, param: ReportManagerActivParam) =>
  axiosApi.get<ApiResponse<ReportManagerActiveData>>(`/report-manager/active/${module}`, param)
