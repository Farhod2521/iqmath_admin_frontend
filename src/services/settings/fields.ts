import { axiosApi } from '@/configs/api'
import { FIELD_TYPE, FILE_TYPES } from '@/modules/settings/fields/libs/fieldTypes'
import { OptionType } from '@/types/option'
import { ApiParams, ApiResponse } from '@/types/response'

export type FieldDetail = {
  module: number
  name: string
  label: string
  description: string
  placeholder: string
  options: OptionType[]
  allowedFileTypes: string[]
  isDefault: boolean
  modulePrefix: string
}

export type FieldFormData = {
  fieldType: FIELD_TYPE
  code: string
  details: FieldDetail[]
}

export type FieldParams = {
  search?: string
  module?: number
} & ApiParams

export type FieldDataType = {
  id: number
  name: string
  code: string
  label: string
  fieldType: FIELD_TYPE
  createdAt: string
}

export type RelatedGroupsData = {
  id: number
  module: number
  moduleName: string
  name: string
}

export const postSettingsFields = (data: FieldFormData) => axiosApi.post('/settings/fields', data)
export const putSettingsFields = (id: string, data: FieldFormData) => axiosApi.put(`/settings/fields/${id}`, data)
export const getSettingsFields = (params: FieldParams) =>
  axiosApi.get<ApiResponse<FieldDataType>>('/settings/fields', params)
export const getSettingsFiled = (id: string) => axiosApi.get<FieldFormData>(`/settings/fields/${id}`)
export const getSettingsRelatedGroups = (fieldId: string) =>
  axiosApi.get<ApiResponse<RelatedGroupsData>>(`/settings/related-groups/${fieldId}`)
