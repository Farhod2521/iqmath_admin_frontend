import { axiosApi } from '@/configs/api'
import { ApiResponse } from '@/types/response'

export type OperatorsData = {
  name: string
  description: string
  operator: string
  interface: string
}

export const getAuctionDiagramsOperators = () =>
  axiosApi.get<ApiResponse<OperatorsData>>(`/settings/auction-diagrams/operators`)
