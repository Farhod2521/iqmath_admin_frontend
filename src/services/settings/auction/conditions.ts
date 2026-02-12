import { axiosApi } from '@/configs/api'
import { ApiResponse } from '@/types/response'

export type ConditionsFormData = {
  name: string
  rules: string[]
}

export type ConditionsData = {
  id: string
  name: string
}

export const postAuctionDiagramsConditions = (param: ConditionsFormData) =>
  axiosApi.post(`/settings/auction-diagrams/conditions`, param)

export const getAuctionDiagramsConditions = () =>
  axiosApi.get<ApiResponse<ConditionsData>>(`/settings/auction-diagrams/conditions`)
