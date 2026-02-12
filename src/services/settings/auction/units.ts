import { axiosApi } from '@/configs/api'
import { ApiResponse } from '@/types/response'

export type ReceiveConfigUnitsData = {
  name: string
  key: string
  auctionStatusId: number
}

export const getAuctionDiagramsreceiveConfigUnits = () =>
  axiosApi.get<ApiResponse<ReceiveConfigUnitsData>>('/settings/auction-diagrams/auction-statuses')
