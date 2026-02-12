import { axiosApi } from '@/configs/api'
import { ApiResponse } from '@/types/response'

export type UzkadDiagramDefaultsParams = {
  purpose: string
}

export type UzkadDiagramReceiveDefaultsParams = {
  purpose: string
}

export type UzkadDiagramDefaultsData = {
  code: string
  name: string
  type: string
  status: boolean
}

export type UzkadDiagramPurposesParams = {
  module?: number
}

export type UzkadDiagramPurposesData = {
  name: string
  purpose: string
}

export type UzkadReceiveConditionData = {
  name: string
  id: string
}

export type UzkadDiagramDefaultsDataList = {
  data: UzkadDiagramDefaultsData[]
  count: number
  uzkadUrlKeys: string[]
}

export const getUzkadDiagramDefaults = (params: UzkadDiagramDefaultsParams) =>
  axiosApi.get<UzkadDiagramDefaultsDataList>('/uzkad-diagram/defaults', params)

export const getUzkadDiagramPurpose = (params: UzkadDiagramPurposesParams) =>
  axiosApi.get<ApiResponse<UzkadDiagramPurposesData>>('/uzkad-diagram/purposes', params)

export const getUzkadDiagramReceiveConditions = () =>
  axiosApi.get<ApiResponse<UzkadReceiveConditionData>>('/uzkad-diagram/uzkad-receive-conditions')

export const getUzkadDiagramReceiveDefaults = (params: UzkadDiagramReceiveDefaultsParams) =>
  axiosApi.get<UzkadDiagramReceiveDefaultsData>(`/uzkad-diagram/receive-defaults`, params)

export type UzkadDiagramReceiveDefaultsData = {
  fieldsTrue: FieldsReceiveDefaultsData[]
  fieldsFalse: FieldsReceiveDefaultsData[]
  additionalFieldsTrue: AdditionalFieldsReceiveDefaultsData[]
  additionalFieldsFalse: AdditionalFieldsReceiveDefaultsData[]
  uzkadNextTrue: string
  uzkadNextFalse: string
  messageTrue: string
  messageFalse: string
}

export type FieldsReceiveDefaultsData = {
  uzkadField: string
  fieldCode: string
  required: boolean
  status: boolean
  disabled: boolean
}

export type AdditionalFieldsReceiveDefaultsData = {
  field: string
  value: string
  valueLabel: string
  disabled: boolean
}
