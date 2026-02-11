import { get, post, put } from '@/http/request'

type FieldParamType = {
  limit?: number
  page?: number
}

export type OptionType = {
  label: string
  value: string
  id: string
}

export type FieldFormDataType = {
  id: string
  description: string
  fieldType: string
  disabled: boolean
  isActive: boolean
  isRequired: boolean
  label: string
  name: string
  valueLabel?: string
  optionsList: OptionType[]
  placeholder: string
  value: string
  code: string
}

type FieldsDataType = {
  totalCount: number
  fields: FieldFormDataType[]
}

export const getFields = (params: FieldParamType) => get<FieldsDataType>('/settings/fields', params)
export const getField = (id: String) => get<FieldFormDataType>(`/settings/fields/${id}`)
export const postField = (data: FieldFormDataType) => post('/settings/fields', data)
export const putField = (id: String, data: FieldFormDataType) => put(`/settings/fields/${id}`, data)
