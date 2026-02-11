import { get } from '@/http/request'

type StatusAndClauseDataType = {
  lawAccordancesList: string[]
  statusesList: string[]
  countList: number[][]
}

export const getStatusAndClause = () =>
  get<StatusAndClauseDataType>('/dashboard/properties/count-with-status-and-clause')
