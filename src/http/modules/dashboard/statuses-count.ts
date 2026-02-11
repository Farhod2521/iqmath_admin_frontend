import { get } from '@/http/request'

export type StatusCountListType = {
  count: string
  name: string
}

export type StatusCountListDataType = {
  statusCountList: StatusCountListType[]
}

export type StatusCountListParamsType = {
  lawAccordanceId?: number
}

export const getStatusesCount = (params: StatusCountListParamsType) =>
  get<StatusCountListDataType>('/dashboard/properties/statuses/count', params)
