import { axiosApi } from '@/configs/api'
import { ApiParams, ApiResponse } from '@/types/response'

export type GroupParams = {
  search?: string
  module?: number
} & ApiParams

export type GroupFieldType = {
  fieldId: number
  required: boolean
  order: number
  propertyColumn: string
  fieldName: string
}
export type GroupFormDataType = {
  name: string
  description?: string
  code: string
  module?: number
  fields: GroupFieldType[]
}

export type GroupData = {
  id: number
  name: string
  description: string
  code: string
  createdAt: string
}

export const getSettingsGroups = (params: GroupParams) =>
  axiosApi.get<ApiResponse<GroupData>>('/settings/groups', params)
export const postSettingsGroup = (data: GroupFormDataType) => axiosApi.post('/settings/groups', data)
export const getSettingsGroup = (id: string) => axiosApi.get<GroupFormDataType>(`/settings/groups/${id}`)
export const putSettingsGroup = (id: string, data: GroupFormDataType) => axiosApi.put(`/settings/groups/${id}`, data)
