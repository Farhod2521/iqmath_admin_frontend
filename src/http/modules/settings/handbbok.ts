import { get, post, put } from '@/http/request'

export type HandBookdFormDataType = {
  title: string
  description: string
  active: boolean
  url_link: string
  access_type: boolean
  is_public: boolean
}

export type HandBookParamsType = {
  limit: number
  page: number
  search: string
}

export type HandBookItemType = {
  title: string
  description: string
  active: boolean
  urlLink: string
  id: string
  createdAt: string
  isPublic: boolean
}

type HandBookDataType = {
  count: number
  handbooksList: HandBookItemType[]
}

export const postHandbook = (data: HandBookdFormDataType) => post('/settings/handbook', data)
export const getHandbook = (params: HandBookParamsType) => get<HandBookDataType>('/settings/handbook', params)
export const getHandbookPublic = (params: HandBookParamsType) =>
  get<HandBookDataType>('/settings/handbook/public', params)
export const getHandbookId = (id: string) => get<HandBookItemType>('/settings/handbook/' + id)
export const putHandbook = (id: string, data: HandBookdFormDataType) => put('/settings/handbook/' + id, data)
