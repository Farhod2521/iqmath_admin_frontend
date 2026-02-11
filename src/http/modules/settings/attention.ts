import { get, post, put } from '@/http/request'

type AttentionParamType = {
  page: number
  limit: number
  search: string
}

type AttentionFormDataType = {
  title: string
  description: string
  startDate: string
  endDate: string
}

export type AttentionDataItem = {
  startDate: string
  endDate: string
  description: string
  title: string
  id: string
  status?: any
}

type AttentionData = {
  attentionsList: AttentionDataItem[]
  totalCount: number
}

export const getAttentions = (params: AttentionParamType) => get<AttentionData>('/settings/attentions', params)
export const postAttention = (data: AttentionFormDataType) => post('/settings/attentions', data)
export const getAttentionPublic = () => get<AttentionData>('/settings/attentions/public/actual')
export const getAttentionId = (id: string) => get(`/settings/attentions/${id}`)
export const putAttention = (id: string, data: AttentionFormDataType) => put(`/settings/attentions/${id}`, data)
