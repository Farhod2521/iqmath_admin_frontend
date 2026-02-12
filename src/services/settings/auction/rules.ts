import { axiosApi } from '@/configs/api'
import { ApiResponse } from '@/types/response'

export type RulesData = {
  id: string
  name: string
}

export type RulesFormData = {
  field: string
  operator: string
  value: string
  valueArray: string[]
  name: string
}

export const getAuctionDiagramsRules = () => axiosApi.get<ApiResponse<RulesData>>(`/settings/auction-diagrams/rules`)
export const postAuctionDiagramsRules = (param: RulesFormData) =>
  axiosApi.post(`/settings/auction-diagrams/rules`, param)
